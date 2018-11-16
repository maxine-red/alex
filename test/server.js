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
let path = require('path');
let server = require('../lib/server');

let expect = chai.expect;
let socket = path.normalize(`${__dirname}/../tmp/alex.sock`);

describe('Server', function () {
  describe('#listen()', function () {
    it('returns an object', function (done) {
      expect(server.listen(socket)).to.be.an('object');
      server.close();
      done();
    });
  });
});
