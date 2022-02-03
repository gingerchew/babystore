// src/deepAssign.js
var deepAssign = (orig, ...args) => {
  if (args.length > 0)
    for (let i = 0, next, key; i < args.length; i++)
      for (key in next = args[i])
        orig[key] = toString.call(next[key])[8] == "O" ? deepAssign(orig[key] || {}, next[key]) : next[key];
  return orig;
};

// src/index.js
var undef;
var lS = localStorage;
var J = JSON;
var qd = (result, key) => result == null ? result : toString.call(result)[8] == "O" && key in result ? result[key] : result;
var $$ = {
  find: (key, ...keys) => key in lS && keys.reduce(qd, J.parse(lS.getItem(key))),
  add: (key, obj) => lS.setItem(key, J.stringify(key in lS ? deepAssign(J.parse(lS.getItem(key)), obj) : obj)),
  delete: (key) => lS.removeItem(key),
  clear: () => lS.clear(),
  has: (key) => key in lS,
  all: () => Array.from(lS, (_n, i) => J.parse(lS.getItem(lS.key(i))))
};
var s = ($) => new Proxy($$, {
  apply: (_target, fn, [key, obj = {}]) => (key = $ == undef || key == undef ? key : $ + key, $$[fn](key, obj))
});
export {
  s as default
};
