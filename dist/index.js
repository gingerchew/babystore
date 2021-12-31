let n, r, i, u, l = "length", o = 0, lS = localStorage, dA = (t, ...e) => {
  i = e[l];
  if (0 < i)
    for (; o < i; )
      for (r in n = e[o++])
        t[r] = toString.call(n[r])[8] == "O" ? dA(t[r] || {}, n[r]) : n[r];
  return t;
}, p = JSON.parse, $$ = {
  find: (key) => p(lS.getItem(key) || "{}"),
  add: (key, obj) => lS.setItem(key, JSON.stringify(dA(p(lS.getItem(key)), obj))),
  clear: (key) => lS.removeItem(key),
  has: (key) => key in lS,
  all: (_) => Array.from(lS, (n2, i2) => p(lS.getItem(lS.key(i2))))
}, prox = (f) => new Proxy(f, {
  apply: (target, { $ }, [key, obj = {}]) => target($ == u ? key : $ + key, obj)
}), s = ($) => Object.keys($$).reduce((funcObj, key) => (funcObj[key] = prox($$[key]), funcObj), { $ });
export {
  s as default
};
