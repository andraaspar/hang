var pirsound;
(function (pirsound) {
    (function (geom) {
        (function (Axis) {
            Axis[Axis["X"] = 0] = "X";
            Axis[Axis["Y"] = 1] = "Y";
        })(geom.Axis || (geom.Axis = {}));
        var Axis = geom.Axis;
    })(pirsound.geom || (pirsound.geom = {}));
    var geom = pirsound.geom;
})(pirsound || (pirsound = {}));
/// <reference path='../geom/Axis.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var Point = (function () {
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.getOffset = function (axis) {
                var result = NaN;
                switch (axis) {
                    case 0 /* X */:
                        result = this.x;
                        break;
                    case 1 /* Y */:
                        result = this.y;
                        break;
                }
                return result;
            };

            Point.prototype.setOffset = function (axis, value) {
                switch (axis) {
                    case 0 /* X */:
                        this.x = value;
                        break;
                    case 1 /* Y */:
                        this.y = value;
                        break;
                }
            };
            return Point;
        })();
        path.Point = Point;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
var pirsound;
(function (pirsound) {
    (function (geom) {
        (function (End) {
            End[End["START"] = 0] = "START";
            End[End["END"] = 1] = "END";
        })(geom.End || (geom.End = {}));
        var End = geom.End;
    })(pirsound.geom || (pirsound.geom = {}));
    var geom = pirsound.geom;
})(pirsound || (pirsound = {}));
/// <reference path='Point.ts'/>
/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var Path = (function () {
            function Path(points) {
                this.points = points;
            }
            Path.prototype.getPoint = function (i) {
                return this.points[i];
            };

            Path.prototype.getSize = function (axis) {
                return this.getOffset(axis, 1 /* END */) - this.getOffset(axis, 0 /* START */);
            };

            Path.prototype.getOffset = function (axis, end) {
                var offset = end == 0 /* START */ ? Infinity : -Infinity;
                var test = end == 0 /* START */ ? Math.min : Math.max;

                for (var i = 0, n = this.points.length; i < n; i++) {
                    var pointOffset = this.points[i].getOffset(axis);
                    offset = test(offset, pointOffset);
                }

                if (!isFinite(offset)) {
                    offset = 0;
                }
                return offset;
            };
            return Path;
        })();
        path.Path = Path;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='Point.ts'/>
