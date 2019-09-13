var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toCustomExport(function(run) {
	// this is a minimalistic report
	return (run.total - run.failures - run.errors) + " / " + run.total + " passed.";
}, {
	file : "example/output/export-custom.txt", // exports directly to file
	callback : reportContent => {}, // callback function with report content
});