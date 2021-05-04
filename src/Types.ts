export enum EnemyColors {
	'blue',
	'yellow',
	'green',
	'white',
	'blueviolet',
}

export enum Roads {
	'upperWay',
	'bottomWay',
}

export type Enemy = {
	readonly color: string;
	readonly size: number;
	readonly count: number;
	readonly road: string;
	readonly delay: number;
	speed: number;
};
