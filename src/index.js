require('dotenv').config();
/**
 * @module src
 */

/*
 Coinzone {
   static Coinbase:  class Coinbase
   static Indicator: class Indicator
   async init ()
   update     ([Number(6)])
 }
 */

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
   * @name Indicator
   */
  static Indicator = require('./indicator');


  /**
   * @static @property { Object } utils
   */
  static utils = require('./utils');


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
    this.indicator = new Coinzone.Indicator();

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
  update (log=[]) {}
}