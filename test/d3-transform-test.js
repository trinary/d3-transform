var tape = require("tape"),
  t = require("../");

tape('is an identity transform by default', function(test) {
  var tr = t.transform();
  test.equal(tr(), "");
  test.end();
});

tape('works for one argument', function(test) {
  var tr = t.transform().translate(2);
  test.equal(tr(), "translate(2)");
  test.end();
});

tape('works for two arguments', function(test) {
  var tr = t.transform().translate(1,2);
  test.equal(tr(), "translate(1,2)");
  test.end();
});

tape('works for a function argument', function(test) {
  var tr = t.transform().translate(function() { return [2,3]});
  test.equal(tr(), "translate(2,3)");
  test.end();
});

tape('works for a function argument, given arguments', function(test) {
  var tr = t.transform().translate(function(x) { return [x,3]});
  test.equal(tr(8), "translate(8,3)");
  test.end();
});

tape('works for a function argument, as a method', function(test) {
  var tr = t.transform().translate(function(x) { return [this.x,3]});
  var cxt = { 'x': 21 };
  test.equal(tr.call(cxt), "translate(21,3)");
  test.end();
});

tape('composes transforms works', function(test) {
  var tr = t.transform().translate(1,1).rotate(2);
  test.equal(tr(), 'translate(1,1) rotate(2)');
  test.end();
});

tape('composes transforms works by passing to functor', function(test) {
  var tr = t.transform().translate(1,1).rotate(2);
  var tr2 = t.transform(tr).scale(2);
  test.equal(tr2(), 'translate(1,1) rotate(2) scale(2)');
  test.end();
});

tape('works with functions at any point', function(test) {
  var tr = t.transform().translate(function(d) { return [d,1];}).rotate(2);
  var tr2 = t.transform(tr).scale(function(d) { return  [d+1,4];});
  test.equal(tr2(10), "translate(10,1) rotate(2) scale(11,4)");
  test.end();
});

tape("composing via seq() works", function(test) {
  var tr = t.transform().translate(1, 1);
  var tr2 = t.transform().translate(-1, -1);
  var seq = tr.seq(tr2);
  test.equal(seq(), "translate(1,1) translate(-1,-1)");
  test.end();
});

tape("composing via seq() works with functions", function(test) {
  var tr = t.transform().translate([1,1]);
  var tr2 = t.transform().translate(function(d) { return [1,d];});
  var seq = tr.seq(tr2);
  test.equal(seq(5), "translate(1,1) translate(1,5)");
  test.end();
});

tape("composing via seq() works with functions at any point", function(test) {
  var tr = t.transform().translate(function(d) { return [d,1];});
  var tr2 = t.transform().translate(function(d) { return [1,d];});
  var seq = tr.seq(tr2);
  test.equal(seq(5), "translate(5,1) translate(1,5)");
  test.end();
});
