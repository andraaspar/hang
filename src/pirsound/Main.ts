/// <reference path='../riffwave.d.ts'/>

/// <reference path='filter/NormalizeFilter.ts'/>
/// <reference path='path/SVGPathConverter.ts'/>
/// <reference path='sound/Mixer.ts'/>
/// <reference path='sound/Sound.ts'/>
/// <reference path='wave/ConstantWave.ts'/>
/// <reference path='wave/MultiplyWave.ts'/>
/// <reference path='wave/PathWave.ts'/>
/// <reference path='wave/SineWave.ts'/>
/// <reference path='wave/SquareWave.ts'/>

module pirsound {
	export class Main {
		static test1: HTMLObjectElement;
		static test1Document: Document;
		static freq1: SVGPathElement;

		static main() {
			window.addEventListener('load', Main.onDOMLoaded.bind(this));
		}

		static onDOMLoaded() {
			Main.test1 = <HTMLObjectElement>document.getElementById('test-1');
			Main.test1Document = <Document>Main.test1.contentDocument;
			Main.freq1 = <any>Main.test1Document.getElementById('freq-1');
			var bezierPath = path.SVGPathConverter.convert(Main.freq1.getAttribute('d'));
			var linearPath = bezierPath.linearize(100);
			var pathWave = new wave.PathWave(linearPath);
			
			var wave1Bezier = path.SVGPathConverter.convert(Main.test1Document.getElementById('wave-1').getAttribute('d'));
			var wave1Linear = wave1Bezier.linearize(1);
			var wave1 = new wave.PathWave(wave1Linear);
			
			var sineWave = new wave.SineWave();
			var squareWave = new wave.SquareWave();
			var freqWave = new wave.ConstantWave(30);
			var multiplyWave = new wave.MultiplyWave(pathWave, .1);
			var multiplyWave2 = new wave.MultiplyWave(multiplyWave, .5);
			var multiplyWave3 = new wave.MultiplyWave(multiplyWave, 1.5);
			var levelWave = new wave.ConstantWave(100);
			var snd = new sound.Sound(wave1, multiplyWave, levelWave, 5);
			var snd2 = new sound.Sound(wave1, multiplyWave2, levelWave, 5);
			var snd3 = new sound.Sound(wave1, multiplyWave3, levelWave, 5);
			var snd4 = new sound.Sound(wave1, freqWave, levelWave, 5);
			var mixer = new sound.Mixer([snd, snd2]);
			mixer.render();
			var data = mixer.getOutput();
			var normalizer = new filter.NormalizeFilter(Math.round(32767 * .99));
			var riffWave = new RIFFWAVE();
			riffWave.header.sampleRate = 44100;
			riffWave.header.bitsPerSample = 16;
			riffWave.Make(normalizer.filter(data));
			
			var audioElement:HTMLAudioElement = document.createElement('audio');
			audioElement.src = riffWave.dataURI;
			audioElement.controls = true;
			document.body.insertBefore(audioElement, document.body.firstChild);
		}
	}
}

pirsound.Main.main();