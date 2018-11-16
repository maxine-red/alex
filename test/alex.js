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
      expect(alex).to.be.an('object');
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
    it('returns an array, that contains strings', function (done) {
      expect(alex.personalities()).to.be.array();
      done();
    });
    it('contains objects', function (done) {
      expect(alex.personalities()[0]).to.be.an('object');
      done();
    });
  });
});
