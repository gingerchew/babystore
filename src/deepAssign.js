// @ts-check

/**
 * @typedef {{ [key: string]: unknown }} _UnknownObject
 */

/**
 * @typedef {{ [key: string]: object|unknown }} _PotentialObject
 */

/**
 * @typedef {{ [key: string]: _PotentialObject }} PotentionalObject
 */

/**
 * 
 * @param {PotentionalObject} orig 
 * @param {...PotentionalObject} args
 * @returns {_UnknownObject}
 */
const deepAssign = (orig,...args) => {

	// Make sure there are objects to merge
	let i = 0, l = args.length, next;

	if (l > 0)
        // Merge all objects into first
        for(;i<l;i++) 
            // If it's an object, recursively merge
            // Otherwise, push to key
            for (let key in next = args[i]) 
                orig[key] = toString.call(next[key])[8]=='O'
                    ? deepAssign(orig[key] || {}, next[key]) 
                    : next[key];

	return orig;
}

export {
    deepAssign
}