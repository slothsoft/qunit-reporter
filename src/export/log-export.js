
/**
 * This class exports a run into a log similar to what gets printed on the console when tests are run.
 * 
 * @since 1.0.0
 * @author Stef Schulz <s.schulz@slothsoft.de>
 * @url https://github.com/slothsoft/qunit-reporter
 */

// TODO: support skip and todo

var Export = require('./export.js');
 
class LogExport extends Export {

	constructor() {
		super("log");
	}

	exportRunToString(run) {    
		if (run == null) throw "Run cannot be null!";
		
		this.result = "";
		this.index = 1;
		
		if (run.suites != null) {
			run.suites.forEach(suite => this.exportSuite(suite));
		}
		this.result += "1.." + (this.index - 1) + "\n";
		this.result += "# pass " + (run.total - run.failures - run.errors) + "\n";
		this.result += "# skip 0\n";
		this.result += "# todo 0\n";
		this.result += "# fail " + (run.failures + run.errors) + "\n";
	   
		return this.result;
	}

	exportSuite(suite) {    
		if (suite.tests != null) {
			suite.tests.forEach(test => this.exportTest(suite.name, test));
		}
	}
		
	exportTest(suiteName, test) {  
		if (test.error || test.failure) {
			this.result += "not ";
		}
		this.result += "ok " + this.index + " " + suiteName + " > " + test.name +"\n";

		if (test.error || test.failure) {
			this.result += "  message: \"" + (test.error || test.failure) + "\"\n";
		}
		this.index++;
	}
}

module.exports = LogExport;