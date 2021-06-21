require('dotenv').config();
/**
 * @module src
 * @class @export { Coinzone }
 */
module.exports = class Coinzone {
  /**
   * @static @class @name Book
   */
  static Book = require('./book');

  /**
   * @static
   * @interface Coinbase
   */
  static Coinbase = require('./coinbase');

  /**
   * @static 
   * @module utils
   */
  static utils = require('./utils');

  /**
   * @constructor
   * @param { Object } config
   * @prop  { String } base
   * @prop  { String } quote 
   * @prop  { Object } coinbase
   * @prop  { Object } strategy
   */
  constructor ({ 
    base     = "BTC", /* @type { String } */
    quote    = "USD", /* @type { String } */
    coinbase = {},    /* @type { Object } */
    signals  = {}     /* @type { Object }  */
  }) {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'initializing coinzone interface...');
    }

    /**
     * @prop { String } base
     * @prop { String } quote
     */
    this.base  = String(base).toUpperCase();
    this.quote = String(quote).toUpperCase();

    /**
     * @prop { Class } coinbase
     */
    this.coinbase = new Coinzone.Coinbase(
      Object.entries(coinbase).length > 0 
      ? coinbase 
      : {
        key:    process.env.COINBASE_SANDBOX_KEY,
        phrase: process.env.COINBASE_SANDBOX_PHRASE,
        secret: process.env.COINBASE_SANDBOX_SECRET
      });

    /**
     * @prop { Class } strategy
     */
    Object.entries(signals).forEach(([id, interval]) => 
    this.signal = { id, interval });
  }

  /**
   * @prop { Map } books
   */
  books = new Map([
    ["1m",  new Coinzone.Book()],
    ["5m",  new Coinzone.Book()],
    ["15m", new Coinzone.Book()],
    ["1h",  new Coinzone.Book()],
    ["6h",  new Coinzone.Book()],
    ["1d",  new Coinzone.Book()]
  ]);

  /**
   * @async @function load
   * @return { Boolean }
   */
  async load () {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'fetching coinzone initialization data... \n');
    }

    try {
      /* @function loadCandles */
      await this.loadCandles();

      /* @return */
      return true;
    } catch (e) {
      console.error('coinzone: load', e.message);
      throw new Error(e);
    }
  }

  /**
   * @async @function loadCandles
   * @return { Boolean }
   */
  async loadCandles () {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'fetching market candle data... \n');
    }

    try {
      /* @var url */
      const url = `/products/${this.indicator}/candles`;

      /* @loop strategy[books] */
      for (const [granularity, book] of this.books.entries()) {

        /* @debug */
        if (process.env.NODE_ENV === 'development') {
          console.log('>', 'loading', granularity, 'candles...');
        }

        /* @request GET */
        await this.coinbase.get(url, { granularity }).then(logs => 
          logs.forEach(log => book.update = log));
      }

      return true;
    } catch (e) {
      console.error('coinzone: loadCandles', e.message);
      throw new Error(e);
    }
  }

  /**
   * @function indicator
   * @type   { getter }
   * @return { String }
   */
  get indicator () {
    return [this.base, this.quote].join('-');
  }

  /**
   * @function  results
   * @type    { getter }
   * @return  { Object<Object> }
   */
  get results () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.results]));
  }

  /**
   * @function  lows 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get lows () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.low]));
  }


  /**
   * @function  highs 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get highs () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.high]));
  }


  /**
   * @function  opens 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get opens () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.open]));
  }


  /**
   * @function  closes 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get closes () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.close]));
  }


  /**
   * @function  volumes 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get volumes () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.volume]));
  }


  /**
   * @function  counts 
   * @type    { getter }
   * @return  { Object<Number> }
   */
  get counts () {
    return Object.fromEntries([
      ...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => 
      [_id, _book.count]));
  }

  /**
   * @function  book
   * @type    { setter }
   * @param   { Array<Number> } input
   */
  set book (input=[]) {
    /* @loop [books] */
    for (const [_, _book] of this.books.entries()) {
      _book.update = input;
    }
  }

  /**
   * @function  signal
   * @type    { setter }
   * @param   { Object } opts id interval(3)
   */
  set signal (book={ id, interval }) {
    /* @loops [books] */
    for (const [_, _book] of this.books.entries()) {
      _book.signal = { 
        id:       String(book.id).toUpperCase(), 
        interval: book.interval >= 3 ? book.interval : 3 
      };
    }
  }
}