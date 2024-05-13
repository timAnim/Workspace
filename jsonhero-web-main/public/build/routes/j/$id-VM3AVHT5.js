import {
  CodeViewer,
  CopyTextButton,
  ExtraLargeTitle,
  JsonPreview,
  PreviewValue,
  PropertiesValue,
  SmallSubtitle,
  ValueIcon,
  classnames
} from "/build/_shared/chunk-D3QV33FR.js";
import {
  Combination_default,
  DiscordIconTransparent,
  FocusScope,
  GithubIconSimple,
  GithubStar,
  Logo,
  LogoTriggerdotdev,
  NewDocument,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Presence,
  Primitive,
  Slot,
  UnstablePortal,
  composeEventHandlers,
  createContext,
  createContextScope,
  formatStarCount,
  hideOthers,
  require_prop_types,
  useCallbackRef,
  useComposedRefs,
  useControllableState,
  useEscapeKeydown,
  useFocusGuards,
  useId,
  useLayoutEffect
} from "/build/_shared/chunk-VMV4ES6J.js";
import {
  LargeTitle
} from "/build/_shared/chunk-XR6OGC5J.js";
import {
  _objectWithoutPropertiesLoose
} from "/build/_shared/chunk-MUQ2Q3OY.js";
import "/build/_shared/chunk-INLOL6O7.js";
import {
  Title
} from "/build/_shared/chunk-ZOQKLX7S.js";
import {
  JsonTreeViewProvider,
  useVirtual
} from "/build/_shared/chunk-IMISUYGR.js";
import {
  Mono
} from "/build/_shared/chunk-Z465WLWO.js";
import {
  useSelectedInfo
} from "/build/_shared/chunk-CCCYTS2U.js";
import {
  Body
} from "/build/_shared/chunk-3VJ35PHZ.js";
import {
  JsonColumnViewProvider,
  JsonDocProvider,
  JsonProvider,
  formatRawValue,
  generateNodesToPath,
  groupBy_default,
  iconForValue,
  inferType,
  init_lib,
  lib_exports,
  omit_default,
  pathToDescendant,
  require_lib,
  sortBy_default,
  truncate_default,
  uniq_default,
  useHotkeys,
  useJson,
  useJsonColumnViewAPI,
  useJsonColumnViewState,
  useJsonDoc
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  ArrowLeftIcon_default,
  ArrowRightIcon_default,
  CheckIcon_default,
  ChevronDownIcon_default,
  ChevronRightIcon_default,
  ClipboardIcon_default,
  CodeIcon_default,
  DownloadIcon_default,
  ExclamationIcon_default,
  PencilAltIcon_default,
  PlusIcon_default,
  SearchIcon_default,
  ShareIcon_default,
  TemplateIcon_default,
  TrashIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import "/build/_shared/chunk-O7NJZHON.js";
import {
  useStarCount
} from "/build/_shared/chunk-2VHYU7Q2.js";
import {
  usePreferences
} from "/build/_shared/chunk-CMQL53DO.js";
import {
  require_jsonDoc
} from "/build/_shared/chunk-VBPSB3Y6.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  useTheme
} from "/build/_shared/chunk-LZBJICSD.js";
import {
  Form,
  Link,
  Outlet,
  _extends,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// node_modules/framer-motion/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/framer-motion/node_modules/tslib/tslib.js"(exports, module) {
    init_react();
    var __extends4;
    var __assign4;
    var __rest4;
    var __decorate4;
    var __param4;
    var __metadata4;
    var __awaiter4;
    var __generator4;
    var __exportStar4;
    var __values4;
    var __read4;
    var __spread4;
    var __spreadArrays4;
    var __spreadArray4;
    var __await4;
    var __asyncGenerator4;
    var __asyncDelegator4;
    var __asyncValues4;
    var __makeTemplateObject4;
    var __importStar4;
    var __importDefault4;
    var __classPrivateFieldGet4;
    var __classPrivateFieldSet4;
    var __createBinding4;
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
        return function(id2, v3) {
          return exports2[id2] = previous ? previous(id2, v3) : v3;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p3 in b5)
          if (Object.prototype.hasOwnProperty.call(b5, p3))
            d4[p3] = b5[p3];
      };
      __extends4 = function(d4, b5) {
        if (typeof b5 !== "function" && b5 !== null)
          throw new TypeError("Class extends value " + String(b5) + " is not a constructor or null");
        extendStatics(d4, b5);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
      };
      __assign4 = Object.assign || function(t3) {
        for (var s3, i2 = 1, n3 = arguments.length; i2 < n3; i2++) {
          s3 = arguments[i2];
          for (var p3 in s3)
            if (Object.prototype.hasOwnProperty.call(s3, p3))
              t3[p3] = s3[p3];
        }
        return t3;
      };
      __rest4 = function(s3, e2) {
        var t3 = {};
        for (var p3 in s3)
          if (Object.prototype.hasOwnProperty.call(s3, p3) && e2.indexOf(p3) < 0)
            t3[p3] = s3[p3];
        if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p3 = Object.getOwnPropertySymbols(s3); i2 < p3.length; i2++) {
            if (e2.indexOf(p3[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p3[i2]))
              t3[p3[i2]] = s3[p3[i2]];
          }
        return t3;
      };
      __decorate4 = function(decorators, target, key, desc) {
        var c3 = arguments.length, r2 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d4 = decorators[i2])
              r2 = (c3 < 3 ? d4(r2) : c3 > 3 ? d4(target, key, r2) : d4(target, key)) || r2;
        return c3 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param4 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata4 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter4 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator4 = function(thisArg, body) {
        var _2 = { label: 0, sent: function() {
          if (t3[0] & 1)
            throw t3[1];
          return t3[1];
        }, trys: [], ops: [] }, f3, y, t3, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n3) {
          return function(v3) {
            return step([n3, v3]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f3 = 1, y && (t3 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t3 = y["return"]) && t3.call(y), 0) : y.next) && !(t3 = t3.call(y, op[1])).done)
                return t3;
              if (y = 0, t3)
                op = [op[0] & 2, t3.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t3 = op;
                  break;
                case 4:
                  _2.label++;
                  return { value: op[1], done: false };
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t3 = _2.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t3[1]) {
                    _2.label = t3[1];
                    t3 = op;
                    break;
                  }
                  if (t3 && _2.label < t3[2]) {
                    _2.label = t3[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t3[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f3 = t3 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar4 = function(m4, o3) {
        for (var p3 in m4)
          if (p3 !== "default" && !Object.prototype.hasOwnProperty.call(o3, p3))
            __createBinding4(o3, m4, p3);
      };
      __createBinding4 = Object.create ? function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o3, k2, { enumerable: true, get: function() {
          return m4[k];
        } });
      } : function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o3[k2] = m4[k];
      };
      __values4 = function(o3) {
        var s3 = typeof Symbol === "function" && Symbol.iterator, m4 = s3 && o3[s3], i2 = 0;
        if (m4)
          return m4.call(o3);
        if (o3 && typeof o3.length === "number")
          return {
            next: function() {
              if (o3 && i2 >= o3.length)
                o3 = void 0;
              return { value: o3 && o3[i2++], done: !o3 };
            }
          };
        throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read4 = function(o3, n3) {
        var m4 = typeof Symbol === "function" && o3[Symbol.iterator];
        if (!m4)
          return o3;
        var i2 = m4.call(o3), r2, ar = [], e2;
        try {
          while ((n3 === void 0 || n3-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m4 = i2["return"]))
              m4.call(i2);
          } finally {
            if (e2)
              throw e2.error;
          }
        }
        return ar;
      };
      __spread4 = function() {
        for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
          ar = ar.concat(__read4(arguments[i2]));
        return ar;
      };
      __spreadArrays4 = function() {
        for (var s3 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s3 += arguments[i2].length;
        for (var r2 = Array(s3), k = 0, i2 = 0; i2 < il; i2++)
          for (var a2 = arguments[i2], j = 0, jl = a2.length; j < jl; j++, k++)
            r2[k] = a2[j];
        return r2;
      };
      __spreadArray4 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i2 = 0, l3 = from.length, ar; i2 < l3; i2++) {
            if (ar || !(i2 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i2);
              ar[i2] = from[i2];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await4 = function(v3) {
        return this instanceof __await4 ? (this.v = v3, this) : new __await4(v3);
      };
      __asyncGenerator4 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i2, q = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n3) {
          if (g2[n3])
            i2[n3] = function(v3) {
              return new Promise(function(a2, b5) {
                q.push([n3, v3, a2, b5]) > 1 || resume(n3, v3);
              });
            };
        }
        function resume(n3, v3) {
          try {
            step(g2[n3](v3));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await4 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v3) {
          if (f3(v3), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator4 = function(o3) {
        var i2, p3;
        return i2 = {}, verb("next"), verb("throw", function(e2) {
          throw e2;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n3, f3) {
          i2[n3] = o3[n3] ? function(v3) {
            return (p3 = !p3) ? { value: __await4(o3[n3](v3)), done: n3 === "return" } : f3 ? f3(v3) : v3;
          } : f3;
        }
      };
      __asyncValues4 = function(o3) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m4 = o3[Symbol.asyncIterator], i2;
        return m4 ? m4.call(o3) : (o3 = typeof __values4 === "function" ? __values4(o3) : o3[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n3) {
          i2[n3] = o3[n3] && function(v3) {
            return new Promise(function(resolve, reject) {
              v3 = o3[n3](v3), settle(resolve, reject, v3.done, v3.value);
            });
          };
        }
        function settle(resolve, reject, d4, v3) {
          Promise.resolve(v3).then(function(v4) {
            resolve({ value: v4, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject4 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o3, v3) {
        Object.defineProperty(o3, "default", { enumerable: true, value: v3 });
      } : function(o3, v3) {
        o3["default"] = v3;
      };
      __importStar4 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding4(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault4 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet4 = function(receiver, state, kind, f3) {
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
      };
      __classPrivateFieldSet4 = function(receiver, state, value, kind, f3) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends4);
      exporter("__assign", __assign4);
      exporter("__rest", __rest4);
      exporter("__decorate", __decorate4);
      exporter("__param", __param4);
      exporter("__metadata", __metadata4);
      exporter("__awaiter", __awaiter4);
      exporter("__generator", __generator4);
      exporter("__exportStar", __exportStar4);
      exporter("__createBinding", __createBinding4);
      exporter("__values", __values4);
      exporter("__read", __read4);
      exporter("__spread", __spread4);
      exporter("__spreadArrays", __spreadArrays4);
      exporter("__spreadArray", __spreadArray4);
      exporter("__await", __await4);
      exporter("__asyncGenerator", __asyncGenerator4);
      exporter("__asyncDelegator", __asyncDelegator4);
      exporter("__asyncValues", __asyncValues4);
      exporter("__makeTemplateObject", __makeTemplateObject4);
      exporter("__importStar", __importStar4);
      exporter("__importDefault", __importDefault4);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet4);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet4);
    });
  }
});

// node_modules/popmotion/node_modules/tslib/tslib.js
var require_tslib2 = __commonJS({
  "node_modules/popmotion/node_modules/tslib/tslib.js"(exports, module) {
    init_react();
    var __extends4;
    var __assign4;
    var __rest4;
    var __decorate4;
    var __param4;
    var __metadata4;
    var __awaiter4;
    var __generator4;
    var __exportStar4;
    var __values4;
    var __read4;
    var __spread4;
    var __spreadArrays4;
    var __spreadArray4;
    var __await4;
    var __asyncGenerator4;
    var __asyncDelegator4;
    var __asyncValues4;
    var __makeTemplateObject4;
    var __importStar4;
    var __importDefault4;
    var __classPrivateFieldGet4;
    var __classPrivateFieldSet4;
    var __createBinding4;
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
        return function(id2, v3) {
          return exports2[id2] = previous ? previous(id2, v3) : v3;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p3 in b5)
          if (Object.prototype.hasOwnProperty.call(b5, p3))
            d4[p3] = b5[p3];
      };
      __extends4 = function(d4, b5) {
        if (typeof b5 !== "function" && b5 !== null)
          throw new TypeError("Class extends value " + String(b5) + " is not a constructor or null");
        extendStatics(d4, b5);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
      };
      __assign4 = Object.assign || function(t3) {
        for (var s3, i2 = 1, n3 = arguments.length; i2 < n3; i2++) {
          s3 = arguments[i2];
          for (var p3 in s3)
            if (Object.prototype.hasOwnProperty.call(s3, p3))
              t3[p3] = s3[p3];
        }
        return t3;
      };
      __rest4 = function(s3, e2) {
        var t3 = {};
        for (var p3 in s3)
          if (Object.prototype.hasOwnProperty.call(s3, p3) && e2.indexOf(p3) < 0)
            t3[p3] = s3[p3];
        if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p3 = Object.getOwnPropertySymbols(s3); i2 < p3.length; i2++) {
            if (e2.indexOf(p3[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p3[i2]))
              t3[p3[i2]] = s3[p3[i2]];
          }
        return t3;
      };
      __decorate4 = function(decorators, target, key, desc) {
        var c3 = arguments.length, r2 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d4 = decorators[i2])
              r2 = (c3 < 3 ? d4(r2) : c3 > 3 ? d4(target, key, r2) : d4(target, key)) || r2;
        return c3 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param4 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata4 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter4 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator4 = function(thisArg, body) {
        var _2 = { label: 0, sent: function() {
          if (t3[0] & 1)
            throw t3[1];
          return t3[1];
        }, trys: [], ops: [] }, f3, y, t3, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n3) {
          return function(v3) {
            return step([n3, v3]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f3 = 1, y && (t3 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t3 = y["return"]) && t3.call(y), 0) : y.next) && !(t3 = t3.call(y, op[1])).done)
                return t3;
              if (y = 0, t3)
                op = [op[0] & 2, t3.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t3 = op;
                  break;
                case 4:
                  _2.label++;
                  return { value: op[1], done: false };
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t3 = _2.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t3[1]) {
                    _2.label = t3[1];
                    t3 = op;
                    break;
                  }
                  if (t3 && _2.label < t3[2]) {
                    _2.label = t3[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t3[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f3 = t3 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar4 = function(m4, o3) {
        for (var p3 in m4)
          if (p3 !== "default" && !Object.prototype.hasOwnProperty.call(o3, p3))
            __createBinding4(o3, m4, p3);
      };
      __createBinding4 = Object.create ? function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o3, k2, { enumerable: true, get: function() {
          return m4[k];
        } });
      } : function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o3[k2] = m4[k];
      };
      __values4 = function(o3) {
        var s3 = typeof Symbol === "function" && Symbol.iterator, m4 = s3 && o3[s3], i2 = 0;
        if (m4)
          return m4.call(o3);
        if (o3 && typeof o3.length === "number")
          return {
            next: function() {
              if (o3 && i2 >= o3.length)
                o3 = void 0;
              return { value: o3 && o3[i2++], done: !o3 };
            }
          };
        throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read4 = function(o3, n3) {
        var m4 = typeof Symbol === "function" && o3[Symbol.iterator];
        if (!m4)
          return o3;
        var i2 = m4.call(o3), r2, ar = [], e2;
        try {
          while ((n3 === void 0 || n3-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m4 = i2["return"]))
              m4.call(i2);
          } finally {
            if (e2)
              throw e2.error;
          }
        }
        return ar;
      };
      __spread4 = function() {
        for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
          ar = ar.concat(__read4(arguments[i2]));
        return ar;
      };
      __spreadArrays4 = function() {
        for (var s3 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s3 += arguments[i2].length;
        for (var r2 = Array(s3), k = 0, i2 = 0; i2 < il; i2++)
          for (var a2 = arguments[i2], j = 0, jl = a2.length; j < jl; j++, k++)
            r2[k] = a2[j];
        return r2;
      };
      __spreadArray4 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i2 = 0, l3 = from.length, ar; i2 < l3; i2++) {
            if (ar || !(i2 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i2);
              ar[i2] = from[i2];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await4 = function(v3) {
        return this instanceof __await4 ? (this.v = v3, this) : new __await4(v3);
      };
      __asyncGenerator4 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i2, q = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n3) {
          if (g2[n3])
            i2[n3] = function(v3) {
              return new Promise(function(a2, b5) {
                q.push([n3, v3, a2, b5]) > 1 || resume(n3, v3);
              });
            };
        }
        function resume(n3, v3) {
          try {
            step(g2[n3](v3));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await4 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v3) {
          if (f3(v3), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator4 = function(o3) {
        var i2, p3;
        return i2 = {}, verb("next"), verb("throw", function(e2) {
          throw e2;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n3, f3) {
          i2[n3] = o3[n3] ? function(v3) {
            return (p3 = !p3) ? { value: __await4(o3[n3](v3)), done: n3 === "return" } : f3 ? f3(v3) : v3;
          } : f3;
        }
      };
      __asyncValues4 = function(o3) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m4 = o3[Symbol.asyncIterator], i2;
        return m4 ? m4.call(o3) : (o3 = typeof __values4 === "function" ? __values4(o3) : o3[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n3) {
          i2[n3] = o3[n3] && function(v3) {
            return new Promise(function(resolve, reject) {
              v3 = o3[n3](v3), settle(resolve, reject, v3.done, v3.value);
            });
          };
        }
        function settle(resolve, reject, d4, v3) {
          Promise.resolve(v3).then(function(v4) {
            resolve({ value: v4, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject4 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o3, v3) {
        Object.defineProperty(o3, "default", { enumerable: true, value: v3 });
      } : function(o3, v3) {
        o3["default"] = v3;
      };
      __importStar4 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding4(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault4 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet4 = function(receiver, state, kind, f3) {
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
      };
      __classPrivateFieldSet4 = function(receiver, state, value, kind, f3) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends4);
      exporter("__assign", __assign4);
      exporter("__rest", __rest4);
      exporter("__decorate", __decorate4);
      exporter("__param", __param4);
      exporter("__metadata", __metadata4);
      exporter("__awaiter", __awaiter4);
      exporter("__generator", __generator4);
      exporter("__exportStar", __exportStar4);
      exporter("__createBinding", __createBinding4);
      exporter("__values", __values4);
      exporter("__read", __read4);
      exporter("__spread", __spread4);
      exporter("__spreadArrays", __spreadArrays4);
      exporter("__spreadArray", __spreadArray4);
      exporter("__await", __await4);
      exporter("__asyncGenerator", __asyncGenerator4);
      exporter("__asyncDelegator", __asyncDelegator4);
      exporter("__asyncValues", __asyncValues4);
      exporter("__makeTemplateObject", __makeTemplateObject4);
      exporter("__importStar", __importStar4);
      exporter("__importDefault", __importDefault4);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet4);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet4);
    });
  }
});

// node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize(fn) {
  var cache = {};
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var memoize_browser_esm_default;
var init_memoize_browser_esm = __esm({
  "node_modules/@emotion/memoize/dist/memoize.browser.esm.js"() {
    init_react();
    memoize_browser_esm_default = memoize;
  }
});

// node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js
var is_prop_valid_browser_esm_exports = {};
__export(is_prop_valid_browser_esm_exports, {
  default: () => is_prop_valid_browser_esm_default
});
var reactPropsRegex, index, is_prop_valid_browser_esm_default;
var init_is_prop_valid_browser_esm = __esm({
  "node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js"() {
    init_react();
    init_memoize_browser_esm();
    reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    index = memoize_browser_esm_default(function(prop) {
      return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
    });
    is_prop_valid_browser_esm_default = index;
  }
});

// node_modules/ts-pattern/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/ts-pattern/lib/symbols.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnonymousSelectKey = exports.Select = exports.Not = exports.Guard = exports.PatternKind = void 0;
    exports.PatternKind = Symbol("@ts-pattern/pattern-kind");
    exports.Guard = Symbol("@ts-pattern/guard");
    exports.Not = Symbol("@ts-pattern/not");
    exports.Select = Symbol("@ts-pattern/select");
    exports.AnonymousSelectKey = "@ts-pattern/__anonymous-select-key";
  }
});

// node_modules/ts-pattern/lib/guards.js
var require_guards = __commonJS({
  "node_modules/ts-pattern/lib/guards.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instanceOf = exports.select = exports.not = exports.when = void 0;
    var symbols = require_symbols();
    var when = (predicate) => ({
      [symbols.PatternKind]: symbols.Guard,
      [symbols.Guard]: predicate
    });
    exports.when = when;
    var not = (pattern) => ({
      [symbols.PatternKind]: symbols.Not,
      [symbols.Not]: pattern
    });
    exports.not = not;
    function select(key) {
      return key === void 0 ? {
        [symbols.PatternKind]: symbols.Select,
        [symbols.Select]: symbols.AnonymousSelectKey
      } : {
        [symbols.PatternKind]: symbols.Select,
        [symbols.Select]: key
      };
    }
    exports.select = select;
    function isInstanceOf(classConstructor) {
      return (val) => val instanceof classConstructor;
    }
    var instanceOf = (classConstructor) => (0, exports.when)(isInstanceOf(classConstructor));
    exports.instanceOf = instanceOf;
  }
});

// node_modules/ts-pattern/lib/wildcards.js
var require_wildcards = __commonJS({
  "node_modules/ts-pattern/lib/wildcards.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.__ = void 0;
    var guards_1 = require_guards();
    function isUnknown(x2) {
      return true;
    }
    function isNumber(x2) {
      return typeof x2 === "number";
    }
    function numberIsNaN(x2) {
      return Number.isNaN(x2);
    }
    function isString2(x2) {
      return typeof x2 === "string";
    }
    function isBoolean(x2) {
      return typeof x2 === "boolean";
    }
    function isNullish(x2) {
      return x2 === null || x2 === void 0;
    }
    var unknownGuard = (0, guards_1.when)(isUnknown);
    var stringGuard = (0, guards_1.when)(isString2);
    var numberGuard = (0, guards_1.when)(isNumber);
    var NaNGuard = (0, guards_1.when)(numberIsNaN);
    var booleanGuard = (0, guards_1.when)(isBoolean);
    var nullishGuard = (0, guards_1.when)(isNullish);
    exports.__ = Object.assign(unknownGuard, {
      string: stringGuard,
      number: numberGuard,
      NaN: NaNGuard,
      boolean: booleanGuard,
      nullish: nullishGuard
    });
  }
});

// node_modules/ts-pattern/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/ts-pattern/lib/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isMatching = exports.match = exports.instanceOf = exports.select = exports.not = exports.when = exports.__ = void 0;
    var symbols = require_symbols();
    var guards_1 = require_guards();
    Object.defineProperty(exports, "when", { enumerable: true, get: function() {
      return guards_1.when;
    } });
    Object.defineProperty(exports, "not", { enumerable: true, get: function() {
      return guards_1.not;
    } });
    Object.defineProperty(exports, "select", { enumerable: true, get: function() {
      return guards_1.select;
    } });
    Object.defineProperty(exports, "instanceOf", { enumerable: true, get: function() {
      return guards_1.instanceOf;
    } });
    var wildcards_1 = require_wildcards();
    Object.defineProperty(exports, "__", { enumerable: true, get: function() {
      return wildcards_1.__;
    } });
    var match2 = (value) => builder(value, []);
    exports.match = match2;
    var builder = (value, cases) => {
      const run = () => {
        const entry = cases.find(({ test: test2 }) => test2(value));
        if (!entry) {
          let displayedValue;
          try {
            displayedValue = JSON.stringify(value);
          } catch (e2) {
            displayedValue = value;
          }
          throw new Error(`Pattern matching error: no pattern matches value ${displayedValue}`);
        }
        return entry.handler(entry.select(value), value);
      };
      return {
        with(...args) {
          const handler = args[args.length - 1];
          const patterns = [];
          const predicates = [];
          for (let i2 = 0; i2 < args.length - 1; i2++) {
            const arg = args[i2];
            if (typeof arg === "function") {
              predicates.push(arg);
            } else {
              patterns.push(arg);
            }
          }
          let selected = {};
          const doesMatch = (value2) => Boolean(patterns.some((pattern) => matchPattern(pattern, value2, (key, value3) => {
            selected[key] = value3;
          })) && predicates.every((predicate) => predicate(value2)));
          return builder(value, cases.concat([
            {
              test: doesMatch,
              handler,
              select: (value2) => Object.keys(selected).length ? symbols.AnonymousSelectKey in selected ? selected[symbols.AnonymousSelectKey] : selected : value2
            }
          ]));
        },
        when: (predicate, handler) => builder(value, cases.concat([
          {
            test: predicate,
            handler,
            select: (value2) => value2
          }
        ])),
        otherwise: (handler) => builder(value, cases.concat([
          {
            test: () => true,
            handler,
            select: (value2) => value2
          }
        ])).run(),
        exhaustive: () => run(),
        run
      };
    };
    var isObject = (value) => Boolean(value && typeof value === "object");
    var isGuardPattern = (x2) => {
      const pattern = x2;
      return pattern && pattern[symbols.PatternKind] === symbols.Guard;
    };
    var isNotPattern = (x2) => {
      const pattern = x2;
      return pattern && pattern[symbols.PatternKind] === symbols.Not;
    };
    var isSelectPattern = (x2) => {
      const pattern = x2;
      return pattern && pattern[symbols.PatternKind] === symbols.Select;
    };
    var matchPattern = (pattern, value, select) => {
      if (isObject(pattern)) {
        if (isGuardPattern(pattern))
          return Boolean(pattern[symbols.Guard](value));
        if (isSelectPattern(pattern)) {
          select(pattern[symbols.Select], value);
          return true;
        }
        if (isNotPattern(pattern))
          return !matchPattern(pattern[symbols.Not], value, select);
        if (!isObject(value))
          return false;
        if (Array.isArray(pattern)) {
          if (!Array.isArray(value))
            return false;
          if (pattern.length === 1) {
            const selected = {};
            const listSelect = (key, value2) => {
              selected[key] = (selected[key] || []).concat([value2]);
            };
            const doesMatch = value.every((v3) => matchPattern(pattern[0], v3, listSelect));
            if (doesMatch) {
              Object.keys(selected).forEach((key) => select(key, selected[key]));
            }
            return doesMatch;
          }
          return pattern.length === value.length ? pattern.every((subPattern, i2) => matchPattern(subPattern, value[i2], select)) : false;
        }
        if (pattern instanceof Map) {
          if (!(value instanceof Map))
            return false;
          return [...pattern.keys()].every((key) => matchPattern(pattern.get(key), value.get(key), select));
        }
        if (pattern instanceof Set) {
          if (!(value instanceof Set))
            return false;
          if (pattern.size === 0)
            return value.size === 0;
          if (pattern.size === 1) {
            const [subPattern] = [...pattern.values()];
            return Object.values(wildcards_1.__).includes(subPattern) ? matchPattern([subPattern], [...value.values()], select) : value.has(subPattern);
          }
          return [...pattern.values()].every((subPattern) => value.has(subPattern));
        }
        return Object.keys(pattern).every((k) => k in value && matchPattern(pattern[k], value[k], select));
      }
      return value === pattern;
    };
    function isMatching(...args) {
      if (args.length === 1) {
        const [pattern] = args;
        return (value) => matchPattern(pattern, value, () => {
        });
      }
      if (args.length === 2) {
        const [pattern, value] = args;
        return matchPattern(pattern, value, () => {
        });
      }
      throw new Error(`isMatching wasn't given enough arguments: expected 1 or 2, received ${args.length}.`);
    }
    exports.isMatching = isMatching;
  }
});

// node_modules/@jsonhero/schema-infer/lib/inferredSchema.js
var require_inferredSchema = __commonJS({
  "node_modules/@jsonhero/schema-infer/lib/inferredSchema.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inferRange = void 0;
    function inferRange(value, range = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }) {
      return {
        min: Math.min(range.min, value),
        max: Math.max(range.max, value)
      };
    }
    exports.inferRange = inferRange;
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    init_react();
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_2) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    init_react();
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    init_react();
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    init_react();
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    init_react();
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    init_react();
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    init_react();
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    init_react();
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    init_react();
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    init_react();
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    init_react();
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    init_react();
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    init_react();
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    init_react();
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    init_react();
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    init_react();
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    init_react();
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    init_react();
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e2) {
      }
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
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    init_react();
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    init_react();
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    init_react();
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    init_react();
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    init_react();
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    init_react();
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    init_react();
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    init_react();
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    init_react();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    init_react();
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    init_react();
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    init_react();
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    init_react();
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    init_react();
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    init_react();
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    init_react();
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    init_react();
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    init_react();
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    init_react();
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    init_react();
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    init_react();
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    init_react();
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    init_react();
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    init_react();
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    init_react();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
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
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    init_react();
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_arrayEach.js
var require_arrayEach = __commonJS({
  "node_modules/lodash/_arrayEach.js"(exports, module) {
    init_react();
    function arrayEach(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (iteratee(array[index2], index2, array) === false) {
          break;
        }
      }
      return array;
    }
    module.exports = arrayEach;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e2) {
      }
    }();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    init_react();
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    init_react();
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "node_modules/lodash/_copyObject.js"(exports, module) {
    init_react();
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index2 = -1, length = props.length;
      while (++index2 < length) {
        var key = props[index2];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    init_react();
    function baseTimes(n3, iteratee) {
      var index2 = -1, result = Array(n3);
      while (++index2 < n3) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    init_react();
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    init_react();
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    init_react();
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    init_react();
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    init_react();
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    init_react();
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    init_react();
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    init_react();
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    init_react();
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    init_react();
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    init_react();
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types2 = freeModule && freeModule.require && freeModule.require("util").types;
        if (types2) {
          return types2;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    init_react();
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    init_react();
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    init_react();
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    init_react();
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    init_react();
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    init_react();
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    init_react();
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    init_react();
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_baseAssign.js
var require_baseAssign = __commonJS({
  "node_modules/lodash/_baseAssign.js"(exports, module) {
    init_react();
    var copyObject = require_copyObject();
    var keys = require_keys();
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    module.exports = baseAssign;
  }
});

// node_modules/lodash/_nativeKeysIn.js
var require_nativeKeysIn = __commonJS({
  "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
    init_react();
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = nativeKeysIn;
  }
});

// node_modules/lodash/_baseKeysIn.js
var require_baseKeysIn = __commonJS({
  "node_modules/lodash/_baseKeysIn.js"(exports, module) {
    init_react();
    var isObject = require_isObject();
    var isPrototype = require_isPrototype();
    var nativeKeysIn = require_nativeKeysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeysIn;
  }
});

// node_modules/lodash/keysIn.js
var require_keysIn = __commonJS({
  "node_modules/lodash/keysIn.js"(exports, module) {
    init_react();
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeysIn = require_baseKeysIn();
    var isArrayLike = require_isArrayLike();
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module.exports = keysIn;
  }
});

// node_modules/lodash/_baseAssignIn.js
var require_baseAssignIn = __commonJS({
  "node_modules/lodash/_baseAssignIn.js"(exports, module) {
    init_react();
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }
    module.exports = baseAssignIn;
  }
});

// node_modules/lodash/_cloneBuffer.js
var require_cloneBuffer = __commonJS({
  "node_modules/lodash/_cloneBuffer.js"(exports, module) {
    init_react();
    var root = require_root();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  }
});

// node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "node_modules/lodash/_copyArray.js"(exports, module) {
    init_react();
    function copyArray(source, array) {
      var index2 = -1, length = source.length;
      array || (array = Array(length));
      while (++index2 < length) {
        array[index2] = source[index2];
      }
      return array;
    }
    module.exports = copyArray;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    init_react();
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    init_react();
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    init_react();
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_copySymbols.js
var require_copySymbols = __commonJS({
  "node_modules/lodash/_copySymbols.js"(exports, module) {
    init_react();
    var copyObject = require_copyObject();
    var getSymbols = require_getSymbols();
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    module.exports = copySymbols;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    init_react();
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  "node_modules/lodash/_getPrototype.js"(exports, module) {
    init_react();
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }
});

// node_modules/lodash/_getSymbolsIn.js
var require_getSymbolsIn = __commonJS({
  "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
    init_react();
    var arrayPush = require_arrayPush();
    var getPrototype = require_getPrototype();
    var getSymbols = require_getSymbols();
    var stubArray = require_stubArray();
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    module.exports = getSymbolsIn;
  }
});

// node_modules/lodash/_copySymbolsIn.js
var require_copySymbolsIn = __commonJS({
  "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
    init_react();
    var copyObject = require_copyObject();
    var getSymbolsIn = require_getSymbolsIn();
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }
    module.exports = copySymbolsIn;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    init_react();
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    init_react();
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_getAllKeysIn.js
var require_getAllKeysIn = __commonJS({
  "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
    init_react();
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbolsIn = require_getSymbolsIn();
    var keysIn = require_keysIn();
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    module.exports = getAllKeysIn;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    init_react();
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    init_react();
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_initCloneArray.js
var require_initCloneArray = __commonJS({
  "node_modules/lodash/_initCloneArray.js"(exports, module) {
    init_react();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function initCloneArray(array) {
      var length = array.length, result = new array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    module.exports = initCloneArray;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    init_react();
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_cloneArrayBuffer.js
var require_cloneArrayBuffer = __commonJS({
  "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
    init_react();
    var Uint8Array = require_Uint8Array();
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    module.exports = cloneArrayBuffer;
  }
});

// node_modules/lodash/_cloneDataView.js
var require_cloneDataView = __commonJS({
  "node_modules/lodash/_cloneDataView.js"(exports, module) {
    init_react();
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    module.exports = cloneDataView;
  }
});

// node_modules/lodash/_cloneRegExp.js
var require_cloneRegExp = __commonJS({
  "node_modules/lodash/_cloneRegExp.js"(exports, module) {
    init_react();
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    module.exports = cloneRegExp;
  }
});

// node_modules/lodash/_cloneSymbol.js
var require_cloneSymbol = __commonJS({
  "node_modules/lodash/_cloneSymbol.js"(exports, module) {
    init_react();
    var Symbol2 = require_Symbol();
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    module.exports = cloneSymbol;
  }
});

// node_modules/lodash/_cloneTypedArray.js
var require_cloneTypedArray = __commonJS({
  "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
    init_react();
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    module.exports = cloneTypedArray;
  }
});

// node_modules/lodash/_initCloneByTag.js
var require_initCloneByTag = __commonJS({
  "node_modules/lodash/_initCloneByTag.js"(exports, module) {
    init_react();
    var cloneArrayBuffer = require_cloneArrayBuffer();
    var cloneDataView = require_cloneDataView();
    var cloneRegExp = require_cloneRegExp();
    var cloneSymbol = require_cloneSymbol();
    var cloneTypedArray = require_cloneTypedArray();
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return new Ctor();
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return new Ctor();
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    module.exports = initCloneByTag;
  }
});

// node_modules/lodash/_baseCreate.js
var require_baseCreate = __commonJS({
  "node_modules/lodash/_baseCreate.js"(exports, module) {
    init_react();
    var isObject = require_isObject();
    var objectCreate = Object.create;
    var baseCreate = function() {
      function object() {
      }
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    }();
    module.exports = baseCreate;
  }
});

// node_modules/lodash/_initCloneObject.js
var require_initCloneObject = __commonJS({
  "node_modules/lodash/_initCloneObject.js"(exports, module) {
    init_react();
    var baseCreate = require_baseCreate();
    var getPrototype = require_getPrototype();
    var isPrototype = require_isPrototype();
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    module.exports = initCloneObject;
  }
});

// node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "node_modules/lodash/_baseIsMap.js"(exports, module) {
    init_react();
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "node_modules/lodash/isMap.js"(exports, module) {
    init_react();
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

// node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "node_modules/lodash/_baseIsSet.js"(exports, module) {
    init_react();
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "node_modules/lodash/isSet.js"(exports, module) {
    init_react();
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

// node_modules/lodash/_baseClone.js
var require_baseClone = __commonJS({
  "node_modules/lodash/_baseClone.js"(exports, module) {
    init_react();
    var Stack = require_Stack();
    var arrayEach = require_arrayEach();
    var assignValue = require_assignValue();
    var baseAssign = require_baseAssign();
    var baseAssignIn = require_baseAssignIn();
    var cloneBuffer = require_cloneBuffer();
    var copyArray = require_copyArray();
    var copySymbols = require_copySymbols();
    var copySymbolsIn = require_copySymbolsIn();
    var getAllKeys = require_getAllKeys();
    var getAllKeysIn = require_getAllKeysIn();
    var getTag = require_getTag();
    var initCloneArray = require_initCloneArray();
    var initCloneByTag = require_initCloneByTag();
    var initCloneObject = require_initCloneObject();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isMap = require_isMap();
    var isObject = require_isObject();
    var isSet = require_isSet();
    var keys = require_keys();
    var keysIn = require_keysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key2) {
          result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
      return result;
    }
    module.exports = baseClone;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    init_react();
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    init_react();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    init_react();
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize2(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize2.Cache || MapCache)();
      return memoized;
    }
    memoize2.Cache = MapCache;
    module.exports = memoize2;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    init_react();
    var memoize2 = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize2(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    init_react();
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match2, number2, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match2);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    init_react();
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    init_react();
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    init_react();
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/last.js
var require_last = __commonJS({
  "node_modules/lodash/last.js"(exports, module) {
    init_react();
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : void 0;
    }
    module.exports = last;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    init_react();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    init_react();
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index2 = 0, length = path.length;
      while (object != null && index2 < length) {
        object = object[toKey(path[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/_baseSlice.js
var require_baseSlice = __commonJS({
  "node_modules/lodash/_baseSlice.js"(exports, module) {
    init_react();
    function baseSlice(array, start, end) {
      var index2 = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index2 < length) {
        result[index2] = array[index2 + start];
      }
      return result;
    }
    module.exports = baseSlice;
  }
});

// node_modules/lodash/_parent.js
var require_parent = __commonJS({
  "node_modules/lodash/_parent.js"(exports, module) {
    init_react();
    var baseGet = require_baseGet();
    var baseSlice = require_baseSlice();
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }
    module.exports = parent;
  }
});

// node_modules/lodash/_baseUnset.js
var require_baseUnset = __commonJS({
  "node_modules/lodash/_baseUnset.js"(exports, module) {
    init_react();
    var castPath = require_castPath();
    var last = require_last();
    var parent = require_parent();
    var toKey = require_toKey();
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }
    module.exports = baseUnset;
  }
});

// node_modules/lodash/isPlainObject.js
var require_isPlainObject = __commonJS({
  "node_modules/lodash/isPlainObject.js"(exports, module) {
    init_react();
    var baseGetTag = require_baseGetTag();
    var getPrototype = require_getPrototype();
    var isObjectLike = require_isObjectLike();
    var objectTag = "[object Object]";
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject2(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject2;
  }
});

// node_modules/lodash/_customOmitClone.js
var require_customOmitClone = __commonJS({
  "node_modules/lodash/_customOmitClone.js"(exports, module) {
    init_react();
    var isPlainObject2 = require_isPlainObject();
    function customOmitClone(value) {
      return isPlainObject2(value) ? void 0 : value;
    }
    module.exports = customOmitClone;
  }
});

// node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/lodash/_isFlattenable.js"(exports, module) {
    init_react();
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/lodash/_baseFlatten.js"(exports, module) {
    init_react();
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index2 = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index2 < length) {
        var value = array[index2];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "node_modules/lodash/flatten.js"(exports, module) {
    init_react();
    var baseFlatten = require_baseFlatten();
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    module.exports = flatten;
  }
});

// node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "node_modules/lodash/_apply.js"(exports, module) {
    init_react();
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "node_modules/lodash/_overRest.js"(exports, module) {
    init_react();
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index2 < length) {
          array[index2] = args[start + index2];
        }
        index2 = -1;
        var otherArgs = Array(start + 1);
        while (++index2 < start) {
          otherArgs[index2] = args[index2];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// node_modules/lodash/constant.js
var require_constant = __commonJS({
  "node_modules/lodash/constant.js"(exports, module) {
    init_react();
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    init_react();
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "node_modules/lodash/_baseSetToString.js"(exports, module) {
    init_react();
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity = require_identity();
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "node_modules/lodash/_shortOut.js"(exports, module) {
    init_react();
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "node_modules/lodash/_setToString.js"(exports, module) {
    init_react();
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "node_modules/lodash/_flatRest.js"(exports, module) {
    init_react();
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

// node_modules/lodash/omit.js
var require_omit = __commonJS({
  "node_modules/lodash/omit.js"(exports, module) {
    init_react();
    var arrayMap = require_arrayMap();
    var baseClone = require_baseClone();
    var baseUnset = require_baseUnset();
    var castPath = require_castPath();
    var copyObject = require_copyObject();
    var customOmitClone = require_customOmitClone();
    var flatRest = require_flatRest();
    var getAllKeysIn = require_getAllKeysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });
    module.exports = omit;
  }
});

// node_modules/@jsonhero/json-schema-fns/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@jsonhero/json-schema-fns/lib/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepmerge = require_cjs();
    var omit = require_omit();
    function _interopDefaultLegacy(e2) {
      return e2 && typeof e2 === "object" && "default" in e2 ? e2 : { "default": e2 };
    }
    var deepmerge__default = /* @__PURE__ */ _interopDefaultLegacy(deepmerge);
    var omit__default = /* @__PURE__ */ _interopDefaultLegacy(omit);
    var __assign4 = function() {
      __assign4 = Object.assign || function __assign5(t3) {
        for (var s4, i2 = 1, n3 = arguments.length; i2 < n3; i2++) {
          s4 = arguments[i2];
          for (var p3 in s4)
            if (Object.prototype.hasOwnProperty.call(s4, p3))
              t3[p3] = s4[p3];
        }
        return t3;
      };
      return __assign4.apply(this, arguments);
    };
    var $schema = "https://json-schema.org/draft/2020-12/schema";
    var SchemaBuilder = function() {
      function SchemaBuilder2(s4) {
        this.schema = s4;
      }
      SchemaBuilder2.prototype.apply = function(builder) {
        this.schema = deepmerge__default["default"](this.schema, builder.schema);
      };
      SchemaBuilder2.prototype.toSchema = function() {
        return this.schema;
      };
      SchemaBuilder2.prototype.toSchemaDocument = function() {
        if (typeof this.schema === "boolean") {
          return this.schema;
        }
        return __assign4({ $schema }, this.schema);
      };
      return SchemaBuilder2;
    }();
    var objectBuilder = function(schema) {
      return new SchemaBuilder(__assign4({}, schema));
    };
    function object(options) {
      var _a;
      var properties2 = (options === null || options === void 0 ? void 0 : options.properties) || [];
      var additionalOptions = omit__default["default"](options, [
        "properties",
        "propertyNames",
        "additionalProperties",
        "defs"
      ]);
      var schema = new SchemaBuilder(__assign4({ type: "object" }, additionalOptions));
      for (var _i = 0, properties_1 = properties2; _i < properties_1.length; _i++) {
        var property_1 = properties_1[_i];
        schema.apply(property_1);
      }
      if (options === null || options === void 0 ? void 0 : options.propertyNames) {
        schema.apply(objectBuilder({
          propertyNames: {
            pattern: options.propertyNames
          }
        }));
      }
      if (options === null || options === void 0 ? void 0 : options.additionalProperties) {
        schema.apply(objectBuilder({
          additionalProperties: (_a = options.additionalProperties) === null || _a === void 0 ? void 0 : _a.toSchema()
        }));
      }
      if (options === null || options === void 0 ? void 0 : options.defs) {
        for (var _b = 0, _c = options.defs; _b < _c.length; _b++) {
          var def_1 = _c[_b];
          schema.apply(def_1);
        }
      }
      return schema;
    }
    function properties() {
      var props = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
      }
      var schema = new SchemaBuilder({});
      for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {
        var property_2 = props_1[_a];
        schema.apply(property_2);
      }
      return schema;
    }
    function requiredProperty(name, schema, options) {
      var _a, _b;
      var _c;
      return objectBuilder(Object.assign({
        properties: (_a = {}, _a[name] = schema.toSchema(), _a),
        required: [name]
      }, (options === null || options === void 0 ? void 0 : options.dependentSchema) ? { dependentSchemas: (_b = {}, _b[name] = (_c = options.dependentSchema) === null || _c === void 0 ? void 0 : _c.toSchema(), _b) } : {}));
    }
    function property(name, schema, options) {
      var _a, _b, _c;
      var _d;
      return objectBuilder(Object.assign({
        properties: (_a = {}, _a[name] = schema.toSchema(), _a)
      }, (options === null || options === void 0 ? void 0 : options.dependsOn) ? { dependentRequired: (_b = {}, _b[name] = options.dependsOn, _b) } : {}, (options === null || options === void 0 ? void 0 : options.dependentSchema) ? { dependentSchemas: (_c = {}, _c[name] = (_d = options.dependentSchema) === null || _d === void 0 ? void 0 : _d.toSchema(), _c) } : {}));
    }
    function patternProperty(pattern, schema) {
      var _a;
      return objectBuilder({
        patternProperties: (_a = {}, _a[pattern] = schema.toSchema(), _a)
      });
    }
    var arrayBuilder = function(schema) {
      return new SchemaBuilder(__assign4({}, schema));
    };
    function array(options) {
      var additionalOptions = omit__default["default"](options, [
        "items",
        "prefixItems",
        "unevaluatedItems",
        "contains",
        "defs"
      ]);
      var schema = new SchemaBuilder(__assign4({ type: "array" }, additionalOptions));
      var items = options === null || options === void 0 ? void 0 : options.items;
      if (typeof items !== "undefined") {
        if (typeof items === "boolean") {
          schema.apply(arrayBuilder({
            items
          }));
        } else {
          schema.apply(arrayBuilder({ items: items.toSchema() }));
        }
      }
      if (options === null || options === void 0 ? void 0 : options.prefixItems) {
        for (var _i = 0, _a = options.prefixItems; _i < _a.length; _i++) {
          var item = _a[_i];
          schema.apply(arrayBuilder({ prefixItems: [item.toSchema()] }));
        }
      }
      var unevaluatedItems = options === null || options === void 0 ? void 0 : options.unevaluatedItems;
      if (typeof unevaluatedItems !== "undefined") {
        if (typeof unevaluatedItems === "boolean") {
          schema.apply(arrayBuilder({
            unevaluatedItems
          }));
        } else {
          schema.apply(arrayBuilder({ unevaluatedItems: unevaluatedItems.toSchema() }));
        }
      }
      if (options === null || options === void 0 ? void 0 : options.contains) {
        schema.apply(arrayBuilder({
          contains: options.contains.schema.toSchema(),
          minContains: options.contains.min,
          maxContains: options.contains.max
        }));
      }
      if (options === null || options === void 0 ? void 0 : options.defs) {
        for (var _b = 0, _c = options.defs; _b < _c.length; _b++) {
          var def_2 = _c[_b];
          schema.apply(def_2);
        }
      }
      return schema;
    }
    function string(options) {
      return new SchemaBuilder(__assign4({ type: "string" }, options));
    }
    function integer(options) {
      return new SchemaBuilder(__assign4({ type: "integer" }, options));
    }
    function number2(options) {
      return new SchemaBuilder(__assign4({ type: "number" }, options));
    }
    function nil(options) {
      return new SchemaBuilder(__assign4({ type: "null" }, options));
    }
    function boolean(options) {
      return new SchemaBuilder(__assign4({ type: "boolean" }, options));
    }
    function nullable(schema) {
      var nullableSchema = schema.toSchema();
      if (typeof nullableSchema === "boolean" || nullableSchema.type === "null" || typeof nullableSchema.type === "undefined") {
        return schema;
      }
      var type = Array.isArray(nullableSchema.type) ? nullableSchema.type.concat("null") : [nullableSchema.type, "null"];
      return new SchemaBuilder(__assign4(__assign4({}, nullableSchema), { type }));
    }
    function anyOf() {
      var schemas = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
      }
      return new SchemaBuilder({
        anyOf: schemas.map(function(s4) {
          return s4.toSchema();
        })
      });
    }
    function allOf() {
      var schemas = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
      }
      return new SchemaBuilder({
        allOf: schemas.map(function(s4) {
          return s4.toSchema();
        })
      });
    }
    function oneOf() {
      var schemas = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
      }
      return new SchemaBuilder({
        oneOf: schemas.map(function(s4) {
          return s4.toSchema();
        })
      });
    }
    function not(schema) {
      return new SchemaBuilder({
        not: schema.toSchema()
      });
    }
    function concat() {
      var schemas = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
      }
      return new SchemaBuilder(schemas.reduce(function(acc, s4) {
        var schema = s4.toSchema();
        if (typeof acc === "boolean") {
          if (typeof schema === "boolean") {
            return acc || schema;
          } else {
            return schema;
          }
        } else if (typeof schema === "boolean") {
          return acc;
        }
        return __assign4(__assign4({}, acc), schema);
      }, {}));
    }
    function ifThenElse(condition, then, thenElse) {
      return new SchemaBuilder({
        if: condition.toSchema(),
        then: then.toSchema(),
        else: thenElse.toSchema()
      });
    }
    function ifThen(condition, then) {
      return new SchemaBuilder({
        if: condition.toSchema(),
        then: then.toSchema()
      });
    }
    function def(name, schema) {
      var _a;
      return new SchemaBuilder({
        $defs: (_a = {}, _a[name] = schema.toSchema(), _a)
      });
    }
    function ref(def2) {
      return new SchemaBuilder({
        $ref: "#/$defs/".concat(def2)
      });
    }
    function constant(value) {
      return new SchemaBuilder({
        const: value
      });
    }
    function enumerator() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      return new SchemaBuilder({
        enum: values
      });
    }
    function $false() {
      return new SchemaBuilder(false);
    }
    function $true() {
      return new SchemaBuilder(true);
    }
    var s3 = {
      object,
      properties,
      requiredProperty,
      property,
      patternProperty,
      array,
      string,
      integer,
      number: number2,
      nil,
      boolean,
      nullable,
      anyOf,
      allOf,
      oneOf,
      not,
      concat,
      ifThenElse,
      ifThen,
      def,
      ref,
      constant,
      enumerator,
      $false,
      $true
    };
    exports.$schema = $schema;
    exports.s = s3;
  }
});

// node_modules/@jsonhero/schema-infer/lib/jsonSchema/index.js
var require_jsonSchema = __commonJS({
  "node_modules/@jsonhero/schema-infer/lib/jsonSchema/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toJSONSchema = void 0;
    var ts_pattern_1 = require_lib2();
    var json_schema_fns_1 = require_lib3();
    function toJSONSchema(inferredSchema) {
      return (0, ts_pattern_1.match)(inferredSchema).with({ type: "unknown" }, () => json_schema_fns_1.s.$false()).with({ type: "boolean" }, () => json_schema_fns_1.s.boolean()).with({ type: "nullable" }, ({ schema }) => schema.type == "unknown" ? json_schema_fns_1.s.nil() : schema.type === "nullable" ? toJSONSchema(schema) : json_schema_fns_1.s.nullable(toJSONSchema(schema))).with({ type: "int" }, () => {
        return json_schema_fns_1.s.integer();
      }).with({ type: "float" }, () => {
        return json_schema_fns_1.s.number();
      }).with({ type: "string" }, ({ format }) => {
        const formatString = toJSONStringFormat(format);
        return json_schema_fns_1.s.string(formatString ? { format: formatString } : {});
      }).with({ type: "array" }, (inferredArray) => {
        const items = toJSONSchema(inferredArray.items);
        return json_schema_fns_1.s.array({ items });
      }).with({ type: "object" }, (inferredObject) => {
        const requiredProperties = Object.entries(inferredObject.properties.required).map(([key, value]) => json_schema_fns_1.s.requiredProperty(key, toJSONSchema(value)));
        const optionalProperties = Object.entries(inferredObject.properties.optional).map(([key, value]) => json_schema_fns_1.s.property(key, toJSONSchema(value)));
        return json_schema_fns_1.s.object({ properties: requiredProperties.concat(optionalProperties) });
      }).with({ type: "any" }, ({ schemas }) => {
        return json_schema_fns_1.s.anyOf(...Array.from(schemas).map(toJSONSchema));
      }).exhaustive();
    }
    exports.toJSONSchema = toJSONSchema;
    function toJSONStringFormat(format) {
      if (!format) {
        return void 0;
      }
      switch (format.name) {
        case "hostname":
          return "hostname";
        case "ip":
          return format.variant == "v4" ? "ipv4" : "ipv6";
        case "uri":
          return "uri";
        case "email":
          return "email";
        case "datetime":
          switch (format.parts) {
            case "datetime":
              return "date-time";
            case "date":
              return "date";
            case "time":
              return "time";
            default:
              return void 0;
          }
        case "uuid":
          return "uuid";
      }
      return void 0;
    }
  }
});

// node_modules/lodash.omit/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.omit/index.js"(exports, module) {
    init_react();
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayIncludes(array, value) {
      var length = array ? array.length : 0;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index2 = -1, length = array ? array.length : 0;
      while (++index2 < length) {
        if (comparator(value, array[index2])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array ? array.length : 0, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index2-- : ++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return index2;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index2 = fromIndex - 1, length = array.length;
      while (++index2 < length) {
        if (array[index2] === value) {
          return index2;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseTimes(n3, iteratee) {
      var index2 = -1, result = Array(n3);
      while (++index2 < n3) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e2) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Symbol2 = root.Symbol;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeMax = Math.max;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    function Hash(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index2 = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseDifference(array, values, iteratee, comparator) {
      var index2 = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
        while (++index2 < length) {
          var value = array[index2], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
      return result;
    }
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index2 = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index2 < length) {
        var value = array[index2];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    function basePick(object, props) {
      object = Object(object);
      return basePickBy(object, props, function(value, key) {
        return key in object;
      });
    }
    function basePickBy(object, props, predicate) {
      var index2 = -1, length = props.length, result = {};
      while (++index2 < length) {
        var key = props[index2], value = object[key];
        if (predicate(value, key)) {
          result[key] = value;
        }
      }
      return result;
    }
    function baseRest(func, start) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index2 < length) {
          array[index2] = args[start + index2];
        }
        index2 = -1;
        var otherArgs = Array(start + 1);
        while (++index2 < start) {
          otherArgs[index2] = args[index2];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    var omit = baseRest(function(object, props) {
      if (object == null) {
        return {};
      }
      props = arrayMap(baseFlatten(props, 1), toKey);
      return basePick(object, baseDifference(getAllKeysIn(object), props));
    });
    function stubArray() {
      return [];
    }
    module.exports = omit;
  }
});

// node_modules/@jsonhero/schema-infer/lib/SchemaInference.js
var require_SchemaInference = __commonJS({
  "node_modules/@jsonhero/schema-infer/lib/SchemaInference.js"(exports) {
    "use strict";
    init_react();
    var __importDefault4 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts_pattern_1 = require_lib2();
    var json_infer_types_1 = (init_lib(), __toCommonJS(lib_exports));
    var inferredSchema_1 = require_inferredSchema();
    var jsonSchema_1 = require_jsonSchema();
    var lodash_omit_1 = __importDefault4(require_lodash());
    function convertToAnySchema(schema, value) {
      const schemas = /* @__PURE__ */ new Set([schema]);
      schemas.add(infer({ type: "unknown" }, value));
      return {
        type: "any",
        schemas
      };
    }
    function infer(inferredSchema, value) {
      const inferredValueType = (0, json_infer_types_1.inferType)(value);
      const result = (0, ts_pattern_1.match)([
        inferredSchema,
        inferredValueType
      ]).with([ts_pattern_1.__, { name: "null" }], ([subSchema]) => ({
        type: "nullable",
        schema: subSchema
      })).with([{ type: "nullable" }, ts_pattern_1.__], ([nullable, { value: value2 }]) => {
        const subSchema = infer(nullable.schema, value2);
        return {
          type: "nullable",
          schema: subSchema
        };
      }).with([{ type: "unknown" }, { name: "bool" }], () => ({ type: "boolean" })).with([{ type: "unknown" }, { name: "int" }], ([, inferredInt]) => ({
        type: "int",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value)
      })).with([{ type: "unknown" }, { name: "float" }], ([, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value)
      })).with([{ type: "unknown" }, { name: "string" }], ([, { format }]) => ({
        type: "string",
        format
      })).with([{ type: "unknown" }, { name: "array" }], ([, inferredArray]) => {
        let itemInferredSchema = {
          type: "unknown"
        };
        for (const item of inferredArray.value) {
          itemInferredSchema = infer(itemInferredSchema, item);
        }
        return {
          type: "array",
          items: itemInferredSchema
        };
      }).with([{ type: "array" }, { name: "array" }], ([arraySchema, inferredArray]) => {
        let itemInferredSchema = arraySchema.items;
        for (const item of inferredArray.value) {
          itemInferredSchema = infer(itemInferredSchema, item);
        }
        return {
          type: "array",
          items: itemInferredSchema
        };
      }).with([{ type: "array" }, ts_pattern_1.__], ([inferredArray]) => convertToAnySchema(inferredArray, value)).with([{ type: "unknown" }, { name: "object" }], ([, inferredType]) => {
        const required = Object.entries(inferredType.value).reduce((acc, [key, value2]) => ({
          ...acc,
          [key]: infer({ type: "unknown" }, value2)
        }), {});
        return {
          type: "object",
          properties: {
            required,
            optional: {}
          }
        };
      }).with([{ type: "object" }, { name: "object" }], ([{ properties }, { value: value2 }]) => {
        const { required, optional } = properties;
        const missingRequiredKeys = Object.keys(required).filter((key) => !Object.prototype.hasOwnProperty.call(value2, key));
        for (const missingRequiredKey of missingRequiredKeys) {
          optional[missingRequiredKey] = required[missingRequiredKey];
        }
        const nextRequired = (0, lodash_omit_1.default)(required, missingRequiredKeys);
        for (const [k, v3] of Object.entries(value2)) {
          if (Object.prototype.hasOwnProperty.call(nextRequired, k)) {
            nextRequired[k] = infer(required[k], v3);
          } else if (Object.prototype.hasOwnProperty.call(optional, k)) {
            optional[k] = infer(optional[k], v3);
          } else {
            optional[k] = infer({ type: "unknown" }, v3);
          }
        }
        return {
          type: "object",
          properties: {
            required: nextRequired,
            optional
          }
        };
      }).with([{ type: "object" }, ts_pattern_1.__], ([inferredObject]) => convertToAnySchema(inferredObject, value)).with([{ type: "any" }, ts_pattern_1.__], ([anySchema]) => {
        const schemas = new Set(anySchema.schemas);
        schemas.add(infer({ type: "unknown" }, value));
        return {
          type: "any",
          schemas
        };
      }).with([{ type: "boolean" }, { name: "bool" }], () => ({ type: "boolean" })).with([{ type: "boolean" }, ts_pattern_1.__], ([inferredBool]) => convertToAnySchema(inferredBool, value)).with([{ type: "int" }, { name: "int" }], ([intSchema, inferredInt]) => ({
        type: "int",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value, intSchema.range)
      })).with([{ type: "int" }, { name: "float" }], ([intSchema, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value, intSchema.range)
      })).with([{ type: "int" }, ts_pattern_1.__], ([inferredInt]) => convertToAnySchema(inferredInt, value)).with([{ type: "float" }, { name: "float" }], ([floatSchema, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value, floatSchema.range)
      })).with([{ type: "float" }, { name: "int" }], ([floatSchema, inferredInt]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value, floatSchema.range)
      })).with([{ type: "float" }, ts_pattern_1.__], ([inferredFloat]) => convertToAnySchema(inferredFloat, value)).with([
        { type: "string", format: ts_pattern_1.__.nullish },
        { name: "string", format: ts_pattern_1.__.nullish }
      ], () => ({ type: "string" })).with([
        { type: "string", format: ts_pattern_1.__.nullish },
        { name: "string", format: { name: ts_pattern_1.__.string } }
      ], () => ({ type: "string" })).with([
        { type: "string", format: { name: ts_pattern_1.__.string } },
        { name: "string", format: ts_pattern_1.__.nullish }
      ], () => ({ type: "string" })).with([
        { type: "string", format: { name: ts_pattern_1.__.string } },
        { name: "string", format: { name: ts_pattern_1.__.string } }
      ], ([{ format: schemaFormat }, { format }]) => {
        if (schemaFormat.name !== format.name) {
          return {
            type: "string"
          };
        }
        return { type: "string", format };
      }).with([{ type: "string" }, { name: "string" }], () => ({
        type: "string"
      })).with([{ type: "string" }, ts_pattern_1.__], ([inferredString]) => convertToAnySchema(inferredString, value)).exhaustive();
      return result;
    }
    var SchemaInferrer = class {
      constructor(snapshot) {
        this.inferredSchema = { type: "unknown" };
        if (snapshot) {
          this.inferredSchema = snapshot;
        }
      }
      infer(value, inference) {
        this.inferredSchema = infer(inference ? inference.inferredSchema : this.inferredSchema, value);
      }
      toJSONSchema(options) {
        if (options?.includeSchema) {
          return (0, jsonSchema_1.toJSONSchema)(this.inferredSchema).toSchemaDocument();
        } else {
          return (0, jsonSchema_1.toJSONSchema)(this.inferredSchema).toSchema();
        }
      }
      toSnapshot() {
        return this.inferredSchema;
      }
    };
    exports.default = SchemaInferrer;
  }
});

// node_modules/@jsonhero/schema-infer/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/@jsonhero/schema-infer/lib/index.js"(exports) {
    "use strict";
    init_react();
    var __importDefault4 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.restoreSnapshot = exports.inferSchema = void 0;
    var SchemaInference_1 = __importDefault4(require_SchemaInference());
    function inferSchema2(value, inference) {
      const schemaInferrer = new SchemaInference_1.default();
      schemaInferrer.infer(value, inference);
      return schemaInferrer;
    }
    exports.inferSchema = inferSchema2;
    function restoreSnapshot(snapshot) {
      return new SchemaInference_1.default(snapshot);
    }
    exports.restoreSnapshot = restoreSnapshot;
  }
});

// node_modules/downshift/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/downshift/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_react();
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
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
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
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
        function isForwardRef2(object) {
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
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment2;
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
        exports.isForwardRef = isForwardRef2;
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

// node_modules/downshift/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/downshift/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/downshift/node_modules/tslib/tslib.js
var require_tslib3 = __commonJS({
  "node_modules/downshift/node_modules/tslib/tslib.js"(exports, module) {
    init_react();
    var __extends4;
    var __assign4;
    var __rest4;
    var __decorate4;
    var __param4;
    var __metadata4;
    var __awaiter4;
    var __generator4;
    var __exportStar4;
    var __values4;
    var __read4;
    var __spread4;
    var __spreadArrays4;
    var __spreadArray4;
    var __await4;
    var __asyncGenerator4;
    var __asyncDelegator4;
    var __asyncValues4;
    var __makeTemplateObject4;
    var __importStar4;
    var __importDefault4;
    var __classPrivateFieldGet4;
    var __classPrivateFieldSet4;
    var __createBinding4;
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
        return function(id2, v3) {
          return exports2[id2] = previous ? previous(id2, v3) : v3;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p3 in b5)
          if (Object.prototype.hasOwnProperty.call(b5, p3))
            d4[p3] = b5[p3];
      };
      __extends4 = function(d4, b5) {
        if (typeof b5 !== "function" && b5 !== null)
          throw new TypeError("Class extends value " + String(b5) + " is not a constructor or null");
        extendStatics(d4, b5);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
      };
      __assign4 = Object.assign || function(t3) {
        for (var s3, i2 = 1, n3 = arguments.length; i2 < n3; i2++) {
          s3 = arguments[i2];
          for (var p3 in s3)
            if (Object.prototype.hasOwnProperty.call(s3, p3))
              t3[p3] = s3[p3];
        }
        return t3;
      };
      __rest4 = function(s3, e2) {
        var t3 = {};
        for (var p3 in s3)
          if (Object.prototype.hasOwnProperty.call(s3, p3) && e2.indexOf(p3) < 0)
            t3[p3] = s3[p3];
        if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p3 = Object.getOwnPropertySymbols(s3); i2 < p3.length; i2++) {
            if (e2.indexOf(p3[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p3[i2]))
              t3[p3[i2]] = s3[p3[i2]];
          }
        return t3;
      };
      __decorate4 = function(decorators, target, key, desc) {
        var c3 = arguments.length, r2 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d4 = decorators[i2])
              r2 = (c3 < 3 ? d4(r2) : c3 > 3 ? d4(target, key, r2) : d4(target, key)) || r2;
        return c3 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param4 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata4 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter4 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator4 = function(thisArg, body) {
        var _2 = { label: 0, sent: function() {
          if (t3[0] & 1)
            throw t3[1];
          return t3[1];
        }, trys: [], ops: [] }, f3, y, t3, g2;
        return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
          return this;
        }), g2;
        function verb(n3) {
          return function(v3) {
            return step([n3, v3]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_2)
            try {
              if (f3 = 1, y && (t3 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t3 = y["return"]) && t3.call(y), 0) : y.next) && !(t3 = t3.call(y, op[1])).done)
                return t3;
              if (y = 0, t3)
                op = [op[0] & 2, t3.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t3 = op;
                  break;
                case 4:
                  _2.label++;
                  return { value: op[1], done: false };
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t3 = _2.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t3[1]) {
                    _2.label = t3[1];
                    t3 = op;
                    break;
                  }
                  if (t3 && _2.label < t3[2]) {
                    _2.label = t3[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t3[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f3 = t3 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar4 = function(m4, o3) {
        for (var p3 in m4)
          if (p3 !== "default" && !Object.prototype.hasOwnProperty.call(o3, p3))
            __createBinding4(o3, m4, p3);
      };
      __createBinding4 = Object.create ? function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o3, k2, { enumerable: true, get: function() {
          return m4[k];
        } });
      } : function(o3, m4, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o3[k2] = m4[k];
      };
      __values4 = function(o3) {
        var s3 = typeof Symbol === "function" && Symbol.iterator, m4 = s3 && o3[s3], i2 = 0;
        if (m4)
          return m4.call(o3);
        if (o3 && typeof o3.length === "number")
          return {
            next: function() {
              if (o3 && i2 >= o3.length)
                o3 = void 0;
              return { value: o3 && o3[i2++], done: !o3 };
            }
          };
        throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read4 = function(o3, n3) {
        var m4 = typeof Symbol === "function" && o3[Symbol.iterator];
        if (!m4)
          return o3;
        var i2 = m4.call(o3), r2, ar = [], e2;
        try {
          while ((n3 === void 0 || n3-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m4 = i2["return"]))
              m4.call(i2);
          } finally {
            if (e2)
              throw e2.error;
          }
        }
        return ar;
      };
      __spread4 = function() {
        for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
          ar = ar.concat(__read4(arguments[i2]));
        return ar;
      };
      __spreadArrays4 = function() {
        for (var s3 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s3 += arguments[i2].length;
        for (var r2 = Array(s3), k = 0, i2 = 0; i2 < il; i2++)
          for (var a2 = arguments[i2], j = 0, jl = a2.length; j < jl; j++, k++)
            r2[k] = a2[j];
        return r2;
      };
      __spreadArray4 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i2 = 0, l3 = from.length, ar; i2 < l3; i2++) {
            if (ar || !(i2 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i2);
              ar[i2] = from[i2];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await4 = function(v3) {
        return this instanceof __await4 ? (this.v = v3, this) : new __await4(v3);
      };
      __asyncGenerator4 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g2 = generator.apply(thisArg, _arguments || []), i2, q = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n3) {
          if (g2[n3])
            i2[n3] = function(v3) {
              return new Promise(function(a2, b5) {
                q.push([n3, v3, a2, b5]) > 1 || resume(n3, v3);
              });
            };
        }
        function resume(n3, v3) {
          try {
            step(g2[n3](v3));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await4 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v3) {
          if (f3(v3), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator4 = function(o3) {
        var i2, p3;
        return i2 = {}, verb("next"), verb("throw", function(e2) {
          throw e2;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n3, f3) {
          i2[n3] = o3[n3] ? function(v3) {
            return (p3 = !p3) ? { value: __await4(o3[n3](v3)), done: n3 === "return" } : f3 ? f3(v3) : v3;
          } : f3;
        }
      };
      __asyncValues4 = function(o3) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m4 = o3[Symbol.asyncIterator], i2;
        return m4 ? m4.call(o3) : (o3 = typeof __values4 === "function" ? __values4(o3) : o3[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n3) {
          i2[n3] = o3[n3] && function(v3) {
            return new Promise(function(resolve, reject) {
              v3 = o3[n3](v3), settle(resolve, reject, v3.done, v3.value);
            });
          };
        }
        function settle(resolve, reject, d4, v3) {
          Promise.resolve(v3).then(function(v4) {
            resolve({ value: v4, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject4 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o3, v3) {
        Object.defineProperty(o3, "default", { enumerable: true, value: v3 });
      } : function(o3, v3) {
        o3["default"] = v3;
      };
      __importStar4 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding4(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault4 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet4 = function(receiver, state, kind, f3) {
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
      };
      __classPrivateFieldSet4 = function(receiver, state, value, kind, f3) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends4);
      exporter("__assign", __assign4);
      exporter("__rest", __rest4);
      exporter("__decorate", __decorate4);
      exporter("__param", __param4);
      exporter("__metadata", __metadata4);
      exporter("__awaiter", __awaiter4);
      exporter("__generator", __generator4);
      exporter("__exportStar", __exportStar4);
      exporter("__createBinding", __createBinding4);
      exporter("__values", __values4);
      exporter("__read", __read4);
      exporter("__spread", __spread4);
      exporter("__spreadArrays", __spreadArrays4);
      exporter("__spreadArray", __spreadArray4);
      exporter("__await", __await4);
      exporter("__asyncGenerator", __asyncGenerator4);
      exporter("__asyncDelegator", __asyncDelegator4);
      exporter("__asyncValues", __asyncValues4);
      exporter("__makeTemplateObject", __makeTemplateObject4);
      exporter("__importStar", __importStar4);
      exporter("__importDefault", __importDefault4);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet4);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet4);
    });
  }
});

// node_modules/@swan-io/boxed/dist/Boxed.js
var require_Boxed = __commonJS({
  "node_modules/@swan-io/boxed/dist/Boxed.js"(exports) {
    init_react();
    var t3 = /* @__PURE__ */ function() {
      function t4() {
        this.tag = void 0, this.value = void 0, this.tag = "None", this.value = void 0;
      }
      var n4 = t4.prototype;
      return n4.map = function(t5) {
        return this.tag === "Some" ? o3.Some(t5(this.value)) : this;
      }, n4.flatMap = function(t5) {
        return this.tag === "Some" ? t5(this.value) : this;
      }, n4.getWithDefault = function(t5) {
        return this.tag === "Some" ? this.value : t5;
      }, n4.match = function(t5) {
        return this.tag === "Some" ? t5.Some(this.value) : t5.None();
      }, n4.toUndefined = function() {
        return this.tag === "None" ? void 0 : this.value;
      }, n4.toNull = function() {
        return this.tag === "None" ? null : this.value;
      }, n4.isSome = function() {
        return this.tag === "Some";
      }, n4.isNone = function() {
        return this.tag === "None";
      }, t4;
    }();
    t3.prototype.__boxed_type__ = "Option";
    var n3;
    var e2 = Object.create(null, Object.getOwnPropertyDescriptors(t3.prototype));
    var r2 = ((n3 = Object.create(e2)).tag = "None", n3.value = void 0, n3);
    var o3 = { Some: function(t4) {
      var n4 = Object.create(e2);
      return n4.tag = "Some", n4.value = t4, n4;
    }, None: function() {
      return r2;
    }, fromNullable: function(t4) {
      return t4 == null ? o3.None() : o3.Some(t4);
    }, fromNull: function(t4) {
      return t4 === null ? o3.None() : o3.Some(t4);
    }, fromUndefined: function(t4) {
      return t4 === void 0 ? o3.None() : o3.Some(t4);
    }, equals: function(t4, n4, e3) {
      return t4.tag === "Some" && n4.tag === "Some" ? e3(t4.value, n4.value) : t4.tag === n4.tag;
    }, pattern: { Some: function(t4) {
      return { tag: "Some", value: t4 };
    }, None: { tag: "None" } } };
    var i2 = function(t4, n4) {
      return t4 === n4 ? 0 : t4 > n4 ? 1 : -1;
    };
    var u3 = { __proto__: null, from: Array.from, of: Array.of, isArray: Array.isArray, keepMap: function(t4, n4) {
      var e3 = [];
      return t4.forEach(function(t5) {
        var r3 = n4(t5);
        r3 != null && e3.push(r3);
      }), e3;
    }, getBy: function(t4, n4) {
      for (var e3 = -1; ++e3 < t4.length; ) {
        var r3 = t4[e3];
        if (n4(r3))
          return o3.Some(r3);
      }
      return o3.None();
    }, getIndexBy: function(t4, n4) {
      for (var e3 = -1; ++e3 < t4.length; )
        if (n4(t4[e3]))
          return o3.Some(e3);
      return o3.None();
    }, binarySearchBy: function(t4, n4, e3) {
      if (e3 === void 0 && (e3 = i2), t4.length === 0)
        return -1;
      for (var r3 = 0, o4 = t4.length - 1; ; ) {
        var u4 = r3 + (o4 - r3) / 2 | 0;
        if (u4 === r3 || u4 === o4)
          return o4;
        var a3 = e3(n4, t4[u4]);
        if (a3 === 0)
          return u4;
        a3 > 0 ? r3 = u4 : a3 < 0 && (o4 = u4);
      }
    } };
    var a2 = /* @__PURE__ */ function() {
      function t4() {
        this.tag = void 0, this.value = void 0, this.tag = "NotAsked", this.value = void 0;
      }
      var n4 = t4.prototype;
      return n4.map = function(t5) {
        return this.tag === "Done" ? v3.Done(t5(this.value)) : this;
      }, n4.flatMap = function(t5) {
        return this.tag === "Done" ? t5(this.value) : this;
      }, n4.getWithDefault = function(t5) {
        return this.tag === "Done" ? this.value : t5;
      }, n4.match = function(t5) {
        return this.tag === "Done" ? t5.Done(this.value) : this.tag === "Loading" ? t5.Loading() : t5.NotAsked();
      }, n4.isDone = function() {
        return this.tag === "Done";
      }, n4.isLoading = function() {
        return this.tag === "Loading";
      }, n4.isNotAsked = function() {
        return this.tag === "NotAsked";
      }, n4.toOption = function() {
        return this.tag === "Done" ? o3.Some(this.value) : o3.None();
      }, t4;
    }();
    a2.prototype.__boxed_type__ = "AsyncData";
    var c3;
    var s3 = Object.create(null, Object.getOwnPropertyDescriptors(a2.prototype));
    var l3 = ((c3 = Object.create(s3)).tag = "Loading", c3.value = void 0, c3);
    var f3 = function() {
      var t4 = Object.create(s3);
      return t4.tag = "NotAsked", t4.value = void 0, t4;
    }();
    var v3 = { Done: function(t4) {
      var n4 = Object.create(s3);
      return n4.tag = "Done", n4.value = t4, n4;
    }, Loading: function() {
      return l3;
    }, NotAsked: function() {
      return f3;
    }, equals: function(t4, n4, e3) {
      return t4.tag === "Done" && n4.tag === "Done" ? e3(t4.value, n4.value) : t4.tag === n4.tag;
    }, pattern: { Done: function(t4) {
      return { tag: "Done", value: t4 };
    }, NotAsked: { tag: "NotAsked" }, Loading: { tag: "Loading" } } };
    var h2 = /* @__PURE__ */ function() {
      function t4() {
        this.tag = void 0, this.value = void 0, this.tag = void 0, this.value = void 0;
      }
      var n4 = t4.prototype;
      return n4.map = function(t5) {
        return this.tag === "Ok" ? p3.Ok(t5(this.value)) : this;
      }, n4.flatMap = function(t5) {
        return this.tag === "Ok" ? t5(this.value) : this;
      }, n4.getWithDefault = function(t5) {
        return this.tag === "Ok" ? this.value : t5;
      }, n4.match = function(t5) {
        return this.tag === "Ok" ? t5.Ok(this.value) : t5.Error(this.value);
      }, n4.isOk = function() {
        return this.tag === "Ok";
      }, n4.isError = function() {
        return this.tag === "Error";
      }, n4.toOption = function() {
        return this.tag === "Ok" ? o3.Some(this.value) : o3.None();
      }, t4;
    }();
    h2.prototype.__boxed_type__ = "Result";
    var g2 = Object.create(null, Object.getOwnPropertyDescriptors(h2.prototype));
    var p3 = { Ok: function(t4) {
      var n4 = Object.create(g2);
      return n4.tag = "Ok", n4.value = t4, n4;
    }, Error: function(t4) {
      var n4 = Object.create(g2);
      return n4.tag = "Error", n4.value = t4, n4;
    }, fromExecution: function(t4) {
      try {
        return p3.Ok(t4());
      } catch (t5) {
        return p3.Error(t5);
      }
    }, fromPromise: function(t4) {
      try {
        return Promise.resolve(function(n4, e3) {
          try {
            var r3 = Promise.resolve(t4).then(function(t5) {
              return p3.Ok(t5);
            });
          } catch (t5) {
            return e3(t5);
          }
          return r3 && r3.then ? r3.then(void 0, e3) : r3;
        }(0, function(t5) {
          return p3.Error(t5);
        }));
      } catch (t5) {
        return Promise.reject(t5);
      }
    }, equals: function(t4, n4, e3) {
      return t4.tag === n4.tag && (t4.tag === "Error" && n4.tag === "Error" || e3(t4.value, n4.value));
    }, pattern: { Ok: function(t4) {
      return { tag: "Ok", value: t4 };
    }, Error: function(t4) {
      return { tag: "Error", value: t4 };
    } } };
    function d4(t4) {
      var n4 = this, e3 = {};
      this.tag = "Pending", this.pending = e3, e3.cancel = t4(function(t5) {
        if (n4.tag === "Pending") {
          var e4 = n4.pending.resolveCallbacks;
          e4 == null || e4.forEach(function(n5) {
            return n5(t5);
          }), n4.tag = "Resolved", n4.value = t5, n4.pending = void 0;
        }
      });
    }
    var _2 = Object.create(null, Object.getOwnPropertyDescriptors(function() {
      function t4(t5) {
        this.tag = void 0, this.value = void 0, this.pending = void 0, this.tag = "Pending", this.pending = {};
      }
      var n4 = t4.prototype;
      return n4.isPending = function() {
        return this.tag === "Pending";
      }, n4.isCancelled = function() {
        return this.tag === "Cancelled";
      }, n4.isResolved = function() {
        return this.tag === "Resolved";
      }, n4.get = function(t5) {
        if (this.isPending()) {
          var n5, e3 = this.pending;
          e3.resolveCallbacks = (n5 = e3.resolveCallbacks) != null ? n5 : [], e3.resolveCallbacks.push(t5);
        }
        this.isResolved() && t5(this.value);
      }, n4.onCancel = function(t5) {
        if (this.isPending()) {
          var n5, e3 = this.pending;
          e3.cancelCallbacks = (n5 = e3.cancelCallbacks) != null ? n5 : [], e3.cancelCallbacks.push(t5);
        }
        this.isCancelled() && t5();
      }, n4.cancel = function() {
        if (this.tag === "Pending") {
          this.tag = "Cancelled", this.value = void 0;
          var t5 = this.pending, n5 = t5.cancelCallbacks;
          t5.cancel == null || t5.cancel(), n5 == null || n5.forEach(function(t6) {
            return t6();
          }), this.pending = void 0;
        }
      }, n4.map = function(t5, n5) {
        var e3 = this;
        n5 === void 0 && (n5 = false);
        var r3 = m4.make(function(r4) {
          if (e3.get(function(n6) {
            r4(t5(n6));
          }), n5)
            return function() {
              e3.cancel();
            };
        });
        return this.onCancel(function() {
          r3.cancel();
        }), r3;
      }, n4.then = function(t5) {
        return this.get(t5), this;
      }, n4.flatMap = function(t5, n5) {
        var e3 = this;
        n5 === void 0 && (n5 = false);
        var r3 = m4.make(function(o4) {
          if (e3.get(function(n6) {
            var e4 = t5(n6);
            e4.get(o4), e4.onCancel(function() {
              return r3.cancel();
            });
          }), n5)
            return function() {
              e3.cancel();
            };
        });
        return this.onCancel(function() {
          r3.cancel();
        }), r3;
      }, n4.tap = function(t5) {
        return this.get(t5), this;
      }, n4.tapOk = function(t5) {
        return this.get(function(n5) {
          n5.match({ Ok: function(n6) {
            return t5(n6);
          }, Error: function() {
          } });
        }), this;
      }, n4.tapError = function(t5) {
        return this.get(function(n5) {
          n5.match({ Ok: function() {
          }, Error: function(n6) {
            return t5(n6);
          } });
        }), this;
      }, n4.mapResult = function(t5, n5) {
        return n5 === void 0 && (n5 = false), this.map(function(n6) {
          return n6.match({ Ok: function(n7) {
            return t5(n7);
          }, Error: function() {
            return n6;
          } });
        }, n5);
      }, n4.mapOk = function(t5, n5) {
        return n5 === void 0 && (n5 = false), this.map(function(n6) {
          return n6.match({ Ok: function(n7) {
            return p3.Ok(t5(n7));
          }, Error: function() {
            return n6;
          } });
        }, n5);
      }, n4.mapError = function(t5, n5) {
        return n5 === void 0 && (n5 = false), this.map(function(n6) {
          return n6.match({ Ok: function() {
            return n6;
          }, Error: function(n7) {
            return p3.Error(t5(n7));
          } });
        }, n5);
      }, n4.flatMapOk = function(t5, n5) {
        return n5 === void 0 && (n5 = false), this.flatMap(function(n6) {
          return n6.match({ Ok: function(n7) {
            return t5(n7);
          }, Error: function() {
            return m4.value(n6);
          } });
        }, n5);
      }, n4.flatMapError = function(t5, n5) {
        return n5 === void 0 && (n5 = false), this.flatMap(function(n6) {
          return n6.match({ Ok: function() {
            return m4.value(n6);
          }, Error: function(n7) {
            return t5(n7);
          } });
        }, n5);
      }, n4.toPromise = function() {
        var t5 = this;
        return new Promise(function(n5) {
          t5.get(n5);
        });
      }, n4.resultToPromise = function() {
        var t5 = this;
        return new Promise(function(n5, e3) {
          t5.get(function(t6) {
            t6.match({ Ok: n5, Error: e3 });
          });
        });
      }, t4;
    }().prototype));
    var m4 = { make: function(t4) {
      var n4 = Object.create(_2);
      return d4.call(n4, t4), n4;
    }, value: function(t4) {
      var n4 = Object.create(_2);
      return d4.call(n4, function(n5) {
        return n5(t4);
      }), n4;
    }, fromPromise: function(t4) {
      return m4.make(function(n4) {
        t4.then(function(t5) {
          return n4(p3.Ok(t5));
        }, function(t5) {
          return n4(p3.Error(t5));
        });
      });
    }, all: function(t4, n4) {
      n4 === void 0 && (n4 = false);
      for (var e3 = t4.length, r3 = m4.value([]), o4 = 0, i3 = function() {
        if (o4 >= e3)
          return { v: r3 };
        var i4 = r3;
        r3 = t4[o4].flatMap(function(t5) {
          return i4.map(function(n5) {
            return n5.push(t5), n5;
          }, n4);
        }, n4), o4++;
      }; ; ) {
        var u4 = i3();
        if (typeof u4 == "object")
          return u4.v;
      }
    } };
    var O2 = { make: function() {
      var t4 = void 0;
      return [m4.make(function(n4) {
        t4 = n4;
      }), t4];
    } };
    var k = { __proto__: null, entries: function(t4) {
      return Object.entries(t4);
    }, keys: function(t4) {
      return Object.keys(t4);
    }, values: function(t4) {
      return Object.values(t4);
    } };
    var y = Symbol.for("NOT_COMPUTED");
    var b5 = { __proto__: null, Lazy: function(t4) {
      var n4 = { contents: y };
      return { get value() {
        return n4.contents === y && (n4.contents = t4()), n4.contents;
      } };
    } };
    var N = { __proto__: null, encode: function(t4, n4) {
      return JSON.stringify(t4, function(t5, n5) {
        if (n5 != null)
          return n5.__boxed_type__ === "Option" ? { __boxed_type__: "Option", tag: n5.tag, value: n5.value } : n5.__boxed_type__ === "Result" ? { __boxed_type__: "Result", tag: n5.tag, value: n5.value } : n5.__boxed_type__ === "AsyncData" ? { __boxed_type__: "AsyncData", tag: n5.tag, value: n5.value } : n5;
      }, n4);
    }, decode: function(t4) {
      return JSON.parse(t4, function(t5, n4) {
        return n4 == null ? n4 : n4.__boxed_type__ === "Option" ? n4.tag === "Some" ? o3.Some(n4.value) : o3.None() : n4.__boxed_type__ === "Result" ? n4.tag === "Ok" ? p3.Ok(n4.value) : p3.Error(n4.value) : n4.__boxed_type__ === "AsyncData" ? n4.tag === "NotAsked" ? v3.NotAsked() : n4.tag === "Loading" ? v3.Loading() : v3.Done(n4.value) : n4;
      });
    } };
    exports.Array = u3, exports.AsyncData = v3, exports.Deferred = O2, exports.Dict = k, exports.Future = m4, exports.Lazy = b5, exports.Option = o3, exports.Result = p3, exports.Serializer = N;
  }
});

// empty-module:~/services/toast.server
var require_toast = __commonJS({
  "empty-module:~/services/toast.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\j\$id.tsx?browser
init_react();

// app/routes/j/$id.tsx
init_react();
var import_jsonDoc = __toESM(require_jsonDoc());
var import_react50 = __toESM(require_react());

// app/components/Footer.tsx
init_react();

// app/components/Icons/ArrowKeysIcon.tsx
init_react();
function ArrowKeysIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "62",
    height: "14",
    viewBox: "0 0 62 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M6.60956 4.48804C6.80972 4.23784 7.19026 4.23784 7.39043 4.48804L10.3501 8.18765C10.612 8.51503 10.3789 9 9.95969 9H4.04031C3.62106 9 3.38797 8.51503 3.64988 8.18765L6.60956 4.48804Z",
    fill: "black"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "16",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M23.3904 9.51196C23.1903 9.76216 22.8097 9.76216 22.6096 9.51196L19.6499 5.81235C19.388 5.48496 19.6211 5 20.0403 5L25.9597 5C26.3789 5 26.612 5.48497 26.3501 5.81235L23.3904 9.51196Z",
    fill: "black"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "32",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M36.488 7.39044C36.2378 7.19028 36.2378 6.80974 36.488 6.60957L40.1877 3.64988C40.515 3.38797 41 3.62106 41 4.04031L41 9.95969C41 10.3789 40.515 10.612 40.1877 10.3501L36.488 7.39044Z",
    fill: "black"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "48",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M57.512 6.60956C57.7622 6.80972 57.7622 7.19026 57.512 7.39043L53.8123 10.3501C53.485 10.612 53 10.3789 53 9.95969L53 4.04031C53 3.62106 53.485 3.38797 53.8123 3.64988L57.512 6.60956Z",
    fill: "black"
  }));
}

// app/components/Icons/CopyShortcutIcon.tsx
init_react();
function CopyShortcutIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "30",
    height: "14",
    viewBox: "0 0 30 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "16",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M5.64,10.22H8.25V7a.39.39,0,0,1,.38-.39H10l-3-3L4,6.65H5.26A.39.39,0,0,1,5.64,7v3.18Zm3,.78H5.26a.38.38,0,0,1-.39-.39V7.43H3.11a.39.39,0,0,1-.28-.66L6.72,2.86a.39.39,0,0,1,.55,0l3.88,3.91a.38.38,0,0,1-.27.66H9v3.18a.38.38,0,0,1-.39.39Z",
    stroke: "#0f172a",
    strokeWidth: "0.35px",
    fill: "#0f172a"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M23.81,9.52a1.66,1.66,0,0,0,.53-.27,1.57,1.57,0,0,0,.35-.42,1.07,1.07,0,0,0,.13-.53h1.6a2.26,2.26,0,0,1-.25,1,2.87,2.87,0,0,1-.7.85,3.35,3.35,0,0,1-1,.58,3.56,3.56,0,0,1-1.22.21,3.73,3.73,0,0,1-1.55-.31,3.2,3.2,0,0,1-1.11-.84,3.61,3.61,0,0,1-.67-1.22,4.91,4.91,0,0,1-.23-1.5V6.88a4.91,4.91,0,0,1,.23-1.5,3.54,3.54,0,0,1,.67-1.22,3.33,3.33,0,0,1,1.11-.84,3.94,3.94,0,0,1,2.83-.09,3,3,0,0,1,1,.59,2.66,2.66,0,0,1,.67.92,2.94,2.94,0,0,1,.23,1.17h-1.6a1.48,1.48,0,0,0-.45-1.07,1.65,1.65,0,0,0-.52-.33,1.75,1.75,0,0,0-.65-.12,1.59,1.59,0,0,0-1.44.78,2.27,2.27,0,0,0-.31.8,4.53,4.53,0,0,0-.09.91v.24a4.63,4.63,0,0,0,.09.92,2.46,2.46,0,0,0,.3.8,1.67,1.67,0,0,0,.56.56,1.63,1.63,0,0,0,.89.22A2.05,2.05,0,0,0,23.81,9.52Z",
    fill: "#0f172a"
  }));
}

// app/components/Icons/EscapeKeyIcon.tsx
init_react();
function EscapeKeyIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M3.21695 10C2.79876 10 2.42068 9.88168 2.08269 9.64504C1.75044 9.4084 1.48693 9.0687 1.29216 8.62595C1.09739 8.17557 1 7.63359 1 7C1 6.38168 1.09739 5.85114 1.29216 5.4084C1.49265 4.95802 1.75044 4.61069 2.06551 4.36641C2.38058 4.12214 2.71283 4 3.06228 4C3.48619 4 3.83563 4.12595 4.1106 4.37786C4.3913 4.62214 4.59753 4.9542 4.72928 5.37405C4.86677 5.79389 4.93551 6.25954 4.93551 6.77099C4.93551 6.93893 4.92692 7.10305 4.90973 7.26336C4.89827 7.41603 4.88682 7.52672 4.87536 7.59542H2.42641C2.49515 7.93893 2.61831 8.17939 2.7959 8.31679C2.97348 8.44656 3.18257 8.51145 3.42317 8.51145C3.69814 8.51145 3.9903 8.39695 4.29964 8.16794L4.78084 9.33588C4.5517 9.54962 4.29391 9.71374 4.00749 9.82824C3.72106 9.94275 3.45754 10 3.21695 10ZM2.40922 6.31298H3.68096C3.68096 6.0916 3.638 5.90076 3.55207 5.74046C3.47187 5.57252 3.32006 5.48855 3.09665 5.48855C2.93625 5.48855 2.79303 5.55344 2.66701 5.68321C2.54098 5.81298 2.45505 6.0229 2.40922 6.31298Z",
    fill: "#0F172A"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M7.06968 10C6.79471 10 6.50256 9.92748 6.19322 9.78244C5.8896 9.62977 5.62609 9.43511 5.40268 9.19847L6.05573 7.98473C6.44527 8.36641 6.79471 8.55725 7.10405 8.55725C7.25872 8.55725 7.36757 8.53053 7.43058 8.4771C7.49932 8.41603 7.53369 8.32824 7.53369 8.21374C7.53369 8.06107 7.45063 7.94275 7.2845 7.85878C7.11838 7.76718 6.92647 7.66412 6.70879 7.54962C6.54266 7.45801 6.37653 7.34351 6.2104 7.20611C6.05 7.06107 5.91538 6.87786 5.80654 6.65649C5.6977 6.43511 5.64327 6.16794 5.64327 5.85496C5.64327 5.29008 5.80081 4.83969 6.11588 4.50382C6.43095 4.16794 6.84054 4 7.34465 4C7.69982 4 8.00344 4.08015 8.25549 4.24046C8.51328 4.39313 8.73669 4.56489 8.92573 4.75573L8.27268 5.92366C8.11801 5.77099 7.9662 5.65267 7.81726 5.5687C7.66832 5.48473 7.52797 5.44275 7.39621 5.44275C7.14415 5.44275 7.01813 5.54962 7.01813 5.76336C7.01813 5.9084 7.09546 6.0229 7.25013 6.10687C7.41053 6.18321 7.59671 6.27481 7.80866 6.38168C7.98052 6.46565 8.14951 6.57634 8.31564 6.71374C8.4875 6.85115 8.62785 7.03054 8.73669 7.25191C8.85126 7.47328 8.90855 7.75573 8.90855 8.09924C8.90855 8.63359 8.75101 9.08397 8.43594 9.45038C8.1266 9.81679 7.67118 10 7.06968 10Z",
    fill: "#0F172A"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M11.5736 10C11.1669 10 10.8002 9.88168 10.4737 9.64504C10.1472 9.4084 9.88654 9.0687 9.69177 8.62595C9.50273 8.17557 9.4082 7.63359 9.4082 7C9.4082 6.36641 9.51418 5.82825 9.72614 5.3855C9.94382 4.93512 10.2274 4.5916 10.5768 4.35496C10.9263 4.11832 11.3044 4 11.7111 4C11.9689 4 12.2009 4.05343 12.4071 4.16031C12.6191 4.26718 12.8052 4.41221 12.9656 4.59542L12.2782 5.85496C12.1865 5.74809 12.1035 5.67557 12.029 5.6374C11.9545 5.59924 11.8772 5.58015 11.797 5.58015C11.522 5.58015 11.3072 5.70992 11.1525 5.96947C10.9979 6.22137 10.9205 6.56489 10.9205 7C10.9205 7.43511 11.0007 7.78244 11.1611 8.04198C11.3215 8.29389 11.5163 8.41985 11.7455 8.41985C11.8657 8.41985 11.9832 8.3855 12.0978 8.31679C12.2181 8.24046 12.3298 8.15267 12.4329 8.05344L13 9.33588C12.788 9.58779 12.5532 9.76336 12.2954 9.8626C12.0376 9.9542 11.797 10 11.5736 10Z",
    fill: "#0F172A"
  }));
}

// app/components/Icons/SquareBracketsIcon.tsx
init_react();
function SquareBracketsIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "30",
    height: "14",
    viewBox: "0 0 30 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M6 11V3H9V4.5H7.5V9.5H9V11H6Z",
    fill: "#0F172A"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "16",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M25 3V11L21.9997 11V9.5H23.5V4.5H21.9997V3.00002L25 3Z",
    fill: "#0F172A"
  }));
}

// app/components/ThemeModeToggle.tsx
init_react();

// app/components/Icons/MoonIcon.tsx
init_react();

// node_modules/framer-motion/dist/es/index.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/motion.mjs
init_react();

// node_modules/framer-motion/node_modules/tslib/modules/index.js
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

// node_modules/framer-motion/dist/es/motion/index.mjs
init_react();
var React3 = __toESM(require_react(), 1);
var import_react16 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/motion/features/use-features.mjs
init_react();
var React2 = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
init_react();
var createDefinition = function(propNames) {
  return {
    isEnabled: function(props) {
      return propNames.some(function(name) {
        return !!props[name];
      });
    }
  };
};
var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  inView: createDefinition([
    "whileInView",
    "onViewportEnter",
    "onViewportLeave"
  ])
};
function loadFeatures(features) {
  for (var key in features) {
    if (features[key] === null)
      continue;
    if (key === "projectionNodeConstructor") {
      featureDefinitions.projectionNodeConstructor = features[key];
    } else {
      featureDefinitions[key].Component = features[key];
    }
  }
}

// node_modules/hey-listen/dist/hey-listen.es.js
init_react();
var warning = function() {
};
var invariant2 = function() {
};
if (true) {
  warning = function(check, message) {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant2 = function(check, message) {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
init_react();
var import_react = __toESM(require_react(), 1);
var LazyContext = (0, import_react.createContext)({ strict: false });

// node_modules/framer-motion/dist/es/motion/features/use-features.mjs
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
  var features = [];
  var lazyContext = (0, import_react2.useContext)(LazyContext);
  if (!visualElement2)
    return null;
  if (preloadedFeatures && lazyContext.strict) {
    invariant2(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
  }
  for (var i2 = 0; i2 < numFeatures; i2++) {
    var name_1 = featureNames[i2];
    var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component2 = _a.Component;
    if (isEnabled(props) && Component2) {
      features.push(React2.createElement(Component2, __assign({ key: name_1 }, props, { visualElement: visualElement2 })));
    }
  }
  return features;
}

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
init_react();
var import_react3 = __toESM(require_react(), 1);
var MotionConfigContext = (0, import_react3.createContext)({
  transformPagePoint: function(p3) {
    return p3;
  },
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
init_react();
var import_react4 = __toESM(require_react(), 1);
var MotionContext = (0, import_react4.createContext)({});
function useVisualElementContext() {
  return (0, import_react4.useContext)(MotionContext).visualElement;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
init_react();
var import_react8 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
init_react();
var import_react5 = __toESM(require_react(), 1);
var PresenceContext = (0, import_react5.createContext)(null);

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
init_react();
var import_react6 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
init_react();
var isBrowser = typeof window !== "undefined";

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? import_react6.useLayoutEffect : import_react6.useEffect;

// node_modules/framer-motion/dist/es/utils/use-reduced-motion.mjs
init_react();
var import_react7 = __toESM(require_react(), 1);
var prefersReducedMotion = { current: null };
var hasDetected = false;
function initPrefersReducedMotion() {
  hasDetected = true;
  if (typeof window === "undefined")
    return;
  if (window.matchMedia) {
    var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");
    var setReducedMotionPreferences = function() {
      return prefersReducedMotion.current = motionMediaQuery_1.matches;
    };
    motionMediaQuery_1.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function useReducedMotion() {
  !hasDetected && initPrefersReducedMotion();
  var _a = __read((0, import_react7.useState)(prefersReducedMotion.current), 1), shouldReduceMotion = _a[0];
  return shouldReduceMotion;
}
function useReducedMotionConfig() {
  var reducedMotionPreference = useReducedMotion();
  var reducedMotion = (0, import_react7.useContext)(MotionConfigContext).reducedMotion;
  if (reducedMotion === "never") {
    return false;
  } else if (reducedMotion === "always") {
    return true;
  } else {
    return reducedMotionPreference;
  }
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement) {
  var lazyContext = (0, import_react8.useContext)(LazyContext);
  var parent = useVisualElementContext();
  var presenceContext = (0, import_react8.useContext)(PresenceContext);
  var shouldReduceMotion = useReducedMotionConfig();
  var visualElementRef = (0, import_react8.useRef)(void 0);
  if (!createVisualElement)
    createVisualElement = lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
      shouldReduceMotion
    });
  }
  var visualElement2 = visualElementRef.current;
  useIsomorphicLayoutEffect(function() {
    visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
  });
  (0, import_react8.useEffect)(function() {
    var _a;
    (_a = visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
  });
  useIsomorphicLayoutEffect(function() {
    return function() {
      return visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.notifyUnmount();
    };
  }, []);
  return visualElement2;
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
init_react();
var import_react9 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
init_react();
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement2, externalRef) {
  return (0, import_react9.useCallback)(function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  }, [visualElement2]);
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
init_react();
var import_react10 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
init_react();

// node_modules/framer-motion/dist/es/render/utils/variants.mjs
init_react();
function isVariantLabels(v3) {
  return Array.isArray(v3);
}
function isVariantLabel(v3) {
  return typeof v3 === "string" || isVariantLabels(v3);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key) {
    return current[key] = value.get();
  });
  return current;
}
function getVelocity(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial, animate3 = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate3) ? animate3 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  var _a = getCurrentTreeVariants(props, (0, import_react10.useContext)(MotionContext)), initial = _a.initial, animate3 = _a.animate;
  return (0, import_react10.useMemo)(function() {
    return { initial, animate: animate3 };
  }, [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate3)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/framer-motion/dist/es/projection/node/id.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
init_react();
var import_react11 = __toESM(require_react(), 1);
function useConstant(init) {
  var ref = (0, import_react11.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
init_react();

// node_modules/framesync/dist/es/index.mjs
init_react();

// node_modules/framesync/dist/es/on-next-frame.mjs
init_react();
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

// node_modules/framesync/dist/es/create-render-step.mjs
init_react();
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i2 = 0; i2 < numToRun; i2++) {
          const callback = toRun[i2];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}

// node_modules/framesync/dist/es/index.mjs
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
var steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
var sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process2, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
var cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
var processStep = (stepId) => steps[stepId].process(frame);
var processFrame = (timestamp) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
var startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
var getFrameData = () => frame;
var es_default = sync;

// node_modules/popmotion/dist/es/index.mjs
init_react();

// node_modules/popmotion/dist/es/animations/index.mjs
init_react();

// node_modules/popmotion/node_modules/tslib/modules/index.js
init_react();
var import_tslib4 = __toESM(require_tslib2(), 1);
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
  __spreadArray: __spreadArray2,
  __await: __await2,
  __asyncGenerator: __asyncGenerator2,
  __asyncDelegator: __asyncDelegator2,
  __asyncValues: __asyncValues2,
  __makeTemplateObject: __makeTemplateObject2,
  __importStar: __importStar2,
  __importDefault: __importDefault2,
  __classPrivateFieldGet: __classPrivateFieldGet2,
  __classPrivateFieldSet: __classPrivateFieldSet2
} = import_tslib4.default;

// node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
init_react();

// node_modules/popmotion/dist/es/animations/generators/spring.mjs
init_react();

// node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
init_react();

// node_modules/popmotion/dist/es/utils/clamp.mjs
init_react();
var clamp = (min, max, v3) => Math.min(Math.max(v3, min), max);

// node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b5 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c3 = Math.exp(-delta);
      return safeMin - a2 / b5 * c3;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d4 = delta * velocity + velocity;
      const e2 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f3 = Math.exp(-delta);
      const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d4 - e2) * f3) / g2;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b5 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b5;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b5 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b5;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i2 = 1; i2 < rootIterations; i2++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/popmotion/dist/es/animations/generators/spring.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest2(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t3) + initialDelta * Math.cos(angularFreq * t3));
      };
      resolveVelocity = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t3) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t3)) - envelope * (Math.cos(angularFreq * t3) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t3));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t3) => to - Math.exp(-undampedAngularFreq * t3) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t3);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        const freqForT = Math.min(dampedAngularFreq * t3, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t3) => {
      const current = resolveSpring(t3);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t3) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t3 >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a2, b5) => typeof a2 === "string" || typeof b5 === "string";
var zero = (_t) => 0;

// node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
init_react();

// node_modules/popmotion/dist/es/utils/interpolate.mjs
init_react();

// node_modules/popmotion/dist/es/utils/progress.mjs
init_react();
var progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/popmotion/dist/es/utils/mix.mjs
init_react();
var mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;

// node_modules/popmotion/dist/es/utils/mix-color.mjs
init_react();

// node_modules/style-value-types/dist/es/index.mjs
init_react();

// node_modules/style-value-types/dist/es/numbers/index.mjs
init_react();

// node_modules/style-value-types/dist/es/utils.mjs
init_react();
var clamp2 = (min, max) => (v3) => Math.max(Math.min(v3, max), min);
var sanitize = (v3) => v3 % 1 ? Number(v3.toFixed(5)) : v3;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v3) {
  return typeof v3 === "string";
}

// node_modules/style-value-types/dist/es/numbers/index.mjs
var number = {
  test: (v3) => typeof v3 === "number",
  parse: parseFloat,
  transform: (v3) => v3
};
var alpha = Object.assign(Object.assign({}, number), { transform: clamp2(0, 1) });
var scale = Object.assign(Object.assign({}, number), { default: 1 });

// node_modules/style-value-types/dist/es/numbers/units.mjs
init_react();
var createUnitType = (unit) => ({
  test: (v3) => isString(v3) && v3.endsWith(unit) && v3.split(" ").length === 1,
  parse: parseFloat,
  transform: (v3) => `${v3}${unit}`
});
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v3) => percent.parse(v3) / 100, transform: (v3) => percent.transform(v3 * 100) });

// node_modules/style-value-types/dist/es/color/hsla.mjs
init_react();

// node_modules/style-value-types/dist/es/color/utils.mjs
init_react();
var isColorString = (type, testProp) => (v3) => {
  return Boolean(isString(v3) && singleColorRegex.test(v3) && v3.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v3, testProp));
};
var splitColor = (aName, bName, cName) => (v3) => {
  if (!isString(v3))
    return v3;
  const [a2, b5, c3, alpha2] = v3.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b5),
    [cName]: parseFloat(c3),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/style-value-types/dist/es/color/rgba.mjs
init_react();
var clampRgbUnit = clamp2(0, 255);
var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v3) => Math.round(clampRgbUnit(v3)) });
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/style-value-types/dist/es/color/hex.mjs
init_react();
function parseHex(v3) {
  let r2 = "";
  let g2 = "";
  let b5 = "";
  let a2 = "";
  if (v3.length > 5) {
    r2 = v3.substr(1, 2);
    g2 = v3.substr(3, 2);
    b5 = v3.substr(5, 2);
    a2 = v3.substr(7, 2);
  } else {
    r2 = v3.substr(1, 1);
    g2 = v3.substr(2, 1);
    b5 = v3.substr(3, 1);
    a2 = v3.substr(4, 1);
    r2 += r2;
    g2 += g2;
    b5 += b5;
    a2 += a2;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g2, 16),
    blue: parseInt(b5, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/style-value-types/dist/es/color/index.mjs
init_react();
var color = {
  test: (v3) => rgba.test(v3) || hex.test(v3) || hsla.test(v3),
  parse: (v3) => {
    if (rgba.test(v3)) {
      return rgba.parse(v3);
    } else if (hsla.test(v3)) {
      return hsla.parse(v3);
    } else {
      return hex.parse(v3);
    }
  },
  transform: (v3) => {
    return isString(v3) ? v3 : v3.hasOwnProperty("red") ? rgba.transform(v3) : hsla.transform(v3);
  }
};

// node_modules/style-value-types/dist/es/complex/index.mjs
init_react();
var colorToken = "${c}";
var numberToken = "${n}";
function test(v3) {
  var _a, _b, _c, _d;
  return isNaN(v3) && isString(v3) && ((_b = (_a = v3.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v3.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v3) {
  if (typeof v3 === "number")
    v3 = `${v3}`;
  const values = [];
  let numColors = 0;
  const colors = v3.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v3 = v3.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v3.match(floatRegex);
  if (numbers) {
    v3 = v3.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v3 };
}
function parse(v3) {
  return analyse(v3).values;
}
function createTransformer(v3) {
  const { values, numColors, tokenised } = analyse(v3);
  const numValues = values.length;
  return (v4) => {
    let output = tokenised;
    for (let i2 = 0; i2 < numValues; i2++) {
      output = output.replace(i2 < numColors ? colorToken : numberToken, i2 < numColors ? color.transform(v4[i2]) : sanitize(v4[i2]));
    }
    return output;
  };
}
var convertNumbersToZero = (v3) => typeof v3 === "number" ? 0 : v3;
function getAnimatableNone(v3) {
  const parsed = parse(v3);
  const transformer = createTransformer(v3);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = { test, parse, createTransformer, getAnimatableNone };

// node_modules/style-value-types/dist/es/complex/filter.mjs
init_react();
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v3) {
  let [name, value] = v3.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v3;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v3;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v3) => {
  const functions = v3.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v3;
} });

// node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
init_react();
function hueToRgb(p3, q, t3) {
  if (t3 < 0)
    t3 += 1;
  if (t3 > 1)
    t3 -= 1;
  if (t3 < 1 / 6)
    return p3 + (q - p3) * 6 * t3;
  if (t3 < 1 / 2)
    return q;
  if (t3 < 2 / 3)
    return p3 + (q - p3) * (2 / 3 - t3) * 6;
  return p3;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p3 = 2 * lightness - q;
    red = hueToRgb(p3, q, hue + 1 / 3);
    green = hueToRgb(p3, q, hue);
    blue = hueToRgb(p3, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor = (from, to, v3) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v3 * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v3) => colorTypes.find((type) => type.test(v3));
var notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
var mixColor = (from, to) => {
  let fromColorType = getColorType(from);
  let toColorType = getColorType(to);
  invariant2(!!fromColorType, notAnimatable(from));
  invariant2(!!toColorType, notAnimatable(to));
  let fromColor = fromColorType.parse(from);
  let toColor = toColorType.parse(to);
  if (fromColorType === hsla) {
    fromColor = hslaToRgba(fromColor);
    fromColorType = rgba;
  }
  if (toColorType === hsla) {
    toColor = hslaToRgba(toColor);
    toColorType = rgba;
  }
  const blended = Object.assign({}, fromColor);
  return (v3) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixLinearColor(fromColor[key], toColor[key], v3);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v3);
    return fromColorType.transform(blended);
  };
};

// node_modules/popmotion/dist/es/utils/mix-complex.mjs
init_react();

// node_modules/popmotion/dist/es/utils/inc.mjs
init_react();
var isNum = (v3) => typeof v3 === "number";

// node_modules/popmotion/dist/es/utils/pipe.mjs
init_react();
var combineFunctions = (a2, b5) => (v3) => b5(a2(v3));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/popmotion/dist/es/utils/mix-complex.mjs
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v3) => mix(origin, target, v3);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
var mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i2) => getMixer(fromThis, to[i2]));
  return (v3) => {
    for (let i2 = 0; i2 < numValues; i2++) {
      output[i2] = blendValue[i2](v3);
    }
    return output;
  };
};
var mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v3) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v3);
    }
    return output;
  };
};
function analyse2(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i2 = 0; i2 < numValues; i2++) {
    if (numNumbers || typeof parsed[i2] === "number") {
      numNumbers++;
    } else {
      if (parsed[i2].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse2(origin);
  const targetStats = analyse2(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return (p3) => `${p3 > 0 ? target : origin}`;
  }
};

// node_modules/popmotion/dist/es/utils/interpolate.mjs
var mixNumber = (from, to) => (p3) => mix(from, to, p3);
function detectMixerFactory(v3) {
  if (typeof v3 === "number") {
    return mixNumber;
  } else if (typeof v3 === "string") {
    if (color.test(v3)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v3)) {
    return mixArray;
  } else if (typeof v3 === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i2 = 0; i2 < numMixers; i2++) {
    let mixer = mixerFactory(output[i2], output[i2 + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i2] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v3) => mixer(progress(from, to, v3));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v3) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v3 <= input[0]) {
      foundMixerIndex = true;
    } else if (v3 >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i2 = 1;
      for (; i2 < inputLength; i2++) {
        if (input[i2] > v3 || i2 === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i2 - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v3);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant2(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant2(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v3) => interpolator(clamp(input[0], input[inputLength - 1], v3)) : interpolator;
}

// node_modules/popmotion/dist/es/easing/index.mjs
init_react();

// node_modules/popmotion/dist/es/easing/utils.mjs
init_react();
var reverseEasing = (easing) => (p3) => 1 - easing(1 - p3);
var mirrorEasing = (easing) => (p3) => p3 <= 0.5 ? easing(2 * p3) / 2 : (2 - easing(2 * (1 - p3))) / 2;
var createExpoIn = (power) => (p3) => Math.pow(p3, power);
var createBackIn = (power) => (p3) => p3 * p3 * ((power + 1) * p3 - power);
var createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p3) => (p3 *= 2) < 1 ? 0.5 * backEasing(p3) : 0.5 * (2 - Math.pow(2, -10 * (p3 - 1)));
};

// node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = (p3) => p3;
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = (p3) => 1 - Math.sin(Math.acos(p3));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = (p3) => {
  if (p3 === 1 || p3 === 0)
    return p3;
  const p22 = p3 * p3;
  return p3 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p3 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p3 + 3.4 : p3 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p3 + cc : 10.8 * p3 * p3 - 20.52 * p3 + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = (p3) => p3 < 0.5 ? 0.5 * (1 - bounceOut(1 - p3 * 2)) : 0.5 * bounceOut(p3 * 2 - 1) + 0.5;

// node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i2) => i2 !== 0 ? i2 / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o3) => o3 * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t3) => {
      state.value = interpolator(t3);
      state.done = t3 >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}

// node_modules/popmotion/dist/es/animations/generators/decay.mjs
init_react();
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t3) => {
      const delta = -amplitude * Math.exp(-t3 / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}

// node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
var types = { keyframes, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes;
}

// node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
init_react();
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

// node_modules/popmotion/dist/es/animations/index.mjs
var framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => es_default.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest2(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

// node_modules/popmotion/dist/es/animations/inertia.mjs
init_react();

// node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
init_react();
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v3) {
    return min !== void 0 && v3 < min || max !== void 0 && v3 > max;
  }
  function boundaryNearest(v3) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v3) < Math.abs(max - v3) ? min : max;
  }
  function startAnimation2(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options), {
      driver,
      onUpdate: (v3) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v3);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v3);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v3) => {
      prev = current;
      current = v3;
      velocity = velocityPerSecond(v3 - prev, getFrameData().delta);
      if (heading === 1 && v3 > boundary || heading === -1 && v3 < boundary) {
        startSpring({ from: v3, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}

// node_modules/popmotion/dist/es/utils/distance.mjs
init_react();

// node_modules/popmotion/dist/es/utils/is-point.mjs
init_react();
var isPoint = (point) => point.hasOwnProperty("x") && point.hasOwnProperty("y");

// node_modules/popmotion/dist/es/utils/is-point-3d.mjs
init_react();
var isPoint3D = (point) => isPoint(point) && point.hasOwnProperty("z");

// node_modules/popmotion/dist/es/utils/distance.mjs
var distance1D = (a2, b5) => Math.abs(a2 - b5);
function distance(a2, b5) {
  if (isNum(a2) && isNum(b5)) {
    return distance1D(a2, b5);
  } else if (isPoint(a2) && isPoint(b5)) {
    const xDelta = distance1D(a2.x, b5.x);
    const yDelta = distance1D(a2.y, b5.y);
    const zDelta = isPoint3D(a2) && isPoint3D(b5) ? distance1D(a2.z, b5.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

// node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
init_react();
var a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
var b = (a1, a2) => 3 * a2 - 6 * a1;
var c = (a1) => 3 * a1;
var calcBezier = (t3, a1, a2) => ((a(a1, a2) * t3 + b(a1, a2)) * t3 + c(a1)) * t3;
var getSlope = (t3, a1, a2) => 3 * a(a1, a2) * t3 * t3 + 2 * b(a1, a2) * t3 + c(a1);
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i2 = 0; i2 < newtonIterations; ++i2) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i2 = 0; i2 < kSplineTableSize; ++i2) {
    sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t3) => t3 === 0 || t3 === 1 ? t3 : calcBezier(getTForX(t3), mY1, mY2);
}

// node_modules/framer-motion/dist/es/animation/animate.mjs
init_react();

// node_modules/framer-motion/dist/es/value/index.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/array.mjs
init_react();
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index2 = arr.indexOf(item);
  index2 > -1 && arr.splice(index2, 1);
}

// node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = function() {
  function SubscriptionManager2() {
    this.subscriptions = [];
  }
  SubscriptionManager2.prototype.add = function(handler) {
    var _this = this;
    addUniqueItem(this.subscriptions, handler);
    return function() {
      return removeItem(_this.subscriptions, handler);
    };
  };
  SubscriptionManager2.prototype.notify = function(a2, b5, c3) {
    var numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b5, c3);
    } else {
      for (var i2 = 0; i2 < numSubscriptions; i2++) {
        var handler = this.subscriptions[i2];
        handler && handler(a2, b5, c3);
      }
    }
  };
  SubscriptionManager2.prototype.getSize = function() {
    return this.subscriptions.length;
  };
  SubscriptionManager2.prototype.clear = function() {
    this.subscriptions.length = 0;
  };
  return SubscriptionManager2;
}();

// node_modules/framer-motion/dist/es/value/index.mjs
var isFloat = function(value) {
  return !isNaN(parseFloat(value));
};
var MotionValue = function() {
  function MotionValue2(init) {
    var _this = this;
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = function(v3, render) {
      if (render === void 0) {
        render = true;
      }
      _this.prev = _this.current;
      _this.current = v3;
      var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta;
        _this.lastUpdated = timestamp;
        es_default.postRender(_this.scheduleVelocityCheck);
      }
      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      }
      if (_this.velocityUpdateSubscribers.getSize()) {
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
      if (render) {
        _this.renderSubscribers.notify(_this.current);
      }
    };
    this.scheduleVelocityCheck = function() {
      return es_default.postRender(_this.velocityCheck);
    };
    this.velocityCheck = function(_a) {
      var timestamp = _a.timestamp;
      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  MotionValue2.prototype.onChange = function(subscription) {
    return this.updateSubscribers.add(subscription);
  };
  MotionValue2.prototype.clearListeners = function() {
    this.updateSubscribers.clear();
  };
  MotionValue2.prototype.onRenderRequest = function(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  };
  MotionValue2.prototype.attach = function(passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  MotionValue2.prototype.set = function(v3, render) {
    if (render === void 0) {
      render = true;
    }
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v3, render);
    } else {
      this.passiveEffect(v3, this.updateAndNotify);
    }
  };
  MotionValue2.prototype.get = function() {
    return this.current;
  };
  MotionValue2.prototype.getPrevious = function() {
    return this.prev;
  };
  MotionValue2.prototype.getVelocity = function() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  };
  MotionValue2.prototype.start = function(animation) {
    var _this = this;
    this.stop();
    return new Promise(function(resolve) {
      _this.hasAnimated = true;
      _this.stopAnimation = animation(resolve);
    }).then(function() {
      return _this.clearAnimation();
    });
  };
  MotionValue2.prototype.stop = function() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  };
  MotionValue2.prototype.isAnimating = function() {
    return !!this.stopAnimation;
  };
  MotionValue2.prototype.clearAnimation = function() {
    this.stopAnimation = null;
  };
  MotionValue2.prototype.destroy = function() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  };
  return MotionValue2;
}();
function motionValue(init) {
  return new MotionValue(init);
}

// node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
init_react();
var isMotionValue = function(value) {
  return Boolean(value !== null && typeof value === "object" && value.getVelocity);
};

// node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/time-conversion.mjs
init_react();
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};

// node_modules/framer-motion/dist/es/animation/utils/easing.mjs
init_react();
var easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
var easingDefinitionToFunction = function(definition) {
  if (Array.isArray(definition)) {
    invariant2(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
    var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant2(easingLookup[definition] !== void 0, "Invalid easing type '".concat(definition, "'"));
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = function(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};

// node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
init_react();
var isAnimatable = function(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
init_react();

// node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
init_react();
var isKeyframesTarget = function(v3) {
  return Array.isArray(v3);
};

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = function() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  };
};
var criticallyDampedSpring = function(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  };
};
var linearTween = function() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};
var keyframes2 = function(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values
  };
};
var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
  var transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return __assign({ to }, transitionFactory(to));
};

// node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
init_react();
var int = __assign(__assign({}, number), { transform: Math.round });

// node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = __assign(__assign({}, numberValueTypes), {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
});
var getDefaultValueType = function(key) {
  return defaultValueTypes[key];
};

// node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

// node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
init_react();
var instantAnimationState = {
  current: false
};

// node_modules/framer-motion/dist/es/utils/resolve-value.mjs
init_react();
var isCustomValue = function(v3) {
  return Boolean(v3 && typeof v3 === "object" && v3.mix && v3.toValue);
};
var resolveFinalValueInKeyframes = function(v3) {
  return isKeyframesTarget(v3) ? v3[v3.length - 1] || 0 : v3;
};

// node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition2 = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition2).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition2 = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options = __assign({}, transition2);
  if (times)
    options["offset"] = times;
  if (transition2.duration)
    options["duration"] = secondsToMilliseconds(transition2.duration);
  if (transition2.repeatDelay)
    options.repeatDelay = secondsToMilliseconds(transition2.repeatDelay);
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition2.type === "tween")
    options.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }
    options.repeat = loop || yoyo || flip || transition2.repeat;
  }
  if (transition2.type !== "spring")
    options.type = "keyframes";
  return options;
}
function getDelayFromTransition(transition2, key) {
  var _a, _b;
  var valueTransition = getValueTransition(transition2, key) || {};
  return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition2.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = __spreadArray([], __read(options.to), false);
    options.to[0] = options.from;
  }
  return options;
}
function getPopmotionAnimationOptions(transition2, options, key) {
  var _a;
  if (Array.isArray(options.to)) {
    (_a = transition2.duration) !== null && _a !== void 0 ? _a : transition2.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition2)) {
    transition2 = __assign(__assign({}, transition2), getDefaultTransition(key, options.to));
  }
  return __assign(__assign({}, options), convertTransitionToAnimationOptions(transition2));
}
function getAnimation(key, value, target, transition2, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition2, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate ".concat(key, ' from "').concat(origin, '" to "').concat(target, '". ').concat(origin, " is not an animatable value - to enable this animation set ").concat(origin, " to a value animatable to ").concat(target, " via the `style` property."));
  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v3) {
        return value.set(v3);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign(__assign({}, options), valueTransition)) : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function(v3) {
      var _a2;
      options.onUpdate(v3);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v3);
    }, onComplete: function() {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2, _b;
    var finalTarget = resolveFinalValueInKeyframes(target);
    value.set(finalTarget);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, finalTarget);
    (_b = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _b === void 0 ? void 0 : _b.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition2, key) {
  return transition2[key] || transition2["default"] || transition2;
}
function startAnimation(key, value, target, transition2) {
  if (transition2 === void 0) {
    transition2 = {};
  }
  if (instantAnimationState.current) {
    transition2 = { type: false };
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition2, onComplete);
    var delay = getDelayFromTransition(transition2, key);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = window.setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}

// node_modules/framer-motion/dist/es/animation/animate.mjs
function animate2(from, to, transition2) {
  if (transition2 === void 0) {
    transition2 = {};
  }
  var value = isMotionValue(from) ? from : motionValue(from);
  startAnimation("", value, to, transition2);
  return {
    stop: function() {
      return value.stop();
    },
    isAnimating: function() {
      return value.isAnimating();
    }
  };
}

// node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
init_react();
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = function(value) {
  return typeof value === "string" ? parseFloat(value) : value;
};
var isPx = function(value) {
  return typeof value === "number" || px.test(value);
};
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  var _a, _b, _c, _d;
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(0, (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1, easeCrossfadeIn(progress2));
    target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress2);
  }
  for (var i2 = 0; i2 < numBorders; i2++) {
    var borderLabel = "border".concat(borders[i2], "Radius");
    var followRadius = getRadius(follow, borderLabel);
    var leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    var canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  var _a;
  return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
  return function(p3) {
    if (p3 < min)
      return 0;
    if (p3 > max)
      return 1;
    return easing(progress(min, max, p3));
  };
}

// node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
init_react();
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
init_react();

// node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
init_react();
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale(_a) {
  var scale2 = _a.scale, scaleX = _a.scaleX, scaleY = _a.scaleY;
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || hasTranslate(values.x) || hasTranslate(values.y) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function hasTranslate(value) {
  return value && value !== "0%";
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x2 = _a.x, y = _a.y;
  applyAxisDelta(box.x, x2.translate, x2.scale, x2.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition) {
  var _a, _b;
  if (isSharedTransition === void 0) {
    isSharedTransition = false;
  }
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta;
  for (var i2 = 0; i2 < treeLength; i2++) {
    node = treePath[i2];
    delta = node.projectionDelta;
    if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
      continue;
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, { x: -node.scroll.x, y: -node.scroll.y });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function transformBox(box, transform) {
  transformAxis(box.x, transform, xKeys);
  transformAxis(box.y, transform, yKeys);
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
init_react();
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcAxisDelta(delta, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
  calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
init_react();
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale, originAxis, sourceAxis) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  if (originAxis === void 0) {
    originAxis = axis;
  }
  if (sourceAxis === void 0) {
    sourceAxis = axis;
  }
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    var relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  var originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a, origin, sourceAxis) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
  removeAxisTransforms(box.y, transforms, yKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}

// node_modules/framer-motion/dist/es/projection/geometry/models.mjs
init_react();
var createAxisDelta = function() {
  return {
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
  };
};
var createDelta = function() {
  return {
    x: createAxisDelta(),
    y: createAxisDelta()
  };
};
var createAxis = function() {
  return { min: 0, max: 0 };
};
var createBox = function() {
  return {
    x: createAxis(),
    y: createAxis()
  };
};

// node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
init_react();
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a2, b5) {
  return a2.x.min === b5.x.min && a2.x.max === b5.x.max && a2.y.min === b5.y.min && a2.y.max === b5.y.max;
}

// node_modules/framer-motion/dist/es/projection/shared/stack.mjs
init_react();
var NodeStack = function() {
  function NodeStack2() {
    this.members = [];
  }
  NodeStack2.prototype.add = function(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  };
  NodeStack2.prototype.remove = function(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      var prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  };
  NodeStack2.prototype.relegate = function(node) {
    var indexOfNode = this.members.findIndex(function(member2) {
      return node === member2;
    });
    if (indexOfNode === 0)
      return false;
    var prevLead;
    for (var i2 = indexOfNode; i2 >= 0; i2--) {
      var member = this.members[i2];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  };
  NodeStack2.prototype.promote = function(node, preserveFollowOpacity) {
    var _a;
    var prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
        node.snapshot.isShared = true;
      }
      if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
        node.isLayoutDirty = true;
      }
      var crossfade = node.options.crossfade;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  };
  NodeStack2.prototype.exitAnimationComplete = function() {
    this.members.forEach(function(node) {
      var _a, _b, _c, _d, _e;
      (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
    });
  };
  NodeStack2.prototype.scheduleRender = function() {
    this.members.forEach(function(node) {
      node.instance && node.scheduleRender(false);
    });
  };
  NodeStack2.prototype.removeLeadSnapshot = function() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  };
  return NodeStack2;
}();

// node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
init_react();
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// node_modules/framer-motion/dist/es/projection/styles/transform.mjs
init_react();
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
  var xTranslate = delta.x.translate / treeScale.x;
  var yTranslate = delta.y.translate / treeScale.y;
  var transform = "translate3d(".concat(xTranslate, "px, ").concat(yTranslate, "px, 0) ");
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform += "rotate(".concat(rotate, "deg) ");
    if (rotateX)
      transform += "rotateX(".concat(rotateX, "deg) ");
    if (rotateY)
      transform += "rotateY(".concat(rotateY, "deg) ");
  }
  transform += "scale(".concat(delta.x.scale, ", ").concat(delta.y.scale, ")");
  return transform === identityProjection ? "none" : transform;
}

// node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
init_react();
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
init_react();
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function(operationKey) {
  return transformAxes.forEach(function(axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
function sortTransformProps(a2, b5) {
  return transformProps.indexOf(a2) - transformProps.indexOf(b5);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
init_react();

// node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
init_react();
var compareByDepth = function(a2, b5) {
  return a2.depth - b5.depth;
};

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = function() {
  function FlatTree2() {
    this.children = [];
    this.isDirty = false;
  }
  FlatTree2.prototype.add = function(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.remove = function(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.forEach = function(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  };
  return FlatTree2;
}();

// node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
init_react();
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var animationTarget = 1e3;
var globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};
function createProjectionNode(_a) {
  var attachResizeListener = _a.attachResizeListener, defaultParent = _a.defaultParent, measureScroll = _a.measureScroll, resetTransform = _a.resetTransform;
  return function() {
    function ProjectionNode(id2, latestValues, parent) {
      var _this = this;
      if (latestValues === void 0) {
        latestValues = {};
      }
      if (parent === void 0) {
        parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent();
      }
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.potentialNodes = /* @__PURE__ */ new Map();
      this.checkUpdateFailed = function() {
        if (_this.isUpdating) {
          _this.isUpdating = false;
          _this.clearAllSnapshots();
        }
      };
      this.updateProjection = function() {
        _this.nodes.forEach(resolveTargetDelta);
        _this.nodes.forEach(calcProjection);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.id = id2;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? __spreadArray(__spreadArray([], __read(parent.path), false), [parent], false) : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      id2 && this.root.registerPotentialNode(id2, this);
      for (var i2 = 0; i2 < this.path.length; i2++) {
        this.path[i2].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    ProjectionNode.prototype.addEventListener = function(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    };
    ProjectionNode.prototype.notifyListeners = function(name) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify.apply(subscriptionManager, __spreadArray([], __read(args), false));
    };
    ProjectionNode.prototype.hasListeners = function(name) {
      return this.eventHandlers.has(name);
    };
    ProjectionNode.prototype.registerPotentialNode = function(id2, node) {
      this.potentialNodes.set(id2, node);
    };
    ProjectionNode.prototype.mount = function(instance, isLayoutDirty) {
      var _this = this;
      var _a2;
      if (isLayoutDirty === void 0) {
        isLayoutDirty = false;
      }
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      var _b = this.options, layoutId = _b.layoutId, layout = _b.layout, visualElement2 = _b.visualElement;
      if (visualElement2 && !visualElement2.getInstance()) {
        visualElement2.mount(instance);
      }
      this.root.nodes.add(this);
      (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.children.add(this);
      this.id && this.root.potentialNodes.delete(this.id);
      if (isLayoutDirty && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        var unblockTimeout_1;
        var resizeUnblockUpdate_1 = function() {
          return _this.root.updateBlockedByResize = false;
        };
        attachResizeListener(instance, function() {
          _this.root.updateBlockedByResize = true;
          clearTimeout(unblockTimeout_1);
          unblockTimeout_1 = window.setTimeout(resizeUnblockUpdate_1, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            _this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement2 && (layoutId || layout)) {
        this.addEventListener("didUpdate", function(_a3) {
          var _b2, _c, _d, _e, _f;
          var delta = _a3.delta, hasLayoutChanged = _a3.hasLayoutChanged, hasRelativeTargetChanged = _a3.hasRelativeTargetChanged, newLayout = _a3.layout;
          if (_this.isTreeAnimationBlocked()) {
            _this.target = void 0;
            _this.relativeTarget = void 0;
            return;
          }
          var layoutTransition = (_c = (_b2 = _this.options.transition) !== null && _b2 !== void 0 ? _b2 : visualElement2.getDefaultTransition()) !== null && _c !== void 0 ? _c : defaultLayoutTransition;
          var onLayoutAnimationComplete = visualElement2.getProps().onLayoutAnimationComplete;
          var targetChanged = !_this.targetLayout || !boxEquals(_this.targetLayout, newLayout) || hasRelativeTargetChanged;
          var hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (((_d = _this.resumeFrom) === null || _d === void 0 ? void 0 : _d.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !_this.currentAnimation)) {
            if (_this.resumeFrom) {
              _this.resumingFrom = _this.resumeFrom;
              _this.resumingFrom.resumingFrom = void 0;
            }
            _this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            var animationOptions = __assign(__assign({}, getValueTransition(layoutTransition, "layout")), { onComplete: onLayoutAnimationComplete });
            if (visualElement2.shouldReduceMotion) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            _this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && _this.animationProgress === 0) {
              _this.finishAnimation();
            }
            _this.isLead() && ((_f = (_e = _this.options).onExitComplete) === null || _f === void 0 ? void 0 : _f.call(_e));
          }
          _this.targetLayout = newLayout;
        });
      }
    };
    ProjectionNode.prototype.unmount = function() {
      var _a2, _b;
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.remove(this);
      (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    };
    ProjectionNode.prototype.blockUpdate = function() {
      this.updateManuallyBlocked = true;
    };
    ProjectionNode.prototype.unblockUpdate = function() {
      this.updateManuallyBlocked = false;
    };
    ProjectionNode.prototype.isUpdateBlocked = function() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    };
    ProjectionNode.prototype.isTreeAnimationBlocked = function() {
      var _a2;
      return this.isAnimationBlocked || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimationBlocked()) || false;
    };
    ProjectionNode.prototype.startUpdate = function() {
      var _a2;
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      (_a2 = this.nodes) === null || _a2 === void 0 ? void 0 : _a2.forEach(resetRotation);
    };
    ProjectionNode.prototype.willUpdate = function(shouldNotifyListeners) {
      var _a2, _b, _c;
      if (shouldNotifyListeners === void 0) {
        shouldNotifyListeners = true;
      }
      if (this.root.isUpdateBlocked()) {
        (_b = (_a2 = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a2);
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (var i2 = 0; i2 < this.path.length; i2++) {
        var node = this.path[i2];
        node.shouldResetTransform = true;
        node.updateScroll();
      }
      var _d = this.options, layoutId = _d.layoutId, layout = _d.layout;
      if (layoutId === void 0 && !layout)
        return;
      var transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
      this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    };
    ProjectionNode.prototype.didUpdate = function() {
      var updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating)
        return;
      this.isUpdating = false;
      if (this.potentialNodes.size) {
        this.potentialNodes.forEach(mountNodeEarly);
        this.potentialNodes.clear();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      flushSync.update();
      flushSync.preRender();
      flushSync.render();
    };
    ProjectionNode.prototype.clearAllSnapshots = function() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    };
    ProjectionNode.prototype.scheduleUpdateProjection = function() {
      es_default.preRender(this.updateProjection, false, true);
    };
    ProjectionNode.prototype.scheduleCheckAfterUnmount = function() {
      var _this = this;
      es_default.postRender(function() {
        if (_this.isLayoutDirty) {
          _this.root.didUpdate();
        } else {
          _this.root.checkUpdateFailed();
        }
      });
    };
    ProjectionNode.prototype.updateSnapshot = function() {
      if (this.snapshot || !this.instance)
        return;
      var measured = this.measure();
      var layout = this.removeTransform(this.removeElementScroll(measured));
      roundBox(layout);
      this.snapshot = {
        measured,
        layout,
        latestValues: {}
      };
    };
    ProjectionNode.prototype.updateLayout = function() {
      var _a2;
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (var i2 = 0; i2 < this.path.length; i2++) {
          var node = this.path[i2];
          node.updateScroll();
        }
      }
      var measured = this.measure();
      roundBox(measured);
      var prevLayout = this.layout;
      this.layout = {
        measured,
        actual: this.removeElementScroll(measured)
      };
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.actual);
      (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
    };
    ProjectionNode.prototype.updateScroll = function() {
      if (this.options.layoutScroll && this.instance) {
        this.scroll = measureScroll(this.instance);
      }
    };
    ProjectionNode.prototype.resetTransform = function() {
      var _a2;
      if (!resetTransform)
        return;
      var isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      var hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
      var transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      var transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    };
    ProjectionNode.prototype.measure = function() {
      var visualElement2 = this.options.visualElement;
      if (!visualElement2)
        return createBox();
      var box = visualElement2.measureViewportBox();
      var scroll = this.root.scroll;
      if (scroll) {
        translateAxis(box.x, scroll.x);
        translateAxis(box.y, scroll.y);
      }
      return box;
    };
    ProjectionNode.prototype.removeElementScroll = function(box) {
      var boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (var i2 = 0; i2 < this.path.length; i2++) {
        var node = this.path[i2];
        var scroll_1 = node.scroll, options = node.options;
        if (node !== this.root && scroll_1 && options.layoutScroll) {
          translateAxis(boxWithoutScroll.x, scroll_1.x);
          translateAxis(boxWithoutScroll.y, scroll_1.y);
        }
      }
      return boxWithoutScroll;
    };
    ProjectionNode.prototype.applyTransform = function(box, transformOnly) {
      if (transformOnly === void 0) {
        transformOnly = false;
      }
      var withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (var i2 = 0; i2 < this.path.length; i2++) {
        var node = this.path[i2];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.x,
            y: -node.scroll.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    };
    ProjectionNode.prototype.removeTransform = function(box) {
      var _a2;
      var boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (var i2 = 0; i2 < this.path.length; i2++) {
        var node = this.path[i2];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        var sourceBox = createBox();
        var nodeBox = node.measure();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a2 = node.snapshot) === null || _a2 === void 0 ? void 0 : _a2.layout, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    };
    ProjectionNode.prototype.setTargetDelta = function(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
    };
    ProjectionNode.prototype.setOptions = function(options) {
      var _a2;
      this.options = __assign(__assign(__assign({}, this.options), options), { crossfade: (_a2 = options.crossfade) !== null && _a2 !== void 0 ? _a2 : true });
    };
    ProjectionNode.prototype.clearMeasurements = function() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    };
    ProjectionNode.prototype.resolveTargetDelta = function() {
      var _a2;
      var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
      if (!this.layout || !(layout || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && this.relativeParent.layout) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.actual, this.relativeParent.layout.actual);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.target)) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.actual);
        } else {
          copyBoxInto(this.target, this.layout.actual);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.actual);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && Boolean(this.relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !this.relativeParent.options.layoutScroll && this.relativeParent.target) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, this.relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
    };
    ProjectionNode.prototype.getClosestProjectingParent = function() {
      if (!this.parent || hasTransform(this.parent.latestValues))
        return void 0;
      if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    };
    ProjectionNode.prototype.calcProjection = function() {
      var _a2;
      var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
      this.isTreeAnimating = Boolean(((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      var lead = this.getLead();
      copyBoxInto(this.layoutCorrected, this.layout.actual);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
      var target = lead.target;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      var prevTreeScaleX = this.treeScale.x;
      var prevTreeScaleY = this.treeScale.y;
      var prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
    };
    ProjectionNode.prototype.hide = function() {
      this.isVisible = false;
    };
    ProjectionNode.prototype.show = function() {
      this.isVisible = true;
    };
    ProjectionNode.prototype.scheduleRender = function(notifyAll) {
      var _a2, _b, _c;
      if (notifyAll === void 0) {
        notifyAll = true;
      }
      (_b = (_a2 = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a2);
      notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    };
    ProjectionNode.prototype.setAnimationOrigin = function(delta, hasOnlyRelativeTargetChanged) {
      var _this = this;
      var _a2;
      if (hasOnlyRelativeTargetChanged === void 0) {
        hasOnlyRelativeTargetChanged = false;
      }
      var snapshot = this.snapshot;
      var snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
      var mixedValues = __assign({}, this.latestValues);
      var targetDelta = createDelta();
      this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      var relativeLayout = createBox();
      var isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
      var isOnlyMember = (((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length) || 0) <= 1;
      var shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      this.mixTargetDelta = function(latest) {
        var _a3;
        var progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        _this.setTargetDelta(targetDelta);
        if (_this.relativeTarget && _this.relativeTargetOrigin && _this.layout && ((_a3 = _this.relativeParent) === null || _a3 === void 0 ? void 0 : _a3.layout)) {
          calcRelativePosition(relativeLayout, _this.layout.actual, _this.relativeParent.layout.actual);
          mixBox(_this.relativeTarget, _this.relativeTargetOrigin, relativeLayout, progress2);
        }
        if (isSharedLayoutAnimation) {
          _this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, _this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        _this.root.scheduleUpdateProjection();
        _this.scheduleRender();
        _this.animationProgress = progress2;
      };
      this.mixTargetDelta(0);
    };
    ProjectionNode.prototype.startAnimation = function(options) {
      var _this = this;
      var _a2, _b;
      (_a2 = this.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      if (this.resumingFrom) {
        (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = es_default.update(function() {
        globalProjectionState.hasAnimatedSinceResize = true;
        _this.currentAnimation = animate2(0, animationTarget, __assign(__assign({}, options), { onUpdate: function(latest) {
          var _a3;
          _this.mixTargetDelta(latest);
          (_a3 = options.onUpdate) === null || _a3 === void 0 ? void 0 : _a3.call(options, latest);
        }, onComplete: function() {
          var _a3;
          (_a3 = options.onComplete) === null || _a3 === void 0 ? void 0 : _a3.call(options);
          _this.completeAnimation();
        } }));
        if (_this.resumingFrom) {
          _this.resumingFrom.currentAnimation = _this.currentAnimation;
        }
        _this.pendingAnimation = void 0;
      });
    };
    ProjectionNode.prototype.completeAnimation = function() {
      var _a2;
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    };
    ProjectionNode.prototype.finishAnimation = function() {
      var _a2;
      if (this.currentAnimation) {
        (_a2 = this.mixTargetDelta) === null || _a2 === void 0 ? void 0 : _a2.call(this, animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    };
    ProjectionNode.prototype.applyTransformsToTarget = function() {
      var _a2 = this.getLead(), targetWithTransforms = _a2.targetWithTransforms, target = _a2.target, layout = _a2.layout, latestValues = _a2.latestValues;
      if (!targetWithTransforms || !target || !layout)
        return;
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    };
    ProjectionNode.prototype.registerSharedNode = function(layoutId, node) {
      var _a2, _b, _c;
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      var stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      node.promote({
        transition: (_a2 = node.options.initialPromotionConfig) === null || _a2 === void 0 ? void 0 : _a2.transition,
        preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
      });
    };
    ProjectionNode.prototype.isLead = function() {
      var stack = this.getStack();
      return stack ? stack.lead === this : true;
    };
    ProjectionNode.prototype.getLead = function() {
      var _a2;
      var layoutId = this.options.layoutId;
      return layoutId ? ((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.lead) || this : this;
    };
    ProjectionNode.prototype.getPrevLead = function() {
      var _a2;
      var layoutId = this.options.layoutId;
      return layoutId ? (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.prevLead : void 0;
    };
    ProjectionNode.prototype.getStack = function() {
      var layoutId = this.options.layoutId;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    };
    ProjectionNode.prototype.promote = function(_a2) {
      var _b = _a2 === void 0 ? {} : _a2, needsReset = _b.needsReset, transition2 = _b.transition, preserveFollowOpacity = _b.preserveFollowOpacity;
      var stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition2)
        this.setOptions({ transition: transition2 });
    };
    ProjectionNode.prototype.relegate = function() {
      var stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    };
    ProjectionNode.prototype.resetRotation = function() {
      var visualElement2 = this.options.visualElement;
      if (!visualElement2)
        return;
      var hasRotate = false;
      var resetValues = {};
      for (var i2 = 0; i2 < transformAxes.length; i2++) {
        var axis = transformAxes[i2];
        var key = "rotate" + axis;
        if (!visualElement2.getStaticValue(key)) {
          continue;
        }
        hasRotate = true;
        resetValues[key] = visualElement2.getStaticValue(key);
        visualElement2.setStaticValue(key, 0);
      }
      if (!hasRotate)
        return;
      visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
      for (var key in resetValues) {
        visualElement2.setStaticValue(key, resetValues[key]);
      }
      visualElement2.scheduleRender();
    };
    ProjectionNode.prototype.getProjectionStyles = function(styleProp) {
      var _a2, _b, _c, _d, _e, _f;
      if (styleProp === void 0) {
        styleProp = {};
      }
      var styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      var lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        var emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = (_b = this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      var valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      var _g = this.projectionDelta, x2 = _g.x, y = _g.y;
      styles.transformOrigin = "".concat(x2.origin * 100, "% ").concat(y.origin * 100, "% 0");
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_d = (_c = valuesToRender.opacity) !== null && _c !== void 0 ? _c : this.latestValues.opacity) !== null && _d !== void 0 ? _d : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? (_e = valuesToRender.opacity) !== null && _e !== void 0 ? _e : "" : (_f = valuesToRender.opacityExit) !== null && _f !== void 0 ? _f : 0;
      }
      for (var key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        var _h = scaleCorrectors[key], correct = _h.correct, applyTo = _h.applyTo;
        var corrected = correct(valuesToRender[key], lead);
        if (applyTo) {
          var num = applyTo.length;
          for (var i2 = 0; i2 < num; i2++) {
            styles[applyTo[i2]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    };
    ProjectionNode.prototype.clearSnapshot = function() {
      this.resumeFrom = this.snapshot = void 0;
    };
    ProjectionNode.prototype.resetTree = function() {
      this.root.nodes.forEach(function(node) {
        var _a2;
        return (_a2 = node.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    };
    return ProjectionNode;
  }();
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a, _b, _c, _d;
  var snapshot = (_b = (_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) !== null && _b !== void 0 ? _b : node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    var _e = node.layout, layout_1 = _e.actual, measuredLayout = _e.measured;
    if (node.options.animationType === "size") {
      eachAxis(function(axis) {
        var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        var length = calcLength(axisSnapshot);
        axisSnapshot.min = layout_1[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (node.options.animationType === "position") {
      eachAxis(function(axis) {
        var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        var length = calcLength(layout_1[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
      });
    }
    var layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout_1, snapshot.layout);
    var visualDelta = createDelta();
    if (snapshot.isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
    } else {
      calcBoxDelta(visualDelta, layout_1, snapshot.layout);
    }
    var hasLayoutChanged = !isDeltaZero(layoutDelta);
    var hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      node.relativeParent = node.getClosestProjectingParent();
      if (node.relativeParent && !node.relativeParent.resumeFrom) {
        var _f = node.relativeParent, parentSnapshot = _f.snapshot, parentLayout = _f.layout;
        if (parentSnapshot && parentLayout) {
          var relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
          var relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout_1, parentLayout.actual);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout_1,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    (_d = (_c = node.options).onExitComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
  }
  node.options.transition = void 0;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function resetTransformStyle(node) {
  var visualElement2 = node.options.visualElement;
  if (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.getProps().onBeforeLayoutMeasure) {
    visualElement2.notifyBeforeLayoutMeasure();
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetRotation(node) {
  node.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p3) {
  output.translate = mix(delta.translate, 0, p3);
  output.scale = mix(delta.scale, 1, p3);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p3) {
  output.min = mix(from.min, to.min, p3);
  output.max = mix(from.max, to.max, p3);
}
function mixBox(output, from, to, p3) {
  mixAxis(output.x, from.x, to.x, p3);
  mixAxis(output.y, from.y, to.y, p3);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node, id2) {
  var searchNode = node.root;
  for (var i2 = node.path.length - 1; i2 >= 0; i2--) {
    if (Boolean(node.path[i2].instance)) {
      searchNode = node.path[i2];
      break;
    }
  }
  var searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
  var element = searchElement.querySelector('[data-projection-id="'.concat(id2, '"]'));
  if (element)
    node.mount(element, true);
}
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}

// node_modules/framer-motion/dist/es/projection/node/id.mjs
var id = 1;
function useProjectionId() {
  return useConstant(function() {
    if (globalProjectionState.hasEverUpdated) {
      return id++;
    }
  });
}

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
init_react();
var import_react12 = __toESM(require_react(), 1);
var LayoutGroupContext = (0, import_react12.createContext)({});

// node_modules/framer-motion/dist/es/motion/features/use-projection.mjs
init_react();
var import_react14 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
init_react();
var import_react13 = __toESM(require_react(), 1);
var SwitchLayoutGroupContext = (0, import_react13.createContext)({});

// node_modules/framer-motion/dist/es/motion/features/use-projection.mjs
function useProjection(projectionId, _a, visualElement2, ProjectionNodeConstructor) {
  var _b;
  var layoutId = _a.layoutId, layout = _a.layout, drag2 = _a.drag, dragConstraints = _a.dragConstraints, layoutScroll = _a.layoutScroll;
  var initialPromotionConfig = (0, import_react14.useContext)(SwitchLayoutGroupContext);
  if (!ProjectionNodeConstructor || !visualElement2 || (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.projection)) {
    return;
  }
  visualElement2.projection = new ProjectionNodeConstructor(projectionId, visualElement2.getLatestValues(), (_b = visualElement2.parent) === null || _b === void 0 ? void 0 : _b.projection);
  visualElement2.projection.setOptions({
    layoutId,
    layout,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement: visualElement2,
    scheduleRender: function() {
      return visualElement2.scheduleRender();
    },
    animationType: typeof layout === "string" ? layout : "both",
    initialPromotionConfig,
    layoutScroll
  });
}

// node_modules/framer-motion/dist/es/motion/utils/VisualElementHandler.mjs
init_react();
var import_react15 = __toESM(require_react(), 1);
var VisualElementHandler = function(_super) {
  __extends(VisualElementHandler2, _super);
  function VisualElementHandler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  VisualElementHandler2.prototype.getSnapshotBeforeUpdate = function() {
    this.updateProps();
    return null;
  };
  VisualElementHandler2.prototype.componentDidUpdate = function() {
  };
  VisualElementHandler2.prototype.updateProps = function() {
    var _a = this.props, visualElement2 = _a.visualElement, props = _a.props;
    if (visualElement2)
      visualElement2.setProps(props);
  };
  VisualElementHandler2.prototype.render = function() {
    return this.props.children;
  };
  return VisualElementHandler2;
}(import_react15.default.Component);

// node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent(_a) {
  var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, projectionNodeConstructor = _a.projectionNodeConstructor, useRender = _a.useRender, useVisualState = _a.useVisualState, Component2 = _a.Component;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    var layoutId = useLayoutId(props);
    props = __assign(__assign({}, props), { layoutId });
    var config = (0, import_react16.useContext)(MotionConfigContext);
    var features = null;
    var context = useCreateMotionContext(props);
    var projectionId = config.isStatic ? void 0 : useProjectionId();
    var visualState = useVisualState(props, config.isStatic);
    if (!config.isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component2, visualState, __assign(__assign({}, config), props), createVisualElement);
      useProjection(projectionId, props, context.visualElement, projectionNodeConstructor || featureDefinitions.projectionNodeConstructor);
      features = useFeatures(props, context.visualElement, preloadedFeatures);
    }
    return React3.createElement(VisualElementHandler, { visualElement: context.visualElement, props: __assign(__assign({}, config), props) }, features, React3.createElement(MotionContext.Provider, { value: context }, useRender(Component2, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, config.isStatic, context.visualElement)));
  }
  return (0, import_react16.forwardRef)(MotionComponent);
}
function useLayoutId(_a) {
  var _b;
  var layoutId = _a.layoutId;
  var layoutGroupId = (_b = (0, import_react16.useContext)(LayoutGroupContext)) === null || _b === void 0 ? void 0 : _b.id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}

// node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs
init_react();
function createMotionProxy(createConfig) {
  function custom(Component2, customMotionComponentConfig) {
    if (customMotionComponentConfig === void 0) {
      customMotionComponentConfig = {};
    }
    return createMotionComponent(createConfig(Component2, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  var componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: function(_target, key) {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
init_react();

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
init_react();
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (typeof Component2 !== "string" || Component2.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component2) > -1 || /[A-Z]/.test(Component2)) {
    return true;
  }
  return false;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
init_react();
var import_react19 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
init_react();
var import_react17 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
init_react();
function isForcedMotionValue(key, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
init_react();

// node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
init_react();
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i2 = 0; i2 < numTransformKeys; i2++) {
    var key = transformKeys2[i2];
    transformString += "".concat(translateAlias[key] || key, "(").concat(transform[key], ") ");
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return "".concat(originX, " ").concat(originY, " ").concat(originZ);
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
init_react();
function isCSSVariable(key) {
  return key.startsWith("--");
}

// node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
init_react();
var getValueAsType = function(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  var _a;
  var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform2 = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key in latestValues) {
    var value = latestValues[key];
    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    }
    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform2 = true;
      transform[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      style[key] = valueAsType;
    }
  }
  if (hasTransform2) {
    style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
  } else if (transformTemplate) {
    style.transform = transformTemplate({}, "");
  } else if (!latestValues.transform && style.transform) {
    style.transform = "none";
  }
  if (hasTransformOrigin) {
    style.transformOrigin = buildTransformOrigin(transformOrigin);
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
init_react();
var createHtmlRenderState = function() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (var key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues(_a, visualState, isStatic) {
  var transformTemplate = _a.transformTemplate;
  return (0, import_react17.useMemo)(function() {
    var state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    var vars = state.vars, style = state.style;
    return __assign(__assign({}, vars), style);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  var styleProp = props.style || {};
  var style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  if (props.transformValues) {
    style = props.transformValues(style);
  }
  return style;
}
function useHTMLProps(props, visualState, isStatic) {
  var htmlProps = {};
  var style = useStyle(props, visualState, isStatic);
  if (Boolean(props.drag) && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : "pan-".concat(props.drag === "x" ? "y" : "x");
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
init_react();

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
init_react();
var validMotionProps = /* @__PURE__ */ new Set([
  "initial",
  "animate",
  "exit",
  "style",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "layoutDependency",
  "onLayoutAnimationComplete",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "dragSnapToOrigin",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "whileDrag",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onHoverStart",
  "onHoverEnd",
  "whileFocus",
  "whileTap",
  "whileHover",
  "whileInView",
  "onViewportEnter",
  "onViewportLeave",
  "viewport",
  "layoutScroll"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = function(key) {
  return !isValidMotionProp(key);
};
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = function(key) {
    return key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
  };
}
try {
  loadExternalIsValidProp((init_is_prop_valid_browser_esm(), __toCommonJS(is_prop_valid_browser_esm_exports)).default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
init_react();
var import_react18 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
init_react();

// node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
init_react();
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return "".concat(pxOriginX, " ").concat(pxOriginY);
}

// node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
init_react();
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (useDashCase === void 0) {
    useDashCase = true;
  }
  attrs.pathLength = 1;
  var keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  var pathLength = px.transform(length);
  var pathSpacing = px.transform(spacing);
  attrs[keys.array] = "".concat(pathLength, " ").concat(pathSpacing);
}

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, _a, options, transformTemplate) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, options, transformTemplate);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style = state.style, dimensions = state.dimensions;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
init_react();
var createSvgRenderState = function() {
  return __assign(__assign({}, createHtmlRenderState()), { attrs: {} });
};

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState) {
  var visualProps = (0, import_react18.useMemo)(function() {
    var state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
    return __assign(__assign({}, state.attrs), { style: __assign({}, state.style) });
  }, [visualState]);
  if (props.style) {
    var rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = __assign(__assign({}, rawStyles), visualProps.style);
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps) {
  if (forwardMotionProps === void 0) {
    forwardMotionProps = false;
  }
  var useRender = function(Component2, props, projectionId, ref, _a, isStatic) {
    var latestValues = _a.latestValues;
    var useVisualProps = isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    var visualProps = useVisualProps(props, latestValues, isStatic);
    var filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    var elementProps = __assign(__assign(__assign({}, filteredProps), visualProps), { ref });
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return (0, import_react19.createElement)(Component2, elementProps);
  };
  return useRender;
}

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
init_react();

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
init_react();
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

// node_modules/framer-motion/dist/es/render/html/utils/render.mjs
init_react();
function renderHTML(element, _a, styleProp, projection) {
  var style = _a.style, vars = _a.vars;
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
init_react();
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength"
]);

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
init_react();

// node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
init_react();
function scrapeMotionValuesFromProps(props) {
  var style = props.style;
  var newValues = {};
  for (var key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props) {
  var newValues = scrapeMotionValuesFromProps(props);
  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
init_react();
var import_react20 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
init_react();
function isAnimationControls(v3) {
  return typeof v3 === "object" && typeof v3.start === "function";
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState(_a, props, context, presenceContext) {
  var scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
  var state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = function(instance) {
      return onMount(props, instance, state);
    };
  }
  return state;
}
var makeUseVisualState = function(config) {
  return function(props, isStatic) {
    var context = (0, import_react20.useContext)(MotionContext);
    var presenceContext = (0, import_react20.useContext)(PresenceContext);
    return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function() {
      return makeState(config, props, context, presenceContext);
    });
  };
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  var values = {};
  var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
  var motionValues = scrapeMotionValues(props);
  for (var key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  var initial = props.initial, animate3 = props.animate;
  var isControllingVariants = checkIfControllingVariants(props);
  var isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate3 !== null && animate3 !== void 0 ? animate3 : animate3 = context.animate;
  }
  var initialAnimationIsBlocked = blockInitialAnimation || initial === false;
  var variantToSet = initialAnimationIsBlocked ? animate3 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach(function(definition) {
      var resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      var transitionEnd = resolved.transitionEnd;
      resolved.transition;
      var target = __rest(resolved, ["transitionEnd", "transition"]);
      for (var key2 in target) {
        var valueTarget = target[key2];
        if (Array.isArray(valueTarget)) {
          var index2 = initialAnimationIsBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index2];
        }
        if (valueTarget !== null) {
          values[key2] = valueTarget;
        }
      }
      for (var key2 in transitionEnd)
        values[key2] = transitionEnd[key2];
    });
  }
  return values;
}

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: function(props, instance, _a) {
      var renderState = _a.renderState, latestValues = _a.latestValues;
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e2) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};

// node_modules/framer-motion/dist/es/render/html/config-motion.mjs
init_react();
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
function createDomMotionConfig(Component2, _a, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
  var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
  var baseConfig = isSVGComponent(Component2) ? svgMotionConfig : htmlMotionConfig;
  return __assign(__assign({}, baseConfig), { preloadedFeatures, useRender: createUseRender(forwardMotionProps), createVisualElement, projectionNodeConstructor, Component: Component2 });
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
init_react();

// node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
init_react();

// node_modules/framer-motion/dist/es/render/utils/types.mjs
init_react();
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["InView"] = "whileInView";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

// node_modules/framer-motion/dist/es/events/use-dom-event.mjs
init_react();
var import_react21 = __toESM(require_react(), 1);
function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function() {
    return target.removeEventListener(eventName, handler, options);
  };
}
function useDomEvent(ref, eventName, handler, options) {
  (0, import_react21.useEffect)(function() {
    var element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

// node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
function useFocusGesture(_a) {
  var whileFocus = _a.whileFocus, visualElement2 = _a.visualElement;
  var onFocus = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, true);
  };
  var onBlur = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, false);
  };
  useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
}

// node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
init_react();

// node_modules/framer-motion/dist/es/gestures/utils/event-type.mjs
init_react();
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}

// node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
init_react();

// node_modules/framer-motion/dist/es/events/event-info.mjs
init_react();
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e2, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e2.touches[0] || e2.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }
  var listener = function(event) {
    return handler(event, extractEventInfo(event));
  };
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

// node_modules/framer-motion/dist/es/events/utils.mjs
init_react();
var supportsPointerEvents = function() {
  return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
  return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
  return isBrowser && window.onmousedown === null;
};

// node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
init_react();
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}

// node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
function createHoverEvent(visualElement2, isActive, callback) {
  return function(event, info) {
    var _a;
    if (!isMouseEvent(event) || isDragActive())
      return;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
    callback === null || callback === void 0 ? void 0 : callback(event, info);
  };
}
function useHoverGesture(_a) {
  var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement2 = _a.visualElement;
  usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0);
  usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0);
}

// node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
init_react();
var import_react23 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
init_react();
var isNodeOrChild = function(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs
init_react();
var import_react22 = __toESM(require_react(), 1);
function useUnmountEffect(callback) {
  return (0, import_react22.useEffect)(function() {
    return function() {
      return callback();
    };
  }, []);
}

// node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
function useTapGesture(_a) {
  var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement2 = _a.visualElement;
  var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  var isPressing = (0, import_react23.useRef)(false);
  var cancelPointerEndListeners = (0, import_react23.useRef)(null);
  function removePointerEndListener() {
    var _a2;
    (_a2 = cancelPointerEndListeners.current) === null || _a2 === void 0 ? void 0 : _a2.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    var _a2;
    removePointerEndListener();
    isPressing.current = false;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info) : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
  }
  function onPointerDown(event, info) {
    var _a2;
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, true);
    onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
  }
  usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0);
  useUnmountEffect(removePointerEndListener);
}

// node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
init_react();
var import_react24 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/warn-once.mjs
init_react();
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
init_react();
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = function(entry) {
  var _a;
  (_a = observerCallbacks.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
};
var fireAllObserverCallbacks = function(entries) {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver(_a) {
  var root = _a.root, options = __rest(_a, ["root"]);
  var lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  var rootObservers = observers.get(lookupRoot);
  var key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, __assign({ root }, options));
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  var rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return function() {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
function useViewport(_a) {
  var visualElement2 = _a.visualElement, whileInView = _a.whileInView, onViewportEnter = _a.onViewportEnter, onViewportLeave = _a.onViewportLeave, _b = _a.viewport, viewport = _b === void 0 ? {} : _b;
  var state = (0, import_react24.useRef)({
    hasEnteredView: false,
    isInView: false
  });
  var shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
  if (viewport.once && state.current.hasEnteredView)
    shouldObserve = false;
  var useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
  useObserver(shouldObserve, state.current, visualElement2, viewport);
}
var thresholdNames = {
  some: 0,
  all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement2, _a) {
  var root = _a.root, rootMargin = _a.margin, _b = _a.amount, amount = _b === void 0 ? "some" : _b, once = _a.once;
  (0, import_react24.useEffect)(function() {
    if (!shouldObserve)
      return;
    var options = {
      root: root === null || root === void 0 ? void 0 : root.current,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    var intersectionCallback = function(entry) {
      var _a2;
      var isIntersecting = entry.isIntersecting;
      if (state.isInView === isIntersecting)
        return;
      state.isInView = isIntersecting;
      if (once && !isIntersecting && state.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        state.hasEnteredView = true;
      }
      (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, isIntersecting);
      var props = visualElement2.getProps();
      var callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
      callback === null || callback === void 0 ? void 0 : callback(entry);
    };
    return observeIntersection(visualElement2.getInstance(), options, intersectionCallback);
  }, [shouldObserve, root, rootMargin, amount]);
}
function useMissingIntersectionObserver(shouldObserve, state, visualElement2, _a) {
  var _b = _a.fallback, fallback = _b === void 0 ? true : _b;
  (0, import_react24.useEffect)(function() {
    if (!shouldObserve || !fallback)
      return;
    if (true) {
      warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
    }
    requestAnimationFrame(function() {
      var _a2;
      state.hasEnteredView = true;
      var onViewportEnter = visualElement2.getProps().onViewportEnter;
      onViewportEnter === null || onViewportEnter === void 0 ? void 0 : onViewportEnter(null);
      (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, true);
    });
  }, [shouldObserve]);
}

// node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.mjs
init_react();
var makeRenderlessComponent = function(hook) {
  return function(props) {
    hook(props);
    return null;
  };
};

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: makeRenderlessComponent(useViewport),
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
init_react();
var import_react26 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
init_react();
var import_react25 = __toESM(require_react(), 1);
function usePresence() {
  var context = (0, import_react25.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id2 = useUniqueId();
  (0, import_react25.useEffect)(function() {
    return register(id2);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id2);
  };
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
var counter = 0;
var incrementId = function() {
  return counter++;
};
var useUniqueId = function() {
  return useConstant(incrementId);
};

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
init_react();
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i2 = 0; i2 < prevLength; i2++) {
    if (prev[i2] !== next[i2])
      return false;
  }
  return true;
}

// node_modules/framer-motion/dist/es/render/utils/animation.mjs
init_react();

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
init_react();

// node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
init_react();
var isNumericalString = function(v3) {
  return /^\-?\d*\.?\d+$/.test(v3);
};

// node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
init_react();
var isZeroValueString = function(v3) {
  return /^0[^.\s]+$/.test(v3);
};

// node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
init_react();
var testValueType = function(v3) {
  return function(type) {
    return type.test(v3);
  };
};

// node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
init_react();
var auto = {
  test: function(v3) {
    return v3 === "auto";
  },
  parse: function(v3) {
    return v3;
  }
};

// node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = function(v3) {
  return dimensionValueTypes.find(testValueType(v3));
};

// node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes), false), [color, complex], false);
var findValueType = function(v3) {
  return valueTypes.find(testValueType(v3));
};

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest(_a, ["transitionEnd", "transition"]);
  target = __assign(__assign({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key2) {
    return !visualElement2.hasValue(key2);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i2 = 0; i2 < numNewValues; i2++) {
    var key = newValueKeys[i2];
    var targetValue = target[key];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key, targetValue);
    }
    visualElement2.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement2.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition2) {
  if (!transition2)
    return;
  var valueTransition = transition2[key] || transition2["default"] || transition2;
  return valueTransition.from;
}
function getOrigin(target, transition2, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition2)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}

// node_modules/framer-motion/dist/es/render/utils/animation.mjs
function animateVisualElement(visualElement2, definition, options) {
  if (options === void 0) {
    options = {};
  }
  visualElement2.notifyAnimationStart(definition);
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options.custom);
  var _b = (resolved || {}).transition, transition2 = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options.transitionOverride) {
    transition2 = options.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition2.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition2.staggerChildren, staggerDirection = transition2.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : function() {
    return Promise.resolve();
  };
  var when = transition2.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition2 = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition2 = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key in target) {
    var value = visualElement2.getValue(key);
    var valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    var valueTransition = __assign({ delay }, transition2);
    if (visualElement2.shouldReduceMotion && isTransformProp(key)) {
      valueTransition = __assign(__assign({}, valueTransition), { type: false, delay: 0 });
    }
    var animation = startAnimation(key, value, valueTarget, valueTransition);
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i2) {
    if (i2 === void 0) {
      i2 = 0;
    }
    return i2 * staggerChildren;
  } : function(i2) {
    if (i2 === void 0) {
      i2 = 0;
    }
    return maxStaggerDuration - i2 * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i2) {
    animations2.push(animateVariant(child, variant, __assign(__assign({}, options), { delay: delayChildren + generateStaggerDuration(i2) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a2, b5) {
  return a2.sortNodePosition(b5);
}
function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.InView,
  AnimationType.Focus,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Exit
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder), false).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options = _a.options;
      return animateVisualElement(visualElement2, animation, options);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate3 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
      acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key) {
    return allAnimatedKeys[key] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate3 = makeAnimator(visualElement2);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = /* @__PURE__ */ new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i3) {
      var type = reversePriorityOrder[i3];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i3;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = __assign({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      var variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      var shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i3 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev) || variantDidChange) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: __assign({ type }, options)
          };
        })), false));
      }
    };
    for (var i2 = 0; i2 < numAnimationTypes; i2++) {
      _loop_1(i2);
    }
    allAnimatedKeys = __assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate3(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.InView] = createTypeState(), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: makeRenderlessComponent(function(_a) {
    var visualElement2 = _a.visualElement, animate3 = _a.animate;
    visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
    if (isAnimationControls(animate3)) {
      (0, import_react26.useEffect)(function() {
        return animate3.subscribe(visualElement2);
      }, [animate3]);
    }
  }),
  exit: makeRenderlessComponent(function(props) {
    var custom = props.custom, visualElement2 = props.visualElement;
    var _a = __read(usePresence(), 2), isPresent = _a[0], safeToRemove = _a[1];
    var presenceContext = (0, import_react26.useContext)(PresenceContext);
    (0, import_react26.useEffect)(function() {
      var _a2, _b;
      visualElement2.isPresent = isPresent;
      var animation = (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Exit, !isPresent, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
      !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(safeToRemove));
    }, [isPresent]);
  })
};

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
init_react();

// node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
init_react();
var import_react27 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
init_react();

// node_modules/framer-motion/dist/es/gestures/PanSession.mjs
init_react();
var PanSession = function() {
  function PanSession2(event, handlers, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = function() {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
        return;
      var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null;
      var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      var point2 = info2.point;
      var timestamp2 = getFrameData().timestamp;
      _this.history.push(__assign(__assign({}, point2), { timestamp: timestamp2 }));
      var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info2);
        _this.startEvent = _this.lastMoveEvent;
      }
      onMove && onMove(_this.lastMoveEvent, info2);
    };
    this.handlePointerMove = function(event2, info2) {
      _this.lastMoveEvent = event2;
      _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        _this.handlePointerUp(event2, info2);
        return;
      }
      es_default.update(_this.updatePoint, true);
    };
    this.handlePointerUp = function(event2, info2) {
      _this.end();
      var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
      var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
      if (_this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [__assign(__assign({}, point), { timestamp })];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  PanSession2.prototype.updateHandlers = function(handlers) {
    this.handlers = handlers;
  };
  PanSession2.prototype.end = function() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  };
  return PanSession2;
}();
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b5) {
  return { x: a2.x - b5.x, y: a2.y - b5.y };
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i2 = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i2 >= 0) {
    timestampedPoint = history[i2];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i2--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
init_react();
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
  if (dragElastic === void 0) {
    dragElastic = defaultElastic;
  }
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
init_react();

// node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
init_react();
function convertBoundingBoxToBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox(_a) {
  var x2 = _a.x, y = _a.y;
  return { top: y.min, right: x2.max, bottom: y.max, left: x2.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  var topLeft = transformPoint2({ x: point.left, y: point.top });
  var bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  var viewportBox = measureViewportBox(element, transformPagePoint);
  var scroll = rootProjectionNode2.scroll;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.x);
    translateAxis(viewportBox.y, scroll.y);
  }
  return viewportBox;
}

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = function() {
  function VisualElementDragControls2(visualElement2) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement2;
  }
  VisualElementDragControls2.prototype.start = function(originEvent, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c;
    if (this.visualElement.isPresent === false)
      return;
    var onSessionStart = function(event) {
      _this.stopAnimation();
      if (snapToCursor) {
        _this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    var onStart = function(event, info) {
      var _a2;
      var _b2 = _this.getProps(), drag2 = _b2.drag, dragPropagation = _b2.dragPropagation, onDragStart = _b2.onDragStart;
      if (drag2 && !dragPropagation) {
        if (_this.openGlobalLock)
          _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag2);
        if (!_this.openGlobalLock)
          return;
      }
      _this.isDragging = true;
      _this.currentDirection = null;
      _this.resolveConstraints();
      if (_this.visualElement.projection) {
        _this.visualElement.projection.isAnimationBlocked = true;
        _this.visualElement.projection.target = void 0;
      }
      eachAxis(function(axis) {
        var _a3, _b3;
        var current = _this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          var measuredAxis = (_b3 = (_a3 = _this.visualElement.projection) === null || _a3 === void 0 ? void 0 : _a3.layout) === null || _b3 === void 0 ? void 0 : _b3.actual[axis];
          if (measuredAxis) {
            var length_1 = calcLength(measuredAxis);
            current = length_1 * (parseFloat(current) / 100);
          }
        }
        _this.originPoint[axis] = current;
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
      (_a2 = _this.visualElement.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Drag, true);
    };
    var onMove = function(event, info) {
      var _a2 = _this.getProps(), dragPropagation = _a2.dragPropagation, dragDirectionLock = _a2.dragDirectionLock, onDirectionLock = _a2.onDirectionLock, onDrag = _a2.onDrag;
      if (!dragPropagation && !_this.openGlobalLock)
        return;
      var offset = info.offset;
      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset);
        if (_this.currentDirection !== null) {
          onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(_this.currentDirection);
        }
        return;
      }
      _this.updateAxis("x", info.point, offset);
      _this.updateAxis("y", info.point, offset);
      _this.visualElement.syncRender();
      onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
    };
    var onSessionEnd = function(event, info) {
      return _this.stop(event, info);
    };
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  };
  VisualElementDragControls2.prototype.stop = function(event, info) {
    var isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    var velocity = info.velocity;
    this.startAnimation(velocity);
    var onDragEnd = this.getProps().onDragEnd;
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  };
  VisualElementDragControls2.prototype.cancel = function() {
    var _a, _b;
    this.isDragging = false;
    if (this.visualElement.projection) {
      this.visualElement.projection.isAnimationBlocked = false;
    }
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = void 0;
    var dragPropagation = this.getProps().dragPropagation;
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  };
  VisualElementDragControls2.prototype.updateAxis = function(axis, _point, offset) {
    var drag2 = this.getProps().drag;
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    var axisValue = this.getAxisMotionValue(axis);
    var next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  };
  VisualElementDragControls2.prototype.resolveConstraints = function() {
    var _this = this;
    var _a = this.getProps(), dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
    var layout = (this.visualElement.projection || {}).layout;
    var prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function(axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], _this.constraints[axis]);
        }
      });
    }
  };
  VisualElementDragControls2.prototype.resolveRefConstraints = function() {
    var _a = this.getProps(), constraints = _a.dragConstraints, onMeasureDragConstraints = _a.onMeasureDragConstraints;
    if (!constraints || !isRefObject(constraints))
      return false;
    var constraintsElement = constraints.current;
    invariant2(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    var projection = this.visualElement.projection;
    if (!projection || !projection.layout)
      return false;
    var constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    var measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  };
  VisualElementDragControls2.prototype.startAnimation = function(velocity) {
    var _this = this;
    var _a = this.getProps(), drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition, dragSnapToOrigin = _a.dragSnapToOrigin, onDragTransitionEnd = _a.onDragTransitionEnd;
    var constraints = this.constraints || {};
    var momentumAnimations = eachAxis(function(axis) {
      var _a2;
      if (!shouldDrag(axis, drag2, _this.currentDirection)) {
        return;
      }
      var transition2 = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
      if (dragSnapToOrigin)
        transition2 = { min: 0, max: 0 };
      var bounceStiffness = dragElastic ? 200 : 1e6;
      var bounceDamping = dragElastic ? 40 : 1e7;
      var inertia2 = __assign(__assign({ type: "inertia", velocity: dragMomentum ? velocity[axis] : 0, bounceStiffness, bounceDamping, timeConstant: 750, restDelta: 1, restSpeed: 10 }, dragTransition), transition2);
      return _this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  };
  VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition2) {
    var axisValue = this.getAxisMotionValue(axis);
    return startAnimation(axis, axisValue, 0, transition2);
  };
  VisualElementDragControls2.prototype.stopAnimation = function() {
    var _this = this;
    eachAxis(function(axis) {
      return _this.getAxisMotionValue(axis).stop();
    });
  };
  VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
    var _a, _b;
    var dragKey = "_drag" + axis.toUpperCase();
    var externalMotionValue = this.visualElement.getProps()[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
  };
  VisualElementDragControls2.prototype.snapToCursor = function(point) {
    var _this = this;
    eachAxis(function(axis) {
      var drag2 = _this.getProps().drag;
      if (!shouldDrag(axis, drag2, _this.currentDirection))
        return;
      var projection = _this.visualElement.projection;
      var axisValue = _this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        var _a = projection.layout.actual[axis], min = _a.min, max = _a.max;
        axisValue.set(point[axis] - mix(min, max, 0.5));
      }
    });
  };
  VisualElementDragControls2.prototype.scalePositionWithinConstraints = function() {
    var _this = this;
    var _a;
    var _b = this.getProps(), drag2 = _b.drag, dragConstraints = _b.dragConstraints;
    var projection = this.visualElement.projection;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    var boxProgress = { x: 0, y: 0 };
    eachAxis(function(axis) {
      var axisValue = _this.getAxisMotionValue(axis);
      if (axisValue) {
        var latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, _this.constraints[axis]);
      }
    });
    var transformTemplate = this.visualElement.getProps().transformTemplate;
    this.visualElement.getInstance().style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis(function(axis) {
      if (!shouldDrag(axis, drag2, null))
        return;
      var axisValue = _this.getAxisMotionValue(axis);
      var _a2 = _this.constraints[axis], min = _a2.min, max = _a2.max;
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  };
  VisualElementDragControls2.prototype.addListeners = function() {
    var _this = this;
    var _a;
    elementDragControls.set(this.visualElement, this);
    var element = this.visualElement.getInstance();
    var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
      var _a2 = _this.getProps(), drag2 = _a2.drag, _b = _a2.dragListener, dragListener = _b === void 0 ? true : _b;
      drag2 && dragListener && _this.start(event);
    });
    var measureDragConstraints = function() {
      var dragConstraints = _this.getProps().dragConstraints;
      if (isRefObject(dragConstraints)) {
        _this.constraints = _this.resolveRefConstraints();
      }
    };
    var projection = this.visualElement.projection;
    var stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    var stopResizeListener = addDomEvent(window, "resize", function() {
      _this.scalePositionWithinConstraints();
    });
    projection.addEventListener("didUpdate", function(_a2) {
      var delta = _a2.delta, hasLayoutChanged = _a2.hasLayoutChanged;
      if (_this.isDragging && hasLayoutChanged) {
        eachAxis(function(axis) {
          var motionValue2 = _this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          _this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        _this.visualElement.syncRender();
      }
    });
    return function() {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
    };
  };
  VisualElementDragControls2.prototype.getProps = function() {
    var props = this.visualElement.getProps();
    var _a = props.drag, drag2 = _a === void 0 ? false : _a, _b = props.dragDirectionLock, dragDirectionLock = _b === void 0 ? false : _b, _c = props.dragPropagation, dragPropagation = _c === void 0 ? false : _c, _d = props.dragConstraints, dragConstraints = _d === void 0 ? false : _d, _e = props.dragElastic, dragElastic = _e === void 0 ? defaultElastic : _e, _f = props.dragMomentum, dragMomentum = _f === void 0 ? true : _f;
    return __assign(__assign({}, props), { drag: drag2, dragDirectionLock, dragPropagation, dragConstraints, dragElastic, dragMomentum });
  };
  return VisualElementDragControls2;
}();
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
function useDrag(props) {
  var groupDragControls = props.dragControls, visualElement2 = props.visualElement;
  var dragControls = useConstant(function() {
    return new VisualElementDragControls(visualElement2);
  });
  (0, import_react27.useEffect)(function() {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls, groupDragControls]);
  (0, import_react27.useEffect)(function() {
    return dragControls.addListeners();
  }, [dragControls]);
}

// node_modules/framer-motion/dist/es/gestures/use-pan-gesture.mjs
init_react();
var import_react28 = __toESM(require_react(), 1);
function usePanGesture(_a) {
  var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement2 = _a.visualElement;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = (0, import_react28.useRef)(null);
  var transformPagePoint = (0, import_react28.useContext)(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  (0, import_react28.useEffect)(function() {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });
  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint
    });
  }
  usePointerEvent(visualElement2, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(function() {
    return panSession.current && panSession.current.end();
  });
}

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
init_react();

// node_modules/framer-motion/dist/es/render/html/visual-element.mjs
init_react();

// node_modules/framer-motion/dist/es/render/index.mjs
init_react();

// node_modules/framer-motion/dist/es/render/utils/lifecycles.mjs
init_react();
var names = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      names.forEach(function(name) {
        var _a;
        var on = "on" + name;
        var propListener = props[on];
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i2) {
    lifecycles["on" + names[i2]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i2]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args), false));
    };
  });
  return lifecycles;
}

// node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
init_react();
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/framer-motion/dist/es/render/index.mjs
var visualElement = function(_a) {
  var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox2 = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps;
  return function(_a2, options) {
    var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState, shouldReduceMotion = _a2.shouldReduceMotion;
    if (options === void 0) {
      options = {};
    }
    var isMounted = false;
    var latestValues = visualState.latestValues, renderState = visualState.renderState;
    var instance;
    var lifecycles = createLifecycles();
    var values = /* @__PURE__ */ new Map();
    var valueSubscriptions = /* @__PURE__ */ new Map();
    var prevMotionValues = {};
    var baseTarget = __assign({}, latestValues);
    var removeFromVariantTree;
    function render() {
      if (!instance || !isMounted)
        return;
      triggerBuild();
      renderInstance(instance, renderState, props.style, element.projection);
    }
    function triggerBuild() {
      build(element, renderState, latestValues, options, props);
    }
    function update() {
      lifecycles.notifyUpdate(latestValues);
    }
    function bindToMotionValue(key2, value2) {
      var removeOnChange = value2.onChange(function(latestValue) {
        latestValues[key2] = latestValue;
        props.onUpdate && es_default.update(update, false, true);
      });
      var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key2, function() {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    var initialMotionValues = scrapeMotionValuesFromProps3(props);
    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    var element = __assign(__assign({
      treeType,
      current: null,
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: /* @__PURE__ */ new Set(),
      presenceId,
      shouldReduceMotion,
      variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
      isVisible: void 0,
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
      blockInitialAnimation,
      isMounted: function() {
        return Boolean(instance);
      },
      mount: function(newInstance) {
        isMounted = true;
        instance = element.current = newInstance;
        if (element.projection) {
          element.projection.mount(newInstance);
        }
        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }
        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
        element.setProps(props);
      },
      unmount: function() {
        var _a3;
        (_a3 = element.projection) === null || _a3 === void 0 ? void 0 : _a3.unmount();
        cancelSync.update(update);
        cancelSync.render(render);
        valueSubscriptions.forEach(function(remove) {
          return remove();
        });
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
        lifecycles.clearAllListeners();
        instance = void 0;
        isMounted = false;
      },
      addVariantChild: function(child) {
        var _a3;
        var closestVariantNode = element.getClosestVariantNode();
        if (closestVariantNode) {
          (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
          return function() {
            return closestVariantNode.variantChildren.delete(child);
          };
        }
      },
      sortNodePosition: function(other) {
        if (!sortNodePosition || treeType !== other.treeType)
          return 0;
        return sortNodePosition(element.getInstance(), other.getInstance());
      },
      getClosestVariantNode: function() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },
      getLayoutId: function() {
        return props.layoutId;
      },
      getInstance: function() {
        return instance;
      },
      getStaticValue: function(key2) {
        return latestValues[key2];
      },
      setStaticValue: function(key2, value2) {
        return latestValues[key2] = value2;
      },
      getLatestValues: function() {
        return latestValues;
      },
      setVisibility: function(visibility) {
        if (element.isVisible === visibility)
          return;
        element.isVisible = visibility;
        element.scheduleRender();
      },
      makeTargetAnimatable: function(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }
        return makeTargetAnimatable(element, target, props, canMutate);
      },
      measureViewportBox: function() {
        return measureViewportBox2(instance, props);
      },
      addValue: function(key2, value2) {
        if (element.hasValue(key2))
          element.removeValue(key2);
        values.set(key2, value2);
        latestValues[key2] = value2.get();
        bindToMotionValue(key2, value2);
      },
      removeValue: function(key2) {
        var _a3;
        values.delete(key2);
        (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
        valueSubscriptions.delete(key2);
        delete latestValues[key2];
        removeValueFromRenderState(key2, renderState);
      },
      hasValue: function(key2) {
        return values.has(key2);
      },
      getValue: function(key2, defaultValue) {
        var value2 = values.get(key2);
        if (value2 === void 0 && defaultValue !== void 0) {
          value2 = motionValue(defaultValue);
          element.addValue(key2, value2);
        }
        return value2;
      },
      forEachValue: function(callback) {
        return values.forEach(callback);
      },
      readValue: function(key2) {
        var _a3;
        return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options);
      },
      setBaseTarget: function(key2, value2) {
        baseTarget[key2] = value2;
      },
      getBaseTarget: function(key2) {
        if (getBaseTarget) {
          var target = getBaseTarget(props, key2);
          if (target !== void 0 && !isMotionValue(target))
            return target;
        }
        return baseTarget[key2];
      }
    }, lifecycles), {
      build: function() {
        triggerBuild();
        return renderState;
      },
      scheduleRender: function() {
        es_default.render(render, false, true);
      },
      syncRender: render,
      setProps: function(newProps) {
        if (newProps.transformTemplate || props.transformTemplate) {
          element.scheduleRender();
        }
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps3(props), prevMotionValues);
      },
      getProps: function() {
        return props;
      },
      getVariant: function(name) {
        var _a3;
        return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
      },
      getDefaultTransition: function() {
        return props.transition;
      },
      getTransformPagePoint: function() {
        return props.transformPagePoint;
      },
      getVariantContext: function(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }
        if (startAtParent)
          return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
          if (props.initial !== void 0) {
            context_1.initial = props.initial;
          }
          return context_1;
        }
        var context = {};
        for (var i2 = 0; i2 < numVariantProps; i2++) {
          var name_1 = variantProps[i2];
          var prop = props[name_1];
          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }
        return context;
      }
    });
    return element;
  };
};
var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder), false);
var numVariantProps = variantProps.length;

// node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
init_react();

// node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
init_react();
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match2 = cssVariableRegex.exec(current);
  if (!match2)
    return [,];
  var _a = __read(match2, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  invariant2(depth <= maxDepth, 'Max CSS variable fallback depth detected in property "'.concat(current, '". This may indicate a circular fallback dependency.'));
  var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable2(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = __assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable2(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable2(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return { target, transitionEnd };
}

// node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
init_react();
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = function(key) {
  return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = function(v3) {
  return v3 === number || v3 === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
  return function(_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform)
      return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform.match(/^matrix\((.+)\)$/);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
  return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
var positionalValues = {
  width: function(_a, _b) {
    var x2 = _a.x;
    var _c = _b.paddingLeft, paddingLeft = _c === void 0 ? "0" : _c, _d = _b.paddingRight, paddingRight = _d === void 0 ? "0" : _d;
    return x2.max - x2.min - parseFloat(paddingLeft) - parseFloat(paddingRight);
  },
  height: function(_a, _b) {
    var y = _a.y;
    var _c = _b.paddingTop, paddingTop = _c === void 0 ? "0" : _c, _d = _b.paddingBottom, paddingBottom = _d === void 0 ? "0" : _d;
    return y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom);
  },
  top: function(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function(_a, _b) {
    var x2 = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x2.max - x2.min);
  },
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
  var originBbox = visualElement2.measureViewportBox();
  var element = visualElement2.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display;
  var origin = {};
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach(function(key) {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement2.syncRender();
  var targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    setAndResetVelocity(value, origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }
  if (transitionEnd === void 0) {
    transitionEnd = {};
  }
  target = __assign({}, target);
  transitionEnd = __assign({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from = origin[key];
    var fromType = findDimensionValueType(from);
    var to = target[key];
    var toType;
    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;
      var fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (var i2 = fromIndex; i2 < numKeyframes; i2++) {
        if (!toType) {
          toType = findDimensionValueType(to[i2]);
          invariant2(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          invariant2(findDimensionValueType(to[i2]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement2);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}

// node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};

// node_modules/framer-motion/dist/es/render/html/visual-element.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      var computedStyle = getComputedStyle2(domElement);
      return (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function(a2, b5) {
    return a2.compareDocumentPosition(b5) & 2 ? 1 : -1;
  },
  getBaseTarget: function(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return measureViewportBox(element, transformPagePoint);
  },
  resetTransform: function(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform: function(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function(key, _a) {
    var vars = _a.vars, style = _a.style;
    delete vars[key];
    delete style[key];
  },
  makeTargetAnimatable: function(element, _a, _b, isMounted) {
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    var transition2 = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition2 || {}, element);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return __assign({ transition: transition2, transitionEnd }, target);
  },
  scrapeMotionValuesFromProps,
  build: function(element, renderState, latestValues, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

// node_modules/framer-motion/dist/es/render/svg/visual-element.mjs
init_react();
var svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), { getBaseTarget: function(props, key) {
  return props[key];
}, readValueFromInstance: function(domElement, key) {
  var _a;
  if (isTransformProp(key)) {
    return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
  }
  key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
  return domElement.getAttribute(key);
}, scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, build: function(_element, renderState, latestValues, options, props) {
  buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
}, render: renderSVG }));

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = function(Component2, options) {
  return isSVGComponent(Component2) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

// node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
init_react();

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
init_react();
var import_react29 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
init_react();
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: function(latest, node) {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    var x2 = pixelsToPercent(latest, node.target.x);
    var y = pixelsToPercent(latest, node.target.y);
    return "".concat(x2, "% ").concat(y, "%");
  }
};

// node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
init_react();
var varToken = "_$css";
var correctBoxShadow = {
  correct: function(latest, _a) {
    var treeScale = _a.treeScale, projectionDelta = _a.projectionDelta;
    var original = latest;
    var containsCSSVariables = latest.includes("var(");
    var cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, function(match2) {
        cssVariables.push(match2);
        return varToken;
      });
    }
    var shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    var template = complex.createTransformer(latest);
    var offset = typeof shadow[0] !== "number" ? 1 : 0;
    var xScale = projectionDelta.x.scale * treeScale.x;
    var yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    var averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    var output = template(shadow);
    if (containsCSSVariables) {
      var i_1 = 0;
      output = output.replace(varToken, function() {
        var cssVariable = cssVariables[i_1];
        i_1++;
        return cssVariable;
      });
    }
    return output;
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = function(_super) {
  __extends(MeasureLayoutWithContext2, _super);
  function MeasureLayoutWithContext2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MeasureLayoutWithContext2.prototype.componentDidMount = function() {
    var _this = this;
    var _a = this.props, visualElement2 = _a.visualElement, layoutGroup = _a.layoutGroup, switchLayoutGroup = _a.switchLayoutGroup, layoutId = _a.layoutId;
    var projection = visualElement2.projection;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.add(projection);
      if ((switchLayoutGroup === null || switchLayoutGroup === void 0 ? void 0 : switchLayoutGroup.register) && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", function() {
        _this.safeToRemove();
      });
      projection.setOptions(__assign(__assign({}, projection.options), { onExitComplete: function() {
        return _this.safeToRemove();
      } }));
    }
    globalProjectionState.hasEverUpdated = true;
  };
  MeasureLayoutWithContext2.prototype.getSnapshotBeforeUpdate = function(prevProps) {
    var _this = this;
    var _a = this.props, layoutDependency = _a.layoutDependency, visualElement2 = _a.visualElement, drag2 = _a.drag, isPresent = _a.isPresent;
    var projection = visualElement2.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        es_default.postRender(function() {
          var _a2;
          if (!((_a2 = projection.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length)) {
            _this.safeToRemove();
          }
        });
      }
    }
    return null;
  };
  MeasureLayoutWithContext2.prototype.componentDidUpdate = function() {
    var projection = this.props.visualElement.projection;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  };
  MeasureLayoutWithContext2.prototype.componentWillUnmount = function() {
    var _a = this.props, visualElement2 = _a.visualElement, layoutGroup = _a.layoutGroup, promoteContext = _a.switchLayoutGroup;
    var projection = visualElement2.projection;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  };
  MeasureLayoutWithContext2.prototype.safeToRemove = function() {
    var safeToRemove = this.props.safeToRemove;
    safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
  };
  MeasureLayoutWithContext2.prototype.render = function() {
    return null;
  };
  return MeasureLayoutWithContext2;
}(import_react29.default.Component);
function MeasureLayout(props) {
  var _a = __read(usePresence(), 2), isPresent = _a[0], safeToRemove = _a[1];
  var layoutGroup = (0, import_react29.useContext)(LayoutGroupContext);
  return import_react29.default.createElement(MeasureLayoutWithContext, __assign({}, props, { layoutGroup, switchLayoutGroup: (0, import_react29.useContext)(SwitchLayoutGroupContext), isPresent, safeToRemove }));
}
var defaultScaleCorrectors = {
  borderRadius: __assign(__assign({}, correctBorderRadius), { applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ] }),
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
var layoutFeatures = {
  measureLayout: MeasureLayout
};

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
init_react();

// node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
init_react();
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: function(ref, notify) {
    ref.addEventListener("resize", notify, { passive: true });
    return function() {
      return ref.removeEventListener("resize", notify);
    };
  },
  measureScroll: function() {
    return {
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop
    };
  }
});

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: function(instance) {
    return {
      x: instance.scrollLeft,
      y: instance.scrollTop
    };
  },
  defaultParent: function() {
    if (!rootProjectionNode.current) {
      var documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: function(instance, value) {
    instance.style.transform = value !== null && value !== void 0 ? value : "none";
  }
});

// node_modules/framer-motion/dist/es/render/dom/motion.mjs
var featureBundle = __assign(__assign(__assign(__assign({}, animations), gestureAnimations), drag), layoutFeatures);
var motion = /* @__PURE__ */ createMotionProxy(function(Component2, config) {
  return createDomMotionConfig(Component2, config, featureBundle, createDomVisualElement, HTMLProjectionNode);
});

// app/utilities/animationConstants.ts
init_react();
var transition = {
  type: "spring",
  stiffness: 200,
  damping: 10
};

// app/components/Icons/MoonIcon.tsx
var MoonIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: { scale: 0.95, rotate: 15 }
  };
  return /* @__PURE__ */ React.createElement(motion.svg, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 50 50",
    key: "moon"
  }, /* @__PURE__ */ React.createElement(motion.path, {
    d: "M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z",
    fill: "currentColor",
    initial: "initial",
    animate: "animate",
    whileTap: "whileTap",
    variants
  }));
};

// app/components/Icons/SunIcon.tsx
init_react();
var SunIcon = () => {
  const whileTap = { scale: 0.95, rotate: 15 };
  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition }
  };
  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition }
  };
  return /* @__PURE__ */ React.createElement(motion.svg, {
    key: "sun",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    whileTap,
    style: { originX: "50%", originY: "50%" }
  }, /* @__PURE__ */ React.createElement(motion.circle, {
    cx: "11.9998",
    cy: "11.9998",
    r: "5.75375",
    fill: "currentColor",
    initial: "initial",
    animate: "animate",
    variants: coreVariants
  }), /* @__PURE__ */ React.createElement(motion.g, {
    initial: "initial",
    animate: "animate",
    variants: raysVariants
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: "3.08982",
    cy: "6.85502",
    r: "1.71143",
    transform: "rotate(-60 3.08982 6.85502)",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: "3.0903",
    cy: "17.1436",
    r: "1.71143",
    transform: "rotate(-120 3.0903 17.1436)",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: "12",
    cy: "22.2881",
    r: "1.71143",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: "20.9101",
    cy: "17.1436",
    r: "1.71143",
    transform: "rotate(-60 20.9101 17.1436)",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: "20.9101",
    cy: "6.8555",
    r: "1.71143",
    transform: "rotate(-120 20.9101 6.8555)",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: "12",
    cy: "1.71143",
    r: "1.71143",
    fill: "currentColor"
  })));
};

// app/components/ThemeModeToggle.tsx
function ThemeModeToggler() {
  const [theme, setTheme] = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  const SwitchIcon = theme === "light" ? MoonIcon : SunIcon;
  useHotkeys("alt+t", () => toggleTheme(), [toggleTheme]);
  return /* @__PURE__ */ React.createElement("button", {
    className: `flex text-xl items-center px-2 py-1.5 transition ${theme === "light" ? "text-slate-800 hover:bg-slate-300" : "text-white hover:bg-slate-700"}`,
    onClick: toggleTheme
  }, /* @__PURE__ */ React.createElement(SwitchIcon, null));
}

// app/components/UI/GithubStarSmall.tsx
init_react();
function GithubStarSmall({ className }) {
  const starCount = useStarCount();
  return /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/triggerdotdev/jsonhero-web",
    target: "_blank",
    className: "flex p-1 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1.5 pl-1 rounded-l-sm"
  }, /* @__PURE__ */ React.createElement(GithubIconSimple, {
    className: "w-4 h-4 ml-1 text-slate-700 dark:text-white transition"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "font-semibold text-slate-800 dark:text-slate-100"
  }, "Star")), starCount && /* @__PURE__ */ React.createElement("div", {
    className: "pr-2 pl-1"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "font-bold dark:text-slate-100"
  }, formatStarCount(starCount))));
}

// app/components/IndentPreference.tsx
init_react();
var import_react30 = __toESM(require_react());
var MIN_INDENT = 1;
var MAX_INDENT = 8;
function IndentPreference() {
  const [preferences, setPreferences] = usePreferences();
  const updatePreferences = (e2) => {
    let newIdent = Number(e2.target.value);
    if (newIdent < MIN_INDENT)
      newIdent = MIN_INDENT;
    if (newIdent > MAX_INDENT)
      newIdent = MAX_INDENT;
    e2.target.value = newIdent.toString();
    setPreferences({ ...preferences, indent: newIdent });
  };
  return /* @__PURE__ */ import_react30.default.createElement("div", {
    className: "flex items-center -mt-0.5"
  }, /* @__PURE__ */ import_react30.default.createElement("label", {
    className: "pr-2 text-slate-800 transition dark:text-white",
    htmlFor: "indent"
  }, /* @__PURE__ */ import_react30.default.createElement(Body, null, "Indent")), /* @__PURE__ */ import_react30.default.createElement("input", {
    type: "number",
    className: "py-0 pr-0 pl-1 w-9 rounded-sm text-sm h-[23px] bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70",
    defaultValue: preferences == null ? void 0 : preferences.indent,
    min: MIN_INDENT,
    max: MAX_INDENT,
    onChange: updatePreferences
  }));
}

// app/components/Footer.tsx
function Footer() {
  const { minimal } = useJsonDoc();
  return /* @__PURE__ */ React.createElement("footer", {
    className: "flex items-center justify-between w-screen h-[32px] flex-shrink-0 bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600"
  }, /* @__PURE__ */ React.createElement("ol", {
    className: "flex pl-3"
  }, /* @__PURE__ */ React.createElement("li", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(ArrowKeysIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "pl-2 pr-4 text-slate-800 transition dark:text-white"
  }, "Navigate")), /* @__PURE__ */ React.createElement("li", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(SquareBracketsIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "pl-2 pr-4 text-slate-800 transition dark:text-white"
  }, "History")), /* @__PURE__ */ React.createElement("li", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(EscapeKeyIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "pl-2 pr-4 text-slate-800 transition dark:text-white whitespace-nowrap"
  }, "Reset path")), /* @__PURE__ */ React.createElement("li", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(CopyShortcutIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "flex pl-2 pr-4 text-slate-800 transition dark:text-white"
  }, "Copy\xA0", /* @__PURE__ */ React.createElement("span", {
    className: "hidden lg:flex whitespace-nowrap"
  }, "selected\xA0"), "node"))), /* @__PURE__ */ React.createElement("ol", {
    className: "flex gap-2 items-center h-full invisible md:visible"
  }, minimal && /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(GithubStarSmall, null)), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(IndentPreference, null)), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(ThemeModeToggler, null))));
}

// app/components/Header.tsx
init_react();

// app/components/DocumentTitle.tsx
init_react();
var import_react31 = __toESM(require_react());
var import_ts_pattern = __toESM(require_lib2());
function DocumentTitle() {
  const { doc } = useJsonDoc();
  const [editedTitle, setEditedTitle] = (0, import_react31.useState)(doc.title);
  const updateDoc = useFetcher();
  const ref = (0, import_react31.useRef)(null);
  (0, import_react31.useEffect)(() => {
    var _a;
    if (updateDoc.type === "done" && updateDoc.data.title) {
      (_a = ref.current) == null ? void 0 : _a.blur();
    }
  }, [updateDoc]);
  if (doc.readOnly) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center w-full",
      title: doc.title
    }, /* @__PURE__ */ React.createElement("span", {
      className: "min-w-[15vw] border-none text-ellipsis text-slate-300 px-2 pl-10 py-1 rounded-sm bg-transparent placeholder:text-slate-400 focus:bg-black/30 focus:outline-none focus:border-none hover:cursor-text transition dark:bg-transparent dark:text-slate-200 dark:placeholder:text-slate-400 dark:focus:bg-black dark:focus:bg-opacity-10"
    }, doc.title));
  } else {
    return /* @__PURE__ */ React.createElement(updateDoc.Form, {
      method: "post",
      action: `/actions/${doc.id}/update`
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center w-full",
      title: doc.title
    }, /* @__PURE__ */ React.createElement("label", {
      className: "relative block group"
    }, /* @__PURE__ */ React.createElement(PencilAltIcon_default, {
      className: "h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-white opacity-0 transition pointer-events-none group-hover:opacity-80 group-focus:opacity-80"
    }), /* @__PURE__ */ React.createElement("input", {
      ref,
      className: "min-w-[15vw] border-none text-ellipsis text-slate-300 px-2 pl-10 py-1 rounded-sm bg-transparent placeholder:text-slate-400 focus:bg-black/30 focus:outline-none focus:border-none hover:bg-black hover:bg-opacity-30 hover:cursor-text transition dark:bg-transparent dark:text-slate-200 dark:placeholder:text-slate-400 dark:focus:bg-black dark:focus:bg-opacity-10 dark:hover:bg-black dark:hover:bg-opacity-10",
      type: "text",
      name: "title",
      spellCheck: "false",
      placeholder: "Name your JSON file",
      value: editedTitle,
      onChange: (e2) => setEditedTitle(e2.target.value)
    })), (0, import_ts_pattern.match)(editedTitle).with(doc.title, () => /* @__PURE__ */ React.createElement("p", {
      className: "ml-2 text-transparent"
    }, "Save")).with("", () => /* @__PURE__ */ React.createElement("button", {
      className: "ml-2 text-lime-500 hover:text-lime-600 transition",
      onClick: () => setEditedTitle(doc.title)
    }, "Reset")).otherwise(() => /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      className: "ml-2 text-lime-500 hover:text-lime-600 transition"
    }, "Save"))));
  }
}

// app/components/Share.tsx
init_react();
var import_react32 = __toESM(require_react());
var buttonDefault = /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, /* @__PURE__ */ import_react32.default.createElement(ClipboardIcon_default, {
  className: "h-4 w-4 mr-[2px]"
}), /* @__PURE__ */ import_react32.default.createElement("span", null, "Copy"));
function Share() {
  (0, import_react32.useEffect)(() => {
    setLink(window.location.href);
  }, []);
  const [link, setLink] = (0, import_react32.useState)("");
  const [copyText, setCopyText] = (0, import_react32.useState)(buttonDefault);
  const [copied, setCopied] = (0, import_react32.useState)(false);
  (0, import_react32.useEffect)(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopyText(buttonDefault);
        setCopied(false);
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  const handleCopy = (0, import_react32.useCallback)(() => {
    navigator.clipboard.writeText(link).then(function() {
      setCopyText(/* @__PURE__ */ import_react32.default.createElement("span", null, "Copied!"));
      setCopied(true);
    }, function(err) {
      setCopyText(/* @__PURE__ */ import_react32.default.createElement("span", null, "Failed to copy"));
      setCopied(true);
    });
  }, [link, setCopyText]);
  const { selectedNodeId } = useJsonColumnViewState();
  const handleIncludesPath = (0, import_react32.useCallback)((includesPath) => {
    if (!selectedNodeId) {
      return;
    }
    if (includesPath) {
      const url = new URL(window.location.href);
      for (const [key] of url.searchParams) {
        url.searchParams.delete(key);
      }
      url.searchParams.append("path", selectedNodeId);
      setLink(url.href);
    } else {
      setLink(window.location.href);
    }
  }, [link, selectedNodeId]);
  return /* @__PURE__ */ import_react32.default.createElement("div", {
    className: "bg-indigo-700 text-white rounded-sm shadow-md w-[340px] p-3 transition"
  }, /* @__PURE__ */ import_react32.default.createElement(Body, {
    className: "text-sm mb-2 text-slate-300"
  }, "Anyone with this link can view this json file."), /* @__PURE__ */ import_react32.default.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ import_react32.default.createElement("div", {
    className: "flex-grow whitespace-nowrap overflow-hidden rounded-l-sm bg-indigo-900 text-sm p-2 select-all"
  }, link), /* @__PURE__ */ import_react32.default.createElement("div", {
    className: "flex items-center justify-center text-lg text-slate-800 min-w-[74px] bg-white bg-opacity-80 rounded-r-sm transition hover:bg-opacity-100 cursor-pointer",
    onClick: handleCopy
  }, copyText)), /* @__PURE__ */ import_react32.default.createElement("div", {
    className: "form-check form-check-inline mt-2"
  }, /* @__PURE__ */ import_react32.default.createElement("label", {
    className: "flex items-center text-sm form-check-label text-slate-300 select-none hover:cursor-pointer transition"
  }, /* @__PURE__ */ import_react32.default.createElement("input", {
    className: "form-check-input appearance-none h-4 w-4 border border-slate-300 rounded-sm bg-white checked:bg-indigo-700 checked:border-indigo-700 focus:outline-none duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 hover:cursor-pointer transition dark:border-slate-300 dark:bg-slate-200 dark:checked:bg-lime-500 dark:checked:border-lime-500",
    type: "checkbox",
    id: "inlineCheckbox",
    value: "option",
    onChange: (e2) => handleIncludesPath(e2.target.checked)
  }), "Link includes path")));
}

// app/components/Header.tsx
function Header() {
  const { doc } = useJsonDoc();
  return /* @__PURE__ */ React.createElement("header", {
    className: "flex items-center justify-between w-screen h-[40px] bg-indigo-700 dark:bg-slate-800 border-b-[1px] border-slate-600"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex pl-2 gap-1 sm:gap-1.5 pt-0.5 h-8 justify-center items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-20 sm:w-24"
  }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement("p", {
    className: "text-slate-300 text-sm font-sans"
  }, "by"), /* @__PURE__ */ React.createElement(LogoTriggerdotdev, {
    className: "w-16 sm:w-20 opacity-80 hover:opacity-100  transition duration-300"
  })), /* @__PURE__ */ React.createElement(DocumentTitle, null), /* @__PURE__ */ React.createElement("ol", {
    className: "flex text-sm items-center gap-2 px-4"
  }, !doc.readOnly && /* @__PURE__ */ React.createElement(Form, {
    method: "delete",
    onSubmit: (e2) => !confirm("This will permanantly delete this document from jsonhero.io, are you sure you want to continue?") && e2.preventDefault()
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-80 text-base font-bold px-2 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition"
  }, /* @__PURE__ */ React.createElement(TrashIcon_default, {
    className: "w-4 h-4 mr-0.5"
  }), "Delete"))), /* @__PURE__ */ React.createElement(Popover, null, /* @__PURE__ */ React.createElement(PopoverTrigger, null, /* @__PURE__ */ React.createElement("button", {
    className: "flex items-center justify-center bg-lime-500 text-slate-800 bg-opacity-90 text-base font-bold px-2 py-1 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition"
  }, /* @__PURE__ */ React.createElement(PlusIcon_default, {
    className: "w-4 h-4 mr-0.5"
  }), "New")), /* @__PURE__ */ React.createElement(PopoverContent, {
    side: "bottom",
    sideOffset: 8
  }, /* @__PURE__ */ React.createElement(NewDocument, null), /* @__PURE__ */ React.createElement(PopoverArrow, {
    className: "fill-current text-indigo-700",
    offset: 20
  }))), /* @__PURE__ */ React.createElement(Popover, null, /* @__PURE__ */ React.createElement(PopoverTrigger, null, /* @__PURE__ */ React.createElement("button", {
    className: "flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-90 text-base font-bold px-2 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition"
  }, /* @__PURE__ */ React.createElement(ShareIcon_default, {
    className: "w-4 h-4 mr-1"
  }), "Share")), /* @__PURE__ */ React.createElement(PopoverContent, {
    side: "bottom",
    sideOffset: 8
  }, /* @__PURE__ */ React.createElement(Share, null), /* @__PURE__ */ React.createElement(PopoverArrow, {
    className: "fill-current text-indigo-700",
    offset: 20
  }))), /* @__PURE__ */ React.createElement("li", {
    className: "opacity-90 transition hover:cursor-pointer hover:opacity-100"
  }, /* @__PURE__ */ React.createElement(GithubStar, null)), /* @__PURE__ */ React.createElement("li", {
    className: "opacity-90 transition hover:cursor-pointer hover:opacity-100"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://discord.gg/JtBAxBr2m3",
    target: "_blank"
  }, /* @__PURE__ */ React.createElement(DiscordIconTransparent, null)))));
}

// app/components/InfoPanel.tsx
init_react();

// app/components/RelatedValues.tsx
init_react();
var import_react34 = __toESM(require_react());

// app/components/Primitives/SmallBody.tsx
init_react();
var SmallBody = ({
  className,
  children
}) => {
  return /* @__PURE__ */ React.createElement("p", {
    className: `font-sans text-sm ${className}`
  }, children);
};

// app/utilities/relatedValues.ts
init_react();
init_lib();
var import_path2 = __toESM(require_lib());
function groupRelatedValues(relatedPaths, json) {
  const groupedByValue = groupBy_default(relatedPaths, (path) => {
    const heroPath = new import_path2.JSONHeroPath(path);
    const value = heroPath.first(json);
    if (typeof value === "undefined") {
      return "undefined";
    } else if (value == null) {
      return "null";
    } else if (Array.isArray(value)) {
      return `Array(${value.length})`;
    } else if (typeof value === "object") {
      return "{...}";
    } else {
      return value.toString();
    }
  });
  const unsortedResult = Object.entries(groupedByValue).map(([value, paths]) => {
    return {
      value,
      paths: sortBy_default(paths)
    };
  });
  return sortBy_default(unsortedResult, (group) => -group.paths.length);
}
function getRelatedPathsAtPath(path, json, relatedPaths = /* @__PURE__ */ new Set()) {
  var _a;
  const initialPath = new import_path2.JSONHeroPath(path);
  const pathDepth = initialPath.components.length;
  for (let index2 = 0; index2 < pathDepth; index2++) {
    const pathToComponent = new import_path2.JSONHeroPath(initialPath.components.slice(0, index2 + 1));
    const value = pathToComponent.first(json);
    if (typeof value === "undefined") {
      continue;
    }
    if (typeof value !== "object" || !Array.isArray(value))
      continue;
    const inferredType = inferType(value);
    if (inferredType.name !== "array")
      continue;
    if (index2 + 1 === pathDepth)
      continue;
    for (let childIndex = 0; childIndex < inferredType.value.length; childIndex++) {
      const relatedPath = initialPath.replaceComponent(index2 + 1, `${childIndex}`);
      if (relatedPaths.has(relatedPath.toString()))
        continue;
      const parentValue = (_a = relatedPath.parent) == null ? void 0 : _a.first(json);
      if (!parentValue)
        continue;
      relatedPaths.add(relatedPath.toString());
      getRelatedPathsAtPath(relatedPath.toString(), json, relatedPaths);
    }
  }
  return Array.from(relatedPaths);
}

// app/components/PathPreview.tsx
init_react();
var import_react33 = __toESM(require_react());

// app/assets/svgs/EyeIcon.svg
var EyeIcon_default = "/build/_assets/EyeIcon-NZ7ZJP3M.svg";

// app/components/PathPreview.tsx
function PathPreview({
  nodes,
  maxComponents,
  enabled
}) {
  const isEnabled = (0, import_react33.useMemo)(() => {
    if (enabled === void 0) {
      return true;
    }
    return enabled;
  }, [enabled]);
  const { goToNodeId } = useJsonColumnViewAPI();
  const components = (0, import_react33.useMemo)(() => {
    if (maxComponents == null || nodes.length <= maxComponents) {
      return nodes.map((n3) => {
        return { type: "value", id: n3.id, title: n3.title, icon: n3.icon };
      });
    }
    let components2 = Array();
    for (let index2 = 0; index2 < maxComponents - 1; index2++) {
      const node = nodes[index2];
      components2.push({
        type: "value",
        id: node.id,
        title: node.title,
        icon: node.icon
      });
    }
    components2.push({ type: "ellipsis", id: "ellipsis" });
    const lastNode = nodes[nodes.length - 1];
    components2.push({
      type: "value",
      id: lastNode.id,
      title: lastNode.title,
      icon: lastNode.icon
    });
    return components2;
  }, [nodes, maxComponents]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex select-none pl-7 ${isEnabled ? `relative transition hover:bg-slate-200 hover:cursor-pointer dark:hover:bg-slate-600 after:transition after:absolute after:h-3 after:w-3 after:opacity-0 hover:after:opacity-100 after:top-1 after:left-1 after:content-[''] after:bg-[url('${EyeIcon_default}')] after:bg-no-repeat` : "disabled"}`,
    onClick: () => isEnabled && goToNodeId(components[components.length - 1].id, "relatedValues")
  }, /* @__PURE__ */ React.createElement("div", {
    className: `flex rounded-sm px-2 ${isEnabled ? "" : "hover:bg-slate-100 hover:cursor-pointer dark:hover:bg-slate-600"}`
  }, components.map((node, index2) => {
    if (node.type === "ellipsis") {
      return /* @__PURE__ */ React.createElement("div", {
        key: node.id,
        className: "flex flex-none items-center min-w-0"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "flex-none text-md"
      }, "\u2026"), /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
        className: "flex-none w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden"
      }));
    } else {
      return /* @__PURE__ */ React.createElement("div", {
        className: "flex items-center min-w-0",
        key: node.id
      }, /* @__PURE__ */ React.createElement("div", {
        className: "flex items-center min-w-0"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "w-4 flex-shrink-[0.5] flex-grow-0 flex-col justify-items-center whitespace-nowrap overflow-x-hidden transition dark:text-slate-300"
      }, node.icon && /* @__PURE__ */ React.createElement(node.icon, {
        className: "h-3 w-3"
      })), /* @__PURE__ */ React.createElement(Body, {
        className: "flex-shrink flex-grow-0 whitespace-nowrap overflow-x-hidden text-ellipsis transition dark:text-slate-300"
      }, node.title)), index2 == components.length - 1 ? /* @__PURE__ */ React.createElement(React.Fragment, null) : /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
        className: "flex-grow-0 flex-shrink-[0.5] w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden"
      }));
    }
  })));
}

// app/components/RelatedValues.tsx
function RelatedValues({ relatedPaths }) {
  const [json] = useJson();
  const { selectedNodeId } = useJsonColumnViewState();
  const [openId, setOpenId] = (0, import_react34.useState)(null);
  const relatedValuesGroups = (0, import_react34.useMemo)(() => {
    if (!selectedNodeId) {
      return [];
    }
    return groupRelatedValues(relatedPaths, json);
  }, [json, relatedPaths]);
  const toggleOpen = (id2) => {
    if (openId === id2) {
      setOpenId(null);
    } else {
      setOpenId(id2);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, relatedValuesGroups.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "my-4"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "mb-2 text-slate-700 transition dark:text-slate-400"
  }, "Related values"), relatedValuesGroups.map((relatedValuesGroup, i2) => {
    return /* @__PURE__ */ React.createElement(RelatedValuesGroupItem, {
      group: relatedValuesGroup,
      key: relatedValuesGroup.value,
      isOpen: relatedValuesGroup.value === openId,
      toggleOpen: () => toggleOpen(relatedValuesGroup.value)
    });
  })));
}
function RelatedValuesGroupItem({
  group,
  isOpen,
  toggleOpen
}) {
  const isLinkable = group.value !== "undefined";
  const isHighlighted = group.value === "undefined" || group.value === "null";
  return /* @__PURE__ */ React.createElement("div", {
    className: "mb-1 transition dark:text-slate-300"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `flex rounded-sm transition hover:cursor-pointer ${isOpen ? "bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"}`,
    onClick: () => toggleOpen()
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center rounded-sm px-1 bg-slate-200 dark:bg-slate-700"
  }, isOpen ? /* @__PURE__ */ React.createElement(ChevronDownIcon_default, {
    className: "w-3 h-3"
  }) : /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
    className: "w-3 h-3"
  }), /* @__PURE__ */ React.createElement(SmallBody, {
    className: "ml-1"
  }, group.paths.length)), /* @__PURE__ */ React.createElement(Mono, {
    className: `truncate px-2 text-slate-700 dark:text-slate-200 ${isHighlighted ? "italic" : ""}`
  }, group.value)), isOpen && group.paths.map((path) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "p-0.5 bg-slate-100 dark:bg-slate-700 dark:bg-opacity-60",
      key: path
    }, /* @__PURE__ */ React.createElement(PathLink, {
      path,
      enabled: isLinkable
    }));
  }));
}
function PathLink({ path, enabled }) {
  const [json] = useJson();
  const selectedNodes = (0, import_react34.useMemo)(() => {
    return generateNodesToPath(json, path);
  }, [json, path]);
  return /* @__PURE__ */ React.createElement(PathPreview, {
    nodes: selectedNodes,
    maxComponents: 4,
    enabled
  });
}

// app/components/InfoHeader.tsx
init_react();
init_lib();
var import_path4 = __toESM(require_lib());
var import_react35 = __toESM(require_react());

// app/utilities/dataType.ts
init_react();
function concatenated(types2) {
  return types2.types.join("/");
}
function getHierarchicalTypes(type) {
  let types2 = [];
  types2.push(type.name);
  switch (type.name) {
    case "string": {
      if (type.format == null) {
        break;
      }
      types2.push(type.format.name);
      switch (type.format.name) {
        case "uri": {
          if (type.format.contentType == null) {
            break;
          }
          types2.push(type.format.contentType);
          break;
        }
        case "datetime": {
          types2.push(type.format.variant);
          break;
        }
        case "ip": {
          types2.push(type.format.variant);
          break;
        }
      }
      break;
    }
    case "int": {
      if (type.format == null) {
        break;
      }
      types2.push(type.format.name);
    }
  }
  return {
    types: types2
  };
}

// app/utilities/nullable.ts
init_react();
var import_path3 = __toESM(require_lib());
function isNullable(relatedPaths, json) {
  return relatedPaths.some((path) => {
    const heroPath = new import_path3.JSONHeroPath(path);
    const value = heroPath.first(json);
    return value == null;
  });
}

// app/components/Primitives/LargeMono.tsx
init_react();
var LargeMono = ({
  className,
  children
}) => {
  return /* @__PURE__ */ React.createElement("p", {
    className: `font-mono text-md ${className}`
  }, children);
};

// app/components/InfoHeader.tsx
function InfoHeader({ relatedPaths }) {
  var _a;
  const { selectedNodeId, highlightedNodeId, selectedNodes } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  if (!selectedNodeId || !highlightedNodeId || selectedNodes.length === 0) {
    return /* @__PURE__ */ React.createElement(EmptyState, null);
  }
  const selectedNode = selectedNodes[selectedNodes.length - 1];
  const [json] = useJson();
  const selectedHeroPath = new import_path4.JSONHeroPath(selectedNodeId);
  const selectedJson = selectedHeroPath.first(json);
  const selectedInfo = inferType(selectedJson);
  const formattedSelectedInfo = formatRawValue(selectedInfo);
  const selectedName = (_a = selectedNode.longTitle) != null ? _a : selectedNode.title;
  const isSelectedLeafNode = selectedInfo.name !== "object" && selectedInfo.name !== "array";
  const canBeNull = (0, import_react35.useMemo)(() => {
    return isNullable(relatedPaths, json);
  }, [relatedPaths, json]);
  const [hovering, setHovering] = (0, import_react35.useState)(false);
  console.warn(selectedInfo);
  const newPath = formattedSelectedInfo.replace(/^#/, "$").replace(/\//g, ".");
  const handleClick = (0, import_react35.useCallback)(() => {
    goToNodeId(newPath, "pathBar");
  }, [newPath, goToNodeId]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "mb-4 pb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "flex-1 mr-2 overflow-hidden overflow-ellipsis break-words text-slate-700 transition dark:text-slate-200"
  }, selectedName != null ? selectedName : "nothing"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ValueIcon, {
    monochrome: true,
    type: selectedInfo,
    size: 1 /* Medium */
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full",
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  }, isSelectedLeafNode && /* @__PURE__ */ React.createElement(LargeMono, {
    className: `z-10 py-1 mb-1 text-slate-800 overflow-ellipsis break-words transition rounded-sm dark:text-slate-300 ${hovering ? "bg-slate-100 dark:bg-slate-700" : "bg-transparent"}`
  }, selectedNode.name === "$ref" && checkPathExists(json, newPath) ? /* @__PURE__ */ React.createElement("button", {
    onClick: handleClick
  }, formatRawValue(selectedInfo)) : formatRawValue(selectedInfo)), /* @__PURE__ */ React.createElement("div", {
    className: `absolute top-1 right-0 flex justify-end h-full w-fit transition ${hovering ? "opacity-100" : "opacity-0"}`
  }, /* @__PURE__ */ React.createElement(CopyTextButton, {
    className: "bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-600 dark:hover:bg-slate-500",
    value: formatRawValue(selectedInfo)
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex text-gray-400"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "flex-1"
  }, concatenated(getHierarchicalTypes(selectedInfo))), canBeNull && /* @__PURE__ */ React.createElement(Body, null, "Can be null")));
}
function checkPathExists(json, newPath) {
  const heroPath = new import_path4.JSONHeroPath(newPath);
  const node = heroPath.first(json);
  return Boolean(node);
}
function EmptyState() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "mb-4 pb-4 border-b border-slate-300"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "flex-1 mr-2 text-slate-800 transition dark:text-slate-300"
  }, "Nothing selected")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title, {
    className: "text-slate-800 mb-1 overflow-ellipsis break-words dark:text-slate-300"
  }, "null"))));
}

// app/components/ContainerInfo.tsx
init_react();
init_lib();
var import_path6 = __toESM(require_lib());

// app/components/JsonSchemaViewer.tsx
init_react();
var import_path5 = __toESM(require_lib());
var import_react37 = __toESM(require_react());

// app/hooks/useJsonSchema.tsx
init_react();
var import_schema_infer = __toESM(require_lib4());
var import_react36 = __toESM(require_react());
var JsonSchemaContext = (0, import_react36.createContext)(void 0);
function JsonSchemaProvider({ children }) {
  const [json] = useJson();
  const jsonSchema = (0, import_react36.useMemo)(() => (0, import_schema_infer.inferSchema)(json).toJSONSchema({ includeSchema: true }), [json]);
  return /* @__PURE__ */ React.createElement(JsonSchemaContext.Provider, {
    value: jsonSchema
  }, children);
}
function useJsonSchema() {
  const context = (0, import_react36.useContext)(JsonSchemaContext);
  invariant(context, "useJsonSchema must be used within a JsonSchemaProvider");
  return context;
}

// app/components/JsonSchemaViewer.tsx
function JsonSchemaViewer({ path }) {
  const schema = useJsonSchema();
  const schemaPath = schemaPathFromPath(path);
  const schemaJson = schemaPath.first(schema);
  const [hovering, setHovering] = (0, import_react37.useState)(false);
  const [preferences] = usePreferences();
  const code = (0, import_react37.useMemo)(() => {
    return JSON.stringify(schemaJson, null, (preferences == null ? void 0 : preferences.indent) || 2);
  }, [schemaJson, preferences]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full",
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  }, /* @__PURE__ */ React.createElement(CodeViewer, {
    code,
    lang: "json"
  }), /* @__PURE__ */ React.createElement("div", {
    className: `absolute top-1 right-0 flex justify-end w-full transition ${hovering ? "opacity-100" : "opacity-0"}`
  }, /* @__PURE__ */ React.createElement(CopyTextButton, {
    value: code,
    className: "bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
  })));
}
function schemaPathFromPath(path) {
  const heroPath = typeof path === "string" ? new import_path5.JSONHeroPath(path) : path;
  if (heroPath.isRoot) {
    return heroPath;
  }
  return heroPath.components.slice(1).reduce((acc, component) => {
    if (component.isArray) {
      return acc.child("items");
    } else {
      return acc.child("properties").child(component.toString());
    }
  }, new import_path5.JSONHeroPath("$"));
}

// app/components/UI/Tabs.tsx
init_react();

// node_modules/@radix-ui/react-tabs/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-roving-focus/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-collection/dist/index.module.js
init_react();
var import_react38 = __toESM(require_react());
function createCollection(c3) {
  const n3 = c3 + "CollectionProvider", [l3, i2] = createContextScope(n3), [f3, a2] = l3(n3, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), u3 = (e2) => {
    const { scope: r2, children: t3 } = e2, c4 = import_react38.default.useRef(null), n4 = import_react38.default.useRef(/* @__PURE__ */ new Map()).current;
    return import_react38.default.createElement(f3, { scope: r2, itemMap: n4, collectionRef: c4 }, t3);
  }, m4 = c3 + "CollectionSlot", s3 = /* @__PURE__ */ import_react38.default.forwardRef((t3, c4) => {
    const { scope: n4, children: l4 } = t3, i3 = a2(m4, n4), f4 = useComposedRefs(c4, i3.collectionRef);
    return import_react38.default.createElement(Slot, { ref: f4 }, l4);
  }), p3 = c3 + "CollectionItemSlot", d4 = "data-radix-collection-item", R3 = /* @__PURE__ */ import_react38.default.forwardRef((t3, c4) => {
    const { scope: n4, children: l4, ...i3 } = t3, f4 = import_react38.default.useRef(null), u4 = useComposedRefs(c4, f4), m5 = a2(p3, n4);
    return import_react38.default.useEffect(() => (m5.itemMap.set(f4, { ref: f4, ...i3 }), () => {
      m5.itemMap.delete(f4);
    })), /* @__PURE__ */ import_react38.default.createElement(Slot, { [d4]: "", ref: u4 }, l4);
  });
  return [{ Provider: u3, Slot: s3, ItemSlot: R3 }, function(e2) {
    const r2 = a2(c3 + "CollectionConsumer", e2);
    return import_react38.default.useCallback(() => {
      const e3 = r2.collectionRef.current;
      if (!e3)
        return [];
      const t3 = Array.from(e3.querySelectorAll(`[${d4}]`));
      return Array.from(r2.itemMap.values()).sort((e4, r3) => t3.indexOf(e4.ref.current) - t3.indexOf(r3.ref.current));
    }, [r2.collectionRef, r2.itemMap]);
  }, i2];
}

// node_modules/@radix-ui/react-roving-focus/dist/index.module.js
var s = __toESM(require_react());
var f = { bubbles: false, cancelable: true };
var [p, l, m] = createCollection("RovingFocusGroup");
var [d, v] = createContextScope("RovingFocusGroup", [m]);
var [g, F] = d("RovingFocusGroup");
var RovingFocusGroup = /* @__PURE__ */ s.forwardRef((e2, o3) => /* @__PURE__ */ s.createElement(p.Provider, { scope: e2.__scopeRovingFocusGroup }, /* @__PURE__ */ s.createElement(p.Slot, { scope: e2.__scopeRovingFocusGroup }, /* @__PURE__ */ s.createElement(w, _extends({}, e2, { ref: o3 })))));
var w = /* @__PURE__ */ s.forwardRef((t3, n3) => {
  const { __scopeRovingFocusGroup: c3, orientation: p3, dir: m4 = "ltr", loop: d4 = false, currentTabStopId: v3, defaultCurrentTabStopId: F3, onCurrentTabStopIdChange: w3, onEntryFocus: b5, ...x2 } = t3, E2 = s.useRef(null), I = useComposedRefs(n3, E2), [G = null, h2] = useControllableState({ prop: v3, defaultProp: F3, onChange: w3 }), [T, A] = s.useState(false), y = useCallbackRef(b5), D = l(c3), S = s.useRef(false);
  return s.useEffect(() => {
    const e2 = E2.current;
    if (e2)
      return e2.addEventListener("rovingFocusGroup.onEntryFocus", y), () => e2.removeEventListener("rovingFocusGroup.onEntryFocus", y);
  }, [y]), /* @__PURE__ */ s.createElement(g, { scope: c3, orientation: p3, dir: m4, loop: d4, currentTabStopId: G, onItemFocus: s.useCallback((e2) => h2(e2), [h2]), onItemShiftTab: s.useCallback(() => A(true), []) }, /* @__PURE__ */ s.createElement(Primitive.div, _extends({ tabIndex: T ? -1 : 0, "data-orientation": p3 }, x2, { ref: I, style: { outline: "none", ...t3.style }, onMouseDown: composeEventHandlers(t3.onMouseDown, () => {
    S.current = true;
  }), onFocus: composeEventHandlers(t3.onFocus, (e2) => {
    const o3 = !S.current;
    if (e2.target === e2.currentTarget && o3 && !T) {
      const o4 = new Event("rovingFocusGroup.onEntryFocus", f);
      if (e2.currentTarget.dispatchEvent(o4), !o4.defaultPrevented) {
        const e3 = D().filter((e4) => e4.focusable);
        R([e3.find((e4) => e4.active), e3.find((e4) => e4.id === G), ...e3].filter(Boolean).map((e4) => e4.ref.current));
      }
    }
    S.current = false;
  }), onBlur: composeEventHandlers(t3.onBlur, () => A(false)) })));
});
var RovingFocusGroupItem = /* @__PURE__ */ s.forwardRef((e2, o3) => {
  const { __scopeRovingFocusGroup: n3, focusable: i2 = true, active: c3 = false, ...f3 } = e2, m4 = useId(), d4 = F("RovingFocusGroupItem", n3), v3 = d4.currentTabStopId === m4, g2 = l(n3);
  return s.createElement(p.ItemSlot, { scope: n3, id: m4, focusable: i2, active: c3 }, /* @__PURE__ */ s.createElement(Primitive.span, _extends({ tabIndex: v3 ? 0 : -1, "data-orientation": d4.orientation }, f3, { ref: o3, onMouseDown: composeEventHandlers(e2.onMouseDown, (e3) => {
    i2 ? d4.onItemFocus(m4) : e3.preventDefault();
  }), onFocus: composeEventHandlers(e2.onFocus, () => d4.onItemFocus(m4)), onKeyDown: composeEventHandlers(e2.onKeyDown, (e3) => {
    if (e3.key === "Tab" && e3.shiftKey)
      return void d4.onItemShiftTab();
    if (e3.target !== e3.currentTarget)
      return;
    const o4 = function(e4, o5, r3) {
      const t4 = function(e5, o6) {
        return o6 !== "rtl" ? e5 : e5 === "ArrowLeft" ? "ArrowRight" : e5 === "ArrowRight" ? "ArrowLeft" : e5;
      }(e4.key, r3);
      return o5 === "vertical" && ["ArrowLeft", "ArrowRight"].includes(t4) || o5 === "horizontal" && ["ArrowUp", "ArrowDown"].includes(t4) ? void 0 : b2[t4];
    }(e3, d4.orientation, d4.dir);
    if (o4 !== void 0) {
      e3.preventDefault();
      let n4 = g2().filter((e4) => e4.focusable).map((e4) => e4.ref.current);
      if (o4 === "last")
        n4.reverse();
      else if (o4 === "prev" || o4 === "next") {
        o4 === "prev" && n4.reverse();
        const i3 = n4.indexOf(e3.currentTarget);
        n4 = d4.loop ? (t3 = i3 + 1, (r2 = n4).map((e4, o5) => r2[(t3 + o5) % r2.length])) : n4.slice(i3 + 1);
      }
      setTimeout(() => R(n4));
    }
    var r2, t3;
  }) })));
});
var b2 = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function R(e2) {
  const o3 = document.activeElement;
  for (const r2 of e2) {
    if (r2 === o3)
      return;
    if (r2.focus(), document.activeElement !== o3)
      return;
  }
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;

// node_modules/@radix-ui/react-tabs/dist/index.module.js
var s2 = __toESM(require_react());
var [d2, l2] = createContextScope("Tabs", [v]);
var u = v();
var [b3, p2] = d2("Tabs");
var Tabs = /* @__PURE__ */ s2.forwardRef((t3, o3) => {
  const { __scopeTabs: n3, value: i2, onValueChange: d4, defaultValue: l3, orientation: u3 = "horizontal", dir: p3 = "ltr", activationMode: m4 = "automatic", ...f3 } = t3, [v3, T] = useControllableState({ prop: i2, onChange: d4, defaultProp: l3 });
  return s2.createElement(b3, { scope: n3, baseId: useId(), value: v3, onValueChange: T, orientation: u3, dir: p3, activationMode: m4 }, /* @__PURE__ */ s2.createElement(Primitive.div, _extends({ "data-orientation": u3 }, f3, { ref: o3 })));
});
var TabsList = /* @__PURE__ */ s2.forwardRef((e2, o3) => {
  const { __scopeTabs: r2, loop: n3 = true, ...i2 } = e2, d4 = p2("TabsList", r2), l3 = u(r2);
  return s2.createElement(Root, _extends({ asChild: true }, l3, { orientation: d4.orientation, dir: d4.dir, loop: n3 }), /* @__PURE__ */ s2.createElement(Primitive.div, _extends({ role: "tablist", "aria-orientation": d4.orientation, dir: d4.dir }, i2, { ref: o3 })));
});
var TabsTrigger = /* @__PURE__ */ s2.forwardRef((e2, o3) => {
  const { __scopeTabs: r2, value: n3, disabled: d4 = false, ...l3 } = e2, b5 = p2("TabsTrigger", r2), v3 = u(r2), T = m2(b5.baseId, n3), x2 = f2(b5.baseId, n3), g2 = n3 === b5.value;
  return s2.createElement(Item, _extends({ asChild: true }, v3, { focusable: !d4, active: g2 }), /* @__PURE__ */ s2.createElement(Primitive.button, _extends({ type: "button", role: "tab", "aria-selected": g2, "aria-controls": x2, "data-state": g2 ? "active" : "inactive", "data-disabled": d4 ? "" : void 0, disabled: d4, id: T }, l3, { ref: o3, onMouseDown: composeEventHandlers(e2.onMouseDown, (e3) => {
    d4 || e3.button !== 0 || e3.ctrlKey !== false ? e3.preventDefault() : b5.onValueChange(n3);
  }), onKeyDown: composeEventHandlers(e2.onKeyDown, (e3) => {
    [" ", "Enter"].includes(e3.key) && b5.onValueChange(n3);
  }), onFocus: composeEventHandlers(e2.onFocus, () => {
    const e3 = b5.activationMode !== "manual";
    g2 || d4 || !e3 || b5.onValueChange(n3);
  }) })));
});
var TabsContent = /* @__PURE__ */ s2.forwardRef((e2, t3) => {
  const { __scopeTabs: o3, value: r2, children: n3, ...i2 } = e2, d4 = p2("TabsContent", o3), l3 = m2(d4.baseId, r2), u3 = f2(d4.baseId, r2), b5 = r2 === d4.value;
  return s2.createElement(Primitive.div, _extends({ "data-state": b5 ? "active" : "inactive", "data-orientation": d4.orientation, role: "tabpanel", "aria-labelledby": l3, hidden: !b5, id: u3, tabIndex: 0 }, i2, { ref: t3 }), b5 && n3);
});
function m2(e2, t3) {
  return `${e2}-trigger-${t3}`;
}
function f2(e2, t3) {
  return `${e2}-content-${t3}`;
}
var Root2 = Tabs;
var List = TabsList;
var Trigger = TabsTrigger;

// app/components/UI/Tabs.tsx
var import_react39 = __toESM(require_react());
function Tabs2({ tabs: tabs2, children }) {
  return /* @__PURE__ */ import_react39.default.createElement(Root2, {
    defaultValue: tabs2[0].value
  }, /* @__PURE__ */ import_react39.default.createElement(List, {
    className: ""
  }, tabs2.map(({ value, label }) => /* @__PURE__ */ import_react39.default.createElement(Trigger, {
    value,
    key: `tab-trigger-${value}`,
    className: classnames("group", "mr-1 px-4 py-1 rounded-t-sm transition", "text-slate-500 hover:bg-slate-100 hover:bg-opacity-50 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:bg-opacity-40", "radix-state-active:bg-slate-100 radix-state-active:bg-opacity-50 radix-state-active:dark:bg-slate-900 radix-state-active:dark:text-white")
  }, label))), children);
}
var TabContent = import_react39.default.forwardRef((props, ref) => {
  return /* @__PURE__ */ import_react39.default.createElement(TabsContent, {
    ref,
    ...props
  });
});

// app/components/ContainerInfo.tsx
var tabs = [
  { value: "json", label: "JSON" },
  { value: "schema", label: "Schema" }
];
function ContainerInfo() {
  const { selectedNodeId, highlightedNodeId } = useJsonColumnViewState();
  if (!selectedNodeId || !highlightedNodeId) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  const [json] = useJson();
  const selectedHeroPath = new import_path6.JSONHeroPath(selectedNodeId);
  const selectedJson = selectedHeroPath.first(json);
  const selectedInfo = inferType(selectedJson);
  const isSelectedLeafNode = selectedInfo.name !== "object" && selectedInfo.name !== "array";
  const highlightedHeroPath = new import_path6.JSONHeroPath(highlightedNodeId);
  const highlightedJson = highlightedHeroPath.first(json);
  const highlightedInfo = inferType(highlightedJson);
  const isHighlightedLeafNode = highlightedInfo.name !== "object" && highlightedInfo.name !== "array";
  const shouldHighlightInPreview = selectedNodeId !== highlightedNodeId && !isHighlightedLeafNode;
  const shouldDisplayCodePreview = shouldHighlightInPreview || !isSelectedLeafNode;
  if (!shouldDisplayCodePreview) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement(Tabs2, {
    tabs
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TabContent, {
    value: "json"
  }, shouldHighlightInPreview ? /* @__PURE__ */ React.createElement(JsonPreview, {
    json: highlightedJson,
    highlightPath: pathToDescendant(highlightedNodeId, selectedNodeId)
  }) : /* @__PURE__ */ React.createElement(JsonPreview, {
    json: selectedJson
  })), /* @__PURE__ */ React.createElement(TabContent, {
    value: "schema"
  }, shouldHighlightInPreview ? /* @__PURE__ */ React.createElement(JsonSchemaViewer, {
    path: highlightedNodeId
  }) : /* @__PURE__ */ React.createElement(JsonSchemaViewer, {
    path: selectedNodeId
  }))));
}

// app/hooks/useRelatedPaths.ts
init_react();
var import_react40 = __toESM(require_react());
function useRelatedPaths() {
  const cache = (0, import_react40.useRef)(/* @__PURE__ */ new Map());
  const { selectedNodeId } = useJsonColumnViewState();
  const [json] = useJson();
  return (0, import_react40.useMemo)(() => {
    if (!selectedNodeId)
      return [];
    const cachedPaths = cache.current.get(selectedNodeId);
    if (cachedPaths) {
      return cachedPaths;
    }
    let paths = getRelatedPathsAtPath(selectedNodeId, json);
    for (let index2 = 0; index2 < paths.length; index2++) {
      const path = paths[index2];
      cache.current.set(path, paths);
    }
    return paths;
  }, [selectedNodeId, json]);
}

// app/components/InfoPanel.tsx
function InfoPanel() {
  const { minimal } = useJsonDoc();
  const selectedInfo = useSelectedInfo();
  const relatedPaths = useRelatedPaths();
  if (!selectedInfo) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: `${minimal ? "h-inspectorHeightMinimal" : "h-inspectorHeight"} p-4 bg-white border-l-[1px] border-slate-300 overflow-y-auto no-scrollbar transition dark:bg-slate-800 dark:border-slate-600`
  }, /* @__PURE__ */ React.createElement(InfoHeader, {
    relatedPaths
  }), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(PreviewValue, null)), /* @__PURE__ */ React.createElement(PropertiesValue, null), /* @__PURE__ */ React.createElement(ContainerInfo, null), /* @__PURE__ */ React.createElement(RelatedValues, {
    relatedPaths
  })));
}

// app/components/Resizable.tsx
init_react();
var import_react41 = __toESM(require_react());
function Resizable({
  children,
  isHorizontal = true,
  initialSize,
  minimumSize,
  maximumSize
}) {
  const [dimension, setDimension] = (0, import_react41.useState)(initialSize);
  const previousDragPosition = (0, import_react41.useRef)(null);
  const handleDragStart = (e2) => {
    previousDragPosition.current = {
      x: e2.clientX,
      y: e2.clientY
    };
  };
  const handleDrag = (e2) => {
    if (previousDragPosition.current == null) {
      return;
    }
    e2.preventDefault();
    let offset = 0;
    if (isHorizontal) {
      offset = e2.clientX - previousDragPosition.current.x;
    } else {
      offset = e2.clientY - previousDragPosition.current.y;
    }
    let newValue = dimension - offset;
    if (minimumSize != null) {
      newValue = Math.max(minimumSize, newValue);
    }
    if (maximumSize != null) {
      newValue = Math.min(maximumSize, newValue);
    }
    setDimension(newValue);
    previousDragPosition.current = {
      x: e2.clientX,
      y: e2.clientY
    };
  };
  const handleDragEnd = () => {
    previousDragPosition.current = null;
  };
  (0, import_react41.useEffect)(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);
  const style = () => {
    let formatted = dimension + "px";
    if (isHorizontal) {
      return {
        width: formatted
      };
    } else {
      return {
        height: formatted
      };
    }
  };
  const classes = () => {
    if (isHorizontal) {
      return "flex flex-none relative";
    } else {
      return "flex flex-none relative";
    }
  };
  return /* @__PURE__ */ import_react41.default.createElement("div", {
    style: style(),
    className: classes()
  }, /* @__PURE__ */ import_react41.default.createElement("div", {
    className: "flex-grow",
    style: { width: "inherit" }
  }, children), /* @__PURE__ */ import_react41.default.createElement("div", {
    className: isHorizontal ? "w-1 h-full absolute my-0 -ml-[1px] transition-all cursor-col-resize hover:bg-indigo-700 hover:opacity-100" : "h-1 w-full transition-all cursor-row-resize hover:bg-indigo-700 hover:opacity-100",
    onMouseDown: handleDragStart
  }));
}

// app/components/SideBar.tsx
init_react();

// app/components/Icons/TreeIcon.tsx
init_react();
function TreeIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "28",
    height: "30",
    viewBox: "0 0 28 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M14.1805 30C14.5093 30 14.8245 29.8694 15.0571 29.6368C15.2895 29.4044 15.4201 29.089 15.4201 28.7602V22.5619H21.6184C23.2624 22.5619 24.839 21.9091 26.0014 20.7467C27.1638 19.5843 27.8167 18.0077 27.8167 16.3636C27.8234 14.3646 26.854 12.4882 25.2197 11.3368C25.2971 10.9512 25.3364 10.5588 25.3375 10.1653C25.3379 8.64671 24.7808 7.18076 23.7722 6.04565C22.7633 4.91048 21.3726 4.18522 19.8643 4.00752C19.2285 2.5124 18.0292 1.3282 16.5263 0.711248C15.0232 0.0942975 13.3379 0.0942975 11.8348 0.711248C10.332 1.3282 9.13259 2.51246 8.49682 4.00752C6.98853 4.18522 5.59785 4.91048 4.58897 6.04565C3.58025 7.18082 3.02318 8.64671 3.02362 10.1653C3.0247 10.5588 3.06405 10.9511 3.14144 11.3368C1.50714 12.4882 0.537772 14.3646 0.544468 16.3636C0.544468 18.0077 1.19734 19.5843 2.35974 20.7467C3.52214 21.9091 5.09872 22.5619 6.74276 22.5619H12.941V28.7602C12.941 29.089 13.0716 29.4044 13.304 29.6368C13.5366 29.8694 13.8518 30 14.1806 30H14.1805ZM6.74257 20.0827C5.75616 20.0827 4.81014 19.6908 4.11272 18.9934C3.41531 18.296 3.02337 17.35 3.02337 16.3636C3.02273 15.6644 3.22118 14.9796 3.59561 14.389C3.96981 13.7986 4.50443 13.3267 5.13716 13.029C5.41473 12.8941 5.63221 12.6606 5.7468 12.3742C5.86138 12.0875 5.86505 11.7685 5.75696 11.4794C5.31725 10.3533 5.4569 9.0835 6.13052 8.07999C6.80414 7.07625 7.92631 6.466 9.13497 6.4463C9.18145 6.4463 9.30857 6.46489 9.35202 6.46489C9.63457 6.47851 9.91302 6.39311 10.1391 6.22341C10.3655 6.05371 10.5255 5.8103 10.5916 5.53507C10.8614 4.46133 11.5979 3.56463 12.599 3.0914C13.6002 2.6184 14.7606 2.6184 15.7617 3.0914C16.7628 3.56461 17.4993 4.46133 17.7691 5.53507C17.8363 5.80962 17.9965 6.05239 18.2227 6.22186C18.4486 6.39135 18.7266 6.47739 19.0087 6.46485C19.083 6.46485 19.1544 6.46485 19.1388 6.44928L19.139 6.4495C20.3615 6.43934 21.5099 7.03579 22.2045 8.04207C22.8991 9.04841 23.0497 10.3333 22.607 11.473C22.4987 11.7621 22.5024 12.0811 22.6169 12.3678C22.7317 12.6545 22.949 12.8879 23.2268 13.0226C24.2385 13.5174 24.9716 14.444 25.2202 15.5424C25.4691 16.6408 25.2066 17.7928 24.5066 18.675C23.8066 19.5572 22.7445 20.0748 21.6182 20.0826H15.42V16.9151L19.8735 13.6424C20.1495 13.4519 20.3365 13.1579 20.3919 12.8272C20.4472 12.4965 20.3664 12.1575 20.1677 11.8875C19.969 11.6175 19.6692 11.4394 19.3371 11.3942C19.0049 11.3488 18.6685 11.4398 18.4045 11.6467L15.4199 13.8379V8.92563C15.4199 8.48267 15.1836 8.07347 14.8002 7.8521C14.4167 7.63074 13.9441 7.63074 13.5606 7.8521C13.1771 8.07347 12.9408 8.48272 12.9408 8.92563V15.1239L9.96256 12.9018C9.60716 12.6372 9.13741 12.5823 8.73054 12.7578C8.32368 12.9334 8.04136 13.3125 7.9899 13.7527C7.93844 14.1927 8.12565 14.627 8.48105 14.8916L12.9408 18.2045V20.0827L6.74257 20.0827Z",
    fill: "currentColor"
  }));
}

// app/components/ToolTip.tsx
init_react();
var import_react42 = __toESM(require_react());
function ToolTip({ children, className, arrow }) {
  const [isShown, setIsShown] = (0, import_react42.useState)(false);
  const arrowStyle = () => {
    if (!arrow) {
      return "";
    }
    switch (arrow) {
      case "top":
        return "top-[40px] after:bg-white after:border-[1px] after:border-t-slate-300 after:border-r-transparent after:border-b-transparent after:border-l-slate-300 after:dark:border-t-slate-600 after:dark:border-r-transprent after:dark:border-b-transparent after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:top-[-8px] after:left-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "bottom":
        return "bottom-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "left":
        return "left-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "right":
        return "right-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
    }
  };
  return /* @__PURE__ */ import_react42.default.createElement(motion.div, {
    animate: {},
    initial: { scale: 0.97, opacity: 0.5 },
    transition: { duration: 0.2 },
    whileHover: { scale: 1, opacity: 1 },
    whileTap: {
      scale: 1
    },
    onMouseOver: () => setIsShown(true),
    onMouseOut: () => setIsShown(false),
    className: `${className} absolute flex justify-center top-0 text-center z-10 h-full w-full text-slate-800 transtition dark:text-slate-200`
  }, /* @__PURE__ */ import_react42.default.createElement("div", {
    className: `absolute flex items-center ${isShown ? `${arrowStyle()} pl-3 pr-2 py-2 w-max shadow rounded-sm border-slate-300 border-[1px] bg-white dark:bg-slate-700  dark:border-slate-600` : ""}`
  }, isShown && children));
}

// app/components/Icons/ShortcutIcon.tsx
init_react();
function ShortcutIcon({ className, children }) {
  return /* @__PURE__ */ React.createElement("span", {
    className: `flex items-center justify-center rounded ${className != null ? className : ""}`
  }, children);
}

// app/components/SideBar.tsx
function SideBar() {
  const { doc } = useJsonDoc();
  return /* @__PURE__ */ React.createElement("div", {
    className: "side-bar flex flex-col align-center justify-between h-full p-1 bg-slate-200 transition dark:bg-slate-800"
  }, /* @__PURE__ */ React.createElement("ol", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement(SidebarLink, {
    to: `/j/${doc.id}`,
    hotKey: "option+1,alt+1"
  }, /* @__PURE__ */ React.createElement(ToolTip, {
    arrow: "left"
  }, /* @__PURE__ */ React.createElement(Body, null, "Column view"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "\u2325"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "1")), /* @__PURE__ */ React.createElement(TemplateIcon_default, {
    className: "p-2 w-full h-full"
  })), /* @__PURE__ */ React.createElement(SidebarLink, {
    to: `/j/${doc.id}/editor`,
    hotKey: "option+2,alt+2"
  }, /* @__PURE__ */ React.createElement(ToolTip, {
    arrow: "left"
  }, /* @__PURE__ */ React.createElement(Body, null, "JSON view"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "\u2325"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "2")), /* @__PURE__ */ React.createElement(CodeIcon_default, {
    className: "p-2 w-full h-full"
  })), /* @__PURE__ */ React.createElement(SidebarLink, {
    to: `/j/${doc.id}/tree`,
    hotKey: "option+3,alt+3"
  }, /* @__PURE__ */ React.createElement(ToolTip, {
    arrow: "left"
  }, /* @__PURE__ */ React.createElement(Body, null, "Tree view"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "\u2325"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-[26px] h-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
  }, "3")), /* @__PURE__ */ React.createElement(TreeIcon, {
    className: "p-2 w-full h-full"
  }))), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement(SidebarLink, null, /* @__PURE__ */ React.createElement("a", {
    href: `/j/${doc.id}.json`,
    target: "_blank"
  }, /* @__PURE__ */ React.createElement(ToolTip, {
    arrow: "left"
  }, /* @__PURE__ */ React.createElement(Body, null, "Download")), /* @__PURE__ */ React.createElement(DownloadIcon_default, {
    className: "p-2 w-full h-full"
  })))));
}
function SidebarLink({
  children,
  to,
  hotKey
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const { minimal } = useJsonDoc();
  const [theme] = useTheme();
  const queryParams = new URLSearchParams();
  if (typeof minimal === "boolean") {
    queryParams.set("minimal", String(minimal));
    if (theme) {
      queryParams.set("theme", theme);
    }
  }
  const href = `${to}${queryParams.toString().length > 0 ? `?${queryParams.toString()}` : ""}`;
  if (hotKey) {
    const navigate = useNavigate();
    useHotkeys(hotKey, (e2) => {
      e2.preventDefault();
      if (!isActive && to) {
        navigate(href);
      }
    }, [navigate, isActive, to]);
  }
  const classes = isActive ? "relative w-10 h-10 mb-1 text-white bg-indigo-700 rounded-sm cursor:pointer transition" : "relative w-10 h-10 mb-1 text-slate-700 hover:bg-slate-300 rounded-sm cursor:pointer transition dark:text-white dark:hover:bg-slate-700";
  return !!to ? /* @__PURE__ */ React.createElement(Link, {
    to: href,
    prefetch: isActive ? "none" : "render"
  }, /* @__PURE__ */ React.createElement("li", {
    className: classes
  }, children)) : /* @__PURE__ */ React.createElement("li", {
    className: classes
  }, children);
}

// app/components/JsonView.tsx
init_react();
var import_react49 = __toESM(require_react());

// app/components/PathBar.tsx
init_react();
var import_react43 = __toESM(require_react());
var import_path7 = __toESM(require_lib());
function PathBar() {
  const [isEditable, setIsEditable] = (0, import_react43.useState)(false);
  const { selectedNodes, highlightedNodeId } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const [json] = useJson();
  if (isEditable) {
    return /* @__PURE__ */ React.createElement(PathBarText, {
      selectedNodes,
      onConfirm: (newPath) => {
        setIsEditable(false);
        const heroPath = new import_path7.JSONHeroPath(newPath);
        const node = heroPath.first(json);
        if (node) {
          goToNodeId(newPath, "pathBar");
        }
      }
    });
  }
  return /* @__PURE__ */ React.createElement(PathBarLink, {
    selectedNodes,
    highlightedNodeId,
    enableEdit: () => setIsEditable(true)
  });
}
function PathBarText({ selectedNodes, onConfirm }) {
  const [path, setPath] = (0, import_react43.useState)("");
  const ref = (0, import_react43.useRef)(null);
  (0, import_react43.useEffect)(() => {
    var _a;
    setPath(((_a = selectedNodes.at(-1)) == null ? void 0 : _a.id) || "");
  }, [selectedNodes]);
  (0, import_react43.useEffect)(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: (e2) => {
      onConfirm(path);
      e2.preventDefault();
    },
    className: "flex overflow-x-hidden items-center bg-slate-300 dark:bg-slate-700 rounded-sm"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "grow"
  }, /* @__PURE__ */ React.createElement("input", {
    ref,
    className: "w-full border-none outline-none text-ellipsis text-base px-2 py-0 rounded-sm bg-transparent dark:text-slate-200",
    style: { boxShadow: "none" },
    type: "text",
    name: "title",
    spellCheck: "false",
    placeholder: "Name your JSON file",
    value: path,
    onChange: (e2) => setPath(e2.target.value)
  })), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "flex ml-auto justify-center items-center w-[26px] h-[26px] hover:bg-slate-400 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[10%]"
  }, /* @__PURE__ */ React.createElement(CheckIcon_default, {
    className: "h-5"
  })));
}
function PathBarLink({
  selectedNodes,
  highlightedNodeId,
  enableEdit
}) {
  const { goToNodeId } = useJsonColumnViewAPI();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-shrink-0 flex-grow-0 overflow-x-hidden",
    onClick: (event) => {
      if (event.detail == 2) {
        enableEdit();
      }
    }
  }, selectedNodes.map((node, index2) => {
    return /* @__PURE__ */ React.createElement(PathBarItem, {
      key: index2,
      node,
      isHighlighted: highlightedNodeId === node.id,
      onClick: (id2) => goToNodeId(id2, "pathBar"),
      isLast: index2 == selectedNodes.length - 1
    });
  }), /* @__PURE__ */ React.createElement("button", {
    className: "flex ml-auto justify-center items-center w-[26px] h-[26px] hover:bg-slate-300 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[10%]",
    onClick: enableEdit
  }, /* @__PURE__ */ React.createElement(PencilAltIcon_default, {
    className: "h-5"
  })));
}
function PathHistoryControls() {
  const { canGoBack, canGoForward } = useJsonColumnViewState();
  const { goBack, goForward } = useJsonColumnViewAPI();
  useHotkeys("[", () => {
    goBack();
  }, [goBack]);
  useHotkeys("]", () => {
    goForward();
  }, [goForward]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex h-full"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex justify-center items-center w-[26px] h-[26px] disabled:text-slate-400 disabled:text-opacity-50 text-slate-700 hover:bg-slate-300 hover:disabled:bg-transparent rounded-sm transition dark:disabled:text-slate-700 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:hover:disabled:bg-transparent",
    disabled: !canGoBack,
    onClick: goBack
  }, /* @__PURE__ */ React.createElement(ArrowLeftIcon_default, {
    className: "w-5 h-6"
  })), /* @__PURE__ */ React.createElement("button", {
    className: "flex justify-center items-center w-[26px] h-[26px] disabled:text-slate-400 disabled:text-opacity-50 text-slate-700 hover:bg-slate-300 hover:disabled:bg-transparent rounded-sm transition dark:disabled:text-slate-700 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:hover:disabled:bg-transparent",
    disabled: !canGoForward,
    onClick: goForward
  }, /* @__PURE__ */ React.createElement(ArrowRightIcon_default, {
    className: "w-5 h-6"
  })));
}
function PathBarElement({
  node,
  isHighlighted,
  onClick,
  isLast
}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center min-w-0",
    style: {
      flexShrink: 1
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: `flex items-center hover:cursor-pointer min-w-0 transition ${isHighlighted ? "text-slate-700 bg-slate-300 px-2 py-[3px] rounded-sm dark:text-white dark:bg-slate-700" : "hover:bg-slate-300 px-2 py-[3px] rounded-sm transition dark:hover:bg-white dark:hover:bg-opacity-[5%]"}`,
    style: {
      flexShrink: 1
    },
    onClick: () => onClick && onClick(node.id)
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-4 flex-shrink-[0.5] flex-grow-0 flex-col justify-items-center whitespace-nowrap overflow-x-hidden transition dark:text-slate-400"
  }, node.icon && /* @__PURE__ */ React.createElement(node.icon, {
    className: "h-3 w-3"
  })), /* @__PURE__ */ React.createElement(Body, {
    className: "flex-shrink flex-grow-0 whitespace-nowrap overflow-x-hidden text-ellipsis transition dark:text-slate-400"
  }, node.title)), isLast ? /* @__PURE__ */ React.createElement(React.Fragment, null) : /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
    className: "flex-grow-0 flex-shrink-[0.5] w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden"
  }));
}
var PathBarItem = (0, import_react43.memo)(PathBarElement);

// app/components/SearchBar.tsx
init_react();

// app/components/UI/Dialog.tsx
init_react();

// node_modules/@radix-ui/react-dialog/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-use-body-pointer-events/dist/index.module.js
init_react();
var t = __toESM(require_react());
var n;
var o2 = 0;
function useBodyPointerEvents({ disabled: r2 }) {
  const i2 = t.useRef(false);
  useLayoutEffect(() => {
    if (r2) {
      let e2 = function() {
        o2--, o2 === 0 && (document.body.style.pointerEvents = n);
      }, t3 = function(e3) {
        i2.current = e3.pointerType !== "mouse";
      };
      return o2 === 0 && (n = document.body.style.pointerEvents), document.body.style.pointerEvents = "none", o2++, document.addEventListener("pointerup", t3), () => {
        i2.current ? document.addEventListener("click", e2, { once: true }) : e2(), document.removeEventListener("pointerup", t3);
      };
    }
  }, [r2]);
}

// node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
var i = __toESM(require_react());
var u2 = /* @__PURE__ */ i.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set() });
var DismissableLayer = /* @__PURE__ */ i.forwardRef((l3, m4) => {
  const { disableOutsidePointerEvents: f3 = false, onEscapeKeyDown: p3, onPointerDownOutside: v3, onFocusOutside: b5, onInteractOutside: E2, onDismiss: y, ...w3 } = l3, h2 = i.useContext(u2), [D, x2] = i.useState(null), [, C2] = i.useState({}), L = useComposedRefs(m4, (e2) => x2(e2)), P = Array.from(h2.layers), [O2] = [...h2.layersWithOutsidePointerEventsDisabled].slice(-1), g2 = P.indexOf(O2), B = D ? P.indexOf(D) : -1, R3 = h2.layersWithOutsidePointerEventsDisabled.size > 0, F3 = B >= g2, S = function(e2) {
    const n3 = useCallbackRef(e2), r2 = i.useRef(false);
    return i.useEffect(() => {
      const e3 = (e4) => {
        if (e4.target && !r2.current) {
          d3("dismissableLayer.pointerDownOutside", n3, { originalEvent: e4 });
        }
        r2.current = false;
      }, t3 = window.setTimeout(() => {
        document.addEventListener("pointerdown", e3);
      }, 0);
      return () => {
        window.clearTimeout(t3), document.removeEventListener("pointerdown", e3);
      };
    }, [n3]), { onPointerDownCapture: () => r2.current = true };
  }((e2) => {
    const t3 = e2.target, n3 = [...h2.branches].some((e3) => e3.contains(t3));
    F3 && !n3 && (v3 == null || v3(e2), E2 == null || E2(e2), e2.defaultPrevented || y == null || y());
  }), W = function(e2) {
    const n3 = useCallbackRef(e2), r2 = i.useRef(false);
    return i.useEffect(() => {
      const e3 = (e4) => {
        if (e4.target && !r2.current) {
          d3("dismissableLayer.focusOutside", n3, { originalEvent: e4 });
        }
      };
      return document.addEventListener("focusin", e3), () => document.removeEventListener("focusin", e3);
    }, [n3]), { onFocusCapture: () => r2.current = true, onBlurCapture: () => r2.current = false };
  }((e2) => {
    const t3 = e2.target;
    [...h2.branches].some((e3) => e3.contains(t3)) || (b5 == null || b5(e2), E2 == null || E2(e2), e2.defaultPrevented || y == null || y());
  });
  return useEscapeKeydown((e2) => {
    B === h2.layers.size - 1 && (p3 == null || p3(e2), e2.defaultPrevented || y == null || y());
  }), useBodyPointerEvents({ disabled: f3 }), i.useEffect(() => {
    D && (f3 && h2.layersWithOutsidePointerEventsDisabled.add(D), h2.layers.add(D), c2());
  }, [D, f3, h2]), i.useEffect(() => () => {
    D && (h2.layers.delete(D), h2.layersWithOutsidePointerEventsDisabled.delete(D), c2());
  }, [D, h2]), i.useEffect(() => {
    const e2 = () => C2({});
    return document.addEventListener("dismissableLayer.update", e2), () => document.removeEventListener("dismissableLayer.update", e2);
  }, []), /* @__PURE__ */ i.createElement(Primitive.div, _extends({}, w3, { ref: L, style: { pointerEvents: R3 ? F3 ? "auto" : "none" : void 0, ...l3.style }, onFocusCapture: composeEventHandlers(l3.onFocusCapture, W.onFocusCapture), onBlurCapture: composeEventHandlers(l3.onBlurCapture, W.onBlurCapture), onPointerDownCapture: composeEventHandlers(l3.onPointerDownCapture, S.onPointerDownCapture) }));
});
function c2() {
  const e2 = new Event("dismissableLayer.update");
  document.dispatchEvent(e2);
}
function d3(e2, t3, n3) {
  const r2 = n3.originalEvent.target, s3 = new CustomEvent(e2, { bubbles: false, cancelable: true, detail: n3 });
  return t3 && r2.addEventListener(e2, t3, { once: true }), !r2.dispatchEvent(s3);
}

// node_modules/@radix-ui/react-dialog/dist/index.module.js
var m3 = __toESM(require_react());
var [x, C] = createContextScope("Dialog");
var [v2, E] = x("Dialog");
var Dialog = (e2) => {
  const { __scopeDialog: o3, children: t3, open: r2, defaultOpen: n3, onOpenChange: a2, modal: i2 = true, allowPinchZoom: l3 } = e2, c3 = m3.useRef(null), p3 = m3.useRef(null), [d4 = false, f3] = useControllableState({ prop: r2, defaultProp: n3, onChange: a2 });
  return m3.createElement(v2, { scope: o3, triggerRef: c3, contentRef: p3, contentId: useId(), titleId: useId(), descriptionId: useId(), open: d4, onOpenChange: f3, onOpenToggle: m3.useCallback(() => f3((e3) => !e3), [f3]), modal: i2, allowPinchZoom: l3 }, t3);
};
var DialogTrigger = /* @__PURE__ */ m3.forwardRef((e2, o3) => {
  const { __scopeDialog: t3, ...r2 } = e2, a2 = E("DialogTrigger", t3), i2 = useComposedRefs(o3, a2.triggerRef);
  return m3.createElement(Primitive.button, _extends({ type: "button", "aria-haspopup": "dialog", "aria-expanded": a2.open, "aria-controls": a2.contentId, "data-state": b4(a2.open) }, r2, { ref: i2, onClick: composeEventHandlers(e2.onClick, a2.onOpenToggle) }));
});
var DialogPortal = (e2) => {
  const { __scopeDialog: o3, forceMount: t3, children: r2, container: n3 } = e2, l3 = E("DialogPortal", o3);
  return m3.createElement(m3.Fragment, null, m3.Children.map(r2, (e3) => /* @__PURE__ */ m3.createElement(Presence, { present: t3 || l3.open }, /* @__PURE__ */ m3.createElement(UnstablePortal, { asChild: true, container: n3 }, e3))));
};
var DialogOverlay = /* @__PURE__ */ m3.forwardRef((e2, o3) => {
  const { forceMount: t3, ...r2 } = e2, n3 = E("DialogOverlay", e2.__scopeDialog);
  return n3.modal ? /* @__PURE__ */ m3.createElement(Presence, { present: t3 || n3.open }, /* @__PURE__ */ m3.createElement(R2, _extends({}, r2, { ref: o3 }))) : null;
});
var R2 = /* @__PURE__ */ m3.forwardRef((o3, r2) => {
  const { __scopeDialog: a2, ...i2 } = o3, l3 = E("DialogOverlay", a2);
  return m3.createElement(Combination_default, { as: Slot, allowPinchZoom: l3.allowPinchZoom, shards: [l3.contentRef] }, /* @__PURE__ */ m3.createElement(Primitive.div, _extends({ "data-state": b4(l3.open) }, i2, { ref: r2, style: { pointerEvents: "auto", ...i2.style } })));
});
var DialogContent = /* @__PURE__ */ m3.forwardRef((e2, o3) => {
  const { forceMount: t3, ...r2 } = e2, n3 = E("DialogContent", e2.__scopeDialog);
  return m3.createElement(Presence, { present: t3 || n3.open }, n3.modal ? /* @__PURE__ */ m3.createElement(_, _extends({}, r2, { ref: o3 })) : /* @__PURE__ */ m3.createElement(O, _extends({}, r2, { ref: o3 })));
});
var _ = /* @__PURE__ */ m3.forwardRef((e2, t3) => {
  const r2 = E("DialogContent", e2.__scopeDialog), n3 = m3.useRef(null), a2 = useComposedRefs(t3, r2.contentRef, n3);
  return m3.useEffect(() => {
    const e3 = n3.current;
    if (e3)
      return hideOthers(e3);
  }, []), /* @__PURE__ */ m3.createElement(h, _extends({}, e2, { ref: a2, trapFocus: r2.open, disableOutsidePointerEvents: true, onCloseAutoFocus: composeEventHandlers(e2.onCloseAutoFocus, (e3) => {
    var o3;
    e3.preventDefault(), (o3 = r2.triggerRef.current) === null || o3 === void 0 || o3.focus();
  }), onPointerDownOutside: composeEventHandlers(e2.onPointerDownOutside, (e3) => {
    const o3 = e3.detail.originalEvent, t4 = o3.button === 0 && o3.ctrlKey === true;
    (o3.button === 2 || t4) && e3.preventDefault();
  }), onFocusOutside: composeEventHandlers(e2.onFocusOutside, (e3) => e3.preventDefault()) }));
});
var O = /* @__PURE__ */ m3.forwardRef((e2, o3) => {
  const t3 = E("DialogContent", e2.__scopeDialog), r2 = m3.useRef(false);
  return m3.createElement(h, _extends({}, e2, { ref: o3, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (o4) => {
    var n3, a2;
    ((n3 = e2.onCloseAutoFocus) === null || n3 === void 0 || n3.call(e2, o4), o4.defaultPrevented) || (r2.current || (a2 = t3.triggerRef.current) === null || a2 === void 0 || a2.focus(), o4.preventDefault());
    r2.current = false;
  }, onInteractOutside: (o4) => {
    var n3, a2;
    (n3 = e2.onInteractOutside) === null || n3 === void 0 || n3.call(e2, o4), o4.defaultPrevented || (r2.current = true);
    const i2 = o4.target;
    ((a2 = t3.triggerRef.current) === null || a2 === void 0 ? void 0 : a2.contains(i2)) && o4.preventDefault();
  } }));
});
var h = /* @__PURE__ */ m3.forwardRef((e2, o3) => {
  const { __scopeDialog: t3, trapFocus: n3, onOpenAutoFocus: a2, onCloseAutoFocus: i2, ...s3 } = e2, u3 = E("DialogContent", t3), p3 = m3.useRef(null), d4 = useComposedRefs(o3, p3);
  return useFocusGuards(), /* @__PURE__ */ m3.createElement(m3.Fragment, null, /* @__PURE__ */ m3.createElement(FocusScope, { asChild: true, loop: true, trapped: n3, onMountAutoFocus: a2, onUnmountAutoFocus: i2 }, /* @__PURE__ */ m3.createElement(DismissableLayer, _extends({ role: "dialog", id: u3.contentId, "aria-describedby": u3.descriptionId, "aria-labelledby": u3.titleId, "data-state": b4(u3.open) }, s3, { ref: d4, onDismiss: () => u3.onOpenChange(false) }))), false);
});
function b4(e2) {
  return e2 ? "open" : "closed";
}
var [w2, F2] = createContext("DialogTitleWarning", { contentName: "DialogContent", titleName: "DialogTitle", docsSlug: "dialog" });
var Root3 = Dialog;
var Trigger2 = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;

// app/components/UI/Dialog.tsx
var import_react44 = __toESM(require_react());
var DialogContent2 = import_react44.default.forwardRef(({ children, ...props }, forwardedRef) => /* @__PURE__ */ import_react44.default.createElement(Portal, null, /* @__PURE__ */ import_react44.default.createElement(Overlay, {
  forceMount: true,
  className: "fixed inset-0 z-20 bg-black/60",
  onClick: () => {
    props.onOverlayClick && props.onOverlayClick();
  }
}), /* @__PURE__ */ import_react44.default.createElement(Content, {
  forceMount: true,
  ...omit_default(props, "onOverlayClick"),
  ref: forwardedRef
}, children)));
var Dialog2 = Root3;
var DialogTrigger2 = Trigger2;

// app/components/SearchPalette.tsx
init_react();

// app/hooks/useJsonSearch.tsx
init_react();
var import_react45 = __toESM(require_react());
var JsonSearchStateContext = (0, import_react45.createContext)({});
var JsonSearchApiContext = (0, import_react45.createContext)({});
function reducer(state, action) {
  switch (state.status) {
    case "initializing": {
      if (action.type === "index-initialized") {
        return {
          ...state,
          status: "idle",
          results: void 0
        };
      }
      return state;
    }
    case "idle": {
      if (action.type === "reset") {
        return {
          ...state,
          query: void 0,
          results: void 0
        };
      }
      if (action.type === "search") {
        return {
          ...state,
          status: "searching",
          query: action.payload.query
        };
      }
      return state;
    }
    case "searching": {
      if (action.type === "reset") {
        return {
          ...state,
          status: "idle",
          query: void 0,
          results: void 0
        };
      }
      if (action.type === "search-results" && state.query === action.payload.query) {
        return {
          ...state,
          status: "idle",
          results: action.payload.results
        };
      }
      return state;
    }
  }
}
var lastAction;
function wrapReducer(name, reducer2) {
  return (state, action) => {
    const next = reducer2(state, action);
    if (true) {
      if (!lastAction) {
        console.groupCollapsed(`%cAction: %c${name + " " + action.type} %cat ${getCurrentTimeFormatted()}`, "color: lightgreen; font-weight: bold;", "color: white; font-weight: bold;", "color: lightblue; font-weight: lighter;");
        console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
        console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
        console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
        console.groupEnd();
        lastAction = action;
      } else {
        lastAction = void 0;
      }
    }
    return next;
  };
}
var getCurrentTimeFormatted = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
function JsonSearchProvider({
  children
}) {
  const [json] = useJson();
  const [state, dispatch] = (0, import_react45.useReducer)(wrapReducer("jsonSearch", reducer), { status: "initializing" });
  const search = (0, import_react45.useCallback)((query) => {
    dispatch({ type: "search", payload: { query } });
  }, [dispatch]);
  const reset = (0, import_react45.useCallback)(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);
  const handleWorkerMessage = (0, import_react45.useCallback)((e2) => dispatch(e2.data), [dispatch]);
  const workerRef = (0, import_react45.useRef)();
  (0, import_react45.useEffect)(() => {
    if (typeof window === "undefined" || typeof window.Worker === "undefined") {
      return;
    }
    if (workerRef.current) {
      return;
    }
    const worker = new Worker("/entry.worker.js");
    worker.onmessage = handleWorkerMessage;
    workerRef.current = worker;
    workerRef.current.postMessage({
      type: "initialize-index",
      payload: {
        json
      }
    });
  }, [json, workerRef.current]);
  (0, import_react45.useEffect)(() => {
    var _a;
    if (state.status !== "searching") {
      return;
    }
    (_a = workerRef.current) == null ? void 0 : _a.postMessage({
      type: "search",
      payload: { query: state.query }
    });
  }, [state.status, workerRef.current]);
  return /* @__PURE__ */ React.createElement(JsonSearchStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React.createElement(JsonSearchApiContext.Provider, {
    value: { search, reset }
  }, children));
}
function useJsonSearchState() {
  return (0, import_react45.useContext)(JsonSearchStateContext);
}
function useJsonSearchApi() {
  return (0, import_react45.useContext)(JsonSearchApiContext);
}

// app/components/Icons/ArrowKeysUpDownIcon.tsx
init_react();
function ArrowKeysUpDownIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "28",
    height: "14",
    viewBox: "0 0 30 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M6.60956 4.48804C6.80972 4.23784 7.19026 4.23784 7.39043 4.48804L10.3501 8.18765C10.612 8.51503 10.3789 9 9.95969 9H4.04031C3.62106 9 3.38797 8.51503 3.64988 8.18765L6.60956 4.48804Z",
    fill: "black"
  }), /* @__PURE__ */ React.createElement("rect", {
    x: "16",
    width: "14",
    height: "14",
    rx: "1.53846",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M23.3904 9.51196C23.1903 9.76216 22.8097 9.76216 22.6096 9.51196L19.6499 5.81235C19.388 5.48496 19.6211 5 20.0403 5L25.9597 5C26.3789 5 26.612 5.48497 26.3501 5.81235L23.3904 9.51196Z",
    fill: "black"
  }));
}

// app/components/Icons/LoadingIcon.tsx
init_react();
function LoadingIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "26",
    height: "26",
    viewBox: "0 0 26 26",
    fill: "none"
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: "13",
    cy: "13",
    r: "10",
    stroke: "black",
    strokeOpacity: "0.3",
    strokeWidth: "4"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M13 23C7.47715 23 3 18.5228 3 13",
    stroke: "#4338CA",
    strokeWidth: "4",
    strokeLinecap: "round"
  }));
}

// node_modules/downshift/dist/downshift.esm.js
init_react();

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
init_react();
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
init_react();

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
init_react();
function _setPrototypeOf(o3, p3) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o4, p4) {
    o4.__proto__ = p4;
    return o4;
  };
  return _setPrototypeOf(o3, p3);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

// node_modules/downshift/dist/downshift.esm.js
var import_prop_types = __toESM(require_prop_types());
var import_react46 = __toESM(require_react());
var import_react_is = __toESM(require_react_is());

// node_modules/compute-scroll-into-view/dist/index.module.js
init_react();
function t2(t3) {
  return typeof t3 == "object" && t3 != null && t3.nodeType === 1;
}
function e(t3, e2) {
  return (!e2 || t3 !== "hidden") && t3 !== "visible" && t3 !== "clip";
}
function n2(t3, n3) {
  if (t3.clientHeight < t3.scrollHeight || t3.clientWidth < t3.scrollWidth) {
    var r2 = getComputedStyle(t3, null);
    return e(r2.overflowY, n3) || e(r2.overflowX, n3) || function(t4) {
      var e2 = function(t5) {
        if (!t5.ownerDocument || !t5.ownerDocument.defaultView)
          return null;
        try {
          return t5.ownerDocument.defaultView.frameElement;
        } catch (t6) {
          return null;
        }
      }(t4);
      return !!e2 && (e2.clientHeight < t4.scrollHeight || e2.clientWidth < t4.scrollWidth);
    }(t3);
  }
  return false;
}
function r(t3, e2, n3, r2, i2, o3, l3, d4) {
  return o3 < t3 && l3 > e2 || o3 > t3 && l3 < e2 ? 0 : o3 <= t3 && d4 <= n3 || l3 >= e2 && d4 >= n3 ? o3 - t3 - r2 : l3 > e2 && d4 < n3 || o3 < t3 && d4 > n3 ? l3 - e2 + i2 : 0;
}
function index_module_default(e2, i2) {
  var o3 = window, l3 = i2.scrollMode, d4 = i2.block, u3 = i2.inline, h2 = i2.boundary, a2 = i2.skipOverflowHiddenElements, c3 = typeof h2 == "function" ? h2 : function(t3) {
    return t3 !== h2;
  };
  if (!t2(e2))
    throw new TypeError("Invalid target");
  for (var f3 = document.scrollingElement || document.documentElement, s3 = [], p3 = e2; t2(p3) && c3(p3); ) {
    if ((p3 = p3.parentElement) === f3) {
      s3.push(p3);
      break;
    }
    p3 != null && p3 === document.body && n2(p3) && !n2(document.documentElement) || p3 != null && n2(p3, a2) && s3.push(p3);
  }
  for (var m4 = o3.visualViewport ? o3.visualViewport.width : innerWidth, g2 = o3.visualViewport ? o3.visualViewport.height : innerHeight, w3 = window.scrollX || pageXOffset, v3 = window.scrollY || pageYOffset, W = e2.getBoundingClientRect(), b5 = W.height, H = W.width, y = W.top, E2 = W.right, M = W.bottom, V = W.left, x2 = d4 === "start" || d4 === "nearest" ? y : d4 === "end" ? M : y + b5 / 2, I = u3 === "center" ? V + H / 2 : u3 === "end" ? E2 : V, C2 = [], T = 0; T < s3.length; T++) {
    var k = s3[T], B = k.getBoundingClientRect(), D = B.height, O2 = B.width, R3 = B.top, X = B.right, Y = B.bottom, L = B.left;
    if (l3 === "if-needed" && y >= 0 && V >= 0 && M <= g2 && E2 <= m4 && y >= R3 && M <= Y && V >= L && E2 <= X)
      return C2;
    var S = getComputedStyle(k), j = parseInt(S.borderLeftWidth, 10), q = parseInt(S.borderTopWidth, 10), z = parseInt(S.borderRightWidth, 10), A = parseInt(S.borderBottomWidth, 10), F3 = 0, G = 0, J = "offsetWidth" in k ? k.offsetWidth - k.clientWidth - j - z : 0, K = "offsetHeight" in k ? k.offsetHeight - k.clientHeight - q - A : 0;
    if (f3 === k)
      F3 = d4 === "start" ? x2 : d4 === "end" ? x2 - g2 : d4 === "nearest" ? r(v3, v3 + g2, g2, q, A, v3 + x2, v3 + x2 + b5, b5) : x2 - g2 / 2, G = u3 === "start" ? I : u3 === "center" ? I - m4 / 2 : u3 === "end" ? I - m4 : r(w3, w3 + m4, m4, j, z, w3 + I, w3 + I + H, H), F3 = Math.max(0, F3 + v3), G = Math.max(0, G + w3);
    else {
      F3 = d4 === "start" ? x2 - R3 - q : d4 === "end" ? x2 - Y + A + K : d4 === "nearest" ? r(R3, Y, D, q, A + K, x2, x2 + b5, b5) : x2 - (R3 + D / 2) + K / 2, G = u3 === "start" ? I - L - j : u3 === "center" ? I - (L + O2 / 2) + J / 2 : u3 === "end" ? I - X + z + J : r(L, X, O2, j, z + J, I, I + H, H);
      var N = k.scrollLeft, P = k.scrollTop;
      x2 += P - (F3 = Math.max(0, Math.min(P + F3, k.scrollHeight - D + K))), I += N - (G = Math.max(0, Math.min(N + G, k.scrollWidth - O2 + J)));
    }
    C2.push({ el: k, top: F3, left: G });
  }
  return C2;
}

// node_modules/downshift/node_modules/tslib/modules/index.js
init_react();
var import_tslib42 = __toESM(require_tslib3(), 1);
var {
  __extends: __extends3,
  __assign: __assign3,
  __rest: __rest3,
  __decorate: __decorate3,
  __param: __param3,
  __metadata: __metadata3,
  __awaiter: __awaiter3,
  __generator: __generator3,
  __exportStar: __exportStar3,
  __createBinding: __createBinding3,
  __values: __values3,
  __read: __read3,
  __spread: __spread3,
  __spreadArrays: __spreadArrays3,
  __spreadArray: __spreadArray3,
  __await: __await3,
  __asyncGenerator: __asyncGenerator3,
  __asyncDelegator: __asyncDelegator3,
  __asyncValues: __asyncValues3,
  __makeTemplateObject: __makeTemplateObject3,
  __importStar: __importStar3,
  __importDefault: __importDefault3,
  __classPrivateFieldGet: __classPrivateFieldGet3,
  __classPrivateFieldSet: __classPrivateFieldSet3
} = import_tslib42.default;

// node_modules/downshift/dist/downshift.esm.js
var idCounter = 0;
function cbToCb(cb2) {
  return typeof cb2 === "function" ? cb2 : noop;
}
function noop() {
}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = index_module_default(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach(function(_ref) {
    var el = _ref.el, top = _ref.top, left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
function isOrContainsNode(parent, child, environment) {
  var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}
function debounce(fn, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function() {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function(fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return function(node) {
    refs.forEach(function(ref) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
function generateId() {
  return String(idCounter++);
}
function getA11yStatusMessage$1(_ref2) {
  var isOpen = _ref2.isOpen, resultCount = _ref2.resultCount, previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }
  return "";
}
function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}
function isDOMElement(element) {
  return typeof element.type === "string";
}
function getElementProps(element) {
  return element.props;
}
function requiredProp(fnName, propName) {
  console.error('The property "' + propName + '" is required in "' + fnName + '"');
}
var stateKeys = ["highlightedIndex", "inputValue", "isOpen", "selectedItem", "type"];
function pickState(state) {
  if (state === void 0) {
    state = {};
  }
  var result = {};
  stateKeys.forEach(function(k) {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}
function getState(state, props) {
  return Object.keys(state).reduce(function(prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  var key = event.key, keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return "Arrow" + key;
  }
  return key;
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  var itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  var newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  var nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  var currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (var index2 = baseIndex + 1; index2 < itemCount; index2++) {
      if (!getItemNodeFromIndex(index2).hasAttribute("disabled")) {
        return index2;
      }
    }
  } else {
    for (var _index = baseIndex - 1; _index >= 0; _index--) {
      if (!getItemNodeFromIndex(_index).hasAttribute("disabled")) {
        return _index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
}
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some(function(contextNode) {
    return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
  });
}
var validateControlledUnchanged = noop;
if (true) {
  validateControlledUnchanged = function validateControlledUnchanged2(state, prevProps, nextProps) {
    var warningDescription = "This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props";
    Object.keys(state).forEach(function(propKey) {
      if (prevProps[propKey] !== void 0 && nextProps[propKey] === void 0) {
        console.error('downshift: A component has changed the controlled prop "' + propKey + '" to be uncontrolled. ' + warningDescription);
      } else if (prevProps[propKey] === void 0 && nextProps[propKey] !== void 0) {
        console.error('downshift: A component has changed the uncontrolled prop "' + propKey + '" to be controlled. ' + warningDescription);
      }
    });
  };
}
var cleanupStatus = debounce(function(documentProp) {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  var div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  var statusDiv = documentProp.getElementById("a11y-status-message");
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement("div");
  statusDiv.setAttribute("id", "a11y-status-message");
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");
  statusDiv.setAttribute("aria-relevant", "additions text");
  Object.assign(statusDiv.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
var unknown = true ? "__autocomplete_unknown__" : 0;
var mouseUp = true ? "__autocomplete_mouseup__" : 1;
var itemMouseEnter = true ? "__autocomplete_item_mouseenter__" : 2;
var keyDownArrowUp = true ? "__autocomplete_keydown_arrow_up__" : 3;
var keyDownArrowDown = true ? "__autocomplete_keydown_arrow_down__" : 4;
var keyDownEscape = true ? "__autocomplete_keydown_escape__" : 5;
var keyDownEnter = true ? "__autocomplete_keydown_enter__" : 6;
var keyDownHome = true ? "__autocomplete_keydown_home__" : 7;
var keyDownEnd = true ? "__autocomplete_keydown_end__" : 8;
var clickItem = true ? "__autocomplete_click_item__" : 9;
var blurInput = true ? "__autocomplete_blur_input__" : 10;
var changeInput = true ? "__autocomplete_change_input__" : 11;
var keyDownSpaceButton = true ? "__autocomplete_keydown_space_button__" : 12;
var clickButton = true ? "__autocomplete_click_button__" : 13;
var blurButton = true ? "__autocomplete_blur_button__" : 14;
var controlledPropUpdatedSelectedItem = true ? "__autocomplete_controlled_prop_updated_selected_item__" : 15;
var touchEnd = true ? "__autocomplete_touchend__" : 16;
var stateChangeTypes$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  unknown,
  mouseUp,
  itemMouseEnter,
  keyDownArrowUp,
  keyDownArrowDown,
  keyDownEscape,
  keyDownEnter,
  keyDownHome,
  keyDownEnd,
  clickItem,
  blurInput,
  changeInput,
  keyDownSpaceButton,
  clickButton,
  blurButton,
  controlledPropUpdatedSelectedItem,
  touchEnd
});
var _excluded$4 = ["refKey", "ref"];
var _excluded2$3 = ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"];
var _excluded3$2 = ["onKeyDown", "onBlur", "onChange", "onInput", "onChangeText"];
var _excluded4$1 = ["refKey", "ref"];
var _excluded5$1 = ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"];
var Downshift = /* @__PURE__ */ function() {
  var Downshift2 = /* @__PURE__ */ function(_Component) {
    _inheritsLoose(Downshift3, _Component);
    function Downshift3(_props) {
      var _this;
      _this = _Component.call(this, _props) || this;
      _this.id = _this.props.id || "downshift-" + generateId();
      _this.menuId = _this.props.menuId || _this.id + "-menu";
      _this.labelId = _this.props.labelId || _this.id + "-label";
      _this.inputId = _this.props.inputId || _this.id + "-input";
      _this.getItemId = _this.props.getItemId || function(index2) {
        return _this.id + "-item-" + index2;
      };
      _this.input = null;
      _this.items = [];
      _this.itemCount = null;
      _this.previousResultCount = 0;
      _this.timeoutIds = [];
      _this.internalSetTimeout = function(fn, time) {
        var id2 = setTimeout(function() {
          _this.timeoutIds = _this.timeoutIds.filter(function(i2) {
            return i2 !== id2;
          });
          fn();
        }, time);
        _this.timeoutIds.push(id2);
      };
      _this.setItemCount = function(count) {
        _this.itemCount = count;
      };
      _this.unsetItemCount = function() {
        _this.itemCount = null;
      };
      _this.setHighlightedIndex = function(highlightedIndex, otherStateToSet) {
        if (highlightedIndex === void 0) {
          highlightedIndex = _this.props.defaultHighlightedIndex;
        }
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends({
          highlightedIndex
        }, otherStateToSet));
      };
      _this.clearSelection = function(cb2) {
        _this.internalSetState({
          selectedItem: null,
          inputValue: "",
          highlightedIndex: _this.props.defaultHighlightedIndex,
          isOpen: _this.props.defaultIsOpen
        }, cb2);
      };
      _this.selectItem = function(item, otherStateToSet, cb2) {
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends({
          isOpen: _this.props.defaultIsOpen,
          highlightedIndex: _this.props.defaultHighlightedIndex,
          selectedItem: item,
          inputValue: _this.props.itemToString(item)
        }, otherStateToSet), cb2);
      };
      _this.selectItemAtIndex = function(itemIndex, otherStateToSet, cb2) {
        var item = _this.items[itemIndex];
        if (item == null) {
          return;
        }
        _this.selectItem(item, otherStateToSet, cb2);
      };
      _this.selectHighlightedItem = function(otherStateToSet, cb2) {
        return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb2);
      };
      _this.internalSetState = function(stateToSet, cb2) {
        var isItemSelected, onChangeArg;
        var onStateChangeArg = {};
        var isStateToSetFunction = typeof stateToSet === "function";
        if (!isStateToSetFunction && stateToSet.hasOwnProperty("inputValue")) {
          _this.props.onInputValueChange(stateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), stateToSet));
        }
        return _this.setState(function(state) {
          state = _this.getState(state);
          var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet;
          newStateToSet = _this.props.stateReducer(state, newStateToSet);
          isItemSelected = newStateToSet.hasOwnProperty("selectedItem");
          var nextState = {};
          var nextFullState = {};
          if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
            onChangeArg = newStateToSet.selectedItem;
          }
          newStateToSet.type = newStateToSet.type || unknown;
          Object.keys(newStateToSet).forEach(function(key) {
            if (state[key] !== newStateToSet[key]) {
              onStateChangeArg[key] = newStateToSet[key];
            }
            if (key === "type") {
              return;
            }
            nextFullState[key] = newStateToSet[key];
            if (!isControlledProp(_this.props, key)) {
              nextState[key] = newStateToSet[key];
            }
          });
          if (isStateToSetFunction && newStateToSet.hasOwnProperty("inputValue")) {
            _this.props.onInputValueChange(newStateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), newStateToSet));
          }
          return nextState;
        }, function() {
          cbToCb(cb2)();
          var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;
          if (hasMoreStateThanType) {
            _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
          }
          if (isItemSelected) {
            _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
          }
          if (onChangeArg !== void 0) {
            _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
          }
          _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
        });
      };
      _this.rootRef = function(node) {
        return _this._rootNode = node;
      };
      _this.getRootProps = function(_temp, _temp2) {
        var _extends2;
        var _ref = _temp === void 0 ? {} : _temp, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);
        var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
        _this.getRootProps.called = true;
        _this.getRootProps.refKey = refKey;
        _this.getRootProps.suppressRefError = suppressRefError;
        var _this$getState = _this.getState(), isOpen = _this$getState.isOpen;
        return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, _this.rootRef), _extends2.role = "combobox", _extends2["aria-expanded"] = isOpen, _extends2["aria-haspopup"] = "listbox", _extends2["aria-owns"] = isOpen ? _this.menuId : null, _extends2["aria-labelledby"] = _this.labelId, _extends2), rest);
      };
      _this.keyDownHandlers = {
        ArrowDown: function ArrowDown(event) {
          var _this2 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? 5 : 1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowDown
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowDown
            }, function() {
              var itemCount = _this2.getItemCount();
              if (itemCount > 0) {
                var _this2$getState = _this2.getState(), highlightedIndex = _this2$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, function(index2) {
                  return _this2.getItemNodeFromIndex(index2);
                });
                _this2.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowDown
                });
              }
            });
          }
        },
        ArrowUp: function ArrowUp(event) {
          var _this3 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? -5 : -1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowUp
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowUp
            }, function() {
              var itemCount = _this3.getItemCount();
              if (itemCount > 0) {
                var _this3$getState = _this3.getState(), highlightedIndex = _this3$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, function(index2) {
                  return _this3.getItemNodeFromIndex(index2);
                });
                _this3.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowUp
                });
              }
            });
          }
        },
        Enter: function Enter(event) {
          if (event.which === 229) {
            return;
          }
          var _this$getState2 = this.getState(), isOpen = _this$getState2.isOpen, highlightedIndex = _this$getState2.highlightedIndex;
          if (isOpen && highlightedIndex != null) {
            event.preventDefault();
            var item = this.items[highlightedIndex];
            var itemNode = this.getItemNodeFromIndex(highlightedIndex);
            if (item == null || itemNode && itemNode.hasAttribute("disabled")) {
              return;
            }
            this.selectHighlightedItem({
              type: keyDownEnter
            });
          }
        },
        Escape: function Escape(event) {
          event.preventDefault();
          this.reset(_extends({
            type: keyDownEscape
          }, !this.state.isOpen && {
            selectedItem: null,
            inputValue: ""
          }));
        }
      };
      _this.buttonKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
        " ": function _2(event) {
          event.preventDefault();
          this.toggleMenu({
            type: keyDownSpaceButton
          });
        }
      });
      _this.inputKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
        Home: function Home(event) {
          var _this4 = this;
          var _this$getState3 = this.getState(), isOpen = _this$getState3.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          var newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, function(index2) {
            return _this4.getItemNodeFromIndex(index2);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownHome
          });
        },
        End: function End(event) {
          var _this5 = this;
          var _this$getState4 = this.getState(), isOpen = _this$getState4.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          var newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, function(index2) {
            return _this5.getItemNodeFromIndex(index2);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownEnd
          });
        }
      });
      _this.getToggleButtonProps = function(_temp3) {
        var _ref3 = _temp3 === void 0 ? {} : _temp3, onClick = _ref3.onClick;
        _ref3.onPress;
        var onKeyDown = _ref3.onKeyDown, onKeyUp = _ref3.onKeyUp, onBlur = _ref3.onBlur, rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$3);
        var _this$getState5 = _this.getState(), isOpen = _this$getState5.isOpen;
        var enabledEventHandlers = {
          onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
          onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
          onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
          onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
        };
        var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
        return _extends({
          type: "button",
          role: "button",
          "aria-label": isOpen ? "close menu" : "open menu",
          "aria-haspopup": true,
          "data-toggle": true
        }, eventHandlers, rest);
      };
      _this.buttonHandleKeyUp = function(event) {
        event.preventDefault();
      };
      _this.buttonHandleKeyDown = function(event) {
        var key = normalizeArrowKey(event);
        if (_this.buttonKeyDownHandlers[key]) {
          _this.buttonKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.buttonHandleClick = function(event) {
        event.preventDefault();
        if (_this.props.environment.document.activeElement === _this.props.environment.document.body) {
          event.target.focus();
        }
        if (false) {
          _this.toggleMenu({
            type: clickButton
          });
        } else {
          _this.internalSetTimeout(function() {
            return _this.toggleMenu({
              type: clickButton
            });
          });
        }
      };
      _this.buttonHandleBlur = function(event) {
        var blurTarget = event.target;
        _this.internalSetTimeout(function() {
          if (!_this.isMouseDown && (_this.props.environment.document.activeElement == null || _this.props.environment.document.activeElement.id !== _this.inputId) && _this.props.environment.document.activeElement !== blurTarget) {
            _this.reset({
              type: blurButton
            });
          }
        });
      };
      _this.getLabelProps = function(props) {
        return _extends({
          htmlFor: _this.inputId,
          id: _this.labelId
        }, props);
      };
      _this.getInputProps = function(_temp4) {
        var _ref4 = _temp4 === void 0 ? {} : _temp4, onKeyDown = _ref4.onKeyDown, onBlur = _ref4.onBlur, onChange = _ref4.onChange, onInput = _ref4.onInput;
        _ref4.onChangeText;
        var rest = _objectWithoutPropertiesLoose(_ref4, _excluded3$2);
        var onChangeKey;
        var eventHandlers = {};
        {
          onChangeKey = "onChange";
        }
        var _this$getState6 = _this.getState(), inputValue = _this$getState6.inputValue, isOpen = _this$getState6.isOpen, highlightedIndex = _this$getState6.highlightedIndex;
        if (!rest.disabled) {
          var _eventHandlers;
          eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
        }
        return _extends({
          "aria-autocomplete": "list",
          "aria-activedescendant": isOpen && typeof highlightedIndex === "number" && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
          "aria-controls": isOpen ? _this.menuId : null,
          "aria-labelledby": _this.labelId,
          autoComplete: "off",
          value: inputValue,
          id: _this.inputId
        }, eventHandlers, rest);
      };
      _this.inputHandleKeyDown = function(event) {
        var key = normalizeArrowKey(event);
        if (key && _this.inputKeyDownHandlers[key]) {
          _this.inputKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.inputHandleChange = function(event) {
        _this.internalSetState({
          type: changeInput,
          isOpen: true,
          inputValue: event.target.value,
          highlightedIndex: _this.props.defaultHighlightedIndex
        });
      };
      _this.inputHandleBlur = function() {
        _this.internalSetTimeout(function() {
          var downshiftButtonIsActive = _this.props.environment.document && !!_this.props.environment.document.activeElement && !!_this.props.environment.document.activeElement.dataset && _this.props.environment.document.activeElement.dataset.toggle && _this._rootNode && _this._rootNode.contains(_this.props.environment.document.activeElement);
          if (!_this.isMouseDown && !downshiftButtonIsActive) {
            _this.reset({
              type: blurInput
            });
          }
        });
      };
      _this.menuRef = function(node) {
        _this._menuNode = node;
      };
      _this.getMenuProps = function(_temp5, _temp6) {
        var _extends3;
        var _ref5 = _temp5 === void 0 ? {} : _temp5, _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, props = _objectWithoutPropertiesLoose(_ref5, _excluded4$1);
        var _ref6 = _temp6 === void 0 ? {} : _temp6, _ref6$suppressRefErro = _ref6.suppressRefError, suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;
        _this.getMenuProps.called = true;
        _this.getMenuProps.refKey = refKey;
        _this.getMenuProps.suppressRefError = suppressRefError;
        return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, _this.menuRef), _extends3.role = "listbox", _extends3["aria-labelledby"] = props && props["aria-label"] ? null : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
      };
      _this.getItemProps = function(_temp7) {
        var _enabledEventHandlers;
        var _ref7 = _temp7 === void 0 ? {} : _temp7, onMouseMove = _ref7.onMouseMove, onMouseDown = _ref7.onMouseDown, onClick = _ref7.onClick;
        _ref7.onPress;
        var index2 = _ref7.index, _ref7$item = _ref7.item, item = _ref7$item === void 0 ? false ? void 0 : requiredProp("getItemProps", "item") : _ref7$item, rest = _objectWithoutPropertiesLoose(_ref7, _excluded5$1);
        if (index2 === void 0) {
          _this.items.push(item);
          index2 = _this.items.indexOf(item);
        } else {
          _this.items[index2] = item;
        }
        var onSelectKey = "onClick";
        var customClickHandler = onClick;
        var enabledEventHandlers = (_enabledEventHandlers = {
          onMouseMove: callAllEventHandlers(onMouseMove, function() {
            if (index2 === _this.getState().highlightedIndex) {
              return;
            }
            _this.setHighlightedIndex(index2, {
              type: itemMouseEnter
            });
            _this.avoidScrolling = true;
            _this.internalSetTimeout(function() {
              return _this.avoidScrolling = false;
            }, 250);
          }),
          onMouseDown: callAllEventHandlers(onMouseDown, function(event) {
            event.preventDefault();
          })
        }, _enabledEventHandlers[onSelectKey] = callAllEventHandlers(customClickHandler, function() {
          _this.selectItemAtIndex(index2, {
            type: clickItem
          });
        }), _enabledEventHandlers);
        var eventHandlers = rest.disabled ? {
          onMouseDown: enabledEventHandlers.onMouseDown
        } : enabledEventHandlers;
        return _extends({
          id: _this.getItemId(index2),
          role: "option",
          "aria-selected": _this.getState().highlightedIndex === index2
        }, eventHandlers, rest);
      };
      _this.clearItems = function() {
        _this.items = [];
      };
      _this.reset = function(otherStateToSet, cb2) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function(_ref8) {
          var selectedItem = _ref8.selectedItem;
          return _extends({
            isOpen: _this.props.defaultIsOpen,
            highlightedIndex: _this.props.defaultHighlightedIndex,
            inputValue: _this.props.itemToString(selectedItem)
          }, otherStateToSet);
        }, cb2);
      };
      _this.toggleMenu = function(otherStateToSet, cb2) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function(_ref9) {
          var isOpen = _ref9.isOpen;
          return _extends({
            isOpen: !isOpen
          }, isOpen && {
            highlightedIndex: _this.props.defaultHighlightedIndex
          }, otherStateToSet);
        }, function() {
          var _this$getState7 = _this.getState(), isOpen = _this$getState7.isOpen, highlightedIndex = _this$getState7.highlightedIndex;
          if (isOpen) {
            if (_this.getItemCount() > 0 && typeof highlightedIndex === "number") {
              _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
            }
          }
          cbToCb(cb2)();
        });
      };
      _this.openMenu = function(cb2) {
        _this.internalSetState({
          isOpen: true
        }, cb2);
      };
      _this.closeMenu = function(cb2) {
        _this.internalSetState({
          isOpen: false
        }, cb2);
      };
      _this.updateStatus = debounce(function() {
        var state = _this.getState();
        var item = _this.items[state.highlightedIndex];
        var resultCount = _this.getItemCount();
        var status = _this.props.getA11yStatusMessage(_extends({
          itemToString: _this.props.itemToString,
          previousResultCount: _this.previousResultCount,
          resultCount,
          highlightedItem: item
        }, state));
        _this.previousResultCount = resultCount;
        setStatus(status, _this.props.environment.document);
      }, 200);
      var _this$props = _this.props, defaultHighlightedIndex = _this$props.defaultHighlightedIndex, _this$props$initialHi = _this$props.initialHighlightedIndex, _highlightedIndex = _this$props$initialHi === void 0 ? defaultHighlightedIndex : _this$props$initialHi, defaultIsOpen = _this$props.defaultIsOpen, _this$props$initialIs = _this$props.initialIsOpen, _isOpen = _this$props$initialIs === void 0 ? defaultIsOpen : _this$props$initialIs, _this$props$initialIn = _this$props.initialInputValue, _inputValue = _this$props$initialIn === void 0 ? "" : _this$props$initialIn, _this$props$initialSe = _this$props.initialSelectedItem, _selectedItem = _this$props$initialSe === void 0 ? null : _this$props$initialSe;
      var _state = _this.getState({
        highlightedIndex: _highlightedIndex,
        isOpen: _isOpen,
        inputValue: _inputValue,
        selectedItem: _selectedItem
      });
      if (_state.selectedItem != null && _this.props.initialInputValue === void 0) {
        _state.inputValue = _this.props.itemToString(_state.selectedItem);
      }
      _this.state = _state;
      return _this;
    }
    var _proto = Downshift3.prototype;
    _proto.internalClearTimeouts = function internalClearTimeouts() {
      this.timeoutIds.forEach(function(id2) {
        clearTimeout(id2);
      });
      this.timeoutIds = [];
    };
    _proto.getState = function getState$1(stateToMerge) {
      if (stateToMerge === void 0) {
        stateToMerge = this.state;
      }
      return getState(stateToMerge, this.props);
    };
    _proto.getItemCount = function getItemCount() {
      var itemCount = this.items.length;
      if (this.itemCount != null) {
        itemCount = this.itemCount;
      } else if (this.props.itemCount !== void 0) {
        itemCount = this.props.itemCount;
      }
      return itemCount;
    };
    _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index2) {
      return this.props.environment.document.getElementById(this.getItemId(index2));
    };
    _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
      {
        var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
        this.props.scrollIntoView(node, this._menuNode);
      }
    };
    _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
      var _this6 = this;
      var itemCount = this.getItemCount();
      var _this$getState8 = this.getState(), highlightedIndex = _this$getState8.highlightedIndex;
      if (itemCount > 0) {
        var nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, function(index2) {
          return _this6.getItemNodeFromIndex(index2);
        });
        this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
      }
    };
    _proto.getStateAndHelpers = function getStateAndHelpers() {
      var _this$getState9 = this.getState(), highlightedIndex = _this$getState9.highlightedIndex, inputValue = _this$getState9.inputValue, selectedItem = _this$getState9.selectedItem, isOpen = _this$getState9.isOpen;
      var itemToString2 = this.props.itemToString;
      var id2 = this.id;
      var getRootProps = this.getRootProps, getToggleButtonProps = this.getToggleButtonProps, getLabelProps = this.getLabelProps, getMenuProps = this.getMenuProps, getInputProps = this.getInputProps, getItemProps = this.getItemProps, openMenu = this.openMenu, closeMenu = this.closeMenu, toggleMenu = this.toggleMenu, selectItem = this.selectItem, selectItemAtIndex = this.selectItemAtIndex, selectHighlightedItem = this.selectHighlightedItem, setHighlightedIndex = this.setHighlightedIndex, clearSelection = this.clearSelection, clearItems = this.clearItems, reset = this.reset, setItemCount = this.setItemCount, unsetItemCount = this.unsetItemCount, setState = this.internalSetState;
      return {
        getRootProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getItemProps,
        reset,
        openMenu,
        closeMenu,
        toggleMenu,
        selectItem,
        selectItemAtIndex,
        selectHighlightedItem,
        setHighlightedIndex,
        clearSelection,
        clearItems,
        setItemCount,
        unsetItemCount,
        setState,
        itemToString: itemToString2,
        id: id2,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem
      };
    };
    _proto.componentDidMount = function componentDidMount() {
      var _this7 = this;
      if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
        validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
      }
      {
        var onMouseDown = function onMouseDown2() {
          _this7.isMouseDown = true;
        };
        var onMouseUp = function onMouseUp2(event) {
          _this7.isMouseDown = false;
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment);
          if (!contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: mouseUp
            }, function() {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        var onTouchStart = function onTouchStart2() {
          _this7.isTouchMove = false;
        };
        var onTouchMove = function onTouchMove2() {
          _this7.isTouchMove = true;
        };
        var onTouchEnd = function onTouchEnd2(event) {
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment, false);
          if (!_this7.isTouchMove && !contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: touchEnd
            }, function() {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        var environment = this.props.environment;
        environment.addEventListener("mousedown", onMouseDown);
        environment.addEventListener("mouseup", onMouseUp);
        environment.addEventListener("touchstart", onTouchStart);
        environment.addEventListener("touchmove", onTouchMove);
        environment.addEventListener("touchend", onTouchEnd);
        this.cleanup = function() {
          _this7.internalClearTimeouts();
          _this7.updateStatus.cancel();
          environment.removeEventListener("mousedown", onMouseDown);
          environment.removeEventListener("mouseup", onMouseUp);
          environment.removeEventListener("touchstart", onTouchStart);
          environment.removeEventListener("touchmove", onTouchMove);
          environment.removeEventListener("touchend", onTouchEnd);
        };
      }
    };
    _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
      var _ref10 = this.props.highlightedIndex === void 0 ? this.getState() : this.props, currentHighlightedIndex = _ref10.highlightedIndex;
      var _ref11 = prevProps.highlightedIndex === void 0 ? prevState : prevProps, prevHighlightedIndex = _ref11.highlightedIndex;
      var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
      var scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
      return scrollWhenOpen || scrollWhenNavigating;
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (true) {
        validateControlledUnchanged(this.state, prevProps, this.props);
        if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
          validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
        }
      }
      if (isControlledProp(this.props, "selectedItem") && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
        this.internalSetState({
          type: controlledPropUpdatedSelectedItem,
          inputValue: this.props.itemToString(this.props.selectedItem)
        });
      }
      if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
        this.scrollHighlightedItemIntoView();
      }
      {
        this.updateStatus();
      }
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.cleanup();
    };
    _proto.render = function render() {
      var children = unwrapArray(this.props.children, noop);
      this.clearItems();
      this.getRootProps.called = false;
      this.getRootProps.refKey = void 0;
      this.getRootProps.suppressRefError = void 0;
      this.getMenuProps.called = false;
      this.getMenuProps.refKey = void 0;
      this.getMenuProps.suppressRefError = void 0;
      this.getLabelProps.called = false;
      this.getInputProps.called = false;
      var element = unwrapArray(children(this.getStateAndHelpers()));
      if (!element) {
        return null;
      }
      if (this.getRootProps.called || this.props.suppressRefError) {
        if (!this.getRootProps.suppressRefError && !this.props.suppressRefError) {
          validateGetRootPropsCalledCorrectly(element, this.getRootProps);
        }
        return element;
      } else if (isDOMElement(element)) {
        return /* @__PURE__ */ (0, import_react46.cloneElement)(element, this.getRootProps(getElementProps(element)));
      }
      if (true) {
        throw new Error("downshift: If you return a non-DOM element, you must apply the getRootProps function");
      }
      return void 0;
    };
    return Downshift3;
  }(import_react46.Component);
  Downshift2.defaultProps = {
    defaultHighlightedIndex: null,
    defaultIsOpen: false,
    getA11yStatusMessage: getA11yStatusMessage$1,
    itemToString: function itemToString2(i2) {
      if (i2 == null) {
        return "";
      }
      if (isPlainObject(i2) && !i2.hasOwnProperty("toString")) {
        console.warn("downshift: An object was passed to the default implementation of `itemToString`. You should probably provide your own `itemToString` implementation. Please refer to the `itemToString` API documentation.", "The object that was passed:", i2);
      }
      return String(i2);
    },
    onStateChange: noop,
    onInputValueChange: noop,
    onUserAction: noop,
    onChange: noop,
    onSelect: noop,
    onOuterClick: noop,
    selectedItemChanged: function selectedItemChanged(prevItem, item) {
      return prevItem !== item;
    },
    environment: typeof window === "undefined" ? {} : window,
    stateReducer: function stateReducer2(state, stateToSet) {
      return stateToSet;
    },
    suppressRefError: false,
    scrollIntoView
  };
  Downshift2.stateChangeTypes = stateChangeTypes$3;
  return Downshift2;
}();
true ? Downshift.propTypes = {
  children: import_prop_types.default.func,
  defaultHighlightedIndex: import_prop_types.default.number,
  defaultIsOpen: import_prop_types.default.bool,
  initialHighlightedIndex: import_prop_types.default.number,
  initialSelectedItem: import_prop_types.default.any,
  initialInputValue: import_prop_types.default.string,
  initialIsOpen: import_prop_types.default.bool,
  getA11yStatusMessage: import_prop_types.default.func,
  itemToString: import_prop_types.default.func,
  onChange: import_prop_types.default.func,
  onSelect: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  onUserAction: import_prop_types.default.func,
  onOuterClick: import_prop_types.default.func,
  selectedItemChanged: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  itemCount: import_prop_types.default.number,
  id: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  }),
  suppressRefError: import_prop_types.default.bool,
  scrollIntoView: import_prop_types.default.func,
  selectedItem: import_prop_types.default.any,
  isOpen: import_prop_types.default.bool,
  inputValue: import_prop_types.default.string,
  highlightedIndex: import_prop_types.default.number,
  labelId: import_prop_types.default.string,
  inputId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func
} : void 0;
function validateGetMenuPropsCalledCorrectly(node, _ref12) {
  var refKey = _ref12.refKey;
  if (!node) {
    console.error('downshift: The ref prop "' + refKey + '" from getMenuProps was not applied correctly on your menu element.');
  }
}
function validateGetRootPropsCalledCorrectly(element, _ref13) {
  var refKey = _ref13.refKey;
  var refKeySpecified = refKey !== "ref";
  var isComposite = !isDOMElement(element);
  if (isComposite && !refKeySpecified && !(0, import_react_is.isForwardRef)(element)) {
    console.error("downshift: You returned a non-DOM element. You must specify a refKey in getRootProps");
  } else if (!isComposite && refKeySpecified) {
    console.error('downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified "' + refKey + '"');
  }
  if (!(0, import_react_is.isForwardRef)(element) && !getElementProps(element)[refKey]) {
    console.error('downshift: You must apply the ref prop "' + refKey + '" from getRootProps onto your root element.');
  }
}
var _excluded$3 = ["isInitialMount", "highlightedIndex", "items", "environment"];
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function callOnChangeProps(action, state, newState) {
  var props = action.props, type = action.type;
  var changes = {};
  Object.keys(state).forEach(function(key) {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange(_extends({
      type
    }, changes));
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  var props = action.props, type = action.type;
  var handler = "on" + capitalizeString(key) + "Change";
  if (props[handler] && newState[key] !== void 0 && newState[key] !== state[key]) {
    props[handler](_extends({
      type
    }, newState));
  }
}
function stateReducer(s3, a2) {
  return a2.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  var selectedItem = selectionParameters.selectedItem, itemToStringLocal = selectionParameters.itemToString;
  return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : "";
}
var updateA11yStatus = debounce(function(getA11yMessage, document2) {
  setStatus(getA11yMessage(), document2);
}, 200);
var useIsomorphicLayoutEffect2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? import_react46.useLayoutEffect : import_react46.useEffect;
function useElementIds(_ref) {
  var _ref$id = _ref.id, id2 = _ref$id === void 0 ? "downshift-" + generateId() : _ref$id, labelId = _ref.labelId, menuId = _ref.menuId, getItemId = _ref.getItemId, toggleButtonId = _ref.toggleButtonId, inputId = _ref.inputId;
  var elementIdsRef = (0, import_react46.useRef)({
    labelId: labelId || id2 + "-label",
    menuId: menuId || id2 + "-menu",
    getItemId: getItemId || function(index2) {
      return id2 + "-item-" + index2;
    },
    toggleButtonId: toggleButtonId || id2 + "-toggle-button",
    inputId: inputId || id2 + "-input"
  });
  return elementIdsRef.current;
}
function getItemIndex(index2, item, items) {
  if (index2 !== void 0) {
    return index2;
  }
  if (items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}
function itemToString(item) {
  return item ? String(item) : "";
}
function isAcceptedCharacterKey(key) {
  return /^\S{1}$/.test(key);
}
function capitalizeString(string) {
  return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function useLatestRef(val) {
  var ref = (0, import_react46.useRef)(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer2, initialState, props) {
  var prevStateRef = (0, import_react46.useRef)();
  var actionRef = (0, import_react46.useRef)();
  var enhancedReducer = (0, import_react46.useCallback)(function(state2, action2) {
    actionRef.current = action2;
    state2 = getState(state2, action2.props);
    var changes = reducer2(state2, action2);
    var newState = action2.props.stateReducer(state2, _extends({}, action2, {
      changes
    }));
    return newState;
  }, [reducer2]);
  var _useReducer = (0, import_react46.useReducer)(enhancedReducer, initialState), state = _useReducer[0], dispatch = _useReducer[1];
  var propsRef = useLatestRef(props);
  var dispatchWithProps = (0, import_react46.useCallback)(function(action2) {
    return dispatch(_extends({
      props: propsRef.current
    }, action2));
  }, [propsRef]);
  var action = actionRef.current;
  (0, import_react46.useEffect)(function() {
    if (action && prevStateRef.current && prevStateRef.current !== state) {
      callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
    }
    prevStateRef.current = state;
  }, [state, props, action]);
  return [state, dispatchWithProps];
}
function useControlledReducer$1(reducer2, initialState, props) {
  var _useEnhancedReducer = useEnhancedReducer(reducer2, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
  return [getState(state, props), dispatch];
}
var defaultProps$3 = {
  itemToString,
  stateReducer,
  getA11ySelectionMessage,
  scrollIntoView,
  circularNavigation: false,
  environment: typeof window === "undefined" ? {} : window
};
function getDefaultValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  var defaultPropKey = "default" + capitalizeString(propKey);
  if (defaultPropKey in props) {
    return props[defaultPropKey];
  }
  return defaultStateValues2[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  if (propKey in props) {
    return props[propKey];
  }
  var initialPropKey = "initial" + capitalizeString(propKey);
  if (initialPropKey in props) {
    return props[initialPropKey];
  }
  return getDefaultValue$1(props, propKey, defaultStateValues2);
}
function getInitialState$2(props) {
  var selectedItem = getInitialValue$1(props, "selectedItem");
  var isOpen = getInitialValue$1(props, "isOpen");
  var highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  var inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset, getItemNodeFromIndex) {
  var items = props.items, initialHighlightedIndex = props.initialHighlightedIndex, defaultHighlightedIndex = props.defaultHighlightedIndex;
  var selectedItem = state.selectedItem, highlightedIndex = state.highlightedIndex;
  if (items.length === 0) {
    return -1;
  }
  if (initialHighlightedIndex !== void 0 && highlightedIndex === initialHighlightedIndex) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== void 0) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    if (offset === 0) {
      return items.indexOf(selectedItem);
    }
    return getNextWrappingIndex(offset, items.indexOf(selectedItem), items.length, getItemNodeFromIndex, false);
  }
  if (offset === 0) {
    return -1;
  }
  return offset < 0 ? items.length - 1 : 0;
}
function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
  var mouseAndTouchTrackersRef = (0, import_react46.useRef)({
    isMouseDown: false,
    isTouchMove: false
  });
  (0, import_react46.useEffect)(function() {
    var onMouseDown = function onMouseDown2() {
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    };
    var onMouseUp = function onMouseUp2(event) {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment)) {
        handleBlur();
      }
    };
    var onTouchStart = function onTouchStart2() {
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    };
    var onTouchMove = function onTouchMove2() {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    };
    var onTouchEnd = function onTouchEnd2(event) {
      if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment, false)) {
        handleBlur();
      }
    };
    environment.addEventListener("mousedown", onMouseDown);
    environment.addEventListener("mouseup", onMouseUp);
    environment.addEventListener("touchstart", onTouchStart);
    environment.addEventListener("touchmove", onTouchMove);
    environment.addEventListener("touchend", onTouchEnd);
    return function cleanup() {
      environment.removeEventListener("mousedown", onMouseDown);
      environment.removeEventListener("mouseup", onMouseUp);
      environment.removeEventListener("touchstart", onTouchStart);
      environment.removeEventListener("touchmove", onTouchMove);
      environment.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, environment]);
  return mouseAndTouchTrackersRef;
}
var useGetterPropsCalledChecker = function useGetterPropsCalledChecker2() {
  return noop;
};
if (true) {
  useGetterPropsCalledChecker = function useGetterPropsCalledChecker3() {
    var isInitialMountRef = (0, import_react46.useRef)(true);
    for (var _len = arguments.length, propKeys = new Array(_len), _key = 0; _key < _len; _key++) {
      propKeys[_key] = arguments[_key];
    }
    var getterPropsCalledRef = (0, import_react46.useRef)(propKeys.reduce(function(acc, propKey) {
      acc[propKey] = {};
      return acc;
    }, {}));
    (0, import_react46.useEffect)(function() {
      Object.keys(getterPropsCalledRef.current).forEach(function(propKey) {
        var propCallInfo = getterPropsCalledRef.current[propKey];
        if (isInitialMountRef.current) {
          if (!Object.keys(propCallInfo).length) {
            console.error("downshift: You forgot to call the " + propKey + " getter function on your component / element.");
            return;
          }
        }
        var suppressRefError = propCallInfo.suppressRefError, refKey = propCallInfo.refKey, elementRef = propCallInfo.elementRef;
        if ((!elementRef || !elementRef.current) && !suppressRefError) {
          console.error('downshift: The ref prop "' + refKey + '" from ' + propKey + " was not applied correctly on your element.");
        }
      });
      isInitialMountRef.current = false;
    });
    var setGetterPropCallInfo = (0, import_react46.useCallback)(function(propKey, suppressRefError, refKey, elementRef) {
      getterPropsCalledRef.current[propKey] = {
        suppressRefError,
        refKey,
        elementRef
      };
    }, []);
    return setGetterPropCallInfo;
  };
}
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  var isInitialMount = _ref2.isInitialMount, highlightedIndex = _ref2.highlightedIndex, items = _ref2.items, environment = _ref2.environment, rest = _objectWithoutPropertiesLoose(_ref2, _excluded$3);
  (0, import_react46.useEffect)(function() {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(function() {
      return getA11yMessage(_extends({
        highlightedIndex,
        highlightedItem: items[highlightedIndex],
        resultCount: items.length
      }, rest));
    }, environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  var highlightedIndex = _ref3.highlightedIndex, isOpen = _ref3.isOpen, itemRefs = _ref3.itemRefs, getItemNodeFromIndex = _ref3.getItemNodeFromIndex, menuElement = _ref3.menuElement, scrollIntoViewProp = _ref3.scrollIntoView;
  var shouldScrollRef = (0, import_react46.useRef)(true);
  useIsomorphicLayoutEffect2(function() {
    if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    }
  }, [highlightedIndex]);
  return shouldScrollRef;
}
var useControlPropsValidator = noop;
if (true) {
  useControlPropsValidator = function useControlPropsValidator2(_ref4) {
    var isInitialMount = _ref4.isInitialMount, props = _ref4.props, state = _ref4.state;
    var prevPropsRef = (0, import_react46.useRef)(props);
    (0, import_react46.useEffect)(function() {
      if (isInitialMount) {
        return;
      }
      validateControlledUnchanged(state, prevPropsRef.current, props);
      prevPropsRef.current = props;
    }, [state, props, isInitialMount]);
  };
}
function downshiftCommonReducer(state, action, stateChangeTypes2) {
  var type = action.type, props = action.props;
  var changes;
  switch (type) {
    case stateChangeTypes2.ItemMouseMove:
      changes = {
        highlightedIndex: action.index
      };
      break;
    case stateChangeTypes2.MenuMouseLeave:
      changes = {
        highlightedIndex: -1
      };
      break;
    case stateChangeTypes2.ToggleButtonClick:
    case stateChangeTypes2.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case stateChangeTypes2.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: action.highlightedIndex
      };
      break;
    case stateChangeTypes2.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case stateChangeTypes2.FunctionReset:
      changes = {
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        isOpen: getDefaultValue$1(props, "isOpen"),
        selectedItem: getDefaultValue$1(props, "selectedItem"),
        inputValue: getDefaultValue$1(props, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
function getItemIndexByCharacterKey(_a) {
  var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString2 = _a.itemToString, getItemNodeFromIndex = _a.getItemNodeFromIndex;
  var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
  for (var index2 = 0; index2 < items.length; index2++) {
    var offsetIndex = (index2 + highlightedIndex + 1) % items.length;
    var item = items[offsetIndex];
    if (item !== void 0 && itemToString2(item).toLowerCase().startsWith(lowerCasedKeysSoFar)) {
      var element = getItemNodeFromIndex(offsetIndex);
      if (!(element === null || element === void 0 ? void 0 : element.hasAttribute("disabled"))) {
        return offsetIndex;
      }
    }
  }
  return highlightedIndex;
}
var propTypes$2 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.";
  }
  return "";
}
var defaultProps$2 = __assign3(__assign3({}, defaultProps$3), { getA11yStatusMessage });
var validatePropTypes$2 = noop;
if (true) {
  validatePropTypes$2 = function(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes$2, options, "prop", caller.name);
  };
}
var MenuKeyDownArrowDown = true ? "__menu_keydown_arrow_down__" : 0;
var MenuKeyDownArrowUp = true ? "__menu_keydown_arrow_up__" : 1;
var MenuKeyDownEscape = true ? "__menu_keydown_escape__" : 2;
var MenuKeyDownHome = true ? "__menu_keydown_home__" : 3;
var MenuKeyDownEnd = true ? "__menu_keydown_end__" : 4;
var MenuKeyDownEnter = true ? "__menu_keydown_enter__" : 5;
var MenuKeyDownSpaceButton = true ? "__menu_keydown_space_button__" : 6;
var MenuKeyDownCharacter = true ? "__menu_keydown_character__" : 7;
var MenuBlur = true ? "__menu_blur__" : 8;
var MenuMouseLeave$1 = true ? "__menu_mouse_leave__" : 9;
var ItemMouseMove$1 = true ? "__item_mouse_move__" : 10;
var ItemClick$1 = true ? "__item_click__" : 11;
var ToggleButtonClick$1 = true ? "__togglebutton_click__" : 12;
var ToggleButtonKeyDownArrowDown = true ? "__togglebutton_keydown_arrow_down__" : 13;
var ToggleButtonKeyDownArrowUp = true ? "__togglebutton_keydown_arrow_up__" : 14;
var ToggleButtonKeyDownCharacter = true ? "__togglebutton_keydown_character__" : 15;
var FunctionToggleMenu$1 = true ? "__function_toggle_menu__" : 16;
var FunctionOpenMenu$1 = true ? "__function_open_menu__" : 17;
var FunctionCloseMenu$1 = true ? "__function_close_menu__" : 18;
var FunctionSetHighlightedIndex$1 = true ? "__function_set_highlighted_index__" : 19;
var FunctionSelectItem$1 = true ? "__function_select_item__" : 20;
var FunctionSetInputValue$1 = true ? "__function_set_input_value__" : 21;
var FunctionReset$2 = true ? "__function_reset__" : 22;
var stateChangeTypes$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MenuKeyDownArrowDown,
  MenuKeyDownArrowUp,
  MenuKeyDownEscape,
  MenuKeyDownHome,
  MenuKeyDownEnd,
  MenuKeyDownEnter,
  MenuKeyDownSpaceButton,
  MenuKeyDownCharacter,
  MenuBlur,
  MenuMouseLeave: MenuMouseLeave$1,
  ItemMouseMove: ItemMouseMove$1,
  ItemClick: ItemClick$1,
  ToggleButtonClick: ToggleButtonClick$1,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownCharacter,
  FunctionToggleMenu: FunctionToggleMenu$1,
  FunctionOpenMenu: FunctionOpenMenu$1,
  FunctionCloseMenu: FunctionCloseMenu$1,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
  FunctionSelectItem: FunctionSelectItem$1,
  FunctionSetInputValue: FunctionSetInputValue$1,
  FunctionReset: FunctionReset$2
});
function downshiftSelectReducer(state, action) {
  var type = action.type, props = action.props, shiftKey = action.shiftKey;
  var changes;
  switch (type) {
    case ItemClick$1:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index]
      };
      break;
    case ToggleButtonKeyDownCharacter:
      {
        var lowercasedKey = action.key;
        var inputValue = "" + state.inputValue + lowercasedKey;
        var itemIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.selectedItem ? props.items.indexOf(state.selectedItem) : -1,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });
        changes = _extends({
          inputValue
        }, itemIndex >= 0 && {
          selectedItem: props.items[itemIndex]
        });
      }
      break;
    case ToggleButtonKeyDownArrowDown:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownArrowUp:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
        isOpen: true
      };
      break;
    case MenuKeyDownEnter:
    case MenuKeyDownSpaceButton:
      changes = _extends({
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex")
      }, state.highlightedIndex >= 0 && {
        selectedItem: props.items[state.highlightedIndex]
      });
      break;
    case MenuKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case MenuKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case MenuKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case MenuBlur:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case MenuKeyDownCharacter:
      {
        var _lowercasedKey = action.key;
        var _inputValue = "" + state.inputValue + _lowercasedKey;
        var highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: _inputValue,
          highlightedIndex: state.highlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });
        changes = _extends({
          inputValue: _inputValue
        }, highlightedIndex >= 0 && {
          highlightedIndex
        });
      }
      break;
    case MenuKeyDownArrowDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
      };
      break;
    case MenuKeyDownArrowUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
      };
      break;
    case FunctionSelectItem$1:
      changes = {
        selectedItem: action.selectedItem
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$2);
  }
  return _extends({}, state, changes);
}
var _excluded$2 = ["onMouseLeave", "refKey", "onKeyDown", "onBlur", "ref"];
var _excluded2$2 = ["onClick", "onKeyDown", "refKey", "ref"];
var _excluded3$1 = ["item", "index", "onMouseMove", "onClick", "refKey", "ref"];
useSelect.stateChangeTypes = stateChangeTypes$2;
function useSelect(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$2(userProps, useSelect);
  var props = _extends({}, defaultProps$2, userProps);
  var items = props.items, scrollIntoView2 = props.scrollIntoView, environment = props.environment, initialIsOpen = props.initialIsOpen, defaultIsOpen = props.defaultIsOpen, itemToString2 = props.itemToString, getA11ySelectionMessage2 = props.getA11ySelectionMessage, getA11yStatusMessage2 = props.getA11yStatusMessage;
  var initialState = getInitialState$2(props);
  var _useControlledReducer = useControlledReducer$1(downshiftSelectReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
  var toggleButtonRef = (0, import_react46.useRef)(null);
  var menuRef = (0, import_react46.useRef)(null);
  var itemRefs = (0, import_react46.useRef)({});
  var shouldBlurRef = (0, import_react46.useRef)(true);
  var clearTimeoutRef = (0, import_react46.useRef)(null);
  var elementIds = useElementIds(props);
  var previousResultCountRef = (0, import_react46.useRef)();
  var isInitialMountRef = (0, import_react46.useRef)(true);
  var latest = useLatestRef({
    state,
    props
  });
  var getItemNodeFromIndex = (0, import_react46.useCallback)(function(index2) {
    return itemRefs.current[elementIds.getItemId(index2)];
  }, [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  (0, import_react46.useEffect)(function() {
    clearTimeoutRef.current = debounce(function(outerDispatch) {
      outerDispatch({
        type: FunctionSetInputValue$1,
        inputValue: ""
      });
    }, 500);
    return function() {
      clearTimeoutRef.current.cancel();
    };
  }, []);
  (0, import_react46.useEffect)(function() {
    if (!inputValue) {
      return;
    }
    clearTimeoutRef.current(dispatch);
  }, [dispatch, inputValue]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react46.useEffect)(function() {
    if (isInitialMountRef.current) {
      if ((initialIsOpen || defaultIsOpen || isOpen) && menuRef.current) {
        menuRef.current.focus();
      }
      return;
    }
    if (isOpen) {
      if (menuRef.current) {
        menuRef.current.focus();
      }
      return;
    }
    if (environment.document.activeElement === menuRef.current) {
      if (toggleButtonRef.current) {
        shouldBlurRef.current = false;
        toggleButtonRef.current.focus();
      }
    }
  }, [isOpen]);
  (0, import_react46.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [menuRef, toggleButtonRef], environment, function() {
    dispatch({
      type: MenuBlur
    });
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getMenuProps", "getToggleButtonProps");
  (0, import_react46.useEffect)(function() {
    isInitialMountRef.current = false;
  }, []);
  (0, import_react46.useEffect)(function() {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  var toggleButtonKeyDownHandlers = (0, import_react46.useMemo)(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowDown,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowUp,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      }
    };
  }, [dispatch, getItemNodeFromIndex]);
  var menuKeyDownHandlers = (0, import_react46.useMemo)(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownArrowDown,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownArrowUp,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },
      Home: function Home(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownHome,
          getItemNodeFromIndex
        });
      },
      End: function End(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownEnd,
          getItemNodeFromIndex
        });
      },
      Escape: function Escape() {
        dispatch({
          type: MenuKeyDownEscape
        });
      },
      Enter: function Enter(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownEnter
        });
      },
      " ": function _2(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownSpaceButton
        });
      }
    };
  }, [dispatch, getItemNodeFromIndex]);
  var toggleMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionToggleMenu$1
    });
  }, [dispatch]);
  var closeMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionCloseMenu$1
    });
  }, [dispatch]);
  var openMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionOpenMenu$1
    });
  }, [dispatch]);
  var setHighlightedIndex = (0, import_react46.useCallback)(function(newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex$1,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0, import_react46.useCallback)(function(newSelectedItem) {
    dispatch({
      type: FunctionSelectItem$1,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var reset = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionReset$2
    });
  }, [dispatch]);
  var setInputValue = (0, import_react46.useCallback)(function(newInputValue) {
    dispatch({
      type: FunctionSetInputValue$1,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var getLabelProps = (0, import_react46.useCallback)(function(labelProps) {
    return _extends({
      id: elementIds.labelId,
      htmlFor: elementIds.toggleButtonId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0, import_react46.useCallback)(function(_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, onKeyDown = _ref.onKeyDown, onBlur = _ref.onBlur, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
    var latestState = latest.current.state;
    var menuHandleKeyDown = function menuHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && menuKeyDownHandlers[key]) {
        menuKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: MenuKeyDownCharacter,
          key,
          getItemNodeFromIndex
        });
      }
    };
    var menuHandleBlur = function menuHandleBlur2() {
      if (shouldBlurRef.current === false) {
        shouldBlurRef.current = true;
        return;
      }
      var shouldBlur = !mouseAndTouchTrackersRef.current.isMouseDown;
      if (shouldBlur) {
        dispatch({
          type: MenuBlur
        });
      }
    };
    var menuHandleMouseLeave = function menuHandleMouseLeave2() {
      dispatch({
        type: MenuMouseLeave$1
      });
    };
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = elementIds.labelId, _extends2.tabIndex = -1, _extends2), latestState.isOpen && latestState.highlightedIndex > -1 && {
      "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
    }, {
      onMouseLeave: callAllEventHandlers(onMouseLeave, menuHandleMouseLeave),
      onKeyDown: callAllEventHandlers(onKeyDown, menuHandleKeyDown),
      onBlur: callAllEventHandlers(onBlur, menuHandleBlur)
    }, rest);
  }, [dispatch, latest, menuKeyDownHandlers, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
  var getToggleButtonProps = (0, import_react46.useCallback)(function(_temp3, _temp4) {
    var _extends3;
    var _ref3 = _temp3 === void 0 ? {} : _temp3, onClick = _ref3.onClick, onKeyDown = _ref3.onKeyDown, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$2);
    var _ref4 = _temp4 === void 0 ? {} : _temp4, _ref4$suppressRefErro = _ref4.suppressRefError, suppressRefError = _ref4$suppressRefErro === void 0 ? false : _ref4$suppressRefErro;
    var toggleButtonHandleClick = function toggleButtonHandleClick2() {
      dispatch({
        type: ToggleButtonClick$1
      });
    };
    var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && toggleButtonKeyDownHandlers[key]) {
        toggleButtonKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: ToggleButtonKeyDownCharacter,
          key,
          getItemNodeFromIndex
        });
      }
    };
    var toggleProps = _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends3.id = elementIds.toggleButtonId, _extends3["aria-haspopup"] = "listbox", _extends3["aria-expanded"] = latest.current.state.isOpen, _extends3["aria-labelledby"] = elementIds.labelId + " " + elementIds.toggleButtonId, _extends3), rest);
    if (!rest.disabled) {
      toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
      toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
    }
    setGetterPropCallInfo("getToggleButtonProps", suppressRefError, refKey, toggleButtonRef);
    return toggleProps;
  }, [dispatch, latest, toggleButtonKeyDownHandlers, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
  var getItemProps = (0, import_react46.useCallback)(function(_temp5) {
    var _extends4;
    var _ref5 = _temp5 === void 0 ? {} : _temp5, item = _ref5.item, index2 = _ref5.index, onMouseMove = _ref5.onMouseMove, onClick = _ref5.onClick, _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, rest = _objectWithoutPropertiesLoose(_ref5, _excluded3$1);
    var _latest$current = latest.current, latestState = _latest$current.state, latestProps = _latest$current.props;
    var itemHandleMouseMove = function itemHandleMouseMove2() {
      if (index2 === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove$1,
        index: index2
      });
    };
    var itemHandleClick = function itemHandleClick2() {
      dispatch({
        type: ItemClick$1,
        index: index2
      });
    };
    var itemIndex = getItemIndex(index2, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    var itemProps = _extends((_extends4 = {
      role: "option",
      "aria-selected": "" + (itemIndex === latestState.highlightedIndex),
      id: elementIds.getItemId(itemIndex)
    }, _extends4[refKey] = handleRefs(ref, function(itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
      }
    }), _extends4), rest);
    if (!rest.disabled) {
      itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
      itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
    }
    return itemProps;
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  return {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    selectItem,
    reset,
    setInputValue,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var InputKeyDownArrowDown = true ? "__input_keydown_arrow_down__" : 0;
var InputKeyDownArrowUp = true ? "__input_keydown_arrow_up__" : 1;
var InputKeyDownEscape = true ? "__input_keydown_escape__" : 2;
var InputKeyDownHome = true ? "__input_keydown_home__" : 3;
var InputKeyDownEnd = true ? "__input_keydown_end__" : 4;
var InputKeyDownEnter = true ? "__input_keydown_enter__" : 5;
var InputChange = true ? "__input_change__" : 6;
var InputBlur = true ? "__input_blur__" : 7;
var MenuMouseLeave = true ? "__menu_mouse_leave__" : 8;
var ItemMouseMove = true ? "__item_mouse_move__" : 9;
var ItemClick = true ? "__item_click__" : 10;
var ToggleButtonClick = true ? "__togglebutton_click__" : 11;
var FunctionToggleMenu = true ? "__function_toggle_menu__" : 12;
var FunctionOpenMenu = true ? "__function_open_menu__" : 13;
var FunctionCloseMenu = true ? "__function_close_menu__" : 14;
var FunctionSetHighlightedIndex = true ? "__function_set_highlighted_index__" : 15;
var FunctionSelectItem = true ? "__function_select_item__" : 16;
var FunctionSetInputValue = true ? "__function_set_input_value__" : 17;
var FunctionReset$1 = true ? "__function_reset__" : 18;
var ControlledPropUpdatedSelectedItem = true ? "__controlled_prop_updated_selected_item__" : 19;
var stateChangeTypes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown,
  InputKeyDownArrowUp,
  InputKeyDownEscape,
  InputKeyDownHome,
  InputKeyDownEnd,
  InputKeyDownEnter,
  InputChange,
  InputBlur,
  MenuMouseLeave,
  ItemMouseMove,
  ItemClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  FunctionOpenMenu,
  FunctionCloseMenu,
  FunctionSetHighlightedIndex,
  FunctionSelectItem,
  FunctionSetInputValue,
  FunctionReset: FunctionReset$1,
  ControlledPropUpdatedSelectedItem
});
function getInitialState$1(props) {
  var initialState = getInitialState$2(props);
  var selectedItem = initialState.selectedItem;
  var inputValue = initialState.inputValue;
  if (inputValue === "" && selectedItem && props.defaultInputValue === void 0 && props.initialInputValue === void 0 && props.inputValue === void 0) {
    inputValue = props.itemToString(selectedItem);
  }
  return _extends({}, initialState, {
    inputValue
  });
}
var propTypes$1 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  circularNavigation: import_prop_types.default.bool,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  inputValue: import_prop_types.default.string,
  defaultInputValue: import_prop_types.default.string,
  initialInputValue: import_prop_types.default.string,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  inputId: import_prop_types.default.string,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function useControlledReducer(reducer2, initialState, props) {
  var previousSelectedItemRef = (0, import_react46.useRef)();
  var _useEnhancedReducer = useEnhancedReducer(reducer2, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
  (0, import_react46.useEffect)(function() {
    if (isControlledProp(props, "selectedItem")) {
      if (previousSelectedItemRef.current !== props.selectedItem) {
        dispatch({
          type: ControlledPropUpdatedSelectedItem,
          inputValue: props.itemToString(props.selectedItem)
        });
      }
      previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
    }
  });
  return [getState(state, props), dispatch];
}
var validatePropTypes$1 = noop;
if (true) {
  validatePropTypes$1 = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes$1, options, "prop", caller.name);
  };
}
var defaultProps$1 = _extends({}, defaultProps$3, {
  getA11yStatusMessage: getA11yStatusMessage$1,
  circularNavigation: true
});
function downshiftUseComboboxReducer(state, action) {
  var type = action.type, props = action.props, shiftKey = action.shiftKey;
  var changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownEnter:
      changes = _extends({}, state.isOpen && state.highlightedIndex >= 0 && {
        selectedItem: props.items[state.highlightedIndex],
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputKeyDownEscape:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, !state.isOpen && {
        selectedItem: null,
        inputValue: ""
      });
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputBlur:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && action.selectItem && {
        selectedItem: props.items[state.highlightedIndex],
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: action.inputValue
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return _extends({}, state, changes);
}
var _excluded$1 = ["onMouseLeave", "refKey", "ref"];
var _excluded2$1 = ["item", "index", "refKey", "ref", "onMouseMove", "onClick", "onPress"];
var _excluded3 = ["onClick", "onPress", "refKey", "ref"];
var _excluded4 = ["onKeyDown", "onChange", "onInput", "onBlur", "onChangeText", "refKey", "ref"];
var _excluded5 = ["refKey", "ref"];
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$1(userProps, useCombobox);
  var props = _extends({}, defaultProps$1, userProps);
  var initialIsOpen = props.initialIsOpen, defaultIsOpen = props.defaultIsOpen, items = props.items, scrollIntoView2 = props.scrollIntoView, environment = props.environment, getA11yStatusMessage2 = props.getA11yStatusMessage, getA11ySelectionMessage2 = props.getA11ySelectionMessage, itemToString2 = props.itemToString;
  var initialState = getInitialState$1(props);
  var _useControlledReducer = useControlledReducer(downshiftUseComboboxReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
  var menuRef = (0, import_react46.useRef)(null);
  var itemRefs = (0, import_react46.useRef)({});
  var inputRef = (0, import_react46.useRef)(null);
  var toggleButtonRef = (0, import_react46.useRef)(null);
  var comboboxRef = (0, import_react46.useRef)(null);
  var isInitialMountRef = (0, import_react46.useRef)(true);
  var elementIds = useElementIds(props);
  var previousResultCountRef = (0, import_react46.useRef)();
  var latest = useLatestRef({
    state,
    props
  });
  var getItemNodeFromIndex = (0, import_react46.useCallback)(function(index2) {
    return itemRefs.current[elementIds.getItemId(index2)];
  }, [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react46.useEffect)(function() {
    var focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  (0, import_react46.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, function() {
    dispatch({
      type: InputBlur,
      selectItem: false
    });
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getInputProps", "getComboboxProps", "getMenuProps");
  (0, import_react46.useEffect)(function() {
    isInitialMountRef.current = false;
  }, []);
  (0, import_react46.useEffect)(function() {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  var inputKeyDownHandlers = (0, import_react46.useMemo)(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowDown,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowUp,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },
      Home: function Home(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownHome,
          getItemNodeFromIndex
        });
      },
      End: function End(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnd,
          getItemNodeFromIndex
        });
      },
      Escape: function Escape() {
        var latestState = latest.current.state;
        if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
          dispatch({
            type: InputKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        var latestState = latest.current.state;
        if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnter,
          getItemNodeFromIndex
        });
      }
    };
  }, [dispatch, latest, getItemNodeFromIndex]);
  var getLabelProps = (0, import_react46.useCallback)(function(labelProps) {
    return _extends({
      id: elementIds.labelId,
      htmlFor: elementIds.inputId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0, import_react46.useCallback)(function(_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, function() {
      dispatch({
        type: MenuMouseLeave
      });
    }), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getItemProps = (0, import_react46.useCallback)(function(_temp3) {
    var _extends3, _ref4;
    var _ref3 = _temp3 === void 0 ? {} : _temp3, item = _ref3.item, index2 = _ref3.index, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onMouseMove = _ref3.onMouseMove, onClick = _ref3.onClick;
    _ref3.onPress;
    var rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$1);
    var _latest$current = latest.current, latestProps = _latest$current.props, latestState = _latest$current.state;
    var itemIndex = getItemIndex(index2, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    var onSelectKey = "onClick";
    var customClickHandler = onClick;
    var itemHandleMouseMove = function itemHandleMouseMove2() {
      if (index2 === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index: index2
      });
    };
    var itemHandleClick = function itemHandleClick2() {
      dispatch({
        type: ItemClick,
        index: index2
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
      }
    }), _extends3.role = "option", _extends3["aria-selected"] = "" + (itemIndex === latestState.highlightedIndex), _extends3.id = elementIds.getItemId(itemIndex), _extends3), !rest.disabled && (_ref4 = {
      onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove)
    }, _ref4[onSelectKey] = callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), rest);
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  var getToggleButtonProps = (0, import_react46.useCallback)(function(_temp4) {
    var _extends4;
    var _ref5 = _temp4 === void 0 ? {} : _temp4, onClick = _ref5.onClick;
    _ref5.onPress;
    var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, rest = _objectWithoutPropertiesLoose(_ref5, _excluded3);
    var toggleButtonHandleClick = function toggleButtonHandleClick2() {
      dispatch({
        type: ToggleButtonClick
      });
      if (!latest.current.state.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    return _extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function(toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && _extends({}, {
      onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
    }), rest);
  }, [dispatch, latest, elementIds]);
  var getInputProps = (0, import_react46.useCallback)(function(_temp5, _temp6) {
    var _extends5;
    var _ref6 = _temp5 === void 0 ? {} : _temp5, onKeyDown = _ref6.onKeyDown, onChange = _ref6.onChange, onInput = _ref6.onInput, onBlur = _ref6.onBlur;
    _ref6.onChangeText;
    var _ref6$refKey = _ref6.refKey, refKey = _ref6$refKey === void 0 ? "ref" : _ref6$refKey, ref = _ref6.ref, rest = _objectWithoutPropertiesLoose(_ref6, _excluded4);
    var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$suppressRefErro = _ref7.suppressRefError, suppressRefError = _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;
    setGetterPropCallInfo("getInputProps", suppressRefError, refKey, inputRef);
    var latestState = latest.current.state;
    var inputHandleKeyDown = function inputHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    var inputHandleChange = function inputHandleChange2(event) {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    var inputHandleBlur = function inputHandleBlur2() {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: InputBlur,
          selectItem: true
        });
      }
    };
    var onChangeKey = "onChange";
    var eventHandlers = {};
    if (!rest.disabled) {
      var _eventHandlers;
      eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers);
    }
    return _extends((_extends5 = {}, _extends5[refKey] = handleRefs(ref, function(inputNode) {
      inputRef.current = inputNode;
    }), _extends5.id = elementIds.inputId, _extends5["aria-autocomplete"] = "list", _extends5["aria-controls"] = elementIds.menuId, _extends5), latestState.isOpen && latestState.highlightedIndex > -1 && {
      "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
    }, {
      "aria-labelledby": elementIds.labelId,
      autoComplete: "off",
      value: latestState.inputValue
    }, eventHandlers, rest);
  }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
  var getComboboxProps = (0, import_react46.useCallback)(function(_temp7, _temp8) {
    var _extends6;
    var _ref8 = _temp7 === void 0 ? {} : _temp7, _ref8$refKey = _ref8.refKey, refKey = _ref8$refKey === void 0 ? "ref" : _ref8$refKey, ref = _ref8.ref, rest = _objectWithoutPropertiesLoose(_ref8, _excluded5);
    var _ref9 = _temp8 === void 0 ? {} : _temp8, _ref9$suppressRefErro = _ref9.suppressRefError, suppressRefError = _ref9$suppressRefErro === void 0 ? false : _ref9$suppressRefErro;
    setGetterPropCallInfo("getComboboxProps", suppressRefError, refKey, comboboxRef);
    return _extends((_extends6 = {}, _extends6[refKey] = handleRefs(ref, function(comboboxNode) {
      comboboxRef.current = comboboxNode;
    }), _extends6.role = "combobox", _extends6["aria-haspopup"] = "listbox", _extends6["aria-owns"] = elementIds.menuId, _extends6["aria-expanded"] = latest.current.state.isOpen, _extends6), rest);
  }, [latest, setGetterPropCallInfo, elementIds]);
  var toggleMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  var closeMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  var openMenu = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  var setHighlightedIndex = (0, import_react46.useCallback)(function(newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0, import_react46.useCallback)(function(newSelectedItem) {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var setInputValue = (0, import_react46.useCallback)(function(newInputValue) {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var reset = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionReset$1
    });
  }, [dispatch]);
  return {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    setInputValue,
    selectItem,
    reset,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var defaultStateValues = {
  activeIndex: -1,
  selectedItems: []
};
function getInitialValue(props, propKey) {
  return getInitialValue$1(props, propKey, defaultStateValues);
}
function getDefaultValue(props, propKey) {
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState(props) {
  var activeIndex = getInitialValue(props, "activeIndex");
  var selectedItems = getInitialValue(props, "selectedItems");
  return {
    activeIndex,
    selectedItems
  };
}
function isKeyDownOperationPermitted(event) {
  if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  var element = event.target;
  if (element instanceof HTMLInputElement && element.value !== "" && (element.selectionStart !== 0 || element.selectionEnd !== 0)) {
    return false;
  }
  return true;
}
function getA11yRemovalMessage(selectionParameters) {
  var removedSelectedItem = selectionParameters.removedSelectedItem, itemToStringLocal = selectionParameters.itemToString;
  return itemToStringLocal(removedSelectedItem) + " has been removed.";
}
var propTypes = {
  selectedItems: import_prop_types.default.array,
  initialSelectedItems: import_prop_types.default.array,
  defaultSelectedItems: import_prop_types.default.array,
  itemToString: import_prop_types.default.func,
  getA11yRemovalMessage: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  activeIndex: import_prop_types.default.number,
  initialActiveIndex: import_prop_types.default.number,
  defaultActiveIndex: import_prop_types.default.number,
  onActiveIndexChange: import_prop_types.default.func,
  onSelectedItemsChange: import_prop_types.default.func,
  keyNavigationNext: import_prop_types.default.string,
  keyNavigationPrevious: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
var defaultProps = {
  itemToString: defaultProps$3.itemToString,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  getA11yRemovalMessage,
  keyNavigationNext: "ArrowRight",
  keyNavigationPrevious: "ArrowLeft"
};
var validatePropTypes = noop;
if (true) {
  validatePropTypes = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes, options, "prop", caller.name);
  };
}
var SelectedItemClick = true ? "__selected_item_click__" : 0;
var SelectedItemKeyDownDelete = true ? "__selected_item_keydown_delete__" : 1;
var SelectedItemKeyDownBackspace = true ? "__selected_item_keydown_backspace__" : 2;
var SelectedItemKeyDownNavigationNext = true ? "__selected_item_keydown_navigation_next__" : 3;
var SelectedItemKeyDownNavigationPrevious = true ? "__selected_item_keydown_navigation_previous__" : 4;
var DropdownKeyDownNavigationPrevious = true ? "__dropdown_keydown_navigation_previous__" : 5;
var DropdownKeyDownBackspace = true ? "__dropdown_keydown_backspace__" : 6;
var DropdownClick = true ? "__dropdown_click__" : 7;
var FunctionAddSelectedItem = true ? "__function_add_selected_item__" : 8;
var FunctionRemoveSelectedItem = true ? "__function_remove_selected_item__" : 9;
var FunctionSetSelectedItems = true ? "__function_set_selected_items__" : 10;
var FunctionSetActiveIndex = true ? "__function_set_active_index__" : 11;
var FunctionReset = true ? "__function_reset__" : 12;
var stateChangeTypes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  SelectedItemClick,
  SelectedItemKeyDownDelete,
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownNavigationNext,
  SelectedItemKeyDownNavigationPrevious,
  DropdownKeyDownNavigationPrevious,
  DropdownKeyDownBackspace,
  DropdownClick,
  FunctionAddSelectedItem,
  FunctionRemoveSelectedItem,
  FunctionSetSelectedItems,
  FunctionSetActiveIndex,
  FunctionReset
});
function downshiftMultipleSelectionReducer(state, action) {
  var type = action.type, index2 = action.index, props = action.props, selectedItem = action.selectedItem;
  var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
  var changes;
  switch (type) {
    case SelectedItemClick:
      changes = {
        activeIndex: index2
      };
      break;
    case SelectedItemKeyDownNavigationPrevious:
      changes = {
        activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
      };
      break;
    case SelectedItemKeyDownNavigationNext:
      changes = {
        activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
      };
      break;
    case SelectedItemKeyDownBackspace:
    case SelectedItemKeyDownDelete: {
      var newActiveIndex = activeIndex;
      if (selectedItems.length === 1) {
        newActiveIndex = -1;
      } else if (activeIndex === selectedItems.length - 1) {
        newActiveIndex = selectedItems.length - 2;
      }
      changes = _extends({
        selectedItems: [].concat(selectedItems.slice(0, activeIndex), selectedItems.slice(activeIndex + 1))
      }, {
        activeIndex: newActiveIndex
      });
      break;
    }
    case DropdownKeyDownNavigationPrevious:
      changes = {
        activeIndex: selectedItems.length - 1
      };
      break;
    case DropdownKeyDownBackspace:
      changes = {
        selectedItems: selectedItems.slice(0, selectedItems.length - 1)
      };
      break;
    case FunctionAddSelectedItem:
      changes = {
        selectedItems: [].concat(selectedItems, [selectedItem])
      };
      break;
    case DropdownClick:
      changes = {
        activeIndex: -1
      };
      break;
    case FunctionRemoveSelectedItem: {
      var _newActiveIndex = activeIndex;
      var selectedItemIndex = selectedItems.indexOf(selectedItem);
      if (selectedItems.length === 1) {
        _newActiveIndex = -1;
      } else if (selectedItemIndex === selectedItems.length - 1) {
        _newActiveIndex = selectedItems.length - 2;
      }
      changes = _extends({
        selectedItems: [].concat(selectedItems.slice(0, selectedItemIndex), selectedItems.slice(selectedItemIndex + 1))
      }, {
        activeIndex: _newActiveIndex
      });
      break;
    }
    case FunctionSetSelectedItems: {
      var newSelectedItems = action.selectedItems;
      changes = {
        selectedItems: newSelectedItems
      };
      break;
    }
    case FunctionSetActiveIndex: {
      var _newActiveIndex2 = action.activeIndex;
      changes = {
        activeIndex: _newActiveIndex2
      };
      break;
    }
    case FunctionReset:
      changes = {
        activeIndex: getDefaultValue(props, "activeIndex"),
        selectedItems: getDefaultValue(props, "selectedItems")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
var _excluded = ["refKey", "ref", "onClick", "onKeyDown", "selectedItem", "index"];
var _excluded2 = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyAction"];
useMultipleSelection.stateChangeTypes = stateChangeTypes;
function useMultipleSelection(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes(userProps, useMultipleSelection);
  var props = _extends({}, defaultProps, userProps);
  var getA11yRemovalMessage2 = props.getA11yRemovalMessage, itemToString2 = props.itemToString, environment = props.environment, keyNavigationNext = props.keyNavigationNext, keyNavigationPrevious = props.keyNavigationPrevious;
  var _useControlledReducer = useControlledReducer$1(downshiftMultipleSelectionReducer, getInitialState(props), props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
  var isInitialMountRef = (0, import_react46.useRef)(true);
  var dropdownRef = (0, import_react46.useRef)(null);
  var previousSelectedItemsRef = (0, import_react46.useRef)(selectedItems);
  var selectedItemRefs = (0, import_react46.useRef)();
  selectedItemRefs.current = [];
  var latest = useLatestRef({
    state,
    props
  });
  (0, import_react46.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    if (selectedItems.length < previousSelectedItemsRef.current.length) {
      var removedSelectedItem = previousSelectedItemsRef.current.find(function(item) {
        return selectedItems.indexOf(item) < 0;
      });
      setStatus(getA11yRemovalMessage2({
        itemToString: itemToString2,
        resultCount: selectedItems.length,
        removedSelectedItem,
        activeIndex,
        activeSelectedItem: selectedItems[activeIndex]
      }), environment.document);
    }
    previousSelectedItemsRef.current = selectedItems;
  }, [selectedItems.length]);
  (0, import_react46.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    if (activeIndex === -1 && dropdownRef.current) {
      dropdownRef.current.focus();
    } else if (selectedItemRefs.current[activeIndex]) {
      selectedItemRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getDropdownProps");
  (0, import_react46.useEffect)(function() {
    isInitialMountRef.current = false;
  }, []);
  var selectedItemKeyDownHandlers = (0, import_react46.useMemo)(function() {
    var _ref;
    return _ref = {}, _ref[keyNavigationPrevious] = function() {
      dispatch({
        type: SelectedItemKeyDownNavigationPrevious
      });
    }, _ref[keyNavigationNext] = function() {
      dispatch({
        type: SelectedItemKeyDownNavigationNext
      });
    }, _ref.Delete = function Delete() {
      dispatch({
        type: SelectedItemKeyDownDelete
      });
    }, _ref.Backspace = function Backspace() {
      dispatch({
        type: SelectedItemKeyDownBackspace
      });
    }, _ref;
  }, [dispatch, keyNavigationNext, keyNavigationPrevious]);
  var dropdownKeyDownHandlers = (0, import_react46.useMemo)(function() {
    var _ref2;
    return _ref2 = {}, _ref2[keyNavigationPrevious] = function(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownNavigationPrevious
        });
      }
    }, _ref2.Backspace = function Backspace(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownBackspace
        });
      }
    }, _ref2;
  }, [dispatch, keyNavigationPrevious]);
  var getSelectedItemProps = (0, import_react46.useCallback)(function(_temp) {
    var _extends2;
    var _ref3 = _temp === void 0 ? {} : _temp, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onClick = _ref3.onClick, onKeyDown = _ref3.onKeyDown, selectedItem = _ref3.selectedItem, index2 = _ref3.index, rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
    var latestState = latest.current.state;
    var itemIndex = getItemIndex(index2, selectedItem, latestState.selectedItems);
    if (itemIndex < 0) {
      throw new Error("Pass either selectedItem or index in getSelectedItemProps!");
    }
    var selectedItemHandleClick = function selectedItemHandleClick2() {
      dispatch({
        type: SelectedItemClick,
        index: index2
      });
    };
    var selectedItemHandleKeyDown = function selectedItemHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && selectedItemKeyDownHandlers[key]) {
        selectedItemKeyDownHandlers[key](event);
      }
    };
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(selectedItemNode) {
      if (selectedItemNode) {
        selectedItemRefs.current.push(selectedItemNode);
      }
    }), _extends2.tabIndex = index2 === latestState.activeIndex ? 0 : -1, _extends2.onClick = callAllEventHandlers(onClick, selectedItemHandleClick), _extends2.onKeyDown = callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown), _extends2), rest);
  }, [dispatch, latest, selectedItemKeyDownHandlers]);
  var getDropdownProps = (0, import_react46.useCallback)(function(_temp2, _temp3) {
    var _extends3;
    var _ref4 = _temp2 === void 0 ? {} : _temp2, _ref4$refKey = _ref4.refKey, refKey = _ref4$refKey === void 0 ? "ref" : _ref4$refKey, ref = _ref4.ref, onKeyDown = _ref4.onKeyDown, onClick = _ref4.onClick, _ref4$preventKeyActio = _ref4.preventKeyAction, preventKeyAction = _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio, rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);
    var _ref5 = _temp3 === void 0 ? {} : _temp3, _ref5$suppressRefErro = _ref5.suppressRefError, suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
    setGetterPropCallInfo("getDropdownProps", suppressRefError, refKey, dropdownRef);
    var dropdownHandleKeyDown = function dropdownHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && dropdownKeyDownHandlers[key]) {
        dropdownKeyDownHandlers[key](event);
      }
    };
    var dropdownHandleClick = function dropdownHandleClick2() {
      dispatch({
        type: DropdownClick
      });
    };
    return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(dropdownNode) {
      if (dropdownNode) {
        dropdownRef.current = dropdownNode;
      }
    }), _extends3), !preventKeyAction && {
      onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
      onClick: callAllEventHandlers(onClick, dropdownHandleClick)
    }, rest);
  }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]);
  var addSelectedItem = (0, import_react46.useCallback)(function(selectedItem) {
    dispatch({
      type: FunctionAddSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  var removeSelectedItem = (0, import_react46.useCallback)(function(selectedItem) {
    dispatch({
      type: FunctionRemoveSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  var setSelectedItems = (0, import_react46.useCallback)(function(newSelectedItems) {
    dispatch({
      type: FunctionSetSelectedItems,
      selectedItems: newSelectedItems
    });
  }, [dispatch]);
  var setActiveIndex = (0, import_react46.useCallback)(function(newActiveIndex) {
    dispatch({
      type: FunctionSetActiveIndex,
      activeIndex: newActiveIndex
    });
  }, [dispatch]);
  var reset = (0, import_react46.useCallback)(function() {
    dispatch({
      type: FunctionReset
    });
  }, [dispatch]);
  return {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setSelectedItems,
    setActiveIndex,
    reset,
    selectedItems,
    activeIndex
  };
}

// app/utilities/search.ts
init_react();
var import_boxed = __toESM(require_Boxed());
function getStringSlices(stringValue, matchingIndices, windowSize) {
  const slices = [];
  const addSlice = (isMatch, slice) => {
    if (slice.length > 0) {
      slices.push({ isMatch, slice });
    }
  };
  const addEllipsis = () => {
    addSlice(false, "\u2026");
  };
  const calculateWindow = () => {
    if (stringValue.length <= windowSize) {
      return { start: 0, end: stringValue.length };
    }
    const largestMatch = matchingIndices.reduce((largestMatch2, match2) => {
      if (match2.end - match2.start > largestMatch2.end - largestMatch2.start) {
        return match2;
      }
      return largestMatch2;
    }, { start: 0, end: 0 });
    const largestMatchLength = largestMatch.end - largestMatch.start;
    const start = largestMatch.start - Math.floor(windowSize / 2 - largestMatchLength / 2);
    const end = largestMatch.end + Math.floor(windowSize / 2 - largestMatchLength / 2);
    return {
      start: Math.max(start, 0),
      end: Math.min(end, stringValue.length)
    };
  };
  const window2 = calculateWindow();
  let currentIndex = window2.start;
  if (window2.start > 0) {
    addEllipsis();
  }
  for (const { start, end } of matchingIndices) {
    if (start < window2.start && end < window2.start) {
      continue;
    } else if (start > window2.end) {
      continue;
    } else if (start < window2.start && end > window2.start) {
      addSlice(true, stringValue.slice(window2.start, end));
      currentIndex = end;
    } else if (start >= window2.start && end <= window2.end) {
      if (start > 0) {
        addSlice(false, stringValue.slice(currentIndex, start));
      }
      addSlice(true, stringValue.slice(start, end));
      currentIndex = end;
    }
  }
  addSlice(false, stringValue.slice(currentIndex, window2.end).trimEnd());
  if (window2.end < stringValue.length) {
    addEllipsis();
  }
  return slices;
}
function getComponentSlices(path, matchingIndices, maxWeight) {
  const calculateWeight = (pathSlices) => {
    let weight2 = 0;
    for (const slice of pathSlices) {
      weight2 += calculateSliceWeight(slice);
    }
    return weight2;
  };
  const calculateSliceWeight = (slice) => {
    if (slice.type === "component") {
      return slice.slice.slice.length;
    } else if (slice.type === "ellipsis") {
      return 2;
    } else {
      return 8;
    }
  };
  const calculateLongestMatch = (componentSlices) => {
    return componentSlices.reduce((longestMatch, slice) => slice.slice.isMatch ? Math.max(longestMatch, slice.slice.slice.length) : longestMatch, 0);
  };
  const addEllipsisToSlices = (slices2, mostImportantComponentIndex) => {
    const combineAdjacentEllipsis = (toCombine) => {
      const combined = [];
      let inEllipsis = false;
      for (let i2 = 0; i2 < toCombine.length; i2++) {
        const slice = toCombine[i2];
        if (slice.type === "ellipsis") {
          if (!inEllipsis) {
            inEllipsis = true;
            combined.push(slice);
          }
        }
        if (slice.type === "join") {
          if (!inEllipsis) {
            combined.push(slice);
          }
        }
        if (slice.type === "component") {
          if (inEllipsis) {
            combined.push({ type: "join" });
            inEllipsis = false;
          }
          combined.push(slice);
        }
      }
      return combined;
    };
    const replaceComponentIndexWithEllipsis = (ellipsisComponentIndex) => {
      const ellipsisSliceIndices = slices2.map((slice, index2) => [slice, index2]).filter(([slice, index2]) => slice.type === "component" && slice.componentIndex === ellipsisComponentIndex).map(([, index2]) => index2);
      const newEllipsis = slices2.map((slice, index2) => {
        if (ellipsisSliceIndices.includes(index2)) {
          return {
            type: "ellipsis"
          };
        } else {
          return slice;
        }
      });
      return combineAdjacentEllipsis(newEllipsis);
    };
    const componentSlices = import_boxed.Array.keepMap(slices2, (slice) => slice.type === "component" ? slice : null);
    const componentIndexes = uniq_default(componentSlices.map((slice) => slice.componentIndex));
    const ellipsisIndex = slices2.findIndex((slice) => slice.type === "ellipsis");
    if (ellipsisIndex === -1) {
      let ellipsisComponentIndex = 0;
      if (mostImportantComponentIndex === 0) {
        ellipsisComponentIndex = componentIndexes[componentIndexes.length - 2];
      } else if (mostImportantComponentIndex === componentIndexes.length - 1) {
        ellipsisComponentIndex = componentIndexes[1];
      } else {
        const halfWay = Math.floor(componentIndexes.length / 2);
        if (mostImportantComponentIndex < halfWay) {
          ellipsisComponentIndex = componentIndexes[halfWay + 1];
        }
        if (mostImportantComponentIndex > halfWay) {
          ellipsisComponentIndex = componentIndexes[halfWay - 1];
        }
        if (mostImportantComponentIndex === halfWay) {
          ellipsisComponentIndex = componentIndexes[1];
        }
      }
      return replaceComponentIndexWithEllipsis(ellipsisComponentIndex);
    } else {
      const nearestBefore = import_boxed.Array.keepMap(slices2.slice(0, ellipsisIndex).reverse(), (slice) => slice.type === "component" ? slice : null)[0];
      const nearestAfter = import_boxed.Array.keepMap(slices2.slice(ellipsisIndex + 1), (slice) => slice.type === "component" ? slice : null)[0];
      if (nearestBefore.componentIndex !== 0 && nearestBefore.componentIndex !== mostImportantComponentIndex) {
        return replaceComponentIndexWithEllipsis(nearestBefore.componentIndex);
      } else if (nearestAfter.componentIndex !== 0 && nearestAfter.componentIndex !== mostImportantComponentIndex) {
        return replaceComponentIndexWithEllipsis(nearestAfter.componentIndex);
      }
    }
    return slices2;
  };
  let slices = createComponentSlices(path, matchingIndices);
  let weight = calculateWeight(slices);
  while (weight > maxWeight) {
    const componentSlices = import_boxed.Array.keepMap(slices, (slice) => slice.type === "component" ? slice : null);
    const groupByComponentIndex = groupBy_default(componentSlices, (slice) => slice.componentIndex);
    const sortedByLongestMatch = import_boxed.Dict.entries(groupByComponentIndex).sort(([, componentSlicesA], [, componentSlicesB]) => {
      if (calculateLongestMatch(componentSlicesA) > calculateLongestMatch(componentSlicesB)) {
        return -1;
      }
      if (calculateLongestMatch(componentSlicesB) > calculateLongestMatch(componentSlicesA)) {
        return 1;
      }
      return 0;
    });
    const mostImportantComponentIndex = Number(sortedByLongestMatch[0][0]);
    slices = addEllipsisToSlices(slices, mostImportantComponentIndex);
    const newWeight = calculateWeight(slices);
    if (newWeight === weight) {
      break;
    }
    weight = newWeight;
  }
  return slices;
}
function createComponentSlices(path, matchingIndices) {
  const slices = [];
  const addComponent = (slice, componentIndex) => {
    slices.push({ type: "component", componentIndex, slice });
  };
  const addJoin = () => {
    slices.push({ type: "join" });
  };
  const addEllipsis = () => {
    slices.push({ type: "ellipsis" });
  };
  const components = path.split(".");
  let currentIndex = 0;
  let currentComponentIndex = 0;
  for (const component of components) {
    if (currentComponentIndex !== 0) {
      currentIndex += 1;
    }
    const endIndex = currentIndex + component.length;
    const intersectingMatches = matchingIndices.filter(({ start, end }) => currentIndex >= start && currentIndex <= end || endIndex >= start && endIndex <= end || start >= currentIndex && end <= endIndex).map(({ start, end }) => ({
      start: Math.max(start - currentIndex, 0),
      end: end - currentIndex
    }));
    const stringSlices = getStringSlices(component, intersectingMatches, component.length + 1);
    for (const stringSlice of stringSlices) {
      addComponent(stringSlice, currentComponentIndex);
    }
    if (currentComponentIndex + 1 < components.length) {
      addJoin();
    }
    currentComponentIndex += 1;
    currentIndex = endIndex;
  }
  return slices;
}

// app/components/SearchPalette.tsx
var import_react47 = __toESM(require_react());
var import_path8 = __toESM(require_lib());
function SearchPalette({
  onSelect,
  onClose
}) {
  var _a, _b;
  const searchState = useJsonSearchState();
  const searchApi = useJsonSearchApi();
  useHotkeys("esc", (e2) => {
    e2.preventDefault();
    searchApi.reset();
    onClose == null ? void 0 : onClose();
  }, [onClose]);
  const listRef = (0, import_react47.useRef)(null);
  const rowVirtualizer = useVirtual({
    size: ((_a = searchState.results) != null ? _a : []).length,
    parentRef: listRef,
    estimateSize: (0, import_react47.useCallback)(() => 70, []),
    overscan: 6
  });
  function comboboxReducer(state, actionAndChanges) {
    const { changes, ...action } = actionAndChanges;
    switch (action.type) {
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter: {
        return {
          ...changes,
          inputValue: state.inputValue
        };
      }
      default:
        return changes;
    }
  }
  const cb2 = useCombobox({
    items: (_b = searchState.results) != null ? _b : [],
    stateReducer: comboboxReducer,
    circularNavigation: false,
    scrollIntoView: () => {
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect == null ? void 0 : onSelect(selectedItem.item);
        searchApi.reset();
      }
    },
    onHighlightedIndexChange: ({ highlightedIndex }) => highlightedIndex && rowVirtualizer.scrollToIndex(highlightedIndex),
    onInputValueChange: ({ inputValue }) => inputValue ? searchApi.search(inputValue) : searchApi.reset()
  });
  const handleInputKeyDown = (0, import_react47.useCallback)((e2) => {
    if (e2.key === "Escape" && onClose && cb2.inputValue.length === 0) {
      searchApi.reset();
      onClose == null ? void 0 : onClose();
    }
  }, [onClose, cb2.inputValue]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ...cb2.getComboboxProps(),
    className: "max-h-[60vh] px-4 pt-4 overflow-hidden"
  }, /* @__PURE__ */ React.createElement("label", {
    ...cb2.getLabelProps(),
    className: "relative text-slate-400 focus-within:text-slate-600 block"
  }, /* @__PURE__ */ React.createElement(SearchIcon_default, {
    className: "absolute w-7 h-7 top-1/2 transform -translate-y-1/2 left-3 text-slate-700 transition dark:text-white pointer-events-none"
  }), /* @__PURE__ */ React.createElement("input", {
    ...cb2.getInputProps({ onKeyDown: handleInputKeyDown }),
    type: "text",
    spellCheck: "false",
    placeholder: "Search the JSON\u2026",
    className: "w-full pl-12 pr-4 py-4 rounded-sm text-slate-900 bg-slate-100 text-2xl caret-indigo-700 border-indigo-700 transition dark:text-white dark:bg-slate-900 focus:outline-none focus:ring focus:ring-indigo-700"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mt-4 mb-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "results flex"
  }, searchState.status !== "idle" && (!searchState.results || searchState.results.length === 0) && /* @__PURE__ */ React.createElement("div", {
    className: "results-loading flex"
  }, /* @__PURE__ */ React.createElement(LoadingIcon, {
    className: "animate-spin h-5 w-5 mr-1"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Loading\u2026")), searchState.results && searchState.results.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "results-returned"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, searchState.results.length === 1 ? "1 result" : `${searchState.results.length} results`)), searchState.status === "idle" && searchState.query && searchState.query.length > 1 && (!searchState.results || searchState.results.length === 0) && /* @__PURE__ */ React.createElement("div", {
    className: "results-none flex"
  }, /* @__PURE__ */ React.createElement(ExclamationIcon_default, {
    className: "h-5 w-5 mr-1 text-white"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, 'No results for "', cb2.inputValue, '"')))), /* @__PURE__ */ React.createElement("ul", {
    ...cb2.getMenuProps({ ref: listRef }),
    className: "w-full max-h-[calc(60vh-120px)] overflow-y-auto relative"
  }, /* @__PURE__ */ React.createElement("li", {
    key: "total-size",
    style: { height: rowVirtualizer.totalSize },
    className: "mb-[1rem]"
  }), rowVirtualizer.virtualItems.map((virtualRow) => {
    var _a2;
    const result = ((_a2 = searchState.results) != null ? _a2 : [])[virtualRow.index];
    return /* @__PURE__ */ React.createElement(SearchItem, {
      key: result.item.toString(),
      itemProps: cb2.getItemProps({
        item: result,
        index: virtualRow.index,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: virtualRow.size,
          transform: `translateY(${virtualRow.start}px)`
        }
      }),
      result,
      isHighlighted: virtualRow.index === cb2.highlightedIndex
    });
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center w-full gap-4 px-3 py-2 border-t-[1px] bg-slate-100 border-slate-200 rounded-br-lg rounded-bl-lg transition dark:bg-slate-900 dark:border-slate-700"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1"
  }, /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-4 h-4 text-sm text-slate-900 bg-slate-300 transition duration-75 group-hover:bg-slate-100 dark:bg-slate-500 dark:group-hover:bg-slate-600"
  }, "\u23CE"), /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-700 dakr:text-slate-500"
  }, "to select")), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1"
  }, /* @__PURE__ */ React.createElement(ArrowKeysUpDownIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-700 dakr:text-slate-500"
  }, "to navigate")), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1"
  }, /* @__PURE__ */ React.createElement(EscapeKeyIcon, {
    className: "transition text-slate-300 dark:text-slate-500"
  }), /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-700 dakr:text-slate-500"
  }, "to close"))));
}
function SearchItem({
  itemProps,
  result,
  isHighlighted
}) {
  const heroPath = new import_path8.JSONHeroPath(result.item);
  const [json] = useJson();
  const itemValue = heroPath.first(json);
  const ItemIcon = iconForValue(itemValue);
  return /* @__PURE__ */ React.createElement("li", {
    ...itemProps,
    className: classnames("flex w-full hover:cursor-pointer")
  }, /* @__PURE__ */ React.createElement("div", {
    className: classnames("w-full h-[calc(100%-4px)] mb-2 rounded-sm group", isHighlighted ? "bg-indigo-700" : "bg-slate-100 dark:bg-slate-900")
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center w-full py-2 pl-4 pr-3"
  }, /* @__PURE__ */ React.createElement(ItemIcon, {
    className: classnames("h-6 w-6", isHighlighted ? "text-white" : "text-slate-500 dark:text-slate-400")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col ml-3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex w-full items-baseline"
  }, /* @__PURE__ */ React.createElement(SearchPathResult, {
    path: heroPath,
    searchResult: result,
    isHighlighted
  })), /* @__PURE__ */ React.createElement("div", {
    className: "key-value flex justify-between"
  }, result.score.rawValue && /* @__PURE__ */ React.createElement(SearchResultValue, {
    isHighlighted,
    stringValue: result.score.rawValue,
    matches: result.score.rawValueMatch
  }), result.score.formattedValue && result.score.formattedValue !== result.score.rawValue && /* @__PURE__ */ React.createElement(SearchResultValue, {
    isHighlighted,
    stringValue: result.score.formattedValue,
    matches: result.score.formattedValueMatch
  }))))));
}
function SearchPathResult({
  path,
  searchResult,
  isHighlighted,
  maxWeight = 90
}) {
  const description = searchResult.score.description;
  const label = searchResult.score.label;
  const labelMatches = searchResult.score.labelMatch;
  const descriptionMatches = searchResult.score.descriptionMatch;
  const descriptionSlices = getComponentSlices(description != null ? description : "", (descriptionMatches != null ? descriptionMatches : []).map(({ start, end }) => ({
    start,
    end: end - 1
  })), maxWeight);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, label && /* @__PURE__ */ React.createElement(SearchResultValue, {
    isHighlighted,
    stringValue: label,
    matches: labelMatches,
    textSize: "text-lg",
    className: classnames("mr-3 text-lg", isHighlighted ? `text-white` : "text-slate-900 dark:text-white"),
    key: "label"
  }), descriptionSlices.map((slice, i2) => slice.type === "component" ? /* @__PURE__ */ React.createElement("span", {
    key: i2,
    className: slice.slice.isMatch ? classnames("text-base", isHighlighted ? "text-white underline underline-offset-1" : "text-indigo-600 dark:text-indigo-400") : classnames("text-base", isHighlighted ? "text-white" : "text-slate-800 dark:text-slate-400")
  }, slice.slice.slice) : slice.type === "ellipsis" ? /* @__PURE__ */ React.createElement(Body, {
    key: i2,
    className: classnames("text-base", isHighlighted ? "text-white" : "text-slate-600 dark:text-slate-400")
  }, "\u2026") : /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
    key: i2,
    className: classnames("w-3 h-3 mx-[1px] relative top-[2px]", isHighlighted ? "text-white" : "text-slate-600 dark:text-slate-400")
  })));
}
function SearchResultValue({
  isHighlighted,
  stringValue,
  matches,
  className,
  textSize
}) {
  const output = createOutputForMatch(stringValue, isHighlighted, textSize, matches);
  return /* @__PURE__ */ React.createElement(Body, {
    className: className != null ? className : classnames("mr-2", isHighlighted ? `text-white` : "text-slate-600 dark:text-slate-400")
  }, output);
}
function createOutputForMatch(stringValue, isHighlighted, textSize = "text-base", matches, maxLength = 68) {
  if (!matches || matches.length === 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, truncate_default(stringValue, { length: maxLength }));
  }
  const stringSlices = getStringSlices(stringValue, matches, maxLength);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, stringSlices.map((s3, index2) => {
    return /* @__PURE__ */ React.createElement("span", {
      key: index2,
      className: s3.isMatch ? classnames(textSize, isHighlighted ? "text-white underline underline-offset-1" : "text-indigo-600 dark:text-indigo-400") : ""
    }, s3.slice);
  }));
}

// app/components/SearchBar.tsx
var import_react48 = __toESM(require_react());
function SearchBar() {
  const [isOpen, setIsOpen] = (0, import_react48.useState)(false);
  const { goToNodeId } = useJsonColumnViewAPI();
  const searchApi = useJsonSearchApi();
  useHotkeys("cmd+k,ctrl+k", (e2) => {
    e2.preventDefault();
    setIsOpen(true);
  }, [setIsOpen]);
  return /* @__PURE__ */ React.createElement(Dialog2, {
    open: isOpen,
    onOpenChange: () => !isOpen && searchApi.reset()
  }, /* @__PURE__ */ React.createElement(DialogTrigger2, {
    className: "focus:outline-none focus-visible:outline-none",
    onClick: () => setIsOpen(true)
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-between items-center group w-44 py-[3px] rounded bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center pl-1"
  }, /* @__PURE__ */ React.createElement(SearchIcon_default, {
    className: "w-4 h-4 mr-1"
  }), /* @__PURE__ */ React.createElement(Body, null, "Search\u2026")), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-1 pr-1"
  }, /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-4 h-4 text-sm bg-slate-200 transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600"
  }, "\u2318"), /* @__PURE__ */ React.createElement(ShortcutIcon, {
    className: "w-4 h-4 text-sm bg-slate-200 transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600"
  }, "K")))), /* @__PURE__ */ React.createElement(DialogContent2, {
    onOverlayClick: () => setIsOpen(false),
    className: classnames("fixed z-50", "w-[95vw] max-w-2xl rounded-lg", "top-0 left-[50%] -translate-x-[50%]", "mt-[60px]", "bg-white border-[1px] border-slate-500 dark:border-slate-700 dark:bg-slate-800")
  }, /* @__PURE__ */ React.createElement(SearchPalette, {
    onClose: () => setIsOpen(false),
    onSelect: (entry) => {
      setIsOpen(false);
      goToNodeId(entry, "search");
    }
  })));
}

// app/components/JsonView.tsx
function JsonView({ children }) {
  return /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "path-bar-and-column-wrapper flex flex-col flex-grow overflow-x-hidden border-l-[1px] border-slate-300 transition dark:border-slate-600"
  }, /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "flex justify-between p-1 bg-slate-200 border-slate-300 border-b-[1px] transition dark:bg-slate-900 dark:border-slate-600"
  }, /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "flex-shrink-0 flex-grow-0"
  }, /* @__PURE__ */ import_react49.default.createElement(PathHistoryControls, null)), /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "flex-1 pr-2 min-w-0"
  }, /* @__PURE__ */ import_react49.default.createElement(PathBar, null)), /* @__PURE__ */ import_react49.default.createElement(SearchBar, null)), children);
}

// app/components/Primitives/PageNotFoundTitle.tsx
init_react();
var PageNotFoundTitle = ({
  className,
  children
}) => {
  return /* @__PURE__ */ React.createElement("h1", {
    className: `font-sans font-bold text-8xl ${className}`
  }, children);
};

// app/routes/j/$id.tsx
var import_toast = __toESM(require_toast());
var meta = ({
  data
}) => {
  let title = "JSON Hero";
  if (data) {
    title += ` - ${data.doc.title}`;
  }
  return {
    title,
    "og:title": title,
    robots: "noindex,nofollow"
  };
};
function JsonDocumentRoute() {
  const loaderData = useLoaderData();
  const location = useLocation();
  (0, import_react50.useEffect)(() => {
    if (loaderData.path) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [loaderData.path]);
  return /* @__PURE__ */ React.createElement(JsonDocProvider, {
    doc: loaderData.doc,
    path: loaderData.path,
    key: loaderData.doc.id,
    minimal: loaderData.minimal
  }, /* @__PURE__ */ React.createElement(JsonProvider, {
    initialJson: loaderData.json
  }, /* @__PURE__ */ React.createElement(JsonSchemaProvider, null, /* @__PURE__ */ React.createElement(JsonColumnViewProvider, null, /* @__PURE__ */ React.createElement(JsonSearchProvider, null, /* @__PURE__ */ React.createElement(JsonTreeViewProvider, {
    overscan: 25
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "block md:hidden fixed bg-black/80 h-screen w-screen z-50 text-white"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-center justify-center h-full text-center"
  }, /* @__PURE__ */ React.createElement(LargeTitle, null, "JSON Hero only works on desktop"), /* @__PURE__ */ React.createElement(LargeTitle, null, "\u{1F447}"), /* @__PURE__ */ React.createElement(Body, null, "(For now!)"), /* @__PURE__ */ React.createElement("a", {
    href: "/",
    className: "mt-8 text-white bg-lime-500 rounded-sm px-4 py-2"
  }, "Back to Home"))), /* @__PURE__ */ React.createElement("div", {
    className: "h-screen flex flex-col sm:overflow-hidden"
  }, !loaderData.minimal && /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement("div", {
    className: "bg-slate-50 flex-grow transition dark:bg-slate-900 overflow-y-auto"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "main-container flex justify-items-stretch h-full"
  }, /* @__PURE__ */ React.createElement(SideBar, null), /* @__PURE__ */ React.createElement(JsonView, null, /* @__PURE__ */ React.createElement(Outlet, null)), /* @__PURE__ */ React.createElement(Resizable, {
    isHorizontal: true,
    initialSize: 500,
    minimumSize: 280,
    maximumSize: 900
  }, /* @__PURE__ */ React.createElement("div", {
    className: "info-panel flex-grow h-full"
  }, /* @__PURE__ */ React.createElement(InfoPanel, null))))), /* @__PURE__ */ React.createElement(Footer, null)))))))));
}
function CatchBoundary() {
  const params = useParams();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-center w-screen h-screen bg-[rgb(56,52,139)]"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-2/3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-center text-lime-300"
  }, /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement(PageNotFoundTitle, {
    className: "text-center leading-tight"
  }, "404")), /* @__PURE__ */ React.createElement("div", {
    className: "text-center leading-snug text-white"
  }, /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-slate-200 mb-8"
  }, /* @__PURE__ */ React.createElement("b", null, "Sorry"), "! Something went wrong..."), /* @__PURE__ */ React.createElement(SmallSubtitle, {
    className: "text-slate-200 mb-8"
  }, "We couldn't find the page ", /* @__PURE__ */ React.createElement("b", null, "'https://jsonhero.io/j/", params.id), "'"), /* @__PURE__ */ React.createElement("a", {
    href: "/",
    className: "mx-auto w-24 bg-lime-500 text-slate-900 text-lg font-bold px-5 py-1 rounded-sm uppercase whitespace-nowrap cursor-pointer opacity-90 hover:opacity-100 transition"
  }, "HOME"))));
}
export {
  CatchBoundary,
  JsonDocumentRoute as default,
  meta
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
/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/build/routes/j/$id-VM3AVHT5.js.map
