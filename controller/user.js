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
      }, function (err) {
          res.status(403);
          res.json({error: {code: 403, message: 'Name already taken'}});
      });
    }
    else {
      res.status(400);
      res.json({error: {code: 400, message: 'Malformed request'}});
    }
  }
}

module.exports = Users;
