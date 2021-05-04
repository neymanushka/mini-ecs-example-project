import { World, System, Query } from '@robatbobat/mini-ecs';

import { WaveComponent } from '../components/WaveComponent';
import { Enemy, EnemyColors, Roads } from '../Types';
import { getRandomEnum, getRandomValue } from '../helpers/Util';

import Game from '../Game';

export class WaveSpawnSystem implements System {
	world: World;
	wave: Query;
	progressBar: HTMLElement;

	constructor(world: World) {
		this.world = world;
		this.progressBar = document.querySelector('.wave-progress-bar') as HTMLElement;
		this.wave = this.world.createQuery([WaveComponent]);
	}

	update(dt: number): void {
		if (Game.nextWaveDelay <= 0) {
			const color = getRandomEnum(EnemyColors);
			const road = getRandomEnum(Roads);
			const size = Math.floor(getRandomValue(10, 40));
			const count = Math.floor(getRandomValue(2, 7));
			const speed = getRandomValue(0.05, 0.5);
			const delay = (0.6 - speed) * (30 * size);

			const enemy: Enemy = {
				color,
				size,
				count,
				road,
				delay,
				speed,
			};
			this.world.addEntity().addComponent(new WaveComponent(enemy));
			Game.nextWaveDelay = 5000;
		} else {
			Game.nextWaveDelay -= dt;
		}
	}
}
