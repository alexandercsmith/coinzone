/**
 * @module test/index
 */
const Coinzone = require('../src');


/**
 * @async @function main 
 */
async function main () {
  console.time('> [duration]');

  try {
    console.log('\n=>', Coinzone, '\n');

    const coinzone = new Coinzone({ 
      strategy: {
        signals: [{  
          id: "rsi", interval: 10 },{ 
          id: "ema", interval: 20 },{ 
          id: "sma", interval: 7 
        }]
      } 
    });
    
    console.log('\n=>', coinzone, '\n');
  } catch (e) {
    console.error(e);
    throw new Error(e);
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