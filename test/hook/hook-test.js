const Hook = require('../../src/hook/hook.js');
const createRun = require('../demo-test-collector.js').createRun;

QUnit.module("hook.hook", function() {
	QUnit.test("constructor()", function(assert) {
		var hook = new Hook();
		
		assert.equal(hook.run, null);
		assert.deepEqual(hook.callbacks, []);
	});
	
	QUnit.test("performFinish() then addCallback()", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		var callbackCalled = false;
		var callbackRun = null;
		var test = "test";
		
		hook.performFinish(run);
		hook.addCallback(tc => {
			callbackCalled = true;
			callbackRun = tc;
		});
		
		assert.equal(callbackCalled, true);
		assert.deepEqual(callbackRun, run);
	});

	QUnit.test("addCallback() then performFinish()", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		var callbackCalled = false;
		var callbackRun = null;
		
		hook.addCallback(tc => {
			callbackCalled = true;
			callbackRun = tc;
		});
		hook.performFinish(run);
		
		assert.equal(callbackCalled, true);
		assert.deepEqual(callbackRun, run);
	});

	QUnit.test("performFinish() then addCallback(2)", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		hook.performFinish(run);

		var callbackCalled1 = false;
		var callbackRun1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackRun1 = tc;
		});

		var callbackCalled2 = false;
		var callbackRun2 = null;
		
		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackRun2 = tc;
		});
		
		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackRun1, run);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackRun2, run);
	});

	QUnit.test("addCallback(2) then performFinish()", function(assert) {
		var hook = new Hook();
		var run = createRun();

		var callbackCalled1 = false;
		var callbackRun1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackRun1 = tc;
		});

		var callbackCalled2 = false;
		var callbackRun2 = null;
		
		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackRun2 = tc;
		});
		
		hook.performFinish(run);

		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackRun1, run);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackRun2, run);
	});

	QUnit.test("addCallback() then performFinish() then addCallback()", function(assert) {
		var hook = new Hook();
		var run = createRun();

		var callbackCalled1 = false;
		var callbackRun1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackRun1 = tc;
		});

		hook.performFinish(run);
		
		var callbackCalled2 = false;
		var callbackRun2 = null;

		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackRun2 = tc;
		});

		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackRun1, run);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackRun2, run);
	});

	QUnit.test("performFinish(2)", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		hook.performFinish(run);

		assert.throws(() => hook.performFinish(run), "Run was already set!");
	});

	QUnit.test("performFinish() for null", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		assert.throws(() => hook.performFinish(null), "Run cannot be null!");
	});

	QUnit.test("addCallback() for null", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		assert.throws(() => hook.addCallback(null), "Callback cannot be null!");
	});

	QUnit.test("addCallback() for null", function(assert) {
		var hook = new Hook();
		var run = createRun();
		
		assert.throws(() => hook.addCallback(5), "Callback must be a function!");
	});
});
