// @ts-check
import { deepAssign } from './deepAssign.js';
import { _UnknownObject, babystore, ReduceableObject } from '../types';

let lS=localStorage,
    p=(v:string|unknown):unknown=>{
        try {
            // @ts-ignore
            v=JSON.parse(v);
        }finally{
            return v;
        }
    },
    q = Promise.resolve(),
    qd = (result:ReduceableObject, key:string) => result == null
        ? result
        : (
            toString.call(result)[8]=='O' &&
            // @ts-ignore
            key in result
        )
            ? result[key]
            : result,

    $$ = {
        find: (key:string, ...keys:string[]) => (key in lS && keys.length) ? keys.reduce(qd, p(lS[key])) : p(lS[key]),
        add: (key:string, obj:_UnknownObject) => {
            lS[key] = JSON.stringify(
                key in lS ? 
                deepAssign(
                    // @ts-ignore
                    p(lS[key]),
                    obj
                ) : obj
            )
        },
        delete: (key:string) => lS.removeItem(key),
        clear: () => lS.clear(),
        has: (key:string) => key in lS,
        // @ts-ignore
        all: () => Array.from(lS, (_n, i) => p(lS[lS.key(i)] || '')),
    },
    s = ($='') => new Proxy<babystore>($$, {
        get: (_, fn:string) => (key?:string, obj?: object) => _[fn]($+key, obj)
    }), 
    a = ($='') => new Proxy<babystore>($$, {
        get: (_, fn:string) => (key:string, obj = {}) => q.then(() => _[fn]($+key, obj)),
    });

// doing it this way brings down the esbuild package size
export const store = s;
export const storeAsync = a;