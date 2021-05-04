import { World } from '@robatbobat/mini-ecs';

import { RenderSystem } from './systems/RenderSystem';
import { EnemyMoveSystem } from './systems/EnemyMoveSystem';
import { WaveSpawnSystem } from './systems/WaveSpawnSystem';
import { EnemySpawnSystem } from './systems/EnemySpawnSystem';
import { TowerSystem } from './systems/TowerSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { DebugSystem } from './systems/DebugSystem';
import { VelocitySystem } from './systems/VelocitySystem';
import { GuidanceSystem } from './systems/GuidanceSystem';
import { TTLControlSystem } from './systems/TTLControlSystem';

import { PositionComponent } from './components/PositionComponent';
import { TowerComponent } from './components/TowerComponent';

const TOWERS: { type: 'BULLETS' | 'MISSILES'; x: number; y: number }[] = [
	{ type: 'BULLETS', x: 300, y: 300 },
	{ type: 'MISSILES', x: 1200, y: 600 },
	{ type: 'BULLETS', x: 700, y: 300 },
];

window.onload = () => {
	const world = new World();

	world.registerSystem(new RenderSystem(world));
	world.registerSystem(new WaveSpawnSystem(world));
	world.registerSystem(new EnemyMoveSystem(world));
	world.registerSystem(new EnemySpawnSystem(world));
	world.registerSystem(new TowerSystem(world));
	world.registerSystem(new CollisionSystem(world));
	world.registerSystem(new DebugSystem(world));
	world.registerSystem(new VelocitySystem(world));
	world.registerSystem(new GuidanceSystem(world));
	world.registerSystem(new TTLControlSystem(world));

	for (const tower of TOWERS) {
		world
			.addEntity()
			.addComponent(new PositionComponent(tower.x, tower.y))
			.addComponent(new TowerComponent(tower.type));
	}

	let lastTimestamp = 16;
	const run = (timestamp = 0) => {
		const dt = timestamp - lastTimestamp;
		if (dt >= 1) {
			lastTimestamp = timestamp;
			world.update(dt);
		}
		requestAnimationFrame(run);
	};
	run();
};
