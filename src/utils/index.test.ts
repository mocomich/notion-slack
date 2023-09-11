import { test, expect, describe } from 'vitest';
import { assertType, calculateDateDifference, getMessage } from '.';

describe('assertType', () => {
	test('Success', () => {
		const obj = { type: 'someType' };
		expect(() => assertType('someType', obj)).not.toThrow();
	});
	test('Error', () => {
		const obj = { type: 'someOtherType' };
		expect(() => assertType('someType', obj)).toThrowError('unexpected type: someOtherType');
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
