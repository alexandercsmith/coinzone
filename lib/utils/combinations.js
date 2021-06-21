/**
 * @function  combinations 
 * @desc      return all possible combinations on an optional *repeatable config
 * @param   { Array }   data   []
 * @param   { Number }  size   2
 * @param   { Boolean } repeat false
 * @return  { Array }
 */
module.exports = function combinations (data=[], repeat=false, size=2) {
  if (size === 1) { return repeat ? data.map(opt => [opt]) : [data]; }
  const arr = [];
  data.forEach((current, index) => {
    const sub = data.slice(repeat ? index : index+1)
    const subcombo = combinations(sub, size-1, repeat) ;
    subcombo.forEach((obj) => arr.push([current].concat(obj)));
  });
  return arr;
}