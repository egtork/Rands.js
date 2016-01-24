function binom(nn, pp, rng) {
	
	let c, fm, npq, p1, p2, p3, p4, qn;
	let xl, xll, xlr, xm, xr;
	let psave = -1;
	let nsave = -1;
	let m;
	let f, f1, f2, u, v, w, w2, x, x1, x2, z, z2;
	let p, q, np, g, r, al, alv, amaxp, ffm, ynorm;
	let i, ix, k, n;

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
					f *= (g / i - r);
				}
			} else if (m !== ix) {
				for (i = ix + 1; i <= m; i++) {
					f /= (g / i - r);
				}
			}
			if (v <= f) {
				return binomFin(psave, ix, n);
			}
		} else {
			amaxp = (k / npq) * ((k * (k / 3 + 0.625) + 0.1666666666666666) / npq + 0.5);
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
				if (alv <= xm * Math.log(f1 / x1) + (n - m + 0.5) * Math.log(z / w) +
				(ix - m) * Math.log(w * p / (x1 * q)) + (13860.0 - (462.0 - (132.0 -
          (99.0 - 140.0 / f2) / f2) / f2) / f2) / f1 / 166320.0 + (13860.0 -
							(462.0 - (132.0 - (99.0 - 140.0 / z2) / z2) / z2) / z2) / z /
              166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / x2) /
								x2) / x2) / x2) / x1 / 166320.0 + (13860.0 - (462.0 - (132.0 -
                  (99.0 - 140.0 / w2) / w2) / w2) / w2) / w / 166320) {
					return binomFin(psave, ix, n);
				}
			}
		}
	}
}

function binomNpSmall(qn, g, r, psave, n, rng) {
	for (;;) {
		let ix = 0;
		let f = qn;
		let u = rng();
		for (;;) {
			if (u < f) {
				return binomFin(psave, ix, n);
			}
			if (ix > 110) {
				break;
			}
			u -= f;
			ix++;
			f *= (g / ix - r);
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
	let pow = 1.0;
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

export default binom;
