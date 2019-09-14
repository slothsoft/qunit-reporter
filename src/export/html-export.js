"use strict";

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
const path = require('path');
const xsltProcessor = require('xslt-processor');
const encoding = 'utf-8';
 
class HtmlExport extends Export {

	constructor() {
		super("HTML");
		this.junitExport = new JUnitExport();
	}

	exportRunToString(run, config={}) {    
		if (run == null) throw "Run cannot be null!";

		var xsl = config.xsl;

		if (xsl == null && config.xslFile != null) {
			xsl = fs.readFileSync(config.xslFile, encoding);
		}
		if (xsl == null) {
			xsl = fs.readFileSync(path.resolve(__dirname, './html-export.xsl'), encoding);
		}
		
		var junitExport = this.junitExport.exportRunToString(run);
		return xsltProcessor.xsltProcess(
						xsltProcessor.xmlParse(junitExport),
						xsltProcessor.xmlParse(xsl));
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