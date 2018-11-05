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
const Error = require('./error');
const User = require('../models/user');

class Users extends Controller {
  constructor() {
    super();
    this.user = new User();
  }

  error(code) {
    return new Promise(function (res, reject) {
      reject({ error: new Error(code) });
    });
  }

  create(name, active = false) {
    if (typeof(name) === 'string' && name !== '') {
      return this.user.create(name, active).then(function (res) {
        return res.rows[0];
      }, function () {
        throw { error: new Error(422) };
      });
    }
    else {
      return this.error(400);
    }
  }
}

module.exports = Users;
