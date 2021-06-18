/**
 * @module test/indicat
 */
const candles   = require('../src/candles');
const indicator = require('../src/indicator');


/**
 * @static
 */
const data = require('./candles');


/**
 * @async @function main 
 */
async function main () {
  try {
    // load candle data individually
    data["1h"].forEach(log => 
      candles.set(log));

    // add indicators
    indicator.set('sma', 7);
    indicator.set('smma', 10);

    // add candle data to indicator 
    candles.close.forEach(rate => 
      indicator.update(rate));

    // get results
    console.log(
      '\n=>', ' SMA', indicator.get('sma'), 
      '\n=>', 'SMMA', indicator.get('smma'));
      
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));