/**
 * @module  scripts/accumulate
 * @desc    accumulation automation of specified base currency using quote as currency of trade
 * @extends Coinzone
 * @refs    $ npm run script:accumulate
 */
module.exports = new class Accumulate extends require('../src') {
  /**
   * @constructor 
   */
  constructor () {
    /* @class Coinzone */
    super({
      strategy: {
        sma: 7
      }
    }).load();
  }

  
  /**
   * @async @function init
   */
  async init () {
    try {
      console.log('> results:', this.strategy.results);
    } catch (e) {
      console.error('[script] Accumulate', e.message);
      process.exit(1);
    }
  }
}