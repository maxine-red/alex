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
const Network = require('../lib/network');
const Matrix = require('../lib/matrix');

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;

let network = new Network();

function test_learn(net, params) {
  net.train(params);
  for (let i = 0; i < 4; i++) {
    expect(Math.round(net.run(params.inputs[i]).get(0,0) * 10) / 10.0).to.be
      .eql(params.outputs[i][0])
  }
}

describe('Network', function () {
  describe('new', function () {
    it('returns a new class instance object', function () {
      expect(new Network()).to.be.instanceOf(Network);
    });
    it('has a \'layers\' property, that is an array', function () {
      expect(network).to.have.property('layers').and.be.array();
    });
  });
  describe('#add()', function () {
    it('has a method #add()', function () {
      expect(network).to.respondTo('add');
    });
    it('adds a layer from a layer description', function () {
      network.add({inputs: 2, units: 6, activation: 'relu'});
      expect(network.layers[0]).to.have.property('w').and.be.instanceOf(Matrix);
      expect(network.layers[0]).to.have.property('b').and.be.instanceOf(Matrix);
      expect(network.layers[0]).to.have.property('activation')
        .and.be.eql('relu');
    });
    it('throws an error if inputs are set on non-input layers', function () {
      expect(function () {
        network.add({inputs: 5, units: 1, activation: 'sigmoid'});
      }).to.throw(Error, 'inputs can only be set for input layers');
    });
    it('adds additional layers', function () {
      network.add({units: 1, activation: 'sigmoid'});
      expect(network.layers[1]).to.have.property('w').and.be.instanceOf(Matrix);
      expect(network.layers[1]).to.have.property('b').and.be.instanceOf(Matrix);
    });
  });
  describe('#run()', function () {
    it('has a method #run()', function () {
      expect(network).to.respondTo('run');
    });
    it('runs a forward propagation', function () {
      expect(network.run([0,0])).to.be.instanceOf(Matrix).and.have
        .property('rows').and.be.eql(1);
    });
  });
  describe('#train()', function () {
    it('has a method #train()', function () {
      expect(network).to.respondTo('train');
    });
    it('throws an error if important parameter are missing', function () {
      let params = {};
      expect(function () { network.train(params) }).to.throw(Error);
    });
    it('runs forward and back- propagation without error', function () {
      let params = {
        inputs: [[0,0], [0,1], [1,0], [1,1]],
        outputs: [[0], [1], [1], [1]],
        epochs: 1
      };
      expect(function () { network.train(params) }).to.not.throw(Error);
    });
    describe('learning', function () {
      it('learns the AND function', function () {
        let net = new Network();
        net.add({inputs: 2, units: 4, activation: 'sigmoid'});
        net.add({units: 1, activation: 'sigmoid'});
        let params = {
          inputs: [[0,0], [0,1], [1,0], [1,1]],
          outputs: [[0], [0], [0], [1]],
          epochs: 60000
        };
        test_learn(net, params);
      });
      it('learns the OR function', function () {
        let net = new Network();
        net.add({inputs: 2, units: 4, activation: 'sigmoid'});
        net.add({units: 1, activation: 'sigmoid'});
        let params = {
          inputs: [[0,0], [0,1], [1,0], [1,1]],
          outputs: [[0], [1], [1], [1]],
          epochs: 60000
        };
        test_learn(net, params);
      });
      it('learns the XOR function', function () {
        let net = new Network(0.3);
        net.add({inputs: 2, units: 6, activation: 'sigmoid'});
        net.add({units: 1, activation: 'sigmoid'});
        let params = {
          inputs: [[0,0], [0,1], [1,0], [1,1]],
          outputs: [[0], [1], [1], [0]],
          epochs: 100000
        };
        test_learn(net, params);
      });
    });
  });
});
