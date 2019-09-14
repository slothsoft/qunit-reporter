var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toHtml({
	file : "example/output/export-html-custom.txt", // export to file
	xslFile : "example/export-html-custom.xsl", // path to XSL file
});