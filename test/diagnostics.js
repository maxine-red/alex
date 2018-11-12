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
let Diagnostics = require('../lib/diagnostics');

let expect = chai.expect;


describe('Diganostics', function () {
  describe('new', function () {
    let diagnostics = new Diagnostics();
    it('returns a Diagnostics object', function (done) {
      expect(diagnostics).to.be.an('object');
      done();
    });
    describe('with properties', function () {
      it('has an `arch` attribute', function (done) {
        expect(diagnostics).to.have.property('arch').and.be.a('string');
        done();
      });
      it('has an `interpreter` attribute', function (done) {
        expect(diagnostics).to.have.property('interpreter').and.be.a('string');
        done();
      });
      it('has an `program` attribute', function (done) {
        expect(diagnostics).to.have.property('program').and.be.a('string');
        done();
      });
      it('has an `platform` attribute', function (done) {
        expect(diagnostics).to.have.property('platform').and.be.a('string');
        done();
      });
      it('has an `title` attribute', function (done) {
        expect(diagnostics).to.have.property('title').and.be.a('string');
        done();
      });
      it('has an `username` attribute', function (done) {
        expect(diagnostics).to.have.property('username').and.be.a('string');
        done();
      });
      it('has an `groupname` attribute', function (done) {
        expect(diagnostics).to.have.property('groupname').and.be.a('string');
        done();
      });
      it('has an `user_id` attribute', function (done) {
        expect(diagnostics).to.have.property('user_id').and.be.a('number');
        done();
      });
      it('has an `group_id` attribute', function (done) {
        expect(diagnostics).to.have.property('group_id').and.be.a('number');
        done();
      });
    });
  });
});
