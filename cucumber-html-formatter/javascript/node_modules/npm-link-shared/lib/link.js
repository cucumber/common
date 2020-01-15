var chalk = require('chalk');
var exec = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

function unique_elements(arr) {
  var n = {}, r = [];
  for (var i = 0; i < arr.length; i++) {
    if (!n[arr[i]]) {
      n[arr[i]] = true;
      r.push(arr[i]);
    }
  }
  return r;
}

function api(sharedDir, targetDir, options) {
  // Defaults
  var opts = {
    'moduleWhiteList': [],
    'executable': 'npm',
    'includeDev': false,
    'includePeer': false,
    'linkOptions': []
  };

  // Override defaults with user provided options
  options = options ? options : {};
  Object.keys(options).forEach(function extend_opts(key) {
    opts[key] = options[key];
  });

  // Pre-format arguments for `{npm,yarn} link` command
  var link_options = opts.linkOptions.join(' ');

  console.log(chalk.green('Will be installing modules from `') +
    chalk.cyan(sharedDir) + chalk.green('` to `') +
    chalk.cyan(targetDir) + chalk.green('`...'));

  if (opts.executable != 'npm') {
    console.log(chalk.green('With ') + chalk.cyan(opts.executable));
  }

  if (opts.linkOptions.length > 0) {
      console.log(chalk.green('Using the following link options'), opts.linkOptions);
  }

  if (opts.moduleWhiteList.length !== 0) {
    console.log(chalk.green('Restricted to the following modules'), opts.moduleWhiteList);
  }

  // Get sharedDir contents
  // Ensure we exit gracefully if sharedDir does not exist
  try {
    var sharedDirContent = fs.readdirSync(sharedDir);
  } catch (err) {
    if (err.code == 'ENOENT') {
      console.log(chalk.yellow('Abandoning linking, directory does not exist: ') +
        chalk.yellow('`') + chalk.red(sharedDir) + chalk.yellow('`'));
      return;
    }
    throw err; // Some other error ocurred
  }

  // Ensure we exit gracefully if targetDir does not exist
  try {
    fs.readdirSync(targetDir);
  } catch (err) {
    if (err.code == 'ENOENT') {
      console.log(chalk.yellow('Abandoning linking, directory does not exist: ') +
        chalk.yellow('`') + chalk.red(targetDir) + chalk.yellow('`'));
      return;
    }
    throw err; // Some other error ocurred
  }

  var DIRS = sharedDirContent
    .filter(function (item) {
      if (item.startsWith('@')) {
        return false;
      }
      return item[0] !== '.';
    })
    .map(function (item) {
      return sharedDir + item;
    })
    .filter(function (item) {
      return fs.statSync(item).isDirectory();
    });

  var SCOPES = sharedDirContent
    .filter(function (item) {
      if (!item.startsWith('@')) {
        return false;
      }
      return item[0] !== '.';
    })
    .map(function (item) {
      return sharedDir + item;
    })
    .filter(function (item) {
      return fs.statSync(item).isDirectory();
    });

  SCOPES
    .forEach(function (dir) {
      var modules = fs
        .readdirSync(dir)
        .filter(function (item) {
          return item[0] !== '.';
        });
      modules.forEach(function (item) {
        var fullPath = dir + '/' + item;
        if (fs.statSync(fullPath).isDirectory()) {
          DIRS.push(fullPath);
        }
      });
    });

  var MODULES = DIRS
    .map(function (dir) {
      var pkg = readPackageJson(dir) || {};
      return { name: pkg.name, dir: dir };
    })
    .filter(function (pkg) { return pkg.name; });

  var LINKED = {};

  function linkDir(dir, name) {
    console.log(chalk.green('\n\nLinking '  + dir));

    console.log(chalk.gray('\t' + exec(opts.executable + ' link ' + link_options, {
      cwd: dir
    }).toString()));

    console.log(chalk.gray('\t' + exec(opts.executable + ' link ' + name + ' ' + link_options, {
      cwd: targetDir
    }).toString()));

    LINKED[dir] = true;
  }

  function readPackageJson(dir) {
    try {
      return pkg = JSON.parse(fs.readFileSync(dir + '/package.json', 'utf-8'));
    } catch (err) {
      console.log(chalk.red('`') + chalk.cyan(dir) + chalk.red('` ignored due to missing or erroneous package.json'));
      return;
    }
  }

  function find(array, criterias) {
    var arrayLength = array.length;
    var i=0;
    var result;
    criteriasKeys = Object.keys(criterias);
    criteriasKeyslength = criteriasKeys.length;

    for (; i<arrayLength; i++) {
      var j=0;
      var criteriasRespected = true;
      var elt = array[i];

      for (; j<criteriasKeyslength; j++) {
        var criteriaKey = criteriasKeys[j];
        if (elt[criteriaKey] !== criterias[criteriaKey]) {
          criteriasRespected = false;
          break;
        }
      }

      if (criteriasRespected) return elt;
    }
  }

  function link(dir) {
    var i = 0;
    var pkg = readPackageJson(dir);

    var dependencies = pkg.dependencies || {};
    dependencies = Object.keys(dependencies);
    if(opts.includeDev) {
      // We should include shared local dev dependencies in the linking
      dependencies = mergeDependencies(dependencies, pkg.devDependencies);
    }
    if (opts.includePeer) {
      dependencies = mergeDependencies(dependencies, pkg.peerDependencies);
    }
    var shared_dependencies = dependencies.map(function (dependency) {
      return find(MODULES, {name: dependency});
    }).filter(function (module) {
      return module;
    }).map(function (module) {
      return module.dir;
    });

    if (shared_dependencies.length > 0) {
      console.log(chalk.green(dir + ' has shared dependencies '), shared_dependencies);
      for (i = 0; i < shared_dependencies.length; i++) {
        if (!LINKED[shared_dependencies[i]]) {
          link(shared_dependencies[i]);
        }
      }
      for (i = 0; i < shared_dependencies.length; i++) {
        var pkgDep = JSON.parse(fs.readFileSync(shared_dependencies[i] + '/package.json', 'utf-8'));
        var name = pkgDep.name;
        console.log(chalk.gray('\t' + exec(opts.executable + ' link ' + name + ' ' + link_options, {
          cwd: dir
        }).toString()));
      }
      linkDir(dir, pkg.name);
    } else {
      linkDir(dir, pkg.name);
    }
  }

  function mergeDependencies(regularDependencies, extraDependencies) {
      extraDependencies = Object.keys(extraDependencies || {});
      return unique_elements(regularDependencies.concat(regularDependencies, extraDependencies));
  }

  MODULES
    .filter(function (item) { // install only explicitly set modules
        if (opts.moduleWhiteList.length === 0) {
          return true;
        } else {
          return opts.moduleWhiteList.indexOf(item.name) !== -1;
        }
      })
    .forEach(function (item) {
      link(item.dir);
    });
}

module.exports = api;
