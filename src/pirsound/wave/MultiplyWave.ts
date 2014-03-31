/// <reference path='IWave.ts'/>

module pirsound.wave {
	export class MultiplyWave implements IWave {
		constructor(private source:IWave, private multiplier:number) {
			
		}
		
		render(time:number) {
			return this.source.render(time) * this.multiplier;
		}
	}
}