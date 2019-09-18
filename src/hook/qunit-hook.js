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

const QUnit = require("qunit");
const TestCollector = require('../test-collector.js');
const Hook = require('./hook.js');

class QUnitHook extends Hook {

	constructor() {
		super();

		this.testCollector = new TestCollector();
		this.log = false;
		this.enabled = true;

		QUnit.begin(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("begin()");
			}
			this.testCollector.beginRun({name: 'QUnit Run'});
		});

		QUnit.moduleStart(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("moduleStart(" + data.name + ")");
			}
			this.testCollector.beginSuite({name: data.name});
		});

		QUnit.testStart(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("testStart(" + data.name + ")");
			}
			this.testCollector.beginTest({name: data.name});
		});

		QUnit.testDone(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("testDone()");
			}
			var failureMessage = data.assertions.filter(a => !a.result).map(a => a.message).join(', ');
			var exceptionMessage = null;
			
			if (data.failed && !failureMessage) {
				// TODO how are exceptions defined?	
				exceptionMessage = "Exception.";
				failureMessage = null;
			}
			
			this.testCollector.endTest({
				failure : failureMessage,
				error : exceptionMessage,
				time : data.runtime,
			});
		});

		QUnit.moduleDone(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("moduleDone()");
			}
			// we can't use data.failed and data.passed and data.total 
			// because we define exceptions differently
			this.testCollector.endSuite({
				time : data.runtime,
			});
		});

		QUnit.done(data => {
			if (!this.enabled) {
				return;
			}
			if (this.log) {
				console.log("done()");
			}
			this.testCollector.endRun({
				time : data.runtime,
			});
			this.performFinish(this.testCollector.currentRun);
		});
	}

	dispose() {    
		// we cannot remove the functions above, so... just exit them earlier
		this.enabled = false;
	}
}

module.exports = QUnitHook;