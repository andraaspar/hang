var illa;
(function (illa) {
    illa.GLOBAL = (function () {
        return this;
    })();

    illa.classByType = (function () {
        var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
        var result = {};
        for (var i = 0, n = classes.length; i < n; i++) {
            result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
        }
        return result;
    })();

    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;

    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;

    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;

    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;

    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;

    if (Array.isArray)
        illa.isArray = Array.isArray;

    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;

    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;

    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;

    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;

    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        } else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;

    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;

    function bind(fn, obj) {
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    illa.bind = bind;

    function partial(fn, obj) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            args[_i] = arguments[_i + 2];
        }
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
    illa.partial = partial;

    if (Function.prototype.bind) {
        illa.bind = illa.partial = function (fn, obj) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
var berek;
(function (berek) {
    (function (jquery) {
        jquery.$ = window['jQuery'];
    })(berek.jquery || (berek.jquery = {}));
    var jquery = berek.jquery;
})(berek || (berek = {}));
var hang;
(function (hang) {
    (function (filter) {
        var NormalizeFilter = (function () {
            function NormalizeFilter(size) {
                if (typeof size === "undefined") { size = 1; }
                this.size = size;
            }
            NormalizeFilter.prototype.filter = function (source) {
                var result = [];

                var maxAbsValue = 0;
                for (var i = 0, n = source.length; i < n; i++) {
                    maxAbsValue = Math.max(maxAbsValue, Math.abs(source[i]));
                }

                var scale = this.size / maxAbsValue;

                for (var j = 0, o = source.length; j < o; j++) {
                    result[j] = source[j] * scale;
                }

                return result;
            };
            return NormalizeFilter;
        })();
        filter.NormalizeFilter = NormalizeFilter;
    })(hang.filter || (hang.filter = {}));
    var filter = hang.filter;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (geom) {
        (function (Axis) {
            Axis[Axis["X"] = 0] = "X";
            Axis[Axis["Y"] = 1] = "Y";
        })(geom.Axis || (geom.Axis = {}));
        var Axis = geom.Axis;
    })(hang.geom || (hang.geom = {}));
    var geom = hang.geom;
})(hang || (hang = {}));
var hang;
(function (hang) {
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
    })(hang.path || (hang.path = {}));
    var path = hang.path;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (geom) {
        (function (End) {
            End[End["START"] = 0] = "START";
            End[End["END"] = 1] = "END";
        })(geom.End || (geom.End = {}));
        var End = geom.End;
    })(hang.geom || (hang.geom = {}));
    var geom = hang.geom;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (path) {
        var Path = (function () {
            function Path(points) {
                this.points = points;
            }
            Path.prototype.getPoint = function (i) {
                return this.points[i];
            };

            Path.prototype.getPointCount = function () {
                return this.points.length;
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
    })(hang.path || (hang.path = {}));
    var path = hang.path;
})(hang || (hang = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var hang;
(function (hang) {
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
        })(path.Point);
        path.BezierPoint = BezierPoint;
    })(hang.path || (hang.path = {}));
    var path = hang.path;
})(hang || (hang = {}));
var hang;
(function (hang) {
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

                for (var i = 0, n = this.getPointCount() - 1; i < n; i++) {
                    newPoints.pop();
                    var pointA = this.getPoint(i);
                    var pointB = this.getPoint(i + 1);
                    newPoints = newPoints.concat(this.linearizeSegment(pointA, pointB, steps));
                }

                return new path.Path(newPoints);
            };

            BezierPath.prototype.linearizeSegment = function (pointA, pointB, steps) {
                var result = [];
                var axes = [0 /* X */, 1 /* Y */];
                var positionsX = [];
                var pointsPerSegment = steps + 1;

                for (var axisID = 0; axisID < axes.length; axisID++) {
                    var axis = axes[axisID];
                    for (var t = 0; t < pointsPerSegment; t++) {
                        var ratio = t / (pointsPerSegment - 1);

                        var pos = this.calculateBezierPosition([
                            pointA.getOffset(axis), pointA.getHandleOffset(axis, 1 /* END */),
                            pointB.getHandleOffset(axis, 0 /* START */), pointB.getOffset(axis)], ratio);

                        if (axis == 0 /* X */) {
                            positionsX.push(pos[0]);
                        } else {
                            result.push(new path.Point(positionsX[t], pos[0]));
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
        })(path.Path);
        path.BezierPath = BezierPath;
    })(hang.path || (hang.path = {}));
    var path = hang.path;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (_path) {
        var SVGPathConverter = (function () {
            function SVGPathConverter() {
            }
            SVGPathConverter.convert = function (d) {
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
                                    lastPoint.setHandleOffset(0 /* X */, 1 /* END */, handleCoords.x);
                                    lastPoint.setHandleOffset(1 /* Y */, 1 /* END */, handleCoords.y);

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
                                    lastPoint.setHandleOffset(0 /* X */, 1 /* END */, lastPoint.getOffset(0 /* X */) + handleCoords.x);
                                    lastPoint.setHandleOffset(1 /* Y */, 1 /* END */, lastPoint.getOffset(1 /* Y */) + handleCoords.y);

                                    lastPoint = SVGPathConverter.convertBezierPoint(dArr[i + 2], dArr[i + 1], lastPoint);
                                    points.push(lastPoint);
                                    i += 2;
                                    break;
                                default:
                            }
                    }
                }

                return new _path.BezierPath(points);
            };

            SVGPathConverter.convertBezierPoint = function (coords, inCoords, lastPoint) {
                var coordsConverted = SVGPathConverter.convertCoords(coords);
                if (lastPoint) {
                    coordsConverted.x += lastPoint.getOffset(0 /* X */);
                    coordsConverted.y += lastPoint.getOffset(1 /* Y */);
                }
                var inCoordsConverted = coordsConverted;
                var outCoordsConverted = coordsConverted;
                if (inCoords) {
                    inCoordsConverted = SVGPathConverter.convertCoords(inCoords);
                    if (lastPoint) {
                        inCoordsConverted.x += lastPoint.getOffset(0 /* X */);
                        inCoordsConverted.y += lastPoint.getOffset(1 /* Y */);
                    }
                }
                return new _path.BezierPoint(coordsConverted.x, coordsConverted.y, inCoordsConverted.x, inCoordsConverted.y, outCoordsConverted.x, outCoordsConverted.y);
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

            SVGPathConverter.linearPathToSvg = function (path) {
                var s = '';
                for (var i = 0, count = path.getPointCount(); i < count; i++) {
                    var point = path.getPoint(i);
                    if (i == 0) {
                        s += 'M ';
                    } else {
                        s += ' L ';
                    }
                    s += point.getOffset(0 /* X */) + ',' + point.getOffset(1 /* Y */);
                }
                return s;
            };
            SVGPathConverter.MOVE_TO = 'M';
            SVGPathConverter.MOVE_TO_RELATIVE = 'm';
            SVGPathConverter.CURVE_TO = 'C';
            SVGPathConverter.CURVE_TO_RELATIVE = 'c';
            SVGPathConverter.LINE_TO = 'L';
            SVGPathConverter.LINE_TO_RELATIVE = 'l';
            return SVGPathConverter;
        })();
        _path.SVGPathConverter = SVGPathConverter;
    })(hang.path || (hang.path = {}));
    var path = hang.path;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (sound) {
        var Sound = (function () {
            function Sound(wave, frequencySource, levelSource, length) {
                this.wave = wave;
                this.frequencySource = frequencySource;
                this.levelSource = levelSource;
                this.length = length;
                this.startTime = 0;
                this.startSampleID = 0;
            }
            Sound.prototype.render = function () {
                this.output = [0];
                var sampleCount = this.getSampleCount();
                var sampleTimeDiff = 1 / Sound.sampleFrequency;
                var wavePosition = 0;
                for (var i = 0; i < sampleCount; i++) {
                    var timeRatio = i / (sampleCount - 1);
                    var time = this.length * timeRatio;
                    var frequency = this.frequencySource.render(timeRatio);
                    var level = this.levelSource.render(timeRatio);
                    var waveLength = 1 / frequency;
                    var waveTimeElapsed = sampleTimeDiff / waveLength;
                    wavePosition += waveTimeElapsed;
                    var waveRendered = this.wave.render(wavePosition) * level;
                    this.output.push(waveRendered);
                }
                return this.output;
            };

            Sound.prototype.getOutputSample = function (id) {
                return this.output[id];
            };

            Sound.prototype.getStartTime = function () {
                return this.startTime;
            };

            Sound.prototype.setStartTime = function (value) {
                this.startTime = value;
                this.startSampleID = Math.floor(this.startTime * Sound.sampleFrequency);
            };

            Sound.prototype.getStartSampleID = function () {
                return this.startSampleID;
            };

            Sound.prototype.setStartSampleID = function (value) {
                this.startSampleID = value;
                this.startTime = this.startSampleID / Sound.sampleFrequency;
            };

            Sound.prototype.getTimeLength = function () {
                return this.length;
            };

            Sound.prototype.getSampleCount = function () {
                return Math.floor(this.getTimeLength() * Sound.sampleFrequency);
            };

            Sound.prototype.getOutput = function () {
                return this.output;
            };
            Sound.sampleFrequency = 44100;
            return Sound;
        })();
        sound.Sound = Sound;
    })(hang.sound || (hang.sound = {}));
    var sound = hang.sound;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (_sound) {
        var Mixer = (function () {
            function Mixer(sounds) {
                this.sounds = sounds;
            }
            Mixer.prototype.getTimeLength = function () {
                var result = 0;
                for (var i = 0, n = this.sounds.length; i < n; i++) {
                    var sound = this.sounds[i];
                    result = Math.max(result, sound.getStartTime() + sound.getTimeLength());
                }
                return result;
            };

            Mixer.prototype.getSampleCount = function () {
                var result = 0;
                for (var i = 0, n = this.sounds.length; i < n; i++) {
                    var sound = this.sounds[i];
                    result = Math.max(result, sound.getStartSampleID() + sound.getSampleCount());
                }
                return result;
            };

            Mixer.prototype.render = function () {
                this.renderSounds();

                this.output = [];
                var soundCount = this.sounds.length;
                for (var sampleID = 0, sampleCount = this.getSampleCount(); sampleID < sampleCount; sampleID++) {
                    var value = 0;
                    for (var soundID = 0; soundID < soundCount; soundID++) {
                        var sound = this.sounds[soundID];
                        if (sound.getStartSampleID() <= sampleID && sound.getStartSampleID() + sound.getSampleCount() > sampleID) {
                            value += sound.getOutputSample(sampleID - sound.getStartSampleID());
                        }
                    }
                    this.output.push(value);
                }
            };

            Mixer.prototype.renderSounds = function () {
                for (var i = 0, n = this.sounds.length; i < n; i++) {
                    this.sounds[i].render();
                }
            };

            Mixer.prototype.getOutput = function () {
                return this.output;
            };
            return Mixer;
        })();
        _sound.Mixer = Mixer;
    })(hang.sound || (hang.sound = {}));
    var sound = hang.sound;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (wave) {
        var ConstantWave = (function () {
            function ConstantWave(value) {
                this.value = value;
            }
            ConstantWave.prototype.render = function (time) {
                return this.value;
            };
            return ConstantWave;
        })();
        wave.ConstantWave = ConstantWave;
    })(hang.wave || (hang.wave = {}));
    var wave = hang.wave;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (wave) {
        var MultiplyWave = (function () {
            function MultiplyWave(source, multiplier) {
                this.source = source;
                this.multiplier = multiplier;
            }
            MultiplyWave.prototype.render = function (time) {
                return this.source.render(time) * this.multiplier;
            };
            return MultiplyWave;
        })();
        wave.MultiplyWave = MultiplyWave;
    })(hang.wave || (hang.wave = {}));
    var wave = hang.wave;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (wave) {
        var PathWave = (function () {
            function PathWave(path) {
                this.path = path;
                this.length = path.getSize(0 /* X */);
            }
            PathWave.prototype.render = function (time) {
                var result = 0;
                var timeOffset = (time % 1) * this.length;
                var prevPoint;

                for (var i = 0, n = this.path.getPointCount(); i < n; i++) {
                    var currentPoint = this.path.getPoint(i);
                    if (prevPoint) {
                        if (currentPoint.getOffset(0 /* X */) >= timeOffset) {
                            result = this.getTimeOffsetY(prevPoint, currentPoint, timeOffset);
                            break;
                        }
                    }
                    prevPoint = currentPoint;
                }

                return result;
            };

            PathWave.prototype.getTimeOffsetY = function (pointA, pointB, timeOffset) {
                var aX = pointA.getOffset(0 /* X */);
                var aY = pointA.getOffset(1 /* Y */);
                var bX = pointB.getOffset(0 /* X */);
                var bY = pointB.getOffset(1 /* Y */);

                var lengthX = bX - aX;
                var lengthY = bY - aY;

                var ratio = (timeOffset - aX) / lengthX;

                return aY + lengthY * ratio;
            };
            return PathWave;
        })();
        wave.PathWave = PathWave;
    })(hang.wave || (hang.wave = {}));
    var wave = hang.wave;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (wave) {
        var SineWave = (function () {
            function SineWave() {
            }
            SineWave.prototype.render = function (time) {
                return Math.sin(time * SineWave.DOUBLE_PI);
            };
            SineWave.DOUBLE_PI = Math.PI * 2;
            return SineWave;
        })();
        wave.SineWave = SineWave;
    })(hang.wave || (hang.wave = {}));
    var wave = hang.wave;
})(hang || (hang = {}));
var hang;
(function (hang) {
    (function (wave) {
        var SquareWave = (function () {
            function SquareWave() {
            }
            SquareWave.prototype.render = function (time) {
                return Math.round(time % 1) * -2 + 1;
            };
            return SquareWave;
        })();
        wave.SquareWave = SquareWave;
    })(hang.wave || (hang.wave = {}));
    var wave = hang.wave;
})(hang || (hang = {}));
var test1;
(function (test1) {
    var jquery = berek.jquery;

    var Main = (function () {
        function Main() {
            jquery.$(window).on('load', illa.bind(this.onDOMLoaded, this));
        }
        Main.prototype.onDOMLoaded = function () {
            this.test1Object = document.getElementById('test-1');
            this.test1Document = this.test1Object.contentDocument;
            this.freq1 = this.test1Document.getElementById('freq-1');
            var bezierPath = hang.path.SVGPathConverter.convert(this.freq1.getAttribute('d'));
            var linearPath = bezierPath.linearize(100);

            var pathElement = this.test1Document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.freq1.parentNode.appendChild(pathElement);
            pathElement.setAttribute('style', 'fill:none;stroke:green;stroke-width:1px;');
            pathElement.setAttribute('d', hang.path.SVGPathConverter.linearPathToSvg(linearPath));

            var pathWave = new hang.wave.PathWave(linearPath);

            var wave1Bezier = hang.path.SVGPathConverter.convert(this.test1Document.getElementById('wave-1').getAttribute('d'));
            var wave1Linear = wave1Bezier.linearize(100);
            var wave1 = new hang.wave.PathWave(wave1Linear);

            var levelWave = new hang.wave.ConstantWave(100);
            var snd = new hang.sound.Sound(wave1, pathWave, levelWave, 5);

            snd.render();
            var data = snd.getOutput();
            var normalizer = new hang.filter.NormalizeFilter(Math.round(32767 * .99));
            var riffWave = new RIFFWAVE();
            riffWave.header.sampleRate = 44100;
            riffWave.header.bitsPerSample = 16;
            riffWave.Make(normalizer.filter(data));

            var audioElement = document.createElement('audio');
            audioElement.src = riffWave.dataURI;
            audioElement.controls = true;
            document.body.insertBefore(audioElement, document.body.firstChild);
        };
        Main.instance = new Main();
        return Main;
    })();
    test1.Main = Main;
})(test1 || (test1 = {}));
