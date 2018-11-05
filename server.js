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
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');

let app = express();

let access_log = fs.createWriteStream('logs/access.log', { flags: 'a' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined', { stream: access_log }));

let port = process.env.PORT || 3000;

let users = require('./routes/users');

app.use('/users', users);

// Handle 404 responses properly.
const ErrorController = require('./controllers/error');
app.use(function (req, res) {
  let err = new ErrorController(404);
  res.status(err.code).json({error: err});
});

// Error handling
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack); // eslint-disable-line no-console
  }
  res.status(500).json({error: new Error(500)});
});
module.exports = app.listen(port);
