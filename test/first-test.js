
var vows = require('vows'),
    assert = require('assert'),
    d3 = require('d3');

vows.describe('simple test').addBatch({
  'when testing the test suite': {
    topic: function() { return 1},
    'we get 1': function(topic) {
      assert.equal(topic,1);
    }
  }
}).export(module);
