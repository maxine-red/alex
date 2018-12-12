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

/**
 * Main class to combine for Memories
 * @author Maxine Michalski
 * @since 1.0.0
 * @private
 * @class
 */
class Memory {

  /**
   * Constructor for a Memory
   * This class stores state/action pairs, so they can be used for learning.
   * @author Maxine Michalski
   * @function
   */
  constructor(mem) {
    if (typeof(mem) === 'object' && !( mem instanceof Array) &&
      mem.hasOwnProperty('state') && mem.hasOwnProperty('action')) {
      for (let o in mem) {
        validate(mem[o], o);
        this[o] = mem[o];
      }
      // It isn't detrimental if this property is missing.
      if (!this.hasOwnProperty('created_at')) {
        this.created_at = Date.now();
      }
    }
    else {
      error_handler(mem);
    }
  }
}

function error_handler(mem) {
  if (typeof(mem) !== 'object' || mem instanceof Array) {
    throw new Error('memory not an object!');
  }
  else {
    throw new Error('memory objects require a state and action property');
  }
}

function validate(obj, name) {
  switch (name) {
  case 'state': validate_state(obj); break;
  case 'action': validate_single(obj, name); break;
  case 'created_at': validate_timestamp(obj); break;
  default: throw new Error('unknown property');
  }
}

function validate_timestamp(obj) {
  if (! (typeof obj === 'number' && new Date('2018-01-01') < new Date(obj))) {
    throw new Error('not a UNIX timestamp with miliseconds');
  }
}

function validate_single(obj, name) {
  if (typeof obj !== 'number') {
    throw new Error(`${name} must be a number`);
  }
}

function validate_state(obj) {
  if (!(obj instanceof Array)) {
    throw new Error('state must be an array');
  }
  else {
    for (let o of obj) {
      if (typeof o !== 'number') {
        throw new Error('state must consist of numbers only');
      }
    }
  }
}

module.exports = Memory;
