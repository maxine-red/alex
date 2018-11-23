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
let logger = new Logger('server');
const jayson = require('jayson');
let server = jayson.server();


/**
 * Method that is invoked when a new client connects
 * @returns {undefined}
 */
function on_request(request, response) {
  logger.debug('Someone is talking to me ^-^');
  logger.debug('Working on their request now!');
  response.on('finish', function () {
    logger.debug('Request finished.');
    logger.debug('Good bye friend <3');
  });
}



/**
 * Event when server closes
 * @returns {undefined}
 */
function on_close() {
  logger.info('Good night.');
}

/* Error event handler
 * @param {Error} err - Error thrown
 * through.
 * @returns {undefined}
 */
function on_error(err) {
  logger.error(err.message);
}

/**
 * Event handler for server start
 * @returns {undefined}
 */
function on_listen() {
  logger.info('Ready for work!');
  logger.debug('Waiting for messages.');
}

let http = server.http();

http.on('request', on_request);

http.on('error', on_error);

http.on('close', on_close);

http.on('listening', on_listen);

module.exports = [server, http];
