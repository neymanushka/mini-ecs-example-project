import { World, System, Query } from '@robatbobat/mini-ecs';
import { TTLComponent } from '../components/TTLComponent';

export class TTLControlSystem implements System {
	world: World;
	projectiles: Query;

	constructor(world: World) {
		this.world = world;
		this.projectiles = this.world.createQuery([TTLComponent]);
	}

	update(dt: number): void {
		this.projectiles.entities.forEach((entity) => {
			const component = entity.getComponent(TTLComponent);
			component.ttl -= dt;
			if (component.ttl < 0) {
				this.world.removeEntity(entity);
			}
		});
	}
}
