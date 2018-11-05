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

const Model = require('./model');

/**
 * User model class
 * @class
 * @author Maxine Michalski
 * @since 1.0.0
 */
class User extends Model {

  /**
   * Contructor for user models.
   * @function
   */
  constructor() {
    super();
  }

  /**
   * Create a new user in database
   * @function
   * @param {string} name - Name of new user
   * @param {boolean} [active=false] - Activation state of user
   * @returns {Promise} Query result
   */
  create(name, active = false) {
    return this.pool.query('INSERT INTO users (name, active) VALUES ($1, $2) RETURNING name, active;', [name, active]);
  }
 
  /**
   * Query a list of users
   * @function
   * @returns {Promise} Query result
   */
  list() {
    return this.pool.query('SELECT id, name, active, EXTRACT(EPOCH FROM created_at) AS created_at, EXTRACT(EPOCH FROM updated_at) AS updated_at FROM users ORDER BY id;');
  }
  
  /**
   * Find a specific user in database, by id
   * @function
   * @param {int} id - ID of user to be fetched
   * @returns {Promise} Query result
   */
  find(id) {
    return this.pool.query('SELECT id, name, active, EXTRACT(EPOCH FROM created_at) AS created_at, EXTRACT(EPOCH FROM updated_at) AS updated_at FROM users WHERE id = $1;', [id]);
  }
}

module.exports = User;
