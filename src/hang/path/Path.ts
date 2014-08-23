/// <reference path='Point.ts'/>
/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>

module hang.path {
	export class Path {
		constructor(private points: Array<Point>) {

		}
		
		getPoint(i:number) {
			return this.points[i];
		}
		
		getPointCount() {
			return this.points.length;
		}
		
		getSize(axis: geom.Axis) {
			return this.getOffset(axis, geom.End.END) - this.getOffset(axis, geom.End.START);
		}
		
		getOffset(axis: geom.Axis, end: geom.End) {
			var offset = end == geom.End.START ? Infinity : -Infinity;
			var test = end == geom.End.START ? Math.min : Math.max;
			
			for (var i = 0, n = this.points.length; i < n; i++) {
				var pointOffset = this.points[i].getOffset(axis);
				offset = test(offset, pointOffset);
			}
			
			if (!isFinite(offset)) {
				offset = 0;
			}
			return offset;
		}
	}
}