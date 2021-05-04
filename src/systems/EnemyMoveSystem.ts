import { World, System, Query } from '@robatbobat/mini-ecs';

import Vector2 from '../helpers/Vector2.js';
import { PositionComponent } from '../components/PositionComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { EnemyComponent } from '../components/EnemyComponent';

import Game from '../Game';

export class EnemyMoveSystem implements System {
	world: World;
	enemies: Query;

	constructor(world: World) {
		this.world = world;
		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
	}

	update(dt: number): void {
		this.enemies.entities.forEach((entity) => {
			const pos = entity.getComponent(PositionComponent);
			const velocity = entity.getComponent(VelocityComponent);
			const enemy = entity.getComponent(EnemyComponent);
			if (!enemy.target) {
				enemy.waypointIndex = 0;
				enemy.target = new Vector2(Game.roads[enemy.road][0].x, Game.roads[enemy.road][0].y);
				velocity.direction = enemy.target.sub(pos.position).norm();
				pos.position = enemy.target;
			}

			const distance = enemy.target.distance(pos.position);
			if (distance < velocity.scalarSpeed * dt) {
				enemy.waypointIndex++;
				if (enemy.waypointIndex < Game.roads[enemy.road].length) {
					const wp = Game.roads[enemy.road][enemy.waypointIndex];
					enemy.target = new Vector2(wp.x, wp.y);
					velocity.direction = enemy.target.sub(pos.position).norm();
				} else this.world.removeEntity(entity);
			}
		});
	}
}
