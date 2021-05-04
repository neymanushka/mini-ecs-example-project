import { World, System, Query } from '@robatbobat/mini-ecs';

import { PositionComponent } from '../components/PositionComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { TargetComponent } from '../components/TargetComponent';
import { TTLComponent } from '../components/TTLComponent';

export class GuidanceSystem implements System {
	world: World;
	projectiles: Query;

	constructor(world: World) {
		this.world = world;
		this.projectiles = this.world.createQuery([
			PositionComponent,
			TargetComponent,
			VelocityComponent,
		]);
	}

	update(): void {
		this.projectiles.entities.forEach((entity) => {
			const pos = entity.getComponent(PositionComponent);
			const velocity = entity.getComponent(VelocityComponent);
			const targetId = entity.getComponent(TargetComponent).target;
			const target = this.world.entities.get(targetId);
			if (target) {
				const targetPosition = target.getComponent(PositionComponent).position;
				const direction = targetPosition.sub(pos.position).norm();
				velocity.direction = direction;
			} else {
				entity.removeComponent(TargetComponent);
				entity.addComponent(new TTLComponent(3000));
			}
		});
	}
}
