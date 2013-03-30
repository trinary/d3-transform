(function () {
  d3.selection.prototype.translate = function (value1, value2) {
    return this.each(d3_selection("translate",value1,value2));
  }

  function d3_selection(name, value1, value2) {

    var transforn_array = function() {
        var existing = this.getAttribute("transform") || ""
        console.log (existing, name, value1.join(","));
        this.setAttribute("transform",existing + name + "(" + value1.join(",") + ")")
    }
    var transform_function = function() {
        console.log(arguments);
        var x = value1.apply(this,arguments);
        var existing = this.getAttribute("transform") || ""
        console.log (existing, name, x);
        this.setAttribute("transform",existing + name + "(" + x.join(",") +  ")")
    }
    var transform_static = function() {
      var existing = this.getAttribute("transform") || ""
      this.setAttribute("transform",existing + name + "(" + value1 + "," + value2 + ")")
    }

    if(typeof value1 === "object" && value1.length) {
      return transform_array;
    }
    if(typeof value1 === "function") {
      return transform_function;
    }
    return transform_static;
  }
})();
