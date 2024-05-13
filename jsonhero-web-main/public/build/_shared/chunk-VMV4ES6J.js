import {
  Title
} from "/build/_shared/chunk-ZOQKLX7S.js";
import {
  Body
} from "/build/_shared/chunk-3VJ35PHZ.js";
import {
  ArrowCircleDownIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import {
  require_react_dom
} from "/build/_shared/chunk-O7NJZHON.js";
import {
  useStarCount
} from "/build/_shared/chunk-2VHYU7Q2.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  Form,
  Link,
  _extends,
  useSubmit,
  useTransition
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_object_assign,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_react();
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment7 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment7;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal2;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    init_react();
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    init_react();
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    init_react();
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    init_react();
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement2, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x2, y) {
        if (x2 === y) {
          return x2 !== 0 || 1 / x2 === 1 / y;
        } else {
          return x2 !== x2 && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i4 = 0; i4 < propValue.length; i4++) {
            var error = typeChecker(propValue, i4, componentName, location, propFullName + "[" + i4 + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement2(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i4 = 0; i4 < expectedValues.length; i4++) {
            if (is(propValue, expectedValues[i4])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i4 = 0; i4 < arrayOfTypeCheckers.length; i4++) {
          var checker = arrayOfTypeCheckers[i4];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i4 + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i5 = 0; i5 < arrayOfTypeCheckers.length; i5++) {
            var checker2 = arrayOfTypeCheckers[i5];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement2(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    init_react();
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/file-selector/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/file-selector/node_modules/tslib/tslib.js"(exports, module) {
    init_react();
    var __extends3;
    var __assign3;
    var __rest3;
    var __decorate3;
    var __param3;
    var __metadata3;
    var __awaiter3;
    var __generator3;
    var __exportStar3;
    var __values3;
    var __read3;
    var __spread3;
    var __spreadArrays3;
    var __spreadArray2;
    var __await3;
    var __asyncGenerator3;
    var __asyncDelegator3;
    var __asyncValues3;
    var __makeTemplateObject3;
    var __importStar3;
    var __importDefault3;
    var __classPrivateFieldGet3;
    var __classPrivateFieldSet3;
    var __createBinding3;
    (function(factory) {
      var root = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v2) {
          return exports2[id] = previous ? previous(id, v2) : v2;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b) {
        d4.__proto__ = b;
      } || function(d4, b) {
        for (var p2 in b)
          if (Object.prototype.hasOwnProperty.call(b, p2))
            d4[p2] = b[p2];
      };
      __extends3 = function(d4, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d4, b);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign3 = Object.assign || function(t10) {
        for (var s4, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s4 = arguments[i4];
          for (var p2 in s4)
            if (Object.prototype.hasOwnProperty.call(s4, p2))
              t10[p2] = s4[p2];
        }
        return t10;
      };
      __rest3 = function(s4, e9) {
        var t10 = {};
        for (var p2 in s4)
          if (Object.prototype.hasOwnProperty.call(s4, p2) && e9.indexOf(p2) < 0)
            t10[p2] = s4[p2];
        if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i4 = 0, p2 = Object.getOwnPropertySymbols(s4); i4 < p2.length; i4++) {
            if (e9.indexOf(p2[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p2[i4]))
              t10[p2[i4]] = s4[p2[i4]];
          }
        return t10;
      };
      __decorate3 = function(decorators, target, key, desc) {
        var c5 = arguments.length, r9 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r9 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i4 = decorators.length - 1; i4 >= 0; i4--)
            if (d4 = decorators[i4])
              r9 = (c5 < 3 ? d4(r9) : c5 > 3 ? d4(target, key, r9) : d4(target, key)) || r9;
        return c5 > 3 && r9 && Object.defineProperty(target, key, r9), r9;
      };
      __param3 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata3 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter3 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e9) {
              reject(e9);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e9) {
              reject(e9);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator3 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t10[0] & 1)
            throw t10[1];
          return t10[1];
        }, trys: [], ops: [] }, f3, y, t10, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n5) {
          return function(v2) {
            return step([n5, v2]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f3 = 1, y && (t10 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t10 = y["return"]) && t10.call(y), 0) : y.next) && !(t10 = t10.call(y, op[1])).done)
                return t10;
              if (y = 0, t10)
                op = [op[0] & 2, t10.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t10 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t10 = _.trys, t10 = t10.length > 0 && t10[t10.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t10 || op[1] > t10[0] && op[1] < t10[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t10[1]) {
                    _.label = t10[1];
                    t10 = op;
                    break;
                  }
                  if (t10 && _.label < t10[2]) {
                    _.label = t10[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t10[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e9) {
              op = [6, e9];
              y = 0;
            } finally {
              f3 = t10 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar3 = function(m2, o8) {
        for (var p2 in m2)
          if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(o8, p2))
            __createBinding3(o8, m2, p2);
      };
      __createBinding3 = Object.create ? function(o8, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o8, k2, { enumerable: true, get: function() {
          return m2[k];
        } });
      } : function(o8, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o8[k2] = m2[k];
      };
      __values3 = function(o8) {
        var s4 = typeof Symbol === "function" && Symbol.iterator, m2 = s4 && o8[s4], i4 = 0;
        if (m2)
          return m2.call(o8);
        if (o8 && typeof o8.length === "number")
          return {
            next: function() {
              if (o8 && i4 >= o8.length)
                o8 = void 0;
              return { value: o8 && o8[i4++], done: !o8 };
            }
          };
        throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read3 = function(o8, n5) {
        var m2 = typeof Symbol === "function" && o8[Symbol.iterator];
        if (!m2)
          return o8;
        var i4 = m2.call(o8), r9, ar = [], e9;
        try {
          while ((n5 === void 0 || n5-- > 0) && !(r9 = i4.next()).done)
            ar.push(r9.value);
        } catch (error) {
          e9 = { error };
        } finally {
          try {
            if (r9 && !r9.done && (m2 = i4["return"]))
              m2.call(i4);
          } finally {
            if (e9)
              throw e9.error;
          }
        }
        return ar;
      };
      __spread3 = function() {
        for (var ar = [], i4 = 0; i4 < arguments.length; i4++)
          ar = ar.concat(__read3(arguments[i4]));
        return ar;
      };
      __spreadArrays3 = function() {
        for (var s4 = 0, i4 = 0, il = arguments.length; i4 < il; i4++)
          s4 += arguments[i4].length;
        for (var r9 = Array(s4), k = 0, i4 = 0; i4 < il; i4++)
          for (var a3 = arguments[i4], j = 0, jl = a3.length; j < jl; j++, k++)
            r9[k] = a3[j];
        return r9;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i4 = 0, l3 = from.length, ar; i4 < l3; i4++) {
            if (ar || !(i4 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i4);
              ar[i4] = from[i4];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await3 = function(v2) {
        return this instanceof __await3 ? (this.v = v2, this) : new __await3(v2);
      };
      __asyncGenerator3 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i4, q = [];
        return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4;
        function verb(n5) {
          if (g2[n5])
            i4[n5] = function(v2) {
              return new Promise(function(a3, b) {
                q.push([n5, v2, a3, b]) > 1 || resume(n5, v2);
              });
            };
        }
        function resume(n5, v2) {
          try {
            step(g2[n5](v2));
          } catch (e9) {
            settle(q[0][3], e9);
          }
        }
        function step(r9) {
          r9.value instanceof __await3 ? Promise.resolve(r9.value.v).then(fulfill, reject) : settle(q[0][2], r9);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v2) {
          if (f3(v2), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator3 = function(o8) {
        var i4, p2;
        return i4 = {}, verb("next"), verb("throw", function(e9) {
          throw e9;
        }), verb("return"), i4[Symbol.iterator] = function() {
          return this;
        }, i4;
        function verb(n5, f3) {
          i4[n5] = o8[n5] ? function(v2) {
            return (p2 = !p2) ? { value: __await3(o8[n5](v2)), done: n5 === "return" } : f3 ? f3(v2) : v2;
          } : f3;
        }
      };
      __asyncValues3 = function(o8) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m2 = o8[Symbol.asyncIterator], i4;
        return m2 ? m2.call(o8) : (o8 = typeof __values3 === "function" ? __values3(o8) : o8[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4);
        function verb(n5) {
          i4[n5] = o8[n5] && function(v2) {
            return new Promise(function(resolve, reject) {
              v2 = o8[n5](v2), settle(resolve, reject, v2.done, v2.value);
            });
          };
        }
        function settle(resolve, reject, d4, v2) {
          Promise.resolve(v2).then(function(v3) {
            resolve({ value: v3, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject3 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o8, v2) {
        Object.defineProperty(o8, "default", { enumerable: true, value: v2 });
      } : function(o8, v2) {
        o8["default"] = v2;
      };
      __importStar3 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding3(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault3 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet3 = function(receiver, state, kind, f3) {
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
      };
      __classPrivateFieldSet3 = function(receiver, state, value, kind, f3) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends3);
      exporter("__assign", __assign3);
      exporter("__rest", __rest3);
      exporter("__decorate", __decorate3);
      exporter("__param", __param3);
      exporter("__metadata", __metadata3);
      exporter("__awaiter", __awaiter3);
      exporter("__generator", __generator3);
      exporter("__exportStar", __exportStar3);
      exporter("__createBinding", __createBinding3);
      exporter("__values", __values3);
      exporter("__read", __read3);
      exporter("__spread", __spread3);
      exporter("__spreadArrays", __spreadArrays3);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await3);
      exporter("__asyncGenerator", __asyncGenerator3);
      exporter("__asyncDelegator", __asyncDelegator3);
      exporter("__asyncValues", __asyncValues3);
      exporter("__makeTemplateObject", __makeTemplateObject3);
      exporter("__importStar", __importStar3);
      exporter("__importDefault", __importDefault3);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet3);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet3);
    });
  }
});

// node_modules/attr-accept/dist/es/index.js
var require_es = __commonJS({
  "node_modules/attr-accept/dist/es/index.js"(exports) {
    "use strict";
    init_react();
    exports.__esModule = true;
    exports.default = function(file, acceptedFiles) {
      if (file && acceptedFiles) {
        var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
        var fileName = file.name || "";
        var mimeType = (file.type || "").toLowerCase();
        var baseMimeType = mimeType.replace(/\/.*$/, "");
        return acceptedFilesArray.some(function(type) {
          var validType = type.trim().toLowerCase();
          if (validType.charAt(0) === ".") {
            return fileName.toLowerCase().endsWith(validType);
          } else if (validType.endsWith("/*")) {
            return baseMimeType === validType.replace(/\/.*$/, "");
          }
          return mimeType === validType;
        });
      }
      return true;
    };
  }
});

// node_modules/tslib/tslib.js
var require_tslib2 = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    init_react();
    var __extends3;
    var __assign3;
    var __rest3;
    var __decorate3;
    var __param3;
    var __metadata3;
    var __awaiter3;
    var __generator3;
    var __exportStar3;
    var __values3;
    var __read3;
    var __spread3;
    var __spreadArrays3;
    var __await3;
    var __asyncGenerator3;
    var __asyncDelegator3;
    var __asyncValues3;
    var __makeTemplateObject3;
    var __importStar3;
    var __importDefault3;
    var __classPrivateFieldGet3;
    var __classPrivateFieldSet3;
    var __createBinding3;
    (function(factory) {
      var root = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v2) {
          return exports2[id] = previous ? previous(id, v2) : v2;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b) {
        d4.__proto__ = b;
      } || function(d4, b) {
        for (var p2 in b)
          if (b.hasOwnProperty(p2))
            d4[p2] = b[p2];
      };
      __extends3 = function(d4, b) {
        extendStatics(d4, b);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign3 = Object.assign || function(t10) {
        for (var s4, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s4 = arguments[i4];
          for (var p2 in s4)
            if (Object.prototype.hasOwnProperty.call(s4, p2))
              t10[p2] = s4[p2];
        }
        return t10;
      };
      __rest3 = function(s4, e9) {
        var t10 = {};
        for (var p2 in s4)
          if (Object.prototype.hasOwnProperty.call(s4, p2) && e9.indexOf(p2) < 0)
            t10[p2] = s4[p2];
        if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i4 = 0, p2 = Object.getOwnPropertySymbols(s4); i4 < p2.length; i4++) {
            if (e9.indexOf(p2[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p2[i4]))
              t10[p2[i4]] = s4[p2[i4]];
          }
        return t10;
      };
      __decorate3 = function(decorators, target, key, desc) {
        var c5 = arguments.length, r9 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r9 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i4 = decorators.length - 1; i4 >= 0; i4--)
            if (d4 = decorators[i4])
              r9 = (c5 < 3 ? d4(r9) : c5 > 3 ? d4(target, key, r9) : d4(target, key)) || r9;
        return c5 > 3 && r9 && Object.defineProperty(target, key, r9), r9;
      };
      __param3 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata3 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter3 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e9) {
              reject(e9);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e9) {
              reject(e9);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator3 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t10[0] & 1)
            throw t10[1];
          return t10[1];
        }, trys: [], ops: [] }, f3, y, t10, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n5) {
          return function(v2) {
            return step([n5, v2]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f3 = 1, y && (t10 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t10 = y["return"]) && t10.call(y), 0) : y.next) && !(t10 = t10.call(y, op[1])).done)
                return t10;
              if (y = 0, t10)
                op = [op[0] & 2, t10.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t10 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t10 = _.trys, t10 = t10.length > 0 && t10[t10.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t10 || op[1] > t10[0] && op[1] < t10[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t10[1]) {
                    _.label = t10[1];
                    t10 = op;
                    break;
                  }
                  if (t10 && _.label < t10[2]) {
                    _.label = t10[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t10[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e9) {
              op = [6, e9];
              y = 0;
            } finally {
              f3 = t10 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __createBinding3 = function(o8, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o8[k2] = m2[k];
      };
      __exportStar3 = function(m2, exports2) {
        for (var p2 in m2)
          if (p2 !== "default" && !exports2.hasOwnProperty(p2))
            exports2[p2] = m2[p2];
      };
      __values3 = function(o8) {
        var s4 = typeof Symbol === "function" && Symbol.iterator, m2 = s4 && o8[s4], i4 = 0;
        if (m2)
          return m2.call(o8);
        if (o8 && typeof o8.length === "number")
          return {
            next: function() {
              if (o8 && i4 >= o8.length)
                o8 = void 0;
              return { value: o8 && o8[i4++], done: !o8 };
            }
          };
        throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read3 = function(o8, n5) {
        var m2 = typeof Symbol === "function" && o8[Symbol.iterator];
        if (!m2)
          return o8;
        var i4 = m2.call(o8), r9, ar = [], e9;
        try {
          while ((n5 === void 0 || n5-- > 0) && !(r9 = i4.next()).done)
            ar.push(r9.value);
        } catch (error) {
          e9 = { error };
        } finally {
          try {
            if (r9 && !r9.done && (m2 = i4["return"]))
              m2.call(i4);
          } finally {
            if (e9)
              throw e9.error;
          }
        }
        return ar;
      };
      __spread3 = function() {
        for (var ar = [], i4 = 0; i4 < arguments.length; i4++)
          ar = ar.concat(__read3(arguments[i4]));
        return ar;
      };
      __spreadArrays3 = function() {
        for (var s4 = 0, i4 = 0, il = arguments.length; i4 < il; i4++)
          s4 += arguments[i4].length;
        for (var r9 = Array(s4), k = 0, i4 = 0; i4 < il; i4++)
          for (var a3 = arguments[i4], j = 0, jl = a3.length; j < jl; j++, k++)
            r9[k] = a3[j];
        return r9;
      };
      __await3 = function(v2) {
        return this instanceof __await3 ? (this.v = v2, this) : new __await3(v2);
      };
      __asyncGenerator3 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i4, q = [];
        return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4;
        function verb(n5) {
          if (g2[n5])
            i4[n5] = function(v2) {
              return new Promise(function(a3, b) {
                q.push([n5, v2, a3, b]) > 1 || resume(n5, v2);
              });
            };
        }
        function resume(n5, v2) {
          try {
            step(g2[n5](v2));
          } catch (e9) {
            settle(q[0][3], e9);
          }
        }
        function step(r9) {
          r9.value instanceof __await3 ? Promise.resolve(r9.value.v).then(fulfill, reject) : settle(q[0][2], r9);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v2) {
          if (f3(v2), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator3 = function(o8) {
        var i4, p2;
        return i4 = {}, verb("next"), verb("throw", function(e9) {
          throw e9;
        }), verb("return"), i4[Symbol.iterator] = function() {
          return this;
        }, i4;
        function verb(n5, f3) {
          i4[n5] = o8[n5] ? function(v2) {
            return (p2 = !p2) ? { value: __await3(o8[n5](v2)), done: n5 === "return" } : f3 ? f3(v2) : v2;
          } : f3;
        }
      };
      __asyncValues3 = function(o8) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m2 = o8[Symbol.asyncIterator], i4;
        return m2 ? m2.call(o8) : (o8 = typeof __values3 === "function" ? __values3(o8) : o8[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4);
        function verb(n5) {
          i4[n5] = o8[n5] && function(v2) {
            return new Promise(function(resolve, reject) {
              v2 = o8[n5](v2), settle(resolve, reject, v2.done, v2.value);
            });
          };
        }
        function settle(resolve, reject, d4, v2) {
          Promise.resolve(v2).then(function(v3) {
            resolve({ value: v3, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject3 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      __importStar3 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      __importDefault3 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet3 = function(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
      };
      __classPrivateFieldSet3 = function(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
      };
      exporter("__extends", __extends3);
      exporter("__assign", __assign3);
      exporter("__rest", __rest3);
      exporter("__decorate", __decorate3);
      exporter("__param", __param3);
      exporter("__metadata", __metadata3);
      exporter("__awaiter", __awaiter3);
      exporter("__generator", __generator3);
      exporter("__exportStar", __exportStar3);
      exporter("__createBinding", __createBinding3);
      exporter("__values", __values3);
      exporter("__read", __read3);
      exporter("__spread", __spread3);
      exporter("__spreadArrays", __spreadArrays3);
      exporter("__await", __await3);
      exporter("__asyncGenerator", __asyncGenerator3);
      exporter("__asyncDelegator", __asyncDelegator3);
      exporter("__asyncValues", __asyncValues3);
      exporter("__makeTemplateObject", __makeTemplateObject3);
      exporter("__importStar", __importStar3);
      exporter("__importDefault", __importDefault3);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet3);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet3);
    });
  }
});

// app/components/Icons/Logo.tsx
init_react();
function Logo({
  className,
  width = "100%"
}) {
  return /* @__PURE__ */ React.createElement(Link, {
    to: "/",
    "aria-label": "JSON Hero homepage",
    className: "w-40"
  }, /* @__PURE__ */ React.createElement("svg", {
    className,
    width,
    height: "50",
    viewBox: "0 0 263 36",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M94.8087 35.3033V1.39929H102.661L111.501 18.2473L114.829 25.7353H115.037C114.898 23.9326 114.707 21.922 114.465 19.7033C114.222 17.4846 114.101 15.37 114.101 13.3593V1.39929H121.381V35.3033H113.529L104.689 18.4033L101.361 11.0193H101.153C101.326 12.8913 101.517 14.902 101.725 17.0513C101.967 19.2006 102.089 21.2806 102.089 23.2913V35.3033H94.8087Z",
    fill: "white"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M73.0419 35.9273C69.9912 35.9273 67.3045 35.2166 64.9819 33.7953C62.6939 32.3739 60.8912 30.3459 59.5739 27.7113C58.2912 25.0419 57.6499 21.8699 57.6499 18.1953C57.6499 14.4859 58.2912 11.3486 59.5739 8.78327C60.8912 6.18327 62.6939 4.20727 64.9819 2.85527C67.3045 1.4686 69.9912 0.775269 73.0419 0.775269C76.0925 0.775269 78.7619 1.4686 81.0499 2.85527C83.3725 4.20727 85.1752 6.18327 86.4579 8.78327C87.7752 11.3833 88.4339 14.5206 88.4339 18.1953C88.4339 21.8699 87.7752 25.0419 86.4579 27.7113C85.1752 30.3459 83.3725 32.3739 81.0499 33.7953C78.7619 35.2166 76.0925 35.9273 73.0419 35.9273ZM73.0419 29.3233C75.3645 29.3233 77.2019 28.3179 78.5539 26.3073C79.9059 24.2966 80.5819 21.5926 80.5819 18.1953C80.5819 14.7979 79.9059 12.1459 78.5539 10.2393C77.2019 8.3326 75.3645 7.37927 73.0419 7.37927C70.7192 7.37927 68.8819 8.3326 67.5299 10.2393C66.1779 12.1459 65.5019 14.7979 65.5019 18.1953C65.5019 21.5926 66.1779 24.2966 67.5299 26.3073C68.8819 28.3179 70.7192 29.3233 73.0419 29.3233Z",
    fill: "white"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M40.7154 35.9273C38.4967 35.9273 36.278 35.5113 34.0593 34.6793C31.8753 33.8473 29.9167 32.6339 28.1833 31.0393L32.5513 25.7873C33.7647 26.8273 35.1167 27.6766 36.6073 28.3353C38.098 28.9939 39.5367 29.3233 40.9234 29.3233C42.518 29.3233 43.6967 29.0286 44.4594 28.4393C45.2567 27.8499 45.6553 27.0526 45.6553 26.0473C45.6553 24.9726 45.2047 24.1926 44.3034 23.7073C43.4367 23.1873 42.258 22.6153 40.7673 21.9913L36.3474 20.1193C35.2034 19.6339 34.1114 18.9926 33.0714 18.1953C32.0314 17.3633 31.182 16.3406 30.5233 15.1273C29.8647 13.9139 29.5354 12.4926 29.5354 10.8633C29.5354 8.99127 30.038 7.2926 31.0434 5.76727C32.0834 4.24193 33.5047 3.0286 35.3074 2.12727C37.1447 1.22594 39.242 0.775269 41.5993 0.775269C43.5407 0.775269 45.482 1.1566 47.4234 1.91927C49.3647 2.68194 51.0634 3.79127 52.5194 5.24727L48.6194 10.0833C47.51 9.2166 46.4007 8.55794 45.2914 8.10727C44.182 7.62194 42.9514 7.37927 41.5993 7.37927C40.282 7.37927 39.2247 7.6566 38.4273 8.21127C37.6647 8.73127 37.2834 9.4766 37.2834 10.4473C37.2834 11.4873 37.7687 12.2673 38.7393 12.7873C39.7447 13.3073 40.9754 13.8619 42.4314 14.4513L46.7994 16.2193C48.8447 17.0513 50.474 18.1953 51.6874 19.6513C52.9007 21.1073 53.5074 23.0313 53.5074 25.4233C53.5074 27.2953 53.0047 29.0286 51.9994 30.6233C50.994 32.2179 49.538 33.5006 47.6314 34.4713C45.7247 35.4419 43.4194 35.9273 40.7154 35.9273Z",
    fill: "white"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M11.6583 35.9273C9.09298 35.9273 6.92631 35.4246 5.15831 34.4193C3.39031 33.3793 1.91698 31.8366 0.738312 29.7913L5.93831 25.9433C6.56231 27.0873 7.29031 27.9366 8.12231 28.4913C8.95431 29.046 9.80365 29.3233 10.6703 29.3233C12.057 29.3233 13.097 28.9073 13.7903 28.0753C14.5183 27.2086 14.8823 25.6486 14.8823 23.3953V1.39929H22.5263V24.0193C22.5263 26.2033 22.145 28.1966 21.3823 29.9993C20.6196 31.802 19.4236 33.2406 17.7943 34.3153C16.1996 35.39 14.1543 35.9273 11.6583 35.9273Z",
    fill: "white"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M247.108 35.9273C244.058 35.9273 241.371 35.2166 239.048 33.7953C236.76 32.3739 234.958 30.3459 233.64 27.7113C232.358 25.0419 231.716 21.8699 231.716 18.1953C231.716 14.4859 232.358 11.3486 233.64 8.78327C234.958 6.18327 236.76 4.20727 239.048 2.85527C241.371 1.4686 244.058 0.775269 247.108 0.775269C250.159 0.775269 252.828 1.4686 255.116 2.85527C257.439 4.20727 259.242 6.18327 260.524 8.78327C261.842 11.3833 262.5 14.5206 262.5 18.1953C262.5 21.8699 261.842 25.0419 260.524 27.7113C259.242 30.3459 257.439 32.3739 255.116 33.7953C252.828 35.2166 250.159 35.9273 247.108 35.9273ZM247.108 29.3233C249.431 29.3233 251.268 28.3179 252.62 26.3073C253.972 24.2966 254.648 21.5926 254.648 18.1953C254.648 14.7979 253.972 12.1459 252.62 10.2393C251.268 8.3326 249.431 7.37927 247.108 7.37927C244.786 7.37927 242.948 8.3326 241.596 10.2393C240.244 12.1459 239.568 14.7979 239.568 18.1953C239.568 21.5926 240.244 24.2966 241.596 26.3073C242.948 28.3179 244.786 29.3233 247.108 29.3233Z",
    fill: "#BFF164"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M201.438 35.3033V1.39929H213.658C216.05 1.39929 218.234 1.72863 220.21 2.38729C222.186 3.01129 223.763 4.08596 224.942 5.61129C226.12 7.13663 226.71 9.25129 226.71 11.9553C226.71 14.4513 226.155 16.514 225.046 18.1433C223.971 19.738 222.515 20.934 220.678 21.7313L228.374 35.3033H219.794L213.294 23.0833H209.082V35.3033H201.438ZM209.082 16.9993H213.034C215.044 16.9993 216.57 16.5833 217.61 15.7513C218.684 14.8846 219.222 13.6193 219.222 11.9553C219.222 10.2913 218.684 9.12996 217.61 8.47129C216.57 7.81263 215.044 7.48329 213.034 7.48329H209.082V16.9993Z",
    fill: "#BFF164"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M172.949 35.3033V1.39929H194.165V7.84729H180.593V14.6593H192.137V21.0553H180.593V28.8553H194.685V35.3033H172.949Z",
    fill: "#BFF164"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M137.91 35.3033V1.39929H145.554V14.4513H157.254V1.39929H164.95V35.3033H157.254V21.1593H145.554V35.3033H137.91Z",
    fill: "#BFF164"
  })));
}

// app/components/Icons/DiscordIconTransparent.tsx
init_react();
function DiscordIconTransparent(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.9988 7.2591C18.0282 7.28536 18.0577 7.31177 18.0881 7.3374L18.0218 7.36224L17.9606 7.33243L16.6959 6.74099C16.1739 6.51049 15.6332 6.32264 15.0793 6.17936C14.4686 6.01806 13.8437 5.91322 13.2128 5.86625C13.1375 5.86085 13.0619 5.85498 12.9862 5.84911C12.7134 5.82793 12.4388 5.80661 12.1673 5.80661H11.6013L11.5799 5.80773C11.2095 5.82724 10.8342 5.84701 10.459 5.88114C10.0361 5.92083 9.61682 5.99062 9.20443 6.08991C8.59831 6.22081 8.00719 6.4106 7.43994 6.65647C7.07334 6.81278 6.71245 6.98304 6.35301 7.15262C6.23244 7.2095 6.11204 7.2663 5.99163 7.32248L5.92533 7.35229C5.9235 7.3484 5.92255 7.34415 5.92255 7.33986C5.92255 7.33557 5.9235 7.33135 5.92533 7.32745C5.97774 7.28469 6.02985 7.24194 6.08188 7.19925C6.24757 7.0633 6.41242 6.92803 6.58319 6.79565C6.9052 6.5574 7.24627 6.34465 7.60313 6.15946C8.01886 5.93729 8.45618 5.75584 8.90865 5.61774C9.08216 5.56598 9.25813 5.51901 9.43486 5.47184C9.51264 5.45108 9.59057 5.43027 9.6685 5.40901C9.7042 5.39907 9.7297 5.38415 9.7042 5.33942L9.5563 5.05115C9.55155 5.03575 9.54108 5.02265 9.52694 5.01438C9.51279 5.00611 9.49599 5.00328 9.47981 5.00643L8.91375 5.08594C8.30641 5.20075 7.71444 5.38251 7.14925 5.62769C6.63239 5.84893 6.1388 6.11857 5.67544 6.43284C5.56514 6.49137 5.46939 6.5728 5.39497 6.6714C5.14275 7.08178 4.91624 7.50667 4.71671 7.94374C4.42116 8.59033 4.16738 9.2543 3.95685 9.93176C3.7093 10.7244 3.51174 11.5311 3.36529 12.3472C3.28879 12.7647 3.2123 13.2468 3.1664 13.5947C3.13139 13.8601 3.10529 14.1225 3.07903 14.3865C3.07086 14.4686 3.06268 14.5509 3.05421 14.6335L3.00831 15.1653C2.99559 15.2131 2.9975 15.2635 3.01381 15.3103C3.03012 15.3571 3.06012 15.3983 3.10011 15.4287C3.12051 15.4386 3.14601 15.4784 3.14601 15.4784C3.48621 15.8365 3.86783 16.1551 4.28323 16.4277C4.76114 16.7382 5.27458 16.9934 5.81314 17.1881C6.28289 17.3621 6.76756 17.4952 7.26145 17.5857C7.59775 17.6511 7.93875 17.691 8.28138 17.705C8.30297 17.7076 8.3249 17.7044 8.34472 17.6956C8.36453 17.6868 8.38145 17.6729 8.39358 17.6553L8.98514 16.8899L9.02084 16.8352C8.35542 16.6099 7.72153 16.3044 7.13396 15.9257C6.54864 15.5462 6.01711 15.0934 5.55306 14.5788L5.93553 14.8372C6.523 15.2246 7.15233 15.5479 7.81221 15.8014C8.33068 16.002 8.86661 16.1567 9.41352 16.2636C9.80109 16.3332 10.1887 16.3879 10.5762 16.4376C10.9871 16.4897 11.4011 16.5146 11.8155 16.5121H12.3713H12.6671C13.6595 16.474 14.6422 16.3069 15.5892 16.0151C16.1728 15.8433 16.7354 15.61 17.267 15.3193C17.5426 15.1696 17.8062 15.0082 18.0719 14.8455C18.1061 14.8245 18.1404 14.8036 18.1748 14.7826C18.25 14.7372 18.3202 14.6869 18.3924 14.6351C18.423 14.6132 18.454 14.591 18.4859 14.5689C17.5548 15.6041 16.3606 16.3823 15.0232 16.8253V16.8551C15.2323 17.1334 15.4413 17.4068 15.6555 17.6751C15.6624 17.6831 15.671 17.6895 15.6807 17.6938C15.6904 17.6981 15.701 17.7002 15.7116 17.7H15.9564C16.3554 17.6711 16.7511 17.6096 17.1395 17.5161C17.8516 17.3558 18.5379 17.1017 19.1794 16.7606C19.8549 16.398 20.462 15.9257 20.9745 15.3641C20.9911 15.3425 21 15.3164 21 15.2895C20.9745 15.1702 20.9745 15.0559 20.9745 14.9366C20.9626 14.8173 20.9524 14.6975 20.9422 14.5776C20.9218 14.338 20.9014 14.0983 20.8674 13.8631C20.7909 13.2866 20.7042 12.715 20.5971 12.1435C20.3983 11.0742 20.1066 10.0234 19.7251 9.00236C19.4521 8.24545 19.1108 7.51363 18.7051 6.81552C18.6566 6.71764 18.5891 6.62989 18.5063 6.5571C18.3697 6.45094 18.2267 6.353 18.0779 6.26385C17.6502 5.99501 17.1998 5.76225 16.7316 5.56805C16.2896 5.3756 15.8281 5.229 15.3547 5.13069C15.1869 5.09676 15.0172 5.0724 14.848 5.04811C14.7445 5.03326 14.6412 5.01843 14.5387 5.00146C14.5198 4.99789 14.5003 5.00092 14.4835 5.01001C14.4667 5.0191 14.4538 5.03366 14.4469 5.05115C14.4163 5.12207 14.3712 5.207 14.3378 5.27016C14.3267 5.2911 14.3168 5.30965 14.3092 5.3245C14.2786 5.38414 14.2837 5.40901 14.35 5.40901C14.4686 5.44432 14.5872 5.47808 14.7056 5.51178C14.9538 5.58245 15.2013 5.6529 15.4464 5.73702C15.9516 5.90824 16.4342 6.13677 16.8846 6.41792C17.2269 6.63856 17.554 6.88097 17.8637 7.14356C17.9098 7.17954 17.9541 7.21915 17.9988 7.2591ZM8.6113 10.8093C8.82881 10.66 9.08643 10.5761 9.35232 10.5679C9.58046 10.563 9.80628 10.6135 10.0093 10.7151C10.2123 10.8166 10.3862 10.9659 10.515 11.1494C10.7096 11.4122 10.8196 11.7253 10.8312 12.049C10.8682 12.4886 10.7252 12.9245 10.4335 13.2617C10.3203 13.3979 10.1794 13.5097 10.0196 13.5901C9.85988 13.6705 9.68475 13.7178 9.50531 13.7289C9.31872 13.7467 9.13041 13.7238 8.95401 13.6619C8.77761 13.6 8.61754 13.5006 8.48538 13.371C8.19505 13.1024 8.01397 12.7406 7.97541 12.3522C7.93351 12.0296 7.98657 11.7022 8.12839 11.4079C8.2259 11.1667 8.39378 10.9586 8.6113 10.8093ZM15.8697 11.2787C16.0319 11.55 16.1148 11.8593 16.1094 12.1733C16.106 12.5571 15.9694 12.9284 15.7218 13.2269C15.5095 13.4978 15.1962 13.6764 14.8498 13.7239C14.6614 13.7501 14.4694 13.7342 14.2883 13.6773C14.1072 13.6205 13.9417 13.5243 13.8043 13.3959C13.4787 13.1023 13.2861 12.6947 13.2689 12.2627C13.2496 12.0419 13.2758 11.8196 13.3459 11.6088C13.4159 11.398 13.5285 11.203 13.6769 11.0351C13.793 10.8953 13.9388 10.7815 14.1043 10.7017C14.2698 10.6219 14.451 10.578 14.6356 10.5729C14.889 10.5632 15.14 10.6245 15.3587 10.7496C15.5775 10.8747 15.7548 11.0583 15.8697 11.2787Z",
    fill: "#F8FAFC"
  }));
}

// app/components/NewDocument.tsx
init_react();

// app/components/DragAndDropForm.tsx
init_react();
var import_react2 = __toESM(require_react());

// node_modules/react-dropzone/dist/es/index.js
init_react();
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/file-selector/dist/es5/index.js
init_react();

// node_modules/file-selector/dist/es5/file-selector.js
init_react();

// node_modules/file-selector/node_modules/tslib/modules/index.js
init_react();
var import_tslib = __toESM(require_tslib(), 1);
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet
} = import_tslib.default;

// node_modules/file-selector/dist/es5/file.js
init_react();
var COMMON_MIME_TYPES = /* @__PURE__ */ new Map([
  ["avi", "video/avi"],
  ["gif", "image/gif"],
  ["ico", "image/x-icon"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["mkv", "video/x-matroska"],
  ["mov", "video/quicktime"],
  ["mp4", "video/mp4"],
  ["pdf", "application/pdf"],
  ["png", "image/png"],
  ["zip", "application/zip"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
]);
function toFileWithPath(file, path) {
  var f3 = withMimeType(file);
  if (typeof f3.path !== "string") {
    var webkitRelativePath = file.webkitRelativePath;
    Object.defineProperty(f3, "path", {
      value: typeof path === "string" ? path : typeof webkitRelativePath === "string" && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
  return f3;
}
function withMimeType(file) {
  var name = file.name;
  var hasExtension = name && name.lastIndexOf(".") !== -1;
  if (hasExtension && !file.type) {
    var ext = name.split(".").pop().toLowerCase();
    var type = COMMON_MIME_TYPES.get(ext);
    if (type) {
      Object.defineProperty(file, "type", {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }
  return file;
}

// node_modules/file-selector/dist/es5/file-selector.js
var FILES_TO_IGNORE = [
  ".DS_Store",
  "Thumbs.db"
];
function fromEvent(evt) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, isDragEvt(evt) && evt.dataTransfer ? getDataTransferFiles(evt.dataTransfer, evt.type) : getInputFiles(evt)];
    });
  });
}
function isDragEvt(value) {
  return !!value.dataTransfer;
}
function getInputFiles(evt) {
  var files = isInput(evt.target) ? evt.target.files ? fromList(evt.target.files) : [] : [];
  return files.map(function(file) {
    return toFileWithPath(file);
  });
}
function isInput(value) {
  return value !== null;
}
function getDataTransferFiles(dt, type) {
  return __awaiter(this, void 0, void 0, function() {
    var items, files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!dt.items)
            return [3, 2];
          items = fromList(dt.items).filter(function(item) {
            return item.kind === "file";
          });
          if (type !== "drop") {
            return [2, items];
          }
          return [4, Promise.all(items.map(toFilePromises))];
        case 1:
          files = _a.sent();
          return [2, noIgnoredFiles(flatten(files))];
        case 2:
          return [2, noIgnoredFiles(fromList(dt.files).map(function(file) {
            return toFileWithPath(file);
          }))];
      }
    });
  });
}
function noIgnoredFiles(files) {
  return files.filter(function(file) {
    return FILES_TO_IGNORE.indexOf(file.name) === -1;
  });
}
function fromList(items) {
  var files = [];
  for (var i4 = 0; i4 < items.length; i4++) {
    var file = items[i4];
    files.push(file);
  }
  return files;
}
function toFilePromises(item) {
  if (typeof item.webkitGetAsEntry !== "function") {
    return fromDataTransferItem(item);
  }
  var entry = item.webkitGetAsEntry();
  if (entry && entry.isDirectory) {
    return fromDirEntry(entry);
  }
  return fromDataTransferItem(item);
}
function flatten(items) {
  return items.reduce(function(acc, files) {
    return __spread(acc, Array.isArray(files) ? flatten(files) : [files]);
  }, []);
}
function fromDataTransferItem(item) {
  var file = item.getAsFile();
  if (!file) {
    return Promise.reject(item + " is not a File");
  }
  var fwp = toFileWithPath(file);
  return Promise.resolve(fwp);
}
function fromEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
    });
  });
}
function fromDirEntry(entry) {
  var reader = entry.createReader();
  return new Promise(function(resolve, reject) {
    var entries = [];
    function readEntries() {
      var _this = this;
      reader.readEntries(function(batch) {
        return __awaiter(_this, void 0, void 0, function() {
          var files, err_1, items;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!!batch.length)
                  return [3, 5];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Promise.all(entries)];
              case 2:
                files = _a.sent();
                resolve(files);
                return [3, 4];
              case 3:
                err_1 = _a.sent();
                reject(err_1);
                return [3, 4];
              case 4:
                return [3, 6];
              case 5:
                items = Promise.all(batch.map(fromEntry));
                entries.push(items);
                readEntries();
                _a.label = 6;
              case 6:
                return [2];
            }
          });
        });
      }, function(err) {
        reject(err);
      });
    }
    readEntries();
  });
}
function fromFileEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, new Promise(function(resolve, reject) {
        entry.file(function(file) {
          var fwp = toFileWithPath(file, entry.fullPath);
          resolve(fwp);
        }, function(err) {
          reject(err);
        });
      })];
    });
  });
}

