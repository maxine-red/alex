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
let Personality = require('../lib/personality');

let expect = chai.expect;
let person = path.normalize(`${__dirname}/../personalities/test`);
if (fs.existsSync(`${person}/model.json`)) {
  fs.unlinkSync(`${person}/model.json`);
}
if (fs.existsSync(`${person}/weights.bin`)) {
  fs.unlinkSync(`${person}/weights.bin`);
}
let personality = new Personality('test');

describe('Personality', function () {
  describe('new', function () {
    it('returns a new class instance object', function (done) {
      let personality = new Personality('test');
      expect(personality).to.be.an('object');
      done();
    });
    it('has a \'name\' property, that is a string', function (done) {
      expect(personality).to.have.property('name').and.be.a('string');
      done();
    });
  });
  describe('#train()', function () {
    it('trains a network, when data is given', function (done) {
      let inputs = [[0,0], [0,1], [1,0], [1,1]];
      let outputs = [0, 1, 1, 0];
      let prom = personality.train(inputs, outputs);
      expect(prom).to.be.instanceOf(Promise);
      prom.then(function(){}).then(done, done);
    });
  });
  describe('#train()', function () {
    it('saves a network to disk', function (done) {
      let prom = personality.save();
      expect(prom).to.be.instanceOf(Promise);
      prom.then(function () {
        expect(fs.existsSync(`${person}/model.json`)).to.be.equal(true);
        expect(fs.existsSync(`${person}/weights.bin`)).to.be.equal(true);
        let test = new Personality('test');
        expect(test).to.be.instanceOf(Personality);
        done();
      });
    });
  });
  describe('#score()', function () {
    it('returns a promise that resolves into scores', function (done) {
      let prom = personality.predict([[0,0], [0,1], [1,1]]);
      expect(prom).to.be.instanceOf(Promise);
      prom.then(function (data) {
        expect(data[0]).to.be.a('number');
        done();
      }, done).catch(done);
    });
  });
});
if (fs.existsSync(`${person}/model.json`)) {
  fs.unlinkSync(`${person}/model.json`);
}
if (fs.existsSync(`${person}/weights.bin`)) {
  fs.unlinkSync(`${person}/weights.bin`);
}
