/**
 * @module Strategy
 */
module.exports = class Strategy {
  /**
   * @static @class @name Book
   */
  static Book = require('./book');
  /**
   * @constructor 
   * @param { Array<Object> } signals
   */
  constructor (strategy={}) {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'initializing strategy interface...');
    }

    /* initialize [Map:books] => signals */
    Object.entries(strategy).forEach(([id, interval]) => 
    this.signal = { 
      id: String(id).toUpperCase(), 
      interval: interval >= 3 ? interval : 3 
    });
  }
  /**
   * @property { Map } books 
   */
  books = new Map([
    ["1m",  new Strategy.Book()],
    ["5m",  new Strategy.Book()],
    ["15m", new Strategy.Book()],
    ["1h",  new Strategy.Book()],
    ["6h",  new Strategy.Book()],
    ["1d",  new Strategy.Book()]
  ]);
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
   * @function  signal
   * @type    { setter }
   * @param   { Object } opts id interval(3)
   */
  set signal (book={}) {
    /* @loops [books] */
    for (const [_, _book] of this.books.entries()) {
      _book.signal = book;
    }
  }
  /**
   * @function  update
   * @type    { setter }
   * @param   { Array<Number> } input
   */
  set update (input=[]) {
    /* @loop [books] */
    for (const [_, _book] of this.books.entries()) {
      _book.update = input;
    }
  }
}