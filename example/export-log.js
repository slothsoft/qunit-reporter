var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toLog({
	file : "example/output/export-log.txt", // exports directly to file
	callback : reportContent => {}, // callback function with report content
	encoding : 'utf-8', // the encoding of the exported file
});