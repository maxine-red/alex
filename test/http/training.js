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
let chai_http = require('chai-http');
let Alex = require('../../lib/alex');
process.env.PORT = 3001;
let alex = new Alex();
alex.start();
let server = alex.server();

let expect = chai.expect;

chai.use(chai_http);

describe('training', function () {
  describe('POST /:personality/train', function () {
    describe('has proper data given', function () {
      it('starts a new training cycle', function (done) {
        let inputs = [];
        let outputs = [];
        for (let i = 0; i < 1000; i++) {
          let x = Math.round(Math.random());
          let y = Math.round(Math.random());
          inputs.push([x,y]);
          outputs.push([x ^ y]);
        }
        chai.request(server).post('/test/train').send({inputs: inputs,
          scores: outputs})
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('personality')
              .and.to.be.a('string')
              .and.to.be.equal('test');
            expect(res.body).to.have.property('status')
              .and.to.be.a('string')
              .and.to.be.equal('started');
          }, done).then(done, done);
      });
    });
  });
});
