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
  constructor ({ 
    base     = "BTC", /* @type { String } */
    quote    = "USD", /* @type { String } */
    coinbase = {},    /* @type { Object } */
    signals  = []     /* @type { Array }  */
  }) {
    /**
     * @property { String } base
     * @property { String } quote
     */
    this.base  = base.toUpperCase();
    this.quote = quote.toUpperCase();
    
    /**
     * @property { Coinbase } coinbase
     */
    this.coinbase = new Coinzone.Coinbase(Object.entries(coinbase).length > 0 
    ? coinbase 
    : {
      key:    process.env.COINBASE_SANDBOX_KEY,
      phrase: process.env.COINBASE_SANDBOX_PHRASE,
      secret: process.env.COINBASE_SANDBOX_SECRET
    });
    
    /**
     * @property { Strategy } strategy
     */
    this.strategy = new Coinzone.Strategy(signals);
  }


  /* --- [getters] --- */


  /**
   * @function indicator
   * @type   { getter }
   * @return { String }
   */
  get indicator () {
    return [this.base, this.quote].join('-');
  }


  /* --- [async] --- */

  
  /**
   * @async
   * @function init
   */
  async init () {
    try {
      await this.loadCandles();
      return;
    } catch (e) {
      console.error('coinzone: init', e.message);
      throw new Error(e);
    }
  }


  /**
   * @async
   * @function loadCandles
   * 
   */
  async loadCandles () {
    try {
      for (const [granularity, book] of this.strategy.books.entries()) {
        await this.coinbase.get(`/products/${this.indicator}/candles`, { granularity })
          .then(logs => logs.forEach(log => book.update = log));
      }
      return;
    } catch (e) {
      console.error('coinzone: loadCandles', e.message);
      throw new Error(e);
    }
  }
}