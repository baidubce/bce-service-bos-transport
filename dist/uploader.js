module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/bce_base_client.js
 * @author leeight
 */

/* eslint-env node */

var util = __webpack_require__(0);
var EventEmitter = __webpack_require__(14).EventEmitter;

var Q = __webpack_require__(4);
var u = __webpack_require__(1);

var config = __webpack_require__(51);
var Auth = __webpack_require__(11);
var HttpClient = __webpack_require__(8);
var H = __webpack_require__(6);

/**
 * BceBaseClient
 *
 * @constructor
 * @param {Object} clientConfig The bce client configuration.
 * @param {string} serviceId The service id.
 * @param {boolean=} regionSupported The service supported region or not.
 */
function BceBaseClient(clientConfig, serviceId, regionSupported) {
    EventEmitter.call(this);

    this.config = u.extend({}, config.DEFAULT_CONFIG, clientConfig);
    this.serviceId = serviceId;
    this.regionSupported = !!regionSupported;

    this.config.endpoint = this._computeEndpoint();

    /**
     * @type {HttpClient}
     */
    this._httpAgent = null;
}
util.inherits(BceBaseClient, EventEmitter);

BceBaseClient.prototype._computeEndpoint = function () {
    if (this.config.endpoint) {
        return this.config.endpoint;
    }

    if (this.regionSupported) {
        return util.format('%s://%s.%s.%s',
            this.config.protocol,
            this.serviceId,
            this.config.region,
            config.DEFAULT_SERVICE_DOMAIN);
    }
    return util.format('%s://%s.%s',
        this.config.protocol,
        this.serviceId,
        config.DEFAULT_SERVICE_DOMAIN);
};

BceBaseClient.prototype.createSignature = function (credentials, httpMethod, path, params, headers) {
    return Q.fcall(function () {
        var auth = new Auth(credentials.ak, credentials.sk);
        return auth.generateAuthorization(httpMethod, path, params, headers);
    });
};

BceBaseClient.prototype.sendRequest = function (httpMethod, resource, varArgs) {
    var defaultArgs = {
        body: null,
        headers: {},
        params: {},
        config: {},
        outputStream: null
    };
    var args = u.extend(defaultArgs, varArgs);

    var config = u.extend({}, this.config, args.config);
    if (config.sessionToken) {
        args.headers[H.SESSION_TOKEN] = config.sessionToken;
    }

    return this.sendHTTPRequest(httpMethod, resource, args, config);
};

BceBaseClient.prototype.sendHTTPRequest = function (httpMethod, resource, args, config) {
    var client = this;
    var agent = this._httpAgent = new HttpClient(config);
    u.each(['progress', 'error', 'abort'], function (eventName) {
        agent.on(eventName, function (evt) {
            client.emit(eventName, evt);
        });
    });

    return this._httpAgent.sendRequest(httpMethod, resource, args.body,
        args.headers, args.params, u.bind(this.createSignature, this),
        args.outputStream
    );
};

module.exports = BceBaseClient;



/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (true) {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                err.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + err.message);
                deferred.reject(err);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(43);
} else {
  module.exports = __webpack_require__(45);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/headers.js
 * @author leeight
 */

/* eslint-env node */

exports.CONTENT_TYPE = 'Content-Type';
exports.CONTENT_LENGTH = 'Content-Length';
exports.CONTENT_MD5 = 'Content-MD5';
exports.CONTENT_ENCODING = 'Content-Encoding';
exports.CONTENT_DISPOSITION = 'Content-Disposition';
exports.ETAG = 'ETag';
exports.CONNECTION = 'Connection';
exports.HOST = 'Host';
exports.USER_AGENT = 'User-Agent';
exports.CACHE_CONTROL = 'Cache-Control';
exports.EXPIRES = 'Expires';

exports.AUTHORIZATION = 'Authorization';
exports.X_BCE_DATE = 'x-bce-date';
exports.X_BCE_ACL = 'x-bce-acl';
exports.X_BCE_REQUEST_ID = 'x-bce-request-id';
exports.X_BCE_CONTENT_SHA256 = 'x-bce-content-sha256';
exports.X_BCE_OBJECT_ACL = 'x-bce-object-acl';
exports.X_BCE_OBJECT_GRANT_READ = 'x-bce-object-grant-read';

exports.X_HTTP_HEADERS = 'http_headers';
exports.X_BODY = 'body';
exports.X_STATUS_CODE = 'status_code';
exports.X_MESSAGE = 'message';
exports.X_CODE = 'code';
exports.X_REQUEST_ID = 'request_id';

exports.SESSION_TOKEN = 'x-bce-security-token';

exports.X_VOD_MEDIA_TITLE = 'x-vod-media-title';
exports.X_VOD_MEDIA_DESCRIPTION = 'x-vod-media-description';
exports.ACCEPT_ENCODING = 'accept-encoding';
exports.ACCEPT = 'accept';













/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/http_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* globals ArrayBuffer */

var http = __webpack_require__(48);
var https = __webpack_require__(49);
var util = __webpack_require__(0);
var stream = __webpack_require__(13);
var EventEmitter = __webpack_require__(14).EventEmitter;

var u = __webpack_require__(1);
var Q = __webpack_require__(4);
var debug = __webpack_require__(5)('bce-sdk:HttpClient');

var H = __webpack_require__(6);

/**
 * The HttpClient
 *
 * @constructor
 * @param {Object} config The http client configuration.
 */
function HttpClient(config) {
    EventEmitter.call(this);

    this.config = config;

    /**
     * http(s) request object
     * @type {Object}
     */
    this._req = null;
}
util.inherits(HttpClient, EventEmitter);

/**
 * Send Http Request
 *
 * @param {string} httpMethod GET,POST,PUT,DELETE,HEAD
 * @param {string} path The http request path.
 * @param {(string|Buffer|stream.Readable)=} body The request body. If `body` is a
 * stream, `Content-Length` must be set explicitly.
 * @param {Object=} headers The http request headers.
 * @param {Object=} params The querystrings in url.
 * @param {function():string=} signFunction The `Authorization` signature function
 * @param {stream.Writable=} outputStream The http response body.
 * @param {number=} retry The maximum number of network connection attempts.
 *
 * @resolve {{http_headers:Object,body:Object}}
 * @reject {Object}
 *
 * @return {Q.defer}
 */
HttpClient.prototype.sendRequest = function (httpMethod, path, body, headers, params,
                                             signFunction, outputStream) {

    var requestUrl = this._getRequestUrl(path, params);
    var options = __webpack_require__(12).parse(requestUrl);
    debug('httpMethod = %s, requestUrl = %s, options = %j',
        httpMethod, requestUrl, options);

    // Prepare the request headers.
    var defaultHeaders = {};
    if (typeof navigator === 'object') {
        defaultHeaders[H.USER_AGENT] = navigator.userAgent;
    }
    else {
        defaultHeaders[H.USER_AGENT] = util.format('bce-sdk-nodejs/%s/%s/%s', __webpack_require__(50).version,
            process.platform, process.version);
    }
    defaultHeaders[H.X_BCE_DATE] = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    defaultHeaders[H.CONNECTION] = 'close';
    defaultHeaders[H.CONTENT_TYPE] = 'application/json; charset=UTF-8';
    defaultHeaders[H.HOST] = options.host;

    headers = u.extend({}, defaultHeaders, headers);

    // if (!headers.hasOwnProperty(H.X_BCE_REQUEST_ID)) {
    //    headers[H.X_BCE_REQUEST_ID] = this._generateRequestId();
    // }

    // Check the content-length
    if (!headers.hasOwnProperty(H.CONTENT_LENGTH)) {
        var contentLength = this._guessContentLength(body);
        if (!(contentLength === 0 && /GET|HEAD/i.test(httpMethod))) {
            // 如果是 GET 或 HEAD 请求，并且 Content-Length 是 0，那么 Request Header 里面就不要出现 Content-Length
            // 否则本地计算签名的时候会计算进去，但是浏览器发请求的时候不一定会有，此时导致 Signature Mismatch 的情况
            headers[H.CONTENT_LENGTH] = contentLength;
        }
    }

    var client = this;
    options.method = httpMethod;
    options.headers = headers;

    // 通过browserify打包后，在Safari下并不能有效处理server的content-type
    // 参考ISSUE：https://github.com/jhiesey/stream-http/issues/8
    options.mode = 'prefer-fast';

    // rejectUnauthorized: If true, the server certificate is verified against the list of supplied CAs.
    // An 'error' event is emitted if verification fails.
    // Verification happens at the connection level, before the HTTP request is sent.
    options.rejectUnauthorized = false;

    if (typeof signFunction === 'function') {
        var promise = signFunction(this.config.credentials, httpMethod, path, params, headers);
        if (isPromise(promise)) {
            return promise.then(function (authorization, xbceDate) {
                headers[H.AUTHORIZATION] = authorization;
                if (xbceDate) {
                    headers[H.X_BCE_DATE] = xbceDate;
                }
                debug('options = %j', options);
                return client._doRequest(options, body, outputStream);
            });
        }
        else if (typeof promise === 'string') {
            headers[H.AUTHORIZATION] = promise;
            debug('options = %j', options);
        }
        else {
            throw new Error('Invalid signature = (' + promise + ')');
        }
    }

    return client._doRequest(options, body, outputStream);
};

function isPromise(obj) {
    return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

HttpClient.prototype._isValidStatus = function (statusCode) {
    return statusCode >= 200 && statusCode < 300;
};

HttpClient.prototype._doRequest = function (options, body, outputStream) {
    var deferred = Q.defer();
    var api = options.protocol === 'https:' ? https : http;
    var client = this;

    var req = client._req = api.request(options, function (res) {
        if (client._isValidStatus(res.statusCode) && outputStream
            && outputStream instanceof stream.Writable) {
            res.pipe(outputStream);
            outputStream.on('finish', function () {
                deferred.resolve(success(client._fixHeaders(res.headers), {}));
            });
            outputStream.on('error', function (error) {
                deferred.reject(error);
            });
            return;
        }
        deferred.resolve(client._recvResponse(res));
    });

    if (req.xhr && typeof req.xhr.upload === 'object') {
        u.each(['progress', 'error', 'abort'], function (eventName) {
            req.xhr.upload.addEventListener(eventName, function (evt) {
                client.emit(eventName, evt);
            }, false);
        });
    }

    req.on('error', function (error) {
        deferred.reject(error);
    });

    try {
        client._sendRequest(req, body);
    }
    catch (ex) {
        deferred.reject(ex);
    }
    return deferred.promise;
};

HttpClient.prototype._generateRequestId = function () {
    function chunk() {
        var v = (~~(Math.random() * 0xffff)).toString(16);
        if (v.length < 4) {
            v += new Array(4 - v.length + 1).join('0');
        }
        return v;
    }

    return util.format('%s%s-%s-%s-%s-%s%s%s',
        chunk(), chunk(), chunk(), chunk(),
        chunk(), chunk(), chunk(), chunk());
};

HttpClient.prototype._guessContentLength = function (data) {
    if (data == null) {
        return 0;
    }
    else if (typeof data === 'string') {
        return Buffer.byteLength(data);
    }
    else if (typeof data === 'object') {
        if (typeof Blob !== 'undefined' && data instanceof Blob) {
            return data.size;
        }
        if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
            return data.byteLength;
        }
        if (Buffer.isBuffer(data)) {
            return data.length;
        }
        /**
         if (typeof FormData !== 'undefined' && data instanceof FormData) {
         }
         */
    }
    else if (Buffer.isBuffer(data)) {
        return data.length;
    }

    throw new Error('No Content-Length is specified.');
};

HttpClient.prototype._fixHeaders = function (headers) {
    var fixedHeaders = {};

    if (headers) {
        Object.keys(headers).forEach(function (key) {
            var value = headers[key].trim();
            if (value) {
                key = key.toLowerCase();
                if (key === 'etag') {
                    value = value.replace(/"/g, '');
                }
                fixedHeaders[key] = value;
            }
        });
    }

    return fixedHeaders;
};

HttpClient.prototype._recvResponse = function (res) {
    var responseHeaders = this._fixHeaders(res.headers);
    var statusCode = res.statusCode;

    function parseHttpResponseBody(raw) {
        var contentType = responseHeaders['content-type'];

        if (!raw.length) {
            return {};
        }
        else if (contentType
            && /(application|text)\/json/.test(contentType)) {
            return JSON.parse(raw.toString());
        }
        return raw;
    }

    var deferred = Q.defer();

    var payload = [];
    /*eslint-disable*/
    res.on('data', function (chunk) {
        if (Buffer.isBuffer(chunk)) {
            payload.push(chunk);
        }
        else {
            // xhr2返回的内容是 string，不是 Buffer，导致 Buffer.concat 的时候报错了
            payload.push(new Buffer(chunk));
        }
    });
    res.on('error', function (e) {
        deferred.reject(e);
    });
    /*eslint-enable*/
    res.on('end', function () {
        var raw = Buffer.concat(payload);
        var responseBody = null;

        try {
            responseBody = parseHttpResponseBody(raw);
        }
        catch (e) {
            debug('statusCode = %s, Parse response body error = %s', statusCode, e.message);
            deferred.reject(this.failure(statusCode, e.message));
            return;
        }

        if (statusCode >= 100 && statusCode < 200) {
            deferred.reject(failure(statusCode, 'Can not handle 1xx http status code.'));
        }
        else if (statusCode < 100 || statusCode >= 300) {
            if (responseBody.requestId) {
                deferred.reject(failure(statusCode, responseBody.message,
                    responseBody.code, responseBody.requestId));
            }
            else {
                deferred.reject(failure(statusCode, responseBody));
            }
        }

        deferred.resolve(success(responseHeaders, responseBody));
    });

    return deferred.promise;
};

/*eslint-disable*/
function isXHR2Compatible(obj) {
    if (typeof Blob !== 'undefined' && obj instanceof Blob) {
        return true;
    }
    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) {
        return true;
    }
    if (typeof FormData !== 'undefined' && obj instanceof FormData) {
        return true;
    }
}
/*eslint-enable*/

HttpClient.prototype._sendRequest = function (req, data) {
    /*eslint-disable*/
    if (!data) {
        req.end();
        return;
    }
    if (typeof data === 'string') {
        data = new Buffer(data);
    }
    /*eslint-enable*/

    if (Buffer.isBuffer(data) || isXHR2Compatible(data)) {
        req.write(data);
        req.end();
    }
    else if (data instanceof stream.Readable) {
        if (!data.readable) {
            throw new Error('stream is not readable');
        }

        data.on('data', function (chunk) {
            req.write(chunk);
        });
        data.on('end', function () {
            req.end();
        });
    }
    else {
        throw new Error('Invalid body type = ' + typeof data);
    }
};

HttpClient.prototype.buildQueryString = function (params) {
    var urlEncodeStr = __webpack_require__(17).stringify(params);
    // https://en.wikipedia.org/wiki/Percent-encoding
    return urlEncodeStr.replace(/[()'!~.*\-_]/g, function (char) {
        return '%' + char.charCodeAt().toString(16);
    });
};

HttpClient.prototype._getRequestUrl = function (path, params) {
    var uri = path;
    var qs = this.buildQueryString(params);
    if (qs) {
        uri += '?' + qs;
    }

    return this.config.endpoint + uri;
};

function success(httpHeaders, body) {
    var response = {};

    response[H.X_HTTP_HEADERS] = httpHeaders;
    response[H.X_BODY] = body;

    return response;
}

function failure(statusCode, message, code, requestId) {
    var response = {};

    response[H.X_STATUS_CODE] = statusCode;
    response[H.X_MESSAGE] = Buffer.isBuffer(message) ? String(message) : message;
    if (code) {
        response[H.X_CODE] = code;
    }
    if (requestId) {
        response[H.X_REQUEST_ID] = requestId;
    }

    return response;
}

module.exports = HttpClient;



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/helper.js
 * @author leeight
 */
var fs = __webpack_require__(3);
var stream = __webpack_require__(13);

var async = __webpack_require__(65);
var u = __webpack_require__(1);
var Q = __webpack_require__(4);
var debug = __webpack_require__(5)('bce-sdk:helper');

// 超过这个限制就开始分片上传
var MIN_MULTIPART_SIZE = 5 * 1024 * 1024;   // 5M

// 分片上传的时候，每个分片的大小
var PART_SIZE          = 1 * 1024 * 1024;   // 1M

var DATA_TYPE_FILE     = 1;
var DATA_TYPE_BUFFER   = 2;
var DATA_TYPE_STREAM   = 3;
var DATA_TYPE_BLOB     = 4;

exports.omitNull = function (value, key, object) {
    return value != null;
};

/**
 * 自适应的按需上传文件
 *
 * @param {BosClient} client The bos client instance.
 * @param {string} bucket The bucket name.
 * @param {string} object The object name.
 * @param {Blob|Buffer|stream.Readable|string} data The data.
 * @param {Object} options The request options.
 * @return {Promise}
 */
exports.upload = function (client, bucket, object, data, options) {
    var contentLength = 0;
    var dataType = -1;
    if (typeof data === 'string') {
        // 文件路径
        // TODO 如果不存在的话，会抛异常，导致程序退出？
        contentLength = fs.lstatSync(data).size;
        dataType = DATA_TYPE_FILE;
    }
    else if (Buffer.isBuffer(data)) {
        // Buffer
        contentLength = data.length;
        dataType = DATA_TYPE_BUFFER;
    }
    else if (data instanceof stream.Readable) {
        dataType = DATA_TYPE_STREAM;
    }
    else if (typeof Blob !== 'undefined' && data instanceof Blob) {
        // 浏览器里面的对象
        contentLength = data.size;
        dataType = DATA_TYPE_BLOB;
    }

    if (dataType === -1) {
        throw new Error('Unsupported `data` type.');
    }

    if (dataType === DATA_TYPE_STREAM) {
        // XXX options['Content-Length'] 应该呗设置过了吧？
        // 这种情况无法分片上传，只能直传了
        return client.putObject(bucket, object, data, options);
    }
    else if (contentLength <= MIN_MULTIPART_SIZE) {
        if (dataType === DATA_TYPE_FILE) {
            return client.putObjectFromFile(bucket, object, data, options);
        }
        else if (dataType === DATA_TYPE_BUFFER) {
            return client.putObject(bucket, object, data, options);
        }
        else if (dataType === DATA_TYPE_BLOB) {
            return client.putObjectFromBlob(bucket, object, data, options);
        }
    }
    else if (contentLength > MIN_MULTIPART_SIZE) {
        // 开始分片上传
        debug('%s > %s -> multi-part', contentLength, MIN_MULTIPART_SIZE);
        return uploadViaMultipart(client, data, dataType,
                                  bucket, object, contentLength, PART_SIZE, options);
    }
};

/*eslint-disable*/
/**
 * 自适应的按需上传文件
 *
 * @param {BosClient} client The bos client instance.
 * @param {string|Buffer|Blob} data The uploaded content.
 * @param {number} dataType The body data type.
 * @param {string} bucket The bucket name.
 * @param {string} object The object name.
 * @param {number} size The body size.
 * @param {number} partSize The multi-part size.
 * @param {Object} options The request options.
 * @return {Promise}
 */
function uploadViaMultipart(client, data, dataType, bucket, object, size, partSize, options) {
    var uploadId;

    return client.initiateMultipartUpload(bucket, object, options)
        .then(function (response) {
            uploadId = response.body.uploadId;
            debug('initiateMultipartUpload = %j', response);

            var deferred = Q.defer();
            var tasks = getTasks(data, uploadId, bucket, object, size, partSize);
            var state = {
                lengthComputable: true,
                loaded: 0,
                total: tasks.length
            };
            async.mapLimit(tasks, 2, uploadPart(client, dataType, state), function (error, results) {
                if (error) {
                    deferred.reject(error);
                }
                else {
                    deferred.resolve(results);
                }
            });
            return deferred.promise;
        })
        .then(function (responses) {
            var parts = u.map(responses, function (response, index) {
                return {
                    partNumber: index + 1,
                    eTag: response.http_headers.etag
                };
            });
            debug('parts = %j', parts);
            return client.completeMultipartUpload(bucket, object, uploadId, parts);
        });
}
/*eslint-enable*/

function uploadPart(client, dataType, state) {
    return function (task, callback) {
        var resolve = function (response) {
            ++state.loaded;
            client.emit('progress', state);
            callback(null, response);
        };
        var reject = function (error) {
            callback(error);
        };

        if (dataType === DATA_TYPE_FILE) {
            debug('client.uploadPartFromFile(%j)', u.omit(task, 'data'));
            return client.uploadPartFromFile(task.bucket, task.object,
                task.uploadId, task.partNumber, task.partSize,
                task.data, task.start).then(resolve, reject);
        }
        else if (dataType === DATA_TYPE_BUFFER) {
            // 没有直接 uploadPartFromBuffer 的接口，借用 DataUrl
            debug('client.uploadPartFromDataUrl(%j)', u.omit(task, 'data'));
            var dataUrl = task.data.slice(task.start, task.stop + 1).toString('base64');
            return client.uploadPartFromDataUrl(task.bucket, task.object,
                task.uploadId, task.partNumber, task.partSize,
                dataUrl).then(resolve, reject);
        }
        else if (dataType === DATA_TYPE_BLOB) {
            debug('client.uploadPartFromBlob(%j)', u.omit(task, 'data'));
            var blob = task.data.slice(task.start, task.stop + 1);
            return client.uploadPartFromBlob(task.bucket, task.object,
                task.uploadId, task.partNumber, task.partSize,
                blob).then(resolve, reject);
        }
    };
}

function getTasks(data, uploadId, bucket, object, size, partSize) {
    var leftSize = size;
    var offset = 0;
    var partNumber = 1;

    var tasks = [];
    while (leftSize > 0) {
        /*eslint-disable*/
        var xPartSize = Math.min(leftSize, partSize);
        /*eslint-enable*/
        tasks.push({
            data: data,   // Buffer or Blob
            uploadId: uploadId,
            bucket: bucket,
            object: object,
            partNumber: partNumber,
            partSize: xPartSize,
            start: offset,
            stop: offset + xPartSize - 1
        });

        leftSize -= xPartSize;
        offset += xPartSize;
        partNumber += 1;
    }

    return tasks;
}













/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/crypto.js
 * @author leeight
 */

/* eslint-env node */

var fs = __webpack_require__(3);
var crypto = __webpack_require__(15);

var Q = __webpack_require__(4);

exports.md5sum = function (data, enc, digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, enc || 'UTF-8');
    }

    var md5 = crypto.createHash('md5');
    md5.update(data);

    return md5.digest(digest || 'base64');
};

exports.md5stream = function (stream, digest) {
    var deferred = Q.defer();

    var md5 = crypto.createHash('md5');
    stream.on('data', function (chunk) {
        md5.update(chunk);
    });
    stream.on('end', function () {
        deferred.resolve(md5.digest(digest || 'base64'));
    });
    stream.on('error', function (error) {
        deferred.reject(error);
    });

    return deferred.promise;
};

exports.md5file = function (filename, digest) {
    return exports.md5stream(fs.createReadStream(filename), digest);
};

exports.md5blob = function (blob, digest) {
    var deferred = Q.defer();

    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onerror = function (e) {
        deferred.reject(reader.error);
    };
    reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
            var content = e.target.result;
            var md5 = exports.md5sum(content, null, digest);
            deferred.resolve(md5);
        }
    };
    return deferred.promise;
};












/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/auth.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);
var u = __webpack_require__(1);

var debug = __webpack_require__(5)('bce-sdk:auth');

var H = __webpack_require__(6);
var strings = __webpack_require__(26);

/**
 * Auth
 *
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
function Auth(ak, sk) {
    this.ak = ak;
    this.sk = sk;
}

/**
 * Generate the signature based on http://gollum.baidu.com/AuthenticationMechanism
 *
 * @param {string} method The http request method, such as GET, POST, DELETE, PUT, ...
 * @param {string} resource The request path.
 * @param {Object=} params The query strings.
 * @param {Object=} headers The http request headers.
 * @param {number=} timestamp Set the current timestamp.
 * @param {number=} expirationInSeconds The signature validation time.
 * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
 *
 * @return {string} The signature.
 */
Auth.prototype.generateAuthorization = function (method, resource, params,
                                                 headers, timestamp, expirationInSeconds, headersToSign) {

    var now = timestamp ? new Date(timestamp * 1000) : new Date();
    var rawSessionKey = util.format('bce-auth-v1/%s/%s/%d',
        this.ak, now.toISOString().replace(/\.\d+Z$/, 'Z'), expirationInSeconds || 1800);
    debug('rawSessionKey = %j', rawSessionKey);
    var sessionKey = this.hash(rawSessionKey, this.sk);

    var canonicalUri = this.uriCanonicalization(resource);
    var canonicalQueryString = this.queryStringCanonicalization(params || {});

    var rv = this.headersCanonicalization(headers || {}, headersToSign);
    var canonicalHeaders = rv[0];
    var signedHeaders = rv[1];
    debug('canonicalUri = %j', canonicalUri);
    debug('canonicalQueryString = %j', canonicalQueryString);
    debug('canonicalHeaders = %j', canonicalHeaders);
    debug('signedHeaders = %j', signedHeaders);

    var rawSignature = util.format('%s\n%s\n%s\n%s',
        method, canonicalUri, canonicalQueryString, canonicalHeaders);
    debug('rawSignature = %j', rawSignature);
    debug('sessionKey = %j', sessionKey);
    var signature = this.hash(rawSignature, sessionKey);

    if (signedHeaders.length) {
        return util.format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
    }

    return util.format('%s//%s', rawSessionKey, signature);
};

Auth.prototype.uriCanonicalization = function (uri) {
    return uri;
};

/**
 * Canonical the query strings.
 *
 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
 * @param {Object} params The query strings.
 * @return {string}
 */
Auth.prototype.queryStringCanonicalization = function (params) {
    var canonicalQueryString = [];
    Object.keys(params).forEach(function (key) {
        if (key.toLowerCase() === H.AUTHORIZATION.toLowerCase()) {
            return;
        }

        var value = params[key] == null ? '' : params[key];
        canonicalQueryString.push(key + '=' + strings.normalize(value));
    });

    canonicalQueryString.sort();

    return canonicalQueryString.join('&');
};

/**
 * Canonical the http request headers.
 *
 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
 * @param {Object} headers The http request headers.
 * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
 * @return {*} canonicalHeaders and signedHeaders
 */
Auth.prototype.headersCanonicalization = function (headers, headersToSign) {
    if (!headersToSign || !headersToSign.length) {
        headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE];
    }
    debug('headers = %j, headersToSign = %j', headers, headersToSign);

    var headersMap = {};
    headersToSign.forEach(function (item) {
        headersMap[item.toLowerCase()] = true;
    });

    var canonicalHeaders = [];
    Object.keys(headers).forEach(function (key) {
        var value = headers[key];
        value = u.isString(value) ? strings.trim(value) : value;
        if (value == null || value === '') {
            return;
        }
        key = key.toLowerCase();
        if (/^x\-bce\-/.test(key) || headersMap[key] === true) {
            canonicalHeaders.push(util.format('%s:%s',
                // encodeURIComponent(key), encodeURIComponent(value)));
                strings.normalize(key), strings.normalize(value)));
        }
    });

    canonicalHeaders.sort();

    var signedHeaders = [];
    canonicalHeaders.forEach(function (item) {
        signedHeaders.push(item.split(':')[0]);
    });

    return [canonicalHeaders.join('\n'), signedHeaders];
};

Auth.prototype.hash = function (data, key) {
    var crypto = __webpack_require__(15);
    var sha256Hmac = crypto.createHmac('sha256', key);
    sha256Hmac.update(data);
    return sha256Hmac.digest('hex');
};

module.exports = Auth;



/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/bos_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);
var path = __webpack_require__(7);
var fs = __webpack_require__(3);
var qs = __webpack_require__(17);

var u = __webpack_require__(1);
var Q = __webpack_require__(4);

var H = __webpack_require__(6);
var strings = __webpack_require__(26);
var Auth = __webpack_require__(11);
var crypto = __webpack_require__(10);
var HttpClient = __webpack_require__(8);
var BceBaseClient = __webpack_require__(2);
var MimeType = __webpack_require__(18);
var WMStream = __webpack_require__(52);
var Multipart = __webpack_require__(53);

// var MIN_PART_SIZE = 1048576;                // 1M
// var THREAD = 2;
var MAX_PUT_OBJECT_LENGTH = 5368709120;     // 5G
var MAX_USER_METADATA_SIZE = 2048;          // 2 * 1024
var MIN_PART_NUMBER = 1;
var MAX_PART_NUMBER = 10000;
var COMMAND_MAP = {
    scale: 's',
    width: 'w',
    height: 'h',
    quality: 'q',
    format: 'f',
    angle: 'a',
    display: 'd',
    limit: 'l',
    crop: 'c',
    offsetX: 'x',
    offsetY: 'y',
    watermark: 'wm',
    key: 'k',
    gravity: 'g',
    gravityX: 'x',
    gravityY: 'y',
    opacity: 'o',
    text: 't',
    fontSize: 'sz',
    fontFamily: 'ff',
    fontColor: 'fc',
    fontStyle: 'fs'
};
var IMAGE_DOMAIN = 'bceimg.com';

