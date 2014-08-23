module hang.util {
	export class ChannelCombiner {
		
		static combineStereo(left: number[], right: number[]): number[] {
			var result: number[] = [];
			
			for (var i = 0, n = Math.max(left.length, right.length); i < n; i++) {
				result.push(left[i] || 0, right[i] || 0);
			}
			
			return result;
		}
	}
}