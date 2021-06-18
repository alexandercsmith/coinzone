/**
 * @module test/coinbase
 */
const app = require('../src');


/**
 * @async
 * @function main 
 */
async function main () {
  try {
    const coinbase = new app.Coinbase();

    const logs = await coinbase.get('/products/BTC-USD/candles', { 
      granularity: app.Coinbase.Granularity["1d"]
    });

    console.log('\n> strategy[logs]:', logs);
  } catch (e) {
    console.error('[test] coinbase', e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => process.exit(0));