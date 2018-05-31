// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function Svg(width, height) {
    var overSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    if (arguments.length < 2) {
        throw Error('创建svg图像需要输入宽高， 防止图像溢出');
    }

    this.overSize = overSize;
    this.nodes = [];
    this.size = [width, height];
}

Svg.prototype.line = function (start, end) {
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    var lineNode = '<line x1="' + start[0] + '" x2="' + end[0] + '" y1="' + start[1] + '" y2="' + end[1] + '" stroke="' + color + '" stroke-width="' + width + '"/>';
    this.nodes.push(lineNode);
};

Svg.prototype.point = function (pos) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'black';

    var circleNode = '<circle cx="' + pos[0] + '" cy="' + pos[1] + '" r="' + r + '" fill="' + color + '"/>';
    this.nodes.push(circleNode);
};

Svg.prototype.text = function (pos, value) {
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '5';
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    var textNode = '<text x="' + pos[0] + '" y="' + pos[1] + '" fill="' + color + '" style="font-size:' + size + 'px">' + value + '</text>    ';
    this.nodes.push(textNode);
};

Svg.prototype.rect = function (leftTop, rightBottom) {
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    var rectNode = '<rect x="' + leftTop[0] + '" y="' + leftTop[1] + '"  \n    width="' + (rightBottom[0] - leftTop[0]) + '" height="' + (rightBottom[1] - leftTop[1]) + '" \n    stroke-width="' + width + '"\n    fill="' + color + '"/>';
    this.nodes.push(rectNode);
};

Svg.prototype.showIn = function () {
    var htmlElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var nodes = this.nodes.join('\n');
    var svgHtml = '\n    <svg xmlns="http://www.w3.org/2000/svg" style="width:' + (this.size[0] + this.overSize) + 'px; height:' + (this.size[1] + this.overSize) + 'px;">\n    ' + nodes + '\n    </svg>\n    ';
    htmlElement.innerHTML = svgHtml;
};

exports.default = Svg;
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Canvas(width, height) {
    var overSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    this.element = document.createElement("canvas");
    this.context = this.element.getContext('2d');
    this.element.width = width + overSize;
    this.element.height = height + overSize;
}

Canvas.prototype.line = function (start, end) {
    var _context, _context2;

    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    this.context.strokeStyle = color;
    this.context.lineWidth = width;
    this.context.beginPath();
    (_context = this.context).moveTo.apply(_context, _toConsumableArray(start));
    (_context2 = this.context).lineTo.apply(_context2, _toConsumableArray(end));
    this.context.stroke();
    // this.fill();
    this.context.closePath();
};

Canvas.prototype.point = function (pos) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'black';

    var _pos = _slicedToArray(pos, 2),
        x = _pos[0],
        y = _pos[1];

    this.context.fillStyle = color;
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
};

Canvas.prototype.text = function (pos, value) {
    var _context3;

    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '5';
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    this.context.font = size + 'px Georgia';
    (_context3 = this.context).strokeText.apply(_context3, [value].concat(_toConsumableArray(pos)));
};

Canvas.prototype.rect = function (leftTop, rightBottom) {
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';

    this.context.fillStyle = color;

    var _leftTop = _slicedToArray(leftTop, 2),
        ltx = _leftTop[0],
        lty = _leftTop[1];

    var _rightBottom = _slicedToArray(rightBottom, 2),
        rbx = _rightBottom[0],
        rby = _rightBottom[1];

    var rectWidth = rbx - ltx,
        rectHeight = rby - lty;


    this.context.fillRect(ltx, lty, rectWidth, rectHeight);
};

Canvas.prototype.showIn = function () {
    var htmlElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    // let nodes = this.nodes.join('\n');
    // let svgHtml = `
    // <svg xmlns="http://www.w3.org/2000/svg" style="width:${this.size[0] + this.overSize}px; height:${this.size[1] + this.overSize}px;">
    // ${nodes}
    // </svg>
    // `
    htmlElement.innerHTML = '';
    htmlElement.appendChild(this.element);
};

exports.default = Canvas;
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Svg = require("./utils/Svg");

var _Svg2 = _interopRequireDefault(_Svg);

