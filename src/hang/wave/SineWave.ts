/// <reference path='IWave.ts'/>

module hang.wave {
	export class SineWave implements IWave {
		static DOUBLE_PI = Math.PI * 2;
		
		render(time: number): number {
			return Math.sin(time * SineWave.DOUBLE_PI);
		}
	}
}