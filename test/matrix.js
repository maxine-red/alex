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
let chai_promises = require('chai-as-promised');
const Matrix = require('../lib/matrix');

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;

let matrix = new Matrix(5, 6);

describe('Matrix', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      expect(new Matrix()).to.be.instanceOf(Matrix);
    });
    it('has a \'rows\' property, that is a number', function () {
      expect(matrix).to.have.property('rows')
        .and.be.a('number').and.be.equal(5);
    });
    it('has a \'columns\' property, that is a number', function () {
      expect(matrix).to.have.property('columns').and.be.a('number')
        .and.be.equal(6);
    });
    it('has a \'content\' property, that is a Float64Array objec', function () {
      expect(matrix).to.have.property('content')
        .and.be.instanceOf(Float64Array);
    });
  });
  describe('#randomize()', function () {
    it('has a method #randomize()', function () {
      expect(matrix).to.respondTo('randomize');
    });
    it('accepts two numbers and returns a randomly filled Float64Array', function () {
      expect(matrix.randomize(0, 0.01)).to.be.instanceOf(Float64Array);
    });
  });
  describe('#get()', function () {
    it('has a method #get()', function () {
      expect(matrix).to.respondTo('get');
    });
    it('accepts two numbers and returns the number both indeces point to in matrix', function () {
      expect(matrix.get(3,4)).to.be.a('number')
        .and.be.equal(matrix.content[3 * matrix.columns + 4]);
    });
  });
  describe('#set()', function () {
    it('has a method #set()', function () {
      expect(matrix).to.respondTo('set');
    });
    it('sets the value of cell that indices point to', function () {
      expect(matrix.set(3, 4, 5)).to.be.undefined;
      expect(matrix.get(3, 4)).to.be.a('number').and.be.equal(5);
    });
  });
  describe('#row()', function () {
    it('has a method #row()', function () {
      expect(matrix).to.respondTo('row');
    });
    it('accepts a number and returns the corresponding row', function () {
      expect(matrix.row(3)).to.be.instanceOf(Float64Array)
        .and.be.ofSize(matrix.columns);
      expect(matrix.row(3)[4]).to.be.a('number').and.be.equal(5);
    });
  });
  describe('#column()', function () {
    it('has a method #column()', function () {
      expect(matrix).to.respondTo('column');
    });
    it('accepts a number and returns the corresponding column', function () {
      expect(matrix.column(4)).to.be.instanceOf(Float64Array)
        .and.be.ofSize(matrix.rows);
      expect(matrix.column(4)[3]).to.be.a('number').and.be.equal(5);
    });
  });
  /*describe('#save()', function () {
    it('has a method #save()', function () {
      expect(matrix).to.respondTo('save');
    });
    it('returns a JSON representation of the current matrix', function () {
      expect(matrix.save()).to.be.a('object').and.have.property('activations_count').and.be.equal(5);
      expect(matrix.save()).to.have.property('inputs_count').and.be.equal(6);
      expect(matrix.save()).to.have.property('weights').and.be.containingAllOf(layer.weights);
    });
  });
  describe('.load()', function () {
    it('has a method .load()', function () {
      expect(Layer).itself.to.respondTo('load');
    });
    it('returns a Layer object', function () {
      let l = Layer.load(matrix.save());
      expect(l).to.be.instanceOf(Layer);
      expect(l).to.have.property('activations_count').and.be.equal(5);
      expect(l).to.have.property('inputs_count').and.be.equal(6);
      // no better comparison possible
      expect(l).to.have.property('weights')
      expect(l.weights[0]).to.be.equal(matrix.weights[0]);
    });
  });
  describe('#update()', function () {
    it('has a method #update()', function () {
      expect(matrix).to.respondTo('update');
    });
    it('updates a matrix\'s weights', function () {
      matrix.delta_weights[0] = 1;
      let old_weight = matrix.weights[0];
      expect(matrix.update(0.1)).to.be.undefined;
      expect(matrix.weights[0]).to.be.equal(old_weight - 0.1);
    });
  });
  describe('#copy()', function () {
    it('has a method #copy()', function () {
      expect(matrix).to.respondTo('copy');
    });
    it('returns a new Layer, that is a copy if the current matrix', function () {
      let l = matrix.copy();
      expect(l).to.not.be.equal(matrix);
      expect(l).to.be.instanceOf(Layer);
      expect(l).to.have.property('activations_count').and.be.equal(5);
      expect(l).to.have.property('inputs_count').and.be.equal(6);
      // no better comparison possible
      expect(l).to.have.property('weights')
      expect(l.weights[0]).to.be.equal(matrix.weights[0]);
    });
  });
  describe('#weighted_sums()', function () {
    it('has a method #weighted_sums()', function () {
      expect(matrix).to.respondTo('weighted_sums');
    });
    it('returns a promise, that eventually resolves into a column vector'/*, function () {
      return expect(matrix.weighted_sums()).to.be.instanceOf(Promise)
        .and.eventually.be.instanceOf(Float64Array).and.be.ofSize(6);
    });
  });*/
});
