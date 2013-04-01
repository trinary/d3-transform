
var vows = require('vows'),
    assert = require('assert'),
    jsdom = require('jsdom'),
    d3 = require('d3');
    translate = require("../src/d3-transform.js");

vows.describe('d3-transform').addBatch({
  'when transforming a thing': {
    topic: jsdom.jsdom("<html><head></head><body><svg></svg></body></html>"),
    "for a simple 2-element translate": {
      topic: function() { return d3.select("svg").selectAll(".x").data([1,2,3]).enter().append("rect").translate([10,10]) },
      "we get a thing": function(topic) {
        assert.equal(topic,1);
      }
    }
  }
}).export(module);
