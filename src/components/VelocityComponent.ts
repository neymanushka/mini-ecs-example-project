import { Component } from '@robatbobat/mini-ecs';
import Vector2 from '../helpers/Vector2';

export class VelocityComponent implements Component {
	scalarSpeed: number;
	direction: Vector2;
	constructor(speed: number, direction: Vector2) {
		this.scalarSpeed = speed;
		this.direction = direction;
	}
}
