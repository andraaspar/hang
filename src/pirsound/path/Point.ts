/// <reference path='../geom/Axis.ts'/>

module pirsound.path {
	export class Point {
		constructor(private x = 0, private y = 0) {

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

		setOffset(axis: geom.Axis, value: number) {
			switch (axis) {
				case geom.Axis.X:
					this.x = value;
					break;
				case geom.Axis.Y:
					this.y = value;
					break;
			}
		}
	}
}