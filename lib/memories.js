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

const fs_path = require('path');
const fs = require('fs');

const Memory = require('./memory');

class Memories extends Array {
  static get [Symbol.species]() { return Array; }

  push(obj) {
    if (obj instanceof Memory) {
      super.push(obj);
    }
    else {
      throw new Error('object must be Memory');
    }
  }
  
  unshift(obj) {
    if (obj instanceof Memory) {
      super.unshift(obj);
    }
    else {
      throw new Error('object must be Memory');
    }
  }
  
  save(path) {
    path = fs_path.normalize(path);
    fs.writeFileSync(path, JSON.stringify(this));
    return true;
  }

  static load(path) {
    path = fs_path.normalize(path);
    let m = new Memories();
    for (let o of JSON.parse(fs.readFileSync(path))) {
      m.push(new Memory(o));
    }
    return m;
  }
}

module.exports = Memories;
