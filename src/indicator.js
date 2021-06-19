/**
 * @module Indicator
 */
module.exports = class Indicator {
  /**
   * @static @class
   * @name Book
   * @interface Indicator
   */
  static Book = require('./book');


  /**
   * @constructor 
   * @param   { Object } data
   * @interface Indicator
   */
  constructor ({
    books   = ["1m", "5m", "15m", "1h", "6h", "1d"],
    data    = {},
    signals = [],
  }) {
    /* initialize { Book } models */
    books.forEach(id => this.book = { id, input: data[id]||[] });

    /* initialize [Book] signals */
    signals.forEach(signal => this.signal = signal);
  }


  /* --- { Indicator } : [props] --- */


  /**
   * @property { Map } books 
   * @interface  Indicator
   */
  books = new Map();


  /* --- { Indicator } : [getters] --- */


  /**
   * @function  results
   * @type    { getter }
   * @interface Indicator 
   * @return  { Object<Object> }
   */
  get results () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.results]));
  }


  /**
   * @function  lows 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Array> }
   */
  get lows () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.low]));
  }


  /**
   * @function  highs 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Array> }
   */
  get highs () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.high]));
  }


  /**
   * @function  opens 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Array> }
   */
  get opens () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.open]));
  }


  /**
   * @function  closes 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Array> }
   */
  get closes () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.close]));
  }


  /**
   * @function  volumes 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Array> }
   */
  get volumes () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.volume]));
  }
  

  /**
   * @function  counts 
   * @type    { getter }
   * @interface Indicator
   * @return  { Object<Number> }
   */
  get counts () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.count]));
  }


  /* --- { Indicator } : [setters] --- */


  /**
   * @function  book
   * @type    { setter }
   * @interface Indicator
   * @param   { Object } opts 
   */
  set book ({ id, input=[] }) {
    this.books.set(id, new Indicator.Book(input));
  }


  /**
   * @function  signal
   * @type    { setter }
   * @interface Indicator
   * @param   { Object } opts id interval(3)
   */
  set signal ({ id, interval=3 }) {
    [...this.books[Symbol.iterator]()].forEach(([_, _book]) => {
      _book.indicator = { 
        id:       id.toUpperCase(), 
        interval: interval >= 3 ? interval : 3 
      };
    });
  }
}