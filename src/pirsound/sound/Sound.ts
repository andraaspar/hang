/// <reference path='../wave/IWave.ts'/>

module pirsound.sound {
	export class Sound {
		private sampleFrequency = 44100;
		
		constructor(private wave: wave.IWave, private frequencySource: wave.IWave, private levelSource: wave.IWave, private length: number) {
			
		}

		render(): Array<number> {
			var result: Array<number> = [0];
			var sampleCount = Math.floor(this.length * this.sampleFrequency);
			var sampleTimeDiff = 1 / this.sampleFrequency;
			var wavePosition = 0;
			for (var i = 0; i < sampleCount; i++) {
				var timeRatio = i / (sampleCount - 1);
				var time = this.length * timeRatio;
				var frequency = this.frequencySource.render(timeRatio);
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