const fs = require('fs');
const Export = require('../../src/export/export.js');

const targetDir = getRandomTargetDir();
const encoding = 'utf-8';

class TestedExport extends Export {

	constructor(config) {
		super("TestedExport", config);
	}

	exportRunToString(run) {    
		return "Hello World!";
	}
}


QUnit.module("export.export", function() {

	QUnit.test("constructor()", function(assert) {
		var testedExport = new TestedExport();

		assert.notEqual(testedExport, null);
		assert.equal(testedExport.displayName, "TestedExport");
	});

	QUnit.test("exportRunToString()", function(assert) {
		var testedExport = new TestedExport();

		assert.equal(testedExport.exportRunToString(), "Hello World!");
	});

	QUnit.test("exportRunToFile()", function(assert) {
		var fileName = "target/run-to-file.txt";
		var testedExport = new TestedExport();
		testedExport.exportRunToFile("1", { file : fileName });

		var fileContent = fs.readFileSync(fileName, encoding);
		assert.equal(fileContent, "1");
	});

	QUnit.test("exportRunToFile() unknown directory", function(assert) {
		var fileName = getRandomTargetDir() +"run-to-file.txt";
		var testedExport = new TestedExport();
		testedExport.exportRunToFile("2",  { file : fileName });

		var fileContent = fs.readFileSync(fileName, encoding);
		assert.equal(fileContent, "2");
	});

	QUnit.test("exportRun() with file", function(assert) {
		var run = require("../demo-test-collector.js").createRun();
		var fileName = targetDir + "exportRun with file.txt";
		
		var testedExport = new TestedExport();
		testedExport.exportRun(run, { file : fileName });

		var fileContent = fs.readFileSync(fileName, encoding);
		assert.equal(fileContent, "Hello World!");
	});

	QUnit.test("exportRun() with file", function(assert) {
		var run = require("../demo-test-collector.js").createRun();
		var fileName = targetDir + "exportRun with file.txt";
		
		var callbackContent = null;
		var testedExport = new TestedExport();
		testedExport.exportRun(run, { 
			callback : content => callbackContent = content
		});

		assert.equal(callbackContent, "Hello World!");
	});

	QUnit.test("exportRun() with encoding", function(assert) {
		var run = require("../demo-test-collector.js").createRun();
		var fileName = targetDir + "exportRun with file.txt";
		
		var testedExport = new TestedExport();
		testedExport.exportRun(run, { file : fileName, encoding : 'utf-16le' });

		var fileContent = fs.readFileSync(fileName, encoding);
		assert.equal(fileContent, "H\u0000e\u0000l\u0000l\u0000o\u0000 \u0000W\u0000o\u0000r\u0000l\u0000d\u0000!\u0000");
	});

	QUnit.test("defaultConfig with encoding", function(assert) {
		var testedExport = new TestedExport();

		assert.notEqual(testedExport.defaultConfig, null);
		assert.equal(testedExport.defaultConfig.encoding, encoding);
	});

	QUnit.test("defaultConfig set encoding", function(assert) {
		var testedExport = new TestedExport({ encoding : 'encoding' });

		assert.notEqual(testedExport.defaultConfig, null);
		assert.equal(testedExport.defaultConfig.encoding, 'encoding');
	});

	QUnit.test("validateConfig() with encoding", function(assert) {
		var testedExport = new TestedExport();
		var config = testedExport.validateConfig();
		
		assert.notEqual(config, null);
		assert.equal(config.encoding, encoding);
	});

	QUnit.test("validateConfig() set encoding", function(assert) {
		var testedExport = new TestedExport({ encoding : 'encoding' });
		var config = testedExport.validateConfig();
		
		assert.notEqual(config, null);
		assert.equal(config.encoding, 'encoding');
	});
});

function getRandomTargetDir() {
	return "target/" + (Math.round(Math.random() * 9000000 + 1000000)) +"/";
}