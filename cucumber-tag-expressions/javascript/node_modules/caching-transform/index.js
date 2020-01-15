'use strict';
const fs = require('fs');
const path = require('path');
const hasha = require('hasha');
const makeDir = require('make-dir');
const writeFileAtomic = require('write-file-atomic');
const packageHash = require('package-hash');

let ownHash = '';
function getOwnHash() {
	ownHash = packageHash.sync(path.join(__dirname, 'package.json'));
	return ownHash;
}

function wrap(opts) {
	if (!(opts.factory || opts.transform) || (opts.factory && opts.transform)) {
		throw new Error('Specify factory or transform but not both');
	}

	if (typeof opts.cacheDir !== 'string' && !opts.disableCache) {
		throw new Error('cacheDir must be a string');
	}

	let transformFn = opts.transform;
	const {factory, cacheDir, shouldTransform, disableCache, hashData, onHash} = opts;
	const cacheDirCreated = opts.createCacheDir === false;
	let created = transformFn && cacheDirCreated;
	const ext = opts.ext || '';
	const salt = opts.salt || '';
	const encoding = opts.encoding === 'buffer' ? undefined : opts.encoding || 'utf8';

	function transform(input, metadata, hash) {
		if (!created) {
			if (!cacheDirCreated && !disableCache) {
				makeDir.sync(cacheDir);
			}

			if (!transformFn) {
				transformFn = factory(cacheDir);
			}

			created = true;
		}

		return transformFn(input, metadata, hash);
	}

	return function (input, metadata) {
		if (shouldTransform && !shouldTransform(input, metadata)) {
			return input;
		}

		if (disableCache) {
			return transform(input, metadata);
		}

		let data = [ownHash || getOwnHash(), input];

		if (salt) {
			data.push(salt);
		}

		if (hashData) {
			data = data.concat(hashData(input, metadata));
		}

		const hash = hasha(data, {algorithm: 'sha256'});
		const cachedPath = path.join(cacheDir, hash + ext);

		if (onHash) {
			onHash(input, metadata, hash);
		}

		try {
			return fs.readFileSync(cachedPath, encoding);
		} catch (error) {
			const result = transform(input, metadata, hash);
			writeFileAtomic.sync(cachedPath, result, {encoding});
			return result;
		}
	};
}

module.exports = wrap;
