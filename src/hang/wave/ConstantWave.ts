/// <reference path='IWave.ts'/>

module hang.wave {
	export class ConstantWave implements IWave {
		constructor(private value: number) {}
		
		render(time: number): number {
			return this.value;
		}
	}
}