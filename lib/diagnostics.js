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
const fs = require('fs');
const os = require('os');
const v8 = require('v8');

/**
 * Class to store and gather system diagnostics. These are helpful for self
 * diagnosing problems.
 * @author Maxine michalski
 * @class
 * @private
 */
class Diagnostics {
  /**
   * Constructor for diagnostics. This will store startup diagnostics (static).
   * @author Maxine Michalski
   */
  constructor() {
    this.last_usage = process.cpuUsage();
    this.arch = process.arch;
    this.interpreter = `${process.argv0} ${process.version}`;
    this.program = path.basename(process.argv[1]);
    this.platform = `${process.platform} ${os.release()}`;
    this.total_memory = os.totalmem();
    this.max_heap = v8.getHeapStatistics().heap_size_limit;
    this.cpu_count = os.cpus().length;
    this.cpu_model = os.cpus()[0].model;
    this.title = process.title;
    this.username = userid.username(process.getuid());
    this.groupname = userid.groupname(process.getgid());
    this.user_id = process.getuid();
    this.group_id = process.getgid();
    this.personality_count = this.personalities().length;
    this.memory_use();
  }

  personalities() {
    let personalities = fs.readdirSync(`${__dirname}/../personalities/`);
    return personalities.filter(file => file.match(/\.net$/));
  }

  hostname() {
    return os.hostname();
  }

  run_time() {
    return Math.round(process.uptime()*1000)/1000.0;
  }

  cpu_use() {
    // total time is in seconds, while relative time is in miliseconds.
    let cpu_use_total = process.cpuUsage();
    cpu_use_total.user = Math.floor(cpu_use_total.user/1000)/1000.0;
    cpu_use_total.system = Math.floor(cpu_use_total.system/1000)/1000.0;
    let cpu_use_rel = process.cpuUsage(this.last_usage);
    cpu_use_rel.user = cpu_use_rel.user/1000;
    cpu_use_rel.system = cpu_use_rel.system/1000;
    this.last_usage =  process.cpuUsage();
    return { total: cpu_use_total, relative: cpu_use_rel };
  }

  working_directory() {
    return process.cwd();
  }

  memory_use() {
    // Memory use is in MB
    let memory_use = process.memoryUsage();
    let p_total = Math.round(memory_use.rss * 10000 / this.total_memory)/ 100.0;
    let p_heap = Math.round(memory_use.rss * 10000 / this.max_heap)/ 100.0;
    return { total: Math.round(memory_use.rss / Math.pow(2,20) * 100) / 100.0,
      percent_total: p_total,
      percent_max_heap: p_heap
    };
  }
}

module.exports = Diagnostics;
