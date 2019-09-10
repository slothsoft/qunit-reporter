var TestCollector = require('../src/test-collector.js');

function createTestCollector(collector) {
	var collector = new TestCollector();
	
	collector.beginSuite({
		"name" : "Module A"
	});
	collector.beginTest({ "name" : "test10" });
	collector.endTest();
	collector.beginTest({ "name" : "test11" });
	collector.endTest();
	collector.endSuite();

	collector.beginSuite({
		"name" : "Module B"
	});
	collector.beginTest({ "name" : "test20" });
	collector.endTest();
	collector.endSuite();

	collector.beginSuite({
		"name" : "Module E"
	});
	collector.beginTest({ "name" : "test50" });
	collector.endTest({ "error" : "An exception was thrown!" });
	collector.endSuite();

	collector.beginSuite({
		"name" : "Module F"
	});
	collector.beginTest({ "name" : "test60" });
	collector.endTest({ "failure" : "expected: 5, actual: 'six'" });
	collector.endSuite();
	
	return collector;
}

module.exports = createTestCollector;