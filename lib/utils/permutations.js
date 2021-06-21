/**
 * @function  permutations 
 * @desc      return all possible permutations on an optional *repeatable config
 * @param   { Array }   data   []
 * @param   { Boolean } repeat false
 * @return  { Array }
 */
module.exports = function permutations (data=[], repeat=false, size=data.length) {
  if (size === 1) { return repeat ? data.map((opt) => [opt]) : [data]; }
  const arr  = [];
  const subs = repeat ? permutations(data, true, size-1) : permutations(data.slice(1));
  if (repeat) { 
    data.forEach((obj) => subs.forEach((sub) => 
    arr.push([obj].concat(sub)))); 
  } else {
    const opt  = data[0];
    for (let i = 0; i < subs.length; i += 1) {
      const sub = subs[i];
      for (let ii = 0; ii <= sub.length; ii += 1) {
        const prefix = sub.slice(0, ii);
        const suffix = sub.slice(ii);
        arr.push(prefix.concat([opt], suffix));
      }
    }
  }
  return arr;
}