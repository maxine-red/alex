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
let Alex = require('../lib/alex');

let expect = chai.expect;

describe('Alex', function () {
  describe('new', function () {
    it('returns a new class instanec object', function (done) {
      let alex = new Alex();
      expect(alex).to.have.property('name').and.be.equal('AL3X');
      done();
    });
  });
  describe('#start', function () {
    it('starts up everything and returns true', function (done) {
      expect(new Alex().start()).to.be.equal(true);
      done();
    });
  });
});
