/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Rands"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _binom = __webpack_require__(2);

	var _binom2 = _interopRequireDefault(_binom);

	var _boxmuller = __webpack_require__(3);

	var _boxmuller2 = _interopRequireDefault(_boxmuller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rands = function () {
		function Rands(rng) {
			_classCallCheck(this, Rands);

			if (rng === undefined) {
				this.rng = Math.random;
			} else {
				this.rng = rng;
			}
		}

		_createClass(Rands, [{
			key: 'bernoulli',
			value: function bernoulli(p, length) {
				var _this = this;

				var f = function f() {
					return _this.rng() <= p ? 1 : 0;
				};
				return generate(f, length);
			}
		}, {
			key: 'binomial',
			value: function binomial(n, p, length) {
				var _this2 = this;

				var f = function f() {
					return (0, _binom2.default)(n, p, _this2.rng);
				};
				return generate(f, length);
			}
		}, {
			key: 'exponential',
			value: function exponential(lambda, length) {
				var _this3 = this;

				var f = function f() {
					return -Math.log(1 - _this3.rng()) / lambda;
				};
				return generate(f, length);
			}
		}, {
			key: 'integer',
			value: function integer(min, max, length) {
				var _this4 = this;

				var f = function f() {
					return Math.floor(_this4.rng() * (max - min + 1)) + min;
				};
				return generate(f, length);
			}
		}, {
			key: 'normal',
			value: function normal() {
				var mean = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
				var stdev = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
				var length = arguments[2];

				if (typeof length === 'undefined') {
					var normVec = (0, _boxmuller2.default)(mean, stdev, 1, this.rng);
					return normVec[0];
				}
				return (0, _boxmuller2.default)(mean, stdev, length, this.rng);
			}
		}, {
			key: 'poisson',
			value: function poisson(lambda, length) {
				var _this5 = this;

				var f = function f() {
					var L = Math.exp(-lambda);
					var k = 0;
					var p = 1;
					do {
						k += 1;
						var u = _this5.rng();
						p *= u;
					} while (p > L);
					return k - 1;
				};
				return generate(f, length);
			}
		}, {
			key: 'rayleigh',
			value: function rayleigh(lambda, length) {
				var _this6 = this;

				var f = function f() {
					return lambda * Math.sqrt(-2 * Math.log(_this6.rng()));
				};
				return generate(f, length);
			}
		}, {
			key: 'uniform',
			value: function uniform() {
				var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

				var _this7 = this;

				var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
				var length = arguments[2];

				var f = function f() {
					return (max - min) * _this7.rng() + min;
				};
				return generate(f, length);
			}
		}], [{
			key: 'mean',
			value: function mean(a) {
				// Assumes a is a number or an array of numbers.
				if (!Array.isArray(a)) {
					return a;
				}
				if (a.length === 0) {
					return NaN;
				}
				var sum = 0;
				for (var k = 0; k < a.length; k++) {
					sum += a[k];
				}
				return sum / a.length;
			}
		}, {
			key: 'variance',
			value: function variance(a) {
				var aLen = a.length;
				if (aLen === 1 || aLen === undefined) {
					return 0;
				}
				var u = this.mean(a);
				var sum = 0;
				for (var k = 0; k < aLen; k++) {
					sum += a[k] * a[k];
				}
				return sum / aLen - u * u;
			}
		}]);

		return Rands;
	}();

	function generate(f, length) {
		if (typeof length === 'undefined') {
			return f();
		}
		var a = [];
		for (var k = 0; k < length; k++) {
			a.push(f());
		}
		return a;
	}

	module.exports = Rands;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function binom(nn, pp, rng) {

		var c = undefined,
		    fm = undefined,
		    npq = undefined,
		    p1 = undefined,
		    p2 = undefined,
		    p3 = undefined,
		    p4 = undefined,
		    qn = undefined;
		var xl = undefined,
		    xll = undefined,
		    xlr = undefined,
		    xm = undefined,
		    xr = undefined;
		var psave = -1;
		var nsave = -1;
		var m = undefined;
		var f = undefined,
		    f1 = undefined,
		    f2 = undefined,
		    u = undefined,
		    v = undefined,
		    w = undefined,
		    w2 = undefined,
		    x = undefined,
		    x1 = undefined,
		    x2 = undefined,
		    z = undefined,
		    z2 = undefined;
		var p = undefined,
		    q = undefined,
		    np = undefined,
		    g = undefined,
		    r = undefined,
		    al = undefined,
		    alv = undefined,
		    amaxp = undefined,
		    ffm = undefined,
		    ynorm = undefined;
		var i = undefined,
		    ix = undefined,
		    k = undefined,
		    n = undefined;

		r = Math.round(nn);

		if (r < 0 || pp < 0 || pp > 1) {
			throw new Error('Invalid input.');
		}

		if (r === 0 || pp === 0) {
			return 0;
		}
		if (pp === 1) {
			return r;
		}

		n = r;
		p = Math.min(pp, 1 - pp);
		q = 1 - p;
		np = n * p;
		r = p / q;
		g = r * (n + 1);

		if (pp !== psave || n !== nsave) {
			psave = pp;
			nsave = n;
			if (np < 30.0) {
				qn = pow(q, n);
				return binomNpSmall(qn, g, r, psave, n, rng);
			}
			ffm = np + p;
			m = Math.floor(ffm);
			fm = m;
			npq = np * q;
			p1 = Math.floor(2.195 * Math.sqrt(npq) - 4.6 * q) + 0.5;
			xm = fm + 0.5;
			xl = xm - p1;
			xr = xm + p1;
			c = 0.134 + 20.5 / (15.3 + fm);
			al = (ffm - xl) / (ffm - xl * p);
			xll = al * (1 + 0.5 * al);
			al = (xr - ffm) / (xr * q);
			xlr = al * (1.0 + 0.5 * al);
			p2 = p1 * (1.0 + c + c);
			p3 = p2 + c / xll;
			p4 = p3 + c / xlr;
		} else if (n === nsave) {
			if (np < 30.0) {
				return binomNpSmall(qn, g, r, psave, n);
			}
		}

		for (;;) {
			u = rng() * p4;
			v = rng();
			if (u <= p1) {
				ix = Math.floor(xm - p1 * v + u);
				return binomFin(psave, ix, n);
			}
			if (u <= p2) {
				x = xl + (u - p1) / c;
				v = v * c + 1 - Math.abs(xm - x) / p1;
				if (v > 1 || v <= 0) {
					continue;
				}
				ix = Math.floor(x);
			} else if (u > p3) {
				ix = Math.floor(xr - Math.log(v) / xlr);
				if (ix > n) {
					continue;
				}
				v = v * (u - p3) * xlr;
			} else {
				ix = Math.floor(xl + Math.log(v) / xll);
				if (ix < 0) {
					continue;
				}
				v = v * (u - p2) * xll;
			}

			k = Math.abs(ix - m);
			if (k <= 20 || k >= npq / 2 - 1) {
				f = 1.0;
				if (m < ix) {
					for (i = m + 1; i <= ix; i++) {
						f *= g / i - r;
					}
				} else if (m !== ix) {
					for (i = ix + 1; i <= m; i++) {
						f /= g / i - r;
					}
				}
				if (v <= f) {
					return binomFin(psave, ix, n);
				}
			} else {
				amaxp = k / npq * ((k * (k / 3 + 0.625) + 0.1666666666666666) / npq + 0.5);
				ynorm = -k * k / (2 * npq);
				alv = Math.log(v);
				if (alv < ynorm - amaxp) {
					return binomFin(psave, ix, n);
				}
				if (alv <= ynorm + amaxp) {
					x1 = ix + 1;
					f1 = fm + 1;
					z = n + 1 - fm;
					w = n - ix + 1;
					z2 = z * z;
					x2 = x1 * x1;
					f2 = f1 * f1;
					w2 = w * w;
					if (alv <= xm * Math.log(f1 / x1) + (n - m + 0.5) * Math.log(z / w) + (ix - m) * Math.log(w * p / (x1 * q)) + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / f2) / f2) / f2) / f2) / f1 / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / z2) / z2) / z2) / z2) / z / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / x2) / x2) / x2) / x2) / x1 / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / w2) / w2) / w2) / w2) / w / 166320) {
						return binomFin(psave, ix, n);
					}
				}
			}
		}
	}

	function binomNpSmall(qn, g, r, psave, n, rng) {
		for (;;) {
			var ix = 0;
			var f = qn;
			var u = rng();
			for (;;) {
				if (u < f) {
					return binomFin(psave, ix, n);
				}
				if (ix > 110) {
					break;
				}
				u -= f;
				ix++;
				f *= g / ix - r;
			}
		}
	}

	function binomFin(psave, ix, n) {
		if (psave > 0.5) {
			ix = n - ix;
		}
		return ix;
	}

	function pow(x, n) {
		var pow = 1.0;
		if (n !== 0) {
			if (n < 0) {
				n = -n;
				x = 1 / x;
			}
			for (;;) {
				if (n & '01') {
					pow *= x;
				}
				n >>= 1;
				if (n) {
					x *= x;
				} else {
					break;
				}
			}
		}
		return pow;
	}

	exports.default = binom;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function boxmuller(mean, stdev, n, rng) {
		var a = [];
		if (n > 0) {
			for (var k = 0; k < n / 2; k++) {
				var u1 = rng();
				var u2 = rng();
				var R = Math.sqrt(-2 * Math.log(u1));
				var theta = 2 * Math.PI * u2;
				a.push(mean + stdev * R * Math.cos(theta));
				a.push(mean + stdev * R * Math.sin(theta));
			}
			if (n % 2 === 1) {
				var u1 = rng();
				var u2 = rng();
				var R = Math.sqrt(-2 * Math.log(u1));
				var theta = 2 * Math.PI * u2;
				a.push(mean + stdev * R * Math.cos(theta));
			}
		}
		return a;
	}

	exports.default = boxmuller;

/***/ }
/******/ ]);