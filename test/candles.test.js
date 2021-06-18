/**
 * @module test/candles
 */
const candles = require('../src/candles');


/**
 * @static
 */
const data = require('./candles');


/**
 * @async @function main 
 */
async function main () {
  try {
    for (const i in data) {
      data[i].forEach(log => candles.set(log));
      
      console.log('\n=> count:', candles.count);
      console.log('\n=>  last:', candles.last);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));