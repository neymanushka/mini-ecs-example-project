const PI_2 = Math.PI * 2;

export const aLerp = (start: number, end: number, t: number): number => {
	const angle = (end - start) % PI_2;
	return start + (((2 * angle) % PI_2) - angle) * t;
};

export const lerp = (start: number, end: number, t: number): number => start * (1 - t) + end * t;

export const getRandomValue = (min: number, max: number): number =>
	Math.random() * (max - min) + min;

export const getRandomEnum = <T>(enums: T): string => {
	const arr = Object.values(enums).filter(isNaN) as string[];
	const value = Math.floor(getRandomValue(0, arr.length));
	return arr[value];
};
