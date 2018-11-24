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

// TODO: Make System more static, by turning all methods into properties.
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
      max_heap: v8.getHeapStatistics().heap_size_limit
    };

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

  // System misc functions
  /**
   * Fetch current hostname and return it.
   * @func
   * @returns {String} Current hostname
   */
  hostname() {
    return os.hostname();
  }

  /**
   * Return the working directory of this process.
   * @func
   * @returns {String} Current working directory
   */
  working_directory() {
    return process.cwd();
  }

  // CPU information
  /**
   * Gather how long this process is running.
   * @func
   * @returns {Number} Number of seconds, this process is running
   */
  run_time() {
    return Math.round(process.uptime()*1000)/1000.0;
  }

  // Memory information
  /**
   * Returns memory used (allocated) by process.
   * @func
   * @returns {Number} Number of allocated memory, in MB
   */
  memory_use() {
    let memory_use = process.memoryUsage();
    return Math.round(memory_use.rss / Math.pow(2,20) * 100) / 100.0;
  }

  /**
   * Returns an objec with percentages of memory used, relative to max values.
   * @func
   * @returns {Object} Percentages of max memory values used.
   */
  relative_memory_use() {
    let memory_use = process.memoryUsage();
    let p_total = Math.round(memory_use.rss * 10000 / this.memory.total);
    let p_heap = Math.round(memory_use.rss * 10000 / this.memory.max_heap);
    return {
      system: p_total / 100.0,
      heap: p_heap / 100.0
    };
  }
}

module.exports = System;
