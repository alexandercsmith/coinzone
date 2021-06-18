/**
 * @module strategy
 */
module.exports = class Strategy {
  /**
   * @constructor 
   */
  constructor (indicators={}) {
    Object.entries(indicators).forEach(([id, interval]) => {
      this.indicator.set(id, interval);
    });
  }

  /**
   * @property { Object } candles
   */
  candles = require('./candles');

  /**
   * @property { Object } indicator
   */
  indicator = require('./indicator');
}