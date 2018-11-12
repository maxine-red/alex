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

const winston = require('winston');
// Set a custom log format, because none of the standard ones fit.
const my_format = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
const time_format = {format: 'ddd D, YYYY hh:mm:ss.SSS A ZZ'};

/**
 * Logging class to wrap winston functionality.
 * @author Maxine Michalski
 * @since 1.0.0
 * @class
 * @private
 */
class Logger {
  /**
   * Constructor for Logger.
   */
  constructor() {
    this.logger = winston.createLogger();
    if (process.env.NODE_ENV === 'test') {
      this.logger.add(new winston.transports.File({
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(time_format),
          my_format),
        filename: 'logs/test.log'
      }));
    } else if (process.env.NODE_ENV === 'production') {
      this.logger.add(new winston.transports.File({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(time_format),
          my_format),
        filename: 'logs/alex.log'
      }));
    }
    else {
      this.logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(winston.format.colorize(),
          winston.format.timestamp(time_format), my_format)
      }));
    }
  }

  /**
   * Wrapper for info logging.
   * @private
   * @param {string} msg - Text to log
   * @returns {undefined}
   */
  info(msg) {
    this.logger.info(msg);
  }

  /**
   * Wrapper for debug logging.
   * @private
   * @param {string} msg - Text to log
   * @returns {undefined}
   */
  debug(msg) {
    this.logger.debug(msg);
  }

  /**
   * Wrapper for error logging.
   * @private
   * @param {string} msg - Text to log
   * @returns {undefined}
   */
  error(msg) {
    this.logger.error(msg);
  }
}

module.exports = Logger;
