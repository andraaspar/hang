/// <reference path='../../lib/illa/_module.ts'/>

/// <reference path='../../lib/berek/jquery/_module.ts'/>

/// <reference path='../../src/riffwave.d.ts'/>

/// <reference path='../../src/hang/filter/NormalizeFilter.ts'/>
/// <reference path='../../src/hang/path/SVGPathConverter.ts'/>
/// <reference path='../../src/hang/sound/Mixer.ts'/>
/// <reference path='../../src/hang/sound/Sound.ts'/>
/// <reference path='../../src/hang/util/ChannelCombiner.ts'/>
/// <reference path='../../src/hang/wave/ConstantWave.ts'/>
/// <reference path='../../src/hang/wave/MultiplyWave.ts'/>
/// <reference path='../../src/hang/wave/PathWave.ts'/>
/// <reference path='../../src/hang/wave/SineWave.ts'/>
/// <reference path='../../src/hang/wave/SquareWave.ts'/>

module test2 {
	import jquery = berek.jquery;
	
	export class Main {
		
		static instance = new Main();
		
		private length = 3;
		private levelMultipliers = [1, .9, .8, .7, .6, .4, .2, .2, .1, .1];
		private frequencies = [32.7032 /* C1 */, 65.4064, 130.813, 261.626 /* C4 */, 523.251, 1046.50, 2093.00, 4186.01 /* C8 */, 8372, 16744];
		
		constructor() {
			jquery.$(window).on('load', illa.bind(this.onDOMLoaded, this));
		}

		onDOMLoaded() {
			var sineWave = new hang.wave.SineWave();
			
			var silence = new hang.sound.Sound(new hang.wave.ConstantWave(0), new hang.wave.ConstantWave(40),
				new hang.wave.ConstantWave(0), this.length).render();
			
			var riffWave = new RIFFWAVE();
				riffWave.header.numChannels = 2;
				riffWave.header.sampleRate = 44100;
				riffWave.header.bitsPerSample = 16;
			
			for (var i = 0, n = this.frequencies.length; i < n; i++) {
				var frequency = this.frequencies[i];
				var freqWave = new hang.wave.ConstantWave(frequency);
				
				var levelWave = new hang.wave.ConstantWave(32767 * this.levelMultipliers[i] * .5);
				
				var sound = new hang.sound.Sound(sineWave, freqWave, levelWave, this.length).render();
				
				var combined = hang.util.ChannelCombiner.combineStereo(sound, silence);
				riffWave.Make(combined);
				jquery.$('<p>' + frequency + ' left: <audio controls/></p>').appendTo('body').find('audio').attr('src', riffWave.dataURI);
				
				combined = hang.util.ChannelCombiner.combineStereo(silence, sound);
				riffWave.Make(combined);
				jquery.$('<p>' + frequency + ' right: <audio controls/></p>').appendTo('body').find('audio').attr('src', riffWave.dataURI);
			}
		}
	}
}