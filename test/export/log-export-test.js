var LogExport = require('../../src/export/log-export.js');

QUnit.module("export.log-export", function() {

	QUnit.test("constructor()", function(assert) {
		var logExport = new LogExport();

		assert.notEqual(logExport, null);
	});

	QUnit.test("exportRunToString()", function(assert) {
		var logExport = new LogExport();

		var result = logExport.exportRunToString({
			name : "MyExportedRun",
			suites : [
				{
					name : "MyExportedSuite",
					tests : [
						{ name : "MyTest1", time : 1234},
						{ name : "MyTest2", time : 5678},
						{ name : "MyTest3", time : 5678, failure : "Failure."},
						{ name : "MyTest4", time : 5678, error : "ERROR!"},
						{ name : "MyTest5", time : 5678, error : "ERROR!"},
					],
				}
			],
			total : 5,
			failures : 1,
			errors : 2,
			time : 456789
		});

	    assert.equal(result,
	    		"ok 1 MyExportedSuite > MyTest1\n" + 
	    		"ok 2 MyExportedSuite > MyTest2\n" + 
	    		"not ok 3 MyExportedSuite > MyTest3\n  message: \"Failure.\"\n" + 
	    		"not ok 4 MyExportedSuite > MyTest4\n  message: \"ERROR!\"\n" + 
	    		"not ok 5 MyExportedSuite > MyTest5\n  message: \"ERROR!\"\n" + 
	    		"1..5\n" + 
	    		"# pass 2\n" + 
				"# skip 0\n" + 
				"# todo 0\n" + 
				"# fail 3\n");
	});

	QUnit.test("exportRunToString() fields null", function(assert) {
		var logExport = new LogExport();

		var result = logExport.exportRunToString({
			suites : [
				{
					tests : [
						{},
					],
				}
			],
		});

	    assert.equal(result,
	    		"ok 1 undefined > undefined\n" + 
	    		"1..1\n" + 
	    		"# pass 0\n" + 
				"# skip 0\n" + 
				"# todo 0\n" + 
				"# fail 0\n");
	});

	QUnit.test("exportRunToString() fields null 2", function(assert) {
		var logExport = new LogExport();

		var result = logExport.exportRunToString({
			suites : [
				{
				}
			],
		});

	    assert.equal(result,
	    		"0..0\n" + 
	    		"# pass 0\n" + 
				"# skip 0\n" + 
				"# todo 0\n" + 
				"# fail 0\n");
	});

	QUnit.test("exportRunToString() fields null 3", function(assert) {
		var logExport = new LogExport();

		var result = logExport.exportRunToString({
		});

	    assert.equal(result,
	    		"0..0\n" + 
	    		"# pass 0\n" + 
				"# skip 0\n" + 
				"# todo 0\n" + 
				"# fail 0\n");
	});

	QUnit.test("exportRunToString() for null", function(assert) {
		var logExport = new LogExport();

		assert.throws(() => hook.exportRunToString(run), "Run cannot be null!");
	});

});
