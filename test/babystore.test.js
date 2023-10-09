// @vitest-environment jsdom
// @ts-check
import { describe, expect, test } from 'vitest';
// import puppeteer from 'puppeteer';
import { store, storeAsync } from '../src/index';
describe('store: ', () => {
    test('find, add: ',() => {
        store().add('defaultKey', { key: '1' });

        expect(localStorage.defaultKey).toStrictEqual(JSON.stringify({ key: '1' }));
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
        expect(store().find('test')).toBe(undefined);
    });

    test('clear: ', () => {
        store().add('test1', { a: '1' });
        store().add('test2', { a: '1' });
        store().add('test3', { a: '1' });
        store().add('test4', { a: '1' });
        store().add('test5', { a: '1' });

        expect(store().find('test5')).toStrictEqual({ a: '1'});

        store().clear();

        expect(store().find('test5')).toBe(undefined); 
    });

    test('has: ', () => {
        store().add('test', {});

        expect(store().has('test')).toBe(true);
        expect(store().has('x')).toBe(false);
    });

    test('all: ', () => {
        const s = store();
        s.clear();
        s.add('test1', { a: '1' });
        s.add('test2', { a: '1' });
        s.add('test3', { a: '1' });
        s.add('test4', { a: '1' });
        s.add('test5', { a: '1' });
        
        expect(s.all().length).toBe(5);
    })

    test('add to same key: ', () => {
        const s = store();
        s.clear();

        s.add('item', { a: 1 });
        s.add('item', { b: 2 });

        expect(s.find('item')).toStrictEqual({ a: 1, b: 2 });
    });
})

describe('async: ', () => {
    test('find, add: ', async () => {
        const a = storeAsync();
        a.clear();
        a.add('test', { a: 1 });
        
        expect(await a.find('test')).toStrictEqual({ a: 1 });
        expect(await a.find('not')).toBe(undefined);
    });

    test('prefix: ', async () => {
        
        const bs = storeAsync();
        const bsp = storeAsync('prefix:');

        bs.add('generic', { key: 1 });
        bsp.add('generic', { key: 2 });
        
        expect(await bsp.find('generic')).toStrictEqual({ key: 2 });
        expect(await bs.find('generic')).toStrictEqual({ key: 1 });
    });

    test('delete: ', async () => {
        const a = storeAsync();
        
        localStorage.setItem('test', '1');
        expect(await a.find('test')).toBe(1);
        store().delete('test');
        expect(await a.find('test')).toBe(undefined);
    });

    test('clear: ', async () => {
        const a = storeAsync();
        a.add('test', { a: 1 });
        expect(await a.find('test')).toStrictEqual({ a: 1 });
        a.clear();
        expect(await a.find('test')).toBe(undefined);

    })

    test('has: ', async () => {
        const a = storeAsync();
        a.clear();
        a.add('test', { a: 1 });
        expect(await a.has('test')).toBe(true);
        expect(await a.has('not')).toBe(false);
    });

    test('all: ', async () => {
        const a = storeAsync();
        a.clear();

        a.add('test', { a: 1 });
        a.add('test2', { a: 2 });
        a.add('test3', { a: 3 });
        a.add('test4', { a: 4 });
        a.add('test5', { a: 5 });
        const all = await a.all();
        expect(all.length).toBe(5)
    });

    test('add to same key: ', async () => {
        const a = storeAsync();
        a.clear();

        a.add('item', { a: 1 });
        a.add('item', { b: 2 });

        expect(await a.find('item')).toStrictEqual({ a: 1, b: 2 });
    });

})