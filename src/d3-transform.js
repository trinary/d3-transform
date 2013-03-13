(function () {
  d3.selection.prototype.translate = function (x,y) {
    if (arguments.length < 2) {
    }
    console.log(this.node(),x,y);
    this.each(d3_transform_attr("translate",x,y));
    return this;
  };
  function d3_transform_attr(type) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      var values  = [];
      args.shift();
      for (var i = 0 ; i< args.length ;) { 
        if(typeof args[i] === "function") {
          values[i] = 3 // hmm
        }
      }
      console.log(values);
    }
  }
})();
