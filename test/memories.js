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
const Memories = require('../lib/memories');
const Memory = require('../lib/memory');

chai.use(chai_array);
let expect = chai.expect;
let memories = new Memories();

describe('Memories', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Memories()).to.be.instanceOf(Memories);
    });
  });
  describe('#push()', function () {
    it('has a method #push()', function () {
      return expect(memories).to.respondTo('push');
    });
    it('throws an error if the element isn\'t a memory object', function () {
      return expect(function () { memories.push(1) }).to.throw(Error,
        'object must be Memory');
    });
    it('pushes a memory into the memories array', function (done) {
      memories.unshift(new Memory([0, 0], [0]));
      expect(memories[0].action[0]).to.be.equal(0);
      done();
    });
  });
  describe('#unshift()', function () {
    it('has a method #unshift()', function () {
      return expect(memories).to.respondTo('unshift');
    });
    it('throws an error if the element isn\'t a memory object', function () {
      return expect(function () { memories.unshift(1) }).to.throw(Error,
        'object must be Memory');
    });
    it('shifts a memory into the memories array', function (done) {
      memories.unshift(new Memory([0, 1], [1]));
      expect(memories[0].action[0]).to.be.equal(1);
      done();
    });
  });
  describe('#save()', function () {
    it('has a method #save()', function () {
      return expect(memories).to.respondTo('save');
    });
    it('accepts a path, saves memories into that location and returns true', function () {
      return expect(memories.save('data/memories.json')).to.be.true;
    });
  });
  describe('.load()', function () {
    it('has a method .load()', function () {
      return expect(Memories).itself.to.respondTo('load');
    });
    it('accepts a path and loads memories from that location', function () {
      console.log(Memories.load('data/memories.json'));
      return expect(Memories.load('data/memories.json')).to.be.instanceOf(Memories);
    });
  });
});
