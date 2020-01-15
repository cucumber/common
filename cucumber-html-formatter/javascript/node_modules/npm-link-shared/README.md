# npm-link-shared

[![Version](https://img.shields.io/npm/v/npm-link-shared.svg)](https://www.npmjs.com/package/npm-link-shared)
[![Build Status](http://img.shields.io/travis/OrKoN/npm-link-shared.svg?style=flat)](https://travis-ci.org/OrKoN/npm-link-shared)
[![Downloads](https://img.shields.io/npm/dm/npm-link-shared.svg)](https://www.npmjs.com/package/npm-link-shared)
[![Dependencies](https://img.shields.io/david/OrKoN/npm-link-shared.svg)](https://github.com/OrKoN/npm-link-shared/blob/master/package.json#L19)

Installs a set of local node modules into a target folder using `npm link`. Links all dependencies of the local modules if they are listed in the source folder.

[Blog post explaining this module](https://60devs.com/simple-way-to-manage-local-node-module-using-npm-link.html).

## Installation

```
npm install npm-link-shared -g
```

## Changelog

v0.5.2 (2017-09-07) - Updated dependencies. Added package-lock.json.

v0.5.1 (2017-05-19) - Support for `--include-peer` which links peer dependencies if they are defined.

v0.5.0 (2017-03-29) - **BREAKING CHANGES**: The lib/api function's arguments have been revamped. The previously undocumented argument --includeDev is now --include-dev to be consistent with other arguments. We now print a warning and exit gracefully if either the shared or target directory do not exist.

v0.4.0 (2017-03-13) - Support for changing executable to yarn with `--yarn`. **Use at your own risk!** `yarn link` is not yet functionally equivalent to `npm link`.

v0.3.3 (2016-07-01) - Support for npm link options, removed hardcoded usage of `--production`.

v0.3.0 (2016-03-25) - Support for @scope packages. For example, `@scope/my-package`.

v0.2.1 (2016-01-12) - Thanks to @barroudjo, module folder names are now de-coupled from the names in the package.json. So any name can be used as a folder name.

v0.2.0 (2015-10-30) - Links using `--production` flag so that devDependencies should not be installed anymore. Tests added.

v0.1.6 (2015-04-20) - Removed unneeded npm dependency. Added a possibility to define [which modules to install](#define-specific-modules-to-install).

## Usage

```
  npm-link-shared <shared-modules-dir> <target-installation-dir> [<module1..> [, <module2..>]] [--yarn] [--include-dev] [--include-peer] [--<npm-link-option> [--<npm-link-option>]]
```

For example:

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project
```

This links all modules located in the `internal_modules` directory to the `my-project` dir.

### Define specific modules to install

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project my-module1 my-module2
```

This links modules `my-module1` and `my-module2` located in the `internal_modules` directory to the `my-project` dir. Only these two modules are installed but their dependencies are resolved against the entire `internal_modules` directory.

### Define options passed to npm link

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project --production
```

This prevents installation of devDependencies of shared modules by passing the production option to npm link (npm link --production).

### Use yarn instead

**NOTE:** `yarn link` is currently functionally different from `npm link`, and should not be considered stable. Use at your own risk until the yarn project has stabilized.

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project --yarn
```

This works in conjunction with all other options.

### Also link devDependencies and/or peerDependencies

devDependencies:

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project --include-dev
```

peerDependencies:

```
  npm-link-shared /home/user/internal_modules/ /home/user/my-project --include-peer
```

Ordinarily, only packages found under the dependencies key in a project's `package.json` are linked. With this option, devDependencies and/or peerDependencies are also linked.

## Developing

To run tests successfully, you must have both npm and yarn in your `$PATH`.

## LICENSE

MIT
