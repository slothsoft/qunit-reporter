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

	QUnit.test("exportRunToString() with XSL", function(assert) {
		var htmlExport = new HtmlExport();

		var run = require("../demo-test-collector.js").createRun();
		var result = htmlExport.exportRunToString(run, {
			xsl :  `<xsl:for-each select="testsuites">
						<xsl:for-each select="testsuite">
							<xsl:for-each select="testcase"><xsl:value-of select="@name" />|</xsl:for-each>
						</xsl:for-each>
					</xsl:for-each>`
		});


	    assert.equal(result, "<!DOCTYPE html>\n" +
	    		"test10|test11|test20|test50|test60|");
	});

	QUnit.test("exportRunToString() with XSL file", function(assert) {
		var htmlExport = new HtmlExport();

		var run = require("../demo-test-collector.js").createRun();
		var result = htmlExport.exportRunToString(run, {
			xslFile :  "./test/export/short-report.xsl"
		});

	    assert.equal(result, "<!DOCTYPE html>\n" +
	    		"test10|test11|test20|test50|test60|");
	});

	QUnit.test("exportRunToString() fields null", function(assert) {
		var htmlExport = new HtmlExport();

		var result = htmlExport.exportRunToString({
			suites : [
				{
					tests : [
						{},
					],
				}
			],
		});

	    assert.notEqual(result, null);
	});

	QUnit.test("exportRunToString() fields null 2", function(assert) {
		var htmlExport = new HtmlExport();

		var result = htmlExport.exportRunToString({
			suites : [
				{
				}
			],
		});

	    assert.notEqual(result, null);
	});

	QUnit.test("exportRunToString() fields null 3", function(assert) {
		var htmlExport = new HtmlExport();

		var result = htmlExport.exportRunToString({
		});

	    assert.notEqual(result, null);
	});
	
	QUnit.test("exportRunToString() for null", function(assert) {
		var htmlExport = new HtmlExport();

		assert.throws(() => hook.exportRunToString(run), "Run cannot be null!");
	});

});
