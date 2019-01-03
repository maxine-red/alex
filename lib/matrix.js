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
   * @constructor
   */
  constructor(rows, columns, needs_backprop = false) {
    this.rows = rows;
    this.columns = columns;
    this.content = new Float64Array(rows * columns);
    this.deltas = new Float64Array(rows * columns);
  }

  randomize(mu, std) {
    let normal = random.normal(mu, std);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      this.content[i] = normal();
    }
    return this.content;
  }
  
  get(row, col) {
    return this.content[row * this.columns + col];
  }
  
  set(row, col, val) {
    this.content[row * this.columns + col] = val;
  }

  row(r) {
    return this.content.subarray(r * this.columns, (r + 1) * this.columns);
  }

  column(c) {
    let col = new Float64Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      col[i] = this.content[i * this.columns + c];
    }
    return col;
  }

  get tanh() {
    let m2 = new Matrix(this.rows, this.columns);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.tanh(this.content[i]);
    }
    return m2;
  }

  get relu() {
    let m2 = new Matrix(this.rows, this.columns);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.max(0, this.content[i]);
    }
    return m2;
  }

  save() {
    return {
      rows: this.rows,
      columns: this.columns,
      content: this.content
    }
  }

  static load(json) {
    let matrix = new Matrix(json.rows, json.columns);
    for (let i in json.content) {
      matrix.content[parseInt(i)] = json.content[i];
    }
    return matrix;
  }

  copy() {
    return Matrix.load(this.save());
  }

  update(alpha) {
    let n = this.content.length
    for (let i = 0; i < n; i++) {
      if (this.deltas[i] !== 0) {
        this.content[i] += - alpha * this.deltas[i];
        this.deltas[i] = 0;
      }
    }
  }
}

module.exports = Matrix;
