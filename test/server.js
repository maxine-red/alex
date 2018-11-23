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
let Server = require('../lib/server');
let jayson = require('jayson');
const httpl = require('http');

let expect = chai.expect;

describe('HTTP Server', function () {
  describe('#listen()', function () {
    it('returns a HTTPServer');
    it('emits an error when errors occur');
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