// node_modules/react-dropzone/dist/es/utils/index.js
init_react();
var import_attr_accept = __toESM(require_es());
function _slicedToArray(arr, i4) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i4) || _unsupportedIterableToArray(arr, i4) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o8, minLen) {
  if (!o8)
    return;
  if (typeof o8 === "string")
    return _arrayLikeToArray(o8, minLen);
  var n5 = Object.prototype.toString.call(o8).slice(8, -1);
  if (n5 === "Object" && o8.constructor)
    n5 = o8.constructor.name;
  if (n5 === "Map" || n5 === "Set")
    return Array.from(o8);
  if (n5 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n5))
    return _arrayLikeToArray(o8, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i4 = 0, arr2 = new Array(len); i4 < len; i4++) {
    arr2[i4] = arr[i4];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i4) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i4 && _arr.length === i4)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var FILE_INVALID_TYPE = "file-invalid-type";
var FILE_TOO_LARGE = "file-too-large";
var FILE_TOO_SMALL = "file-too-small";
var TOO_MANY_FILES = "too-many-files";
var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr2(accept) {
  accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
  var messageSuffix = Array.isArray(accept) ? "one of ".concat(accept.join(", ")) : accept;
  return {
    code: FILE_INVALID_TYPE,
    message: "File type must be ".concat(messageSuffix)
  };
};
var getTooLargeRejectionErr = function getTooLargeRejectionErr2(maxSize) {
  return {
    code: FILE_TOO_LARGE,
    message: "File is larger than ".concat(maxSize, " bytes")
  };
};
var getTooSmallRejectionErr = function getTooSmallRejectionErr2(minSize) {
  return {
    code: FILE_TOO_SMALL,
    message: "File is smaller than ".concat(minSize, " bytes")
  };
};
var TOO_MANY_FILES_REJECTION = {
  code: TOO_MANY_FILES,
  message: "Too many files"
};
function fileAccepted(file, accept) {
  var isAcceptable = file.type === "application/x-moz-file" || (0, import_attr_accept.default)(file, accept);
  return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize)
        return [false, getTooLargeRejectionErr(maxSize)];
      if (file.size < minSize)
        return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(minSize) && file.size < minSize)
      return [false, getTooSmallRejectionErr(minSize)];
    else if (isDefined(maxSize) && file.size > maxSize)
      return [false, getTooLargeRejectionErr(maxSize)];
  }
  return [true, null];
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function allFilesAccepted(_ref) {
  var files = _ref.files, accept = _ref.accept, minSize = _ref.minSize, maxSize = _ref.maxSize, multiple = _ref.multiple, maxFiles = _ref.maxFiles;
  if (!multiple && files.length > 1 || multiple && maxFiles >= 1 && files.length > maxFiles) {
    return false;
  }
  return files.every(function(file) {
    var _fileAccepted = fileAccepted(file, accept), _fileAccepted2 = _slicedToArray(_fileAccepted, 1), accepted = _fileAccepted2[0];
    var _fileMatchSize = fileMatchSize(file, minSize, maxSize), _fileMatchSize2 = _slicedToArray(_fileMatchSize, 1), sizeMatch = _fileMatchSize2[0];
    return accepted && sizeMatch;
  });
}
function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === "function") {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== "undefined") {
    return event.cancelBubble;
  }
  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  }
  return Array.prototype.some.call(event.dataTransfer.types, function(type) {
    return type === "Files" || type === "application/x-moz-file";
  });
}
function onDocumentDragOver(event) {
  event.preventDefault();
}
function isIe(userAgent) {
  return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}
