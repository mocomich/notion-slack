import { differenceInDays } from 'date-fns';

export function assertType<T extends string>(type: T, obj: { type: string }): asserts obj is { type: T } {
	if (obj.type !== type) {
		throw new Error(`unexpected type: ${obj.type}`);
	}
}

export function calculateDateDifference(date: string) {
	const today = new Date();
	return differenceInDays(new Date(date), today);
}
