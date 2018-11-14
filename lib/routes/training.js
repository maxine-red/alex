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

const express = require('express');
/*const Users = require('../controllers/users');
let users = new Users();
const ErrorController = require('../controllers/error');*/
let router = express.Router();

router.post('/:personality/train', function (req, res) {
  res.json({personality: 'test', status: 'started'});
});

/*router.get('/:name', function (req, res) {
  users.index()
    .then(function (resp) {
      res.json(resp);
    }, function (err) {
      res.status(err.error.code).json(err);
    });
});*/

module.exports = router;
