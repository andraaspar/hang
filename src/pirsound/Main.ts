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
			var bezierPath = path.SVGPathConverter.convert(Main.freq1);
			console.log(bezierPath);
			var linearPath = bezierPath.linearize(1);
			console.log(linearPath);
			var pw = new wave.PathWave(linearPath);
			console.log(pw.render(0));
			console.log(pw.render(.5));
			console.log(pw.render(.9999));
			
			var sineWave = new wave.SineWave();
			var freqWave = new wave.ConstantWave(261.63);
			var levelWave = new wave.ConstantWave(100);
			var snd = new sound.Sound(sineWave, freqWave, levelWave, 1);
			var data = snd.render();
			var fltr = new filter.NormalizeFilter(32760, true);
			var rw = new RIFFWAVE();
			rw.header.sampleRate = 44100;
			rw.header.bitsPerSample = 16;
			rw.Make(fltr.filter(data));
			
			var audioElement:HTMLAudioElement = document.createElement('audio');
			audioElement.src = rw.dataURI;
			audioElement.controls = true;
			document.body.insertBefore(audioElement, Main.test1);
		}
	}
}

pirsound.Main.main();