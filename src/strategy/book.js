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


  /* --- { Book } : [props] --- */


  /**
   * @property { Map } signals
   */
  signals = new Map();


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
      ...this.signals[Symbol.iterator]()
    ].map(([_id, _signal]) => 
      [_id, _signal.getResult().toFixed(2)||'']));
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
   * @function  signal
   * @type    { setter } 
   * @param   { Object } opts id interval
   */
  set signal ({ id, interval=3 }) {
    /* validate id */
    if (!Object.keys(Book.Signal).includes(id)) {
      throw new Error('Invalid Indicator Id');
    }
    /* new Signal */
    const _signal = new Book.Signal[id](interval);
    /* [close] => { Signal } */
    this.close.forEach(rate => _signal.update(rate));
    /* [signals] << { Signal } */
    this.signals.set(id, _signal);
  }


  /**
   * @function  update
   * @type    { setter } 
   * @param   { Array } input 
   */
  set update (input=[]) {
    /* new Candle */
    const _candle = new Book.Candle(input);
    /* iterate { indicators } and update */
    for (const [_, _signal] of this.signals.entries()) {
      _signal.update(_candle.close);
    }
    /* logs[] << { Candle } */
    this.logs.push(_candle);
  }
}