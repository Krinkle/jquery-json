/// Tests ///

var tests_fail = 0;

function _test(o, correct, compact)
{
    try { 
        var result = $.toJSON(o, compact);
    } catch (e) { 
        if (e.name === correct.name) return;   // For TypeError, etc
        tests_fail += 1;
        throw e;
    }

    if (result != correct) 
    {   
        tests_fail += 1;
        throw new Error("Wanted: " + correct.toString() + " -- Got: " + result.toString());
    }
}

// 'console' comes from FireBug
function testJSON(o, full, compact) {
    try { _test(o, full); }
    catch (e) { console.error("Conversion Error:", e.message) }
    
    if (compact == undefined) return;
    
    try { _test(o, compact, true); }
    catch (e) { console.error("Compact Conversion Error:", e.message) }
}

console.log("Testing...");
testJSON('hi', "\"hi\"");
testJSON({apple: 2}, "{\"apple\": 2}", "{\"apple\":2}");
testJSON({apple: {apple: 2}}, "{\"apple\": {\"apple\": 2}}", "{\"apple\":{\"apple\":2}}");
testJSON(2.5, "2.5");
testJSON(25, "25");
testJSON(new Date(2008, 9, 25), "2008-09-25");
testJSON([2, 5], "[2, 5]", "[2,5]");
testJSON(function() {}, TypeError);
console.log("Done.")

$(function()
{
    if (tests_fail > 0)
        $('h1 span').addClass('fail').empty().append("FAIL (" + tests_fail +")");
    else
        $('h1 span').addClass('passed').empty().append("PASSED");
})