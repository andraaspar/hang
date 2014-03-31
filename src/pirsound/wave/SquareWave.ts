/// <reference path='IWave.ts'/>

module pirsound.wave {
	export class SquareWave implements IWave {
		render(time:number) {
			return Math.round(time % 1) * -2 + 1;
		}
	}
}