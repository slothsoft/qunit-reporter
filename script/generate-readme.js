
/**
 * This script takes the file "base-readme.md" and appends all the exercises at the tag "exercises".
 */

const fs = require('fs');
const encoding = 'utf8';

var replacements = createReplacements(['export-junit-report']);
copyReplace('script/base-readme.md', 'README.md', replacements);

function createReplacements(fileNames) {
	var result = [];
	
	fileNames.forEach(function(fileName) {
		fs.readFile('example/' + fileNames + '.js', encoding, function(err, fileContent) {
			if (err) {
				return console.log(err);
			}
			fileContent = fileContent.replace('(require("../test/demo-test-collector.js"))', 'createTestCollector');
			fileContent = fileContent.replace('require("../src/index.js")', 'require("qunit-reporter")');
			result['<' + fileName + '>'] = fileContent;
		});
	});
	return result;
}

function copyReplace(inputFile, outputFile, replacements) {
	fs.readFile(inputFile, encoding, function(err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data;
		if (replacements != null) {
			for (var key in replacements) {
				result = result.replace(key, replacements[key]);
			}
		}

		fs.writeFile(outputFile, result, encoding, function(err) {
			if (err)
				return console.log(err);
		});
	});
}