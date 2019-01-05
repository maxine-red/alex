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

let chai = require('chai');
let chai_array = require('chai-arrays');
const Graph = require('../lib/graph');
const Matrix = require('../lib/matrix');

chai.use(chai_array);
let expect = chai.expect;
let graph = new Graph(true);
let graph2 = new Graph();
let r = 9;
let c = 12;
let m1 = new Matrix(r, c);
let m2 = new Matrix(c, r);

describe('Graph', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      expect(new Graph()).to.be.instanceOf(Graph);
    });
    it('has a \'backprop\' property, that is an array', function () {
      expect(graph).to.have.property('backprop')
        .and.be.array().and.be.ofSize(0);
    });
    it('has a \'needs_backprop\' property, that is true/false', function () {
      expect(graph).to.have.property('needs_backprop').and.be.true;
      expect(graph2).to.have.property('needs_backprop').and.be.false;
    });
  });
  describe('#mul()', function () {
    it('has a method #mul()', function () {
      expect(graph).to.respondTo('mul');
    });
    it('throws an error if dimensions don\'t fit', function () {
      expect(function () { graph.mul(m1, new Matrix(r, c)); })
        .to.throw(Error, 'dimensions misalinged');
    });
    it('multiplies two matrices together', function () {
      let o = 0;
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
          m1.set(i, j, ++o);
        }
      }
      o = 0;
      for (let i = 0; i < c; i++) {
        for (let j = 0; j < r; j++) {
          m2.set(i, j, ++o);
        }
      }
      expect(graph.mul(m1, m2).get(0,0)).to.be.equal(5226);
    });
  });
  describe('#add()', function () {
    it('has a method #add()', function () {
      expect(graph).to.respondTo('add');
    });
    it('throws an error if dimensions don\'t fit', function () {
      expect(function () { graph.add(m1, new Matrix(c, r)); })
        .to.throw(Error, 'dimensions don\'t fit');
    });
    it('add two matrices together', function () {
      let m2 = new Matrix(r, c);
      m2.content.fill(1);
      expect(graph.add(m1, m2).get(0,0)).to.be.equal(2);
    });
  });
  describe('#sigmoid()', function () {
    it('has a method #sigmoid()', function () {
      expect(graph).to.respondTo('sigmoid');
    });
    it('applies the sigmoid function to all elements', function () {
      expect(graph.sigmoid(m1).get(0, 0)).and.be.equal(1.0/(1+Math.exp(-1)));
    });
  });
  describe('#tanh()', function () {
    it('has a method #tanh()', function () {
      expect(graph).to.respondTo('tanh');
    });
    it('applies the tanh function to all elements', function () {
      expect(graph2.tanh(m1).get(0, 0)).and.be.equal(Math.tanh(1));
      expect(graph.tanh(m1).get(0, 0)).and.be.equal(Math.tanh(1));
    });
  });
  describe('#relu()', function () {
    it('has a method #sigmoid()', function () {
      expect(graph).to.respondTo('sigmoid');
    });
    it('applies the relu function to all elements', function () {
      expect(graph.relu(m1).get(0, 0)).and.be.equal(1);
      expect(graph2.relu(m1).get(0, 0)).and.be.equal(1);
    });
  });
  describe('#backward()', function () {
    it('has a method #bacward()', function () {
      expect(graph).to.respondTo('backward');
    });
    it('runs add backward correctly', function () {
      graph.backprop = [];
      let m3 = graph.add(m1, new Matrix(r, c));
      m3.deltas[0] = 1;
      graph.backward();
      expect(m1.deltas[0]).to.be.eql(1);
    });
    it('runs mul backward correctly', function () {
      m1.deltas.fill(0);
      let m3 = graph.mul(m1, m2);
      m3.deltas[0] = 1;
      graph.backward();
      expect(m1.deltas[0]).to.be.eql(1);
    });
    it('runs sigmoid backward correctly', function () {
      m1.deltas.fill(0);
      let m2 = graph.sigmoid(m1);
      m2.deltas[0] = 1;
      graph.backward();
      let o = 0.7310585786300049;
      expect(m1.deltas[0]).to.be.eql(o * (1 - o) * 1);
    });
    it('runs tanh backward correctly', function () {
      m1.deltas.fill(0);
      let m2 = graph.tanh(m1);
      m2.deltas[0] = 1;
      graph.backward();
      let o = Math.tanh(1);
      expect(m1.deltas[0]).to.be.eql((1.0 - o * o) * 1);
    });
    it('runs relu backward correctly', function () {
      m1.deltas.fill(0);
      m1.content[2] = 0;
      let m2 = graph.relu(m1);
      m2.deltas[0] = 1;
      graph.backward();
      m1.content[2] = 1;
      expect(m1.deltas[0]).to.be.eql(1);
    });
    it('runs all forward operations backward, without error', function () {
      let g = new Graph(true);
      let w = new Matrix(1, 2);
      w.content.fill(0.1);
      let b = new Matrix(1, 1);
      b.content.fill(0.1);
      let input = new Matrix(2, 1);
      input.content.fill(1);
      let a1mul = g.mul(w, input);
      let out = g.add(a1mul, b);
      out.deltas[0] = out.content - 1;
      expect(function () { g.backward(); }).to.not.throw();
      expect(out.deltas[0]).to.be.equal(-0.7);
      expect(a1mul.deltas[0]).to.be.equal(-0.7);
      expect(b.deltas[0]).to.be.equal(-0.7);
      expect(w.deltas[0]).to.be.equal(-0.7);
      expect(w.deltas[1]).to.be.equal(-0.7);
    });
  });
});
