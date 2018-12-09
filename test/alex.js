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
let chai_promises = require('chai-as-promised');
const Alex = require('../lib/alex');
const Memory = require('../lib/memory');
const tf = require('@tensorflow/tfjs');
const fs = require('fs');

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;
let alex = new Alex();

describe('Alex', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Alex()).to.be.instanceOf(Alex);
    });
    it('has a \'alpha\' property, that is a number');
    it('has a \'gamma\' property, that is a number');
    it('has a \'epsilon\' property, that is an object');
    it('has a \'model\' property, that is a Model');
    it('has a \'memories\' property, that is a Memories');
    // All exposed properties below are not meant to be accessed directly
    // and are not part of the public API
    it('has a \'config\' property, that is an object');
  });
  describe('#remember()', function () {
    it('has a method #remember()', function () {
      return expect(alex).to.respondTo('remember');
    });
    it('return a memory object', function () {
      return expect(alex.remember([0,0], [0])).to.be.instanceOf(Memory);
    });
    it('appends a Memory to the memories property', function () {
      return expect(alex.memories).to.be.array().and.to.be.ofSize(1);
    });
  });
  describe('#amnesia()', function () {
    it('has a method #amnesia()', function () {
      return expect(alex).to.respondTo('amnesia');
    });
    it('resets memories and learning progress completely');
  });
  describe('#learn()', function () {
    it('has a method #learn()', function () {
      return expect(alex).to.respondTo('learn');
    });
    it('resolves when learning is finished, with a history of the learning process');
  });
  describe('#predict()', function () {
    it('has a method #predict()');
    it('accepts an environment state and resolves with a predicted action');
  });
  describe('#act()', function () {
    it('has a method #act()');
    it('accepts an environment state, a function to call and calls the function with a prediction');
  });
});
