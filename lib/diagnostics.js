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
    this.arch = process.arch;
    this.interpreter = `${process.argv0} ${process.version}`;
    this.program = path.basename(process.argv[1]);
    this.platform = process.platform;
    this.title = process.title;
    this.username = userid.username(process.getuid());
    this.groupname = userid.groupname(process.getgid());
    this.user_id = process.getuid();
    this.group_id = process.getgid();
  }
}

module.exports = Diagnostics;
