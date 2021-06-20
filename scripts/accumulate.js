/**
 * @module scripts/accumulate
 * @desc   accumulation automation of specified base currency using quote as currency of trade
 * @refs   $ npm run script:accumulate
 */
const Coinzone = require('../src');


/**
 * @async @function main
 */
async function main () {
  try {
    const coinzone = new Coinzone({
      strategy: { 
        sma: 7 
      }
    });

    await coinzone.init();

    console.log('\n=>', coinzone.results, '\n');
  } catch (e) {
    console.error('Coinzone: script accumulate', e.message);
    process.exit(1);
  }
}


/**
 * @instance 
 */
main().then(() => {
  console.log('> starting accumulation...');
  process.exit(0);
});