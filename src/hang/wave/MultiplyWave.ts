/// <reference path='IWave.ts'/>

module hang.wave {
	export class MultiplyWave implements IWave {
		constructor(private source:IWave, private multiplier:number) {
			
		}
		
		render(time:number) {
			return this.source.render(time) * this.multiplier;
		}
	}
}