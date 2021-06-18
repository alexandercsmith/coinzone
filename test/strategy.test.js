/**
 * @module test/strategy
 */
const app = require('../src');
const data = require('./candles/1_day.json');


/**
 * @async 
 * @function main 
 */
async function main () {
  try {
    const strategy = new app.Strategy({
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