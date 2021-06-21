/**
 * @module test/coinzone
 */
const { expect } = require('chai');


/**
 * @class
 */
const Coinzone = require('../lib');


/**
 * @test
 */
describe('@class Coinzone', () => {
  /**
   * @static
   */
  describe('@static', () => {
    /**
     * @property { Class } Book
     */
    it('should have @property #Book', () => {
      expect(Coinzone).to.haveOwnProperty('Book');
    });

    /**
     * @property { Class } Coinbase
     */
    it('should have @property #Coinbase', () => {
      expect(Coinzone).to.haveOwnProperty('Coinbase');
    });

    /**
     * @property { Module } utils
     */
    it('should have @property #utils', () => {
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
    const coinzone = new Coinzone({});

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
     * @property { Class } books
     */
    it('should have @property #books', () => {
      expect(coinzone).to.haveOwnProperty('books');
    });

    it('should return @property #books of type { Object }', () => {
      expect(typeof coinzone.books).to.equal('object');
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
     * @property { String } quote
     */
    it('should have @property #quote', () => {
      expect(coinzone).to.haveOwnProperty('quote');
    });

    it('should return @property #quote of type { String }', () => {
      expect(typeof coinzone.quote).to.equal('string');
    });
  });
});