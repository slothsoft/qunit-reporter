"use strict";

/**
 * This file hooks the TestCollector to QUnit. It should return a Hook of some
 * kind.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

// TODO: maybe the separate assertions are tests and the tests actually suites
// (in suites)
// TODO: this should be a class I guess

const QUnit = require("qunit");
const TestCollector = require('../test-collector.js');
const Hook = require('./hook.js');

var testCollector = new TestCollector();
var log = false;

QUnit.begin(function(data) {
	if (log) {
		console.log("begin()");
	}
	testCollector.beginRun({name: 'QUnit Run'});
});

QUnit.moduleStart(function(data) {
	if (log) {
		console.log("moduleStart(" + data.name + ")");
	}
	testCollector.beginSuite({name: data.name});
});

QUnit.testStart(function(data) {
	if (log) {
		console.log("testStart(" + data.name + ")");
	}
	testCollector.beginTest({name: data.name});
});

QUnit.testDone(function(data) {
	if (log) {
		console.log("testDone()");
	}
	var failureMessage = data.assertions.filter(a => !a.result).map(a => a.message).join(', ');
	var exceptionMessage = null;
	
	if (data.failed && !failureMessage) {
		// TODO how are exceptions defined?	
		exceptionMessage = "Exception.";
		failureMessage = null;
	}
	
	testCollector.endTest({
		failure : failureMessage,
		error : exceptionMessage,
		time : data.runtime,
	});
});

QUnit.moduleDone(function(data) {
	if (log) {
		console.log("moduleDone()");
	}
	// we can't use data.failed and data.passed and data.total 
	// because we define exceptions differently
	testCollector.endSuite({
		time : data.runtime,
	});
});

var hook = new Hook();

QUnit.done(function(data) {
	if (log) {
		console.log("done()");
	}
	testCollector.endRun({
		time : data.runtime,
	});
	hook.performFinish(testCollector.currentRun);
});

module.exports = hook;