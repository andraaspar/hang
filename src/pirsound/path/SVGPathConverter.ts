/// <reference path='BezierPath.ts'/>
/// <reference path='BezierPoint.ts'/>

module pirsound.path {
	class SVGPathConverter {
		static MOVE_TO = 'M';
		static CURVE_TO = 'C';
		static LINE_TO = 'L';
		
		static convert(svgPath: SVGPathElement) {
			var d = svgPath.getAttribute('d');
			var points:Array<BezierPoint> = [];
			var dArr = d.split(' ');
			
			for (var i = 0, n = dArr.length; i < n; i++) {
				var dPart = dArr[i];
				switch (dPart) {
					case SVGPathConverter.MOVE_TO:
						
						break;
					case SVGPathConverter.LINE_TO:
						
						break;
					case SVGPathConverter.CURVE_TO:
						
						break;
					default:
						
				}
			}
			
			return new BezierPath(points);
		}
	}
}