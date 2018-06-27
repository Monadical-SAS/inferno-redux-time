(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _inferno = require('inferno');

var _Button = require('inferno-bootstrap/dist/Button');

var _Button2 = _interopRequireDefault(_Button);

var _redux = require('redux');

var _infernoRedux = require('inferno-redux');

var _util = require('redux-time/node/util.js');

var _main = require('redux-time/node/main.js');

var _animations = require('redux-time/node/animations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/examples/stress-test.js";

window.initial_state = { balls: {} };

window.store = (0, _redux.createStore)((0, _redux.combineReducers)({ animations: _main.animationsReducer }));
window.time = (0, _main.startAnimation)(window.store, window.initial_state);

var StessTesterComponent = function StessTesterComponent(_ref) {
    var balls = _ref.balls,
        addBalls = _ref.addBalls,
        fps = _ref.fps,
        speed = _ref.speed,
        getTime = _ref.getTime;

    var keys = (0, _keys2.default)(balls);
    var len = keys.length;
    return (0, _inferno.createVNode)(1, 'div', null, [(0, _inferno.createComponentVNode)(2, _Button2.default, {
        'onClick': function onClick() {
            return addBalls(getTime());
        },
        children: 'Add 100 Balls'
    }), (0, _inferno.createTextVNode)(' \xA0'), len, (0, _inferno.createTextVNode)(' balls animating @ '), fps, (0, _inferno.createTextVNode)(' FPS  \uD83D\uDDA5'), (0, _inferno.createVNode)(1, 'br'), (0, _inferno.createVNode)(1, 'br'), (0, _inferno.createVNode)(1, 'div', null, [keys.map(function (idx) {
        return (0, _inferno.createVNode)(1, 'div', null, null, 1, {
            'style': balls[idx].style
        });
    }), !len ? 'Click "Add 100 Balls" to start stress-testing.' : '', fps && fps < 23 && speed != 0 ? (0, _inferno.createVNode)(1, 'div', null, [(0, _inferno.createTextVNode)('Further optimization is needed to render more than ~'), len, (0, _inferno.createTextVNode)(' elements.')], 0, {
        'style': { position: 'absolute', left: '5%', zIndex: 20, width: '90%', backgroundColor: 'red', padding: 20 }
    }) : ''], 0, {
        'style': { height: 620, width: '100%', padding: 20, position: 'relative', borderRadius: 10, margin: 'auto', backgroundColor: '#ddd' }
    })], 0);
};

var ball_style = {
    position: 'absolute',
    backgroundColor: 'red',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    borderRadius: 10
};

var num_balls = 0;

var ADD_BALLS_ANIMATIONS = function ADD_BALLS_ANIMATIONS(start_time, num) {
    var width = window.innerWidth;
    var new_anims = (0, _animations.Flatten)((0, _util.range)(num).map(function (idx) {
        return [(0, _animations.Become)({
            path: '/balls/' + (num_balls + idx) + '/style',
            start_time: start_time,
            state: (0, _extends3.default)({}, ball_style, {
                top: Math.random() * 600,
                left: Math.random() * width
            })
        }), (0, _animations.Translate)({
            path: '/balls/' + (num_balls + idx),
            start_time: start_time,
            start_state: { top: 0, left: 0 },
            end_state: { top: 0, left: Math.random() * width - width / 2 },
            duration: 10000
        })];
    }));
    num_balls += num;
    return new_anims;
};

var FPS = function FPS(speed, warped_time, former_time) {
    return Math.round(speed * 1000 / (warped_time - former_time)) || 0;
};

var mapStateToProps = function mapStateToProps(_ref2) {
    var animations = _ref2.animations;
    return {
        balls: animations.state.balls,
        fps: FPS(animations.speed, animations.warped_time, animations.former_time),
        speed: animations.speed
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addBalls: function addBalls(start_time) {
            dispatch({ type: 'ANIMATE', animations: ADD_BALLS_ANIMATIONS(start_time, 100) });
        }
    };
};

var StessTester = (0, _infernoRedux.connect)(mapStateToProps, mapDispatchToProps)(StessTesterComponent);

var inferno_mount = document.getElementById('inferno');
inferno_mount.innerHTML = '';
(0, _inferno.render)((0, _inferno.createComponentVNode)(2, _infernoRedux.Provider, {
    'store': window.store,
    children: (0, _inferno.createVNode)(1, 'div', null, (0, _inferno.createComponentVNode)(2, StessTester, {
        'getTime': window.time.getWarpedTime.bind(window.time)
    }), 2)
}), inferno_mount);

window.onmousemove = function (e) {
    window.mouseY = e.pageY;
    window.mouseX = e.pageX;
};

},{"babel-runtime/core-js/object/keys":8,"babel-runtime/helpers/extends":14,"inferno":141,"inferno-bootstrap/dist/Button":128,"inferno-redux":135,"redux":163,"redux-time/node/animations":154,"redux-time/node/main.js":155,"redux-time/node/util.js":157}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":22}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":23}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":24}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":25}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":26}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":27}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":28}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":29}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":30}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":31}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":7}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":6}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":3,"../core-js/is-iterable":4}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":2}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":10,"../core-js/symbol/iterator":11}],18:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":19}],19:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],20:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":18}],21:[function(require,module,exports){
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],22:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":46,"../../modules/es6.array.from":111,"../../modules/es6.string.iterator":118}],23:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":109,"../modules/es6.string.iterator":118,"../modules/web.dom.iterable":125}],24:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":110,"../modules/es6.string.iterator":118,"../modules/web.dom.iterable":125}],25:[function(require,module,exports){
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":46}],26:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":46,"../../modules/es6.object.assign":113}],27:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":46,"../../modules/es6.object.define-property":114}],28:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":46,"../../modules/es6.object.keys":115}],29:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
require('../modules/es7.set.of');
require('../modules/es7.set.from');
module.exports = require('../modules/_core').Set;

},{"../modules/_core":46,"../modules/es6.object.to-string":116,"../modules/es6.set":117,"../modules/es6.string.iterator":118,"../modules/es7.set.from":120,"../modules/es7.set.of":121,"../modules/es7.set.to-json":122,"../modules/web.dom.iterable":125}],30:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":46,"../../modules/es6.object.to-string":116,"../../modules/es6.symbol":119,"../../modules/es7.symbol.async-iterator":123,"../../modules/es7.symbol.observable":124}],31:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":106,"../../modules/es6.string.iterator":118,"../../modules/web.dom.iterable":125}],32:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],33:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],34:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],35:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":65}],36:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":56}],37:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":97,"./_to-iobject":99,"./_to-length":100}],38:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":40,"./_ctx":48,"./_iobject":62,"./_to-length":100,"./_to-object":101}],39:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":64,"./_is-object":65,"./_wks":107}],40:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":39}],41:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":42,"./_wks":107}],42:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],43:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_an-instance":34,"./_ctx":48,"./_descriptors":50,"./_for-of":56,"./_iter-define":68,"./_iter-step":70,"./_meta":73,"./_object-create":75,"./_object-dp":76,"./_redefine-all":88,"./_set-species":92,"./_validate-collection":104}],44:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":36,"./_classof":41}],45:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var meta = require('./_meta');
var fails = require('./_fails');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var setToStringTag = require('./_set-to-string-tag');
var dP = require('./_object-dp').f;
var each = require('./_array-methods')(0);
var DESCRIPTORS = require('./_descriptors');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":34,"./_array-methods":38,"./_descriptors":50,"./_export":54,"./_fails":55,"./_for-of":56,"./_global":57,"./_hide":59,"./_is-object":65,"./_meta":73,"./_object-dp":76,"./_redefine-all":88,"./_set-to-string-tag":93}],46:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],47:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":76,"./_property-desc":87}],48:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":32}],49:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],50:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":55}],51:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":57,"./_is-object":65}],52:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],53:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":81,"./_object-keys":84,"./_object-pie":85}],54:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":46,"./_ctx":48,"./_global":57,"./_has":58,"./_hide":59}],55:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],56:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":35,"./_ctx":48,"./_is-array-iter":63,"./_iter-call":66,"./_to-length":100,"./core.get-iterator-method":108}],57:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],58:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],59:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":50,"./_object-dp":76,"./_property-desc":87}],60:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":57}],61:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":50,"./_dom-create":51,"./_fails":55}],62:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":42}],63:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":71,"./_wks":107}],64:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":42}],65:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],66:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":35}],67:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":59,"./_object-create":75,"./_property-desc":87,"./_set-to-string-tag":93,"./_wks":107}],68:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":54,"./_hide":59,"./_iter-create":67,"./_iterators":71,"./_library":72,"./_object-gpo":82,"./_redefine":89,"./_set-to-string-tag":93,"./_wks":107}],69:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":107}],70:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],71:[function(require,module,exports){
module.exports = {};

},{}],72:[function(require,module,exports){
module.exports = true;

},{}],73:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":55,"./_has":58,"./_is-object":65,"./_object-dp":76,"./_uid":103}],74:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":55,"./_iobject":62,"./_object-gops":81,"./_object-keys":84,"./_object-pie":85,"./_to-object":101}],75:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":35,"./_dom-create":51,"./_enum-bug-keys":52,"./_html":60,"./_object-dps":77,"./_shared-key":94}],76:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":35,"./_descriptors":50,"./_ie8-dom-define":61,"./_to-primitive":102}],77:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":35,"./_descriptors":50,"./_object-dp":76,"./_object-keys":84}],78:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":50,"./_has":58,"./_ie8-dom-define":61,"./_object-pie":85,"./_property-desc":87,"./_to-iobject":99,"./_to-primitive":102}],79:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":80,"./_to-iobject":99}],80:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":52,"./_object-keys-internal":83}],81:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],82:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":58,"./_shared-key":94,"./_to-object":101}],83:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":37,"./_has":58,"./_shared-key":94,"./_to-iobject":99}],84:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":52,"./_object-keys-internal":83}],85:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],86:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":46,"./_export":54,"./_fails":55}],87:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],88:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":59}],89:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":59}],90:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":32,"./_ctx":48,"./_export":54,"./_for-of":56}],91:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":54}],92:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":46,"./_descriptors":50,"./_global":57,"./_object-dp":76,"./_wks":107}],93:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":58,"./_object-dp":76,"./_wks":107}],94:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":95,"./_uid":103}],95:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":46,"./_global":57,"./_library":72}],96:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":49,"./_to-integer":98}],97:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":98}],98:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],99:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":49,"./_iobject":62}],100:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":98}],101:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":49}],102:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":65}],103:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],104:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":65}],105:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":46,"./_global":57,"./_library":72,"./_object-dp":76,"./_wks-ext":106}],106:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":107}],107:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":57,"./_shared":95,"./_uid":103}],108:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":41,"./_core":46,"./_iterators":71,"./_wks":107}],109:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":35,"./_core":46,"./core.get-iterator-method":108}],110:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":41,"./_core":46,"./_iterators":71,"./_wks":107}],111:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":47,"./_ctx":48,"./_export":54,"./_is-array-iter":63,"./_iter-call":66,"./_iter-detect":69,"./_to-length":100,"./_to-object":101,"./core.get-iterator-method":108}],112:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":33,"./_iter-define":68,"./_iter-step":70,"./_iterators":71,"./_to-iobject":99}],113:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":54,"./_object-assign":74}],114:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":50,"./_export":54,"./_object-dp":76}],115:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":84,"./_object-sap":86,"./_to-object":101}],116:[function(require,module,exports){

},{}],117:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":45,"./_collection-strong":43,"./_validate-collection":104}],118:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":68,"./_string-at":96}],119:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":35,"./_descriptors":50,"./_enum-keys":53,"./_export":54,"./_fails":55,"./_global":57,"./_has":58,"./_hide":59,"./_is-array":64,"./_is-object":65,"./_library":72,"./_meta":73,"./_object-create":75,"./_object-dp":76,"./_object-gopd":78,"./_object-gopn":80,"./_object-gopn-ext":79,"./_object-gops":81,"./_object-keys":84,"./_object-pie":85,"./_property-desc":87,"./_redefine":89,"./_set-to-string-tag":93,"./_shared":95,"./_to-iobject":99,"./_to-primitive":102,"./_uid":103,"./_wks":107,"./_wks-define":105,"./_wks-ext":106}],120:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":90}],121:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":91}],122:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":44,"./_export":54}],123:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":105}],124:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":105}],125:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":57,"./_hide":59,"./_iterators":71,"./_wks":107,"./es6.array.iterator":112}],126:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],127:[function(require,module,exports){
'use strict';

var INFERNO_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!INFERNO_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

module.exports = hoistNonReactStatics;
module.exports.default = module.exports;

},{}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = require('inferno');

var _infernoCreateElement = require('inferno-create-element');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  color: 'secondary',
  tag: 'button'
};

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          block = _props.block,
          children = _props.children,
          className = _props.className,
          cssModule = _props.cssModule,
          color = _props.color,
          outline = _props.outline,
          size = _props.size,
          Tag = _props.tag,
          innerRef = _props.innerRef,
          attributes = _objectWithoutProperties(_props, ['active', 'block', 'children', 'className', 'cssModule', 'color', 'outline', 'size', 'tag', 'innerRef']);

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'btn', 'btn' + (outline ? '-outline' : '') + '-' + color, size ? 'btn-' + size : false, block ? 'btn-block' : false, { active: active, disabled: this.props.disabled }), cssModule);

      if (attributes.href && Tag === 'button') {
        Tag = 'a';
      }

      Object.assign(attributes, {
        className: classes,
        type: Tag === 'button' && attributes.onClick ? 'button' : undefined,
        ref: innerRef,
        onClick: this.onClick
      });

      return (0, _infernoCreateElement.createElement)(Tag, attributes, children);
    }
  }]);

  return Button;
}(_inferno.Component);

Button.defaultProps = defaultProps;

exports.default = Button;
module.exports = exports['default'];

},{"./utils":129,"classnames":21,"inferno":141,"inferno-create-element":132}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyCodes = undefined;
exports.getScrollbarWidth = getScrollbarWidth;
exports.setScrollbarWidth = setScrollbarWidth;
exports.isBodyOverflowing = isBodyOverflowing;
exports.getOriginalBodyPadding = getOriginalBodyPadding;
exports.conditionallyUpdateScrollbar = conditionallyUpdateScrollbar;
exports.mapToCssModules = mapToCssModules;
exports.omit = omit;
exports.getTarget = getTarget;

var _infernoShared = require('inferno-shared');

// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal#L436-L443
function getScrollbarWidth() {
  var scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function setScrollbarWidth(padding) {
  document.body.style.paddingRight = padding > 0 ? padding + 'px' : null;
}

function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}

function getOriginalBodyPadding() {
  return parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right') || 0, 10);
}

function conditionallyUpdateScrollbar() {
  var scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal#L420
  var fixedContent = document.querySelectorAll('.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed')[0];
  var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

function mapToCssModules(className, cssModule) {
  if (!cssModule) return className;
  return className.split(' ').map(function (c) {
    return cssModule[c] || c;
  }).join(' ');
}

/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
function omit(obj, omitKeys) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}

function getTarget(target) {
  if ((0, _infernoShared.isFunction)(target)) {
    return target();
  }

  if (typeof target === 'string' && document) {
    var selection = document.querySelector(target);
    if (selection === null) {
      return document.querySelector('#' + target);
    }
    return selection;
  }

  return target;
}

var keyCodes = exports.keyCodes = {
  esc: 27,
  space: 32,
  tab: 9,
  up: 38,
  down: 40
};

},{"inferno-shared":138}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inferno = require('inferno');

// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isString(o) {
    return typeof o === 'string';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}

var componentHooks = {
    onComponentDidMount: 1,
    onComponentDidUpdate: 1,
    onComponentShouldUpdate: 1,
    onComponentWillMount: 1,
    onComponentWillUnmount: 1,
    onComponentWillUpdate: 1
};
/**
 * Creates virtual node
 * @param {string|Function|Component<any, any>} type Type of node
 * @param {object=} props Optional props for virtual node
 * @param {...{object}=} _children Optional children for virtual node
 * @returns {VNode} new virtual ndoe
 */
function createElement(type, props) {
    var _children = [], len = arguments.length - 2;
    while ( len-- > 0 ) _children[ len ] = arguments[ len + 2 ];

    if (isInvalid(type) || isObject(type)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }
    var children = _children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    var newProps;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        }
        else if (_children.length === 0) {
            children = void 0;
        }
    }
    if (isString(type)) {
        flags = inferno.getFlagsForElementVnode(type);
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (prop === 'className' || prop === 'class') {
                    className = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'children' && isUndefined(children)) {
                    children = props.children; // always favour children args, default to props
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    else {
        flags = 2 /* ComponentUnknown */;
        if (!isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (var prop$1 in props) {
                if (componentHooks[prop$1] !== void 0) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[prop$1] = props[prop$1];
                }
                else if (prop$1 === 'key') {
                    key = props.key;
                }
                else if (prop$1 === 'ref') {
                    ref = props.ref;
                }
                else {
                    newProps[prop$1] = props[prop$1];
                }
            }
        }
        return inferno.createComponentVNode(flags, type, newProps, key, ref);
    }
    return inferno.createVNode(flags, type, className, children, 0 /* UnknownChildren */, newProps, key, ref);
}

exports.createElement = createElement;

},{"inferno":141}],131:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var p=require("inferno"),n=!("undefined"==typeof window||!window.document);function m(n){return h(n)||e(n)}function s(n){return e(n)||!1===n||o(n)||h(n)}function v(n){return"string"==typeof n}function e(n){return null===n}function o(n){return!0===n}function h(n){return void 0===n}function y(n){return"object"==typeof n}var g={onComponentDidMount:1,onComponentDidUpdate:1,onComponentShouldUpdate:1,onComponentWillMount:1,onComponentWillUnmount:1,onComponentWillUpdate:1};function r(n,e){for(var o=[],r=arguments.length-2;0<r--;)o[r]=arguments[r+2];if(s(n)||y(n))throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");var t,u=o,i=null,l=null,f=null,a=0;if(o&&(1===o.length?u=o[0]:0===o.length&&(u=void 0)),!v(n)){if(a=2,h(u)||(e||(e={}),e.children=u,u=null),!m(e))for(var c in t={},e)void 0!==g[c]?(i||(i={}),i[c]=e[c]):"key"===c?l=e.key:"ref"===c?i=e.ref:t[c]=e[c];return p.createComponentVNode(a,n,t,l,i)}if(a=p.getFlagsForElementVnode(n),!m(e))for(var d in t={},e)"className"===d||"class"===d?f=e[d]:"key"===d?l=e.key:"children"===d&&h(u)?u=e.children:"ref"===d?i=e.ref:t[d]=e[d];return p.createVNode(a,n,f,u,0,t,l,i)}exports.createElement=r;

},{"inferno":141}],132:[function(require,module,exports){
(function (process){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/index.cjs.min.js');
} else {
  module.exports = require('./dist/index.cjs.js');
}

}).call(this,require('_process'))
},{"./dist/index.cjs.js":130,"./dist/index.cjs.min.js":131,"_process":153}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hoistNonReactStatics = _interopDefault(require('hoist-non-inferno-statics'));
var inferno = require('inferno');
var redux = require('redux');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        { t[p] = s[p]; } }
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        { for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) { if (e.indexOf(p[i]) < 0)
            { t[p[i]] = s[p[i]]; } } }
    return t;
}

var CLEARED = null;
// tslint:disable-next-line:no-empty
var nullSubscriptionHandler = function () { };
var nullListenerCollection = {
    // tslint:disable-next-line:no-empty
    clear: function () { },
    // tslint:disable-next-line:no-empty
    notify: function () { },
    subscribe: function (_) { return nullSubscriptionHandler; }
};
var createListenerCollection = function () {
    // the current/next pattern is copied from redux's createStore code.
    var current = [];
    var next = [];
    return {
        clear: function () {
            next = CLEARED;
            current = CLEARED;
        },
        notify: function () {
            var listeners = (current = next);
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        },
        subscribe: function (listener) {
            var isSubscribed = true;
            if (next === current) {
                next = current.slice();
            }
            next.push(listener);
            return function () {
                if (!isSubscribed || current === null) {
                    return;
                }
                isSubscribed = false;
                if (next === current) {
                    next = current.slice();
                }
                next.splice(next.indexOf(listener), 1);
            };
        }
    };
};
var Subscription = function Subscription(store, parentSub, onStateChange) {
    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListenerCollection;
};
Subscription.prototype.addNestedSub = function addNestedSub (listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
};
Subscription.prototype.notifyNestedSubs = function notifyNestedSubs () {
    this.listeners.notify();
};
Subscription.prototype.isSubscribed = function isSubscribed () {
    return Boolean(this.unsubscribe);
};
Subscription.prototype.trySubscribe = function trySubscribe () {
    if (!this.unsubscribe) {
        this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
        this.listeners = createListenerCollection();
    }
};
Subscription.prototype.tryUnsubscribe = function tryUnsubscribe () {
    if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
        this.listeners.clear();
        this.listeners = nullListenerCollection;
    }
};

