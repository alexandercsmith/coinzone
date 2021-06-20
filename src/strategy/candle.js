/**
 * @module candle 
 */
module.exports = class Candle {
  /**
   * @static @constant Model
   * @type    { Array<String> }
   */
  static Model = [
    "time",   // [0]
    "low",    // [1]
    "high",   // [2]
    "open",   // [3]
    "close",  // [4]
    "volume"  // [5]
  ];

  
  /**
   * @constructor
   * @param   { Array<Number> } input
   */
  constructor (input=[]) {
    if (input.length !== 6) throw new Error('Invalid Candle Input');
    for (let i = 0; i < input.length; i++) { 
      this[Candle.Model[i]] = input[i]; 
    }
  }
}