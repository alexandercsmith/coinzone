/**
 * @module candles 
 */
module.exports = {
  /**
   * @property { Array } log
   */
  log: [],

  /**
   * @function set
   * @param  { Array } input
   */
  set (input=[]) {
    this.log.push({
      time:   input[0],
      low:    input[1],
      high:   input[2],
      open:   input[3],
      close:  input[4],
      volume: input[5]
    });
  },

  /**
   * @function last
   * @return { Object }
   */
  get last () { 
    return this.log[this.count-1]; 
  },
  
  /**
   * @function low
   * @return { Array }
   */
  get low () { 
    return this.log.map(candle => candle.low); 
  },
  
  /**
   * @function high 
   * @return { Array }
   */
  get high () { 
    return this.log.map(candle => candle.high); 
  },
  
  /**
   * @function open 
   * @return { Array }
   */
  get open () { 
    return this.log.map(candle => candle.open); 
  },
  
  /**
   * @function close 
   * @return { Array }
   */
  get close () { 
    return this.log.map(candle => candle.close); 
  },
  
  /**
   * @function volume 
   * @return { Array }
   */
  get volume () { 
    return this.log.map(candle => candle.volume); 
  },
  
  /**
   * @function count
   * @return { Number }
   */
  get count () { 
    return this.log.length; 
  }
}