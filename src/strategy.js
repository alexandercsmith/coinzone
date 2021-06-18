/**
 * @module strategy
 */

/*
 Strategy {
   candles:   { log set get* }
   indicator: { signal indicators rates get set update }
 }
 */

/**
 * @class @export { Strategy }
 */
module.exports = class Strategy {
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
   */
  constructor (config={}, logs=[]) {
    /* initialize :indicator signals */
    Object.entries(config).forEach(([id, interval]) => 
    this.indicator.set(id, interval));

    /* initialize candle log data */
    logs.forEach(log => this.update(log));
  }

  /**
   * @function results 
   * @return { Object }
   */
  results () {
    return this.indicator.get();
  }

  /**
   * @function update
   * @param  { Array } log
   */
  update (log=[]) {
    this.candles.set(log);
    this.indicator.update(this.candles.last["close"]);
  }
}