import { Component } from '@robatbobat/mini-ecs';

export class TTLComponent implements Component {
	ttl: number;
	constructor(ttl: number) {
		this.ttl = ttl;
	}
}
