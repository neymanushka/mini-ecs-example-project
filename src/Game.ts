type waypoints = { x: number; y: number }[];

export default class Game {
	static roads: { [key: string]: waypoints } = {
		upperWay: [
			{ x: 100, y: 100 },
			{ x: 500, y: 100 },
			{ x: 500, y: 500 },
			{ x: 900, y: 500 },
			{ x: 900, y: 300 },
			{ x: 1200, y: 300 },
		],
		bottomWay: [
			{ x: 100, y: 100 },
			{ x: 500, y: 100 },
			{ x: 500, y: 500 },
			{ x: 700, y: 500 },
			{ x: 700, y: 800 },
			{ x: 1400, y: 800 },
		],
	};
	static nextWaveDelay = 0;
	static currentWave = 0;
}
