/// <reference path='../../lib/illa/_module.ts'/>

/// <reference path='../../lib/berek/jquery/_module.ts'/>

/// <reference path='../../src/riffwave.d.ts'/>

/// <reference path='../../src/hang/filter/NormalizeFilter.ts'/>
/// <reference path='../../src/hang/path/SVGPathConverter.ts'/>
/// <reference path='../../src/hang/sound/Mixer.ts'/>
/// <reference path='../../src/hang/sound/Sound.ts'/>
/// <reference path='../../src/hang/wave/ConstantWave.ts'/>
/// <reference path='../../src/hang/wave/MultiplyWave.ts'/>
/// <reference path='../../src/hang/wave/PathWave.ts'/>
/// <reference path='../../src/hang/wave/SineWave.ts'/>
/// <reference path='../../src/hang/wave/SquareWave.ts'/>

module test1 {
	import jquery = berek.jquery;
	
	export class Main {
		
		static instance = new Main();
		
		private test1Object: HTMLObjectElement;
		private test1Document: Document;
		private freq1: SVGPathElement;

		constructor() {
			jquery.$(window).on('load', illa.bind(this.onDOMLoaded, this));
		}

		onDOMLoaded() {
			this.test1Object = <HTMLObjectElement>document.getElementById('test-1');
			this.test1Document = this.test1Object.contentDocument;
			this.freq1 = <any>this.test1Document.getElementById('freq-1');
			var bezierPath = hang.path.SVGPathConverter.convert(this.freq1.getAttribute('d'));
			var linearPath = bezierPath.linearize(100);
			var pathWave = new hang.wave.PathWave(linearPath);
			
			var wave1Bezier = hang.path.SVGPathConverter.convert(this.test1Document.getElementById('wave-1').getAttribute('d'));
			var wave1Linear = wave1Bezier.linearize(1);
			var wave1 = new hang.wave.PathWave(wave1Linear);
			
			var sineWave = new hang.wave.SineWave();
			var squareWave = new hang.wave.SquareWave();
			var freqWave = new hang.wave.ConstantWave(30);
			var multiplyWave = new hang.wave.MultiplyWave(pathWave, .1);
			var multiplyWave2 = new hang.wave.MultiplyWave(multiplyWave, .5);
			var multiplyWave3 = new hang.wave.MultiplyWave(multiplyWave, 1.5);
			var levelWave = new hang.wave.ConstantWave(100);
			var snd = new hang.sound.Sound(wave1, multiplyWave, levelWave, 5);
			var snd2 = new hang.sound.Sound(wave1, multiplyWave2, levelWave, 5);
			var snd3 = new hang.sound.Sound(wave1, multiplyWave3, levelWave, 5);
			var snd4 = new hang.sound.Sound(wave1, freqWave, levelWave, 5);
			var mixer = new hang.sound.Mixer([snd, snd2]);
			mixer.render();
			var data = mixer.getOutput();
			var normalizer = new hang.filter.NormalizeFilter(Math.round(32767 * .99));
			var riffWave = new RIFFWAVE();
			riffWave.header.sampleRate = 44100;
			riffWave.header.bitsPerSample = 16;
			riffWave.Make(normalizer.filter(data));
			
			var audioElement: HTMLAudioElement = document.createElement('audio');
			audioElement.src = riffWave.dataURI;
			audioElement.controls = true;
			document.body.insertBefore(audioElement, document.body.firstChild);
		}
	}
}