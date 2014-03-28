/// <reference path='IFilter.ts'/>

module pirsound.filter {
	export class NormalizeFilter implements IFilter {
	
		constructor(private size = 1, private castToInt = false) {}
		
		filter(source: Array<number>): Array<number> {
			var result: Array<number>;
			
			var maxValue = Math.max.apply(Math, source);
			var minValue = Math.min.apply(Math, source);
			var maxAbsValue = Math.max(Math.abs(minValue), Math.abs(maxValue));
			
			var scale = this.size / maxAbsValue;
			
			result = source.map(function(x) {return x * scale});
			if (this.castToInt) {
				result = result.map(function(x) {return Math.floor(x)});
			}
			
			return result;
		}
	}
}