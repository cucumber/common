"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gherkin_1 = __importDefault(require("gherkin"));
var cucumber_messages_1 = require("cucumber-messages");
var stream_1 = require("stream");
var assert_1 = __importDefault(require("assert"));
var CucumberQuery_1 = __importDefault(require("../src/CucumberQuery"));
var SupportCode_1 = __importDefault(require("fake-cucumber/dist/src/SupportCode"));
var CucumberStream_1 = __importDefault(require("fake-cucumber/dist/src/CucumberStream"));
var makeDummyStepDefinitions_1 = __importDefault(require("fake-cucumber/dist/test/makeDummyStepDefinitions"));
describe('CucumberQuery', function () {
    describe('#getStepResults(uri, lineNumber)', function () {
        it('returns empty array when there are no hits', function () {
            assert_1.default.deepStrictEqual(new CucumberQuery_1.default().getStepResults('test.feature', 1), []);
        });
        it('looks up results for steps', function (cb) {
            check("Feature: hello\n  Background:\n    Given a passed step\n\n  Scenario: hi\n    Given a passed step\n    Given a failed step\n", function (query) {
                var line3 = query.getStepResults('test.feature', 3);
                assert_1.default.strictEqual(line3[0].status, cucumber_messages_1.messages.TestResult.Status.PASSED);
                var line6 = query.getStepResults('test.feature', 6);
                assert_1.default.strictEqual(line6[0].status, cucumber_messages_1.messages.TestResult.Status.PASSED);
                var line7 = query.getStepResults('test.feature', 7);
                assert_1.default.strictEqual(line7[0].status, cucumber_messages_1.messages.TestResult.Status.FAILED);
                cb();
            }, cb);
        });
        it('looks up results for examples rows', function (cb) {
            check("Feature: hello\n  Scenario: hi\n    Given a <status> step\n\n    Examples:\n      | status    |\n      | passed    |\n      | failed    |\n      | pending   |\n      | undefined |\n", function (query) {
                // const line3: messages.ITestResult[] = query.getStepResults(
                //   'test.feature',
                //   3
                // )
                // assert.strictEqual(line3[0].status, messages.TestResult.Status.FAILED)
                assert_1.default.strictEqual(query.getStepResults('test.feature', 7)[0].status, cucumber_messages_1.messages.TestResult.Status.PASSED);
                assert_1.default.strictEqual(query.getStepResults('test.feature', 8)[0].status, cucumber_messages_1.messages.TestResult.Status.FAILED);
                assert_1.default.strictEqual(query.getStepResults('test.feature', 9)[0].status, cucumber_messages_1.messages.TestResult.Status.PENDING);
                assert_1.default.strictEqual(query.getStepResults('test.feature', 10)[0].status, cucumber_messages_1.messages.TestResult.Status.UNDEFINED);
                cb();
            }, cb);
        });
    });
    describe('#getScenarioResults(uri, lineNumber)', function () {
        it('returns empty array when there are no hits', function () {
            assert_1.default.deepStrictEqual(new CucumberQuery_1.default().getScenarioResults('test.feature', 1), []);
        });
        it('looks up result for scenario', function (cb) {
            check("Feature: hello\n  Scenario: hi\n    Given a passed step\n    Given a failed step\n", function (query) {
                var line2 = query.getScenarioResults('test.feature', 2);
                assert_1.default.strictEqual(line2[0].status, cucumber_messages_1.messages.TestResult.Status.FAILED);
                cb();
            }, cb);
        });
        it("looks up result for rule->scenario's uri and line", function (cb) {
            check("Feature: hello\n  Rule: a rule\n    Scenario: hi\n      Given a passed step\n      Given a failed step\n", function (query) {
                var line3 = query.getScenarioResults('test.feature', 3);
                assert_1.default.strictEqual(line3[0].status, cucumber_messages_1.messages.TestResult.Status.FAILED);
                cb();
            }, cb);
        });
    });
    describe('#getDocumentResults(uri)', function () {
        it('returns empty array when there are no hits', function () {
            assert_1.default.deepStrictEqual(new CucumberQuery_1.default().getDocumentResults('test.feature'), []);
        });
        it('looks up result for a whole file', function (cb) {
            check("Feature: hello\n\n    Scenario: passed\n      Given a passed step\n\n    Scenario: failed\n      Given a failed step\n\n    Scenario: passed too\n      Given a passed step\n", function (query) {
                var results = query.getDocumentResults('test.feature');
                assert_1.default.strictEqual(results[0].status, cucumber_messages_1.messages.TestResult.Status.FAILED);
                cb();
            }, cb);
        });
    });
    describe('#getStepMatchArguments(uri, lineNumber)', function () {
        it('returns empty array when there are no hits', function () {
            assert_1.default.deepStrictEqual(new CucumberQuery_1.default().getStepMatchArguments('test.feature', 1), []);
        });
        it("looks up result for step's uri and line", function (cb) {
            check("Feature: hello\n  Scenario: hi\n    Given a passed step\n    And I have 567 cukes in my belly\n", function (query) {
                var line3 = query.getStepMatchArguments('test.feature', 3);
                assert_1.default.deepStrictEqual(line3.map(function (arg) { return arg.parameterTypeName; }), ['word']);
                var line4 = query.getStepMatchArguments('test.feature', 4);
                assert_1.default.deepStrictEqual(line4.map(function (arg) { return arg.parameterTypeName; }), ['int', 'word']);
                cb();
            }, cb);
        });
    });
    describe('#getGherkinStep(pickleStepId)', function () {
        it('looks up a Gherkin step', function (cb) {
            check("Feature: hello\n  Scenario: hi\n    Given a passed step\n", function (query, envelopes) {
                var pickleStep = envelopes.find(function (e) { return e.pickle; }).pickle.steps[0];
                var gherkinStep = query.getGherkinStep(pickleStep.astNodeIds[0]);
                assert_1.default.deepStrictEqual(gherkinStep.text, 'a passed step');
                cb();
            }, cb);
        });
    });
});
function generateMessages(gherkinSource, uri) {
    var source = cucumber_messages_1.messages.Envelope.fromObject({
        source: {
            uri: uri,
            data: gherkinSource,
            mediaType: 'text/x.cucumber.gherkin+plain',
        },
    });
    var newId = cucumber_messages_1.IdGenerator.uuid();
    var supportCode = new SupportCode_1.default(newId);
    makeDummyStepDefinitions_1.default(supportCode);
    return gherkin_1.default
        .fromSources([source], { newId: newId })
        .pipe(new CucumberStream_1.default(supportCode.stepDefinitions, supportCode.hooks, newId));
}
function check(gherkinSource, listener, cb) {
    var cucumberQuery = new CucumberQuery_1.default();
    var envelopes = [];
    var sink = generateMessages(gherkinSource, 'test.feature').pipe(new stream_1.Writable({
        objectMode: true,
        write: function (envelope, encoding, callback) {
            envelopes.push(envelope);
            cucumberQuery.update(envelope);
            callback();
        },
    }));
    sink.on('error', cb);
    sink.on('finish', function () { return listener(cucumberQuery, envelopes); });
}
//# sourceMappingURL=CucumberQueryTest.js.map