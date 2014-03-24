/// <reference path='../jquery.d.ts'/>
/// <reference path='path/BezierPath.ts'/>

module pirsound {
	export class Main {
		static main() {
			jQuery(jQuery.proxy(Main.onDOMLoaded, this));
		}

		static onDOMLoaded() {
			
		}
	}
}

pirsound.Main.main();