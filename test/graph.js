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
const random = require('random');

chai.use(chai_array);
let expect = chai.expect;
let graph = new Graph(true);
let graph2 = new Graph();
let r = 9;
let c = 12;
let m1 = new Matrix(r, c, true);
let m2 = new Matrix(c, r);
let m3;

function test(o) {
  return Math.round(o * 10) / 10.0;
}

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
      expect(function () { graph.mul(m1, new Matrix(r, c)) })
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
      m3 = graph.mul(m1, m2);
      expect(graph.mul(m1, m2).get(0,0)).to.be.equal(5226);
    });
    it('multiplies a matrix and a scalar together', function () {
      m1.content.fill(1);
      expect(graph.mul(m1, 2).get(0,0)).to.be.equal(2);
    });
  });
  describe('#add()', function () {
    it('has a method #add()', function () {
      expect(graph).to.respondTo('add');
    });
    it('throws an error if dimensions don\'t fit', function () {
      expect(function () { graph.add(m1, new Matrix(c, r)) })
        .to.throw(Error, 'dimensions don\'t fit');
    });
    it('adds two matrices together', function () {
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
  describe('#backward()', function () {
    it('has a method #bacward()', function () {
      expect(graph).to.respondTo('backward');
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
      expect(function () { g.backward() }).to.not.throw();
      expect(out.deltas[0]).to.be.equal(-0.7);
      expect(a1mul.deltas[0]).to.be.equal(-0.7);
      expect(b.deltas[0]).to.be.equal(-0.7);
      expect(w.deltas[0]).to.be.equal(-0.7);
      expect(w.deltas[1]).to.be.equal(-0.7);
    });
  });
  describe('learning', function () {
    it('learns the AND function', function () {
      this.timeout(0);
      let w1 = new Matrix(3, 2); w1.randomize(0, 0.01);
      let b1 = new Matrix(3, 1);
      let w2 = new Matrix(1, 3); w2.randomize(0, 0.01);
      let b2 = new Matrix(1, 1);
      let inputs = [];
      for (let i = 0; i < 4; i++) {
        let d = new Matrix(2,1);
        let o = 0;
        switch (i) {
          case 0: break;
          case 1: d.set(1, 0, 1); break;
          case 2: d.set(0, 0, 1); break;
          case 3: o = 1; d.set(1, 0, 1); d.set(0, 0, 1); break
        }
        inputs.push([o, d]);
      }
      for (let i = 0; i < 60000; i++) {
        let g = new Graph(true);
        let r = random.int(3);
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[r][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        out.deltas[0] = out.get(0,0) - inputs[r][0];
        g.backward();
        // update weights/biases
        w1.update(0.1);
        b1.update(0.1);
        w2.update(0.1);
        b2.update(0.1);
      }
      for (let i = 0; i < inputs.length; i++) {
        let g = new Graph();
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[i][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        expect(test(out.get(0,0))).to.be.equal(inputs[i][0]);
      }
    });
    it('learns the OR function', function () {
      this.timeout(0);
      let w1 = new Matrix(3, 2); w1.randomize(0, 0.01);
      let b1 = new Matrix(3, 1);
      let w2 = new Matrix(1, 3); w2.randomize(0, 0.01);
      let b2 = new Matrix(1, 1);
      let inputs = [];
      for (let i = 0; i < 4; i++) {
        let d = new Matrix(2,1);
        let o = 0;
        switch (i) {
          case 0: break;
          case 1: o = 1; d.set(1, 0, 1); break;
          case 2: o = 1; d.set(0, 0, 1); break;
          case 3: o = 1; d.set(1, 0, 1); d.set(0, 0, 1); break
        }
        inputs.push([o, d]);
      }
      for (let i = 0; i < 60000; i++) {
        let g = new Graph(true);
        let r = random.int(3);
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[r][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        out.deltas[0] = out.get(0,0) - inputs[r][0];
        g.backward();
        // update weights/biases
        w1.update(0.1);
        b1.update(0.1);
        w2.update(0.1);
        b2.update(0.1);
      }
      for (let i = 0; i < inputs.length; i++) {
        let g = new Graph();
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[i][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        expect(test(out.get(0,0))).to.be.equal(inputs[i][0]);
      }
    });
    it('learns the XOR function', function () {
      this.timeout(0);
      let w1 = new Matrix(3, 2); w1.randomize(0, 0.01);
      let b1 = new Matrix(3, 1);
      let w2 = new Matrix(1, 3); w2.randomize(0, 0.01);
      let b2 = new Matrix(1, 1);
      let inputs = [];
      for (let i = 0; i < 4; i++) {
        let d = new Matrix(2,1);
        let o = 0;
        switch (i) {
          case 0: break;
          case 1: o = 1; d.set(1, 0, 1); break;
          case 2: o = 1; d.set(0, 0, 1); break;
          case 3: d.set(1, 0, 1); d.set(0, 0, 1); break
        }
        inputs.push([o, d]);
      }
      for (let i = 0; i < 100000; i++) {
        let g = new Graph(true);
        let r = random.int(3);
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[r][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        out.deltas[0] = out.get(0,0) - inputs[r][0];
        g.backward();
        // update weights/biases
        w1.update(0.3);
        b1.update(0.3);
        w2.update(0.3);
        b2.update(0.3);
      }
      for (let i = 0; i < inputs.length; i++) {
        let g = new Graph();
        let a1mat = g.sigmoid(g.add(g.mul(w1, inputs[i][1]), b1));
        let out = g.sigmoid(g.add(g.mul(w2, a1mat), b2));
        expect(test(out.get(0,0))).to.be.equal(inputs[i][0]);
      }
    });
  });
});
