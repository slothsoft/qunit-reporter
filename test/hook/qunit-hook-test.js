const { test } = QUnit;
var QUnitHook = require('../../src/hook/qunit-hook.js');


QUnit.module("hook.qunit-hook", function(hooks) {

	var hook = new QUnitHook();

	hooks.after(assert => {
		hook.dispose();
	});

	QUnit.test("test this file doesn't break the build 😶", function(assert) {
		assert.notEqual(hook, null);
		assert.equal(typeof hook.performFinish, "function");
		assert.equal(typeof hook.addCallback, "function");
	});
});