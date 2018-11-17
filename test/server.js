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
let fs = require('fs');
let net = require('net');
let server_test = require('../lib/server');
let server = require('../lib/server');

let expect = chai.expect;
let socket = path.normalize(`${__dirname}/../tmp/alex.sock`);
let socket_fail = path.normalize(`${__dirname}/../tmp/alex_fail.sock`);
let socket_test = path.normalize(`${__dirname}/../tmp/alex_test.sock`);
if (fs.existsSync(socket)) {
  fs.unlinkSync(socket);
}
if (fs.existsSync(socket_fail)) {
  fs.unlinkSync(socket_fail);
}
if (fs.existsSync(socket_test)) {
  fs.unlinkSync(socket_test);
}

describe('Server', function () {
  describe('#listen()', function () {
    it('returns an Server object', function (done) {
      server_test.once('listening', function () {
        server_test.close();
      });
      expect(server_test.listen(socket_test)).to.be.instanceOf(net.Server);
      done();
    });
    it('emits an error when errors occur', function(done) {
      let server2 = new net.Server();
      server_test.once('error', function (err) {
        expect(err).to.have.property('code').and.be.equal('EADDRINUSE');
        done();
      });
      server2.listen(socket_fail, function () {
        server_test.listen(socket_fail);
        server2.close();
      });
    });
  });
  describe('receive and send messages', function () {
    it('returns an error when message can\'t be parsed', function (done) {
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('error');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('malformed request');
            sock.end();
            server.close();
            done();
          });
          sock.write('Hello');
        });
      });
    });
    it('returns an error if no event type is given', function (done) {
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('error');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('malformed request');
            sock.end();
            server.close();
            done();
          });
          sock.write('{}');
        });
      });
    });
    it('returns an error if an unknown event type is given', function (done) {
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('error');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('unknown event type');
            sock.end();
            server.close();
            done();
          });
          sock.write(JSON.stringify({event: 'unknown'}));
        });
      });
    });
    it('accepts a training event with data', function (done) {
      server.once('train', function (data, conn) {
        conn.write(JSON.stringify({event: 'train', data: { message: 'done' }}));
      });
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('train');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('done');
            sock.end();
            server.close();
            done();
          });
          sock.write(JSON.stringify({event: 'train', data: {}}));
        });
      });
    });
    it('returns an error on train events without data', function (done) {
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('error');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('malformed request');
            sock.end();
            server.close();
            done();
          });
          sock.write(JSON.stringify({event: 'train'}));
        });
      });
    });
    it('accepts a score event with data', function (done) {
      server.once('score', function (data, conn) {
        conn.write(JSON.stringify({event: 'score', data: { score: 1 }}));
      });
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('score');
            expect(data).to.have.property('data').and.have.property('score')
              .and.be.equal(1);
            sock.end();
            server.close();
            done();
          });
          sock.write(JSON.stringify({event: 'score', data: {}}));
        });
      });
    });
    it('returns an error on score events without data', function (done) {
      server.listen(socket, function () {
        let sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            data = JSON.parse(data.toString());
            expect(data).to.have.property('event').and.be.equal('error');
            expect(data).to.have.property('data').and.have.property('message')
              .and.be.equal('malformed request');
            sock.end();
            server.close();
            done();
          });
          sock.write(JSON.stringify({event: 'score'}));
        });
      });
    });
  });
});
