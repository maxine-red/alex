# Alex: Artificial Life form 3X

![Alex](https://mootech.eu/images/alex.png)

[![Build Status](https://travis-ci.org/maxine-red/alex.svg?branch=master)](https://travis-ci.org/maxine-red/alex)

![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/maxine-red/alex.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/maxine-red/alex.svg)

## Description

Alex is a web server like program, that accepts requests for scores and learns
scoring behavior from users.

How it will work, is like the following:
- users register for service and are assigned a key
- users score tagged content (usually art)
- Alex learns from these scores
- request for scoring is sent to Alex and Alex returns a score, that they think
  the user will assign to that requested art

Alex is meant as a middle ware, between them and a service provider
([Weasyl](https://weasyl.com) is aimed for, but others can be connected).

Requests will be made to Alex, who then connects to the service provider and
adds additional fields (scoring) to it.

## Installation

Currently no installation information are available.

## Donations

[![Patreon](https://img.shields.io/badge/Patreon-donate-orange.svg)](https://www.patreon.com/maxine_red)
[![KoFi](https://img.shields.io/badge/KoFi-donate-blue.svg)](https://ko-fi.com/maxinered)

## License

[![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.en.html)

Copyright 2018 :copyright: Maxine Michalski

## Contributing

1. [Fork it](https://github.com/maxine-red/alex/fork)
1. Create your feature branch (git checkout -b my-new-feature)
1. Commit your changes (git commit -am 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create a new Pull Request
