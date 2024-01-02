import { DeepAssign, PotentialObject, _UnknownObject, babystoreFuncs, store } from '../types';

let deepAssign: DeepAssign = (orig, ...args: PotentialObject[]) => {
        // Make sure there an object to merge
        if (args[0])
            // Merge all objects into first
            for (let next of args)
                // If it's an object, recursively merge
                // Otherwise, set new[key] to be the new value for orig[key]
                for (let key in next)
                    orig[key] = toString.call(next[key])[8] == 'O'
                        ? deepAssign(orig[key] || {}, next[key])
                        : next[key];
        // return orig as the merged object
        return orig;
    },
    ls = localStorage,
    p = (v: string): unknown => {
        try {
            // @ts-ignore
            v = JSON.parse(v);
        } finally {
            return v;
        }
    },
    $$:babystoreFuncs = {
        // if the localStorage item doesn't exist, 
        // it returns undefined, we return null
        // to more closely match the Storage.getItem method
        find: (key: string) => p(ls[key]) ?? null,
        add(key: string, obj: _UnknownObject) {
            ls[key] = JSON.stringify(
                // Since the key is in
                // localStorage, assume it is a parseable object
                key in ls
                // @ts-ignore
                ? deepAssign(p(ls[key]), obj) 
                : obj
            )
        },
        delete: (key: string) => delete ls[key],
        has: (key: string) => key in ls,
    },
    s:store = new Proxy(Object.assign(function(){}, {
        nuke() { ls.clear() },
        all: (key?:string) => Object.keys(ls).reduce((d:unknown[], s:string) => (
            // if there is no key, or the key is in the ls key
            // ~s.indexOf ~= s.indexOf !== -1
            (!key || ~s.indexOf(key)) 
                // spread existing items, then add new item
                ? [...d, p(ls[s])] 
                // return the previous items 
                : d
        ), [] as unknown[])
    }), {
        apply: (_target, _this, [$ = '']) => new Proxy<babystoreFuncs>($$, {
            get: (_, fnName: string) => async (key: string = '', obj?: object) => _[fnName]($ + key, obj)
        }),
    });

// doing it this way brings down the esbuild package size
export {
    s as store
}