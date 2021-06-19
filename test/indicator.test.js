/**
 * @module test/signal
 */
const Indicator = require('../src/indicator');


/**
 * @async @function main 
 */
async function main () {
  try {
    // initialize indicator with data
    const indicator = new Indicator({
      data: require('./candles'),
      signals: [{  
        id: "rsi", interval: 10 },{ 
        id: "ema", interval: 20 },{ 
        id: "sma", interval: 7 
      }]
    });

    // output
    console.log('\n=>', indicator.results);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));