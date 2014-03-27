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
/// <reference path='../geom/Axis.ts'/>
/// <reference path='../geom/End.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var BezierPoint = (function () {
            function BezierPoint(x, y, hx1, hy1, hx2, hy2) {
                if (typeof hx1 === "undefined") { hx1 = x; }
                if (typeof hy1 === "undefined") { hy1 = y; }
                if (typeof hx2 === "undefined") { hx2 = x; }
                if (typeof hy2 === "undefined") { hy2 = y; }
                this.x = x;
                this.y = y;
                this.hx1 = hx1;
                this.hy1 = hy1;
                this.hx2 = hx2;
                this.hy2 = hy2;
            }
            BezierPoint.prototype.getOffset = function (axis) {
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

            BezierPoint.prototype.getHandleOffset = function (axis, end) {
                var result = NaN;
                switch (axis) {
                    case 0 /* X */:
                        if (end == 0 /* START */)
                            result = this.hx1;
                        else if (end == 1 /* END */)
                            result = this.hx2;
                        break;
                    case 1 /* Y */:
                        if (end == 0 /* START */)
                            result = this.hy1;
                        else if (end == 1 /* END */)
                            result = this.hy2;
                        break;
                }
                return result;
            };

            BezierPoint.prototype.getIsLinear = function (end) {
                return this.getOffset(0 /* X */) == this.getHandleOffset(0 /* X */, end) && this.getOffset(1 /* Y */) == this.getHandleOffset(1 /* Y */, end);
            };
            return BezierPoint;
        })();
        path.BezierPoint = BezierPoint;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='BezierPoint.ts'/>
var pirsound;
(function (pirsound) {
    (function (path) {
        var BezierPath = (function () {
            function BezierPath(points) {
                this.points = points;
            }
            BezierPath.prototype.linearize = function (steps) {
                var points = [];

                for (var i = 0, n = points.length - 1; i < n; i++) {
                    points.pop();
                    var pointA = points[i];
                    var pointB = points[i + 1];
                    points = points.concat(this.linearizeSegment(pointA, pointB, steps));
                }

                return new BezierPath(points);
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
                            result.push(new pirsound.path.BezierPoint(positionsX[t], pos[0]));
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
        })();
        path.BezierPath = BezierPath;
    })(pirsound.path || (pirsound.path = {}));
    var path = pirsound.path;
})(pirsound || (pirsound = {}));
/// <reference path='path/BezierPath.ts'/>
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
            console.log(Main.freq1.getAttribute('d'));
        };
        return Main;
    })();
    pirsound.Main = Main;
})(pirsound || (pirsound = {}));

pirsound.Main.main();
