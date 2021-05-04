import { World, System, Query } from '@robatbobat/mini-ecs';

import { PositionComponent } from '../components/PositionComponent';
import { EnemyComponent } from '../components/EnemyComponent';
import { TowerComponent } from '../components/TowerComponent';

import { MissileTagComponent } from '../components/MissileTagComponent';
import { BulletTagComponent } from '../components/BulletTagComponent';

import Game from '../Game';
import Vector2 from '../helpers/Vector2';

export class RenderSystem implements System {
	world: World;
	context: CanvasRenderingContext2D;

	enemies: Query;
	towers: Query;

	bullets: Query;
	missiles: Query;

	constructor(world: World) {
		this.world = world;

		const canvas = document.querySelector('canvas') as HTMLCanvasElement;
		this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.updateCanvasSize();

		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
		this.towers = this.world.createQuery([PositionComponent, TowerComponent]);

		this.bullets = this.world.createQuery([PositionComponent, BulletTagComponent]);
		this.missiles = this.world.createQuery([PositionComponent, MissileTagComponent]);

		window.addEventListener('resize', () => this.updateCanvasSize());
	}

	updateCanvasSize(): void {
		this.context.canvas.width = window.innerWidth;
		this.context.canvas.height = window.innerHeight;
	}

	drawCircle(position: Vector2, radius: number, color: string, start = 0, end = Math.PI * 2): void {
		this.context.fillStyle = color;
		this.context.beginPath();
		this.context.arc(position.x, position.y, radius, start, end);
		this.context.fill();
	}

	drawRect(position: Vector2, size: number, color: string, angle = 0): void {
		this.context.save();
		this.context.translate(position.x, position.y);
		this.context.rotate(angle);
		this.context.translate(-position.x, -position.y);
		this.context.fillStyle = color;
		this.context.fillRect(position.x - 0.5 * size, position.y - 0.5 * size, size, size);
		this.context.restore();
	}

	drawRoad(): void {
		for (const way of Object.values(Game.roads)) {
			for (const [index, wp] of way.entries()) {
				if (index === 0) {
					this.context.beginPath();
					this.context.moveTo(wp.x, wp.y);
				}
				this.context.lineTo(wp.x, wp.y);
			}
			this.context.lineWidth = 100;
			this.context.stroke();
		}
	}

	update(): void {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		this.drawRoad();

		this.towers.entities.forEach((entity) => {
			const component = entity.getComponent(PositionComponent);
			const type = entity.getComponent(TowerComponent).type === 'BULLETS' ? 'blue' : 'blueviolet';
			this.drawRect(component.position, 100, type, component.angle);
		});

		this.enemies.entities.forEach((entity) => {
			const position = entity.getComponent(PositionComponent).position;
			const enemy = entity.getComponent(EnemyComponent);
			const health = (Math.PI / 100) * ((100 / 50) * enemy.health);
			this.drawCircle(position, enemy.size, 'red');
			this.drawCircle(
				position,
				enemy.size,
				enemy.color,
				0.5 * Math.PI - health,
				0.5 * Math.PI + health
			);
		});

		this.bullets.entities.forEach((entity) => {
			const position = entity.getComponent(PositionComponent).position;
			this.drawCircle(position, 10, 'yellow');
		});

		this.missiles.entities.forEach((entity) => {
			const position = entity.getComponent(PositionComponent).position;
			this.drawCircle(position, 50, 'red');
		});
	}
}
