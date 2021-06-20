/**
 * @module book
 */
module.exports = class Book {
  /**
   * @static @module TradingSignals
   */
  static Signal = require('trading-signals');


  /**
   * @static @class @name Candle
   */
  static Candle = require('./candle');


  /**
   * @constructor
   * @param   { Array<Array> } data 
   */
  constructor (data=[]) {
    for (const i in data) { 
      this.set(data[i]); 
    }
  }


  /* --- { Book } : [props] --- */


  /**
   * @property { Map } indicators
   */
  indicators = new Map();


  /**
   * @property { Array } logs
   */
  logs = [];


  /* --- { Book } : [getters] --- */


  /**
   * @function  results
   * @type    { getter }
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
   * @return  { Array<Number> }
   */
  get low () { 
    return this.logs.map(_candle => _candle.low);    
  }


  /**
   * @function  high 
   * @type    { getter }
   * @return  { Array<Number> }
   */
  get high () { 
    return this.logs.map(_candle => _candle.high);   
  }


  /**
   * @function  open
   * @type    { getter }
   * @return  { Array<Number> }
   */
  get open () { 
    return this.logs.map(_candle => _candle.open);   
  }


  /**
   * @function  close
   * @type    { getter }
   * @return  { Array<Number> }
   */
  get close () { 
    return this.logs.map(_candle => _candle.close);  
  }


  /**
   * @function  volume
   * @type    { getter }
   * @return  { Array<Number> }
   */
  get volume () { 
    return this.logs.map(_candle => _candle.volume); 
  }


  /**
   * @function  count
   * @type    { getter }
   * @return  { Array<Number> }
   */
  get count () { 
    return this.logs.map(_candle => _candle.count);  
  }


  /* --- { Book } : [setters] --- */


  /**
   * @function  set
   * @type    { setter }
   * @param   { Array } input 
   */
  set (input=[]) {
    this.logs.push(new Book.Candle(input));
  }


  /**
   * @function  indicator
   * @type    { setter } 
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