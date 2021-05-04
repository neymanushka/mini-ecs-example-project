import { Component } from '@robatbobat/mini-ecs';

export class DamageComponent implements Component {
	damage: number;
	constructor(damage: number) {
		this.damage = damage;
	}
}
