var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toHtml({
	file : "example/output/export-junit.html", // exports directly to file
	callback : reportContent => {}, // callback function with report content
});