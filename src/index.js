let n, r, i, u,

    l='length', o = 0,
    
    lS = localStorage,
    dA=(t,...e)=> {
        i=e[l];
        if(0<i)
            for(;o<i;)
                for(r in n=e[o++])
                    t[r]="O"==toString.call(n[r])[8] ?
                        dA(t[r]||{},n[r]) : n[r];
        return t                
    },
    p=JSON.parse,
    $$ = {
        find: key => p(lS.getItem(key)||'{}'),
        add: (key, obj) => lS.setItem(
            key, 
            JSON.stringify(
                dA(
                    p(lS.getItem(key)),
                    obj
                )
            )
        ),
        clear: key => lS.removeItem(key),
        has: key => key in lS,
        all: _ => Array.from(lS, (n, i) => p(lS.getItem(lS.key(i)))),
    },
    prox = f => new Proxy(f, {
        // { $ } == prefix
        apply: (target, { $ }, [key, obj={}]) => 
            // set key to equal
            target(
                $ == u ? key : $+key,
                obj
            )
        }),

    /**
     * @param {string} $ - local storage prefix
     */
    s = $ => Object.keys($$).reduce((funcObj, key) => (
        funcObj[key] = prox($$[key]), 
        funcObj
    ), { $ });

// doing it this way brings down the esbuild package size
export {
    s as default
}