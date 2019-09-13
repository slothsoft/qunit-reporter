var TestCollector = require('../src/test-collector.js');

function createTestCollector() {
	var collector = new TestCollector();
	
	collector.beginSuite({
		name : "Module A"
	});
	collector.beginTest({ name : "test10" });
	collector.endTest({ time  : 1 });
	collector.beginTest({ name : "test11" });
	collector.endTest({ time  : 2 });
	collector.endSuite();

	collector.beginSuite({
		name : "Module B"
	});
	collector.beginTest({ name : "test20" });
	collector.endTest({ time  : 3 });
	collector.endSuite();

	collector.beginSuite({
		name : "Module E"
	});
	collector.beginTest({ name : "test50" });
	collector.endTest({ error : "An exception was thrown!", time  : 4 });
	collector.endSuite();

	collector.beginSuite({
		name : "Module F"
	});
	collector.beginTest({ name : "test60" });
	collector.endTest({ failure : "expected: 5, actual: 'six'", time  : 5 });
	collector.endSuite();

	collector.endRun();
	
	return collector;
}

function createRun() {
	var run = createTestCollector().currentRun;
	if (run == null) throw "Run should not be null here?!";
	return run;
}

module.exports.createTestCollector = createTestCollector;
module.exports.createRun = createRun;