var hotReloadingVersion = 0;
var dummyState = {};
// tslint:disable-next-line:no-empty
var noop = function () { };
var makeSelectorStateful = function (sourceSelector, store) {
    // wrap the selector in an object that tracks its results between runs.
    var selector = {
        error: null,
        props: {},
        run: function runComponentSelector(props) {
            try {
                var nextProps = sourceSelector(store.getState(), props);
                if (nextProps !== selector.props || selector.error) {
                    selector.shouldComponentUpdate = true;
                    selector.props = nextProps;
                    selector.error = null;
                }
            }
            catch (e) {
                selector.shouldComponentUpdate = true;
                selector.error = e;
            }
        },
        shouldComponentUpdate: false
    };
    return selector;
};
// TODO: Move
var invariant = function (test, error) {
    if (!test) {
        throw new Error(error);
    }
};
function getDefaultName(name) {
    return ("ConnectAdvanced(" + name + ")");
}
function connectAdvanced(selectorFactory, _a) {
    var getDisplayName = _a.getDisplayName; if ( getDisplayName === void 0 ) getDisplayName = getDefaultName;
    var methodName = _a.methodName; if ( methodName === void 0 ) methodName = 'connectAdvanced';
    var renderCountProp = _a.renderCountProp; if ( renderCountProp === void 0 ) renderCountProp = null;
    var shouldHandleStateChanges = _a.shouldHandleStateChanges; if ( shouldHandleStateChanges === void 0 ) shouldHandleStateChanges = true;
    var storeKey = _a.storeKey; if ( storeKey === void 0 ) storeKey = 'store';
    var withRef = _a.withRef; if ( withRef === void 0 ) withRef = false;
    var connectOptions = __rest(_a, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]);
    var subscriptionKey = storeKey + 'Subscription';
    var version = hotReloadingVersion++;
    var wrapWithConnect = function (WrappedComponent) {
        invariant(typeof WrappedComponent === 'function', "You must pass a component to the function returned by " + "connect. Instead received " + WrappedComponent);
        var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
        var displayName = getDisplayName(wrappedComponentName);
        var selectorFactoryOptions = Object.assign({}, connectOptions, { WrappedComponent: WrappedComponent,
            displayName: displayName,
            getDisplayName: getDisplayName,
            methodName: methodName,
            renderCountProp: renderCountProp,
            shouldHandleStateChanges: shouldHandleStateChanges,
            storeKey: storeKey,
            withRef: withRef,
            wrappedComponentName: wrappedComponentName });
        var Connect = (function (Component) {
            function Connect(props, context) {
                Component.call(this, props, context);
                this.version = version;
                this.state = {};
                this.renderCount = 0;
                this.store = this.props[storeKey] || this.context[storeKey];
                this.propsMode = Boolean(props[storeKey]);
                this.setWrappedInstance = this.setWrappedInstance.bind(this);
                invariant(!!this.store, "Could not find \"" + storeKey + "\" in either the context or " +
                    "props of \"" + displayName + "\". " +
                    "Either wrap the root component in a <Provider>, " +
                    "or explicitly pass \"" + storeKey + "\" as a prop to \"" + displayName + "\".");
                this.initSelector();
                this.initSubscription();
            }

            if ( Component ) Connect.__proto__ = Component;
            Connect.prototype = Object.create( Component && Component.prototype );
            Connect.prototype.constructor = Connect;
            Connect.prototype.getChildContext = function getChildContext () {
                var obj;

                // If this component received store from props, its subscription should be transparent
                // to any descendants receiving store+subscription from context; it passes along
                // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
                // Connect to control ordering of notifications to flow top-down.
                var subscription = this.propsMode ? null : this.subscription;
                return ( obj = {}, obj[subscriptionKey] = subscription || this.context[subscriptionKey], obj );
            };
            Connect.prototype.componentDidMount = function componentDidMount () {
                if (!shouldHandleStateChanges) {
                    return;
                }
                // componentWillMount fires during server side rendering, but componentDidMount and
                // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
                // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
                // To handle the case where a child component may have triggered a state change by
                // dispatching an action in its componentWillMount, we have to re-run the select and maybe
                // re-render.
                this.subscription.trySubscribe();
                this.selector.run(this.props);
                if (this.selector.shouldComponentUpdate) {
                    this.forceUpdate();
                }
            };
            Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
                this.selector.run(nextProps);
            };
            Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
                return this.selector.shouldComponentUpdate;
            };
            Connect.prototype.componentWillUnmount = function componentWillUnmount () {
                if (this.subscription) {
                    this.subscription.tryUnsubscribe();
                }
                // these are just to guard against extra memory leakage if a parent element doesn't
                // dereference this instance properly, such as an async callback that never finishes
                this.subscription = null;
                this.notifyNestedSubs = noop;
                this.store = null;
                this.selector.run = noop;
                this.selector.shouldComponentUpdate = false;
            };
            Connect.prototype.getWrappedInstance = function getWrappedInstance () {
                invariant(withRef, "To access the wrapped instance, you need to specify " + "{ withRef: true } in the options argument of the " + methodName + "() call.");
                return this.wrappedInstance;
            };
            Connect.prototype.setWrappedInstance = function setWrappedInstance (ref) {
                this.wrappedInstance = ref;
            };
            Connect.prototype.initSelector = function initSelector () {
                var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
                this.selector = makeSelectorStateful(sourceSelector, this.store);
                this.selector.run(this.props);
            };
            Connect.prototype.initSubscription = function initSubscription () {
                if (!shouldHandleStateChanges) {
                    return;
                }
                // parentSub's source should match where store came from: props vs. context. A component
                // connected to the store via props shouldn't use subscription from context, or vice versa.
                var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
                this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
                // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
                // the middle of the notification loop, where `this.subscription` will then be null. An
                // extra null check every change can be avoided by copying the method onto `this` and then
                // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
                // listeners logic is changed to not call listeners that have been unsubscribed in the
                // middle of the notification loop.
                this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
            };
            Connect.prototype.onStateChange = function onStateChange () {
                this.selector.run(this.props);
                if (!this.selector.shouldComponentUpdate) {
                    this.notifyNestedSubs();
                }
                else {
                    this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
                    this.setState(dummyState);
                }
            };
            Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate () {
                // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
                // needs to notify nested subs. Once called, it unimplements itself until further state
                // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
                // a boolean check every time avoids an extra method call most of the time, resulting
                // in some perf boost.
                this.componentDidUpdate = undefined;
                this.notifyNestedSubs();
            };
            Connect.prototype.isSubscribed = function isSubscribed () {
                return Boolean(this.subscription && this.subscription.isSubscribed());
            };
            Connect.prototype.addExtraProps = function addExtraProps (props) {
                if (!renderCountProp) {
                    return props;
                }
                // make a shallow copy so that fields added don't leak to the original selector.
                // this is especially important for 'ref' since that's a reference back to the component
                // instance. a singleton memoized selector would then be holding a reference to the
                // instance, preventing the instance from being garbage collected, and that would be bad
                var withExtras = Object.assign({}, props);
                if (renderCountProp) {
                    withExtras[renderCountProp] = this.renderCount++;
                }
                if (this.propsMode && this.subscription) {
                    withExtras[subscriptionKey] = this.subscription;
                }
                return withExtras;
            };
            Connect.prototype.render = function render () {
                var selector = this.selector;
                selector.shouldComponentUpdate = false;
                if (selector.error) {
                    throw selector.error;
                }
                else {
                    return inferno.normalizeProps(inferno.createComponentVNode(2 /* ComponentUnknown */, WrappedComponent, this.addExtraProps(selector.props), null, withRef ? this.setWrappedInstance : null));
                }
            };

            return Connect;
        }(inferno.Component));
        Connect.displayName = displayName;
        Connect.WrappedComponent = WrappedComponent;
        {
            Connect.prototype.componentWillUpdate = function componentWillUpdate() {
                if (this.version !== version) {
                    // We are hot reloading!
                    this.version = version;
                    this.initSelector();
                    if (this.subscription) {
                        this.subscription.tryUnsubscribe();
                    }
                    this.initSubscription();
                    if (shouldHandleStateChanges) {
                        this.subscription.trySubscribe();
                    }
                }
            };
        }
        return hoistNonReactStatics(Connect, WrappedComponent);
    };
    return wrapWithConnect;
}

// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return isArray(children) ? children : children ? [children] : children;
}
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isNull(o) {
    return o === null;
}
function isUndefined(o) {
    return o === void 0;
}

var warning$1 = function (message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        // tslint:disable-next-line:no-console
        console.error(message);
    }
    try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
        // tslint:disable-next-line:no-empty
    }
    catch (e) { }
};

var didWarnAboutReceivingStore = false;
var warnAboutReceivingStore = function () {
    if (didWarnAboutReceivingStore) {
        return;
    }
    didWarnAboutReceivingStore = true;
    warning$1('<Provider> does not support changing `store` on the fly.');
};
var Provider = (function (Component) {
    function Provider(props, context) {
        Component.call(this, props, context);
        this.store = props.store;
    }

    if ( Component ) Provider.__proto__ = Component;
    Provider.prototype = Object.create( Component && Component.prototype );
    Provider.prototype.constructor = Provider;
    Provider.prototype.getChildContext = function getChildContext () {
        return { store: this.store, storeSubscription: null };
    };
    Provider.prototype.render = function render () {
        var children = this.props.children;
        // TODO: Maybe not allocate an array here for no reason?
        if (isNullOrUndef(children) || toArray(children).length !== 1) {
            throw Error('Inferno Error: Only one child is allowed within the `Provider` component');
        }
        return children;
    };

    return Provider;
}(inferno.Component));
Provider.displayName = 'Provider';
{
    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var ref = this;
        var store = ref.store;
        var nextStore = nextProps.store;
        if (store !== nextStore) {
            warnAboutReceivingStore();
        }
    };
}

var hasOwn = Object.prototype.hasOwnProperty;
var shallowEqual = function (a, b) {
    if (a === b) {
        return true;
    }
    var countA = 0;
    var countB = 0;
    for (var key in a) {
        if (hasOwn.call(a, key) && a[key] !== b[key]) {
            return false;
        }
        countA++;
    }
    for (var key$1 in b) {
        if (hasOwn.call(b, key$1)) {
            countB++;
        }
    }
    return countA === countB;
};

function isPlainObject(value) {
    if (typeof value !== 'object' || value + '' !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}
var verifyPlainObject = function (value, displayName, methodName) {
    if (!isPlainObject(value)) {
        warning$1((methodName + "() in " + displayName + " must return a plain object. Instead received " + value + "."));
    }
};

// TODO: Type
var wrapMapToPropsConstant = function (getConstant) {
    return function (dispatch, options) {
        var constant = getConstant(dispatch, options);
        var constantSelector = function () { return constant; };
        constantSelector.dependsOnOwnProps = false;
        return constantSelector;
    };
};
// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
var getDependsOnOwnProps = function (mapToProps) { return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? !!mapToProps.dependsOnOwnProps : mapToProps.length !== 1; };
// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//
var wrapMapToPropsFunc = function (mapToProps, methodName) {
    return function (dispatch, ref) {
        var displayName = ref.displayName;

        var proxy = function (stateOrDispatch, ownProps) { return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch); };
        proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
        proxy.mapToProps = function (stateOrDispatch, ownProps) {
            proxy.mapToProps = mapToProps;
            var props = proxy(stateOrDispatch, ownProps);
            if (typeof props === 'function') {
                proxy.mapToProps = props;
                proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
                props = proxy(stateOrDispatch, ownProps);
            }
            {
                verifyPlainObject(props, displayName, methodName);
            }
            return props;
        };
        return proxy;
    };
};

var whenMapDispatchToPropsIsFunction = function (mapDispatchToProps) { return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined; };
var whenMapDispatchToPropsIsMissing = function (mapDispatchToProps) { return (!mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) { return ({ dispatch: dispatch }); }) : undefined); };
var whenMapDispatchToPropsIsObject = function (mapDispatchToProps) { return mapDispatchToProps && typeof mapDispatchToProps === 'object'
    ? wrapMapToPropsConstant(function (dispatch) { return redux.bindActionCreators(mapDispatchToProps, dispatch); })
    : undefined; };
var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

var whenMapStateToPropsIsFunction = function (mapStateToProps) { return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined; };
var whenMapStateToPropsIsMissing = function (mapStateToProps) { return (!mapStateToProps ? wrapMapToPropsConstant(function () { return ({}); }) : undefined); };
var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

var defaultMergeProps = function (stateProps, dispatchProps, ownProps) { return (Object.assign({}, ownProps, stateProps, dispatchProps)); };
var wrapMergePropsFunc = function (mergeProps) {
    return function (dispatch, ref) {
        var displayName = ref.displayName;
        var pure = ref.pure;
        var areMergedPropsEqual = ref.areMergedPropsEqual;

        var hasRunOnce = false;
        var mergedProps;
        return function (stateProps, dispatchProps, ownProps) {
            var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
            if (hasRunOnce) {
                if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) {
                    mergedProps = nextMergedProps;
                }
            }
            else {
                hasRunOnce = true;
                mergedProps = nextMergedProps;
                {
                    verifyPlainObject(mergedProps, displayName, 'mergeProps');
                }
            }
            return mergedProps;
        };
    };
};
var whenMergePropsIsFunction = function (mergeProps) { return (typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined); };
var whenMergePropsIsOmitted = function (mergeProps) { return (!mergeProps ? function () { return defaultMergeProps; } : undefined); };
var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

var verify = function (selector, methodName, displayName) {
    if (!selector) {
        throw new Error(("Unexpected value for " + methodName + " in " + displayName + "."));
    }
    if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
        if (!selector.hasOwnProperty('dependsOnOwnProps')) {
            warning$1(("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps."));
        }
    }
};
var verifySubselectors = function (mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
    verify(mapStateToProps, 'mapStateToProps', displayName);
    verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
    verify(mergeProps, 'mergeProps', displayName);
};

var impureFinalPropsSelectorFactory = function (mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
    return function (state, ownProps) {
        return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
    };
};
var pureFinalPropsSelectorFactory = function (mapStateToProps, mapDispatchToProps, mergeProps, dispatch, ref) {
    var areStatesEqual = ref.areStatesEqual;
    var areOwnPropsEqual = ref.areOwnPropsEqual;
    var areStatePropsEqual = ref.areStatePropsEqual;

    var hasRunAtLeastOnce = false;
    var state;
    var ownProps;
    var stateProps;
    var dispatchProps;
    var mergedProps;
    var handleFirstCall = function (firstState, firstOwnProps) {
        state = firstState;
        ownProps = firstOwnProps;
        stateProps = mapStateToProps(state, ownProps);
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        hasRunAtLeastOnce = true;
        return mergedProps;
    };
    var handleNewPropsAndNewState = function () {
        stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) {
            dispatchProps = mapDispatchToProps(dispatch, ownProps);
        }
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    };
    var handleNewProps = function () {
        if (mapStateToProps.dependsOnOwnProps) {
            stateProps = mapStateToProps(state, ownProps);
        }
        if (mapDispatchToProps.dependsOnOwnProps) {
            dispatchProps = mapDispatchToProps(dispatch, ownProps);
        }
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    };
    var handleNewState = function () {
        var nextStateProps = mapStateToProps(state, ownProps);
        var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
        stateProps = nextStateProps;
        if (statePropsChanged) {
            mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        }
        return mergedProps;
    };
    var handleSubsequentCalls = function (nextState, nextOwnProps) {
        var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
        var stateChanged = !areStatesEqual(nextState, state);
        state = nextState;
        ownProps = nextOwnProps;
        if (propsChanged && stateChanged) {
            return handleNewPropsAndNewState();
        }
        if (propsChanged) {
            return handleNewProps();
        }
        if (stateChanged) {
            return handleNewState();
        }
        return mergedProps;
    };
    var pureFinalPropsSelector = function (nextState, nextOwnProps) { return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps); };
    return pureFinalPropsSelector;
};
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.
var defaultSelectorFactory = function (dispatch, _a) {
    var initMapStateToProps = _a.initMapStateToProps;
    var initMapDispatchToProps = _a.initMapDispatchToProps;
    var initMergeProps = _a.initMergeProps;
    var opts = __rest(_a, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);
    var options = opts; // trick typescript
    var mapStateToProps = initMapStateToProps(dispatch, options);
    var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
    var mergeProps = initMergeProps(dispatch, options);
    {
        verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
    }
    var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
    return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
};

var match = function (arg, factories, name) {
    for (var i = factories.length - 1; i >= 0; i--) {
        var result = factories[i](arg);
        if (result) {
            return result;
        }
    }
    return function (dispatch, options) {
        throw new Error(("Invalid value of type " + (typeof arg) + " for " + name + " argument when connecting component " + (options.wrappedComponentName) + "."));
    };
};
var strictEqual = function (a, b) { return a === b; };
// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
var createConnect = function (ref) {
    if ( ref === void 0 ) ref = {};
    var connectHOC = ref.connectHOC; if ( connectHOC === void 0 ) connectHOC = connectAdvanced;
    var mapStateToPropsFactories = ref.mapStateToPropsFactories; if ( mapStateToPropsFactories === void 0 ) mapStateToPropsFactories = defaultMapStateToPropsFactories;
    var mapDispatchToPropsFactories = ref.mapDispatchToPropsFactories; if ( mapDispatchToPropsFactories === void 0 ) mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories;
    var mergePropsFactories = ref.mergePropsFactories; if ( mergePropsFactories === void 0 ) mergePropsFactories = defaultMergePropsFactories;
    var selectorFactory = ref.selectorFactory; if ( selectorFactory === void 0 ) selectorFactory = defaultSelectorFactory;

    return function (mapStateToProps, mapDispatchToProps, mergeProps, _a) {
    if ( _a === void 0 ) _a = {};

    var pure = _a.pure; if ( pure === void 0 ) pure = true;
    var areStatesEqual = _a.areStatesEqual; if ( areStatesEqual === void 0 ) areStatesEqual = strictEqual;
    var areOwnPropsEqual = _a.areOwnPropsEqual; if ( areOwnPropsEqual === void 0 ) areOwnPropsEqual = shallowEqual;
    var areStatePropsEqual = _a.areStatePropsEqual; if ( areStatePropsEqual === void 0 ) areStatePropsEqual = shallowEqual;
    var areMergedPropsEqual = _a.areMergedPropsEqual; if ( areMergedPropsEqual === void 0 ) areMergedPropsEqual = shallowEqual;
    var extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, Object.assign({ 
        // used in error messages
        methodName: 'connect', 
        // used to compute Connect's displayName from the wrapped component's displayName.
        // tslint:disable-next-line:object-literal-sort-keys
        getDisplayName: function (name) { return ("Connect(" + name + ")"); }, 
        // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
        shouldHandleStateChanges: !!mapStateToProps, 
        // passed through to selectorFactory
        areMergedPropsEqual: areMergedPropsEqual,
        areOwnPropsEqual: areOwnPropsEqual,
        areStatePropsEqual: areStatePropsEqual,
        areStatesEqual: areStatesEqual,
        initMapDispatchToProps: initMapDispatchToProps,
        initMapStateToProps: initMapStateToProps,
        initMergeProps: initMergeProps,
        pure: pure }, extraOptions));
};
};
var connect = createConnect();

function wrapActionCreators(actionCreators) {
    return function (dispatch) {
        return redux.bindActionCreators(actionCreators, dispatch);
    };
}

exports.Provider = Provider;
exports.connectAdvanced = connectAdvanced;
exports.connect = connect;
exports.wrapActionCreators = wrapActionCreators;

},{"hoist-non-inferno-statics":127,"inferno":141,"redux":163}],134:[function(require,module,exports){
"use strict";function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}Object.defineProperty(exports,"__esModule",{value:!0});var v=t(require("hoist-non-inferno-statics")),b=require("inferno"),e=require("redux");function m(t,n){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)n.indexOf(r[o])<0&&(e[r[o]]=t[r[o]])}return e}var n=null,r=function(){},o={clear:function(){},notify:function(){},subscribe:function(t){return r}},i=function(){var e=[],r=[];return{clear:function(){e=r=n},notify:function(){for(var t=e=r,n=0;n<t.length;n++)t[n]()},subscribe:function(t){var n=!0;return r===e&&(r=e.slice()),r.push(t),function(){n&&null!==e&&(n=!1,r===e&&(r=e.slice()),r.splice(r.indexOf(t),1))}}}},y=function(t,n,e){this.store=t,this.parentSub=n,this.onStateChange=e,this.unsubscribe=null,this.listeners=o};y.prototype.addNestedSub=function(t){return this.trySubscribe(),this.listeners.subscribe(t)},y.prototype.notifyNestedSubs=function(){this.listeners.notify()},y.prototype.isSubscribed=function(){return Boolean(this.unsubscribe)},y.prototype.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.onStateChange):this.store.subscribe(this.onStateChange),this.listeners=i())},y.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=o)};var P=0,S={},O=function(){},C=function(e,r){var o={error:null,props:{},run:function(t){try{var n=e(r.getState(),t);(n!==o.props||o.error)&&(o.shouldComponentUpdate=!0,o.props=n,o.error=null)}catch(t){o.shouldComponentUpdate=!0,o.error=t}},shouldComponentUpdate:!1};return o},w=function(t,n){if(!t)throw new Error(n)};function g(t){return"ConnectAdvanced("+t+")"}function s(i,t){var s=t.getDisplayName;void 0===s&&(s=g);var p=t.methodName;void 0===p&&(p="connectAdvanced");var u=t.renderCountProp;void 0===u&&(u=null);var a=t.shouldHandleStateChanges;void 0===a&&(a=!0);var c=t.storeKey;void 0===c&&(c="store");var d=t.withRef;void 0===d&&(d=!1);var h=m(t,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef"]),f=c+"Subscription",l=P++;return function(n){w("function"==typeof n,"You must pass a component to the function returned by connect. Instead received "+n);var t=n.displayName||n.name||"Component",r=s(t),o=Object.assign({},h,{WrappedComponent:n,displayName:r,getDisplayName:s,methodName:p,renderCountProp:u,shouldHandleStateChanges:a,storeKey:c,withRef:d,wrappedComponentName:t}),e=function(e){function t(t,n){e.call(this,t,n),this.version=l,this.state={},this.renderCount=0,this.store=this.props[c]||this.context[c],this.propsMode=Boolean(t[c]),this.setWrappedInstance=this.setWrappedInstance.bind(this),w(!!this.store,'Could not find "'+c+'" in either the context or props of "'+r+'". Either wrap the root component in a <Provider>, or explicitly pass "'+c+'" as a prop to "'+r+'".'),this.initSelector(),this.initSubscription()}return e&&(t.__proto__=e),((t.prototype=Object.create(e&&e.prototype)).constructor=t).prototype.getChildContext=function(){var t,n=this.propsMode?null:this.subscription;return(t={})[f]=n||this.context[f],t},t.prototype.componentDidMount=function(){a&&(this.subscription.trySubscribe(),this.selector.run(this.props),this.selector.shouldComponentUpdate&&this.forceUpdate())},t.prototype.componentWillReceiveProps=function(t){this.selector.run(t)},t.prototype.shouldComponentUpdate=function(){return this.selector.shouldComponentUpdate},t.prototype.componentWillUnmount=function(){this.subscription&&this.subscription.tryUnsubscribe(),this.subscription=null,this.notifyNestedSubs=O,this.store=null,this.selector.run=O,this.selector.shouldComponentUpdate=!1},t.prototype.getWrappedInstance=function(){return w(d,"To access the wrapped instance, you need to specify { withRef: true } in the options argument of the "+p+"() call."),this.wrappedInstance},t.prototype.setWrappedInstance=function(t){this.wrappedInstance=t},t.prototype.initSelector=function(){var t=i(this.store.dispatch,o);this.selector=C(t,this.store),this.selector.run(this.props)},t.prototype.initSubscription=function(){if(a){var t=(this.propsMode?this.props:this.context)[f];this.subscription=new y(this.store,t,this.onStateChange.bind(this)),this.notifyNestedSubs=this.subscription.notifyNestedSubs.bind(this.subscription)}},t.prototype.onStateChange=function(){this.selector.run(this.props),this.selector.shouldComponentUpdate?(this.componentDidUpdate=this.notifyNestedSubsOnComponentDidUpdate,this.setState(S)):this.notifyNestedSubs()},t.prototype.notifyNestedSubsOnComponentDidUpdate=function(){this.componentDidUpdate=void 0,this.notifyNestedSubs()},t.prototype.isSubscribed=function(){return Boolean(this.subscription&&this.subscription.isSubscribed())},t.prototype.addExtraProps=function(t){if(!u)return t;var n=Object.assign({},t);return u&&(n[u]=this.renderCount++),this.propsMode&&this.subscription&&(n[f]=this.subscription),n},t.prototype.render=function(){var t=this.selector;if(t.shouldComponentUpdate=!1,t.error)throw t.error;return b.normalizeProps(b.createComponentVNode(2,n,this.addExtraProps(t.props),null,d?this.setWrappedInstance:null))},t}(b.Component);return e.displayName=r,e.WrappedComponent=n,v(e,n)}}var p=!("undefined"==typeof window||!window.document);function u(t){return a(t)?t:t?[t]:t}var a=Array.isArray;function c(t){return h(t)||d(t)}function d(t){return null===t}function h(t){return void 0===t}var f=function(e){function t(t,n){e.call(this,t,n),this.store=t.store}return e&&(t.__proto__=e),((t.prototype=Object.create(e&&e.prototype)).constructor=t).prototype.getChildContext=function(){return{store:this.store,storeSubscription:null}},t.prototype.render=function(){var t=this.props.children;if(c(t)||1!==u(t).length)throw Error("Inferno Error: Only one child is allowed within the `Provider` component");return t},t}(b.Component);f.displayName="Provider";var l=Object.prototype.hasOwnProperty,N=function(t,n){if(t===n)return!0;var e=0,r=0;for(var o in t){if(l.call(t,o)&&t[o]!==n[o])return!1;e++}for(var i in n)l.call(n,i)&&r++;return e===r},E=function(o){return function(t,n){var e=o(t,n),r=function(){return e};return r.dependsOnOwnProps=!1,r}},q=function(t){return null!==t.dependsOnOwnProps&&void 0!==t.dependsOnOwnProps?!!t.dependsOnOwnProps:1!==t.length},M=function(o,t){return function(t,n){n.displayName;var r=function(t,n){return r.dependsOnOwnProps?r.mapToProps(t,n):r.mapToProps(t)};return r.dependsOnOwnProps=q(o),r.mapToProps=function(t,n){r.mapToProps=o;var e=r(t,n);return"function"==typeof e&&(r.mapToProps=e,r.dependsOnOwnProps=q(e),e=r(t,n)),e},r}},x=function(t){return"function"==typeof t?M(t,"mapDispatchToProps"):void 0},T=function(t){return t?void 0:E(function(t){return{dispatch:t}})},U=function(n){return n&&"object"==typeof n?E(function(t){return e.bindActionCreators(n,t)}):void 0},D=[x,T,U],j=function(t){return"function"==typeof t?M(t,"mapStateToProps"):void 0},I=function(t){return t?void 0:E(function(){return{}})},_=[j,I],W=function(t,n,e){return Object.assign({},e,t,n)},A=function(u){return function(t,n){n.displayName;var o,i=n.pure,s=n.areMergedPropsEqual,p=!1;return function(t,n,e){var r=u(t,n,e);return p?i&&s(r,o)||(o=r):(p=!0,o=r),o}}},H=function(t){return"function"==typeof t?A(t):void 0},R=function(t){return t?void 0:function(){return W}},F=[H,R],B=function(e,r,o,i){return function(t,n){return o(e(t,n),r(i,n),n)}},K=function(u,a,c,d,t){var h,f,l,v,b,y=t.areStatesEqual,m=t.areOwnPropsEqual,P=t.areStatePropsEqual,S=!1;return function(t,n){return S?(e=t,s=!m(r=n,f),p=!y(e,h),h=e,f=r,s&&p?(l=u(h,f),a.dependsOnOwnProps&&(v=a(d,f)),b=c(l,v,f)):s?(u.dependsOnOwnProps&&(l=u(h,f)),a.dependsOnOwnProps&&(v=a(d,f)),b=c(l,v,f)):(p&&(o=u(h,f),i=!P(o,l),l=o,i&&(b=c(l,v,f))),b)):(l=u(h=t,f=n),v=a(d,f),b=c(l,v,f),S=!0,b);var e,r,o,i,s,p}},z=function(t,n){var e=n.initMapStateToProps,r=n.initMapDispatchToProps,o=n.initMergeProps,i=m(n,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),s=e(t,i),p=r(t,i),u=o(t,i);return(i.pure?K:B)(s,p,u,t,i)},V=function(e,t,r){for(var n=t.length-1;0<=n;n--){var o=t[n](e);if(o)return o}return function(t,n){throw new Error("Invalid value of type "+typeof e+" for "+r+" argument when connecting component "+n.wrappedComponentName+".")}},Y=function(t,n){return t===n},k=function(t){void 0===t&&(t={});var f=t.connectHOC;void 0===f&&(f=s);var l=t.mapStateToPropsFactories;void 0===l&&(l=_);var v=t.mapDispatchToPropsFactories;void 0===v&&(v=D);var b=t.mergePropsFactories;void 0===b&&(b=F);var y=t.selectorFactory;return void 0===y&&(y=z),function(t,n,e,r){void 0===r&&(r={});var o=r.pure;void 0===o&&(o=!0);var i=r.areStatesEqual;void 0===i&&(i=Y);var s=r.areOwnPropsEqual;void 0===s&&(s=N);var p=r.areStatePropsEqual;void 0===p&&(p=N);var u=r.areMergedPropsEqual;void 0===u&&(u=N);var a=m(r,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),c=V(t,l,"mapStateToProps"),d=V(n,v,"mapDispatchToProps"),h=V(e,b,"mergeProps");return f(y,Object.assign({methodName:"connect",getDisplayName:function(t){return"Connect("+t+")"},shouldHandleStateChanges:!!t,areMergedPropsEqual:u,areOwnPropsEqual:s,areStatePropsEqual:p,areStatesEqual:i,initMapDispatchToProps:d,initMapStateToProps:c,initMergeProps:h,pure:o},a))}},G=k();function J(n){return function(t){return e.bindActionCreators(n,t)}}exports.Provider=f,exports.connectAdvanced=s,exports.connect=G,exports.wrapActionCreators=J;

},{"hoist-non-inferno-statics":127,"inferno":141,"redux":163}],135:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./dist/index.cjs.js":133,"./dist/index.cjs.min.js":134,"_process":153,"dup":132}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return isArray(children) ? children : children ? [children] : children;
}
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.error(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

exports.NO_OP = NO_OP;
exports.ERROR_MSG = ERROR_MSG;
exports.isBrowser = isBrowser;
exports.toArray = toArray;
exports.isArray = isArray;
exports.isStringOrNumber = isStringOrNumber;
exports.isNullOrUndef = isNullOrUndef;
exports.isInvalid = isInvalid;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isNull = isNull;
exports.isTrue = isTrue;
exports.isUndefined = isUndefined;
exports.isObject = isObject;
exports.throwError = throwError;
exports.warning = warning;
exports.combineFrom = combineFrom;

},{}],137:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r="$NO_OP",n="a runtime error occured! Use Inferno in development environment to find the error.",e=!("undefined"==typeof window||!window.document);function t(r){return o(r)?r:r?[r]:r}var o=Array.isArray;function i(r){var n=typeof r;return"string"===n||"number"===n}function u(r){return a(r)||x(r)}function s(r){return x(r)||!1===r||d(r)||a(r)}function f(r){return"function"==typeof r}function p(r){return"string"==typeof r}function c(r){return"number"==typeof r}function x(r){return null===r}function d(r){return!0===r}function a(r){return void 0===r}function l(r){return"object"==typeof r}function v(r){throw r||(r=n),new Error("Inferno Error: "+r)}function y(r){console.error(r)}function m(r,n){var e={};if(r)for(var t in r)e[t]=r[t];if(n)for(var o in n)e[o]=n[o];return e}exports.NO_OP=r,exports.ERROR_MSG=n,exports.isBrowser=e,exports.toArray=t,exports.isArray=o,exports.isStringOrNumber=i,exports.isNullOrUndef=u,exports.isInvalid=s,exports.isFunction=f,exports.isString=p,exports.isNumber=c,exports.isNull=x,exports.isTrue=d,exports.isUndefined=a,exports.isObject=l,exports.throwError=v,exports.warning=y,exports.combineFrom=m;

},{}],138:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./dist/index.cjs.js":136,"./dist/index.cjs.min.js":137,"_process":153,"dup":132}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.error(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

