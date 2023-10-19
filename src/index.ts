import { DeepAssign, PotentialObject, _UnknownObject, babystoreFuncs, store } from '../types';

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
    p = (v: string): unknown => {
        try {
            // @ts-ignore
            v = JSON.parse(v);
        } finally {
            return v;
        }
    },
    $$:babystoreFuncs = {
        find: (key: string) => p(localStorage[key]) ?? null,
        add(key: string, obj: _UnknownObject) {
            localStorage[key] = JSON.stringify(
                obj = key in localStorage 
                // @ts-ignore
                ? deepAssign(p(localStorage[key]), obj) 
                : obj
            )
        },
        delete(key: string) { delete localStorage[key] },
        has: (key: string) => key in localStorage,
    },
    s:store = new Proxy(Object.assign(function(){}, {
        nuke() { localStorage.clear() },
        all: (key?:string) => Object.keys(localStorage).reduce((d:unknown[], s:string) => (
            // if there is no key, or the key is in the ls key
            // ~s.indexOf ~= s.indexOf !== 0
            (!key || ~s.indexOf(key)) 
                // spread existing items, then add new item
                ? [...d, p(localStorage[s])] 
                // return the previous items 
                : d
        ), [] as unknown[])
    }), {
        apply: (_self, _this, [$ = '']) => new Proxy<babystoreFuncs>($$, {
            get: (_, fnName: string) => async (key: string = '', obj?: object) => _[fnName]($ + key, obj)
        }),
    });
// doing it this way brings down the esbuild package size
export {
    s as store
}