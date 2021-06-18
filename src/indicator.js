/**
 * @module indicator 
 */

/*
 Indicator {
   Signal:     TradingSignals
   indicators: Map
   rates:      []
   
   get    (id) => Number|[Number]
   set    (id, interval)
   update (rate)
 } 
 */

module.exports = {
  /**
   * @property { Object } TS
   */
  Signal: require('trading-signals'),

  /**
   * @property { Map } indicators 
   */
  indicators: new Map(),

  /**
   * @property { Array } rates
   */
  rates: [],

  /**
   * @function get
   * @param  { String } id 
   * @return { Number }
   */
  get (id="") {
    if (!!id) {
      return this.indicators.get(id.toUpperCase()).getResult().toFixed(2);
    }
    let result = {};
    for (const [id, indicator] of this.indicators.entries()) {
      result[id] = indicator.getResult().toFixed(2);
    }
    return result;
  },

  /**
   * @function set
   * @param  { String } id 
   * @param  { Number } interval 3
   */
  set (id, interval=3) {
    id = id.toUpperCase();
    if (Object.keys(this.Signal).includes(id)) {
      this.indicators.set(id, new this.Signal[id](interval));
      this.rates.forEach(rate => this.indicators.get(id).update(rate));
    }
  },

  /**
   * @function update
   * @param  { Number } input 
   */
  update (input) {
    input = typeof input === "object" ? input["close"] : input;
    this.rates.push(input);
    this.indicators.forEach(indicator => indicator.update(input));
  }
}