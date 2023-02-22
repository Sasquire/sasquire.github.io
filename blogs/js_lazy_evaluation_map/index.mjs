function* lazy_map (func) {
	for (const element of this) {
		yield func(element)
	}
}

function* lazy_filter (func) {
	for (const element of this) {
		if(func(element)){
			yield element;
		}
	}
}

function collect () {
	const arr = [];
	for (const element of this){
		arr.push(element);
	}
	return arr;
}

function random_from () {
	const index = Math.floor(this.length * Math.random());
	return this[index];
}

Object.entries({ lazy_map, lazy_filter, collect, random_from })
	.forEach(([key, value]) => {
		Array.prototype[key] = value;
		Object.getPrototypeOf(function*(){}).prototype[key] = value;
	});

const maps = [
	x => x + 1,
	x => -1 * x,
	x => 2 * x,
	x => x / 2,
	x => x * x,
	x => 10 * Math.cos(x),
	x => 10 * Math.abs(Math.sin(x)),
	x => x / 3,
	x => Math.floor(x),
	x => parseInt((x.toString().split('.').slice(1)[0] || '').substring(0, 3), 10) || 0
];

const filters = [
	x => x !== 0,
	x => (x % 2) === 0,
	x => (x % 3) === 0,
	x => (x % 3) === 1,
	x => Math.abs(x) === x,
	x => Math.floor(x) === x,
	x => x <= 0,
	x => x.toString() === x.toString().split('').reverse().join('') 
];

function random_number () {
	const rand = () => Math.floor(100 * (Math.random() - 0.5));
	const numerator = rand() + rand(); 
	const denominator = rand() + rand();

	return denominator !== 0 ? (numerator / denominator) : 0 
}

function random_operation () {
	const min_length = 2;
	const max_length = 7;
	const random_length = min_length + Math.floor((max_length - min_length + 1) * Math.random());
	const random_selection = Math.floor(Math.pow(2, random_length) * Math.random());
	const signature = random_selection
		.toString(2)
		.padStart(random_length, '0');
	const random_pattern = signature
		.split('')
		.map(e => e === '0'
			? ['map', maps.random_from()]
			: ['filter', filters.random_from()])

	return { random_pattern, signature };
}

function perform_test (size) {
	const { random_pattern, signature } = random_operation();
	const values = new Array(size)
		.fill(0)
		.map(e => random_number());

	// Time the lazy_* functions
	const lazy_start = performance.now();
	let a = values;
	for (const [type, func] of random_pattern) {
		a = (type === 'map')
			? a.lazy_map(func)
			: a.lazy_filter(func);
	}
	a = a.collect()
	const lazy_end = performance.now();

	// Time the regular functions
	const regular_start = performance.now();
	let b = values;
	for (const [type, func] of random_pattern) {
		b = (type === 'map')
			? b.map(func)
			: b.filter(func);
	}
	const regular_end = performance.now();

	// Verify arrays are the same
	const panic_string = 'Functions didn\'t perform the same!';
	if (a.length !== b.length) {
		throw new Error(panic_string)
	}
	for (let i = 0; i < a.length; a++) {
		if (a[i] !== b[i]) {
			throw new Error(panic_string)
		}
	}

	return {
		lazy: lazy_end - lazy_start,
		regular: regular_end - regular_start,
		signature 
	}
}

const num_tests = 10000;

const all_test_totals = [];
for (let i = 0; i < num_tests; i++) {
	const size = 10000 * (1 + Math.floor(20 * Math.random()));
	const results = perform_test(size);
	results.size = size;
	all_test_totals.push(results);
	
	if (i % 100 === 0) {
		console.log(`Completed test ${i}`);
	}
}
console.log();

const different_sizes = Array.from(new Set(all_test_totals.map(e => e.size)))
	.sort((a, b) => a - b);
for (const size of different_sizes) {
	const items = all_test_totals.filter(e => e.size === size);

	const final = items
		.reduce((acc, e) => {
			acc.lazy = acc.lazy + e.lazy;
			acc.regular = acc.regular + e.regular;
			return acc;
		}, {lazy: 0, regular: 0});

	const round = x => Math.floor(x * 10000) / 10000;

	console.log(`Statistics for size of ${size} (n = ${items.length})`);
	console.log(`Final lazy average of ${round(final.lazy / items.length)}`)
	console.log(`Final regular average of ${round(final.regular / items.length)}`)
	console.log('');
}
