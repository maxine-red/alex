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

//const fs = require('fs');
//const path = require('path');

/**
 * Class for Personalities.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Personality {

  /**
   * Constructor for Personalities
   * @author Maxine Michalski
   * @function
   * @param {String} name - name of this personality
   */
  constructor(name) {
    this.name = name;
  }
}

module.exports = Personality;
