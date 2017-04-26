(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

function d3Transform(chain) {
  var transforms = [];
  if (chain !== undefined) {
    transforms.push(chain);
  }

  function push(kind, args) {
    var n = args.length;

    transforms.push(function () {
      if (kind == 'seq') {
        return args[0].apply(this, arr(arguments));
      } else {
        return kind + '(' + (n == 1 && typeof args[0] == 'function' ? args[0].apply(this, arr(arguments)) : args) + ')';
      }
    });
  }

  function arr(args) {
    return Array.prototype.slice.call(args);
  }

  var my = function my() {
    var that = this,
        args = arr(arguments);

    return transforms.map(function (f) {
      return f.apply(that, args);
    }).join(' ');
  };

  ['translate', 'rotate', 'scale', 'matrix', 'skewX', 'skewY', 'seq'].forEach(function (t) {
    my[t] = function () {
      push(t, arr(arguments));
      return my;
    };
  });

  return my;
}

exports.transform = d3Transform;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3-transform.js.map
