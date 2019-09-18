"use strict";

/**
 * This class brings together the hook implementation with the exports. It is
 * called from the hook implementation (or is even extended by it) and delegates
 * to callbacks that should call the exports.
 * 
 * You need to override the following methods:
 * <ul>
 * <li>dispose()</li>
 * </ul>
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

class Hook {

	constructor() {
		this.run = null; 
		this.callbacks = [];
	}

	/**
	 * This method is called when the tests are finished and something needs to
	 * be done with the finished TestCollector.
	 * 
	 * @param run
	 */
	
	performFinish(run) {
		if (this.run != null) 
			throw "Run was already set!";
		if (run == null) 
			throw "Run cannot be null!";
		this.run = run;
		this.callbacks.forEach(callback => callback(this.run));
		return this;
	}
	
	addCallback(callback) {
		if (callback == null) 
			throw "Callback cannot be null!";
		if (typeof callback != "function") 
			throw "Callback must be a function!";

		if (this.run) {
			callback(this.run);
		}
		this.callbacks.push(callback);
		return this;
	}

	dispose() {    
		// nothing to do on default
	}
}

module.exports = Hook;