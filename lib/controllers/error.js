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

const Controller = require('./controller');

/**
 * Main class for controller error handling.
 * @author Maxine Michalski
 * @since 1.0.0
 * @private
 * @class
 */
class ErrorController extends Controller{
  /**
   * Error handling constructor.
   * @param {int} code - Code to be used for error message
   */
  constructor(code) {
    super();
    /**
     * @private
     * @member {int} code
     */
    this.code = code;
    /**
     * @private
     * @member {string} name
     */
    switch (code) {
    case 404: this.message = 'Not Found'; break;
    case 500: this.message = 'Internal Server Error'; break;
    default: this.message = 'An unknown error occured'; break;
    }
  }
}

module.exports = ErrorController;
