/// <reference path='IWave.ts'/>
/// <reference path='../path/Path.ts'/>

module hang.wave {
	export class PathWave implements IWave {
	
		private length:number;
		
		constructor(private path: path.Path) {
			this.length = path.getSize(geom.Axis.X);
		}
		
		render(time: number) {
			var result = 0;
			var timeOffset = (time % 1) * this.length;
			var prevPoint:path.Point;
			
			for (var i = 0, n = this.path.getPointCount(); i < n; i++) {
				var currentPoint = this.path.getPoint(i);
				if (prevPoint) {
					if (currentPoint.getOffset(geom.Axis.X) >= timeOffset) {
						result = this.getTimeOffsetY(prevPoint, currentPoint, timeOffset);
						break;
					}
				}
				prevPoint = currentPoint;
			}
			
			return result;
		}
		
		getTimeOffsetY(pointA: path.Point, pointB: path.Point, timeOffset: number): number {
			var aX = pointA.getOffset(geom.Axis.X);
			var aY = pointA.getOffset(geom.Axis.Y);
			var bX = pointB.getOffset(geom.Axis.X);
			var bY = pointB.getOffset(geom.Axis.Y);
			
			var lengthX = bX - aX;
			var lengthY = bY - aY;
			
			var ratio = (timeOffset - aX) / lengthX;
			
			return aY + lengthY * ratio;
		}
	}
}