function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1;
}
function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(function(fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return isPropagationStopped(event);
    });
  };
}

// node_modules/react-dropzone/dist/es/index.js
var _excluded = ["children"];
var _excluded2 = ["open"];
var _excluded3 = ["refKey", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"];
var _excluded4 = ["refKey", "onChange", "onClick"];
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray2(arr);
}
function _slicedToArray2(arr, i4) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i4) || _unsupportedIterableToArray2(arr, i4) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o8, minLen) {
  if (!o8)
    return;
  if (typeof o8 === "string")
    return _arrayLikeToArray2(o8, minLen);
  var n5 = Object.prototype.toString.call(o8).slice(8, -1);
  if (n5 === "Object" && o8.constructor)
    n5 = o8.constructor.name;
  if (n5 === "Map" || n5 === "Set")
    return Array.from(o8);
  if (n5 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n5))
    return _arrayLikeToArray2(o8, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i4 = 0, arr2 = new Array(len); i4 < len; i4++) {
    arr2[i4] = arr[i4];
  }
  return arr2;
}
function _iterableToArrayLimit2(arr, i4) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i4 && _arr.length === i4)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i4 = 1; i4 < arguments.length; i4++) {
    var source = arguments[i4] != null ? arguments[i4] : {};
    if (i4 % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i4;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i4 = 0; i4 < sourceSymbolKeys.length; i4++) {
      key = sourceSymbolKeys[i4];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i4;
  for (i4 = 0; i4 < sourceKeys.length; i4++) {
    key = sourceKeys[i4];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var Dropzone = /* @__PURE__ */ (0, import_react.forwardRef)(function(_ref, ref) {
  var children = _ref.children, params = _objectWithoutProperties(_ref, _excluded);
  var _useDropzone = useDropzone(params), open = _useDropzone.open, props = _objectWithoutProperties(_useDropzone, _excluded2);
  (0, import_react.useImperativeHandle)(ref, function() {
    return {
      open
    };
  }, [open]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, null, children(_objectSpread(_objectSpread({}, props), {}, {
    open
  })));
});
Dropzone.displayName = "Dropzone";
var defaultProps = {
  disabled: false,
  getFilesFromEvent: fromEvent,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
  maxFiles: 0,
  preventDropOnDocument: true,
  noClick: false,
  noKeyboard: false,
  noDrag: false,
  noDragEventsBubbling: false,
  validator: null
};
Dropzone.defaultProps = defaultProps;
Dropzone.propTypes = {
  children: import_prop_types.default.func,
  accept: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.arrayOf(import_prop_types.default.string)]),
  multiple: import_prop_types.default.bool,
  preventDropOnDocument: import_prop_types.default.bool,
  noClick: import_prop_types.default.bool,
  noKeyboard: import_prop_types.default.bool,
  noDrag: import_prop_types.default.bool,
  noDragEventsBubbling: import_prop_types.default.bool,
  minSize: import_prop_types.default.number,
  maxSize: import_prop_types.default.number,
  maxFiles: import_prop_types.default.number,
  disabled: import_prop_types.default.bool,
  getFilesFromEvent: import_prop_types.default.func,
  onFileDialogCancel: import_prop_types.default.func,
  onFileDialogOpen: import_prop_types.default.func,
  onDragEnter: import_prop_types.default.func,
  onDragLeave: import_prop_types.default.func,
  onDragOver: import_prop_types.default.func,
  onDrop: import_prop_types.default.func,
  onDropAccepted: import_prop_types.default.func,
  onDropRejected: import_prop_types.default.func,
  validator: import_prop_types.default.func
};
var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  draggedFiles: [],
  acceptedFiles: [],
  fileRejections: []
};
function useDropzone() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _defaultProps$options = _objectSpread(_objectSpread({}, defaultProps), options), accept = _defaultProps$options.accept, disabled = _defaultProps$options.disabled, getFilesFromEvent = _defaultProps$options.getFilesFromEvent, maxSize = _defaultProps$options.maxSize, minSize = _defaultProps$options.minSize, multiple = _defaultProps$options.multiple, maxFiles = _defaultProps$options.maxFiles, onDragEnter = _defaultProps$options.onDragEnter, onDragLeave = _defaultProps$options.onDragLeave, onDragOver = _defaultProps$options.onDragOver, onDrop = _defaultProps$options.onDrop, onDropAccepted = _defaultProps$options.onDropAccepted, onDropRejected = _defaultProps$options.onDropRejected, onFileDialogCancel = _defaultProps$options.onFileDialogCancel, onFileDialogOpen = _defaultProps$options.onFileDialogOpen, preventDropOnDocument = _defaultProps$options.preventDropOnDocument, noClick = _defaultProps$options.noClick, noKeyboard = _defaultProps$options.noKeyboard, noDrag = _defaultProps$options.noDrag, noDragEventsBubbling = _defaultProps$options.noDragEventsBubbling, validator = _defaultProps$options.validator;
  var rootRef = (0, import_react.useRef)(null);
  var inputRef = (0, import_react.useRef)(null);
  var _useReducer = (0, import_react.useReducer)(reducer, initialState), _useReducer2 = _slicedToArray2(_useReducer, 2), state = _useReducer2[0], dispatch = _useReducer2[1];
  var isFocused = state.isFocused, isFileDialogActive = state.isFileDialogActive, draggedFiles = state.draggedFiles;
  var openFileDialog = (0, import_react.useCallback)(function() {
    if (inputRef.current) {
      dispatch({
        type: "openDialog"
      });
      if (typeof onFileDialogOpen === "function") {
        onFileDialogOpen();
      }
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch, onFileDialogOpen]);
  var onWindowFocus = function onWindowFocus2() {
    if (isFileDialogActive) {
      setTimeout(function() {
        if (inputRef.current) {
          var files = inputRef.current.files;
          if (!files.length) {
            dispatch({
              type: "closeDialog"
            });
            if (typeof onFileDialogCancel === "function") {
              onFileDialogCancel();
            }
          }
        }
      }, 300);
    }
  };
  (0, import_react.useEffect)(function() {
    window.addEventListener("focus", onWindowFocus, false);
    return function() {
      window.removeEventListener("focus", onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancel]);
  var onKeyDownCb = (0, import_react.useCallback)(function(event) {
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }
    if (event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, inputRef, openFileDialog]);
  var onFocusCb = (0, import_react.useCallback)(function() {
    dispatch({
      type: "focus"
    });
  }, []);
  var onBlurCb = (0, import_react.useCallback)(function() {
    dispatch({
      type: "blur"
    });
  }, []);
  var onClickCb = (0, import_react.useCallback)(function() {
    if (noClick) {
      return;
    }
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [inputRef, noClick, openFileDialog]);
  var dragTargetsRef = (0, import_react.useRef)([]);
  var onDocumentDrop = function onDocumentDrop2(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      return;
    }
    event.preventDefault();
    dragTargetsRef.current = [];
  };
  (0, import_react.useEffect)(function() {
    if (preventDropOnDocument) {
      document.addEventListener("dragover", onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }
    return function() {
      if (preventDropOnDocument) {
        document.removeEventListener("dragover", onDocumentDragOver);
        document.removeEventListener("drop", onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]);
  var onDragEnterCb = (0, import_react.useCallback)(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(draggedFiles2) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        dispatch({
          draggedFiles: draggedFiles2,
          isDragActive: true,
          type: "setDraggedFiles"
        });
        if (onDragEnter) {
          onDragEnter(event);
        }
      });
    }
  }, [getFilesFromEvent, onDragEnter, noDragEventsBubbling]);
  var onDragOverCb = (0, import_react.useCallback)(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var hasFiles = isEvtWithFiles(event);
    if (hasFiles && event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch (_unused) {
      }
    }
    if (hasFiles && onDragOver) {
      onDragOver(event);
    }
    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = (0, import_react.useCallback)(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var targets = dragTargetsRef.current.filter(function(target) {
      return rootRef.current && rootRef.current.contains(target);
    });
    var targetIdx = targets.indexOf(event.target);
    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }
    dragTargetsRef.current = targets;
    if (targets.length > 0) {
      return;
    }
    dispatch({
      isDragActive: false,
      type: "setDraggedFiles",
      draggedFiles: []
    });
    if (isEvtWithFiles(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var onDropCb = (0, import_react.useCallback)(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        var acceptedFiles = [];
        var fileRejections = [];
        files.forEach(function(file) {
          var _fileAccepted = fileAccepted(file, accept), _fileAccepted2 = _slicedToArray2(_fileAccepted, 2), accepted = _fileAccepted2[0], acceptError = _fileAccepted2[1];
          var _fileMatchSize = fileMatchSize(file, minSize, maxSize), _fileMatchSize2 = _slicedToArray2(_fileMatchSize, 2), sizeMatch = _fileMatchSize2[0], sizeError = _fileMatchSize2[1];
          var customErrors = validator ? validator(file) : null;
          if (accepted && sizeMatch && !customErrors) {
            acceptedFiles.push(file);
          } else {
            var errors = [acceptError, sizeError];
            if (customErrors) {
              errors = errors.concat(customErrors);
            }
            fileRejections.push({
              file,
              errors: errors.filter(function(e9) {
                return e9;
              })
            });
          }
        });
        if (!multiple && acceptedFiles.length > 1 || multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles) {
          acceptedFiles.forEach(function(file) {
            fileRejections.push({
              file,
              errors: [TOO_MANY_FILES_REJECTION]
            });
          });
          acceptedFiles.splice(0);
        }
        dispatch({
          acceptedFiles,
          fileRejections,
          type: "setFiles"
        });
        if (onDrop) {
          onDrop(acceptedFiles, fileRejections, event);
        }
        if (fileRejections.length > 0 && onDropRejected) {
          onDropRejected(fileRejections, event);
        }
        if (acceptedFiles.length > 0 && onDropAccepted) {
          onDropAccepted(acceptedFiles, event);
        }
      });
    }
    dispatch({
      type: "reset"
    });
  }, [multiple, accept, minSize, maxSize, maxFiles, getFilesFromEvent, onDrop, onDropAccepted, onDropRejected, noDragEventsBubbling, validator]);
  var composeHandler = function composeHandler2(fn) {
    return disabled ? null : fn;
  };
  var composeKeyboardHandler = function composeKeyboardHandler2(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };
  var composeDragHandler = function composeDragHandler2(fn) {
    return noDrag ? null : composeHandler(fn);
  };
  var stopPropagation = function stopPropagation2(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };
  var getRootProps = (0, import_react.useMemo)(function() {
    return function() {
      var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$refKey = _ref2.refKey, refKey = _ref2$refKey === void 0 ? "ref" : _ref2$refKey, onKeyDown = _ref2.onKeyDown, onFocus = _ref2.onFocus, onBlur = _ref2.onBlur, onClick = _ref2.onClick, onDragEnter2 = _ref2.onDragEnter, onDragOver2 = _ref2.onDragOver, onDragLeave2 = _ref2.onDragLeave, onDrop2 = _ref2.onDrop, rest = _objectWithoutProperties(_ref2, _excluded3);
      return _objectSpread(_objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
        onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter2, onDragEnterCb)),
        onDragOver: composeDragHandler(composeEventHandlers(onDragOver2, onDragOverCb)),
        onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave2, onDragLeaveCb)),
        onDrop: composeDragHandler(composeEventHandlers(onDrop2, onDropCb))
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}), rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = (0, import_react.useCallback)(function(event) {
    event.stopPropagation();
  }, []);
  var getInputProps = (0, import_react.useMemo)(function() {
    return function() {
      var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, onChange = _ref3.onChange, onClick = _ref3.onClick, rest = _objectWithoutProperties(_ref3, _excluded4);
      var inputProps = _defineProperty({
        accept,
        multiple,
        type: "file",
        style: {
          display: "none"
        },
        onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
        autoComplete: "off",
        tabIndex: -1
      }, refKey, inputRef);
      return _objectSpread(_objectSpread({}, inputProps), rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  var fileCount = draggedFiles.length;
  var isDragAccept = fileCount > 0 && allFilesAccepted({
    files: draggedFiles,
    accept,
    minSize,
    maxSize,
    multiple,
    maxFiles
  });
  var isDragReject = fileCount > 0 && !isDragAccept;
  return _objectSpread(_objectSpread({}, state), {}, {
    isDragAccept,
    isDragReject,
    isFocused: isFocused && !disabled,
    getRootProps,
    getInputProps,
    rootRef,
    inputRef,
    open: composeHandler(openFileDialog)
  });
}
function reducer(state, action) {
  switch (action.type) {
    case "focus":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: true
      });
    case "blur":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: false
      });
    case "openDialog":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFileDialogActive: true
      });
    case "closeDialog":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFileDialogActive: false
      });
    case "setDraggedFiles":
      var isDragActive = action.isDragActive, draggedFiles = action.draggedFiles;
      return _objectSpread(_objectSpread({}, state), {}, {
        draggedFiles,
        isDragActive
      });
    case "setFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections
      });
    case "reset":
      return _objectSpread({}, initialState);
    default:
      return state;
  }
}

