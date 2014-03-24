/// <reference path='IWave.ts'/>

module pirsound {
	export class Tune {
		static FREQUENCY_MAX = 20000;
		static FREQUENCY_MIN = 20;
		static FREQUENCY_RANGE = Tune.FREQUENCY_MAX - Tune.FREQUENCY_MIN;
		
		private sampleFrequency = 44100;
		
		constructor(private wave: IWave, private frequencySource: IWave, private levelSource: IWave, private length: number) {
			
		}

		render(): Array<number> {
			var result: Array<number> = [0];
			var sampleCount = Math.ceil(this.length * this.sampleFrequency);
			var sampleTimeDiff = 1 / this.sampleFrequency;
			var wavePosition = 0;
			for (var i = 0; i < sampleCount; i++) {
				var timeRatio = i / (sampleCount - 1);
				var time = this.length * timeRatio;
				var frequency = Tune.FREQUENCY_MIN + this.frequencySource.render(timeRatio) * Tune.FREQUENCY_RANGE;
				var level = this.levelSource.render(timeRatio);
				var waveLength = 1 / frequency;
				var waveTimeElapsed = sampleTimeDiff / waveLength;
				wavePosition += waveTimeElapsed;
				var waveRendered = this.wave.render(wavePosition) * level;
				result.push(waveRendered);
			}
			return result;
		}
	}
}