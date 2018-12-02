[![Build Status](https://img.shields.io/travis/maxine-red/al3x/master.svg)](https://travis-ci.org/maxine-red/al3x)
[![David](https://img.shields.io/david/maxine-red/al3x.svg)](https://github.com/maxine-red/al3x/network/dependencies)

# Alex: Artificial Life form 3X

![Alex](https://mootech.eu/images/alex.png)

[![Maintainability](https://img.shields.io/codeclimate/maintainability/maxine-red/al3x.svg)](https://codeclimate.com/github/maxine-red/al3x/maintainability)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/maxine-red/al3x.svg)](https://codeclimate.com/github/maxine-red/al3x/test_coverage)

[![GitHub release](https://img.shields.io/github/release/maxine-red/al3x.svg)](https://github.com/maxine-red/al3x/releases)
[![GitHub Release Date](https://img.shields.io/github/release-date/maxine-red/al3x.svg)](https://github.com/maxine-red/al3x/releases)
![GitHub last commit](https://img.shields.io/github/last-commit/maxine-red/al3x.svg)
[![npm](https://img.shields.io/npm/v/al3x.svg)](https://www.npmjs.com/package/al3x)

## Description

Alex is a library for preference and reinforcement learning.

As of version 0.3.0, code is still very open, but that should change for 1.0.
The goal is to have a very reinforcement learning centered library, that allows
easy construction and use of it.

Documentation of code can be found here: [documentation](DOCUMENTATION.md).

## Versioning

Alex is versioned following Semver 2.0.0


## Installation

Clone this repository and go into the created directory.

Just run ` $ NODE_ENV=production npm install` or `npm install --production`

Don't forget to create a `production.js` in config/ if you need special
configuration.

A more thorough installation guide will be added later.

## Use

The API is centered around an `Alex` class. Other classes might be added later
and will be outlined here, if they are part of the public API.

All methods, not explicitely stated here, are counted not part of the public
API.

Public methods:

```javascript
let alex = new Alex();    // Constructor, which also handles model generation,
                          // memory loading and other base functions

alex.remember([0,0], [0]);// A method used to save enviroment state and action
                          // pairs. These are important in later steps.

alex.materialize_memory();// Save the current state of memory to disk, so it can
                          // be loaded back later.

alex.learn();             // Use current memory to train a network.
                          // This method should always be run with a memory that
                          // contains at least one element!

alex.predict([[0,0]]);    // Make a prediction of what action to take, when an
                          // environment state is given.

alex.act([[0,0]], func);  // Same as predict, but accepts a function too, that
                          // is run with the produced prediction

alex.forget_all()         // Empty memory. So it can be filled with new memories
```

For more information, please refer to the more detailed
[documentation](DOCUMENTATION.md).

## Donations

[![Patreon](https://img.shields.io/badge/Patreon-donate-orange.svg)](https://www.patreon.com/maxine_red)
[![KoFi](https://img.shields.io/badge/KoFi-donate-blue.svg)](https://ko-fi.com/maxinered)

## License

[![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.en.html)

Alex code :copyright: 2018 Maxine Michalski

Alex art :copyright: 2017 [Ulvra](https://furaffinity.net/user/ulvra)

## Contributing

1. [Fork it](https://github.com/maxine-red/alex/fork)
1. Create your feature branch (git checkout -b my-new-feature)
1. Commit your changes (git commit -am 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create a new Pull Request
