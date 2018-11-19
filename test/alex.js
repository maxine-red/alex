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
let Alex = require('../lib/alex');
let Personality = require('../lib/personality');

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
    it('has a \'name\' property, that is a string', function (done) {
      expect(alex).to.have.property('name').and.be.a('string');
      done();
    });
    it('has a \'version\' property, that is a string', function (done) {
      expect(alex).to.have.property('version').and.be.a('string');
      done();
    });
  });
  describe('#train()', function () {
    it('throws an error if no user is specified', function (done) {
      try {
        alex.train({inputs: [], outputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if no inputs are specified', function (done) {
      try {
        alex.train({user: 'test', outputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if no outputs are specified', function (done) {
      try {
        alex.train({user: 'test', inputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if user is not a string', function (done) {
      try {
        alex.train({user: [], inputs: [], outputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs are not an array', function (done) {
      try {
        alex.train({user: 'test', inputs: 'data', outputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if outputs are not an array', function (done) {
      try {
        alex.train({user: 'test', inputs: [[1,1]], outputs: 'data'});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs and outputs are not of same size',
      function (done) {
      try {
        alex.train({user: 'test', inputs: [[1,1], [0,1]], outputs: [[1]]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs is not an array of arrays', function (done) {
      try {
        alex.train({user: 'test', inputs: ['test'], outputs: ['test']});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs are not in correct shape', function (done) {
      try {
        alex.train({user: 'test', inputs: [[1]], outputs: [[1]]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs not only contains numbers at 2nd level',
      function (done) {
      try {
        alex.train({user: 'test', inputs: [['test', 'test']], outputs: [[1]]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if outputs is not an array of arrays', function (done) {
      try {
        alex.train({user: 'test', inputs: [[1,1]], outputs: ['test']});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if outputs are not in correct shape', function (done) {
      try {
        alex.train({user: 'test', inputs: [[1,1]], outputs: [[1,1]]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if outputs not only contains numbers at 2nd level',
      function (done) {
      try {
        alex.train({user: 'test', inputs: [[1, 1]], outputs: [['test']]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
  });
  describe('#score()', function () {
    it('throws an error if no user is specified', function (done) {
      try {
        alex.score({inputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if no inputs are specified', function (done) {
      try {
        alex.score({user: 'test'});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if user is not a string', function (done) {
      try {
        alex.score({user: [], inputs: []});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs are not an array', function (done) {
      try {
        alex.score({user: 'test', inputs: 'data'});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs is not an array of arrays', function (done) {
      try {
        alex.score({user: 'test', inputs: ['test']});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs are not in correct shape', function (done) {
      try {
        alex.score({user: 'test', inputs: [[1]]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
    it('throws an error if inputs not only contains numbers at 2nd level',
      function (done) {
      try {
        alex.score({user: 'test', inputs: [['test', 'test']]});
        throw new Error('Test failed');
      }
      catch (err) {
        expect(err.message).to.be.equal('malformed request');
        done();
      }
    });
  });
});
