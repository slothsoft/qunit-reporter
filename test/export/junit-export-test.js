var JUnitExport = require('../../src/export/junit-export.js');
var xmlCompare = require('dom-compare').compare;
var DOMParser = require('xmldom').DOMParser;

const xmlHeader = "<?xml version='1.0'?>";

QUnit.module("export.junit-export", function() {

	// we need to make sure oure XML tests will work else all other tests are
	// useless

	QUnit.test("assertXmlEqual()", function(assert) {
		assertXmlEqual(assert, "<xml/>", "<xml/>");
		assertXmlEqual(assert, "<abc c='1' b='2' a='3'>value</abc>",
				"<abc a='3' b='2' c='1'>value</abc>");
		assertXmlEqual(assert, "<whitespace    att=\"lol\" \t > value  \n</whitespace>",
				"<whitespace att='lol'>value</whitespace>");
	});

	// all other tests ;)

	QUnit.test("constructor()", function(assert) {
		var junitExport = new JUnitExport();

		assert.notEqual(junitExport, null);
		assert.notEqual(junitExport.xmlWriter, null);
	});
	
	QUnit.test("exportTest()", function(assert) {
		var junitExport = new JUnitExport();

		junitExport.xmlWriter.startDocument();
		junitExport.exportTest({
			name : "MyExportedTest",
			failure : null,
			error : null,
			start : new Date(),
			time : 1234
		});
		junitExport.xmlWriter.endDocument();
	 
	    assertXmlEqual(assert, junitExport.xmlWriter.toString(),
	    		xmlHeader + "<testcase name='MyExportedTest' time='1234'></testcase>");
	});

	QUnit.test("exportTest() with error", function(assert) {
		var junitExport = new JUnitExport();

		junitExport.xmlWriter.startDocument();
		junitExport.exportTest({
			name : "MyExportedError",
			error : "Error message!",
			time : 5678
		});
		junitExport.xmlWriter.endDocument();
		
	    assertXmlEqual(assert, junitExport.xmlWriter.toString(),
	    		xmlHeader + "<testcase name='MyExportedError' time='5678'><error message='Error message!'>Error message!</error></testcase>");
	});

	QUnit.test("exportTest() with failure", function(assert) {
		var junitExport = new JUnitExport();

		junitExport.xmlWriter.startDocument();
		junitExport.exportTest({
			name : "MyExportedFailure",
			failure : "Failure D:",
			time : 9000
		});
		junitExport.xmlWriter.endDocument();
	 
	    assertXmlEqual(assert, junitExport.xmlWriter.toString(),
	    		xmlHeader + "<testcase name='MyExportedFailure' time='9000'><failure message='Failure D:'>Failure D:</failure></testcase>");
	});
	
	QUnit.test("exportSuite()", function(assert) {
		var junitExport = new JUnitExport();

		junitExport.xmlWriter.startDocument();
		junitExport.exportSuite( {
			name : "MyExportedSuite",
			total : 1,
			failures : 3,
			errors : 4,
			time : 5678
		});
		junitExport.xmlWriter.endDocument();
	 
	    assertXmlEqual(assert, junitExport.xmlWriter.toString(),
	    		xmlHeader + "<testsuite tests='1' failures='3' name='MyExportedSuite' time='5678' errors='4'></testsuite>");
	});

	
	QUnit.test("exportSuite() with tests", function(assert) {
		var junitExport = new JUnitExport();

		junitExport.xmlWriter.startDocument();
		junitExport.exportSuite( {
			name : "MyExportedSuite",
			tests : [
				{ name : "MyTest1", time : 1234},
				{ name : "MyTest2", time : 5678},
			],
			total : 1,
			failures : 3,
			errors : 4,
			time : 9
		});
		junitExport.xmlWriter.endDocument();

	    assertXmlEqual(assert, junitExport.xmlWriter.toString(),
	    		xmlHeader + "<testsuite tests='1' failures='3' name='MyExportedSuite' time='9' errors='4'>" +
	    				"<testcase name='MyTest1' time='1234'></testcase>" +
	    				"<testcase name='MyTest2' time='5678'></testcase>" +
	    				"</testsuite>");
	});

	QUnit.test("exportRunToString()", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
			name : "MyExportedRun",
			total : 1,
			failures : 2,
			errors : 3,
			time : 456789
		});

	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='1' failures='2' name='MyExportedRun' time='456789' errors='3'></testsuites>");
	});

	QUnit.test("exportRunToString() fields null", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
			suites : [
				{
					tests : [
						{},
					],
				}
			],
		});

	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='0' failures='0' name='undefined' time='0' errors='0'>" +
	    				"<testsuite tests='0' failures='0' name='undefined' time='0' errors='0'>" +
	    				"<testcase name='undefined' time='0'></testcase>" +
	    				"</testsuite>" +
	    				"</testsuites>");
	});

	QUnit.test("exportRunToString() fields null 2", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
			suites : [
				{
				}
			],
		});

	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='0' failures='0' name='undefined' time='0' errors='0'>" +
	    				"<testsuite tests='0' failures='0' name='undefined' time='0' errors='0'>" +
	    				"</testsuite>" +
	    				"</testsuites>");
	});

	QUnit.test("exportRunToString() fields null 3", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
		});
		
	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='0' failures='0' name='undefined' time='0' errors='0'>" +
	    				"</testsuites>");
	});
	
	QUnit.test("exportRunToString() for null", function(assert) {
		var junitExport = new JUnitExport();

		assert.throws(() => hook.exportRunToString(run), "Run cannot be null!");
	});


	QUnit.test("exportRunToString() with suite", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
			name : "MyExportedRun",
			suites : [
				{
					name : "MyExportedSuite",
					total : 4,
					failures : 5,
					errors : 6,
					time : 7
				}
			],
			total : 1,
			failures : 2,
			errors : 3,
			time : 456789
		});
		
	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='1' failures='2' name='MyExportedRun' time='456789' errors='3'>" +
	    				"<testsuite tests='4' failures='5' name='MyExportedSuite' time='7' errors='6'></testsuite>" +
	    				"</testsuites>");
	});

	QUnit.test("exportRunToString() with suite and test", function(assert) {
		var junitExport = new JUnitExport();

		var result = junitExport.exportRunToString({
			name : "MyExportedRun",
			suites : [
				{
					name : "MyExportedSuite",
					tests : [
						{ name : "MyTest1", time : 1234},
						{ name : "MyTest2", time : 5678},
					],
					total : 4,
					failures : 5,
					errors : 6,
					time : 7
				}
			],
			total : 1,
			failures : 2,
			errors : 3,
			time : 456789
		});

	    assertXmlEqual(assert, result,
	    		xmlHeader + "<testsuites tests='1' failures='2' name='MyExportedRun' time='456789' errors='3'>" +
	    				"<testsuite tests='4' failures='5' name='MyExportedSuite' time='7' errors='6'>" +
	    				"<testcase name='MyTest1' time='1234'></testcase>" +
	    				"<testcase name='MyTest2' time='5678'></testcase>" +
	    				"</testsuite>" +
	    				"</testsuites>");
	});

});

function assertXmlEqual(assert, actual, expected) {
	var parser = new DOMParser({
		// http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
		errorHandler:function(level,msg){console.log(level,msg)}
	});
	var options = {
		stripSpaces : true,
		compareComments : false,
		collapseSpaces : true
	};
	var result = xmlCompare(parser.parseFromString(actual), parser.parseFromString(expected), options);
	assert.deepEqual(result._diff, [], "XML not equal: " + result._diff.map(a => a.message).join(', '));
}
