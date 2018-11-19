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
    let conf =  config.get('network.layers');
    this.input_shape = conf[0].inputShape[0];
    this.output_shape = conf[conf.length-1].units
  }

  train(data) {
    // No return, as it throws errors on invalid data
    this.validate_data(data, 'train');
  }

  score(data) {
    // No return, as it throws errors on invalid data
    this.validate_data(data, 'score');
  }

  validate_data(data, func) {
    // FIXME: Possible bottleneck!
    let error = new Error('malformed request');
    if (!(data.hasOwnProperty('user') && data.hasOwnProperty('inputs'))) {
      throw error;
    }
    if (func === 'train' && !data.hasOwnProperty('outputs')) {
      throw error;
    }
    if (typeof data.user !== 'string') {
      throw error;
    }
    if (!Array.isArray(data.inputs)) {
      throw error;
    }
    if (func == 'train') {
      if (!Array.isArray(data.outputs)) {
        throw error;
      }
      if (data.inputs.length !== data.outputs.length) {
        throw error;
      }
    }
    for (let input of data.inputs) {
      if (!Array.isArray(input)) {
        throw error;
      }
      if (input.length !== this.input_shape) {
        throw error;
      }
      for (let i of input) {
        if (typeof i !== 'number') {
          throw error;
        }
      }
    }
    if (func === 'train') {
      for (let output of data.outputs) {
        if (!Array.isArray(output)) {
          throw error;
        }
        if (output.length !== this.output_shape) {
          throw error;
        }
        for (let o of output) {
          if (typeof o !== 'number') {
            throw error;
          }
        }
      }
    }
  }
}

module.exports = Alex;
