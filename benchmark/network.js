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
const Benchmark = require('benchmark');
const Network = require('../lib/network');

let suite = new Benchmark.Suite;

let u = 64;

suite.add('learning AND', function () {
  let net = new Network();
  net.add({inputs: 2, units: u, activation: 'sigmoid'});
  net.add({units: 1, activation: 'sigmoid'});
  let params = {
    inputs: [[0,0], [0,1], [1,0], [1,1]],
    outputs: [[0], [0], [0], [1]],
    epochs: 100000
  };
  net.train(params);
}).add('learning OR', function () {
  let net = new Network();
  net.add({inputs: 2, units: u, activation: 'sigmoid'});
  net.add({units: 1, activation: 'sigmoid'});
  let params = {
    inputs: [[0,0], [0,1], [1,0], [1,1]],
    outputs: [[0], [1], [1], [1]],
    epochs: 100000
  };
  net.train(params);
}).add('learning NAND', function () {
  let net = new Network();
  net.add({inputs: 2, units: u, activation: 'sigmoid'});
  net.add({units: 1, activation: 'sigmoid'});
  let params = {
    inputs: [[0,0], [0,1], [1,0], [1,1]],
    outputs: [[1], [1], [1], [0]],
    epochs: 100000
  };
  net.train(params);
}).add('learning XOR', function () {
  let net = new Network();
  net.add({inputs: 2, units: u, activation: 'sigmoid'});
  net.add({units: 1, activation: 'sigmoid'});
  let params = {
    inputs: [[0,0], [0,1], [1,0], [1,1]],
    outputs: [[0], [1], [1], [0]],
    epochs: 100000
  };
  net.train(params);
}).on('cycle', function (event) {
  console.log(event.target.name, ': ',
    Math.round(event.target.stats.mean * 1000000) / 1000, 'ms');
}).on('complete', function () {
  let mean = 0;
  for (let i of this.map('stats')) {
    mean += i.mean;
  }
  mean /= 4;
  console.log('Average: ', Math.round(mean * 1000000) / 1000, 'ms');
}).run({async: true});
