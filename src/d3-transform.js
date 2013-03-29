(function () {
  d3.selection.prototype.translate = function (value1, value2) {
    return this.each(d3_selection("translate",value1,value2));
  }

  function d3_selection(name, value1, value2) {
    if(typeof value1 === "object" && value1.length) {
      return function() {
        var existing = this.getAttribute("transform") || ""
        console.log (existing, name, value1.join(","));
        this.setAttribute("transform",existing + name + "(" + value1.join(",") + ")")
      }
    }
    if(typeof value1 === "function") {
      return function() {
        console.log(arguments);
        var x = value1.apply(this,arguments);
        var existing = this.getAttribute("transform") || ""
        console.log (existing, name, x);
        this.setAttribute("transform",existing + name + "(" + x.join(",") +  ")")
      }
    }
    return function() {
      var existing = this.getAttribute("transform") || ""
      this.setAttribute("transform",existing + name + "(" + value1 + "," + value2 + ")")
    }
  }
})();