/**
 * BOS service api
 *
 * @see http://gollum.baidu.com/BOS_API#BOS-API文档
 *
 * @constructor
 * @param {Object} config The bos client configuration.
 * @extends {BceBaseClient}
 */
function BosClient(config) {
    BceBaseClient.call(this, config, 'bos', true);

    /**
     * @type {HttpClient}
     */
    this._httpAgent = null;
}
util.inherits(BosClient, BceBaseClient);

// --- B E G I N ---
BosClient.prototype.generatePresignedUrl = function (bucketName, key, timestamp,
                                                     expirationInSeconds, headers, params, headersToSign, config) {

    config = u.extend({}, this.config, config);
    params = params || {};

    var resource = path.normalize(path.join(
        '/v1',
        strings.normalize(bucketName || ''),
        strings.normalize(key || '', false)
    )).replace(/\\/g, '/');

    headers = headers || {};
    headers.Host = __webpack_require__(12).parse(config.endpoint).host;

    var credentials = config.credentials;
    var auth = new Auth(credentials.ak, credentials.sk);
    var authorization = auth.generateAuthorization(
        'GET', resource, params, headers, timestamp, expirationInSeconds,
        headersToSign);

    params.authorization = authorization;

    return util.format('%s%s?%s', config.endpoint, resource, qs.encode(params));
};

BosClient.prototype.generateUrl = function (bucketName, key, pipeline, cdn) {
    var resource = path.normalize(path.join(
        '/v1',
        strings.normalize(bucketName || ''),
        strings.normalize(key || '', false)
    )).replace(/\\/g, '/');

    // pipeline表示如何对图片进行处理.
    var command = '';
    if (pipeline) {
        if (u.isString(pipeline)) {
            if (/^@/.test(pipeline)) {
                command = pipeline;
            }
            else {
                command = '@' + pipeline;
            }
        }
        else {
            command = '@' + u.map(pipeline, function (params) {
                    return u.map(params, function (value, key) {
                        return [COMMAND_MAP[key] || key, value].join('_');
                    }).join(',');
                }).join('|');
        }
    }
    if (command) {
        // 需要生成图片转码url
        if (cdn) {
            return util.format('http://%s/%s%s', cdn, path.normalize(key), command);
        }
        return util.format('http://%s.%s/%s%s', path.normalize(bucketName), IMAGE_DOMAIN, path.normalize(key), command);
    }
    return util.format('%s%s%s', this.config.endpoint, resource, command);
};

BosClient.prototype.listBuckets = function (options) {
    options = options || {};
    return this.sendRequest('GET', {config: options.config});
};

BosClient.prototype.createBucket = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('PUT', {
        bucketName: bucketName,
        config: options.config
    });
};

BosClient.prototype.listObjects = function (bucketName, options) {
    options = options || {};

    var params = u.extend(
        {maxKeys: 1000},
        u.pick(options, 'maxKeys', 'prefix', 'marker', 'delimiter')
    );

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: params,
        config: options.config
    });
};

BosClient.prototype.doesBucketExist = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('HEAD', {
        bucketName: bucketName,
        config: options.config
    }).then(
        /*eslint-disable*/
        function () {
            return Q(true);
        },
        function (e) {
            if (e && e[H.X_STATUS_CODE] === 403) {
                return Q(true);
            }
            if (e && e[H.X_STATUS_CODE] === 404) {
                return Q(false);
            }
            return Q.reject(e);
        }
        /*eslint-enable*/
    );
};

BosClient.prototype.deleteBucket = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('DELETE', {
        bucketName: bucketName,
        config: options.config
    });
};

BosClient.prototype.setBucketCannedAcl = function (bucketName, cannedAcl, options) {
    options = options || {};

    var headers = {};
    headers[H.X_BCE_ACL] = cannedAcl;
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        headers: headers,
        params: {acl: ''},
        config: options.config
    });
};

BosClient.prototype.setBucketAcl = function (bucketName, acl, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_TYPE] = 'application/json; charset=UTF-8';
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        body: JSON.stringify({accessControlList: acl}),
        headers: headers,
        params: {acl: ''},
        config: options.config
    });
};

BosClient.prototype.getBucketAcl = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: {acl: ''},
        config: options.config
    });
};

BosClient.prototype.getBucketLocation = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: {location: ''},
        config: options.config
    });
};

BosClient.prototype.deleteMultipleObjects = function (bucketName, objects, options) {
    options = options || {};

    var body = u.map(objects, function (object) {
        return {key: object};
    });

    return this.sendRequest('POST', {
        bucketName: bucketName,
        params: {'delete': ''},
        body: JSON.stringify({
            objects: body
        }),
        config: options.config
    });
};

BosClient.prototype.deleteObject = function (bucketName, key, options) {
    options = options || {};

    return this.sendRequest('DELETE', {
        bucketName: bucketName,
        key: key,
        config: options.config
    });
};

BosClient.prototype.putObject = function (bucketName, key, data, options) {
    if (!key) {
        throw new TypeError('key should not be empty.');
    }

    options = this._checkOptions(options || {});

    return this.sendRequest('PUT', {
        bucketName: bucketName,
        key: key,
        body: data,
        headers: options.headers,
        config: options.config
    });
};

BosClient.prototype.putObjectFromBlob = function (bucketName, key, blob, options) {
    var headers = {};

    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/size
    headers[H.CONTENT_LENGTH] = blob.size;
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // 而且根据 API 文档，这个字段不是必填的。
    options = u.extend(headers, options);

    return this.putObject(bucketName, key, blob, options);
};

BosClient.prototype.putObjectFromDataUrl = function (bucketName, key, data, options) {
    data = new Buffer(data, 'base64');

    var headers = {};
    headers[H.CONTENT_LENGTH] = data.length;
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // headers[H.CONTENT_MD5] = require('./crypto').md5sum(data);
    options = u.extend(headers, options);

    return this.putObject(bucketName, key, data, options);
};

BosClient.prototype.putObjectFromString = function (bucketName, key, data, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_LENGTH] = Buffer.byteLength(data);
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(key));
    headers[H.CONTENT_MD5] = crypto.md5sum(data);
    options = u.extend(headers, options);

    return this.putObject(bucketName, key, data, options);
};

BosClient.prototype.putObjectFromFile = function (bucketName, key, filename, options) {
    options = options || {};

    var headers = {};

    // 如果没有显式的设置，就使用默认值
    var fileSize = fs.statSync(filename).size;
    var contentLength = u.has(options, H.CONTENT_LENGTH)
        ? options[H.CONTENT_LENGTH]
        : fileSize;
    if (contentLength > fileSize) {
        throw new Error('options[\'Content-Length\'] should less than ' + fileSize);
    }

    headers[H.CONTENT_LENGTH] = contentLength;

    // 因为Firefox会在发起请求的时候自动给 Content-Type 添加 charset 属性
    // 导致我们计算签名的时候使用的 Content-Type 值跟服务器收到的不一样，为了
    // 解决这个问题，我们需要显式的声明Charset
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(filename));
    options = u.extend(headers, options);

    var streamOptions = {
        start: 0,
        end: Math.max(0, contentLength - 1)
    };
    var fp = fs.createReadStream(filename, streamOptions);
    if (!u.has(options, H.CONTENT_MD5)) {
        var me = this;
        var fp2 = fs.createReadStream(filename, streamOptions);
        return crypto.md5stream(fp2)
            .then(function (md5sum) {
                options[H.CONTENT_MD5] = md5sum;
                return me.putObject(bucketName, key, fp, options);
            });
    }

    return this.putObject(bucketName, key, fp, options);
};

BosClient.prototype.getObjectMetadata = function (bucketName, key, options) {
    options = options || {};

    return this.sendRequest('HEAD', {
        bucketName: bucketName,
        key: key,
        config: options.config
    });
};

BosClient.prototype.getObject = function (bucketName, key, range, options) {
    options = options || {};

    var outputStream = new WMStream();
    return this.sendRequest('GET', {
        bucketName: bucketName,
        key: key,
        headers: {
            Range: range ? util.format('bytes=%s', range) : ''
        },
        config: options.config,
        outputStream: outputStream
    }).then(function (response) {
        response.body = outputStream.store;
        return response;
    });
};

BosClient.prototype.getObjectToFile = function (bucketName, key, filename, range, options) {
    options = options || {};

    return this.sendRequest('GET', {
        bucketName: bucketName,
        key: key,
        headers: {
            Range: range ? util.format('bytes=%s', range) : ''
        },
        config: options.config,
        outputStream: fs.createWriteStream(filename)
    });
};

BosClient.prototype.copyObject = function (sourceBucketName, sourceKey, targetBucketName, targetKey, options) {
    /*eslint-disable*/
    if (!sourceBucketName) {
        throw new TypeError('sourceBucketName should not be empty');
    }
    if (!sourceKey) {
        throw new TypeError('sourceKey should not be empty');
    }
    if (!targetBucketName) {
        throw new TypeError('targetBucketName should not be empty');
    }
    if (!targetKey) {
        throw new TypeError('targetKey should not be empty');
    }
    /*eslint-enable*/

    options = this._checkOptions(options || {});
    var hasUserMetadata = false;
    u.some(options.headers, function (value, key) {
        if (key.indexOf('x-bce-meta-') === 0) {
            hasUserMetadata = true;
            return true;
        }
    });
    options.headers['x-bce-copy-source'] = strings.normalize(util.format('/%s/%s',
        sourceBucketName, sourceKey), false);
    if (u.has(options.headers, 'ETag')) {
        options.headers['x-bce-copy-source-if-match'] = options.headers.ETag;
    }
    options.headers['x-bce-metadata-directive'] = hasUserMetadata ? 'replace' : 'copy';

    return this.sendRequest('PUT', {
        bucketName: targetBucketName,
        key: targetKey,
        headers: options.headers,
        config: options.config
    });
};

BosClient.prototype.initiateMultipartUpload = function (bucketName, key, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(key));
    return this.sendRequest('POST', {
        bucketName: bucketName,
        key: key,
        params: {uploads: ''},
        headers: headers,
        config: options.config
    });
};

BosClient.prototype.abortMultipartUpload = function (bucketName, key, uploadId, options) {
    options = options || {};

    return this.sendRequest('DELETE', {
        bucketName: bucketName,
        key: key,
        params: {uploadId: uploadId},
        config: options.config
    });
};

BosClient.prototype.completeMultipartUpload = function (bucketName, key, uploadId, partList, options) {
    var headers = {};
    headers[H.CONTENT_TYPE] = 'application/json; charset=UTF-8';
    options = this._checkOptions(u.extend(headers, options));

    return this.sendRequest('POST', {
        bucketName: bucketName,
        key: key,
        body: JSON.stringify({parts: partList}),
        headers: options.headers,
        params: {uploadId: uploadId},
        config: options.config
    });
};

BosClient.prototype.uploadPartFromFile = function (bucketName, key, uploadId, partNumber,
                                                   partSize, filename, offset, options) {

    var start = offset;
    var end = offset + partSize - 1;
    var partFp = fs.createReadStream(filename, {
        start: start,
        end: end
    });
    return this.uploadPart(bucketName, key, uploadId, partNumber,
        partSize, partFp, options);
};

BosClient.prototype.uploadPartFromBlob = function (bucketName, key, uploadId, partNumber,
                                                   partSize, blob, options) {
    if (blob.size !== partSize) {
        throw new TypeError(util.format('Invalid partSize %d and data length %d',
            partSize, blob.size));
    }

    var headers = {};
    headers[H.CONTENT_LENGTH] = partSize;
    headers[H.CONTENT_TYPE] = 'application/octet-stream';
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // headers[H.CONTENT_MD5] = require('./crypto').md5sum(data);

    options = this._checkOptions(u.extend(headers, options));
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        key: key,
        body: blob,
        headers: options.headers,
        params: {
            partNumber: partNumber,
            uploadId: uploadId
        },
        config: options.config
    });
};

BosClient.prototype.uploadPartFromDataUrl = function (bucketName, key, uploadId, partNumber,
                                                      partSize, dataUrl, options) {

    var data = new Buffer(dataUrl, 'base64');
    if (data.length !== partSize) {
        throw new TypeError(util.format('Invalid partSize %d and data length %d',
            partSize, data.length));
    }

    var headers = {};
    headers[H.CONTENT_LENGTH] = partSize;
    headers[H.CONTENT_TYPE] = 'application/octet-stream';
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // headers[H.CONTENT_MD5] = require('./crypto').md5sum(data);

    options = this._checkOptions(u.extend(headers, options));
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        key: key,
        body: data,
        headers: options.headers,
        params: {
            partNumber: partNumber,
            uploadId: uploadId
        },
        config: options.config
    });
};

BosClient.prototype.uploadPart = function (bucketName, key, uploadId, partNumber,
                                           partSize, partFp, options) {

    /*eslint-disable*/
    if (!bucketName) {
        throw new TypeError('bucketName should not be empty');
    }
    if (!key) {
        throw new TypeError('key should not be empty');
    }
    /*eslint-enable*/
    if (partNumber < MIN_PART_NUMBER || partNumber > MAX_PART_NUMBER) {
        throw new TypeError(util.format('Invalid partNumber %d. The valid range is from %d to %d.',
            partNumber, MIN_PART_NUMBER, MAX_PART_NUMBER));
    }

    var client = this;

    // TODO(leeight) 计算md5的时候已经把 partFp 读完了，如果从头再来呢？
    var clonedPartFp = fs.createReadStream(partFp.path, {
        start: partFp.start,
        end: partFp.end
    });

    var headers = {};
    headers[H.CONTENT_LENGTH] = partSize;
    headers[H.CONTENT_TYPE] = 'application/octet-stream';
    // headers[H.CONTENT_MD5] = partMd5;
    options = u.extend(headers, options);

    if (!options[H.CONTENT_MD5]) {
        return crypto.md5stream(partFp)
            .then(function (md5sum) {
                options[H.CONTENT_MD5] = md5sum;
                return newPromise();
            });
    }

    function newPromise() {
        options = client._checkOptions(options);
        return client.sendRequest('PUT', {
            bucketName: bucketName,
            key: key,
            body: clonedPartFp,
            headers: options.headers,
            params: {
                partNumber: partNumber,
                uploadId: uploadId
            },
            config: options.config
        });
    }

    return newPromise();
};

BosClient.prototype.listParts = function (bucketName, key, uploadId, options) {
    /*eslint-disable*/
    if (!uploadId) {
        throw new TypeError('uploadId should not empty');
    }
    /*eslint-enable*/

    var allowedParams = ['maxParts', 'partNumberMarker', 'uploadId'];
    options = this._checkOptions(options || {}, allowedParams);
    options.params.uploadId = uploadId;

    return this.sendRequest('GET', {
        bucketName: bucketName,
        key: key,
        params: options.params,
        config: options.config
    });
};

BosClient.prototype.listMultipartUploads = function (bucketName, options) {
    var allowedParams = ['delimiter', 'maxUploads', 'keyMarker', 'prefix', 'uploads'];

    options = this._checkOptions(options || {}, allowedParams);
    options.params.uploads = '';

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: options.params,
        config: options.config
    });
};

BosClient.prototype.appendObject = function (bucketName, key, data, offset, options) {
    if (!key) {
        throw new TypeError('key should not be empty.');
    }

    options = this._checkOptions(options || {});
    var params = {append: ''};
    if (u.isNumber(offset)) {
        params.offset = offset;
    }
    return this.sendRequest('POST', {
        bucketName: bucketName,
        key: key,
        body: data,
        headers: options.headers,
        params: params,
        config: options.config
    });
};

BosClient.prototype.appendObjectFromBlob = function (bucketName, key, blob, offset, options) {
    var headers = {};

    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/size
    headers[H.CONTENT_LENGTH] = blob.size;
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // 而且根据 API 文档，这个字段不是必填的。
    options = u.extend(headers, options);

    return this.appendObject(bucketName, key, blob, offset, options);
};

BosClient.prototype.appendObjectFromDataUrl = function (bucketName, key, data, offset, options) {
    data = new Buffer(data, 'base64');

    var headers = {};
    headers[H.CONTENT_LENGTH] = data.length;
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // headers[H.CONTENT_MD5] = require('./crypto').md5sum(data);
    options = u.extend(headers, options);

    return this.appendObject(bucketName, key, data, offset, options);
};

BosClient.prototype.appendObjectFromString = function (bucketName, key, data, offset, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_LENGTH] = Buffer.byteLength(data);
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(key));
    headers[H.CONTENT_MD5] = crypto.md5sum(data);
    options = u.extend(headers, options);

    return this.appendObject(bucketName, key, data, offset, options);
};

BosClient.prototype.appendObjectFromFile = function (bucketName, key, filename, offset, size, options) {
    options = options || {};
    if (size === 0) {
        return this.appendObjectFromString(bucketName, key, '', offset, options);
    }

    var headers = {};

    // append的起止位置应该在文件内
    var fileSize = fs.statSync(filename).size;
    if (size + offset > fileSize) {
        throw new Error('Can\'t read the content beyond the end of file.');
    }

    headers[H.CONTENT_LENGTH] = size;

    // 因为Firefox会在发起请求的时候自动给 Content-Type 添加 charset 属性
    // 导致我们计算签名的时候使用的 Content-Type 值跟服务器收到的不一样，为了
    // 解决这个问题，我们需要显式的声明Charset
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(filename));
    options = u.extend(headers, options);

    var streamOptions = {
        start: offset || 0,
        end: (offset || 0) + size - 1
    };
    var fp = fs.createReadStream(filename, streamOptions);
    if (!u.has(options, H.CONTENT_MD5)) {
        var me = this;
        var fp2 = fs.createReadStream(filename, streamOptions);
        return crypto.md5stream(fp2)
            .then(function (md5sum) {
                options[H.CONTENT_MD5] = md5sum;
                return me.appendObject(bucketName, key, fp, offset, options);
            });
    }

    return this.appendObject(bucketName, key, fp, offset, options);
};

/**
 * Generate PostObject policy signature.
 *
 * @param {Object} policy The policy object.
 * @return {string}
 */
BosClient.prototype.signPostObjectPolicy = function (policy) {
    var credentials = this.config.credentials;
    var auth = new Auth(credentials.ak, credentials.sk);

    policy = new Buffer(JSON.stringify(policy)).toString('base64');
    var signature = auth.hash(policy, credentials.sk);

    return {
        policy: policy,
        signature: signature
    };
};

/**
 * Post an object.
 *
 * @see {http://wiki.baidu.com/pages/viewpage.action?pageId=161461681}
 *
 * @param {string} bucketName The bucket name.
 * @param {string} key The object name.
 * @param {string|Buffer} data The file raw data or file path.
 * @param {Object} options The form fields.
 * @return {Promise}
 */
BosClient.prototype.postObject = function (bucketName, key, data, options) {
    var boundary = 'MM8964' + (Math.random() * Math.pow(2, 63)).toString(36);
    var contentType = 'multipart/form-data; boundary=' + boundary;

    if (u.isString(data)) {
        data = fs.readFileSync(data);
    }
    else if (!Buffer.isBuffer(data)) {
        throw new Error('Invalid data type.');
    }

    var credentials = this.config.credentials;
    var ak = credentials.ak;

    var blacklist = ['signature', 'accessKey', 'key', 'file'];
    options = u.omit(options || {}, blacklist);

    var multipart = new Multipart(boundary);
    for (var k in options) {
        if (options.hasOwnProperty(k)) {
            if (k !== 'policy') {
                multipart.addPart(k, options[k]);
            }
        }
    }

    if (options.policy) {
        var rv = this.signPostObjectPolicy(options.policy);
        multipart.addPart('policy', rv.policy);
        multipart.addPart('signature', rv.signature);
    }

    multipart.addPart('accessKey', ak);
    multipart.addPart('key', key);
    multipart.addPart('file', data);

    var body = multipart.encode();

    var headers = {};
    headers[H.CONTENT_TYPE] = contentType;

    return this.sendRequest('POST', {
        bucketName: bucketName,
        body: body,
        headers: headers
    });
};

// --- E N D ---

BosClient.prototype.sendRequest = function (httpMethod, varArgs) {
    var defaultArgs = {
        bucketName: null,
        key: null,
        body: null,
        headers: {},
        params: {},
        config: {},
        outputStream: null
    };
    var args = u.extend(defaultArgs, varArgs);

    var config = u.extend({}, this.config, args.config);
    var resource = path.normalize(path.join(
        '/v1',
        strings.normalize(args.bucketName || ''),
        strings.normalize(args.key || '', false)
    )).replace(/\\/g, '/');

    if (config.sessionToken) {
        args.headers[H.SESSION_TOKEN] = config.sessionToken;
    }

    return this.sendHTTPRequest(httpMethod, resource, args, config);
};

BosClient.prototype.sendHTTPRequest = function (httpMethod, resource, args, config) {
    var client = this;
    var agent = this._httpAgent = new HttpClient(config);

    var httpContext = {
        httpMethod: httpMethod,
        resource: resource,
        args: args,
        config: config
    };
    u.each(['progress', 'error', 'abort'], function (eventName) {
        agent.on(eventName, function (evt) {
            client.emit(eventName, evt, httpContext);
        });
    });

    var promise = this._httpAgent.sendRequest(httpMethod, resource, args.body,
        args.headers, args.params, u.bind(this.createSignature, this),
        args.outputStream
    );

    promise.abort = function () {
        if (agent._req && agent._req.xhr) {
            var xhr = agent._req.xhr;
            xhr.abort();
        }
    };

    return promise;
};

BosClient.prototype._checkOptions = function (options, allowedParams) {
    var rv = {};

    rv.config = options.config || {};
    rv.headers = this._prepareObjectHeaders(options);
    rv.params = u.pick(options, allowedParams || []);

    return rv;
};

BosClient.prototype._prepareObjectHeaders = function (options) {
    var allowedHeaders = [
        H.CONTENT_LENGTH,
        H.CONTENT_ENCODING,
        H.CONTENT_MD5,
        H.X_BCE_CONTENT_SHA256,
        H.CONTENT_TYPE,
        H.CONTENT_DISPOSITION,
        H.ETAG,
        H.SESSION_TOKEN,
        H.CACHE_CONTROL,
        H.EXPIRES,
        H.X_BCE_OBJECT_ACL,
        H.X_BCE_OBJECT_GRANT_READ
    ];
    var metaSize = 0;
    var headers = u.pick(options, function (value, key) {
        if (allowedHeaders.indexOf(key) !== -1) {
            return true;
        }
        else if (/^x\-bce\-meta\-/.test(key)) {
            metaSize += Buffer.byteLength(key) + Buffer.byteLength('' + value);
            return true;
        }
    });

    if (metaSize > MAX_USER_METADATA_SIZE) {
        throw new TypeError('Metadata size should not be greater than ' + MAX_USER_METADATA_SIZE + '.');
    }

    if (u.has(headers, H.CONTENT_LENGTH)) {
        var contentLength = headers[H.CONTENT_LENGTH];
        if (contentLength < 0) {
            throw new TypeError('content_length should not be negative.');
        }
        else if (contentLength > MAX_PUT_OBJECT_LENGTH) { // 5G
            throw new TypeError('Object length should be less than ' + MAX_PUT_OBJECT_LENGTH
                + '. Use multi-part upload instead.');
        }
    }

    if (u.has(headers, 'ETag')) {
        var etag = headers.ETag;
        if (!/^"/.test(etag)) {
            headers.ETag = util.format('"%s"', etag);
        }
    }

    if (!u.has(headers, H.CONTENT_TYPE)) {
        headers[H.CONTENT_TYPE] = 'application/octet-stream';
    }

    return headers;
};

module.exports = BosClient;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * @file src/mime.types.js
 * @author leeight
 */

/* eslint-env node */

