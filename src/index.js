import { deepAssign } from './deepAssign.js';

let undef,
    lS=localStorage,
    get='getItem',
    parse=JSON.parse,
    $$ = {
        find: key => key in lS && parse(lS[get](key)),
        add: (key, obj) => lS.setItem(
            key, 
            JSON.stringify(
                key in lS ? 
                deepAssign(
                    parse(lS[get](key)),
                    obj
                ) : obj
            )
        ),
        delete: key => key==undef?lS.clear():lS.removeItem(key),
        has: key => key in lS,
        all: _ => Array.from(lS, (n, i) => parse(lS[get](lS.key(i)))),
    },
    /**
     * @param {string} $ - local storage prefix
     */
    s = $ => Object.keys($$).reduce((funcObj, funcKey) => (
        funcObj[funcKey] = new Proxy($$[funcKey], {
            apply: (target, _, [key, obj={}]) => (key = $==undef||key==undef?key:$+key, target(
                    key,
                    obj
                ))
            })
        ,
        funcObj
    ), {});

// doing it this way brings down the esbuild package size
export {
    s as default
}