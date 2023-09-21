import { test, expect, describe } from 'vitest';
import { assertType, calculateDateDifference, getMessage, isExist, assertIsExist, isObject, assertIsObject } from '.';

describe('assertType', () => {
	test('Success', () => {
		const obj = { type: 'someType' };
		expect(() => assertType('someType', obj)).not.toThrow();
	});
	test('Error', () => {
		const obj = { type: 'someOtherType' };
		/** https://github.com/oven-sh/bun/issues/1825#issuecomment-1625008733 */
		expect(() => assertType('someType', obj)).toThrow('unexpected type: someOtherType');
	});
});

test('calculateDateDifference: Success', () => {
	const today = '2023-09-11';
	const targetDay = '2023-09-15';
	const result = calculateDateDifference(new Date(today), new Date(targetDay));
	expect(result).toBe(4);
});

describe('getMessage', () => {
	test('The deadline is today', () => {
		const message = getMessage(0);
		expect(message).toBe('✋ 本日が期限です');
	});
	test('The deadline is remaining other than today', () => {
		const message = getMessage(3);
		expect(message).toBe('⚠️ 残り3日です');
	});
	test('Overdue', () => {
		const message = getMessage(-3);
		expect(message).toBe('💩 期限が過ぎています。早く読みなさい');
	});
});

describe('isExist', () => {
	test('Expect true', () => {
		expect(isExist({ a: 'a' })).toBeTruthy();
	});
	test('Expect false', () => {
		expect(isExist(null)).toBeFalsy();
	});

	test('Expect false', () => {
		expect(isExist(undefined)).toBeFalsy();
	});
});

describe('assertIsExist', () => {
	test('Success: is existing', () => {
		const v = { a: 'a' };
		expect(() => assertIsExist(v, 'v')).not.toThrow();
	});
	test('Error: is not existing', () => {
		const v = null;
		expect(() => assertIsExist(v, 'v')).toThrow('v should be specified');
	});

	test('Error: is not existing', () => {
		const v = undefined;
		expect(() => assertIsExist(v, 'v')).toThrow('v should be specified');
	});
});

describe('isObject', () => {
	test('Expect true', () => {
		expect(isObject({ a: 'a' })).toBeTruthy();
	});

	test('Expect false', () => {
		expect(isObject('aa')).toBeFalsy();
	});

	test('Expect false', () => {
		expect(isObject(null)).toBeFalsy();
	});

	test('Expect false', () => {
		expect(isObject(undefined)).toBeFalsy();
	});
});

describe('assertIsObject', () => {
	test('Success: v is object', () => {
		const v = { a: 'a' };
		expect(() => assertIsObject(v, 'v')).not.toThrow();
	});
	test('Error: v is not object', () => {
		const v = '';
		expect(() => assertIsObject(v, 'v')).toThrow('v should be object');
	});
	test('Error: v is not object', () => {
		const v = null;
		expect(() => assertIsObject(v, 'v')).toThrow('v should be object');
	});
	test('Error: v is not object', () => {
		const v = undefined;
		expect(() => assertIsObject(v, 'v')).toThrow('v should be object');
	});
});