function getTagName(input) {
    var tagName;
    if (isArray(input)) {
        var arrayText = input.length > 3 ? input.slice(0, 3).toString() + ',...' : input.toString();
        tagName = 'Array(' + arrayText + ')';
    }
    else if (isStringOrNumber(input)) {
        tagName = 'Text(' + input + ')';
    }
    else if (isInvalid(input)) {
        tagName = 'InvalidVNode(' + input + ')';
    }
    else {
        var flags = input.flags;
        if (flags & 481 /* Element */) {
            tagName = "<" + (input.type) + (input.className ? ' class="' + input.className + '"' : '') + ">";
        }
        else if (flags & 16 /* Text */) {
            tagName = "Text(" + (input.children) + ")";
        }
        else if (flags & 1024 /* Portal */) {
            tagName = "Portal*";
        }
        else {
            var type = input.type;
            // Fallback for IE
            var componentName = type.name || type.displayName || type.constructor.name || (type.toString().match(/^function\s*([^\s(]+)/) || [])[1];
            tagName = "<" + componentName + " />";
        }
    }
    return '>> ' + tagName + '\n';
}
function DEV_ValidateKeys(vNodeTree, vNode, forceKeyed) {
    var foundKeys = {};
    for (var i = 0, len = vNodeTree.length; i < len; i++) {
        var childNode = vNodeTree[i];
        if (isArray(childNode)) {
            return 'Encountered ARRAY in mount, array must be flattened, or normalize used. Location: \n' + getTagName(childNode);
        }
        if (isInvalid(childNode)) {
            if (forceKeyed) {
                return 'Encountered invalid node when preparing to keyed algorithm. Location: \n' + getTagName(childNode);
            }
            else if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered invalid node with mixed keys. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (typeof childNode === 'object') {
            childNode.isValidated = true;
        }
        // Key can be undefined, null too. But typescript complains for no real reason
        var key = childNode.key;
        if (!isNullOrUndef(key) && !isStringOrNumber(key)) {
            return 'Encountered child vNode where key property is not string or number. Location: \n' + getTagName(childNode);
        }
        var children = childNode.children;
        var childFlags = childNode.childFlags;
        if (!isInvalid(children)) {
            var val = (void 0);
            if (childFlags & 12 /* MultipleChildren */) {
                val = DEV_ValidateKeys(children, childNode, childNode.childFlags & 8 /* HasKeyedChildren */);
            }
            else if (childFlags === 2 /* HasVNodeChildren */) {
                val = DEV_ValidateKeys([children], childNode, childNode.childFlags & 8 /* HasKeyedChildren */);
            }
            if (val) {
                val += getTagName(childNode);
                return val;
            }
        }
        if (forceKeyed && isNullOrUndef(key)) {
            return ('Encountered child without key during keyed algorithm. If this error points to Array make sure children is flat list. Location: \n' +
                getTagName(childNode));
        }
        else if (!forceKeyed && isNullOrUndef(key)) {
            if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered children with key missing. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (foundKeys[key]) {
            return 'Encountered two children with same key: {' + key + '}. Location: \n' + getTagName(childNode);
        }
        foundKeys[key] = true;
    }
}
function validateVNodeElementChildren(vNode) {
    {
        if (vNode.childFlags & 1 /* HasInvalidChildren */) {
            return;
        }
        if (vNode.flags & 64 /* InputElement */) {
            throwError("input elements can't have children.");
        }
        if (vNode.flags & 128 /* TextareaElement */) {
            throwError("textarea elements can't have children.");
        }
        if (vNode.flags & 481 /* Element */) {
            var voidTypes = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
            var tag = vNode.type.toLowerCase();
            if (tag === 'media') {
                throwError("media elements can't have children.");
            }
            var idx = voidTypes.indexOf(tag);
            if (idx !== -1) {
                throwError(((voidTypes[idx]) + " elements can't have children."));
            }
        }
    }
}
function validateKeys(vNode) {
    {
        // Checks if there is any key missing or duplicate keys
        if (vNode.isValidated === false && vNode.children && vNode.flags & 481 /* Element */) {
            var error = DEV_ValidateKeys(Array.isArray(vNode.children) ? vNode.children : [vNode.children], vNode, (vNode.childFlags & 8 /* HasKeyedChildren */) > 0);
            if (error) {
                throwError(error + getTagName(vNode));
            }
        }
        vNode.isValidated = true;
    }
}

var keyPrefix = '$';
function getVNode(childFlags, children, className, flags, key, props, ref, type) {
    {
        return {
            childFlags: childFlags,
            children: children,
            className: className,
            dom: null,
            flags: flags,
            isValidated: false,
            key: key === void 0 ? null : key,
            parentVNode: null,
            props: props === void 0 ? null : props,
            ref: ref === void 0 ? null : ref,
            type: type
        };
    }
    return {
        childFlags: childFlags,
        children: children,
        className: className,
        dom: null,
        flags: flags,
        key: key === void 0 ? null : key,
        parentVNode: null,
        props: props === void 0 ? null : props,
        ref: ref === void 0 ? null : ref,
        type: type
    };
}
function createVNode(flags, type, className, children, childFlags, props, key, ref) {
    {
        if (flags & 14 /* Component */) {
            throwError('Creating Component vNodes using createVNode is not allowed. Use Inferno.createComponentVNode method.');
        }
    }
    var childFlag = childFlags === void 0 ? 1 /* HasInvalidChildren */ : childFlags;
    var vNode = getVNode(childFlag, children, className, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (typeof optsVNode === 'function') {
        optsVNode(vNode);
    }
    if (childFlag === 0 /* UnknownChildren */) {
        normalizeChildren(vNode, vNode.children);
    }
    {
        validateVNodeElementChildren(vNode);
    }
    return vNode;
}
function createComponentVNode(flags, type, props, key, ref) {
    {
        if (flags & 1 /* HtmlElement */) {
            throwError('Creating element vNodes using createComponentVNode is not allowed. Use Inferno.createVNode method.');
        }
    }
    if ((flags & 2 /* ComponentUnknown */) > 0) {
        flags = type.prototype && isFunction(type.prototype.render) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    // set default props
    var defaultProps = type.defaultProps;
    if (!isNullOrUndef(defaultProps)) {
        if (!props) {
            props = {}; // Props can be referenced and modified at application level so always create new object
        }
        for (var prop in defaultProps) {
            if (isUndefined(props[prop])) {
                props[prop] = defaultProps[prop];
            }
        }
    }
    if ((flags & 8 /* ComponentFunction */) > 0) {
        var defaultHooks = type.defaultHooks;
        if (!isNullOrUndef(defaultHooks)) {
            if (!ref) {
                // As ref cannot be referenced from application level, we can use the same refs object
                ref = defaultHooks;
            }
            else {
                for (var prop$1 in defaultHooks) {
                    if (isUndefined(ref[prop$1])) {
                        ref[prop$1] = defaultHooks[prop$1];
                    }
                }
            }
        }
    }
    var vNode = getVNode(1 /* HasInvalidChildren */, null, null, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (isFunction(optsVNode)) {
        optsVNode(vNode);
    }
    return vNode;
}
function createTextVNode(text, key) {
    return getVNode(1 /* HasInvalidChildren */, isNullOrUndef(text) ? '' : text, null, 16 /* Text */, key, null, null, null);
}
function normalizeProps(vNode) {
    var props = vNode.props;
    if (props) {
        var flags = vNode.flags;
        if (flags & 481 /* Element */) {
            if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
                normalizeChildren(vNode, props.children);
            }
            if (props.className !== void 0) {
                vNode.className = props.className || null;
                props.className = undefined;
            }
        }
        if (props.key !== void 0) {
            vNode.key = props.key;
            props.key = undefined;
        }
        if (props.ref !== void 0) {
            if (flags & 8 /* ComponentFunction */) {
                vNode.ref = combineFrom(vNode.ref, props.ref);
            }
            else {
                vNode.ref = props.ref;
            }
            props.ref = undefined;
        }
    }
    return vNode;
}
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 14 /* Component */) {
        var props;
        var propsToClone = vNodeToClone.props;
        if (!isNull(propsToClone)) {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createComponentVNode(flags, vNodeToClone.type, props, vNodeToClone.key, vNodeToClone.ref);
    }
    else if (flags & 481 /* Element */) {
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, vNodeToClone.children, vNodeToClone.childFlags, vNodeToClone.props, vNodeToClone.key, vNodeToClone.ref);
    }
    else if (flags & 16 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    else if (flags & 1024 /* Portal */) {
        newVNode = vNodeToClone;
    }
    return newVNode;
}
function createVoidVNode() {
    return createTextVNode('', null);
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        if (!isInvalid(n)) {
            var newKey = currentKey + keyPrefix + index;
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, newKey);
            }
            else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, newKey);
                }
                else {
                    var oldKey = n.key;
                    var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;
                    if (!isNull(n.dom) || isPrefixedKey) {
                        n = directClone(n);
                    }
                    if (isNull(oldKey) || isPrefixedKey) {
                        n.key = newKey;
                    }
                    else {
                        n.key = currentKey + oldKey;
                    }
                }
                result.push(n);
            }
        }
    }
}
function getFlagsForElementVnode(type) {
    if (type === 'svg') {
        return 32 /* SvgElement */;
    }
    if (type === 'input') {
        return 64 /* InputElement */;
    }
    if (type === 'select') {
        return 256 /* SelectElement */;
    }
    if (type === 'textarea') {
        return 128 /* TextareaElement */;
    }
    return 1 /* HtmlElement */;
}
function normalizeChildren(vNode, children) {
    var newChildren;
    var newChildFlags = 1 /* HasInvalidChildren */;
    // Don't change children to match strict equal (===) true in patching
    if (isInvalid(children)) {
        newChildren = children;
    }
    else if (isString(children)) {
        newChildFlags = 2 /* HasVNodeChildren */;
        newChildren = createTextVNode(children);
    }
    else if (isNumber(children)) {
        newChildFlags = 2 /* HasVNodeChildren */;
        newChildren = createTextVNode(children + '');
    }
    else if (isArray(children)) {
        var len = children.length;
        if (len === 0) {
            newChildren = null;
            newChildFlags = 1 /* HasInvalidChildren */;
        }
        else {
            // we assign $ which basically means we've flagged this array for future note
            // if it comes back again, we need to clone it, as people are using it
            // in an immutable way
            // tslint:disable-next-line
            if (Object.isFrozen(children) || children['$'] === true) {
                children = children.slice();
            }
            newChildFlags = 8 /* HasKeyedChildren */;
            for (var i = 0; i < len; i++) {
                var n = children[i];
                if (isInvalid(n) || isArray(n)) {
                    newChildren = newChildren || children.slice(0, i);
                    _normalizeVNodes(children, newChildren, i, '');
                    break;
                }
                else if (isStringOrNumber(n)) {
                    newChildren = newChildren || children.slice(0, i);
                    newChildren.push(createTextVNode(n, keyPrefix + i));
                }
                else {
                    var key = n.key;
                    var isNullDom = isNull(n.dom);
                    var isNullKey = isNull(key);
                    var isPrefixed = !isNullKey && key[0] === keyPrefix;
                    if (!isNullDom || isNullKey || isPrefixed) {
                        newChildren = newChildren || children.slice(0, i);
                        if (!isNullDom || isPrefixed) {
                            n = directClone(n);
                        }
                        if (isNullKey || isPrefixed) {
                            n.key = keyPrefix + i;
                        }
                        newChildren.push(n);
                    }
                    else if (newChildren) {
                        newChildren.push(n);
                    }
                }
            }
            newChildren = newChildren || children;
            newChildren.$ = true;
        }
    }
    else {
        newChildren = children;
        if (!isNull(children.dom)) {
            newChildren = directClone(children);
        }
        newChildFlags = 2 /* HasVNodeChildren */;
    }
    vNode.children = newChildren;
    vNode.childFlags = newChildFlags;
    {
        validateVNodeElementChildren(vNode);
    }
    return vNode;
}
var options = {
    afterRender: null,
    beforeRender: null,
    createVNode: null,
    renderComplete: null
};

/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    if (isFunction(event)) {
        return { data: data, event: event };
    }
    return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
}

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var svgNS = 'http://www.w3.org/2000/svg';
var namespaces = {
    'xlink:actuate': xlinkNS,
    'xlink:arcrole': xlinkNS,
    'xlink:href': xlinkNS,
    'xlink:role': xlinkNS,
    'xlink:show': xlinkNS,
    'xlink:title': xlinkNS,
    'xlink:type': xlinkNS,
    'xml:base': xmlNS,
    'xml:lang': xmlNS,
    'xml:space': xmlNS
};

// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};
var LIFECYCLE = [];
{
    Object.freeze(EMPTY_OBJ);
}
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
function insertOrAppend(parentDom, newNode, nextNode) {
    if (isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(svgNS, tag);
    }
    return document.createElement(tag);
}
function replaceChild(parentDom, newDom, lastDom) {
    parentDom.replaceChild(newDom, lastDom);
}
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
function callAll(arrayFn) {
    var listener;
    while ((listener = arrayFn.shift()) !== undefined) {
        listener();
    }
}

var attachedEventCounts = {};
var attachedEvents = {};
function handleEvent(name, nextEvent, dom) {
    var eventsLeft = attachedEventCounts[name];
    var eventsObject = dom.$EV;
    if (nextEvent) {
        if (!eventsLeft) {
            attachedEvents[name] = attachEventToDocument(name);
            attachedEventCounts[name] = 0;
        }
        if (!eventsObject) {
            eventsObject = dom.$EV = {};
        }
        if (!eventsObject[name]) {
            attachedEventCounts[name]++;
        }
        eventsObject[name] = nextEvent;
    }
    else if (eventsObject && eventsObject[name]) {
        attachedEventCounts[name]--;
        if (eventsLeft === 1) {
            document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
            attachedEvents[name] = null;
        }
        eventsObject[name] = nextEvent;
    }
}
function dispatchEvents(event, target, isClick, name, eventData) {
    var dom = target;
    while (!isNull(dom)) {
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (isClick && dom.disabled) {
            return;
        }
        var eventsObject = dom.$EV;
        if (eventsObject) {
            var currentEvent = eventsObject[name];
            if (currentEvent) {
                // linkEvent object
                eventData.dom = dom;
                if (currentEvent.event) {
                    currentEvent.event(currentEvent.data, event);
                }
                else {
                    currentEvent(event);
                }
                if (event.cancelBubble) {
                    return;
                }
            }
        }
        dom = dom.parentNode;
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    if (!this.immediatePropagationStopped) {
        this.stopImmediatePropagation();
    }
}
function attachEventToDocument(name) {
    var docEvent = function (event) {
        var type = event.type;
        var isClick = type === 'click' || type === 'dblclick';
        if (isClick && event.button !== 0) {
            // Firefox incorrectly triggers click event for mid/right mouse buttons.
            // This bug has been active for 12 years.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
            event.stopPropagation();
            return false;
        }
        event.stopPropagation = stopPropagation;
        // Event data needs to be object to save reference to currentTarget getter
        var eventData = {
            dom: document
        };
        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
                return eventData.dom;
            }
        });
        dispatchEvents(event, event.target, isClick, name, eventData);
        return;
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}

function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}
function isSamePropsInnerHTML(dom, props) {
    return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
}

function triggerEventListener(props, methodName, e) {
    if (props[methodName]) {
        var listener = props[methodName];
        if (listener.event) {
            listener.event(listener.data, e);
        }
        else {
            listener(e);
        }
    }
    else {
        var nativeListenerName = methodName.toLowerCase();
        if (props[nativeListenerName]) {
            props[nativeListenerName](e);
        }
    }
}
function createWrappedFunction(methodName, applyValue) {
    var fnMethod = function (e) {
        e.stopPropagation();
        var vNode = this.$V;
        // If vNode is gone by the time event fires, no-op
        if (!vNode) {
            return;
        }
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (isString(methodName)) {
            triggerEventListener(props, methodName, e);
        }
        else {
            for (var i = 0; i < methodName.length; i++) {
                triggerEventListener(props, methodName[i], e);
            }
        }
        if (isFunction(applyValue)) {
            var newVNode = this.$V;
            var newProps = newVNode.props || EMPTY_OBJ;
            applyValue(newProps, dom, false, newVNode);
        }
    };
    Object.defineProperty(fnMethod, 'wrapped', {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false
    });
    return fnMethod;
}

function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
/* tslint:disable-next-line:no-empty */
function emptywrapper(event) {
    event.stopPropagation();
}
emptywrapper.wrapped = true;
function inputEvents(dom, nextPropsOrEmpty) {
    if (isCheckedType(nextPropsOrEmpty.type)) {
        dom.onchange = wrappedOnChange;
        dom.onclick = emptywrapper;
    }
    else {
        dom.oninput = onTextInputChange;
    }
}
function applyValueInput(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
        else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}

function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        var childFlags = vNode.childFlags;
        if (childFlags & 12 /* MultipleChildren */) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
var onSelectChange = createWrappedFunction('onChange', applyValueSelect);
function selectEvents(dom) {
    dom.onchange = onSelectChange;
}
function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
    var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
    if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
        dom.multiple = multiplePropInBoolean;
    }
    var childFlags = vNode.childFlags;
    if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
        var children = vNode.children;
        var value = nextPropsOrEmpty.value;
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (childFlags & 12 /* MultipleChildren */) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            updateChildOptionGroup(children, value);
        }
    }
}

var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
var wrappedOnChange$1 = createWrappedFunction('onChange');
function textAreaEvents(dom, nextPropsOrEmpty) {
    dom.oninput = onTextareaInputChange;
    if (nextPropsOrEmpty.onChange) {
        dom.onchange = wrappedOnChange$1;
    }
}
function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
                dom.defaultValue = defaultValue;
                dom.value = defaultValue;
            }
        }
    }
    else if (domValue !== value) {
        /* There is value so keep it controlled */
        dom.defaultValue = value;
        dom.value = value;
    }
}

/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 64 /* InputElement */) {
        applyValueInput(nextPropsOrEmpty, dom);
    }
    else if (flags & 256 /* SelectElement */) {
        applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
    }
    else if (flags & 128 /* TextareaElement */) {
        applyValueTextArea(nextPropsOrEmpty, dom, mounting);
    }
    if (isControlled) {
        dom.$V = vNode;
    }
}
function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
    if (flags & 64 /* InputElement */) {
        inputEvents(dom, nextPropsOrEmpty);
    }
    else if (flags & 256 /* SelectElement */) {
        selectEvents(dom);
    }
    else if (flags & 128 /* TextareaElement */) {
        textAreaEvents(dom, nextPropsOrEmpty);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}

