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

const random = require('random');

/*
 * Code used here is partially from the project refinforcejs.
 * You can find the original code under: https://github.com/karpathy/reinforcejs
 * It is licensed under MIT, but will be relicensed under GPLv3 in this project.
 */

/**
 * Matrix class
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Matrix {

  /**
   * Contructor for Network layers
   * Handles Matrix contruction
   * @author Maxine Michalski
   * @param {Number} rows - Number of rows, this matrix has
   * @param {Number} columns - Number of columns, this matrix has
   * @constructor
   */
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.content = new Float64Array(rows * columns);
    this.deltas = new Float64Array(rows * columns);
  }
  
  /**
   * Randomize weights
   * @author Maxine Michalski
   * @param {Number} mu - Center of gaussian curve
   * @param {NUmber} std - standard deviation
   * @returns {Float64Array} - randomized array
   */
  randomize(mu, std) {
    let normal = random.normal(mu, std);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      this.content[i] = normal();
    }
    return this.content;
  }
  
  /**
   * Get a value out of this matrix
   * @author Maxine Michalski
   * @param {Number} row - Row of matrix to fetch value from
   * @param {Number} col - Column of matrix to fetch value from
   * @returns {Number} - Value of specified cell
   */
  get(row, col) {
    return this.content[row * this.columns + col];
  }
  
  /**
   * set a value out of this matrix
   * @author Maxine Michalski
   * @param {Number} row - Row of matrix to set value of
   * @param {Number} col - Column of matrix to set value of
   * @param {Number} val - Value to set cell
   * @returns {undefined}
   */
  set(row, col, val) {
    this.content[row * this.columns + col] = val;
  }

  /**
   * Saves matrix to a JSON representation
   * @author Maxine Michalski
   * @returns {Object} - JSON representation of Matrix object
   */
  save() {
    return {
      rows: this.rows,
      columns: this.columns,
      content: this.content
    };
  }

  /**
   * Loads a matrix from a JSON representation
   * @author Maxine Michalski
   * @param {Object} json - JSON representation of a matrix
   * @returns {Matrix} - restored matrix
   */
  static load(json) {
    let matrix = new Matrix(json.rows, json.columns);
    for (let i in json.content) {
      matrix.content[parseInt(i)] = json.content[i];
    }
    return matrix;
  }

  /**
   * Update matrix with delta values and considering a learning rate alpha
   * @author Maxine Michalski
   * @param {Number} alpha - Learning rate to use
   * @returns {undefined}
   */
  update(alpha) {
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      if (this.deltas[i] !== 0) {
        this.content[i] += - alpha * this.deltas[i];
        this.deltas[i] = 0;
      }
    }
  }
}

module.exports = Matrix;
