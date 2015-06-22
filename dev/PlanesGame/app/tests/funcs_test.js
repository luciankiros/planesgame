/// <reference path="/app/lib/qunit.js"/>
/// <reference path="/app/testable/funcs.js"/>

QUnit.module("app/tests/funcs_test.js");

QUnit.test('funcs.fact', function (assert) {

    var funcs = new Funcs();

    assert.equal(funcs.fact(0), 1, "fact(0) is 1");
    assert.equal(funcs.fact(1), 1, 'fact(1) is 1');
    assert.equal(funcs.fact(2), 2, 'fact(2) is 2');
    assert.equal(funcs.fact(3), 6, 'fact(3) is 6');
    assert.equal(funcs.fact(5), 120, 'fact(5) is 120');
    assert.equal(funcs.fact(10), 3628800, 'fact(10) is 3628800');
});

QUnit.test('funcs.fibb', function (assert) {

    var funcs = new Funcs();

    assert.equal(funcs.fibb(1), 1, 'fibb(1) is 1');
    assert.equal(funcs.fibb(2), 1, 'fibb(2) is 1');
    assert.equal(funcs.fibb(3), 2, 'fibb(3) is 2');
    assert.equal(funcs.fibb(4), 3, 'fibb(4) is 3');
    assert.equal(funcs.fibb(7), 13, 'fibb(7) is 13');
    assert.equal(funcs.fibb(10), 55, 'fibb(10)  is 55');
});