# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## APPLICATION

> Coinzone Source Application Interface


### [`Coinbase`](./coinbase.js)

```js
// Initialize new Coinbase class
const coinbase = new Coinbase();

// Initialize `production` Coinbase class
const coinbase = new Coinbase(true);
```


### [`Indicator`](./indicator.js)

```js
// Initialize Indicator Books 
const indicator = new Indicator({ 
  books:   ["1m", "5m", "15m", "1h", "6h", "1d"], 
  data:    {
    "1m": [
      [ 
        1624031040, /* time */
        36464.99,   /* low  */
        36499.75,   /* high */
        36464.99,   /* open */
        36499.75,   /* close */
        0.25701315  /* volume */
      ],
      ...
    ],
    "5m": [
      ...
    ]
  }, 
  signals: [{
    id: "SMA",
    interval: 5
  }] 
});

// Update Indicator Logs
indicator.update = [Number(6)]

// Get Indicator Book Results
indicator.results
/*
 {
   "1m": {
     "SMA": 52400.23,
     ...
   },
   "5m": {
     "SMA": 51028.29,
     ...
   },
   ...
 }
 */

// Get Indicator Book "low" logs
indicator.lows => { ... }

// Get Indicator Book "high" logs
indicator.highs => { ... }

// Get Indicator Book "open" logs
indicator.opens => { ... }

// Get Indicator Book "close" logs
indicator.closes => { ... }

// Get Indicator Book "volume" logs
indicator.volumes => { ... }
``` 