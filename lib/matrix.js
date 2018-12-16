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
 * Layer class
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
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.content = new Float64Array(rows * columns);
    this.deltas = new Float64Array(rows * columns);
    this.backprop = [];
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

  mul(m2) {
    if (m2 instanceof Matrix && this.columns === m2.rows) {
      let m3 = new Matrix(this.rows, m2.columns);
      let rows = this.rows;
      let cols = m2.columns;
      let same = this.columns;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let dot = 0;
          for (let k = 0; k < same; k++) {
            dot += this.content[same * i + k] * m2.content[cols * k + j];
          }
          m3.content[cols * i + j] = dot;
        }
      }
      return m3;
    }
    else if (typeof(m2) === 'number') {
      let m3 = new Matrix(this.rows, this.columns);
      let l = this.content.length
      for (let i = 0; i < l; i++) {
        m3.content[i] = this.content[i] * m2;
      }
      return m3
    }
    else {
      throw new Error('dimensions misalinged');
    }
  }

  add(m2) {
    if (this.rows === m2.rows && this.columns === m2.columns) {
      let m3 = new Matrix(m2.rows, m2.columns);
      let n = this.content.length;
      for (let i = 0; i < n; i++) {
        m3.content[i] = this.content[i] + m2.content[i];
      }
      return m3;
    }
    else {
      throw new Error('dimensions don\'t fit');
    }
  }

  get tanh() {
    let m2 = new Matrix(this.rows, this.columns);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.tanh(this.content[i]);
    }
    return m2;
  }

  get sigmoid() {
    let m2 = new Matrix(this.rows, this.columns);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = 1.0 / (1 + Math.exp(-this.content[i]));
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
}

module.exports = Matrix;
