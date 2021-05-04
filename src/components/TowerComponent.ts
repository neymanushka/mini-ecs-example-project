import { Component } from '@robatbobat/mini-ecs';

export class TowerComponent implements Component {
	shootDelay = 0;
	target: string | null = null;
	type: string;
	constructor(type: 'BULLETS' | 'MISSILES') {
		this.type = type;
	}
}