/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pirsound;
(function (pirsound) {
    (function (path) {
        var BezierPoint = (function (_super) {
            __extends(BezierPoint, _super);
            function BezierPoint(x, y, inX, inY, outX, outY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof inX === "undefined") { inX = x; }
                if (typeof inY === "undefined") { inY = y; }
                if (typeof outX === "undefined") { outX = x; }
                if (typeof outY === "undefined") { outY = y; }
                _super.call(this, x, y);
                this.inX = inX;
                this.inY = inY;
                this.outX = outX;
                this.outY = outY;
            }
            BezierPoint.prototype.getHandleOffset = function (axis, end) {
                var result = NaN;
                switch (axis) {
                    case 0 /* X */:
                        if (end == 0 /* START */)
                            result = this.inX;
                        else if (end == 1 /* END */)
                            result = this.outX;
                        break;
                    case 1 /* Y */:
                        if (end == 0 /* START */)
                            result = this.inY;
                        else if (end == 1 /* END */)
                            result = this.outY;
                        break;
                }
                return result;
            };

            BezierPoint.prototype.setHandleOffset = function (axis, end, value) {
                switch (axis) {
                    case 0 /* X */:
                        if (end == 0 /* START */)
                            this.inX = value;
                        else if (end == 1 /* END */)
                            this.outX = value;
                        break;
                    case 1 /* Y */:
                        if (end == 0 /* START */)
                            this.inY = value;
                        else if (end == 1 /* END */)
                            this.outY = value;
                        break;
                }
            };

            BezierPoint.prototype.getIsLinear = function (end) {
                return this.getOffset(0 /* X */) == this.getHandleOffset(0 /* X */, end) && this.getOffset(1 /* Y */) == this.getHandleOffset(1 /* Y */, end);
            };
            return BezierPoint;
        })(pirsound.path.Point);
        path.BezierPoint = BezierPoint;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='Path.ts'/>
/// <reference path='BezierPoint.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var BezierPath = (function (_super) {
            __extends(BezierPath, _super);
            function BezierPath(points) {
                _super.call(this, points);
            }
            BezierPath.prototype.getPoint = function (i) {
                return _super.prototype.getPoint.call(this, i);
            };

            BezierPath.prototype.linearize = function (steps) {
                var newPoints = [];

                for (var i = 0, n = newPoints.length - 1; i < n; i++) {
                    newPoints.pop();
                    var pointA = this.getPoint(i);
                    var pointB = this.getPoint(i + 1);
                    newPoints = newPoints.concat(this.linearizeSegment(pointA, pointB, steps));
                }

                return new pirsound.path.Path(newPoints);
            };

            BezierPath.prototype.linearizeSegment = function (pointA, pointB, steps) {
                var result = [];
                var axes = [0 /* X */, 1 /* Y */];
                var positionsX = [];

                for (var axisID = 0; axisID < axes.length; axisID++) {
                    var axis = axes[axisID];
                    for (var t = 0; t < steps; t++) {
                        var ratio = t / (steps - 1);

                        var pos = this.calculateBezierPosition([
                            pointA.getOffset(axis), pointA.getHandleOffset(axis, 1 /* END */),
                            pointB.getHandleOffset(axis, 0 /* START */), pointB.getOffset(axis)], t);

                        if (axis == 0 /* X */) {
                            positionsX.push(pos[0]);
                        } else {
                            result.push(new pirsound.path.Point(positionsX[t], pos[0]));
                        }
                    }
                }

                return result;
            };

            BezierPath.prototype.calculateBezierPosition = function (coords, t) {
                var result = [];

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
            };

            BezierPath.prototype.calculateBezierPositionSingle = function (posA, posB, t) {
                return (posB - posA) * t + posA;
            };
            return BezierPath;
        })(pirsound.path.Path);
        path.BezierPath = BezierPath;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='BezierPath.ts'/>
/// <reference path='BezierPoint.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var SVGPathConverter = (function () {
            function SVGPathConverter() {
            }
            SVGPathConverter.convert = function (svgPath) {
                var d = svgPath.getAttribute('d');
                var points = [];
                var dArr = d.split(' ');
                var currentCommand = '';

                var lastPoint;

                for (var i = 0, n = dArr.length; i < n; i++) {
                    var dPart = dArr[i];
                    switch (dPart) {
                        case SVGPathConverter.MOVE_TO:
                        case SVGPathConverter.LINE_TO:
                        case SVGPathConverter.CURVE_TO:
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
                                    lastPoint.setHandleOffset(0 /* X */, 1 /* END */, handleCoords.x);
                                    lastPoint.setHandleOffset(1 /* Y */, 1 /* END */, handleCoords.y);

                                    lastPoint = SVGPathConverter.convertBezierPoint(dArr[i + 2], dArr[i + 1]);
                                    points.push(lastPoint);
                                    i += 2;
                                    break;
                                default:
                            }
                    }
                }

                return new pirsound.path.BezierPath(points);
            };

            SVGPathConverter.convertBezierPoint = function (coords, inCoords, outCoords) {
                var coordsConverted = SVGPathConverter.convertCoords(coords);
                var inCoordsConverted = coordsConverted;
                var outCoordsConverted = coordsConverted;
                if (inCoords) {
                    inCoordsConverted = SVGPathConverter.convertCoords(inCoords);
                }
                if (outCoords) {
                    outCoordsConverted = SVGPathConverter.convertCoords(outCoords);
                }
                return new pirsound.path.BezierPoint(coordsConverted.x, coordsConverted.y, inCoordsConverted.x, inCoordsConverted.y, outCoordsConverted.x, outCoordsConverted.y);
            };

            SVGPathConverter.convertCoords = function (coords) {
                var result = null;
                var found = coords.match(/^(-?[0-9.]+),?(-?[0-9.]+)$/);
                if (found && found.length == 3) {
                    result = {
                        x: Number(found[1]),
                        y: Number(found[2])
                    };
                }
                return result;
            };
            SVGPathConverter.MOVE_TO = 'M';
            SVGPathConverter.CURVE_TO = 'C';
            SVGPathConverter.LINE_TO = 'L';
            return SVGPathConverter;
        })();
        path.SVGPathConverter = SVGPathConverter;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='path/SVGPathConverter.ts'/>
var pirsound;
(function (pirsound) {
    var Main = (function () {
        function Main() {
        }
        Main.main = function () {
            window.addEventListener('load', Main.onDOMLoaded.bind(this));
        };

        Main.onDOMLoaded = function () {
            Main.test1 = document.getElementById('test-1');
            Main.test1Document = Main.test1.contentDocument;
            Main.freq1 = Main.test1Document.getElementById('freq-1');
            var bezierPath = pirsound.path.SVGPathConverter.convert(Main.freq1);
            console.log(bezierPath);
        };
        return Main;
    })();
    pirsound.Main = Main;
})(pirsound || (pirsound = {}));

pirsound.Main.main();
