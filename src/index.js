// @ts-check
import { deepAssign } from './deepAssign.js';

let /** @type {undefined} */ undef,
    lS=localStorage,
    J=JSON,
    /** @type {import("../types").qd} */
    qd = (result, key) => result == null
        ? result
        : (
            toString.call(result)[8]=='O' &&
            // @ts-ignore
            key in result
        )
            ? result[key]
            : result,
    /** @type {import("../types").babystoreFuncs} */
    $$ = {
        find: (key, ...keys) => key in lS && keys.reduce(qd, J.parse(lS.getItem(key))),
        add: (key, obj) => lS.setItem(
            key, 
            J.stringify(
                key in lS ? 
                deepAssign(
                    J.parse(lS.getItem(key)),
                    obj
                ) : obj
            )
        ),
        delete: key => lS.removeItem(key),
        clear: () => lS.clear(),
        has: key => key in lS,
        all: () => Array.from(lS, (_n, i) => J.parse(lS.getItem(lS.key(i)))),
    },
    s = /**
         * @param {string} [$]
         * @returns {import("../types").babystore}
         */ 
       $ => new Proxy($$, {
           apply: (_target, fn, [key, obj={}]) => (key = $==undef||key==undef?key:$+key, $$[fn](
               key,
               obj
           ))
       })
// doing it this way brings down the esbuild package size
export {
    s as default
}