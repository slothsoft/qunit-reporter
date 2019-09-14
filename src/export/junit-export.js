"use strict";

/**
 * This class exports a run into JUnit XML format.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

// TODO: some of the exported fields might be null / undefined
// TODO: "skipped" is obviously supported
// TODO: is there a way to make everything but exportRunToString() private?

var XMLWriter = require('xml-writer');
var Export = require('./export.js');
 
class JUnitExport extends Export {

	constructor() {
		super("JUnit");
		this.xmlWriter = new XMLWriter();
	}

	/**
	 * This method creates an XML that looks like this:
	 * <testsuite tests="8" failures="2" name="de.slothsoft.mypackage.MyTest" time="0.043" errors="1" skipped="0">
	 * [list] <testsuite></testsuite>
	 * </testsuite>
	 * 
	 * @see TestCollector#beginRun for supported properties
	 * @see JUnitExport#exportSuite for the inner test suite XML
	 */
	
	exportRunToString(run) {    
		if (run == null) throw "Run cannot be null!";
		this.xmlWriter.startDocument();
		this.startTestSuiteElement(run, 'testsuites');
		if (run.suites != null) {
			run.suites.forEach(suite => this.exportSuite(suite));
		}
		this.xmlWriter.endElement();
		this.xmlWriter.endDocument();
	   
		return this.xmlWriter.toString();
	}

	/**
	 * This method creates an XML that looks like this:
	 * <testsuite tests="8" failures="2" name="de.slothsoft.mypackage.MyTest" time="0.043" errors="1" skipped="0">
	 * [list] <testcase></testcase>
	 * </testsuite>
	 * 
	 * @see TestCollector#beginSuite for supported properties
	 * @see JUnitExport#exportTest for the test case XML
	 */
	
	exportSuite(suite) {    
		this.startTestSuiteElement(suite, 'testsuite');
		if (suite.tests != null) {
			suite.tests.forEach(test => this.exportTest(test));
		}
		this.xmlWriter.endElement();
	}

	startTestSuiteElement(suite, elementName) { 
		this.xmlWriter.startElement(elementName);
		this.xmlWriter.writeAttribute('name', suite.name);
		this.xmlWriter.writeAttribute('time', suite.time);
		this.xmlWriter.writeAttribute('tests', suite.total);
		this.xmlWriter.writeAttribute('failures', suite.failures);
		this.xmlWriter.writeAttribute('errors', suite.errors);
	}

	/**
	 * This method creates an XML that looks like this:
	 * <testcase classname="de.slothsoft.mypackage.MyTest" name="testFailure" time="0.042">
	 * [optional] <failure message="expected:&lt;1&gt; but was:&lt;2&gt;" type="java.lang.AssertionError">java.lang.AssertionError</failure>
	 * [optional] <error message="This is an error." type="java.lang.IllegalArgumentException">java.lang.IllegalArgumentException: This is an error.</error>
	 * </testcase>
	 * 
	 * @see TestCollector#beginTest for supported properties
	 */
		
	exportTest(test) {    
		this.xmlWriter.startElement('testcase');
		this.xmlWriter.writeAttribute('name', test.name);
		this.xmlWriter.writeAttribute('time', test.time);
		if (test.error != null) {
			this.xmlWriter.startElement('error');
			this.xmlWriter.writeAttribute('message', test.error);    
			this.xmlWriter.text(test.error);
			this.xmlWriter.endElement();
		}
		if (test.failure != null) {
			this.xmlWriter.startElement('failure');
			this.xmlWriter.writeAttribute('message', test.failure);    
			this.xmlWriter.text(test.failure);
			this.xmlWriter.endElement();
		}
		this.xmlWriter.endElement();
	}
}

module.exports = JUnitExport;