/**
 * @module test/coinbase
 */
const { expect } = require('chai');


/**
 * @class
 */
const { Coinbase } = require('../lib');


/**
 * @test
 */
describe('@class Coinbase', () => {
  /**
   * @static
   */
  describe('@static', () => {
    /**
     * @property { Object } Granularity
     */
    it('should have @property #Granularity', () => {
      expect(Coinbase).to.haveOwnProperty('Granularity');
    });

    /**
     * @property { Object } OrderParam
     */
    it('should have @property #OrderParam', () => {
      expect(Coinbase).to.haveOwnProperty('OrderParam');
    });

    /**
     * @property { Function } Websocket
     */
    it('should have @property #Websocket', () => {
      expect(Coinbase).to.haveOwnProperty('Websocket');
    });
  });


  /**
   * @instance
   */
  describe('@instance', () => {
    /**
     * @interface
     */
    const coinbase = new Coinbase({});

    /**
     * @property { String } clientId 
     */
    it('should have @property #clientId', () => {
      expect(coinbase).to.haveOwnProperty('clientId');
    });

    it('should return @property #clientId of type { String }', () => {
      expect(typeof coinbase.clientId).to.equal('string');
    });
  });
});