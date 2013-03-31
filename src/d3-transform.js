(function () {
  d3.selection.prototype.translate = function (x, y) {
    return this.each(d3_selection("translate", x, y));
  }
  d3.selection.prototype.scale = function (x, y) {
    return this.each(d3_selection("scale", x, y));
  }
  d3.selection.prototype.rotate = function (a, x, y) {
    return this.each(d3_selection("rotate", a, x, y));
  }
  d3.selection.prototype.skewX = function (a) {
    return this.each(d3_selection("skewX", a));
  }
  d3.selection.prototype.skewY = function (a) {
    return this.each(d3_selection("skewY", a));
  }
  d3.selection.prototype.matrix = function (a, b, c, d, e, f) {
    return this.each(d3_selection("matrix", a, b, c, d, e, f));
  }

  function d3_selection() {
    var transformArgs = Array.prototype.slice.call(arguments);
    var name = transformArgs.shift();

    var transform_array = function() {
        var existing = this.getAttribute("transform") || " "
        this.setAttribute("transform",existing + name + "(" + transformArgs[0].join(",") + ") ")
    }
    var transform_function = function() {
        var x = transformArgs[0].apply(this,arguments);
        var existing = this.getAttribute("transform") || " "
        this.setAttribute("transform",existing + name + "(" + x.join(",") +  ") ")
    }
    var transform_static = function() {
      var existing = this.getAttribute("transform") || " "
      this.setAttribute("transform",existing + name + "(" + transformArgs[0].join(",") + ") ")
    }

    if(typeof transformArgs[0] === "object" && transformArgs[0].length) {
      return transform_array;
    }
    if(typeof transformArgs[0] === "function") {
      return transform_function;
    }
    return transform_static;
  }
})();
