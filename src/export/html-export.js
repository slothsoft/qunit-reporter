"use strict";

/**
 * This class exports a run as an HTML file.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

const Export = require('./export.js');
const JUnitExport = require('./junit-export.js');

const fs = require('fs');
const path = require('path');
const xsltProcessor = require('xslt-processor');
 
class HtmlExport extends Export {

	constructor() {
		super("HTML");
		this.junitExport = new JUnitExport();
	}

	exportRunToString(run, inputConfig={}) {    
		if (run == null) throw "Run cannot be null!";

		var config = this.validateConfig(inputConfig);
		var xsl = config.xsl;

		if (xsl == null && config.xslFile != null) {
			xsl = fs.readFileSync(config.xslFile, config.encoding);
		}
		if (xsl == null) {
			xsl = fs.readFileSync(path.resolve(__dirname, './html-export.xsl'), config.encoding);
		}
		if (xsl == null) throw "XSL cannot be null!";

		xsl = xsl.replace("${encoding}", config.encoding);
		
		var junitExport = this.junitExport.exportRunToString(run);
		var html = xsltProcessor.xsltProcess(
						xsltProcessor.xmlParse(junitExport),
						xsltProcessor.xmlParse(xsl));
		var prefix = "<!DOCTYPE html>\n";
		return prefix + html;
	}
}

module.exports = HtmlExport;