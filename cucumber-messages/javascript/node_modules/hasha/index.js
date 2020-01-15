'use strict';
const fs = require('fs');
const crypto = require('crypto');
const isStream = require('is-stream');

const hasha = (input, opts) => {
	opts = opts || {};

	let outputEncoding = opts.encoding || 'hex';

	if (outputEncoding === 'buffer') {
		outputEncoding = undefined;
	}

	const hash = crypto.createHash(opts.algorithm || 'sha512');

	const update = buf => {
		const inputEncoding = typeof buf === 'string' ? 'utf8' : undefined;
		hash.update(buf, inputEncoding);
	};

	if (Array.isArray(input)) {
		input.forEach(update);
	} else {
		update(input);
	}

	return hash.digest(outputEncoding);
};

hasha.stream = opts => {
	opts = opts || {};

	let outputEncoding = opts.encoding || 'hex';

	if (outputEncoding === 'buffer') {
		outputEncoding = undefined;
	}

	const stream = crypto.createHash(opts.algorithm || 'sha512');
	stream.setEncoding(outputEncoding);
	return stream;
};

hasha.fromStream = (stream, opts) => {
	if (!isStream(stream)) {
		return Promise.reject(new TypeError('Expected a stream'));
	}

	opts = opts || {};

	return new Promise((resolve, reject) => {
		stream
			.on('error', reject)
			.pipe(hasha.stream(opts))
			.on('error', reject)
			.on('finish', function () {
				resolve(this.read());
			});
	});
};

hasha.fromFile = (fp, opts) => hasha.fromStream(fs.createReadStream(fp), opts);

hasha.fromFileSync = (fp, opts) => hasha(fs.readFileSync(fp), opts);

module.exports = hasha;
