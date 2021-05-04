import { World, System, Query } from '@robatbobat/mini-ecs';
import { PositionComponent } from '../components/PositionComponent';
import { EnemyComponent } from '../components/EnemyComponent';
import { ProjectileTagComponent } from '../components/ProjectileTagComponent';
import { DamageComponent } from '../components/DamageComponent';

const ENEMY_RADIUS = 25;
const PROJECTILE_RADIUS = 10;

export class CollisionSystem implements System {
	world: World;

	enemies: Query;
	projectiles: Query;

	constructor(world: World) {
		this.world = world;
		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
		this.projectiles = this.world.createQuery([
			PositionComponent,
			ProjectileTagComponent,
			DamageComponent,
		]);
	}

	update(): void {
		this.enemies.entities.forEach((enemy) => {
			const enemyPosition = enemy.getComponent(PositionComponent).position;
			for (const projectile of this.projectiles.entities.values()) {
				const damage = projectile.getComponent(DamageComponent).damage;
				const projPosition = projectile.getComponent(PositionComponent).position;
				const distance = enemyPosition.distance(projPosition);
				if (distance <= ENEMY_RADIUS + PROJECTILE_RADIUS) {
					const enemyComponent = enemy.getComponent(EnemyComponent);
					enemyComponent.health -= damage;
					this.world.removeEntity(projectile);
					if (enemyComponent.health < 1) {
						this.world.removeEntity(enemy);
						enemyComponent.health = 1;
						break;
					}
				}
			}
		});
	}
}
