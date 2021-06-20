require('dotenv').config();
/**
 * @module src
 * @class @export { Coinzone }
 */
module.exports = class Coinzone {
  /**
   * @static
   * @interface Coinbase
   */
  static Coinbase = require('./coinbase');


  /**
   * @static
   * @interface Strategy
   */
  static Strategy = require('./strategy');


  /**
   * @static 
   * @module utils
   */
  static utils = require('./utils');


  /**
   * @constructor
   * @param { Object } configuration
   */
  constructor ({ base = "BTC", strategy = {} }) {
    this.base     = base.toUpperCase();
    this.api      = new Coinzone.Coinbase();
    this.strategy = new Coinzone.Strategy(strategy);
  }


  /**
   * @async
   * @function init
   */
  async init () {
    try {
      /* @instance */
      // this.stream = Coinzone.Coinbase.Websocket({}, (data) => {});
      return;
    } catch (e) {
      console.error('coinzone: init', e.message);
      throw new Error(e);
    }
  }
}