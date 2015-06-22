/// <reference path="/app/lib/qunit.js"/>
/// <reference path="/app/testable/maths.js"/>
QUnit.module("app/tests/maths_test.js");

QUnit.test('maths.add', function (assert) {

    var maths = new Maths();

    assert.equal(maths.add(2, 3), 5, '2 + 3 = 5');
    assert.equal(maths.add(-2, 3), 1, '-2 + 3 = 1');
    assert.equal(maths.add(2, -3), -1, '2 + -3 = -1');
    assert.equal(maths.add(0, 3), 3, '0 + 3 = 3');
});

QUnit.test('maths.multiply', function (assert) {

    var maths = new Maths();

    assert.equal(maths.multiply(2, 3), 6, '2 * 3 = 6');
    assert.equal(maths.multiply(-2, 3), -6, '-2 * 3 = -6');
    assert.equal(maths.multiply(2, -3), -6, '2 * -3 = -6');
    assert.equal(maths.multiply(0, 3), 0, '0 * 3 = 0');
    assert.equal(maths.multiply(-2, -3), 6, '-2 * -3 = 6');
});

QUnit.test('maths.max', function (assert) {

    var maths = new Maths();

    assert.equal(maths.max(4, 2), 4, '4 > 2');
});

QUnit.test('maths.min', function (assert) {

    var maths = new Maths();

    assert.equal(maths.min(4, 2), 2, '4 > 2');
});