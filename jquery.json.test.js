/// Tests ///

var tests_passed = true;

// 'console' comes from FireBug
function testJSON(o, full, compact) {
    if (compact == undefined)
        compact = full;
    try { 
        var full_result = $.toJSON(o);
    } catch (e) { 
        if (e.name === full.name) return;   // For TypeError, etc
        return console.error(e, o); }
    try {
        var compact_result = $.compactJSON(o);
    } catch (e) { 
        if (e.name === compact.name) return;   // For TypeError, etc
        return console.error(e, o); }
    if (full_result != full) 
    {   console.error("Conversion Error: %s != %s", full_result, full);
        tests_passed = false;    }
    if (compact_result != compact) 
    {   console.error("Compact Conversion Error: %s != %s", compact_result, compact);
        tests_passed = false;    }
}

console.log("Testing...");
testJSON('hi', "\"hi\"");
testJSON({apple: 2}, "{\"apple\": 2}", "{\"apple\":2}");
testJSON({apple: {apple: 2}}, "{\"apple\": {\"apple\": 2}}", "{\"apple\":{\"apple\":2}}");
testJSON(2.5, "2.5");
testJSON(25, "25");
testJSON([2, 5], "[2, 5]", "[2,5]");
testJSON(function() {}, TypeError);
console.log("Done.")

$(function()
{
    if (tests_passed)
        $('h1').addClass('passed').append(' PASSED');
    else
        $('h1').addClass('fail').append(' FAIL');
})