
module("About Asserts (topics/about_asserts.js)");

test("ok", function() {
    ok(2, 'what will satisfy the ok assertion?');
});

test("not", function() {
    not('', 'what is a false value?');
});

test("equals", function() {
    equals(1+1, '2', 'what will satisfy the equals assertion?');
});
