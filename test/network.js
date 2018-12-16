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

chai.use(chai_array);
chai.use(chai_promises);
let expect = chai.expect;

let network = new Network();

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
    it('accepts a layer description');
  });
});
