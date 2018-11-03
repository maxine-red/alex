let chai = require('chai');
let chai_http = require('chai-http');
let server = require('../server')

var expect = chai.expect;

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

