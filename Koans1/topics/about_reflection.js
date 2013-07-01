module("About Reflection (topics/about_reflection.js)");

var A = function() {
    this.aprop = "A";    
};

var B = function() {
    this.bprop = "B";
};

B.prototype = new A();

test("typeof", function() {
    equals(typeof({}), 'object', 'what is the type of an empty object?');
    equals(typeof('apple'), 'string', 'what is the type of a string?');
    equals(typeof(-5), 'number', 'what is the type of -5?');
    equals(typeof(false), 'boolean', 'what is the type of false?');
});

test("property enumeration", function() {
    var keys = [];
    var values = [];
    var person = {name: 'Amory Blaine', age: 102, unemployed: true};
    for(propertyName in person) {
        keys.push(propertyName);
        values.push(person[propertyName]);
    }
    ok(keys.equalTo(['name','age','unemployed']), 'what are the property names of the object?');
    ok(values.equalTo(['Amory Blaine',102,true]), 'what are the property values of the object?');
});

test("hasOwnProperty", function() {
    var b = new B();

    var keys = [];
    for (propertyName in b) {
        keys.push(propertyName);
    }
    equals(keys.length, 2, 'how many elements are in the keys array?');
    deepEqual(keys, ['bprop', 'aprop'], 'what are the properties of the array?');

    // hasOwnProperty returns true if the parameter is a property directly on the object, 
    // but not if it is a property accessible via the prototype chain.
    var ownKeys = [];
    for(propertyName in b) {
        if (b.hasOwnProperty(propertyName)) {
            ownKeys.push(propertyName);
        }
    }
    equals(ownKeys.length, 1, 'how many elements are in the ownKeys array?');
    deepEqual(ownKeys, ['bprop'], 'what are the own properties of the array?');
});

test("constructor property", function () {
    var a = new A();
    var b = new B();
    equals(typeof(a.constructor), 'function', "what is the type of a's constructor?");
    equals(a.constructor.name, '', "what is the name of a's constructor?");
    equals(b.constructor.name, '', "what is the name of b's constructor?");

    var C = function C(name) {this.name = name};
    var c = new C("jonas");
    equals(typeof(c), 'object', "Type of constructed object");
    equals(c.name, 'jonas', "Calling method on object");
    equals(c.constructor, C, "Constructor of simple class");

    C.prototype = new A();
    var d = new C("tyler");

    equals(c.constructor, C, "Constructor of non inherited class");
    equals(d.constructor, a.constructor, "Constructor of inheriting class");
    equals(d.constructor, C.prototype.constructor, "Constructor of inheriting class");
    equals(d.aprop, "A", "Calling inherited property∂");
});

test("eval", function() {
    // eval executes a string
    var result = "";
    var r = eval("result = 'apple' + ' ' + 'pie'");
    equals(result, "apple pie", 'what is the value of result?');
    equals(r, "apple pie", 'what is the value of return value?');
});
