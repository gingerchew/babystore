# Babystore

A tiny (392b gz) wrapper around localStorage with a familiar set of methods and an async alternative.

```js
import { store, storeAsync } from 'babystore';

const s = store();
const p = store('prefixed:');

const a = storeAsync();
const ap = storeAsync('prefixed:);

// automatically stringifies objects
s.add('itemName', { a: 1 });

// then parses them on the way out
s.find('itemName') // { a: 1 }

p.add('secondItemName', { b: 2 });

// check if the item exists
s.has('itemName') // true
s.has('doesntExist') // false

// if you need every item in storage use .all
s.all() // [{ a: 1 }, { b: 2 }]

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

// with the async version, every method is await'able;
await a.add('asyncItem', { aa: 1 });
await ap.add('asyncItem', { bb: 2 });
```

### TODO
- [ ] look into remove blocking version
- [ ] keep trimming