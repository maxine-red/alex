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
   * Contructor for Matrices
   * Handles Matrix contruction
   * @author Maxine Michalski
   * @constructor
   */
  constructor(n, d) {
    this.n = n;
    this.d = d;
    this.weights = new Float64Array(n * d);
    this.delta_weights = new Float64Array(n * d);
  }

  init(mu, std) {
    let normal = random.normal(mu, std);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = normal();
    }
    return this.weights;
  }
}

module.exports = Matrix;
