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

const express = require('express')
let app = express();

let api_name = process.env.npm_package_name;
let api_version = process.env.npm_package_version;
let port = process.env.npm_package_config_port;

app.get('/', function (req, res) {
  res.send({greetings:'Hello from Alex!'});
});

app.get('/api', function (req, res) {
  res.send({version: api_version, name: api_name});
});

module.exports = app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
