/**
 * @module utils
 */
module.exports = {
  /**
   * @function  combinations 
   * @desc      return all possible combinations on an optional *repeatable config
   * @param   { Array }   data   []
   * @param   { Number }  size   2
   * @param   { Boolean } repeat false
   * @return  { Array }
   */
  combinations: require('./combinations'),
  /**
   * @function  permutations 
   * @desc      return all possible permutations on an optional *repeatable config
   * @param   { Array }   data   []
   * @param   { Boolean } repeat false
   * @return  { Array }
   */
  permutations: require('./permutations'),
  /**
   * @function  powerSet
   * @desc      iterate and return all possible set combinations from array
   * @param   { Array } data []
   * @return  { Array }
   */
  powerSet: require('./power-set')
}