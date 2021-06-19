/**
 * @module utils
 */

/*
 utils {
   Array.combinations (size, repeat)
   Array.permutations (repeat)
   Array.powerSet ()
 }
 */

/**
 * @function  combinations 
 * @desc      return all possible combinations on an optional *repeatable config
 * @param   { Array }   data   []
 * @param   { Number }  size   2
 * @param   { Boolean } repeat false
 */
exports.combinations = function combinations (data=[], repeat=false, size=2) {
  if (size === 1) { return repeat ? data.map(opt => [opt]) : [data]; }
  const arr = [];
  data.forEach((current, index) => {
    const sub = data.slice(repeat ? index : index+1)
    const subcombo = sub.combinations(size-1, repeat) ;
    subcombo.forEach((obj) => arr.push([current].concat(obj)));
  });
  return arr;
}


/**
 * @function  permutations 
 * @desc      return all possible permutations on an optional *repeatable config
 * @param   { Array }   data   []
 * @param   { Boolean } repeat false
 */
exports.permutations = function permutations (data=[], repeat=false, size=data.length) {
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


/**
 * @function  powerSet
 * @desc      iterate and return all possible set combinations from array
 * @param   { Array } data []
 */
exports.powerSet = function powerSet (data=[]) {
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


/**
 * @function urlQueryBuilder
 */
exports.urlQueryBuilder = function urlQueryBuilder (url, params={}) {
  url = url.startsWith("/") ? url : "/".concat(url);
  if (Object.entries(params).length > 0) { 
    url = [url, new URLSearchParams(params).toString()].join('?'); 
  }
  return url;
}