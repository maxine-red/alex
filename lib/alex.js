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
const logger = new Logger();

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
  }

  /**
   * Bootup sequence starter for Alex.
   * @author Maxine Michalski
   * @function
   * @returns {Boolean} Returns true if no errors are encountered.
   */
  start() {
    logger.info('Alex booting up....');
    logger.info('Running self diagnostic:');
    logger.info(`  Running on architecture: ${this.diagnostics.arch}`);
    logger.info(`  Running on platform: ${this.diagnostics.platform}`);
    if (this.diagnostics.platform === 'windows') {
      logger.error('  Running on incompatible platform.');
      return false;
    }
    else {
      logger.info(`  Running as user: ${this.diagnostics.username}`);
      logger.info(`  Running under group: ${this.diagnostics.groupname}`);
      if (this.diagnostics.user_id === 0) {
        logger.error('  I\'m running as root!');
        logger.error('  Privileges too high. Aborting!');
        logger.error('  Please only run me as a non-root user.');
        return false;
      }
    }
    logger.info(`  Using interpreter: ${this.diagnostics.interpreter}`);
    logger.info(`  Spawned as program: ${this.diagnostics.program}`);
    logger.info(`  I'm known under the name of: ${this.diagnostics.title}`);
    /*this.server = require('../lib/server');
    module.exports = server;*/
    return true;
  }
}

module.exports = Alex;
