import { World, System } from '@robatbobat/mini-ecs';

export class DebugSystem implements System {
	world: World;
	entitiesDiv: HTMLElement;
	dtDiv: HTMLElement;

	constructor(world: World) {
		this.world = world;
		this.entitiesDiv = document.querySelector('.entities') as HTMLElement;
		this.dtDiv = document.querySelector('.delta-time') as HTMLElement;
	}

	update(dt: number): void {
		this.dtDiv.innerHTML = `dt: ${Math.floor(dt)}`;
		this.entitiesDiv.innerHTML = `entities: ${this.world.entities.size}`;
	}
}
