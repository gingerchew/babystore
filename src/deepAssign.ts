import { DeepAssign, PotentialObject } from '../types';


/** @type {import("../types").DeepAssign} */
export const deepAssign:DeepAssign = (orig,...args:PotentialObject[]) => {

	// Make sure there are objects to merge
	if (args.length)
        // @TODO: Could this be made smaller with a for of loop
        // Merge all objects into first
        for(let next of args) 
            // If it's an object, recursively merge
            // Otherwise, push to key
            for (let key in next) 
                orig[key] = toString.call(next[key])[8]=='O'
                    ? deepAssign(orig[key] || {}, next[key]) 
                    : next[key];

	return orig;
}