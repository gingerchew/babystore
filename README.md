# Babystore

A tiny (248b gz) wrapper around localStorage with a familiar set of methods and an async alternative.

```js
import { store, storeAsync } from 'babystore';

const s = store();
const p = store('prefixed:');

// automatically stringifies objects
s.add('itemName', { a: 1 });

// then parses them on the way out
await s.find('itemName') // { a: 1 }

p.add('secondItemName', { b: 2 });

// check if the item exists
s.has('itemName') // true
s.has('doesntExist') // false

// you can use .delete to remove single items
p.delete('secondItemName');
await p.find('secondItemName') // undefined

// or use .clear to wipe the entire storage
s.clear();
await s.find('itemName') // undefined


// prefixed stores are not accessible unless you use the
// prefixed store or manually include the prefix
await s.find('secondItemName') // undefined
await s.find('prefixed:secondItemName') // { b: 2 }
```

### TODO
- [ ] all() that respects prefixing
- [ ] keep trimming

## Changelog
- 0.3.0 (breaking)
    - babystore no longer offers an async version
    the implementation meant that *every* method was async, even when there were ones that didn't need to be. May revisit later
    