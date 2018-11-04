let chai = require('chai');
let chai_http = require('chai-http');
let server = require('../server');

var expect = chai.expect;

chai.use(chai_http);

describe('API', function () {
  describe('User', function () {
    describe('POST /users', function () {
      it('accepts a name and returns a user', function (done) {
        chai.request(server).post('/users').type('json').send(
          { name: 'test-name' }).then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.name).to.be.equal('test-name');
          expect(res.body.key).to.be.a('string');
          expect(res.body.active).to.be.equal(false);
        }, function (err) { throw err; }).then(done, done);
      });
      it('throws an error if no name is given', function (done) {
        chai.request(server).post('/users', {}).then(function (res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body.error.code).to.be.equal(400);
          expect(res.body.error.message).to.be.a('string');
          expect(res.body.error.message).to.be.equal('Malformed request');
        }, function (err) { throw err; }).then(done, done);
      });
      it('throws an error if name is already taken', function (done) {
        chai.request(server).post('/users').send({ name: 'test-name'})
          .then(function (res) {
            expect(res).to.have.status(422);
            expect(res).to.be.json;
            expect(res.body.error.code).to.be.equal(422);
            expect(res.body.error.message).to.be.a('string');
            expect(res.body.error.message).to.be.equal('Name already taken');
          }, function (err) { throw err; }).then(done, done);
      });
    });
  });
});
