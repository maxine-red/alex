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

/*let chai = require('chai');
let chai_array = require('chai-arrays');
const Memory = require('../lib/memory');

chai.use(chai_array);
let expect = chai.expect;
let memory = new Memory({state: [0, 0], action: 0});

describe('Memory', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Memory({state:[0,0], action: 0})).to.be
        .instanceOf(Memory);
    });
    it('throws an error if memory is undefined', function () {
      return expect(function () { new Memory(); }).to
        .throw(Error, 'memory not an object!');
    });
    it('throws an error if memory is not an object', function () {
      return expect(function () { new Memory([]); }).to
        .throw(Error, 'memory not an object!');
    });
    it('throws an error if object misses state', function () {
      return expect(function () { new Memory({action: 0}); })
        .to.throw(Error, 'memory objects require a state and action property');
    });
    it('throws an error if object misses action', function () {
      return expect(function () { new Memory({state: [0,0]}); }).to.throw(Error, 'memory objects require a state and action property');
    });
    it('throws an error if neither state nor action is given', function () {
      return expect(function () { new Memory({}); }).to.throw(Error, 'memory objects require a state and action property');
    });
    it('has a \'created_at\' property, that is a UNIX timestamp', function () {
      return expect(memory).to.have.property('created_at').and.be.above(1540000000);
    });
    it('has a \'state\' property, that is an array of numbers', function () {
      return expect(memory).to.have.property('state').and.be.array()
        .and.containing(0);
    });
    it('has an \'action\' property, that is a numbers', function () {
      return expect(memory).to.have.property('action').and.be.a('number')
        .and.be.equal(0);
    });
    it('throws an error if the state is not an array', function () {
      return expect(function () { new Memory({state: {}, action: 0}); }).to.throw(Error, 'must be an array');
    });
    it('throws an error if the \'created_at\' is not a UNIX timestamp with miliseconds', function () {
      return expect(function () { new Memory({state: [0,0], action: 0, created_at: 'true'}); }).to.throw(Error, 'not a UNIX timestamp with miliseconds');
    });
    it('throws an error if an unknown propert is present', function () {
      return expect(function () { new Memory({state: [0,0], action: 0, created: 'true'}); }).to.throw(Error, 'unknown property');
    });
    it('throws an error if the state is not only made up of numbers', function () {
      return expect(function () { new Memory({state: [[0,0],[0,0]], action: 0}); }).to.throw(Error, 'numbers only');
    });
    it('throws an error if the action is not a number', function () {
      return expect(function () { new Memory({ state: [0, 0], action: true}); }).to.throw(Error, 'must be a number');
    });
  });
});*/
