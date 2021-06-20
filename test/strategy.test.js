/**
 * @module test/strategy
 */
const { expect } = require('chai');
/**
 * @class
 */
const Strategy = require('../src/strategy');
/**
 * @test
 */
describe('@class Strategy', () => {
  /**
   * @static
   */
  describe('@static', () => {
    /**
    * @property { Class } Book
    */
    it('should have @property #Book', () => {
      expect(Strategy).to.haveOwnProperty('Book');
    });
  });
});