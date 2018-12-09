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
const Memory = require('../lib/memory');

chai.use(chai_array);
let expect = chai.expect;
let memory = new Memory([0,0], [0]);

// This should become an abstract like class to derive other, more special,
// memory classes from.

// TODO: Don't forget to add another descriptor to what model type a memory type
// blongs to. (in the memory test files)

describe('Memory', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Memory([0,0], [0])).to.be.instanceOf(Memory);
    });
    it('accepts an object instead of arrays', function (done) {
      expect(new Memory({state: [0,0], action: [0], created_at: 1540000000})).to.be.instanceOf(Memory);
      expect(new Memory(JSON.parse(JSON.stringify(memory)))).to.be.instanceOf(Memory);
      expect(new Memory({state: [0,0], action: [0]})).to.be.instanceOf(Memory);
      done();
    });
    it('throws an error if object misses state or action', function (done) {
      expect(function () { new Memory({state: [0,0]}); }).to.throw(Error, 'memory objects require a state and action property');
      expect(function () { new Memory({action: [0]}); }).to.throw(Error, 'memory objects require a state and action property');
      done();
    });
    it('throws an error on undefined behavior', function () {
      return expect(function () { new Memory({state: [0,0], action: [0]}, [0]); }).to.throw(Error, 'unknown error');
    });
    it('throws an error if neither state nor action is given', function () {
      return expect(function () { new Memory(); }).to.throw(Error, 'no state or action provided');
    });
    it('throws an error if an action is expected but not given', function () {
      return expect(function () { new Memory([0, 0] ); }).to.throw(Error, 'action expected, but not provided');
    });
    it('has a \'created_at\' property, that is a UNIX timestamp', function () {
      return expect(memory).to.have.property('created_at').and.be.above(1540000000);
    });
    it('has a \'state\' property, that is an array of numbers', function (done) {
      expect(memory).to.have.property('state');
      expect(memory.state[0]).to.be.equal(0);
      done();
    });
    it('has an \'action\' property, that is an array of numbers', function (done) {
      expect(memory).to.have.property('action');
      expect(memory.action[0]).to.be.equal(0);
      done();
    });
    it('throws an error if the state size is incorrect', function () {
      return expect(function () { new Memory([0], [0]); }).to.throw(Error, 'State size mismatch:');
    });
    it('throws an error if the state is not only made up of numbers', function () {
      return expect(function () { new Memory([[0,0],[0,0]], [0]); }).to.throw(Error, 'numbers only');
    });
    it('throws an error if the action size is incorrect', function () {
      return expect(function () { new Memory([0, 0], [0,0]); }).to.throw(Error, 'Action size mismatch:');
    });
    it('throws an error if the action is not only made up of numbers', function () {
      return expect(function () { new Memory([0, 0], [true]); }).to.throw(Error, 'numbers only');
    });
  });
});
