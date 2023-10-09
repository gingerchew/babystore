// @ts-check
import { deepAssign } from './deepAssign';
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
    $$ = {
        find: (key:string) => key in lS ? p(lS[key]) : null,
        add(key:string, obj:_UnknownObject) {
            lS[key] = JSON.stringify(
                key in lS ? 
                deepAssign(
                    // @ts-ignore
                    p(lS[key]),
                    obj
                ) : obj
            )
        },
        delete(key:string) { delete lS[key] },
        clear() { lS.clear() },
        has: (key:string) => key in lS,
        // @ts-ignore
        all: () => Array.from(lS, (_n, i) => p(lS[lS.key(i)] || '')),
    },
    s = ($='') => new Proxy<babystore>($$, {
        get: (_, fn:string) => (key?:string, obj?: object) => _[fn]($+key, obj)
    }), 
    a = ($='') => new Proxy<babystore>($$, {
        get: (_, fn:string) => (key:string, obj = {}) => Promise.resolve().then(() => _[fn]($+key, obj)),
    });

// doing it this way brings down the esbuild package size
export {
    s as store,
    a as storeAsync
}