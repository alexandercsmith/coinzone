/**
 * @module test/index
 */
const app = require('../src');


/**
 * @async @function main 
 */
async function main () {
  try {
    const coinbase = new app.Coinbase();

    const candles = await coinbase.get('profiles');

    console.log('\n=>', candles, '\n');
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));