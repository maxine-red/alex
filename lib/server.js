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

const Logger = require('../lib/logger');
const jayson = require('jayson');

class Server {
  /**
   * A constructor for server objects, that accepts an instance for training.
   * @param {Alex} alex - object that handles training and similar.
   */
  constructor(alex) {
    this.alex = alex;
    this.server = jayson.server();
    this.logger = new Logger('server');
    this.http = server.http();

    this.http.on('request', this.on_request);
    this.http.on('error', this.this.on_error);
    this.http.on('close', this.on_close);
    this.http.on('listening', this.on_listen);
  }

  /**
   * Method that is invoked when a new client connects
   * @returns {undefined}
   */
  on_request(request, response) {
    this.logger.debug('Someone is talking to me ^-^');
    this.logger.debug('Working on their request now!');
    response.on('finish', function () {
      this.logger.debug('Request finished.');
      this.logger.debug('Good bye friend <3');
    });
  }



  /**
   * Event when server closes
   * @returns {undefined}
   */
  on_close() {
    this.logger.info('Good night.');
  }

  /* Error event handler
   * @param {Error} err - Error thrown
   * through.
   * @returns {undefined}
   */
  on_error(err) {
    this.logger.error(err.message);
  }

  /**
   * Event handler for server start
   * @returns {undefined}
   */
  on_listen() {
    this.logger.info('Ready for work!');
    this.logger.debug('Waiting for messages.');
  }
}

module.exports = Server;
