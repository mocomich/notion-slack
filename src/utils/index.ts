import { differenceInDays, parse } from 'date-fns';

export function assertType<T extends string>(type: T, obj: { type: string }): asserts obj is { type: T } {
	if (obj.type !== type) {
		throw new Error(`unexpected type: ${obj.type}`);
	}
}

export function calculateDateDifference(date: string): number {
	const today = new Date();
	return Math.abs(differenceInDays(new Date(date), today));
}
