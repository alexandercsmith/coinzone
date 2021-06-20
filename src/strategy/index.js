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
   * @param   { Object } data
   */
  constructor ({
    books   = ["1m", "5m", "15m", "1h", "6h", "1d"],
    data    = {},
    signals = [],
  }) {
    /* initialize { Book } models => indicator(Map:books) */
    books.forEach(id => this.book = { id, input: data[id]||[] });

    /* initialize indicator(Map:books] signals */
    signals.forEach(signal => this.signal = signal);
  }


  /* --- { Indicator } : [props] --- */


  /**
   * @property { Map } books 
   */
  books = new Map();


  /* --- { Indicator } : [getters] --- */


  /**
   * @function  results
   * @type    { getter }
   * @return  { Object<Object> }
   */
  get results () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.results]));
  }


  /**
   * @function  lows 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get lows () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.low]));
  }


  /**
   * @function  highs 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get highs () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.high]));
  }


  /**
   * @function  opens 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get opens () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.open]));
  }


  /**
   * @function  closes 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get closes () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.close]));
  }


  /**
   * @function  volumes 
   * @type    { getter }
   * @return  { Object<Array> }
   */
  get volumes () {
    return Object.fromEntries([...this.books[Symbol.iterator]()
    ].map(([_id, _book]) => [_id, _book.volume]));
  }
  

  /**
   * @function  counts 
   * @type    { getter }
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
   * @param   { Object } opts 
   */
  set book ({ id, input=[] }) {
    this.books.set(id, new Strategy.Book(input));
  }


  /**
   * @function  signal
   * @type    { setter }
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