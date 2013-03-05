(function () {
  d3.selection.prototype.matrix = function (x,y) {
    return this;
  };

  d3.selection.prototype.translate = function (x,y) {
    this.each(d3_transform_calc("translate",arguments));
    return this;
  };

  function d3_transform_calc(component, args) {
    var transform = this.getAttribute("transform");
    transform += component + "(" + args + ")";
    this.setAttribute("transform",transform);
  };
})();
