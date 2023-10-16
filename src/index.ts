import { DeepAssign, PotentialObject, _UnknownObject, babystoreFuncs } from '../types';

let deepAssign: DeepAssign = (orig = {}, ...args: PotentialObject[]) => {
        // Make sure there an object to merge
        if (args[0])
            // Merge all objects into first
            for (let next of args)
                // If it's an object, recursively merge
                // Otherwise, push to key
                for (let key in next)
                    orig[key] = toString.call(next[key])[8] == 'O'
                        ? deepAssign(orig[key] || {}, next[key])
                        : next[key];

        return orig;
    },
    lS = localStorage,
    p = (v: string): unknown => {
        try {
            // @ts-ignore
            v = JSON.parse(v);
        } finally {
            return v;
        }
    },
    $$:babystoreFuncs = {
        find: (key: string) => p(lS[key]) ?? null,
        add(key: string, obj: _UnknownObject) {
            lS[key] = JSON.stringify(
                obj = key in lS 
                // @ts-ignore
                ? deepAssign(p(lS[key]), obj) 
                : obj
            )
        },
        delete(key: string) { delete lS[key] },
        clear() { lS.clear() },
        has: (key: string) => key in lS,
        // @ts-ignore
        // need a way to do this that respects prefixing
        // all: () => Array.from(lS, (_n, i) => p(lS[lS.key(i)] || '')),
    },
    s = ($ = '') => new Proxy<babystoreFuncs>($$, {
        get: (_, fnName: string) => async (key?: string, obj?: object) => _[fnName]($ + key, obj)
    });

// doing it this way brings down the esbuild package size
export {
    s as store,
    // a as storeAsync
}