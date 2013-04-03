(function() {
  d3.svg.transform = function() {
    var transforms = [];

    function push(kind, args) {
      var n = args.length;

      transforms.push(function() {
        return kind + '(' + (n == 1 && typeof args[0] == 'function'
            ? args[0].apply(this, arr(arguments)) : args) + ')';
      });
    };

    function arr(args) {
      return Array.prototype.slice.call(args);
    }

    var my = function() {
      var that = this,
          args = arr(arguments);

      return transforms.map(function(f) {
        return f.apply(that, args);
      }).join(' ');
    };

    my.translate = function() {
      push('translate', arr(arguments));
      return my;
    };
    
    return my;
  };
})();
