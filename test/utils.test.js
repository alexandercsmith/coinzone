/**
 * @module test/utils
 */
const { expect } = require('chai');


/**
 * @module utils
 */
const utils = require('../src/utils');


/**
 * @test
 */
describe('@module utils', () => {
  /**
   * @static
   */
  const data = ['a', 'b', 'c'];

  /**
   * @function combinations
   */
  describe('@function combinations', () => {
    it('should return (4) { Array } items of non-repeating combinations', () => {
      expect(utils.combinations(data, false).length).to.equal(4);
    });

    it('should return (6) { Array } items of repeating combinations', () => {
      expect(utils.combinations(data, true).length).to.equal(6);
    });
  });


  /**
   * @function permutations
   */
  describe('@function permutations', () => {
    it('should return (6) { Array } items of non-repeating permutations', () => {
      expect(utils.permutations(data, false).length).to.equal(6);
    });

    it('should return (27) { Array } items of repeating permutations', () => {
      expect(utils.permutations(data, true).length).to.equal(27);
    });
  });


  /**
   * @function powerSet
   */
  describe('@function powerSet', () => {
    it('should return (8) { Array } item sets', () => {
      expect(utils.powerSet(data).length).to.equal(8)
    });
  });
});