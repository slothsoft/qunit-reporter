
/**
* This class export data collected by a TestCollector into JUnit XML format.
* 
* @since 1.0.0
* @author Stef Schulz <s.schulz@slothsoft.de>
* @url https://github.com/slothsoft/qunit-reporter
*/

var XMLWriter = require('xml-writer');
 
class JUnitExport {

	constructor() {
		this.xmlWriter = new XMLWriter();
	}

	/**
	 * This method makes Runs that look like this:
	 * <testcase classname="de.slothsoft.mypackage.MyTest" name="testFailure" time="0.042">
	 * [optional] <failure message="expected:&lt;1&gt; but was:&lt;2&gt;" type="java.lang.AssertionError">java.lang.AssertionError</failure>
	 * [optional] <error message="This is an error." type="java.lang.IllegalArgumentException">java.lang.IllegalArgumentException: This is an error.</error>
	 * 
	 * @see TestCollector#beginRun for supported properties
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