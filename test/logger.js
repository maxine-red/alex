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
let Logger = require('../lib/logger');

let expect = chai.expect;

describe('logger', function () {
  describe('development environemnt', function () {
    it('outputs to console', function (done) {
      let env = process.env.NODE_ENV;
      process.env.NODE_ENV = undefined;
      let logger = new Logger('');
      expect(logger.debug('works')).to.be.equal(undefined);
      process.env.NODE_ENV = env;
      done();
    });
  });
  describe('production environemnt', function () {
    it('outputs to file', function (done) {
      let env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      let logger = new Logger();
      expect(logger.error('works')).to.be.equal(undefined);
      expect(logger.info('works')).to.be.equal(undefined);
      process.env.NODE_ENV = env;
      done();
    });
  });
  describe('test environment', function () {
    it('outputs to file', function (done) {
      let logger = new Logger();
      expect(logger.warn('works')).to.be.equal(undefined);
      done();
    });
  });
});
