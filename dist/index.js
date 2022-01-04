// src/deepAssign.js
var deepAssign = (orig, ...args) => {
  let i = 0, l = args.length, next;
  if (l > 0)
    for (; i < l; i++)
      for (let key in next = args[i])
        orig[key] = toString.call(next[key]) == "O" ? deepAssign(orig[key] || {}, next[key]) : next[key];
  return orig;
};

// src/index.js
var undef;
var lS = localStorage;
var get = "getItem";
var parse = JSON.parse;
var $$ = {
  find: (key) => key in lS && parse(lS[get](key)),
  add: (key, obj) => lS.setItem(key, JSON.stringify(key in lS ? deepAssign(parse(lS[get](key)), obj) : obj)),
  delete: (key) => key == undef ? lS.clear() : lS.removeItem(key),
  has: (key) => key in lS,
  all: (_) => Array.from(lS, (n, i) => parse(lS[get](lS.key(i))))
};
var s = ($) => Object.keys($$).reduce((funcObj, funcKey) => (funcObj[funcKey] = new Proxy($$[funcKey], {
  apply: (target, _, [key, obj = {}]) => (key = $ == undef || key == undef ? key : $ + key, target(key, obj))
}), funcObj), {});
export {
  s as default
};
