// delete output folder

const fs = require('fs');
const path = require('path');

const directory = 'example/output/';

for (const file of fs.readdirSync(directory)) {
	fs.unlinkSync(path.join(directory, file));
}

// run all examples

require("./export-custom.js");
require("./export-html.js");
require("./export-junit.js");
require("./export-log.js");

require("./source-run.js");