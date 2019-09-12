const Hook = require('../../src/hook/hook.js');
const createTestCollector = require('../demo-test-collector.js');

QUnit.module("hook", function() {
	QUnit.test("constructor()", function(assert) {
		var hook = new Hook();
		
		assert.equal(hook.testCollector, null);
		assert.deepEqual(hook.callbacks, []);
	});
	
	QUnit.test("onFinish() then addCallback()", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		var callbackCalled = false;
		var callbackTestCollector = null;
		var test = "test";
		
		hook.onFinish(testCollector);
		hook.addCallback(tc => {
			callbackCalled = true;
			callbackTestCollector = tc;
		});
		
		assert.equal(callbackCalled, true);
		assert.deepEqual(callbackTestCollector, testCollector);
	});

	QUnit.test("addCallback() then onFinish()", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		var callbackCalled = false;
		var callbackTestCollector = null;
		
		hook.addCallback(tc => {
			callbackCalled = true;
			callbackTestCollector = tc;
		});
		hook.onFinish(testCollector);
		
		assert.equal(callbackCalled, true);
		assert.deepEqual(callbackTestCollector, testCollector);
	});

	QUnit.test("onFinish() then addCallback(2)", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		hook.onFinish(testCollector);

		var callbackCalled1 = false;
		var callbackTestCollector1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackTestCollector1 = tc;
		});

		var callbackCalled2 = false;
		var callbackTestCollector2 = null;
		
		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackTestCollector2 = tc;
		});
		
		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackTestCollector1, testCollector);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackTestCollector2, testCollector);
	});

	QUnit.test("addCallback(2) then onFinish()", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();

		var callbackCalled1 = false;
		var callbackTestCollector1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackTestCollector1 = tc;
		});

		var callbackCalled2 = false;
		var callbackTestCollector2 = null;
		
		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackTestCollector2 = tc;
		});
		
		hook.onFinish(testCollector);

		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackTestCollector1, testCollector);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackTestCollector2, testCollector);
	});

	QUnit.test("addCallback() then onFinish() then addCallback()", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();

		var callbackCalled1 = false;
		var callbackTestCollector1 = null;
		
		hook.addCallback(tc => {
			callbackCalled1 = true;
			callbackTestCollector1 = tc;
		});

		hook.onFinish(testCollector);
		
		var callbackCalled2 = false;
		var callbackTestCollector2 = null;

		hook.addCallback(tc => {
			callbackCalled2 = true;
			callbackTestCollector2 = tc;
		});

		assert.equal(callbackCalled1, true);
		assert.deepEqual(callbackTestCollector1, testCollector);
		assert.equal(callbackCalled2, true);
		assert.deepEqual(callbackTestCollector2, testCollector);
	});

	QUnit.test("onFinish(2)", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		hook.onFinish(testCollector);

		assert.throws(() => hook.onFinish(testCollector), "TestCollector was already set!");
	});

	QUnit.test("onFinish() for null", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		assert.throws(() => hook.onFinish(null), "TestCollector cannot be null!");
	});

	QUnit.test("addCallback() for null", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		assert.throws(() => hook.addCallback(null), "Callback cannot be null!");
	});

	QUnit.test("addCallback() for null", function(assert) {
		var hook = new Hook();
		var testCollector = createTestCollector();
		
		assert.throws(() => hook.addCallback(5), "Callback must be a function!");
	});
});
