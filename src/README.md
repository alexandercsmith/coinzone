# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## APPLICATION

> Coinzone Source Application Interface

* [`Strategy`](./strategy/README.md)
* [`Utilities`](./utils/README.md)


### [`Coinbase`](./coinbase.js)

```js
// Initialize new Coinbase class
const coinbase = new Coinbase();

// Initialize `production` Coinbase class
const coinbase = new Coinbase(true);

// Initialize Coinbase Websocket client instance
const websocket = Coinbase.Websocket();
```