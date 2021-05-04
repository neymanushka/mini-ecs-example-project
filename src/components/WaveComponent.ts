import { Component } from '@robatbobat/mini-ecs';
import { Enemy } from '../Types';

export class WaveComponent implements Component {
	enemy: Enemy & { spawned: number; timePassed: number };
	constructor(enemy: Enemy) {
		this.enemy = Object.assign({}, enemy, { spawned: 0, timePassed: 0 });
	}
}
