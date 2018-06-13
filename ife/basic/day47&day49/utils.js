"use strict";
exports.__esModule = true;
function sleep(time) {
    if (time > 0) {
        var timeA = new Date().getTime();
        while (true) {
            var timeB = new Date().getTime();
            if ((timeB - timeA) >= time) {
                break;
            }
        }
        console.log('已经过去' + time + 'ms');
    }
}
exports["default"] = {
    sleep: sleep,
    randomBetween: function (a, b) {
        var _a = [Math.max(a, b), Math.min(a, b)], max = _a[0], min = _a[1];
        var result = min + ((max - min) * Math.random());
        return Math.round(result);
    }
};
