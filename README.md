# D3-Transform

**d3-transform** makes it easy to define and reuse functions that produce
[transform](https://developer.mozilla.org/en-US/docs/SVG/Attribute/transform) attribute strings for SVG elements. Using **d3-transform** reduces
repetition, allows you to compose multiple transforms, and eliminates ugly
string-interpolation from your d3 visualization code.

## Installation

Include **d3-transform** in your web page using a script tag any time after you've
included [d3](http://d3js.org):

```html
<script src="http://d3js.org/d3.v4.min.js"></script>
<script src="d3-transform.js"></script>
```

## Usage

**d3-transform** replaces the manual construction of transform attribute strings
for SVG elements. For example, if you want to translate, rotate, and scale a
`group` element depending on the data bound to that element, you'd write
something like this without **d3-transform**:

```javascript
d3.select('svg').selectAll('g')
    .data([{ size: 5 }, { size: 10 }])
  .enter().append('g')
    .attr('transform', function(d, i) {
      return "translate(20," + d.size * 10 + ") rotate (40) scale(" + ( d.size + 2 ) + ")");
    });
```

With **d3-transform**, you can rewrite the above code like this:

```javascript
var transform = d3.transform()
    .translate(function(d) { return [20, d.size * 10] })
    .rotate(40)
    .scale(function(d) { return d.size + 2 });

var svg = d3.select('svg').selectAll('g')
    .data([{ size: 5 }, { size: 10 }])
    .enter()
    .append('g')
    .attr('transform', transform);
```

In both cases the resulting document will look the same:

```html
<svg>
  <g transform="translate(20,50) rotate(40) scale(7)"></g>
  <g transform="translate(20,100) rotate(40) scale(12)"></g>
</svg>
```

You can specify arguments for these operations by either providing positional
arguments to the corresponding method of the transform object, or by providing
a function that will return an array of arguments that are interpreted as
positional arguments. In the special case where an operation only takes one
argument, your function can return a number.

All of the SVG 1.1 transform operations are supported: `matrix`, `rotate`,
`translate`, `scale`, `skewX`, and `skewY`. See the [SVG 1.1 Specification](http://www.w3.org/TR/2011/REC-SVG11-20110816/coords.html#TransformAttribute)
or [MDN](https://developer.mozilla.org/en-US/docs/SVG/Attribute/transform) for further details on the arguments of each operation.

When using node.js, calls to require('d3-transform') return a direct reference to the "transform" method.

```javascript
var d3 = require('d3');
var d3Transform = require('d3-transform');

var transform = d3Transform()
    .translate(function(d) { return [20, d.size * 10] })
    .rotate(40)
    .scale(function(d) { return d.size + 2 });

var svg = d3.select('svg.example1').selectAll('g')
    .data([{ size: 5 }, { size: 10 }])
    .enter()
    .append('g')
    .attr('transform', transform);
```


### Composition

If you want to extend one transform with another set of operations, pass the
initial transform object into the `d3.transform()` function:

```javascript
var transform1 = d3.transform()
  .translate(10,20);

var transform2 = d3.transform(transform1)
  .scale(function(d) { return [d.size];})

d3.select('svg.example2').selectAll('g')
    .data([{ size: 5 }, { size: 10 }])
  .enter().append('g')
    .attr('transform', transform2);
```

Another way to compose multiple transform objects is to use the `seq`
operation:

```javascript
var transform1 = d3.transform()
  .translate(10,20);

var transform2 = d3.transform()
  .scale(function(d) { return [d.size];})

var transform =
  transform1.seq(transform2);
```

With either of these approaches, the result is a document that looks like this:

```html
<svg>
  <g transform="translate(10,20) scale(5)"></g>
  <g transform="translate(10,20) scale(10)"></g>
</svg>
```

## Contributors

* Erik Cunningham [@trinary](https://twitter.com/trinary)
* Spiros Eliopoulos [@seliopou](https://twitter.com/seliopou)
* Micah Stubbs [@micahstubbs](https://twitter.com/micahstubbs)