var _Canvas = require("./utils/Canvas");

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function ceil(value) {
    //ceil(100) => 100
    //ceil(175) => 200
    //ceil(915) => 1000
    value = Math.floor(value);
    var numOfPlaces = new String(value).length;
    var temp = value * Math.pow(0.1, numOfPlaces - 1);
    var result = Math.ceil(temp - 0.0001) * Math.pow(10, numOfPlaces - 1);
    return result;
}

function drawBarGraphBySvg(data) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var height = 300;
    var width = 400;
    // let normalColor = 'black';
    var maxValue = Math.max.apply(Math, _toConsumableArray(data));
    var topValue = ceil(maxValue);

    var svg = new _Svg2.default(width, height);

    var originPoint = [100, height - 10];
    var startY = 50;

    var lengthOfAxisX = width - originPoint[0];
    var offsetX = originPoint[0];

    var lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    var offsetY = startY;

    var numOfPoint = data.length;

    var splitDis = topValue / numOfPoint; //yi - y(i-1) = splitDis;  代表y两点之间的大小
    var ratioY = Math.round(lengthOfAxisY / numOfPoint); //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    var ratioX = Math.round(lengthOfAxisY / numOfPoint);

    svg.line([originPoint[0], startY], originPoint);
    svg.line(originPoint, [width, originPoint[1]]);

    //处理轴坐标相关
    var tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    var mapOfPointX = tempArr.map(function (item, index) {
        //x轴上的点
        return {
            pos: [ratioX * (index + 1) + offsetX, originPoint[1]],
            name: index + 1 + "\u6708"
        };
    });
    var mapOfPointY = tempArr.map(function (item, index) {
        //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - ratioY * (index + 1)], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元"
        };
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = mapOfPointX[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var itemX = _step.value;
            //画出x轴上的点，并标上文字
            svg.point(itemX.pos, 2);

            var _itemX$pos = _slicedToArray(itemX.pos, 2),
                textX = _itemX$pos[0],
                textY = _itemX$pos[1];

            var fontSize = 10;
            textY += fontSize + 5;
            textX -= fontSize * itemX.name.length / 2;
            svg.text([textX, textY], itemX.name, fontSize);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = mapOfPointY[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var itemY = _step2.value;
            //画出y轴上的点，并标上文字
            svg.point(itemY.pos, 2);

            var _itemY$pos = _slicedToArray(itemY.pos, 2),
                textX = _itemY$pos[0],
                textY = _itemY$pos[1];

            var fontSize = 10;
            textY += fontSize / 2;
            textX -= fontSize * itemY.name.length;
            svg.text([textX, textY], itemY.name, fontSize);
        }

        //画出柱状图
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    for (var index = 0; index < data.length; index++) {
        var pointX = mapOfPointX[index].pos[0];
        var pointY = data[index] / splitDis;
        var _width = 10;
        svg.rect([pointX - _width / 2, originPoint[1] - pointY * ratioY], [pointX + _width / 2, originPoint[1]]);
    }
    svg.showIn(element);
}

function drawBarGraphByCanvas(data) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var height = 300;
    var width = 400;
    // let normalColor = 'black';
    var maxValue = Math.max.apply(Math, _toConsumableArray(data));
    var topValue = ceil(maxValue);

    var canvas = new _Canvas2.default(width, height);

    var originPoint = [100, height - 10];
    var startY = 50;

    var lengthOfAxisX = width - originPoint[0];
    var offsetX = originPoint[0];

    var lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    var offsetY = startY;

    var numOfPoint = data.length;

    var splitDis = topValue / numOfPoint; //yi - y(i-1) = splitDis;  代表y两点之间的大小
    var ratioY = Math.round(lengthOfAxisY / numOfPoint); //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    var ratioX = Math.round(lengthOfAxisY / numOfPoint);

    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);

    //处理轴坐标相关
    var tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    var mapOfPointX = tempArr.map(function (item, index) {
        //x轴上的点
        return {
            pos: [ratioX * (index + 1) + offsetX, originPoint[1]],
            name: index + 1 + "\u6708"
        };
    });
    var mapOfPointY = tempArr.map(function (item, index) {
        //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - ratioY * (index + 1)], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元"
        };
    });

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = mapOfPointX[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var itemX = _step3.value;
            //画出x轴上的点，并标上文字
            canvas.point(itemX.pos, 2);

            var _itemX$pos2 = _slicedToArray(itemX.pos, 2),
                textX = _itemX$pos2[0],
                textY = _itemX$pos2[1];

            var fontSize = 10;
            textY += fontSize + 5;
            textX -= fontSize * itemX.name.length / 2;
            canvas.text([textX, textY], itemX.name, fontSize);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = mapOfPointY[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var itemY = _step4.value;
            //画出y轴上的点，并标上文字
            canvas.point(itemY.pos, 2);

            var _itemY$pos2 = _slicedToArray(itemY.pos, 2),
                textX = _itemY$pos2[0],
                textY = _itemY$pos2[1];

            var fontSize = 10;
            textY += fontSize / 2;
            textX -= fontSize * itemY.name.length;
            canvas.text([textX, textY], itemY.name, fontSize);
        }

        //画出柱状图
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    for (var index = 0; index < data.length; index++) {
        var pointX = mapOfPointX[index].pos[0];
        var pointY = data[index] / splitDis;
        var _width2 = 10;
        canvas.rect([pointX - _width2 / 2, originPoint[1] - pointY * ratioY], [pointX + _width2 / 2, originPoint[1]]);
    }
    canvas.showIn(element);
}

