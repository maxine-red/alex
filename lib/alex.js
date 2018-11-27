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

const pack = require('../package.json');
const fs = require('fs');
const path = require('path');
const config = require('config');

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
    this.name = 'AL3X';
    this.version = pack.version;
  }

  /**
   * Looks up and returns a Personality.
   * @returns {Personality} 
   *
  personalities() {
    /*let personalities = fs.readdirSync(`${__dirname}/../personalities/`)
      .filter(file => !file.match(/^.keep$/));
    for (let personality in personalities) {
      personalities[personality] = path.basename(personalities[personality]);
    }
    return personalities;*
  }

  /**
   * Validates input data and calls a Personality to train with.
   * @param {Object} data - inputs data
   * @returns {Promise} to be resolved when training is done
   *
  train(data) {
  }

  /**
   * Uses user input data to score it, considering the chosen personality
   * @param {object} data - user input data
   * @returns {Promise} to be resolved with an array of float scores
   *
  score(data) {
  }*/
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
  constructor(name) {
    this.name = name;
    this.file = path.normalize(`${__dirname}/../personalities/${this.name}`);
    if (fs.existsSync(`${this.file}/weights.bin`) && 
      fs.existsSync(`${this.file}/model.json`)) {
      tf.loadModel(`file://${this.file}/model.json`).then(this.load_model.bind(this));
    }
    else {
      this.model = tf.sequential();
      for (let layer of config.get('network.layers')) {
        this.model.add(tf.layers.dense(layer));
      }
      this.model.compile(config.get('network.parameters'));
    }
  }

  /**
   * Train a neural network and save it onto disk.
   * @author Maxine Michalski
   * @func
   * @param {Array} inputs - input vector data
   * @param {Array} outputs - desired output vector data
   * @returns {Promise} Promise to be resolved after training is done
   *
  train (inputs, outputs) {
    // promise will include all training data
    let data = tf.tensor(inputs, [inputs.length, inputs[0].length]);
    let scores = tf.tensor(outputs, [outputs.length, 1]);
    inputs = null;
    outputs = null;
   
    let params = config.get('network.train_parameters');
    params.callbacks= {
      onTrainEnd: async function () {
        tf.dispose(data);
        tf.dispose(scores);
      }
    };

    return this.model.fit(data, scores, params);
  }

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

  /**
   * Helper method for model loading.
   * @param {tf.Model} model = Model loaded from file (hopefully with weights)
   * @returns {undefined}
   *
  load_model(model) {
    this.model = model;
  }
}

module.exports = Personality;*/
