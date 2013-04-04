# D3-Transform

## Purpose

Very frequently while writing d3 to manipulate SVG elements, you end up needing to set a particular attribute: [transform][1]. This very handy attribute wraps up a bunch of 2d transformation operations, presented as a formatted string:

```
translate(20,20) rotate(90) skewX(15)
```

When wanting to do multiple translations on a particular element in a d3 selection operation, one often has to merge a few of these things together into a single string so that an attr() call works:

```javascript
d3.selectAll("g.label")
  .attr("transform", function(d, i) {
    return "translate(20," + d.x * 10 + ") rotate (40) scale(" + d.size + "2)");
  });
```

There was a simple implementation based on extending d3.selection, but [@seliopou](https://github.com/seliopou) has proposed and implemented an improved version that defines the d3.svg.transform object, and works like this:

```javascript
var transform = d3.svg.transform()
  .translate(10, 20);
```

## Usage

The transform object allows you to specify your transformations with a composable API, save them as their own variables, and apply them to d3 selections like this:

```javascript
var transform = d3.svg.transform()
  .translate(10, 20);

d3.select('svg').append('g')
    .attr("transform", transform);
```

This will produce a document that looks like this:

```xml
<svg>
  <g transform="translate(10,20)></g>
</svg>
```

A function can be passed which is expected to return an array of arguments to the transform definition, which will be applied to each element based on its data binding:

```javascript
var transform = d3.svg.transform()
  .translate(function(d, i) { return [i * 10, d]; });

d3.select('svg').selectAll("g")
    .data([15, 30, 45])
  .enter().append('g')
    .attr("transform", transform);
```

The result is a document that looks like this:

```xml
<svg>
  <g transform="translate(0,15)"></g>
  <g transform="translate(10,30)"></g>
  <g transform="translate(20,45)"></g>
</svg>
```

The function must return the required number of arguments for the transform definition it applies to.

All of the SVG 1.1 transform operations are supported.  Matrix, translate, rotate, skewX, skewY, and scale.

## Composition

If you want to extend one transform with another set of operations, pass the initial transform object into transform().

```javascript
var transform1 = d3.svg.transform()
  .translate(10,20);

var transform2 = d3.svg.transform(transform1)
  .scale(function(d) { return [d.size];})

d3.select('svg').selectAll('g')
    .data([{ 'size' : 5 }, { 'size' : 10 }])
  .enter().append('g')
    .attr('transform', transform2);
```

The result is a document that looks like this:

````xml
<svg>
  <g transform="translate(10,20) scale(5)"></g>
  <g transform="translate(10,20) scale(10)"></g>
</svg>
```

Using these objects reduces repetition, allows composition of multiple transforms, and removes ugly string-interpolation of an attribute used in nearly every d3 visualization.

[1]: https://developer.mozilla.org/en-US/docs/SVG/Attribute/transform "Transform://developer.mozilla.org/en-US/docs/SVG/Attribute/transform "Transform"
