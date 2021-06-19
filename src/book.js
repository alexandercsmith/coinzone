/**
 * @module book
 */
module.exports = class Book {
  /**
   * @static @module
   * @name Signal
   * @interface Indicator
   */
  static Signal = require('trading-signals');


  /**
   * @static @class
   * @name Candle
   * @interface CandleSet
   */
  static Candle = require('./candle');


  /**
   * @constructor
   * @param   { Array<Array> } data 
   * @interface Book
   */
  constructor (data=[]) {
    for (const i in data) { 
      this.set(data[i]); 
    }
  }


  /* --- {CandleSet} : [props] --- */


  /**
   * @property { Map } indicators
   * @interface  Book
   */
  indicators = new Map();


  /**
   * @property { Array } logs
   * @interface  Book
   */
  logs = [];


  /* --- {CandleSet} : [getters] --- */


  /**
   * @function  results
   * @type    { getter }
   * @interface Book
   * @return  { Object<Number> }
   */
  get results () {
    return Object.fromEntries([
      ...this.indicators[Symbol.iterator]()
    ].map(([_id, _indicator]) => 
      [_id, _indicator.getResult().toFixed(2)||'']));
  }


  /**
   * @function  low
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get low () { 
    return this.logs.map(_candle => _candle.low);    
  }


  /**
   * @function  high 
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get high () { 
    return this.logs.map(_candle => _candle.high);   
  }


  /**
   * @function  open
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get open () { 
    return this.logs.map(_candle => _candle.open);   
  }


  /**
   * @function  close
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get close () { 
    return this.logs.map(_candle => _candle.close);  
  }


  /**
   * @function  volume
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get volume () { 
    return this.logs.map(_candle => _candle.volume); 
  }


  /**
   * @function  count
   * @type    { getter }
   * @interface Book
   * @return  { Array }
   */
  get count () { 
    return this.logs.map(_candle => _candle.count);  
  }


  /* --- {CandleSet} : [setters] --- */


  /**
   * @function  set
   * @type    { setter }
   * @param   { Array } input 
   * @interface Book
   */
  set (input=[]) {
    this.logs.push(new Book.Candle(input));
  }


  /**
   * @function  indicator
   * @type    { setter } 
   * @interface Book
   * @param   { Object } opts id interval
   */
  set indicator ({ id, interval=3 }) {
    if (!Object.keys(Book.Signal).includes(id)) throw new Error('Invalid Indicator Id');
    const _indicator = new Book.Signal[id](interval);
    this.close.forEach(rate => _indicator.update(rate));
    this.indicators.set(id, _indicator);
  }


  /**
   * @function  update
   * @type    { setter } 
   * @interface Book
   * @param   { Array } input 
   */
  set update (input=[]) {
    const _candle = new Book.Candle(input);
    for (const [_, _indicator] of this.indicators.entries()) {
      _indicator.update(_candle.close);
    }
    this.logs.push(_candle);
  }
}