"use strict";

/**
 * This file is the entire API for the module. So it will hook all the
 * independent modules together. It should be the only file that knows every
 * implementation.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

/**
 * This class contains all hook implementations
 */

class FromHook {
	
	fromQUnit() {
		var QUnitHook = require("./hook/qunit-hook.js");
		return this.fromHook(new QUnitHook());
	}
	
	fromHook(hook) {
		return new ToExport(hook);
	}
	
	fromRun(run) {
		if (run == null) throw "Run cannot be null!";
		
		const Hook = require("./hook/hook.js");
		const hook = new Hook();
		hook.performFinish(run);
		return this.fromHook(hook);
	}
}

/**
 * This class contains all export implementations
 */

class ToExport {

	constructor(hook) {
		this.hook = hook;
	}
	
	toHtml(config) {
		return this.toExport(new (require("./export/html-export.js"))(), config);
	}
	
	toJUnit(config) {
		return this.toExport(new (require("./export/junit-export.js"))(), config);
	}

	toLog(config) {
		return this.toExport(new (require("./export/log-export.js"))(), config);
	}

	toCustomExport(exportRunToString, config) {
		const Export = require("./export/export.js");
		var myExport = new Export("custom");
		myExport.exportRunToString = exportRunToString;
		return this.toExport(myExport, config);
	}

	toExport(myExport, config) {
		this.hook.addCallback(run => myExport.exportRun(run, config));
		return this;
	}
}

/*
 * Export new instance so we can quickly start with "fromXyz()".
 */

module.exports = new FromHook();
