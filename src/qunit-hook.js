/**
 * This file hooks the TestCollector to QUnit.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

// TODO: maybe the separate assertions are tests and the tests actually suites (in suites)
// FIXME: use the data that QUnit provides

require('qunit');
var TestCollector = require('./test-collector.js');

var testCollector = new TestCollector();
var log = false;

QUnit.begin(function(data) {
	if (log) {
		console.log("begin()");
	}
	testCollector.beginRun();
});

QUnit.moduleStart(function(data) {
	if (log) {
		console.log("moduleStart(" + data.name + ")");
	}
	testCollector.beginSuite();
});

QUnit.testStart(function(data) {
	if (log) {
		console.log("testStart(" + data.name + ")");
	}
	testCollector.beginTest();
});

QUnit.testDone(function(data) {
	if (log) {
		console.log("testDone()");
	}
	// name: test60
	// module: Module F
	// skipped: false
	// todo: false
	// failed: 1
	// passed: 0
	// total: 1
	// assertions.result: false
	// assertions.message: [if exception] Died on test #1
	// source:     at Object.<anonymous> (stacktrace)
	testCollector.endTest();
//	console.log("name: " + data.name);
//	console.log("module: " + data.module);
//	console.log("skipped: " + data.skipped);
//	console.log("todo: " + data.todo);
//	console.log("failed: " + data.failed);
//	console.log("passed: " + data.passed);
//	console.log("total: " + data.total);
//	console.log("assertions.result: " + data.assertions[0].result);
//	console.log("assertions.message: " + data.assertions[0].message);
//	console.log("assertions: " + Object.getOwnPropertyNames(data.assertions[0]));
//	console.log("source: " + data.source);
});

QUnit.moduleDone(function(data) {
	if (log) {
		console.log("moduleDone()");
	}
	testCollector.endSuite();
});

QUnit.done(function(data) {
	if (log) {
		console.log("done()");
	}
	testCollector.endRun();
});