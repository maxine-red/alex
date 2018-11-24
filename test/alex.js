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
  describe('#personalities()', function () {
    it('returns an array of personality names');
  });
  describe('#train()', function () {
    it('returns a promise');
    it('rejects if no user is specified');
    it('rejects if no inputs are specified');
    it('rejects if no outputs are specified');
    it('rejects if user is not a string');
    it('rejects if inputs are not an array');
    it('rejects if outputs are not an array');
    it('rejects if inputs and outputs are not of same size');
    it('rejects if inputs is not an array of arrays');
    it('rejects if inputs are not in correct shape');
    it('rejects if inputs not only contains numbers at 2nd level');
    it('rejects if outputs is not an array of arrays');
    it('rejects if outputs are not in correct shape');
    it('rejects if outputs not only contains numbers at 2nd level');
    it('resolves when correct data is given');
  });
  describe('#score()', function () {
    it('returns a promise');
    it('rejects if no user is specified');
    it('rejects if no inputs are specified');
    it('rejects if user is not a string');
    it('rejects if inputs are not an array');
    it('rejects if inputs is not an array of arrays');
    it('rejects if inputs are not in correct shape');
    it('rejects if inputs not only contains numbers at 2nd level');
    it('resolves when correct data is given');
  });
});

  /*describe('#personalities()', function () {
    it('returns an array of personality names', function (done) {
      let personalities = alex.personalities();
      expect(personalities).to.be.an('array');
      expect(personalities[0]).to.be.a('string').and.be.equal('test');
      done();
    });
  });
  describe('#train()', function () {
    it('returns a promise', function (done) {
      let prom = alex.train({});
      expect(prom).to.be.instanceOf(Promise);
      prom.catch(function (err) { err.message; });
      done();
    });
    it('rejects if no user is specified', function (done) {
      alex.train({inputs: [], outputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if no inputs are specified', function (done) {
      alex.train({user: 'test', outputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if no outputs are specified', function (done) {
      alex.train({user: 'test', inputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if user is not a string', function (done) {
      alex.train({user: [], inputs: [], outputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs are not an array', function (done) {
      alex.train({user: 'test', inputs: 'data', outputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if outputs are not an array', function (done) {
      alex.train({user: 'test', inputs: [[1,1]], outputs: 'data'})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs and outputs are not of same size',
      function (done) {
        alex.train({user: 'test', inputs: [[1,1], [0,1]], outputs: [[1]]})
          .then(resolve_bad, reject).then(done, done);
      });
    it('rejects if inputs is not an array of arrays', function (done) {
      alex.train({user: 'test', inputs: ['test'], outputs: ['test']})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs are not in correct shape', function (done) {
      alex.train({user: 'test', inputs: [[1]], outputs: [[1]]})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs not only contains numbers at 2nd level',
      function (done) {
        alex.train({user: 'test', inputs: [['test', 'test']], outputs: [[1]]})
          .then(resolve_bad, reject).then(done, done);
      });
    it('rejects if outputs is not an array of arrays', function (done) {
      alex.train({user: 'test', inputs: [[1,1]], outputs: ['test']})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if outputs are not in correct shape', function (done) {
      alex.train({user: 'test', inputs: [[1,1]], outputs: [[1,1]]})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if outputs not only contains numbers at 2nd level',
      function (done) {
        alex.train({user: 'test', inputs: [[1, 1]], outputs: [['test']]})
          .then(resolve_bad, reject).then(done, done);
      });
    it('resolves when correct data is given', function (done) {
      this.timeout(0);
      let prom = alex.train({user: 'test', inputs: [[1,1], [1,0], [0,1], [0,0]],
        outputs: [[0], [1], [1], [0]]});
      expect(prom).to.be.instanceOf(Promise);
      prom.then(function (data) {
        expect(data).to.have.property('validationData');
      }, reject_bad).then(done, done);
    });
  });
  describe('#score()', function () {
    it('returns a promise', function (done) {
      let prom = alex.score({});
      expect(prom).to.be.instanceOf(Promise);
      prom.catch(function (err) { err.message; });
      done();
    });
    it('rejects if no user is specified', function (done) {
      alex.score({inputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if no inputs are specified', function (done) {
      alex.score({user: 'test'})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if user is not a string', function (done) {
      alex.score({user: [], inputs: []})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs are not an array', function (done) {
      alex.score({user: 'test', inputs: 'data'})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs is not an array of arrays', function (done) {
      alex.score({user: 'test', inputs: ['test']})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs are not in correct shape', function (done) {
      alex.score({user: 'test', inputs: [[1]]})
        .then(resolve_bad, reject).then(done, done);
    });
    it('rejects if inputs not only contains numbers at 2nd level',
      function (done) {
        alex.score({user: 'test', inputs: [['test', 'test']]})
          .then(resolve_bad, reject).then(done, done);
      });
    it('resolves when correct data is given', function (done) {
      let prom = alex.score({user: 'test',
        inputs: [[1,1], [1,0], [0,1], [0,0]]});
      expect(prom).to.be.instanceOf(Promise);
      prom.then(function (data) {
        expect(data).to.be.instanceOf(Float32Array);
        expect(data.length).to.be.equal(4);
        expect(data[0]).to.be.a('number');
      }, reject_bad).then(done, done);
    });
  });
});

function resolve_bad () {
  expect('test failed').to.be.equal('malformed request');
}

function reject_bad (err) {
  expect(err.message).to.be.equal('No error message');
}


function reject (err) {
  expect(err.message).to.be.equal('malformed request');
}*/
