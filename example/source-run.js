var run = {
	name : "Run",
	suites : [
		{
			name : "source-run",
			tests : [
				{ name : "Test 1", time : 123},
				{ name : "Test 2", time : 456, error : "Error"},
				{ name : "Test 3", time : 789, failure : "Failure"},
			],
		}
	],
	total : 3,
	failures : 1,
	errors : 1,
	tile : 1368
};

require("../src/index.js").fromRun(run).toLog({ file : "example/output/source-run.txt" });
