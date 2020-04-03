"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function generators() {
    /* generator-demo */
    {
        var x_1 = function (x) {
            return Promise.resolve(x);
        };
        function y(y) {
            return y;
        }
        function test() {
            var xx, yy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, x_1];
                    case 1:
                        xx = _a.sent();
                        console.log(xx);
                        return [4 /*yield*/, y];
                    case 2:
                        yy = _a.sent();
                        console.log(yy);
                        return [2 /*return*/];
                }
            });
        }
        /*  const data = test();
        data.next();
        data.next(2);
        data.next(5); */
    }
    /**
     *
     * generator 源码
     *
     */
    function asyncGenerator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var i = 0;
        var provide = undefined;
        return {
            next: function () {
                if (provide instanceof Promise) {
                    provide = provide.then(args[i++]);
                }
                else {
                    provide = args[i++](provide);
                }
            }
        };
    }
    var response = asyncGenerator(function test1() {
        return Promise.resolve(2);
    }, function test2(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(data * 2);
            }, 1000);
        });
    }, function test3(data) {
        debugger;
    });
    response.next();
    response.next();
    response.next();
}
exports.generator = generators;
//# sourceMappingURL=generator.js.map