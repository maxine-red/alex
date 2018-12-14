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
const Layer = require('../../lib/network/layer');

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;

let layer = new Layer(5, 6);

describe('Layer', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      return expect(new Layer()).to.be.instanceOf(Layer);
    });
    it('has a \'n\' property, that is a number', function () {
      return expect(layer).to.have.property('n').and.be.a('number')
        .and.be.equal(5);
    });
    it('has a \'d\' property, that is a number', function () {
      return expect(layer).to.have.property('d').and.be.a('number')
        .and.be.equal(6);
    });
    it('has a \'weights\' property, that is a Float64Array objec', function () {
      return expect(layer).to.have.property('weights')
        .and.be.instanceOf(Float64Array);
    });
    it('has a \'delta_weights\' property, that is a Float64Array objec', function () {
      return expect(layer).to.have.property('delta_weights')
        .and.be.instanceOf(Float64Array);
    });
  });
  describe('#init()', function () {
    it('has a method #init()', function () {
      return expect(layer).to.respondTo('init');
    });
    it('accepts two numbers and returns a randomly filled Float64Array', function () {
      return expect(layer.init(0, 0.01)).to.be.instanceOf(Float64Array);
    });
  });
  describe('#save()', function () {
    it('has a method #save()', function () {
      expect(layer).to.respondTo('save');
    });
    it('returns a JSON representation of the current layer', function () {
      expect(layer.save()).to.be.a('object').and.have.property('n').and.be.equal(5);
      expect(layer.save()).to.have.property('d').and.be.equal(6);
      expect(layer.save()).to.have.property('weights').and.be.containingAllOf(layer.weights);
    });
  });
  describe('.load()', function () {
    it('has a method .load()', function () {
      expect(Layer).itself.to.respondTo('load');
    });
    it('returns a Layer object', function () {
      let l = Layer.load(layer.save());
      expect(l).to.be.instanceOf(Layer);
      expect(l).to.have.property('n').and.be.equal(5);
      expect(l).to.have.property('d').and.be.equal(6);
      // no better comparison possible
      expect(l).to.have.property('weights')
      expect(l.weights[0]).to.be.equal(layer.weights[0]);
    });
  });
  describe('#update()', function () {
    it('has a method #update()', function () {
      expect(layer).to.respondTo('update');
    });
    it('updates a layer\'s weights', function () {
      layer.delta_weights[0] = 1;
      let old_weight = layer.weights[0];
      expect(layer.update(0.1)).to.be.undefined;
      expect(layer.weights[0]).to.be.equal(old_weight - 0.1);
    });
  });
  describe('#copy()', function () {
    it('has a method #copy()', function () {
      expect(layer).to.respondTo('copy');
    });
    it('returns a new Layer, that is a copy if the current layer', function () {
      let l = layer.copy();
      expect(l).to.not.be.equal(layer);
      expect(l).to.be.instanceOf(Layer);
      expect(l).to.have.property('n').and.be.equal(5);
      expect(l).to.have.property('d').and.be.equal(6);
      // no better comparison possible
      expect(l).to.have.property('weights')
      expect(l.weights[0]).to.be.equal(layer.weights[0]);
    });
  });
});
