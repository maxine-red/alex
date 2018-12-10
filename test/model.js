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
const Model = require('../lib/model');
const tf = require('@tensorflow/tfjs');

chai.use(chai_array);
let expect = chai.expect;
let model = new Model(tf.sequential());

describe('Model', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Model()).to.be.instanceOf(Model);
    });
    it('has a \'model\' parameter, that is a Sequential object', function () {
      return expect(model).to.have.property('model').and.be.instanceOf(tf.Sequential);
    });
  });
  describe('#save()', function () {
    it('has a method #save()', function () {
      return expect(model).to.respondTo('save');
    });
    it('saves a model to a path');
  });
  describe('.load()', function () {
    it('has a method .load()', function () {
      return expect(Model).itself.to.respondTo('load');
    });
    it('loads a model from a path');
  });
  describe('#train()', function () {
    it('has a method #train()');
    it('accepts training data and returns a promise, that resolves in a history object');
  });
  describe('#run()', function () {
    it('has a method #run()');
    it('accepts state data and returns a promise, that resolves into an action');
  });
});

