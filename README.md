# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

__Status__: _`WIP`_

## Install

```bash
# Install package dependencies
$ npm install
```

### Testing

```bash
# Run benchmark unit tests
$ npm test
```

---

## [`Coinzone`](./src/index.js)

```js
// @class { Coinzone }
const Coinzone = require('./src');

// @static 
const { 
  /* @class { Coinbase } */
  Coinbase: { 
    /* @object */
    Granularity, 
    /* @function */
    Websocket
  }, 
  /* @class { Strategy } */
  Strategy: {
    /* @class { Book } */
    Book: {
      /* @module */
      Signal: {
        ...(`trading-signals`)
      },
      /* @class { Candle } */
      Candle: {
        Model
      }
    }
  }, 
  /* @module */
  utils: {
    /* @function */
    combinations,
    /* @function */
    permutations,
    /* @function */
    powerSet
  } 
} = Coinzone;

// @instance { Coinzone }
const coinzone = new Coinzone({ 
  base:  "BTC",
  quote: "USD",
  coinbase: {
    key,
    phrase,
    secret,
    sandbox
  },
  strategy: { 
    ... 
  } 
});

// @instance { Coinzone } - load initial candle data in parallel
const coinzoneWithLoad = new Coinzone({
  ...
}).load();

/* @instance { new Coinzone }
 coinzone {
   base:     "BTC",
   quote:    "USD",
   coinbase: { new Coinbase },
   strategy: { new Strategy },

   get indicator // => String
   get results   // => Object
   
   async init ()
 }
 */
```

---

## References

> API Documentation and NPM Packages

### Documentation

* [Coinbase Pro API](https://docs.pro.coinbase.com)

### Packages

* [_npm_: `axios`](https://npmjs.com/package/axios)
* [_npm_: `chai`](https://npmjs.com/package/chai)
* [_npm_: `dotenv`](https://npmjs.com/package/dotenv)
* [_npm_: `mocha`](https://npmjs.com/package/mocha)
* [_npm_: `trading-signals`](https://npmjs.com/package/trading-signals)
* [_npm_: `ws`](https://npmjs.com/package/ws)

### Testing

* [Chai.js](https://chaijs.com)
* [Mocha.js](https://mochajs.org)