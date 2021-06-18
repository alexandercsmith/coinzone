/**
 * @module test/indicat
 */
const candles   = require('../src/candles');
const indicator = require('../src/indicator');


/**
 * @static
 */
const data = require('./candles/1_day.json');


/**
 * @async @function main 
 */
async function main () {
  try {
    // load candle data individually
    data.forEach(log => candles.set(log));

    // add indicator 
    indicator.set('sma', 7);

    // add candle data to indicator 
    candles.close.forEach(rate => indicator.update(rate));

    // add indicator
    indicator.set('smma', 10);

    // get results
    console.log('\n=>', indicator.get('sma'), indicator.get('smma'));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));