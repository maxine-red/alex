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
const Diagnostics = require('../lib/diagnostics');
const Server = require('../lib/server');

/**
 * Main class to combine all of Alex's parts.
 * @author maxine Michalski
 * @since 1.0.0
 * @class
 */
class Alex {

  /**
   * Constructor for Alex
   * @author Maxine Michalski
   * @function
   */
  constructor() {
    this.name = 'AL3X';
    process.title = this.name;
    this.diagnostics = new Diagnostics();
    this.logger = new Logger();
  }

  /**
   * Bootup sequence starter for Alex.
   * @author Maxine Michalski
   * @function
   * @returns {Boolean} Returns true if no errors are encountered.
   */
  start() {
    this.logger.info('Alex booting up....');
    this.logger.info('Running self diagnostic:');
    this.logger.info(`  Running on architecture: ${this.diagnostics.arch}`);
    this.logger.info(`  Running on platform: ${this.diagnostics.platform}`);
    if (this.diagnostics.platform === 'windows') {
      this.logger.error('  Running on incompatible platform.');
      return false;
    }
    else {
      this.logger.info(`  Running as user: ${this.diagnostics.username}`);
      this.logger.info(`  Running under group: ${this.diagnostics.groupname}`);
      if (this.diagnostics.user_id === 0) {
        this.logger.error('  I\'m running as root!');
        this.logger.error('  Privileges too high. Aborting!');
        this.logger.error('  Please only run me as a non-root user.');
        return false;
      }
    }
    this.logger.info(`  Using interpreter: ${this.diagnostics.interpreter}`);
    this.logger.info(`  Spawned as program: ${this.diagnostics.program}`);
    this.logger.info(`  I'm known under the name of: ${this.diagnostics.title}`);
    return true;
  }

  /**
   * Start the integrated http server, to communicate with other processes.
   * @returns {Server} Server object of http server
   */
  server() {
    let server = new Server(this);
    let port = process.env.PORT || 3000;

    // Error handling
    return server.app.listen(port);
  }
}

module.exports = Alex;
