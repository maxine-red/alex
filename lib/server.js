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

const net = require('net');
const Logger = require('../lib/logger');
let logger = new Logger('server');

/**
 * Method that is invoked when a new client connects
 * @param {net.Connection} conn - Connection from socket
 * @returns {undefined}
 */
function on_connect(conn) {
  logger.debug('Someone is talking to me ^-^');
  conn.on('data', function (data) {
    logger.debug(`They said '${data}'`);
    try {
      data = JSON.parse(data);
    }
    catch(error) {
      logger.debug('*head titls* ???');
      data = {event: 'error'};
    }
    if (data.event === undefined) {
      data = {event: 'error'};
    }
    let message;
    switch(data.event) {
    case 'error': message = {
      event: 'error', data: { message: 'malformed request' }
    }; break;
    case 'train': if (data.data === undefined) {
      message = {
        event: 'error', data: { message: 'malformed request' }
      };
    }
    else {
      server.emit('train', data.data, conn);
    } break;
    case 'score': if (data.data === undefined) {
      message = {
        event: 'error', data: { message: 'malformed request' }
      };
    }
    else {
      server.emit('score', data.data, conn);
    } break;
    default: message = {
      event: 'error', data: { message: 'unknown event type' }
    }; break;
    }
    if (message !== undefined) {
      conn.write(JSON.stringify(message));
    }
  });
  conn.on('end', function () {
    logger.debug('Good bye friend! <3');
  });
}

/**
 * Error event handler
 * @param {Error} err - Error thrown
 * @returns {undefined}
 */
function on_error(err) {
  logger.error(err.code);
}

/**
 * Event when server closes
 * @returns {undefined}
 */
function on_close() {
  logger.info('Server shut down.');
}

/**
 * Event handler for server start
 * @returns {undefined}
 */
function on_listen() {
  logger.info('Server successfully initiated.');
  logger.debug('Waiting for messages.');
}

let server = new net.Server(on_connect);

server.on('error', on_error);

server.on('close', on_close);

server.on('listening', on_listen);

module.exports = server;
