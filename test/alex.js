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
const Alex = require('../lib/alex');
const Memory = require('../lib/memory');

chai.use(chai_array);
let expect = chai.expect;
let alex = new Alex();

describe('Alex', function () {
  describe('new', function () {
    it('returns a new class instance object', function (done) {
      let alex = new Alex();
      expect(alex).to.be.instanceOf(Alex);
      done();
    });
    it('has a \'memories\' property, that is an array', function (done) {
      expect(alex).to.have.property('memories');
      expect(alex.memories.length).to.be.equal(0);
      done();
    });
  });
  describe('#remember()', function () {
    it('has a method #remember()', function (done) {
      expect(alex).to.have.property('remember').and.be.a('function');
      done();
    });
    it('return a memory object', function (done) {
      expect(alex.remember([0,0], [0])).to.be.instanceOf(Memory);
      done();
    });
    it('appends a Memory to the memories property', function (done) {
      expect(alex.memories.length).to.be.equal(1);
      done();
    });
  });
  describe('#forget_all()', function () {
    it('has a method #forget_all()', function (done) {
      expect(alex).to.have.property('forget_all').and.be.a('function');
      done();
    });
    it('empties the entire memory and sets it to an empty array', function (done) {
      alex.forget_all();
      expect(alex.memories.length).to.be.equal(0);
      done();
    });
  });
  describe('#materialize_memory()', function () {
    it('returns a promise');
    it('resolves when the current memory array is written to disk');
  });
  describe('#learn()', function () {
    it('returns a promise');
    it('resolves when learning is finished, with a history of the learning process');
  });
  describe('#predict()', function () {
    it('accepts an environment state');
    it('returns a promise');
    it('resolves with a predicted action');
  });
  describe('#act()', function () {
    it('accepts an environment state and a function to call');
    it('calls the provided function with a predicted action');
  });
});
