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

class Diagnostics {
  static start_up() {
    return {
      arch: process.arch,
      interpreter: `${process.argv0} ${process.version}`,
      program: path.basename(process.argv[1]),
      platform: process.platform,
      title: process.title,
      username: userid.username(process.getuid()),
      groupname: userid.groupname(process.getgid()),
      user_id: process.getuid(),
      group_id: process.getgid()
    }
  }
}

module.exports = Diagnostics;
