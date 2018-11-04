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
const uuid = require('uuid/v4');

class Users extends Controller {
  constructor() {
    super();
    this.user = new User();
  }

  create(name, res) {
    if (typeof(name) === 'string' && name !== '') {
      let key = uuid(); // generate a random token for this API
      this.user.create(name, key).then(function (resp) {
        res.json(resp.rows[0]);
      }, function () {
        let err = new Error(422);
        res.status(err.code);
        res.json({error: err});
      });
    }
    else {
      let err = new Error(400);
      res.status(err.code);
      res.json({error: err});
    }
  }
}

module.exports = Users;
