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
let m1 = new Matrix(r, c, true);
let m2 = new Matrix(c, r);
let m3;

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
  describe('#backprop_mul()', function () {
    it('has a method #backprop_mul()', function () {
      expect(graph).to.respondTo('backprop_mul');
    });
    it('runs without an error', function () {
      expect(graph.backprop_mul(m1, m2, m3)).to.be.undefined;
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
  describe('#backprop_add()', function () {
    it('has a method #backprop_add()', function () {
      expect(graph).to.respondTo('backprop_add');
    });
    it('runs without an error', function () {
      expect(graph.backprop_add(m1, m2, m3)).to.be.undefined;
    });
  });
  describe('#sigmoid', function () {
    it('has a method #sigmoid()', function () {
      expect(graph).to.respondTo('sigmoid');
    });
    it('applies the sigmoid function to all elements', function () {
      expect(graph.sigmoid(m1).get(0, 0)).and.be.equal(1.0/(1+Math.exp(-1)));
    });
  });
  describe('#backprop_sigmoid', function () {
    it('has a method #backprop_sigmoid()', function () {
      expect(graph).to.respondTo('backprop_sigmoid');
    });
    it('runs without an error', function () {
      expect(graph.backprop_sigmoid(m1, m2)).to.be.undefined;
    });
  });
});
