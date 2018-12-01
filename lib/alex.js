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
const config = require('config');
const Memory = require('./memory');

// tensorflow bindings
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

/**
 * Main class to combine all of Alex's parts.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Alex {

  /**
   * Constructor for Alex
   * @author Maxine Michalski
   * @function
   */
  constructor() {
    this.memories = JSON.parse(fs.readFileSync(
      path.normalize(`${__dirname}/../data/memories.json`)));
    this.file = path.normalize(`${__dirname}/../data/alex`);
    if (fs.existsSync(`${this.file}/model.json`) &&
      fs.existsSync(`${this.file}/weights.bin`)) {
      tf.loadModel(`file://${this.file}/model.json`)
        .then(this.load_model.bind(this));
    }
    else {
      let model = tf.sequential();
      for (let layer of config.network.layers) {
        model.add(tf.layers.dense(layer));
      }
      this.load_model(model);
    }
  }

  remember(state, action) {
    let memory = new Memory(state, action);
    this.memories.push(memory);
    return memory;
  }

  forget_all() {
    this.memories = [];
  }

  materialize_memory() {
    fs.writeFileSync(path.normalize(`${__dirname}/../data/memories.json`),
      JSON.stringify(this.memories));
    return true;
  }
  
  learn() {
    let m_states = [];
    let m_actions = [];
    for (let memory of this.memories) {
      m_states.push(memory.state);
      m_actions.push(memory.action);
    }
    let states = tf.tensor(m_states, [m_states.length, m_states[0].length]); 
    let actions = tf.tensor(m_actions, [m_actions.length, m_actions[0].length]);
    let params = config.network.train_parameters;
    params.callbacks= {
      onTrainEnd: async function () {
        tf.dispose(states);
        tf.dispose(actions);
      }
    };
    return this.model.fit(states, actions, params);
  }

  predict() {
  }

  act() {
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
    this.model.compile(config.network.parameters);
  }
}

module.exports = Alex;

/*const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const config = require('config');

/**
 * Class for Personalities.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 *
class Personality {

  /**
   * Constructor for Personalities
   * @author Maxine Michalski
   * @function
   * @param {String} name - name of this personality
   * @param {Number} input_size - size for inputs, data needs to have exactly
   * this size
   *

  /**
   * Train a neural network and save it onto disk.
   * @author Maxine Michalski
   * @func
   * @param {Array} inputs - input vector data
   * @param {Array} outputs - desired output vector data
   * @returns {Promise} Promise to be resolved after training is done
   *

  /**
   * Scoring function for a personality
   * @param {Array} inputs - input data
   * @returns {Promise} Promise to be resolved with score data
   *
  predict(inputs) {
    let data = tf.tensor(inputs, [inputs.length, inputs[0].length]);
    let prom = this.model.predict(data).data();
    tf.dispose(data);
    return prom;
  }

  /**
   * Saves current model to disk.
   * @func
   * @returns {Promise} Promise to be resolved after saving
   *
  save() {
    return this.model.save(`file://${this.file}`);
  }

}

module.exports = Personality;*/
