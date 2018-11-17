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
        server_test.close()
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
    it('receives messages', function (done) {
      server.listen(socket, function () {
        sock = new net.Socket();
        sock.connect(socket, function () {
          sock.on('data', function (data) {
            expect(data.toString()).to.be.equal('Hello Friend.\n');
            sock.end();
            server.close();
            done();
          });
          sock.write('Hello');
        });
      });
    });
  });
});
