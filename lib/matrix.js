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
    let m1 = this; // saving this to use in promise
    return new Promise(function (resolve, reject) {
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
        resolve(m3);
      }
      else if (typeof(m2) === 'number') {
        let m3 = new Matrix(m1.rows, m1.columns);
        let l = m1.content.length
        for (let i = 0; i < l; i++) {
          m3.content[i] = m1.content[i] * m2;
        }
        resolve(m3);
      }
      else {
        reject(new Error('dimensions misalinged'));
      }
    });
  }

  add(m2) {
    let m1 = this;
    return new Promise(function (resolve, reject) {
      if (m1.rows === m2.rows && m1.columns === m2.columns) {
        let m3 = new Matrix(m2.rows, m2.columns);
        let n = m1.content.length;
        for (let i = 0; i < n; i++) {
          m3.content[i] = m1.content[i] + m2.content[i];
        }
        resolve(m3);
      }
      else {
        reject(new Error('dimensions don\'t fit'));
      }
    });
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

  update() {
  }

  copy() {
    return Matrix.load(this.save());
  }

  weighted_sums() {
  }
}

module.exports = Matrix;
