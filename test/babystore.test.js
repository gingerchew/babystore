// @ts-check
/// <reference types="ava">
/// <reference types="@types/puppeteer">
/// <reference path="../src/index.js">
import test from 'ava';
import puppeteer from 'puppeteer';
import babystore from '../src/index.js';

/**
 * @param {any} t 
 * @param {any} run 
 */
const _withPage = async (t, run) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://google.com');

    try {
        await run(t, page);
    } finally {
        await page.close();
        await browser.close();
    }
};

/**
 * @param {string} key - localStorage default key
 * @param {puppeteer.Page} page
 */
const checkLocalStorage = async (key, page) => {
    const hasKey = await page.evaluate((key) => {
        let result = localStorage.getItem(key);

        return result !== null;
    }, key);

    return hasKey;
}

// test.before('Set up localStorage items.', _withPage)

test('checkLocalStorage: ', _withPage, 
    /**
     * @param {any} t
     * @param {puppeteer.Page} page
     */
    async (t, page) => {

    await page.evaluate(() => localStorage.setItem('defaultKey', '1'));

    const result = await checkLocalStorage('defaultKey', page);

    t.is(result, true);
});

test('babystore: get works', _withPage, 
    /**
     * @param {any} t 
     * @param {puppeteer.Page} page 
     */
    async (t, page) => {
    
    const bs = babystore();

    await page.evaluate(() => localStorage.setItem('findKey', '{ "test": true }'));

    let results = await page.evaluate(() => bs.find('findKey'));
})