var mimeTypes = {
    'ez': 'application/andrew-inset',
    'aw': 'application/applixware',
    'atom': 'application/atom+xml',
    'atomcat': 'application/atomcat+xml',
    'atomsvc': 'application/atomsvc+xml',
    'ccxml': 'application/ccxml+xml',
    'cdmia': 'application/cdmi-capability',
    'cdmic': 'application/cdmi-container',
    'cdmid': 'application/cdmi-domain',
    'cdmio': 'application/cdmi-object',
    'cdmiq': 'application/cdmi-queue',
    'cu': 'application/cu-seeme',
    'davmount': 'application/davmount+xml',
    'dbk': 'application/docbook+xml',
    'dssc': 'application/dssc+der',
    'xdssc': 'application/dssc+xml',
    'ecma': 'application/ecmascript',
    'emma': 'application/emma+xml',
    'epub': 'application/epub+zip',
    'exi': 'application/exi',
    'pfr': 'application/font-tdpfr',
    'gml': 'application/gml+xml',
    'gpx': 'application/gpx+xml',
    'gxf': 'application/gxf',
    'stk': 'application/hyperstudio',
    'ink': 'application/inkml+xml',
    'inkml': 'application/inkml+xml',
    'ipfix': 'application/ipfix',
    'jar': 'application/java-archive',
    'ser': 'application/java-serialized-object',
    'class': 'application/java-vm',
    'js': 'application/javascript',
    'json': 'application/json',
    'jsonml': 'application/jsonml+json',
    'lostxml': 'application/lost+xml',
    'hqx': 'application/mac-binhex40',
    'cpt': 'application/mac-compactpro',
    'mads': 'application/mads+xml',
    'mrc': 'application/marc',
    'mrcx': 'application/marcxml+xml',
    'ma': 'application/mathematica',
    'nb': 'application/mathematica',
    'mb': 'application/mathematica',
    'mathml': 'application/mathml+xml',
    'mbox': 'application/mbox',
    'mscml': 'application/mediaservercontrol+xml',
    'metalink': 'application/metalink+xml',
    'meta4': 'application/metalink4+xml',
    'mets': 'application/mets+xml',
    'mods': 'application/mods+xml',
    'm21': 'application/mp21',
    'mp21': 'application/mp21',
    'mp4s': 'application/mp4',
    'doc': 'application/msword',
    'dot': 'application/msword',
    'mxf': 'application/mxf',
    'bin': 'application/octet-stream',
    'dms': 'application/octet-stream',
    'lrf': 'application/octet-stream',
    'mar': 'application/octet-stream',
    'so': 'application/octet-stream',
    'dist': 'application/octet-stream',
    'distz': 'application/octet-stream',
    'pkg': 'application/octet-stream',
    'bpk': 'application/octet-stream',
    'dump': 'application/octet-stream',
    'elc': 'application/octet-stream',
    'deploy': 'application/octet-stream',
    'oda': 'application/oda',
    'opf': 'application/oebps-package+xml',
    'ogx': 'application/ogg',
    'omdoc': 'application/omdoc+xml',
    'onetoc': 'application/onenote',
    'onetoc2': 'application/onenote',
    'onetmp': 'application/onenote',
    'onepkg': 'application/onenote',
    'oxps': 'application/oxps',
    'xer': 'application/patch-ops-error+xml',
    'pdf': 'application/pdf',
    'pgp': 'application/pgp-encrypted',
    'asc': 'application/pgp-signature',
    'sig': 'application/pgp-signature',
    'prf': 'application/pics-rules',
    'p10': 'application/pkcs10',
    'p7m': 'application/pkcs7-mime',
    'p7c': 'application/pkcs7-mime',
    'p7s': 'application/pkcs7-signature',
    'p8': 'application/pkcs8',
    'ac': 'application/pkix-attr-cert',
    'cer': 'application/pkix-cert',
    'crl': 'application/pkix-crl',
    'pkipath': 'application/pkix-pkipath',
    'pki': 'application/pkixcmp',
    'pls': 'application/pls+xml',
    'ai': 'application/postscript',
    'eps': 'application/postscript',
    'ps': 'application/postscript',
    'cww': 'application/prs.cww',
    'pskcxml': 'application/pskc+xml',
    'rdf': 'application/rdf+xml',
    'rif': 'application/reginfo+xml',
    'rnc': 'application/relax-ng-compact-syntax',
    'rl': 'application/resource-lists+xml',
    'rld': 'application/resource-lists-diff+xml',
    'rs': 'application/rls-services+xml',
    'gbr': 'application/rpki-ghostbusters',
    'mft': 'application/rpki-manifest',
    'roa': 'application/rpki-roa',
    'rsd': 'application/rsd+xml',
    'rss': 'application/rss+xml',
    'rtf': 'application/rtf',
    'sbml': 'application/sbml+xml',
    'scq': 'application/scvp-cv-request',
    'scs': 'application/scvp-cv-response',
    'spq': 'application/scvp-vp-request',
    'spp': 'application/scvp-vp-response',
    'sdp': 'application/sdp',
    'setpay': 'application/set-payment-initiation',
    'setreg': 'application/set-registration-initiation',
    'shf': 'application/shf+xml',
    'smi': 'application/smil+xml',
    'smil': 'application/smil+xml',
    'rq': 'application/sparql-query',
    'srx': 'application/sparql-results+xml',
    'gram': 'application/srgs',
    'grxml': 'application/srgs+xml',
    'sru': 'application/sru+xml',
    'ssdl': 'application/ssdl+xml',
    'ssml': 'application/ssml+xml',
    'tei': 'application/tei+xml',
    'teicorpus': 'application/tei+xml',
    'tfi': 'application/thraud+xml',
    'tsd': 'application/timestamped-data',
    'plb': 'application/vnd.3gpp.pic-bw-large',
    'psb': 'application/vnd.3gpp.pic-bw-small',
    'pvb': 'application/vnd.3gpp.pic-bw-var',
    'tcap': 'application/vnd.3gpp2.tcap',
    'pwn': 'application/vnd.3m.post-it-notes',
    'aso': 'application/vnd.accpac.simply.aso',
    'imp': 'application/vnd.accpac.simply.imp',
    'acu': 'application/vnd.acucobol',
    'atc': 'application/vnd.acucorp',
    'acutc': 'application/vnd.acucorp',
    'air': 'application/vnd.adobe.air-application-installer-package+zip',
    'fcdt': 'application/vnd.adobe.formscentral.fcdt',
    'fxp': 'application/vnd.adobe.fxp',
    'fxpl': 'application/vnd.adobe.fxp',
    'xdp': 'application/vnd.adobe.xdp+xml',
    'xfdf': 'application/vnd.adobe.xfdf',
    'ahead': 'application/vnd.ahead.space',
    'azf': 'application/vnd.airzip.filesecure.azf',
    'azs': 'application/vnd.airzip.filesecure.azs',
    'azw': 'application/vnd.amazon.ebook',
    'acc': 'application/vnd.americandynamics.acc',
    'ami': 'application/vnd.amiga.ami',
    'apk': 'application/vnd.android.package-archive',
    'cii': 'application/vnd.anser-web-certificate-issue-initiation',
    'fti': 'application/vnd.anser-web-funds-transfer-initiation',
    'atx': 'application/vnd.antix.game-component',
    'mpkg': 'application/vnd.apple.installer+xml',
    'm3u8': 'application/vnd.apple.mpegurl',
    'swi': 'application/vnd.aristanetworks.swi',
    'iota': 'application/vnd.astraea-software.iota',
    'aep': 'application/vnd.audiograph',
    'mpm': 'application/vnd.blueice.multipass',
    'bmi': 'application/vnd.bmi',
    'rep': 'application/vnd.businessobjects',
    'cdxml': 'application/vnd.chemdraw+xml',
    'mmd': 'application/vnd.chipnuts.karaoke-mmd',
    'cdy': 'application/vnd.cinderella',
    'cla': 'application/vnd.claymore',
    'rp9': 'application/vnd.cloanto.rp9',
    'c4g': 'application/vnd.clonk.c4group',
    'c4d': 'application/vnd.clonk.c4group',
    'c4f': 'application/vnd.clonk.c4group',
    'c4p': 'application/vnd.clonk.c4group',
    'c4u': 'application/vnd.clonk.c4group',
    'c11amc': 'application/vnd.cluetrust.cartomobile-config',
    'c11amz': 'application/vnd.cluetrust.cartomobile-config-pkg',
    'csp': 'application/vnd.commonspace',
    'cdbcmsg': 'application/vnd.contact.cmsg',
    'cmc': 'application/vnd.cosmocaller',
    'clkx': 'application/vnd.crick.clicker',
    'clkk': 'application/vnd.crick.clicker.keyboard',
    'clkp': 'application/vnd.crick.clicker.palette',
    'clkt': 'application/vnd.crick.clicker.template',
    'clkw': 'application/vnd.crick.clicker.wordbank',
    'wbs': 'application/vnd.criticaltools.wbs+xml',
    'pml': 'application/vnd.ctc-posml',
    'ppd': 'application/vnd.cups-ppd',
    'car': 'application/vnd.curl.car',
    'pcurl': 'application/vnd.curl.pcurl',
    'dart': 'application/vnd.dart',
    'rdz': 'application/vnd.data-vision.rdz',
    'uvf': 'application/vnd.dece.data',
    'uvvf': 'application/vnd.dece.data',
    'uvd': 'application/vnd.dece.data',
    'uvvd': 'application/vnd.dece.data',
    'uvt': 'application/vnd.dece.ttml+xml',
    'uvvt': 'application/vnd.dece.ttml+xml',
    'uvx': 'application/vnd.dece.unspecified',
    'uvvx': 'application/vnd.dece.unspecified',
    'uvz': 'application/vnd.dece.zip',
    'uvvz': 'application/vnd.dece.zip',
    /*eslint-disable*/
    'fe_launch': 'application/vnd.denovo.fcselayout-link',
    /*eslint-enable*/
    'dna': 'application/vnd.dna',
    'mlp': 'application/vnd.dolby.mlp',
    'dpg': 'application/vnd.dpgraph',
    'dfac': 'application/vnd.dreamfactory',
    'kpxx': 'application/vnd.ds-keypoint',
    'ait': 'application/vnd.dvb.ait',
    'svc': 'application/vnd.dvb.service',
    'geo': 'application/vnd.dynageo',
    'mag': 'application/vnd.ecowin.chart',
    'nml': 'application/vnd.enliven',
    'esf': 'application/vnd.epson.esf',
    'msf': 'application/vnd.epson.msf',
    'qam': 'application/vnd.epson.quickanime',
    'slt': 'application/vnd.epson.salt',
    'ssf': 'application/vnd.epson.ssf',
    'es3': 'application/vnd.eszigno3+xml',
    'et3': 'application/vnd.eszigno3+xml',
    'ez2': 'application/vnd.ezpix-album',
    'ez3': 'application/vnd.ezpix-package',
    'fdf': 'application/vnd.fdf',
    'mseed': 'application/vnd.fdsn.mseed',
    'seed': 'application/vnd.fdsn.seed',
    'dataless': 'application/vnd.fdsn.seed',
    'gph': 'application/vnd.flographit',
    'ftc': 'application/vnd.fluxtime.clip',
    'fm': 'application/vnd.framemaker',
    'frame': 'application/vnd.framemaker',
    'maker': 'application/vnd.framemaker',
    'book': 'application/vnd.framemaker',
    'fnc': 'application/vnd.frogans.fnc',
    'ltf': 'application/vnd.frogans.ltf',
    'fsc': 'application/vnd.fsc.weblaunch',
    'oas': 'application/vnd.fujitsu.oasys',
    'oa2': 'application/vnd.fujitsu.oasys2',
    'oa3': 'application/vnd.fujitsu.oasys3',
    'fg5': 'application/vnd.fujitsu.oasysgp',
    'bh2': 'application/vnd.fujitsu.oasysprs',
    'ddd': 'application/vnd.fujixerox.ddd',
    'xdw': 'application/vnd.fujixerox.docuworks',
    'xbd': 'application/vnd.fujixerox.docuworks.binder',
    'fzs': 'application/vnd.fuzzysheet',
    'txd': 'application/vnd.genomatix.tuxedo',
    'ggb': 'application/vnd.geogebra.file',
    'ggt': 'application/vnd.geogebra.tool',
    'gex': 'application/vnd.geometry-explorer',
    'gre': 'application/vnd.geometry-explorer',
    'gxt': 'application/vnd.geonext',
    'g2w': 'application/vnd.geoplan',
    'g3w': 'application/vnd.geospace',
    'gmx': 'application/vnd.gmx',
    'kml': 'application/vnd.google-earth.kml+xml',
    'kmz': 'application/vnd.google-earth.kmz',
    'gqf': 'application/vnd.grafeq',
    'gqs': 'application/vnd.grafeq',
    'gac': 'application/vnd.groove-account',
    'ghf': 'application/vnd.groove-help',
    'gim': 'application/vnd.groove-identity-message',
    'grv': 'application/vnd.groove-injector',
    'gtm': 'application/vnd.groove-tool-message',
    'tpl': 'application/vnd.groove-tool-template',
    'vcg': 'application/vnd.groove-vcard',
    'hal': 'application/vnd.hal+xml',
    'zmm': 'application/vnd.handheld-entertainment+xml',
    'hbci': 'application/vnd.hbci',
    'les': 'application/vnd.hhe.lesson-player',
    'hpgl': 'application/vnd.hp-hpgl',
    'hpid': 'application/vnd.hp-hpid',
    'hps': 'application/vnd.hp-hps',
    'jlt': 'application/vnd.hp-jlyt',
    'pcl': 'application/vnd.hp-pcl',
    'pclxl': 'application/vnd.hp-pclxl',
    /*eslint-disable*/
    'sfd-hdstx': 'application/vnd.hydrostatix.sof-data',
    /*eslint-enable*/
    'mpy': 'application/vnd.ibm.minipay',
    'afp': 'application/vnd.ibm.modcap',
    'listafp': 'application/vnd.ibm.modcap',
    'list3820': 'application/vnd.ibm.modcap',
    'irm': 'application/vnd.ibm.rights-management',
    'sc': 'application/vnd.ibm.secure-container',
    'icc': 'application/vnd.iccprofile',
    'icm': 'application/vnd.iccprofile',
    'igl': 'application/vnd.igloader',
    'ivp': 'application/vnd.immervision-ivp',
    'ivu': 'application/vnd.immervision-ivu',
    'igm': 'application/vnd.insors.igm',
    'xpw': 'application/vnd.intercon.formnet',
    'xpx': 'application/vnd.intercon.formnet',
    'i2g': 'application/vnd.intergeo',
    'qbo': 'application/vnd.intu.qbo',
    'qfx': 'application/vnd.intu.qfx',
    'rcprofile': 'application/vnd.ipunplugged.rcprofile',
    'irp': 'application/vnd.irepository.package+xml',
    'xpr': 'application/vnd.is-xpr',
    'fcs': 'application/vnd.isac.fcs',
    'jam': 'application/vnd.jam',
    'rms': 'application/vnd.jcp.javame.midlet-rms',
    'jisp': 'application/vnd.jisp',
    'joda': 'application/vnd.joost.joda-archive',
    'ktz': 'application/vnd.kahootz',
    'ktr': 'application/vnd.kahootz',
    'karbon': 'application/vnd.kde.karbon',
    'chrt': 'application/vnd.kde.kchart',
    'kfo': 'application/vnd.kde.kformula',
    'flw': 'application/vnd.kde.kivio',
    'kon': 'application/vnd.kde.kontour',
    'kpr': 'application/vnd.kde.kpresenter',
    'kpt': 'application/vnd.kde.kpresenter',
    'ksp': 'application/vnd.kde.kspread',
    'kwd': 'application/vnd.kde.kword',
    'kwt': 'application/vnd.kde.kword',
    'htke': 'application/vnd.kenameaapp',
    'kia': 'application/vnd.kidspiration',
    'kne': 'application/vnd.kinar',
    'knp': 'application/vnd.kinar',
    'skp': 'application/vnd.koan',
    'skd': 'application/vnd.koan',
    'skt': 'application/vnd.koan',
    'skm': 'application/vnd.koan',
    'sse': 'application/vnd.kodak-descriptor',
    'lasxml': 'application/vnd.las.las+xml',
    'lbd': 'application/vnd.llamagraphics.life-balance.desktop',
    'lbe': 'application/vnd.llamagraphics.life-balance.exchange+xml',
    '123': 'application/vnd.lotus-1-2-3',
    'apr': 'application/vnd.lotus-approach',
    'pre': 'application/vnd.lotus-freelance',
    'nsf': 'application/vnd.lotus-notes',
    'org': 'application/vnd.lotus-organizer',
    'scm': 'application/vnd.lotus-screencam',
    'lwp': 'application/vnd.lotus-wordpro',
    'portpkg': 'application/vnd.macports.portpkg',
    'mcd': 'application/vnd.mcd',
    'mc1': 'application/vnd.medcalcdata',
    'cdkey': 'application/vnd.mediastation.cdkey',
    'mwf': 'application/vnd.mfer',
    'mfm': 'application/vnd.mfmp',
    'flo': 'application/vnd.micrografx.flo',
    'igx': 'application/vnd.micrografx.igx',
    'mif': 'application/vnd.mif',
    'daf': 'application/vnd.mobius.daf',
    'dis': 'application/vnd.mobius.dis',
    'mbk': 'application/vnd.mobius.mbk',
    'mqy': 'application/vnd.mobius.mqy',
    'msl': 'application/vnd.mobius.msl',
    'plc': 'application/vnd.mobius.plc',
    'txf': 'application/vnd.mobius.txf',
    'mpn': 'application/vnd.mophun.application',
    'mpc': 'application/vnd.mophun.certificate',
    'xul': 'application/vnd.mozilla.xul+xml',
    'cil': 'application/vnd.ms-artgalry',
    'cab': 'application/vnd.ms-cab-compressed',
    'xls': 'application/vnd.ms-excel',
    'xlm': 'application/vnd.ms-excel',
    'xla': 'application/vnd.ms-excel',
    'xlc': 'application/vnd.ms-excel',
    'xlt': 'application/vnd.ms-excel',
    'xlw': 'application/vnd.ms-excel',
    'xlam': 'application/vnd.ms-excel.addin.macroenabled.12',
    'xlsb': 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
    'xlsm': 'application/vnd.ms-excel.sheet.macroenabled.12',
    'xltm': 'application/vnd.ms-excel.template.macroenabled.12',
    'eot': 'application/vnd.ms-fontobject',
    'chm': 'application/vnd.ms-htmlhelp',
    'ims': 'application/vnd.ms-ims',
    'lrm': 'application/vnd.ms-lrm',
    'thmx': 'application/vnd.ms-officetheme',
    'cat': 'application/vnd.ms-pki.seccat',
    'stl': 'application/vnd.ms-pki.stl',
    'ppt': 'application/vnd.ms-powerpoint',
    'pps': 'application/vnd.ms-powerpoint',
    'pot': 'application/vnd.ms-powerpoint',
    'ppam': 'application/vnd.ms-powerpoint.addin.macroenabled.12',
    'pptm': 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
    'sldm': 'application/vnd.ms-powerpoint.slide.macroenabled.12',
    'ppsm': 'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
    'potm': 'application/vnd.ms-powerpoint.template.macroenabled.12',
    'mpp': 'application/vnd.ms-project',
    'mpt': 'application/vnd.ms-project',
    'docm': 'application/vnd.ms-word.document.macroenabled.12',
    'dotm': 'application/vnd.ms-word.template.macroenabled.12',
    'wps': 'application/vnd.ms-works',
    'wks': 'application/vnd.ms-works',
    'wcm': 'application/vnd.ms-works',
    'wdb': 'application/vnd.ms-works',
    'wpl': 'application/vnd.ms-wpl',
    'xps': 'application/vnd.ms-xpsdocument',
    'mseq': 'application/vnd.mseq',
    'mus': 'application/vnd.musician',
    'msty': 'application/vnd.muvee.style',
    'taglet': 'application/vnd.mynfc',
    'nlu': 'application/vnd.neurolanguage.nlu',
    'ntf': 'application/vnd.nitf',
    'nitf': 'application/vnd.nitf',
    'nnd': 'application/vnd.noblenet-directory',
    'nns': 'application/vnd.noblenet-sealer',
    'nnw': 'application/vnd.noblenet-web',
    'ngdat': 'application/vnd.nokia.n-gage.data',
    /*eslint-disable*/
    'n-gage': 'application/vnd.nokia.n-gage.symbian.install',
    /*eslint-enable*/
    'rpst': 'application/vnd.nokia.radio-preset',
    'rpss': 'application/vnd.nokia.radio-presets',
    'edm': 'application/vnd.novadigm.edm',
    'edx': 'application/vnd.novadigm.edx',
    'ext': 'application/vnd.novadigm.ext',
    'odc': 'application/vnd.oasis.opendocument.chart',
    'otc': 'application/vnd.oasis.opendocument.chart-template',
    'odb': 'application/vnd.oasis.opendocument.database',
    'odf': 'application/vnd.oasis.opendocument.formula',
    'odft': 'application/vnd.oasis.opendocument.formula-template',
    'odg': 'application/vnd.oasis.opendocument.graphics',
    'otg': 'application/vnd.oasis.opendocument.graphics-template',
    'odi': 'application/vnd.oasis.opendocument.image',
    'oti': 'application/vnd.oasis.opendocument.image-template',
    'odp': 'application/vnd.oasis.opendocument.presentation',
    'otp': 'application/vnd.oasis.opendocument.presentation-template',
    'ods': 'application/vnd.oasis.opendocument.spreadsheet',
    'ots': 'application/vnd.oasis.opendocument.spreadsheet-template',
    'odt': 'application/vnd.oasis.opendocument.text',
    'odm': 'application/vnd.oasis.opendocument.text-master',
    'ott': 'application/vnd.oasis.opendocument.text-template',
    'oth': 'application/vnd.oasis.opendocument.text-web',
    'xo': 'application/vnd.olpc-sugar',
    'dd2': 'application/vnd.oma.dd2+xml',
    'oxt': 'application/vnd.openofficeorg.extension',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
    'ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'mgp': 'application/vnd.osgeo.mapguide.package',
    'dp': 'application/vnd.osgi.dp',
    'esa': 'application/vnd.osgi.subsystem',
    'pdb': 'application/vnd.palm',
    'pqa': 'application/vnd.palm',
    'oprc': 'application/vnd.palm',
    'paw': 'application/vnd.pawaafile',
    'str': 'application/vnd.pg.format',
    'ei6': 'application/vnd.pg.osasli',
    'efif': 'application/vnd.picsel',
    'wg': 'application/vnd.pmi.widget',
    'plf': 'application/vnd.pocketlearn',
    'pbd': 'application/vnd.powerbuilder6',
    'box': 'application/vnd.previewsystems.box',
    'mgz': 'application/vnd.proteus.magazine',
    'qps': 'application/vnd.publishare-delta-tree',
    'ptid': 'application/vnd.pvi.ptid1',
    'qxd': 'application/vnd.quark.quarkxpress',
    'qxt': 'application/vnd.quark.quarkxpress',
    'qwd': 'application/vnd.quark.quarkxpress',
    'qwt': 'application/vnd.quark.quarkxpress',
    'qxl': 'application/vnd.quark.quarkxpress',
    'qxb': 'application/vnd.quark.quarkxpress',
    'bed': 'application/vnd.realvnc.bed',
    'mxl': 'application/vnd.recordare.musicxml',
    'musicxml': 'application/vnd.recordare.musicxml+xml',
    'cryptonote': 'application/vnd.rig.cryptonote',
    'cod': 'application/vnd.rim.cod',
    'rm': 'application/vnd.rn-realmedia',
    'rmvb': 'application/vnd.rn-realmedia-vbr',
    'link66': 'application/vnd.route66.link66+xml',
    'st': 'application/vnd.sailingtracker.track',
    'see': 'application/vnd.seemail',
    'sema': 'application/vnd.sema',
    'semd': 'application/vnd.semd',
    'semf': 'application/vnd.semf',
    'ifm': 'application/vnd.shana.informed.formdata',
    'itp': 'application/vnd.shana.informed.formtemplate',
    'iif': 'application/vnd.shana.informed.interchange',
    'ipk': 'application/vnd.shana.informed.package',
    'twd': 'application/vnd.simtech-mindmapper',
    'twds': 'application/vnd.simtech-mindmapper',
    'mmf': 'application/vnd.smaf',
    'teacher': 'application/vnd.smart.teacher',
    'sdkm': 'application/vnd.solent.sdkm+xml',
    'sdkd': 'application/vnd.solent.sdkm+xml',
    'dxp': 'application/vnd.spotfire.dxp',
    'sfs': 'application/vnd.spotfire.sfs',
    'sdc': 'application/vnd.stardivision.calc',
    'sda': 'application/vnd.stardivision.draw',
    'sdd': 'application/vnd.stardivision.impress',
    'smf': 'application/vnd.stardivision.math',
    'sdw': 'application/vnd.stardivision.writer',
    'vor': 'application/vnd.stardivision.writer',
    'sgl': 'application/vnd.stardivision.writer-global',
    'smzip': 'application/vnd.stepmania.package',
    'sm': 'application/vnd.stepmania.stepchart',
    'sxc': 'application/vnd.sun.xml.calc',
    'stc': 'application/vnd.sun.xml.calc.template',
    'sxd': 'application/vnd.sun.xml.draw',
    'std': 'application/vnd.sun.xml.draw.template',
    'sxi': 'application/vnd.sun.xml.impress',
    'sti': 'application/vnd.sun.xml.impress.template',
    'sxm': 'application/vnd.sun.xml.math',
    'sxw': 'application/vnd.sun.xml.writer',
    'sxg': 'application/vnd.sun.xml.writer.global',
    'stw': 'application/vnd.sun.xml.writer.template',
    'sus': 'application/vnd.sus-calendar',
    'susp': 'application/vnd.sus-calendar',
    'svd': 'application/vnd.svd',
    'sis': 'application/vnd.symbian.install',
    'sisx': 'application/vnd.symbian.install',
    'xsm': 'application/vnd.syncml+xml',
    'bdm': 'application/vnd.syncml.dm+wbxml',
    'xdm': 'application/vnd.syncml.dm+xml',
    'tao': 'application/vnd.tao.intent-module-archive',
    'pcap': 'application/vnd.tcpdump.pcap',
    'cap': 'application/vnd.tcpdump.pcap',
    'dmp': 'application/vnd.tcpdump.pcap',
    'tmo': 'application/vnd.tmobile-livetv',
    'tpt': 'application/vnd.trid.tpt',
    'mxs': 'application/vnd.triscape.mxs',
    'tra': 'application/vnd.trueapp',
    'ufd': 'application/vnd.ufdl',
    'ufdl': 'application/vnd.ufdl',
    'utz': 'application/vnd.uiq.theme',
    'umj': 'application/vnd.umajin',
    'unityweb': 'application/vnd.unity',
    'uoml': 'application/vnd.uoml+xml',
    'vcx': 'application/vnd.vcx',
    'vsd': 'application/vnd.visio',
    'vst': 'application/vnd.visio',
    'vss': 'application/vnd.visio',
    'vsw': 'application/vnd.visio',
    'vis': 'application/vnd.visionary',
    'vsf': 'application/vnd.vsf',
    'wbxml': 'application/vnd.wap.wbxml',
    'wmlc': 'application/vnd.wap.wmlc',
    'wmlsc': 'application/vnd.wap.wmlscriptc',
    'wtb': 'application/vnd.webturbo',
    'nbp': 'application/vnd.wolfram.player',
    'wpd': 'application/vnd.wordperfect',
    'wqd': 'application/vnd.wqd',
    'stf': 'application/vnd.wt.stf',
    'xar': 'application/vnd.xara',
    'xfdl': 'application/vnd.xfdl',
    'hvd': 'application/vnd.yamaha.hv-dic',
    'hvs': 'application/vnd.yamaha.hv-script',
    'hvp': 'application/vnd.yamaha.hv-voice',
    'osf': 'application/vnd.yamaha.openscoreformat',
    'osfpvg': 'application/vnd.yamaha.openscoreformat.osfpvg+xml',
    'saf': 'application/vnd.yamaha.smaf-audio',
    'spf': 'application/vnd.yamaha.smaf-phrase',
    'cmp': 'application/vnd.yellowriver-custom-menu',
    'zir': 'application/vnd.zul',
    'zirz': 'application/vnd.zul',
    'zaz': 'application/vnd.zzazz.deck+xml',
    'vxml': 'application/voicexml+xml',
    'wgt': 'application/widget',
    'hlp': 'application/winhlp',
    'wsdl': 'application/wsdl+xml',
    'wspolicy': 'application/wspolicy+xml',
    '7z': 'application/x-7z-compressed',
    'abw': 'application/x-abiword',
    'ace': 'application/x-ace-compressed',
    'dmg': 'application/x-apple-diskimage',
    'aab': 'application/x-authorware-bin',
    'x32': 'application/x-authorware-bin',
    'u32': 'application/x-authorware-bin',
    'vox': 'application/x-authorware-bin',
    'aam': 'application/x-authorware-map',
    'aas': 'application/x-authorware-seg',
    'bcpio': 'application/x-bcpio',
    'torrent': 'application/x-bittorrent',
    'blb': 'application/x-blorb',
    'blorb': 'application/x-blorb',
    'bz': 'application/x-bzip',
    'bz2': 'application/x-bzip2',
    'boz': 'application/x-bzip2',
    'cbr': 'application/x-cbr',
    'cba': 'application/x-cbr',
    'cbt': 'application/x-cbr',
    'cbz': 'application/x-cbr',
    'cb7': 'application/x-cbr',
    'vcd': 'application/x-cdlink',
    'cfs': 'application/x-cfs-compressed',
    'chat': 'application/x-chat',
    'pgn': 'application/x-chess-pgn',
    'nsc': 'application/x-conference',
    'cpio': 'application/x-cpio',
    'csh': 'application/x-csh',
    'deb': 'application/x-debian-package',
    'udeb': 'application/x-debian-package',
    'dgc': 'application/x-dgc-compressed',
    'dir': 'application/x-director',
    'dcr': 'application/x-director',
    'dxr': 'application/x-director',
    'cst': 'application/x-director',
    'cct': 'application/x-director',
    'cxt': 'application/x-director',
    'w3d': 'application/x-director',
    'fgd': 'application/x-director',
    'swa': 'application/x-director',
    'wad': 'application/x-doom',
    'ncx': 'application/x-dtbncx+xml',
    'dtb': 'application/x-dtbook+xml',
    'res': 'application/x-dtbresource+xml',
    'dvi': 'application/x-dvi',
    'evy': 'application/x-envoy',
    'eva': 'application/x-eva',
    'bdf': 'application/x-font-bdf',
    'gsf': 'application/x-font-ghostscript',
    'psf': 'application/x-font-linux-psf',
    'otf': 'application/x-font-otf',
    'pcf': 'application/x-font-pcf',
    'snf': 'application/x-font-snf',
    'ttf': 'application/x-font-ttf',
    'ttc': 'application/x-font-ttf',
    'pfa': 'application/x-font-type1',
    'pfb': 'application/x-font-type1',
    'pfm': 'application/x-font-type1',
    'afm': 'application/x-font-type1',
    'woff': 'application/x-font-woff',
    'arc': 'application/x-freearc',
    'spl': 'application/x-futuresplash',
    'gca': 'application/x-gca-compressed',
    'ulx': 'application/x-glulx',
    'gnumeric': 'application/x-gnumeric',
    'gramps': 'application/x-gramps-xml',
    'gtar': 'application/x-gtar',
    'tbz': 'application/x-gtar',
    'tgz': 'application/x-gtar',
    'tar.gz': 'application/x-gtar',
    'tbz2': 'application/x-gtar',
    'tar.bz2': 'application/x-gtar',
    'gz': 'application/x-gzip',
    'hdf': 'application/x-hdf',
    'install': 'application/x-install-instructions',
    'iso': 'application/x-iso9660-image',
    'jnlp': 'application/x-java-jnlp-file',
    'latex': 'application/x-latex',
    'lzh': 'application/x-lzh-compressed',
    'lha': 'application/x-lzh-compressed',
    'mie': 'application/x-mie',
    'prc': 'application/x-mobipocket-ebook',
    'mobi': 'application/x-mobipocket-ebook',
    'application': 'application/x-ms-application',
    'lnk': 'application/x-ms-shortcut',
    'wmd': 'application/x-ms-wmd',
    'xbap': 'application/x-ms-xbap',
    'mdb': 'application/x-msaccess',
    'obd': 'application/x-msbinder',
    'crd': 'application/x-mscardfile',
    'clp': 'application/x-msclip',
    'exe': 'application/x-msdownload',
    'dll': 'application/x-msdownload',
    'com': 'application/x-msdownload',
    'bat': 'application/x-msdownload',
    'msi': 'application/x-msdownload',
    'mvb': 'application/x-msmediaview',
    'm13': 'application/x-msmediaview',
    'm14': 'application/x-msmediaview',
    'wmf': 'application/x-msmetafile',
    'wmz': 'application/x-msmetafile',
    'emf': 'application/x-msmetafile',
    'emz': 'application/x-msmetafile',
    'mny': 'application/x-msmoney',
    'pub': 'application/x-mspublisher',
    'scd': 'application/x-msschedule',
    'trm': 'application/x-msterminal',
    'wri': 'application/x-mswrite',
    'nc': 'application/x-netcdf',
    'cdf': 'application/x-netcdf',
    'nzb': 'application/x-nzb',
    'p12': 'application/x-pkcs12',
    'pfx': 'application/x-pkcs12',
    'p7b': 'application/x-pkcs7-certificates',
    'spc': 'application/x-pkcs7-certificates',
    'p7r': 'application/x-pkcs7-certreqresp',
    'rar': 'application/x-rar-compressed',
    'ris': 'application/x-research-info-systems',
    'sh': 'application/x-sh',
    'shar': 'application/x-shar',
    'swf': 'application/x-shockwave-flash',
    'xap': 'application/x-silverlight-app',
    'sql': 'application/x-sql',
    'sit': 'application/x-stuffit',
    'sitx': 'application/x-stuffitx',
    'srt': 'application/x-subrip',
    'sv4cpio': 'application/x-sv4cpio',
    'sv4crc': 'application/x-sv4crc',
    't3': 'application/x-t3vm-image',
    'gam': 'application/x-tads',
    'tar': 'application/x-tar',
    'tcl': 'application/x-tcl',
    'tex': 'application/x-tex',
    'tfm': 'application/x-tex-tfm',
    'texinfo': 'application/x-texinfo',
    'texi': 'application/x-texinfo',
    'obj': 'application/x-tgif',
    'ustar': 'application/x-ustar',
    'src': 'application/x-wais-source',
    'der': 'application/x-x509-ca-cert',
    'crt': 'application/x-x509-ca-cert',
    'fig': 'application/x-xfig',
    'xlf': 'application/x-xliff+xml',
    'xpi': 'application/x-xpinstall',
    'xz': 'application/x-xz',
    'z1': 'application/x-zmachine',
    'z2': 'application/x-zmachine',
    'z3': 'application/x-zmachine',
    'z4': 'application/x-zmachine',
    'z5': 'application/x-zmachine',
    'z6': 'application/x-zmachine',
    'z7': 'application/x-zmachine',
    'z8': 'application/x-zmachine',
    'xaml': 'application/xaml+xml',
    'xdf': 'application/xcap-diff+xml',
    'xenc': 'application/xenc+xml',
    'xhtml': 'application/xhtml+xml',
    'xht': 'application/xhtml+xml',
    'xml': 'application/xml',
    'xsl': 'application/xml',
    'dtd': 'application/xml-dtd',
    'xop': 'application/xop+xml',
    'xpl': 'application/xproc+xml',
    'xslt': 'application/xslt+xml',
    'xspf': 'application/xspf+xml',
    'mxml': 'application/xv+xml',
    'xhvml': 'application/xv+xml',
    'xvml': 'application/xv+xml',
    'xvm': 'application/xv+xml',
    'yang': 'application/yang',
    'yin': 'application/yin+xml',
    'zip': 'application/zip',
    'adp': 'audio/adpcm',
    'au': 'audio/basic',
    'snd': 'audio/basic',
    'mid': 'audio/midi',
    'midi': 'audio/midi',
    'kar': 'audio/midi',
    'rmi': 'audio/midi',
    'mp4a': 'audio/mp4',
    'mpga': 'audio/mpeg',
    'mp2': 'audio/mpeg',
    'mp2a': 'audio/mpeg',
    'mp3': 'audio/mpeg',
    'm2a': 'audio/mpeg',
    'm3a': 'audio/mpeg',
    'oga': 'audio/ogg',
    'ogg': 'audio/ogg',
    'spx': 'audio/ogg',
    's3m': 'audio/s3m',
    'sil': 'audio/silk',
    'uva': 'audio/vnd.dece.audio',
    'uvva': 'audio/vnd.dece.audio',
    'eol': 'audio/vnd.digital-winds',
    'dra': 'audio/vnd.dra',
    'dts': 'audio/vnd.dts',
    'dtshd': 'audio/vnd.dts.hd',
    'lvp': 'audio/vnd.lucent.voice',
    'pya': 'audio/vnd.ms-playready.media.pya',
    'ecelp4800': 'audio/vnd.nuera.ecelp4800',
    'ecelp7470': 'audio/vnd.nuera.ecelp7470',
    'ecelp9600': 'audio/vnd.nuera.ecelp9600',
    'rip': 'audio/vnd.rip',
    'weba': 'audio/webm',
    'aac': 'audio/x-aac',
    'aif': 'audio/x-aiff',
    'aiff': 'audio/x-aiff',
    'aifc': 'audio/x-aiff',
    'caf': 'audio/x-caf',
    'flac': 'audio/x-flac',
    'mka': 'audio/x-matroska',
    'm3u': 'audio/x-mpegurl',
    'wax': 'audio/x-ms-wax',
    'wma': 'audio/x-ms-wma',
    'ram': 'audio/x-pn-realaudio',
    'ra': 'audio/x-pn-realaudio',
    'rmp': 'audio/x-pn-realaudio-plugin',
    'wav': 'audio/x-wav',
    'xm': 'audio/xm',
    'cdx': 'chemical/x-cdx',
    'cif': 'chemical/x-cif',
    'cmdf': 'chemical/x-cmdf',
    'cml': 'chemical/x-cml',
    'csml': 'chemical/x-csml',
    'xyz': 'chemical/x-xyz',
    'bmp': 'image/bmp',
    'cgm': 'image/cgm',
    'g3': 'image/g3fax',
    'gif': 'image/gif',
    'ief': 'image/ief',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'jpe': 'image/jpeg',
    'ktx': 'image/ktx',
    'png': 'image/png',
    'btif': 'image/prs.btif',
    'sgi': 'image/sgi',
    'svg': 'image/svg+xml',
    'svgz': 'image/svg+xml',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    'psd': 'image/vnd.adobe.photoshop',
    'uvi': 'image/vnd.dece.graphic',
    'uvvi': 'image/vnd.dece.graphic',
    'uvg': 'image/vnd.dece.graphic',
    'uvvg': 'image/vnd.dece.graphic',
    'sub': 'image/vnd.dvb.subtitle',
    'djvu': 'image/vnd.djvu',
    'djv': 'image/vnd.djvu',
    'dwg': 'image/vnd.dwg',
    'dxf': 'image/vnd.dxf',
    'fbs': 'image/vnd.fastbidsheet',
    'fpx': 'image/vnd.fpx',
    'fst': 'image/vnd.fst',
    'mmr': 'image/vnd.fujixerox.edmics-mmr',
    'rlc': 'image/vnd.fujixerox.edmics-rlc',
    'mdi': 'image/vnd.ms-modi',
    'wdp': 'image/vnd.ms-photo',
    'npx': 'image/vnd.net-fpx',
    'wbmp': 'image/vnd.wap.wbmp',
    'xif': 'image/vnd.xiff',
    'webp': 'image/webp',
    '3ds': 'image/x-3ds',
    'ras': 'image/x-cmu-raster',
    'cmx': 'image/x-cmx',
    'fh': 'image/x-freehand',
    'fhc': 'image/x-freehand',
    'fh4': 'image/x-freehand',
    'fh5': 'image/x-freehand',
    'fh7': 'image/x-freehand',
    'ico': 'image/x-icon',
    'sid': 'image/x-mrsid-image',
    'pcx': 'image/x-pcx',
    'pic': 'image/x-pict',
    'pct': 'image/x-pict',
    'pnm': 'image/x-portable-anymap',
    'pbm': 'image/x-portable-bitmap',
    'pgm': 'image/x-portable-graymap',
    'ppm': 'image/x-portable-pixmap',
    'rgb': 'image/x-rgb',
    'tga': 'image/x-tga',
    'xbm': 'image/x-xbitmap',
    'xpm': 'image/x-xpixmap',
    'xwd': 'image/x-xwindowdump',
    'eml': 'message/rfc822',
    'mime': 'message/rfc822',
    'igs': 'model/iges',
    'iges': 'model/iges',
    'msh': 'model/mesh',
    'mesh': 'model/mesh',
    'silo': 'model/mesh',
    'dae': 'model/vnd.collada+xml',
    'dwf': 'model/vnd.dwf',
    'gdl': 'model/vnd.gdl',
    'gtw': 'model/vnd.gtw',
    'mts': 'model/vnd.mts',
    'vtu': 'model/vnd.vtu',
    'wrl': 'model/vrml',
    'vrml': 'model/vrml',
    'x3db': 'model/x3d+binary',
    'x3dbz': 'model/x3d+binary',
    'x3dv': 'model/x3d+vrml',
    'x3dvz': 'model/x3d+vrml',
    'x3d': 'model/x3d+xml',
    'x3dz': 'model/x3d+xml',
    'appcache': 'text/cache-manifest',
    'ics': 'text/calendar',
    'ifb': 'text/calendar',
    'css': 'text/css',
    'csv': 'text/csv',
    'html': 'text/html',
    'htm': 'text/html',
    'n3': 'text/n3',
    'txt': 'text/plain',
    'text': 'text/plain',
    'conf': 'text/plain',
    'def': 'text/plain',
    'list': 'text/plain',
    'log': 'text/plain',
    'in': 'text/plain',
    'dsc': 'text/prs.lines.tag',
    'rtx': 'text/richtext',
    'sgml': 'text/sgml',
    'sgm': 'text/sgml',
    'tsv': 'text/tab-separated-values',
    't': 'text/troff',
    'tr': 'text/troff',
    'roff': 'text/troff',
    'man': 'text/troff',
    'me': 'text/troff',
    'ms': 'text/troff',
    'ttl': 'text/turtle',
    'uri': 'text/uri-list',
    'uris': 'text/uri-list',
    'urls': 'text/uri-list',
    'vcard': 'text/vcard',
    'curl': 'text/vnd.curl',
    'dcurl': 'text/vnd.curl.dcurl',
    'scurl': 'text/vnd.curl.scurl',
    'mcurl': 'text/vnd.curl.mcurl',
    'fly': 'text/vnd.fly',
    'flx': 'text/vnd.fmi.flexstor',
    'gv': 'text/vnd.graphviz',
    '3dml': 'text/vnd.in3d.3dml',
    'spot': 'text/vnd.in3d.spot',
    'jad': 'text/vnd.sun.j2me.app-descriptor',
    'wml': 'text/vnd.wap.wml',
    'wmls': 'text/vnd.wap.wmlscript',
    's': 'text/x-asm',
    'asm': 'text/x-asm',
    'c': 'text/x-c',
    'cc': 'text/x-c',
    'cxx': 'text/x-c',
    'cpp': 'text/x-c',
    'h': 'text/x-c',
    'hh': 'text/x-c',
    'dic': 'text/x-c',
    'f': 'text/x-fortran',
    'for': 'text/x-fortran',
    'f77': 'text/x-fortran',
    'f90': 'text/x-fortran',
    'java': 'text/x-java-source',
    'opml': 'text/x-opml',
    'p': 'text/x-pascal',
    'pas': 'text/x-pascal',
    'nfo': 'text/x-nfo',
    'etx': 'text/x-setext',
    'sfv': 'text/x-sfv',
    'uu': 'text/x-uuencode',
    'vcs': 'text/x-vcalendar',
    'vcf': 'text/x-vcard',
    '3gp': 'video/3gpp',
    '3g2': 'video/3gpp2',
    'h261': 'video/h261',
    'h263': 'video/h263',
    'h264': 'video/h264',
    'jpgv': 'video/jpeg',
    'jpm': 'video/jpm',
    'jpgm': 'video/jpm',
    'mj2': 'video/mj2',
    'mjp2': 'video/mj2',
    'mp4': 'video/mp4',
    'mp4v': 'video/mp4',
    'mpg4': 'video/mp4',
    'mpeg': 'video/mpeg',
    'mpg': 'video/mpeg',
    'mpe': 'video/mpeg',
    'm1v': 'video/mpeg',
    'm2v': 'video/mpeg',
    'ogv': 'video/ogg',
    'qt': 'video/quicktime',
    'mov': 'video/quicktime',
    'uvh': 'video/vnd.dece.hd',
    'uvvh': 'video/vnd.dece.hd',
    'uvm': 'video/vnd.dece.mobile',
    'uvvm': 'video/vnd.dece.mobile',
    'uvp': 'video/vnd.dece.pd',
    'uvvp': 'video/vnd.dece.pd',
    'uvs': 'video/vnd.dece.sd',
    'uvvs': 'video/vnd.dece.sd',
    'uvv': 'video/vnd.dece.video',
    'uvvv': 'video/vnd.dece.video',
    'dvb': 'video/vnd.dvb.file',
    'fvt': 'video/vnd.fvt',
    'mxu': 'video/vnd.mpegurl',
    'm4u': 'video/vnd.mpegurl',
    'pyv': 'video/vnd.ms-playready.media.pyv',
    'uvu': 'video/vnd.uvvu.mp4',
    'uvvu': 'video/vnd.uvvu.mp4',
    'viv': 'video/vnd.vivo',
    'webm': 'video/webm',
    'f4v': 'video/x-f4v',
    'fli': 'video/x-fli',
    'flv': 'video/x-flv',
    'm4v': 'video/x-m4v',
    'mkv': 'video/x-matroska',
    'mk3d': 'video/x-matroska',
    'mks': 'video/x-matroska',
    'mng': 'video/x-mng',
    'asf': 'video/x-ms-asf',
    'asx': 'video/x-ms-asf',
    'vob': 'video/x-ms-vob',
    'wm': 'video/x-ms-wm',
    'wmv': 'video/x-ms-wmv',
    'wmx': 'video/x-ms-wmx',
    'wvx': 'video/x-ms-wvx',
    'avi': 'video/x-msvideo',
    'movie': 'video/x-sgi-movie',
    'smv': 'video/x-smv',
    'ice': 'x-conference/x-cooltalk'
};

