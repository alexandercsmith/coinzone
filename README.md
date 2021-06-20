# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

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

## Development

```bash
# Start development server
$ npm start
```

---

## [`Coinzone`](./src/index.js)

```js
// Coinzone static module interfaces
const { 
  Coinbase: { 
    Granularity, 
    WS 
  }, 
  Strategy: {
    Book: {
      Signal,
      Candle
    }
  }, 
  utils: {
    combinations,
    permutations,
    powerSet
  } 
} = Coinzone;

// Initialize Coinzone class instance
const coinzone = new Coinzone({ base: "BTC", strategy: { ... } });

/*
 coinzone {
   base: "BTC",
   api: { Coinbase },
   strategy: { Strategy }
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
* [_npm_: `dotenv`](https://npmjs.com/package/dotenv)
* [_npm_: `trading-signals`](https://npmjs.com/package/trading-signals)
* [_npm_: `ws`](https://npmjs.com/package/ws)