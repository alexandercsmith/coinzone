/**
 * @module test/coinbase
 */
const { expect } = require('chai');


/**
 * @class
 */
const Coinbase = require('../src/coinbase');


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
     * @property { Function } Websocket
     */
    it('should have @property #Websocket', () => {
      expect(Coinbase).to.haveOwnProperty('Websocket');
    });
  });
});