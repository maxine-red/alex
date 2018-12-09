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
let chai_array = require('chai-arrays');
//const Memories = require('../lib/memories');

chai.use(chai_array);
let expect = chai.expect;


describe('Memories', function () {
  describe('new', function () {
    it('returns a new class instance object');
    it('is consisting of Memory objects');
  });
  describe('#save()', function () {
    it('has a method #save()');
    it('accepts a path and saves memories into that location');
  });
  describe('#load()', function () {
    it('has a method #load()');
    it('accepts a path and loads memories from that location');
  });
});
