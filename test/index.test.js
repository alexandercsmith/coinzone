/**
 * @module test/index
 */
const Coinzone = require('../src/app');


/**
 * @async @function main 
 */
async function main () {
  try {
    const coinzone = new Coinzone();

    const initialize = await coinzone.loadCandles();

    console.log('\n=>', coinzone, '\n');

  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));