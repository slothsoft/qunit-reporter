QUnit.module("index", function() {
	
	QUnit.test("fromRun() for null", function(assert) {
		assert.throws(() => require("../src/index.js").fromRun(null), "Run cannot be null!");
	});
});

