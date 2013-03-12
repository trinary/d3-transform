(function () {
  d3.selection.prototype.translate = function (x,y) {
    if (arguments.length < 2) {
    }
    console.log(this.node(),x,y);
    this.each(d3_transform_attr("translate",x,y));
    return this;
  };
  function d3_transform_attr(type) {
    var args = Array.prototype.slice.call(arguments);
    var values  = [];
    for (var i = 0 ; var m = ++i; i< args.length) { 
      if(typeof args[i] === "function") {
        values[i] = args[i]
      }
    }
    args.shift();
    console.log(args);
    function transformConstant() { this.setAttribute("transform", type + "(" + args + ") "); }
    function transformFunction() { var x = arg }
  }
})();
