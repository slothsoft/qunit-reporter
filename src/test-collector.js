
/**
* This class collects data of tests that got run. It is not dependent on QUnit
* (or any other testing framework) so I can use it to test.
* 
* @since 1.0.0
* @author Stef Schulz <s.schulz@slothsoft.de>
* @url https://github.com/slothsoft/qunit-reporter
*/

class TestCollector {

	constructor() {
		this.currentRun = null; 
		this.currentSuite= null;
		this.currentTest= null;
	}

	beginRun(run={}) {
		var defaultRun = {
			suites : [],
			total : 0,
			passing : 0,
			failures : 0,
			errors : 0,
			start : new Date(),
			time : 0
		};
		this.currentRun = {...defaultRun, ...run};
		return this.currentRun;
	}

	endRun(run={}) {
		this.currentRun.time = run.time || ((new Date()).getTime() - this.currentRun.start.getTime());
		this.currentRun.total = run.total || this.currentRun.suites.reduce((a, {total}) => a + total, 0);
		this.currentRun.passing = run.passing || this.currentRun.suites.reduce((a, {passing}) => a + passing, 0);
		this.currentRun.failures = run.failures || this.currentRun.suites.reduce((a, {failures}) => a + failures, 0);
		this.currentRun.errors = run.errors || this.currentRun.suites.reduce((a, {errors}) => a + errors, 0);
		
		if (this.currentRun.total == 0) {
			this.currentRun.total = this.currentRun.passing + this.currentRun.failures + this.currentRun.errors;
		}
	}
	
	beginSuite(suite={}) {
		var defaultSuite = {
			name : "Unknown Suite",
			tests : [],
			total : 0,
			passing : 0,
			failures : 0,
			errors : 0,
			start : new Date(),
			time : 0
		};
		this.currentSuite = {...defaultSuite, ...suite};
		if (!this.currentRun) {
			this.beginRun();
		}
		this.currentRun.suites.push(this.currentSuite);
		return this.currentSuite;
	}

	endSuite(suite={}) {
		this.currentSuite.time = suite.time || ((new Date()).getTime() - this.currentSuite.start.getTime());
		this.currentSuite.total = suite.total || this.currentSuite.tests.length;
		this.currentSuite.failures = suite.failures || this.currentSuite.tests.reduce((a, {failure}) => a + (failure != null), 0);
		this.currentSuite.errors = suite.errors || this.currentSuite.tests.reduce((a, {error}) => a + (error != null), 0);
		this.currentSuite.passing = suite.passing || this.currentSuite.tests.length - this.currentSuite.failures - this.currentSuite.errors;
	}

	beginTest(test={}) {
		var defaultTest = {
			name : "test()",
			total : 0,
			failure : null,
			error : null,
			start : new Date(),
			time : 0
		};
		this.currentTest = {...defaultTest, ...test};
		if (!this.currentSuite) {
			this.beginSuite();
		}
		this.currentSuite.tests.push(this.currentTest);
		return this.currentTest;
	}
	
	endTest(test={}) {
		this.currentTest.time = test.time || ((new Date()).getTime() - this.currentTest.start.getTime());
		this.currentTest.failure = test.failure || null;
		this.currentTest.error = test.error || null;
	}
}

module.exports = TestCollector;