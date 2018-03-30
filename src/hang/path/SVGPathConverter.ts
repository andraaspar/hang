/// <reference path='BezierPath.ts'/>
/// <reference path='BezierPoint.ts'/>

module hang.path {
	export interface ICoords {
		x:number;
		y:number;
	}
	
	export class SVGPathConverter {
		static MOVE_TO = 'M';
		static MOVE_TO_RELATIVE = 'm';
		static CURVE_TO = 'C';
		static CURVE_TO_RELATIVE = 'c';
		static LINE_TO = 'L';
		static LINE_TO_RELATIVE = 'l';

		static convert(d: string) {
			var points: Array<BezierPoint> = [];
			var dArr = d.split(' ');
			var currentCommand = '';
			
			var lastPoint: BezierPoint;

			for (var i = 0, n = dArr.length; i < n; i++) {
				var dPart = dArr[i];
				switch (dPart) {
					case SVGPathConverter.MOVE_TO:
					case SVGPathConverter.LINE_TO:
					case SVGPathConverter.CURVE_TO:
					case SVGPathConverter.MOVE_TO_RELATIVE:
					case SVGPathConverter.LINE_TO_RELATIVE:
					case SVGPathConverter.CURVE_TO_RELATIVE:
						currentCommand = dPart;
						break;
					default:
						switch (currentCommand) {
							case SVGPathConverter.MOVE_TO:
							case SVGPathConverter.LINE_TO:
								lastPoint = SVGPathConverter.convertBezierPoint(dPart);
								points.push(lastPoint);
								break;
							case SVGPathConverter.CURVE_TO:
								var handleCoords = SVGPathConverter.convertCoords(dPart);
								lastPoint.setHandleOffset(geom.Axis.X, geom.End.END, handleCoords.x);
								lastPoint.setHandleOffset(geom.Axis.Y, geom.End.END, handleCoords.y);
								
								lastPoint = SVGPathConverter.convertBezierPoint(dArr[i + 2], dArr[i + 1]);
								points.push(lastPoint);
								i += 2;
								break;
							case SVGPathConverter.MOVE_TO_RELATIVE:
							case SVGPathConverter.LINE_TO_RELATIVE:
								lastPoint = SVGPathConverter.convertBezierPoint(dPart, undefined, lastPoint);
								points.push(lastPoint);
								break;
							case SVGPathConverter.CURVE_TO_RELATIVE:
								var handleCoords = SVGPathConverter.convertCoords(dPart);
								lastPoint.setHandleOffset(geom.Axis.X, geom.End.END, lastPoint.getOffset(geom.Axis.X) + handleCoords.x);
								lastPoint.setHandleOffset(geom.Axis.Y, geom.End.END, lastPoint.getOffset(geom.Axis.Y) + handleCoords.y);
								
								lastPoint = SVGPathConverter.convertBezierPoint(dArr[i + 2], dArr[i + 1], lastPoint);
								points.push(lastPoint);
								i += 2;
								break;
							default:
						}
				}
			}

			return new BezierPath(points);
		}
		
		static convertBezierPoint(coords:string, inCoords?:string, lastPoint?: BezierPoint) {
			var coordsConverted = SVGPathConverter.convertCoords(coords);
			if (lastPoint) {
				coordsConverted.x += lastPoint.getOffset(geom.Axis.X)
				coordsConverted.y += lastPoint.getOffset(geom.Axis.Y)
			}
			var inCoordsConverted = coordsConverted;
			var outCoordsConverted = coordsConverted;
			if (inCoords) {
				inCoordsConverted = SVGPathConverter.convertCoords(inCoords);
				if (lastPoint) {
					// inCoordsConverted.x += lastPoint.getHandleOffset(geom.Axis.X, geom.End.END)
					// inCoordsConverted.y += lastPoint.getHandleOffset(geom.Axis.Y, geom.End.END)
					inCoordsConverted.x += lastPoint.getOffset(geom.Axis.X)
					inCoordsConverted.y += lastPoint.getOffset(geom.Axis.Y)
					// coordsConverted.x += inCoordsConverted.x
					// coordsConverted.y += inCoordsConverted.y
				}
			}
			return new BezierPoint(coordsConverted.x, coordsConverted.y, inCoordsConverted.x, inCoordsConverted.y, outCoordsConverted.x, outCoordsConverted.y);
		}
		
		static convertCoords(coords:string):ICoords {
			var result:ICoords = null;
			var found = coords.match(/^(-?[0-9.]+),?(-?[0-9.]+)$/);
			if (found && found.length == 3) {
				result = {
					x: Number(found[1]),
					y: Number(found[2])
				};
			}
			return result;
		}
		
		static linearPathToSvg(path: path.Path) {
			var s = ''
			for (var i = 0, count = path.getPointCount(); i < count; i++) {
				var point = path.getPoint(i)
				if (i == 0) {
					s += 'M '
				} else {
					s += ' L '
				}
				s += point.getOffset(geom.Axis.X) + ',' + point.getOffset(geom.Axis.Y)
			}
			return s
		}
	}
}