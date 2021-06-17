/**
 * @module algorithm
 * @desc   { Array } prototype extension algorithm operations
 */


/**
 * @function  combinations 
 * @desc      return all possible combinations on an optional *repeatable config
 * @extends { Array }
 * @param   { Number }  size   2
 * @param   { Boolean } repeat false
 */
Array.prototype.combinations = function (size=2, repeat=false) {
  if (size === 1) { return repeat ? this.map(opt => [opt]) : [this]; }
  const arr = [];
  this.forEach((current, index) => {
    const sub = this.slice(repeat ? index : index+1).combinations(size-1, repeat) ;
    sub.forEach((obj) => arr.push([current].concat(obj)));
  });
  return arr;
}


/**
 * @function  permutations 
 * @desc      return all possible permutations on an optional *repeatable config
 * @extends { Array }
 * @param   { Boolean } repeat false
 */
Array.prototype.permutations = function (repeat=false, size=this.length) {
  if (size === 1) { return repeat ? this.map((opt) => [opt]) : [this]; }
  const arr  = [];
  const subs = repeat ? this.permutations(true, size-1) : this.slice(1).permutations();
  if (repeat) { 
    this.forEach((obj) => subs.forEach((sub) => arr.push([obj].concat(sub)))); 
  } else {
    const opt  = this[0];
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


/**
 * @function  powerSet
 * @desc      iterate and return all possible set combinations from array
 * @extends { Array }
 */
Array.prototype.powerSet = function () {
  const arr = [];
  const t = 2 ** this.length;
  for (let i = 0; i < t; i += 1) {
    const sub = [];
    for (let ii = 0; ii < this.length; ii += 1) {
      if (i & (1 << ii)) { sub.push(this[ii]); }
    }
    arr.push(sub);
  }
  return arr;
}