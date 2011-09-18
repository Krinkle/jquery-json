/**
 * Test suite for the jQuery JSON plugin. 
 */


// Utility function
function equalJSON( json, string, description ) {
	equal( $.toJSON( json ), string, description || '' );
}

module( 'jQuery.toJSON' );

test( 'Basic toJSON usage', function(){

	equalJSON(
		'hi',
		'"hi"',
		'Strings should be wrapped in double quotes'
	);
	equalJSON(
		{ apple: 2 },
		'{"apple":2}',
		'Objects'
	);
	equalJSON(
		{ apple: { apple: 2 } },
		'{"apple":{"apple":2}}',
		'Objects inside objects'
	);
	equalJSON(
		2.5,
		'2.5',
		'Numbers with a decimal'
	);
	equalJSON(
		25,
		'25',
		'Number'
	);
	equalJSON(
		[2, 5],
		'[2,5]',
		'Array of numbers'
	);
	equalJSON(
		function() {},
		undefined,
		'Functions are not supported and should return undefined'
	);
	equalJSON(
		'C:\\A.TXT',
		'"C:\\\\A.TXT"',
		'Slashes should be double escaped' 
	);
	equalJSON(
		'C:\\B.TXT',
		'"C:\\\\B.TXT"',
		'Slashes should be double escaped' 
	);
	equalJSON(
		['C:\\A.TXT','C:\\B.TXT','C:\\C.TXT','C:\\D.TXT'],
		'["C:\\\\A.TXT","C:\\\\B.TXT","C:\\\\C.TXT","C:\\\\D.TXT"]',
		'Array of strings with slashes'
	);
	equalJSON(
		{'dDefault': '1.84467440737E+19'},
		'{"dDefault":"1.84467440737E+19"}',
		'Object with lower case key and value that should not be touched'
	);
	equalJSON(
		[undefined, undefined, 1, 2],
		'[null,null,1,2]',
		'Resolve undefined to null when encountered as object member values'
	);
	equalJSON(
		[0, false, function() {}],
		'[0,false,null]',
		'Resolve unsupported values (like functions) to null when encountered as object member values'
	);
	equalJSON(
		0,
		'0',
		'Zero is zero'
	);
	equalJSON(
		false,
		'false',
		'False is false'
	);
	equalJSON(
		null,
		'null',
		'null is null'
	);

});

test( 'Dates', function(){

	// '1224892800000' is the Epoch timestamp of midnight October 25, 2008.
	// Using that instead of Date(2008,10,25) to avoid errors when the user
	// running the tests is not in a UTC +00:00 timezone (which is very likely)
	equalJSON(
		new Date( 1224892800000 ),
		'"2008-10-25T00:00:00.000Z"',
		'Check date handling, likely the browser itself'
	);


	// Temporarily remove Date's toJSON and JSON.stringify
	// So that we can test the fallback handler in jQuery.toJSON
	var	dateToJson = Date.prototype.toJSON,
		jsonStringify = null;
	Date.prototype.toJSON = null;

	if ( typeof JSON === 'object' && JSON.stringify ) {
		var jsonStringify = JSON.stringify;
		JSON.stringify = null;
	}

	equalJSON(
		new Date(1224892800000),
		'"2008-10-25T00:00:00.000Z"',
		'Testing fallback, any native browser handling disabled' 
	);

	// Restore
	Date.prototype.toJSON = dateToJson;
	if ( jsonStringify ) {
		JSON.stringify = jsonStringify;
	}

	equalJSON(
		new Date(1224892800000),
		'"2008-10-25T00:00:00.000Z"',
		'Sanity check in case something screwed up' 
	);

});

test( 'Function arguments object', function(){

	function argTest( one, two, three ) {
		equalJSON(
			arguments,
			'{"0":"foo","1":"bar","2":"baz"}',
			'arguments, as instance of Arguments, should be treated as an object'
		);
	}

	argTest( 'foo', 'bar', 'baz' );

})
