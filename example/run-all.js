// delete output folder

const fs = require('fs');
const path = require('path');

const directory = 'example/output/';

fs.readdir(directory, (err, files) => {
	if (err) throw err;

	for (const file of files) {
		if (file == "qunit-reporter-tests.xml")
			continue;
		fs.unlink(path.join(directory, file), err => {
			if (err) throw err;
		});
	}
});


// run all examples

require("./export-junit.js");