// @ts-check
import { deepAssign } from './deepAssign.js';
import { _UnknownObject, babystore, ReduceableObject } from '../types';

let undef:undefined,
    lS=localStorage,
    J=JSON,
    p=(v:string|unknown):unknown=>{
        try {
            // @ts-ignore
            v=J.parse(v);
        }catch{}finally{
            return v;
        }
    },

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
        find: (key:string, ...keys:string[]) => key in lS && keys.length ? keys.reduce(qd, J.parse(lS[key])) : lS[key],
        add: (key:string, obj:_UnknownObject) => lS[key] = J.stringify(
            key in lS ? 
            deepAssign(
                // @ts-ignore
                p(lS[key]),
                obj
            ) : obj
        ),
        delete: (key:string) => lS.removeItem(key),
        clear: () => lS.clear(),
        has: (key:string) => key in lS,
        all: () => Array.from(lS, (_n, i) => p(lS.getItem(lS.key(i) || ''))),
    },
    s = ($:string) => new Proxy<babystore>($$, {
            apply: (_target, fn, [key, obj={}]) => (key = $==undef||key==undef?key:$+key, $$[fn](
                key,
                obj
            ))
        }), 
    a = ($:string) => new Proxy<babystore>($$, {
            apply: (_target, fn, [key, obj={}]) => (key = $==undef||key==undef?key:$+key, () => Promise.resolve($$[fn](
                key,
                obj
            )))
        });

// doing it this way brings down the esbuild package size
export const store = s;
export const storeAsync = a;