import { differenceInDays } from 'date-fns';

export function assertType<T extends string>(type: T, obj: { type: string }): asserts obj is { type: T } {
	if (obj.type !== type) {
		throw new Error(`unexpected type: ${obj.type}`);
	}
}

export function calculateDateDifference(today: Date, targetDate: Date): number {
	return Math.abs(differenceInDays(targetDate, today));
}

export function isExist<T>(v: T | null | undefined): v is NonNullable<T> {
	return typeof v !== 'undefined' && v !== null;
}

export function assertIsExist<T>(v: T | null | undefined, target = ''): asserts v is NonNullable<T> {
	if (!isExist(v)) {
		throw new Error(`${target} should be specified`.trim());
	}
}

export function isObject(v: unknown): v is Record<string, unknown> {
	return typeof v === 'object' && v !== null;
}

export function assertIsObject(v: unknown, target = ''): asserts v is Record<string, unknown> {
	if (!isObject(v)) {
		throw new Error(`${target} should be object`.trim());
	}
}

export function getMessage(day: number): string {
	let message: string;

	switch (true) {
		case day === 0:
			message = '✋ 本日が期限です';
			break;
		case day > 0:
			message = `⚠️ 残り${day}日です`;
			break;
		default:
			message = '💩 期限が過ぎています。早く読みなさい';
			break;
	}

	return message;
}
