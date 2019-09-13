# QUnit Reporter

[![MIT Licence](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/slothsoft/qunit-reporter.svg?branch=master)](https://travis-ci.org/slothsoft/qunit-reporter)

- **Author:** [Stef Schulz](mailto:s.schulz@slothsoft.de)
- **Repository:** <https://github.com/slothsoft/qunit-reporter>
- **Open Issues:** <https://github.com/slothsoft/qunit-reporter/issues>

A module to generate reports from QUnit. Right now this module supports getting test data from multiple sources. Similarly it exports into different formats.

**Sources:**
- general run object (see _[test-collector.js](src/test-collector.js)_)
- QUnit
- implementation of [Hook](src/hook/hook.js)

**Exports:**
- JUnit XML format
- implementation of [Export](src/export/export.js)



**Content of this file:**

- [Getting Started](#getting-started)
    - [Installing](#installing)
    - [Using the Framework](#using-the-framework)
    - [Examples for Sources](#examples-for-sources)
    - [Examples for Exports](#examples-for-exports)
- [Versions](#versions)
- [License](#license)



## Getting Started

### Installing

This module can be found in the npm software registry:

```
npm install @slothsoft/qunit-reporter --save
```



### Using the Framework

Creating a test report consists of two parts:

1. Collecting the test results 
1. Exporting the collected results

The general API to mix and match both parts is:

```js
var sourceConfig = {};
var exportConfig = {};

require("@slothsoft/qunit-reporter")
	.from<Source>(sourceConfig)
	.to<Export>(exportConfig);
```


### Examples for Sources

#### QUnit

- **Script File:** [JavaScript](example/source-qunit.js)
- **Output File:** [XML](example/output/source-qunit.xml)

```js
const QUnit = require("qunit");

QUnit.module("source-qunit", function() {
	QUnit.test("my first test", function(assert) {
		assert.equal(true, true);
	});
});

require("qunit-reporter").fromQUnit().toJUnit({
	file : "example/output/source-qunit.xml"
});

```



### Examples for Exports

All exports acknowledge the following parameters in their configuration:

- **`file`** - exports directly to file
- **`callback`** - callback function with report content


#### JUnit

- **Script File:** [JavaScript](example/export-junit.js)
- **Output File:** [XML](example/output/export-junit.xml)

```js
var run = createRun();

require("qunit-reporter").fromRun(run).toJUnit({
	file : "example/output/export-junit.xml", // exports directly to file
	callback : reportContent => {}, // callback function with report content
});
```


##  Versions


| Version       | Info    |
| ------------- | ------- |
| [1.0.0](https://github.com/slothsoft/qunit-reporter/milestone/1?closed=1) | <ul><li>stable functionality</li><li>JUnit XML report</li><li>HTML report (with customizable XSL)</li></ul> |
| [0.1.0](https://github.com/slothsoft/qunit-reporter/milestone/1?closed=1) | <ul><li>basic functionality</li><li>JUnit XML report</li></ul> |
   


## License

This project is licensed under the MIT License - see the [MIT license](LICENSE) for details.
