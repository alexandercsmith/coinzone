# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## APPLICATION

> Coinzone Source Application Interface

### [`Candles`](./candles.js)

```js
const candles = { ... }

// @function set [time, low, high, open, close, volume]
candles.set([Number, Number, Number, Number, Number, Number]);

// @function getters
candles.last   => { Object }
candles.low    => [ Array<Number> ]
candles.high   => [ Array<Number> ]
candles.open   => [ Array<Number> ]
candles.close  => [ Array<Number> ]
candles.volume => [ Array<Number> ]
candles.count  =>  Number
```


### [`Coinbase`](./coinbase.js)

```js
// Initialize new Coinbase class
const coinbase = new Coinbase();

// Initialize `production` Coinbase class
const coinbase = new Coinbase(true);
```


### [`Indicator`](./indicator.js)

```js
const indicator = { ... }

// @function get 
indicator.get()   => { ... }
indicator.get(id) =>  Number

// @function set
indicator.set(id, interval);

// @function update
indicator.update(Number)
```