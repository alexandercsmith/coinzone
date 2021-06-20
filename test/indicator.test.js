/**
 * @module test/signal
 */
const Indicator = require('../src/strategy');


/**
 * @async @function main 
 */
async function main () {
  console.time('> [duration]');

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
    console.log('\n=>', indicator.results, '\n');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  console.timeEnd('> [duration]');
}


/**
 * @instance 
 */
main().then(() => { 
  console.log('\n>', '[complete] \n');
  process.exit(0) 
});