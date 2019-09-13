# QUnit Reporter

[![MIT Licence](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/slothsoft/qunit-reporter.svg?branch=master)](https://travis-ci.org/slothsoft/qunit-reporter)

- **Author:** [Stef Schulz](mailto:s.schulz@slothsoft.de)
- **Repository:** <https://github.com/slothsoft/qunit-reporter>
- **Open Issues:** <https://github.com/slothsoft/qunit-reporter/issues>
- **Example:** <https://slothsoft.github.io/qunit-reporter/>

A module to generate reports from QUnit. Right now this module supports getting test data from multiple sources. Similarly it exports into different formats.

**Content of this file:**

- [Getting Started](#getting-started)
    - [Installing](#installing)
    - [Using the Framework](#using-the-framework)
- [Examples for Sources](#examples-for-sources)
    - [QUnit](#qunit)
- [Examples for Exports](#examples-for-exports)
    - [HTML](#html)
    - [JUnit](#junit)
    - [Log](#log)
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

You can generally chain multiple exports after each other like this:

```js
require("@slothsoft/qunit-reporter")
	.from<Source>(sourceConfig)
	.to<Export1>(exportConfig)
	.to<Export2>(exportConfig)
	.to<Export3>(exportConfig);
```



## Examples for Sources

### QUnit

- **Script File:** [JavaScript](example/source-qunit.js)
- **Output File:** [TXT](example/output/source-qunit.txt)

```js
<source-qunit>
```


### Custom Source

- **Script File:** [JavaScript](example/source-run.js)
- **Output File:** [TXT](example/output/source-run.xml)

```js
<source-run>
```



## Examples for Exports

All exports acknowledge the following parameters in their configuration:

- **`file`** - exports directly to file
- **`callback`** - callback function with report content


### HTML

Creates an HTML that can be displayed in any browser.

- **Script File:** [JavaScript](example/export-html.js)
- **Output File:** [HTML](example/output/export-html.html)
- **Live Example:** [qunit-reporter](https://slothsoft.github.io/qunit-reporter/)

```js
<export-html>
```


### JUnit

Creates standard JUnit XML that should be readable by every program that can handle JUnit as well.

- **Script File:** [JavaScript](example/export-junit.js)
- **Output File:** [XML](example/output/export-junit.xml)

```js
<export-junit>
```


### Log

Creates a log similar to what NodeJS does when executing the tests.

- **Script File:** [JavaScript](example/export-log.js)
- **Output File:** [TXT](example/output/export-log.txt)

```js
<export-log>
```


### Custom Export

Uses a function to export the run.

- **Script File:** [JavaScript](example/export-custom.js)
- **Output File:** [TXT](example/output/export-custom.txt)

```js
<export-custom>
```


##  Versions


| Version       | Info    |
| ------------- | ------- |
| [0.1.0](https://github.com/slothsoft/qunit-reporter/milestone/1?closed=1) | <ul><li>basic functionality</li><li>sources: QUnit</li><li>exports: JUnit, HTML</li></ul> |
   


## License

This project is licensed under the MIT License - see the [MIT license](LICENSE) for details.
