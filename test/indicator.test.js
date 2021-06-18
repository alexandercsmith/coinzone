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
    data.forEach(log => candles.set(log));
    indicator.set('sma', 7);
    candles.close.forEach(rate => indicator.update(rate));

    indicator.set('smma', 10);

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