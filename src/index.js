/**
 * @module src
 */
require('dotenv').config();


/**
 * @imports
 */
require('./algorithm');


/**
 * @class @export { Coinzone }
 */
module.exports = class Coinzone {
  static Coinbase = require('./coinbase');
}