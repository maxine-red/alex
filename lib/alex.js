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

const logger = require('../lib/logger');
const Diagnostics = require('../lib/diagnostics');

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
  }

  /**
   * Bootup sequence starter for Alex.
   * @author Maxine Michalski
   * @function
   * @returns {Boolean} Returns true if no errors are encountered.
   */
  start() {
    this.diagnostics = new Diagnostics();
    logger.info('Alex booting up....');
    logger.info('Running self diagnostic:');
    logger.info(`  Running on architecture: ${this.diagnostics.arch}`);
    logger.info(`  Running on platform: ${this.diagnostics.platform}`);
    if (this.diagnostics.platform === 'windows') {
      logger.warn('  Running on slightly incompatible platform.');
      logger.warn('  No user information displayed.');
    }
    else {
      logger.info(`  Running as user: ${this.diagnostics.username}`);
      logger.info(`  Running under group: ${this.diagnostics.groupname}`);
      if (this.diagnostics.userid === 0) {
        logger.warn('  I\'m running as root!');
        logger.info('  Dropping previleges immediately.');
        process.setgid('nogroup');
        process.setegid('nogroup');
        process.setuid('nobody');
        process.seteuid('nobody');
        logger.info('  Dropped privileges to nobody.');
      }
    }
    logger.info(`  Using interpreter: ${this.diagnostics.interpreter}`);
    logger.info(`  Spawned as program: ${this.diagnostics.program}`);
    logger.info(`  I'm known under the name of: ${this.diagnostics.title}`);
    if (process.title !== this.name) {
      logger.warn('  Name not set properly.');
      process.title = this.name;
      logger.info(`  Name changed to: ${process.title}`);
    }
    /*this.server = require('../lib/server');
    module.exports = server;*/
    return true;
  }
}

module.exports = Alex;
