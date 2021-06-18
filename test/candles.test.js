/**
 * @module test/candles
 */
const candles = require('../src/candles');


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
    console.log('\n=> count:', candles.count);
    console.log('\n=>  last:', candles.last);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));