var JUnitExport = require('../src/junit-export.js');
var xmlCompare = require('dom-compare').compare;
var DOMParser = require('xmldom').DOMParser;

const xmlHeader = "<?xml version='1.0'?>";

QUnit.module("junit-export", function() {

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
	assert.deepEqual(result._diff, [], "XML not equal: " + result._diff.map((a) => `${a.message}`).join(', '));
}