// app/components/DragAndDropForm.tsx
function DragAndDropForm() {
  const formRef = (0, import_react2.useRef)(null);
  const filenameInputRef = (0, import_react2.useRef)(null);
  const rawJsonInputRef = (0, import_react2.useRef)(null);
  const submit = useSubmit();
  const onDrop = (0, import_react2.useCallback)((acceptedFiles) => {
    if (!formRef.current || !filenameInputRef.current) {
      return;
    }
    if (acceptedFiles.length === 0) {
      return;
    }
    const firstFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      if (reader.result == null) {
        return;
      }
      let jsonValue = void 0;
      if (typeof reader.result === "string") {
        jsonValue = reader.result;
      } else {
        const decoder = new TextDecoder("utf-8");
        jsonValue = decoder.decode(reader.result);
      }
      invariant(rawJsonInputRef.current, "rawJsonInputRef is null");
      invariant(jsonValue, "jsonValue is undefined");
      rawJsonInputRef.current.value = jsonValue;
      submit(formRef.current);
    };
    reader.readAsArrayBuffer(firstFile);
    filenameInputRef.current.value = firstFile.name;
  }, [formRef.current, filenameInputRef.current, rawJsonInputRef.current]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    multiple: false,
    accept: "application/json"
  });
  return /* @__PURE__ */ React.createElement(Form, {
    method: "post",
    action: "/actions/createFromFile",
    ref: formRef
  }, /* @__PURE__ */ React.createElement("div", {
    ...getRootProps(),
    className: "block min-w-[300px] cursor-pointer rounded-md border-2 border-dashed border-slate-600 bg-slate-900/40 p-4 text-base text-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
  }, /* @__PURE__ */ React.createElement("input", {
    ...getInputProps()
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(ArrowCircleDownIcon_default, {
    className: `mr-3 inline h-6 w-6 ${isDragActive ? "text-lime-500" : ""}`
  }), /* @__PURE__ */ React.createElement("p", {
    className: `${isDragActive ? "text-lime-500" : ""}`
  }, isDragActive ? "Now drop to open it\u2026" : "Drop a JSON file here, or click to select")), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "filename",
    ref: filenameInputRef
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "rawJson",
    ref: rawJsonInputRef
  })));
}

// app/components/SampleUrls.tsx
init_react();

// app/components/ExampleDoc.tsx
init_react();
function ExampleDoc({
  id,
  title,
  path
}) {
  return /* @__PURE__ */ React.createElement(Link, {
    to: `/j/${id}${path ? `?path=${path}` : ""}`,
    className: "bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
  }, title);
}

// app/components/SampleUrls.tsx
function SampleUrls() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-start flex-wrap gap-2"
  }, /* @__PURE__ */ React.createElement(ExampleDoc, {
    id: "d9udW60cLOok",
    title: "Tweet JSON",
    path: "data.0.entities.urls.0.expanded_url"
  }), /* @__PURE__ */ React.createElement(ExampleDoc, {
    id: "PjHo1o5MVeH4",
    title: "Github API"
  }), /* @__PURE__ */ React.createElement(ExampleDoc, {
    id: "XKqIsPgCssUN",
    title: "Airtable API",
    path: "records.3.createdTime"
  }), /* @__PURE__ */ React.createElement(ExampleDoc, {
    id: "bSc7r1Ta0fED",
    title: "Unsplash API",
    path: "4.urls.regular"
  }));
}

