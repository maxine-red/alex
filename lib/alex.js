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
const Personality = require('./personality');
const System = require('./system');
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
    this.system = new System(); // System diagnostics
    let conf =  config.get('network.layers');
    this.input_shape = conf[0].inputShape[0];
    this.output_shape = conf[conf.length-1].units;
  }

  /**
   * Looks for personalities, stored on disk.
   * @returns {Array} Array of personality names, stored on disk
   */
  personalities() {
    let personalities = fs.readdirSync(`${__dirname}/../personalities/`)
      .filter(file => !file.match(/^.keep$/));
    for (let personality in personalities) {
      personalities[personality] = path.basename(personalities[personality]);
    }
    return personalities;
  }

  /**
   * Validates input data and calls a Personality to train with.
   * @param {Object} data - inputs data
   * @returns {Promise} to be resolved when training is done
   */
  train(data) {
    // No return, as it throws errors on invalid data
    return this.validate_data(data, 'train').then(function () {
      // If we reach here, data is validated and we can continue without
      // worrying about input induced errors. (In theory)
      let personality = new Personality(data.user);
      return personality.train(data.inputs, data.outputs);
    }, function (err) { throw err; });
  }

  /**
   * Uses user input data to score it, considering the chosen personality
   * @param {object} data - user input data
   * @returns {Promise} to be resolved with an array of float scores
   */
  score(data) {
    // No return, as it throws errors on invalid data
    return this.validate_data(data, 'score').then(function () {
      let personality = new Personality(data.user);
      return personality.predict(data.inputs);
    }, function (err) { throw err; });
  }

  /**
   * Validation method for input data.
   * It's designed to bail out as soon as possible and to validate input data
   * for use with neural networks.
   * @param {object} data - user input data
   * @param {string} func - function this method was invoked by
   * @returns {Promise} to be resolved if data is valid
   */
  validate_data(data, func) {
    let input_shape = this.input_shape;
    let output_shape = this.output_shape; // Hoisting exploit
    return new Promise(function (resolve, reject) {
      let error = new Error('malformed request');
      if (!(data.hasOwnProperty('user') && data.hasOwnProperty('inputs'))) {
        reject(error);
      }
      if (func === 'train' && !data.hasOwnProperty('outputs')) {
        reject(error);
      }
      if (typeof data.user !== 'string') {
        reject(error);
      }
      if (!Array.isArray(data.inputs)) {
        reject(error);
      }
      if (func == 'train') {
        if (!Array.isArray(data.outputs)) {
          reject(error);
        }
        if (data.inputs.length !== data.outputs.length) {
          reject(error);
        }
      }
      for (let input of data.inputs) {
        if (!Array.isArray(input)) {
          reject(error);
        }
        if (input.length !== input_shape) {
          reject(error);
        }
        for (let i of input) {
          if (typeof i !== 'number') {
            reject(error);
          }
        }
      }
      if (func === 'train') {
        for (let output of data.outputs) {
          if (!Array.isArray(output)) {
            reject(error);
          }
          if (output.length !== output_shape) {
            reject(error);
          }
          for (let o of output) {
            if (typeof o !== 'number') {
              reject(error);
            }
          }
        }
      }
      resolve();
    });
  }
}

module.exports = Alex;
