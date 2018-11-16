/*
 *  Copyright 2018 Maxine Michalski <maxine@furfind.net>
 *
 *  This file is part of Personality.
 *
 *  Personality is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Personality is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Personality.  If not, see <http://www.gnu.org/licenses/>.
 */

let chai = require('chai');
let Personality = require('../lib/personality');

let expect = chai.expect;
let personality = new Personality('test');

describe('Personality', function () {
  describe('new', function () {
    it('returns a new class instance object', function (done) {
      let personality = new Personality('test');
      expect(personality).to.be.an('object');
      done();
    });
    it('has a \'name\' property, that is a string', function (done) {
      expect(personality).to.have.property('name').and.be.a('string');
      done();
    });
  });
});
