"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs = require("fs");
const path = require("path");
const after_compile_1 = require("./after-compile");
const compilerSetup_1 = require("./compilerSetup");
const config_1 = require("./config");
const constants_1 = require("./constants");
const logger = require("./logger");
const servicesHost_1 = require("./servicesHost");
const utils_1 = require("./utils");
const watch_run_1 = require("./watch-run");
const instances = {};
/**
 * The loader is executed once for each file seen by webpack. However, we need to keep
 * a persistent instance of TypeScript that contains all of the files in the program
 * along with definition files and options. This function either creates an instance
 * or returns the existing one. Multiple instances are possible by using the
 * `instance` property.
 */
function getTypeScriptInstance(loaderOptions, loader) {
    if (instances.hasOwnProperty(loaderOptions.instance)) {
        const instance = instances[loaderOptions.instance];
        utils_1.ensureProgram(instance);
        return { instance: instances[loaderOptions.instance] };
    }
    const colors = new chalk_1.default.constructor({ enabled: loaderOptions.colors });
    const log = logger.makeLogger(loaderOptions, colors);
    const compiler = compilerSetup_1.getCompiler(loaderOptions, log);
    if (compiler.errorMessage !== undefined) {
        return { error: utils_1.makeError(colors.red(compiler.errorMessage), undefined) };
    }
    return successfulTypeScriptInstance(loaderOptions, loader, log, colors, compiler.compiler, compiler.compilerCompatible, compiler.compilerDetailsLogMessage);
}
exports.getTypeScriptInstance = getTypeScriptInstance;
function successfulTypeScriptInstance(loaderOptions, loader, log, colors, compiler, compilerCompatible, compilerDetailsLogMessage) {
    const configFileAndPath = config_1.getConfigFile(compiler, colors, loader, loaderOptions, compilerCompatible, log, compilerDetailsLogMessage);
    if (configFileAndPath.configFileError !== undefined) {
        const { message, file } = configFileAndPath.configFileError;
        return {
            error: utils_1.makeError(colors.red('error while reading tsconfig.json:' + constants_1.EOL + message), file)
        };
    }
    const { configFilePath, configFile } = configFileAndPath;
    const basePath = loaderOptions.context || path.dirname(configFilePath || '');
    const configParseResult = config_1.getConfigParseResult(compiler, configFile, basePath, configFilePath, loaderOptions.projectReferences);
    if (configParseResult.errors.length > 0 && !loaderOptions.happyPackMode) {
        const errors = utils_1.formatErrors(configParseResult.errors, loaderOptions, colors, compiler, { file: configFilePath }, loader.context);
        loader._module.errors.push(...errors);
        return {
            error: utils_1.makeError(colors.red('error while parsing tsconfig.json'), configFilePath)
        };
    }
    const compilerOptions = compilerSetup_1.getCompilerOptions(configParseResult);
    const rootFileNames = new Set();
    const files = new Map();
    const otherFiles = new Map();
    const appendTsTsxSuffixesIfRequired = loaderOptions.appendTsSuffixTo.length > 0 ||
        loaderOptions.appendTsxSuffixTo.length > 0
        ? (filePath) => utils_1.appendSuffixesIfMatch({
            '.ts': loaderOptions.appendTsSuffixTo,
            '.tsx': loaderOptions.appendTsxSuffixTo
        }, filePath)
        : (filePath) => filePath;
    // same strategy as https://github.com/s-panferov/awesome-typescript-loader/pull/531/files
    let { getCustomTransformers: customerTransformers } = loaderOptions;
    let getCustomTransformers = Function.prototype;
    if (typeof customerTransformers === 'function') {
        getCustomTransformers = customerTransformers;
    }
    else if (typeof customerTransformers === 'string') {
        try {
            customerTransformers = require(customerTransformers);
        }
        catch (err) {
            throw new Error(`Failed to load customTransformers from "${loaderOptions.getCustomTransformers}": ${err.message}`);
        }
        if (typeof customerTransformers !== 'function') {
            throw new Error(`Custom transformers in "${loaderOptions.getCustomTransformers}" should export a function, got ${typeof getCustomTransformers}`);
        }
        getCustomTransformers = customerTransformers;
    }
    // if allowJs is set then we should accept js(x) files
    const scriptRegex = configParseResult.options.allowJs === true
        ? /\.tsx?$|\.jsx?$/i
        : /\.tsx?$/i;
    if (loaderOptions.transpileOnly) {
        // quick return for transpiling
        // we do need to check for any issues with TS options though
        const transpileInstance = (instances[loaderOptions.instance] = {
            compiler,
            compilerOptions,
            appendTsTsxSuffixesIfRequired,
            loaderOptions,
            rootFileNames,
            files,
            otherFiles,
            program: undefined,
            dependencyGraph: {},
            reverseDependencyGraph: {},
            transformers: {},
            colors
        });
        tryAndBuildSolutionReferences(transpileInstance, loader, log, scriptRegex, configFilePath);
        const program = (transpileInstance.program =
            configParseResult.projectReferences !== undefined
                ? compiler.createProgram({
                    rootNames: configParseResult.fileNames,
                    options: configParseResult.options,
                    projectReferences: configParseResult.projectReferences
                })
                : compiler.createProgram([], compilerOptions));
        // happypack does not have _module.errors - see https://github.com/TypeStrong/ts-loader/issues/336
        if (!loaderOptions.happyPackMode) {
            const solutionErrors = servicesHost_1.getSolutionErrors(transpileInstance, loader.context);
            const diagnostics = program.getOptionsDiagnostics();
            const errors = utils_1.formatErrors(diagnostics, loaderOptions, colors, compiler, { file: configFilePath || 'tsconfig.json' }, loader.context);
            loader._module.errors.push(...solutionErrors, ...errors);
        }
        transpileInstance.transformers = getCustomTransformers(program);
        return { instance: transpileInstance };
    }
    // Load initial files (core lib files, any files specified in tsconfig.json)
    let normalizedFilePath;
    try {
        const filesToLoad = loaderOptions.onlyCompileBundledFiles
            ? configParseResult.fileNames.filter(fileName => constants_1.dtsDtsxOrDtsDtsxMapRegex.test(fileName))
            : configParseResult.fileNames;
        filesToLoad.forEach(filePath => {
            normalizedFilePath = path.normalize(filePath);
            files.set(normalizedFilePath, {
                text: fs.readFileSync(normalizedFilePath, 'utf-8'),
                version: 0
            });
            rootFileNames.add(normalizedFilePath);
        });
    }
    catch (exc) {
        return {
            error: utils_1.makeError(colors.red(`A file specified in tsconfig.json could not be found: ${normalizedFilePath}`), normalizedFilePath)
        };
    }
    const instance = (instances[loaderOptions.instance] = {
        compiler,
        compilerOptions,
        appendTsTsxSuffixesIfRequired,
        loaderOptions,
        rootFileNames,
        files,
        otherFiles,
        languageService: null,
        version: 0,
        transformers: {},
        dependencyGraph: {},
        reverseDependencyGraph: {},
        colors
    });
    if (!loader._compiler.hooks) {
        throw new Error("You may be using an old version of webpack; please check you're using at least version 4");
    }
    tryAndBuildSolutionReferences(instance, loader, log, scriptRegex, configFilePath);
    if (loaderOptions.experimentalWatchApi && compiler.createWatchProgram) {
        log.logInfo('Using watch api');
        // If there is api available for watch, use it instead of language service
        instance.watchHost = servicesHost_1.makeWatchHost(scriptRegex, log, loader, instance, configParseResult.projectReferences);
        instance.watchOfFilesAndCompilerOptions = compiler.createWatchProgram(instance.watchHost);
        instance.builderProgram = instance.watchOfFilesAndCompilerOptions.getProgram();
        instance.program = instance.builderProgram.getProgram();
        instance.transformers = getCustomTransformers(instance.program);
    }
    else {
        const servicesHost = servicesHost_1.makeServicesHost(scriptRegex, log, loader, instance, loaderOptions.experimentalFileCaching, configParseResult.projectReferences);
        instance.languageService = compiler.createLanguageService(servicesHost.servicesHost, compiler.createDocumentRegistry());
        if (servicesHost.clearCache !== null) {
            loader._compiler.hooks.watchRun.tap('ts-loader', servicesHost.clearCache);
        }
        instance.transformers = getCustomTransformers(instance.languageService.getProgram());
    }
    loader._compiler.hooks.afterCompile.tapAsync('ts-loader', after_compile_1.makeAfterCompile(instance, configFilePath));
    loader._compiler.hooks.watchRun.tapAsync('ts-loader', watch_run_1.makeWatchRun(instance));
    return { instance };
}
function tryAndBuildSolutionReferences(instance, loader, log, scriptRegex, configFilePath) {
    if (configFilePath &&
        utils_1.supportsSolutionBuild(instance.loaderOptions, instance.compiler)) {
        // Use solution builder
        log.logInfo('Using SolutionBuilder api');
        instance.configFilePath = configFilePath;
        instance.solutionBuilderHost = servicesHost_1.makeSolutionBuilderHost(scriptRegex, log, loader, instance);
        instance.solutionBuilder = instance.compiler.createSolutionBuilderWithWatch(instance.solutionBuilderHost, [configFilePath], { verbose: true });
        instance.solutionBuilder.buildReferences(instance.configFilePath);
    }
}
function forEachResolvedProjectReference(resolvedProjectReferences, cb) {
    let seenResolvedRefs;
    return worker(resolvedProjectReferences);
    function worker(resolvedRefs) {
        if (resolvedRefs) {
            for (const resolvedRef of resolvedRefs) {
                if (!resolvedRef) {
                    continue;
                }
                if (seenResolvedRefs &&
                    seenResolvedRefs.some(seenRef => seenRef === resolvedRef)) {
                    // ignore recursives
                    continue;
                }
                (seenResolvedRefs || (seenResolvedRefs = [])).push(resolvedRef);
                const result = cb(resolvedRef) || worker(resolvedRef.references);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
}
exports.forEachResolvedProjectReference = forEachResolvedProjectReference;
// This code is here as a temporary holder
function fileExtensionIs(fileName, ext) {
    return fileName.endsWith(ext);
}
function rootDirOfOptions(instance, configFile) {
    return (configFile.options.rootDir ||
        instance.compiler.getDirectoryPath(configFile.options.configFilePath));
}
function getOutputPathWithoutChangingExt(instance, inputFileName, configFile, ignoreCase, outputDir) {
    return outputDir
        ? instance.compiler.resolvePath(outputDir, instance.compiler.getRelativePathFromDirectory(rootDirOfOptions(instance, configFile), inputFileName, ignoreCase))
        : inputFileName;
}
function getOutputJSFileName(instance, inputFileName, configFile, ignoreCase) {
    if (configFile.options.emitDeclarationOnly) {
        return undefined;
    }
    const isJsonFile = fileExtensionIs(inputFileName, '.json');
    const outputFileName = instance.compiler.changeExtension(getOutputPathWithoutChangingExt(instance, inputFileName, configFile, ignoreCase, configFile.options.outDir), isJsonFile
        ? '.json'
        : fileExtensionIs(inputFileName, '.tsx') &&
            configFile.options.jsx === instance.compiler.JsxEmit.Preserve
            ? '.jsx'
            : '.js');
    return !isJsonFile ||
        instance.compiler.comparePaths(inputFileName, outputFileName, configFile.options.configFilePath, ignoreCase) !== instance.compiler.Comparison.EqualTo
        ? outputFileName
        : undefined;
}
function getOutputFileNames(instance, configFile, inputFileName) {
    const ignoreCase = !instance.compiler.sys.useCaseSensitiveFileNames;
    if (instance.compiler.getOutputFileNames) {
        return instance.compiler.getOutputFileNames(configFile, inputFileName, ignoreCase);
    }
    const outputs = [];
    const addOutput = (fileName) => fileName && outputs.push(fileName);
    const js = getOutputJSFileName(instance, inputFileName, configFile, ignoreCase);
    addOutput(js);
    if (!fileExtensionIs(inputFileName, '.json')) {
        if (js && configFile.options.sourceMap) {
            addOutput(`${js}.map`);
        }
        if ((configFile.options.declaration || configFile.options.composite) &&
            instance.compiler.hasTSFileExtension(inputFileName)) {
            const dts = instance.compiler.getOutputDeclarationFileName(inputFileName, configFile, ignoreCase);
            addOutput(dts);
            if (configFile.options.declarationMap) {
                addOutput(`${dts}.map`);
            }
        }
    }
    return outputs;
}
function getOutputFilesFromReference(program, instance, filePath) {
    // May be api to get file
    return forEachResolvedProjectReference(program.getResolvedProjectReferences(), ({ commandLine }) => {
        const { options, fileNames } = commandLine;
        if (!options.outFile &&
            !options.out &&
            fileNames.some(file => path.normalize(file) === filePath)) {
            const outputFiles = [];
            getOutputFileNames(instance, commandLine, instance.compiler.resolvePath(filePath)).forEach(name => {
                const text = instance.compiler.sys.readFile(name);
                if (text) {
                    outputFiles.push({ name, text, writeByteOrderMark: false });
                }
            });
            return outputFiles;
        }
        return undefined;
    });
}
function isReferencedFile(instance, filePath) {
    return (!!instance.solutionBuilderHost &&
        !!instance.solutionBuilderHost.watchedFiles.get(filePath));
}
exports.isReferencedFile = isReferencedFile;
function getEmitFromWatchHost(instance, filePath) {
    const program = utils_1.ensureProgram(instance);
    const builderProgram = instance.builderProgram;
    if (builderProgram && program) {
        if (filePath) {
            const existing = instance.watchHost.outputFiles.get(filePath);
            if (existing) {
                return existing;
            }
        }
        const outputFiles = [];
        const writeFile = (fileName, text, writeByteOrderMark) => {
            if (fileName.endsWith('.tsbuildinfo')) {
                instance.watchHost.tsbuildinfo = {
                    name: fileName,
                    writeByteOrderMark,
                    text
                };
            }
            else {
                outputFiles.push({ name: fileName, writeByteOrderMark, text });
            }
        };
        const sourceFile = filePath ? program.getSourceFile(filePath) : undefined;
        // Try emit Next file
        while (true) {
            const result = builderProgram.emitNextAffectedFile(writeFile, 
            /*cancellationToken*/ undefined, 
            /*emitOnlyDtsFiles*/ false, instance.transformers);
            if (!result) {
                break;
            }
            if (result.affected.fileName) {
                instance.watchHost.outputFiles.set(path.resolve(result.affected.fileName), outputFiles.slice());
            }
            if (result.affected === sourceFile) {
                return outputFiles;
            }
        }
    }
    return undefined;
}
exports.getEmitFromWatchHost = getEmitFromWatchHost;
function getEmitOutput(instance, filePath) {
    if (fileExtensionIs(filePath, instance.compiler.Extension.Dts)) {
        return [];
    }
    const program = utils_1.ensureProgram(instance);
    if (program !== undefined) {
        const sourceFile = program.getSourceFile(filePath);
        if (isReferencedFile(instance, filePath)) {
            const builtReferences = getOutputFilesFromReference(program, instance, filePath);
            if (builtReferences) {
                return builtReferences;
            }
        }
        const outputFiles = [];
        const writeFile = (fileName, text, writeByteOrderMark) => outputFiles.push({ name: fileName, writeByteOrderMark, text });
        // The source file will be undefined if it’s part of an unbuilt project reference
        if (sourceFile !== undefined || !utils_1.isUsingProjectReferences(instance)) {
            const outputFilesFromWatch = getEmitFromWatchHost(instance, filePath);
            if (outputFilesFromWatch) {
                return outputFilesFromWatch;
            }
            program.emit(sourceFile, writeFile, 
            /*cancellationToken*/ undefined, 
            /*emitOnlyDtsFiles*/ false, instance.transformers);
        }
        return outputFiles;
    }
    else {
        // Emit Javascript
        return instance.languageService.getProgram().getSourceFile(filePath) ===
            undefined
            ? []
            : instance.languageService.getEmitOutput(filePath).outputFiles;
    }
}
exports.getEmitOutput = getEmitOutput;
//# sourceMappingURL=instances.js.map