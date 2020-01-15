'use strict';
const fs = require('graceful-fs');
const makeDir = require('make-dir');
const pify = require('pify');
const CpFileError = require('./cp-file-error');

const fsP = pify(fs);

exports.closeSync = fs.closeSync.bind(fs);
exports.createWriteStream = fs.createWriteStream.bind(fs);

exports.createReadStream = (path, options) => new Promise((resolve, reject) => {
	const read = fs.createReadStream(path, options);

	read.once('error', error => {
		reject(new CpFileError(`Cannot read from \`${path}\`: ${error.message}`, error));
	});

	read.once('readable', () => {
		resolve(read);
	});

	read.once('end', () => {
		resolve(read);
	});
});

exports.stat = path => fsP.stat(path).catch(error => {
	throw new CpFileError(`Cannot stat path \`${path}\`: ${error.message}`, error);
});

exports.lstat = path => fsP.lstat(path).catch(error => {
	throw new CpFileError(`lstat \`${path}\` failed: ${error.message}`, error);
});

exports.utimes = (path, atime, mtime) => fsP.utimes(path, atime, mtime).catch(error => {
	throw new CpFileError(`utimes \`${path}\` failed: ${error.message}`, error);
});

exports.chmod = (path, mode) => fsP.chmod(path, mode).catch(error => {
	throw new CpFileError(`chmod \`${path}\` failed: ${error.message}`, error);
});

exports.chown = (path, uid, gid) => fsP.chown(path, uid, gid).catch(error => {
	throw new CpFileError(`chown \`${path}\` failed: ${error.message}`, error);
});

exports.openSync = (path, flags, mode) => {
	try {
		return fs.openSync(path, flags, mode);
	} catch (error) {
		if (flags.includes('w')) {
			throw new CpFileError(`Cannot write to \`${path}\`: ${error.message}`, error);
		}

		throw new CpFileError(`Cannot open \`${path}\`: ${error.message}`, error);
	}
};

// eslint-disable-next-line max-params
exports.readSync = (fileDescriptor, buffer, offset, length, position, path) => {
	try {
		return fs.readSync(fileDescriptor, buffer, offset, length, position);
	} catch (error) {
		throw new CpFileError(`Cannot read from \`${path}\`: ${error.message}`, error);
	}
};

// eslint-disable-next-line max-params
exports.writeSync = (fileDescriptor, buffer, offset, length, position, path) => {
	try {
		return fs.writeSync(fileDescriptor, buffer, offset, length, position);
	} catch (error) {
		throw new CpFileError(`Cannot write to \`${path}\`: ${error.message}`, error);
	}
};

exports.statSync = path => {
	try {
		return fs.statSync(path);
	} catch (error) {
		throw new CpFileError(`stat \`${path}\` failed: ${error.message}`, error);
	}
};

exports.fstatSync = (fileDescriptor, path) => {
	try {
		return fs.fstatSync(fileDescriptor);
	} catch (error) {
		throw new CpFileError(`fstat \`${path}\` failed: ${error.message}`, error);
	}
};

exports.futimesSync = (fileDescriptor, atime, mtime, path) => {
	try {
		return fs.futimesSync(fileDescriptor, atime, mtime, path);
	} catch (error) {
		throw new CpFileError(`futimes \`${path}\` failed: ${error.message}`, error);
	}
};

exports.utimesSync = (path, atime, mtime) => {
	try {
		return fs.utimesSync(path, atime, mtime);
	} catch (error) {
		throw new CpFileError(`utimes \`${path}\` failed: ${error.message}`, error);
	}
};

exports.chmodSync = (path, mode) => {
	try {
		return fs.chmodSync(path, mode);
	} catch (error) {
		throw new CpFileError(`chmod \`${path}\` failed: ${error.message}`, error);
	}
};

exports.chownSync = (path, uid, gid) => {
	try {
		return fs.chownSync(path, uid, gid);
	} catch (error) {
		throw new CpFileError(`chown \`${path}\` failed: ${error.message}`, error);
	}
};

exports.makeDir = path => makeDir(path, {fs}).catch(error => {
	throw new CpFileError(`Cannot create directory \`${path}\`: ${error.message}`, error);
});

exports.makeDirSync = path => {
	try {
		makeDir.sync(path, {fs});
	} catch (error) {
		throw new CpFileError(`Cannot create directory \`${path}\`: ${error.message}`, error);
	}
};

if (fs.copyFileSync) {
	exports.copyFileSync = (source, destination, flags) => {
		try {
			fs.copyFileSync(source, destination, flags);
		} catch (error) {
			throw new CpFileError(`Cannot copy from \`${source}\` to \`${destination}\`: ${error.message}`, error);
		}
	};
}
