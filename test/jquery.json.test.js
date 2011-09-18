/**
 * Test suite for the jQuery JSON plugin. 
 */


// Utility function
function testToJSON( json, string, description ) {
	equal( $.toJSON( json ), string, description || '' );
}

module( 'jQuery.toJSON' );

test( 'Basic toJSON usage', function(){

	testToJSON(
		'hi',
		'"hi"',
		'Strings should be wrapped in double quotes'
	);
	testToJSON(
		{ apple: 2 },
		'{"apple":2}',
		'Objects'
	);
	testToJSON(
		{ apple: { apple: 2 } },
		'{"apple":{"apple":2}}',
		'Objects inside objects'
	);
	testToJSON(
		{ apple: 7, pear: 5 },
		'{"apple":7,"pear":5}',
		'Objects with multiple members should be separated by a comma'
	);
	testToJSON(
		2.5,
		'2.5',
		'Numbers with a decimal'
	);
	testToJSON(
		25,
		'25',
		'Number'
	);
	testToJSON(
		[2, 5],
		'[2,5]',
		'Array of numbers'
	);
	testToJSON(
		function() {},
		undefined,
		'Functions are not supported and should return undefined'
	);
	testToJSON(
		'C:\\A.TXT',
		'"C:\\\\A.TXT"',
		'Slashes should be double escaped' 
	);
	testToJSON(
		'C:\\B.TXT',
		'"C:\\\\B.TXT"',
		'Slashes should be double escaped' 
	);
	testToJSON(
		['C:\\A.TXT','C:\\B.TXT','C:\\C.TXT','C:\\D.TXT'],
		'["C:\\\\A.TXT","C:\\\\B.TXT","C:\\\\C.TXT","C:\\\\D.TXT"]',
		'Array of strings with slashes'
	);
	testToJSON(
		{'dDefault': '1.84467440737E+19'},
		'{"dDefault":"1.84467440737E+19"}',
		'Object with lower case key and value that should not be touched'
	);
	testToJSON(
		[0, false, function() {}],
		'[0,false,null]',
		'Resolve unsupported values (like functions) to null when encountered as object member values'
	);
	testToJSON(
		0,
		'0',
		'Zero is zero'
	);
	testToJSON(
		false,
		'false',
		'False is false'
	);
	testToJSON(
		null,
		'null',
		'null is null'
	);
	testToJSON(
		undefined,
		undefined,
		'undefined is not valid and should not return a string "undefined" but literally undefined'
	);

});

test( 'Dates', function(){

	// '1224892800000' is the Epoch timestamp of midnight October 25, 2008.
	// Using that instead of Date(2008,10,25) to avoid errors when the user
	// running the tests is not in a UTC +00:00 timezone (which is very likely)
	testToJSON(
		new Date( 1224892800000 ),
		'"2008-10-25T00:00:00.000Z"',
		'Check date handling, likely the browser itself'
	);


	// Test without the native version (if available)
	// So that we can test the fallback in $.toJSON
	var	dateToJson = Date.prototype.toJSON; // Keep a reference to the native one
	if ( dateToJson ) {
		delete Date.prototype.toJSON;
	}

	testToJSON(
		new Date(1224892800000),
		'"2008-10-25T00:00:00.000Z"',
		'Testing fallback, any native browser handling disabled' 
	);

	// Restore
	if ( dateToJson ) {
		Date.prototype.toJSON = dateToJson;
	}

	testToJSON(
		new Date(1224892800000),
		'"2008-10-25T00:00:00.000Z"',
		'Sanity check in case something screwed up' 
	);

});

test( 'Function arguments object', function(){

	function argTest( one, two, three ) {
		testToJSON(
			arguments,
			'{"0":"foo","1":"bar","2":"baz"}',
			'arguments, as instance of Arguments, should be treated as an object'
		);
	}

	argTest( 'foo', 'bar', 'baz' );

});

test( 'Undefined and null', function(){


	testToJSON(
		{ apple: undefined, pear: 5 },
		'{"pear":5}',
		'Objects with a member with value of type undefined should be removed'
	);
	testToJSON(
		[undefined, undefined, 1, 2],
		'[null,null,1,2]',
		'Resolve undefined to null when encountered as object member values'
	);


});
test( 'Prototype inheritance', function(){

    Object.prototype.AWESOME = 7;

    testToJSON(
        { apple: 2, key: 'value' },
        '{"apple":2,"key":"value"}',
        'Prototype values should not be included in the string'
    );

    // Since prototypes are highly dangerous,
    // make sure to remove it as soon as possible
    // Lots of code in jQuery will fail as it is
    // in the policy of jQuery that Object prototypes
    // are not supported.
    try {
        // Might fail in IE. Make sure to not let any exception
        // get out.
        delete Object.prototype.AWESOME;
    } catch(e){}

})
