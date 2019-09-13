const fs = require('fs');
const Export = require('../../src/export/export.js');
const targetDir = getRandomTargetDir();

class TestedExport extends Export {

	constructor() {
		super("TestedExport");
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
		testedExport.exportRunToFile("1", fileName);

		var fileContent = fs.readFileSync(fileName, 'utf-8');
		assert.equal(fileContent, "1");
	});

	QUnit.test("exportRunToFile() unknown directory", function(assert) {
		var fileName = getRandomTargetDir() +"run-to-file.txt";
		var testedExport = new TestedExport();
		testedExport.exportRunToFile("2", fileName);

		var fileContent = fs.readFileSync(fileName, 'utf-8');
		assert.equal(fileContent, "2");
	});

	QUnit.test("exportRun() with file", function(assert) {
		var run = require("../demo-test-collector.js").createRun();
		var fileName = targetDir + "exportRun with file.txt";
		
		var testedExport = new TestedExport();
		testedExport.exportRun(run, { file : fileName });

		var fileContent = fs.readFileSync(fileName, 'utf-8');
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
	
});

function getRandomTargetDir() {
	return "target/" + (Math.round(Math.random() * 9000000 + 1000000)) +"/";
}