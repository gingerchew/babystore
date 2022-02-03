// @ts-check
import { deepAssign } from './deepAssign.js';

/**
 * @typedef {{[key: string]: unknown}|unknown} ReduceableObject
 */

/**
 * @typedef babystoreFuncs
 * @property {(key: string, ...keys: string[]) => any} find
 * @property {(key: string, obj: { [key: string]: unknown }) => void} add
 * @property {(key: string) => void} delete
 * @property {(key: string) => boolean} has
 * @property {(_?: unknown) => any[]} all
 */

/**
 * @typedef {{ [key in keyof babystoreFuncs]: babystoreFuncs[key] }} babystore
 */


let /** @type {undefined} */ undef,
    lS=localStorage,
    qd =/**
         * @param {ReduceableObject} result
         * @param {string} key
         * @param {number} index
         * @param {string[]} arr
         * @returns {ReduceableObject}
         */ (result, key) => result == null 
                ? result 
                : (
                    toString.call(result)[8]=='O' && 
                    // @ts-ignore
                    key in result
                ) 
                ? result[key] 
                : result,
    /**
     * @type babystoreFuncs
     */
    $$ = {
        find: (key, ...keys) => key in lS && keys.reduce(qd, JSON.parse(lS.getItem(key))),
        add: (key, obj) => lS.setItem(
            key, 
            JSON.stringify(
                key in lS ? 
                deepAssign(
                    JSON.parse(lS.getItem(key)),
                    obj
                ) : obj
            )
        ),
        delete: key => key==undef?lS.clear():lS.removeItem(key),
        has: key => key in lS,
        all: _ => Array.from(lS, (_n, i) => JSON.parse(lS.getItem(lS.key(i)))),
    },
    s = /**
         * @param {string} [$]
         * @returns {babystore}
         */ 
       $ => new Proxy($$, {
           apply: (_target, _, [key, obj={}]) => (key = $==undef||key==undef?key:$+key, $$[_](
               key,
               obj
           ))
       })
// doing it this way brings down the esbuild package size
export {
    s as default
}