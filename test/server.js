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
let [server, http] = require('../lib/server');
let jayson = require('jayson');
const httpl = require('http');

let expect = chai.expect;

server.methods({
  ping: function (args, callback) {
    callback(null, 'pong');
  }
});
describe('HTTP Server', function () {
  describe('#listen()', function () {
    it('returns a HTTPServer', function (done) {
      let l = http.listen(3000);
      expect(l).to.be.instanceOf(net.Server);
      l.close();
      done();
    });
    it('emits an error when errors occur', function(done) {
      let s = httpl.createServer(function (req, res) {
        res.end();
      });
      http.once('error', function (err) {
        expect(err.message).to.be.a('string').and.be.equal('listen EADDRINUSE 127.0.0.1:3000');
        s.close();
        done();
      });
      s.listen(3000, '127.0.0.1');
      http.listen(3000, '127.0.0.1');
    });
  });
  describe('receive and send messages', function () {
    it('returns an error if no event type is given');
    it('returns an error if an unknown event type is given');
    it('accepts a training event with data');
    it('returns an error on train events without data');
    it('accepts a score event with data');
    it('returns an error on score events without data');
  });
});
