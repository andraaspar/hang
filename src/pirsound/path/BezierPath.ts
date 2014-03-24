/// <reference path='BezierPoint.ts'/>

module pirsound.path {
	export class BezierPath {
		constructor(private points: Array<BezierPoint>) {

		}

		linearize(steps: number): BezierPath {
			var points: Array<BezierPoint> = [];

			for (var i = 0, n = points.length - 1; i < n; i++) {
				points.pop();
				var pointA = points[i];
				var pointB = points[i + 1];
				points = points.concat(this.linearizeSegment(pointA, pointB, steps));
			}

			return new BezierPath(points);
		}

		linearizeSegment(pointA: BezierPoint, pointB: BezierPoint, steps: number) {
			var result: Array<BezierPoint> = [];
			var axes = [geom.Axis.X, geom.Axis.Y];
			var positionsX: Array<number> = [];

			for (var axisID = 0; axisID < axes.length; axisID++) {
				var axis = axes[axisID];
				for (var t = 0; t < steps; t++) {
					var ratio = t / (steps - 1);

					var pos = this.calculateBezierPosition([pointA.getOffset(axis), pointA.getHandleOffset(axis, geom.End.END),
						pointB.getHandleOffset(axis, geom.End.START), pointB.getOffset(axis)], t);

					if (axis == geom.Axis.X) {
						positionsX.push(pos[0]);
					} else {
						result.push(new BezierPoint(positionsX[t], pos[0]));
					}

				}
			}


			return result;
		}

		calculateBezierPosition(coords: Array<number>, t: number) {
			var result: Array<number> = [];

			if (coords.length == 1) {
				result = coords;
			} else {
				for (var i = 0, n = coords.length - 1; i < n; i++) {
					result.push(this.calculateBezierPositionSingle(coords[i], coords[i + 1], t));
				}
				if (result.length > 1) {
					result = this.calculateBezierPosition(result, t);
				}
			}

			return result;
		}

		calculateBezierPositionSingle(posA: number, posB: number, t: number) {
			return (posB - posA) * t + posA;
		}
	}
}