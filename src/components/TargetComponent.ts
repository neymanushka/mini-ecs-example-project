import { Component } from '@robatbobat/mini-ecs';

export class TargetComponent implements Component {
	target: string;
	constructor(targetEntityId: string) {
		this.target = targetEntityId;
	}
}
