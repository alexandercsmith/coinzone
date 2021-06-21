# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## [`Coinzone`](./index.js)

> Coinzone Class Interface Source

```js
// @class { Coinzone }
const Coinzone = require('./src');

// @static 
const { 
  Coinbase: {     /* @class { Coinbase } */
    Granularity,  /* @object */
    OrderParam,   /* @object */
    Websocket     /* @function */
  }, 
  Strategy: {     /* @class { Strategy } */
    Book: {       /* @class { Book } */
      Signal: {   /* @package */
        ...(`trading-signals`)
      },
      Candle: {   /* @class { Candle } */
        Model     /* @object */
      }
    }
  }, 
  utils: {        /* @module */
    combinations, /* @function */
    permutations, /* @function */
    powerSet      /* @function */
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
const coinzoneWithDataLoad = new Coinzone({
  ...
}).load();

/* @instance { new Coinzone }
 coinzone {
   base:     "BTC",
   quote:    "USD",
   coinbase: { new Coinbase },
   strategy: { new Strategy },

   get indicator // => String
   
   async init ()
 }
 */
```

---