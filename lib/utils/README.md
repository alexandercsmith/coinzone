# 🪙 COINZONE

> Coinbase Pro API Cryptocurrency Trading Automation Bot

---

## UTILITIES

> Coinzone Utility Method Functions

### [`combintations`](./combinations.js)

```js
const { combinations } = utils;

const data = ['a', 'b', 'c'];

let repeat = false;

combinations(data, repeat);

/* =>
[
  [ 'a', 'b', 'b' ],
  [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'c' ],
  [ 'b', 'c', 'c' ]
]
*/

repeat = true;

combinations(data, repeat);

/* =>
[
  [ 'a', 'a', 'a', 'b', 'c' ],
  [ 'a', 'b', 'b', 'c' ],
  [ 'a', 'c', 'c' ],
  [ 'b', 'b', 'b', 'c' ],
  [ 'b', 'c', 'c' ],
  [ 'c', 'c', 'c' ]
]
*/
```

### [`permutations`](./permutations.js)

```js
const { permutations } = utils;

const data = ['a', 'b', 'c'];

let repeat = false;

permutations(data, repeat);

/* =>
[
  [ 'a', 'b', 'c' ],
  [ 'b', 'a', 'c' ],
  [ 'b', 'c', 'a' ],
  [ 'a', 'c', 'b' ],
  [ 'c', 'a', 'b' ],
  [ 'c', 'b', 'a' ]
]
*/

repeat = true;

permutations(data, repeat);

/* =>
[
  [ 'a', 'a', 'a' ], [ 'a', 'a', 'b' ],
  [ 'a', 'a', 'c' ], [ 'a', 'b', 'a' ],
  [ 'a', 'b', 'b' ], [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'a' ], [ 'a', 'c', 'b' ],
  [ 'a', 'c', 'c' ], [ 'b', 'a', 'a' ],
  [ 'b', 'a', 'b' ], [ 'b', 'a', 'c' ],
  [ 'b', 'b', 'a' ], [ 'b', 'b', 'b' ],
  [ 'b', 'b', 'c' ], [ 'b', 'c', 'a' ],
  [ 'b', 'c', 'b' ], [ 'b', 'c', 'c' ],
  [ 'c', 'a', 'a' ], [ 'c', 'a', 'b' ],
  [ 'c', 'a', 'c' ], [ 'c', 'b', 'a' ],
  [ 'c', 'b', 'b' ], [ 'c', 'b', 'c' ],
  [ 'c', 'c', 'a' ], [ 'c', 'c', 'b' ],
  [ 'c', 'c', 'c' ]
]
*/
```

### [`powerSet`](./power-set.js)

```js
const { powerSet } = utils;

const data = ['a', 'b', 'c'];

powerSet(data);

/* =>
[
  [],
  [ 'a' ],
  [ 'b' ],
  [ 'a', 'b' ],
  [ 'c' ],
  [ 'a', 'c' ],
  [ 'b', 'c' ],
  [ 'a', 'b', 'c' ]
]
*/
```