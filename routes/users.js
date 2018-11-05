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
const Users = require('../controllers/users');
let users = new Users();
let router = express.Router();
const ErrorController = require('../controllers/error');

router.use(function (req, res, next) {
  if (req.get('X-AL3X-Password') === process.env.PASSWORD) {
    next();
  }
  else {
    let err = new ErrorController(403);
    res.status(err.code).json({error: err});
  }
});

router.post('/', function (req, res) {
  users.create(req.body.name, req.body.active === true)
    .then(function (resp) {
      res.json(resp);
    }, function (err) {
      res.status(err.error.code).json(err);
    });
});

router.get('/', function (req, res) {
  users.index()
    .then(function (resp) {
      res.json(resp);
    }, function (err) {
      res.status(err.error.code).json(err);
    });
});

router.get('/:id', function (req, res) {
  users.show(req.params.id)
    .then(function (resp) {
      res.json(resp);
    }, function (err) {
      res.status(err.error.code).json(err);
    });
});

module.exports = router;
