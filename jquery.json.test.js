/** Tests **/

var tests_fail = 0;

function str(what) {
	if (what === null)
		return 'null';
	if (what === undefined)
		return 'undefined';
	return what.toString();
}

function _test(o, correct) {
	try { 
		var result = $.toJSON(o);
	} catch (e) { 
		if (e.name === correct.name) return; // For TypeError, etc
		tests_fail += 1;
		throw e;
	}

	if (result !== correct) {
		tests_fail += 1;
		throw new Error('Wanted: ' + str(correct) + ' -- Got: ' + str(result));
	}
}

// 'console' comes from FireBug
function testJSON(o, expected) {
	try { _test(o, expected); }
	catch (e) { console.error('Conversion Error:', e.message); }
	
	if (typeof JSON === 'object' && JSON.stringify) {
		var _stringify = JSON.stringify;
		JSON.stringify = null;
		
		try { _test(o, expected); }
		catch (e) { console.error('Manual Conversion Error:', e.message); }
		
		JSON.stringify = _stringify;
	}
}

console.log('Testing...');
testJSON('hi', '"hi"');
testJSON({apple: 2}, '{"apple":2}');
testJSON({apple: {apple: 2}}, '{"apple":{"apple":2}}');
testJSON(2.5, '2.5');
testJSON(25, '25');
testJSON([2, 5], '[2,5]');
testJSON(function() {}, undefined);
testJSON('C:\\A.TXT', '"C:\\\\A.TXT"');
testJSON('C:\\B.TXT', '"C:\\\\B.TXT"');
testJSON(['C:\\A.TXT','C:\\B.TXT','C:\\C.TXT','C:\\D.TXT'], '["C:\\\\A.TXT","C:\\\\B.TXT","C:\\\\C.TXT","C:\\\\D.TXT"]');
testJSON({'dDefault': '1.84467440737E+19'}, '{"dDefault":"1.84467440737E+19"}');
testJSON([undefined, undefined, 1, 2], '[null,null,1,2]');
testJSON([0, false, function() {}], '[0,false,null]');
testJSON(0, '0');
testJSON(false, 'false');
testJSON(null, 'null');
// '1224892800000' is the Epoch timestamp of midnight October 25, 2008.
testJSON(new Date(1224892800000), '"2008-10-25T00:00:00.000Z"');

// Temporarily remove Date's toJSON and JSON.stringify
dateToJSON = Date.prototype.toJSON;
Date.prototype.toJSON = null;
if (typeof JSON === 'object' && JSON.stringify) {
	jsonStringify = JSON.stringify;
	JSON.stringify = null;
}

testJSON(new Date(1224892800000), '"2008-10-25T00:00:00.000Z"');

// Restore Date's toJSON and JSON.stringify
Date.prototype.toJSON = dateToJSON;
if (typeof jsonStringify !== 'undefined')
	JSON.stringify = jsonStringify;

console.log('Done.');

$(function() {
	if (tests_fail > 0)
		$('h1 span').addClass('fail').empty().append('FAIL (' + tests_fail +')');
	else
		$('h1 span').addClass('passed').empty().append('PASSED');
});