// app/components/UrlForm.tsx
init_react();
var import_react3 = __toESM(require_react());
function UrlForm({ className }) {
  const transition = useTransition();
  const [inputValue, setInputValue] = (0, import_react3.useState)("");
  const isNotIdle = transition.state !== "idle";
  const isButtonDisabled = !inputValue.length || isNotIdle;
  return /* @__PURE__ */ React.createElement(Form, {
    method: "post",
    action: "/actions/createFromUrl",
    className: `${className}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "jsonUrl",
    id: "jsonUrl",
    className: "block flex-grow text-base text-slate-200 placeholder:text-slate-300 bg-slate-900/40 border border-slate-600 rounded-l-sm py-2 px-3 transition duration-300 focus:ring-indigo-500 focus:border-indigo-500",
    placeholder: "Enter a JSON URL or paste in JSON here...",
    value: inputValue,
    onChange: (event) => setInputValue(event.target.value)
  }), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    value: "Go",
    className: `inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-r-sm text-white bg-lime-500 transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 ${isButtonDisabled && "disabled:opacity-50 disabled:hover:bg-lime-500"}`,
    disabled: isButtonDisabled
  }, isNotIdle ? "..." : "Go")));
}

// app/components/NewDocument.tsx
function NewDocument() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bg-indigo-700 text-white rounded-sm shadow-md w-96 max-w-max p-3 transition"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement(UrlForm, {
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement(DragAndDropForm, null), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "mb-2 text-slate-200"
  }, "No JSON? Try it out:"), /* @__PURE__ */ React.createElement(SampleUrls, null))));
}

// app/components/UI/GithubStar.tsx
init_react();

// app/utilities/formatStarCount.ts
init_react();
function formatStarCount(count) {
  if (count === void 0) {
    return "\u2B50\uFE0F";
  }
  if (count < 1e3) {
    return count.toString();
  }
  return `${roundWithPrecision(count / 1e3, 1)}k`;
}
function roundWithPrecision(value, precision) {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

// app/components/Icons/GithubIconSimple.tsx
init_react();
function GithubIconSimple({ className }) {
  return /* @__PURE__ */ React.createElement("svg", {
    className,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("g", {
    clipPath: "url(#clip0_571_3822)"
  }, /* @__PURE__ */ React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 0C5.37017 0 0 5.50708 0 12.306C0 17.745 3.44015 22.3532 8.20626 23.9849C8.80295 24.0982 9.02394 23.7205 9.02394 23.3881C9.02394 23.0935 9.01657 22.3229 9.00921 21.2956C5.67219 22.0359 4.96501 19.6487 4.96501 19.6487C4.41989 18.2285 3.63168 17.8508 3.63168 17.8508C2.54144 17.0878 3.71271 17.1029 3.71271 17.1029C4.91344 17.1936 5.55433 18.372 5.55433 18.372C6.62247 20.2531 8.36096 19.7092 9.04604 19.3919C9.15654 18.5987 9.46593 18.0548 9.80479 17.745C7.13812 17.4353 4.33886 16.3777 4.33886 11.6638C4.33886 10.3192 4.80295 9.2238 5.57643 8.36261C5.4512 8.05288 5.03867 6.79887 5.69429 5.1067C5.69429 5.1067 6.7035 4.77432 8.99447 6.36827C9.95212 6.09632 10.9761 5.96034 12 5.95279C13.0166 5.95279 14.0479 6.09632 15.0055 6.36827C17.2965 4.77432 18.3057 5.1067 18.3057 5.1067C18.9613 6.79887 18.5488 8.05288 18.4236 8.36261C19.1897 9.2238 19.6538 10.3192 19.6538 11.6638C19.6538 16.3928 16.8471 17.4278 14.1731 17.7375C14.6004 18.1152 14.9908 18.8706 14.9908 20.0189C14.9908 21.6657 14.9761 22.9877 14.9761 23.3957C14.9761 23.728 15.1897 24.1058 15.8011 23.9849C20.5672 22.3532 24 17.745 24 12.3135C24 5.50708 18.6298 0 12 0Z",
    fill: "currentColor"
  })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
    id: "clip0_571_3822"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "24",
    height: "24",
    fill: "white"
  }))));
}

// app/components/UI/GithubStar.tsx
function GithubStar({ className }) {
  const starCount = useStarCount();
  return /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/triggerdotdev/jsonhero-web",
    target: "_blank",
    className: "flex text-slate-700 opacity-90 transition hover:cursor-pointer hover:opacity-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1 pr-2 pl-1 py-1 bg-slate-300 rounded-l"
  }, /* @__PURE__ */ React.createElement(GithubIconSimple, {
    className: "w-4 h-4 ml-1"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "font-semibold text-slate-800 hidden md:block"
  }, "Star")), starCount && /* @__PURE__ */ React.createElement("div", {
    className: "px-2 py-1 border-l border-slate-400 bg-slate-100 rounded-r"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "font-bold"
  }, formatStarCount(starCount))));
}

// app/components/UI/Popover.tsx
init_react();

// node_modules/@radix-ui/react-popover/dist/index.module.js
init_react();

// node_modules/aria-hidden/dist/es2015/index.js
init_react();
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (parentNode === void 0) {
    parentNode = getDefaultParent(originalTarget);
  }
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.isArray(originalTarget) ? originalTarget : [originalTarget];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || targets.indexOf(parent) >= 0) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        var attr = node.getAttribute("aria-hidden");
        var alreadyHidden = attr !== null && attr !== "false";
        var counterValue = (counterMap.get(node) || 0) + 1;
        var markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenNodes.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledNodes.set(node, true);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "true");
        }
        if (!alreadyHidden) {
          node.setAttribute("aria-hidden", "true");
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute("aria-hidden");
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};

// node_modules/react-remove-scroll/dist/es2015/index.js
init_react();

// node_modules/react-remove-scroll/dist/es2015/Combination.js
init_react();

// node_modules/tslib/modules/index.js
init_react();
var import_tslib3 = __toESM(require_tslib2(), 1);
var {
  __extends: __extends2,
  __assign: __assign2,
  __rest: __rest2,
  __decorate: __decorate2,
  __param: __param2,
  __metadata: __metadata2,
  __awaiter: __awaiter2,
  __generator: __generator2,
  __exportStar: __exportStar2,
  __createBinding: __createBinding2,
  __values: __values2,
  __read: __read2,
  __spread: __spread2,
  __spreadArrays: __spreadArrays2,
  __await: __await2,
  __asyncGenerator: __asyncGenerator2,
  __asyncDelegator: __asyncDelegator2,
  __asyncValues: __asyncValues2,
  __makeTemplateObject: __makeTemplateObject2,
  __importStar: __importStar2,
  __importDefault: __importDefault2,
  __classPrivateFieldGet: __classPrivateFieldGet2,
  __classPrivateFieldSet: __classPrivateFieldSet2
} = import_tslib3.default;

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var React8 = __toESM(require_react());

// node_modules/react-remove-scroll/dist/es2015/UI.js
init_react();
var React4 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
init_react();
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// node_modules/react-remove-scroll/dist/es2015/medium.js
init_react();

// node_modules/use-sidecar/dist/es2015/index.js
init_react();

// node_modules/use-sidecar/dist/es2015/medium.js
init_react();
function ItoI(a3) {
  return a3;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x2) {
          return x2 !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x2) {
          return cb(x2);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x2) {
          pendingQueue.push(x2);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign2({ async: true, ssr: false }, options);
  return medium;
}

// node_modules/use-sidecar/dist/es2015/exports.js
init_react();
var React3 = __toESM(require_react());
var SideCar = function(_a) {
  var sideCar = _a.sideCar, rest = __rest2(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React3.createElement(Target, __assign2({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// node_modules/use-callback-ref/dist/es2015/index.js
init_react();

// node_modules/use-callback-ref/dist/es2015/assignRef.js
init_react();
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// node_modules/use-callback-ref/dist/es2015/useRef.js
init_react();
var import_react4 = __toESM(require_react());
function useCallbackRef(initialValue, callback) {
  var ref = (0, import_react4.useState)(function() {
    return {
      value: initialValue,
      callback,
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
init_react();
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef(defaultValue, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
}

// node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {
  return;
};
var RemoveScroll = React4.forwardRef(function(props, parentRef) {
  var ref = React4.useRef(null);
  var _a = React4.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, rest = __rest2(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([
    ref,
    parentRef
  ]);
  var containerProps = __assign2({}, rest, callbacks);
  return React4.createElement(React4.Fragment, null, enabled && React4.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref }), forwardProps ? React4.cloneElement(React4.Children.only(children), __assign2({}, containerProps, { ref: containerRef })) : React4.createElement(Container, __assign2({}, containerProps, { className, ref: containerRef }), children));
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
init_react();

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
init_react();
var React7 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/index.js
init_react();

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
init_react();
var React6 = __toESM(require_react());

// node_modules/react-style-singleton/dist/es2015/index.js
init_react();

// node_modules/react-style-singleton/dist/es2015/component.js
init_react();

// node_modules/react-style-singleton/dist/es2015/hook.js
init_react();
var React5 = __toESM(require_react());

// node_modules/react-style-singleton/dist/es2015/singleton.js
init_react();

// node_modules/get-nonce/dist/es2015/index.js
init_react();
var currentNonce;
var getNonce = function() {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};

// node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};

// node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles) {
    React5.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, []);
  };
};

// node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles = _a.styles;
    useStyle(styles);
    return null;
  };
  return Sheet;
};

// node_modules/react-remove-scroll-bar/dist/es2015/utils.js
init_react();
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x2) {
  return parseInt(x2 || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [
    parse(left),
    parse(top),
    parse(right)
  ];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  ." + noScrollbarsClassName + " {\n   overflow: hidden " + important + ";\n   padding-right: " + gap + "px " + important + ";\n  }\n  body {\n    overflow: hidden " + important + ";\n    " + [
    allowRelative && "position: relative " + important + ";",
    gapMode === "margin" && "\n    padding-left: " + left + "px;\n    padding-top: " + top + "px;\n    padding-right: " + right + "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: " + gap + "px " + important + ";\n    ",
    gapMode === "padding" && "padding-right: " + gap + "px " + important + ";"
  ].filter(Boolean).join("") + "\n  }\n  \n  ." + zeroRightClassName + " {\n    right: " + gap + "px " + important + ";\n  }\n  \n  ." + fullWidthClassName + " {\n    margin-right: " + gap + "px " + important + ";\n  }\n  \n  ." + zeroRightClassName + " ." + zeroRightClassName + " {\n    right: 0 " + important + ";\n  }\n  \n  ." + fullWidthClassName + " ." + fullWidthClassName + " {\n    margin-right: 0 " + important + ";\n  }\n  \n  body {\n    " + removedBarSizeVariable + ": " + gap + "px;\n  }\n";
};
var RemoveScrollBar = function(props) {
  var _a = React6.useState(getGapWidth(props.gapMode)), gap = _a[0], setGap = _a[1];
  React6.useEffect(function() {
    setGap(getGapWidth(props.gapMode));
  }, [props.gapMode]);
  var noRelative = props.noRelative, noImportant = props.noImportant, _b = props.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  return React6.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};

// node_modules/react-remove-scroll/dist/es2015/handleScroll.js
init_react();
var elementCouldBeVScrolled = function(node) {
  var styles = window.getComputedStyle(node);
  return styles.overflowY !== "hidden" && !(styles.overflowY === styles.overflowX && styles.overflowY === "visible");
};
var elementCouldBeHScrolled = function(node) {
  var styles = window.getComputedStyle(node);
  if (node.type === "range") {
    return true;
  }
  return styles.overflowX !== "hidden" && !(styles.overflowY === styles.overflowX && styles.overflowX === "visible");
};
var locationCouldBeScrolled = function(axis, node) {
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), s4 = _a[1], d4 = _a[2];
      if (s4 > d4) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
  if (isDeltaPositive && (noOverscroll && availableScroll === 0 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && availableScrollTop === 0 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
init_react();
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x2, y) {
  return x2[0] === y[0] && x2[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-" + id + " {pointer-events: none;}\n  .allow-interactivity-" + id + " {pointer-events: all;}\n";
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React7.useRef([]);
  var touchStartRef = React7.useRef([0, 0]);
  var activeAxis = React7.useRef();
  var id = React7.useState(idCounter++)[0];
  var Style2 = React7.useState(function() {
    return styleSingleton();
  })[0];
  var lastProps = React7.useRef(props);
  React7.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React7.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-" + id);
      var allow_1 = [
        props.lockRef.current
      ].concat((props.shards || []).map(extractRef)).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-" + id);
      });
      return function() {
        document.body.classList.remove("block-interactivity-" + id);
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-" + id);
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React7.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React7.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e9) {
      return e9.name === event.type && e9.target === event.target && deltaCompare(e9.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        event.preventDefault();
      }
    }
  }, []);
  var shouldCancel = React7.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e9) {
        return e9 !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React7.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React7.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React7.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React7.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React7.createElement(React7.Fragment, null, inert ? React7.createElement(Style2, { styles: generateStyle(id) }) : null, removeScrollBar ? React7.createElement(RemoveScrollBar, { gapMode: "margin" }) : null);
}

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React8.forwardRef(function(props, ref) {
  return React8.createElement(RemoveScroll, __assign2({}, props, { ref, sideCar: sidecar_default }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// node_modules/@radix-ui/react-id/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js
init_react();
var o = __toESM(require_react());
var useLayoutEffect2 = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? o.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-id/dist/index.module.js
var e = __toESM(require_react());
var r = e["useId".toString()] || (() => {
});
var n = 0;
function useId(o8) {
  const [u3, i4] = e.useState(r());
  return useLayoutEffect2(() => {
    o8 || i4((t10) => t10 != null ? t10 : String(n++));
  }, [o8]), o8 || (u3 ? `radix-${u3}` : "");
}

// node_modules/@radix-ui/react-primitive/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-slot/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-compose-refs/dist/index.module.js
init_react();
var o2 = __toESM(require_react());
function composeRefs(...o8) {
  return (e9) => o8.forEach((o9) => function(o10, e10) {
    typeof o10 == "function" ? o10(e10) : o10 != null && (o10.current = e10);
  }(o9, e9));
}
function useComposedRefs(...e9) {
  return o2.useCallback(composeRefs(...e9), e9);
}

// node_modules/@radix-ui/react-slot/dist/index.module.js
var t = __toESM(require_react());
var Slot = /* @__PURE__ */ t.forwardRef((e9, o8) => {
  const { children: a3, ...s4 } = e9;
  return t.Children.toArray(a3).some(l) ? /* @__PURE__ */ t.createElement(t.Fragment, null, t.Children.map(a3, (e10) => l(e10) ? /* @__PURE__ */ t.createElement(n2, _extends({}, s4, { ref: o8 }), e10.props.children) : e10)) : /* @__PURE__ */ t.createElement(n2, _extends({}, s4, { ref: o8 }), a3);
});
Slot.displayName = "Slot";
var n2 = /* @__PURE__ */ t.forwardRef((r9, n5) => {
  const { children: l3, ...a3 } = r9;
  return t.isValidElement(l3) ? /* @__PURE__ */ t.cloneElement(l3, { ...o3(a3, l3.props), ref: composeRefs(n5, l3.ref) }) : t.Children.count(l3) > 1 ? t.Children.only(null) : null;
});
n2.displayName = "SlotClone";
var Slottable = ({ children: e9 }) => /* @__PURE__ */ t.createElement(t.Fragment, null, e9);
function l(e9) {
  return t.isValidElement(e9) && e9.type === Slottable;
}
function o3(e9, t10) {
  const r9 = { ...t10 };
  for (const n5 in t10) {
    const l3 = e9[n5], o8 = t10[n5];
    /^on[A-Z]/.test(n5) ? r9[n5] = (...e10) => {
      o8 == null || o8(...e10), l3 == null || l3(...e10);
    } : n5 === "style" ? r9[n5] = { ...l3, ...o8 } : n5 === "className" && (r9[n5] = [l3, o8].filter(Boolean).join(" "));
  }
  return { ...e9, ...r9 };
}

// node_modules/@radix-ui/react-primitive/dist/index.module.js
var r2 = __toESM(require_react());
var Primitive = ["a", "button", "div", "h2", "h3", "img", "li", "nav", "ol", "p", "span", "svg", "ul"].reduce((o8, i4) => ({ ...o8, [i4]: /* @__PURE__ */ r2.forwardRef((o9, m2) => {
  const { asChild: a3, ...s4 } = o9, n5 = a3 ? Slot : i4;
  return r2.useEffect(() => {
    window[Symbol.for("radix-ui")] = true;
  }, []), /* @__PURE__ */ r2.createElement(n5, _extends({}, s4, { ref: m2 }));
}) }), {});

// node_modules/@radix-ui/react-presence/dist/index.module.js
init_react();
var t2 = __toESM(require_react());
var Presence = (u3) => {
  const { present: o8, children: i4 } = u3, s4 = function(n5) {
    const [u4, o9] = t2.useState(), i5 = t2.useRef({}), s5 = t2.useRef(n5), c6 = t2.useRef("none"), a4 = n5 ? "mounted" : "unmounted", [d4, m2] = function(e9, n6) {
      return t2.useReducer((e10, t10) => {
        const r9 = n6[e10][t10];
        return r9 != null ? r9 : e10;
      }, e9);
    }(a4, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
    return t2.useEffect(() => {
      const e9 = r3(i5.current);
      c6.current = d4 === "mounted" ? e9 : "none";
    }, [d4]), useLayoutEffect2(() => {
      const e9 = i5.current, t10 = s5.current;
      if (t10 !== n5) {
        const u5 = c6.current, o10 = r3(e9);
        if (n5)
          m2("MOUNT");
        else if (o10 === "none" || (e9 == null ? void 0 : e9.display) === "none")
          m2("UNMOUNT");
        else {
          const e10 = u5 !== o10;
          m2(t10 && e10 ? "ANIMATION_OUT" : "UNMOUNT");
        }
        s5.current = n5;
      }
    }, [n5, m2]), useLayoutEffect2(() => {
      if (u4) {
        const e9 = (e10) => {
          const n7 = r3(i5.current).includes(e10.animationName);
          e10.target === u4 && n7 && m2("ANIMATION_END");
        }, n6 = (e10) => {
          e10.target === u4 && (c6.current = r3(i5.current));
        };
        return u4.addEventListener("animationstart", n6), u4.addEventListener("animationcancel", e9), u4.addEventListener("animationend", e9), () => {
          u4.removeEventListener("animationstart", n6), u4.removeEventListener("animationcancel", e9), u4.removeEventListener("animationend", e9);
        };
      }
      m2("ANIMATION_END");
    }, [u4, m2]), { isPresent: ["mounted", "unmountSuspended"].includes(d4), ref: t2.useCallback((e9) => {
      e9 && (i5.current = getComputedStyle(e9)), o9(e9);
    }, []) };
  }(o8), c5 = typeof i4 == "function" ? i4({ present: s4.isPresent }) : t2.Children.only(i4), a3 = useComposedRefs(s4.ref, c5.ref);
  return typeof i4 == "function" || s4.isPresent ? /* @__PURE__ */ t2.cloneElement(c5, { ref: a3 }) : null;
};
function r3(e9) {
  return (e9 == null ? void 0 : e9.animationName) || "none";
}
Presence.displayName = "Presence";

// node_modules/@radix-ui/react-focus-guards/dist/index.module.js
init_react();
var e2 = __toESM(require_react());
var t3 = 0;
function useFocusGuards() {
  e2.useEffect(() => {
    var e9, n5;
    const r9 = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", (e9 = r9[0]) !== null && e9 !== void 0 ? e9 : o4()), document.body.insertAdjacentElement("beforeend", (n5 = r9[1]) !== null && n5 !== void 0 ? n5 : o4()), t3++, () => {
      t3 === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e10) => e10.remove()), t3--;
    };
  }, []);
}
function o4() {
  const e9 = document.createElement("span");
  return e9.setAttribute("data-radix-focus-guard", ""), e9.tabIndex = 0, e9.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e9;
}

// node_modules/@radix-ui/react-portal/dist/index.module.js
init_react();
var import_react_dom = __toESM(require_react_dom());
var r4 = __toESM(require_react());
var Portal = /* @__PURE__ */ r4.forwardRef((a3, i4) => {
  var n5, d4;
  const { containerRef: s4, style: u3, ...c5 } = a3, m2 = (n5 = s4 == null ? void 0 : s4.current) !== null && n5 !== void 0 ? n5 : globalThis === null || globalThis === void 0 || (d4 = globalThis.document) === null || d4 === void 0 ? void 0 : d4.body, [, f3] = r4.useState({});
  return useLayoutEffect2(() => {
    f3({});
  }, []), m2 ? /* @__PURE__ */ import_react_dom.default.createPortal(/* @__PURE__ */ r4.createElement(Primitive.div, _extends({ "data-radix-portal": "" }, c5, { ref: i4, style: m2 === document.body ? { position: "absolute", top: 0, left: 0, zIndex: 2147483647, ...u3 } : void 0 })), m2) : null;
});
var UnstablePortal = /* @__PURE__ */ r4.forwardRef((t10, a3) => {
  var i4;
  const { container: n5 = globalThis === null || globalThis === void 0 || (i4 = globalThis.document) === null || i4 === void 0 ? void 0 : i4.body, ...d4 } = t10;
  return n5 ? /* @__PURE__ */ import_react_dom.default.createPortal(/* @__PURE__ */ r4.createElement(Primitive.div, _extends({}, d4, { ref: a3 })), n5) : null;
});

// node_modules/@radix-ui/react-focus-scope/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js
init_react();
var e4 = __toESM(require_react());
function useCallbackRef2(r9) {
  const t10 = e4.useRef(r9);
  return e4.useEffect(() => {
    t10.current = r9;
  }), e4.useMemo(() => (...e9) => {
    var r10;
    return (r10 = t10.current) === null || r10 === void 0 ? void 0 : r10.call(t10, ...e9);
  }, []);
}

// node_modules/@radix-ui/react-focus-scope/dist/index.module.js
var o5 = __toESM(require_react());
var c = { bubbles: false, cancelable: true };
var FocusScope = /* @__PURE__ */ o5.forwardRef((i4, f3) => {
  const { loop: l3 = false, trapped: m2 = false, onMountAutoFocus: p2, onUnmountAutoFocus: v2, ...E2 } = i4, [F, S] = o5.useState(null), b = useCallbackRef2(p2), T = useCallbackRef2(v2), y = o5.useRef(null), L = useComposedRefs(f3, (e9) => S(e9)), h2 = o5.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  o5.useEffect(() => {
    if (m2) {
      let e9 = function(e10) {
        if (h2.paused || !F)
          return;
        const t11 = e10.target;
        F.contains(t11) ? y.current = t11 : a(y.current, { select: true });
      }, t10 = function(e10) {
        !h2.paused && F && (F.contains(e10.relatedTarget) || a(y.current, { select: true }));
      };
      return document.addEventListener("focusin", e9), document.addEventListener("focusout", t10), () => {
        document.removeEventListener("focusin", e9), document.removeEventListener("focusout", t10);
      };
    }
  }, [m2, F, h2.paused]), o5.useEffect(() => {
    if (F) {
      d.add(h2);
      const t10 = document.activeElement;
      if (!F.contains(t10)) {
        const n5 = new Event("focusScope.autoFocusOnMount", c);
        F.addEventListener("focusScope.autoFocusOnMount", b), F.dispatchEvent(n5), n5.defaultPrevented || (!function(e10, { select: t11 = false } = {}) {
          const n6 = document.activeElement;
          for (const o8 of e10)
            if (a(o8, { select: t11 }), document.activeElement !== n6)
              return;
        }((e9 = r5(F), e9.filter((e10) => e10.tagName !== "A")), { select: true }), document.activeElement === t10 && a(F));
      }
      return () => {
        F.removeEventListener("focusScope.autoFocusOnMount", b), setTimeout(() => {
          const e10 = new Event("focusScope.autoFocusOnUnmount", c);
          F.addEventListener("focusScope.autoFocusOnUnmount", T), F.dispatchEvent(e10), e10.defaultPrevented || a(t10 != null ? t10 : document.body, { select: true }), F.removeEventListener("focusScope.autoFocusOnUnmount", T), d.remove(h2);
        }, 0);
      };
    }
    var e9;
  }, [F, b, T, h2]);
  const N = o5.useCallback((e9) => {
    if (!l3 && !m2)
      return;
    if (h2.paused)
      return;
    const t10 = e9.key === "Tab" && !e9.altKey && !e9.ctrlKey && !e9.metaKey, n5 = document.activeElement;
    if (t10 && n5) {
      const t11 = e9.currentTarget, [o8, u3] = function(e10) {
        const t12 = r5(e10), n6 = s(t12, e10), o9 = s(t12.reverse(), e10);
        return [n6, o9];
      }(t11);
      o8 && u3 ? e9.shiftKey || n5 !== u3 ? e9.shiftKey && n5 === o8 && (e9.preventDefault(), l3 && a(u3, { select: true })) : (e9.preventDefault(), l3 && a(o8, { select: true })) : n5 === t11 && e9.preventDefault();
    }
  }, [l3, m2, h2.paused]);
  return o5.createElement(Primitive.div, _extends({ tabIndex: -1 }, E2, { ref: L, onKeyDown: N }));
});
function r5(e9) {
  const t10 = [], n5 = document.createTreeWalker(e9, NodeFilter.SHOW_ELEMENT, { acceptNode: (e10) => {
    const t11 = e10.tagName === "INPUT" && e10.type === "hidden";
    return e10.disabled || e10.hidden || t11 ? NodeFilter.FILTER_SKIP : e10.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n5.nextNode(); )
    t10.push(n5.currentNode);
  return t10;
}
function s(e9, t10) {
  for (const n5 of e9)
    if (!i(n5, { upTo: t10 }))
      return n5;
}
function i(e9, { upTo: t10 }) {
  if (getComputedStyle(e9).visibility === "hidden")
    return true;
  for (; e9; ) {
    if (t10 !== void 0 && e9 === t10)
      return false;
    if (getComputedStyle(e9).display === "none")
      return true;
    e9 = e9.parentElement;
  }
  return false;
}
function a(e9, { select: t10 = false } = {}) {
  if (e9 && e9.focus) {
    const n5 = document.activeElement;
    e9.focus({ preventScroll: true }), e9 !== n5 && function(e10) {
      return e10 instanceof HTMLInputElement && "select" in e10;
    }(e9) && t10 && e9.select();
  }
}
var d = function() {
  let e9 = [];
  return { add(t10) {
    const n5 = e9[0];
    t10 !== n5 && (n5 == null || n5.pause()), e9 = f(e9, t10), e9.unshift(t10);
  }, remove(t10) {
    var n5;
    e9 = f(e9, t10), (n5 = e9[0]) === null || n5 === void 0 || n5.resume();
  } };
}();
function f(e9, t10) {
  const n5 = [...e9], o8 = n5.indexOf(t10);
  return o8 !== -1 && n5.splice(o8, 1), n5;
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-use-escape-keydown/dist/index.module.js
init_react();
var t4 = __toESM(require_react());
function useEscapeKeydown(n5) {
  const o8 = useCallbackRef2(n5);
  t4.useEffect(() => {
    const e9 = (e10) => {
      e10.key === "Escape" && o8(e10);
    };
    return document.addEventListener("keydown", e9), () => document.removeEventListener("keydown", e9);
  }, [o8]);
}

// node_modules/@radix-ui/react-use-body-pointer-events/dist/index.module.js
init_react();
var t5 = __toESM(require_react());
var n3;
var o6 = 0;
function useBodyPointerEvents({ disabled: r9 }) {
  const u3 = t5.useRef(false), c5 = t5.useRef(false);
  t5.useEffect(() => {
    const e9 = (e10) => {
      const t11 = e10.pointerType === "mouse";
      u3.current = !t11, c5.current = t11 && e10.button === 0;
    }, t10 = () => {
      u3.current = false, c5.current = false;
    };
    return document.addEventListener("pointerdown", e9), document.addEventListener("pointerup", t10), () => {
      document.removeEventListener("pointerdown", e9), document.removeEventListener("pointerup", t10);
    };
  }, []), useLayoutEffect2(() => {
    if (r9) {
      let e9 = function() {
        o6--, o6 === 0 && (document.body.style.pointerEvents = n3);
      };
      return o6 === 0 && (n3 = document.body.style.pointerEvents), document.body.style.pointerEvents = "none", o6++, () => {
        u3.current ? document.addEventListener("click", e9, { once: true }) : c5.current ? document.addEventListener("pointerup", e9, { once: true }) : e9();
      };
    }
  }, [r9]);
}

// node_modules/@radix-ui/primitive/dist/index.module.js
init_react();
function composeEventHandlers2(e9, n5, { checkForDefaultPrevented: t10 = true } = {}) {
  return function(r9) {
    if (e9 == null || e9(r9), t10 === false || !r9.defaultPrevented)
      return n5 == null ? void 0 : n5(r9);
  };
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
var i2 = __toESM(require_react());
var u = /* @__PURE__ */ i2.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set() });
var DismissableLayer = /* @__PURE__ */ i2.forwardRef((l3, m2) => {
  const { disableOutsidePointerEvents: f3 = false, onEscapeKeyDown: p2, onPointerDownOutside: v2, onFocusOutside: b, onInteractOutside: E2, onDismiss: y, ...w2 } = l3, h2 = i2.useContext(u), [D, x2] = i2.useState(null), [, C2] = i2.useState({}), L = useComposedRefs(m2, (e9) => x2(e9)), P = Array.from(h2.layers), [O2] = [...h2.layersWithOutsidePointerEventsDisabled].slice(-1), g2 = P.indexOf(O2), B = D ? P.indexOf(D) : -1, R2 = h2.layersWithOutsidePointerEventsDisabled.size > 0, F = B >= g2, S = function(e9) {
    const n5 = useCallbackRef2(e9), r9 = i2.useRef(false);
    return i2.useEffect(() => {
      const e10 = (e11) => {
        if (e11.target && !r9.current) {
          d2("dismissableLayer.pointerDownOutside", n5, { originalEvent: e11 });
        }
        r9.current = false;
      }, t10 = window.setTimeout(() => {
        document.addEventListener("pointerdown", e10);
      }, 0);
      return () => {
        window.clearTimeout(t10), document.removeEventListener("pointerdown", e10);
      };
    }, [n5]), { onPointerDownCapture: () => r9.current = true };
  }((e9) => {
    const t10 = e9.target, n5 = [...h2.branches].some((e10) => e10.contains(t10));
    F && !n5 && (v2 == null || v2(e9), E2 == null || E2(e9), e9.defaultPrevented || y == null || y());
  }), W = function(e9) {
    const n5 = useCallbackRef2(e9), r9 = i2.useRef(false);
    return i2.useEffect(() => {
      const e10 = (e11) => {
        if (e11.target && !r9.current) {
          d2("dismissableLayer.focusOutside", n5, { originalEvent: e11 });
        }
      };
      return document.addEventListener("focusin", e10), () => document.removeEventListener("focusin", e10);
    }, [n5]), { onFocusCapture: () => r9.current = true, onBlurCapture: () => r9.current = false };
  }((e9) => {
    const t10 = e9.target;
    [...h2.branches].some((e10) => e10.contains(t10)) || (b == null || b(e9), E2 == null || E2(e9), e9.defaultPrevented || y == null || y());
  });
  return useEscapeKeydown((e9) => {
    B === h2.layers.size - 1 && (p2 == null || p2(e9), e9.defaultPrevented || y == null || y());
  }), useBodyPointerEvents({ disabled: f3 }), i2.useEffect(() => {
    D && (f3 && h2.layersWithOutsidePointerEventsDisabled.add(D), h2.layers.add(D), c2());
  }, [D, f3, h2]), i2.useEffect(() => () => {
    D && (h2.layers.delete(D), h2.layersWithOutsidePointerEventsDisabled.delete(D), c2());
  }, [D, h2]), i2.useEffect(() => {
    const e9 = () => C2({});
    return document.addEventListener("dismissableLayer.update", e9), () => document.removeEventListener("dismissableLayer.update", e9);
  }, []), /* @__PURE__ */ i2.createElement(Primitive.div, _extends({}, w2, { ref: L, style: { pointerEvents: R2 ? F ? "auto" : "none" : void 0, ...l3.style }, onFocusCapture: composeEventHandlers2(l3.onFocusCapture, W.onFocusCapture), onBlurCapture: composeEventHandlers2(l3.onBlurCapture, W.onBlurCapture), onPointerDownCapture: composeEventHandlers2(l3.onPointerDownCapture, S.onPointerDownCapture) }));
});
function c2() {
  const e9 = new Event("dismissableLayer.update");
  document.dispatchEvent(e9);
}
function d2(e9, t10, n5) {
  const r9 = n5.originalEvent.target, s4 = new CustomEvent(e9, { bubbles: false, cancelable: true, detail: n5 });
  return t10 && r9.addEventListener(e9, t10, { once: true }), !r9.dispatchEvent(s4);
}

// node_modules/@radix-ui/react-popper/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-arrow/dist/index.module.js
init_react();
var r6 = __toESM(require_react());
var Arrow = /* @__PURE__ */ r6.forwardRef((o8, i4) => {
  const { children: n5, width: s4 = 10, height: m2 = 5, ...p2 } = o8;
  return r6.createElement(Primitive.svg, _extends({}, p2, { ref: i4, width: s4, height: m2, viewBox: "0 0 30 10", preserveAspectRatio: "none" }), o8.asChild ? n5 : /* @__PURE__ */ r6.createElement("polygon", { points: "0,0 30,0 15,10" }));
});
var Root = Arrow;

// node_modules/@radix-ui/react-use-size/dist/index.module.js
init_react();
var e5 = __toESM(require_react());
function useSize(r9) {
  const [i4, t10] = e5.useState(void 0);
  return e5.useEffect(() => {
    if (r9) {
      const e9 = new ResizeObserver((e10) => {
        if (!Array.isArray(e10))
          return;
        if (!e10.length)
          return;
        const i5 = e10[0];
        let o8, n5;
        if ("borderBoxSize" in i5) {
          const e11 = i5.borderBoxSize, r10 = Array.isArray(e11) ? e11[0] : e11;
          o8 = r10.inlineSize, n5 = r10.blockSize;
        } else {
          const e11 = r9.getBoundingClientRect();
          o8 = e11.width, n5 = e11.height;
        }
        t10({ width: o8, height: n5 });
      });
      return e9.observe(r9, { box: "border-box" }), () => e9.unobserve(r9);
    }
    t10(void 0);
  }, [r9]), i4;
}

// node_modules/@radix-ui/react-use-rect/dist/index.module.js
init_react();

// node_modules/@radix-ui/rect/dist/index.module.js
init_react();
function observeElementRect(n5, o8) {
  const i4 = e6.get(n5);
  return i4 === void 0 ? (e6.set(n5, { rect: {}, callbacks: [o8] }), e6.size === 1 && (t6 = requestAnimationFrame(c3))) : (i4.callbacks.push(o8), o8(n5.getBoundingClientRect())), () => {
    const c5 = e6.get(n5);
    if (c5 === void 0)
      return;
    const i5 = c5.callbacks.indexOf(o8);
    i5 > -1 && c5.callbacks.splice(i5, 1), c5.callbacks.length === 0 && (e6.delete(n5), e6.size === 0 && cancelAnimationFrame(t6));
  };
}
var t6;
var e6 = /* @__PURE__ */ new Map();
function c3() {
  const n5 = [];
  e6.forEach((t10, e9) => {
    const c5 = e9.getBoundingClientRect();
    var o8, i4;
    o8 = t10.rect, i4 = c5, (o8.width !== i4.width || o8.height !== i4.height || o8.top !== i4.top || o8.right !== i4.right || o8.bottom !== i4.bottom || o8.left !== i4.left) && (t10.rect = c5, n5.push(t10));
  }), n5.forEach((t10) => {
    t10.callbacks.forEach((e9) => e9(t10.rect));
  }), t6 = requestAnimationFrame(c3);
}

// node_modules/@radix-ui/react-use-rect/dist/index.module.js
var r7 = __toESM(require_react());
function useRect(e9) {
  const [o8, c5] = r7.useState();
  return r7.useEffect(() => {
    if (e9) {
      const r9 = observeElementRect(e9, c5);
      return () => {
        c5(void 0), r9();
      };
    }
  }, [e9]), o8;
}

// node_modules/@radix-ui/react-context/dist/index.module.js
init_react();
var e7 = __toESM(require_react());
function createContext3(t10, n5) {
  const o8 = /* @__PURE__ */ e7.createContext(n5);
  function r9(t11) {
    const { children: n6, ...r10 } = t11, c5 = e7.useMemo(() => r10, Object.values(r10));
    return e7.createElement(o8.Provider, { value: c5 }, n6);
  }
  return r9.displayName = t10 + "Provider", [r9, function(r10) {
    const c5 = e7.useContext(o8);
    if (c5)
      return c5;
    if (n5 !== void 0)
      return n5;
    throw new Error(`\`${r10}\` must be used within \`${t10}\``);
  }];
}
function createContextScope(n5, o8 = []) {
  let r9 = [];
  const c5 = () => {
    const t10 = r9.map((t11) => /* @__PURE__ */ e7.createContext(t11));
    return function(o9) {
      const r10 = (o9 == null ? void 0 : o9[n5]) || t10;
      return e7.useMemo(() => ({ [`__scope${n5}`]: { ...o9, [n5]: r10 } }), [o9, r10]);
    };
  };
  return c5.scopeName = n5, [function(t10, o9) {
    const c6 = /* @__PURE__ */ e7.createContext(o9), u3 = r9.length;
    function s4(t11) {
      const { scope: o10, children: r10, ...s5 } = t11, i4 = (o10 == null ? void 0 : o10[n5][u3]) || c6, a3 = e7.useMemo(() => s5, Object.values(s5));
      return e7.createElement(i4.Provider, { value: a3 }, r10);
    }
    return r9 = [...r9, o9], s4.displayName = t10 + "Provider", [s4, function(r10, s5) {
      const i4 = (s5 == null ? void 0 : s5[n5][u3]) || c6, a3 = e7.useContext(i4);
      if (a3)
        return a3;
      if (o9 !== void 0)
        return o9;
      throw new Error(`\`${r10}\` must be used within \`${t10}\``);
    }];
  }, t7(c5, ...o8)];
}
function t7(...t10) {
  const n5 = t10[0];
  if (t10.length === 1)
    return n5;
  const o8 = () => {
    const o9 = t10.map((e9) => ({ useScope: e9(), scopeName: e9.scopeName }));
    return function(t11) {
      const r9 = o9.reduce((e9, { useScope: n6, scopeName: o10 }) => ({ ...e9, ...n6(t11)[`__scope${o10}`] }), {});
      return e7.useMemo(() => ({ [`__scope${n5.scopeName}`]: r9 }), [r9]);
    };
  };
  return o8.scopeName = n5.scopeName, o8;
}

