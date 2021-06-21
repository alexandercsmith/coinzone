# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## [`Coinzone`](./index.js)

> Coinzone Class Interface Source

```js
// @class { Coinzone }
const Coinzone = require('.');

// @static 
const { 
  Book: {         /* @class { Book } */
    Signal: {     /* @imports */
      ...('trading-signals')
    }
  },           
  Coinbase: {     /* @class { Coinbase } */
    Granularity,  /* @object */
    OrderParam,   /* @object */
    Websocket     /* @function */
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
  signals: { 
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
   books:    Map,

   get indicator // => String
   get results   // => Object
   get lows      // => Object
   get highs     // => Object
   get opens     // => Object
   get closes    // => Object
   get volumes   // => Object

   set signal
   set update
   
   async load ()
   async loadCandles () 
 }
 */
```

---