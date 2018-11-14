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
let Alex = require('../../lib/alex');
let alex = new Alex();
alex.start();
let server = alex.server();

let expect = chai.expect;

chai.use(chai_http);

describe('API', function () {
  describe('GET /not_here', function () {
    it('denies with a 404', function (done) {
      chai.request(server).get('/not_here')
        .then(function (res) {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(res.body.error.code).to.be.equal(404);
          expect(res.body.error.message).to.be.a('string');
          expect(res.body.error.message).to.be.equal('Not Found');
        }, done).then(done, done);
    });
  });
  describe('GET /500', function () {
    it('denies with a 500', function (done) {
      chai.request(server).get('/500')
        .then(function (res) {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body.error.code).to.be.equal(500);
          expect(res.body.error.message).to.be.a('string');
          expect(res.body.error.message).to.be.equal('Internal Server Error');
        }, done).then(done, done);
    });
  });
  describe('GET /unknown', function () {
    it('denies with an unknown error', function (done) {
      chai.request(server).get('/unknown')
        .then(function (res) {
          expect(res).to.have.status(501);
          expect(res).to.be.json;
          expect(res.body.error.code).to.be.equal(501);
          expect(res.body.error.message).to.be.a('string');
          expect(res.body.error.message).to.be.equal('An unknown error occured');
        }, done).then(done, done);
    });
  });
});
