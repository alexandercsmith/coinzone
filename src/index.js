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
   * @param { Object } config
   * @prop  { String } base
   * @prop  { String } quote 
   * @prop  { Object } coinbase
   * @prop  { Object } strategy
   */
  constructor (config = { 
    base:     "BTC", /* @type { String } */
    quote:    "USD", /* @type { String } */
    coinbase: {},    /* @type { Object } */
    strategy: {}     /* @type { Object }  */
  }) {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'initializing coinzone interface...');
    }

    /**
     * @property { String } base
     * @property { String } quote
     */
    this.base  = config.base.toUpperCase();
    this.quote = config.quote.toUpperCase();

    /**
     * @property { Class } coinbase
     */
    this.coinbase = new Coinzone.Coinbase(Object.entries(config.coinbase).length > 0 
    ? config.coinbase 
    : {
      key:    process.env.COINBASE_SANDBOX_KEY,
      phrase: process.env.COINBASE_SANDBOX_PHRASE,
      secret: process.env.COINBASE_SANDBOX_SECRET
    });

    /**
     * @property { Class } strategy
     */
    this.strategy = new Coinzone.Strategy(config.strategy);
  }


  /**
   * @function indicator
   * @type   { getter }
   * @return { String }
   */
  get indicator () {
    return [this.base, this.quote].join('-');
  }

  
  /**
   * @async
   * @function load
   * @return { Boolean }
   */
  async load () {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'fetching coinzone initialization data... \n');
    }
    try {
      /* @var url */
      const url = `/products/${this.indicator}/candles`;
      /* @loop strategy[books] */
      for (const [granularity, book] of this.strategy.books.entries()) {
        /* @debug */
        if (process.env.NODE_ENV === 'development') {
          console.log('>', 'loading', granularity, 'candles...');
        }
        /* @request GET */
        await this.coinbase.get(url, { granularity }).then(logs => 
          logs.forEach(log => book.update = log));
      }
      /* @return */
      return true;
    } catch (e) {
      console.error('coinzone: loadCandles', e.message);
      throw new Error(e);
    }
  }

  /**
   * @async
   * @function 
   */
}