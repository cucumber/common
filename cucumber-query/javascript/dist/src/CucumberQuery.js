"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var CucumberQuery = /** @class */ (function () {
    function CucumberQuery() {
        this.uriByAstNodeIdId = new Map();
        this.locationByAstNodeId = new Map();
        this.gherkinStepById = new Map();
        this.pickleById = new Map();
        this.pickleStepById = new Map();
        this.testCaseStartedById = new Map();
        this.testCaseById = new Map();
        this.testStepById = new Map();
        this.testStepResultsByUriAndLine = new Map();
        this.testCaseResultsByUriAndLine = new Map();
        this.documentResultsByUri = new Map();
        this.testStepMatchArgumentsByUriAndLine = new Map();
    }
    CucumberQuery.prototype.update = function (message) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g;
        var _this = this;
        if (message.gherkinDocument && message.gherkinDocument.feature) {
            try {
                for (var _h = __values(message.gherkinDocument.feature.children), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var featureChild = _j.value;
                    if (featureChild.background) {
                        this.updateBackground(featureChild.background, message.gherkinDocument.uri);
                    }
                    if (featureChild.scenario) {
                        this.updateScenario(featureChild.scenario, message.gherkinDocument.uri);
                    }
                    if (featureChild.rule) {
                        var ruleChildren = featureChild.rule.children;
                        try {
                            for (var ruleChildren_1 = (e_2 = void 0, __values(ruleChildren)), ruleChildren_1_1 = ruleChildren_1.next(); !ruleChildren_1_1.done; ruleChildren_1_1 = ruleChildren_1.next()) {
                                var ruleChild = ruleChildren_1_1.value;
                                if (ruleChild.background) {
                                    this.updateBackground(ruleChild.background, message.gherkinDocument.uri);
                                }
                                if (ruleChild.scenario) {
                                    this.updateScenario(ruleChild.scenario, message.gherkinDocument.uri);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (ruleChildren_1_1 && !ruleChildren_1_1.done && (_b = ruleChildren_1.return)) _b.call(ruleChildren_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (message.pickle) {
            this.pickleById.set(message.pickle.id, message.pickle);
            try {
                for (var _k = __values(message.pickle.steps), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var pickleStep = _l.value;
                    this.pickleStepById.set(pickleStep.id, pickleStep);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (message.testCase) {
            this.testCaseById.set(message.testCase.id, message.testCase);
            try {
                for (var _m = __values(message.testCase.testSteps), _o = _m.next(); !_o.done; _o = _m.next()) {
                    var testStep = _o.value;
                    this.testStepById.set(testStep.id, testStep);
                    if (testStep.pickleStepId) {
                        var pickleStep = this.pickleStepById.get(testStep.pickleStepId);
                        if (pickleStep === undefined) {
                            throw new Error("Did not find a PickleStep with id \"" + testStep.pickleStepId + "\". Known ids:\n" + Array.from(this.pickleStepById.keys()).join('\n'));
                        }
                        try {
                            for (var _p = (e_5 = void 0, __values(pickleStep.astNodeIds)), _q = _p.next(); !_q.done; _q = _p.next()) {
                                var astNodeId = _q.value;
                                var uri = this.uriByAstNodeIdId.get(astNodeId);
                                var lineNumber = this.locationByAstNodeId.get(astNodeId).line;
                                this.testStepMatchArgumentsByUriAndLine.set(uri + ":" + lineNumber, testStep.stepMatchArguments);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    }
                    else if (testStep.hookId) {
                        // Nothing to do
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (message.testCaseStarted) {
            this.testCaseStartedById.set(message.testCaseStarted.id, message.testCaseStarted);
        }
        if (message.testStepFinished) {
            var testStep = this.testStepById.get(message.testStepFinished.testStepId);
            if (testStep.pickleStepId) {
                var pickleStep = this.pickleStepById.get(testStep.pickleStepId);
                if (pickleStep === undefined) {
                    throw new Error("Did not find a PickleStep with id \"" + testStep.pickleStepId + "\". Known ids:\n" + Array.from(this.pickleStepById.keys()).join('\n'));
                }
                try {
                    for (var _r = __values(pickleStep.astNodeIds), _s = _r.next(); !_s.done; _s = _r.next()) {
                        var astNodeId = _s.value;
                        var uri = this.uriByAstNodeIdId.get(astNodeId);
                        var lineNumber = this.locationByAstNodeId.get(astNodeId).line;
                        var testStepResults = this.testStepResultsByUriAndLine.get(uri + ":" + lineNumber);
                        if (testStepResults === undefined) {
                            testStepResults = [];
                            this.testStepResultsByUriAndLine.set(uri + ":" + lineNumber, testStepResults);
                        }
                        testStepResults.push(message.testStepFinished.testResult);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_s && !_s.done && (_f = _r.return)) _f.call(_r);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        if (message.testCaseFinished) {
            var testCaseStarted = this.testCaseStartedById.get(message.testCaseFinished.testCaseStartedId);
            var testCase = this.testCaseById.get(testCaseStarted.testCaseId);
            if (testCase === undefined) {
                throw new Error("Did not find a TestCase with id \"" + testCaseStarted.testCaseId + "\". Known ids:\n" + Array.from(this.testCaseById.keys()).join('\n'));
            }
            var pickle = this.pickleById.get(testCase.pickleId);
            var uri = pickle.uri;
            var lineNumbers = pickle.astNodeIds.map(function (astNodeId) { return _this.locationByAstNodeId.get(astNodeId).line; });
            try {
                for (var lineNumbers_1 = __values(lineNumbers), lineNumbers_1_1 = lineNumbers_1.next(); !lineNumbers_1_1.done; lineNumbers_1_1 = lineNumbers_1.next()) {
                    var lineNumber = lineNumbers_1_1.value;
                    var testCaseResults = this.testCaseResultsByUriAndLine.get(uri + ":" + lineNumber);
                    if (testCaseResults === undefined) {
                        testCaseResults = [];
                        this.testCaseResultsByUriAndLine.set(uri + ":" + lineNumber, testCaseResults);
                    }
                    testCaseResults.push(message.testCaseFinished.testResult);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (lineNumbers_1_1 && !lineNumbers_1_1.done && (_g = lineNumbers_1.return)) _g.call(lineNumbers_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            var documentResults = this.documentResultsByUri.get(uri);
            if (!documentResults) {
                documentResults = [];
                this.documentResultsByUri.set(uri, documentResults);
            }
            if (message.testCaseFinished.testResult.status === undefined) {
                throw new Error('Status not set for ' + JSON.stringify(message, null, 2));
            }
            documentResults.push(message.testCaseFinished.testResult);
        }
        return this;
    };
    CucumberQuery.prototype.updateBackground = function (background, uri) {
        var e_8, _a;
        try {
            for (var _b = __values(background.steps), _c = _b.next(); !_c.done; _c = _b.next()) {
                var step = _c.value;
                this.uriByAstNodeIdId.set(step.id, uri);
                this.locationByAstNodeId.set(step.id, step.location);
                this.gherkinStepById.set(step.id, step);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    CucumberQuery.prototype.updateScenario = function (scenario, uri) {
        var e_9, _a, e_10, _b, e_11, _c;
        this.locationByAstNodeId.set(scenario.id, scenario.location);
        try {
            for (var _d = __values(scenario.steps), _e = _d.next(); !_e.done; _e = _d.next()) {
                var step = _e.value;
                this.uriByAstNodeIdId.set(step.id, uri);
                this.locationByAstNodeId.set(step.id, step.location);
                this.gherkinStepById.set(step.id, step);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_9) throw e_9.error; }
        }
        try {
            for (var _f = __values(scenario.examples), _g = _f.next(); !_g.done; _g = _f.next()) {
                var examples = _g.value;
                try {
                    for (var _h = (e_11 = void 0, __values(examples.tableBody)), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var tableRow = _j.value;
                        this.uriByAstNodeIdId.set(tableRow.id, uri);
                        this.locationByAstNodeId.set(tableRow.id, tableRow.location);
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_10) throw e_10.error; }
        }
    };
    CucumberQuery.prototype.getStepResults = function (uri, lineNumber) {
        return this.testStepResultsByUriAndLine.get(uri + ":" + lineNumber) || [];
    };
    CucumberQuery.prototype.getScenarioResults = function (uri, lineNumber) {
        return this.testCaseResultsByUriAndLine.get(uri + ":" + lineNumber) || [];
    };
    CucumberQuery.prototype.getDocumentResults = function (uri) {
        var results = this.documentResultsByUri.get(uri) || [];
        return results.sort(function (a, b) { return b.status.valueOf() - a.status.valueOf(); });
    };
    CucumberQuery.prototype.getStepMatchArguments = function (uri, lineNumber) {
        return (this.testStepMatchArgumentsByUriAndLine.get(uri + ":" + lineNumber) || []);
    };
    CucumberQuery.prototype.getGherkinStep = function (gherkinStepId) {
        return this.gherkinStepById.get(gherkinStepId);
    };
    return CucumberQuery;
}());
exports.default = CucumberQuery;
//# sourceMappingURL=CucumberQuery.js.map