function remove(vNode, parentDom) {
    unmount(vNode);
    if (!isNull(parentDom)) {
        removeChild(parentDom, vNode.dom);
        // Let carbage collector free memory
        vNode.dom = null;
    }
}
function unmount(vNode) {
    var flags = vNode.flags;
    if (flags & 481 /* Element */) {
        var ref = vNode.ref;
        var props = vNode.props;
        if (isFunction(ref)) {
            ref(null);
        }
        var children = vNode.children;
        var childFlags = vNode.childFlags;
        if (childFlags & 12 /* MultipleChildren */) {
            unmountAllChildren(children);
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            unmount(children);
        }
        if (!isNull(props)) {
            for (var name in props) {
                switch (name) {
                    case 'onClick':
                    case 'onDblClick':
                    case 'onFocusIn':
                    case 'onFocusOut':
                    case 'onKeyDown':
                    case 'onKeyPress':
                    case 'onKeyUp':
                    case 'onMouseDown':
                    case 'onMouseMove':
                    case 'onMouseUp':
                    case 'onSubmit':
                    case 'onTouchEnd':
                    case 'onTouchMove':
                    case 'onTouchStart':
                        handleEvent(name, null, vNode.dom);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    else if (flags & 14 /* Component */) {
        var instance = vNode.children;
        var ref$1 = vNode.ref;
        if (flags & 4 /* ComponentClass */) {
            if (isFunction(instance.componentWillUnmount)) {
                instance.componentWillUnmount();
            }
            if (isFunction(ref$1)) {
                ref$1(null);
            }
            instance.$UN = true;
            unmount(instance.$LI);
        }
        else {
            if (!isNullOrUndef(ref$1) && isFunction(ref$1.onComponentWillUnmount)) {
                ref$1.onComponentWillUnmount(vNode.dom, vNode.props || EMPTY_OBJ);
            }
            unmount(instance);
        }
    }
    else if (flags & 1024 /* Portal */) {
        var children$1 = vNode.children;
        if (!isNull(children$1) && isObject(children$1)) {
            remove(children$1, vNode.type);
        }
    }
}
function unmountAllChildren(children) {
    for (var i = 0, len = children.length; i < len; i++) {
        unmount(children[i]);
    }
}
function removeAllChildren(dom, children) {
    unmountAllChildren(children);
    dom.textContent = '';
}

function createLinkEvent(linkEvent, nextValue) {
    return function (e) {
        linkEvent(nextValue.data, e);
    };
}
function patchEvent(name, lastValue, nextValue, dom) {
    var nameLowerCase = name.toLowerCase();
    if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
        var linkEvent = nextValue.event;
        if (linkEvent && isFunction(linkEvent)) {
            dom[nameLowerCase] = createLinkEvent(linkEvent, nextValue);
        }
        else {
            // Development warning
            {
                throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
            }
        }
    }
    else {
        var domEvent = dom[nameLowerCase];
        // if the function is wrapped, that means it's been controlled by a wrapper
        if (!domEvent || !domEvent.wrapped) {
            dom[nameLowerCase] = nextValue;
        }
    }
}
function getNumberStyleValue(style, value) {
    switch (style) {
        case 'animationIterationCount':
        case 'borderImageOutset':
        case 'borderImageSlice':
        case 'borderImageWidth':
        case 'boxFlex':
        case 'boxFlexGroup':
        case 'boxOrdinalGroup':
        case 'columnCount':
        case 'fillOpacity':
        case 'flex':
        case 'flexGrow':
        case 'flexNegative':
        case 'flexOrder':
        case 'flexPositive':
        case 'flexShrink':
        case 'floodOpacity':
        case 'fontWeight':
        case 'gridColumn':
        case 'gridRow':
        case 'lineClamp':
        case 'lineHeight':
        case 'opacity':
        case 'order':
        case 'orphans':
        case 'stopOpacity':
        case 'strokeDasharray':
        case 'strokeDashoffset':
        case 'strokeMiterlimit':
        case 'strokeOpacity':
        case 'strokeWidth':
        case 'tabSize':
        case 'widows':
        case 'zIndex':
        case 'zoom':
            return value;
        default:
            return value + 'px';
    }
}
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            // do not add a hasOwnProperty check here, it affects performance
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                domStyle[style] = isNumber(value) ? getNumberStyleValue(style, value) : value;
            }
        }
        for (style in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
    else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            domStyle[style] = isNumber(value) ? getNumberStyleValue(style, value) : value;
        }
    }
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
    switch (prop) {
        case 'onClick':
        case 'onDblClick':
        case 'onFocusIn':
        case 'onFocusOut':
        case 'onKeyDown':
        case 'onKeyPress':
        case 'onKeyUp':
        case 'onMouseDown':
        case 'onMouseMove':
        case 'onMouseUp':
        case 'onSubmit':
        case 'onTouchEnd':
        case 'onTouchMove':
        case 'onTouchStart':
            handleEvent(prop, nextValue, dom);
            break;
        case 'children':
        case 'childrenType':
        case 'className':
        case 'defaultValue':
        case 'key':
        case 'multiple':
        case 'ref':
            break;
        case 'autoFocus':
            dom.autofocus = !!nextValue;
            break;
        case 'allowfullscreen':
        case 'autoplay':
        case 'capture':
        case 'checked':
        case 'controls':
        case 'default':
        case 'disabled':
        case 'hidden':
        case 'indeterminate':
        case 'loop':
        case 'muted':
        case 'novalidate':
        case 'open':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'selected':
            dom[prop] = !!nextValue;
            break;
        case 'defaultChecked':
        case 'value':
        case 'volume':
            if (hasControlledValue && prop === 'value') {
                return;
            }
            var value = isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
            break;
        case 'dangerouslySetInnerHTML':
            var lastHtml = (lastValue && lastValue.__html) || '';
            var nextHtml = (nextValue && nextValue.__html) || '';
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                    if (!isNull(lastVNode)) {
                        if (lastVNode.childFlags & 12 /* MultipleChildren */) {
                            unmountAllChildren(lastVNode.children);
                        }
                        else if (lastVNode.childFlags === 2 /* HasVNodeChildren */) {
                            unmount(lastVNode.children);
                        }
                        lastVNode.children = null;
                        lastVNode.childFlags = 1 /* HasInvalidChildren */;
                    }
                    dom.innerHTML = nextHtml;
                }
            }
            break;
        default:
            if (prop[0] === 'o' && prop[1] === 'n') {
                patchEvent(prop, lastValue, nextValue, dom);
            }
            else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            }
            else if (prop === 'style') {
                patchStyle(lastValue, nextValue, dom);
            }
            else if (isSVG && namespaces[prop]) {
                // We optimize for isSVG being false
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces[prop], prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
            break;
    }
}
function mountProps(vNode, flags, props, dom, isSVG) {
    var hasControlledValue = false;
    var isFormElement = (flags & 448 /* FormElement */) > 0;
    if (isFormElement) {
        hasControlledValue = isControlledFormElement(props);
        if (hasControlledValue) {
            addFormElementEventHandlers(flags, dom, props);
        }
    }
    for (var prop in props) {
        // do not add a hasOwnProperty check here, it affects performance
        patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
    }
    if (isFormElement) {
        processElement(flags, vNode, dom, props, true, hasControlledValue);
    }
}

function createClassComponentInstance(vNode, Component, props, context) {
    var instance = new Component(props, context);
    vNode.children = instance;
    instance.$V = vNode;
    instance.$BS = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    instance.$UN = false;
    if (isFunction(instance.componentWillMount)) {
        instance.$BR = true;
        instance.componentWillMount();
        if (instance.$PSS) {
            var state = instance.state;
            var pending = instance.$PS;
            if (isNull(state)) {
                instance.state = pending;
            }
            else {
                for (var key in pending) {
                    state[key] = pending[key];
                }
            }
            instance.$PSS = false;
            instance.$PS = null;
        }
        instance.$BR = false;
    }
    if (isFunction(options.beforeRender)) {
        options.beforeRender(instance);
    }
    var input = handleComponentInput(instance.render(props, instance.state, context), vNode);
    var childContext;
    if (isFunction(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (isNullOrUndef(childContext)) {
        instance.$CX = context;
    }
    else {
        instance.$CX = combineFrom(context, childContext);
    }
    if (isFunction(options.afterRender)) {
        options.afterRender(instance);
    }
    instance.$LI = input;
    return instance;
}
function handleComponentInput(input, componentVNode) {
    // Development validation
    {
        if (isArray(input)) {
            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
    }
    if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = directClone(input);
        }
        if (input.flags & 14 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = componentVNode;
        }
    }
    return input;
}

function mount(vNode, parentDom, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 481 /* Element */) {
        return mountElement(vNode, parentDom, context, isSVG);
    }
    if (flags & 14 /* Component */) {
        return mountComponent(vNode, parentDom, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    if (flags & 512 /* Void */ || flags & 16 /* Text */) {
        return mountText(vNode, parentDom);
    }
    if (flags & 1024 /* Portal */) {
        mount(vNode.children, vNode.type, context, false);
        return (vNode.dom = mountText(createVoidVNode(), parentDom));
    }
    // Development validation, in production we don't need to throw because it crashes anyway
    {
        if (typeof vNode === 'object') {
            throwError(("mount() received an object that's not a valid VNode, you should stringify it first, fix createVNode flags or call normalizeChildren. Object: \"" + (JSON.stringify(vNode)) + "\"."));
        }
        else {
            throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
        }
    }
}
function mountText(vNode, parentDom) {
    var dom = (vNode.dom = document.createTextNode(vNode.children));
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function mountElement(vNode, parentDom, context, isSVG) {
    var flags = vNode.flags;
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    var childFlags = vNode.childFlags;
    isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
    var dom = documentCreateElement(vNode.type, isSVG);
    vNode.dom = dom;
    if (!isNullOrUndef(className) && className !== '') {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    {
        validateKeys(vNode);
    }
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
        var childrenIsSVG = isSVG === true && vNode.type !== 'foreignObject';
        if (childFlags === 2 /* HasVNodeChildren */) {
            mount(children, dom, context, childrenIsSVG);
        }
        else if (childFlags & 12 /* MultipleChildren */) {
            mountArrayChildren(children, dom, context, childrenIsSVG);
        }
    }
    if (!isNull(props)) {
        mountProps(vNode, flags, props, dom, isSVG);
    }
    {
        if (isString(ref)) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
    }
    if (isFunction(ref)) {
        mountRef(dom, ref);
    }
    return dom;
}
function mountArrayChildren(children, dom, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!isNull(child.dom)) {
            children[i] = child = directClone(child);
        }
        mount(child, dom, context, isSVG);
    }
}
function mountComponent(vNode, parentDom, context, isSVG, isClass) {
    var dom;
    var type = vNode.type;
    var props = vNode.props || EMPTY_OBJ;
    var ref = vNode.ref;
    if (isClass) {
        var instance = createClassComponentInstance(vNode, type, props, context);
        vNode.dom = dom = mount(instance.$LI, null, instance.$CX, isSVG);
        mountClassComponentCallbacks(vNode, ref, instance);
        instance.$UPD = false;
    }
    else {
        var input = handleComponentInput(type(props, context), vNode);
        vNode.children = input;
        vNode.dom = dom = mount(input, null, context, isSVG);
        mountFunctionalComponentCallbacks(props, ref, dom);
    }
    if (!isNull(parentDom)) {
        appendChild(parentDom, dom);
    }
    return dom;
}
function createClassMountCallback(instance) {
    return function () {
        instance.$UPD = true;
        instance.componentDidMount();
        instance.$UPD = false;
    };
}
function mountClassComponentCallbacks(vNode, ref, instance) {
    if (isFunction(ref)) {
        ref(instance);
    }
    else {
        {
            if (isStringOrNumber(ref)) {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
            else if (!isNullOrUndef(ref) && isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                throwError('functional component lifecycle events are not supported on ES2015 class components.');
            }
        }
    }
    if (isFunction(instance.componentDidMount)) {
        LIFECYCLE.push(createClassMountCallback(instance));
    }
}
function createOnMountCallback(ref, dom, props) {
    return function () { return ref.onComponentDidMount(dom, props); };
}
function mountFunctionalComponentCallbacks(props, ref, dom) {
    if (!isNullOrUndef(ref)) {
        if (isFunction(ref.onComponentWillMount)) {
            ref.onComponentWillMount(props);
        }
        if (isFunction(ref.onComponentDidMount)) {
            LIFECYCLE.push(createOnMountCallback(ref, dom, props));
        }
    }
}
function mountRef(dom, value) {
    LIFECYCLE.push(function () { return value(dom); });
}

function hydrateComponent(vNode, dom, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    var props = vNode.props || EMPTY_OBJ;
    if (isClass) {
        var instance = createClassComponentInstance(vNode, type, props, context);
        var input = instance.$LI;
        hydrateVNode(input, dom, instance.$CX, isSVG);
        vNode.dom = input.dom;
        mountClassComponentCallbacks(vNode, ref, instance);
        instance.$UPD = false; // Mount finished allow going sync
    }
    else {
        var input$1 = handleComponentInput(type(props, context), vNode);
        hydrateVNode(input$1, dom, context, isSVG);
        vNode.children = input$1;
        vNode.dom = input$1.dom;
        mountFunctionalComponentCallbacks(props, ref, dom);
    }
}
function hydrateElement(vNode, dom, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        {
            warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
        }
        var newDom = mountElement(vNode, null, context, isSVG);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
    }
    else {
        vNode.dom = dom;
        var childNode = dom.firstChild;
        var childFlags = vNode.childFlags;
        if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
            var nextSibling = null;
            while (childNode) {
                nextSibling = childNode.nextSibling;
                if (childNode.nodeType === 8) {
                    if (childNode.data === '!') {
                        dom.replaceChild(document.createTextNode(''), childNode);
                    }
                    else {
                        dom.removeChild(childNode);
                    }
                }
                childNode = nextSibling;
            }
            childNode = dom.firstChild;
            if (childFlags === 2 /* HasVNodeChildren */) {
                if (isNull(childNode)) {
                    mount(children, dom, context, isSVG);
                }
                else {
                    nextSibling = childNode.nextSibling;
                    hydrateVNode(children, childNode, context, isSVG);
                    childNode = nextSibling;
                }
            }
            else if (childFlags & 12 /* MultipleChildren */) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (isNull(childNode)) {
                        mount(child, dom, context, isSVG);
                    }
                    else {
                        nextSibling = childNode.nextSibling;
                        hydrateVNode(child, childNode, context, isSVG);
                        childNode = nextSibling;
                    }
                }
            }
            // clear any other DOM nodes, there should be only a single entry for the root
            while (childNode) {
                nextSibling = childNode.nextSibling;
                dom.removeChild(childNode);
                childNode = nextSibling;
            }
        }
        else if (!isNull(dom.firstChild) && !isSamePropsInnerHTML(dom, props)) {
            dom.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
            if (flags & 448 /* FormElement */) {
                // If element is form element, we need to clear defaultValue also
                dom.defaultValue = '';
            }
        }
        if (!isNull(props)) {
            mountProps(vNode, flags, props, dom, isSVG);
        }
        if (isNullOrUndef(className)) {
            if (dom.className !== '') {
                dom.removeAttribute('class');
            }
        }
        else if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
        if (isFunction(ref)) {
            mountRef(dom, ref);
        }
        else {
            {
                if (isString(ref)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
            }
        }
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mountText(vNode, null);
        vNode.dom = newDom;
        replaceChild(dom.parentNode, newDom, dom);
    }
    else {
        var text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
    }
}
function hydrateVNode(vNode, dom, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 14 /* Component */) {
        hydrateComponent(vNode, dom, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 481 /* Element */) {
        hydrateElement(vNode, dom, context, isSVG);
    }
    else if (flags & 16 /* Text */) {
        hydrateText(vNode, dom);
    }
    else if (flags & 512 /* Void */) {
        vNode.dom = dom;
    }
    else {
        {
            throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
        }
        throwError();
    }
}
function hydrate(input, parentDom, callback) {
    var dom = parentDom.firstChild;
    if (!isNull(dom)) {
        if (!isInvalid(input)) {
            hydrateVNode(input, dom, EMPTY_OBJ, false);
        }
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while ((dom = dom.nextSibling)) {
            parentDom.removeChild(dom);
        }
    }
    if (LIFECYCLE.length > 0) {
        callAll(LIFECYCLE);
    }
    parentDom.$V = input;
    if (isFunction(callback)) {
        callback();
    }
}

function replaceWithNewNode(lastNode, nextNode, parentDom, context, isSVG) {
    unmount(lastNode);
    replaceChild(parentDom, mount(nextNode, null, context, isSVG), lastNode.dom);
}
function patch(lastVNode, nextVNode, parentDom, context, isSVG) {
    if (lastVNode !== nextVNode) {
        var nextFlags = nextVNode.flags | 0;
        if (lastVNode.flags !== nextFlags || nextFlags & 2048 /* ReCreate */) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
        }
        else if (nextFlags & 481 /* Element */) {
            patchElement(lastVNode, nextVNode, parentDom, context, isSVG);
        }
        else if (nextFlags & 14 /* Component */) {
            patchComponent(lastVNode, nextVNode, parentDom, context, isSVG, (nextFlags & 4 /* ComponentClass */) > 0);
        }
        else if (nextFlags & 16 /* Text */) {
            patchText(lastVNode, nextVNode, parentDom);
        }
        else if (nextFlags & 512 /* Void */) {
            nextVNode.dom = lastVNode.dom;
        }
        else {
            // Portal
            patchPortal(lastVNode, nextVNode, context);
        }
    }
}
function patchPortal(lastVNode, nextVNode, context) {
    var lastContainer = lastVNode.type;
    var nextContainer = nextVNode.type;
    var nextChildren = nextVNode.children;
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false);
    nextVNode.dom = lastVNode.dom;
    if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
        var node = nextChildren.dom;
        lastContainer.removeChild(node);
        nextContainer.appendChild(node);
    }
}
function patchElement(lastVNode, nextVNode, parentDom, context, isSVG) {
    var nextTag = nextVNode.type;
    if (lastVNode.type !== nextTag) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
    }
    else {
        var dom = lastVNode.dom;
        var nextFlags = nextVNode.flags;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var isFormElement = false;
        var hasControlledValue = false;
        var nextPropsOrEmpty;
        nextVNode.dom = dom;
        isSVG = isSVG || (nextFlags & 32 /* SvgElement */) > 0;
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
            nextPropsOrEmpty = nextProps || EMPTY_OBJ;
            if (nextPropsOrEmpty !== EMPTY_OBJ) {
                isFormElement = (nextFlags & 448 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    var lastValue = lastPropsOrEmpty[prop];
                    var nextValue = nextPropsOrEmpty[prop];
                    if (lastValue !== nextValue) {
                        patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
                    }
                }
            }
            if (lastPropsOrEmpty !== EMPTY_OBJ) {
                for (var prop$1 in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (!nextPropsOrEmpty.hasOwnProperty(prop$1) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                        patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
                    }
                }
            }
        }
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        if (lastChildren !== nextChildren) {
            {
                validateKeys(nextVNode);
            }
            patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastChildren, nextChildren, dom, context, isSVG && nextTag !== 'foreignObject');
        }
        if (isFormElement) {
            processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else if (isSVG) {
                dom.setAttribute('class', nextClassName);
            }
            else {
                dom.className = nextClassName;
            }
        }
        if (isFunction(nextRef) && lastVNode.ref !== nextRef) {
            mountRef(dom, nextRef);
        }
        else {
            {
                if (isString(nextRef)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
            }
        }
    }
}
function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG) {
    switch (lastChildFlags) {
        case 2 /* HasVNodeChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    patch(lastChildren, nextChildren, parentDOM, context, isSVG);
                    break;
                case 1 /* HasInvalidChildren */:
                    remove(lastChildren, parentDOM);
                    break;
                default:
                    remove(lastChildren, parentDOM);
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                    break;
            }
            break;
        case 1 /* HasInvalidChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    mount(nextChildren, parentDOM, context, isSVG);
                    break;
                case 1 /* HasInvalidChildren */:
                    break;
                default:
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                    break;
            }
            break;
        default:
            if (nextChildFlags & 12 /* MultipleChildren */) {
                var lastLength = lastChildren.length;
                var nextLength = nextChildren.length;
                // Fast path's for both algorithms
                if (lastLength === 0) {
                    if (nextLength > 0) {
                        mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                    }
                }
                else if (nextLength === 0) {
                    removeAllChildren(parentDOM, lastChildren);
                }
                else if (nextChildFlags === 8 /* HasKeyedChildren */ && lastChildFlags === 8 /* HasKeyedChildren */) {
                    patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength);
                }
                else {
                    patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength);
                }
            }
            else if (nextChildFlags === 1 /* HasInvalidChildren */) {
                removeAllChildren(parentDOM, lastChildren);
            }
            else {
                removeAllChildren(parentDOM, lastChildren);
                mount(nextChildren, parentDOM, context, isSVG);
            }
            break;
    }
}
function updateClassComponent(instance, nextState, nextVNode, nextProps, parentDom, context, isSVG, force, fromSetState) {
    var lastState = instance.state;
    var lastProps = instance.props;
    nextVNode.children = instance;
    var renderOutput;
    if (instance.$UN) {
        {
            throwError('Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.');
        }
        return;
    }
    if (lastProps !== nextProps || nextProps === EMPTY_OBJ) {
        if (!fromSetState && isFunction(instance.componentWillReceiveProps)) {
            instance.$BR = true;
            instance.componentWillReceiveProps(nextProps, context);
            // If instance component was removed during its own update do nothing...
            if (instance.$UN) {
                return;
            }
            instance.$BR = false;
        }
        if (instance.$PSS) {
            nextState = combineFrom(nextState, instance.$PS);
            instance.$PSS = false;
            instance.$PS = null;
        }
    }
    /* Update if scu is not defined, or it returns truthy value or force */
    var hasSCU = isFunction(instance.shouldComponentUpdate);
    if (force || !hasSCU || (hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context))) {
        if (isFunction(instance.componentWillUpdate)) {
            instance.$BS = true;
            instance.componentWillUpdate(nextProps, nextState, context);
            instance.$BS = false;
        }
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
        if (isFunction(options.beforeRender)) {
            options.beforeRender(instance);
        }
        renderOutput = instance.render(nextProps, nextState, context);
        if (isFunction(options.afterRender)) {
            options.afterRender(instance);
        }
        var didUpdate = renderOutput !== NO_OP;
        var childContext;
        if (isFunction(instance.getChildContext)) {
            childContext = instance.getChildContext();
        }
        if (isNullOrUndef(childContext)) {
            childContext = context;
        }
        else {
            childContext = combineFrom(context, childContext);
        }
        instance.$CX = childContext;
        if (didUpdate) {
            var lastInput = instance.$LI;
            var nextInput = (instance.$LI = handleComponentInput(renderOutput, nextVNode));
            patch(lastInput, nextInput, parentDom, childContext, isSVG);
            if (isFunction(instance.componentDidUpdate)) {
                instance.componentDidUpdate(lastProps, lastState);
            }
        }
    }
    else {
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
    }
    nextVNode.dom = instance.$LI.dom;
}
function patchComponent(lastVNode, nextVNode, parentDom, context, isSVG, isClass) {
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastVNode.type !== nextType || lastKey !== nextKey) {
        replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
    }
    else {
        var nextProps = nextVNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance.$UPD = true;
            updateClassComponent(instance, instance.state, nextVNode, nextProps, parentDom, context, isSVG, false, false);
            instance.$V = nextVNode;
            instance.$UPD = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (nextHooksDefined && isFunction(nextHooks.onComponentShouldUpdate)) {
                shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && isFunction(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                var nextInput = nextType(nextProps, context);
                if (nextInput !== NO_OP) {
                    nextInput = handleComponentInput(nextInput, nextVNode);
                    patch(lastInput, nextInput, parentDom, context, isSVG);
                    nextVNode.children = nextInput;
                    nextVNode.dom = nextInput.dom;
                    if (nextHooksDefined && isFunction(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                }
            }
            else if (lastInput.flags & 14 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
}
function patchText(lastVNode, nextVNode, parentDom) {
    var nextText = nextVNode.children;
    var textNode = parentDom.firstChild;
    var dom;
    // Guard against external change on DOM node.
    if (isNull(textNode)) {
        parentDom.textContent = nextText;
        dom = parentDom.firstChild;
    }
    else {
        dom = lastVNode.dom;
        if (nextText !== lastVNode.children) {
            dom.nodeValue = nextText;
        }
    }
    nextVNode.dom = dom;
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength) {
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    var nextChild;
    for (; i < commonLength; i++) {
        nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, context, isSVG);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            mount(nextChild, dom, context, isSVG);
        }
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            remove(lastChildren[i], dom);
        }
    }
}
function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode = a[aStart];
    var bNode = b[bStart];
    var nextNode;
    var nextPos;
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aNode.key === bNode.key) {
            if (bNode.dom) {
                b[bStart] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aNode = a[aStart];
            bNode = b[bStart];
        }
        aNode = a[aEnd];
        bNode = b[bEnd];
        // Sync nodes with the same key at the end.
        while (aNode.key === bNode.key) {
            if (bNode.dom) {
                b[bEnd] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aNode = a[aEnd];
            bNode = b[bEnd];
        }
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                bNode = b[bStart];
                if (bNode.dom) {
                    b[bStart] = bNode = directClone(bNode);
                }
                bStart++;
                insertOrAppend(dom, mount(bNode, null, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            remove(a[aStart++], dom);
        }
    }
    else {
        var aLeft = aEnd - aStart + 1;
        var bLeft = bEnd - bStart + 1;
        var sources = [];
        for (i = 0; i < bLeft; i++) {
            sources.push(0);
        }
        // Keep track if its possible to remove whole DOM using textContent = '';
        var canRemoveWholeContent = aLeft === aLength;
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLength < 4 || (aLeft | bLeft) < 32) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i + 1;
                            if (canRemoveWholeContent) {
                                canRemoveWholeContent = false;
                                while (i > aStart) {
                                    remove(a[aStart++], dom);
                                }
                            }
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, context, isSVG);
                            patched++;
                            break;
                        }
                    }
                    if (!canRemoveWholeContent && j > bEnd) {
                        remove(aNode, dom);
                    }
                }
                else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        }
        else {
            var keyIndex = {};
            // Map keys by their index
            for (i = bStart; i <= bEnd; i++) {
                keyIndex[b[i].key] = i;
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex[aNode.key];
                    if (j !== void 0) {
                        if (canRemoveWholeContent) {
                            canRemoveWholeContent = false;
                            while (i > aStart) {
                                remove(a[aStart++], dom);
                            }
                        }
                        bNode = b[j];
                        sources[j - bStart] = i + 1;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, context, isSVG);
                        patched++;
                    }
                    else if (!canRemoveWholeContent) {
                        remove(aNode, dom);
                    }
                }
                else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (canRemoveWholeContent) {
            removeAllChildren(dom, a);
            mountArrayChildren(b, dom, context, isSVG);
        }
        else {
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === 0) {
                        pos = i + bStart;
                        bNode = b[pos];
                        if (bNode.dom) {
                            b[pos] = bNode = directClone(bNode);
                        }
                        nextPos = pos + 1;
                        insertOrAppend(dom, mount(bNode, null, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                    }
                    else if (j < 0 || i !== seq[j]) {
                        pos = i + bStart;
                        bNode = b[pos];
                        nextPos = pos + 1;
                        insertOrAppend(dom, bNode.dom, nextPos < bLength ? b[nextPos].dom : null);
                    }
                    else {
                        j--;
                    }
                }
            }
            else if (patched !== bLeft) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === 0) {
                        pos = i + bStart;
                        bNode = b[pos];
                        if (bNode.dom) {
                            b[pos] = bNode = directClone(bNode);
                        }
                        nextPos = pos + 1;
                        insertOrAppend(dom, mount(bNode, null, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                    }
                }
            }
        }
    }
}
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice();
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = ((u + v) / 2) | 0;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}

