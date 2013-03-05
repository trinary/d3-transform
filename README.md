# d3-transform

Very frequently while writing d3 to manipulate SVG elements, you end up needing to set a particular attribute: [transform][1]. This very handy attribute wraps up a bunch of 2d transformation operations, presented as a formatted string:

    translate(20,20) rotate(90) skewX(15)

When wanting to do multiple translations on a particular element in a d3 selection operation, one often has to merge a few of these things together into a single string so that an attr() call works:

    d3.selectAll("g.label")
      .attr("transform",function(d,i) {return "translate(20,"+ d.x * 10) rotate (40) scale("+d.size+"2)")})

This syntax seems awkward and is something I find myself doing all the time.  I'd prefer this:

    d3.selectAll("g.label")
      .translate(function(d) { return [20,d.x*10]})
      .rotate(40)
      .scale(function(d) {return [d.size,2]})

Even better, in CoffeeScript:

    d3.selecAll "g.label"
      .translate((d) -> [20,d.x+10])
      .rotate(40)
      .scale((d)-> [d.size,2])

This d3 plugin adds that syntax to d3 selections. The goal is to keep it compatible with transitions and allow chained transformations that operate as you'd expect with a clearer, more readable syntax.



[1]: https://developer.mozilla.org/en-US/docs/SVG/Attribute/transform "Transform"