// node_modules/@radix-ui/popper/dist/index.module.js
init_react();
function getPlacementData({ anchorRect: p2, popperSize: c5, arrowSize: f3, arrowOffset: l3 = 0, side: d4, sideOffset: h2 = 0, align: x2, alignOffset: g2 = 0, shouldAvoidCollisions: u3 = true, collisionBoundariesRect: w2, collisionTolerance: m2 = 0 }) {
  if (!p2 || !c5 || !w2)
    return { popperStyles: o7, arrowStyles: n4 };
  const y = function(e9, r9, o8 = 0, n5 = 0, i4) {
    const p3 = i4 ? i4.height : 0, a3 = t8(r9, e9, "x"), s4 = t8(r9, e9, "y"), c6 = s4.before - o8 - p3, f4 = s4.after + o8 + p3, l4 = a3.before - o8 - p3, d5 = a3.after + o8 + p3;
    return { top: { start: { x: a3.start + n5, y: c6 }, center: { x: a3.center, y: c6 }, end: { x: a3.end - n5, y: c6 } }, right: { start: { x: d5, y: s4.start + n5 }, center: { x: d5, y: s4.center }, end: { x: d5, y: s4.end - n5 } }, bottom: { start: { x: a3.start + n5, y: f4 }, center: { x: a3.center, y: f4 }, end: { x: a3.end - n5, y: f4 } }, left: { start: { x: l4, y: s4.start + n5 }, center: { x: l4, y: s4.center }, end: { x: l4, y: s4.end - n5 } } };
  }(c5, p2, h2, g2, f3), b = y[d4][x2];
  if (u3 === false) {
    const t10 = e8(b);
    let o8 = n4;
    f3 && (o8 = i3({ popperSize: c5, arrowSize: f3, arrowOffset: l3, side: d4, align: x2 }));
    return { popperStyles: { ...t10, "--radix-popper-transform-origin": r8(c5, d4, x2, l3, f3) }, arrowStyles: o8, placedSide: d4, placedAlign: x2 };
  }
  const S = DOMRect.fromRect({ ...c5, ...b }), $ = (O2 = w2, z = m2, DOMRect.fromRect({ width: O2.width - 2 * z, height: O2.height - 2 * z, x: O2.left + z, y: O2.top + z }));
  var O2, z;
  const R2 = s2(S, $), M = y[a2(d4)][x2], D = function(t10, e9, r9) {
    const o8 = a2(t10);
    return e9[t10] && !r9[o8] ? o8 : t10;
  }(d4, R2, s2(DOMRect.fromRect({ ...c5, ...M }), $)), A2 = function(t10, e9, r9, o8, n5) {
    const i4 = r9 === "top" || r9 === "bottom", p3 = i4 ? "left" : "top", a3 = i4 ? "right" : "bottom", s4 = i4 ? "width" : "height", c6 = e9[s4] > t10[s4];
    if ((o8 === "start" || o8 === "center") && (n5[p3] && c6 || n5[a3] && !c6))
      return "end";
    if ((o8 === "end" || o8 === "center") && (n5[a3] && c6 || n5[p3] && !c6))
      return "start";
    return o8;
  }(c5, p2, d4, x2, R2), I = e8(y[D][A2]);
  let C2 = n4;
  f3 && (C2 = i3({ popperSize: c5, arrowSize: f3, arrowOffset: l3, side: D, align: A2 }));
  return { popperStyles: { ...I, "--radix-popper-transform-origin": r8(c5, D, A2, l3, f3) }, arrowStyles: C2, placedSide: D, placedAlign: A2 };
}
function t8(t10, e9, r9) {
  const o8 = t10[r9 === "x" ? "left" : "top"], n5 = r9 === "x" ? "width" : "height", i4 = t10[n5], p2 = e9[n5];
  return { before: o8 - p2, start: o8, center: o8 + (i4 - p2) / 2, end: o8 + i4 - p2, after: o8 + i4 };
}
function e8(t10) {
  return { position: "absolute", top: 0, left: 0, minWidth: "max-content", willChange: "transform", transform: `translate3d(${Math.round(t10.x + window.scrollX)}px, ${Math.round(t10.y + window.scrollY)}px, 0)` };
}
function r8(t10, e9, r9, o8, n5) {
  const i4 = e9 === "top" || e9 === "bottom", p2 = n5 ? n5.width : 0, a3 = n5 ? n5.height : 0, s4 = p2 / 2 + o8;
  let c5 = "", f3 = "";
  return i4 ? (c5 = { start: `${s4}px`, center: "center", end: t10.width - s4 + "px" }[r9], f3 = e9 === "top" ? `${t10.height + a3}px` : -a3 + "px") : (c5 = e9 === "left" ? `${t10.width + a3}px` : -a3 + "px", f3 = { start: `${s4}px`, center: "center", end: t10.height - s4 + "px" }[r9]), `${c5} ${f3}`;
}
var o7 = { position: "fixed", top: 0, left: 0, opacity: 0, transform: "translate3d(0, -200%, 0)" };
var n4 = { position: "absolute", opacity: 0 };
function i3({ popperSize: t10, arrowSize: e9, arrowOffset: r9, side: o8, align: n5 }) {
  const i4 = (t10.width - e9.width) / 2, a3 = (t10.height - e9.width) / 2, s4 = { top: 0, right: 90, bottom: 180, left: -90 }[o8], c5 = Math.max(e9.width, e9.height), f3 = { width: `${c5}px`, height: `${c5}px`, transform: `rotate(${s4}deg)`, willChange: "transform", position: "absolute", [o8]: "100%", direction: p(o8, n5) };
  return o8 !== "top" && o8 !== "bottom" || (n5 === "start" && (f3.left = `${r9}px`), n5 === "center" && (f3.left = `${i4}px`), n5 === "end" && (f3.right = `${r9}px`)), o8 !== "left" && o8 !== "right" || (n5 === "start" && (f3.top = `${r9}px`), n5 === "center" && (f3.top = `${a3}px`), n5 === "end" && (f3.bottom = `${r9}px`)), f3;
}
function p(t10, e9) {
  return (t10 !== "top" && t10 !== "right" || e9 !== "end") && (t10 !== "bottom" && t10 !== "left" || e9 === "end") ? "ltr" : "rtl";
}
function a2(t10) {
  return { top: "bottom", right: "left", bottom: "top", left: "right" }[t10];
}
function s2(t10, e9) {
  return { top: t10.top < e9.top, right: t10.right > e9.right, bottom: t10.bottom > e9.bottom, left: t10.left < e9.left };
}