exports.guess = function (ext) {
    if (!ext || !ext.length) {
        return 'application/octet-stream';
    }
    if (ext[0] === '.') {
        ext = ext.substr(1);
    }
    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * azeroth - 日志记录器
 *
 * @file logger.js
 * @author mudio(job.zhanghao@gmail.com)
 */

function logger(type, message, ...args) {
  process.send({ category: 'log', message: { type, message, pid: process.pid } }, ...args);
}

const info = exports.info = (msg, ...args) => logger('info', msg, ...args);
const warn = exports.warn = (msg, ...args) => logger('warn', msg, ...args);
const debug = exports.debug = (msg, ...args) => logger('debug', msg, ...args);
const error = exports.error = (msg, ...args) => logger('error', msg, ...args);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isFunction;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNextTick = exports.hasSetImmediate = undefined;
exports.fallback = fallback;
exports.wrap = wrap;

var _slice = __webpack_require__(22);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function (fn /*, ...args*/) {
        var args = (0, _slice2.default)(arguments, 1);
        defer(function () {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

exports.default = wrap(_defer);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = slice;
function slice(arrayLike, start) {
    start = start | 0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for (var idx = 0; idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}
module.exports = exports["default"];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAsync = undefined;

var _asyncify = __webpack_require__(40);

var _asyncify2 = _interopRequireDefault(_asyncify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
}

exports.default = wrapAsync;
exports.isAsync = isAsync;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file index.js
 * @author leeight
 */

exports.Q = __webpack_require__(4);
exports.Auth = __webpack_require__(11);
exports.BosClient = __webpack_require__(16);
exports.BcsClient = __webpack_require__(54);
exports.BccClient = __webpack_require__(55);
exports.SesClient = __webpack_require__(56);
exports.QnsClient = __webpack_require__(57);
exports.LssClient = __webpack_require__(58);
exports.MctClient = __webpack_require__(59);
exports.FaceClient = __webpack_require__(60);
exports.OCRClient = __webpack_require__(61);
exports.MediaClient = __webpack_require__(62);
exports.HttpClient = __webpack_require__(8);
exports.MimeType = __webpack_require__(18);
exports.STS = __webpack_require__(63);
exports.VodClient = __webpack_require__(64);
exports.DocClient = __webpack_require__(71);












/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(44);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file strings.js
 * @author leeight
 */

var kEscapedMap = {
    '!': '%21',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A'
};

exports.normalize = function (string, encodingSlash) {
    var result = encodeURIComponent(string);
    result = result.replace(/[!'\(\)\*]/g, function ($1) {
        return kEscapedMap[$1];
    });

    if (encodingSlash === false) {
        result = result.replace(/%2F/gi, '/');
    }

    return result;
};

exports.trim = function (string) {
    return (string || '').replace(/^\s+|\s+$/g, '');
};



/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/Statistic.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
var debug = __webpack_require__(5)('bce-sdk:VodClient.Statistic');

var BceBaseClient = __webpack_require__(2);
var helper = __webpack_require__(9);

/**
 * 音视频统计接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E7.BB.9F.E8.AE.A1.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Statistic Config
 *
 * @constructor
 */
function Statistic(config) {
    BceBaseClient.call(this, config, 'vod', false);

    this._mediaId = null;
}
util.inherits(Statistic, BceBaseClient);

Statistic.prototype.setMediaId = function (mediaId) {
    this._mediaId = mediaId;
    return this;
};

Statistic.prototype._buildUrl = function () {
    var baseUrl = '/v1/statistic';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 查询媒资播放信息
 *
 * @param {Object} options 过滤参数.
 * @return {Promise.<Object>}
 */
Statistic.prototype.stat = function (options) {
    var url = this._buildUrl('media', this._mediaId);
    var params = u.pick(u.extend({
        startTime: null,
        endTime: null,
        aggregate: true
    }, options), helper.omitNull);

    debug('stat.params = %j', params);

    return this.sendRequest('GET', url, {params: params});
};

// --- E N D ---

module.exports = Statistic;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Headers
 *
 * @file src/headers.js
 * @author mudio(job.zhanghao@gmail.com)
 */

const Meta = exports.Meta = {
    xMetaOrigin: 'x-bce-meta-origin',
    xMetaMD5: 'x-bce-meta-md5'
};

const TransportOrigin = exports.TransportOrigin = 'bce-client';

const TransportStatus = exports.TransportStatus = {
    UnStarted: 'UnStarted',
    Running: 'Running',
    Paused: 'Paused',
    Finished: 'Finished',
    Error: 'Error'
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (worker, concurrency) {
  var _worker = (0, _wrapAsync2.default)(worker);
  return (0, _queue2.default)(function (items, cb) {
    _worker(items[0], cb);
  }, concurrency, 1);
};

var _queue = __webpack_require__(31);

var _queue2 = _interopRequireDefault(_queue);

var _wrapAsync = __webpack_require__(23);

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Object} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {Function} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {Function} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {Function} remove - remove items from the queue that match a test
 * function.  The test function will be passed an object with a `data` property,
 * and a `priority` property, if this is a
 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
 * `function ({data, priority}) {}` and returns a Boolean.
 * @property {Function} saturated - a callback that is called when the number of
 * running workers hits the `concurrency` limit, and further tasks will be
 * queued.
 * @property {Function} unsaturated - a callback that is called when the number
 * of running workers is less than the `concurrency` & `buffer` limits, and
 * further tasks will not be queued.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - a callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} error - a callback that is called when a task errors.
 * Has the signature `function(error, task)`.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. No more tasks
 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`. Invoked with (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain = function() {
 *     console.log('all items have been processed');
 * };
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * q.push({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
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
  return !!value && (type == 'object' || type == 'function');
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
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = queue;

var _baseIndexOf = __webpack_require__(32);

var _baseIndexOf2 = _interopRequireDefault(_baseIndexOf);

var _isArray = __webpack_require__(36);

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = __webpack_require__(37);

var _noop2 = _interopRequireDefault(_noop);

var _onlyOnce = __webpack_require__(38);

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _setImmediate = __webpack_require__(21);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

var _DoublyLinkedList = __webpack_require__(39);

var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

var _wrapAsync = __webpack_require__(23);

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    } else if (concurrency === 0) {
        throw new Error('Concurrency must not be zero');
    }

    var _worker = (0, _wrapAsync2.default)(worker);
    var numRunning = 0;
    var workersList = [];

    function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!(0, _isArray2.default)(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return (0, _setImmediate2.default)(function () {
                q.drain();
            });
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                callback: callback || _noop2.default
            };

            if (insertAtFront) {
                q._tasks.unshift(item);
            } else {
                q._tasks.push(item);
            }
        }
        (0, _setImmediate2.default)(q.process);
    }

    function _next(tasks) {
        return function (err) {
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = (0, _baseIndexOf2.default)(workersList, task, 0);
                if (index >= 0) {
                    workersList.splice(index, 1);
                }

                task.callback.apply(task, arguments);

                if (err != null) {
                    q.error(err, task.data);
                }
            }

            if (numRunning <= q.concurrency - q.buffer) {
                q.unsaturated();
            }

            if (q.idle()) {
                q.drain();
            }
            q.process();
        };
    }

    var isProcessing = false;
    var q = {
        _tasks: new _DoublyLinkedList2.default(),
        concurrency: concurrency,
        payload: payload,
        saturated: _noop2.default,
        unsaturated: _noop2.default,
        buffer: concurrency / 4,
        empty: _noop2.default,
        drain: _noop2.default,
        error: _noop2.default,
        started: false,
        paused: false,
        push: function (data, callback) {
            _insert(data, false, callback);
        },
        kill: function () {
            q.drain = _noop2.default;
            q._tasks.empty();
        },
        unshift: function (data, callback) {
            _insert(data, true, callback);
        },
        remove: function (testFn) {
            q._tasks.remove(testFn);
        },
        process: function () {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
                var tasks = [],
                    data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    q.empty();
                }

                if (numRunning === q.concurrency) {
                    q.saturated();
                }

                var cb = (0, _onlyOnce2.default)(_next(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length: function () {
            return q._tasks.length;
        },
        running: function () {
            return numRunning;
        },
        workersList: function () {
            return workersList;
        },
        idle: function () {
            return q._tasks.length + numRunning === 0;
        },
        pause: function () {
            q.paused = true;
        },
        resume: function () {
            if (q.paused === false) {
                return;
            }
            q.paused = false;
            (0, _setImmediate2.default)(q.process);
        }
    };
    return q;
}
module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(33),
    baseIsNaN = __webpack_require__(34),
    strictIndexOf = __webpack_require__(35);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

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

module.exports = isArray;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = DLL;
// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
function DLL() {
    this.head = this.tail = null;
    this.length = 0;
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

DLL.prototype.removeLink = function (node) {
    if (node.prev) node.prev.next = node.next;else this.head = node.next;
    if (node.next) node.next.prev = node.prev;else this.tail = node.prev;

    node.prev = node.next = null;
    this.length -= 1;
    return node;
};

DLL.prototype.empty = function () {
    while (this.head) this.shift();
    return this;
};

DLL.prototype.insertAfter = function (node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next) node.next.prev = newNode;else this.tail = newNode;
    node.next = newNode;
    this.length += 1;
};

DLL.prototype.insertBefore = function (node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) node.prev.next = newNode;else this.head = newNode;
    node.prev = newNode;
    this.length += 1;
};

DLL.prototype.unshift = function (node) {
    if (this.head) this.insertBefore(this.head, node);else setInitial(this, node);
};

DLL.prototype.push = function (node) {
    if (this.tail) this.insertAfter(this.tail, node);else setInitial(this, node);
};

DLL.prototype.shift = function () {
    return this.head && this.removeLink(this.head);
};

DLL.prototype.pop = function () {
    return this.tail && this.removeLink(this.tail);
};

DLL.prototype.toArray = function () {
    var arr = Array(this.length);
    var curr = this.head;
    for (var idx = 0; idx < this.length; idx++) {
        arr[idx] = curr.data;
        curr = curr.next;
    }
    return arr;
};

DLL.prototype.remove = function (testFn) {
    var curr = this.head;
    while (!!curr) {
        var next = curr.next;
        if (testFn(curr)) {
            this.removeLink(curr);
        }
        curr = next;
    }
    return this;
};
module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = asyncify;

var _isObject = __webpack_require__(41);

var _isObject2 = _interopRequireDefault(_isObject);

var _initialParams = __webpack_require__(42);

var _initialParams2 = _interopRequireDefault(_initialParams);

var _setImmediate = __webpack_require__(21);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    return (0, _initialParams2.default)(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if ((0, _isObject2.default)(result) && typeof result.then === 'function') {
            result.then(function (value) {
                invokeCallback(callback, null, value);
            }, function (err) {
                invokeCallback(callback, err.message ? err : new Error(err));
            });
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        (0, _setImmediate2.default)(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
}
module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports) {

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

module.exports = isObject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (fn) {
    return function () /*...args, callback*/{
        var args = (0, _slice2.default)(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};

var _slice = __webpack_require__(22);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(25);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(46);
var util = __webpack_require__(0);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(25);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(3);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(47);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {"_args":[["bce-sdk-js@0.2.7","/Users/mudio/Desktop/client/bce-service-bos-transport"]],"_development":true,"_from":"bce-sdk-js@0.2.7","_id":"bce-sdk-js@0.2.7","_inBundle":false,"_integrity":"sha1-mICM4DH9iCkDihx8IK0xfAKk+PM=","_location":"/bce-sdk-js","_phantomChildren":{"ms":"2.0.0"},"_requested":{"type":"version","registry":true,"raw":"bce-sdk-js@0.2.7","name":"bce-sdk-js","escapedName":"bce-sdk-js","rawSpec":"0.2.7","saveSpec":null,"fetchSpec":"0.2.7"},"_requiredBy":["#DEV:/"],"_resolved":"https://registry.npmjs.org/bce-sdk-js/-/bce-sdk-js-0.2.7.tgz","_spec":"0.2.7","_where":"/Users/mudio/Desktop/client/bce-service-bos-transport","author":{"name":"leeight@gmail.com"},"bugs":{"url":"https://github.com/baidubce/bce-sdk-js/issues"},"dependencies":{"async":"^1.5.2","debug":"^2.2.0","q":"^1.1.2","underscore":"^1.7.0"},"description":"Baidu Cloud Engine JavaScript SDK","devDependencies":{"browserify":"10.2.6","coveralls":"^2.11.8","expect.js":"^0.3.1","istanbul":"^0.4.2","mocha":"^2.4.5"},"directories":{"test":"test"},"homepage":"https://github.com/baidubce/bce-sdk-js#readme","license":"MIT","main":"index.js","name":"bce-sdk-js","repository":{"type":"git","url":"git+https://github.com/baidubce/bce-sdk-js.git"},"scripts":{"fecs":"fecs src","pack":"browserify -s baidubce.sdk index.js -o baidubce-sdk.bundle.js && uglifyjs baidubce-sdk.bundle.js --compress --mangle -o baidubce-sdk.bundle.min.js","test":"./test/run-all.sh"},"version":"0.2.7"}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/config.js
 * @author leeight
 */

/* eslint-env node */

exports.DEFAULT_SERVICE_DOMAIN = 'baidubce.com';

exports.DEFAULT_CONFIG = {
    protocol: 'http',
    region: 'bj'
};












/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/wm_stream.js
 * @author leeight
 */

/* eslint-env node */

var stream = __webpack_require__(13);
var util = __webpack_require__(0);

/**
 * Writable memory stream, which can be
 * used a http_client output stream.
 *
 * @constructor
 */
function WMStream() {
    stream.Writable.call(this);

    this.store = new Buffer('');
}
util.inherits(WMStream, stream.Writable);

WMStream.prototype._write = function (chunk, enc, cb) {
    var buffer = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, enc);
    this.store = Buffer.concat([this.store, buffer]);

    cb();
};

module.exports = WMStream;



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/multipart.js
 * @author leeight
 */

var util = __webpack_require__(0);

var u = __webpack_require__(1);

/**
 * Multipart Encoder
 *
 * @param {string} boundary The multipart boundary.
 * @constructor
 */
function Multipart(boundary) {
    this._boundary = boundary;

    /**
     * @type {Array.<Buffer>}
     */
    this._parts = [];
}

/**
 * Add a part
 *
 * @param {string} name The part name.
 * @param {string|Buffer} data The part data.
 */
Multipart.prototype.addPart = function (name, data) {
    var part = [];

    var header = util.format(
        '--%s\r\nContent-Disposition: form-data; name="%s"%s\r\n\r\n',
        this._boundary, name, '');
    part.push(new Buffer(header));

    if (Buffer.isBuffer(data)) {
        part.push(data);
        part.push(new Buffer('\r\n'));
    }
    else if (u.isString(data)) {
        part.push(new Buffer(data + '\r\n'));
    }
    else {
        throw new Error('Invalid data type.');
    }

    this._parts.push(Buffer.concat(part));
};

Multipart.prototype.encode = function () {
    return Buffer.concat(
        [
            Buffer.concat(this._parts),
            new Buffer(util.format('--%s--', this._boundary))
        ]
    );
};

module.exports = Multipart;












/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/bcs_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var crypto = __webpack_require__(15);
var util = __webpack_require__(0);
var path = __webpack_require__(7);
var fs = __webpack_require__(3);

var u = __webpack_require__(1);

var H = __webpack_require__(6);
var HttpClient = __webpack_require__(8);
var BceBaseClient = __webpack_require__(2);
var MimeType = __webpack_require__(18);

var MAX_PUT_OBJECT_LENGTH = 5368709120;     // 5G
var MAX_USER_METADATA_SIZE = 2048;          // 2 * 1024
// var MIN_PART_NUMBER = 1;
// var MAX_PART_NUMBER = 10000;


/**
 * BCS service api
 *
 * @see http://developer.baidu.com/wiki/index.php?title=docs/cplat/bcs/api
 * @constructor
 * @param {Object} config The bos client configuration.
 * @extends {BceBaseClient}
 */
function BcsClient(config) {
    BceBaseClient.call(this, config, 'bcs', true);
}
util.inherits(BcsClient, BceBaseClient);

// --- BEGIN ---

BcsClient.prototype.listBuckets = function (options) {
    options = options || {};
    return this.sendRequest('GET', {config: options.config});
};

BcsClient.prototype.createBucket = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('PUT', {
        bucketName: bucketName,
        config: options.config
    });
};

BcsClient.prototype.setBucketAcl = function (bucketName, acl, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_TYPE] = 'application/json; charset=UTF-8';
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        body: JSON.stringify({accessControlList: acl}),
        headers: headers,
        params: {acl: ''},
        config: options.config
    });
};

BcsClient.prototype.setBucketCannedAcl = function (bucketName, cannedAcl, options) {
    options = options || {};

    var headers = {};
    headers[H.X_BCE_ACL] = cannedAcl;
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        headers: headers,
        params: {acl: ''},
        config: options.config
    });
};

BcsClient.prototype.getBucketAcl = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: {acl: '1'},
        config: options.config
    });
};

BcsClient.prototype.deleteBucket = function (bucketName, options) {
    options = options || {};

    return this.sendRequest('DELETE', {
        bucketName: bucketName,
        config: options.config
    });
};

BcsClient.prototype.deleteObject = function (bucketName, key, options) {
    options = options || {};

    return this.sendRequest('DELETE', {
        bucketName: bucketName,
        key: key,
        config: options.config
    });
};

BcsClient.prototype.listObjects = function (bucketName, options) {
    options = options || {};

    var params = u.extend({}, u.pick(options, 'start', 'limit'));

    return this.sendRequest('GET', {
        bucketName: bucketName,
        params: params,
        config: options.config
    });
};

BcsClient.prototype.getObjectMetadata = function (bucketName, key, options) {
    options = options || {};

    return this.sendRequest('HEAD', {
        bucketName: bucketName,
        key: key,
        config: options.config
    });
};

BcsClient.prototype.putObject = function (bucketName, key, data, options) {
    if (!key) {
        throw new TypeError('key should not be empty.');
    }

    options = this._checkOptions(options || {});

    return this.sendRequest('PUT', {
        bucketName: bucketName,
        key: key,
        body: data,
        headers: options.headers,
        config: options.config
    });
};

BcsClient.prototype.putObjectFromBlob = function (bucketName, key, blob, options) {
    var headers = {};

    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/size
    headers[H.CONTENT_LENGTH] = blob.size;
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // 而且根据 API 文档，这个字段不是必填的。
    options = u.extend(headers, options);

    return this.putObject(bucketName, key, blob, options);
};


BcsClient.prototype.putObjectFromString = function (bucketName, key, data, options) {
    var headers = {};
    headers[H.CONTENT_LENGTH] = Buffer.byteLength(data);
    headers[H.CONTENT_MD5] = __webpack_require__(10).md5sum(data, null, 'hex');
    options = u.extend(headers, options);

    return this.putObject(bucketName, key, data, options);
};

BcsClient.prototype.putObjectFromFile = function (bucketName, key, filename, options) {
    options = options || {};

    var headers = {};
    headers[H.CONTENT_LENGTH] = fs.statSync(filename).size;

    // 因为Firefox会在发起请求的时候自动给 Content-Type 添加 charset 属性
    // 导致我们计算签名的时候使用的 Content-Type 值跟服务器收到的不一样，为了
    // 解决这个问题，我们需要显式的声明Charset
    headers[H.CONTENT_TYPE] = options[H.CONTENT_TYPE] || MimeType.guess(path.extname(filename));
    options = u.extend(headers, options);

    var fp = fs.createReadStream(filename);
    if (!u.has(options, H.CONTENT_MD5)) {
        var me = this;
        return __webpack_require__(10).md5file(filename, 'hex')
            .then(function (md5sum) {
                options[H.CONTENT_MD5] = md5sum;
                return me.putObject(bucketName, key, fp, options);
            });
    }
    return this.putObject(bucketName, key, fp, options);
};

/**
 * 只返回MBO的签名（Method, Bucket Name, Object Name），对于上传的应用足够了.
 *
 * @see http://developer.baidu.com/wiki/index.php?title=docs/cplat/bcs/access/signed-url
 * @param {Object} credentials ak和sk信息.
 * @param {string} httpMethod The request method.
 * @param {string} bucketName The bucket name.
 * @param {string} objectName The object name.
 *
 * @return {string} The signature.
 */
BcsClient.prototype.createSignature = function (credentials, httpMethod, bucketName, objectName) {
    var flag = 'MBO';
    var body = [
        'Method=' + httpMethod,
        'Bucket=' + bucketName,
        'Object=' + objectName
    ].join('\n');

    var content = flag + '\n' + body + '\n';

    var hmac = crypto.createHmac('sha1', credentials.sk);
    hmac.update(new Buffer(content, 'utf-8'));
    var digest = encodeURIComponent(hmac.digest('base64')).replace(/%2F/g, '/');

    return [flag, credentials.ak, digest].join(':');
};

// --- E N D ---

BcsClient.prototype.sendRequest = function (httpMethod, varArgs) {
    var defaultArgs = {
        bucketName: null,
        key: null,
        body: null,
        headers: {},
        params: {},
        config: {},
        outputStream: null
    };
    var args = u.extend(defaultArgs, varArgs);

    var config = u.extend({}, this.config, args.config);
    var resource = '/';
    if (args.bucketName) {
        resource += args.bucketName;
    }
    if (args.key) {
        resource += '/' + args.key;
    }

    var signature = this.createSignature(config.credentials,
        httpMethod,
        args.bucketName ? args.bucketName : '',
        args.key ? ('/' + args.key) : '/');

    var client = this;
    var agent = this._httpAgent = new HttpClient(config);
    u.each(['progress', 'error', 'abort'], function (eventName) {
        agent.on(eventName, function (evt) {
            client.emit(eventName, evt);
        });
    });

    agent.buildQueryString = function (params) {
        var qs = __webpack_require__(17).stringify(params);
        if (qs) {
            return 'sign=' + signature + '&' + qs;
        }

        // signature的值不应该被 encodeURIComponent
        return 'sign=' + signature;
    };

    return agent.sendRequest(httpMethod, resource, args.body,
        args.headers, args.params, null, args.outputStream);
};


BcsClient.prototype._checkOptions = function (options, allowedParams) {
    var rv = {};

    rv.config = options.config || {};
    rv.headers = this._prepareObjectHeaders(options);
    rv.params = u.pick(options, allowedParams || []);

    return rv;
};

BcsClient.prototype._prepareObjectHeaders = function (options) {
    var allowedHeaders = [
        H.CONTENT_LENGTH,
        H.CONTENT_ENCODING,
        H.CONTENT_MD5,
        H.CONTENT_TYPE,
        H.CONTENT_DISPOSITION,
        H.ETAG,
        H.SESSION_TOKEN
    ];
    var metaSize = 0;
    var headers = u.pick(options, function (value, key) {
        if (allowedHeaders.indexOf(key) !== -1) {
            return true;
        }
        else if (/^x\-bce\-meta\-/.test(key)) {
            metaSize += Buffer.byteLength(key) + Buffer.byteLength('' + value);
            return true;
        }
    });

    if (metaSize > MAX_USER_METADATA_SIZE) {
        throw new TypeError('Metadata size should not be greater than ' + MAX_USER_METADATA_SIZE + '.');
    }

    if (u.has(headers, H.CONTENT_LENGTH)) {
        var contentLength = headers[H.CONTENT_LENGTH];
        if (contentLength < 0) {
            throw new TypeError('content_length should not be negative.');
        }
        else if (contentLength > MAX_PUT_OBJECT_LENGTH) { // 5G
            throw new TypeError('Object length should be less than ' + MAX_PUT_OBJECT_LENGTH
                + '. Use multi-part upload instead.');
        }
    }

    if (u.has(headers, 'ETag')) {
        var etag = headers.ETag;
        if (!/^"/.test(etag)) {
            headers.ETag = util.format('"%s"', etag);
        }
    }

    if (!u.has(headers, H.CONTENT_TYPE)) {
        headers[H.CONTENT_TYPE] = 'application/octet-stream';
    }

    return headers;
};


module.exports = BcsClient;




/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/bcc_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint fecs-camelcase:[2,{"ignore":["/opt_/"]}] */

var util = __webpack_require__(0);

var u = __webpack_require__(1);
var debug = __webpack_require__(5)('bce-sdk:BccClient');

var BceBaseClient = __webpack_require__(2);


/**
 * BCC service api
 *
 * 内网API地址：http://api.bcc.bce-sandbox.baidu.com
 * 沙盒API地址：http://bcc.bce-api.baidu.com
 *
 * @see http://gollum.baidu.com/BceDocumentation/BccOpenAPI#简介
 *
 * @constructor
 * @param {Object} config The bcc client configuration.
 * @extends {BceBaseClient}
 */
function BccClient(config) {
    BceBaseClient.call(this, config, 'bcc', true);
}
util.inherits(BccClient, BceBaseClient);

// --- BEGIN ---

BccClient.prototype.listInstances = function (opt_options) {
    var options = opt_options || {};
    var params = u.extend(
        {maxKeys: 1000},
        u.pick(options, 'maxKeys', 'marker')
    );

    return this.sendRequest('GET', '/v1/instance', {
        params: params,
        config: options.config
    });
};

function abstractMethod() {
    throw new Error('unimplemented method');
}

// GET /instance/price
BccClient.prototype.getPackages = function (opt_options) {
    var options = opt_options || {};

    return this.sendRequest('GET', '/v1/instance/price', {
        config: options.config
    });
};

// GET /image?marker={marker}&maxKeys={maxKeys}&imageType={imageType}
BccClient.prototype.getImages = function (opt_options) {
    var options = opt_options || {};

    // imageType => All, System, Custom, Integration
    var params = u.extend(
        {maxKeys: 1000, imageType: 'All'},
        u.pick(options, 'maxKeys', 'marker', 'imageType')
    );

    return this.sendRequest('GET', '/v1/image', {
        config: options.config,
        params: params
    });
};

// POST /instance
BccClient.prototype.createInstance = function (body, opt_options) {
    var me = this;
    return this.getClientToken().then(function (response) {
        var options = opt_options || {};

        var clientToken = response.body.token;
        var params = {
            clientToken: clientToken
        };

        /**
        var body = {
            // MICRO,SMALL,MEDIUM,LARGE,XLARGE,XXLARGE
            instanceType: string,
            imageId: string,
            ?localDiskSizeInGB: int,
            ?createCdsList: List<CreateCdsModel>,
            ?networkCapacityInMbps: int,
            ?purchaseCount: int,
            ?name: string,
            ?adminPass: string,
            ?networkType: string,
            ?noahNode: string
        };
        */

        debug('createInstance, params = %j, body = %j', params, body);

        return me.sendRequest('POST', '/v1/instance', {
            config: options.config,
            params: params,
            body: JSON.stringify(body)
        });
    });
};

// GET /instance/{instanceId}
BccClient.prototype.getInstance = function (id, opt_options) {
    var options = opt_options || {};

    return this.sendRequest('GET', '/v1/instance/' + id, {
        config: options.config
    });
};

// PUT /instance/{instanceId}?action=start
BccClient.prototype.startInstance = function (id, opt_options) {
    var options = opt_options || {};
    var params = {
        start: ''
    };

    return this.sendRequest('PUT', '/v1/instance/' + id, {
        params: params,
        config: options.config
    });
};

// PUT /instance/{instanceId}?action=stop
BccClient.prototype.stopInstance = function (id, opt_options) {
    var options = opt_options || {};
    var params = {
        stop: ''
    };

    return this.sendRequest('PUT', '/v1/instance/' + id, {
        params: params,
        config: options.config
    });
};

// PUT /instance/{instanceId}?action=reboot
BccClient.prototype.restartInstance = function (id, opt_options) {
    var options = opt_options || {};
    var params = {
        reboot: ''
    };

    return this.sendRequest('PUT', '/v1/instance/' + id, {
        params: params,
        config: options.config
    });
};

// PUT /instance/{instanceId}?action=changePass
BccClient.prototype.changeInstanceAdminPassword = abstractMethod;

// PUT /instance/{instanceId}?action=rebuild
BccClient.prototype.rebuildInstance = abstractMethod;

// DELETE /instance/{instanceId}
BccClient.prototype.deleteInstance = function (id, opt_options) {
    var options = opt_options || {};

    return this.sendRequest('DELETE', '/v1/instance/' + id, {
        config: options.config
    });
};

// PUT /instance/{instanceId}/securityGroup/{securityGroupId}?action=bind
BccClient.prototype.joinSecurityGroup = abstractMethod;

// PUT /instance/{instanceId}/securityGroup/{securityGroupId}?action=unbind
BccClient.prototype.leaveSecurityGroup = abstractMethod;

// GET /instance/{instanceId}/vnc
BccClient.prototype.getVNCUrl = function (id, opt_options) {
    var options = opt_options || {};

    return this.sendRequest('GET', '/v1/instance/' + id + '/vnc', {
        config: options.config
    });
};

BccClient.prototype.getClientToken = function (opt_options) {
    return this.sendRequest('POST', '/v1/token/create');
};

// --- E N D ---

BccClient.prototype._generateClientToken = function () {
    var clientToken = Date.now().toString(16) + (Number.MAX_VALUE * Math.random()).toString(16).substr(0, 8);
    return 'ClientToken:' + clientToken;
};



module.exports = BccClient;




/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/ses_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
var fs = __webpack_require__(3);
var path = __webpack_require__(7);
var util = __webpack_require__(0);

var BceBaseClient = __webpack_require__(2);

/**
 * SES service api
 *
 * @constructor
 * @param {Object} config The bos client configuration.
 * @extends {BceBaseClient}
 */
function SesClient(config) {
    BceBaseClient.call(this, config, 'ses', true);
}
util.inherits(SesClient, BceBaseClient);

// --- B E G I N ---
SesClient.prototype.addVerifiedEmail = function (email) {
    var url = '/v1/verifiedEmail/' + encodeURIComponent(email);
    return this.sendRequest('PUT', url);
};

SesClient.prototype.getAllVerifiedEmails = function () {
    var url = '/v1/verifiedEmail';
    return this.sendRequest('GET', url);
};

SesClient.prototype.getVerifiedEmail = function (email) {
    var url = '/v1/verifiedEmail/' + encodeURIComponent(email);
    return this.sendRequest('GET', url);
};

SesClient.prototype.deleteVerifiedEmail = function (email) {
    var url = '/v1/verifiedEmail/' + encodeURIComponent(email);
    return this.sendRequest('DELETE', url);
};

SesClient.prototype.getQuota = function () {
    var url = '/v1/quota';
    return this.sendRequest('GET', url);
};

SesClient.prototype.setQuota = function (quota) {
    var url = '/v1/quota';
    Object.keys(quota).forEach(function (key) {
        var value = quota[key];
        // 如果是 number，传递到后端会出错的
        quota[key] = value.toString();
    });

    return this.sendRequest('PUT', url, {
        body: JSON.stringify(quota)
    });
};

SesClient.prototype.sendMail = function (mailOptions) {
    var from = mailOptions.from || '';

    var to = mailOptions.to || [];
    if (typeof to === 'string') {
        to = [to];
    }

    var cc = mailOptions.cc || [];
    if (typeof cc === 'string') {
        cc = [cc];
    }

    var bcc = mailOptions.bcc || [];
    if (typeof bcc === 'string') {
        bcc = [bcc];
    }

    var subject = mailOptions.subject;
    var text = mailOptions.text || '';
    var html = mailOptions.html || '';
    var attachments = mailOptions.attachments || [];

    attachments = attachments.map(function (item) {
        if (typeof item === 'string') {
            return {
                /* eslint-disable */
                file_name: path.basename(item),
                file_data: {
                    data: fs.readFileSync(item).toString('base64')
                }
                /* eslint-enable */
            };
        }

        return item;
    });

    var url = '/v1/email';
    var body = JSON.stringify({
        mail: {
            source: {
                from: from
            },
            destination: {
                /* eslint-disable */
                to_addr: to.map(function (item) {
                    return {
                        addr: item
                    };
                }),
                cc_addr: cc.map(function (item) {
                    return {
                        addr: item
                    };
                }),
                bcc_addr: bcc.map(function (item) {
                    return {
                        addr: item
                    };
                })
                /* eslint-enable */
            },
            subject: {
                charset: 1,
                data: subject
            },
            priority: 1,
            message: {
                text: {
                    charset: 1,
                    data: text
                },
                html: {
                    charset: 1,
                    data: html
                }
            },
            attachments: attachments
        }
    });

    return this.sendRequest('POST', url, {body: body});
};

// --- E   N   D ---

module.exports = SesClient;







/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/qns_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);

var u = __webpack_require__(1);

var BceBaseClient = __webpack_require__(2);

/**
 * QNS service api
 *
 * @constructor
 * @param {Object} config The bos client configuration.
 * @param {string} account The topic account.
 * @param {string} name The topic name.
 * @extends {BceBaseClient}
 */
function Topic(config, account, name) {
    BceBaseClient.call(this, config, 'qns', true);

    /**
     * The topic accunt.
     *
     * @private
     * @type {string}
     */
    this._account = account;

    /**
     * The topic name.
     *
     * @private
     * @type {string}
     */
    this._name = name;
}
util.inherits(Topic, BceBaseClient);

// --- B E G I N ---

Topic.prototype._buildUrl = function () {
    var url = '/v1/' + this._account + '/topic/' + this._name;
    return url;
};

Topic.prototype.create = function (options) {
    options = options || {};

    var params = u.pick(options, 'delayInSeconds',
        'maximumMessageSizeInBytes', 'messageRetentionPeriodInSeconds');

    return this.sendRequest('PUT', this._buildUrl(), {
        body: JSON.stringify(params)
    });
};

Topic.prototype.remove = function () {
    return this.sendRequest('DELETE', this._buildUrl());
};

Topic.prototype.get = function () {
    return this.sendRequest('GET', this._buildUrl());
};

Topic.prototype.update = function (options) {
    options = options || {};

    var params = u.pick(options, 'delayInSeconds',
        'maximumMessageSizeInBytes', 'messageRetentionPeriodInSeconds');

    return this.sendRequest('PUT', this._buildUrl(), {
        headers: {
            'If-Match': '*'
        },
        body: JSON.stringify(params)
    });
};

/**
 * 发送消息到topic中去，单个请求不超过256KB。单次发送的消息个数不超过1000。
 *
 * @param {Array.<string|Object>} messages 需要发送的消息内容，可能是多个.
 * @return {Q.Promise}
 */
Topic.prototype.sendMessages = function (messages) {
    var url = this._buildUrl() + '/message';

    messages = u.map(messages, function (item) {
        if (u.isString(item)) {
            return {
                messageBody: item
            };
        }
        // {
        //   messageBody: string,
        //   // 0 - 3600
        //   delayInSeconds: number
        // }
        return item;
    });

    return this.sendRequest('POST', url, {
        body: JSON.stringify({messages: messages})
    });
};

Topic.prototype.list = function (options) {
    options = options || {};

    var params = u.pick(options, 'marker', 'maxRecords');

    var url = '/v1/' + this._account + '/topic';
    return this.sendRequest('GET', url, {
        params: params
    });
};

Topic.prototype.createSubscription = function (subscriptionName, options) {
    options = options || {};

    var s = new Subscription(this.config, this._account, subscriptionName);

    if (options.topic == null) {
        options.topic = this._name;
    }

    return s.create(options);
};

// --- E   N   D ---

/**
 * QNS service api
 *
 * @constructor
 * @param {Object} config The bos client configuration.
 * @param {string} account The subscription account.
 * @param {string} name The subscription name.
 * @extends {BceBaseClient}
 */
function Subscription(config, account, name) {
    BceBaseClient.call(this, config, 'qns', true);

    /**
     * The topic accunt.
     *
     * @private
     * @type {string}
     */
    this._account = account;

    /**
     * The topic name.
     *
     * @private
     * @type {string}
     */
    this._name = name;

}
util.inherits(Subscription, BceBaseClient);

// --- B E G I N ---

Subscription.prototype._buildUrl = function () {
    var url = '/v1/' + this._account + '/subscription/' + this._name;
    return url;
};

Subscription.prototype.create = function (options) {
    options = options || {};

    var params = u.pick(options,
        // 1 - 20 (0)
        'receiveMessageWaitTimeInSeconds',
        'topic',
        // 1 - 43200 (30)
        'visibilityTimeoutInSeconds',
        'pushConfig'
    );

    return this.sendRequest('PUT', this._buildUrl(), {
        body: JSON.stringify(params)
    });
};

Subscription.prototype.remove = function () {
    return this.sendRequest('DELETE', this._buildUrl());
};

Subscription.prototype.get = function () {
    return this.sendRequest('GET', this._buildUrl());
};

Subscription.prototype.update = function (options) {
    options = options || {};

    var params = u.pick(options,
        'receiveMessageWaitTimeInSeconds',
        'visibilityTimeoutInSeconds'
    );

    return this.sendRequest('PUT', this._buildUrl(), {
        headers: {
            'If-Match': '*'
        },
        body: JSON.stringify(params)
    });
};

Subscription.prototype.receiveMessages = function (options) {
    options = options || {};

    var params = u.pick(options,
        'waitInSeconds',
        'maxMessages',
        'peek'
    );

    var url = this._buildUrl() + '/message';
    // FIXME 居然 GET 请求需要带着 Request Body，这奇怪！！！
    return this.sendRequest('GET', url, {
        body: JSON.stringify(params)
    });
};

Subscription.prototype.deleteMessage = function (handle) {
    var url = this._buildUrl() + '/message';
    return this.sendRequest('DELETE', url, {
        params: {
            receiptHandle: handle
        }
    });
};

Subscription.prototype.changeVisibility = function (handle, seconds) {
    var url = this._buildUrl() + '/message';
    return this.sendRequest('PUT', url, {
        params: {
            receiptHandle: handle,
            visibilityTimeoutInSeconds: seconds
        }
    });
};

Subscription.prototype.list = function (options) {
    options = options || {};

    var params = u.pick(options, 'marker', 'maxRecords');

    var url = '/v1/' + this._account + '/subscription';
    return this.sendRequest('GET', url, {
        params: params
    });
};

// --- E   N   D ---

exports.Topic = Topic;
exports.Subscription = Subscription;












/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/lss_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint fecs-camelcase:[2,{"ignore":["/opt_/"]}] */

var util = __webpack_require__(0);

var Q = __webpack_require__(4);
// var debug = require('debug')('bce-sdk:LssClient');

var BceBaseClient = __webpack_require__(2);

/**
 * 直播模板
 * http://bce.baidu.com/doc/LSS/API.html#.9E.2A.60.EA.11.C8.DD.82.F7.A6.B1.71.BC.C3.B7.68
 *
 * @constructor
 * @param {Object} config The lss client configuration.
 * @extends {BceBaseClient}
 */
function Preset(config) {
    BceBaseClient.call(this, config, 'lss', true);

    this._name = null;
}
util.inherits(Preset, BceBaseClient);

// --- B E G I N ---

Preset.prototype._buildUrl = function (name) {
    var url = '/v3/live/preset';
    return url + (name ? '/' + name : '');
};

Preset.prototype.setName = function (name) {
    this._name = name;
    return this;
};

Preset.prototype.create = function (options) {
    var self = this;

    var url = self._buildUrl(false);
    return self.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self.setName(options.presetName);
        return response;
    });
};

Preset.prototype.remove = function (name) {
    var url = this._buildUrl(name || this._name);
    return this.sendRequest('DELETE', url);
};

Preset.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = response.body.presets
            .filter(function (item) {
                // bce.~~ | lss.~~
                return !/^(bce|lss)\./.test(item.presetName);
            })
            .map(function (item) {
                return self.remove(item.presetName);
            });
        return Q.all(asyncTasks);
    });
};

Preset.prototype.get = function (name) {
    var url = this._buildUrl(name || this._name);
    return this.sendRequest('GET', url);
};

Preset.prototype.list = function () {
    var url = this._buildUrl();
    return this.sendRequest('GET', url);
};

// --- E   N   D ---

/**
 * 直播会话接口（Live Session API）
 * http://bce.baidu.com/doc/LSS/API.html#.23.14.D5.44.EE.00.30.BA.DB.38.4B.3D.1E.12.15.C3
 *
 * @constructor
 * @param {Object} config The lss client configuration.
 * @extends {BceBaseClient}
 */
function Session(config) {
    BceBaseClient.call(this, config, 'lss', true);

    /**
     * The session id.
     *
     * @private
     * @type {string}
     */
    this._sessionId = null;
}
util.inherits(Session, BceBaseClient);

// --- B E G I N ---

Session.prototype._buildUrl = function (sessionId) {
    var url = '/v3/live/session';
    return url + (sessionId ? '/' + sessionId : '');
};

/**
 * 设置当前 Session 的 Id.
 *
 * @param {string} sessionId The session id.
 * @return {Session}
 */
Session.prototype.setSessionId = function (sessionId) {
    this._sessionId = sessionId;
    return this;
};

Session.prototype.create = function (options) {
    var self = this;

    var url = self._buildUrl(false);
    return self.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        var session = response.body;
        self.setSessionId(session.sessionId);
        return response;
    });
};

Session.prototype.remove = function (sessionId) {
    var url = this._buildUrl(sessionId || this._sessionId);
    return this.sendRequest('DELETE', url);
};

Session.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = response.body.liveInfos.map(function (item) {
            return self.remove(item.sessionId);
        });
        return Q.all(asyncTasks);
    });
};

Session.prototype.get = function (sessionId) {
    var url = this._buildUrl(sessionId || this._sessionId);
    return this.sendRequest('GET', url);
};

Session.prototype.list = function () {
    var url = this._buildUrl();
    return this.sendRequest('GET', url);
};

Session.prototype.pause = function (sessionId) {
    var url = this._buildUrl(sessionId || this._sessionId);
    return this.sendRequest('PUT', url, {
        params: {stop: ''}
    });
};

Session.prototype.resume = function (sessionId) {
    var url = this._buildUrl(sessionId || this._sessionId);
    return this.sendRequest('PUT', url, {
        params: {resume: ''}
    });
};

Session.prototype.refresh = function (sessionId) {
    var url = this._buildUrl(sessionId || this._sessionId);
    return this.sendRequest('PUT', url, {
        params: {refresh: ''}
    });
};

// --- E   N   D ---

/**
 * 直播通知接口（Live Notification API）
 * http://bce.baidu.com/doc/LSS/API.html#.72.90.9D.94.D6.1A.76.02.A5.A9.63.B2.32.A8.E7.2C
 *
 * @constructor
 * @param {Object} config The lss client configuration.
 * @extends {BceBaseClient}
 */
function Notification(config) {
    BceBaseClient.call(this, config, 'lss', true);

    this._name = null;
    this._endpoint = null;
}
util.inherits(Notification, BceBaseClient);

// --- B E G I N ---

Notification.prototype._buildUrl = function (name) {
    var url = '/v3/live/notification';
    return url + (name ? '/' + name : '');
};

Notification.prototype.create = function (name, endpoint) {
    var url = this._buildUrl();

    var data = {
        name: name,
        endpoint: endpoint
    };

    var self = this;
    return this.sendRequest('POST', url, {
        body: JSON.stringify(data)
    }).then(function (response) {
        self._name = name;
        self._endpoint = endpoint;
        return response;
    });
};

Notification.prototype.get = function (opt_name) {
    var name = opt_name || this._name;
    if (!name) {
        throw new TypeError('name is required');
    }

    var url = this._buildUrl(name);
    return this.sendRequest('GET', url);
};

Notification.prototype.remove = function (opt_name) {
    var name = opt_name || this._name;
    if (!name) {
        throw new TypeError('name is required');
    }

    var url = this._buildUrl(name);
    return this.sendRequest('DELETE', url);
};

Notification.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = (response.body.notifications || []).map(function (item) {
            return self.remove(item.name);
        });
        return Q.all(asyncTasks);
    });
};

Notification.prototype.list = function () {
    var url = this._buildUrl();
    return this.sendRequest('GET', url);
};

// --- E   N   D ---

exports.Preset = Preset;
exports.Session = Session;
exports.Notification = Notification;







/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/mct_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint fecs-camelcase:[2,{"ignore":["/opt_/"]}] */

var util = __webpack_require__(0);

var Q = __webpack_require__(4);

var BceBaseClient = __webpack_require__(2);

/**
 * 水印接口（Watermark API）
 * http://bce.baidu.com/doc/MCT/API.html#.81.CC.4F.30.2C.F7.78.0E.AA.53.8E.85.5D.E2.77.BE
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function Watermark(config) {
    BceBaseClient.call(this, config, 'media', true);

    this._id = null;
}
util.inherits(Watermark, BceBaseClient);

// --- B E G I N ---

Watermark.prototype._buildUrl = function (opt_id) {
    var url = '/v3/watermark';
    if (opt_id === false) {
        return url;
    }

    var id = opt_id || this._id;
    return url + (id ? '/' + id : '');
};

Watermark.prototype.setId = function (id) {
    this._id = id;
    return this;
};

Watermark.prototype.create = function (options) {
    var self = this;

    var url = self._buildUrl(false);
    return self.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self.setId(response.body.watermarkId);
        return response;
    });
};

Watermark.prototype.remove = function (id) {
    var url = this._buildUrl(id);
    return this.sendRequest('DELETE', url);
};

Watermark.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = response.body.watermarks
            .map(function (item) {
                return self.remove(item.watermarkId);
            });
        return Q.all(asyncTasks);
    });
};

Watermark.prototype.get = function (id) {
    var self = this;
    var url = self._buildUrl(id);
    return self.sendRequest('GET', url).then(function (response) {
        self.setId(response.body.watermarkId);
        return response;
    });
};

Watermark.prototype.list = function () {
    var url = this._buildUrl(false);
    return this.sendRequest('GET', url);
};

// --- E   N   D ---

/**
 * 媒体信息接口（MediaInfo API）
 * http://bce.baidu.com/doc/MCT/API.html#.D1.D4.44.23.BB.C5.88.34.9B.29.16.A6.4D.73.0A.96
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function MediaInfo(config) {
    BceBaseClient.call(this, config, 'media', true);
}
util.inherits(MediaInfo, BceBaseClient);

// --- B E G I N ---

MediaInfo.prototype.get = function (bucket, key) {
    var url = '/v3/mediainfo';
    return this.sendRequest('GET', url, {
        params: {
            bucket: bucket,
            key: key
        }
    });
};

// --- E   N   D ---

/**
 * 队列接口（Pipeline API）
 * http://bce.baidu.com/doc/MCT/API.html#.7B.58.EA.E5.54.22.16.F1.32.84.E4.C4.36.04.37.3A
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function Pipeline(config) {
    BceBaseClient.call(this, config, 'media', true);

    this._name = null;
}
util.inherits(Pipeline, BceBaseClient);

// --- B E G I N ---

Pipeline.prototype.setName = function (name) {
    this._name = name;
    return this;
};

Pipeline.prototype._buildUrl = function (opt_name) {
    var url = '/v3/pipeline';
    if (opt_name === false) {
        return url;
    }

    var key = opt_name || this._name;
    return url + (key ? '/' + key : '');
};

Pipeline.prototype.create = function (options) {
    var self = this;
    var url = self._buildUrl(false);

    return self.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self.setName(options.pipelineName);
        return response;
    });
};

Pipeline.prototype.get = function (name) {
    var self = this;
    var url = self._buildUrl(name);
    return self.sendRequest('GET', url).then(function (response) {
        self.setName(response.body.pipelineName);
        return response;
    });
};

Pipeline.prototype.list = function () {
    var url = this._buildUrl(false);
    return this.sendRequest('GET', url);
};

Pipeline.prototype.remove = function (name) {
    var url = this._buildUrl(name);
    return this.sendRequest('DELETE', url);
};

Pipeline.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = response.body.pipelines
            .filter(function (item) {
                // 有 running/pending 在运行的 Pipeline 无法删除
                var status = item.jobStatus;
                return (status.running + status.pending) <= 0;
            })
            .map(function (item) {
                return self.remove(item.pipelineName);
            });
        return Q.all(asyncTasks);
    });
};

Pipeline.prototype.addTranscodingJob = function (options) {
    var pipelineName = options.pipelineName || this._name;
    if (!pipelineName) {
        throw new Error('`pipelineName` is required.');
    }

    options.pipelineName = pipelineName;
    var job = new Transcoding(this.config);
    return job.create(options).then(function (response) {
        return job;
    });
};

Pipeline.prototype.addThumbnailJob = function (options) {
    var pipelineName = options.pipelineName || this._name;
    if (!pipelineName) {
        throw new Error('`pipelineName` is required.');
    }

    options.pipelineName = pipelineName;
    var job = new Thumbnail(this.config);
    return job.create(options).then(function (response) {
        return job;
    });
};

Pipeline.prototype.getTranscodingJobs = function (opt_name) {
    var name = opt_name || this._name;
    if (!name) {
        throw new Error('`pipelineName` is required.');
    }

    var transcoding = new Transcoding(this.config);
    return transcoding.list(name);
};

Pipeline.prototype.getThumbnailJobs = function (opt_name) {
    var name = opt_name || this._name;
    if (!name) {
        throw new Error('`pipelineName` is required');
    }

    var thumbnail = new Thumbnail(this.config);
    return thumbnail.list(name);
};

// --- E   N   D ---

/**
 * 模板接口（Preset API）
 * http://bce.baidu.com/doc/MCT/API.html#.AC.4A.44.2F.2C.0D.6D.25.0C.83.A0.AF.C6.32.E7.CA
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function Preset(config) {
    BceBaseClient.call(this, config, 'media', true);

    /**
     * The preset name
     * @type {string}
     * @private
     */
    this._name = null;
}
util.inherits(Preset, BceBaseClient);

// --- B E G I N ---

Preset.prototype._buildUrl = function (opt_name) {
    var url = '/v3/preset';
    if (opt_name === false) {
        return url;
    }

    var name = opt_name || this._name;
    return url + (name ? '/' + name : '');
};

Preset.prototype.setName = function (name) {
    this._name = name;
    return this;
};

Preset.prototype.create = function (options) {
    var self = this;
    var url = this._buildUrl(false);

    return this.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self.setName(options.presetName);
        return response;
    });
};

Preset.prototype.get = function (opt_name) {
    var self = this;
    var url = self._buildUrl(opt_name);
    return self.sendRequest('GET', url).then(function (response) {
        self.setName(response.body.presetName);
        return response;
    });
};

Preset.prototype.list = function () {
    var url = this._buildUrl(false);
    return this.sendRequest('GET', url);
};

Preset.prototype.remove = function (opt_name) {
    var url = this._buildUrl(opt_name);
    return this.sendRequest('DELETE', url);
};

Preset.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = response.body.presets
            .filter(function (item) {
                return !/^bce\./.test(item.presetName);
            })
            .map(function (item) {
                return self.remove(item.presetName);
            });
        return Q.all(asyncTasks);
    });
};

// --- E   N   D ---

/**
 * 缩略图任务接口（Job/Thumbnail API）
 * http://bce.baidu.com/doc/MCT/API.html#.45.7A.76.DC.88.FD.32.92.D4.46.EA.48.3A.66.F0.12
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function Thumbnail(config) {
    BceBaseClient.call(this, config, 'media', true);

    this._jobId = null;
}
util.inherits(Thumbnail, BceBaseClient);

// --- B E G I N ---
Thumbnail.prototype._buildUrl = function () {
    var url = '/v3/job/thumbnail';
    return url;
};

Thumbnail.prototype.create = function (options) {
    var self = this;
    var url = this._buildUrl();

    return this.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self._jobId = response.body.jobId;
        return response;
    });
};

Thumbnail.prototype.get = function (opt_jobId) {
    var jobId = opt_jobId || this._jobId;
    if (!jobId) {
        throw new Error('`jobId` is required');
    }

    var self = this;
    var url = this._buildUrl() + '/' + jobId;
    return this.sendRequest('GET', url).then(function (response) {
        self._jobId = jobId;
        return response;
    });
};

Thumbnail.prototype.list = function (name) {
    var url = this._buildUrl();
    return this.sendRequest('GET', url, {
        params: {
            pipelineName: name
        }
    });
};

// --- E   N   D ---

/**
 * 视频转码任务接口（Job/Transcoding API）
 * http://bce.baidu.com/doc/MCT/API.html#.1D.1E.B0.1E.6C.74.0C.6D.C1.68.D2.57.6F.70.EA.F1
 *
 * @constructor
 * @param {Object} config The mct client configuration.
 * @extends {BceBaseClient}
 */
function Transcoding(config) {
    BceBaseClient.call(this, config, 'media', true);

    this._jobId = null;
}
util.inherits(Transcoding, BceBaseClient);

// --- B E G I N ---

Transcoding.prototype._buildUrl = function () {
    var url = '/v3/job/transcoding';
    return url;
};

Transcoding.prototype.create = function (options) {
    var self = this;
    var url = self._buildUrl();

    return self.sendRequest('POST', url, {
        body: JSON.stringify(options)
    }).then(function (response) {
        self._jobId = response.body.jobId;
        return response;
    });
};

Transcoding.prototype.get = function (opt_jobId) {
    var jobId = opt_jobId || this._jobId;
    if (!jobId) {
        throw new Error('`jobId` is required');
    }

    var self = this;
    var url = self._buildUrl() + '/' + jobId;
    return self.sendRequest('GET', url).then(function (response) {
        self._jobId = jobId;
        return response;
    });
};

Transcoding.prototype.list = function (name) {
    var url = this._buildUrl();

    return this.sendRequest('GET', url, {
        params: {
            pipelineName: name
        }
    });
};

// --- E   N   D ---

exports.Watermark = Watermark;
exports.MediaInfo = MediaInfo;
exports.Transcoding = Transcoding;
exports.Thumbnail = Thumbnail;
exports.Pipeline = Pipeline;
exports.Preset = Preset;







/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/face_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);

var u = __webpack_require__(1);
var debug = __webpack_require__(5)('bce-sdk:FaceClient');

var BceBaseClient = __webpack_require__(2);


/**
 * 人脸识别API
 *
 * @see http://gollum.baidu.com/bcefaceapi
 * @constructor
 * @param {Object} config The face client configuration.
 * @extends {BceBaseClient}
 */
function FaceClient(config) {
    BceBaseClient.call(this, config, 'face', true);
}
util.inherits(FaceClient, BceBaseClient);

// --- BEGIN ---

FaceClient.prototype.createApp = function (options) {
    options = options || {};

    var url = '/v1/app';
    return this.sendRequest('POST', url, {
        config: options.config
    });
};

FaceClient.prototype.listApps = function (options) {
    options = options || {};

    var url = '/v1/app';
    return this.sendRequest('GET', url, {
        config: options.config
    });
};

FaceClient.prototype.createGroup = function (appId, groupName, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/group';
    return this.sendRequest('POST', url, {
        body: JSON.stringify({groupName: groupName}),
        config: options.config
    });
};

FaceClient.prototype.deleteGroup = function (appId, groupName, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/group/' + groupName;
    return this.sendRequest('DELETE', url, {
        config: options.config
    });
};

FaceClient.prototype.getGroup = function (appId, groupName, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/group/' + groupName;
    return this.sendRequest('GET', url, {
        config: options.config
    });
};

FaceClient.prototype.listGroups = function (appId, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/group';
    return this.sendRequest('GET', url, {
        config: options.config
    });
};

FaceClient.prototype.createPerson = function (appId, groupName, personName, faces, options) {
    options = options || {};

    faces = faces.map(function (item) {
        return {
            bosPath: item
        };
    });

    debug('Create Person Faces = %j', faces);

    var url = '/v1/app/' + appId + '/person';
    return this.sendRequest('POST', url, {
        body: JSON.stringify({
            personName: personName,
            groupName: groupName,
            faces: faces
        }),
        config: options.config
    });
};

FaceClient.prototype.deletePerson = function (appId, personName, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/person/' + personName;
    return this.sendRequest('DELETE', url, {
        config: options.config
    });
};

FaceClient.prototype.updatePerson = function (appId, personName, faces, options) {
    options = options || {};

    faces = faces.map(function (item) {
        return {
            bosPath: item
        };
    });

    var url = '/v1/app/' + appId + '/person/' + personName;
    return this.sendRequest('PUT', url, {
        body: JSON.stringify({faces: faces}),
        config: options.config
    });
};

FaceClient.prototype.getPerson = function (appId, personName, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/person/' + personName;
    return this.sendRequest('GET', url, {
        config: options.config
    });
};

FaceClient.prototype.listPersons = function (appId, options) {
    options = options || {};

    var url = '/v1/app/' + appId + '/person';
    var params = u.pick(options, 'groupName');
    return this.sendRequest('GET', url, {
        params: params,
        config: options.config
    });
};

FaceClient.prototype.identify = function (appId, groupName, data, options) {
    options = options || {};

    var body = {};
    if (Buffer.isBuffer(data)) {
        body = {
            base64: data.toString('base64')
        };
    }
    else {
        body = {
            bosPath: data
        };
    }

    var url = '/v1/app/' + appId + '/group/' + groupName;
    return this.sendRequest('POST', url, {
        params: {identify: ''},
        body: JSON.stringify(body),
        config: options.config
    });

};

FaceClient.prototype.verify = function (appId, personName, data, options) {
    options = options || {};

    var body = {};
    if (Buffer.isBuffer(data)) {
        body = {
            base64: data.toString('base64')
        };
    }
    else {
        body = {
            bosPath: data
        };
    }

    var url = '/v1/app/' + appId + '/person/' + personName;
    return this.sendRequest('POST', url, {
        params: {verify: ''},
        body: JSON.stringify(body),
        config: options.config
    });
};

// --- E N D ---

module.exports = FaceClient;











/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/ocr_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);

var debug = __webpack_require__(5)('bce-sdk:OCRClient');

var BceBaseClient = __webpack_require__(2);

/**
 * OCR API
 *
 * @see http://gollum.baidu.com/bceocrapi
 * @constructor
 * @param {Object} config The face client configuration.
 * @extends {BceBaseClient}
 */
function OCRClient(config) {
    BceBaseClient.call(this, config, 'face', true);
}
util.inherits(OCRClient, BceBaseClient);

// --- BEGIN ---

OCRClient.prototype._apiCall = function (url, data, language, options) {
    debug('url = %j, data = %j, language = %j, options = %j',
        url, data, language, options);

    options = options || {};

    var body = {};
    if (Buffer.isBuffer(data)) {
        body = {
            base64: data.toString('base64')
        };
    }
    else {
        body = {
            bosPath: data
        };
    }

    if (language) {
        body.language = language;
    }

    return this.sendRequest('POST', url, {
        body: JSON.stringify(body),
        config: options.config
    });
};

OCRClient.prototype.allText = function (data, language, options) {
    return this._apiCall('/v1/recognize/text', data, language, options);
};

OCRClient.prototype.oneLine = function (data, language, options) {
    return this._apiCall('/v1/recognize/line', data, language, options);
};

OCRClient.prototype.singleCharacter = function (data, language, options) {
    return this._apiCall('/v1/recognize/character', data, language, options);
};

module.exports = OCRClient;











/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/media_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);

var u = __webpack_require__(1);

var Auth = __webpack_require__(11);
var HttpClient = __webpack_require__(8);
var BceBaseClient = __webpack_require__(2);

/**
 * Media service api.
 *
 * @constructor
 * @param {Object} config The media client configuration.
 * @extends {BceBaseClient}
 */
function MediaClient(config) {
    BceBaseClient.call(this, config, 'media', true);
}
util.inherits(MediaClient, BceBaseClient);


// --- B E G I N ---
MediaClient.prototype.createPipeline = function (pipelineName, sourceBucket, targetBucket,
    opt_config, opt_description, opt_options) {

    var url = '/v3/pipeline';
    var options = opt_options || {};
    var body = JSON.stringify({
        pipelineName: pipelineName,
        sourceBucket: sourceBucket,
        targetBucket: targetBucket,
        config: opt_config || {capacity: 5},
        description: opt_description || ''
    });

    return this.sendRequest('POST', url, {
        body: body,
        config: options.config
    });
};

MediaClient.prototype.getPipeline = function (pipelineName, opt_options) {
    var url = '/v3/pipeline/' + pipelineName;
    var options = opt_options || {};

    return this.sendRequest('GET', url, {config: options.config});
};

MediaClient.prototype.deletePipeline = function (pipelineName, opt_options) {
    var url = '/v3/pipeline/' + pipelineName;
    var options = opt_options || {};

    return this.sendRequest('DELETE', url, {config: options.config});
};

MediaClient.prototype.getAllPipelines = function (opt_options) {
    var url = '/v3/pipeline';
    var options = opt_options || {};

    return this.sendRequest('GET', url, {config: options.config});
};

MediaClient.prototype.createJob = function (pipelineName, source, target, presetName, opt_options) {
    var url = '/v3/job';
    var options = opt_options || {};
    var body = JSON.stringify({
        pipelineName: pipelineName,
        source: source,
        target: target,
        presetName: presetName
    });

    return this.sendRequest('POST', url, {
        body: body,
        config: options.config
    });
};

MediaClient.prototype.getAllJobs = function (pipelineName, opt_options) {
    var url = '/v3/job';
    var options = opt_options || {};
    var params = {pipelineName: pipelineName};

    return this.sendRequest('GET', url, {
        params: params,
        config: options.config
    });
};

MediaClient.prototype.getJob = function (jobId, opt_options) {
    var url = '/v3/job/' + jobId;
    var options = opt_options || {};

    return this.sendRequest('GET', url, {config: options.config});
};

/**
 * 创建模板, 不对外部用户开放，仅服务于Console.
 *
 * @param {string} presetName 转码模板名称.
 * @param {string} container 音视频文件的容器.
 * @param {Object=} clip 是否截取音视频片段.
 * @param {Object=} audio 音频输出信息的集合，不填写表示只处理视频部分.
 * @param {Object=} video 视频输出信息的集合，不填写表示只处理音频部分.
 * @param {Object=} opt_encryption HLS加解密信息的集合.
 * @param {boolean=} opt_transmux 是否仅执行容器格式转换.
 * @param {string=} opt_description 转码模板描述.
 * @param {Object=} opt_options Media Client 的配置.
 * @return {Q.promise}
 */
MediaClient.prototype.createPreset = function (presetName, container, clip, audio, video,
    opt_encryption, opt_transmux, opt_description, opt_options) {
    // container: mp4, flv, hls, mp3, m4a
    var url = '/v3/preset';
    var options = opt_options || {};
    var body = {
        presetName: presetName,
        container: container
    };
    clip && (body.clip = clip);
    audio && (body.audio = audio);
    video && (body.video = video);
    opt_encryption && (body.encryption = opt_encryption);
    opt_transmux != null && (body.transmux = opt_transmux);
    opt_description && (body.description = opt_description);

    return this.sendRequest('POST', url, {
        body: JSON.stringify(body),
        config: options.config
    });
};

MediaClient.prototype.getPreset = function (presetName, opt_options) {
    var url = '/v3/preset/' + presetName;
    var options = opt_options || {};

    return this.sendRequest('GET', url, {
        config: options.config
    });
};

MediaClient.prototype.deletePreset = function (presetName, opt_options) {
    var url = '/v3/preset/' + presetName;
    var options = opt_options || {};

    return this.sendRequest('DELETE', url, {
        config: options.config
    });
};

MediaClient.prototype.getMediainfo = function (bucket, key, opt_options) {
    var url = '/v3/mediainfo';
    var options = opt_options || {};
    var params = {
        bucket: bucket,
        key: key
    };

    return this.sendRequest('GET', url, {
        params: params,
        config: options.config
    });
};

MediaClient.prototype.getProgress = function () {
    var url = '/v3/statistic/job/realtime';
    return this.sendRequest('GET', url);
};

MediaClient.prototype.createSignature = function (credentials, httpMethod, path, params, headers) {
    var auth = new Auth(credentials.ak, credentials.sk);
    // 不能对content-type,content-length,content-md5进行签名
    // 不能对x-bce-request-id进行签名
    var headersToSign = ['host'];
    return auth.generateAuthorization(httpMethod, path, params, headers, 0, 0, headersToSign);
};
// --- E N D ---


MediaClient.prototype.sendRequest = function (httpMethod, resource, varArgs) {
    var defaultArgs = {
        bucketName: null,
        key: null,
        body: null,
        headers: {},
        params: {},
        config: {},
        outputStream: null
    };
    var args = u.extend(defaultArgs, varArgs);

    var config = u.extend({}, this.config, args.config);

    var client = this;
    var agent = this._httpAgent = new HttpClient(config);
    u.each(['progress', 'error', 'abort'], function (eventName) {
        agent.on(eventName, function (evt) {
            client.emit(eventName, evt);
        });
    });
    return this._httpAgent.sendRequest(httpMethod, resource, args.body,
        args.headers, args.params, u.bind(this.createSignature, this),
        args.outputStream
    );
};

module.exports = MediaClient;









/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/sts.js
 * @author zhouhua
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = __webpack_require__(0);
var u = __webpack_require__(1);

var BceBaseClient = __webpack_require__(2);

/**
 * STS支持 - 将STS抽象成一种服务
 *
 * @see https://bce.baidu.com/doc/BOS/API.html#STS.20.E6.9C.8D.E5.8A.A1.E6.8E.A5.E5.8F.A3
 * @constructor
 * @param {Object} config The STS configuration.
 * @extends {BceBaseClient}
 */
function STS(config) {
    BceBaseClient.call(this, config, 'sts', true);
}
util.inherits(STS, BceBaseClient);

// --- BEGIN ---

STS.prototype.getSessionToken = function (durationSeconds, params, options) {
    options = options || {};

    var body = '';
    if (params) {
        params = u.pick(params, 'id', 'accessControlList');

        if (params.accessControlList) {
            params.accessControlList = u.map(params.accessControlList, function (acl) {
                return u.pick(acl, 'eid', 'service', 'region', 'effect', 'resource', 'permission');
            });
        }

        body = JSON.stringify(params);
    }

    var url = '/v1/sessionToken';

    return this.sendRequest('POST', url, {
        config: options.config,
        params: {
            durationSeconds: durationSeconds
        },
        body: body
    });
};

// --- E N D ---

module.exports = STS;



/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/vod_client.js
 * @author zhouhua
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
var url = __webpack_require__(12);

var BceBaseClient = __webpack_require__(2);
var BosClient = __webpack_require__(16);
var helper = __webpack_require__(9);
var Media = __webpack_require__(66);
var Notification = __webpack_require__(67);
var Player = __webpack_require__(68);
var PresetGroup = __webpack_require__(69);
var Statistic = __webpack_require__(27);
var StrategyGroup = __webpack_require__(70);

/**
 * VOD音视频点播服务
 *
 * @see https://bce.baidu.com/doc/VOD/API.html#API.E6.8E.A5.E5.8F.A3
 * @constructor
 * @param {Object} config The VodClient configuration.
 * @extends {BceBaseClient}
 */
function VodClient(config) {
    BceBaseClient.call(this, config, 'vod', true);
}
util.inherits(VodClient, BceBaseClient);

// --- BEGIN ---

VodClient.prototype.createMediaResource = function (title, description, blob, options) {
    var self = this;
    var protocol = url.parse(this.config.endpoint).protocol || 'https:';
    var mediaClient = new Media(this.config);
    return mediaClient.apply().then(function (res) {
        // bos endpoint 的协议跟随 this.config.endpoint
        var bosClient = new BosClient({
            endpoint: protocol + '//' + res.body.host,
            credentials: self.config.credentials,
            sessionToken: self.config.sessionToken
        });
        bosClient.on('progress', function (evt) {
            self.emit('progress', evt);
        });
        return helper.upload(bosClient, res.body.sourceBucket, res.body.sourceKey, blob, options);
    }).then(function () {
        return mediaClient.process(title, u.extend({description: description}, options));
    });
};

VodClient.prototype.getMediaResource = function (mediaId) {
    return new Media(this.config).setMediaId(mediaId).get();
};

VodClient.prototype.listMediaResource = function (options) {
    return new Media(this.config).list(options);
};

VodClient.prototype.listMediaResources = function (options) {
    return this.listMediaResource(options);
};

VodClient.prototype.updateMediaResource = function (mediaId, title, description) {
    return new Media(this.config).setMediaId(mediaId).update(title, description);
};

VodClient.prototype.stopMediaResource = function (mediaId, options) {
    return new Media(this.config).setMediaId(mediaId).disable();
};

VodClient.prototype.publishMediaResource = function (mediaId, options) {
    return new Media(this.config).setMediaId(mediaId).resume();
};

VodClient.prototype.deleteMediaResource = function (mediaId, options) {
    return new Media(this.config).setMediaId(mediaId).remove();
};

VodClient.prototype.getPlayableUrl = function (mediaId, transcodingPresetName) {
    return new Player(this.config).setMediaId(mediaId).delivery(transcodingPresetName);
};

VodClient.prototype.getDownloadUrl = function (mediaId, expiredInSeconds) {
    return new Media(this.config).getDownloadUrl(mediaId, expiredInSeconds);
};

VodClient.prototype.getPlayerCode = function (mediaId, width, height, autoStart, options) {
    return new Player(this.config).setMediaId(mediaId).code(u.extend({
        ak: this.config.credentials.ak,
        width: width,
        height: height,
        autostart: autoStart
    }, options));
};

VodClient.prototype._generateMediaId = function () {
    return new Media(this.config).apply();
};

VodClient.prototype._createMediaResource = function (mediaId, title, description, options) {
    return new Media(this.config).setMediaId(mediaId).process(title, u.extend({
        description: description
    }, options));
};
// --- E N D ---

VodClient.Media = Media;
VodClient.Notification = Notification;
VodClient.Player = Player;
VodClient.PresetGroup = PresetGroup;
VodClient.Statistic = Statistic;
VodClient.StrategyGroup = StrategyGroup;

module.exports = VodClient;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
(function () {

    var async = {};
    function noop() {}
    function identity(v) {
        return v;
    }
    function toBool(v) {
        return !!v;
    }
    function notId(v) {
        return !v;
    }

    // global on the server, window in the browser
    var previous_async;

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this;

    if (root != null) {
        previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            fn.apply(this, arguments);
            fn = null;
        };
    }

    function _once(fn) {
        return function() {
            if (fn === null) return;
            fn.apply(this, arguments);
            fn = null;
        };
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    // Ported from underscore.js isObject
    var _isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    function _isArrayLike(arr) {
        return _isArray(arr) || (
            // has a positive integer length property
            typeof arr.length === "number" &&
            arr.length >= 0 &&
            arr.length % 1 === 0
        );
    }

    function _arrayEach(arr, iterator) {
        var index = -1,
            length = arr.length;

        while (++index < length) {
            iterator(arr[index], index, arr);
        }
    }

    function _map(arr, iterator) {
        var index = -1,
            length = arr.length,
            result = Array(length);

        while (++index < length) {
            result[index] = iterator(arr[index], index, arr);
        }
        return result;
    }

    function _range(count) {
        return _map(Array(count), function (v, i) { return i; });
    }

    function _reduce(arr, iterator, memo) {
        _arrayEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    }

    function _forEachOf(object, iterator) {
        _arrayEach(_keys(object), function (key) {
            iterator(object[key], key);
        });
    }

    function _indexOf(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) return i;
        }
        return -1;
    }

    var _keys = Object.keys || function (obj) {
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    function _keyIterator(coll) {
        var i = -1;
        var len;
        var keys;
        if (_isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? i : null;
            };
        } else {
            keys = _keys(coll);
            len = keys.length;
            return function next() {
                i++;
                return i < len ? keys[i] : null;
            };
        }
    }

    // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
    // This accumulates the arguments passed into an array, after a given index.
    // From underscore.js (https://github.com/jashkenas/underscore/pull/2140).
    function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
            }
            // Currently unused but handle cases outside of the switch statement:
            // var args = Array(startIndex + 1);
            // for (index = 0; index < startIndex; index++) {
            //     args[index] = arguments[index];
            // }
            // args[startIndex] = rest;
            // return func.apply(this, args);
        };
    }

    function _withoutIndex(iterator) {
        return function (value, index, callback) {
            return iterator(value, callback);
        };
    }

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////

    // capture the global reference to guard against fakeTimer mocks
    var _setImmediate = typeof setImmediate === 'function' && setImmediate;

    var _delay = _setImmediate ? function(fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
    } : function(fn) {
        setTimeout(fn, 0);
    };

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
        async.nextTick = process.nextTick;
    } else {
        async.nextTick = _delay;
    }
    async.setImmediate = _setImmediate ? _delay : async.nextTick;


    async.forEach =
    async.each = function (arr, iterator, callback) {
        return async.eachOf(arr, _withoutIndex(iterator), callback);
    };

    async.forEachSeries =
    async.eachSeries = function (arr, iterator, callback) {
        return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
    };


    async.forEachLimit =
    async.eachLimit = function (arr, limit, iterator, callback) {
        return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
    };

    async.forEachOf =
    async.eachOf = function (object, iterator, callback) {
        callback = _once(callback || noop);
        object = object || [];

        var iter = _keyIterator(object);
        var key, completed = 0;

        while ((key = iter()) != null) {
            completed += 1;
            iterator(object[key], key, only_once(done));
        }

        if (completed === 0) callback(null);

        function done(err) {
            completed--;
            if (err) {
                callback(err);
            }
            // Check key is null in case iterator isn't exhausted
            // and done resolved synchronously.
            else if (key === null && completed <= 0) {
                callback(null);
            }
        }
    };

    async.forEachOfSeries =
    async.eachOfSeries = function (obj, iterator, callback) {
        callback = _once(callback || noop);
        obj = obj || [];
        var nextKey = _keyIterator(obj);
        var key = nextKey();
        function iterate() {
            var sync = true;
            if (key === null) {
                return callback(null);
            }
            iterator(obj[key], key, only_once(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    key = nextKey();
                    if (key === null) {
                        return callback(null);
                    } else {
                        if (sync) {
                            async.setImmediate(iterate);
                        } else {
                            iterate();
                        }
                    }
                }
            }));
            sync = false;
        }
        iterate();
    };



    async.forEachOfLimit =
    async.eachOfLimit = function (obj, limit, iterator, callback) {
        _eachOfLimit(limit)(obj, iterator, callback);
    };

    function _eachOfLimit(limit) {

        return function (obj, iterator, callback) {
            callback = _once(callback || noop);
            obj = obj || [];
            var nextKey = _keyIterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish () {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var key = nextKey();
                    if (key === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iterator(obj[key], key, only_once(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        }
                        else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }


    function doParallel(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOf, obj, iterator, callback);
        };
    }
    function doParallelLimit(fn) {
        return function (obj, limit, iterator, callback) {
            return fn(_eachOfLimit(limit), obj, iterator, callback);
        };
    }
    function doSeries(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOfSeries, obj, iterator, callback);
        };
    }

    function _asyncMap(eachfn, arr, iterator, callback) {
        callback = _once(callback || noop);
        arr = arr || [];
        var results = _isArrayLike(arr) ? [] : {};
        eachfn(arr, function (value, index, callback) {
            iterator(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = doParallelLimit(_asyncMap);

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.inject =
    async.foldl =
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachOfSeries(arr, function (x, i, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };

    async.foldr =
    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, identity).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };

    async.transform = function (arr, memo, iterator, callback) {
        if (arguments.length === 3) {
            callback = iterator;
            iterator = memo;
            memo = _isArray(arr) ? [] : {};
        }

        async.eachOf(arr, function(v, k, cb) {
            iterator(memo, v, k, cb);
        }, function(err) {
            callback(err, memo);
        });
    };

    function _filter(eachfn, arr, iterator, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iterator(x, function (v) {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            });
        }, function () {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    }

    async.select =
    async.filter = doParallel(_filter);

    async.selectLimit =
    async.filterLimit = doParallelLimit(_filter);

    async.selectSeries =
    async.filterSeries = doSeries(_filter);

    function _reject(eachfn, arr, iterator, callback) {
        _filter(eachfn, arr, function(value, cb) {
            iterator(value, function(v) {
                cb(!v);
            });
        }, callback);
    }
    async.reject = doParallel(_reject);
    async.rejectLimit = doParallelLimit(_reject);
    async.rejectSeries = doSeries(_reject);

    function _createTester(eachfn, check, getResult) {
        return function(arr, limit, iterator, cb) {
            function done() {
                if (cb) cb(getResult(false, void 0));
            }
            function iteratee(x, _, callback) {
                if (!cb) return callback();
                iterator(x, function (v) {
                    if (cb && check(v)) {
                        cb(getResult(true, x));
                        cb = iterator = false;
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                eachfn(arr, limit, iteratee, done);
            } else {
                cb = iterator;
                iterator = limit;
                eachfn(arr, iteratee, done);
            }
        };
    }

    async.any =
    async.some = _createTester(async.eachOf, toBool, identity);

    async.someLimit = _createTester(async.eachOfLimit, toBool, identity);

    async.all =
    async.every = _createTester(async.eachOf, notId, notId);

    async.everyLimit = _createTester(async.eachOfLimit, notId, notId);

    function _findGetResult(v, x) {
        return x;
    }
    async.detect = _createTester(async.eachOf, identity, _findGetResult);
    async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
    async.detectLimit = _createTester(async.eachOfLimit, identity, _findGetResult);

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                callback(null, _map(results.sort(comparator), function (x) {
                    return x.value;
                }));
            }

        });

        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    };

    async.auto = function (tasks, concurrency, callback) {
        if (typeof arguments[1] === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = _once(callback || noop);
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = remainingTasks;
        }

        var results = {};
        var runningTasks = 0;

        var hasError = false;

        var listeners = [];
        function addListener(fn) {
            listeners.unshift(fn);
        }
        function removeListener(fn) {
            var idx = _indexOf(listeners, fn);
            if (idx >= 0) listeners.splice(idx, 1);
        }
        function taskComplete() {
            remainingTasks--;
            _arrayEach(listeners.slice(0), function (fn) {
                fn();
            });
        }

        addListener(function () {
            if (!remainingTasks) {
                callback(null, results);
            }
        });

        _arrayEach(keys, function (k) {
            if (hasError) return;
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = _restParam(function(err, args) {
                runningTasks--;
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _forEachOf(results, function(val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[k] = args;
                    hasError = true;

                    callback(err, safeResults);
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            });
            var requires = task.slice(0, task.length - 1);
            // prevent dead-locks
            var len = requires.length;
            var dep;
            while (len--) {
                if (!(dep = tasks[requires[len]])) {
                    throw new Error('Has nonexistent dependency in ' + requires.join(', '));
                }
                if (_isArray(dep) && _indexOf(dep, k) >= 0) {
                    throw new Error('Has cyclic dependencies');
                }
            }
            function ready() {
                return runningTasks < concurrency && _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            }
            if (ready()) {
                runningTasks++;
                task[task.length - 1](taskCallback, results);
            }
            else {
                addListener(listener);
            }
            function listener() {
                if (ready()) {
                    runningTasks++;
                    removeListener(listener);
                    task[task.length - 1](taskCallback, results);
                }
            }
        });
    };



    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var attempts = [];

        var opts = {
            times: DEFAULT_TIMES,
            interval: DEFAULT_INTERVAL
        };

        function parseTimes(acc, t){
            if(typeof t === 'number'){
                acc.times = parseInt(t, 10) || DEFAULT_TIMES;
            } else if(typeof t === 'object'){
                acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
                acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
            } else {
                throw new Error('Unsupported argument type for \'times\': ' + typeof t);
            }
        }

        var length = arguments.length;
        if (length < 1 || length > 3) {
            throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
        } else if (length <= 2 && typeof times === 'function') {
            callback = task;
            task = times;
        }
        if (typeof times !== 'function') {
            parseTimes(opts, times);
        }
        opts.callback = callback;
        opts.task = task;

        function wrappedTask(wrappedCallback, wrappedResults) {
            function retryAttempt(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            }

            function retryInterval(interval){
                return function(seriesCallback){
                    setTimeout(function(){
                        seriesCallback(null);
                    }, interval);
                };
            }

            while (opts.times) {

                var finalAttempt = !(opts.times-=1);
                attempts.push(retryAttempt(opts.task, finalAttempt));
                if(!finalAttempt && opts.interval > 0){
                    attempts.push(retryInterval(opts.interval));
                }
            }

            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || opts.callback)(data.err, data.result);
            });
        }

        // If a callback is passed, run this as a controll flow
        return opts.callback ? wrappedTask() : wrappedTask;
    };

    async.waterfall = function (tasks, callback) {
        callback = _once(callback || noop);
        if (!_isArray(tasks)) {
            var err = new Error('First argument to waterfall must be an array of functions');
            return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        function wrapIterator(iterator) {
            return _restParam(function (err, args) {
                if (err) {
                    callback.apply(null, [err].concat(args));
                }
                else {
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    ensureAsync(iterator).apply(null, args);
                }
            });
        }
        wrapIterator(async.iterator(tasks))();
    };

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = _isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(_restParam(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    async.parallel = function (tasks, callback) {
        _parallel(async.eachOf, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
    };

    async.series = function(tasks, callback) {
        _parallel(async.eachOfSeries, tasks, callback);
    };

    async.iterator = function (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        }
        return makeCallback(0);
    };

    async.apply = _restParam(function (fn, args) {
        return _restParam(function (callArgs) {
            return fn.apply(
                null, args.concat(callArgs)
            );
        });
    });

    function _concat(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        callback = callback || noop;
        if (test()) {
            var next = _restParam(function(err, args) {
                if (err) {
                    callback(err);
                } else if (test.apply(this, args)) {
                    iterator(next);
                } else {
                    callback.apply(null, [null].concat(args));
                }
            });
            iterator(next);
        } else {
            callback(null);
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        var calls = 0;
        return async.whilst(function() {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iterator, callback);
    };

    async.until = function (test, iterator, callback) {
        return async.whilst(function() {
            return !test.apply(this, arguments);
        }, iterator, callback);
    };

    async.doUntil = function (iterator, test, callback) {
        return async.doWhilst(iterator, function() {
            return !test.apply(this, arguments);
        }, callback);
    };

    async.during = function (test, iterator, callback) {
        callback = callback || noop;

        var next = _restParam(function(err, args) {
            if (err) {
                callback(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function(err, truth) {
            if (err) {
                callback(err);
            } else if (truth) {
                iterator(next);
            } else {
                callback(null);
            }
        };

        test(check);
    };

    async.doDuring = function (iterator, test, callback) {
        var calls = 0;
        async.during(function(next) {
            if (calls++ < 1) {
                next(null, true);
            } else {
                test.apply(this, arguments);
            }
        }, iterator, callback);
    };

    function _queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        }
        else if(concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
            });
            async.setImmediate(q.process);
        }
        function _next(q, tasks) {
            return function(){
                workers -= 1;

                var removed = false;
                var args = arguments;
                _arrayEach(tasks, function (task) {
                    _arrayEach(workersList, function (worker, index) {
                        if (worker === task && !removed) {
                            workersList.splice(index, 1);
                            removed = true;
                        }
                    });

                    task.callback.apply(task, args);
                });
                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var workersList = [];
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            empty: noop,
            drain: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                while(!q.paused && workers < q.concurrency && q.tasks.length){

                    var tasks = q.payload ?
                        q.tasks.splice(0, q.payload) :
                        q.tasks.splice(0, q.tasks.length);

                    var data = _map(tasks, function (task) {
                        return task.data;
                    });

                    if (q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    workersList.push(tasks[0]);
                    var cb = only_once(_next(q, tasks));
                    worker(data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            workersList: function () {
                return workersList;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    async.setImmediate(q.process);
                }
            }
        };
        return q;
    }

    async.queue = function (worker, concurrency) {
        var q = _queue(function (items, cb) {
            worker(items[0], cb);
        }, concurrency, 1);

        return q;
    };

    async.priorityQueue = function (worker, concurrency) {

        function _compareTasks(a, b){
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + ((end - beg + 1) >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
                async.setImmediate(q.process);
            });
        }

        // Start with a normal queue
        var q = async.queue(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        return _queue(worker, 1, payload);
    };

    function _console_fn(name) {
        return _restParam(function (fn, args) {
            fn.apply(null, args.concat([_restParam(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        var has = Object.prototype.hasOwnProperty;
        hasher = hasher || identity;
        var memoized = _restParam(function memoized(args) {
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (has.call(memo, key)) {   
                async.setImmediate(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (has.call(queues, key)) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([_restParam(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    };

    function _times(mapper) {
        return function (count, iterator, callback) {
            mapper(_range(count), iterator, callback);
        };
    }

    async.times = _times(async.map);
    async.timesSeries = _times(async.mapSeries);
    async.timesLimit = function (count, limit, iterator, callback) {
        return async.mapLimit(_range(count), limit, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return _restParam(function (args) {
            var that = this;

            var callback = args[args.length - 1];
            if (typeof callback == 'function') {
                args.pop();
            } else {
                callback = noop;
            }

            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([_restParam(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        });
    };

    async.compose = function (/* functions... */) {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };


    function _applyEach(eachfn) {
        return _restParam(function(fns, args) {
            var go = _restParam(function(args) {
                var that = this;
                var callback = args.pop();
                return eachfn(fns, function (fn, _, cb) {
                    fn.apply(that, args.concat([cb]));
                },
                callback);
            });
            if (args.length) {
                return go.apply(this, args);
            }
            else {
                return go;
            }
        });
    }

    async.applyEach = _applyEach(async.eachOf);
    async.applyEachSeries = _applyEach(async.eachOfSeries);


    async.forever = function (fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureAsync(fn);
        function next(err) {
            if (err) {
                return done(err);
            }
            task(next);
        }
        next();
    };

    function ensureAsync(fn) {
        return _restParam(function (args) {
            var callback = args.pop();
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    async.setImmediate(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
        });
    }

    async.ensureAsync = ensureAsync;

    async.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function (callback) {
            return callback.apply(this, args);
        };
    });

    async.wrapSync =
    async.asyncify = function asyncify(func) {
        return _restParam(function (args) {
            var callback = args.pop();
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (_isObject(result) && typeof result.then === "function") {
                result.then(function(value) {
                    callback(null, value);
                })["catch"](function(err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    };

    // Node.js
    if (typeof module === 'object' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return async;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/Media.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
var debug = __webpack_require__(5)('bce-sdk:VodClient.Media');

var BceBaseClient = __webpack_require__(2);
// var BosClient = require('../bos_client');
// var H = require('../headers');
var helper = __webpack_require__(9);
var Statistic = __webpack_require__(27);

/**
 * 音视频媒资接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E9.9F.B3.E8.A7.86.E9.A2.91.E5.AA.92.E8.B5.84.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Media Config
 *
 * @constructor
 */
function Media(config) {
    BceBaseClient.call(this, config, 'vod', false);

    this._mediaId = null;
    this._sourceBucket = null;
    this._sourceKey = null;
    this._host = null;
}
util.inherits(Media, BceBaseClient);

Media.prototype.setMediaId = function (mediaId) {
    this._mediaId = mediaId;
    return this;
};

Media.prototype._buildUrl = function () {
    var baseUrl = '/v1/media';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 申请媒资
 *
 * @return {Promise.<Object>}
 */
Media.prototype.apply = function () {
    var url = this._buildUrl();
    var options = {
        params: {
            apply: ''
        }
    };

    var self = this;
    return this.sendRequest('POST', url, options).then(function (response) {
        self._mediaId = response.body.mediaId;
        self._sourceBucket = response.body.sourceBucket;
        self._sourceKey = response.body.sourceKey;
        self._host = response.body.host;

        return response;
    });
};

/**
 * 处理媒资
 *
 * @param {string} title The media title.
 * @param {Object?} options The extra media attributes.
 *
 * @return {Promise.<Object>}
 */
Media.prototype.process = function (title, options) {
    var url = this._buildUrl(this._mediaId);
    var payload = u.extend({
        title: title,
        description: null,
        sourceExtension: null,
        transcodingPresetGroupName: null
    }, options);
    payload = u.pick(payload, helper.omitNull);

    return this.sendRequest('POST', url, {
        params: {
            process: ''
        },
        body: JSON.stringify(payload)
    });
};

/**
 * 停用指定媒资，仅对 PUBLISHED 状态的媒资有效
 *
 * @param {string?} opt_mediaId 媒资Id.
 * @return {Promise.<Object>}
 */
Media.prototype.disable = function (opt_mediaId) {
    var url = this._buildUrl(opt_mediaId || this._mediaId);
    return this.sendRequest('PUT', url, {
        params: {
            disable: ''
        }
    });
};

/**
 * 恢复指定媒资，仅对 DISABLED 状态的媒资有效
 *
 * @param {string?} opt_mediaId 媒资Id.
 * @return {Promise.<Object>}
 */
Media.prototype.resume = function (opt_mediaId) {
    var url = this._buildUrl(opt_mediaId || this._mediaId);
    return this.sendRequest('PUT', url, {
        params: {
            publish: ''
        }
    });
};


/**
 * 删除指定媒资，对 RUNNING 状态的媒资无效
 *
 * @param {string?} opt_mediaId 媒资Id.
 * @return {Promise.<Object>}
 */
Media.prototype.remove = function (opt_mediaId) {
    var url = this._buildUrl(opt_mediaId || this._mediaId);
    return this.sendRequest('DELETE', url);
};

/**
 * 查询指定媒资
 *
 * @param {string?} opt_mediaId 媒资Id.
 * @return {Promise.<Object>}
 */
Media.prototype.get = function (opt_mediaId) {
    var url = this._buildUrl(opt_mediaId || this._mediaId);
    debug('url = %j', url);
    return this.sendRequest('GET', url);
};

/**
 * 获取音视频媒资的源文件下载地址
 *
 * @param {string?} opt_mediaId 媒资Id.
 * @param {number?} opt_expiredInSeconds 过期时间，单位(s)
 *
 * @return {Promise.<Object>}
 */
Media.prototype.getDownloadUrl = function (opt_mediaId, opt_expiredInSeconds) {
    var expiredInSeconds = opt_expiredInSeconds || 60 * 60 * 24;   // 默认1天
    var url = this._buildUrl(opt_mediaId || this._mediaId);
    return this.sendRequest('GET', url, {
        params: {
            sourcedownload: '',
            expiredInSeconds: expiredInSeconds
        }
    });
};

/**
 * 更新指定媒资
 *
 * @param {string} title The media title.
 * @param {string?} description The media description.
 *
 * @return {Promise.<Object>}
 */
Media.prototype.update = function (title, description) {
    var url = this._buildUrl(this._mediaId);
    var payload = u.pick({
        title: title,
        description: description
    }, u.identity);

    return this.sendRequest('PUT', url, {
        params: {
            attributes: ''
        },
        body: JSON.stringify(payload)
    });
};

/**
 * 查询媒资播放信息，例如：播放次数、最大并发播放次数及下行流量
 *
 * @param {Object?} options 过滤参数.
 * @return {Promise.<Object>}
 */
Media.prototype.stat = function (options) {
    var statClient = new Statistic(this.config);
    return statClient.setMediaId(this._mediaId).stat(options);
};

/**
 * 筛选媒资并分页展示
 *
 * 1. pageNo + pageSize
 * 2. marker + maxSize
 *
 * @param {Object?} options The extra pagination and filter parameters.
 *
 * @return {Promise.<Object>}
 */
Media.prototype.list = function (options) {
    var url = this._buildUrl();
    var params = u.extend({
        pageSize: 10,
        pageNo: null,
        marker: null,
        maxSize: null,

        status: null,
        begin: null,
        end: null,
        title: null
    }, options);
    params = u.pick(params, helper.omitNull);

    if (params.marker != null) {
        delete params.pageNo;
        delete params.pageSize;
    }
    else if (params.pageSize) {
        delete params.marker;
        delete params.maxSize;
    }

    debug('list params = %j', params);

    return this.sendRequest('GET', url, {
        params: params
    });
};
// --- E N D ---


module.exports = Media;








/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/Notification.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
// var debug = require('debug')('bce-sdk:VodClient.Notification');

var BceBaseClient = __webpack_require__(2);


/**
 * 音视频通知接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E9.80.9A.E7.9F.A5.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Media Config
 * @constructor
 */
function Notification(config) {
    BceBaseClient.call(this, config, 'vod', false);
}
util.inherits(Notification, BceBaseClient);

Notification.prototype._buildUrl = function () {
    var baseUrl = '/v1/notification';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 创建通知
 *
 * @param {string} name The notification name.
 * @param {string} endpoint The notification endpoint.
 * @return {Promise.<Object>}
 */
Notification.prototype.create = function (name, endpoint) {
    var url = this._buildUrl();
    var payload = {
        name: name,
        endpoint: endpoint
    };

    return this.sendRequest('POST', url, {
        body: JSON.stringify(payload)
    });
};

/**
 * 查询通知
 *
 * @param {string} name The notification name.
 * @return {Promise.<Object>}
 */
Notification.prototype.get = function (name) {
    var url = this._buildUrl(name);

    return this.sendRequest('GET', url);
};

/**
 * 通知列表
 *
 * @return {Promise.<Object>}
 */
Notification.prototype.listAll = function () {
    var url = this._buildUrl();

    return this.sendRequest('GET', url);
};

/**
 * 删除通知
 *
 * @param {string} name The notification name.
 * @return {Promise.<Object>}
 */
Notification.prototype.remove = function (name) {
    var url = this._buildUrl(name);

    return this.sendRequest('DELETE', url);
};

// --- E N D ---

module.exports = Notification;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/Player.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
// var debug = require('debug')('bce-sdk:VodClient.Player');

var BceBaseClient = __webpack_require__(2);
// var BosClient = require('../bos_client');
// var H = require('../headers');
var helper = __webpack_require__(9);


/**
 * 音视频播放器服务接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E6.92.AD.E6.94.BE.E5.99.A8.E6.9C.8D.E5.8A.A1.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Media Config
 *
 * @constructor
 */
function Player(config) {
    BceBaseClient.call(this, config, 'vod', false);

    this._mediaId = null;
}
util.inherits(Player, BceBaseClient);

Player.prototype.setMediaId = function (mediaId) {
    this._mediaId = mediaId;
    return this;
};

Player.prototype._buildUrl = function () {
    var baseUrl = '/v1/media';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 查询媒资分发信息
 *
 * @param {string?} transcodingPresetName 转码模版名称.
 * @return {Promise.<Object>}
 */
Player.prototype.delivery = function (transcodingPresetName) {
    var url = this._buildUrl(this._mediaId, 'delivery');
    var params = u.pick({
        transcodingPresetName: transcodingPresetName
    }, u.identity);

    return this.sendRequest('GET', url, {params: params}).then(function (response) {
        if (response.body.success === true) {
            response.body = response.body.result;
        }
        return response;
    });
};

/**
 * 查询媒资播放代码
 *
 * @param {Object} options 配置参数.
 * @return {Promise.<Object>}
 */
Player.prototype.code = function (options) {
    var url = this._buildUrl(this._mediaId, 'code');
    var params = u.extend({
        // required
        width: 100,
        height: 100,
        autostart: true,
        ak: null,

        // optional
        transcodingPresetName: null
    }, options);
    params = u.pick(params, helper.omitNull);

    return this.sendRequest('GET', url, {params: params}).then(function (response) {
        var codes = response.body.codes;
        for (var i = 0; i < codes.length; i++) {
            var item = codes[i];
            if (item.codeType === 'html') {
                item.sourceCode = new Buffer(item.sourceCode, 'base64').toString('utf-8');
                break;
            }
        }
        return response;
    });
};
// --- E N D ---

module.exports = Player;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/PresetGroup.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
// var debug = require('debug')('bce-sdk:VodClient.PresetGroup');

var BceBaseClient = __webpack_require__(2);


/**
 * 转码模板组接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E8.BD.AC.E7.A0.81.E6.A8.A1.E6.9D.BF.E7.BB.84.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Media Config
 * @constructor
 */
function PresetGroup(config) {
    BceBaseClient.call(this, config, 'vod', false);
}
util.inherits(PresetGroup, BceBaseClient);

PresetGroup.prototype._buildUrl = function () {
    var baseUrl = '/v1/presetgroup';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 创建转码模板组
 *
 * @param {Object} config 转码模板组的配置.
 * @return {Promise.<Object>}
 */
PresetGroup.prototype.create = function (config) {
    var url = this._buildUrl();

    return this.sendRequest('POST', url, {
        body: JSON.stringify(config)
    });
};

/**
 * 查询指定转码模板组
 *
 * @param {string} presetGroupName 转码模版组的名称.
 * @return {Promise.<Object>}
 */
PresetGroup.prototype.get = function (presetGroupName) {
    var url = this._buildUrl(presetGroupName);

    return this.sendRequest('GET', url);
};

/**
 * 查询用户所有转码模板组
 *
 * @return {Promise.<Object>}
 */
PresetGroup.prototype.listAll = function () {
    var url = this._buildUrl();

    return this.sendRequest('GET', url);
};

/**
 * 更新指定转码模板
 *
 * @param {string} presetGroupName 转码模版组的名称.
 * @param {Object} config 转码模版组的配置.
 * @return {Promise.<Object>}
 */
PresetGroup.prototype.update = function (presetGroupName, config) {
    var url = this._buildUrl(presetGroupName);

    return this.sendRequest('PUT', url, {
        body: JSON.stringify(config)
    });
};

/**
 * 删除转码模板组
 *
 * @param {string} presetGroupName 转码模版组的名称.
 * @return {Promise.<Object>}
 */
PresetGroup.prototype.remove = function (presetGroupName) {
    var url = this._buildUrl(presetGroupName);

    return this.sendRequest('DELETE', url);
};

// --- E N D ---

module.exports = PresetGroup;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file src/vod/StrategyGroup.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint-disable fecs-camelcase */

var util = __webpack_require__(0);
var u = __webpack_require__(1);
// var debug = require('debug')('bce-sdk:VodClient.StrategyGroup');

var BceBaseClient = __webpack_require__(2);


/**
 * 音视频策略组接口
 * https://cloud.baidu.com/doc/VOD/API.html#.E7.AD.96.E7.95.A5.E7.BB.84.E6.8E.A5.E5.8F.A3
 *
 * @param {Object} config The VodClient.Media Config
 * @constructor
 */
function StrategyGroup(config) {
    BceBaseClient.call(this, config, 'vod', false);
}
util.inherits(StrategyGroup, BceBaseClient);

StrategyGroup.prototype._buildUrl = function () {
    var baseUrl = '/v1/strategygroup';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

// --- BEGIN ---

/**
 * 查询特定策略组
 *
 * @param {string} strategyGroupName 策略组名称.
 * @return {Promise.<Object>}
 */
StrategyGroup.prototype.get = function (strategyGroupName) {
    var url = this._buildUrl(strategyGroupName);

    return this.sendRequest('GET', url);
};

/**
 * 查询所有策略组
 *
 * @return {Promise.<Object>}
 */
StrategyGroup.prototype.listAll = function () {
    var url = this._buildUrl();

    return this.sendRequest('GET', url);
};

/**
 * 更新特定策略组
 *
 * @param {string} strategyGroupName 策略组的名称.
 * @param {Object} config 策略组的配置.
 * @return {Promise.<Object>}
 */
StrategyGroup.prototype.update = function (strategyGroupName, config) {
    var url = this._buildUrl(strategyGroupName);

    return this.sendRequest('PUT', url, {
        body: JSON.stringify(config)
    });
};

// --- E N D ---

module.exports = StrategyGroup;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/doc_client.js
 * @author guofan
 */

/* eslint-env node */
/* eslint max-params:[0,10] */
/* eslint fecs-camelcase:[2,{"ignore":["/opt_/"]}] */

var fs = __webpack_require__(3);
var path = __webpack_require__(7);
var util = __webpack_require__(0);
var builtinUrl = __webpack_require__(12);

var Q = __webpack_require__(4);
var u = __webpack_require__(1);
var debug = __webpack_require__(5)('bce-sdk:Document');

var BosClient = __webpack_require__(16);
var BceBaseClient = __webpack_require__(2);
var UploadHelper = __webpack_require__(9);
var crypto = __webpack_require__(10);

var DATA_TYPE_FILE     = 1;
var DATA_TYPE_BUFFER   = 2;
var DATA_TYPE_BLOB     = 4;

/**
 * 文档转码任务接口（Job/Transcoding API）
 * http://bce.baidu.com/doc/DOC/API.html#.1D.1E.B0.1E.6C.74.0C.6D.C1.68.D2.57.6F.70.EA.F1
 *
 * @constructor
 * @param {Object} config The doc client configuration.
 * @extends {BceBaseClient}
 */
function Document(config) {
    BceBaseClient.call(this, config, 'doc', false);

    this._documentId = null;
}
util.inherits(Document, BceBaseClient);

// --- B E G I N ---

Document.prototype._buildUrl = function () {
    var baseUrl = '/v2/document';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

Document.prototype.getId = function () {
    return this._documentId;
};

Document.prototype.setId = function (documentId) {
    this._documentId = documentId;
    return this;
};

/**
 * Create a document transfer job from local file, buffer, readable stream or blob.
 *
 * @param {Blob|Buffer|string} data The document data. If the data type
 *   is string, which means the file path.
 * @param {Object=} opt_options The extra options.
 * @return {Promise}
 */
Document.prototype.create = function (data, opt_options) {
    var options = u.extend({}, opt_options);
    var dataType = -1;
    var pattern = /^bos:\/\//;

    if (u.isString(data)) {
        if (pattern.test(data)) {
            // createFromBos
            try {
                var parsed = builtinUrl.parse(data);
                var bucket = parsed.host;
                var object = parsed.pathname.substr(1);

                options = u.extend(options, parsed.query);
                var title = options.title || path.basename(object);
                var format = options.format || path.extname(object).substr(1);
                var notification = options.notification;
                return this.createFromBos(bucket, object,
                    title, format, notification);
            }
            catch (error) {
                return Q.reject(error);
            }
        }

        dataType = DATA_TYPE_FILE;
        options.format = options.format || path.extname(data).substr(1);
        options.title = options.title || path.basename(data, path.extname(data));
    }
    else if (Buffer.isBuffer(data)) {
        if (options.format == null || options.title == null) {
            return Q.reject(new Error('buffer type required options.format and options.title'));
        }
        dataType = DATA_TYPE_BUFFER;
    }
    else if (typeof Blob !== 'undefined' && data instanceof Blob) {
        dataType = DATA_TYPE_BLOB;
        options.format = options.format || path.extname(data.name).substr(1);
        options.title = options.title || path.basename(data.name, path.extname(data.name));
    }
    else {
        return Q.reject(new Error('Unsupported dataType.'));
    }

    if (!options.title || !options.format) {
        return Q.reject(new Error('`title` and `format` are required.'));
    }

    if (options.meta.md5) {
        return this._doCreate(data, options);
    }

    var self = this;
    if (dataType === DATA_TYPE_FILE) {
        return crypto.md5stream(fs.createReadStream(data), 'hex')
            .then(function (md5) {
                options.meta.md5 = md5;
                return self._doCreate(data, options);
            });
    }
    else if (dataType === DATA_TYPE_BLOB) {
        return crypto.md5blob(data, 'hex')
            .then(function (md5) {
                options.meta.md5 = md5;
                return self._doCreate(data, options);
            });
    }
    return this._doCreate(data, options);
};

Document.prototype._doCreate = function (data, options) {
    var documentId = null;
    var bucket = null;
    var object = null;
    var bosEndpoint = null;

    var self = this;

    return self.register(options)
        .then(function (response) {
            debug('register[response = %j]', response);

            documentId = response.body.documentId;
            bucket = response.body.bucket;
            object = response.body.object;
            bosEndpoint = response.body.bosEndpoint;

            var bosConfig = u.extend({}, self.config, {endpoint: bosEndpoint});
            var bosClient = new BosClient(bosConfig);

            return UploadHelper.upload(bosClient, bucket, object, data);
        })
        .then(function (response) {
            debug('upload[response = %j]', response);
            return self.publish();
        })
        .then(function (response) {
            debug('publish[response = %j]', response);
            response.body = {
                documentId: documentId,
                bucket: bucket,
                object: object,
                bosEndpoint: bosEndpoint
            };
            return response;
        });
};

Document.prototype.register = function (options) {
    debug('register[options = %j]', options);

    var self = this;
    var url = this._buildUrl();
    return this.sendRequest('POST', url, {
        params: {register: ''},
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(options)
    }).then(function (response) {
        self.setId(response.body.documentId);
        return response;
    });
};

Document.prototype.publish = function (documentId) {
    var url = this._buildUrl(documentId || this._documentId);
    return this.sendRequest('PUT', url, {
        params: {publish: ''}
    });
};

Document.prototype.get = function (documentId) {
    var url = this._buildUrl(documentId || this._documentId);
    return this.sendRequest('GET', url);
};

/**
 * Get docId and token to render the document in the browser.
 *
 * ```html
 * <div id="reader"></div>
 * <script src="http://bce.bdstatic.com/doc/doc_reader.js"></script>
 * <script>
 * var host = location.host;
 * var option = {
 *     docId: <docId>,
 *     token: <token>,
 *     host: <host>
 * };
 * new Document('reader', option);
 * </script>
 * ```
 *
 * @param {string} documentId The document Id.
 * @return {Promise}
 */
Document.prototype.read = function (documentId) {
    var url = this._buildUrl(documentId || this._documentId);
    return this.sendRequest('GET', url, {
        params: {read: ''}
    });
};

/**
 * 通过文档的唯一标识 documentId 获取指定文档的下载链接。仅对状态为PUBLISHED/FAILED的文档有效。
 *
 * @param {string=} documentId 需要下载的文档id
 * @return {Promise.<{documentId: string, downloadUrl: string}, any>}
 */
Document.prototype.download = function (documentId) {
    var url = this._buildUrl(documentId || this._documentId);
    return this.sendRequest('GET', url, {
        params: {download: ''}
    });
};

/**
 * Create document from bos object.
 *
 * 1. The BOS bucket must in bj-region.
 * 2. The BOS bucket permission must be public-read.
 *
 * 用户需要将源文档所在BOS bucket权限设置为公共读，或者在自定义权限设置中为开放云文档转码服务账号
 *（沙盒：798c20fa770840438a29efd66cdccf7f，线上：183db8cd3d5a4bf9a94459f89a7a3a91）添加READ权限。
 *
 * 文档转码服务依赖文档的md5，为提高转码性能，文档转码服务需要用户为源文档指定md5；
 * 因此用户需要在上传文档至BOS时设置自定义meta header x-bce-meta-md5来记录源文档md5。
 * 补充说明：实际上当用户没有为源文档设置x-bce-meta-md5 header时，文档转码服务还会
 * 尝试根据BOS object ETag解析源文档md5，如果解析失败（ETag以'-'开头），才会真正报错。
 *
 * @param {string} bucket The bucket name in bj region.
 * @param {string} object The object name.
 * @param {string} title The document title.
 * @param {string=} opt_format The document extension is possible.
 * @param {string=} opt_notification The notification name.
 * @return {Promise}
 */
Document.prototype.createFromBos = function (
    bucket, object, title, opt_format, opt_notification) {
    var url = this._buildUrl();

    var body = {
        bucket: bucket,
        object: object,
        title: title
    };

    var format = opt_format || path.extname(object).substr(1);
    if (!format) {
        throw new Error('Document format parameter required');
    }

    // doc, docx, ppt, pptx, xls, xlsx, vsd, pot, pps, rtf, wps, et, dps, pdf, txt, epub
    // 默认值：BOS Object后缀名（当BOS Object有后缀时）
    body.format = format;
    if (opt_notification) {
        body.notification = opt_notification;
    }

    debug('createFromBos:arguments = [%j], body = [%j]', arguments, body);
    var self = this;
    return this.sendRequest('POST', url, {
        params: {source: 'bos'},
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }).then(function (response) {
        self.setId(response.body.documentId);
        return response;
    });
};

Document.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = (response.body.documents || []).map(function (item) {
            return self.remove(item.documentId);
        });
        return Q.all(asyncTasks);
    });
};

Document.prototype.remove = function (documentId) {
    var url = this._buildUrl(documentId || this._documentId);
    return this.sendRequest('DELETE', url);
};

Document.prototype.list = function (opt_status) {
    var status = opt_status || '';

    var url = this._buildUrl();
    return this.sendRequest('GET', url, {
        params: {status: status}
    });
};

/**
 * 文档转码通知接口（Notification API）
 * http://gollum.baidu.com/MEDIA-DOC-API#通知接口(Notification-API)
 *
 * @constructor
 * @param {Object} config The doc client configuration.
 * @extends {BceBaseClient}
 */
function Notification(config) {
    BceBaseClient.call(this, config, 'doc', false);

    this._name = null;
    this._endpoint = null;
}
util.inherits(Notification, BceBaseClient);

Notification.prototype._buildUrl = function () {
    var baseUrl = '/v1/notification';
    var extraPaths = u.toArray(arguments);

    if (extraPaths.length) {
        baseUrl += '/' + extraPaths.join('/');
    }

    return baseUrl;
};

Notification.prototype.create = function (name, endpoint) {
    var self = this;
    var url = this._buildUrl();
    return self.sendRequest('POST', url, {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            endpoint: endpoint
        })
    }).then(function (response) {
        self._name = name;
        self._endpoint = endpoint;
        return response;
    });
};

Notification.prototype.get = function (name) {
    var url = this._buildUrl(name || this._name);
    return this.sendRequest('GET', url);
};

Notification.prototype.list = function () {
    return this.sendRequest('GET', this._buildUrl());
};

Notification.prototype.remove = function (name) {
    var url = this._buildUrl(name || this._name);
    return this.sendRequest('DELETE', url);
};

Notification.prototype.removeAll = function () {
    var self = this;
    return self.list().then(function (response) {
        var asyncTasks = (response.body.notifications || []).map(function (item) {
            return self.remove(item.name);
        });
        return Q.all(asyncTasks);
    });
};

// --- E   N   D ---

exports.Document = Document;
exports.Notification = Notification;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
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
  return !!value && (type == 'object' || type == 'function');
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
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;


/***/ }),
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 文件下载通知命令
 *
 * @file src/uploader/dispatcher.js
 * @author mudio(job.zhanghao@gmail.com)
 */

const NotifyPaused = exports.NotifyPaused = 'upload_notify_pause';
const NotifyFinished = exports.NotifyFinished = 'upload_notify_finish';
const NotifyError = exports.NotifyError = 'upload_notify_error';
const NotifyStart = exports.NotifyStart = 'upload_notify_start';
const NotifyProgress = exports.NotifyProgress = 'upload_notify_progress';

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _events = __webpack_require__(14);

var _bceSdkJs = __webpack_require__(24);

var _crypto = __webpack_require__(10);

var _crypto2 = _interopRequireDefault(_crypto);

__webpack_require__(83);

var _logger = __webpack_require__(19);

var _headers = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Transport 基类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file src/uploader/Transport.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author mudio(job.zhanghao@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

class Transport extends _events.EventEmitter {
    constructor(credentials, config) {
        super();

        const { uuid, bucketName, objectKey, localPath, uploadId } = config;

        this._uuid = uuid;
        this._uploadId = uploadId;
        this._objectKey = objectKey;
        this._localPath = localPath;
        this._bucketName = bucketName;
        this._client = new _bceSdkJs.BosClient(credentials);

        this._state = _headers.TransportStatus.UnStarted;
    }

    /**
     * 获取uploadId
     *
     * @returns
     * @memberof MultiTransport
     */
    _initUploadId() {
        return this._client.initiateMultipartUpload(this._bucketName, this._objectKey).then(res => res.body);
    }

    /**
     * 根据`UploadId`获取已上传`Parts`
     *
     * @returns {Promise}
     * @memberof MultiTransport
     */
    _fetchParts() {
        return this._client.listParts(this._bucketName, this._objectKey, this._uploadId).then(res => res.body);
    }

    /**
     * 完成上传，设置Meta
     *
     * @memberof Transport
     */
    _completeUpload() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const { parts } = yield _this._fetchParts();
            // 排下序
            const orderedPartList = parts.sort(function (lhs, rhs) {
                return lhs.partNumber - rhs.partNumber;
            });
            const md5sum = yield _this._computedFileMD5();

            yield _this._client.completeMultipartUpload(_this._bucketName, _this._objectKey, _this._uploadId, orderedPartList, {
                [_headers.Meta.xMetaFrom]: _headers.TransportOrigin,
                [_headers.Meta.xMetaMD5]: md5sum
            });
        })();
    }

    /**
     * 检查任务是否完成
     *
     * @returns
     * @memberof Transport
     */
    _checkFinish() {
        this._state = _headers.TransportStatus.Finished;
        this.emit('finish', { uuid: this._uuid, localPath: this._localPath });
    }

    /**
     * 处理错误
     *
     * @param {Error} err
     * @returns
     * @memberof Transport
     */
    _checkError(err) {
        if (this._state === _headers.TransportStatus.Paused) {
            return;
        }

        this._state = _headers.TransportStatus.Error;
        (0, _logger.error)(err);
        if (typeof err === 'string') {
            this.emit('error', { uuid: this._uuid, error: err });
        } else if (err instanceof Error || typeof err.message === 'string') {
            this.emit('error', { uuid: this._uuid, error: err.message });
        } else if ('status_code' in err) {
            this.emit('error', { uuid: this._uuid, error: `Server code = ${err.status_code}` });
        } else {
            this.emit('error', { uuid: this._uuid, error: '未知错误' });
        }
    }

    _computedFileMD5() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const { size } = _fs2.default.statSync(_this2._localPath);

            // 如果文件小于4G,则算下md5
            if (!_this2._md5sum && !size < 4 * 1024 * 1024 * 1024) {
                const fp = _fs2.default.createReadStream(_this2._localPath);
                _this2._md5sum = yield _crypto2.default.md5stream(fp);
            }

            return _this2._md5sum;
        })();
    }

    /**
     * 检查文件一致性
     *
     * 1. 非客户端上传的文件只检查文件大小
     * 2. 客户端上传的文件优先检查`MD5`
     * 3. 大文件考虑到计算性能的问题，只检查`mtime`
     *
     * @returns {boolean}
     * @memberof Transport
     */
    _checkConsistency() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            let _meta = null;
            const { mtime, size } = _fs2.default.statSync(_this3._localPath);

            try {
                _meta = yield _this3._fetchMetadata();
            } catch (ex) {
                if (ex.status_code === 404) {
                    return false;
                }

                throw ex;
            }

            const { xMetaSize, xMetaOrigin, xMetaModifiedTime, xMetaMD5 } = _meta;
            /**
             * 如果源来自client且拥有md5，则检查md5
             */
            if (xMetaOrigin === _headers.TransportOrigin && xMetaMD5) {
                const md5sum = yield _this3._computedFileMD5();
                // 如果MD5存在则验证MD5
                if (xMetaMD5 !== md5sum) {
                    return false;
                }
                return true;
            }

            /**
             * 标准检查逻辑，文件大小相等且文件修改时间小于bos文件修改时间
             */
            if (size === xMetaSize && mtime.getTime() < xMetaModifiedTime) {
                return true;
            }

            return false;
        })();
    }

    /**
     * 获取Meta数据
     *
     * @returns {Promise}
     * @memberof MultiTransport
     */
    _fetchMetadata() {
        return this._client.getObjectMetadata(this._bucketName, this._objectKey).then(res => {
            const xMetaSize = +res.http_headers['content-length'];
            const lastModified = new Date(res.http_headers['last-modified']);
            const xMetaMD5 = res.http_headers[_headers.Meta.xMetaMD5];
            const xMetaOrigin = res.http_headers[_headers.Meta.xMetaOrigin];

            const xMetaModifiedTime = lastModified.getTime();

            return { xMetaSize, xMetaOrigin, xMetaModifiedTime, xMetaMD5 };
        });
    }

    /**
     * 暂停上传
     *
     * @memberof Transport
     */
    pause() {
        this._state = _headers.TransportStatus.Paused;

        if (this._stream) {
            this._stream.emit('abort');
        } else {
            this.emit('pause', { uuid: this._uuid });
        }
    }

    isRunning() {
        return this._state === _headers.TransportStatus.Running;
    }

    isUnStarted() {
        return this._state === _headers.TransportStatus.UnStarted;
    }
}
exports.default = Transport;

/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(20);

var _lodash2 = _interopRequireDefault(_lodash);

var _dispatcher2 = __webpack_require__(81);

var _dispatcher3 = _interopRequireDefault(_dispatcher2);

var _logger = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 不能作为独立进程运行
if (!(0, _lodash2.default)(process.send)) {
    process.exit();
} else {
    (0, _logger.info)(`start uploader transport pid = ${process.pid}`);
} /**
   * 上传入口
   *
   * @file src/uploader/index.js
   * @author mudio(job.zhanghao@gmail.com)
   */

const { BCE_AK, BCE_SK } = process.env;

if (!BCE_AK || !BCE_SK) {
    (0, _logger.error)('Not found `BCE_AK`,`BCE_SK` env.', () => process.exit());
}

const _dispatcher = new _dispatcher3.default({
    ak: BCE_AK, sk: BCE_SK
});

process.on('message', msg => _dispatcher.dispatch(msg));
process.on('unhandledRejection', err => (0, _logger.error)(`UnhandledRejection => ${err.message} \n ${err.stack}`));
process.on('uncaughtException', err => (0, _logger.error)(`UncaughtException => ${err}`, () => process.exit()));

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _queue = __webpack_require__(29);

var _queue2 = _interopRequireDefault(_queue);

var _lodash = __webpack_require__(20);

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = __webpack_require__(19);

var _single_transport = __webpack_require__(82);

var _single_transport2 = _interopRequireDefault(_single_transport);

var _multi_transport = __webpack_require__(84);

var _multi_transport2 = _interopRequireDefault(_multi_transport);

var _command = __webpack_require__(74);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Dispatcher {
    constructor(credentials) {
        this._credentials = credentials;
        this._transportCache = {};
        // 运行队列
        this._queue = (0, _queue2.default)((...args) => this._invoke(...args), 5);
    }

    /**
     * 属性检查
     *
     *  - uuid
     *  - bucketName
     *  - objectKey
     *  - localPath
     *  - uploadId (option)
     *
     * @param {Object} [command={}]
     * @memberof Dispatcher
     */
    _checkProps(command = {}) {
        if (process.env.DEBUG) {
            const { uuid, bucketName, objectKey, localPath } = command;

            if (!uuid) {
                throw new TypeError('`uuid` should not be empty');
            }
            if (!bucketName) {
                throw new TypeError('`bucketName` should not be empty');
            }
            if (!objectKey) {
                throw new TypeError('`objectKey` should not be empty');
            }
            if (!localPath) {
                throw new TypeError('`localPath` should not be empty');
            }
        }
    }

    _invoke(transport, done) {
        if (!transport.isUnStarted()) {
            transport.removeAllListeners();
        }

        transport.on('start', msg => this._send(_command.NotifyStart, msg));

        transport.on('pause', msg => {
            this._send(_command.NotifyPaused, msg);
            done();
        });

        transport.on('progress', msg => this._send(_command.NotifyProgress, msg));

        transport.on('finish', msg => {
            this._send(_command.NotifyFinished, msg);
            // 如果已经完成的任务，则清理掉资源
            delete this._transportCache[msg.uuid];
            done();
        });

        transport.on('error', msg => {
            this._send(_command.NotifyError, msg);
            done();
        });

        transport.start();
    }

    _send(command, message = {}) {
        process.send({ category: 'cmd', message: Object.assign({ command }, message) });

        (0, _logger.debug)(`invoke ${command}, config = ${JSON.stringify(message)}`);
    }

    dispatch({ category, config, endpoint }) {
        this._checkProps(config);

        if ((0, _lodash2.default)(this[category])) {
            this[category](config, endpoint);
        }

        (0, _logger.debug)(`invoke ${category}, config = ${JSON.stringify(config)}`);
    }

    addItem(config = {}, endpoint) {
        const { uuid, localPath } = config;

        if (!uuid) {
            return;
        }

        const fileSize = _fs2.default.statSync(localPath).size;
        if (!this._transportCache[uuid]) {
            // 文件大于20mb则分片上传
            const _ClassType = fileSize > 20 * 1024 * 1024 ? _multi_transport2.default : _single_transport2.default;

            this._transportCache[uuid] = new _ClassType({ endpoint, credentials: this._credentials }, config);
        }

        this.resumeItem({ uuid });
    }

    pauseItem({ uuid }) {
        if (uuid in this._transportCache) {
            this._transportCache[uuid].pause();
        } else {
            this._send(_command.NotifyPaused, { uuid });
        }
    }

    resumeItem({ uuid }) {
        if (!this._transportCache[uuid].isRunning()) {
            return this._queue.unshift(this._transportCache[uuid]);
        }

        (0, _logger.error)(`Task has running => ${uuid}`);
    }

    removeItem({ uuid }) {
        const task = this._transportCache[uuid];

        if (task && task.isRunning()) {
            task.pause();
        }

        delete this._transportCache[uuid];
    }
}
exports.default = Dispatcher; /**
                               * 文件下载模块
                               *
                               * @file src/uploader/dispatcher.js
                               * @author mudio(job.zhanghao@gmail.com)
                               */

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(7);

var _path2 = _interopRequireDefault(_path);

var _lodash = __webpack_require__(30);

var _lodash2 = _interopRequireDefault(_lodash);

var _bceSdkJs = __webpack_require__(24);

var _headers = __webpack_require__(6);

var _transport = __webpack_require__(75);

var _transport2 = _interopRequireDefault(_transport);

var _headers2 = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 文件下载模块
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file src/uploader/Transport.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author mudio(job.zhanghao@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

class SingleTransport extends _transport2.default {
    constructor(...args) {
        super(...args);

        this._timeout = 10e3;
    }

    _onTimeout() {
        if (this._stream) {
            this._stream.emit('abort');
        }
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    resume() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const options = {};

            /**
             * 读取文件大小
             */
            const { size } = _fs2.default.statSync(_this._localPath);
            const md5sum = yield _this._computedFileMD5();

            /**
             * 设置`Content-Length`
             */
            options[_headers.CONTENT_LENGTH] = size;
            options[_headers.CONTENT_TYPE] = _bceSdkJs.MimeType.guess(_path2.default.extname(_this._localPath));
            options[_headers2.Meta.xMetaFrom] = _headers2.TransportOrigin;
            options[_headers2.Meta.xMetaMD5] = md5sum;

            /**
             * 读取流
             */
            _this._stream = _fs2.default.createReadStream(_this._localPath);

            /**
             * 检查超时
             */
            const _checkAlive = (0, _lodash2.default)(function () {
                return _this._onTimeout();
            }, _this._timeout);

            /**
             * 通知进度
             */
            _this._stream.on('progress', function ({ rate, bytesWritten }) {
                _checkAlive();

                _this.emit('progress', { rate, bytesWritten, uuid: _this._uuid });
            });

            return _this._client.putObject(_this._bucketName, _this._objectKey, _this._stream, options);
        })();
    }

    /**
     * 恢复暂停后的下载任务
     *
     * @memberof Transport
     */
    start() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /**
             * 重置状态
             */
            _this2._state = _headers2.TransportStatus.Running;

            /**
             * 文件不存在还玩个蛋
             */
            const isExist = _fs2.default.existsSync(_this2._localPath);
            if (!isExist) {
                return _this2._checkError(new Error(`file not found ${_this2.localPath}`));
            }

            try {
                // 先检查如果文件已经在bos上了，则忽略
                if (yield _this2._checkConsistency()) {
                    return _this2._checkFinish();
                }

                _this2.emit('start', { uuid: _this2._uuid });

                yield _this2.resume();

                _this2._checkFinish();
            } catch (ex) {
                _this2._checkError(ex);
            }
        })();
    }
}
exports.default = SingleTransport;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stream = __webpack_require__(13);

var _stream2 = _interopRequireDefault(_stream);

var _bceSdkJs = __webpack_require__(24);

var _lodash = __webpack_require__(72);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bceSdkJs.HttpClient.prototype._sendRequest = (req, readStream = '') => {
    if (!readStream) {
        return req.end();
    }

    if (Buffer.isBuffer(readStream) || typeof readStream === 'string') {
        req.write(readStream);
        req.end();
    } else if (readStream instanceof _stream2.default.Readable) {
        if (!readStream.readable) {
            throw new Error('stream is not readable');
        }

        /**
         * 通知节流
         */
        const _notifyProgress = (0, _lodash2.default)(msg => readStream.emit('progress', msg), 500);

        const startDate = Date.now();
        readStream.on('data', chunk => {
            const flushed = req.write(chunk);

            if (!flushed) {
                readStream.pause();

                req.once('drain', () => {
                    const bytesWritten = req.socket.bytesWritten;
                    const rangeTime = Date.now() - startDate;
                    const rate = bytesWritten / rangeTime; // kb/s

                    _notifyProgress({ rate, bytesWritten });

                    readStream.resume();
                });
            }
        });

        /**
         * 提供取消上传的功能
         */
        readStream.on('abort', () => req.abort());
        readStream.on('end', () => req.end());
    } else {
        throw new Error(`Invalid body type = ${typeof readStream}`);
    }
}; /**
    * BosClient
    *
    * @file src/bos_client.js
    * @author mudio(job.zhanghao@gmail.com)
    */

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _queue = __webpack_require__(29);

var _queue2 = _interopRequireDefault(_queue);

var _lodash = __webpack_require__(30);

var _lodash2 = _interopRequireDefault(_lodash);

var _headers = __webpack_require__(6);

var _transport = __webpack_require__(75);

var _transport2 = _interopRequireDefault(_transport);

var _headers2 = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 文件下载模块
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file src/uploader/Transport.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author mudio(job.zhanghao@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

const kPartSize = 20 * 1024 * 1024;

class MultiTransport extends _transport2.default {
    constructor(credentials, config) {
        super(credentials, config);

        this._checkAlive = (0, _lodash2.default)(() => this._stream.emit('abort'), 10e3);
        this._queue = null;
    }

    // 最多分片1000片，除了最后一片其他片大小相等且大于等于UploadConfig.PartSize
    _decompose(orderedParts, maxParts, uploadSize, totalSize) {
        const minPartSize = Math.ceil(totalSize / (maxParts - orderedParts.length));
        const averagePartSize = Math.max(kPartSize, minPartSize);

        // 余下分片
        const remainParts = [];

        let leftSize = totalSize - uploadSize;
        let offset = uploadSize;
        let partNumber = orderedParts.length + 1;

        while (leftSize > 0) {
            const partSize = Math.min(leftSize, averagePartSize);

            remainParts.push({ partNumber, partSize, start: offset });

            leftSize -= partSize;
            offset += partSize;
            partNumber += 1;
        }

        return remainParts;
    }

    _invoke({ partNumber, partSize, start }, done) {
        /**
         * 读取流
         */
        this._stream = _fs2.default.createReadStream(this._localPath, {
            start,
            end: start + partSize - 1 // eslint-disable-line no-mixed-operators
        });

        /**
         * 通知进度
         */
        this._stream.on('progress', ({ rate, bytesWritten }) => {
            this._checkAlive();

            this.emit('progress', { rate, bytesWritten: this._uploadedSize + bytesWritten, uuid: this._uuid });
        });

        const headers = {};
        headers[_headers.CONTENT_LENGTH] = partSize;
        headers[_headers.CONTENT_TYPE] = 'application/octet-stream';
        const options = this._client._checkOptions(headers);

        return this._client.sendRequest('PUT', {
            bucketName: this._bucketName,
            key: this._objectKey,
            body: this._stream,
            headers: options.headers,
            params: { partNumber, uploadId: this._uploadId },
            config: options.config
        }).then(() => {
            this._uploadedSize += partSize;
            done();
        }, err => done(err));
    }

    /**
     * 重新下载文件
     *
     * @memberof MultiTransport
     */
    resume(remainParts = []) {
        return new Promise((resolve, reject) => {
            this._queue = (0, _queue2.default)((...args) => this._invoke(...args), 1);

            this._queue.error = err => {
                this._queue.kill();
                reject(err);
            };

            this._queue.drain = () => resolve();

            this._queue.push(remainParts);
        });
    }

    /**
     * 恢复暂停后的下载任务
     *
     * @memberof MultiTransport
     */
    start() {
        var _this = this;

        return _asyncToGenerator(function* () {
            /**
             * 重置状态
             */
            _this._state = _headers2.TransportStatus.Running;

            /**
             * 文件不存在还玩个蛋
             */
            const isExist = _fs2.default.existsSync(_this._localPath);
            if (!isExist) {
                return _this._checkError(new Error(`file not found ${_this.localPath}`));
            }

            try {
                const { size } = _fs2.default.statSync(_this._localPath);

                // 如果文件大于阈值并且没有uploadId，则获取一次
                if (!_this._uploadId) {
                    // 先检查如果文件已经在bos上了，则忽略
                    if (yield _this._checkConsistency()) {
                        return _this._checkFinish();
                    }

                    const { uploadId } = yield _this._initUploadId();
                    _this._uploadId = uploadId;
                }
                // 获取已上传到分片
                const { parts, maxParts } = yield _this._fetchParts();
                // 重新分片
                const orderedParts = parts.sort(function (lhs, rhs) {
                    return lhs.partNumber - rhs.partNumber;
                });
                _this._uploadedSize = parts.reduce(function (pre, cur) {
                    return pre + cur.size;
                }, 0);
                const remainParts = _this._decompose(orderedParts, maxParts, _this._uploadedSize, size);
                // 上传遗留的分片
                if (remainParts.length > 0) {
                    _this.emit('start', {
                        uuid: _this._uuid,
                        uploadId: _this._uploadId,
                        localPath: _this._localPath
                    });
                    yield _this.resume(remainParts);
                }
                // 完成任务,用文件大小来效验文件一致性
                yield _this._completeUpload();
                // 检查任务完成状态
                _this._checkFinish();
            } catch (ex) {
                _this._checkError(ex);
            }
        })();
    }
}
exports.default = MultiTransport;

/***/ })
/******/ ]);