{
    if (isBrowser && document.body === null) {
        warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = isBrowser ? document.body : null;
function render(input, parentDom, callback) {
    // Development warning
    {
        if (documentBody === parentDom) {
            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
    }
    if (input === NO_OP) {
        return;
    }
    var rootInput = parentDom.$V;
    if (isNullOrUndef(rootInput)) {
        if (!isInvalid(input)) {
            if (input.dom) {
                input = directClone(input);
            }
            if (isNull(parentDom.firstChild)) {
                mount(input, parentDom, EMPTY_OBJ, false);
                parentDom.$V = input;
            }
            else {
                hydrate(input, parentDom);
            }
            rootInput = input;
        }
    }
    else {
        if (isNullOrUndef(input)) {
            remove(rootInput, parentDom);
            parentDom.$V = null;
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            patch(rootInput, input, parentDom, EMPTY_OBJ, false);
            rootInput = parentDom.$V = input;
        }
    }
    if (LIFECYCLE.length > 0) {
        callAll(LIFECYCLE);
    }
    if (isFunction(callback)) {
        callback();
    }
    if (isFunction(options.renderComplete)) {
        options.renderComplete(rootInput);
    }
    if (rootInput && rootInput.flags & 14 /* Component */) {
        return rootInput.children;
    }
}
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
function createPortal(children, container) {
    return createVNode(1024 /* Portal */, container, null, children, 0 /* UnknownChildren */, null, isInvalid(children) ? null : children.key, null);
}

var resolvedPromise = typeof Promise === 'undefined' ? null : Promise.resolve();
// raf.bind(window) is needed to work around bug in IE10-IE11 strict mode (TypeError: Invalid calling object)
var fallbackMethod = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame.bind(window);
function nextTick(fn) {
    if (resolvedPromise) {
        return resolvedPromise.then(fn);
    }
    return fallbackMethod(fn);
}
function queueStateChanges(component, newState, callback) {
    if (isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component.$PS;
    if (isNullOrUndef(pending)) {
        component.$PS = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (!component.$PSS && !component.$BR) {
        if (!component.$UPD) {
            component.$PSS = true;
            component.$UPD = true;
            applyState(component, false, callback);
            component.$UPD = false;
        }
        else {
            // Async
            var queue = component.$QU;
            if (isNull(queue)) {
                queue = component.$QU = [];
                nextTick(promiseCallback(component, queue));
            }
            if (isFunction(callback)) {
                queue.push(callback);
            }
        }
    }
    else {
        component.$PSS = true;
        if (component.$BR && isFunction(callback)) {
            LIFECYCLE.push(callback.bind(component));
        }
    }
}
function promiseCallback(component, queue) {
    return function () {
        component.$QU = null;
        component.$UPD = true;
        applyState(component, false, function () {
            for (var i = 0, len = queue.length; i < len; i++) {
                queue[i].call(component);
            }
        });
        component.$UPD = false;
    };
}
function applyState(component, force, callback) {
    if (component.$UN) {
        return;
    }
    if (force || !component.$BR) {
        component.$PSS = false;
        var pendingState = component.$PS;
        var prevState = component.state;
        var nextState = combineFrom(prevState, pendingState);
        var props = component.props;
        var context = component.context;
        component.$PS = null;
        var vNode = component.$V;
        var lastInput = component.$LI;
        var parentDom = lastInput.dom && lastInput.dom.parentNode;
        updateClassComponent(component, nextState, vNode, props, parentDom, context, (vNode.flags & 32 /* SvgElement */) > 0, force, true);
        if (component.$UN) {
            return;
        }
        if ((component.$LI.flags & 1024 /* Portal */) === 0) {
            var dom = component.$LI.dom;
            while (!isNull((vNode = vNode.parentVNode))) {
                if ((vNode.flags & 14 /* Component */) > 0) {
                    vNode.dom = dom;
                }
            }
        }
        if (LIFECYCLE.length > 0) {
            callAll(LIFECYCLE);
        }
    }
    else {
        component.state = component.$PS;
        component.$PS = null;
    }
    if (isFunction(callback)) {
        callback.call(component);
    }
}
var Component = function Component(props, context) {
    this.state = null;
    // Internal properties
    this.$BR = false; // BLOCK RENDER
    this.$BS = true; // BLOCK STATE
    this.$PSS = false; // PENDING SET STATE
    this.$PS = null; // PENDING STATE (PARTIAL or FULL)
    this.$LI = null; // LAST INPUT
    this.$V = null; // VNODE
    this.$UN = false; // UNMOUNTED
    this.$CX = null; // CHILDCONTEXT
    this.$UPD = true; // UPDATING
    this.$QU = null; // QUEUE
    /** @type {object} */
    this.props = props || EMPTY_OBJ;
    /** @type {object} */
    this.context = context || EMPTY_OBJ; // context should not be mutable
};
Component.prototype.forceUpdate = function forceUpdate (callback) {
    if (this.$UN) {
        return;
    }
    // Do not allow double render during force update
    this.$BR = true;
    applyState(this, true, callback);
    this.$BR = false;
};
Component.prototype.setState = function setState (newState, callback) {
    if (this.$UN) {
        return;
    }
    if (!this.$BS) {
        queueStateChanges(this, newState, callback);
    }
    else {
        // Development warning
        {
            throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
        }
        return;
    }
};
// tslint:disable-next-line:no-empty
Component.prototype.render = function render (nextProps, nextState, nextContext) { };



var JSX = /*#__PURE__*/Object.freeze({

});

{
    /* tslint:disable-next-line:no-empty */
    var testFunc = function testFn() { };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        warning("It looks like you're using a minified copy of the development build " +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.');
    }
}
var version = "5.2.0";

exports.Component = Component;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.NO_OP = NO_OP;
exports.createComponentVNode = createComponentVNode;
exports.createPortal = createPortal;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.createVNode = createVNode;
exports.directClone = directClone;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.getNumberStyleValue = getNumberStyleValue;
exports.hydrate = hydrate;
exports.linkEvent = linkEvent;
exports.normalizeProps = normalizeProps;
exports.options = options;
exports.render = render;
exports.version = version;
exports.JSX = JSX;

},{}],140:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var g="$NO_OP",n="a runtime error occured! Use Inferno in development environment to find the error.",e=!("undefined"==typeof window||!window.document),f=Array.isArray;function d(e){var n=typeof e;return"string"===n||"number"===n}function x(e){return y(e)||h(e)}function p(e){return h(e)||!1===e||t(e)||y(e)}function S(e){return"function"==typeof e}function v(e){return"string"==typeof e}function m(e){return"number"==typeof e}function h(e){return null===e}function t(e){return!0===e}function y(e){return void 0===e}function u(e){return"object"==typeof e}function a(e){throw e||(e=n),new Error("Inferno Error: "+e)}function $(e,n){var t={};if(e)for(var o in e)t[o]=e[o];if(n)for(var r in n)t[r]=n[r];return t}var b="$";function k(e,n,t,o,r,a,l,i){return{childFlags:e,children:n,className:t,dom:null,flags:o,key:void 0===r?null:r,parentVNode:null,props:void 0===a?null:a,ref:void 0===l?null:l,type:i}}function l(e,n,t,o,r,a,l,i){var s=void 0===r?1:r,c=k(s,o,t,e,l,a,i,n),u=w.createVNode;return"function"==typeof u&&u(c),0===s&&U(c,c.children),c}function i(e,n,t,o,r){0<(2&e)&&(e=n.prototype&&S(n.prototype.render)?4:8);var a=n.defaultProps;if(!x(a))for(var l in t||(t={}),a)y(t[l])&&(t[l]=a[l]);if(0<(8&e)){var i=n.defaultHooks;if(!x(i))if(r)for(var s in i)y(r[s])&&(r[s]=i[s]);else r=i}var c=k(1,null,null,e,o,t,r,n),u=w.createVNode;return S(u)&&u(c),c}function C(e,n){return k(1,x(e)?"":e,null,16,n,null,null,null)}function o(e){var n=e.props;if(n){var t=e.flags;481&t&&(void 0!==n.children&&x(e.children)&&U(e,n.children),void 0!==n.className&&(e.className=n.className||null,n.className=void 0)),void 0!==n.key&&(e.key=n.key,n.key=void 0),void 0!==n.ref&&(e.ref=8&t?$(e.ref,n.ref):n.ref,n.ref=void 0)}return e}function N(e){var n,t=e.flags;if(14&t){var o,r=e.props;if(!h(r))for(var a in o={},r)o[a]=r[a];n=i(t,e.type,o,e.key,e.ref)}else 481&t?n=l(t,e.type,e.className,e.children,e.childFlags,e.props,e.key,e.ref):16&t?n=C(e.children,e.key):1024&t&&(n=e);return n}function s(){return C("",null)}function P(e,n,t,o){for(var r=e.length;t<r;t++){var a=e[t];if(!p(a)){var l=o+b+t;if(f(a))P(a,n,0,l);else{if(d(a))a=C(a,l);else{var i=a.key,s=v(i)&&i[0]===b;h(a.dom)&&!s||(a=N(a)),h(i)||s?a.key=l:a.key=o+i}n.push(a)}}}}function r(e){return"svg"===e?32:"input"===e?64:"select"===e?256:"textarea"===e?128:1}function U(e,n){var t,o=1;if(p(n))t=n;else if(v(n))o=2,t=C(n);else if(m(n))o=2,t=C(n+"");else if(f(n)){var r=n.length;if(0===r)t=null,o=1;else{(Object.isFrozen(n)||!0===n.$)&&(n=n.slice()),o=8;for(var a=0;a<r;a++){var l=n[a];if(p(l)||f(l)){P(n,t=t||n.slice(0,a),a,"");break}if(d(l))(t=t||n.slice(0,a)).push(C(l,b+a));else{var i=l.key,s=h(l.dom),c=h(i),u=!c&&i[0]===b;!s||c||u?(t=t||n.slice(0,a),s&&!u||(l=N(l)),(c||u)&&(l.key=b+a),t.push(l)):t&&t.push(l)}}(t=t||n).$=!0}}else h((t=n).dom)||(t=N(n)),o=2;return e.children=t,e.childFlags=o,e}var w={afterRender:null,beforeRender:null,createVNode:null,renderComplete:null};function c(e,n){return S(n)?{data:e,event:n}:null}var V="http://www.w3.org/1999/xlink",M="http://www.w3.org/XML/1998/namespace",D="http://www.w3.org/2000/svg",F={"xlink:actuate":V,"xlink:arcrole":V,"xlink:href":V,"xlink:role":V,"xlink:show":V,"xlink:title":V,"xlink:type":V,"xml:base":M,"xml:lang":M,"xml:space":M},I={},L=[];function T(e,n){e.appendChild(n)}function O(e,n,t){x(t)?T(e,n):e.insertBefore(n,t)}function R(e,n){return!0===n?document.createElementNS(D,e):document.createElement(e)}function B(e,n,t){e.replaceChild(n,t)}function W(e,n){e.removeChild(n)}function E(e){for(var n;void 0!==(n=e.shift());)n()}var A={},_={};function H(e,n,t){var o=A[e],r=t.$EV;n?(o||(_[e]=K(e),A[e]=0),r||(r=t.$EV={}),r[e]||A[e]++,r[e]=n):r&&r[e]&&(A[e]--,1===o&&(document.removeEventListener(X(e),_[e]),_[e]=null),r[e]=n)}function j(e,n,t,o,r){for(var a=n;!h(a);){if(t&&a.disabled)return;var l=a.$EV;if(l){var i=l[o];if(i&&(r.dom=a,i.event?i.event(i.data,e):i(e),e.cancelBubble))return}a=a.parentNode}}function X(e){return e.substr(2).toLowerCase()}function z(){this.cancelBubble=!0,this.immediatePropagationStopped||this.stopImmediatePropagation()}function K(r){var e=function(e){var n=e.type,t="click"===n||"dblclick"===n;if(t&&0!==e.button)return e.stopPropagation(),!1;e.stopPropagation=z;var o={dom:document};Object.defineProperty(e,"currentTarget",{configurable:!0,get:function(){return o.dom}}),j(e,e.target,t,r,o)};return document.addEventListener(X(r),e),e}function Q(e,n){var t=document.createElement("i");return t.innerHTML=n,t.innerHTML===e.innerHTML}function q(e,n){return Boolean(n&&n.dangerouslySetInnerHTML&&n.dangerouslySetInnerHTML.__html&&Q(e,n.dangerouslySetInnerHTML.__html))}function G(e,n,t){if(e[n]){var o=e[n];o.event?o.event(o.data,t):o(t)}else{var r=n.toLowerCase();e[r]&&e[r](t)}}function J(i,s){var e=function(e){e.stopPropagation();var n=this.$V;if(n){var t=n.props||I,o=n.dom;if(v(i))G(t,i,e);else for(var r=0;r<i.length;r++)G(t,i[r],e);if(S(s)){var a=this.$V,l=a.props||I;s(l,o,!1,a)}}};return Object.defineProperty(e,"wrapped",{configurable:!1,enumerable:!1,value:!0,writable:!1}),e}function Y(e){return"checkbox"===e||"radio"===e}var Z=J("onInput",oe),ee=J(["onClick","onChange"],oe);function ne(e){e.stopPropagation()}function te(e,n){Y(n.type)?(e.onchange=ee,e.onclick=ne):e.oninput=Z}function oe(e,n){var t=e.type,o=e.value,r=e.checked,a=e.multiple,l=e.defaultValue,i=!x(o);t&&t!==n.type&&n.setAttribute("type",t),x(a)||a===n.multiple||(n.multiple=a),x(l)||i||(n.defaultValue=l+""),Y(t)?(i&&(n.value=o),x(r)||(n.checked=r)):i&&n.value!==o?(n.defaultValue=o,n.value=o):x(r)||(n.checked=r)}function re(e,n){if("optgroup"===e.type){var t=e.children,o=e.childFlags;if(12&o)for(var r=0,a=t.length;r<a;r++)ae(t[r],n);else 2===o&&ae(t,n)}else ae(e,n)}function ae(e,n){var t=e.props||I,o=e.dom;o.value=t.value,f(n)&&-1!==n.indexOf(t.value)||t.value===n?o.selected=!0:x(n)&&x(t.selected)||(o.selected=t.selected||!1)}ne.wrapped=!0;var le=J("onChange",se);function ie(e){e.onchange=le}function se(e,n,t,o){var r=Boolean(e.multiple);x(e.multiple)||r===n.multiple||(n.multiple=r);var a=o.childFlags;if(0==(1&a)){var l=o.children,i=e.value;if(t&&x(i)&&(i=e.defaultValue),12&a)for(var s=0,c=l.length;s<c;s++)re(l[s],i);else 2===a&&re(l,i)}}var ce=J("onInput",de),ue=J("onChange");function fe(e,n){e.oninput=ce,n.onChange&&(e.onchange=ue)}function de(e,n,t){var o=e.value,r=n.value;if(x(o)){if(t){var a=e.defaultValue;x(a)||a===r||(n.defaultValue=a,n.value=a)}}else r!==o&&(n.defaultValue=o,n.value=o)}function pe(e,n,t,o,r,a){64&e?oe(o,t):256&e?se(o,t,r,n):128&e&&de(o,t,r),a&&(t.$V=n)}function ve(e,n,t){64&e?te(n,t):256&e?ie(n):128&e&&fe(n,t)}function me(e){return e.type&&Y(e.type)?!x(e.checked):!x(e.value)}function he(e,n){ge(e),h(n)||(W(n,e.dom),e.dom=null)}function ge(e){var n=e.flags;if(481&n){var t=e.ref,o=e.props;S(t)&&t(null);var r=e.children,a=e.childFlags;if(12&a?ye(r):2===a&&ge(r),!h(o))for(var l in o)switch(l){case"onClick":case"onDblClick":case"onFocusIn":case"onFocusOut":case"onKeyDown":case"onKeyPress":case"onKeyUp":case"onMouseDown":case"onMouseMove":case"onMouseUp":case"onSubmit":case"onTouchEnd":case"onTouchMove":case"onTouchStart":H(l,null,e.dom)}}else if(14&n){var i=e.children,s=e.ref;4&n?(S(i.componentWillUnmount)&&i.componentWillUnmount(),S(s)&&s(null),i.$UN=!0,ge(i.$LI)):(!x(s)&&S(s.onComponentWillUnmount)&&s.onComponentWillUnmount(e.dom,e.props||I),ge(i))}else if(1024&n){var c=e.children;!h(c)&&u(c)&&he(c,e.type)}}function ye(e){for(var n=0,t=e.length;n<t;n++)ge(e[n])}function $e(e,n){ye(n),e.textContent=""}function be(n,t){return function(e){n(t.data,e)}}function ke(e,n,t,o){var r=e.toLowerCase();if(S(t)||x(t)){var a=o[r];a&&a.wrapped||(o[r]=t)}else{var l=t.event;l&&S(l)&&(o[r]=be(l,t))}}function Ce(e,n){switch(e){case"animationIterationCount":case"borderImageOutset":case"borderImageSlice":case"borderImageWidth":case"boxFlex":case"boxFlexGroup":case"boxOrdinalGroup":case"columnCount":case"fillOpacity":case"flex":case"flexGrow":case"flexNegative":case"flexOrder":case"flexPositive":case"flexShrink":case"floodOpacity":case"fontWeight":case"gridColumn":case"gridRow":case"lineClamp":case"lineHeight":case"opacity":case"order":case"orphans":case"stopOpacity":case"strokeDasharray":case"strokeDashoffset":case"strokeMiterlimit":case"strokeOpacity":case"strokeWidth":case"tabSize":case"widows":case"zIndex":case"zoom":return n;default:return n+"px"}}function xe(e,n,t){var o,r,a=t.style;if(v(n))a.cssText=n;else if(x(e)||v(e))for(o in n)r=n[o],a[o]=m(r)?Ce(o,r):r;else{for(o in n)(r=n[o])!==e[o]&&(a[o]=m(r)?Ce(o,r):r);for(o in e)x(n[o])&&(a[o]="")}}function Se(e,n,t,o,r,a,l){switch(e){case"onClick":case"onDblClick":case"onFocusIn":case"onFocusOut":case"onKeyDown":case"onKeyPress":case"onKeyUp":case"onMouseDown":case"onMouseMove":case"onMouseUp":case"onSubmit":case"onTouchEnd":case"onTouchMove":case"onTouchStart":H(e,t,o);break;case"children":case"childrenType":case"className":case"defaultValue":case"key":case"multiple":case"ref":break;case"autoFocus":o.autofocus=!!t;break;case"allowfullscreen":case"autoplay":case"capture":case"checked":case"controls":case"default":case"disabled":case"hidden":case"indeterminate":case"loop":case"muted":case"novalidate":case"open":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"selected":o[e]=!!t;break;case"defaultChecked":case"value":case"volume":if(a&&"value"===e)return;var i=x(t)?"":t;o[e]!==i&&(o[e]=i);break;case"dangerouslySetInnerHTML":var s=n&&n.__html||"",c=t&&t.__html||"";s!==c&&(x(c)||Q(o,c)||(h(l)||(12&l.childFlags?ye(l.children):2===l.childFlags&&ge(l.children),l.children=null,l.childFlags=1),o.innerHTML=c));break;default:"o"===e[0]&&"n"===e[1]?ke(e,n,t,o):x(t)?o.removeAttribute(e):"style"===e?xe(n,t,o):r&&F[e]?o.setAttributeNS(F[e],e,t):o.setAttribute(e,t)}}function Pe(e,n,t,o,r){var a=!1,l=0<(448&n);for(var i in l&&(a=me(t))&&ve(n,o,t),t)Se(i,null,t[i],o,r,a,null);l&&pe(n,e,o,t,!0,a)}function Ne(e,n,t,o){var r=new n(t,o);if((e.children=r).$V=e,r.$BS=!1,r.context=o,r.props===I&&(r.props=t),r.$UN=!1,S(r.componentWillMount)){if(r.$BR=!0,r.componentWillMount(),r.$PSS){var a=r.state,l=r.$PS;if(h(a))r.state=l;else for(var i in l)a[i]=l[i];r.$PSS=!1,r.$PS=null}r.$BR=!1}S(w.beforeRender)&&w.beforeRender(r);var s,c=Ue(r.render(t,r.state,o),e);return S(r.getChildContext)&&(s=r.getChildContext()),x(s)?r.$CX=o:r.$CX=$(o,s),S(w.afterRender)&&w.afterRender(r),r.$LI=c,r}function Ue(e,n){return p(e)?e=s():d(e)?e=C(e,null):(e.dom&&(e=N(e)),14&e.flags&&(e.parentVNode=n)),e}function we(e,n,t,o){var r=e.flags;return 481&r?Me(e,n,t,o):14&r?Fe(e,n,t,o,0<(4&r)):512&r||16&r?Ve(e,n):1024&r?(we(e.children,e.type,t,!1),e.dom=Ve(s(),n)):void 0}function Ve(e,n){var t=e.dom=document.createTextNode(e.children);return h(n)||T(n,t),t}function Me(e,n,t,o){var r=e.flags,a=e.children,l=e.props,i=e.className,s=e.ref,c=e.childFlags;o=o||0<(32&r);var u=R(e.type,o);if(e.dom=u,x(i)||""===i||(o?u.setAttribute("class",i):u.className=i),h(n)||T(n,u),0==(1&c)){var f=!0===o&&"foreignObject"!==e.type;2===c?we(a,u,t,f):12&c&&De(a,u,t,f)}return h(l)||Pe(e,r,l,u,o),S(s)&&Re(u,s),u}function De(e,n,t,o){for(var r=0,a=e.length;r<a;r++){var l=e[r];h(l.dom)||(e[r]=l=N(l)),we(l,n,t,o)}}function Fe(e,n,t,o,r){var a,l=e.type,i=e.props||I,s=e.ref;if(r){var c=Ne(e,l,i,t);e.dom=a=we(c.$LI,null,c.$CX,o),Le(e,s,c),c.$UPD=!1}else{var u=Ue(l(i,t),e);e.children=u,e.dom=a=we(u,null,t,o),Oe(i,s,a)}return h(n)||T(n,a),a}function Ie(e){return function(){e.$UPD=!0,e.componentDidMount(),e.$UPD=!1}}function Le(e,n,t){S(n)&&n(t),S(t.componentDidMount)&&L.push(Ie(t))}function Te(e,n,t){return function(){return e.onComponentDidMount(n,t)}}function Oe(e,n,t){x(n)||(S(n.onComponentWillMount)&&n.onComponentWillMount(e),S(n.onComponentDidMount)&&L.push(Te(n,t,e)))}function Re(e,n){L.push(function(){return n(e)})}function Be(e,n,t,o,r){var a=e.type,l=e.ref,i=e.props||I;if(r){var s=Ne(e,a,i,t),c=s.$LI;Ae(c,n,s.$CX,o),e.dom=c.dom,Le(e,l,s),s.$UPD=!1}else{var u=Ue(a(i,t),e);Ae(u,n,t,o),e.children=u,e.dom=u.dom,Oe(i,l,n)}}function We(e,n,t,o){var r=e.children,a=e.props,l=e.className,i=e.flags,s=e.ref;if(o=o||0<(32&i),1!==n.nodeType||n.tagName.toLowerCase()!==e.type){var c=Me(e,null,t,o);e.dom=c,B(n.parentNode,c,n)}else{var u=(e.dom=n).firstChild,f=e.childFlags;if(0==(1&f)){for(var d=null;u;)d=u.nextSibling,8===u.nodeType&&("!"===u.data?n.replaceChild(document.createTextNode(""),u):n.removeChild(u)),u=d;if(u=n.firstChild,2===f)h(u)?we(r,n,t,o):(d=u.nextSibling,Ae(r,u,t,o),u=d);else if(12&f)for(var p=0,v=r.length;p<v;p++){var m=r[p];h(u)?we(m,n,t,o):(d=u.nextSibling,Ae(m,u,t,o),u=d)}for(;u;)d=u.nextSibling,n.removeChild(u),u=d}else h(n.firstChild)||q(n,a)||(n.textContent="",448&i&&(n.defaultValue=""));h(a)||Pe(e,i,a,n,o),x(l)?""!==n.className&&n.removeAttribute("class"):o?n.setAttribute("class",l):n.className=l,S(s)&&Re(n,s)}}function Ee(e,n){if(3!==n.nodeType){var t=Ve(e,null);e.dom=t,B(n.parentNode,t,n)}else{var o=e.children;n.nodeValue!==o&&(n.nodeValue=o),e.dom=n}}function Ae(e,n,t,o){var r=e.flags;14&r?Be(e,n,t,o,0<(4&r)):481&r?We(e,n,t,o):16&r?Ee(e,n):512&r?e.dom=n:a()}function _e(e,n,t){var o=n.firstChild;if(!h(o))for(p(e)||Ae(e,o,I,!1),o=n.firstChild;o=o.nextSibling;)n.removeChild(o);0<L.length&&E(L),n.$V=e,S(t)&&t()}function He(e,n,t,o,r){ge(e),B(t,we(n,null,o,r),e.dom)}function je(e,n,t,o,r){if(e!==n){var a=0|n.flags;e.flags!==a||2048&a?He(e,n,t,o,r):481&a?ze(e,n,t,o,r):14&a?qe(e,n,t,o,r,0<(4&a)):16&a?Ge(e,n,t):512&a?n.dom=e.dom:Xe(e,n,o)}}function Xe(e,n,t){var o=e.type,r=n.type,a=n.children;if(Ke(e.childFlags,n.childFlags,e.children,a,o,t,!1),n.dom=e.dom,o!==r&&!p(a)){var l=a.dom;o.removeChild(l),r.appendChild(l)}}function ze(e,n,t,o,r){var a=n.type;if(e.type!==a)He(e,n,t,o,r);else{var l,i=e.dom,s=n.flags,c=e.props,u=n.props,f=!1,d=!1;if(n.dom=i,r=r||0<(32&s),c!==u){var p=c||I;if((l=u||I)!==I)for(var v in(f=0<(448&s))&&(d=me(l)),l){var m=p[v],h=l[v];m!==h&&Se(v,m,h,i,r,d,e)}if(p!==I)for(var g in p)l.hasOwnProperty(g)||x(p[g])||Se(g,p[g],null,i,r,d,e)}var y=e.children,$=n.children,b=n.ref,k=e.className,C=n.className;y!==$&&Ke(e.childFlags,n.childFlags,y,$,i,o,r&&"foreignObject"!==a),f&&pe(s,n,i,l,!1,d),k!==C&&(x(C)?i.removeAttribute("class"):r?i.setAttribute("class",C):i.className=C),S(b)&&e.ref!==b&&Re(i,b)}}function Ke(e,n,t,o,r,a,l){switch(e){case 2:switch(n){case 2:je(t,o,r,a,l);break;case 1:he(t,r);break;default:he(t,r),De(o,r,a,l)}break;case 1:switch(n){case 2:we(o,r,a,l);break;case 1:break;default:De(o,r,a,l)}break;default:if(12&n){var i=t.length,s=o.length;0===i?0<s&&De(o,r,a,l):0===s?$e(r,t):8===n&&8===e?Ye(t,o,r,a,l,i,s):Je(t,o,r,a,l,i,s)}else 1===n?$e(r,t):($e(r,t),we(o,r,a,l))}}function Qe(e,n,t,o,r,a,l,i,s){var c,u=e.state,f=e.props;if(!(t.children=e).$UN){if(f!==o||o===I){if(!s&&S(e.componentWillReceiveProps)){if(e.$BR=!0,e.componentWillReceiveProps(o,a),e.$UN)return;e.$BR=!1}e.$PSS&&(n=$(n,e.$PS),e.$PSS=!1,e.$PS=null)}var d=S(e.shouldComponentUpdate);if(i||!d||d&&e.shouldComponentUpdate(o,n,a)){S(e.componentWillUpdate)&&(e.$BS=!0,e.componentWillUpdate(o,n,a),e.$BS=!1),e.props=o,e.state=n,e.context=a,S(w.beforeRender)&&w.beforeRender(e),c=e.render(o,n,a),S(w.afterRender)&&w.afterRender(e);var p,v=c!==g;S(e.getChildContext)&&(p=e.getChildContext()),p=x(p)?a:$(a,p),e.$CX=p,v&&(je(e.$LI,e.$LI=Ue(c,t),r,p,l),S(e.componentDidUpdate)&&e.componentDidUpdate(f,u))}else e.props=o,e.state=n,e.context=a;t.dom=e.$LI.dom}}function qe(e,n,t,o,r,a){var l=n.type,i=e.key,s=n.key;if(e.type!==l||i!==s)He(e,n,t,o,r);else{var c=n.props||I;if(a){var u=e.children;u.$UPD=!0,Qe(u,u.state,n,c,t,o,r,!1,!1),u.$V=n,u.$UPD=!1}else{var f=!0,d=e.props,p=n.ref,v=!x(p),m=e.children;if(n.dom=e.dom,n.children=m,v&&S(p.onComponentShouldUpdate)&&(f=p.onComponentShouldUpdate(d,c)),!1!==f){v&&S(p.onComponentWillUpdate)&&p.onComponentWillUpdate(d,c);var h=l(c,o);h!==g&&(je(m,h=Ue(h,n),t,o,r),n.children=h,n.dom=h.dom,v&&S(p.onComponentDidUpdate)&&p.onComponentDidUpdate(d,c))}else 14&m.flags&&(m.parentVNode=n)}}}function Ge(e,n,t){var o,r=n.children;h(t.firstChild)?(t.textContent=r,o=t.firstChild):(o=e.dom,r!==e.children&&(o.nodeValue=r)),n.dom=o}function Je(e,n,t,o,r,a,l){for(var i,s=l<a?l:a,c=0;c<s;c++)(i=n[c]).dom&&(i=n[c]=N(i)),je(e[c],i,t,o,r);if(a<l)for(c=s;c<l;c++)(i=n[c]).dom&&(i=n[c]=N(i)),we(i,t,o,r);else if(l<a)for(c=s;c<a;c++)he(e[c],t)}function Ye(e,n,t,o,r,a,l){var i,s,c,u,f=a-1,d=l-1,p=0,v=0,m=e[p],h=n[v];e:{for(;m.key===h.key;){if(h.dom&&(n[v]=h=N(h)),je(m,h,t,o,r),v++,f<++p||d<v)break e;m=e[p],h=n[v]}for(m=e[f],h=n[d];m.key===h.key;){if(h.dom&&(n[d]=h=N(h)),je(m,h,t,o,r),d--,--f<p||d<v)break e;m=e[f],h=n[d]}}if(f<p){if(v<=d)for(c=(u=d+1)<l?n[u].dom:null;v<=d;)(h=n[v]).dom&&(n[v]=h=N(h)),v++,O(t,we(h,null,o,r),c)}else if(d<v)for(;p<=f;)he(e[p++],t);else{var g=f-p+1,y=d-v+1,$=[];for(i=0;i<y;i++)$.push(0);var b=g===a,k=!1,C=0,x=0;if(l<4||(g|y)<32)for(i=p;i<=f;i++)if(m=e[i],x<y){for(s=v;s<=d;s++)if(h=n[s],m.key===h.key){if($[s-v]=i+1,b)for(b=!1;p<i;)he(e[p++],t);s<C?k=!0:C=s,h.dom&&(n[s]=h=N(h)),je(m,h,t,o,r),x++;break}!b&&d<s&&he(m,t)}else b||he(m,t);else{var S={};for(i=v;i<=d;i++)S[n[i].key]=i;for(i=p;i<=f;i++)if(m=e[i],x<y)if(void 0!==(s=S[m.key])){if(b)for(b=!1;p<i;)he(e[p++],t);h=n[s],$[s-v]=i+1,s<C?k=!0:C=s,h.dom&&(n[s]=h=N(h)),je(m,h,t,o,r),x++}else b||he(m,t);else b||he(m,t)}if(b)$e(t,e),De(n,t,o,r);else if(k){var P=Ze($);for(s=P.length-1,i=y-1;0<=i;i--)0===$[i]?((h=n[C=i+v]).dom&&(n[C]=h=N(h)),u=C+1,O(t,we(h,null,o,r),u<l?n[u].dom:null)):s<0||i!==P[s]?(u=(C=i+v)+1,O(t,(h=n[C]).dom,u<l?n[u].dom:null)):s--}else if(x!==y)for(i=y-1;0<=i;i--)0===$[i]&&((h=n[C=i+v]).dom&&(n[C]=h=N(h)),u=C+1,O(t,we(h,null,o,r),u<l?n[u].dom:null))}}function Ze(e){var n,t,o,r,a,l=e.slice(),i=[0],s=e.length;for(n=0;n<s;n++){var c=e[n];if(0!==c){if(e[t=i[i.length-1]]<c){l[n]=t,i.push(n);continue}for(o=0,r=i.length-1;o<r;)e[i[a=(o+r)/2|0]]<c?o=a+1:r=a;c<e[i[o]]&&(0<o&&(l[n]=i[o-1]),i[o]=n)}}for(r=i[(o=i.length)-1];0<o--;)r=l[i[o]=r];return i}var en=e?document.body:null;function nn(e,n,t){if(e!==g){var o=n.$V;return x(o)?p(e)||(e.dom&&(e=N(e)),h(n.firstChild)?(we(e,n,I,!1),n.$V=e):_e(e,n),o=e):x(e)?(he(o,n),n.$V=null):(e.dom&&(e=N(e)),je(o,e,n,I,!1),o=n.$V=e),0<L.length&&E(L),S(t)&&t(),S(w.renderComplete)&&w.renderComplete(o),o&&14&o.flags?o.children:void 0}}function tn(t){return function(e,n){t||(t=e),nn(n,t)}}function on(e,n){return l(1024,n,null,e,0,null,p(e)?null:e.key,null)}var rn="undefined"==typeof Promise?null:Promise.resolve(),an="undefined"==typeof requestAnimationFrame?setTimeout:requestAnimationFrame.bind(window);function ln(e){return rn?rn.then(e):an(e)}function sn(e,n,t){S(n)&&(n=n(e.state,e.props,e.context));var o=e.$PS;if(x(o))e.$PS=n;else for(var r in n)o[r]=n[r];if(e.$PSS||e.$BR)e.$PSS=!0,e.$BR&&S(t)&&L.push(t.bind(e));else if(e.$UPD){var a=e.$QU;h(a)&&ln(cn(e,a=e.$QU=[])),S(t)&&a.push(t)}else e.$PSS=!0,e.$UPD=!0,un(e,!1,t),e.$UPD=!1}function cn(t,o){return function(){t.$QU=null,t.$UPD=!0,un(t,!1,function(){for(var e=0,n=o.length;e<n;e++)o[e].call(t)}),t.$UPD=!1}}function un(e,n,t){if(!e.$UN){if(n||!e.$BR){e.$PSS=!1;var o=e.$PS,r=$(e.state,o),a=e.props,l=e.context;e.$PS=null;var i=e.$V,s=e.$LI;if(Qe(e,r,i,a,s.dom&&s.dom.parentNode,l,0<(32&i.flags),n,!0),e.$UN)return;if(0==(1024&e.$LI.flags))for(var c=e.$LI.dom;!h(i=i.parentVNode);)0<(14&i.flags)&&(i.dom=c);0<L.length&&E(L)}else e.state=e.$PS,e.$PS=null;S(t)&&t.call(e)}}var fn=function(e,n){this.state=null,this.$BR=!1,this.$BS=!0,this.$PSS=!1,this.$PS=null,this.$LI=null,this.$V=null,this.$UN=!1,this.$CX=null,this.$UPD=!0,this.$QU=null,this.props=e||I,this.context=n||I};fn.prototype.forceUpdate=function(e){this.$UN||(this.$BR=!0,un(this,!0,e),this.$BR=!1)},fn.prototype.setState=function(e,n){this.$UN||this.$BS||sn(this,e,n)},fn.prototype.render=function(e,n,t){};var dn=Object.freeze({}),pn="5.2.0";exports.Component=fn,exports.EMPTY_OBJ=I,exports.NO_OP=g,exports.createComponentVNode=i,exports.createPortal=on,exports.createRenderer=tn,exports.createTextVNode=C,exports.createVNode=l,exports.directClone=N,exports.getFlagsForElementVnode=r,exports.getNumberStyleValue=Ce,exports.hydrate=_e,exports.linkEvent=c,exports.normalizeProps=o,exports.options=w,exports.render=nn,exports.version=pn,exports.JSX=dn;

},{}],141:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./dist/index.cjs.js":139,"./dist/index.cjs.min.js":140,"_process":153,"dup":132}],142:[function(require,module,exports){
(function (global){
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],143:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":150}],144:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":143,"./_getRawTag":147,"./_objectToString":148}],145:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],146:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":149}],147:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":143}],148:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],149:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],150:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":145}],151:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],152:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":144,"./_getPrototype":146,"./isObjectLike":151}],153:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RepeatSequence = exports.Sequential = exports.Flatten = exports.Reverse = exports.Repeat = exports.Rotate = exports.Opacity = exports.Translate = exports.AnimateCSS = exports.Style = exports.Animate = exports.computeTheOther = exports.Become = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _util = require('./util.js');

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var fmtWithUnit = function fmtWithUnit(val, unit) {
    return unit ? '' + val + unit : val;
};

