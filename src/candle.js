/**
 * @module candle 
 */
module.exports = class Candle {
  /**
   * @static @constant Schema
   * @type    { Array<String> }
   * @interface Candle
   */
  static Schema = ["time", "low", "high", "open", "close", "volume"];

  
  /**
   * @constructor
   * @param   { Array<Number> } input
   * @interface Candle
   */
  constructor (input=[]) {
    if (input.length !== 6) throw new Error('Invalid Candle Input');
    for (let i = 0; i < input.length; i++) { 
      this[Candle.Schema[i]] = input[i]; 
    }
  }
}