/**
 * @module src
 */
require('dotenv').config();


/*
 Coinzone {
   static Coinbase: class Coinbase
   candles: { ... }
   indicator: { ... }
   async init ()
   update     ([Number(6)])
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
   * @module candles
   */
  candles = require('./candles');


  /**
   * @module indicator 
   */
  indicator = require('./indicator');


  /**
   * @constructor
   * @param { Object } configuration
   */
  constructor ({ base="BTC", config={} }) {
    /* @prop | base"" quote[] */
    this.base = base.toUpperCase();
    /* @instance | coinbase */
    this.coinbase = new Coinzone.Coinbase();
    /* @instance | indicator */
    for (const [id, interval] of Object.entries(config)) {
      this.indicator.set(id, interval);
    }
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

  /**
   * @function update
   * @param  { Array } log
   */
  update (log=[]) {
    this.candles.set(log);
    this.indicator.update( this.candles.last["close"]);
  }
}