var tick_func = function tick_func(_ref) {
    var duration = _ref.duration,
        start_state = _ref.start_state,
        delta_state = _ref.delta_state,
        end_state = _ref.end_state,
        _ref$curve = _ref.curve,
        curve = _ref$curve === undefined ? 'linear' : _ref$curve,
        _ref$unit = _ref.unit,
        unit = _ref$unit === undefined ? null : _ref$unit;

    var curve_func = void 0;
    if (typeof curve === 'string') {
        curve_func = _util.EasingFunctions[curve];
        if (curve_func === undefined) {
            throw curve + ' is not a valid easing function';
        }
    } else if (typeof curve === 'function') {
        curve_func = curve;
    } else {
        throw 'curve must be the String name of a curve function like "easeInOutQuad", or a Function object';
    }

    return function (time_elapsed) {
        if (time_elapsed < 0) {
            return start_state;
        }
        if (time_elapsed > duration) {
            return end_state;
        }
        var curve_value = curve_func(time_elapsed / duration);
        var new_state = start_state + curve_value * delta_state;

        return fmtWithUnit(new_state, unit);
    };
};

var Become = exports.Become = function Become(_ref2) {
    var path = _ref2.path,
        state = _ref2.state,
        start_time = _ref2.start_time,
        end_time = _ref2.end_time,
        duration = _ref2.duration;

    if (start_time === undefined) start_time = Date.now();

    if (end_time === undefined && duration === undefined) {
        duration = Infinity;
        end_time = Infinity;
    }

    if (end_time !== Infinity || duration !== Infinity) {
        if (exactlyOneIsUndefined(duration, end_time)) {
            var _computeTheOther = computeTheOther(start_time, duration, end_time);

            var _computeTheOther2 = (0, _slicedToArray3.default)(_computeTheOther, 2);

            duration = _computeTheOther2[0];
            end_time = _computeTheOther2[1];
        } else {
            // console.log({path, state, start_time, end_time, duration})
            throw 'Invalid call to Become: you may define end_time or duration, but not both.';
        }
    }

    return Animate({
        type: 'BECOME',
        path: path,
        start_state: state,
        delta_state: null,
        end_state: null,
        start_time: start_time,
        end_time: end_time,
        duration: duration,
        tick: function tick(_) {
            return state;
        }
    });
};

var computeTheOther = exports.computeTheOther = function computeTheOther(start, delta, end) {
    // assumes start and one of (delta, end) are defined.
    // error checking is done before this point is reached

    // console.log({start, delta, end})
    if ((typeof start === 'undefined' ? 'undefined' : (0, _typeof3.default)(start)) === 'object') {
        var new_delta = delta ? (0, _extends3.default)({}, delta) : {};
        var new_end = end ? (0, _extends3.default)({}, end) : {};
        if (delta === undefined) {
            (0, _keys2.default)(start).forEach(function (key) {
                var _computeTheOther3 = computeTheOther(start[key], new_delta[key], new_end[key]),
                    _computeTheOther4 = (0, _slicedToArray3.default)(_computeTheOther3, 2),
                    _delta = _computeTheOther4[0],
                    _end = _computeTheOther4[1];

                new_delta[key] = _delta;
                new_end[key] = _end;
            });
        } else {
            var delta_keys = (0, _keys2.default)(delta);
            (0, _keys2.default)(start).forEach(function (key) {
                if (delta_keys.includes(key)) {
                    var _computeTheOther5 = computeTheOther(start[key], new_delta[key], new_end[key]),
                        _computeTheOther6 = (0, _slicedToArray3.default)(_computeTheOther5, 2),
                        _delta = _computeTheOther6[0],
                        _end = _computeTheOther6[1];

                    new_delta[key] = _delta;
                    new_end[key] = _end;
                } else {
                    new_end[key] = start[key];
                }
            });
        }
        return [new_delta, new_end];
    }
    if (typeof start === 'number') {
        if (end === undefined && delta !== undefined) {
            return [delta, start + delta];
        } else if (end !== undefined && delta === undefined) {
            return [end - start, end];
        } else {
            throw 'computeTheOther was expecting one of (delta, end) to be defined, but not both';
        }
    }
    throw 'computeTheOther got (' + start + ', ' + delta + ', ' + end + ') as args and didn\'t know what to do';
};

var exactlyOneIsUndefined = function exactlyOneIsUndefined(val1, val2) {
    return (val1 === undefined || val2 === undefined) && !(val1 === undefined && val2 === undefined);
};

var isNumber = function isNumber(val) {
    return typeof val === 'number';
};

var applyDefaultsAndValidateTimes = function applyDefaultsAndValidateTimes(start_time, duration, end_time) {
    if (start_time === undefined) start_time = Date.now();

    if (duration === undefined && end_time === undefined) {
        duration = 1000; // removing this semi-colon results in a gnarly parse error

        var _computeTheOther7 = computeTheOther(start_time, duration, end_time);

        var _computeTheOther8 = (0, _slicedToArray3.default)(_computeTheOther7, 2);

        duration = _computeTheOther8[0];
        end_time = _computeTheOther8[1];
    } else if (exactlyOneIsUndefined(duration, end_time)) {
        var _computeTheOther9 = computeTheOther(start_time, duration, end_time);

        var _computeTheOther10 = (0, _slicedToArray3.default)(_computeTheOther9, 2);

        duration = _computeTheOther10[0];
        end_time = _computeTheOther10[1];
    } else {
        throw 'only one of (duration, end_time) should be passed in, not both.';
    }

    if (start_time > end_time) {
        throw 'start_time (' + start_time + ') > end_time (' + end_time + ')';
    }
    return [start_time, duration, end_time];
};

var validateAnimation = function validateAnimation(animation) {
    var end_time = animation.end_time;
    var end_state = animation.end_state;

    var computed_end_state = (0, _util.computeAnimatedState)({
        animations: [animation],
        warped_time: end_time
    });
    if (!(0, _lodash2.default)(computed_end_state, end_state)) {
        throw 'Invalid Animate: end_state !== computed_end_state for animation:' + ('\n' + (0, _stringify2.default)(animation, null, '  ') + ':') + ((0, _stringify2.default)(computed_end_state, null, '  ') + ' !==') + ('' + (0, _stringify2.default)(end_state, null, '  '));
    }
};

var Animate = exports.Animate = function Animate(_ref3) {
    var type = _ref3.type,
        path = _ref3.path,
        start_time = _ref3.start_time,
        end_time = _ref3.end_time,
        duration = _ref3.duration,
        start_state = _ref3.start_state,
        end_state = _ref3.end_state,
        delta_state = _ref3.delta_state,
        _ref3$merge = _ref3.merge,
        merge = _ref3$merge === undefined ? false : _ref3$merge,
        _ref3$curve = _ref3.curve,
        curve = _ref3$curve === undefined ? 'linear' : _ref3$curve,
        _ref3$unit = _ref3.unit,
        unit = _ref3$unit === undefined ? null : _ref3$unit,
        _ref3$tick = _ref3.tick,
        tick = _ref3$tick === undefined ? null : _ref3$tick;

    var throw_msg = function throw_msg(msg) {
        return 'Invalid call to Animate w/path ' + path + ': ' + msg;
    };

    var _start_time = void 0,
        _end_time = void 0,
        _duration = void 0,
        _end_state = void 0,
        _delta_state = void 0,
        _tick = void 0,
        _split_path = void 0,
        _type = void 0;

    _start_time = start_time === undefined ? Date.now() : start_time;
    if (exactlyOneIsUndefined(duration, end_time)) {
        var _computeTheOther11 = computeTheOther(_start_time, duration, end_time);

        var _computeTheOther12 = (0, _slicedToArray3.default)(_computeTheOther11, 2);

        _duration = _computeTheOther12[0];
        _end_time = _computeTheOther12[1];
    } else {
        _duration = duration;
        _end_time = end_time;
    }

    if (exactlyOneIsUndefined(delta_state, end_state)) {
        var _computeTheOther13 = computeTheOther(start_state, delta_state, end_state);

        var _computeTheOther14 = (0, _slicedToArray3.default)(_computeTheOther13, 2);

        _delta_state = _computeTheOther14[0];
        _end_state = _computeTheOther14[1];
    } else {
        _delta_state = delta_state;
        _end_state = end_state;
    }

    if (_start_time > _end_time) {
        throw throw_msg('start_time (' + start_time + ') > end_time (' + end_time + ').');
    }

    _split_path = path.split('/').slice(1);

    if (_split_path.slice(-1) == '') {
        throw throw_msg('path has a trailing slash');
    }

    var animation = {
        type: type || 'ANIMATE',
        split_path: _split_path,
        start_time: _start_time,
        end_time: _end_time,
        duration: _duration,
        end_state: _end_state,
        delta_state: _delta_state,

        start_state: start_state,
        path: path,
        curve: curve,
        unit: unit,
        merge: merge
    };
    _tick = tick || tick_func(animation);
    animation.tick = _tick;

    return (0, _util.immutify)(animation);
};

var Style = exports.Style = function Style(_ref4) {
    var path = _ref4.path,
        start_time = _ref4.start_time,
        end_time = _ref4.end_time,
        duration = _ref4.duration,
        start_state = _ref4.start_state,
        end_state = _ref4.end_state,
        delta_state = _ref4.delta_state,
        _ref4$curve = _ref4.curve,
        curve = _ref4$curve === undefined ? 'linear' : _ref4$curve,
        _ref4$unit = _ref4.unit,
        unit = _ref4$unit === undefined ? 'px' : _ref4$unit;

    // console.log({start_state, end_state, delta_state})
    try {
        var _applyDefaultsAndVali = applyDefaultsAndValidateTimes(start_time, duration, end_time);

        var _applyDefaultsAndVali2 = (0, _slicedToArray3.default)(_applyDefaultsAndVali, 3);

        start_time = _applyDefaultsAndVali2[0];
        duration = _applyDefaultsAndVali2[1];
        end_time = _applyDefaultsAndVali2[2];

        if ((typeof start_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(start_state)) !== 'object') {
            throw 'expected an object for start_state but got ' + start_state;
        }
        if (exactlyOneIsUndefined(delta_state, end_state)) {
            if ((typeof delta_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(delta_state)) === 'object') {
                var missing_key = (0, _util.findMissingKey)(delta_state, start_state, false);
                if (missing_key !== null) {
                    throw 'found key ' + missing_key + ' in delta_state but not start_state';
                }
            } else if ((typeof end_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(end_state)) === 'object') {
                var _missing_key = (0, _util.findMissingKey)(start_state, end_state, true);
                if (_missing_key !== null) {
                    throw 'found key ' + _missing_key + ' in one of ' + '(start_state, end_state) but not the other';
                }
            } else {
                var msg = 'expected one of (delta_state, end_state) as object, ' + ('but got (' + delta_state + ', ' + end_state + ')');
                throw msg;
            }

            var _computeTheOther15 = computeTheOther(start_state, delta_state, end_state);

            var _computeTheOther16 = (0, _slicedToArray3.default)(_computeTheOther15, 2);

            delta_state = _computeTheOther16[0];
            end_state = _computeTheOther16[1];
        } else {
            var _msg = 'expected one of (delta_state, end_state) as object, ' + ('but got (' + delta_state + ', ' + end_state + ')');
            throw _msg;
        }
    } catch (err) {
        throw 'Invalid call to Style w/path \'' + path + '\': ' + err;
    }

    var tick_funcs = (0, _util.mapObj)(delta_state, function (key) {
        return tick_func({
            duration: duration,
            start_state: start_state[key],
            delta_state: delta_state[key],
            end_state: end_state[key],
            curve: curve,
            unit: unit
        });
    });
    var delta_keys = (0, _keys2.default)(delta_state);
    var tick = function tick(time_elapsed) {
        return (0, _util.mapObj)(start_state, function (key) {
            if (delta_keys.includes(key)) {
                return tick_funcs[key](time_elapsed);
            }
            return start_state[key];
        });
    };

    return Animate({
        path: path + '/style',
        start_time: start_time,
        duration: duration,
        end_time: end_time,
        start_state: start_state,
        delta_state: delta_state,
        end_state: end_state,
        curve: curve,
        unit: unit,
        tick: tick,
        merge: true
    });
};

