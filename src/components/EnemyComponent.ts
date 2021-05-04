import { Component } from '@robatbobat/mini-ecs';
import Vector2 from '../helpers/Vector2';

export class EnemyComponent implements Component {
	health = 50;
	waypointIndex = 0;
	target: Vector2 | null = null;

	road: string;
	color: string;
	size: number;

	constructor(road: string, color: string, size: number) {
		this.road = road;
		this.color = color;
		this.size = size;
	}
}
