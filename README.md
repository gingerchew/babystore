# Babystore

A tiny (248b gz) wrapper around localStorage with a familiar set of methods.

```js
import { store } from 'babystore';

const s = store();
const p = store('prefixed:');

// automatically stringifies objects
s.add('itemName', { a: 1 });

// then parses them on the way out
s.find('itemName') // { a: 1 }

p.add('secondItemName', { b: 2 });

// check if the item exists
s.has('itemName') // true
s.has('doesntExist') // false

// you can use .delete to remove single items
p.delete('secondItemName');
p.find('secondItemName') // undefined

// or use .clear to wipe the entire storage
s.clear();
s.find('itemName') // undefined


// prefixed stores are not accessible unless you use the
// prefixed store or manually include the prefix
s.find('secondItemName') // undefined
s.find('prefixed:secondItemName') // { b: 2 }
```

### TODO
- [ ] all() that respects prefixing
- [ ] keep trimming
- [ ] use `Promise.resolve().then` to take some methods off the main thread
    - A potential solution is available at https://github.com/gingerchew/babystore/tree/async-promise-then

## Changelog

- 0.4.0 (breaking) 
    - babystore is now async by default
    - the get handler now returns `async (key, obj) =>` which
      makes then `AsyncFunction`'s
- 0.3.1
    - updates some of the content
    - removes references to async in tests and source code
- 0.3.0 (breaking)
    - babystore no longer offers an async version
    the implementation meant that *every* method was async, even when there were ones that didn't need to be. May revisit later
    