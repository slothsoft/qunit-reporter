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

	constructor(displayName) {
		this.displayName = displayName;
	}

	exportRun(run, config) {    		
		if (config == null) return;
	
		var runAsString = this.exportRunToString(run, config);
		
		if (config.file) {
			this.exportRunToFile(runAsString, config.file);
		}
		if (config.callback) {
			config.callback(runAsString);
		}
	}
	
	exportRunToFile(runAsString, file) {   
		const fs = require('fs');
		const path = require('path');
		
		var parentDir = path.dirname(file);
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir);
		}
		
		fs.writeFileSync(file, runAsString, 'utf-8');
		console.log("Wrote " + this.displayName + " report to file: " + file);
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