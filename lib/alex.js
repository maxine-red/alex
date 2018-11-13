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
    if (this.start_diagnosis()) {
      this.logger.info('Bootup finished. No errors found.');
      return true;
    }
    else {
      return false;
    }
  }

  start_diagnosis() {
    this.logger.info('  System information:');
    this.logger.info(`    CPU count: ${this.diagnostics.cpu_count}`);
    this.logger.info(`      Model: ${this.diagnostics.cpu_model}`);
    this.logger.info(`      Architecture: ${this.diagnostics.arch}`);
    let total_memory = Math.round(this.diagnostics.total_memory /
      Math.pow(2,30) * 10) / 10.0;
    this.logger.info(`    Total memory: ${total_memory} GB`);
    let avail_memory = Math.round(this.diagnostics.max_heap /
      Math.pow(2,30) * 10) / 10.0;
    this.logger.info(`    Available memory: ${avail_memory} GB`);
    if (this.total_memory < 3) {
      this.logger.warn('    Available memory low.');
    }
    else if (this.total_memory < 2) {
      this.logger.error('   Total available memory below minimum!');
      return false;
    }
    this.logger.info(`    Platform: ${this.diagnostics.platform}`);
    if (this.diagnostics.platform === 'windows') {
      this.logger.error('    Running on incompatible platform.');
      return false;
    }
    else {
      this.logger.info(`    User: ${this.diagnostics.username}`);
      this.logger.info(`    Group: ${this.diagnostics.groupname}`);
      if (this.diagnostics.user_id === 0) {
        this.logger.error('  I\'m running as root!');
        this.logger.error('  Privileges too high. Aborting!');
        this.logger.error('  Please only run me as a non-root user.');
        return false;
      }
    }
    this.logger.info(`  My home is: ${this.diagnostics.hostname()}`);
    this.logger.info(`  Using interpreter: ${this.diagnostics.interpreter}`);
    this.logger.info(`  Spawned as program: ${this.diagnostics.program}`);
    this.logger.info(`  I'm known under the name of: ${this.diagnostics.title}`);
    if (this.diagnostics.personality_count === 0) {
      this.logger.warn('  No personalities found.');
      this.logger.info('  This is normal, if no personalities were created.');
    }
    else {
      this.logger.info(`  Found ${this.diagnostics.personality_count} personalities.`);
      // TODO: Reading in personalities.
    }
    return true;
  }

  /**
   * Start the integrated http server, to communicate with other processes.
   * @returns {Server} Server object of http server
   */
  server() {
    this.logger.info('Starting server.');
    let server = new Server(this);
    let port = process.env.PORT || 3000;

    let app_server = server.app.listen(port);
    this.logger.info('HTTP server running');
    this.logger.info('I\'m fully operational now.');
    return app_server;
  }
}

module.exports = Alex;
