const QUnit = require("qunit");

QUnit.module("source-qunit", function() {
	QUnit.test("my first test", function(assert) {
		assert.equal(true, true);
	});
});

require("../src/index.js").fromQUnit().toLog({ file : "example/output/source-qunit.txt" });
