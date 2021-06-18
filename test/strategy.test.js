/**
 * @module test/strategy
 */
const app = require('../src');
const data = require('./candles/1d.json');


/**
 * @async 
 * @function main 
 */
async function main () {
  try {
    const strategy = new app.Strategy({
      // atr:  10,
      dema: 10,
      // dma:  10,
      // ema:  15,
      // macd: 10,
      roc:  10,
      rsi:  10,
      sma:  5,
      smma: 10
    }, data);

    console.log('\n=>', strategy.results());

  } catch (e) {
    console.error('[test] strategy', e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));