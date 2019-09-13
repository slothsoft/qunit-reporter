const QUnit = require("qunit");

QUnit.module("Module A", function() {
	QUnit.test("test10", function(assert) {
		assert.equal(true, true);
	});
	QUnit.test("test11", function(assert) {
		assert.equal(true, true);
	});
});

QUnit.module("Module B", function() {
	QUnit.test("test20", function(assert) {
		assert.equal(true, true);
	});
});

QUnit.module("Module E", function() {
	QUnit.test("test50", function(assert) {
		throw "An exception was thrown!";
	});
});

QUnit.module("Module F", function() {
	QUnit.test("test60", function(assert) {
		assert.equal('six', 5);
	});
});