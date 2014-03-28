/// <reference path='path/SVGPathConverter.ts'/>

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
		}
	}
}

pirsound.Main.main();