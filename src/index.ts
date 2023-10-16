import { DeepAssign, PotentialObject, _UnknownObject, babystore } from '../types';

let deepAssign: DeepAssign = (orig = {}, ...args: PotentialObject[]) => {
        // Make sure there are objects to merge
        if (args.length)
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
    p = (v: string | unknown): unknown => {
        try {
            // @ts-ignore
            v = JSON.parse(v);
        } finally {
            return v;
        }
    },
    $$ = {
        delete(key: string) { delete lS[key] },
        find: (key: string) => p(lS[key]) ?? null,
        add(key: string, obj: _UnknownObject) {
            lS[key] = JSON.stringify(
                obj = key in lS 
                // @ts-ignore
                ? deepAssign(p(lS[key]), obj) 
                : obj,
            )
        },
        // @ts-ignore
        clear: () => lS.clear(),
        has: (key: string) => key in lS,
        // @ts-ignore
        // need a way to do this that respects prefixing
        // all: () => Array.from(lS, (_n, i) => p(lS[lS.key(i)] || '')),
    },
    s = ($ = '') => new Proxy<babystore>($$, {
        get: (_, fnName: string) => (key?: string, obj?: object) => _[fnName]($ + key, obj)
    });

// doing it this way brings down the esbuild package size
export {
    s as store,
    // a as storeAsync
}