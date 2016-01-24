import binom from './binom';
import boxMuller from './boxmuller';

let Rands = class {

	constructor(rng) {
		if (rng === undefined) {
			this.rng = Math.random;
		} else {
			this.rng = rng;
		}
	}

	bernoulli(p, length) {
		let f = () => (this.rng() <= p) ? 1 : 0;
		return generate(f, length);
	}

	binomial(n, p, length) {
		var f = () => binom(n, p, this.rng);
		return generate(f, length);
	}

	exponential(lambda, length) {
		let f = () => -Math.log(1 - this.rng()) / lambda;
		return generate(f, length);
	}

	integer(min, max, length) {
		let f = () => Math.floor(this.rng() * (max - min + 1)) + min;
		return generate(f, length);
	}

	normal(mean = 0, stdev = 1, length) {
		if (typeof length === 'undefined') {
			let normVec = boxMuller(mean, stdev, 1, this.rng);
			return normVec[0];
		}
		return boxMuller(mean, stdev, length, this.rng);
	}

	poisson(lambda, length) {
		let f = () => {
			const L = Math.exp(-lambda);
			let k = 0;
			let p = 1;
			do {
				k += 1;
				let u = this.rng();
				p *= u;
			} while (p > L);
			return k - 1;
		};
		return generate(f, length);
	}

	rayleigh(lambda, length) {
		let f = () => lambda * Math.sqrt(-2 * Math.log(this.rng()));
		return generate(f, length);
	}

	uniform(min = 0, max = 1, length) {
		let f = () => (max - min) * this.rng() + min;
		return generate(f, length);
	}

	static mean(a) {
		// Assumes a is a number or an array of numbers.
		if (!Array.isArray(a)) {
			return a;
		}
		if (a.length === 0) {
			return NaN;
		}
		let sum = 0;
		for (let k = 0; k < a.length; k++) {
			sum += a[k];
		}
		return sum / a.length;
	}

	static variance(a) {
		const aLen = a.length;
		if (aLen === 1 || aLen === undefined) {
			return 0;
		}
		const u = this.mean(a);
		let sum = 0;
		for (let k = 0; k < aLen; k++) {
			sum += a[k] * a[k];
		}
		return sum / aLen - u * u;
	}
};

function generate(f, length) {
	if (typeof length === 'undefined') {
		return f();
	}
	let a = [];
	for (var k = 0; k < length; k++) {
		a.push(f());
	}
	return a;
}

module.exports = Rands;
