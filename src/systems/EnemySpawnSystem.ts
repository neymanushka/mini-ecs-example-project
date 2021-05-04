import { World, System, Query } from '@robatbobat/mini-ecs';

import { PositionComponent } from '../components/PositionComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { EnemyComponent } from '../components/EnemyComponent';
import { WaveComponent } from '../components/WaveComponent';

import Game from '../Game';
import { Enemy } from '../Types';
import Vector2 from '../helpers/Vector2';

export class EnemySpawnSystem implements System {
	world: World;
	enemies: Query;
	waves: Query;

	constructor(world: World) {
		this.world = world;
		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
		this.waves = this.enemies = this.world.createQuery([WaveComponent]);
	}

	spawnEnemy(enemy: Enemy, x: number, y: number): void {
		this.world
			.addEntity()
			.addComponent(new PositionComponent(x, y))
			.addComponent(new VelocityComponent(enemy.speed, new Vector2()))
			.addComponent(new EnemyComponent(enemy.road, enemy.color, enemy.size));
	}

	update(dt: number): void {
		this.waves.entities.forEach((entity) => {
			const enemy = entity.getComponent(WaveComponent).enemy;
			if (enemy.timePassed >= enemy.delay) {
				enemy.spawned++;
				enemy.timePassed = 0;
				this.spawnEnemy(enemy, Game.roads[enemy.road][0].x, Game.roads[enemy.road][0].y);
				if (enemy.spawned === enemy.count) {
					this.world.removeEntity(entity);
				}
			} else enemy.timePassed += dt;
		});
	}
}
