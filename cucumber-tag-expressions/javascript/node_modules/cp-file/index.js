'use strict';
const path = require('path');
const {constants: fsConstants} = require('fs');
const {Buffer} = require('safe-buffer');
const CpFileError = require('./cp-file-error');
const fs = require('./fs');
const ProgressEmitter = require('./progress-emitter');

const cpFile = (source, destination, options) => {
	if (!source || !destination) {
		return Promise.reject(new CpFileError('`source` and `destination` required'));
	}

	options = Object.assign({overwrite: true}, options);

	const progressEmitter = new ProgressEmitter(path.resolve(source), path.resolve(destination));

	const promise = fs
		.stat(source)
		.then(stat => {
			progressEmitter.size = stat.size;
		})
		.then(() => fs.createReadStream(source))
		.then(read => fs.makeDir(path.dirname(destination)).then(() => read))
		.then(read => new Promise((resolve, reject) => {
			const write = fs.createWriteStream(destination, {flags: options.overwrite ? 'w' : 'wx'});

			read.on('data', () => {
				progressEmitter.written = write.bytesWritten;
			});

			write.on('error', error => {
				if (!options.overwrite && error.code === 'EEXIST') {
					resolve(false);
					return;
				}

				reject(new CpFileError(`Cannot write to \`${destination}\`: ${error.message}`, error));
			});

			write.on('close', () => {
				progressEmitter.written = progressEmitter.size;
				resolve(true);
			});

			read.pipe(write);
		}))
		.then(updateStats => {
			if (updateStats) {
				return fs.lstat(source).then(stats => Promise.all([
					fs.utimes(destination, stats.atime, stats.mtime),
					fs.chmod(destination, stats.mode),
					fs.chown(destination, stats.uid, stats.gid)
				]));
			}
		});

	promise.on = (...args) => {
		progressEmitter.on(...args);
		return promise;
	};

	return promise;
};

module.exports = cpFile;
// TODO: Remove this for the next major release
module.exports.default = cpFile;

const checkSourceIsFile = (stat, source) => {
	if (stat.isDirectory()) {
		throw Object.assign(new CpFileError(`EISDIR: illegal operation on a directory '${source}'`), {
			errno: -21,
			code: 'EISDIR',
			source
		});
	}
};

const fixupAttributes = (destination, stat) => {
	fs.chmodSync(destination, stat.mode);
	fs.chownSync(destination, stat.uid, stat.gid);
};

const copySyncNative = (source, destination, options) => {
	const stat = fs.statSync(source);
	checkSourceIsFile(stat, source);
	fs.makeDirSync(path.dirname(destination));

	const flags = options.overwrite ? null : fsConstants.COPYFILE_EXCL;
	try {
		fs.copyFileSync(source, destination, flags);
	} catch (error) {
		if (!options.overwrite && error.code === 'EEXIST') {
			return;
		}

		throw error;
	}

	fs.utimesSync(destination, stat.atime, stat.mtime);
	fixupAttributes(destination, stat);
};

const copySyncFallback = (source, destination, options) => {
	let bytesRead;
	let position;
	let read; // eslint-disable-line prefer-const
	let write;
	const BUF_LENGTH = 100 * 1024;
	const buffer = Buffer.alloc(BUF_LENGTH);
	const readSync = position => fs.readSync(read, buffer, 0, BUF_LENGTH, position, source);
	const writeSync = () => fs.writeSync(write, buffer, 0, bytesRead, undefined, destination);

	read = fs.openSync(source, 'r');
	bytesRead = readSync(0);
	position = bytesRead;
	fs.makeDirSync(path.dirname(destination));

	try {
		write = fs.openSync(destination, options.overwrite ? 'w' : 'wx');
	} catch (error) {
		if (!options.overwrite && error.code === 'EEXIST') {
			return;
		}

		throw error;
	}

	writeSync();

	while (bytesRead === BUF_LENGTH) {
		bytesRead = readSync(position);
		writeSync();
		position += bytesRead;
	}

	const stat = fs.fstatSync(read, source);
	fs.futimesSync(write, stat.atime, stat.mtime, destination);
	fs.closeSync(read);
	fs.closeSync(write);
	fixupAttributes(destination, stat);
};

module.exports.sync = (source, destination, options) => {
	if (!source || !destination) {
		throw new CpFileError('`source` and `destination` required');
	}

	options = Object.assign({overwrite: true}, options);

	if (fs.copyFileSync) {
		copySyncNative(source, destination, options);
	} else {
		copySyncFallback(source, destination, options);
	}
};
