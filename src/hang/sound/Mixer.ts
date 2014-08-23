/// <reference path='Sound.ts'/>

module hang.sound {
	export class Mixer {
		private output: Array<number>;
		
		constructor(private sounds: Array<Sound>) {
			
		}

		getTimeLength() {
			var result = 0;
			for (var i = 0, n = this.sounds.length; i < n; i++) {
				var sound = this.sounds[i];
				result = Math.max(result, sound.getStartTime() + sound.getTimeLength());
			}
			return result;
		}

		getSampleCount() {
			var result = 0;
			for (var i = 0, n = this.sounds.length; i < n; i++) {
				var sound = this.sounds[i];
				result = Math.max(result, sound.getStartSampleID() + sound.getSampleCount());
			}
			return result;
		}
		
		render() {
			this.renderSounds();
			
			this.output = [];
			var soundCount = this.sounds.length;
			for (var sampleID = 0, sampleCount = this.getSampleCount(); sampleID < sampleCount; sampleID++) {
				var value = 0;
				for (var soundID = 0; soundID < soundCount; soundID++) {
					var sound = this.sounds[soundID];
					if (sound.getStartSampleID() <= sampleID && sound.getStartSampleID() + sound.getSampleCount() > sampleID) {
						value += sound.getOutputSample(sampleID - sound.getStartSampleID());
					}
				}
				this.output.push(value);
			}
		}
		
		renderSounds() {
			for (var i = 0, n = this.sounds.length; i < n; i++) {
				this.sounds[i].render();
			}
		}
		
		getOutput() {
			return this.output;
		}
	}
}