import { Component } from '@robatbobat/mini-ecs';
import Vector2 from '../helpers/Vector2';

export class PositionComponent implements Component {
	position: Vector2;
	angle = 0;

	constructor(x = 0, y = 0) {
		this.position = new Vector2(x, y);
	}
}