function drawLineGraphByCanvas(data) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var height = 300;
    var width = 400;
    // let normalColor = 'black';
    var maxValue = Math.max.apply(Math, _toConsumableArray(data));
    var topValue = ceil(maxValue);

    var canvas = new _Canvas2.default(width, height);

    var originPoint = [100, height - 10];
    var startY = 50;

    var lengthOfAxisX = width - originPoint[0];
    var offsetX = originPoint[0];

    var lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    var offsetY = startY;

    var numOfPoint = data.length;

    var splitDis = topValue / numOfPoint; //yi - y(i-1) = splitDis;  代表y两点之间的大小
    var ratioY = Math.round(lengthOfAxisY / numOfPoint); //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    var ratioX = Math.round(lengthOfAxisY / numOfPoint);

    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);

    //处理轴坐标相关
    var tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    var mapOfPointX = tempArr.map(function (item, index) {
        //x轴上的点
        return {
            pos: [ratioX * (index + 1) + offsetX, originPoint[1]],
            name: index + 1 + "\u6708"
        };
    });
    var mapOfPointY = tempArr.map(function (item, index) {
        //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - ratioY * (index + 1)], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元"
        };
    });

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = mapOfPointX[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var itemX = _step5.value;
            //画出x轴上的点，并标上文字
            canvas.point(itemX.pos, 2);

            var _itemX$pos3 = _slicedToArray(itemX.pos, 2),
                textX = _itemX$pos3[0],
                textY = _itemX$pos3[1];

            var fontSize = 10;
            textY += fontSize + 5;
            textX -= fontSize * itemX.name.length / 2;
            canvas.text([textX, textY], itemX.name, fontSize);
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = mapOfPointY[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var itemY = _step6.value;
            //画出y轴上的点，并标上文字
            canvas.point(itemY.pos, 2);

            var _itemY$pos3 = _slicedToArray(itemY.pos, 2),
                textX = _itemY$pos3[0],
                textY = _itemY$pos3[1];

            var fontSize = 10;
            textY += fontSize / 2;
            textX -= fontSize * itemY.name.length;
            canvas.text([textX, textY], itemY.name, fontSize);
        }

        //画出折线图
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    var points = [];
    for (var index = 0; index < data.length; index++) {
        var realPointX = mapOfPointX[index].pos[0]; //每一个点的X坐标
        var pointY = data[index] / splitDis; //每点对应的单位坐标，还需要进行换算
        var realPointY = originPoint[1] - pointY * ratioY;
        points.push([realPointX, realPointY]);
    }
    var lastPoint = null;
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = points[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var point = _step7.value;

            var last = points.length - 1;
            canvas.point(point, 3);
            if (lastPoint !== null) {
                //非第一个
                canvas.line(lastPoint, point);
            }

            lastPoint = point;
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    canvas.showIn(element);
}

function drawMulLineGraphByCanvas(datas) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var height = 300;
    var width = 400;
    // let normalColor = 'black';
    var maxValues = datas.map(function (data) {
        return Math.max.apply(Math, _toConsumableArray(data));
    });
    var maxValue = Math.max.apply(Math, _toConsumableArray(maxValues));
    var topValue = ceil(maxValue);

    var canvas = new _Canvas2.default(width, height);

    var originPoint = [100, height - 10];
    var startY = 50;

    var lengthOfAxisX = width - originPoint[0];
    var offsetX = originPoint[0];

    var lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    var offsetY = startY;

    var numOfPoint = datas[0].length;

    var splitDis = topValue / numOfPoint; //yi - y(i-1) = splitDis;  代表y两点之间的大小
    var ratioY = Math.round(lengthOfAxisY / numOfPoint); //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    var ratioX = Math.round(lengthOfAxisY / numOfPoint);

    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);

    //处理轴坐标相关
    var tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    var mapOfPointX = tempArr.map(function (item, index) {
        //x轴上的点
        return {
            pos: [ratioX * (index + 1) + offsetX, originPoint[1]],
            name: index + 1 + "\u6708"
        };
    });
    var mapOfPointY = tempArr.map(function (item, index) {
        //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - ratioY * (index + 1)], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元"
        };
    });

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = mapOfPointX[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var itemX = _step8.value;
            //画出x轴上的点，并标上文字
            canvas.point(itemX.pos, 2);

            var _itemX$pos4 = _slicedToArray(itemX.pos, 2),
                textX = _itemX$pos4[0],
                textY = _itemX$pos4[1];

            var fontSize = 10;
            textY += fontSize + 5;
            textX -= fontSize * itemX.name.length / 2;
            canvas.text([textX, textY], itemX.name, fontSize);
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = mapOfPointY[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var itemY = _step9.value;
            //画出y轴上的点，并标上文字
            canvas.point(itemY.pos, 2);

            var _itemY$pos4 = _slicedToArray(itemY.pos, 2),
                textX = _itemY$pos4[0],
                textY = _itemY$pos4[1];

            var fontSize = 10;
            textY += fontSize / 2;
            textX -= fontSize * itemY.name.length;
            canvas.text([textX, textY], itemY.name, fontSize);
        }

        //画出多个折线图
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }

    var lines = [];
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
        for (var _iterator10 = datas[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var lineData = _step10.value;

            var points = [];
            for (var index = 0; index < lineData.length; index++) {
                var realPointX = mapOfPointX[index].pos[0]; //每一个点的X坐标
                var pointY = lineData[index] / splitDis; //每点对应的单位坐标，还需要进行换算
                var realPointY = originPoint[1] - pointY * ratioY;
                points.push([realPointX, realPointY]);
            }
            lines.push(points);
        }
    } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
            }
        } finally {
            if (_didIteratorError10) {
                throw _iteratorError10;
            }
        }
    }

    console.log("lines", lines);

    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
        for (var _iterator11 = lines[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var line = _step11.value;

            var lastPoint = null;
            // let helpRandomInt = () => Math.floor(Math.random() * 256);
            var lineColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = line[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var point = _step12.value;

                    var last = line.length - 1;
                    canvas.point(point, 3);
                    if (lastPoint !== null) {
                        //非第一个
                        canvas.line(lastPoint, point, 2, lineColor);
                    }
                    lastPoint = point;
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
            }
        } finally {
            if (_didIteratorError11) {
                throw _iteratorError11;
            }
        }
    }

    canvas.showIn(element);
}

