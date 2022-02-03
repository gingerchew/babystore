import test from 'ava';
import { deepAssign } from '../src/deepAssign.js';

test('deepAssign: Simple depth', t => {
    const deepLevel1 = {
        a: 1,
        b: {
            c: 2
        }
    }

    const assignLevel1 = {
        a: 1,
        b: {
            d: 3
        }
    };

    const expectLevel1 = {
        a: 1,
        b: {
            c: 2,
            d: 3
        }
    };

    const result = deepAssign(deepLevel1, assignLevel1);
    
    t.deepEqual(result, expectLevel1, 'Is this meant to only show up when there is an error?');
});

test('deepAssign: Complex depth', t => {
    const original = {
        a: 1,
        b: {
            c: 2,
            d: {}
        }
    }

    const assign = {
        a: 1,
        b: {
            e: {
                f: 3,
                g: {
                    h: [],
                    i: '',
                }
            }
        }
    };

    const expect = {
        a: 1,
        b: {
            c: 2,
            d: {},
            e: {
                f: 3,
                g: {
                    h: [],
                    i: ''
                }
            }
        }
    };

    const result = deepAssign(original, assign);

    t.deepEqual(result, expect);
});


test.todo('deepAssign: Multiple arguments');