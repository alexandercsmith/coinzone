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

## Development

```bash
# Start development server
$ npm start
```

---

## [`Coinzone`](./src/index.js)

```js
// @class { Coinzone }
const Coinzone = require('./src');

// @static 
const { 
  Coinbase: { 
    Granularity, 
    Websocket
  }, 
  Strategy: {
    Book: {
      Signal: {
        ...(`trading-signals`)
      },
      Candle: {
        Model
      }
    }
  }, 
  utils: {
    combinations,
    permutations,
    powerSet
  } 
} = Coinzone;

// @instance
const coinzone = new Coinzone({ base: "BTC", strategy: { ... } });

/* @instance { new Coinzone }
 coinzone {
   base: "BTC",
   quote: "USD",
   coinbase: { new Coinbase },
   strategy: { new Strategy }
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