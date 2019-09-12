var hook = require('../../src/hook/qunit-hook.js');

QUnit.module("qunit-hook", function() {
	QUnit.test("test this file doesn't break the build 😶", function(assert) {
		assert.notEqual(hook, null);
		assert.equal(typeof hook.onFinish, "function");
		assert.equal(typeof hook.addCallback, "function");
	});
});
