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
class Layer {

  /**
   * Contructor for Network layers
   * Handles Matrix contruction
   * @author Maxine Michalski
   * @constructor
   */
  constructor(inputs, activations) {
    this.activations_count = activations;
    this.activations = new Float64Array(activations);
    this.inputs_count = inputs;
    this.inputs = new Float64Array(inputs);
    this.weights = new Float64Array(activations * inputs);
    this.delta_weights = new Float64Array(activations * inputs);
    this.biases = new Float64Array(activations);
  }

  init(mu, std) {
    let normal = random.normal(mu, std);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = normal();
    }
    for (let i = 0; i < this.biases.length; i++) {
      this.biases[i] = normal();
    }
    return [this.weights, this.biases];
  }

  save() {
    return {
      activations_count: this.activations_count,
      inputs_count: this.inputs_count,
      weights: this.weights
    }
  }

  static load(json) {
    let l = new Layer(json.inputs_count, json.activations_count);
    l.weights = new Float64Array(json.weights);
    return l;
  }

  update(alpha) {
    let activations_count = this.activations_count * this.inputs_count;
    for (let i = 0; i < activations_count; i++) {
      if (this.delta_weights[i] !== 0) {
        this.weights[i] -= alpha * this.delta_weights[i];
      }
    }
    this.delta_weights.fill(0);
  }

  copy() {
    return Layer.load(this.save());
  }

  weighted_sums() {
    let l = this; // saving reference to object
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
}

module.exports = Layer;
