/// <reference path='Point.ts'/>
/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>

module pirsound.path {
	export class BezierPoint extends Point {
		constructor(x = 0, y = 0, private inX: number = x, private inY: number = y, private outX: number = x, private outY: number = y) {
			super(x, y);
		}

		getHandleOffset(axis: geom.Axis, end: geom.End) {
			var result = NaN;
			switch (axis) {
				case geom.Axis.X:
					if (end == geom.End.START) result = this.inX;
					else if (end == geom.End.END) result = this.outX;
					break;
				case geom.Axis.Y:
					if (end == geom.End.START) result = this.inY;
					else if (end == geom.End.END) result = this.outY;
					break;
			}
			return result;
		}

		setHandleOffset(axis: geom.Axis, end: geom.End, value: number) {
			switch (axis) {
				case geom.Axis.X:
					if (end == geom.End.START) this.inX = value;
					else if (end == geom.End.END) this.outX = value;
					break;
				case geom.Axis.Y:
					if (end == geom.End.START) this.inY = value;
					else if (end == geom.End.END) this.outY = value;
					break;
			}
		}

		getIsLinear(end: geom.End) {
			return this.getOffset(geom.Axis.X) == this.getHandleOffset(geom.Axis.X, end) &&
				this.getOffset(geom.Axis.Y) == this.getHandleOffset(geom.Axis.Y, end);
		}
	}
}