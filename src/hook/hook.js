
/**
 * This class brings together the hook implementation with the exports. It is
 * called from the hook implementation (or is even extended by it) and delegates
 * to callbacks that should call the exports.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

class Hook {

	constructor() {
		this.testCollector = null;
		this.callbacks = [];
	}

	/**
	 * This method is called when the tests are finished and something needs to
	 * be done with the finished TestCollector.
	 * 
	 * @param testCollector
	 */
	
	onFinish(testCollector) {
		if (this.testCollector != null) 
			throw "TestCollector was already set!";
		if (testCollector == null) 
			throw "TestCollector cannot be null!";
		this.testCollector = testCollector;
		this.callbacks.forEach(callback => callback(this.testCollector));
	}
	
	addCallback(callback) {
		if (callback == null) 
			throw "Callback cannot be null!";
		if (typeof callback != "function") 
			throw "Callback must be a function!";

		if (this.testCollector) {
			callback(this.testCollector);
		}
		this.callbacks.push(callback);
	}
}

module.exports = Hook;