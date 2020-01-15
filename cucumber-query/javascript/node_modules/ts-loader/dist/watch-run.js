"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
const servicesHost_1 = require("./servicesHost");
const utils_1 = require("./utils");
/**
 * Make function which will manually update changed files
 */
function makeWatchRun(instance) {
    // Called Before starting compilation after watch
    const lastTimes = new Map();
    const startTime = 0;
    return (compiler, callback) => {
        const times = compiler.fileTimestamps;
        for (const [filePath, date] of times) {
            if (date > (lastTimes.get(filePath) || startTime) &&
                filePath.match(constants.tsTsxJsJsxRegex) !== null) {
                continue;
            }
            lastTimes.set(filePath, date);
            updateFile(instance, filePath);
        }
        // On watch update add all known dts files expect the ones in node_modules
        // (skip @types/* and modules with typings)
        for (const filePath of instance.files.keys()) {
            if (filePath.match(constants.dtsDtsxOrDtsDtsxMapRegex) !== null &&
                filePath.match(constants.nodeModules) === null) {
                updateFile(instance, filePath);
            }
        }
        // Update all the watched files from solution builder
        if (instance.solutionBuilderHost) {
            for (const filePath of instance.solutionBuilderHost.watchedFiles.keys()) {
                updateFile(instance, filePath);
            }
        }
        callback();
    };
}
exports.makeWatchRun = makeWatchRun;
function updateFile(instance, filePath) {
    servicesHost_1.updateFileWithText(instance, filePath, nFilePath => utils_1.readFile(nFilePath) || '');
}
//# sourceMappingURL=watch-run.js.map