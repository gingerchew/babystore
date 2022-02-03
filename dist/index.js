// src/deepAssign.js
var deepAssign = (orig, ...args) => {
  let i = 0, l = args.length, next;
  if (l > 0)
    for (; i < l; i++)
      for (let key in next = args[i])
        orig[key] = toString.call(next[key])[8] == "O" ? deepAssign(orig[key] || {}, next[key]) : next[key];
  return orig;
};

// src/index.js
var undef;
var lS = localStorage;
var qd = (result, key) => result == null ? result : toString.call(result)[8] == "O" && key in result ? result[key] : result;
var $$ = {
  find: (key, ...keys) => key in lS && keys.reduce(qd, JSON.parse(lS.getItem(key))),
  add: (key, obj) => lS.setItem(key, JSON.stringify(key in lS ? deepAssign(JSON.parse(lS.getItem(key)), obj) : obj)),
  delete: (key) => key == undef ? lS.clear() : lS.removeItem(key),
  has: (key) => key in lS,
  all: (_) => Array.from(lS, (_n, i) => JSON.parse(lS.getItem(lS.key(i))))
};
var s = ($) => new Proxy($$, {
  apply: (_target, _, [key, obj = {}]) => (key = $ == undef || key == undef ? key : $ + key, $$[_](key, obj))
});
export {
  s as default
};
