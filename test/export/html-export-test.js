var HtmlExport = require('../../src/export/html-export.js');

QUnit.module("export.html-export", function() {

	QUnit.test("constructor()", function(assert) {
		var htmlExport = new HtmlExport();

		assert.notEqual(htmlExport, null);
	});

	QUnit.test("exportRunToString()", function(assert) {
		var htmlExport = new HtmlExport();

		var run = require("../demo-test-collector.js").createRun();
		var result = htmlExport.exportRunToString(run);

	    assert.notEqual(result, null);
	});

	QUnit.test("exportRunToString() for null", function(assert) {
		var htmlExport = new HtmlExport();

		assert.throws(() => hook.exportRunToString(run), "Run cannot be null!");
	});

});
