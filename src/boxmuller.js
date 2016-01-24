function boxmuller(mean, stdev, n, rng) {
	let a = [];
	if (n > 0) {
		for (let k = 0; k < n / 2; k++) {
			const u1 = rng();
			const u2 = rng();
			const R = Math.sqrt(-2 * Math.log(u1));
			const theta = 2 * Math.PI * u2;
			a.push(mean + stdev * R * Math.cos(theta));
			a.push(mean + stdev * R * Math.sin(theta));
		}
		if (n % 2 === 1) {
			const u1 = rng();
			const u2 = rng();
			const R = Math.sqrt(-2 * Math.log(u1));
			const theta = 2 * Math.PI * u2;
			a.push(mean + stdev * R * Math.cos(theta));
		}
	}
	return a;
}

export default boxmuller;
