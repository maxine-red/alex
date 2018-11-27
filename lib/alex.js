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
  }

  diagnose() {
    return new System();
  }

  /**
   * Looks up and returns a Personality.
   * @returns {Personality} 
   */
  personalities() {
    /*let personalities = fs.readdirSync(`${__dirname}/../personalities/`)
      .filter(file => !file.match(/^.keep$/));
    for (let personality in personalities) {
      personalities[personality] = path.basename(personalities[personality]);
    }
    return personalities;*/
  }

  /**
   * Validates input data and calls a Personality to train with.
   * @param {Object} data - inputs data
   * @returns {Promise} to be resolved when training is done
   */
  train(data) {
  }

  /**
   * Uses user input data to score it, considering the chosen personality
   * @param {object} data - user input data
   * @returns {Promise} to be resolved with an array of float scores
   */
  score(data) {
  }
}

module.exports = Alex;
