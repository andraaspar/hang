/// <reference path='../riffwave.d.ts'/>

/// <reference path='filter/NormalizeFilter.ts'/>
/// <reference path='path/SVGPathConverter.ts'/>
/// <reference path='sound/Sound.ts'/>
/// <reference path='wave/ConstantWave.ts'/>
/// <reference path='wave/PathWave.ts'/>
/// <reference path='wave/SineWave.ts'/>

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
			console.log(pathWave.render(0));
			console.log(pathWave.render(.5));
			console.log(pathWave.render(.9999));
			
			var sineWave = new wave.SineWave();
			var freqWave = new wave.ConstantWave(440);
			var levelWave = new wave.ConstantWave(100);
			var snd = new sound.Sound(sineWave, pathWave, levelWave, 5);
			var data = snd.render();
			var normalizer = new filter.NormalizeFilter(Math.round(32767 * .99));
			var riffWave = new RIFFWAVE();
			riffWave.header.sampleRate = 44100;
			riffWave.header.bitsPerSample = 16;
			riffWave.Make(normalizer.filter(data));
			
			var audioElement:HTMLAudioElement = document.createElement('audio');
			audioElement.src = riffWave.dataURI;
			audioElement.controls = true;
			document.body.insertBefore(audioElement, Main.test1);
		}
	}
}

pirsound.Main.main();