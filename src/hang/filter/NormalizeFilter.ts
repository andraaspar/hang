/// <reference path='IFilter.ts'/>

module hang.filter {
	export class NormalizeFilter implements IFilter {
	
		constructor(private size = 1) {}
		
		filter(source: Array<number>): Array<number> {
			var result: Array<number> = [];
			
			var maxAbsValue = 0;
			for (var i = 0, n = source.length; i < n; i++) {
				maxAbsValue = Math.max(maxAbsValue, Math.abs(source[i]));
			}
			
			var scale = this.size / maxAbsValue;
			
			for (var j = 0, o = source.length; j < o; j++) {
				result[j] = source[j] * scale;
			}
			
			return result;
		}
	}
}