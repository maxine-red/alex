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

const path = require('path');
const userid = require('userid');
const os = require('os');
const v8 = require('v8');

/**
 * An abstraction of various system information.
 * Attributes are gatehred on creation, while methods show live information.
 * @author Maxine michalski
 * @since 1.0.0
 * @class
 */
class System {
  /**
   * Constructor for diagnostics. This will store startup diagnostics (static).
   * @author Maxine Michalski
   */
  constructor() {
    this.last_usage = process.cpuUsage(); // used for relative CPU usage info
    
    // CPU information
    this.cpu = {
      cores: os.cpus().length,
      architecture: process.arch
    };
   
    // Memory information
    this.memory = {
      total: os.totalmem(),
      max_heap: v8.getHeapStatistics().heap_size_limit,
      used: process.memoryUsage().rss
    };

    // Run time information, in seconds
    this.run_time = Math.round(process.uptime()*1000)/1000.0;

    // OS information
    this.platform = `${process.platform} ${os.release()}`;
   
    // User information
    this.user = {
      id: process.getuid(),
      name: userid.username(process.getuid())
    };

    this.group = {
      id: process.getgid(),
      name: userid.groupname(process.getgid())
    };
    
    // Interpreter information
    this.interpreter = {
      node: `${process.argv0} ${process.version}`,
      program: path.basename(process.argv[1])
    };
  }
}

module.exports = System;
