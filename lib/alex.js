/*
 *  Copyright 2018 Maxine Michalski <maxine@furfind.net>
 *
 *  This file is part of Alex.
 *
 *  Alex is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Alex is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Alex.  If not, see <http://www.gnu.org/licenses/>.
 */

const fs = require('fs');
const path = require('path');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const config = require('config');
const Memory = require('./memory');

// tensorflow bindings
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

let module_config = config.util.loadFileConfigs(path.join(__dirname,
'../config'));

/**
 * Main class to interact with Alex
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Alex {

  /**
   * Constructor for Alex
   * This method takes care of model generation and loading.
   * If you change configurations, make sure to remove old models from disk,
   * before calling this constructor!
   * @author Maxine Michalski
   * @constructor
   */
  constructor(params) {
    config.util.extendDeep(module_config, params);
    config.util.setModuleDefaults('al3x', module_config);
    this.memories = JSON.parse(fs.readFileSync(
      path.normalize(`${__dirname}/../data/memories.json`)));
    this.file = path.normalize(`${__dirname}/../data/alex`);
    this.network = config.get('al3x.network');
    if (fs.existsSync(`${this.file}/model.json`) &&
      fs.existsSync(`${this.file}/weights.bin`)) {
      tf.loadModel(`file://${this.file}/model.json`)
        .then(this.load_model.bind(this));
    }
    else {
      let model = tf.sequential();
      // Fallback for when no configuration is set.
      for (let layer of this.network.layers) {
        model.add(tf.layers.dense(layer));
      }
      this.load_model(model);
    }
  }

  /**
   * Remembers a state/action pair.
   * Use this method to save state/action pairs, so later they can be used for
   * learning.
   * It is important to have a memory filled with pairs BEFORE starting to
   * learn!
   * This method also changes an internal variable and IS NOT thread safe.
   * @param {Array} state - A state of environement to remember
   * @param {Array} action - The corresponding action, taken inside that
   * environment.
   * @function
   * @returns {Memory} - the appended memory object
   */
  remember(state, action) {
    let memory = new Memory(state, action);
    this.memories.push(memory);
    return memory;
  }

  /**
   * Empties the `memories` inernal variable and makes Alex forget everything.
   * This literally removes all memories, permanently!
   * @function
   * @returns {undefined}
   */
  forget_all() {
    this.memories = [];
  }

  /**
   * Saves memories to disk, so they can be loaded back in later.
   * This file is fixed and will be loaded on every call to Alex's constructor.
   * It also saves the current state, so if you made her forget, she saves an
   * empty array.
   * @function
   * @returns {true} - when no error occured.
   */
  materialize_memory() {
    fs.writeFileSync(path.normalize(`${__dirname}/../data/memories.json`),
      JSON.stringify(this.memories));
    return true;
  }
 
  /**
   * Learns from past memories.
   * This method is the base for any learning and will run asynchronously.
   * @function
   * @returns {Promise} - that will be resolved with a learning historu.
   */
  learn() {
    let m_states = [];
    let m_actions = [];
    for (let memory of this.memories) {
      m_states.push(memory.state);
      m_actions.push(memory.action);
    }
    let states = tf.tensor(m_states, [m_states.length, m_states[0].length]); 
    let actions = tf.tensor(m_actions, [m_actions.length, m_actions[0].length]);
    let params = this.network.train_parameters;
    params.callbacks= {
      onTrainEnd: async function () {
        tf.dispose(states);
        tf.dispose(actions);
      }
    };
    return this.model.fit(states, actions, params);
  }

  /**
   * Takes in a(n array of) state(s) and returns a(n array of) prediction(s).
   * @param {Array} i_states - An array of states, to make predictions for.
   * @function
   * @returns {Promise} - to be resolved with predictions for every state.
   */
  predict(i_states) {
    let states = tf.tensor(i_states, [i_states.length, i_states[0].length]);
    let prom = this.model.predict(states).data();
    tf.dispose(states);
    return prom;
  }

  /**
   * Acts in the environment.
   * @param {Array} states - Array of states, to be fed into `predict()`
   * @param {Function} func - Function to be called with the result of
   * `predict()`
   * @returns {undefined}
   */
  act(states, func) {
    this.predict(states).then(func);
  }
  
  // private methods
  /**
   * Helper method for model loading.
   * @param {tf.Model} model = Model loaded from file (hopefully with weights)
   * @private
   * @returns {undefined}
   */
  load_model(model) {
    this.model = model;
    this.model.compile(this.network.parameters);
  }
}

module.exports = Alex;
