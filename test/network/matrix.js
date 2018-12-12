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
const Matrix = require('../../lib/network/matrix');

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;

let matrix = new Matrix(5, 6);

describe('Matrix', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Matrix()).to.be.instanceOf(Matrix);
    });
    it('has a \'n\' property, that is a number', function () {
      return expect(matrix).to.have.property('n').and.be.a('number')
        .and.be.equal(5);
    });
    it('has a \'d\' property, that is a number', function () {
      return expect(matrix).to.have.property('d').and.be.a('number')
        .and.be.equal(6);
    });
    it('has a \'weights\' property, that is a Float64Array objec', function () {
      return expect(matrix).to.have.property('weights')
        .and.be.instanceOf(Float64Array);
    });
    it('has a \'delta_weights\' property, that is a Float64Array objec', function () {
      return expect(matrix).to.have.property('delta_weights')
        .and.be.instanceOf(Float64Array);
    });
  });
  describe('#init()', function () {
    it('has a method #init()', function () {
      return expect(matrix).to.respondTo('init');
    });
    it('accepts two numbers and returns a randomly filled Float64Array', function () {
      return expect(matrix.init(0, 0.01)).to.be.instanceOf(Float64Array);
    });
  });
});
