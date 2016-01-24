/*eslint-env mocha */

var assert = require('chai').assert;
var Rands = require('../lib/rands');

var r = new Rands();

var arrayLen = 100;

// Some basic tests of bounds and membership for each rv type. These are not
// not sufficient to ensure methods are working correctly.
var methodTests = [
	{
		method: 'bernoulli',
		args: [0.5],
		gte: 0,
		lte: 1,
		inSet: [0, 1]
	},
	{
		method: 'binomial',
		args: [10, 0.5],
		inSet: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	},
	{
		method: 'exponential',
		args: [1.5],
		gte: 0
	},
	{
		method: 'integer',
		args: [-5, 5],
		inSet: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
	},
	{
		method: 'normal',
		args: [-1, 2],
		lte: Infinity,
		gte: -Infinity
	},
	{
		method: 'poisson',
		args: [2],
		gte: 0,
		custom: {
			test: Number.isInteger,
			err: 'is integer'
		}
	},
	{
		method: 'rayleigh',
		args: [1],
		gte: 0,
		lt: Infinity
	},
	{
		method: 'uniform',
		args: [0, 1],
		gte: 0,
		lt: 1
	}
];

var supportTests = function (T) {
	return function (v) {
		if (T.hasOwnProperty('gte')) {
			assert(v >= T.gte, 'is greater than or equal to ' + T.gte);
		}
		if (T.hasOwnProperty('lte')) {
			assert(v <= T.lte, 'is less than or equal to ' + T.lte);
		}
		if (T.hasOwnProperty('gt')) {
			assert(v > T.gt, 'is greater than ' + T.gt);
		}
		if (T.hasOwnProperty('lt')) {
			assert(v < T.lt, 'is less than ' + T.lt);
		}
		if (T.hasOwnProperty('inSet')) {
			assert.include(T.inSet, v, 'is in set ' + T.inSet);
		}
		if (T.hasOwnProperty('custom')) {
			assert(T.custom.test(v), T.custom.err);
		}
	};
};

describe('Rands', function() {

	methodTests.forEach(function(T) {

		describe(T.method, function() {
			it('should return a single number satisfying constraints', function () {
				var rv = r[T.method].apply(r, T.args);
				assert.isNumber(rv, 'is a number');
				(supportTests(T))(rv);
			});
		});

		describe(T.method, function() {
			it('should return an array of numbers satisfying constraints', function () {
				T.args.push(arrayLen);
				var rvs = r[T.method].apply(r, T.args);
				assert.isArray(rvs, 'is an array');
				assert.lengthOf(rvs, arrayLen, 'is an array of length ' + arrayLen);
				rvs.forEach(supportTests(T));
			});
		});

	});

});
