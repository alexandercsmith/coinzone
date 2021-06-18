/**
 * @module indicator 
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
    if (Object.keys(this.Signal).includes(id.toUpperCase())) {
      this.indicators.set(id.toUpperCase(), new this.Signal[id.toUpperCase()](interval));
      this.rates.forEach(rate => this.indicators.get(id.toUpperCase()).update(rate));
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