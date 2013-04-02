var vows = require('vows'),
    assert = require('assert'),
    jsdom = require('jsdom');

/*
 * Don't require d3 in a var declaration so the name is available to
 * d3-transform. This makes it global, which should probably be avoided but
 * ???
 */
d3 = require('d3');
var transform = require("../src/d3-transform.js");

vows.describe('d3-transform').addBatch({
  'the initial object' : {
    topic : function() {
      return d3.svg.transform();
    },
    'is an identity transform' : function(topic) {
      assert.equal(topic(), "");
    }
  }
}).export(module);
