'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binom = require('./binom');

var _binom2 = _interopRequireDefault(_binom);

var _boxmuller = require('./boxmuller');

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