/**
 * @module  scripts/markets
 * @desc    coinbase market data and technical analysis 
 * @extends Coinzone
 * @refs    $ npm run script:markets
 */
module.exports = new class Markets extends require('../lib') {
  /**
   * @constructor 
   */
  constructor () {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('\n>', 'starting script markets... \n');
    }

    /* @class Coinzone */
    super({
      signals: {
        ema: 10,
        sma: 7,
      }
    });

    /* @call init */
    this.init();
  }
  
  /**
   * @async @function init
   */
  async init () {
    try {
      await this.load();
      console.log('\n> results:', this.results);
    } catch (e) {
      console.error('[scripts] Markets', e.message);
      process.exit(1);
    }
  }
}