/**
 * @module test/candle
 */
const { expect } = require('chai');


/**
 * @class
 */
const Candle = require('../src/candle');


/**
 * @test
 */
describe('@class Candle', () => {

  /**
   * @static
   */
  describe('@static', () => {
    /**
     * @property { Array } Model
     */
    it('should have @property #Model', () => {
      expect(Candle).to.haveOwnProperty('Model');
    });
  });

  /**
   * @instance
   */
  describe('@instance', () => {
    /**
     * @params
     */
    const _time   = Date.now();
    const _low    = 50100.15;
    const _high   = 51020.20;
    const _open   = 50500.35;
    const _close  = 50750.45;
    const _volume = 44199.54;

    /**
     * @instance
     */
    const candle = new Candle([
      _time, 
      _low, 
      _high, 
      _open, 
      _close, 
      _volume
    ]);

    /**
     * @property { Number } time
     */
    it('should have @property #time', () => {
      expect(candle.time).to.equal(_time);
    });

    /**
     * @property { Number } low
     */
    it('should have @property #low', () => {
      expect(candle.low).to.equal(_low);
    });

    /**
     * @property { Number } high
     */
    it('should have @property #high', () => {
      expect(candle.high).to.equal(_high);
    });

    /**
     * @property { Number } open
     */
    it('should have @property #open', () => {
      expect(candle.open).to.equal(_open);
    });

    /**
     * @property { Number } close
     */
    it('should have @property #close', () => {
      expect(candle.close).to.equal(_close);
    });

    /**
     * @property { Number } volume
     */
    it('should have @property #volume', () => {
      expect(candle.volume).to.equal(_volume);
    });
  })
});