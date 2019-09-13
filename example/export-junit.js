var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toJUnit({
	file : "example/output/export-junit.xml", // exports directly to file
	callback : reportContent => {}, // callback function with report content
});