var AnimateCSS = exports.AnimateCSS = function AnimateCSS(_ref5) {
    var name = _ref5.name,
        path = _ref5.path,
        start_time = _ref5.start_time,
        end_time = _ref5.end_time,
        duration = _ref5.duration,
        _ref5$curve = _ref5.curve,
        curve = _ref5$curve === undefined ? 'linear' : _ref5$curve;

    try {
        var _applyDefaultsAndVali3 = applyDefaultsAndValidateTimes(start_time, duration, end_time);

        var _applyDefaultsAndVali4 = (0, _slicedToArray3.default)(_applyDefaultsAndVali3, 3);

        start_time = _applyDefaultsAndVali4[0];
        duration = _applyDefaultsAndVali4[1];
        end_time = _applyDefaultsAndVali4[2];
    } catch (err) {
        throw 'Invalid call to AnimateCSS w/path \'' + path + '\': ' + err;
    }

    var start_state = {
        name: name,
        duration: duration,
        curve: curve,
        delay: 0,
        playState: 'paused'
    };
    var end_state = (0, _extends3.default)({}, start_state, {
        delay: duration
    });
    return Animate({
        type: 'CSS_' + (name ? name.toUpperCase() : 'END'),
        path: path + '/style/animation/' + name,
        start_time: start_time,
        end_time: end_time,
        duration: duration,
        curve: curve,
        start_state: start_state,
        end_state: end_state,
        delta_state: { delay: duration },
        tick: function tick(time_elapsed) {
            if (time_elapsed <= 0) {
                return start_state;
            } else if (time_elapsed >= duration) {
                return end_state;
            } else {
                return (0, _extends3.default)({}, start_state, { delay: time_elapsed });
            }
        }
    });
};

var Translate = exports.Translate = function Translate(_ref6) {
    var path = _ref6.path,
        start_time = _ref6.start_time,
        end_time = _ref6.end_time,
        duration = _ref6.duration,
        start_state = _ref6.start_state,
        end_state = _ref6.end_state,
        delta_state = _ref6.delta_state,
        _ref6$curve = _ref6.curve,
        curve = _ref6$curve === undefined ? 'linear' : _ref6$curve,
        _ref6$unit = _ref6.unit,
        unit = _ref6$unit === undefined ? 'px' : _ref6$unit;

    var translate_throw = function translate_throw(msg) {
        throw 'Invalid call to Translate w/path \'' + path + '\': ' + msg;
    };

    try {
        var _applyDefaultsAndVali5 = applyDefaultsAndValidateTimes(start_time, duration, end_time);

        var _applyDefaultsAndVali6 = (0, _slicedToArray3.default)(_applyDefaultsAndVali5, 3);

        start_time = _applyDefaultsAndVali6[0];
        duration = _applyDefaultsAndVali6[1];
        end_time = _applyDefaultsAndVali6[2];
    } catch (err) {
        translate_throw(err);
    }

    if (!exactlyOneIsUndefined(delta_state, end_state)) {
        translate_throw('expected exactly one of (delta_state, end_state) to be defined');
    }
    if ((typeof start_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(start_state)) !== 'object') {
        translate_throw('expected an object for start_state but got ' + start_state);
    }
    if ((0, _keys2.default)(start_state).length === 0) {
        translate_throw('passed in an empty start_state!');
    }
    var expected_keys = ['top', 'left', 'bottom', 'right'];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(start_state)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!expected_keys.includes(key)) {
                translate_throw('passed in key ' + key + ' to translate. Should be one of ' + '(\'top\', \'left\', \'bottom\', \'right\')');
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (delta_state === undefined) {
        if ((typeof end_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(end_state)) !== 'object') {
            translate_throw('expected an object for end_state but got ' + end_state);
        }
        var missing_key = (0, _util.findMissingKey)(end_state, start_state, true);
        if (missing_key !== null) {
            translate_throw('found key ' + missing_key + ' in one of (start_state, end_state) but not both');
        }
    } else {
        if ((typeof delta_state === 'undefined' ? 'undefined' : (0, _typeof3.default)(delta_state)) !== 'object') {
            translate_throw('expected an object for delta_state but got ' + delta_state);
        }
        var _missing_key2 = (0, _util.findMissingKey)(delta_state, start_state, true);
        if (_missing_key2 !== null) {
            translate_throw('found key ' + _missing_key2 + ' in one of (start_state, delta_state) but not both');
        }
    }

    var _computeTheOther17 = computeTheOther(start_state, delta_state, end_state);

    var _computeTheOther18 = (0, _slicedToArray3.default)(_computeTheOther17, 2);

    delta_state = _computeTheOther18[0];
    end_state = _computeTheOther18[1];

    path = path + '/style/transform/translate';
    var type = 'TRANSLATE';

    var animation = { type: type, path: path, start_time: start_time, end_time: end_time, duration: duration,
        start_state: start_state, end_state: end_state, delta_state: delta_state, curve: curve, unit: unit };

    var left_tick = tick_func({
        duration: duration,
        curve: curve,
        unit: unit,
        start_state: start_state['left'],
        delta_state: delta_state['left'],
        end_state: end_state['left']
    });
    var top_tick = tick_func({
        duration: duration,
        curve: curve,
        unit: unit,
        start_state: start_state['top'],
        delta_state: delta_state['top'],
        end_state: end_state['top']
    });

    animation.tick = function (time_elapsed) {
        return {
            left: left_tick(time_elapsed),
            top: top_tick(time_elapsed)
        };
    };
    return Animate(animation);
};

var Opacity = exports.Opacity = function Opacity(_ref7) {
    var path = _ref7.path,
        start_time = _ref7.start_time,
        end_time = _ref7.end_time,
        duration = _ref7.duration,
        start_state = _ref7.start_state,
        end_state = _ref7.end_state,
        delta_state = _ref7.delta_state,
        _ref7$curve = _ref7.curve,
        curve = _ref7$curve === undefined ? 'linear' : _ref7$curve,
        _ref7$unit = _ref7.unit,
        unit = _ref7$unit === undefined ? null : _ref7$unit;

    var opacity_throw = function opacity_throw(msg) {
        throw 'Invalid call to Opacity w/path \'' + path + '\': ' + msg;
    };
    try {
        var _applyDefaultsAndVali7 = applyDefaultsAndValidateTimes(start_time, duration, end_time);

        var _applyDefaultsAndVali8 = (0, _slicedToArray3.default)(_applyDefaultsAndVali7, 3);

        start_time = _applyDefaultsAndVali8[0];
        duration = _applyDefaultsAndVali8[1];
        end_time = _applyDefaultsAndVali8[2];
    } catch (err) {
        opacity_throw(err);
    }

    if (typeof start_state !== 'number') {
        opacity_throw('expceted a number for start_state but got ' + start_state);
    }
    if (!exactlyOneIsUndefined(end_state, delta_state)) {
        translate_throw('expected exactly one of (delta_state, end_state) to be defined');
    }
    if (end_state === undefined) {
        if (typeof delta_state !== 'number') {
            opacity_throw('expceted a number for delta_state but got ' + delta_state);
        }
    } else {
        if (typeof end_state !== 'number') {
            opacity_throw('expceted a number for end_state but got ' + end_state);
        }
    }

    var _computeTheOther19 = computeTheOther(start_state, delta_state, end_state);

    var _computeTheOther20 = (0, _slicedToArray3.default)(_computeTheOther19, 2);

    delta_state = _computeTheOther20[0];
    end_state = _computeTheOther20[1];

    if (start_state < 0 || start_state > 1) {
        opacity_throw('expected a start_state in the range of [0, 1], but got ' + start_state);
    }
    if (end_state < 0 || end_state > 1) {
        opacity_throw('expected a end_state in the range of [0, 1], but got ' + end_state);
    }

    return Animate({
        type: 'OPACITY',
        path: path + '/style/opacity',
        start_time: start_time,
        end_time: end_time,
        duration: duration,
        start_state: start_state,
        end_state: end_state,
        delta_state: delta_state,
        curve: curve,
        unit: unit
    });
};

var Rotate = exports.Rotate = function Rotate(_ref8) {
    var path = _ref8.path,
        start_time = _ref8.start_time,
        end_time = _ref8.end_time,
        duration = _ref8.duration,
        start_state = _ref8.start_state,
        end_state = _ref8.end_state,
        delta_state = _ref8.delta_state,
        _ref8$curve = _ref8.curve,
        curve = _ref8$curve === undefined ? 'linear' : _ref8$curve,
        _ref8$unit = _ref8.unit,
        unit = _ref8$unit === undefined ? 'deg' : _ref8$unit;

    var rotate_throw = function rotate_throw(msg) {
        throw 'Invalid call to Rotate w/path \'' + path + '\': ' + msg;
    };
    try {
        var _applyDefaultsAndVali9 = applyDefaultsAndValidateTimes(start_time, duration, end_time);

        var _applyDefaultsAndVali10 = (0, _slicedToArray3.default)(_applyDefaultsAndVali9, 3);

        start_time = _applyDefaultsAndVali10[0];
        duration = _applyDefaultsAndVali10[1];
        end_time = _applyDefaultsAndVali10[2];
    } catch (err) {
        rotate_throw(err);
    }

    if (typeof start_state !== 'number') {
        rotate_throw('expceted a number for start_state but got ' + start_state);
    }
    if (!exactlyOneIsUndefined(end_state, delta_state)) {
        translate_throw('expected exactly one of (delta_state, end_state) to be defined');
    }
    if (end_state === undefined) {
        if (typeof delta_state !== 'number') {
            rotate_throw('expceted a number for delta_state but got ' + delta_state);
        }
    } else {
        if (typeof end_state !== 'number') {
            rotate_throw('expceted a number for end_state but got ' + end_state);
        }
    }

    var _computeTheOther21 = computeTheOther(start_state, delta_state, end_state);

    var _computeTheOther22 = (0, _slicedToArray3.default)(_computeTheOther21, 2);

    delta_state = _computeTheOther22[0];
    end_state = _computeTheOther22[1];

    return Animate({
        type: 'ROTATE',
        path: path + '/style/transform/rotate',
        start_time: start_time,
        end_time: end_time,
        duration: duration,
        start_state: start_state,
        end_state: end_state,
        delta_state: delta_state,
        curve: curve,
        unit: unit
    });
};

// repeat a single animation (which may be composed of several objects)
var Repeat = exports.Repeat = function Repeat(animation) {
    var repeat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

    (0, _util.checkIsValidAnimation)(animation);
    var tick = animation.tick,
        start_time = animation.start_time,
        duration = animation.duration;

    if (start_time === undefined) start_time = Date.now();
    var repeated_tick = function repeated_tick(time_elapsed) {
        return tick((0, _util.mod)(time_elapsed, duration));
    };
    return (0, _extends3.default)({}, animation, {
        repeat: repeat,
        duration: duration * repeat,
        end_time: start_time + duration * repeat,
        tick: repeated_tick
    });
};

// reverse a single animation (which may be composed of several objects)
var Reverse = exports.Reverse = function Reverse(animation) {
    (0, _util.checkIsValidAnimation)(animation);
    var _tick2 = animation.tick,
        start_time = animation.start_time,
        duration = animation.duration;

    if (start_time === undefined) start_time = Date.now();
    return (0, _extends3.default)({}, animation, {
        start_time: end_time,
        end_time: start_time,
        tick: function tick(time_elapsed) {
            return _tick2(duration - time_elapsed);
        }
    });
};

// reverse a sequence of animations
// export const ReverseSequence = (animations) => {
// TODO
// }

var Flatten = exports.Flatten = function Flatten(nested_animations) {
    // flattens arrays nested one level deep
    return [].concat.apply([], nested_animations);
};

// make each animation in a sequence start after the last one ends
var Sequential = exports.Sequential = function Sequential(animations, start_time) {
    (0, _util.checkIsValidSequence)(animations);
    if (start_time === undefined) start_time = Date.now();
    var seq = [];
    var last_end = start_time;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)(animations), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var animation = _step2.value;

            seq.push((0, _extends3.default)({}, animation, {
                start_time: last_end,
                end_time: last_end + animation.duration
            }));
            last_end = animation.duration == Infinity ? last_end + 1 : last_end + animation.duration;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    (0, _util.checkIsValidSequence)(seq);
    return seq;
};

// repeat a sequential list of animations
var RepeatSequence = exports.RepeatSequence = function RepeatSequence(animations, repeat, start_time) {
    (0, _util.checkIsValidSequence)(animations);

    var repeated = (0, _util.range)(repeat).reduce(function (acc, val) {
        return acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(animations));
    }, []);
    return Sequential(repeated, start_time);
};

},{"./util.js":157,"babel-runtime/core-js/get-iterator":3,"babel-runtime/core-js/json/stringify":5,"babel-runtime/core-js/object/keys":8,"babel-runtime/helpers/extends":14,"babel-runtime/helpers/slicedToArray":15,"babel-runtime/helpers/toConsumableArray":16,"babel-runtime/helpers/typeof":17,"lodash.isequal":142}],155:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimationsHandler = exports.startAnimation = exports.animationsReducer = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _warpedTime = require('warped-time');

var _reducers = require('./reducers.js');

var _animations = require('./animations.js');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var shouldAnimate = function shouldAnimate(anim_queue, timestamp, speed) {
    return anim_queue.length && speed;

    // timestamp = timestamp === undefined ? this.time.getWarpedTime() : timestamp

    // // if going forward in time, and future animations exist
    // if (this.time.speed > 0) {
    //     return (currentAnimations(animations.queue, timestamp, animations.former_time).length
    //             || futureAnimations(animations.queue, timestamp).length)
    // }
    // else if (this.time.speed < 0) {
    //     return (currentAnimations(animations.queue, timestamp, animations.former_time).length
    //             || pastAnimations(animations.queue, timestamp).length)
    // }
    // return false
};

