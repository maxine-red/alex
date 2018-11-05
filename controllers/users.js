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
const ErrorErrorController = require('./error');
const User = require('../models/user');

/**
 * Controller class for users
 * @class
 * @author Maxine Michalski
 * @since 0.1.0
 */
class Users extends Controller {
  /**
   * Contructor for Users objects.
   */
  constructor() {
    super();
    this.user = new User();
  }
  
  /**
   * Error handling method
   * @function
   * @async
   * @param {int} code - Error code to use
   * @returns {Promise} A promise to be rejected with error information.
   */
  error(code) {
    return new Promise(function (res, reject) {
      reject({ error: new ErrorErrorController(code) });
    });
  }

  /**
   * Creates a new user
   * @function
   * @async
   * @param {string} name - Name of new user
   * @param {boolean} [active=false] - Indicator if new user should be set as
   * active or not
   * @returns {Promise<User>} A promise that either resolves with the created
   * user's data or rejected with an error
   */
  create(name, active = false) {
    if (typeof(name) === 'string' && name !== '') {
      return this.user.create(name, active).then(function (res) {
        return res.rows[0];
      }, function () {
        throw { error: new ErrorErrorController(422) };
      });
    }
    else {
      return this.error(400);
    }
  }
 
  /**
   * List users
   * @function
   * @returns {Promise<Array>} A promise that resolves into a list of users
   */
  index() {
    return this.user.list().then(function (res) {
      return res.rows;
    }, function () {
      throw { error: new ErrorErrorController(500) };
    });
  }

  /**
   * Show a single user
   * @function
   * @param {int} id - ID of the requested user
   * @returns {Promise<User>} A promise that resolves into a user object or is
   * rejected into an error object (usually 404)
   */
  show(id) {
    return this.user.find(id).then(function (res) {
      if (res.rows[0] !== undefined) {
        return res.rows[0];
      }
      else {
        throw { error: new ErrorErrorController(404) };
      }
    }, function () {
      throw { error: new ErrorErrorController(500) };
    });
  }
}

module.exports = Users;
