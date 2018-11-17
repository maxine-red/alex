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
   * Looks for personalities, stored on disk.
   * @func
   * @returns {Array} Array of personality names, stored on disk
   */
  personalities() {
    let personalities = fs.readdirSync(`${__dirname}/../personalities/`)
      .filter(file => !file.match(/^.keep$/));
    for (let personality in personalities) {
      personalities[personality] = new Personality(
        path.basename(personalities[personality]));
    }
    return personalities;
  }
}

module.exports = Alex;