var AnimationsHandler = function () {
    function AnimationsHandler(_ref) {
        var store = _ref.store,
            initial_state = _ref.initial_state,
            _ref$autostart_animat = _ref.autostart_animating,
            autostart_animating = _ref$autostart_animat === undefined ? true : _ref$autostart_animat,
            _ref$requestFrame = _ref.requestFrame,
            requestFrame = _ref$requestFrame === undefined ? null : _ref$requestFrame;
        (0, _classCallCheck3.default)(this, AnimationsHandler);

        if (requestFrame === null) {
            if (global.DEBUG) console.log('Running animations in browser');
            this.requestFrame = function (func) {
                return window.requestAnimationFrame.call(window, func);
            };
        } else {
            if (global.DEBUG) console.log('Running animations with custom requestFrame');
            this.requestFrame = requestFrame;
        }

        var speed = store.getState().animations.speed;
        this.animating = !autostart_animating;
        this.store = store;
        this.time = new _warpedTime.WarpedTime({ speed: speed });
        store.subscribe(this.handleStateChange.bind(this));
        if (initial_state) {
            this.initState(initial_state);
        }
    }

    (0, _createClass3.default)(AnimationsHandler, [{
        key: 'initState',
        value: function initState(initial_state) {
            var animations = (0, _keys2.default)(initial_state).map(function (key) {
                return (0, _animations.Become)({
                    path: '/' + key,
                    state: initial_state[key],
                    start_time: 0
                });
            });
            this.store.dispatch({ type: 'ANIMATE', animations: animations });
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange() {
            // console.log('RUNNING ANIMATION DISPATCHER')
            var _store$getState = this.store.getState(),
                animations = _store$getState.animations;

            this.time.setSpeed(animations.speed);
            if (true === animations.force) {
                this.time.setWarpedTime(animations.warped_time);
            }
            var timestamp = this.time.getWarpedTime();
            if (!this.animating && shouldAnimate(animations.queue, timestamp, this.time.speed)) {
                if (global.DEBUG) {
                    console.log('[i] Starting Animation. Current time:', timestamp, ' Active Animations:', animations.queue);
                }
                this.tick();
            }
        }
    }, {
        key: 'tick',
        value: function tick(high_res_timestamp) {
            this.animating = true;

            var _store$getState2 = this.store.getState(),
                animations = _store$getState2.animations;

            var new_timestamp = this.time.getWarpedTime();

            if (new_timestamp < this.time.genesis_time) {
                new_timestamp = this.time.genesis_time;
                animations.speed = 0;
            }

            if (shouldAnimate(animations.queue, new_timestamp, animations.speed)) {
                global.nextFrameId = this.requestFrame(this.tick.bind(this));
            } else {
                this.animating = false;
            }

            this.store.dispatch({
                type: 'TICK',
                // TODO: duplicating code from WarpedTime.getWarpedTime
                former_time: animations.warped_time || 0,
                warped_time: new_timestamp,
                speed: animations.speed
            });
        }
    }]);
    return AnimationsHandler;
}();

var startAnimation = function startAnimation(store, initial_state) {
    var autostart_animating = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var handler = new AnimationsHandler({
        store: store,
        initial_state: initial_state,
        autostart_animating: autostart_animating
    });
    return handler.time;
};

exports.animationsReducer = _reducers.animationsReducer;
exports.startAnimation = startAnimation;
exports.AnimationsHandler = AnimationsHandler;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./animations.js":154,"./reducers.js":156,"babel-runtime/core-js/object/keys":8,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"warped-time":167}],156:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animationsReducer = exports.initial_state = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _util = require('./util.js');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// limit anim_queue to max_time_travel length
var trimmedAnimationQueue = function trimmedAnimationQueue(anim_queue, max_time_travel) {
    if (anim_queue.length > max_time_travel) {
        if (global.DEBUG) {
            console.log('%c[i] Trimmed old animations from animations.queue', 'color:orange', '(queue was longer than ' + max_time_travel + ' items)');
        }
        var keep_from = anim_queue.length - max_time_travel;
        var keep_to = -1;

        var new_queue = anim_queue.slice(keep_from, keep_to);

        // always keep first BECOME animation
        if ((keep_from != 0 || new_queue.length == 0) && anim_queue.length) {
            new_queue = [anim_queue[0]].concat((0, _toConsumableArray3.default)(new_queue));
        }

        return new_queue;
    }
    return anim_queue;
};

var initial_state = exports.initial_state = {
    speed: 1,
    former_time: 0,
    warped_time: 0,
    // maximum length of the queue before items get trimmed
    max_time_travel: 2000,
    queue: [],
    state: {}
};

var animationsReducer = exports.animationsReducer = function animationsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;
    var action = arguments[1];

    switch (action.type) {
        case 'CLEAR_ANIMATIONS':
            var only_initial_state = state.queue.filter(function (anim) {
                return anim.start_time === 0;
            });
            return (0, _extends3.default)({}, initial_state, {
                warped_time: state.warped_time,
                former_time: state.former_time,
                queue: only_initial_state,
                state: (0, _util.computeAnimatedState)({
                    animations: only_initial_state,
                    warped_time: state.warped_time,
                    former_time: state.former_time
                })
            });

        case 'ANIMATE':
            // Adds animations to the queue
            var anim_objs = void 0;
            // validate new animations are correctly typed
            if (action.animation && !action.animations) {
                // if single animation
                (0, _util.checkIsValidAnimation)(action.animation);
                anim_objs = [action.animation];
            } else if (action.animations && !action.animation) {
                // if animation sequence
                (0, _util.checkIsValidSequence)(action.animations);
                anim_objs = action.animations;
            } else {
                console.log('%cINVALID ANIMATE ACTION:', action);
                throw 'ANIMATE action must be passed either an animation sequence: [{}, {}, ...] or a single animation: {}';
            }
            // trim queue to max_time_travel length
            var trimmed_queue = trimmedAnimationQueue(state.queue, state.max_time_travel);
            return (0, _extends3.default)({}, state, {
                queue: [].concat((0, _toConsumableArray3.default)(trimmed_queue), (0, _toConsumableArray3.default)(anim_objs))
            });

        case 'SET_SPEED':
            if (action.reset) {
                return (0, _extends3.default)({}, state, {
                    speed: action.speed,
                    warped_time: state.warped_time,
                    former_time: state.warped_time - 10
                });
            }
            return (0, _extends3.default)({}, state, {
                speed: action.speed,
                former_time: state.warped_time
            });

        case 'TICK':
            if (action.warped_time === undefined || action.former_time === undefined) {
                throw 'TICK action must have a warped_time and former_time';
            }

            var animated_state = (0, _util.computeAnimatedState)({
                animations: state.queue,
                warped_time: action.warped_time,
                former_time: action.former_time
            });

            return (0, _extends3.default)({}, state, {
                state: animated_state,
                speed: (action.speed || !action.force && state.speed) + 0,
                warped_time: action.warped_time,
                former_time: action.former_time,
                force: action.force
            });

        default:
            return state;
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util.js":157,"babel-runtime/helpers/extends":14,"babel-runtime/helpers/toConsumableArray":16}],157:[function(require,module,exports){
(function (process,global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.computeAnimatedState = exports.activeAnimations = exports.uniqueAnimations = exports.futureAnimations = exports.pastAnimations = exports.finalFrameAnimations = exports.currentAnimations = exports.flattenStyles = exports.nested_key = exports.setDifference = exports.setIntersection = exports.flattened = exports.mapObj = exports.flipObj = exports.deepCopy = exports.range = exports.mod = exports.EasingFunctions = exports.checkIsValidSequence = exports.checkIsValidAnimation = exports.assertSortedObjsInOrder = exports.findMissingKey = exports.assertEqual = exports.assertThrows = exports.assert = exports.print = exports.immutify = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.reversed = reversed;
exports.isBaseType = isBaseType;
exports.deepMerge = deepMerge;
exports.select = select;
exports.patch = patch;
exports.applyPatches = applyPatches;

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var _marked = /*#__PURE__*/_regenerator2.default.mark(reversed);

var immutify = exports.immutify = function immutify(obj) {
    return (0, _keys2.default)(obj).reduce(function (new_obj, key) {
        var val = obj[key];
        if (typeof val === 'function') {
            val.inspect = val.toString;
        }
        (0, _defineProperty2.default)(new_obj, key, {
            enumerable: true,
            configurable: false,
            writable: false,
            value: val
        });
        return new_obj;
    }, {});
};

var print = exports.print = function print(msg) {
    process ? process.stdout.write(msg) : console.log(msg);
};

var assert = exports.assert = function assert(val) {
    var error_msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!val) {
        var call_stack = new Error().stack;
        print('[X] AssertionError: ' + error_msg + ' (' + val + ')');
        print(call_stack);
        process.exit(1);
    } else {
        process ? process.stdout.write('.') : console.log('.');
    }
};

var assertThrows = exports.assertThrows = function assertThrows(func) {
    try {
        func();
        assert(false, func.toString() + ' should have thrown an error');
    } catch (err) {
        assert(true);
    }
};

var assertEqual = exports.assertEqual = function assertEqual(val1, val2) {
    assert((0, _lodash2.default)(val1, val2), (0, _stringify2.default)(val1) + ' !== ' + (0, _stringify2.default)(val2));
};

var findMissingKey = exports.findMissingKey = function findMissingKey(obj1, obj2) {
    var both_ways = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(obj1)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!(0, _keys2.default)(obj2).includes(key)) {
                return key;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (both_ways) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(obj2)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _key = _step2.value;

                if (!(0, _keys2.default)(obj1).includes(_key)) {
                    return _key;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
    return null;
};

var assertSortedObjsInOrder = exports.assertSortedObjsInOrder = function assertSortedObjsInOrder(arr, sort_function, expected_order) {
    var arr_with_keys = arr.map(function (obj, idx) {
        return (0, _extends3.default)({}, obj, {
            idx: idx
        });
    });
    var sorted_objs = sort_function(arr_with_keys);
    var sorted_order = sorted_objs.map(function (obj) {
        return obj.idx;
    });
    expected_order.forEach(function (expected_idx, idx) {
        assertEqual(expected_idx, sorted_order[idx]);
    });
};

var checkIsValidAnimation = exports.checkIsValidAnimation = function checkIsValidAnimation(animation) {
    if (Array.isArray(animation)) {
        console.log('%cINVALID ANIMATION:', 'color:red', animation);
        console.log('Got an array instead of a single animation object, did you double-nest somthing by forgetting to use ...?');
        throw 'Animation must be passed in as a single Animation object!';
    }
    if (!(animation.type && animation.path)) {
        console.log('%cINVALID ANIMATION:', 'color:red', animation);
        console.log('Got unrecognized animation object missing a type or path.');
        throw 'Animation must be passed in as a single Animation object!';
    }
};

var checkIsValidSequence = exports.checkIsValidSequence = function checkIsValidSequence(animations) {
    if (!Array.isArray(animations)) {
        console.log('%cINVALID ANIMATION:', 'color:red', animations);
        console.log('Got something other than an array.');
        throw 'Sequence must be passed in as an array of Animation objects!';
    }
    if (animations.length && Array.isArray(animations[0])) {
        console.log('%cINVALID ANIMATION:', 'color:red', animations);
        console.log('Got double-nested animation array instead of just an array of objects.');
        throw 'Sequence must be passed in as an array of Animation objects!';
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = (0, _getIterator3.default)(animations), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var animation = _step3.value;

            checkIsValidAnimation(animation);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return true;
};

var EasingFunctions = exports.EasingFunctions = {
    // no easing, no acceleration
    linear: function linear(t) {
        return t;
    },
    // accelerating from zero velocity
    easeInQuad: function easeInQuad(t) {
        return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic: function easeInCubic(t) {
        return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
};

var mod = exports.mod = function mod(num, delta_state) {
    return (num % delta_state + delta_state) % delta_state;
};

var range = exports.range = function range(num) {
    return [].concat((0, _toConsumableArray3.default)(Array(num).keys()));
};

var deepCopy = exports.deepCopy = function deepCopy(obj) {
    return (0, _extend2.default)(true, {}, obj);
}; // TODO: remove jquery

var flipObj = exports.flipObj = function flipObj(obj) {
    return (0, _keys2.default)(obj).reduce(function (acc, key) {
        var val = obj[key];
        acc[val] = key;
        return acc;
    }, {});
};

// equivalent to {key: func(key, val) for key, val in obj.items()}
var mapObj = exports.mapObj = function mapObj(obj, func) {
    return (0, _keys2.default)(obj).reduce(function (acc, key) {
        acc[key] = func(key, obj[key]);
        return acc;
    }, {});
};

function reversed(iterator) {
    var idx;
    return _regenerator2.default.wrap(function reversed$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    idx = iterator.length - 1;

                case 1:
                    if (!(idx >= 0)) {
                        _context.next = 7;
                        break;
                    }

                    _context.next = 4;
                    return iterator[idx];

                case 4:
                    idx--;
                    _context.next = 1;
                    break;

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

var flattened = exports.flattened = function flattened(array) {
    return [].concat.apply([], array);
};

var setIntersection = exports.setIntersection = function setIntersection(set1, set2) {
    return [].concat((0, _toConsumableArray3.default)(set1)).filter(function (x) {
        return set2.has(x);
    });
};
var setDifference = exports.setDifference = function setDifference(set1, set2) {
    return [].concat((0, _toConsumableArray3.default)(set1)).filter(function (x) {
        return !set2.has(x);
    });
};

var base_types = ['string', 'number', 'boolean', 'symbol', 'function'];
function isBaseType(item) {
    var array_is_basetype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // false if item is a dict, true for everything else
    if (item === null || item === undefined) {
        return true;
    } else if (base_types.indexOf(typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) != -1) {
        return true;
    } else if (array_is_basetype && Array.isArray(item)) {
        return true;
    }
    return false;
}

function deepMerge(obj1, obj2) {
    var merge_vals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (isBaseType(obj1) || isBaseType(obj2)) {
        return obj2;
    } else {
        var obj1_keys = new _set2.default((0, _keys2.default)(obj1));
        var obj2_keys = new _set2.default((0, _keys2.default)(obj2));
        var both_keys = setIntersection(obj1_keys, obj2_keys);
        var only_obj1 = setDifference(obj1_keys, obj2_keys);
        var only_obj2 = setDifference(obj2_keys, obj1_keys);

        var new_obj = {};

        // merge any values that are in both dicts
        if (merge_vals) {
            both_keys.reduce(function (new_obj, key) {
                new_obj[key] = deepMerge(obj1[key], obj2[key]);
                return new_obj;
            }, new_obj);
        }

        // add values only in obj1
        only_obj1.reduce(function (new_obj, key) {
            new_obj[key] = obj1[key];
            return new_obj;
        }, new_obj);

        // add values only in obj2
        only_obj2.reduce(function (new_obj, key) {
            new_obj[key] = obj2[key];
            return new_obj;
        }, new_obj);

        return new_obj;
    }
}

// uniformly populates a tree of size (branching_factor, depth)
//  used in benchmarks. see unit tests for examples
var nested_key = exports.nested_key = function nested_key(i, bf, d) {
    var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // populates a tree uniformly. see tests below for examples
    if (l === 0) {
        return '';
    } else if (!l) {
        var cropped_i = i % Math.pow(bf, d);
        return nested_key(cropped_i, bf, d, d);
    } else {
        return nested_key(Math.floor(i / bf), bf, d, l - 1) + '/' + i;
    }
};

function select(obj, selector) {
    // ({a: {b: 2}}, '/a/b') => 2
    //  Get obj at specified addr (works with array indicies)
    var keys = void 0;
    if (typeof selector === 'string') {
        if (selector === '/') return obj;
        if (selector[0] !== '/') throw 'Invalid selector! ' + selector;
        keys = selector.split('/').slice(1);
    } else if (Array.isArray(selector)) {
        keys = selector;
    } else {
        throw 'Invalid selector, must be string /path or array of keys! ' + selector;
    }
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = (0, _getIterator3.default)(keys), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var key = _step4.value;

            if (obj === undefined) {
                return undefined;
            }
            obj = obj[key];
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return obj;
}

function patch(obj, selector, new_val) {
    var merge = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var mkpath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var deepcopy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

    // ({a: {b: 2}}, '/a/b', 4) => {a: {b: 4}}
    //  Set obj at specified addr (works with array indicies)
    var keys = void 0;
    if (typeof selector === 'string') {
        if (selector === '/') return new_val;
        if (!selector || selector[0] !== '/') throw 'Invalid selector! ' + selector;
        keys = selector.split('/').slice(1);
    } else if (Array.isArray(selector)) {
        keys = [].concat((0, _toConsumableArray3.default)(selector));
    } else {
        throw 'Invalid selector, must be string /path or array of keys! ' + selector;
    }
    var last_key = keys.pop();
    if (last_key == '') {
        console.log({ obj: obj, selector: selector, new_val: new_val, merge: merge, mkpath: mkpath });
        throw 'Patch paths must not have trailing slashes or empty keys!';
    }
    var parent = obj;
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = (0, _getIterator3.default)(keys), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var key = _step5.value;

            // create path if any point is missing
            if (mkpath && (parent[key] === undefined || parent[key] === null) || isBaseType(parent[key], false)) {
                parent[key] = {};
            }
            parent = parent[key];
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    if (merge) {
        parent[last_key] = deepMerge(parent[last_key], new_val);
    } else {
        parent[last_key] = new_val;
    }
    return deepcopy ? (0, _extend2.default)(true, {}, obj) : obj;
}

var css_transform_str = {
    scale: function scale(_scale) {
        return 'scale(' + _scale + ')';
    },
    perspective: function perspective(px) {
        return 'perspective(' + px + ')';
    },
    translate: function translate(_ref) {
        var left = _ref.left,
            top = _ref.top;
        return 'translate(' + left + ', ' + top + ')';
    },
    translate3d: function translate3d(_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            z = _ref2.z;
        return 'translate3d(' + x + ', ' + y + ', ' + z + ')';
    },
    rotate: function rotate(rotation) {
        return 'rotate(' + rotation + ')';
    },
    rotate3d: function rotate3d(_ref3) {
        var x = _ref3.x,
            y = _ref3.y,
            z = _ref3.z;
        return 'rotate3d(' + x + ', ' + y + ', ' + z + ')';
    },
    skew: function skew(_ref4) {
        var x = _ref4.x,
            y = _ref4.y;
        return 'skew(' + x + ', ' + y + ')';
    },
    scale3d: function scale3d(_ref5) {
        var x = _ref5.x,
            y = _ref5.y,
            z = _ref5.z;
        return 'scale3d(' + x + ', ' + y + ', ' + z + ')';
    }
    // TODO: add more css transform types?
};

var css_animation_str = function css_animation_str(_ref6) {
    var name = _ref6.name,
        duration = _ref6.duration,
        curve = _ref6.curve,
        delay = _ref6.delay,
        playState = _ref6.playState;
    return name + ' ' + duration + 'ms ' + curve + ' -' + delay + 'ms ' + playState;
};

var flattenTransform = function flattenTransform(transform) {
    // WARNING: optimized code, do not convert to map() without profiling
    // flatten transforms from a dict to a string
    // converts {style: {transform: {translate: {left: '0px', top: '10px'}, rotate: '10deg'}}}
    //      =>  {style: {transform: 'translate(0px, 10px) rotate(10deg)'}}

    var css_transform_funcs = [];
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = (0, _getIterator3.default)((0, _keys2.default)(transform)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var key = _step6.value;

            if (transform[key] === null) continue;
            var order = transform[key].order;
            if (typeof order === 'number') {
                // deterministic ordering via order: key
                css_transform_funcs[order] = css_transform_str[key](transform[key]);
            } else {
                css_transform_funcs.push(css_transform_str[key](transform[key]));
            }
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return css_transform_funcs.filter(Boolean).join(' ');
};

var flattenAnimation = function flattenAnimation(animation) {
    // WARNING: optimized code, do not convert to map() without profiling
    // flatten animations from a dict to a string
    // converts {style: {animations: {blinker: {name: blinker, duration: 1000, curve: 'linear', delay: 767}, ...}}}
    //      =>  {style: {animation: blinker 1000ms linear -767ms paused, ...}}

    var css_animation_funcs = [];
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = (0, _getIterator3.default)((0, _keys2.default)(animation)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var key = _step7.value;

            if (animation[key] === null) continue;
            var order = animation[key].order;
            if (typeof order === 'number') {
                // deterministic ordering via order: key
                css_animation_funcs[order] = css_animation_str(animation[key]);
            } else {
                css_animation_funcs.push(css_animation_str(animation[key]));
            }
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    return css_animation_funcs.filter(Boolean).join(', ');
};

var flattenIfNotFlattened = function flattenIfNotFlattened(state, path, flatten_func) {
    var state_slice = select(state, path);
    if (state_slice === undefined || state_slice === null) {
        // State no longer exists because it was overwritten by a later patch
        return;
    }
    if (typeof state_slice !== 'string') {
        patch(state, path, flatten_func(state_slice), false, false, false);
    }
};

var flattenStyles = exports.flattenStyles = function flattenStyles(state, paths_to_flatten) {
    // TODO: profile and see if this is slow

    // WARNING: optimized code, profile before changing anything
    // this converts the styles stored as dicts in the state tree, to the strings
    // that react components expect as CSS style values
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = (0, _getIterator3.default)(paths_to_flatten), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var path = _step8.value;

            var transform_idx = path.lastIndexOf('transform');
            if (transform_idx != -1) {
                var path_to_transform = path.slice(0, transform_idx + 1);
                flattenIfNotFlattened(state, path_to_transform, flattenTransform);
                continue;
            }
            var animation_idx = path.lastIndexOf('animation');
            if (animation_idx != -1) {
                var path_to_animation = path.slice(0, animation_idx + 1);
                flattenIfNotFlattened(state, path_to_animation, flattenAnimation);
                continue;
            }
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    return state;
};

var shouldFlatten = function shouldFlatten(split_path) {
    // check to see if a given path introduces some CSS state that needs
    // to be converted from an object to a css string, e.g.
    // {style: transform: translate: {top: 0, left: 0}}
    var style_key_pos = split_path.lastIndexOf('style');
    return style_key_pos != -1 && (split_path[style_key_pos + 1] == 'transform' || split_path[style_key_pos + 1] == 'animation');
};

function applyPatches(obj, patches) {
    var flatten_styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    // WARNING: optimized code, profile before changing anything
    var output = {};
    var paths_to_flatten = [];

    // O(n) application of patches onto a single object
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = (0, _getIterator3.default)(patches), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _patch = _step9.value;

            // deepcopy to prevent later patches from mutating previous object values
            var patch_val = _patch.value;
            if (patch_val !== null && (typeof patch_val === 'undefined' ? 'undefined' : (0, _typeof3.default)(patch_val)) === 'object') {
                // unfortunately this is not very optimizable since dont know
                // the structure beforehand. Do not use JSON.stringify+parse because
                // Date, function, and Infinity objects dont get safely converted.
                // jQuery is significantly faster than lodash cloneDeep
                patch_val = (0, _extend2.default)(true, {}, patch_val);
            }
            var keys = [].concat((0, _toConsumableArray3.default)(_patch.split_path));

            // record this path for later post-processing if it's a css transform or animation path
            if (flatten_styles && shouldFlatten(keys)) paths_to_flatten.push(keys);

            var final_key = keys.pop();
            // iterate down the path to the last object
            var parent = output;
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = (0, _getIterator3.default)(keys), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var key = _step10.value;

                    // create any level as an empty object if it doesn't exist yet
                    if (parent[key] === undefined || parent[key] === null || isBaseType(parent[key], false)) {
                        parent[key] = {};
                    }
                    parent = parent[key];
                }
                // update the parent of the last item to reference our new value
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            parent[final_key] = patch_val;
        }

        // final post-processing to transform the special object values into
        // strings that css expects
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }

    if (flatten_styles) return flattenStyles(output, paths_to_flatten);

    return output;
}

var currentAnimations = exports.currentAnimations = function currentAnimations(_ref7) {
    var anim_queue = _ref7.anim_queue,
        warped_time = _ref7.warped_time;
    return anim_queue.filter(function (_ref8) {
        var start_time = _ref8.start_time,
            end_time = _ref8.end_time;

        var started_already = start_time <= warped_time;
        var has_not_ended = end_time > warped_time;
        return started_already && has_not_ended;
    });
};

var finalFrameAnimations = exports.finalFrameAnimations = function finalFrameAnimations(_ref9) {
    var anim_queue = _ref9.anim_queue,
        warped_time = _ref9.warped_time,
        former_time = _ref9.former_time;

    var is_between = function is_between(anim) {
        if (warped_time >= former_time) {
            // traveling forward in time or standing still
            return former_time <= anim.end_time && anim.end_time <= warped_time;
        } else {
            // traveling backward in time
            return warped_time <= anim.start_time && anim.start_time <= former_time;
        }
    };

    return anim_queue.filter(function (anim) {
        return is_between(anim);
    });
};

var pastAnimations = exports.pastAnimations = function pastAnimations(_ref10) {
    var anim_queue = _ref10.anim_queue,
        warped_time = _ref10.warped_time;
    return anim_queue.filter(function (_ref11) {
        var start_time = _ref11.start_time,
            duration = _ref11.duration;
        return start_time + duration < warped_time;
    });
};

var futureAnimations = exports.futureAnimations = function futureAnimations(_ref12) {
    var anim_queue = _ref12.anim_queue,
        warped_time = _ref12.warped_time;
    return anim_queue.filter(function (_ref13) {
        var start_time = _ref13.start_time,
            duration = _ref13.duration;
        return start_time > warped_time;
    });
};

// 0 /a /b /c       3
// 1 /a /b          2
// 2 /a /b /e /d    4

var parentExists = function parentExists(paths, path) {
    var parent = '';
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
        for (var _iterator11 = (0, _getIterator3.default)(path.split('/').slice(1)), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var key = _step11.value;
            // O(path.length)
            parent = parent + '/' + key;
            if (paths.has(parent)) {
                return true;
            }
        }
    } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
            }
        } finally {
            if (_didIteratorError11) {
                throw _iteratorError11;
            }
        }
    }

    return false;
};

var uniqueAnimations = exports.uniqueAnimations = function uniqueAnimations(anim_queue) {
    var paths = new _set2.default();
    var uniq_anims = [];

    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = (0, _getIterator3.default)(reversed(anim_queue)), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var anim = _step12.value;
            // O(anim_que.length)
            if (!parentExists(paths, anim.path)) {
                uniq_anims.push(anim);
                paths.add(anim.path);
            }
        }
    } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
            }
        } finally {
            if (_didIteratorError12) {
                throw _iteratorError12;
            }
        }
    }

    return uniq_anims.reverse();
};

var activeAnimations = exports.activeAnimations = function activeAnimations(_ref14) {
    var anim_queue = _ref14.anim_queue,
        warped_time = _ref14.warped_time,
        former_time = _ref14.former_time,
        uniqueify = _ref14.uniqueify;

    if (warped_time === undefined || former_time === undefined) {
        throw 'Both warped_time and former_time must be passed to get activeAnimations';
    }

    var anims = [].concat((0, _toConsumableArray3.default)(finalFrameAnimations({ anim_queue: anim_queue, former_time: former_time, warped_time: warped_time })), (0, _toConsumableArray3.default)(currentAnimations({ anim_queue: anim_queue, warped_time: warped_time })));

    if (uniqueify) return uniqueAnimations(anims);

    return anims;
};

var patchesFromAnimation = function patchesFromAnimation(animation, warped_time) {
    // console.log('patchesFromAnimation')
    // console.log({animation, warped_time})
    var patches = [];
    var delta = warped_time - animation.start_time;
    if (animation.merge) {
        var _patch2 = animation.tick(delta);
        (0, _keys2.default)(animation.start_state).forEach(function (key) {
            patches.push({
                split_path: [].concat((0, _toConsumableArray3.default)(animation.split_path), [key]),
                value: _patch2[key]
            });
        });
    } else {
        patches.push({
            split_path: animation.split_path,
            value: animation.tick(delta)
        });
    }
    return patches;
};

var computeAnimatedState = exports.computeAnimatedState = function computeAnimatedState(_ref15) {
    var animations = _ref15.animations,
        warped_time = _ref15.warped_time,
        _ref15$former_time = _ref15.former_time,
        former_time = _ref15$former_time === undefined ? null : _ref15$former_time;

    former_time = former_time === null ? warped_time : former_time;

    var active_animations = activeAnimations({ anim_queue: animations,
        warped_time: warped_time,
        former_time: former_time,
        uniqueify: false });
    var patches = [];
    // console.log({active_animations})
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
        for (var _iterator13 = (0, _getIterator3.default)(active_animations), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var animation = _step13.value;

            if (global.DEBUG) try {
                patches = [].concat((0, _toConsumableArray3.default)(patches), (0, _toConsumableArray3.default)(patchesFromAnimation(animation, warped_time)));
            } catch (e) {
                console.log(animation.type, 'Animation tick function threw an exception:', e.stack, animation);
            } else {
                patches = [].concat((0, _toConsumableArray3.default)(patches), (0, _toConsumableArray3.default)(patchesFromAnimation(animation, warped_time)));
            }
        }
    } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
            }
        } finally {
            if (_didIteratorError13) {
                throw _iteratorError13;
            }
        }
    }

    return applyPatches({}, patches);
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":153,"babel-runtime/core-js/get-iterator":3,"babel-runtime/core-js/json/stringify":5,"babel-runtime/core-js/object/define-property":7,"babel-runtime/core-js/object/keys":8,"babel-runtime/core-js/set":9,"babel-runtime/helpers/extends":14,"babel-runtime/helpers/toConsumableArray":16,"babel-runtime/helpers/typeof":17,"babel-runtime/regenerator":20,"extend":126,"lodash.isequal":142}],158:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":161}],159:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],160:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
}).call(this,require('_process'))
},{"./createStore":162,"./utils/warning":164,"_process":153,"lodash/isPlainObject":152}],161:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
},{}],162:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":152,"symbol-observable":165}],163:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
}).call(this,require('_process'))
},{"./applyMiddleware":158,"./bindActionCreators":159,"./combineReducers":160,"./compose":161,"./createStore":162,"./utils/warning":164,"_process":153}],164:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],165:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill.js":166}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],167:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.time = exports.WarpedTime = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reducers = require('./reducers.js');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var WarpedTime = function () {
    function WarpedTime() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            store = _ref.store,
            speed = _ref.speed,
            server_time = _ref.server_time,
            warped_time = _ref.warped_time,
            genesis_time = _ref.genesis_time,
            _ref$timeSource = _ref.timeSource,
            timeSource = _ref$timeSource === undefined ? Date : _ref$timeSource;

        (0, _classCallCheck3.default)(this, WarpedTime);

        this.store = store;
        this.timeSource = timeSource;
        this.speed = 1;
        this._lastTime = timeSource.now();
        this._currTime = this._lastTime;
        this.server_offset = 0;

        if (speed !== undefined) {
            this.setSpeed(speed);
        }
        if (server_time !== undefined) {
            this.setActualTime(server_time);
        }
        if (warped_time !== undefined) {
            this.setWarpedTime(warped_time);
        }
        this.genesis_time = genesis_time || this.getWarpedTime();
        this.most_future_time = this.getWarpedTime();

        if (store) {
            this.store.subscribe(this.handleStateChange.bind(this));
        }
    }

    (0, _createClass3.default)(WarpedTime, [{
        key: 'setSpeed',
        value: function setSpeed(speed) {
            raise_if_not_number(speed, '@WarpedTime.setSpeed');
            this.speed = speed;
            return this.getWarpedTime();
        }
    }, {
        key: 'getSystemTime',
        value: function getSystemTime() {
            return this.timeSource.now();
        }
    }, {
        key: 'getActualTime',
        value: function getActualTime() {
            return this.getSystemTime() + this.server_offset;
        }
    }, {
        key: 'setActualTime',
        value: function setActualTime(server_time, duration) {
            var _this = this;

            raise_if_not_number(server_time, '@WarpedTime.setActualTime');
            var system_time = this.getSystemTime();
            var final_offset = server_time - system_time;

            if (duration) {
                debugger;
                // TODO: test this gradual adjustment code
                var step_time = 10;
                var total_steps = duration / step_time;
                var step_amt = (final_offset - this.server_offset) / total_steps;
                var step = 0;
                var adjuster = function adjuster() {
                    _this.server_offset += step_amt;
                    step += 1;
                    if (step < total_steps && _this.server_offset != final_offset) {
                        setTimemout(adjuster, 10);
                    }
                };
                return this.getActualTime();
            } else {
                this.server_offset = final_offset;
                return this.getActualTime();
            }
        }
    }, {
        key: 'getWarpedTime',
        value: function getWarpedTime() {
            var actualTime = this.getActualTime();
            this._currTime += (actualTime - this._lastTime) * this.speed;
            this._lastTime = actualTime;
            this.most_future_time = Math.max(this.most_future_time, this._currTime);
            return this._currTime;
        }
    }, {
        key: 'setWarpedTime',
        value: function setWarpedTime(timestamp, duration) {
            raise_if_not_number(timestamp, '@WarpedTime.setWarpedTime');
            if (duration) {
                // TODO: gradual syncing not implemented yet
                console.error('Passing 2nd argument duration is not supported yet.');
                debugger;
            } else {
                this._lastTime = this.getActualTime();
                this._currTime = timestamp;
                return this.getWarpedTime();
            }
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange() {
            var speed = (0, _reducers.select_time)(this.store.getState()).speed;
            if (speed !== null) {
                this.setSpeed(speed);
            }
            var warped_time = (0, _reducers.select_time)(this.store.getState()).warped_time;
            if (warped_time !== null) {
                this.setWarpedTime(warped_time);
            }
        }
    }]);
    return WarpedTime;
}(); /*
         Usage:
             window.store = createStore(combineReducers({time, ...}))
     
             window.time = new WarpedTime(window.store)
     
             time.getWarpedTime() => 3241
             window.store.dispatch({type: 'SET_SPEED', speed: -1})
             time.getWarpedTime() = 3100
     
     */

var raise_if_not_number = function raise_if_not_number(n, msg) {
    if (!(typeof n === 'number')) {
        throw 'Expected a number but got ' + (typeof n === 'undefined' ? 'undefined' : (0, _typeof3.default)(n)) + '.' + (msg ? '\n' + msg : '');
    }
};

exports.WarpedTime = WarpedTime;
exports.time = _reducers.time;

},{"./reducers.js":168,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/typeof":17}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.time = exports.select_time = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var select_time = exports.select_time = function select_time(state) {
    return state.time;
};

var initial_state = {
    speed: null,
    warped_time: null
};

var time = exports.time = function time() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;
    var action = arguments[1];

    switch (action.type) {
        case 'SET_SPEED':
            return (0, _extends3.default)({}, state, { speed: action.speed });
        case 'SET_WARPED_TIME':
            return (0, _extends3.default)({}, state, { warped_time: action.warped_time });
        default:
            return state;
    }
};

},{"babel-runtime/helpers/extends":14}]},{},[1]);
