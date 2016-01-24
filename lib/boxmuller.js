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