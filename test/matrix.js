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
const Matrix = require('../lib/matrix');

chai.use(chai_array);
let expect = chai.expect;
let r = 9;
let c = 12;
let matrix = new Matrix(r, c);

describe('Matrix', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      expect(new Matrix()).to.be.instanceOf(Matrix);
    });
    it('has a \'rows\' property, that is a number', function () {
      expect(matrix).to.have.property('rows')
        .and.be.a('number').and.be.equal(r);
    });
    it('has a \'columns\' property, that is a number', function () {
      expect(matrix).to.have.property('columns').and.be.a('number')
        .and.be.equal(c);
    });
    it('has a \'content\' property, that is a Float64Array objec', function () {
      expect(matrix).to.have.property('content')
        .and.be.instanceOf(Float64Array);
    });
    it('has a \'deltas\' property, that is a Float64Array objec', function () {
      expect(matrix).to.have.property('deltas').and.be.instanceOf(Float64Array);
    });
    it('has a \'backprop\' property, that is an array objec', function () {
      expect(matrix).to.have.property('backprop').and.be.array();
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
  describe('#mul()', function () {
    it('has a method #mul()', function () {
      expect(matrix).to.respondTo('mul');
    });
    it('throws an error if dimensions don\'t fit', function () {
      expect(function () { matrix.mul(new Matrix(r, c)) })
        .to.be.throw(Error, 'dimensions misalinged');
    });
    it('multiplies two matrices together', function () {
      let m2 = new Matrix(c, r);
      let o = 0;
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
          matrix.set(i, j, ++o);
        }
      }
      o = 0;
      for (let i = 0; i < c; i++) {
        for (let j = 0; j < r; j++) {
          m2.set(i, j, ++o);
        }
      }
      expect(matrix.mul(m2).get(0,0)).to.be.equal(5226);
    });
    it('multiplies a matrix and a scalar together', function () {
      matrix.content.fill(1);
      expect(matrix.mul(2).get(0,0)).to.be.equal(2);
    });
  });
  describe('#add()', function () {
    it('has a method #add()', function () {
      expect(matrix).to.respondTo('add');
    });
    it('throws an error if dimensions don\'t fit', function () {
      expect(function () { matrix.add(new Matrix(c, r)) })
        .to.throw(Error, 'dimensions don\'t fit');
    });
    it('adds two matrices together', function () {
      let m2 = new Matrix(r, c);
      m2.content.fill(1);
      expect(matrix.add(m2).get(0,0)).to.be.equal(2);
    });
  });
  describe('#tanh', function () {
    it('has a method #tanh', function () {
      expect(matrix).to.have.property('tanh');
    });
    it('applies the tanh function to all elements', function () {
      expect(matrix.tanh.get(0, 0)).and.be.equal(Math.tanh(1));
    });
  });
  describe('#save()', function () {
    it('has a method #save()', function () {
      expect(matrix).to.respondTo('save');
    });
    it('returns a JSON representation of the current matrix', function () {
      expect(matrix.save()).to.be.a('object').and.have.property('rows')
        .and.be.equal(r);
      expect(matrix.save()).to.have.property('columns').and.be.equal(c);
      expect(matrix.save()).to.have.property('content')
        .and.be.containingAllOf(matrix.content);
    });
  });
  describe('.load()', function () {
    it('has a method .load()', function () {
      expect(Matrix).itself.to.respondTo('load');
    });
    it('returns a Matrix object', function () {
      let l = Matrix.load(JSON.parse(JSON.stringify(matrix.save())));
      expect(l).to.be.instanceOf(Matrix);
      expect(l).to.have.property('rows').and.be.equal(r);
      expect(l).to.have.property('columns').and.be.equal(c);
      // no better comparison possible
      expect(l).to.have.property('content').and.containing(matrix.content[0]);
    });
  });
  describe('#copy()', function () {
    it('has a method #copy()', function () {
      expect(matrix).to.respondTo('copy');
    });
    it('returns a new Matrix, that is a copy if the current matrix', function () {
      let l = matrix.copy();
      expect(l).to.not.be.equal(matrix);
      expect(l).to.be.instanceOf(Matrix);
      expect(l).to.have.property('rows').and.be.equal(r);
      expect(l).to.have.property('columns').and.be.equal(c);
      // no better comparison possible
      expect(l).to.have.property('content').and.containing(matrix.content[0]);
    });
  });
});