exports.default = {
    drawBarGraphBySvg: drawBarGraphBySvg,
    drawBarGraphByCanvas: drawBarGraphByCanvas,
    drawLineGraphByCanvas: drawLineGraphByCanvas,
    drawMulLineGraphByCanvas: drawMulLineGraphByCanvas

};


function test() {
    function e(msg) {
        throw Error(msg);
    }
    ceil(100) === 100 ? '' : e(100);
    ceil(115) === 200 ? '' : e(115);
    ceil(915) === 1000 ? '' : e(915);
}
},{"./utils/Svg":4,"./utils/Canvas":5}],2:[function(require,module,exports) {
"use strict";

var _Graphes = require("./Graphes");

var _Graphes2 = _interopRequireDefault(_Graphes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function dataOfSource() {
    var sourceData = [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }, {
        product: "手机",
        region: "华北",
        sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    }, {
        product: "手机",
        region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }, {
        product: "笔记本",
        region: "华东",
        sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    }, {
        product: "笔记本",
        region: "华北",
        sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    }, {
        product: "笔记本",
        region: "华南",
        sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    }, {
        product: "智能音箱",
        region: "华东",
        sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    }, {
        product: "智能音箱",
        region: "华北",
        sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    }, {
        product: "智能音箱",
        region: "华南",
        sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
    }];
    return sourceData;
}

function count(arr, value, key) {
    var num = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (key !== undefined) {
                item[key] === value ? num++ : '';
            } else {
                item === value ? num++ : '';
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return num;
}

function selectedOptionFrom(selectEl) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = selectEl.querySelectorAll("option")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var op = _step2.value;

            if (op.selected) {
                return op;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

function numOfcheckedOf(checkboxWrapEl) {
    var num = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = checkboxWrapEl.querySelectorAll(".item")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var cb = _step3.value;

            cb.checked ? num++ : '';
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return num;
}

function renderTable(data) {
    var html = "";
    var wtf = ["商品", "地区", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var thes = ['<tr class="title">', '</tr>'].join('<th>' + wtf.join("</th><th>") + '</th>');

    var numOfCheckedProduct = numOfcheckedOf(document.querySelector(".product-wrap"));
    var numOfCheckedRegion = numOfcheckedOf(document.querySelector('.region-wrap'));

    var tdes = "";

    var isFirst = true;
    var isTheSame = false;
    var lastItem = null;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (lastItem !== null && item.product === lastItem.product) {
                isTheSame = true;
            }

            if (numOfCheckedProduct === 1) {
                tdes += "\n            <tr>\n            " + (isFirst ? '<td rowspan=' + count(data, data[0].product, 'product') + ' >' + item.product + '</td>' : '') + "\n            <td>" + item.region + "</td>\n            " + ('<td>' + item.sale.join('</td><td>') + '</td>') + "\n            </tr>                 \n            ";
            } else if (numOfCheckedRegion === 1) {
                tdes += "\n            <tr>\n            <td>" + item.product + "</td>\n            " + (isFirst ? '<td rowspan=' + count(data, data[0].region, 'region') + ' >' + item.region + '</td>' : '') + "\n            " + ('<td>' + item.sale.join('</td><td>') + '</td>') + "\n            </tr>                 \n            ";
            } else if (numOfCheckedRegion > 1 && numOfCheckedProduct > 1) {
                tdes += "\n            <tr>\n            " + (!isTheSame ? '<td rowspan=' + count(data, item.product, 'product') + ' >' + item.product + '</td>' : '') + "\n            <td>" + item.region + "</td>\n            " + ('<td>' + item.sale.join('</td><td>') + '</td>') + "\n            </tr>                 \n            ";
                lastItem = item;
                isTheSame = false;
            }
            isFirst = false;
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    html = thes + tdes;
    document.querySelector("#table").innerHTML = html;
}

var notify = function () {
    //object is a function with closure
    var storage = {};
    return function (key, value) {
        storage[key] = value;

        var fixedData = dataOfSource();

        var _loop = function _loop(k) {
            if (storage.hasOwnProperty(k)) {
                fixedData = fixedData.filter(function (item) {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = storage[k][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var checkedValue = _step5.value;

                            if (checkedValue === item[k]) {
                                return true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    return false;
                });
            }
        };

        for (var k in storage) {
            _loop(k);
        }
        renderTable(fixedData);
    };
}();

function logicOfCheckbox(key) {
    return function (e) {
        //e => event
        var checkAll = 'all';
        var targetCheckbox = e.target;
        var checkboxWrapEl = this;
        var AllCheckboxes = checkboxWrapEl.querySelectorAll('.item');
        var checkboxAllEl = checkboxWrapEl.querySelector(".all");
        var checkedValue = [];

        if (targetCheckbox.type === 'checkbox') {
            if (targetCheckbox.dataset.value === checkAll) {
                //首先判断是否是全选按钮
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = AllCheckboxes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var cb = _step6.value;

                        // console.log(targetCheckbox.checked, document.querySelectorAll('.region-wrap .item'));
                        if (targetCheckbox.checked) {
                            //targetCheckbox = 全选checkbox
                            cb.checked = true;
                        } else {
                            cb.checked = false;
                            //至少留一个不为空，这个写法很不好，但是开始没考虑这个需求，现在不想大改代码了;
                            AllCheckboxes[0].checked = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            } else {
                var isAllChecked = true;
                var checkedboxCount = AllCheckboxes.length;
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = AllCheckboxes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var _cb = _step7.value;

                        if (_cb.checked === false) {
                            isAllChecked = false;
                            checkedboxCount--;
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                checkedboxCount === 0 ? AllCheckboxes[0].checked = true : '';
                checkboxAllEl.checked = isAllChecked;
            }
            //获得勾选的数据
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = AllCheckboxes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var _cb2 = _step8.value;

                    if (_cb2.checked === true) {
                        checkedValue.push(_cb2.parentElement.textContent.trim());
                    }
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            notify(key, checkedValue);
        }
    };
}

function main() {
    // drawBarGraphBySvg(data);
    // drawBarGraphByCanvas(data);
    // graph.drawLineGraphByCanvas(data);
    // graph.drawLineGraphByCanvas(data2);


    renderTable(dataOfSource());

    document.querySelector(".region-wrap").onchange = logicOfCheckbox('region');
    document.querySelector('.product-wrap').onchange = logicOfCheckbox('product');

    var current = [null];
    document.querySelector("#table").onmouseover = function (e) {
        // console.log(e, e.target, e.target.parentElement);
        var NOT_EXIST = -1;
        var targetRow = e.target.parentElement.nodeName === 'TR' ? e.target.parentElement : -1;
        if (!(targetRow === NOT_EXIST) && !targetRow.classList.contains("title")) {
            console.log("t");
            var tdesNodelist = targetRow.querySelectorAll("td");
            var tdes = new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(tdesNodelist))))().slice(-12);
            var data = [];
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = tdes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var td = _step9.value;

                    data.push(td.textContent);
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            var isTheRowChanged = false;
            for (var i = 0; i < data.length; i++) {
                if (current[i] !== data[i]) {
                    // current第一次为空数组 js数组越界访问不出错 我图一时轻松而已 不要学习
                    isTheRowChanged = true;
                    break;
                }
            }
            current = data;

            if (isTheRowChanged) {
                _Graphes2.default.drawBarGraphBySvg(data, document.querySelector(".left"));
                _Graphes2.default.drawLineGraphByCanvas(data, document.querySelector(".right"));
                _Graphes2.default.drawLineGraphByCanvas(data, document.querySelector(".mul-line-graph"));
                isTheRowChanged = false;
            } else {
                //暂时放在这里处理数据了
                console.log("not change");
            }
        } else {
            //非数据区域
            var datas = [];
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = dataOfSource()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var item = _step10.value;

                    datas.push(item.sale);
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            _Graphes2.default.drawMulLineGraphByCanvas(datas, document.querySelector(".mul-line-graph"));
        }
    };

    document.querySelector("#table").onmouseout = function (e) {
        // console.log(e, e.target, e.target.parentElement);
        var NOT_EXIST = -1;
        var targetRow = e.target.parentElement.nodeName === 'TR' ? e.target.parentElement : -1;
        if (!(targetRow === NOT_EXIST) && !targetRow.classList.contains("title")) {
            //在行中 不操作
        } else {
            //出行了, 暂时把数据放在这里处理了
            var datas = [];
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = dataOfSource()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var item = _step11.value;

                    datas.push(item.sale);
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            _Graphes2.default.drawMulLineGraphByCanvas(datas, document.querySelector(".mul-line-graph"));
        }
    };
}

main();
},{"./Graphes":3}],11:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57163' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[11,2])
//# sourceMappingURL=/main.7cb4fbe0.map