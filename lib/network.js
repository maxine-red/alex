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
const Graph = require('./graph');

/**
 * A class to handle neural networks.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 */
class NeuralNetwork {

  /**
   * Constructor Models
   * This method takes care of general model creation.
   * @author Maxine Michalski
   * @constructor
   */
  constructor(alpha = 0.1) {
    this.layers = [];
    this.alpha = alpha;
  }

  add(layer) {
    let last = this.layers[this.layers.length - 1];
    if (layer.hasOwnProperty('inputs') && last !== undefined) {
      throw new Error('inputs can only be set for input layers');
    }
    if (last !== undefined) {
      layer.inputs = last.b.rows;
    }
    let w = new Matrix(layer.units, layer.inputs);
    let b = new Matrix(layer.units, 1);
    w.randomize(layer.activation !== 'relu' ? 0 : 0.1, 0.01);
    this.layers.push({
      w: w,
      b: b,
      out: undefined,
      activation: layer.activation
    });
  }
  
  run(inputs) {
    let outputs = new Matrix(inputs.length, 1);
    for (let i = 0; i < inputs.length; i++) {
      outputs.set(i, 0, inputs[i]);
    }
    let g = new Graph();
    for (let l of this.layers) {
      outputs = g[l.activation](g.add(g.mul(l.w, outputs), l.b));
    }
    return outputs;
  }

  train(params) {
    if (!(params.hasOwnProperty('inputs') &&
      params.hasOwnProperty('outputs') &&
      params.hasOwnProperty('epochs'))) {
      throw new Error('important parameter(s) missing, please study documentation for more information');
    }
    let g = new Graph(true); // Graph with backpropagation
    let data = [];
    for (let i = 0; i < params.inputs.length; i++) {
      let m_i = new Matrix(params.inputs[i].length, 1);
      let m_o = new Matrix(params.outputs[i].length, 1);
      for (let e = 0; e < params.inputs.length; e++) {
        m_i.set(e, 0, params.inputs[i][e])
      }
      for (let e = 0; e < params.outputs.length; e++) {
        m_o.set(e, 0, params.outputs[i][e])
      }
      data.push([m_i, m_o]);
    }
    for (let epoch = 0; epoch < params.epochs; epoch++) {
      let d = data[Math.floor(Math.random() * data.length)];
      for (let i = 0; i < this.layers.length; i++) {
        let l = this.layers[i];
        l.out = g[l.activation](g.add(g.mul(l.w,
          i !== 0 ? this.layers[i-1].out : d[0]), l.b));
      }
      let out = this.layers[this.layers.length - 1].out;
      for (let o = 0; o < out.deltas.length; o++) {
        out.deltas[o] = out.get(o,0) - d[1].get(o,0);
      }
      g.backward()
      for (let l of this.layers) {
        l.w.update(this.alpha);
        l.b.update(this.alpha);
      }
    }
  }
}

module.exports = NeuralNetwork;
