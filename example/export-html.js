var run = require("../test/demo-test-collector.js").createRun();

require("../src/index.js").fromRun(run).toHtml({
	file : "example/output/export-html.html", // exports directly to file
	callback : reportContent => {}, // callback function with report content
	xsl : null, // XSL that converts to HTML (or whatever you like)
	xslFile : null, // path to XSL file that converts to HTML
});