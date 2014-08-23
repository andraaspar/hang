/// <reference path='IWave.ts'/>

module hang.wave {
	export class SquareWave implements IWave {
		render(time:number) {
			return Math.round(time % 1) * -2 + 1;
		}
	}
}