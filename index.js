const P = Promis.resolve();
const micro = (fn) => P.then(fn);
class Store {
  constructor(prefix) {
    this.prefix = prefix || "";
  }
  static all() {
    return Array.from({ length: localStorage.length }, (i) => localStorage.getItem(localStorage.key(i)));
  }
  static keys() {
    return Array.from({ length: localStorage.length }, (i) => localStorage.key(i));
  }
  has(key) {
    return micro((_) => Store.keys().includes(this.prefix + key));
  }
  find(key) {
    return micro((_) => {
      try {
        const data = localStorage.getItem(this.prefix + key);
        return JSON.parse(data);
      } catch (e) {
        throw e;
      }
    });
  }
  add(key, obj) {
    return micro((_) => {
      try {
        const data = JSON.stringify(obj);
        localStorage.setItem(this.prefix + key, data);
      } catch (e) {
        throw e;
      }
      return true;
    });
  }
  update(key, data) {
    try {
      return micro((_) => {
        let current = JSON.parse(localStorage.getItem(this.prefix + key));
        const next = Object.assign({}, current, data);
        localStorage.setItem(this.prefix + key, JSON.stringify(next));
        return true;
      });
    } catch (e) {
      throw e;
    }
  }
  clear(key) {
    micro((_) => localStorage.removeItem(this.prefix + key));
  }
}
var src_default = Store;
export {
  src_default as default
};
