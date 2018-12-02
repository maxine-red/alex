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
    // All exposed properties are not meant to be accessed directly and are not
    // part of the public API
    it('has a \'memories\' property, that is an array', function () {
      return expect(alex).to.have.property('memories').and.to.be.array()
        .and.to.be.ofSize(0);
    });
    it('has a \'model\' property, that is a Sequential', function () {
      return expect(alex).to.have.property('model').and.be.instanceOf(tf.Sequential);
    });
    it('has a \'file\' property that is a string', function () {
      return expect(alex).to.have.property('file').and.be.a('string');
    });
    it('creates a network if none is on file', function (done) {
      if (fs.existsSync(`${alex.file}/model.json`)) {
        fs.unlinkSync(`${alex.file}/model.json`);
      }
      if (fs.existsSync(`${alex.file}/weights.bin`)) {
        fs.unlinkSync(`${alex.file}/weights.bin`);
      }
      expect(new Alex()).to.be.instanceOf(Alex);
      alex.model.save(`file://${alex.file}`);
      done();
    });
    it('loads a network from file, if it exists', function () {
      return expect(new Alex()).to.be.instanceOf(Alex);
    });
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
  describe('#forget_all()', function () {
    it('has a method #forget_all()', function () {
      return expect(alex).to.respondTo('forget_all');
    });
    it('empties the entire memory and sets it to an empty array', function () {
      alex.forget_all();
      return expect(alex.memories).to.be.ofSize(0);
    });
  });
  describe('#materialize_memory()', function () {
    it('has a method #materialize_memory()', function () {
      return expect(alex).to.respondTo('materialize_memory');
    });
    it('returns true', function () {
      return expect(alex.materialize_memory()).to.be.true;
    });
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
