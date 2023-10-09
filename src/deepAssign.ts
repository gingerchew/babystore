import { DeepAssign } from '../types';

/** @type {import("../types").DeepAssign} */
export const deepAssign:DeepAssign = (orig,...args) => {

	// Make sure there are objects to merge
	if (args.length)
        // @TODO: Could this be made smaller with a for of loop
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