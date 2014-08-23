/// <reference path='../wave/IWave.ts'/>

module hang.sound {
	export class Sound {
		static sampleFrequency = 44100;

		private startTime = 0;
		private startSampleID = 0;
		private output: Array<number>;

		constructor(private wave: wave.IWave, private frequencySource: wave.IWave, private levelSource: wave.IWave, private length: number) {

		}

		render() {
			this.output = [0];
			var sampleCount = this.getSampleCount();
			var sampleTimeDiff = 1 / Sound.sampleFrequency;
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
				this.output.push(waveRendered);
			}
			return this.output;
		}

		getOutputSample(id: number) {
			return this.output[id];
		}

		getStartTime() {
			return this.startTime;
		}

		setStartTime(value: number) {
			this.startTime = value;
			this.startSampleID = Math.floor(this.startTime * Sound.sampleFrequency);
		}

		getStartSampleID() {
			return this.startSampleID;
		}

		setStartSampleID(value: number) {
			this.startSampleID = value;
			this.startTime = this.startSampleID / Sound.sampleFrequency;
		}

		getTimeLength() {
			return this.length;
		}

		getSampleCount() {
			return Math.floor(this.getTimeLength() * Sound.sampleFrequency);
		}
		
		getOutput() {
			return this.output;
		}
	}
}