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
let chai_arrays = require('chai-arrays');
let server = require('../server');

chai.use(chai_arrays);

let expect = chai.expect;

chai.use(chai_http);

describe('API', function () {
  describe('User', function () {
    describe('POST /users', function () {
      it('denies with a 403, if no password is given', function (done) {
        chai.request(server).post('/users').type('json').send(
          { name: 'test-name' })
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('denies with a 403, if a wrong password is given', function (done) {
        chai.request(server).post('/users').type('json')
          .set('X-AL3X-PASSWORD', 'wr0ngp4ssw0rd')
          .send({ name: 'test-name' })
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('accepts a name and returns a user', function (done) {
        chai.request(server).post('/users').type('json')
          .set('X-AL3X-PASSWORD', process.env.PASSWORD)
          .send({ name: 'test-name'})
          .then(function (res) {
            test_user_object(res);
            expect(res.body.active).to.be.equal(false);
            expect(res.body.name).to.be.equal('test-name');
          }, handle_error).then(done, done);
      });
      it('accepts a name and an active marker and returns a user',
        function (done) {
          chai.request(server).post('/users').type('json')
            .set('X-AL3X-PASSWORD',  process.env.PASSWORD)
            .send({ name: 'test-name2', active: true })
            .then(function (res) {
              test_user_object(res);
              expect(res.body.active).to.be.equal(true);
              expect(res.body.name).to.be.equal('test-name2');
            }, handle_error).then(done, done);
        });
      it('denies with a 400, if no name is given', function (done) {
        chai.request(server).post('/users')
          .set('X-AL3X-PASSWORD',  process.env.PASSWORD)
          .then(function (res) {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body.error.code).to.be.equal(400);
            expect(res.body.error.message).to.be.a('string');
            expect(res.body.error.message).to.be.equal('Malformed request');
          }, handle_error).then(done, done);
      });
      it('denies with a 422, if name is already taken', function (done) {
        chai.request(server).post('/users')
          .set('X-AL3X-PASSWORD',  process.env.PASSWORD)
          .send({ name: 'test-name' })
          .then(function (res) {
            expect(res).to.have.status(422);
            expect(res).to.be.json;
            expect(res.body.error.code).to.be.equal(422);
            expect(res.body.error.message).to.be.a('string');
            expect(res.body.error.message).to.be.equal('Name already taken');
          }, handle_error).then(done, done);
      });
    });
    describe('GET /users', function () {
      it('denies with a 403, if no password is given', function (done) {
        chai.request(server).get('/users')
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('denies with a 403, if a wrong password is given', function (done) {
        chai.request(server).get('/users')
          .set('X-AL3X-PASSWORD', 'wr0ngp4ssw0rd')
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('returns a list of usres, if a correct password is given',
        function (done) {
          chai.request(server).get('/users')
            .set('X-AL3X-PASSWORD', process.env.PASSWORD)
            .then(function (res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.array();
              expect(res.body).to.be.ofSize(2);
              expect(res.body[0].name).to.be.equal('test-name');
            }, handle_error).then(done, done);
        });
    });
    describe('GET /users/:id', function () {
      it('denies with a 403, if no password is given', function (done) {
        chai.request(server).get('/users/1')
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('denies with a 403, if a wrong password is given', function (done) {
        chai.request(server).get('/users/1')
          .set('X-AL3X-PASSWORD', 'wr0ngp4ssw0rd')
          .then(user_no_permission, handle_error).then(done, done);
      });
      it('denies with a 404, if no user with given ID exists', function (done) {
        chai.request(server).get('/users/3')
          .set('X-AL3X-PASSWORD', process.env.PASSWORD)
          .then(function (res) {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body.error.code).to.be.equal(404);
            expect(res.body.error.message).to.be.a('string');
            expect(res.body.error.message).to.be.equal('Not Found');
          }, handle_error).then(done, done);
      });
      it('returns a user object, if a correct password is given',
        function (done) {
          chai.request(server).get('/users/1')
            .set('X-AL3X-PASSWORD', process.env.PASSWORD)
            .then(function (res) {
              test_user_object(res);
              expect(res.body.active).to.be.equal(false);
              expect(res.body.name).to.be.equal('test-name');
            }, handle_error).then(done, done);
        });
    });
  });
});

function user_no_permission(res) {
  expect(res).to.have.status(403);
  expect(res).to.be.json;
  expect(res.body.error.code).to.be.equal(403);
  expect(res.body.error.message).to.be.a('string');
  expect(res.body.error.message).to.be.equal('Permission denied');
}

function test_user_object(res) {
  expect(res).to.have.status(200);
  expect(res).to.be.json;
}

function handle_error(err) {
  throw err;
}
