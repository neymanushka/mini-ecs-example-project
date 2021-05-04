import { World, System, Query } from '@robatbobat/mini-ecs';

import { PositionComponent } from '../components/PositionComponent';
import { VelocityComponent } from '../components/VelocityComponent';

export class VelocitySystem implements System {
	world: World;
	projectiles: Query;

	constructor(world: World) {
		this.world = world;
		this.projectiles = this.world.createQuery([PositionComponent, VelocityComponent]);
	}

	update(dt: number): void {
		this.projectiles.entities.forEach((entity) => {
			const pos = entity.getComponent(PositionComponent);
			const velocity = entity.getComponent(VelocityComponent);
			const newPosition = velocity.direction
				.norm()
				.mul(velocity.scalarSpeed * dt)
				.add(pos.position);
			pos.position = newPosition;
		});
	}
}
