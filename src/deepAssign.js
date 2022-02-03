// @ts-check

/** @type {import("../types").DeepAssign} */
const deepAssign = (orig,...args) => {

	// Make sure there are objects to merge
	if (args.length > 0)
        // Merge all objects into first
        for(let i=0,next,key;i<args.length;i++) 
            // If it's an object, recursively merge
            // Otherwise, push to key
            for (key in next = args[i]) 
                orig[key] = toString.call(next[key])[8]=='O'
                    ? deepAssign(orig[key] || {}, next[key]) 
                    : next[key];

	return orig;
}

export {
    deepAssign
}