export const deepAssign = (orig,...args) => {

	// Make sure there are objects to merge
	let i = 0, l = args.length, next;

	if (l > 0)
        // Merge all objects into first
        for(;i<l;i++) 
            // If it's an object, recursively merge
            // Otherwise, push to key
            for (let key in next=args[i]) orig[key] = toString.call(next[key])=='O' ? deepAssign(orig[key] || {}, next[key]) : next[key];

	return orig;
}
