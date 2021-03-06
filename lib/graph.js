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
   * @param {Boolean} needs_backprop - An indicator if this graph needs
   * backpropagation or not
   * @constructor
   */
  constructor(needs_backprop = false) {
    this.backprop = [];
    this.needs_backprop = needs_backprop;
  }

  /**
   * A method to backpropagate through a network
   * @author Maxine Michalski
   * @returns {undefined}
   */
  backward() {
    for (let i = this.backprop.length - 1; i>= 0; i--) {
      this.backprop[i]();
    }
    this.backprop = [];
  }

  /**
   * Matrix multiplication
   * @author Maxine Michalski
   * @param {Matrix} m1 - First matrix to multiplicate
   * @param {Matrix} m2 - Second matrix to multiplicate
   * @returns {Matrix} - product of the two matrices
   */
  mul(m1, m2) {
    if (!(m2 instanceof Matrix && m1.columns === m2.rows)) {
      throw new Error('dimensions misalinged');
    }
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
      this.backprop.push(() => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            for (let k = 0; k < same; k++) {
              let b = m3.deltas[cols * i + j];
              m1.deltas[same * i + k] += m2.content[cols * k + j] * b;
              m2.deltas[cols * k + j] += m1.content[same * i + k] * b;
            }
          }
        }
      });
    }
    return m3;
  }

  /**
   * Adds two matrices together
   * @author Maxine Michalski
   * @param {Matrix} m1 - First matrix to add
   * @param {Matrix} m2 - Second matrix to add
   * @returns {Matrix} - sum of the two matrices
   */
  add(m1, m2) {
    if (!(m1.rows === m2.rows && m1.columns === m2.columns)) {
      throw new Error('dimensions don\'t fit');
    }
    let m3 = new Matrix(m2.rows, m2.columns);
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m3.content[i] = m1.content[i] + m2.content[i];
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          m1.deltas[i] += m3.deltas[i];
          m2.deltas[i] += m3.deltas[i];
        }
      });
    }
    return m3;
  }
 
  /**
   * A method to apply the sigmoid (softstep) function on a matrix
   * @author Maxine Michalski
   * @param {Matrix} m1 - Matrix to apply sigmoid on
   * @returns {Matrix} - sigmoid applied matrix
   */
  sigmoid(m1) {
    let m2 = new Matrix(m1.rows, m1.columns);
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = 1.0 / (1 + Math.exp(-m1.content[i]));
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          let o = m2.content[i];
          m1.deltas[i] = o * (1.0 - o) * m2.deltas[i];
        }
      });
    }
    return m2;
  }

  /**
   * A method to apply the tanh function on a matrix
   * @author Maxine Michalski
   * @param {Matrix} m1 - Matrix to apply tanh on
   * @returns {Matrix} - tanh applied matrix
   */
  tanh(m1) {
    let m2 = new Matrix(m1.rows, m1.columns);
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.tanh(m1.content[i]);
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          let o = m2.content[i];
          m1.deltas[i] = (1.0 - o * o) * m2.deltas[i];
        }
      });
    }
    return m2;
  }

  /**
   * A method to apply the relu function on a matrix
   * @author Maxine Michalski
   * @param {Matrix} m1 - Matrix to apply sigmoid on
   * @returns {Matrix} - relu applied matrix
   */
  relu(m1) {
    let m2 = new Matrix(m1.rows, m1.columns);
    let n = m1.content.length;
    for (let i = 0; i < n; i++) {
      m2.content[i] = Math.max(0, m1.content[i]);
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          m1.deltas[i] = m1.content[i] > 0 ? m2.deltas[i] : 0.0;
        }
      });
    }
    return m2;
  }
}

module.exports = Graph;
