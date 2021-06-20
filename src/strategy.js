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
  constructor (signals=[]) {
    /* initialize indicator(Map:books] signals */
    signals.forEach(signal => this.signal = signal);
  }


  /* --- { Strategy } : [props] --- */


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


  /* --- { Strategy } : [getters] --- */


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


  /* --- { Strategy } : [setters] --- */


  /**
   * @function  signal
   * @type    { setter }
   * @param   { Object } opts id interval(3)
   */
  set signal ({ id, interval=3 }) {
    [...this.books[Symbol.iterator]()].forEach(([_, _book]) => {
      _book.signal = { 
        id:       id.toUpperCase(), 
        interval: interval >= 3 ? interval : 3 
      };
    });
  }


  /**
   * @function  update
   * @type    { setter }
   * @param   { Array<Number> } input
   */
  set update (input=[]) {
    for (const [_, _book] of this.books.entries()) {
      _book.update = input;
    }
  }
}