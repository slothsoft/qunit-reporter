# QUnit Reporter

[![MIT Licence](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/slothsoft/qunit-reporter.svg?branch=master)](https://travis-ci.org/slothsoft/qunit-reporter)

- **Author:** [Stef Schulz](mailto:s.schulz@slothsoft.de)
- **Repository:** <https://github.com/slothsoft/qunit-reporter>
- **Open Issues:** <https://github.com/slothsoft/qunit-reporter/issues>

A module to generate reports from QUnit.

```js
// create a test collector somehow
var testCollector = createTestCollector();

var qunitReporter = require("qunit-reporter");
qunitReporter.fromTestCollector(testCollector).toJUnit({
	file : "example/export-junit-report.xml"
});
```