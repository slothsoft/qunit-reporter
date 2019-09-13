
/**
 * This script takes the file "base-readme.md" and appends all the exercises at the tag "exercises".
 */

const fs = require('fs');
const encoding = 'utf8';

var replacements = createReplacements([
	'export-custom', 'export-html', 'export-junit', 'export-log', 'source-qunit',
	'source-run'
]);
copyReplace('script/base-readme.md', 'README.md', replacements);

function createReplacements(fileNames) {
	var result = [];
	
	fileNames.forEach(function(fileName) {
		var fileContent = fs.readFileSync('example/' + fileName + '.js', encoding);
		fileContent = fileContent.replace('require("../test/demo-test-collector.js").', '');
		fileContent = fileContent.replace('require("../src/index.js")', 'require("qunit-reporter")');
		result['<' + fileName + '>'] = fileContent;
	});
	return result;
}

function copyReplace(inputFile, outputFile, replacements) {
	var data = fs.readFileSync(inputFile, encoding);

	var result = data;
	if (replacements != null) {
		for (var key in replacements) {
			result = result.replace(key, replacements[key]);
		}
	}

	fs.writeFileSync(outputFile, result, encoding);
}