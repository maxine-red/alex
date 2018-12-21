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

const Matrix = require('./matrix');

/*
 * Code used here is partially from the project refinforcejs.
 * You can find the original code under: https://github.com/karpathy/reinforcejs
 * It is licensed under MIT, but will be relicensed under GPLv3 in this project.
 */

/**
 * Graph class
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class Graph {

  /**
   * Contructor for Network layers
   * Handles Matrix contruction
   * @author Maxine Michalski
   * @constructor
   */
  constructor(needs_backprop = false) {
    this.backprop = [];
    this.needs_backprop = needs_backprop;
  }

  mul(m1, m2) {
    if (m2 instanceof Matrix && m1.columns === m2.rows) {
      let m3 = new Matrix(m1.rows, m2.columns);
      let rows = m1.rows;
      let cols = m2.columns;
      let same = m1.columns;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let dot = 0;
          for (let k = 0; k < same; k++) {
            dot += m1.content[same * i + k] * m2.content[cols * k + j];
          }
          m3.content[cols * i + j] = dot;
        }
      }
      if (this.needs_backprop) {
        this.backprop.push(this.backprop_mul(m1, m2, m3));
      }
      return m3;
    }
    else if (typeof(m2) === 'number') {
      let m3 = new Matrix(m1.rows, m1.columns);
      let l = m1.content.length
      for (let i = 0; i < l; i++) {
        m3.content[i] = m1.content[i] * m2;
      }
      return m3
    }
    else {
      throw new Error('dimensions misalinged');
    }
  }

  backprop_mul(m1, m2, m3) {
    let rows = m1.rows;
    let cols = m2.columns;
    let same = m1.columns;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        for (let k = 0; k < same; k++) {
          let b = m3.deltas[cols * i + j];
          m1.deltas[same * i + k] += m2.content[cols * k + j] * b;
          m2.deltas[cols * k + j] += m1.content[same * i + k] * b;
        }
      }
    }
  }

  add(m1, m2) {
    if (m1.rows === m2.rows && m1.columns === m2.columns) {
      let m3 = new Matrix(m2.rows, m2.columns);
      let n = m1.content.length;
      for (let i = 0; i < n; i++) {
        m3.content[i] = m1.content[i] + m2.content[i];
      }
      if (this.needs_backprop) {
        this.backprop.push(this.backprop_add(m1, m2, m3));
      }
      return m3;
    }
    else {
      throw new Error('dimensions don\'t fit');
    }
  }
  
  backprop_add(m1, m2, m3) {
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m1.deltas[i] += m3.deltas[i];
      m2.deltas[i] += m3.deltas[i];
    }
  }

  /*get tanh() {
    let m2 = new Matrix(this.rows, this.columns);
    let n = this.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.tanh(this.content[i]);
    }
    return m2;
  }*/

  sigmoid(m1) {
    let m2 = new Matrix(m1.rows, m1.columns);
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = 1.0 / (1 + Math.exp(-m1.content[i]));
    }
    if (this.needs_backprop) {
      this.backprop.push(this.backprop_sigmoid(m1, m2));
    }
    return m2;
  }

  backprop_sigmoid(m1, m2) {
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      let o = m2.content[i];
      m1.deltas[i] += o * (1.0 - o) * m2.deltas[i];
    }
  }

  /*get relu() {
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
  }*/
}

module.exports = Graph;
