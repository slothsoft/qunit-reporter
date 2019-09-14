"use strict";

/**
 * This class has the basic export functions like exporting to string and file.
 * You need to override the following methods:
 * <ul>
 * <li>exportRunToString()</li>
 * </ul>
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

class Export {

	constructor(displayName, defaultConfig) {
		this.displayName = displayName;
		this.defaultConfig = {...{
			encoding : 'utf-8',
		}, ...defaultConfig};
	}

	exportRun(run, inputConfig) {    		
		if (inputConfig == null) return;
	
		var config = this.validateConfig(inputConfig);
		
		var runAsString = this.exportRunToString(run, config);
		
		if (config.file) {
			this.exportRunToFile(runAsString, config);
		}
		if (config.callback) {
			config.callback(runAsString);
		}
	}
	
	validateConfig(config) {
		return  {...this.defaultConfig, ...config};
	}
	
	exportRunToFile(runAsString, config) {   
		const fs = require('fs');
		const path = require('path');
		
		var parentDir = path.dirname(config.file);
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir);
		}
		
		fs.writeFileSync(config.file, runAsString, config.encoding);
		console.log("Wrote " + this.displayName + " report to file: " + config.file);
	}

	/**
	 * This method is just a stub used to remember which function to use for
	 * exporting.
	 */
	
	exportRunToString(run) {    
		throw "You need to override the exportRunToString(run) function!";
	}
}

module.exports = Export;