// node_modules/@radix-ui/react-popper/dist/index.module.js
var s3 = __toESM(require_react());
var [c4, l2] = createContextScope("Popper");
var [f2, d3] = c4("Popper");
var Popper = (e9) => {
  const { __scopePopper: o8, children: r9 } = e9, [t10, n5] = s3.useState(null);
  return s3.createElement(f2, { scope: o8, anchor: t10, onAnchorChange: n5 }, r9);
};
var PopperAnchor = /* @__PURE__ */ s3.forwardRef((e9, r9) => {
  const { __scopePopper: t10, virtualRef: n5, ...p2 } = e9, c5 = d3("PopperAnchor", t10), l3 = s3.useRef(null), f3 = useComposedRefs(r9, l3);
  return s3.useEffect(() => {
    c5.onAnchorChange((n5 == null ? void 0 : n5.current) || l3.current);
  }), n5 ? null : /* @__PURE__ */ s3.createElement(Primitive.div, _extends({}, p2, { ref: f3 }));
});
var [u2, m] = c4("PopperContent");
var PopperContent = /* @__PURE__ */ s3.forwardRef((e9, n5) => {
  const { __scopePopper: c5, side: l3 = "bottom", sideOffset: f3, align: m2 = "center", alignOffset: w2, collisionTolerance: h2, avoidCollisions: x2 = true, ...v2 } = e9, P = d3("PopperContent", c5), [A2, g2] = s3.useState(), E2 = useRect(P.anchor), [y, C2] = s3.useState(null), S = useSize(y), [R2, O2] = s3.useState(null), _ = useSize(R2), b = useComposedRefs(n5, (e10) => C2(e10)), z = function() {
    const [e10, o8] = s3.useState(void 0);
    return s3.useEffect(() => {
      let e11;
      function r9() {
        o8({ width: window.innerWidth, height: window.innerHeight });
      }
      function t10() {
        window.clearTimeout(e11), e11 = window.setTimeout(r9, 100);
      }
      return r9(), window.addEventListener("resize", t10), () => window.removeEventListener("resize", t10);
    }, []), e10;
  }(), T = z ? DOMRect.fromRect({ ...z, x: 0, y: 0 }) : void 0, { popperStyles: k, arrowStyles: L, placedSide: B, placedAlign: D } = getPlacementData({ anchorRect: E2, popperSize: S, arrowSize: _, arrowOffset: A2, side: l3, sideOffset: f3, align: m2, alignOffset: w2, shouldAvoidCollisions: x2, collisionBoundariesRect: T, collisionTolerance: h2 }), H = B !== void 0;
  return s3.createElement("div", { style: k, "data-radix-popper-content-wrapper": "" }, /* @__PURE__ */ s3.createElement(u2, { scope: c5, arrowStyles: L, onArrowChange: O2, onArrowOffsetChange: g2 }, /* @__PURE__ */ s3.createElement(Primitive.div, _extends({ "data-side": B, "data-align": D }, v2, { style: { ...v2.style, animation: H ? void 0 : "none" }, ref: b }))));
});
var PopperArrow = /* @__PURE__ */ s3.forwardRef(function(o8, r9) {
  const { __scopePopper: t10, offset: n5, ...i4 } = o8, p2 = m("PopperArrow", t10), { onArrowOffsetChange: c5 } = p2;
  return s3.useEffect(() => c5(n5), [c5, n5]), /* @__PURE__ */ s3.createElement("span", { style: { ...p2.arrowStyles, pointerEvents: "none" } }, /* @__PURE__ */ s3.createElement("span", { ref: p2.onArrowChange, style: { display: "inline-block", verticalAlign: "top", pointerEvents: "auto" } }, /* @__PURE__ */ s3.createElement(Root, _extends({}, i4, { ref: r9, style: { ...i4.style, display: "block" } }))));
});
var Root2 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow2 = PopperArrow;

