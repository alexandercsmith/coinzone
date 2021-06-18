/**
 * @module src
 */
require('dotenv').config();


/*
 Coinzone {
   static Coinbase: class Coinbase
   static Strategy: class Strategy
   async init ()
 }
 */


/**
 * @imports
 */
// require('./algorithm');


/**
 * @class @export { Coinzone }
 */
module.exports = class Coinzone {
  /**
   * @static @class 
   * @name Coinbase
   */
  static Coinbase = require('./coinbase');


  /**
   * @static @class 
   * @name Strategy 
   */
  static Strategy = require('./strategy');


  /**
   * @constructor
   * @param { Object } configuration
   */
  constructor ({ 
    base     ="BTC", 
    quote    =[], 
    strategy ={} 
  }) {
    /* @prop | base"" quote[] */
    this.base  = base.toUpperCase();
    this.quote = [...quote];

    /* @instance | coinbase strategy */
    this.coinbase = new Coinzone.Coinbase();
    this.strategy = new Coinzone.Strategy(strategy);

    /* @func | init */
    this.init();
  }

  /**
   * @async
   * @function init
   */
  async init () {
    try {
      /* @instance */
      this.wss = Coinzone.Coinbase.WS();

      /* @event | open */
      this.wss.on('open', function open () { });

      /* @event | message */
      this.wss.on('message', function incoming (data) { });
      
    } catch (e) {
      console.error('coinzone: init', e.message);
      throw new Error(e);
    }
  }
}