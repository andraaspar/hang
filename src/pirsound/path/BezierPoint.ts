/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>

module pirsound.path {
	export class BezierPoint {
		constructor(private x: number, private y: number, private hx1: number = x, private hy1: number = y, private hx2: number = x, private hy2: number = y) {

		}

		getOffset(axis: geom.Axis) {
			var result = NaN;
			switch (axis) {
				case geom.Axis.X:
					result = this.x;
					break;
				case geom.Axis.Y:
					result = this.y;
					break;
			}
			return result;
		}

		getHandleOffset(axis: geom.Axis, end: geom.End) {
			var result = NaN;
			switch (axis) {
				case geom.Axis.X:
					if (end == geom.End.START) result = this.hx1;
					else if (end == geom.End.END) result = this.hx2;
					break;
				case geom.Axis.Y:
					if (end == geom.End.START) result = this.hy1;
					else if (end == geom.End.END) result = this.hy2;
					break;
			}
			return result;
		}

		getIsLinear(end: geom.End) {
			return this.getOffset(geom.Axis.X) == this.getHandleOffset(geom.Axis.X, end) &&
				this.getOffset(geom.Axis.Y) == this.getHandleOffset(geom.Axis.Y, end);
		}
	}
}