// node_modules/@radix-ui/react-use-controllable-state/dist/index.module.js
init_react();
var t9 = __toESM(require_react());
function useControllableState({ prop: o8, defaultProp: r9, onChange: n5 = () => {
} }) {
  const [a3, u3] = function({ defaultProp: o9, onChange: r10 }) {
    const n6 = t9.useState(o9), [a4] = n6, u4 = t9.useRef(a4), c6 = useCallbackRef2(r10);
    return t9.useEffect(() => {
      u4.current !== a4 && (c6(a4), u4.current = a4);
    }, [a4, u4, c6]), n6;
  }({ defaultProp: r9, onChange: n5 }), c5 = o8 !== void 0, f3 = c5 ? o8 : a3, l3 = useCallbackRef2(n5);
  return [f3, t9.useCallback((e9) => {
    if (c5) {
      const t10 = e9, r10 = typeof e9 == "function" ? t10(o8) : e9;
      r10 !== o8 && l3(r10);
    } else
      u3(e9);
  }, [c5, o8, u3, l3])];
}

// node_modules/@radix-ui/react-popover/dist/index.module.js
var v = __toESM(require_react());
var [C, g] = createContextScope("Popover", [l2]);
var x = l2();
var [h, E] = C("Popover");
var Popover = (e9) => {
  const { __scopePopover: o8, children: t10, open: n5, defaultOpen: c5, onOpenChange: a3, modal: s4 = false } = e9, i4 = x(o8), u3 = v.useRef(null), [d4, m2] = v.useState(false), [f3 = false, P] = useControllableState({ prop: n5, defaultProp: c5, onChange: a3 });
  return v.createElement(Root2, i4, /* @__PURE__ */ v.createElement(h, { scope: o8, contentId: useId(), triggerRef: u3, open: f3, onOpenChange: P, onOpenToggle: v.useCallback(() => P((e10) => !e10), [P]), hasCustomAnchor: d4, onCustomAnchorAdd: v.useCallback(() => m2(true), []), onCustomAnchorRemove: v.useCallback(() => m2(false), []), modal: s4 }, t10));
};
var PopoverTrigger = /* @__PURE__ */ v.forwardRef((e9, o8) => {
  const { __scopePopover: r9, ...n5 } = e9, c5 = E("PopoverTrigger", r9), a3 = x(r9), s4 = useComposedRefs(o8, c5.triggerRef), i4 = /* @__PURE__ */ v.createElement(Primitive.button, _extends({ type: "button", "aria-haspopup": "dialog", "aria-expanded": c5.open, "aria-controls": c5.contentId, "data-state": w(c5.open) }, n5, { ref: s4, onClick: composeEventHandlers2(e9.onClick, c5.onOpenToggle) }));
  return c5.hasCustomAnchor ? i4 : /* @__PURE__ */ v.createElement(Anchor, _extends({ asChild: true }, a3), i4);
});
var PopoverContent = /* @__PURE__ */ v.forwardRef((e9, o8) => {
  const { forceMount: r9, ...t10 } = e9, c5 = E("PopoverContent", e9.__scopePopover);
  return v.createElement(Presence, { present: r9 || c5.open }, c5.modal ? /* @__PURE__ */ v.createElement(A, _extends({}, t10, { ref: o8 })) : /* @__PURE__ */ v.createElement(O, _extends({}, t10, { ref: o8 })));
});
var A = /* @__PURE__ */ v.forwardRef((r9, t10) => {
  const { allowPinchZoom: n5, portalled: c5 = true, ...s4 } = r9, i4 = E("PopoverContent", r9.__scopePopover), p2 = v.useRef(null), u3 = useComposedRefs(t10, p2), l3 = v.useRef(false);
  v.useEffect(() => {
    const o8 = p2.current;
    if (o8)
      return hideOthers(o8);
  }, []);
  const d4 = c5 ? Portal : v.Fragment;
  return v.createElement(d4, null, /* @__PURE__ */ v.createElement(Combination_default, { allowPinchZoom: n5 }, /* @__PURE__ */ v.createElement(R, _extends({}, s4, { ref: u3, trapFocus: i4.open, disableOutsidePointerEvents: true, onCloseAutoFocus: composeEventHandlers2(r9.onCloseAutoFocus, (e9) => {
    var o8;
    e9.preventDefault(), l3.current || (o8 = i4.triggerRef.current) === null || o8 === void 0 || o8.focus();
  }), onPointerDownOutside: composeEventHandlers2(r9.onPointerDownOutside, (e9) => {
    const o8 = e9.detail.originalEvent, r10 = o8.button === 0 && o8.ctrlKey === true, t11 = o8.button === 2 || r10;
    l3.current = t11;
  }, { checkForDefaultPrevented: false }), onFocusOutside: composeEventHandlers2(r9.onFocusOutside, (e9) => e9.preventDefault(), { checkForDefaultPrevented: false }) }))));
});
var O = /* @__PURE__ */ v.forwardRef((e9, o8) => {
  const { portalled: r9 = true, ...t10 } = e9, n5 = E("PopoverContent", e9.__scopePopover), c5 = v.useRef(false), s4 = r9 ? Portal : v.Fragment;
  return v.createElement(s4, null, /* @__PURE__ */ v.createElement(R, _extends({}, t10, { ref: o8, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (o9) => {
    var r10, t11;
    ((r10 = e9.onCloseAutoFocus) === null || r10 === void 0 || r10.call(e9, o9), o9.defaultPrevented) || (c5.current || (t11 = n5.triggerRef.current) === null || t11 === void 0 || t11.focus(), o9.preventDefault());
    c5.current = false;
  }, onInteractOutside: (o9) => {
    var r10, t11;
    (r10 = e9.onInteractOutside) === null || r10 === void 0 || r10.call(e9, o9), o9.defaultPrevented || (c5.current = true);
    const a3 = o9.target;
    ((t11 = n5.triggerRef.current) === null || t11 === void 0 ? void 0 : t11.contains(a3)) && o9.preventDefault();
  } })));
});
var R = /* @__PURE__ */ v.forwardRef((e9, o8) => {
  const { __scopePopover: r9, trapFocus: t10, onOpenAutoFocus: n5, onCloseAutoFocus: a3, disableOutsidePointerEvents: u3, onEscapeKeyDown: l3, onPointerDownOutside: d4, onFocusOutside: m2, onInteractOutside: f3, ...C2 } = e9, g2 = E("PopoverContent", r9), h2 = x(r9);
  return useFocusGuards(), /* @__PURE__ */ v.createElement(FocusScope, { asChild: true, loop: true, trapped: t10, onMountAutoFocus: n5, onUnmountAutoFocus: a3 }, /* @__PURE__ */ v.createElement(DismissableLayer, { asChild: true, disableOutsidePointerEvents: u3, onInteractOutside: f3, onEscapeKeyDown: l3, onPointerDownOutside: d4, onFocusOutside: m2, onDismiss: () => g2.onOpenChange(false) }, /* @__PURE__ */ v.createElement(Content, _extends({ "data-state": w(g2.open), role: "dialog", id: g2.contentId }, h2, C2, { ref: o8, style: { ...C2.style, "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)" } }))));
});
var PopoverArrow = /* @__PURE__ */ v.forwardRef((e9, o8) => {
  const { __scopePopover: r9, ...t10 } = e9, n5 = x(r9);
  return v.createElement(Arrow2, _extends({}, n5, t10, { ref: o8 }));
});
function w(e9) {
  return e9 ? "open" : "closed";
}
var Root3 = Popover;
var Trigger = PopoverTrigger;
var Content2 = PopoverContent;
var Arrow3 = PopoverArrow;

// app/components/UI/Popover.tsx
var import_react5 = __toESM(require_react());
var Popover2 = Root3;
var PopoverTrigger2 = import_react5.default.forwardRef((props, ref) => {
  return /* @__PURE__ */ import_react5.default.createElement(Trigger, {
    asChild: true,
    ref,
    ...props
  });
});
var PopoverContent2 = import_react5.default.forwardRef(({ children, ...props }, ref) => {
  return /* @__PURE__ */ import_react5.default.createElement(Content2, {
    ...props,
    ref
  }, children);
});
var PopoverArrow2 = Arrow3;

// app/components/Icons/LogoTriggerdotdev.tsx
init_react();
function LogoTriggerdotdev({
  className,
  width = "100%"
}) {
  return /* @__PURE__ */ React.createElement("a", {
    href: "https://trigger.dev/",
    "aria-label": "Trigger.dev"
  }, /* @__PURE__ */ React.createElement("svg", {
    className: `${className}`,
    width,
    height: "30",
    viewBox: "0 0 169 30",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M44.0084 4.04088H30.6671H31.1941V7.67807H35.686V23.329H39.489V7.67807H44.0084V4.04088Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M47.646 11.9215V9.55178H44.0911V23.329H47.646V16.7435C47.646 13.8503 49.9884 13.0236 51.8348 13.2441V9.27623C50.0986 9.27623 48.3625 10.0478 47.646 11.9215Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M55.6379 7.89851C56.8505 7.89851 57.8426 6.90655 57.8426 5.7217C57.8426 4.53686 56.8505 3.51733 55.6379 3.51733C54.453 3.51733 53.4609 4.53686 53.4609 5.7217C53.4609 6.90655 54.453 7.89851 55.6379 7.89851ZM53.8743 23.329H57.4292V9.55178H53.8743V23.329Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M70.9327 9.55179V11.2602C69.9681 9.96509 68.48 9.16603 66.5234 9.16603C62.6103 9.16603 59.6616 12.3623 59.6616 16.22C59.6616 20.1052 62.6103 23.2739 66.5234 23.2739C68.48 23.2739 69.9681 22.4749 70.9327 21.1798V22.6677C70.9327 24.8445 69.5548 26.0569 67.3226 26.0569C65.2007 26.0569 64.2913 25.2027 63.7126 24.1281L60.6812 25.864C61.8938 28.096 64.2637 29.2257 67.2124 29.2257C70.85 29.2257 74.4049 27.1867 74.4049 22.6677V9.55179H70.9327ZM67.0746 19.9949C64.8424 19.9949 63.2165 18.4243 63.2165 16.22C63.2165 14.0432 64.8424 12.4726 67.0746 12.4726C69.3068 12.4726 70.9327 14.0432 70.9327 16.22C70.9327 18.4243 69.3068 19.9949 67.0746 19.9949Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M87.8808 9.55179V11.2602C86.9163 9.96509 85.4282 9.16603 83.4716 9.16603C79.5584 9.16603 76.6097 12.3623 76.6097 16.22C76.6097 20.1052 79.5584 23.2739 83.4716 23.2739C85.4282 23.2739 86.9163 22.4749 87.8808 21.1798V22.6677C87.8808 24.8445 86.5029 26.0569 84.2708 26.0569C82.1488 26.0569 81.2394 25.2027 80.6607 24.1281L77.6294 25.864C78.8419 28.096 81.2119 29.2257 84.1605 29.2257C87.7981 29.2257 91.3531 27.1867 91.3531 22.6677V9.55179H87.8808ZM84.0227 19.9949C81.7906 19.9949 80.1647 18.4243 80.1647 16.22C80.1647 14.0432 81.7906 12.4726 84.0227 12.4726C86.2549 12.4726 87.8808 14.0432 87.8808 16.22C87.8808 18.4243 86.2549 19.9949 84.0227 19.9949Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M97.2782 17.9008H107.667C107.75 17.4324 107.805 16.964 107.805 16.4404C107.805 12.3899 104.912 9.16603 100.833 9.16603C96.5066 9.16603 93.5579 12.3348 93.5579 16.4404C93.5579 20.546 96.479 23.7148 101.109 23.7148C103.754 23.7148 105.821 22.6402 107.116 20.7665L104.25 19.1132C103.644 19.9123 102.542 20.4909 101.164 20.4909C99.2899 20.4909 97.7742 19.7194 97.2782 17.9008ZM97.2231 15.1454C97.6364 13.3819 98.9316 12.3623 100.833 12.3623C102.321 12.3623 103.809 13.1614 104.25 15.1454H97.2231Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M113.468 11.9215V9.55178H109.914V23.329H113.468V16.7435C113.468 13.8503 115.811 13.0236 117.657 13.2441V9.27623C115.921 9.27623 114.185 10.0478 113.468 11.9215Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M119.008 23.6874C120.303 23.6874 121.35 22.6403 121.35 21.3452C121.35 20.0502 120.303 19.0031 119.008 19.0031C117.712 19.0031 116.665 20.0502 116.665 21.3452C116.665 22.6403 117.712 23.6874 119.008 23.6874Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M133.944 4.04102V11.1776C132.952 9.91011 131.491 9.16616 129.479 9.16616C125.787 9.16616 122.755 12.3349 122.755 16.4405C122.755 20.5462 125.787 23.7149 129.479 23.7149C131.491 23.7149 132.952 22.9709 133.944 21.7034V23.3292H137.499V4.04102L133.944 4.04102ZM130.141 20.3257C127.936 20.3257 126.31 18.7551 126.31 16.4405C126.31 14.126 127.936 12.5553 130.141 12.5553C132.318 12.5553 133.944 14.126 133.944 16.4405C133.944 18.7551 132.318 20.3257 130.141 20.3257Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M143.203 17.9009H153.592C153.675 17.4325 153.73 16.9641 153.73 16.4406C153.73 12.39 150.837 9.16617 146.758 9.16617C142.432 9.16617 139.483 12.3349 139.483 16.4406C139.483 20.5462 142.404 23.7149 147.034 23.7149C149.679 23.7149 151.746 22.6403 153.041 20.7666L150.175 19.1133C149.569 19.9124 148.467 20.4911 147.089 20.4911C145.215 20.4911 143.699 19.7195 143.203 17.9009ZM143.148 15.1455C143.561 13.382 144.857 12.3625 146.758 12.3625C148.246 12.3625 149.734 13.1616 150.175 15.1455H143.148Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M164.45 9.55192L161.088 19.196L157.754 9.55192H153.84L159.076 23.3292H163.127L168.363 9.55192H164.45Z",
    fill: "#E2E8F0"
  }), /* @__PURE__ */ React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.32238 9.89169L13.6403 0.682007L26.8195 23.5069H0.461029L5.77893 14.2969L9.54072 16.4686L7.9849 19.1632H19.2957L13.6403 9.3691L12.0845 12.0637L8.32238 9.89169Z",
    fill: "#E2E8F0"
  })));
}

export {
  DiscordIconTransparent,
  Logo,
  require_prop_types,
  DragAndDropForm,
  SampleUrls,
  UrlForm,
  NewDocument,
  formatStarCount,
  GithubIconSimple,
  GithubStar,
  hideOthers,
  Combination_default,
  useLayoutEffect2 as useLayoutEffect,
  useId,
  useComposedRefs,
  Slot,
  Primitive,
  Presence,
  useFocusGuards,
  UnstablePortal,
  useCallbackRef2 as useCallbackRef,
  FocusScope,
  useEscapeKeydown,
  composeEventHandlers2 as composeEventHandlers,
  createContext3 as createContext,
  createContextScope,
  useControllableState,
  Popover2 as Popover,
  PopoverTrigger2 as PopoverTrigger,
  PopoverContent2 as PopoverContent,
  PopoverArrow2 as PopoverArrow,
  LogoTriggerdotdev
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/build/_shared/chunk-VMV4ES6J.js.map
