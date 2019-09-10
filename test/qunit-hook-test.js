require('../src/qunit-hook.js');

QUnit.module("qunit-hook", function() {
	QUnit.test("test this file doesn't break the build 😶", function(assert) {
		assert.equal(true, true);
	});
});
