
/**
 * This class exports a run as an HTML file.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

// TODO: maybe all exports should know "encoding"
// TODO: maybe all exports should know how to fill default values in a config file

const Export = require('./export.js');
const JUnitExport = require('./junit-export.js');

const fs = require('fs');
const xsltProcessor = require('xslt-processor');
const encoding = 'utf-8';
 
class HtmlExport extends Export {

	constructor() {
		super("HTML");
		this.junitExport = new JUnitExport();
	}

	exportRunToString(run, config={}) {    
		if (run == null) throw "Run cannot be null!";
		
		var junitExport = this.junitExport.exportRunToString(run);
		var xsd = fs.readFileSync('./src/export/html-export.xsl', encoding);

		return xsltProcessor.xsltProcess(
						xsltProcessor.xmlParse(junitExport),
						xsltProcessor.xmlParse(xsd));
	}

	exportSuite(suite) {    
		if (suite.tests != null) {
			suite.tests.forEach(test => this.exportTest(suite.name, test));
		}
	}
		
	exportTest(suiteName, test) {  
		this.result += "ok " + this.index + " " + suiteName + " > " + test.name +"\n";
		
		this.index++;
	}
}

module.exports = HtmlExport;