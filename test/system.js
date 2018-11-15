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
let System = require('../lib/system');

let expect = chai.expect;
let system = new System();


describe('System', function () {
  describe('new', function () {
    it('returns a System object', function (done) {
      let system = new System();
      expect(system).to.be.an('object');
      done();
    });
    describe('with properties', function () {
      describe('cpu:', function () {
        it('is an object', function (done) {
          expect(system).to.have.property('cpu').and.be.an('object');
          done();
        });
        it('has a \'cores\' property, that is a number and bigger than 0',
          function (done) {
            expect(system.cpu).to.have.property('cores').and.be.a('number')
              .and.be.above(0);
            done();
          });
        it('has an \'architecture\' property, that is a string',
          function (done) {
            expect(system.cpu).to.have.property('architecture')
              .and.be.a('string');
            done();
          });
      });
      describe('memory:', function () {
        it('is an object', function (done) {
          expect(system).to.have.property('memory').and.be.an('object');
          done();
        });
        it('has a \'total\' property, that is a number and positive',
          function (done) {
            expect(system.memory).to.have.property('total').and.be.a('number')
              .and.be.above(0);
            done();
          });
        it('has an \'max_heap\' property, that is a number and positive',
          function (done) {
            expect(system.memory).to.have.property('max_heap')
              .and.be.a('number').and.be.above(0);
            done();
          });
      });
      it('has a \'platform\' property, that is a string', function (done) {
        expect(system).to.have.property('platform').and.be.a('string');
        done();
      });
      describe('user:', function () {
        it('is an object', function (done) {
          expect(system).to.have.property('user').and.be.an('object');
          done();
        });
        it('has an \'id\' property, that is a number and bigger than 0',
          function (done) {
            expect(system.user).to.have.property('id').and.be.a('number')
              .and.be.above(0);
            done();
          });
        it('has a \'name\' property, that is a string',
          function (done) {
            expect(system.user).to.have.property('name')
              .and.be.a('string');
            done();
          });
      });
      describe('group', function () {
        it('is an object', function (done) {
          expect(system).to.have.property('group').and.be.an('object');
          done();
        });
        it('has an \'id\' property, that is a number and bigger than 0',
          function (done) {
            expect(system.group).to.have.property('id').and.be.a('number')
              .and.be.above(0);
            done();
          });
        it('has a \'name\' property, that is a string',
          function (done) {
            expect(system.group).to.have.property('name')
              .and.be.a('string');
            done();
          });
      });
      describe('interpreter:', function () {
        it('is an object', function (done) {
          expect(system).to.have.property('interpreter').and.be.an('object');
          done();
        });
        it('has a \'node\' property, that is a string', function (done) {
          expect(system.interpreter).to.have.property('node')
            .and.be.a('string');
          done();
        });
        it('has an \'program\' property, that is a string',
          function (done) {
            expect(system.interpreter).to.have.property('program')
              .and.be.an('string');
            done();
          });
      });
    });
  });
  describe('#hostname()', function () {
    it('returns a string', function (done) {
      expect(system.hostname()).to.be.a('string');
      done();
    });
  });
  describe('#working_directory()', function () {
    it('returns a string', function (done) {
      expect(system.working_directory()).to.be.a('string');
      done();
    });
  });
  describe('#run_time()', function () {
    it('returns a positive number', function (done) {
      expect(system.run_time()).to.be.a('number').and.be.above(0);
      done();
    });
  });
  describe('#memory_use()', function () {
    it('returns is a positive number', function (done) {
      expect(system.memory_use()).to.be.a('number').and.be.above(0);
      done();
    });
  });
  describe('#relative_memory_use()', function () {
    it('returns an object', function (done) {
      expect(system.relative_memory_use()).to.be.an('object');
      done();
    });
    it('has a \'system\' property, that is a positive number', function (done) {
      expect(system.relative_memory_use()).to.have.property('system')
        .and.be.a('number').and.be.above(0);
      done();
    });
    it('has a \'heap\' property, that is a positive number', function (done) {
      expect(system.relative_memory_use()).to.have.property('heap')
        .and.be.a('number').and.be.above(0);
      done();
    });
  });
});
