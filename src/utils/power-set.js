/**
 * @function  powerSet
 * @desc      iterate and return all possible set combinations from array
 * @param   { Array } data []
 * @return  { Array }
 */
module.exports = function powerSet (data=[]) {
  const arr = [];
  const t = 2 ** data.length;
  for (let i = 0; i < t; i += 1) {
    const sub = [];
    for (let ii = 0; ii < data.length; ii += 1) {
      if (i & (1 << ii)) { sub.push(data[ii]); }
    }
    arr.push(sub);
  }
  return arr;
}