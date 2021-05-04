import { World, System, Query, Entity } from '@robatbobat/mini-ecs';

import { aLerp } from '../helpers/Util';
import Vector2 from '../helpers/Vector2';

import { PositionComponent } from '../components/PositionComponent';
import { EnemyComponent } from '../components/EnemyComponent';
import { TowerComponent } from '../components/TowerComponent';
import { ProjectileTagComponent } from '../components/ProjectileTagComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { TargetComponent } from '../components/TargetComponent';
import { TTLComponent } from '../components/TTLComponent';
import { DamageComponent } from '../components/DamageComponent';
import { MissileTagComponent } from '../components/MissileTagComponent';
import { BulletTagComponent } from '../components/BulletTagComponent';

export class TowerSystem implements System {
	world: World;

	enemies: Query;
	towers: Query;

	constructor(world: World) {
		this.world = world;
		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
		this.towers = this.world.createQuery([PositionComponent, TowerComponent]);

		let x: number, y: number;
		document.addEventListener('dragend', (event: DragEvent) => {
			const target = event.target as HTMLElement;
			const type = target.classList.contains('tower-type-one') ? 'BULLETS' : 'MISSILES';
			//const tagComponent = type ? new BulletsTagTower() : new MissilesTagTower();
			world
				.addEntity()
				.addComponent(new PositionComponent(x, y))
				.addComponent(new TowerComponent(type));
			//				.addComponent(tagComponent);
		});
		document.addEventListener('dragover', (event) => {
			x = event.clientX;
			y = event.clientY;
		});
		const restartButton = document.querySelector('.clear-button > button') as HTMLElement;
		restartButton.addEventListener('click', () => {
			this.towers.entities.forEach((tower) => {
				this.world.removeEntity(tower);
			});
		});
	}

	spawnProjectile(position: Vector2, damage: number, direction: Vector2 = new Vector2()): Entity {
		const entity = this.world
			.addEntity()
			.addComponent(new PositionComponent(position.x, position.y))
			.addComponent(new ProjectileTagComponent())
			.addComponent(new DamageComponent(damage))
			.addComponent(new VelocityComponent(0.5, direction));
		return entity;
	}

	spawnBullet(position: Vector2, target: Vector2): void {
		const direction = target.sub(position).norm();
		this.spawnProjectile(position, 10, direction)
			.addComponent(new BulletTagComponent())
			.addComponent(new TTLComponent(700));
	}

	spawnMissile(position: Vector2, targetId: string): void {
		this.spawnProjectile(position, 20)
			.addComponent(new MissileTagComponent())
			.addComponent(new TargetComponent(targetId));
	}

	lockTarget(position: Vector2, target: Vector2, angle: number): number {
		const dx = target.x - position.x;
		const dy = target.y - position.y;
		const theta = Math.atan2(dy, dx);
		return aLerp(angle, theta, 0.05);
	}

	update(dt: number): void {
		this.towers.entities.forEach((entity) => {
			const tower = entity.getComponent(TowerComponent);
			const visibilityArea = tower.type === 'MISSILES' ? 1500 : 500;
			const shootDelay = visibilityArea === 1500 ? 2000 : 300;
			const posComponent = entity.getComponent(PositionComponent);
			const towerPosition = posComponent.position;

			tower.target = null;
			let minDistance: number;
			this.enemies.entities.forEach((enemy) => {
				const enemyPosition = enemy.getComponent(PositionComponent).position;
				const distance = towerPosition.distance(enemyPosition);
				if (distance <= visibilityArea && (minDistance > distance || !minDistance)) {
					minDistance = distance;
					tower.target = enemy.id;
				}
			});

			if (tower.target) {
				const enemy = this.world.entities.get(tower.target);
				if (enemy) {
					const targetPosition = enemy.getComponent(PositionComponent).position;
					posComponent.angle = this.lockTarget(targetPosition, towerPosition, posComponent.angle);
					if (tower.shootDelay <= 0) {
						if (tower.type === 'BULLETS') this.spawnBullet(towerPosition, targetPosition);
						else this.spawnMissile(towerPosition, tower.target);
						tower.shootDelay = shootDelay;
					}
				}
			}
			tower.shootDelay -= dt;
		});
	}
}
