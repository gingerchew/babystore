# Babystore

A tiny (330b gz) wrapper around localStorage with a familiar set of methods.

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

// prefixed stores are not accessible unless you use the
// prefixed store or include the prefix
s.find('secondItemName') // undefined
s.find('prefixed:secondItemName') // { b: 2 }

// use store.all to get all values in the storage
store.all() // [ { a: 1 }, { b: 2 } ]

// you can use .delete to remove single items
p.delete('secondItemName');
p.find('secondItemName') // undefined

// or use store.nuke to wipe the entire storage
store.nuke();
s.find('itemName') // undefined

```

### TODO
- [ ] keep trimming

## Changelog
- 0.5.0 (breaking)
    - the clear and all methods have been removed from babystore instances
    - nuke and all are the above methods on the store function
    ```js
    import { store } from 'store';
    store.all() // returns all items in localStorage
    store.nuke() // removes all items in localStorage
    ```
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
    