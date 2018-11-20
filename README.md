# Alex: Artificial Life form 3X

![Alex](https://mootech.eu/images/alex.png)

[![Build Status](https://travis-ci.org/maxine-red/alex.svg?branch=master)](https://travis-ci.org/maxine-red/alex)
![David](https://img.shields.io/david/maxine-red/alex.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/812a922e1ba068d5ead9/maintainability)](https://codeclimate.com/github/maxine-red/alex/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/812a922e1ba068d5ead9/test_coverage)](https://codeclimate.com/github/maxine-red/alex/test_coverage)

![GitHub release](https://img.shields.io/github/release/maxine-red/alex.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/maxine-red/alex.svg)

## Description

Alex is a server for artificial intelligence applications.

The process is like the following:
- Alex listens locally (as of 1.0.0 only UNIX sockets are supported with a
  raw JSON communication protocol) for new requests to train or score
- Those requests are processed asynchronously and results are returned

Documentation of code can be found here: [documentation](DOCUMENTATION.md).

A word of caution though! That documentation refers to the development
documentation. Internal function calls are not considered part of the public
API.

Only network communication is part of the public API and thus part of the
stability promise, Semver offers.

## Versioning

Alex is versioned following Semver 2.0.0


## Installation

Clone this repository and go into the created directory.

Just run ` $ NODE_ENV=production npm install` or `npm install --production`

Don't forget to create a `production.js` in config/ if you need special
configuration.

A more thorough installation guide will be added later.

As of 1.0.0, there is no global installation possible.

## Use

As the public API is comprised of only JSON objects, exchanged over network
communication, here are the objects:

```json
{
  "event": "train",
  "data": {
    "user": "<username>",
    "inputs": "<two dimensional array that is comprised of input vector data>",
    "outputs: "<two dimensional array that is comprised of desired outputs>"
  }
}
```

To give a clearer example, here with a user 'test' and with training data for
the XOR function.

```json
{
  "event": "train",
  "data": {
    "user": "test",
    "inputs": [[0,0], [0,1], [1,0], [1,1]],
    "outputs: [[0], [1], [1], [0]]
  }
}
```

This will lead to a response in this format.
```json
{
  "event": "train",
  "data": {
    "user": "<username>",
    "message": "done"
  }
}
```
Where username is the name of the user, the training was done for.

The other, currently available, object is:

```json
{
  "event": "score",
  "data": {
    "user": "<username>",
    "inputs": "<two dimensional array that is comprised of input vector data>"
  }
}
```
To pick up the example from above, it would look like this with actual data:
```json
{
  "event": "score",
  "data": {
    "user": "test",
    "inputs": [[0,0], [0,1], [1,0], [1,1]]
  }
}
```

The response will be an object with score data:
```json
{
  "event": "score",
  "data": {
    "user": "<username>",
    "scores": "<array of floating point numbers, exactly the same size as inputs>"
  }
}
```

Error messages are in the format of:

```json
{
  "event": "error",
  "data": {
    "message": "<error message>"
  }
}
```

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
