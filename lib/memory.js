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

const config = require('config');

/**
 * Main class to combine for Memories
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Memory {

  /**
   * Constructor for a Memory
   * @author Maxine Michalski
   * @function
   */
  constructor(state, action) {
    if (state === undefined) {
      throw new Error('no state or action provided');
    }
    else if (Array.isArray(state) && action === undefined) {
      throw new Error('action expected, but not provided');
    }
    else if (Array.isArray(state) && Array.isArray(action)) {
      validate_state(state);
      validate_action(action);
      this.state = state;
      this.action = action;
      this.created_at = Math.floor(Date.now() / 1000);
    }
    else if (!Array.isArray(state) && !(state.hasOwnProperty('state') &&
      state.hasOwnProperty('action'))) {
      throw new Error('memory objects require a state and action property');
    }
    else if (!Array.isArray(state) && state.hasOwnProperty('state') &&
      state.hasOwnProperty('action') && !Array.isArray(action)) {
      validate_state(state.state);
      validate_action(state.action);
      this.state = state.state;
      this.action = state.action;
      // It isn't detrimental if this property is missing.
      if (state.hasOwnProperty('created_at')) {
        this.created_at = state.created_at;
      }
      else {
        this.created_at = Math.floor(Date.now() / 1000);
      }
    }
    else {
      throw Error('unknown error occured');
    }
  }
}

function validate_state(state) {
  let size = config.network.layers[0].inputShape[0];
  if (state.length !== size) {
    throw new Error(`State size mismatch: expected ${size}, but got ${state.length}`);
  }
  for (let e of state) {
    if (typeof e !== 'number') {
      throw new Error('State must comprise of numbers only!');
    }
  }
}

function validate_action(action) {
  let size = config.network.layers[config.network.layers.length - 1].units;
  if (action.length !== size) {
    throw new Error(`Action size mismatch: expected ${size}, but got ${action.length}`);
  }
  for (let e of action) {
    if (typeof e !== 'number') {
      throw new Error('Action must comprise of numbers only!');
    }
  }
}

module.exports = Memory;
