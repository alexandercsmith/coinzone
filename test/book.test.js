/**
 * @module test/book
 */
const { expect } = require('chai');


/**
 * @class
 */
const Book = require('../lib/book');


/**
 * @test
 */
describe('@class Book', () => {
  /**
   * @static
   */
  describe('@static', () => {
    /**
     * @property { Object } Signal
     */
    it('should have @property #Signal', () => {
      expect(Book).to.haveOwnProperty('Signal');
    });
  });


  /**
   * @instance
   */
  describe('@instance', () => {
    /**
     * @interface book
     */
    const book = new Book();
    
    /**
     * @property { Map } signals 
     */
    it('should have @property #signals', () => {
      expect(book).to.haveOwnProperty('signals');
    });

    /**
     * @property { Array } signals 
     */
    it('should have @property #logs', () => {
      expect(book).to.haveOwnProperty('logs');
    });

    /**
     * @function results
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #results and returns Object', () => {
      expect(typeof book.results).to.equal('object');
    });

    /**
     * @function low
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #low and returns Object', () => {
      expect(typeof book.low).to.equal('object');
    });

    /**
     * @function high
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #high and returns Object', () => {
      expect(typeof book.high).to.equal('object');
    });

    /**
     * @function open
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #open and returns Object', () => {
      expect(typeof book.open).to.equal('object');
    });

    /**
     * @function close
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #close and returns Object', () => {
      expect(typeof book.close).to.equal('object');
    });

    /**
     * @function volume
     * @return { Object<Array<Candle>> }
     */
    it('should define @function #volume and returns Object', () => {
      expect(typeof book.volume).to.equal('object');
    });
  });
});