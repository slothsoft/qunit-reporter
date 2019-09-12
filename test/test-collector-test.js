var TestCollector = require('../src/test-collector.js');

QUnit.module("test-collector", function() {
	QUnit.test("constructor()", function(assert) {
		var collector = new TestCollector();

		assert.equal(collector.currentRun, null);
		assert.equal(collector.currentSuite, null);
		assert.equal(collector.currentTest, null);
	});

	QUnit.test("beginRun()", function(assert) {
		var collector = new TestCollector();
		
		var run = collector.beginRun();

		assert.deepEqual(run.name, "Unknown Run");
		assert.deepEqual(run.suites, []);
		assert.equal(run.total, 0);
		assert.equal(run.failures, 0);
		assert.equal(run.errors, 0);
		assert.equal(run.start != null, true);
		assert.equal(run.time, 0);
	});

	QUnit.test("beginRun() with config", function(assert) {
		var collector = new TestCollector();
		
		var run = collector.beginRun({
			total : 1,
			failures : 2,
			time : 3
		});
		
		assert.equal(run.total, 1);
		assert.equal(run.failures, 2);
		assert.equal(run.errors, 0);
		assert.equal(run.time, 3);
	});

	QUnit.test("endRun()", function(assert) {
		var collector = new TestCollector();
		var run = collector.beginRun();
		collector.endRun({
			total : 12,
			failures : 4,
			errors : 2
		});
		
		assert.equal(run.total, 12);
		assert.equal(run.failures, 4);
		assert.equal(run.errors, 2);
	});

	QUnit.test("endRun() without data but with suite", function(assert) {
		var collector = new TestCollector();
		var run = collector.beginRun();
		collector.beginSuite();
		collector.endSuite({
			total : 12,
			failures : 4,
			errors : 2
		}); 
		collector.endRun();
		
		assert.equal(run.total, 12);
		assert.equal(run.failures, 4);
		assert.equal(run.errors, 2);
	});

	QUnit.test("endRun() without data but with test", function(assert) {
		var collector = new TestCollector();
		var run = collector.beginRun();
		collector.beginSuite();
		fillCollectorWithTests(collector);
		collector.endSuite(); 
		collector.endRun();
		
		assert.equal(run.total, 6);
		assert.equal(run.failures, 2);
		assert.equal(run.errors, 3);
	});

	QUnit.test("beginSuite()", function(assert) {
		var collector = new TestCollector();
		
		var run = collector.beginRun();
		var suite = collector.beginSuite();

		assert.deepEqual(run.suites, [suite]);
		
		assert.equal(suite.name, "Unknown Suite");
		assert.deepEqual(suite.tests, []);
		assert.equal(suite.total, 0);
		assert.equal(suite.failures, 0);
		assert.equal(suite.errors, 0);
		assert.equal(suite.start != null, true);
		assert.equal(suite.time, 0);
	});

	QUnit.test("beginSuite() with config", function(assert) {
		var collector = new TestCollector();
		
		var run = collector.beginRun();
		var suite = collector.beginSuite({
			name : "My Suite",
		});

		assert.deepEqual(run.suites, [suite]);
		
		assert.equal(suite.name, "My Suite");
		assert.deepEqual(suite.tests, []);
		assert.equal(suite.total, 0);
		assert.equal(suite.failures, 0);
		assert.equal(suite.errors, 0);
		assert.equal(suite.start != null, true);
		assert.equal(suite.time, 0);
	});

	QUnit.test("beginSuite() without run", function(assert) {
		var collector = new TestCollector();
		
		var suite = collector.beginSuite();

		var run = collector.currentRun;
		assert.equal(run != null, true);
		assert.deepEqual(run.suites, [suite]);
		
		assert.equal(suite.name, "Unknown Suite");
		assert.deepEqual(suite.tests, []);
		assert.equal(suite.total, 0);
		assert.equal(suite.failures, 0);
		assert.equal(suite.errors, 0);
		assert.equal(suite.start != null, true);
		assert.equal(suite.time, 0);
	});

	QUnit.test("endSuite()", function(assert) {
		var collector = new TestCollector();
		var suite = collector.beginSuite();
		collector.beginTest();
		collector.endTest();
		collector.endSuite({
			total : 12,
			failures : 4,
			errors : 2
		}); 
		
		assert.equal(suite.total, 12);
		assert.equal(suite.failures, 4);
		assert.equal(suite.errors, 2);
	});

	QUnit.test("endSuite() without data", function(assert) {
		var collector = new TestCollector();
		var suite = collector.beginSuite();
		fillCollectorWithTests(collector);
		collector.endSuite(); 
		
		assert.equal(suite.total, 6);
		assert.equal(suite.failures, 2);
		assert.equal(suite.errors, 3);
	});

	QUnit.test("beginTest()", function(assert) {
		var collector = new TestCollector();
		
		var run = collector.beginRun();
		var suite = collector.beginSuite();
		var test = collector.beginTest();

		assert.deepEqual(run.suites, [suite]);
		assert.deepEqual(suite.tests, [test]);
		
		assert.equal(test.name, "test()");
		assert.equal(test.failure, null);
		assert.equal(test.error, null);
		assert.equal(test.start != null, true);
		assert.equal(test.time, 0);
	});

	QUnit.test("beginTest() with config", function(assert) {
		var collector = new TestCollector();

		var run = collector.beginRun();
		var suite = collector.beginSuite();
		var test = collector.beginTest({
			name : "My Test",
			error : 123
		});

		assert.deepEqual(run.suites, [suite]);
		assert.deepEqual(suite.tests, [test]);
		
		assert.equal(test.name, "My Test");
		assert.equal(test.failure, null);
		assert.equal(test.error, 123);
		assert.equal(test.start != null, true);
		assert.equal(test.time, 0);
	});

	QUnit.test("beginTest() without suite", function(assert) {
		var collector = new TestCollector();

		var run = collector.beginRun();
		var test = collector.beginTest();

		var suite = collector.currentSuite;
		assert.equal(suite != null, true);
		assert.deepEqual(suite.tests, [test]);

		assert.equal(test.name, "test()");
		assert.equal(test.failure, null);
		assert.equal(test.error, null);
		assert.equal(test.start != null, true);
		assert.equal(test.time, 0);
	});

	QUnit.test("beginTest() without run", function(assert) {
		var collector = new TestCollector();

		var test = collector.beginTest();

		var suite = collector.currentSuite;
		assert.equal(suite != null, true);
		assert.deepEqual(suite.tests, [test]);

		var run = collector.currentRun;
		assert.deepEqual(run.suites, [suite]);

		assert.equal(test.name, "test()");
		assert.equal(test.failure, null);
		assert.equal(test.error, null);
		assert.equal(test.start != null, true);
		assert.equal(test.time, 0);
	});

	QUnit.test("endTest() as passing", function(assert) {
		var collector = new TestCollector();
		var test = collector.beginTest();
		collector.endTest();
		
		assert.equal(test.failure, null);
		assert.equal(test.error, null);
	});

	QUnit.test("endTest() as error", function(assert) {
		var collector = new TestCollector();
		var test = collector.beginTest();
		collector.endTest( {
			error : "NooOo!"
		});

		assert.equal(test.failure, null);
		assert.equal(test.error, "NooOo!");
	});

	QUnit.test("endTest() as failure", function(assert) {
		var collector = new TestCollector();
		var test = collector.beginTest();
		collector.endTest( {
			failure : "not ok"
		});

		assert.equal(test.failure, "not ok");
		assert.equal(test.error, null);
	});

});

function fillCollectorWithTests(collector) {
	collector.beginTest();
	collector.endTest();
	collector.beginTest();
	collector.endTest({"failure":"F"});
	collector.beginTest();
	collector.endTest({"failure":"F"});
	collector.beginTest();
	collector.endTest({"error":"E"});
	collector.beginTest();
	collector.endTest({"error":"E"});
	collector.beginTest();
	collector.endTest({"error":"E"});
}