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

const ErrorController = require('./controllers/error');

/**
 * General class to maintain server information.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Server {
  /**
   * Contructor for server classes.
   * @param {Logger} logger - Logger object to log non-server specific
   * information
   */
  constructor(logger) {
    this.app = express();

    let access_log = fs.createWriteStream('logs/access.log', { flags: 'a' });

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use(morgan('combined', { stream: access_log }));

    this.app.get('/500', function (req, res) { // eslint-disable-line no-unused-vars
      throw new Error('Error');
    });
    
    this.app.get('/unknown', function (req, res) { // eslint-disable-line no-unused-vars
      let error = new ErrorController(501);
      res.status(error.code).json({error: error});
    });

    // Handle 404 responses properly.
    this.app.use(function (req, res) {
      let err = new ErrorController(404);
      res.status(err.code).json({error: err});
    });
    
    this.app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
      let error = new ErrorController(500);
      logger.error(err.stack);
      res.status(error.code).json({error: error});
    });
  }
}
module.exports = Server;
