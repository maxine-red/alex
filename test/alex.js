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
    it('has a \'learning_method\' property, that is a string');
    // All exposed properties below are not meant to be accessed directly
    // and are not part of the public API
    it('has a \'memories\' property, that is an array', function () {
      return expect(alex).to.have.property('memories').and.to.be.array()
        .and.to.be.ofSize(0);
    });
    it('has a \'config\' property, that is an object');
    it('has a \'network\' property, that is an object');
    it('has a \'model\' property, that is a Sequential', function () {
      return expect(alex).to.have.property('model').and.be.instanceOf(tf.Sequential);
    });
    it('creates a network');
  });
  describe('#load_model()', function () {
    it('has a method #load_model()');
  });
  describe('#save_model()', function () {
    it('has a method #save_model()');
  });
  describe('#load_memories()', function () {
    it('has a method #load_memories()');
  });
  describe('#save_memories()', function () {
    it('has a method #save_memories()');
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
    it('resolves when learning is finished, with a history of the learning process', function () {
      this.timeout(0);
      alex.remember([0,0], [0]);
      alex.remember([0,1], [1]);
      alex.remember([1,0], [1]);
      alex.remember([1,1], [0]);
      return expect(alex.learn()).to.be.instanceOf(Promise)
        .and.to.have.eventually.property('history');
    });
  });
  describe('#predict()', function () {
    it('has a method #predict()', function () {
      return expect(alex).to.respondTo('predict');
    });
    it('accepts an environment state and resolves with a predicted action', function () {
      return expect(alex.predict([[0, 0]])).to.be.eventually
        .instanceOf(Float32Array);
    });
  });
  describe('#act()', function () {
    it('has a method #act()', function () {
      return expect(alex).to.respondTo('act');
    });
    it('accepts an environment state, a function to call and calls the function with a prediction', function (done) {
      alex.act([[0, 0]], function (action) {
        expect(action).to.be.instanceOf(Float32Array);
        done();
      });
    });
  });
});
