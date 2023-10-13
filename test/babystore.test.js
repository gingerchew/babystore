// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { store } from '../src/index';
describe('store: ', () => {
    test('find, add: ', () => {
        const val = {
            key: 1
        };
        
        store().add('defaultKey', val);
        
        let s = localStorage.getItem('defaultKey');
        let x = store().find('defaultKey');
        const item = localStorage.getItem('defaultKey');
        
        expect(item).toBe(JSON.stringify(val));
        expect(x).toStrictEqual(JSON.parse(s || '{}'));
        store().clear();
    });

    test('prefix: ', () => {
        
        const bs = store();
        const bsp = store('prefix:');

        bs.add('generic', { key: 1 });
        bsp.add('generic', { key: 2 });
        
        expect(bsp.find('generic')).toStrictEqual({ key: 2 });
        expect(bs.find('generic')).toStrictEqual({ key: 1 });
    })

    test('delete', () => {
        localStorage.setItem('test', '1');
        expect(store().find('test')).toBe(1);
        store().delete('test');
        expect(store().find('test')).toBe(null);
    });

    test('clear: ', () => {
        store().add('test1', { a: '1' });
        store().add('test2', { a: '1' });
        store().add('test3', { a: '1' });
        store().add('test4', { a: '1' });
        store().add('test5', { a: '1' });

        expect(store().find('test5')).toStrictEqual({ a: '1'});

        store().clear();

        expect(store().find('test5')).toBe(null); 
    });

    test('has: ', () => {
        store().add('test', {});

        expect(store().has('test')).toBe(true);
        expect(store().has('x')).toBe(false);
    });

    test('add to same key: ', () => {
        const s = store();
        s.clear();

        s.add('item', { a: 1 });
        s.add('item', { b: 2 });

        expect(s.find('item')).toStrictEqual({ a: 1, b: 2 });
    });
});