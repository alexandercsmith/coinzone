/**
 * @module test/coinzone
 */
const { expect } = require('chai');


/**
 * @class
 */
const Coinzone = require('../src');


/**
 * @test
 */
describe('@class Coinzone', () => {
  /**
   * @static
   */
  describe('@static', () => {
    /**
     * @property { Class } Coinbase
     */
    it('should have @property #Model', () => {
      expect(Coinzone).to.haveOwnProperty('Coinbase');
    });

    /**
     * @property { Class } Strategy
     */
    it('should have @property #Model', () => {
      expect(Coinzone).to.haveOwnProperty('Strategy');
    });

    /**
     * @property { Module } utils
     */
    it('should have @property #Model', () => {
      expect(Coinzone).to.haveOwnProperty('utils');
    });
  });


  /**
   * @instance
   */
  describe('@instance', () => {
    /**
     * @interface coinzone
     */
    const coinzone = new Coinzone();

    /**
     * @property { String } base 
     */
    it('should have @property #base', () => {
      expect(coinzone).to.haveOwnProperty('base');
    });

    it('should return @property #base of type { String }', () => {
      expect(typeof coinzone.base).to.equal('string');
    });

    /**
     * @property { String } quote
     */
    it('should have @property #quote', () => {
      expect(coinzone).to.haveOwnProperty('quote');
    });

    it('should return @property #quote of type { String }', () => {
      expect(typeof coinzone.quote).to.equal('string');
    });

    /**
     * @property { Class } coinbase
     */
    it('should have @property #coinbase', () => {
      expect(coinzone).to.haveOwnProperty('coinbase');
    });

    it('should return @property #coinbase of type { Object }', () => {
      expect(typeof coinzone.coinbase).to.equal('object');
    });

    /**
     * @property { Class } strategy
     */
    it('should have @property #strategy', () => {
      expect(coinzone).to.haveOwnProperty('strategy');
    });

    it('should return @property #strategy of type { Object }', () => {
      expect(typeof coinzone.strategy).to.equal('object');
    });
  });
});