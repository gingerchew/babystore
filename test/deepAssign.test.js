import { test, describe, expect } from 'vitest';
import { deepAssign } from '../src/deepAssign';
describe('deepAssign', () => {
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
        
        expect(result).toMatchObject(expectLevel1); // deepEqual(result, expectLevel1, 'Is this meant to only show up when there is an error?');
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

        const expected = {
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

        expect(result).toMatchObject(expected);
    });


    test.todo('deepAssign: Multiple arguments');
})