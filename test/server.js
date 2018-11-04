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
let chai_http = require('chai-http');
let server = require('../server');

let expect = chai.expect;

chai.use(chai_http);

describe('API', function () {
  describe('GET /', function () {
    it('returns a json greeting', function (done) {
      chai.request(server).get('/').then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.greetings).to.be.equal('Hello from Alex!');
      }, function (err) { throw err; }).then(done, done);
    });
  });
});

