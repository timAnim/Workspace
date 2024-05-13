var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/@jsonhero/fuzzy-json-search/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/@jsonhero/fuzzy-json-search/node_modules/lru-cache/index.js"(exports, module) {
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var hasAbortController = typeof AbortController !== "undefined";
    var AC = hasAbortController ? AbortController : Object.assign(class AbortController {
      constructor() {
        this.signal = new AC.AbortSignal();
      }
      abort() {
        this.signal.aborted = true;
      }
    }, { AbortSignal: class AbortSignal {
      constructor() {
        this.aborted = false;
      }
    } });
    var warned = /* @__PURE__ */ new Set();
    var deprecatedOption = (opt, instead) => {
      const code = `LRU_CACHE_OPTION_${opt}`;
      if (shouldWarn(code)) {
        warn(code, `${opt} option`, `options.${instead}`, LRUCache);
      }
    };
    var deprecatedMethod = (method, instead) => {
      const code = `LRU_CACHE_METHOD_${method}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get } = Object.getOwnPropertyDescriptor(prototype, method);
        warn(code, `${method} method`, `cache.${instead}()`, get);
      }
    };
    var deprecatedProperty = (field, instead) => {
      const code = `LRU_CACHE_PROPERTY_${field}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get } = Object.getOwnPropertyDescriptor(prototype, field);
        warn(code, `${field} property`, `cache.${instead}`, get);
      }
    };
    var emitWarning = (...a) => {
      typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(...a) : console.error(...a);
    };
    var shouldWarn = (code) => !warned.has(code);
    var warn = (code, what, instead, fn) => {
      warned.add(code);
      const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
      emitWarning(msg, "DeprecationWarning", code, fn);
    };
    var isPosInt = (n2) => n2 && n2 === Math.floor(n2) && n2 > 0 && isFinite(n2);
    var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    var Stack = class {
      constructor(max) {
        if (max === 0) {
          return [];
        }
        const UintArray = getUintArray(max);
        this.heap = new UintArray(max);
        this.length = 0;
      }
      push(n2) {
        this.heap[this.length++] = n2;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    var LRUCache = class {
      constructor(options = {}) {
        const {
          max = 0,
          ttl,
          ttlResolution = 1,
          ttlAutopurge,
          updateAgeOnGet,
          updateAgeOnHas,
          allowStale,
          dispose,
          disposeAfter,
          noDisposeOnSet,
          noUpdateTTL,
          maxSize = 0,
          sizeCalculation,
          fetchMethod
        } = options;
        const {
          length,
          maxAge,
          stale
        } = options instanceof LRUCache ? {} : options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.max = max;
        this.maxSize = maxSize;
        this.sizeCalculation = sizeCalculation || length;
        if (this.sizeCalculation) {
          if (!this.maxSize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        this.fetchMethod = fetchMethod || null;
        if (this.fetchMethod && typeof this.fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.keyMap = /* @__PURE__ */ new Map();
        this.keyList = new Array(max).fill(null);
        this.valList = new Array(max).fill(null);
        this.next = new UintArray(max);
        this.prev = new UintArray(max);
        this.head = 0;
        this.tail = 0;
        this.free = new Stack(max);
        this.initialFill = 1;
        this.size = 0;
        if (typeof dispose === "function") {
          this.dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.disposeAfter = disposeAfter;
          this.disposed = [];
        } else {
          this.disposeAfter = null;
          this.disposed = null;
        }
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        if (this.maxSize !== 0) {
          if (!isPosInt(this.maxSize)) {
            throw new TypeError("maxSize must be a positive integer if specified");
          }
          this.initializeSizeTracking();
        }
        this.allowStale = !!allowStale || !!stale;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || maxAge || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.initializeTTLTracking();
        }
        if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.max && !this.maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, LRUCache);
          }
        }
        if (stale) {
          deprecatedOption("stale", "allowStale");
        }
        if (maxAge) {
          deprecatedOption("maxAge", "ttl");
        }
        if (length) {
          deprecatedOption("length", "sizeCalculation");
        }
      }
      getRemainingTTL(key) {
        return this.has(key, { updateAgeOnHas: false }) ? Infinity : 0;
      }
      initializeTTLTracking() {
        this.ttls = new ZeroArray(this.max);
        this.starts = new ZeroArray(this.max);
        this.setItemTTL = (index, ttl) => {
          this.starts[index] = ttl !== 0 ? perf.now() : 0;
          this.ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t2 = setTimeout(() => {
              if (this.isStale(index)) {
                this.delete(this.keyList[index]);
              }
            }, ttl + 1);
            if (t2.unref) {
              t2.unref();
            }
          }
        };
        this.updateItemAge = (index) => {
          this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
        };
        let cachedNow = 0;
        const getNow = () => {
          const n2 = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n2;
            const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t2.unref) {
              t2.unref();
            }
          }
          return n2;
        };
        this.getRemainingTTL = (key) => {
          const index = this.keyMap.get(key);
          if (index === void 0) {
            return 0;
          }
          return this.ttls[index] === 0 || this.starts[index] === 0 ? Infinity : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
        };
        this.isStale = (index) => {
          return this.ttls[index] !== 0 && this.starts[index] !== 0 && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
        };
      }
      updateItemAge(index) {
      }
      setItemTTL(index, ttl) {
      }
      isStale(index) {
        return false;
      }
      initializeSizeTracking() {
        this.calculatedSize = 0;
        this.sizes = new ZeroArray(this.max);
        this.removeItemSize = (index) => this.calculatedSize -= this.sizes[index];
        this.requireSize = (k, v, size, sizeCalculation) => {
          if (!isPosInt(size)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size = sizeCalculation(v, k);
              if (!isPosInt(size)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer)");
            }
          }
          return size;
        };
        this.addItemSize = (index, v, k, size) => {
          this.sizes[index] = size;
          const maxSize = this.maxSize - this.sizes[index];
          while (this.calculatedSize > maxSize) {
            this.evict(true);
          }
          this.calculatedSize += this.sizes[index];
        };
        this.delete = (k) => {
          if (this.size !== 0) {
            const index = this.keyMap.get(k);
            if (index !== void 0) {
              this.calculatedSize -= this.sizes[index];
            }
          }
          return LRUCache.prototype.delete.call(this, k);
        };
      }
      removeItemSize(index) {
      }
      addItemSize(index, v, k, size) {
      }
      requireSize(k, v, size, sizeCalculation) {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize on cache");
        }
      }
      *indexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.tail; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.head) {
              break;
            } else {
              i = this.prev[i];
            }
          }
        }
      }
      *rindexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.head; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.tail) {
              break;
            } else {
              i = this.next[i];
            }
          }
        }
      }
      isValidIndex(index) {
        return this.keyMap.get(this.keyList[index]) === index;
      }
      *entries() {
        for (const i of this.indexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *rentries() {
        for (const i of this.rindexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *keys() {
        for (const i of this.indexes()) {
          yield this.keyList[i];
        }
      }
      *rkeys() {
        for (const i of this.rindexes()) {
          yield this.keyList[i];
        }
      }
      *values() {
        for (const i of this.indexes()) {
          yield this.valList[i];
        }
      }
      *rvalues() {
        for (const i of this.rindexes()) {
          yield this.valList[i];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      find(fn, getOptions = {}) {
        for (const i of this.indexes()) {
          if (fn(this.valList[i], this.keyList[i], this)) {
            return this.get(this.keyList[i], getOptions);
          }
        }
      }
      forEach(fn, thisp = this) {
        for (const i of this.indexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      rforEach(fn, thisp = this) {
        for (const i of this.rindexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      get prune() {
        deprecatedMethod("prune", "purgeStale");
        return this.purgeStale;
      }
      purgeStale() {
        let deleted = false;
        for (const i of this.rindexes({ allowStale: true })) {
          if (this.isStale(i)) {
            this.delete(this.keyList[i]);
            deleted = true;
          }
        }
        return deleted;
      }
      dump() {
        const arr = [];
        for (const i of this.indexes()) {
          const key = this.keyList[i];
          const value = this.valList[i];
          const entry = { value };
          if (this.ttls) {
            entry.ttl = this.ttls[i];
          }
          if (this.sizes) {
            entry.size = this.sizes[i];
          }
          arr.unshift([key, entry]);
        }
        return arr;
      }
      load(arr) {
        this.clear();
        for (const [key, entry] of arr) {
          this.set(key, entry.value, entry);
        }
      }
      dispose(v, k, reason) {
      }
      set(k, v, {
        ttl = this.ttl,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL
      } = {}) {
        size = this.requireSize(k, v, size, sizeCalculation);
        let index = this.size === 0 ? void 0 : this.keyMap.get(k);
        if (index === void 0) {
          index = this.newIndex();
          this.keyList[index] = k;
          this.valList[index] = v;
          this.keyMap.set(k, index);
          this.next[this.tail] = index;
          this.prev[index] = this.tail;
          this.tail = index;
          this.size++;
          this.addItemSize(index, v, k, size);
          noUpdateTTL = false;
        } else {
          const oldVal = this.valList[index];
          if (v !== oldVal) {
            if (this.isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort();
            } else {
              if (!noDisposeOnSet) {
                this.dispose(oldVal, k, "set");
                if (this.disposeAfter) {
                  this.disposed.push([oldVal, k, "set"]);
                }
              }
            }
            this.removeItemSize(index);
            this.valList[index] = v;
            this.addItemSize(index, v, k, size);
          }
          this.moveToTail(index);
        }
        if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
          this.initializeTTLTracking();
        }
        if (!noUpdateTTL) {
          this.setItemTTL(index, ttl);
        }
        if (this.disposeAfter) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return this;
      }
      newIndex() {
        if (this.size === 0) {
          return this.tail;
        }
        if (this.size === this.max && this.max !== 0) {
          return this.evict(false);
        }
        if (this.free.length !== 0) {
          return this.free.pop();
        }
        return this.initialFill++;
      }
      pop() {
        if (this.size) {
          const val = this.valList[this.head];
          this.evict(true);
          return val;
        }
      }
      evict(free) {
        const head = this.head;
        const k = this.keyList[head];
        const v = this.valList[head];
        if (this.isBackgroundFetch(v)) {
          v.__abortController.abort();
        } else {
          this.dispose(v, k, "evict");
          if (this.disposeAfter) {
            this.disposed.push([v, k, "evict"]);
          }
        }
        this.removeItemSize(head);
        if (free) {
          this.keyList[head] = null;
          this.valList[head] = null;
          this.free.push(head);
        }
        this.head = this.next[head];
        this.keyMap.delete(k);
        this.size--;
        return head;
      }
      has(k, { updateAgeOnHas = this.updateAgeOnHas } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          if (!this.isStale(index)) {
            if (updateAgeOnHas) {
              this.updateItemAge(index);
            }
            return true;
          }
        }
        return false;
      }
      peek(k, { allowStale = this.allowStale } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0 && (allowStale || !this.isStale(index))) {
          return this.valList[index];
        }
      }
      backgroundFetch(k, index, options) {
        const v = index === void 0 ? void 0 : this.valList[index];
        if (this.isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const fetchOpts = {
          signal: ac.signal,
          options
        };
        const p = Promise.resolve(this.fetchMethod(k, v, fetchOpts)).then((v2) => {
          if (!ac.signal.aborted) {
            this.set(k, v2, fetchOpts.options);
          }
          return v2;
        });
        p.__abortController = ac;
        p.__staleWhileFetching = v;
        if (index === void 0) {
          this.set(k, p, fetchOpts.options);
          index = this.keyMap.get(k);
        } else {
          this.valList[index] = p;
        }
        return p;
      }
      isBackgroundFetch(p) {
        return p && typeof p === "object" && typeof p.then === "function" && Object.prototype.hasOwnProperty.call(p, "__staleWhileFetching");
      }
      async fetch(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        ttl = this.ttl,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL
      } = {}) {
        if (!this.fetchMethod) {
          return this.get(k, { allowStale, updateAgeOnGet });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL
        };
        let index = this.keyMap.get(k);
        if (index === void 0) {
          return this.backgroundFetch(k, index, options);
        } else {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            return allowStale && v.__staleWhileFetching !== void 0 ? v.__staleWhileFetching : v;
          }
          if (!this.isStale(index)) {
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return v;
          }
          const p = this.backgroundFetch(k, index, options);
          return allowStale && p.__staleWhileFetching !== void 0 ? p.__staleWhileFetching : p;
        }
      }
      get(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet
      } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          const value = this.valList[index];
          const fetching = this.isBackgroundFetch(value);
          if (this.isStale(index)) {
            if (!fetching) {
              this.delete(k);
              return allowStale ? value : void 0;
            } else {
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (fetching) {
              return void 0;
            }
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return value;
          }
        }
      }
      connect(p, n2) {
        this.prev[n2] = p;
        this.next[p] = n2;
      }
      moveToTail(index) {
        if (index !== this.tail) {
          if (index === this.head) {
            this.head = this.next[index];
          } else {
            this.connect(this.prev[index], this.next[index]);
          }
          this.connect(this.tail, index);
          this.tail = index;
        }
      }
      get del() {
        deprecatedMethod("del", "delete");
        return this.delete;
      }
      delete(k) {
        let deleted = false;
        if (this.size !== 0) {
          const index = this.keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.size === 1) {
              this.clear();
            } else {
              this.removeItemSize(index);
              const v = this.valList[index];
              if (this.isBackgroundFetch(v)) {
                v.__abortController.abort();
              } else {
                this.dispose(v, k, "delete");
                if (this.disposeAfter) {
                  this.disposed.push([v, k, "delete"]);
                }
              }
              this.keyMap.delete(k);
              this.keyList[index] = null;
              this.valList[index] = null;
              if (index === this.tail) {
                this.tail = this.prev[index];
              } else if (index === this.head) {
                this.head = this.next[index];
              } else {
                this.next[this.prev[index]] = this.next[index];
                this.prev[this.next[index]] = this.prev[index];
              }
              this.size--;
              this.free.push(index);
            }
          }
        }
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return deleted;
      }
      clear() {
        for (const index of this.rindexes({ allowStale: true })) {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            v.__abortController.abort();
          } else {
            const k = this.keyList[index];
            this.dispose(v, k, "delete");
            if (this.disposeAfter) {
              this.disposed.push([v, k, "delete"]);
            }
          }
        }
        this.keyMap.clear();
        this.valList.fill(null);
        this.keyList.fill(null);
        if (this.ttls) {
          this.ttls.fill(0);
          this.starts.fill(0);
        }
        if (this.sizes) {
          this.sizes.fill(0);
        }
        this.head = 0;
        this.tail = 0;
        this.initialFill = 1;
        this.free.length = 0;
        this.calculatedSize = 0;
        this.size = 0;
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
      }
      get reset() {
        deprecatedMethod("reset", "clear");
        return this.clear;
      }
      get length() {
        deprecatedProperty("length", "size");
        return this.size;
      }
    };
    module.exports = LRUCache;
  }
});

// node_modules/@jsonhero/fuzzy-json-search/lib/index.js
var require_lib = __commonJS({
  "node_modules/@jsonhero/fuzzy-json-search/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LRUCache = require_lru_cache();
    function _interopDefaultLegacy(e2) {
      return e2 && typeof e2 === "object" && "default" in e2 ? e2 : { "default": e2 };
    }
    var LRUCache__default = /* @__PURE__ */ _interopDefaultLegacy(LRUCache);
    var __assign = function() {
      __assign = Object.assign || function __assign2(t2) {
        for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t2[p] = s[p];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    function startsWithIgnoreCase(str, candidate) {
      var candidateLength = candidate.length;
      if (candidate.length > str.length) {
        return false;
      }
      return compareSubstringIgnoreCase(str, candidate, 0, candidateLength) === 0;
    }
    function compareSubstringIgnoreCase(a, b, aStart, aEnd, bStart, bEnd) {
      if (aStart === void 0) {
        aStart = 0;
      }
      if (aEnd === void 0) {
        aEnd = a.length;
      }
      if (bStart === void 0) {
        bStart = 0;
      }
      if (bEnd === void 0) {
        bEnd = b.length;
      }
      for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        var codeA = a.charCodeAt(aStart);
        var codeB = b.charCodeAt(bStart);
        if (codeA === codeB) {
          continue;
        }
        if (codeA >= 128 || codeB >= 128) {
          return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
        }
        if (isLowerAsciiLetter(codeA)) {
          codeA -= 32;
        }
        if (isLowerAsciiLetter(codeB)) {
          codeB -= 32;
        }
        var diff = codeA - codeB;
        if (diff === 0) {
          continue;
        }
        return diff;
      }
      var aLen = aEnd - aStart;
      var bLen = bEnd - bStart;
      if (aLen < bLen) {
        return -1;
      } else if (aLen > bLen) {
        return 1;
      }
      return 0;
    }
    function isLowerAsciiLetter(code) {
      return code >= 97 && code <= 122;
    }
    function compareSubstring(a, b, aStart, aEnd, bStart, bEnd) {
      if (aStart === void 0) {
        aStart = 0;
      }
      if (aEnd === void 0) {
        aEnd = a.length;
      }
      if (bStart === void 0) {
        bStart = 0;
      }
      if (bEnd === void 0) {
        bEnd = b.length;
      }
      for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        var codeA = a.charCodeAt(aStart);
        var codeB = b.charCodeAt(bStart);
        if (codeA < codeB) {
          return -1;
        } else if (codeA > codeB) {
          return 1;
        }
      }
      var aLen = aEnd - aStart;
      var bLen = bEnd - bStart;
      if (aLen < bLen) {
        return -1;
      } else if (aLen > bLen) {
        return 1;
      }
      return 0;
    }
    var CharCode;
    (function(CharCode2) {
      CharCode2[CharCode2["Null"] = 0] = "Null";
      CharCode2[CharCode2["Backspace"] = 8] = "Backspace";
      CharCode2[CharCode2["Tab"] = 9] = "Tab";
      CharCode2[CharCode2["LineFeed"] = 10] = "LineFeed";
      CharCode2[CharCode2["CarriageReturn"] = 13] = "CarriageReturn";
      CharCode2[CharCode2["Space"] = 32] = "Space";
      CharCode2[CharCode2["ExclamationMark"] = 33] = "ExclamationMark";
      CharCode2[CharCode2["DoubleQuote"] = 34] = "DoubleQuote";
      CharCode2[CharCode2["Hash"] = 35] = "Hash";
      CharCode2[CharCode2["DollarSign"] = 36] = "DollarSign";
      CharCode2[CharCode2["PercentSign"] = 37] = "PercentSign";
      CharCode2[CharCode2["Ampersand"] = 38] = "Ampersand";
      CharCode2[CharCode2["SingleQuote"] = 39] = "SingleQuote";
      CharCode2[CharCode2["OpenParen"] = 40] = "OpenParen";
      CharCode2[CharCode2["CloseParen"] = 41] = "CloseParen";
      CharCode2[CharCode2["Asterisk"] = 42] = "Asterisk";
      CharCode2[CharCode2["Plus"] = 43] = "Plus";
      CharCode2[CharCode2["Comma"] = 44] = "Comma";
      CharCode2[CharCode2["Dash"] = 45] = "Dash";
      CharCode2[CharCode2["Period"] = 46] = "Period";
      CharCode2[CharCode2["Slash"] = 47] = "Slash";
      CharCode2[CharCode2["Digit0"] = 48] = "Digit0";
      CharCode2[CharCode2["Digit1"] = 49] = "Digit1";
      CharCode2[CharCode2["Digit2"] = 50] = "Digit2";
      CharCode2[CharCode2["Digit3"] = 51] = "Digit3";
      CharCode2[CharCode2["Digit4"] = 52] = "Digit4";
      CharCode2[CharCode2["Digit5"] = 53] = "Digit5";
      CharCode2[CharCode2["Digit6"] = 54] = "Digit6";
      CharCode2[CharCode2["Digit7"] = 55] = "Digit7";
      CharCode2[CharCode2["Digit8"] = 56] = "Digit8";
      CharCode2[CharCode2["Digit9"] = 57] = "Digit9";
      CharCode2[CharCode2["Colon"] = 58] = "Colon";
      CharCode2[CharCode2["Semicolon"] = 59] = "Semicolon";
      CharCode2[CharCode2["LessThan"] = 60] = "LessThan";
      CharCode2[CharCode2["Equals"] = 61] = "Equals";
      CharCode2[CharCode2["GreaterThan"] = 62] = "GreaterThan";
      CharCode2[CharCode2["QuestionMark"] = 63] = "QuestionMark";
      CharCode2[CharCode2["AtSign"] = 64] = "AtSign";
      CharCode2[CharCode2["A"] = 65] = "A";
      CharCode2[CharCode2["B"] = 66] = "B";
      CharCode2[CharCode2["C"] = 67] = "C";
      CharCode2[CharCode2["D"] = 68] = "D";
      CharCode2[CharCode2["E"] = 69] = "E";
      CharCode2[CharCode2["F"] = 70] = "F";
      CharCode2[CharCode2["G"] = 71] = "G";
      CharCode2[CharCode2["H"] = 72] = "H";
      CharCode2[CharCode2["I"] = 73] = "I";
      CharCode2[CharCode2["J"] = 74] = "J";
      CharCode2[CharCode2["K"] = 75] = "K";
      CharCode2[CharCode2["L"] = 76] = "L";
      CharCode2[CharCode2["M"] = 77] = "M";
      CharCode2[CharCode2["N"] = 78] = "N";
      CharCode2[CharCode2["O"] = 79] = "O";
      CharCode2[CharCode2["P"] = 80] = "P";
      CharCode2[CharCode2["Q"] = 81] = "Q";
      CharCode2[CharCode2["R"] = 82] = "R";
      CharCode2[CharCode2["S"] = 83] = "S";
      CharCode2[CharCode2["T"] = 84] = "T";
      CharCode2[CharCode2["U"] = 85] = "U";
      CharCode2[CharCode2["V"] = 86] = "V";
      CharCode2[CharCode2["W"] = 87] = "W";
      CharCode2[CharCode2["X"] = 88] = "X";
      CharCode2[CharCode2["Y"] = 89] = "Y";
      CharCode2[CharCode2["Z"] = 90] = "Z";
      CharCode2[CharCode2["OpenSquareBracket"] = 91] = "OpenSquareBracket";
      CharCode2[CharCode2["Backslash"] = 92] = "Backslash";
      CharCode2[CharCode2["CloseSquareBracket"] = 93] = "CloseSquareBracket";
      CharCode2[CharCode2["Caret"] = 94] = "Caret";
      CharCode2[CharCode2["Underline"] = 95] = "Underline";
      CharCode2[CharCode2["BackTick"] = 96] = "BackTick";
      CharCode2[CharCode2["a"] = 97] = "a";
      CharCode2[CharCode2["b"] = 98] = "b";
      CharCode2[CharCode2["c"] = 99] = "c";
      CharCode2[CharCode2["d"] = 100] = "d";
      CharCode2[CharCode2["e"] = 101] = "e";
      CharCode2[CharCode2["f"] = 102] = "f";
      CharCode2[CharCode2["g"] = 103] = "g";
      CharCode2[CharCode2["h"] = 104] = "h";
      CharCode2[CharCode2["i"] = 105] = "i";
      CharCode2[CharCode2["j"] = 106] = "j";
      CharCode2[CharCode2["k"] = 107] = "k";
      CharCode2[CharCode2["l"] = 108] = "l";
      CharCode2[CharCode2["m"] = 109] = "m";
      CharCode2[CharCode2["n"] = 110] = "n";
      CharCode2[CharCode2["o"] = 111] = "o";
      CharCode2[CharCode2["p"] = 112] = "p";
      CharCode2[CharCode2["q"] = 113] = "q";
      CharCode2[CharCode2["r"] = 114] = "r";
      CharCode2[CharCode2["s"] = 115] = "s";
      CharCode2[CharCode2["t"] = 116] = "t";
      CharCode2[CharCode2["u"] = 117] = "u";
      CharCode2[CharCode2["v"] = 118] = "v";
      CharCode2[CharCode2["w"] = 119] = "w";
      CharCode2[CharCode2["x"] = 120] = "x";
      CharCode2[CharCode2["y"] = 121] = "y";
      CharCode2[CharCode2["z"] = 122] = "z";
      CharCode2[CharCode2["OpenCurlyBrace"] = 123] = "OpenCurlyBrace";
      CharCode2[CharCode2["Pipe"] = 124] = "Pipe";
      CharCode2[CharCode2["CloseCurlyBrace"] = 125] = "CloseCurlyBrace";
      CharCode2[CharCode2["Tilde"] = 126] = "Tilde";
      CharCode2[CharCode2["U_Combining_Grave_Accent"] = 768] = "U_Combining_Grave_Accent";
      CharCode2[CharCode2["U_Combining_Acute_Accent"] = 769] = "U_Combining_Acute_Accent";
      CharCode2[CharCode2["U_Combining_Circumflex_Accent"] = 770] = "U_Combining_Circumflex_Accent";
      CharCode2[CharCode2["U_Combining_Tilde"] = 771] = "U_Combining_Tilde";
      CharCode2[CharCode2["U_Combining_Macron"] = 772] = "U_Combining_Macron";
      CharCode2[CharCode2["U_Combining_Overline"] = 773] = "U_Combining_Overline";
      CharCode2[CharCode2["U_Combining_Breve"] = 774] = "U_Combining_Breve";
      CharCode2[CharCode2["U_Combining_Dot_Above"] = 775] = "U_Combining_Dot_Above";
      CharCode2[CharCode2["U_Combining_Diaeresis"] = 776] = "U_Combining_Diaeresis";
      CharCode2[CharCode2["U_Combining_Hook_Above"] = 777] = "U_Combining_Hook_Above";
      CharCode2[CharCode2["U_Combining_Ring_Above"] = 778] = "U_Combining_Ring_Above";
      CharCode2[CharCode2["U_Combining_Double_Acute_Accent"] = 779] = "U_Combining_Double_Acute_Accent";
      CharCode2[CharCode2["U_Combining_Caron"] = 780] = "U_Combining_Caron";
      CharCode2[CharCode2["U_Combining_Vertical_Line_Above"] = 781] = "U_Combining_Vertical_Line_Above";
      CharCode2[CharCode2["U_Combining_Double_Vertical_Line_Above"] = 782] = "U_Combining_Double_Vertical_Line_Above";
      CharCode2[CharCode2["U_Combining_Double_Grave_Accent"] = 783] = "U_Combining_Double_Grave_Accent";
      CharCode2[CharCode2["U_Combining_Candrabindu"] = 784] = "U_Combining_Candrabindu";
      CharCode2[CharCode2["U_Combining_Inverted_Breve"] = 785] = "U_Combining_Inverted_Breve";
      CharCode2[CharCode2["U_Combining_Turned_Comma_Above"] = 786] = "U_Combining_Turned_Comma_Above";
      CharCode2[CharCode2["U_Combining_Comma_Above"] = 787] = "U_Combining_Comma_Above";
      CharCode2[CharCode2["U_Combining_Reversed_Comma_Above"] = 788] = "U_Combining_Reversed_Comma_Above";
      CharCode2[CharCode2["U_Combining_Comma_Above_Right"] = 789] = "U_Combining_Comma_Above_Right";
      CharCode2[CharCode2["U_Combining_Grave_Accent_Below"] = 790] = "U_Combining_Grave_Accent_Below";
      CharCode2[CharCode2["U_Combining_Acute_Accent_Below"] = 791] = "U_Combining_Acute_Accent_Below";
      CharCode2[CharCode2["U_Combining_Left_Tack_Below"] = 792] = "U_Combining_Left_Tack_Below";
      CharCode2[CharCode2["U_Combining_Right_Tack_Below"] = 793] = "U_Combining_Right_Tack_Below";
      CharCode2[CharCode2["U_Combining_Left_Angle_Above"] = 794] = "U_Combining_Left_Angle_Above";
      CharCode2[CharCode2["U_Combining_Horn"] = 795] = "U_Combining_Horn";
      CharCode2[CharCode2["U_Combining_Left_Half_Ring_Below"] = 796] = "U_Combining_Left_Half_Ring_Below";
      CharCode2[CharCode2["U_Combining_Up_Tack_Below"] = 797] = "U_Combining_Up_Tack_Below";
      CharCode2[CharCode2["U_Combining_Down_Tack_Below"] = 798] = "U_Combining_Down_Tack_Below";
      CharCode2[CharCode2["U_Combining_Plus_Sign_Below"] = 799] = "U_Combining_Plus_Sign_Below";
      CharCode2[CharCode2["U_Combining_Minus_Sign_Below"] = 800] = "U_Combining_Minus_Sign_Below";
      CharCode2[CharCode2["U_Combining_Palatalized_Hook_Below"] = 801] = "U_Combining_Palatalized_Hook_Below";
      CharCode2[CharCode2["U_Combining_Retroflex_Hook_Below"] = 802] = "U_Combining_Retroflex_Hook_Below";
      CharCode2[CharCode2["U_Combining_Dot_Below"] = 803] = "U_Combining_Dot_Below";
      CharCode2[CharCode2["U_Combining_Diaeresis_Below"] = 804] = "U_Combining_Diaeresis_Below";
      CharCode2[CharCode2["U_Combining_Ring_Below"] = 805] = "U_Combining_Ring_Below";
      CharCode2[CharCode2["U_Combining_Comma_Below"] = 806] = "U_Combining_Comma_Below";
      CharCode2[CharCode2["U_Combining_Cedilla"] = 807] = "U_Combining_Cedilla";
      CharCode2[CharCode2["U_Combining_Ogonek"] = 808] = "U_Combining_Ogonek";
      CharCode2[CharCode2["U_Combining_Vertical_Line_Below"] = 809] = "U_Combining_Vertical_Line_Below";
      CharCode2[CharCode2["U_Combining_Bridge_Below"] = 810] = "U_Combining_Bridge_Below";
      CharCode2[CharCode2["U_Combining_Inverted_Double_Arch_Below"] = 811] = "U_Combining_Inverted_Double_Arch_Below";
      CharCode2[CharCode2["U_Combining_Caron_Below"] = 812] = "U_Combining_Caron_Below";
      CharCode2[CharCode2["U_Combining_Circumflex_Accent_Below"] = 813] = "U_Combining_Circumflex_Accent_Below";
      CharCode2[CharCode2["U_Combining_Breve_Below"] = 814] = "U_Combining_Breve_Below";
      CharCode2[CharCode2["U_Combining_Inverted_Breve_Below"] = 815] = "U_Combining_Inverted_Breve_Below";
      CharCode2[CharCode2["U_Combining_Tilde_Below"] = 816] = "U_Combining_Tilde_Below";
      CharCode2[CharCode2["U_Combining_Macron_Below"] = 817] = "U_Combining_Macron_Below";
      CharCode2[CharCode2["U_Combining_Low_Line"] = 818] = "U_Combining_Low_Line";
      CharCode2[CharCode2["U_Combining_Double_Low_Line"] = 819] = "U_Combining_Double_Low_Line";
      CharCode2[CharCode2["U_Combining_Tilde_Overlay"] = 820] = "U_Combining_Tilde_Overlay";
      CharCode2[CharCode2["U_Combining_Short_Stroke_Overlay"] = 821] = "U_Combining_Short_Stroke_Overlay";
      CharCode2[CharCode2["U_Combining_Long_Stroke_Overlay"] = 822] = "U_Combining_Long_Stroke_Overlay";
      CharCode2[CharCode2["U_Combining_Short_Solidus_Overlay"] = 823] = "U_Combining_Short_Solidus_Overlay";
      CharCode2[CharCode2["U_Combining_Long_Solidus_Overlay"] = 824] = "U_Combining_Long_Solidus_Overlay";
      CharCode2[CharCode2["U_Combining_Right_Half_Ring_Below"] = 825] = "U_Combining_Right_Half_Ring_Below";
      CharCode2[CharCode2["U_Combining_Inverted_Bridge_Below"] = 826] = "U_Combining_Inverted_Bridge_Below";
      CharCode2[CharCode2["U_Combining_Square_Below"] = 827] = "U_Combining_Square_Below";
      CharCode2[CharCode2["U_Combining_Seagull_Below"] = 828] = "U_Combining_Seagull_Below";
      CharCode2[CharCode2["U_Combining_X_Above"] = 829] = "U_Combining_X_Above";
      CharCode2[CharCode2["U_Combining_Vertical_Tilde"] = 830] = "U_Combining_Vertical_Tilde";
      CharCode2[CharCode2["U_Combining_Double_Overline"] = 831] = "U_Combining_Double_Overline";
      CharCode2[CharCode2["U_Combining_Grave_Tone_Mark"] = 832] = "U_Combining_Grave_Tone_Mark";
      CharCode2[CharCode2["U_Combining_Acute_Tone_Mark"] = 833] = "U_Combining_Acute_Tone_Mark";
      CharCode2[CharCode2["U_Combining_Greek_Perispomeni"] = 834] = "U_Combining_Greek_Perispomeni";
      CharCode2[CharCode2["U_Combining_Greek_Koronis"] = 835] = "U_Combining_Greek_Koronis";
      CharCode2[CharCode2["U_Combining_Greek_Dialytika_Tonos"] = 836] = "U_Combining_Greek_Dialytika_Tonos";
      CharCode2[CharCode2["U_Combining_Greek_Ypogegrammeni"] = 837] = "U_Combining_Greek_Ypogegrammeni";
      CharCode2[CharCode2["U_Combining_Bridge_Above"] = 838] = "U_Combining_Bridge_Above";
      CharCode2[CharCode2["U_Combining_Equals_Sign_Below"] = 839] = "U_Combining_Equals_Sign_Below";
      CharCode2[CharCode2["U_Combining_Double_Vertical_Line_Below"] = 840] = "U_Combining_Double_Vertical_Line_Below";
      CharCode2[CharCode2["U_Combining_Left_Angle_Below"] = 841] = "U_Combining_Left_Angle_Below";
      CharCode2[CharCode2["U_Combining_Not_Tilde_Above"] = 842] = "U_Combining_Not_Tilde_Above";
      CharCode2[CharCode2["U_Combining_Homothetic_Above"] = 843] = "U_Combining_Homothetic_Above";
      CharCode2[CharCode2["U_Combining_Almost_Equal_To_Above"] = 844] = "U_Combining_Almost_Equal_To_Above";
      CharCode2[CharCode2["U_Combining_Left_Right_Arrow_Below"] = 845] = "U_Combining_Left_Right_Arrow_Below";
      CharCode2[CharCode2["U_Combining_Upwards_Arrow_Below"] = 846] = "U_Combining_Upwards_Arrow_Below";
      CharCode2[CharCode2["U_Combining_Grapheme_Joiner"] = 847] = "U_Combining_Grapheme_Joiner";
      CharCode2[CharCode2["U_Combining_Right_Arrowhead_Above"] = 848] = "U_Combining_Right_Arrowhead_Above";
      CharCode2[CharCode2["U_Combining_Left_Half_Ring_Above"] = 849] = "U_Combining_Left_Half_Ring_Above";
      CharCode2[CharCode2["U_Combining_Fermata"] = 850] = "U_Combining_Fermata";
      CharCode2[CharCode2["U_Combining_X_Below"] = 851] = "U_Combining_X_Below";
      CharCode2[CharCode2["U_Combining_Left_Arrowhead_Below"] = 852] = "U_Combining_Left_Arrowhead_Below";
      CharCode2[CharCode2["U_Combining_Right_Arrowhead_Below"] = 853] = "U_Combining_Right_Arrowhead_Below";
      CharCode2[CharCode2["U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below"] = 854] = "U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below";
      CharCode2[CharCode2["U_Combining_Right_Half_Ring_Above"] = 855] = "U_Combining_Right_Half_Ring_Above";
      CharCode2[CharCode2["U_Combining_Dot_Above_Right"] = 856] = "U_Combining_Dot_Above_Right";
      CharCode2[CharCode2["U_Combining_Asterisk_Below"] = 857] = "U_Combining_Asterisk_Below";
      CharCode2[CharCode2["U_Combining_Double_Ring_Below"] = 858] = "U_Combining_Double_Ring_Below";
      CharCode2[CharCode2["U_Combining_Zigzag_Above"] = 859] = "U_Combining_Zigzag_Above";
      CharCode2[CharCode2["U_Combining_Double_Breve_Below"] = 860] = "U_Combining_Double_Breve_Below";
      CharCode2[CharCode2["U_Combining_Double_Breve"] = 861] = "U_Combining_Double_Breve";
      CharCode2[CharCode2["U_Combining_Double_Macron"] = 862] = "U_Combining_Double_Macron";
      CharCode2[CharCode2["U_Combining_Double_Macron_Below"] = 863] = "U_Combining_Double_Macron_Below";
      CharCode2[CharCode2["U_Combining_Double_Tilde"] = 864] = "U_Combining_Double_Tilde";
      CharCode2[CharCode2["U_Combining_Double_Inverted_Breve"] = 865] = "U_Combining_Double_Inverted_Breve";
      CharCode2[CharCode2["U_Combining_Double_Rightwards_Arrow_Below"] = 866] = "U_Combining_Double_Rightwards_Arrow_Below";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_A"] = 867] = "U_Combining_Latin_Small_Letter_A";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_E"] = 868] = "U_Combining_Latin_Small_Letter_E";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_I"] = 869] = "U_Combining_Latin_Small_Letter_I";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_O"] = 870] = "U_Combining_Latin_Small_Letter_O";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_U"] = 871] = "U_Combining_Latin_Small_Letter_U";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_C"] = 872] = "U_Combining_Latin_Small_Letter_C";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_D"] = 873] = "U_Combining_Latin_Small_Letter_D";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_H"] = 874] = "U_Combining_Latin_Small_Letter_H";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_M"] = 875] = "U_Combining_Latin_Small_Letter_M";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_R"] = 876] = "U_Combining_Latin_Small_Letter_R";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_T"] = 877] = "U_Combining_Latin_Small_Letter_T";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_V"] = 878] = "U_Combining_Latin_Small_Letter_V";
      CharCode2[CharCode2["U_Combining_Latin_Small_Letter_X"] = 879] = "U_Combining_Latin_Small_Letter_X";
      CharCode2[CharCode2["LINE_SEPARATOR"] = 8232] = "LINE_SEPARATOR";
      CharCode2[CharCode2["PARAGRAPH_SEPARATOR"] = 8233] = "PARAGRAPH_SEPARATOR";
      CharCode2[CharCode2["NEXT_LINE"] = 133] = "NEXT_LINE";
      CharCode2[CharCode2["U_CIRCUMFLEX"] = 94] = "U_CIRCUMFLEX";
      CharCode2[CharCode2["U_GRAVE_ACCENT"] = 96] = "U_GRAVE_ACCENT";
      CharCode2[CharCode2["U_DIAERESIS"] = 168] = "U_DIAERESIS";
      CharCode2[CharCode2["U_MACRON"] = 175] = "U_MACRON";
      CharCode2[CharCode2["U_ACUTE_ACCENT"] = 180] = "U_ACUTE_ACCENT";
      CharCode2[CharCode2["U_CEDILLA"] = 184] = "U_CEDILLA";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LEFT_ARROWHEAD"] = 706] = "U_MODIFIER_LETTER_LEFT_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_RIGHT_ARROWHEAD"] = 707] = "U_MODIFIER_LETTER_RIGHT_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_UP_ARROWHEAD"] = 708] = "U_MODIFIER_LETTER_UP_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_DOWN_ARROWHEAD"] = 709] = "U_MODIFIER_LETTER_DOWN_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING"] = 722] = "U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING";
      CharCode2[CharCode2["U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING"] = 723] = "U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING";
      CharCode2[CharCode2["U_MODIFIER_LETTER_UP_TACK"] = 724] = "U_MODIFIER_LETTER_UP_TACK";
      CharCode2[CharCode2["U_MODIFIER_LETTER_DOWN_TACK"] = 725] = "U_MODIFIER_LETTER_DOWN_TACK";
      CharCode2[CharCode2["U_MODIFIER_LETTER_PLUS_SIGN"] = 726] = "U_MODIFIER_LETTER_PLUS_SIGN";
      CharCode2[CharCode2["U_MODIFIER_LETTER_MINUS_SIGN"] = 727] = "U_MODIFIER_LETTER_MINUS_SIGN";
      CharCode2[CharCode2["U_BREVE"] = 728] = "U_BREVE";
      CharCode2[CharCode2["U_DOT_ABOVE"] = 729] = "U_DOT_ABOVE";
      CharCode2[CharCode2["U_RING_ABOVE"] = 730] = "U_RING_ABOVE";
      CharCode2[CharCode2["U_OGONEK"] = 731] = "U_OGONEK";
      CharCode2[CharCode2["U_SMALL_TILDE"] = 732] = "U_SMALL_TILDE";
      CharCode2[CharCode2["U_DOUBLE_ACUTE_ACCENT"] = 733] = "U_DOUBLE_ACUTE_ACCENT";
      CharCode2[CharCode2["U_MODIFIER_LETTER_RHOTIC_HOOK"] = 734] = "U_MODIFIER_LETTER_RHOTIC_HOOK";
      CharCode2[CharCode2["U_MODIFIER_LETTER_CROSS_ACCENT"] = 735] = "U_MODIFIER_LETTER_CROSS_ACCENT";
      CharCode2[CharCode2["U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR"] = 741] = "U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR";
      CharCode2[CharCode2["U_MODIFIER_LETTER_HIGH_TONE_BAR"] = 742] = "U_MODIFIER_LETTER_HIGH_TONE_BAR";
      CharCode2[CharCode2["U_MODIFIER_LETTER_MID_TONE_BAR"] = 743] = "U_MODIFIER_LETTER_MID_TONE_BAR";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_TONE_BAR"] = 744] = "U_MODIFIER_LETTER_LOW_TONE_BAR";
      CharCode2[CharCode2["U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR"] = 745] = "U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR";
      CharCode2[CharCode2["U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK"] = 746] = "U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK";
      CharCode2[CharCode2["U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK"] = 747] = "U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK";
      CharCode2[CharCode2["U_MODIFIER_LETTER_UNASPIRATED"] = 749] = "U_MODIFIER_LETTER_UNASPIRATED";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD"] = 751] = "U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_UP_ARROWHEAD"] = 752] = "U_MODIFIER_LETTER_LOW_UP_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD"] = 753] = "U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD"] = 754] = "U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_RING"] = 755] = "U_MODIFIER_LETTER_LOW_RING";
      CharCode2[CharCode2["U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT"] = 756] = "U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT";
      CharCode2[CharCode2["U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT"] = 757] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT";
      CharCode2[CharCode2["U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT"] = 758] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_TILDE"] = 759] = "U_MODIFIER_LETTER_LOW_TILDE";
      CharCode2[CharCode2["U_MODIFIER_LETTER_RAISED_COLON"] = 760] = "U_MODIFIER_LETTER_RAISED_COLON";
      CharCode2[CharCode2["U_MODIFIER_LETTER_BEGIN_HIGH_TONE"] = 761] = "U_MODIFIER_LETTER_BEGIN_HIGH_TONE";
      CharCode2[CharCode2["U_MODIFIER_LETTER_END_HIGH_TONE"] = 762] = "U_MODIFIER_LETTER_END_HIGH_TONE";
      CharCode2[CharCode2["U_MODIFIER_LETTER_BEGIN_LOW_TONE"] = 763] = "U_MODIFIER_LETTER_BEGIN_LOW_TONE";
      CharCode2[CharCode2["U_MODIFIER_LETTER_END_LOW_TONE"] = 764] = "U_MODIFIER_LETTER_END_LOW_TONE";
      CharCode2[CharCode2["U_MODIFIER_LETTER_SHELF"] = 765] = "U_MODIFIER_LETTER_SHELF";
      CharCode2[CharCode2["U_MODIFIER_LETTER_OPEN_SHELF"] = 766] = "U_MODIFIER_LETTER_OPEN_SHELF";
      CharCode2[CharCode2["U_MODIFIER_LETTER_LOW_LEFT_ARROW"] = 767] = "U_MODIFIER_LETTER_LOW_LEFT_ARROW";
      CharCode2[CharCode2["U_GREEK_LOWER_NUMERAL_SIGN"] = 885] = "U_GREEK_LOWER_NUMERAL_SIGN";
      CharCode2[CharCode2["U_GREEK_TONOS"] = 900] = "U_GREEK_TONOS";
      CharCode2[CharCode2["U_GREEK_DIALYTIKA_TONOS"] = 901] = "U_GREEK_DIALYTIKA_TONOS";
      CharCode2[CharCode2["U_GREEK_KORONIS"] = 8125] = "U_GREEK_KORONIS";
      CharCode2[CharCode2["U_GREEK_PSILI"] = 8127] = "U_GREEK_PSILI";
      CharCode2[CharCode2["U_GREEK_PERISPOMENI"] = 8128] = "U_GREEK_PERISPOMENI";
      CharCode2[CharCode2["U_GREEK_DIALYTIKA_AND_PERISPOMENI"] = 8129] = "U_GREEK_DIALYTIKA_AND_PERISPOMENI";
      CharCode2[CharCode2["U_GREEK_PSILI_AND_VARIA"] = 8141] = "U_GREEK_PSILI_AND_VARIA";
      CharCode2[CharCode2["U_GREEK_PSILI_AND_OXIA"] = 8142] = "U_GREEK_PSILI_AND_OXIA";
      CharCode2[CharCode2["U_GREEK_PSILI_AND_PERISPOMENI"] = 8143] = "U_GREEK_PSILI_AND_PERISPOMENI";
      CharCode2[CharCode2["U_GREEK_DASIA_AND_VARIA"] = 8157] = "U_GREEK_DASIA_AND_VARIA";
      CharCode2[CharCode2["U_GREEK_DASIA_AND_OXIA"] = 8158] = "U_GREEK_DASIA_AND_OXIA";
      CharCode2[CharCode2["U_GREEK_DASIA_AND_PERISPOMENI"] = 8159] = "U_GREEK_DASIA_AND_PERISPOMENI";
      CharCode2[CharCode2["U_GREEK_DIALYTIKA_AND_VARIA"] = 8173] = "U_GREEK_DIALYTIKA_AND_VARIA";
      CharCode2[CharCode2["U_GREEK_DIALYTIKA_AND_OXIA"] = 8174] = "U_GREEK_DIALYTIKA_AND_OXIA";
      CharCode2[CharCode2["U_GREEK_VARIA"] = 8175] = "U_GREEK_VARIA";
      CharCode2[CharCode2["U_GREEK_OXIA"] = 8189] = "U_GREEK_OXIA";
      CharCode2[CharCode2["U_GREEK_DASIA"] = 8190] = "U_GREEK_DASIA";
      CharCode2[CharCode2["U_IDEOGRAPHIC_FULL_STOP"] = 12290] = "U_IDEOGRAPHIC_FULL_STOP";
      CharCode2[CharCode2["U_LEFT_CORNER_BRACKET"] = 12300] = "U_LEFT_CORNER_BRACKET";
      CharCode2[CharCode2["U_RIGHT_CORNER_BRACKET"] = 12301] = "U_RIGHT_CORNER_BRACKET";
      CharCode2[CharCode2["U_LEFT_BLACK_LENTICULAR_BRACKET"] = 12304] = "U_LEFT_BLACK_LENTICULAR_BRACKET";
      CharCode2[CharCode2["U_RIGHT_BLACK_LENTICULAR_BRACKET"] = 12305] = "U_RIGHT_BLACK_LENTICULAR_BRACKET";
      CharCode2[CharCode2["U_OVERLINE"] = 8254] = "U_OVERLINE";
      CharCode2[CharCode2["UTF8_BOM"] = 65279] = "UTF8_BOM";
      CharCode2[CharCode2["U_FULLWIDTH_SEMICOLON"] = 65307] = "U_FULLWIDTH_SEMICOLON";
      CharCode2[CharCode2["U_FULLWIDTH_COMMA"] = 65292] = "U_FULLWIDTH_COMMA";
    })(CharCode || (CharCode = {}));
    function hash(obj) {
      return doHash(obj, 0);
    }
    function doHash(obj, hashVal) {
      switch (typeof obj) {
        case "object":
          if (obj === null) {
            return numberHash(349, hashVal);
          } else if (Array.isArray(obj)) {
            return arrayHash(obj, hashVal);
          }
          return objectHash(obj, hashVal);
        case "string":
          return stringHash(obj, hashVal);
        case "boolean":
          return booleanHash(obj, hashVal);
        case "number":
          return numberHash(obj, hashVal);
        case "undefined":
          return numberHash(937, hashVal);
        default:
          return numberHash(617, hashVal);
      }
    }
    function numberHash(val, initialHashVal) {
      return (initialHashVal << 5) - initialHashVal + val | 0;
    }
    function booleanHash(b, initialHashVal) {
      return numberHash(b ? 433 : 863, initialHashVal);
    }
    function stringHash(s, hashVal) {
      hashVal = numberHash(149417, hashVal);
      for (var i = 0, length_1 = s.length; i < length_1; i++) {
        hashVal = numberHash(s.charCodeAt(i), hashVal);
      }
      return hashVal;
    }
    function arrayHash(arr, initialHashVal) {
      initialHashVal = numberHash(104579, initialHashVal);
      return arr.reduce(function(hashVal, item) {
        return doHash(item, hashVal);
      }, initialHashVal);
    }
    function objectHash(obj, initialHashVal) {
      initialHashVal = numberHash(181387, initialHashVal);
      return Object.keys(obj).sort().reduce(function(hashVal, key) {
        hashVal = stringHash(key, hashVal);
        return doHash(obj[key], hashVal);
      }, initialHashVal);
    }
    (function() {
      function Hasher() {
        this._value = 0;
      }
      Object.defineProperty(Hasher.prototype, "value", {
        get: function() {
          return this._value;
        },
        enumerable: false,
        configurable: true
      });
      Hasher.prototype.hash = function(obj) {
        this._value = doHash(obj, this._value);
        return this._value;
      };
      return Hasher;
    })();
    var SHA1Constant;
    (function(SHA1Constant2) {
      SHA1Constant2[SHA1Constant2["BLOCK_SIZE"] = 64] = "BLOCK_SIZE";
      SHA1Constant2[SHA1Constant2["UNICODE_REPLACEMENT"] = 65533] = "UNICODE_REPLACEMENT";
    })(SHA1Constant || (SHA1Constant = {}));
    var NO_MATCH = 0;
    var NO_SCORE = [NO_MATCH, []];
    function scoreFuzzy(target, query, queryLower, allowNonContiguousMatches, optimizeForPaths) {
      if (optimizeForPaths === void 0) {
        optimizeForPaths = true;
      }
      if (!target || !query) {
        return NO_SCORE;
      }
      var targetLength = target.length;
      var queryLength = query.length;
      if (targetLength < queryLength) {
        return NO_SCORE;
      }
      var targetLower = target.toLowerCase();
      var res = doScoreFuzzy(query, queryLower, queryLength, target, targetLower, targetLength, allowNonContiguousMatches, optimizeForPaths);
      return res;
    }
    function doScoreFuzzy(query, queryLower, queryLength, target, targetLower, targetLength, allowNonContiguousMatches, optimizeForPaths) {
      var scores = [];
      var matches = [];
      for (var queryIndex_1 = 0; queryIndex_1 < queryLength; queryIndex_1++) {
        var queryIndexOffset = queryIndex_1 * targetLength;
        var queryIndexPreviousOffset = queryIndexOffset - targetLength;
        var queryIndexGtNull = queryIndex_1 > 0;
        var queryCharAtIndex = query[queryIndex_1];
        var queryLowerCharAtIndex = queryLower[queryIndex_1];
        for (var targetIndex_1 = 0; targetIndex_1 < targetLength; targetIndex_1++) {
          var targetIndexGtNull = targetIndex_1 > 0;
          var currentIndex = queryIndexOffset + targetIndex_1;
          var leftIndex = currentIndex - 1;
          var diagIndex = queryIndexPreviousOffset + targetIndex_1 - 1;
          var leftScore = targetIndexGtNull ? scores[leftIndex] : 0;
          var diagScore = queryIndexGtNull && targetIndexGtNull ? scores[diagIndex] : 0;
          var matchesSequenceLength = queryIndexGtNull && targetIndexGtNull ? matches[diagIndex] : 0;
          var score = void 0;
          if (!diagScore && queryIndexGtNull) {
            score = 0;
          } else {
            score = computeCharScore(queryCharAtIndex, queryLowerCharAtIndex, target, targetLower, targetIndex_1, matchesSequenceLength, optimizeForPaths);
          }
          var isValidScore = score && diagScore + score >= leftScore;
          if (isValidScore && (allowNonContiguousMatches || queryIndexGtNull || targetLower.startsWith(queryLower, targetIndex_1))) {
            matches[currentIndex] = matchesSequenceLength + 1;
            scores[currentIndex] = diagScore + score;
          } else {
            matches[currentIndex] = NO_MATCH;
            scores[currentIndex] = leftScore;
          }
        }
      }
      var positions = [];
      var queryIndex = queryLength - 1;
      var targetIndex = targetLength - 1;
      while (queryIndex >= 0 && targetIndex >= 0) {
        var currentIndex = queryIndex * targetLength + targetIndex;
        var match = matches[currentIndex];
        if (match === NO_MATCH) {
          targetIndex--;
        } else {
          positions.push(targetIndex);
          queryIndex--;
          targetIndex--;
        }
      }
      return [scores[queryLength * targetLength - 1], positions.reverse()];
    }
    function computeCharScore(queryCharAtIndex, queryLowerCharAtIndex, target, targetLower, targetIndex, matchesSequenceLength, optimizeForPaths) {
      var score = 0;
      if (!considerAsEqual(queryLowerCharAtIndex, targetLower[targetIndex])) {
        return score;
      }
      score += 1;
      if (matchesSequenceLength > 0) {
        score += matchesSequenceLength * 5;
      }
      if (queryCharAtIndex === target[targetIndex]) {
        score += 1;
      }
      if (targetIndex === 0) {
        score += 8;
      } else {
        var separatorBonus = scoreSeparatorAtPos(target.charCodeAt(targetIndex - 1));
        if (separatorBonus && optimizeForPaths) {
          score += separatorBonus;
        } else if (isUpper(target.charCodeAt(targetIndex)) && matchesSequenceLength === 0) {
          score += 2;
        }
      }
      return score;
    }
    function considerAsEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (a === ".") {
        return b === ".";
      }
      return false;
    }
    function scoreSeparatorAtPos(charCode) {
      switch (charCode) {
        case 46:
          return 5;
        case 47:
        case 92:
        case 95:
        case 45:
        case 32:
        case 39:
        case 34:
        case 58:
          return 4;
        default:
          return 0;
      }
    }
    function isUpper(code) {
      return 65 <= code && code <= 90;
    }
    var MULTIPLE_QUERY_VALUES_SEPARATOR = " ";
    function prepareQuery(original) {
      if (typeof original !== "string") {
        original = "";
      }
      var originalLowercase = original.toLowerCase();
      var _a = normalizeQuery(original), pathNormalized = _a.pathNormalized, normalized = _a.normalized, normalizedLowercase = _a.normalizedLowercase;
      var containsPathSeparator = pathNormalized.indexOf(".") >= 0;
      var expectExactMatch = queryExpectsExactMatch(original);
      var values = void 0;
      var originalSplit = original.split(MULTIPLE_QUERY_VALUES_SEPARATOR);
      if (originalSplit.length > 1) {
        for (var _i = 0, originalSplit_1 = originalSplit; _i < originalSplit_1.length; _i++) {
          var originalPiece = originalSplit_1[_i];
          var expectExactMatchPiece = queryExpectsExactMatch(originalPiece);
          var _b = normalizeQuery(originalPiece), pathNormalizedPiece = _b.pathNormalized, normalizedPiece = _b.normalized, normalizedLowercasePiece = _b.normalizedLowercase;
          if (normalizedPiece) {
            if (!values) {
              values = [];
            }
            values.push({
              original: originalPiece,
              originalLowercase: originalPiece.toLowerCase(),
              pathNormalized: pathNormalizedPiece,
              normalized: normalizedPiece,
              normalizedLowercase: normalizedLowercasePiece,
              expectContiguousMatch: expectExactMatchPiece
            });
          }
        }
      }
      return {
        original,
        originalLowercase,
        pathNormalized,
        normalized,
        normalizedLowercase,
        values,
        containsPathSeparator,
        expectContiguousMatch: expectExactMatch
      };
    }
    function normalizeQuery(original) {
      var pathNormalized = original.replace(/\//g, ".");
      var normalized = stripWildcards(pathNormalized).replace(/\s|"/g, "");
      return {
        pathNormalized,
        normalized,
        normalizedLowercase: normalized.toLowerCase()
      };
    }
    function stripWildcards(pattern) {
      return pattern.replace(/\*/g, "");
    }
    function queryExpectsExactMatch(query) {
      return query.startsWith('"') && query.endsWith('"');
    }
    var NO_ITEM_SCORE = Object.freeze({ score: 0 });
    function scoreItemFuzzy(item, query, allowNonContiguousMatches, accessor, cache) {
      if (cache === void 0) {
        cache = /* @__PURE__ */ new Map();
      }
      if (!item || !query.normalized) {
        return NO_ITEM_SCORE;
      }
      var label = accessor.getItemLabel(item);
      if (!label) {
        return NO_ITEM_SCORE;
      }
      var description = accessor.getItemDescription(item);
      var path = accessor.getItemPath(item);
      var rawValue = accessor.getRawValue(item);
      var formattedValue = accessor.getFormattedValue(item);
      var cacheHash = getCacheHash(label, description, path, rawValue, formattedValue, allowNonContiguousMatches, query);
      var cached = cache.get(cacheHash);
      if (cached) {
        return cached;
      }
      var itemScore = doScoreItemFuzzy(label, description, path, rawValue, formattedValue, query, allowNonContiguousMatches);
      cache.set(cacheHash, itemScore);
      return itemScore;
    }
    var PATH_IDENTITY_SCORE = 1 << 18;
    var LABEL_PREFIX_SCORE_THRESHOLD = 1 << 17;
    var LABEL_SCORE_THRESHOLD = 1 << 16;
    function doScoreItemFuzzy(label, description, path, rawValue, formattedValue, query, allowNonContiguousMatches) {
      var preferLabelMatches = !path || !query.containsPathSeparator;
      if (path && query.pathNormalized === path) {
        return {
          score: PATH_IDENTITY_SCORE,
          labelMatch: [{ start: 0, end: label.length }],
          descriptionMatch: description ? [{ start: 0, end: description.length }] : void 0,
          label,
          description,
          rawValue,
          formattedValue
        };
      }
      if (query.values && query.values.length > 1) {
        return doScoreItemFuzzyMultiple(label, description, path, rawValue, formattedValue, query.values, preferLabelMatches, allowNonContiguousMatches);
      }
      return doScoreItemFuzzySingle(label, description, path, rawValue, formattedValue, query, preferLabelMatches, allowNonContiguousMatches);
    }
    function doScoreItemFuzzyMultiple(label, description, path, rawValue, formattedValue, query, preferLabelMatches, allowNonContiguousMatches) {
      var totalScore = 0;
      var totalLabelMatches = [];
      var totalDescriptionMatches = [];
      var totalRawValueMatches = [];
      var totalFormattedValueMatches = [];
      for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
        var queryPiece = query_1[_i];
        var _a = doScoreItemFuzzySingle(label, description, path, rawValue, formattedValue, queryPiece, preferLabelMatches, allowNonContiguousMatches), score = _a.score, labelMatch = _a.labelMatch, descriptionMatch = _a.descriptionMatch, rawValueMatch = _a.rawValueMatch, formattedValueMatch = _a.formattedValueMatch;
        if (score === 0) {
          return NO_ITEM_SCORE;
        }
        totalScore += score;
        if (labelMatch) {
          totalLabelMatches.push.apply(totalLabelMatches, labelMatch);
        }
        if (descriptionMatch) {
          totalDescriptionMatches.push.apply(totalDescriptionMatches, descriptionMatch);
        }
        if (rawValueMatch) {
          totalRawValueMatches.push.apply(totalRawValueMatches, rawValueMatch);
        }
        if (formattedValueMatch) {
          totalFormattedValueMatches.push.apply(totalFormattedValueMatches, formattedValueMatch);
        }
      }
      return {
        score: totalScore,
        labelMatch: totalLabelMatches.length > 0 ? normalizeMatches(totalLabelMatches) : void 0,
        descriptionMatch: totalDescriptionMatches.length > 0 ? normalizeMatches(totalDescriptionMatches) : void 0,
        rawValueMatch: totalRawValueMatches.length > 0 ? normalizeMatches(totalRawValueMatches) : void 0,
        formattedValueMatch: totalFormattedValueMatches.length > 0 ? normalizeMatches(totalFormattedValueMatches) : void 0,
        label,
        description,
        rawValue,
        formattedValue
      };
    }
    function doScoreItemFuzzySingle(label, description, path, rawValue, formattedValue, query, preferLabelMatches, allowNonContiguousMatches) {
      if (preferLabelMatches || !description) {
        var _a = scoreFuzzy(label, query.normalized, query.normalizedLowercase, allowNonContiguousMatches && !query.expectContiguousMatch), labelScore = _a[0], labelPositions = _a[1];
        if (labelScore) {
          var labelPrefixMatch = matchesPrefix(true, query.normalized, label);
          var baseScore = void 0;
          if (labelPrefixMatch) {
            baseScore = LABEL_PREFIX_SCORE_THRESHOLD;
            var prefixLengthBoost = Math.round(query.normalized.length / label.length * 100);
            baseScore += prefixLengthBoost;
          } else {
            baseScore = LABEL_SCORE_THRESHOLD;
          }
          return integrateValueScores({
            score: baseScore + labelScore,
            labelMatch: labelPrefixMatch || createMatches(labelPositions),
            label,
            description,
            rawValue,
            formattedValue
          }, rawValue, formattedValue, query, allowNonContiguousMatches);
        }
      }
      if (description) {
        var descriptionPrefix = description;
        if (path) {
          descriptionPrefix = "".concat(description, ".");
        }
        var descriptionPrefixLength_1 = descriptionPrefix.length;
        var descriptionAndLabel = "".concat(descriptionPrefix).concat(label);
        var _b = scoreFuzzy(descriptionAndLabel, query.normalized, query.normalizedLowercase, allowNonContiguousMatches && !query.expectContiguousMatch), labelDescriptionScore = _b[0], labelDescriptionPositions = _b[1];
        if (labelDescriptionScore) {
          var labelDescriptionMatches = createMatches(labelDescriptionPositions);
          var labelMatch_1 = [];
          var descriptionMatch_1 = [];
          labelDescriptionMatches.forEach(function(h) {
            if (h.start < descriptionPrefixLength_1 && h.end > descriptionPrefixLength_1) {
              labelMatch_1.push({ start: 0, end: h.end - descriptionPrefixLength_1 });
              descriptionMatch_1.push({ start: h.start, end: descriptionPrefixLength_1 });
            } else if (h.start >= descriptionPrefixLength_1) {
              labelMatch_1.push({
                start: h.start - descriptionPrefixLength_1,
                end: h.end - descriptionPrefixLength_1
              });
            } else {
              descriptionMatch_1.push(h);
            }
          });
          return integrateValueScores({
            score: labelDescriptionScore,
            labelMatch: labelMatch_1,
            descriptionMatch: descriptionMatch_1,
            label,
            description,
            rawValue,
            formattedValue
          }, rawValue, formattedValue, query, allowNonContiguousMatches);
        }
      }
      return integrateValueScores({
        score: 0,
        label,
        description,
        rawValue,
        formattedValue
      }, rawValue, formattedValue, query, allowNonContiguousMatches);
    }
    function compareItemsByFuzzyScore(itemA, itemB, query, allowNonContiguousMatches, accessor, cache) {
      if (cache === void 0) {
        cache = /* @__PURE__ */ new Map();
      }
      var itemScoreA = scoreItemFuzzy(itemA, query, allowNonContiguousMatches, accessor, cache);
      var itemScoreB = scoreItemFuzzy(itemB, query, allowNonContiguousMatches, accessor, cache);
      var scoreA = itemScoreA.score;
      var scoreB = itemScoreB.score;
      if (scoreA === PATH_IDENTITY_SCORE || scoreB === PATH_IDENTITY_SCORE) {
        if (scoreA !== scoreB) {
          return scoreA === PATH_IDENTITY_SCORE ? -1 : 1;
        }
      }
      if (scoreA > LABEL_SCORE_THRESHOLD || scoreB > LABEL_SCORE_THRESHOLD) {
        if (scoreA !== scoreB) {
          return scoreA > scoreB ? -1 : 1;
        }
        if (scoreA < LABEL_PREFIX_SCORE_THRESHOLD && scoreB < LABEL_PREFIX_SCORE_THRESHOLD) {
          var comparedByMatchLength = compareByMatchLength(itemScoreA.labelMatch, itemScoreB.labelMatch);
          if (comparedByMatchLength !== 0) {
            return comparedByMatchLength;
          }
        }
        var labelA = accessor.getItemLabel(itemA) || "";
        var labelB = accessor.getItemLabel(itemB) || "";
        if (labelA.length !== labelB.length) {
          return labelA.length - labelB.length;
        }
      }
      if (scoreA !== scoreB) {
        return scoreA > scoreB ? -1 : 1;
      }
      var itemAIsArrayItem = accessor.getIsArrayItem(itemA);
      var itemBIsArrayItem = accessor.getIsArrayItem(itemB);
      if (itemAIsArrayItem !== itemBIsArrayItem) {
        return itemBIsArrayItem ? -1 : 1;
      }
      return fallbackCompare(itemA, itemB, query, accessor);
    }
    function compareByMatchLength(matchesA, matchesB) {
      if (!matchesA && !matchesB || (!matchesA || !matchesA.length) && (!matchesB || !matchesB.length)) {
        return 0;
      }
      if (!matchesB || !matchesB.length) {
        return -1;
      }
      if (!matchesA || !matchesA.length) {
        return 1;
      }
      var matchStartA = matchesA[0].start;
      var matchEndA = matchesA[matchesA.length - 1].end;
      var matchLengthA = matchEndA - matchStartA;
      var matchStartB = matchesB[0].start;
      var matchEndB = matchesB[matchesB.length - 1].end;
      var matchLengthB = matchEndB - matchStartB;
      return matchLengthA === matchLengthB ? 0 : matchLengthB < matchLengthA ? 1 : -1;
    }
    function fallbackCompare(itemA, itemB, query, accessor) {
      var labelA = accessor.getItemLabel(itemA) || "";
      var labelB = accessor.getItemLabel(itemB) || "";
      var descriptionA = accessor.getItemDescription(itemA);
      var descriptionB = accessor.getItemDescription(itemB);
      var labelDescriptionALength = labelA.length + (descriptionA ? descriptionA.length : 0);
      var labelDescriptionBLength = labelB.length + (descriptionB ? descriptionB.length : 0);
      if (labelDescriptionALength !== labelDescriptionBLength) {
        return labelDescriptionALength - labelDescriptionBLength;
      }
      var pathA = accessor.getItemPath(itemA);
      var pathB = accessor.getItemPath(itemB);
      if (pathA && pathB && pathA.length !== pathB.length) {
        return pathA.length - pathB.length;
      }
      if (labelA !== labelB) {
        return compareAnything(labelA, labelB, query.normalized);
      }
      if (descriptionA && descriptionB && descriptionA !== descriptionB) {
        return compareAnything(descriptionA, descriptionB, query.normalized);
      }
      if (pathA && pathB && pathA !== pathB) {
        return compareAnything(pathA, pathB, query.normalized);
      }
      return 0;
    }
    function compareAnything(one, other, lookFor) {
      var elementAName = one.toLowerCase();
      var elementBName = other.toLowerCase();
      var prefixCompare = compareByPrefix(one, other, lookFor);
      if (prefixCompare) {
        return prefixCompare;
      }
      var elementASuffixMatch = elementAName.endsWith(lookFor);
      var elementBSuffixMatch = elementBName.endsWith(lookFor);
      if (elementASuffixMatch !== elementBSuffixMatch) {
        return elementASuffixMatch ? -1 : 1;
      }
      return elementAName.localeCompare(elementBName);
    }
    function compareByPrefix(one, other, lookFor) {
      var elementAName = one.toLowerCase();
      var elementBName = other.toLowerCase();
      var elementAPrefixMatch = elementAName.startsWith(lookFor);
      var elementBPrefixMatch = elementBName.startsWith(lookFor);
      if (elementAPrefixMatch !== elementBPrefixMatch) {
        return elementAPrefixMatch ? -1 : 1;
      } else if (elementAPrefixMatch && elementBPrefixMatch) {
        if (elementAName.length < elementBName.length) {
          return -1;
        }
        if (elementAName.length > elementBName.length) {
          return 1;
        }
      }
      return 0;
    }
    function integrateValueScores(score, rawValue, formattedValue, query, allowNonContiguousMatches) {
      var result = __assign({}, score);
      if (rawValue) {
        var _a = scoreFuzzy(rawValue, query.normalized, query.normalizedLowercase, allowNonContiguousMatches && !query.expectContiguousMatch, false), rawValueScore = _a[0], rawValuePositions = _a[1];
        if (rawValueScore) {
          var rawValueMatch = createMatches(rawValuePositions);
          result.score = result.score + rawValueScore;
          result.rawValueMatch = rawValueMatch;
        }
      }
      if (formattedValue && rawValue !== formattedValue) {
        var _b = scoreFuzzy(formattedValue, query.normalized, query.normalizedLowercase, allowNonContiguousMatches && !query.expectContiguousMatch, false), formattedValueScore = _b[0], formattedValuePositions = _b[1];
        if (formattedValueScore) {
          var formattedValueMatch = createMatches(formattedValuePositions);
          result.score = result.score + formattedValueScore;
          result.formattedValueMatch = formattedValueMatch;
        }
      }
      return result;
    }
    function createMatches(offsets) {
      var ret = [];
      if (!offsets) {
        return ret;
      }
      var last;
      for (var _i = 0, offsets_1 = offsets; _i < offsets_1.length; _i++) {
        var pos = offsets_1[_i];
        if (last && last.end === pos) {
          last.end += 1;
        } else {
          last = { start: pos, end: pos + 1 };
          ret.push(last);
        }
      }
      return ret;
    }
    function matchesPrefix(ignoreCase, word, wordToMatchAgainst) {
      if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
        return null;
      }
      var matches;
      if (ignoreCase) {
        matches = startsWithIgnoreCase(wordToMatchAgainst, word);
      } else {
        matches = wordToMatchAgainst.indexOf(word) === 0;
      }
      if (!matches) {
        return null;
      }
      return word.length > 0 ? [{ start: 0, end: word.length }] : [];
    }
    function normalizeMatches(matches) {
      var sortedMatches = matches.sort(function(matchA, matchB) {
        return matchA.start - matchB.start;
      });
      var normalizedMatches = [];
      var currentMatch = void 0;
      for (var _i = 0, sortedMatches_1 = sortedMatches; _i < sortedMatches_1.length; _i++) {
        var match = sortedMatches_1[_i];
        if (!currentMatch || !matchOverlaps(currentMatch, match)) {
          currentMatch = match;
          normalizedMatches.push(match);
        } else {
          currentMatch.start = Math.min(currentMatch.start, match.start);
          currentMatch.end = Math.max(currentMatch.end, match.end);
        }
      }
      return normalizedMatches;
    }
    function matchOverlaps(matchA, matchB) {
      if (matchA.end < matchB.start) {
        return false;
      }
      if (matchB.end < matchA.start) {
        return false;
      }
      return true;
    }
    function getCacheHash(label, description, path, rawValue, formattedValue, allowNonContiguousMatches, query) {
      var _a;
      var values = query.values ? query.values : [query];
      var cacheHash = hash((_a = {}, _a[query.normalized] = {
        values: values.map(function(v) {
          return {
            value: v.normalized,
            expectContiguousMatch: v.expectContiguousMatch
          };
        }),
        label,
        description,
        allowNonContiguousMatches,
        path,
        rawValue,
        formattedValue
      }, _a));
      return cacheHash;
    }
    function search(items, query, allowNonContiguousMatches, accessor, cache) {
      if (cache === void 0) {
        cache = /* @__PURE__ */ new Map();
      }
      var sortedItems = __spreadArray([], items, true).sort(function(a, b) {
        return compareItemsByFuzzyScore(a, b, query, allowNonContiguousMatches, accessor, cache);
      });
      var allResults = sortedItems.map(function(item) {
        var score = scoreItemFuzzy(item, query, allowNonContiguousMatches, accessor, cache);
        return { item, score };
      });
      var allResultsWithScore = allResults.filter(function(result) {
        return result.score.score > 0;
      });
      return allResultsWithScore;
    }
    var JSONHeroSearch2 = function() {
      function JSONHeroSearch3(json, options) {
        var _a, _b, _c;
        this.scoreCache = /* @__PURE__ */ new Map();
        this.json = json;
        this.items = [];
        this.options = __assign({ cacheSettings: __assign({ enabled: true, max: 100 }, options === null || options === void 0 ? void 0 : options.cacheSettings), accessor: new JSONHeroSearchAccessor(this.json, (_a = options === null || options === void 0 ? void 0 : options.formatter) !== null && _a !== void 0 ? _a : defaultFormatter) }, options);
        this.searchCache = new LRUCache__default["default"]({
          max: (_c = (_b = options === null || options === void 0 ? void 0 : options.cacheSettings) === null || _b === void 0 ? void 0 : _b.max) !== null && _c !== void 0 ? _c : 100
        });
      }
      JSONHeroSearch3.prototype.prepareIndex = function() {
        if (this.items.length > 0) {
          return;
        }
        this.items = getAllPaths(this.json);
      };
      JSONHeroSearch3.prototype.search = function(query) {
        var _a;
        if (this.options.cacheSettings.enabled && this.searchCache.has(query)) {
          return (_a = this.searchCache.get(query)) !== null && _a !== void 0 ? _a : [];
        }
        this.prepareIndex();
        var preparedQuery = prepareQuery(query);
        var results = search(this.items, preparedQuery, true, this.options.accessor, this.scoreCache);
        if (this.options.cacheSettings.enabled)
          this.searchCache.set(query, results);
        return results;
      };
      return JSONHeroSearch3;
    }();
    function lastComponent(path) {
      var components = path.split(".");
      return components[components.length - 1];
    }
    function isArray(path) {
      var last = lastComponent(path);
      return last.match(/^\d+$/) !== null;
    }
    var JSONHeroSearchAccessor = function() {
      function JSONHeroSearchAccessor2(json, formatter) {
        this.valueCache = /* @__PURE__ */ new Map();
        this.json = json;
        this.formatter = formatter;
      }
      JSONHeroSearchAccessor2.prototype.getIsArrayItem = function(path) {
        return isArray(path);
      };
      JSONHeroSearchAccessor2.prototype.getItemLabel = function(path) {
        return lastComponent(path);
      };
      JSONHeroSearchAccessor2.prototype.getItemDescription = function(path) {
        var components = path.split(".").slice(1, -1);
        return components.join(".");
      };
      JSONHeroSearchAccessor2.prototype.getItemPath = function(path) {
        var components = path.split(".").slice(1);
        return components.join(".");
      };
      JSONHeroSearchAccessor2.prototype.getRawValue = function(path) {
        var cacheKey = "".concat(path, "_raw");
        if (this.valueCache.has(cacheKey)) {
          return this.valueCache.get(cacheKey);
        }
        var rawValue = doGetRawValue(this.json);
        if (rawValue) {
          this.valueCache.set(cacheKey, rawValue);
        }
        return rawValue;
        function doGetRawValue(json) {
          var result = getFirstAtPath(json, path);
          if (typeof result === "string") {
            return result;
          }
          if (typeof result === "boolean") {
            return result ? "true" : "false";
          }
          if (result === "null") {
            return "null";
          }
          if (typeof result === "number") {
            return result.toString();
          }
        }
      };
      JSONHeroSearchAccessor2.prototype.getFormattedValue = function(path) {
        var cacheKey = "".concat(path, "_formatted");
        if (this.valueCache.has(cacheKey)) {
          return this.valueCache.get(cacheKey);
        }
        var formattedValue = doGetFormattedValue(this.json, this.formatter);
        if (formattedValue) {
          this.valueCache.set(cacheKey, formattedValue);
        }
        return formattedValue;
        function doGetFormattedValue(json, formatter) {
          var result = getFirstAtPath(json, path);
          return formatter(result);
        }
      };
      return JSONHeroSearchAccessor2;
    }();
    function getAllPaths(json) {
      var paths = [];
      function walk(json2, path) {
        paths.push(path);
        if (Array.isArray(json2)) {
          for (var i = 0; i < json2.length; i++) {
            walk(json2[i], "".concat(path, ".").concat(i));
          }
        } else if (typeof json2 === "object" && json2 !== null) {
          for (var _i = 0, _a = Object.keys(json2); _i < _a.length; _i++) {
            var key = _a[_i];
            walk(json2[key], "".concat(path, ".").concat(key));
          }
        }
      }
      walk(json, "$");
      return paths;
    }
    function getFirstAtPath(json, path) {
      var result = json;
      var components = path.split(".");
      for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
        var component = components_1[_i];
        if (component === "$") {
          continue;
        }
        if (result === void 0) {
          return;
        }
        if (Array.isArray(result) && component.match(/^\d+$/)) {
          result = result[Number(component)];
        } else {
          if (typeof result === "object" && result !== null) {
            result = result[component];
          } else {
            return result;
          }
        }
      }
      return result;
    }
    function defaultFormatter(value) {
      if (typeof value === "string") {
        return value;
      }
      if (typeof value === "boolean") {
        return value ? "true" : "false";
      }
      if (value === null) {
        return "null";
      }
      if (typeof value === "number") {
        return value.toString();
      }
    }
    exports.JSONHeroSearch = JSONHeroSearch2;
    exports.JSONHeroSearchAccessor = JSONHeroSearchAccessor;
    exports.search = search;
  }
});

// node_modules/jsbn/index.js
var require_jsbn = __commonJS({
  "node_modules/jsbn/index.js"(exports, module) {
    (function() {
      var dbits;
      var canary = 244837814094590;
      var j_lm = (canary & 16777215) == 15715070;
      function BigInteger3(a, b, c) {
        if (a != null)
          if (typeof a == "number")
            this.fromNumber(a, b, c);
          else if (b == null && typeof a != "string")
            this.fromString(a, 256);
          else
            this.fromString(a, b);
      }
      function nbi() {
        return new BigInteger3(null);
      }
      function am1(i, x, w, j, c, n2) {
        while (--n2 >= 0) {
          var v = x * this[i++] + w[j] + c;
          c = Math.floor(v / 67108864);
          w[j++] = v & 67108863;
        }
        return c;
      }
      function am2(i, x, w, j, c, n2) {
        var xl = x & 32767, xh = x >> 15;
        while (--n2 >= 0) {
          var l = this[i] & 32767;
          var h = this[i++] >> 15;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
          c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
          w[j++] = l & 1073741823;
        }
        return c;
      }
      function am3(i, x, w, j, c, n2) {
        var xl = x & 16383, xh = x >> 14;
        while (--n2 >= 0) {
          var l = this[i] & 16383;
          var h = this[i++] >> 14;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 16383) << 14) + w[j] + c;
          c = (l >> 28) + (m >> 14) + xh * h;
          w[j++] = l & 268435455;
        }
        return c;
      }
      var inBrowser = typeof navigator !== "undefined";
      if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
        BigInteger3.prototype.am = am2;
        dbits = 30;
      } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
        BigInteger3.prototype.am = am1;
        dbits = 26;
      } else {
        BigInteger3.prototype.am = am3;
        dbits = 28;
      }
      BigInteger3.prototype.DB = dbits;
      BigInteger3.prototype.DM = (1 << dbits) - 1;
      BigInteger3.prototype.DV = 1 << dbits;
      var BI_FP = 52;
      BigInteger3.prototype.FV = Math.pow(2, BI_FP);
      BigInteger3.prototype.F1 = BI_FP - dbits;
      BigInteger3.prototype.F2 = 2 * dbits - BI_FP;
      var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
      var BI_RC = new Array();
      var rr, vv;
      rr = "0".charCodeAt(0);
      for (vv = 0; vv <= 9; ++vv)
        BI_RC[rr++] = vv;
      rr = "a".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv)
        BI_RC[rr++] = vv;
      rr = "A".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv)
        BI_RC[rr++] = vv;
      function int2char(n2) {
        return BI_RM.charAt(n2);
      }
      function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return c == null ? -1 : c;
      }
      function bnpCopyTo(r2) {
        for (var i = this.t - 1; i >= 0; --i)
          r2[i] = this[i];
        r2.t = this.t;
        r2.s = this.s;
      }
      function bnpFromInt(x) {
        this.t = 1;
        this.s = x < 0 ? -1 : 0;
        if (x > 0)
          this[0] = x;
        else if (x < -1)
          this[0] = x + this.DV;
        else
          this.t = 0;
      }
      function nbv(i) {
        var r2 = nbi();
        r2.fromInt(i);
        return r2;
      }
      function bnpFromString(s, b) {
        var k;
        if (b == 16)
          k = 4;
        else if (b == 8)
          k = 3;
        else if (b == 256)
          k = 8;
        else if (b == 2)
          k = 1;
        else if (b == 32)
          k = 5;
        else if (b == 4)
          k = 2;
        else {
          this.fromRadix(s, b);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length, mi = false, sh = 0;
        while (--i >= 0) {
          var x = k == 8 ? s[i] & 255 : intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-")
              mi = true;
            continue;
          }
          mi = false;
          if (sh == 0)
            this[this.t++] = x;
          else if (sh + k > this.DB) {
            this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
            this[this.t++] = x >> this.DB - sh;
          } else
            this[this.t - 1] |= x << sh;
          sh += k;
          if (sh >= this.DB)
            sh -= this.DB;
        }
        if (k == 8 && (s[0] & 128) != 0) {
          this.s = -1;
          if (sh > 0)
            this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
        this.clamp();
        if (mi)
          BigInteger3.ZERO.subTo(this, this);
      }
      function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c)
          --this.t;
      }
      function bnToString(b) {
        if (this.s < 0)
          return "-" + this.negate().toString(b);
        var k;
        if (b == 16)
          k = 4;
        else if (b == 8)
          k = 3;
        else if (b == 2)
          k = 1;
        else if (b == 32)
          k = 5;
        else if (b == 4)
          k = 2;
        else
          return this.toRadix(b);
        var km = (1 << k) - 1, d, m = false, r2 = "", i = this.t;
        var p = this.DB - i * this.DB % k;
        if (i-- > 0) {
          if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r2 = int2char(d);
          }
          while (i >= 0) {
            if (p < k) {
              d = (this[i] & (1 << p) - 1) << k - p;
              d |= this[--i] >> (p += this.DB - k);
            } else {
              d = this[i] >> (p -= k) & km;
              if (p <= 0) {
                p += this.DB;
                --i;
              }
            }
            if (d > 0)
              m = true;
            if (m)
              r2 += int2char(d);
          }
        }
        return m ? r2 : "0";
      }
      function bnNegate() {
        var r2 = nbi();
        BigInteger3.ZERO.subTo(this, r2);
        return r2;
      }
      function bnAbs() {
        return this.s < 0 ? this.negate() : this;
      }
      function bnCompareTo(a) {
        var r2 = this.s - a.s;
        if (r2 != 0)
          return r2;
        var i = this.t;
        r2 = i - a.t;
        if (r2 != 0)
          return this.s < 0 ? -r2 : r2;
        while (--i >= 0)
          if ((r2 = this[i] - a[i]) != 0)
            return r2;
        return 0;
      }
      function nbits(x) {
        var r2 = 1, t3;
        if ((t3 = x >>> 16) != 0) {
          x = t3;
          r2 += 16;
        }
        if ((t3 = x >> 8) != 0) {
          x = t3;
          r2 += 8;
        }
        if ((t3 = x >> 4) != 0) {
          x = t3;
          r2 += 4;
        }
        if ((t3 = x >> 2) != 0) {
          x = t3;
          r2 += 2;
        }
        if ((t3 = x >> 1) != 0) {
          x = t3;
          r2 += 1;
        }
        return r2;
      }
      function bnBitLength() {
        if (this.t <= 0)
          return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      }
      function bnpDLShiftTo(n2, r2) {
        var i;
        for (i = this.t - 1; i >= 0; --i)
          r2[i + n2] = this[i];
        for (i = n2 - 1; i >= 0; --i)
          r2[i] = 0;
        r2.t = this.t + n2;
        r2.s = this.s;
      }
      function bnpDRShiftTo(n2, r2) {
        for (var i = n2; i < this.t; ++i)
          r2[i - n2] = this[i];
        r2.t = Math.max(this.t - n2, 0);
        r2.s = this.s;
      }
      function bnpLShiftTo(n2, r2) {
        var bs = n2 % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n2 / this.DB), c = this.s << bs & this.DM, i;
        for (i = this.t - 1; i >= 0; --i) {
          r2[i + ds + 1] = this[i] >> cbs | c;
          c = (this[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i)
          r2[i] = 0;
        r2[ds] = c;
        r2.t = this.t + ds + 1;
        r2.s = this.s;
        r2.clamp();
      }
      function bnpRShiftTo(n2, r2) {
        r2.s = this.s;
        var ds = Math.floor(n2 / this.DB);
        if (ds >= this.t) {
          r2.t = 0;
          return;
        }
        var bs = n2 % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r2[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
          r2[i - ds - 1] |= (this[i] & bm) << cbs;
          r2[i - ds] = this[i] >> bs;
        }
        if (bs > 0)
          r2[this.t - ds - 1] |= (this.s & bm) << cbs;
        r2.t = this.t - ds;
        r2.clamp();
      }
      function bnpSubTo(a, r2) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
          c += this[i] - a[i];
          r2[i++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c -= a.s;
          while (i < this.t) {
            c += this[i];
            r2[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i < a.t) {
            c -= a[i];
            r2[i++] = c & this.DM;
            c >>= this.DB;
          }
          c -= a.s;
        }
        r2.s = c < 0 ? -1 : 0;
        if (c < -1)
          r2[i++] = this.DV + c;
        else if (c > 0)
          r2[i++] = c;
        r2.t = i;
        r2.clamp();
      }
      function bnpMultiplyTo(a, r2) {
        var x = this.abs(), y = a.abs();
        var i = x.t;
        r2.t = i + y.t;
        while (--i >= 0)
          r2[i] = 0;
        for (i = 0; i < y.t; ++i)
          r2[i + x.t] = x.am(0, y[i], r2, i, 0, x.t);
        r2.s = 0;
        r2.clamp();
        if (this.s != a.s)
          BigInteger3.ZERO.subTo(r2, r2);
      }
      function bnpSquareTo(r2) {
        var x = this.abs();
        var i = r2.t = 2 * x.t;
        while (--i >= 0)
          r2[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
          var c = x.am(i, x[i], r2, 2 * i, 0, 1);
          if ((r2[i + x.t] += x.am(i + 1, 2 * x[i], r2, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r2[i + x.t] -= x.DV;
            r2[i + x.t + 1] = 1;
          }
        }
        if (r2.t > 0)
          r2[r2.t - 1] += x.am(i, x[i], r2, 2 * i, 0, 1);
        r2.s = 0;
        r2.clamp();
      }
      function bnpDivRemTo(m, q, r2) {
        var pm = m.abs();
        if (pm.t <= 0)
          return;
        var pt = this.abs();
        if (pt.t < pm.t) {
          if (q != null)
            q.fromInt(0);
          if (r2 != null)
            this.copyTo(r2);
          return;
        }
        if (r2 == null)
          r2 = nbi();
        var y = nbi(), ts = this.s, ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y);
          pt.lShiftTo(nsh, r2);
        } else {
          pm.copyTo(y);
          pt.copyTo(r2);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0)
          return;
        var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e2 = 1 << this.F2;
        var i = r2.t, j = i - ys, t3 = q == null ? nbi() : q;
        y.dlShiftTo(j, t3);
        if (r2.compareTo(t3) >= 0) {
          r2[r2.t++] = 1;
          r2.subTo(t3, r2);
        }
        BigInteger3.ONE.dlShiftTo(ys, t3);
        t3.subTo(y, y);
        while (y.t < ys)
          y[y.t++] = 0;
        while (--j >= 0) {
          var qd = r2[--i] == y0 ? this.DM : Math.floor(r2[i] * d1 + (r2[i - 1] + e2) * d2);
          if ((r2[i] += y.am(0, qd, r2, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t3);
            r2.subTo(t3, r2);
            while (r2[i] < --qd)
              r2.subTo(t3, r2);
          }
        }
        if (q != null) {
          r2.drShiftTo(ys, q);
          if (ts != ms)
            BigInteger3.ZERO.subTo(q, q);
        }
        r2.t = ys;
        r2.clamp();
        if (nsh > 0)
          r2.rShiftTo(nsh, r2);
        if (ts < 0)
          BigInteger3.ZERO.subTo(r2, r2);
      }
      function bnMod(a) {
        var r2 = nbi();
        this.abs().divRemTo(a, null, r2);
        if (this.s < 0 && r2.compareTo(BigInteger3.ZERO) > 0)
          a.subTo(r2, r2);
        return r2;
      }
      function Classic(m) {
        this.m = m;
      }
      function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0)
          return x.mod(this.m);
        else
          return x;
      }
      function cRevert(x) {
        return x;
      }
      function cReduce(x) {
        x.divRemTo(this.m, null, x);
      }
      function cMulTo(x, y, r2) {
        x.multiplyTo(y, r2);
        this.reduce(r2);
      }
      function cSqrTo(x, r2) {
        x.squareTo(r2);
        this.reduce(r2);
      }
      Classic.prototype.convert = cConvert;
      Classic.prototype.revert = cRevert;
      Classic.prototype.reduce = cReduce;
      Classic.prototype.mulTo = cMulTo;
      Classic.prototype.sqrTo = cSqrTo;
      function bnpInvDigit() {
        if (this.t < 1)
          return 0;
        var x = this[0];
        if ((x & 1) == 0)
          return 0;
        var y = x & 3;
        y = y * (2 - (x & 15) * y) & 15;
        y = y * (2 - (x & 255) * y) & 255;
        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
        y = y * (2 - x * y % this.DV) % this.DV;
        return y > 0 ? this.DV - y : -y;
      }
      function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m.DB - 15) - 1;
        this.mt2 = 2 * m.t;
      }
      function montConvert(x) {
        var r2 = nbi();
        x.abs().dlShiftTo(this.m.t, r2);
        r2.divRemTo(this.m, null, r2);
        if (x.s < 0 && r2.compareTo(BigInteger3.ZERO) > 0)
          this.m.subTo(r2, r2);
        return r2;
      }
      function montRevert(x) {
        var r2 = nbi();
        x.copyTo(r2);
        this.reduce(r2);
        return r2;
      }
      function montReduce(x) {
        while (x.t <= this.mt2)
          x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
          var j = x[i] & 32767;
          var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
          j = i + this.m.t;
          x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
          while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
          }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0)
          x.subTo(this.m, x);
      }
      function montSqrTo(x, r2) {
        x.squareTo(r2);
        this.reduce(r2);
      }
      function montMulTo(x, y, r2) {
        x.multiplyTo(y, r2);
        this.reduce(r2);
      }
      Montgomery.prototype.convert = montConvert;
      Montgomery.prototype.revert = montRevert;
      Montgomery.prototype.reduce = montReduce;
      Montgomery.prototype.mulTo = montMulTo;
      Montgomery.prototype.sqrTo = montSqrTo;
      function bnpIsEven() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }
      function bnpExp(e2, z2) {
        if (e2 > 4294967295 || e2 < 1)
          return BigInteger3.ONE;
        var r2 = nbi(), r22 = nbi(), g = z2.convert(this), i = nbits(e2) - 1;
        g.copyTo(r2);
        while (--i >= 0) {
          z2.sqrTo(r2, r22);
          if ((e2 & 1 << i) > 0)
            z2.mulTo(r22, g, r2);
          else {
            var t3 = r2;
            r2 = r22;
            r22 = t3;
          }
        }
        return z2.revert(r2);
      }
      function bnModPowInt(e2, m) {
        var z2;
        if (e2 < 256 || m.isEven())
          z2 = new Classic(m);
        else
          z2 = new Montgomery(m);
        return this.exp(e2, z2);
      }
      BigInteger3.prototype.copyTo = bnpCopyTo;
      BigInteger3.prototype.fromInt = bnpFromInt;
      BigInteger3.prototype.fromString = bnpFromString;
      BigInteger3.prototype.clamp = bnpClamp;
      BigInteger3.prototype.dlShiftTo = bnpDLShiftTo;
      BigInteger3.prototype.drShiftTo = bnpDRShiftTo;
      BigInteger3.prototype.lShiftTo = bnpLShiftTo;
      BigInteger3.prototype.rShiftTo = bnpRShiftTo;
      BigInteger3.prototype.subTo = bnpSubTo;
      BigInteger3.prototype.multiplyTo = bnpMultiplyTo;
      BigInteger3.prototype.squareTo = bnpSquareTo;
      BigInteger3.prototype.divRemTo = bnpDivRemTo;
      BigInteger3.prototype.invDigit = bnpInvDigit;
      BigInteger3.prototype.isEven = bnpIsEven;
      BigInteger3.prototype.exp = bnpExp;
      BigInteger3.prototype.toString = bnToString;
      BigInteger3.prototype.negate = bnNegate;
      BigInteger3.prototype.abs = bnAbs;
      BigInteger3.prototype.compareTo = bnCompareTo;
      BigInteger3.prototype.bitLength = bnBitLength;
      BigInteger3.prototype.mod = bnMod;
      BigInteger3.prototype.modPowInt = bnModPowInt;
      BigInteger3.ZERO = nbv(0);
      BigInteger3.ONE = nbv(1);
      function bnClone() {
        var r2 = nbi();
        this.copyTo(r2);
        return r2;
      }
      function bnIntValue() {
        if (this.s < 0) {
          if (this.t == 1)
            return this[0] - this.DV;
          else if (this.t == 0)
            return -1;
        } else if (this.t == 1)
          return this[0];
        else if (this.t == 0)
          return 0;
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      }
      function bnByteValue() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      }
      function bnShortValue() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      }
      function bnpChunkSize(r2) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r2));
      }
      function bnSigNum() {
        if (this.s < 0)
          return -1;
        else if (this.t <= 0 || this.t == 1 && this[0] <= 0)
          return 0;
        else
          return 1;
      }
      function bnpToRadix(b) {
        if (b == null)
          b = 10;
        if (this.signum() == 0 || b < 2 || b > 36)
          return "0";
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a), y = nbi(), z2 = nbi(), r2 = "";
        this.divRemTo(d, y, z2);
        while (y.signum() > 0) {
          r2 = (a + z2.intValue()).toString(b).substr(1) + r2;
          y.divRemTo(d, y, z2);
        }
        return z2.intValue().toString(b) + r2;
      }
      function bnpFromRadix(s, b) {
        this.fromInt(0);
        if (b == null)
          b = 10;
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i = 0; i < s.length; ++i) {
          var x = intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-" && this.signum() == 0)
              mi = true;
            continue;
          }
          w = b * w + x;
          if (++j >= cs) {
            this.dMultiply(d);
            this.dAddOffset(w, 0);
            j = 0;
            w = 0;
          }
        }
        if (j > 0) {
          this.dMultiply(Math.pow(b, j));
          this.dAddOffset(w, 0);
        }
        if (mi)
          BigInteger3.ZERO.subTo(this, this);
      }
      function bnpFromNumber(a, b, c) {
        if (typeof b == "number") {
          if (a < 2)
            this.fromInt(1);
          else {
            this.fromNumber(a, c);
            if (!this.testBit(a - 1))
              this.bitwiseTo(BigInteger3.ONE.shiftLeft(a - 1), op_or, this);
            if (this.isEven())
              this.dAddOffset(1, 0);
            while (!this.isProbablePrime(b)) {
              this.dAddOffset(2, 0);
              if (this.bitLength() > a)
                this.subTo(BigInteger3.ONE.shiftLeft(a - 1), this);
            }
          }
        } else {
          var x = new Array(), t3 = a & 7;
          x.length = (a >> 3) + 1;
          b.nextBytes(x);
          if (t3 > 0)
            x[0] &= (1 << t3) - 1;
          else
            x[0] = 0;
          this.fromString(x, 256);
        }
      }
      function bnToByteArray() {
        var i = this.t, r2 = new Array();
        r2[0] = this.s;
        var p = this.DB - i * this.DB % 8, d, k = 0;
        if (i-- > 0) {
          if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
            r2[k++] = d | this.s << this.DB - p;
          while (i >= 0) {
            if (p < 8) {
              d = (this[i] & (1 << p) - 1) << 8 - p;
              d |= this[--i] >> (p += this.DB - 8);
            } else {
              d = this[i] >> (p -= 8) & 255;
              if (p <= 0) {
                p += this.DB;
                --i;
              }
            }
            if ((d & 128) != 0)
              d |= -256;
            if (k == 0 && (this.s & 128) != (d & 128))
              ++k;
            if (k > 0 || d != this.s)
              r2[k++] = d;
          }
        }
        return r2;
      }
      function bnEquals(a) {
        return this.compareTo(a) == 0;
      }
      function bnMin(a) {
        return this.compareTo(a) < 0 ? this : a;
      }
      function bnMax(a) {
        return this.compareTo(a) > 0 ? this : a;
      }
      function bnpBitwiseTo(a, op, r2) {
        var i, f, m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i)
          r2[i] = op(this[i], a[i]);
        if (a.t < this.t) {
          f = a.s & this.DM;
          for (i = m; i < this.t; ++i)
            r2[i] = op(this[i], f);
          r2.t = this.t;
        } else {
          f = this.s & this.DM;
          for (i = m; i < a.t; ++i)
            r2[i] = op(f, a[i]);
          r2.t = a.t;
        }
        r2.s = op(this.s, a.s);
        r2.clamp();
      }
      function op_and(x, y) {
        return x & y;
      }
      function bnAnd(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_and, r2);
        return r2;
      }
      function op_or(x, y) {
        return x | y;
      }
      function bnOr(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_or, r2);
        return r2;
      }
      function op_xor(x, y) {
        return x ^ y;
      }
      function bnXor(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_xor, r2);
        return r2;
      }
      function op_andnot(x, y) {
        return x & ~y;
      }
      function bnAndNot(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_andnot, r2);
        return r2;
      }
      function bnNot() {
        var r2 = nbi();
        for (var i = 0; i < this.t; ++i)
          r2[i] = this.DM & ~this[i];
        r2.t = this.t;
        r2.s = ~this.s;
        return r2;
      }
      function bnShiftLeft(n2) {
        var r2 = nbi();
        if (n2 < 0)
          this.rShiftTo(-n2, r2);
        else
          this.lShiftTo(n2, r2);
        return r2;
      }
      function bnShiftRight(n2) {
        var r2 = nbi();
        if (n2 < 0)
          this.lShiftTo(-n2, r2);
        else
          this.rShiftTo(n2, r2);
        return r2;
      }
      function lbit(x) {
        if (x == 0)
          return -1;
        var r2 = 0;
        if ((x & 65535) == 0) {
          x >>= 16;
          r2 += 16;
        }
        if ((x & 255) == 0) {
          x >>= 8;
          r2 += 8;
        }
        if ((x & 15) == 0) {
          x >>= 4;
          r2 += 4;
        }
        if ((x & 3) == 0) {
          x >>= 2;
          r2 += 2;
        }
        if ((x & 1) == 0)
          ++r2;
        return r2;
      }
      function bnGetLowestSetBit() {
        for (var i = 0; i < this.t; ++i)
          if (this[i] != 0)
            return i * this.DB + lbit(this[i]);
        if (this.s < 0)
          return this.t * this.DB;
        return -1;
      }
      function cbit(x) {
        var r2 = 0;
        while (x != 0) {
          x &= x - 1;
          ++r2;
        }
        return r2;
      }
      function bnBitCount() {
        var r2 = 0, x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i)
          r2 += cbit(this[i] ^ x);
        return r2;
      }
      function bnTestBit(n2) {
        var j = Math.floor(n2 / this.DB);
        if (j >= this.t)
          return this.s != 0;
        return (this[j] & 1 << n2 % this.DB) != 0;
      }
      function bnpChangeBit(n2, op) {
        var r2 = BigInteger3.ONE.shiftLeft(n2);
        this.bitwiseTo(r2, op, r2);
        return r2;
      }
      function bnSetBit(n2) {
        return this.changeBit(n2, op_or);
      }
      function bnClearBit(n2) {
        return this.changeBit(n2, op_andnot);
      }
      function bnFlipBit(n2) {
        return this.changeBit(n2, op_xor);
      }
      function bnpAddTo(a, r2) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
          c += this[i] + a[i];
          r2[i++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c += a.s;
          while (i < this.t) {
            c += this[i];
            r2[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i < a.t) {
            c += a[i];
            r2[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += a.s;
        }
        r2.s = c < 0 ? -1 : 0;
        if (c > 0)
          r2[i++] = c;
        else if (c < -1)
          r2[i++] = this.DV + c;
        r2.t = i;
        r2.clamp();
      }
      function bnAdd(a) {
        var r2 = nbi();
        this.addTo(a, r2);
        return r2;
      }
      function bnSubtract(a) {
        var r2 = nbi();
        this.subTo(a, r2);
        return r2;
      }
      function bnMultiply(a) {
        var r2 = nbi();
        this.multiplyTo(a, r2);
        return r2;
      }
      function bnSquare() {
        var r2 = nbi();
        this.squareTo(r2);
        return r2;
      }
      function bnDivide(a) {
        var r2 = nbi();
        this.divRemTo(a, r2, null);
        return r2;
      }
      function bnRemainder(a) {
        var r2 = nbi();
        this.divRemTo(a, null, r2);
        return r2;
      }
      function bnDivideAndRemainder(a) {
        var q = nbi(), r2 = nbi();
        this.divRemTo(a, q, r2);
        return new Array(q, r2);
      }
      function bnpDMultiply(n2) {
        this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
      }
      function bnpDAddOffset(n2, w) {
        if (n2 == 0)
          return;
        while (this.t <= w)
          this[this.t++] = 0;
        this[w] += n2;
        while (this[w] >= this.DV) {
          this[w] -= this.DV;
          if (++w >= this.t)
            this[this.t++] = 0;
          ++this[w];
        }
      }
      function NullExp() {
      }
      function nNop(x) {
        return x;
      }
      function nMulTo(x, y, r2) {
        x.multiplyTo(y, r2);
      }
      function nSqrTo(x, r2) {
        x.squareTo(r2);
      }
      NullExp.prototype.convert = nNop;
      NullExp.prototype.revert = nNop;
      NullExp.prototype.mulTo = nMulTo;
      NullExp.prototype.sqrTo = nSqrTo;
      function bnPow(e2) {
        return this.exp(e2, new NullExp());
      }
      function bnpMultiplyLowerTo(a, n2, r2) {
        var i = Math.min(this.t + a.t, n2);
        r2.s = 0;
        r2.t = i;
        while (i > 0)
          r2[--i] = 0;
        var j;
        for (j = r2.t - this.t; i < j; ++i)
          r2[i + this.t] = this.am(0, a[i], r2, i, 0, this.t);
        for (j = Math.min(a.t, n2); i < j; ++i)
          this.am(0, a[i], r2, i, 0, n2 - i);
        r2.clamp();
      }
      function bnpMultiplyUpperTo(a, n2, r2) {
        --n2;
        var i = r2.t = this.t + a.t - n2;
        r2.s = 0;
        while (--i >= 0)
          r2[i] = 0;
        for (i = Math.max(n2 - this.t, 0); i < a.t; ++i)
          r2[this.t + i - n2] = this.am(n2 - i, a[i], r2, 0, 0, this.t + i - n2);
        r2.clamp();
        r2.drShiftTo(1, r2);
      }
      function Barrett(m) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger3.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
      }
      function barrettConvert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t)
          return x.mod(this.m);
        else if (x.compareTo(this.m) < 0)
          return x;
        else {
          var r2 = nbi();
          x.copyTo(r2);
          this.reduce(r2);
          return r2;
        }
      }
      function barrettRevert(x) {
        return x;
      }
      function barrettReduce(x) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
          x.t = this.m.t + 1;
          x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0)
          x.dAddOffset(1, this.m.t + 1);
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0)
          x.subTo(this.m, x);
      }
      function barrettSqrTo(x, r2) {
        x.squareTo(r2);
        this.reduce(r2);
      }
      function barrettMulTo(x, y, r2) {
        x.multiplyTo(y, r2);
        this.reduce(r2);
      }
      Barrett.prototype.convert = barrettConvert;
      Barrett.prototype.revert = barrettRevert;
      Barrett.prototype.reduce = barrettReduce;
      Barrett.prototype.mulTo = barrettMulTo;
      Barrett.prototype.sqrTo = barrettSqrTo;
      function bnModPow(e2, m) {
        var i = e2.bitLength(), k, r2 = nbv(1), z2;
        if (i <= 0)
          return r2;
        else if (i < 18)
          k = 1;
        else if (i < 48)
          k = 3;
        else if (i < 144)
          k = 4;
        else if (i < 768)
          k = 5;
        else
          k = 6;
        if (i < 8)
          z2 = new Classic(m);
        else if (m.isEven())
          z2 = new Barrett(m);
        else
          z2 = new Montgomery(m);
        var g = new Array(), n2 = 3, k1 = k - 1, km = (1 << k) - 1;
        g[1] = z2.convert(this);
        if (k > 1) {
          var g2 = nbi();
          z2.sqrTo(g[1], g2);
          while (n2 <= km) {
            g[n2] = nbi();
            z2.mulTo(g2, g[n2 - 2], g[n2]);
            n2 += 2;
          }
        }
        var j = e2.t - 1, w, is1 = true, r22 = nbi(), t3;
        i = nbits(e2[j]) - 1;
        while (j >= 0) {
          if (i >= k1)
            w = e2[j] >> i - k1 & km;
          else {
            w = (e2[j] & (1 << i + 1) - 1) << k1 - i;
            if (j > 0)
              w |= e2[j - 1] >> this.DB + i - k1;
          }
          n2 = k;
          while ((w & 1) == 0) {
            w >>= 1;
            --n2;
          }
          if ((i -= n2) < 0) {
            i += this.DB;
            --j;
          }
          if (is1) {
            g[w].copyTo(r2);
            is1 = false;
          } else {
            while (n2 > 1) {
              z2.sqrTo(r2, r22);
              z2.sqrTo(r22, r2);
              n2 -= 2;
            }
            if (n2 > 0)
              z2.sqrTo(r2, r22);
            else {
              t3 = r2;
              r2 = r22;
              r22 = t3;
            }
            z2.mulTo(r22, g[w], r2);
          }
          while (j >= 0 && (e2[j] & 1 << i) == 0) {
            z2.sqrTo(r2, r22);
            t3 = r2;
            r2 = r22;
            r22 = t3;
            if (--i < 0) {
              i = this.DB - 1;
              --j;
            }
          }
        }
        return z2.revert(r2);
      }
      function bnGCD(a) {
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
          var t3 = x;
          x = y;
          y = t3;
        }
        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0)
          return x;
        if (i < g)
          g = i;
        if (g > 0) {
          x.rShiftTo(g, x);
          y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
          if ((i = x.getLowestSetBit()) > 0)
            x.rShiftTo(i, x);
          if ((i = y.getLowestSetBit()) > 0)
            y.rShiftTo(i, y);
          if (x.compareTo(y) >= 0) {
            x.subTo(y, x);
            x.rShiftTo(1, x);
          } else {
            y.subTo(x, y);
            y.rShiftTo(1, y);
          }
        }
        if (g > 0)
          y.lShiftTo(g, y);
        return y;
      }
      function bnpModInt(n2) {
        if (n2 <= 0)
          return 0;
        var d = this.DV % n2, r2 = this.s < 0 ? n2 - 1 : 0;
        if (this.t > 0)
          if (d == 0)
            r2 = this[0] % n2;
          else
            for (var i = this.t - 1; i >= 0; --i)
              r2 = (d * r2 + this[i]) % n2;
        return r2;
      }
      function bnModInverse(m) {
        var ac = m.isEven();
        if (this.isEven() && ac || m.signum() == 0)
          return BigInteger3.ZERO;
        var u = m.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
          while (u.isEven()) {
            u.rShiftTo(1, u);
            if (ac) {
              if (!a.isEven() || !b.isEven()) {
                a.addTo(this, a);
                b.subTo(m, b);
              }
              a.rShiftTo(1, a);
            } else if (!b.isEven())
              b.subTo(m, b);
            b.rShiftTo(1, b);
          }
          while (v.isEven()) {
            v.rShiftTo(1, v);
            if (ac) {
              if (!c.isEven() || !d.isEven()) {
                c.addTo(this, c);
                d.subTo(m, d);
              }
              c.rShiftTo(1, c);
            } else if (!d.isEven())
              d.subTo(m, d);
            d.rShiftTo(1, d);
          }
          if (u.compareTo(v) >= 0) {
            u.subTo(v, u);
            if (ac)
              a.subTo(c, a);
            b.subTo(d, b);
          } else {
            v.subTo(u, v);
            if (ac)
              c.subTo(a, c);
            d.subTo(b, d);
          }
        }
        if (v.compareTo(BigInteger3.ONE) != 0)
          return BigInteger3.ZERO;
        if (d.compareTo(m) >= 0)
          return d.subtract(m);
        if (d.signum() < 0)
          d.addTo(m, d);
        else
          return d;
        if (d.signum() < 0)
          return d.add(m);
        else
          return d;
      }
      var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
      function bnIsProbablePrime(t3) {
        var i, x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
          for (i = 0; i < lowprimes.length; ++i)
            if (x[0] == lowprimes[i])
              return true;
          return false;
        }
        if (x.isEven())
          return false;
        i = 1;
        while (i < lowprimes.length) {
          var m = lowprimes[i], j = i + 1;
          while (j < lowprimes.length && m < lplim)
            m *= lowprimes[j++];
          m = x.modInt(m);
          while (i < j)
            if (m % lowprimes[i++] == 0)
              return false;
        }
        return x.millerRabin(t3);
      }
      function bnpMillerRabin(t3) {
        var n1 = this.subtract(BigInteger3.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0)
          return false;
        var r2 = n1.shiftRight(k);
        t3 = t3 + 1 >> 1;
        if (t3 > lowprimes.length)
          t3 = lowprimes.length;
        var a = nbi();
        for (var i = 0; i < t3; ++i) {
          a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var y = a.modPow(r2, this);
          if (y.compareTo(BigInteger3.ONE) != 0 && y.compareTo(n1) != 0) {
            var j = 1;
            while (j++ < k && y.compareTo(n1) != 0) {
              y = y.modPowInt(2, this);
              if (y.compareTo(BigInteger3.ONE) == 0)
                return false;
            }
            if (y.compareTo(n1) != 0)
              return false;
          }
        }
        return true;
      }
      BigInteger3.prototype.chunkSize = bnpChunkSize;
      BigInteger3.prototype.toRadix = bnpToRadix;
      BigInteger3.prototype.fromRadix = bnpFromRadix;
      BigInteger3.prototype.fromNumber = bnpFromNumber;
      BigInteger3.prototype.bitwiseTo = bnpBitwiseTo;
      BigInteger3.prototype.changeBit = bnpChangeBit;
      BigInteger3.prototype.addTo = bnpAddTo;
      BigInteger3.prototype.dMultiply = bnpDMultiply;
      BigInteger3.prototype.dAddOffset = bnpDAddOffset;
      BigInteger3.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
      BigInteger3.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
      BigInteger3.prototype.modInt = bnpModInt;
      BigInteger3.prototype.millerRabin = bnpMillerRabin;
      BigInteger3.prototype.clone = bnClone;
      BigInteger3.prototype.intValue = bnIntValue;
      BigInteger3.prototype.byteValue = bnByteValue;
      BigInteger3.prototype.shortValue = bnShortValue;
      BigInteger3.prototype.signum = bnSigNum;
      BigInteger3.prototype.toByteArray = bnToByteArray;
      BigInteger3.prototype.equals = bnEquals;
      BigInteger3.prototype.min = bnMin;
      BigInteger3.prototype.max = bnMax;
      BigInteger3.prototype.and = bnAnd;
      BigInteger3.prototype.or = bnOr;
      BigInteger3.prototype.xor = bnXor;
      BigInteger3.prototype.andNot = bnAndNot;
      BigInteger3.prototype.not = bnNot;
      BigInteger3.prototype.shiftLeft = bnShiftLeft;
      BigInteger3.prototype.shiftRight = bnShiftRight;
      BigInteger3.prototype.getLowestSetBit = bnGetLowestSetBit;
      BigInteger3.prototype.bitCount = bnBitCount;
      BigInteger3.prototype.testBit = bnTestBit;
      BigInteger3.prototype.setBit = bnSetBit;
      BigInteger3.prototype.clearBit = bnClearBit;
      BigInteger3.prototype.flipBit = bnFlipBit;
      BigInteger3.prototype.add = bnAdd;
      BigInteger3.prototype.subtract = bnSubtract;
      BigInteger3.prototype.multiply = bnMultiply;
      BigInteger3.prototype.divide = bnDivide;
      BigInteger3.prototype.remainder = bnRemainder;
      BigInteger3.prototype.divideAndRemainder = bnDivideAndRemainder;
      BigInteger3.prototype.modPow = bnModPow;
      BigInteger3.prototype.modInverse = bnModInverse;
      BigInteger3.prototype.pow = bnPow;
      BigInteger3.prototype.gcd = bnGCD;
      BigInteger3.prototype.isProbablePrime = bnIsProbablePrime;
      BigInteger3.prototype.square = bnSquare;
      BigInteger3.prototype.Barrett = Barrett;
      var rng_state;
      var rng_pool;
      var rng_pptr;
      function rng_seed_int(x) {
        rng_pool[rng_pptr++] ^= x & 255;
        rng_pool[rng_pptr++] ^= x >> 8 & 255;
        rng_pool[rng_pptr++] ^= x >> 16 & 255;
        rng_pool[rng_pptr++] ^= x >> 24 & 255;
        if (rng_pptr >= rng_psize)
          rng_pptr -= rng_psize;
      }
      function rng_seed_time() {
        rng_seed_int(new Date().getTime());
      }
      if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t2;
        if (typeof window !== "undefined" && window.crypto) {
          if (window.crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            window.crypto.getRandomValues(ua);
            for (t2 = 0; t2 < 32; ++t2)
              rng_pool[rng_pptr++] = ua[t2];
          } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
            var z = window.crypto.random(32);
            for (t2 = 0; t2 < z.length; ++t2)
              rng_pool[rng_pptr++] = z.charCodeAt(t2) & 255;
          }
        }
        while (rng_pptr < rng_psize) {
          t2 = Math.floor(65536 * Math.random());
          rng_pool[rng_pptr++] = t2 >>> 8;
          rng_pool[rng_pptr++] = t2 & 255;
        }
        rng_pptr = 0;
        rng_seed_time();
      }
      function rng_get_byte() {
        if (rng_state == null) {
          rng_seed_time();
          rng_state = prng_newstate();
          rng_state.init(rng_pool);
          for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
          rng_pptr = 0;
        }
        return rng_state.next();
      }
      function rng_get_bytes(ba) {
        var i;
        for (i = 0; i < ba.length; ++i)
          ba[i] = rng_get_byte();
      }
      function SecureRandom() {
      }
      SecureRandom.prototype.nextBytes = rng_get_bytes;
      function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = new Array();
      }
      function ARC4init(key) {
        var i, j, t3;
        for (i = 0; i < 256; ++i)
          this.S[i] = i;
        j = 0;
        for (i = 0; i < 256; ++i) {
          j = j + this.S[i] + key[i % key.length] & 255;
          t3 = this.S[i];
          this.S[i] = this.S[j];
          this.S[j] = t3;
        }
        this.i = 0;
        this.j = 0;
      }
      function ARC4next() {
        var t3;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t3 = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t3;
        return this.S[t3 + this.S[this.i] & 255];
      }
      Arcfour.prototype.init = ARC4init;
      Arcfour.prototype.next = ARC4next;
      function prng_newstate() {
        return new Arcfour();
      }
      var rng_psize = 256;
      if (typeof exports !== "undefined") {
        exports = module.exports = {
          default: BigInteger3,
          BigInteger: BigInteger3,
          SecureRandom
        };
      } else {
        this.jsbn = {
          BigInteger: BigInteger3,
          SecureRandom
        };
      }
    }).call(exports);
  }
});

// node_modules/sprintf-js/src/sprintf.js
var require_sprintf = __commonJS({
  "node_modules/sprintf-js/src/sprintf.js"(exports) {
    !function() {
      "use strict";
      var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
      };
      function sprintf5(key) {
        return sprintf_format(sprintf_parse(key), arguments);
      }
      function vsprintf(fmt, argv) {
        return sprintf5.apply(null, [fmt].concat(argv || []));
      }
      function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad, pad_character, pad_length, is_positive, sign;
        for (i = 0; i < tree_length; i++) {
          if (typeof parse_tree[i] === "string") {
            output += parse_tree[i];
          } else if (typeof parse_tree[i] === "object") {
            ph = parse_tree[i];
            if (ph.keys) {
              arg = argv[cursor];
              for (k = 0; k < ph.keys.length; k++) {
                if (arg == void 0) {
                  throw new Error(sprintf5('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                }
                arg = arg[ph.keys[k]];
              }
            } else if (ph.param_no) {
              arg = argv[ph.param_no];
            } else {
              arg = argv[cursor++];
            }
            if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
              arg = arg();
            }
            if (re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
              throw new TypeError(sprintf5("[sprintf] expecting number but found %T", arg));
            }
            if (re.number.test(ph.type)) {
              is_positive = arg >= 0;
            }
            switch (ph.type) {
              case "b":
                arg = parseInt(arg, 10).toString(2);
                break;
              case "c":
                arg = String.fromCharCode(parseInt(arg, 10));
                break;
              case "d":
              case "i":
                arg = parseInt(arg, 10);
                break;
              case "j":
                arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                break;
              case "e":
                arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                break;
              case "f":
                arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                break;
              case "g":
                arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                break;
              case "o":
                arg = (parseInt(arg, 10) >>> 0).toString(8);
                break;
              case "s":
                arg = String(arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "t":
                arg = String(!!arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "T":
                arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "u":
                arg = parseInt(arg, 10) >>> 0;
                break;
              case "v":
                arg = arg.valueOf();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "x":
                arg = (parseInt(arg, 10) >>> 0).toString(16);
                break;
              case "X":
                arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            if (re.json.test(ph.type)) {
              output += arg;
            } else {
              if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                sign = is_positive ? "+" : "-";
                arg = arg.toString().replace(re.sign, "");
              } else {
                sign = "";
              }
              pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
              pad_length = ph.width - (sign + arg).length;
              pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
              output += ph.align ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
            }
          }
        }
        return output;
      }
      var sprintf_cache = /* @__PURE__ */ Object.create(null);
      function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
          return sprintf_cache[fmt];
        }
        var _fmt = fmt, match, parse_tree = [], arg_names = 0;
        while (_fmt) {
          if ((match = re.text.exec(_fmt)) !== null) {
            parse_tree.push(match[0]);
          } else if ((match = re.modulo.exec(_fmt)) !== null) {
            parse_tree.push("%");
          } else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1;
              var field_list = [], replacement_field = match[2], field_match = [];
              if ((field_match = re.key.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                  if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else {
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  }
                }
              } else {
                throw new SyntaxError("[sprintf] failed to parse named argument key");
              }
              match[2] = field_list;
            } else {
              arg_names |= 2;
            }
            if (arg_names === 3) {
              throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
            }
            parse_tree.push({
              placeholder: match[0],
              param_no: match[1],
              keys: match[2],
              sign: match[3],
              pad_char: match[4],
              align: match[5],
              width: match[6],
              precision: match[7],
              type: match[8]
            });
          } else {
            throw new SyntaxError("[sprintf] unexpected placeholder");
          }
          _fmt = _fmt.substring(match[0].length);
        }
        return sprintf_cache[fmt] = parse_tree;
      }
      if (typeof exports !== "undefined") {
        exports["sprintf"] = sprintf5;
        exports["vsprintf"] = vsprintf;
      }
      if (typeof window !== "undefined") {
        window["sprintf"] = sprintf5;
        window["vsprintf"] = vsprintf;
        if (typeof define === "function" && define["amd"]) {
          define(function() {
            return {
              "sprintf": sprintf5,
              "vsprintf": vsprintf
            };
          });
        }
      }
    }();
  }
});

// node_modules/json5/dist/index.js
var require_dist = __commonJS({
  "node_modules/json5/dist/index.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
    })(exports, function() {
      "use strict";
      function createCommonjsModule(fn, module2) {
        return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
      }
      var _global = createCommonjsModule(function(module2) {
        var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") {
          __g = global;
        }
      });
      var _core = createCommonjsModule(function(module2) {
        var core = module2.exports = { version: "2.6.5" };
        if (typeof __e == "number") {
          __e = core;
        }
      });
      var _core_1 = _core.version;
      var _isObject = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };
      var _anObject = function(it) {
        if (!_isObject(it)) {
          throw TypeError(it + " is not an object!");
        }
        return it;
      };
      var _fails = function(exec) {
        try {
          return !!exec();
        } catch (e2) {
          return true;
        }
      };
      var _descriptors = !_fails(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var document = _global.document;
      var is = _isObject(document) && _isObject(document.createElement);
      var _domCreate = function(it) {
        return is ? document.createElement(it) : {};
      };
      var _ie8DomDefine = !_descriptors && !_fails(function() {
        return Object.defineProperty(_domCreate("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var _toPrimitive = function(it, S) {
        if (!_isObject(it)) {
          return it;
        }
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        throw TypeError("Can't convert object to primitive value");
      };
      var dP = Object.defineProperty;
      var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine) {
          try {
            return dP(O, P, Attributes);
          } catch (e2) {
          }
        }
        if ("get" in Attributes || "set" in Attributes) {
          throw TypeError("Accessors not supported!");
        }
        if ("value" in Attributes) {
          O[P] = Attributes.value;
        }
        return O;
      };
      var _objectDp = {
        f
      };
      var _propertyDesc = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value
        };
      };
      var _hide = _descriptors ? function(object, key2, value) {
        return _objectDp.f(object, key2, _propertyDesc(1, value));
      } : function(object, key2, value) {
        object[key2] = value;
        return object;
      };
      var hasOwnProperty = {}.hasOwnProperty;
      var _has = function(it, key2) {
        return hasOwnProperty.call(it, key2);
      };
      var id = 0;
      var px = Math.random();
      var _uid = function(key2) {
        return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
      };
      var _library = false;
      var _shared = createCommonjsModule(function(module2) {
        var SHARED = "__core-js_shared__";
        var store = _global[SHARED] || (_global[SHARED] = {});
        (module2.exports = function(key2, value) {
          return store[key2] || (store[key2] = value !== void 0 ? value : {});
        })("versions", []).push({
          version: _core.version,
          mode: _library ? "pure" : "global",
          copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
        });
      });
      var _functionToString = _shared("native-function-to-string", Function.toString);
      var _redefine = createCommonjsModule(function(module2) {
        var SRC = _uid("src");
        var TO_STRING = "toString";
        var TPL = ("" + _functionToString).split(TO_STRING);
        _core.inspectSource = function(it) {
          return _functionToString.call(it);
        };
        (module2.exports = function(O, key2, val, safe) {
          var isFunction = typeof val == "function";
          if (isFunction) {
            _has(val, "name") || _hide(val, "name", key2);
          }
          if (O[key2] === val) {
            return;
          }
          if (isFunction) {
            _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
          }
          if (O === _global) {
            O[key2] = val;
          } else if (!safe) {
            delete O[key2];
            _hide(O, key2, val);
          } else if (O[key2]) {
            O[key2] = val;
          } else {
            _hide(O, key2, val);
          }
        })(Function.prototype, TO_STRING, function toString() {
          return typeof this == "function" && this[SRC] || _functionToString.call(this);
        });
      });
      var _aFunction = function(it) {
        if (typeof it != "function") {
          throw TypeError(it + " is not a function!");
        }
        return it;
      };
      var _ctx = function(fn, that, length) {
        _aFunction(fn);
        if (that === void 0) {
          return fn;
        }
        switch (length) {
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c2) {
              return fn.call(that, a, b, c2);
            };
        }
        return function() {
          return fn.apply(that, arguments);
        };
      };
      var PROTOTYPE = "prototype";
      var $export = function(type, name, source2) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
        var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
        var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
        var key2, own, out, exp;
        if (IS_GLOBAL) {
          source2 = name;
        }
        for (key2 in source2) {
          own = !IS_FORCED && target && target[key2] !== void 0;
          out = (own ? target : source2)[key2];
          exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
          if (target) {
            _redefine(target, key2, out, type & $export.U);
          }
          if (exports2[key2] != out) {
            _hide(exports2, key2, exp);
          }
          if (IS_PROTO && expProto[key2] != out) {
            expProto[key2] = out;
          }
        }
      };
      _global.core = _core;
      $export.F = 1;
      $export.G = 2;
      $export.S = 4;
      $export.P = 8;
      $export.B = 16;
      $export.W = 32;
      $export.U = 64;
      $export.R = 128;
      var _export = $export;
      var ceil = Math.ceil;
      var floor = Math.floor;
      var _toInteger = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
      };
      var _defined = function(it) {
        if (it == void 0) {
          throw TypeError("Can't call method on  " + it);
        }
        return it;
      };
      var _stringAt = function(TO_STRING) {
        return function(that, pos2) {
          var s = String(_defined(that));
          var i = _toInteger(pos2);
          var l = s.length;
          var a, b;
          if (i < 0 || i >= l) {
            return TO_STRING ? "" : void 0;
          }
          a = s.charCodeAt(i);
          return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
      };
      var $at = _stringAt(false);
      _export(_export.P, "String", {
        codePointAt: function codePointAt2(pos2) {
          return $at(this, pos2);
        }
      });
      var codePointAt = _core.String.codePointAt;
      var max = Math.max;
      var min = Math.min;
      var _toAbsoluteIndex = function(index, length) {
        index = _toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
      };
      var fromCharCode = String.fromCharCode;
      var $fromCodePoint = String.fromCodePoint;
      _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
        fromCodePoint: function fromCodePoint2(x) {
          var arguments$1 = arguments;
          var res = [];
          var aLen = arguments.length;
          var i = 0;
          var code;
          while (aLen > i) {
            code = +arguments$1[i++];
            if (_toAbsoluteIndex(code, 1114111) !== code) {
              throw RangeError(code + " is not a valid code point");
            }
            res.push(code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320));
          }
          return res.join("");
        }
      });
      var fromCodePoint = _core.String.fromCodePoint;
      var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
      var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
      var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
      var unicode = {
        Space_Separator,
        ID_Start,
        ID_Continue
      };
      var util = {
        isSpaceSeparator: function isSpaceSeparator(c2) {
          return typeof c2 === "string" && unicode.Space_Separator.test(c2);
        },
        isIdStartChar: function isIdStartChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
        },
        isIdContinueChar: function isIdContinueChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
        },
        isDigit: function isDigit(c2) {
          return typeof c2 === "string" && /[0-9]/.test(c2);
        },
        isHexDigit: function isHexDigit(c2) {
          return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
        }
      };
      var source;
      var parseState;
      var stack;
      var pos;
      var line;
      var column;
      var token;
      var key;
      var root;
      var parse = function parse2(text, reviver) {
        source = String(text);
        parseState = "start";
        stack = [];
        pos = 0;
        line = 1;
        column = 0;
        token = void 0;
        key = void 0;
        root = void 0;
        do {
          token = lex();
          parseStates[parseState]();
        } while (token.type !== "eof");
        if (typeof reviver === "function") {
          return internalize({ "": root }, "", reviver);
        }
        return root;
      };
      function internalize(holder, name, reviver) {
        var value = holder[name];
        if (value != null && typeof value === "object") {
          for (var key2 in value) {
            var replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              value[key2] = replacement;
            }
          }
        }
        return reviver.call(holder, name, value);
      }
      var lexState;
      var buffer;
      var doubleQuote;
      var sign;
      var c;
      function lex() {
        lexState = "default";
        buffer = "";
        doubleQuote = false;
        sign = 1;
        for (; ; ) {
          c = peek();
          var token2 = lexStates[lexState]();
          if (token2) {
            return token2;
          }
        }
      }
      function peek() {
        if (source[pos]) {
          return String.fromCodePoint(source.codePointAt(pos));
        }
      }
      function read() {
        var c2 = peek();
        if (c2 === "\n") {
          line++;
          column = 0;
        } else if (c2) {
          column += c2.length;
        } else {
          column++;
        }
        if (c2) {
          pos += c2.length;
        }
        return c2;
      }
      var lexStates = {
        default: function default$1() {
          switch (c) {
            case "	":
            case "\v":
            case "\f":
            case " ":
            case "\xA0":
            case "\uFEFF":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              return;
            case "/":
              read();
              lexState = "comment";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          if (util.isSpaceSeparator(c)) {
            read();
            return;
          }
          return lexStates[parseState]();
        },
        comment: function comment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineComment";
              return;
            case "/":
              read();
              lexState = "singleLineComment";
              return;
          }
          throw invalidChar(read());
        },
        multiLineComment: function multiLineComment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineCommentAsterisk";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
        },
        multiLineCommentAsterisk: function multiLineCommentAsterisk() {
          switch (c) {
            case "*":
              read();
              return;
            case "/":
              read();
              lexState = "default";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
          lexState = "multiLineComment";
        },
        singleLineComment: function singleLineComment() {
          switch (c) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              lexState = "default";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          read();
        },
        value: function value() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
            case "n":
              read();
              literal("ull");
              return newToken("null", null);
            case "t":
              read();
              literal("rue");
              return newToken("boolean", true);
            case "f":
              read();
              literal("alse");
              return newToken("boolean", false);
            case "-":
            case "+":
              if (read() === "-") {
                sign = -1;
              }
              lexState = "sign";
              return;
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
            case '"':
            case "'":
              doubleQuote = read() === '"';
              buffer = "";
              lexState = "string";
              return;
          }
          throw invalidChar(read());
        },
        identifierNameStartEscape: function identifierNameStartEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
              break;
            default:
              if (!util.isIdStartChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        identifierName: function identifierName() {
          switch (c) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              buffer += read();
              return;
            case "\\":
              read();
              lexState = "identifierNameEscape";
              return;
          }
          if (util.isIdContinueChar(c)) {
            buffer += read();
            return;
          }
          return newToken("identifier", buffer);
        },
        identifierNameEscape: function identifierNameEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              break;
            default:
              if (!util.isIdContinueChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        sign: function sign$1() {
          switch (c) {
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", sign * Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
          }
          throw invalidChar(read());
        },
        zero: function zero() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
            case "x":
            case "X":
              buffer += read();
              lexState = "hexadecimal";
              return;
          }
          return newToken("numeric", sign * 0);
        },
        decimalInteger: function decimalInteger() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalPointLeading: function decimalPointLeading() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          throw invalidChar(read());
        },
        decimalPoint: function decimalPoint() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalFraction: function decimalFraction() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalExponent: function decimalExponent() {
          switch (c) {
            case "+":
            case "-":
              buffer += read();
              lexState = "decimalExponentSign";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentSign: function decimalExponentSign() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentInteger: function decimalExponentInteger() {
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        hexadecimal: function hexadecimal() {
          if (util.isHexDigit(c)) {
            buffer += read();
            lexState = "hexadecimalInteger";
            return;
          }
          throw invalidChar(read());
        },
        hexadecimalInteger: function hexadecimalInteger() {
          if (util.isHexDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        string: function string() {
          switch (c) {
            case "\\":
              read();
              buffer += escape();
              return;
            case '"':
              if (doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "'":
              if (!doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "\n":
            case "\r":
              throw invalidChar(read());
            case "\u2028":
            case "\u2029":
              separatorChar(c);
              break;
            case void 0:
              throw invalidChar(read());
          }
          buffer += read();
        },
        start: function start() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
          }
          lexState = "value";
        },
        beforePropertyName: function beforePropertyName() {
          switch (c) {
            case "$":
            case "_":
              buffer = read();
              lexState = "identifierName";
              return;
            case "\\":
              read();
              lexState = "identifierNameStartEscape";
              return;
            case "}":
              return newToken("punctuator", read());
            case '"':
            case "'":
              doubleQuote = read() === '"';
              lexState = "string";
              return;
          }
          if (util.isIdStartChar(c)) {
            buffer += read();
            lexState = "identifierName";
            return;
          }
          throw invalidChar(read());
        },
        afterPropertyName: function afterPropertyName() {
          if (c === ":") {
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforePropertyValue: function beforePropertyValue() {
          lexState = "value";
        },
        afterPropertyValue: function afterPropertyValue() {
          switch (c) {
            case ",":
            case "}":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforeArrayValue: function beforeArrayValue() {
          if (c === "]") {
            return newToken("punctuator", read());
          }
          lexState = "value";
        },
        afterArrayValue: function afterArrayValue() {
          switch (c) {
            case ",":
            case "]":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        end: function end() {
          throw invalidChar(read());
        }
      };
      function newToken(type, value) {
        return {
          type,
          value,
          line,
          column
        };
      }
      function literal(s) {
        for (var i = 0, list = s; i < list.length; i += 1) {
          var c2 = list[i];
          var p = peek();
          if (p !== c2) {
            throw invalidChar(read());
          }
          read();
        }
      }
      function escape() {
        var c2 = peek();
        switch (c2) {
          case "b":
            read();
            return "\b";
          case "f":
            read();
            return "\f";
          case "n":
            read();
            return "\n";
          case "r":
            read();
            return "\r";
          case "t":
            read();
            return "	";
          case "v":
            read();
            return "\v";
          case "0":
            read();
            if (util.isDigit(peek())) {
              throw invalidChar(read());
            }
            return "\0";
          case "x":
            read();
            return hexEscape();
          case "u":
            read();
            return unicodeEscape();
          case "\n":
          case "\u2028":
          case "\u2029":
            read();
            return "";
          case "\r":
            read();
            if (peek() === "\n") {
              read();
            }
            return "";
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            throw invalidChar(read());
          case void 0:
            throw invalidChar(read());
        }
        return read();
      }
      function hexEscape() {
        var buffer2 = "";
        var c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      function unicodeEscape() {
        var buffer2 = "";
        var count = 4;
        while (count-- > 0) {
          var c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
        }
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      var parseStates = {
        start: function start() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforePropertyName: function beforePropertyName() {
          switch (token.type) {
            case "identifier":
            case "string":
              key = token.value;
              parseState = "afterPropertyName";
              return;
            case "punctuator":
              pop();
              return;
            case "eof":
              throw invalidEOF();
          }
        },
        afterPropertyName: function afterPropertyName() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          parseState = "beforePropertyValue";
        },
        beforePropertyValue: function beforePropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforeArrayValue: function beforeArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          if (token.type === "punctuator" && token.value === "]") {
            pop();
            return;
          }
          push();
        },
        afterPropertyValue: function afterPropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforePropertyName";
              return;
            case "}":
              pop();
          }
        },
        afterArrayValue: function afterArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforeArrayValue";
              return;
            case "]":
              pop();
          }
        },
        end: function end() {
        }
      };
      function push() {
        var value;
        switch (token.type) {
          case "punctuator":
            switch (token.value) {
              case "{":
                value = {};
                break;
              case "[":
                value = [];
                break;
            }
            break;
          case "null":
          case "boolean":
          case "numeric":
          case "string":
            value = token.value;
            break;
        }
        if (root === void 0) {
          root = value;
        } else {
          var parent = stack[stack.length - 1];
          if (Array.isArray(parent)) {
            parent.push(value);
          } else {
            parent[key] = value;
          }
        }
        if (value !== null && typeof value === "object") {
          stack.push(value);
          if (Array.isArray(value)) {
            parseState = "beforeArrayValue";
          } else {
            parseState = "beforePropertyName";
          }
        } else {
          var current = stack[stack.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
      }
      function pop() {
        stack.pop();
        var current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
      function invalidChar(c2) {
        if (c2 === void 0) {
          return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
        }
        return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line + ":" + column);
      }
      function invalidEOF() {
        return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
      }
      function invalidIdentifier() {
        column -= 5;
        return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
      }
      function separatorChar(c2) {
        console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
      }
      function formatChar(c2) {
        var replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        if (replacements[c2]) {
          return replacements[c2];
        }
        if (c2 < " ") {
          var hexString = c2.charCodeAt(0).toString(16);
          return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c2;
      }
      function syntaxError(message) {
        var err = new SyntaxError(message);
        err.lineNumber = line;
        err.columnNumber = column;
        return err;
      }
      var stringify = function stringify2(value, replacer, space) {
        var stack2 = [];
        var indent = "";
        var propertyList;
        var replacerFunc;
        var gap = "";
        var quote;
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
          space = replacer.space;
          quote = replacer.quote;
          replacer = replacer.replacer;
        }
        if (typeof replacer === "function") {
          replacerFunc = replacer;
        } else if (Array.isArray(replacer)) {
          propertyList = [];
          for (var i = 0, list = replacer; i < list.length; i += 1) {
            var v = list[i];
            var item = void 0;
            if (typeof v === "string") {
              item = v;
            } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
              item = String(v);
            }
            if (item !== void 0 && propertyList.indexOf(item) < 0) {
              propertyList.push(item);
            }
          }
        }
        if (space instanceof Number) {
          space = Number(space);
        } else if (space instanceof String) {
          space = String(space);
        }
        if (typeof space === "number") {
          if (space > 0) {
            space = Math.min(10, Math.floor(space));
            gap = "          ".substr(0, space);
          }
        } else if (typeof space === "string") {
          gap = space.substr(0, 10);
        }
        return serializeProperty("", { "": value });
        function serializeProperty(key2, holder) {
          var value2 = holder[key2];
          if (value2 != null) {
            if (typeof value2.toJSON5 === "function") {
              value2 = value2.toJSON5(key2);
            } else if (typeof value2.toJSON === "function") {
              value2 = value2.toJSON(key2);
            }
          }
          if (replacerFunc) {
            value2 = replacerFunc.call(holder, key2, value2);
          }
          if (value2 instanceof Number) {
            value2 = Number(value2);
          } else if (value2 instanceof String) {
            value2 = String(value2);
          } else if (value2 instanceof Boolean) {
            value2 = value2.valueOf();
          }
          switch (value2) {
            case null:
              return "null";
            case true:
              return "true";
            case false:
              return "false";
          }
          if (typeof value2 === "string") {
            return quoteString(value2, false);
          }
          if (typeof value2 === "number") {
            return String(value2);
          }
          if (typeof value2 === "object") {
            return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
          }
          return void 0;
        }
        function quoteString(value2) {
          var quotes = {
            "'": 0.1,
            '"': 0.2
          };
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          var product = "";
          for (var i2 = 0; i2 < value2.length; i2++) {
            var c2 = value2[i2];
            switch (c2) {
              case "'":
              case '"':
                quotes[c2]++;
                product += c2;
                continue;
              case "\0":
                if (util.isDigit(value2[i2 + 1])) {
                  product += "\\x00";
                  continue;
                }
            }
            if (replacements[c2]) {
              product += replacements[c2];
              continue;
            }
            if (c2 < " ") {
              var hexString = c2.charCodeAt(0).toString(16);
              product += "\\x" + ("00" + hexString).substring(hexString.length);
              continue;
            }
            product += c2;
          }
          var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
            return quotes[a] < quotes[b] ? a : b;
          });
          product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
          return quoteChar + product + quoteChar;
        }
        function serializeObject(value2) {
          if (stack2.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack2.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var keys = propertyList || Object.keys(value2);
          var partial = [];
          for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
            var key2 = list2[i2];
            var propertyString = serializeProperty(key2, value2);
            if (propertyString !== void 0) {
              var member = serializeKey(key2) + ":";
              if (gap !== "") {
                member += " ";
              }
              member += propertyString;
              partial.push(member);
            }
          }
          var final;
          if (partial.length === 0) {
            final = "{}";
          } else {
            var properties2;
            if (gap === "") {
              properties2 = partial.join(",");
              final = "{" + properties2 + "}";
            } else {
              var separator = ",\n" + indent;
              properties2 = partial.join(separator);
              final = "{\n" + indent + properties2 + ",\n" + stepback + "}";
            }
          }
          stack2.pop();
          indent = stepback;
          return final;
        }
        function serializeKey(key2) {
          if (key2.length === 0) {
            return quoteString(key2, true);
          }
          var firstChar = String.fromCodePoint(key2.codePointAt(0));
          if (!util.isIdStartChar(firstChar)) {
            return quoteString(key2, true);
          }
          for (var i2 = firstChar.length; i2 < key2.length; i2++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
              return quoteString(key2, true);
            }
          }
          return key2;
        }
        function serializeArray(value2) {
          if (stack2.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack2.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var partial = [];
          for (var i2 = 0; i2 < value2.length; i2++) {
            var propertyString = serializeProperty(String(i2), value2);
            partial.push(propertyString !== void 0 ? propertyString : "null");
          }
          var final;
          if (partial.length === 0) {
            final = "[]";
          } else {
            if (gap === "") {
              var properties2 = partial.join(",");
              final = "[" + properties2 + "]";
            } else {
              var separator = ",\n" + indent;
              var properties$1 = partial.join(separator);
              final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
            }
          }
          stack2.pop();
          indent = stepback;
          return final;
        }
      };
      var JSON52 = {
        parse,
        stringify
      };
      var lib = JSON52;
      var es5 = lib;
      return es5;
    });
  }
});

// node_modules/big-integer/BigInteger.js
var require_BigInteger = __commonJS({
  "node_modules/big-integer/BigInteger.js"(exports, module) {
    var bigInt2 = function(undefined2) {
      "use strict";
      var BASE = 1e7, LOG_BASE = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
      var supportsNativeBigInt = typeof BigInt === "function";
      function Integer(v, radix, alphabet, caseSensitive) {
        if (typeof v === "undefined")
          return Integer[0];
        if (typeof radix !== "undefined")
          return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
        return parseValue(v);
      }
      function BigInteger3(value, sign) {
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
      }
      BigInteger3.prototype = Object.create(Integer.prototype);
      function SmallInteger(value) {
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
      }
      SmallInteger.prototype = Object.create(Integer.prototype);
      function NativeBigInt(value) {
        this.value = value;
      }
      NativeBigInt.prototype = Object.create(Integer.prototype);
      function isPrecise(n2) {
        return -MAX_INT < n2 && n2 < MAX_INT;
      }
      function smallToArray(n2) {
        if (n2 < 1e7)
          return [n2];
        if (n2 < 1e14)
          return [n2 % 1e7, Math.floor(n2 / 1e7)];
        return [n2 % 1e7, Math.floor(n2 / 1e7) % 1e7, Math.floor(n2 / 1e14)];
      }
      function arrayToSmall(arr) {
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
          switch (length) {
            case 0:
              return 0;
            case 1:
              return arr[0];
            case 2:
              return arr[0] + arr[1] * BASE;
            default:
              return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
          }
        }
        return arr;
      }
      function trim(v) {
        var i2 = v.length;
        while (v[--i2] === 0)
          ;
        v.length = i2 + 1;
      }
      function createArray(length) {
        var x = new Array(length);
        var i2 = -1;
        while (++i2 < length) {
          x[i2] = 0;
        }
        return x;
      }
      function truncate(n2) {
        if (n2 > 0)
          return Math.floor(n2);
        return Math.ceil(n2);
      }
      function add(a, b) {
        var l_a = a.length, l_b = b.length, r2 = new Array(l_a), carry = 0, base = BASE, sum, i2;
        for (i2 = 0; i2 < l_b; i2++) {
          sum = a[i2] + b[i2] + carry;
          carry = sum >= base ? 1 : 0;
          r2[i2] = sum - carry * base;
        }
        while (i2 < l_a) {
          sum = a[i2] + carry;
          carry = sum === base ? 1 : 0;
          r2[i2++] = sum - carry * base;
        }
        if (carry > 0)
          r2.push(carry);
        return r2;
      }
      function addAny(a, b) {
        if (a.length >= b.length)
          return add(a, b);
        return add(b, a);
      }
      function addSmall(a, carry) {
        var l = a.length, r2 = new Array(l), base = BASE, sum, i2;
        for (i2 = 0; i2 < l; i2++) {
          sum = a[i2] - base + carry;
          carry = Math.floor(sum / base);
          r2[i2] = sum - carry * base;
          carry += 1;
        }
        while (carry > 0) {
          r2[i2++] = carry % base;
          carry = Math.floor(carry / base);
        }
        return r2;
      }
      BigInteger3.prototype.add = function(v) {
        var n2 = parseValue(v);
        if (this.sign !== n2.sign) {
          return this.subtract(n2.negate());
        }
        var a = this.value, b = n2.value;
        if (n2.isSmall) {
          return new BigInteger3(addSmall(a, Math.abs(b)), this.sign);
        }
        return new BigInteger3(addAny(a, b), this.sign);
      };
      BigInteger3.prototype.plus = BigInteger3.prototype.add;
      SmallInteger.prototype.add = function(v) {
        var n2 = parseValue(v);
        var a = this.value;
        if (a < 0 !== n2.sign) {
          return this.subtract(n2.negate());
        }
        var b = n2.value;
        if (n2.isSmall) {
          if (isPrecise(a + b))
            return new SmallInteger(a + b);
          b = smallToArray(Math.abs(b));
        }
        return new BigInteger3(addSmall(b, Math.abs(a)), a < 0);
      };
      SmallInteger.prototype.plus = SmallInteger.prototype.add;
      NativeBigInt.prototype.add = function(v) {
        return new NativeBigInt(this.value + parseValue(v).value);
      };
      NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
      function subtract(a, b) {
        var a_l = a.length, b_l = b.length, r2 = new Array(a_l), borrow = 0, base = BASE, i2, difference;
        for (i2 = 0; i2 < b_l; i2++) {
          difference = a[i2] - borrow - b[i2];
          if (difference < 0) {
            difference += base;
            borrow = 1;
          } else
            borrow = 0;
          r2[i2] = difference;
        }
        for (i2 = b_l; i2 < a_l; i2++) {
          difference = a[i2] - borrow;
          if (difference < 0)
            difference += base;
          else {
            r2[i2++] = difference;
            break;
          }
          r2[i2] = difference;
        }
        for (; i2 < a_l; i2++) {
          r2[i2] = a[i2];
        }
        trim(r2);
        return r2;
      }
      function subtractAny(a, b, sign) {
        var value;
        if (compareAbs(a, b) >= 0) {
          value = subtract(a, b);
        } else {
          value = subtract(b, a);
          sign = !sign;
        }
        value = arrayToSmall(value);
        if (typeof value === "number") {
          if (sign)
            value = -value;
          return new SmallInteger(value);
        }
        return new BigInteger3(value, sign);
      }
      function subtractSmall(a, b, sign) {
        var l = a.length, r2 = new Array(l), carry = -b, base = BASE, i2, difference;
        for (i2 = 0; i2 < l; i2++) {
          difference = a[i2] + carry;
          carry = Math.floor(difference / base);
          difference %= base;
          r2[i2] = difference < 0 ? difference + base : difference;
        }
        r2 = arrayToSmall(r2);
        if (typeof r2 === "number") {
          if (sign)
            r2 = -r2;
          return new SmallInteger(r2);
        }
        return new BigInteger3(r2, sign);
      }
      BigInteger3.prototype.subtract = function(v) {
        var n2 = parseValue(v);
        if (this.sign !== n2.sign) {
          return this.add(n2.negate());
        }
        var a = this.value, b = n2.value;
        if (n2.isSmall)
          return subtractSmall(a, Math.abs(b), this.sign);
        return subtractAny(a, b, this.sign);
      };
      BigInteger3.prototype.minus = BigInteger3.prototype.subtract;
      SmallInteger.prototype.subtract = function(v) {
        var n2 = parseValue(v);
        var a = this.value;
        if (a < 0 !== n2.sign) {
          return this.add(n2.negate());
        }
        var b = n2.value;
        if (n2.isSmall) {
          return new SmallInteger(a - b);
        }
        return subtractSmall(b, Math.abs(a), a >= 0);
      };
      SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
      NativeBigInt.prototype.subtract = function(v) {
        return new NativeBigInt(this.value - parseValue(v).value);
      };
      NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
      BigInteger3.prototype.negate = function() {
        return new BigInteger3(this.value, !this.sign);
      };
      SmallInteger.prototype.negate = function() {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
      };
      NativeBigInt.prototype.negate = function() {
        return new NativeBigInt(-this.value);
      };
      BigInteger3.prototype.abs = function() {
        return new BigInteger3(this.value, false);
      };
      SmallInteger.prototype.abs = function() {
        return new SmallInteger(Math.abs(this.value));
      };
      NativeBigInt.prototype.abs = function() {
        return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
      };
      function multiplyLong(a, b) {
        var a_l = a.length, b_l = b.length, l = a_l + b_l, r2 = createArray(l), base = BASE, product, carry, i2, a_i, b_j;
        for (i2 = 0; i2 < a_l; ++i2) {
          a_i = a[i2];
          for (var j = 0; j < b_l; ++j) {
            b_j = b[j];
            product = a_i * b_j + r2[i2 + j];
            carry = Math.floor(product / base);
            r2[i2 + j] = product - carry * base;
            r2[i2 + j + 1] += carry;
          }
        }
        trim(r2);
        return r2;
      }
      function multiplySmall(a, b) {
        var l = a.length, r2 = new Array(l), base = BASE, carry = 0, product, i2;
        for (i2 = 0; i2 < l; i2++) {
          product = a[i2] * b + carry;
          carry = Math.floor(product / base);
          r2[i2] = product - carry * base;
        }
        while (carry > 0) {
          r2[i2++] = carry % base;
          carry = Math.floor(carry / base);
        }
        return r2;
      }
      function shiftLeft(x, n2) {
        var r2 = [];
        while (n2-- > 0)
          r2.push(0);
        return r2.concat(x);
      }
      function multiplyKaratsuba(x, y) {
        var n2 = Math.max(x.length, y.length);
        if (n2 <= 30)
          return multiplyLong(x, y);
        n2 = Math.ceil(n2 / 2);
        var b = x.slice(n2), a = x.slice(0, n2), d = y.slice(n2), c = y.slice(0, n2);
        var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d), abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n2)), shiftLeft(bd, 2 * n2));
        trim(product);
        return product;
      }
      function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 15e-6 * l1 * l2 > 0;
      }
      BigInteger3.prototype.multiply = function(v) {
        var n2 = parseValue(v), a = this.value, b = n2.value, sign = this.sign !== n2.sign, abs;
        if (n2.isSmall) {
          if (b === 0)
            return Integer[0];
          if (b === 1)
            return this;
          if (b === -1)
            return this.negate();
          abs = Math.abs(b);
          if (abs < BASE) {
            return new BigInteger3(multiplySmall(a, abs), sign);
          }
          b = smallToArray(abs);
        }
        if (useKaratsuba(a.length, b.length))
          return new BigInteger3(multiplyKaratsuba(a, b), sign);
        return new BigInteger3(multiplyLong(a, b), sign);
      };
      BigInteger3.prototype.times = BigInteger3.prototype.multiply;
      function multiplySmallAndArray(a, b, sign) {
        if (a < BASE) {
          return new BigInteger3(multiplySmall(b, a), sign);
        }
        return new BigInteger3(multiplyLong(b, smallToArray(a)), sign);
      }
      SmallInteger.prototype._multiplyBySmall = function(a) {
        if (isPrecise(a.value * this.value)) {
          return new SmallInteger(a.value * this.value);
        }
        return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
      };
      BigInteger3.prototype._multiplyBySmall = function(a) {
        if (a.value === 0)
          return Integer[0];
        if (a.value === 1)
          return this;
        if (a.value === -1)
          return this.negate();
        return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
      };
      SmallInteger.prototype.multiply = function(v) {
        return parseValue(v)._multiplyBySmall(this);
      };
      SmallInteger.prototype.times = SmallInteger.prototype.multiply;
      NativeBigInt.prototype.multiply = function(v) {
        return new NativeBigInt(this.value * parseValue(v).value);
      };
      NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
      function square(a) {
        var l = a.length, r2 = createArray(l + l), base = BASE, product, carry, i2, a_i, a_j;
        for (i2 = 0; i2 < l; i2++) {
          a_i = a[i2];
          carry = 0 - a_i * a_i;
          for (var j = i2; j < l; j++) {
            a_j = a[j];
            product = 2 * (a_i * a_j) + r2[i2 + j] + carry;
            carry = Math.floor(product / base);
            r2[i2 + j] = product - carry * base;
          }
          r2[i2 + l] = carry;
        }
        trim(r2);
        return r2;
      }
      BigInteger3.prototype.square = function() {
        return new BigInteger3(square(this.value), false);
      };
      SmallInteger.prototype.square = function() {
        var value = this.value * this.value;
        if (isPrecise(value))
          return new SmallInteger(value);
        return new BigInteger3(square(smallToArray(Math.abs(this.value))), false);
      };
      NativeBigInt.prototype.square = function(v) {
        return new NativeBigInt(this.value * this.value);
      };
      function divMod1(a, b) {
        var a_l = a.length, b_l = b.length, base = BASE, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i2, l, q;
        if (remainder.length <= a_l)
          remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
          quotientDigit = base - 1;
          if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
            quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
          }
          carry = 0;
          borrow = 0;
          l = divisor.length;
          for (i2 = 0; i2 < l; i2++) {
            carry += quotientDigit * divisor[i2];
            q = Math.floor(carry / base);
            borrow += remainder[shift + i2] - (carry - q * base);
            carry = q;
            if (borrow < 0) {
              remainder[shift + i2] = borrow + base;
              borrow = -1;
            } else {
              remainder[shift + i2] = borrow;
              borrow = 0;
            }
          }
          while (borrow !== 0) {
            quotientDigit -= 1;
            carry = 0;
            for (i2 = 0; i2 < l; i2++) {
              carry += remainder[shift + i2] - base + divisor[i2];
              if (carry < 0) {
                remainder[shift + i2] = carry + base;
                carry = 0;
              } else {
                remainder[shift + i2] = carry;
                carry = 1;
              }
            }
            borrow += carry;
          }
          result[shift] = quotientDigit;
        }
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
      }
      function divMod2(a, b) {
        var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE, guess, xlen, highx, highy, check;
        while (a_l) {
          part.unshift(a[--a_l]);
          trim(part);
          if (compareAbs(part, b) < 0) {
            result.push(0);
            continue;
          }
          xlen = part.length;
          highx = part[xlen - 1] * base + part[xlen - 2];
          highy = b[b_l - 1] * base + b[b_l - 2];
          if (xlen > b_l) {
            highx = (highx + 1) * base;
          }
          guess = Math.ceil(highx / highy);
          do {
            check = multiplySmall(b, guess);
            if (compareAbs(check, part) <= 0)
              break;
            guess--;
          } while (guess);
          result.push(guess);
          part = subtract(part, check);
        }
        result.reverse();
        return [arrayToSmall(result), arrayToSmall(part)];
      }
      function divModSmall(value, lambda) {
        var length = value.length, quotient = createArray(length), base = BASE, i2, q, remainder, divisor;
        remainder = 0;
        for (i2 = length - 1; i2 >= 0; --i2) {
          divisor = remainder * base + value[i2];
          q = truncate(divisor / lambda);
          remainder = divisor - q * lambda;
          quotient[i2] = q | 0;
        }
        return [quotient, remainder | 0];
      }
      function divModAny(self2, v) {
        var value, n2 = parseValue(v);
        if (supportsNativeBigInt) {
          return [new NativeBigInt(self2.value / n2.value), new NativeBigInt(self2.value % n2.value)];
        }
        var a = self2.value, b = n2.value;
        var quotient;
        if (b === 0)
          throw new Error("Cannot divide by zero");
        if (self2.isSmall) {
          if (n2.isSmall) {
            return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
          }
          return [Integer[0], self2];
        }
        if (n2.isSmall) {
          if (b === 1)
            return [self2, Integer[0]];
          if (b == -1)
            return [self2.negate(), Integer[0]];
          var abs = Math.abs(b);
          if (abs < BASE) {
            value = divModSmall(a, abs);
            quotient = arrayToSmall(value[0]);
            var remainder = value[1];
            if (self2.sign)
              remainder = -remainder;
            if (typeof quotient === "number") {
              if (self2.sign !== n2.sign)
                quotient = -quotient;
              return [new SmallInteger(quotient), new SmallInteger(remainder)];
            }
            return [new BigInteger3(quotient, self2.sign !== n2.sign), new SmallInteger(remainder)];
          }
          b = smallToArray(abs);
        }
        var comparison = compareAbs(a, b);
        if (comparison === -1)
          return [Integer[0], self2];
        if (comparison === 0)
          return [Integer[self2.sign === n2.sign ? 1 : -1], Integer[0]];
        if (a.length + b.length <= 200)
          value = divMod1(a, b);
        else
          value = divMod2(a, b);
        quotient = value[0];
        var qSign = self2.sign !== n2.sign, mod = value[1], mSign = self2.sign;
        if (typeof quotient === "number") {
          if (qSign)
            quotient = -quotient;
          quotient = new SmallInteger(quotient);
        } else
          quotient = new BigInteger3(quotient, qSign);
        if (typeof mod === "number") {
          if (mSign)
            mod = -mod;
          mod = new SmallInteger(mod);
        } else
          mod = new BigInteger3(mod, mSign);
        return [quotient, mod];
      }
      BigInteger3.prototype.divmod = function(v) {
        var result = divModAny(this, v);
        return {
          quotient: result[0],
          remainder: result[1]
        };
      };
      NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger3.prototype.divmod;
      BigInteger3.prototype.divide = function(v) {
        return divModAny(this, v)[0];
      };
      NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function(v) {
        return new NativeBigInt(this.value / parseValue(v).value);
      };
      SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger3.prototype.over = BigInteger3.prototype.divide;
      BigInteger3.prototype.mod = function(v) {
        return divModAny(this, v)[1];
      };
      NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function(v) {
        return new NativeBigInt(this.value % parseValue(v).value);
      };
      SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger3.prototype.remainder = BigInteger3.prototype.mod;
      BigInteger3.prototype.pow = function(v) {
        var n2 = parseValue(v), a = this.value, b = n2.value, value, x, y;
        if (b === 0)
          return Integer[1];
        if (a === 0)
          return Integer[0];
        if (a === 1)
          return Integer[1];
        if (a === -1)
          return n2.isEven() ? Integer[1] : Integer[-1];
        if (n2.sign) {
          return Integer[0];
        }
        if (!n2.isSmall)
          throw new Error("The exponent " + n2.toString() + " is too large.");
        if (this.isSmall) {
          if (isPrecise(value = Math.pow(a, b)))
            return new SmallInteger(truncate(value));
        }
        x = this;
        y = Integer[1];
        while (true) {
          if (b & true) {
            y = y.times(x);
            --b;
          }
          if (b === 0)
            break;
          b /= 2;
          x = x.square();
        }
        return y;
      };
      SmallInteger.prototype.pow = BigInteger3.prototype.pow;
      NativeBigInt.prototype.pow = function(v) {
        var n2 = parseValue(v);
        var a = this.value, b = n2.value;
        var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
        if (b === _0)
          return Integer[1];
        if (a === _0)
          return Integer[0];
        if (a === _1)
          return Integer[1];
        if (a === BigInt(-1))
          return n2.isEven() ? Integer[1] : Integer[-1];
        if (n2.isNegative())
          return new NativeBigInt(_0);
        var x = this;
        var y = Integer[1];
        while (true) {
          if ((b & _1) === _1) {
            y = y.times(x);
            --b;
          }
          if (b === _0)
            break;
          b /= _2;
          x = x.square();
        }
        return y;
      };
      BigInteger3.prototype.modPow = function(exp, mod) {
        exp = parseValue(exp);
        mod = parseValue(mod);
        if (mod.isZero())
          throw new Error("Cannot take modPow with modulus 0");
        var r2 = Integer[1], base = this.mod(mod);
        if (exp.isNegative()) {
          exp = exp.multiply(Integer[-1]);
          base = base.modInv(mod);
        }
        while (exp.isPositive()) {
          if (base.isZero())
            return Integer[0];
          if (exp.isOdd())
            r2 = r2.multiply(base).mod(mod);
          exp = exp.divide(2);
          base = base.square().mod(mod);
        }
        return r2;
      };
      NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger3.prototype.modPow;
      function compareAbs(a, b) {
        if (a.length !== b.length) {
          return a.length > b.length ? 1 : -1;
        }
        for (var i2 = a.length - 1; i2 >= 0; i2--) {
          if (a[i2] !== b[i2])
            return a[i2] > b[i2] ? 1 : -1;
        }
        return 0;
      }
      BigInteger3.prototype.compareAbs = function(v) {
        var n2 = parseValue(v), a = this.value, b = n2.value;
        if (n2.isSmall)
          return 1;
        return compareAbs(a, b);
      };
      SmallInteger.prototype.compareAbs = function(v) {
        var n2 = parseValue(v), a = Math.abs(this.value), b = n2.value;
        if (n2.isSmall) {
          b = Math.abs(b);
          return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
      };
      NativeBigInt.prototype.compareAbs = function(v) {
        var a = this.value;
        var b = parseValue(v).value;
        a = a >= 0 ? a : -a;
        b = b >= 0 ? b : -b;
        return a === b ? 0 : a > b ? 1 : -1;
      };
      BigInteger3.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var n2 = parseValue(v), a = this.value, b = n2.value;
        if (this.sign !== n2.sign) {
          return n2.sign ? 1 : -1;
        }
        if (n2.isSmall) {
          return this.sign ? -1 : 1;
        }
        return compareAbs(a, b) * (this.sign ? -1 : 1);
      };
      BigInteger3.prototype.compareTo = BigInteger3.prototype.compare;
      SmallInteger.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var n2 = parseValue(v), a = this.value, b = n2.value;
        if (n2.isSmall) {
          return a == b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n2.sign) {
          return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
      };
      SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
      NativeBigInt.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var a = this.value;
        var b = parseValue(v).value;
        return a === b ? 0 : a > b ? 1 : -1;
      };
      NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
      BigInteger3.prototype.equals = function(v) {
        return this.compare(v) === 0;
      };
      NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger3.prototype.eq = BigInteger3.prototype.equals;
      BigInteger3.prototype.notEquals = function(v) {
        return this.compare(v) !== 0;
      };
      NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger3.prototype.neq = BigInteger3.prototype.notEquals;
      BigInteger3.prototype.greater = function(v) {
        return this.compare(v) > 0;
      };
      NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger3.prototype.gt = BigInteger3.prototype.greater;
      BigInteger3.prototype.lesser = function(v) {
        return this.compare(v) < 0;
      };
      NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger3.prototype.lt = BigInteger3.prototype.lesser;
      BigInteger3.prototype.greaterOrEquals = function(v) {
        return this.compare(v) >= 0;
      };
      NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger3.prototype.geq = BigInteger3.prototype.greaterOrEquals;
      BigInteger3.prototype.lesserOrEquals = function(v) {
        return this.compare(v) <= 0;
      };
      NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger3.prototype.leq = BigInteger3.prototype.lesserOrEquals;
      BigInteger3.prototype.isEven = function() {
        return (this.value[0] & 1) === 0;
      };
      SmallInteger.prototype.isEven = function() {
        return (this.value & 1) === 0;
      };
      NativeBigInt.prototype.isEven = function() {
        return (this.value & BigInt(1)) === BigInt(0);
      };
      BigInteger3.prototype.isOdd = function() {
        return (this.value[0] & 1) === 1;
      };
      SmallInteger.prototype.isOdd = function() {
        return (this.value & 1) === 1;
      };
      NativeBigInt.prototype.isOdd = function() {
        return (this.value & BigInt(1)) === BigInt(1);
      };
      BigInteger3.prototype.isPositive = function() {
        return !this.sign;
      };
      SmallInteger.prototype.isPositive = function() {
        return this.value > 0;
      };
      NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
      BigInteger3.prototype.isNegative = function() {
        return this.sign;
      };
      SmallInteger.prototype.isNegative = function() {
        return this.value < 0;
      };
      NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
      BigInteger3.prototype.isUnit = function() {
        return false;
      };
      SmallInteger.prototype.isUnit = function() {
        return Math.abs(this.value) === 1;
      };
      NativeBigInt.prototype.isUnit = function() {
        return this.abs().value === BigInt(1);
      };
      BigInteger3.prototype.isZero = function() {
        return false;
      };
      SmallInteger.prototype.isZero = function() {
        return this.value === 0;
      };
      NativeBigInt.prototype.isZero = function() {
        return this.value === BigInt(0);
      };
      BigInteger3.prototype.isDivisibleBy = function(v) {
        var n2 = parseValue(v);
        if (n2.isZero())
          return false;
        if (n2.isUnit())
          return true;
        if (n2.compareAbs(2) === 0)
          return this.isEven();
        return this.mod(n2).isZero();
      };
      NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger3.prototype.isDivisibleBy;
      function isBasicPrime(v) {
        var n2 = v.abs();
        if (n2.isUnit())
          return false;
        if (n2.equals(2) || n2.equals(3) || n2.equals(5))
          return true;
        if (n2.isEven() || n2.isDivisibleBy(3) || n2.isDivisibleBy(5))
          return false;
        if (n2.lesser(49))
          return true;
      }
      function millerRabinTest(n2, a) {
        var nPrev = n2.prev(), b = nPrev, r2 = 0, d, t2, i2, x;
        while (b.isEven())
          b = b.divide(2), r2++;
        next:
          for (i2 = 0; i2 < a.length; i2++) {
            if (n2.lesser(a[i2]))
              continue;
            x = bigInt2(a[i2]).modPow(b, n2);
            if (x.isUnit() || x.equals(nPrev))
              continue;
            for (d = r2 - 1; d != 0; d--) {
              x = x.square().mod(n2);
              if (x.isUnit())
                return false;
              if (x.equals(nPrev))
                continue next;
            }
            return false;
          }
        return true;
      }
      BigInteger3.prototype.isPrime = function(strict) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined2)
          return isPrime;
        var n2 = this.abs();
        var bits = n2.bitLength();
        if (bits <= 64)
          return millerRabinTest(n2, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
        var logN = Math.log(2) * bits.toJSNumber();
        var t2 = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
        for (var a = [], i2 = 0; i2 < t2; i2++) {
          a.push(bigInt2(i2 + 2));
        }
        return millerRabinTest(n2, a);
      };
      NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger3.prototype.isPrime;
      BigInteger3.prototype.isProbablePrime = function(iterations, rng) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined2)
          return isPrime;
        var n2 = this.abs();
        var t2 = iterations === undefined2 ? 5 : iterations;
        for (var a = [], i2 = 0; i2 < t2; i2++) {
          a.push(bigInt2.randBetween(2, n2.minus(2), rng));
        }
        return millerRabinTest(n2, a);
      };
      NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger3.prototype.isProbablePrime;
      BigInteger3.prototype.modInv = function(n2) {
        var t2 = bigInt2.zero, newT = bigInt2.one, r2 = parseValue(n2), newR = this.abs(), q, lastT, lastR;
        while (!newR.isZero()) {
          q = r2.divide(newR);
          lastT = t2;
          lastR = r2;
          t2 = newT;
          r2 = newR;
          newT = lastT.subtract(q.multiply(newT));
          newR = lastR.subtract(q.multiply(newR));
        }
        if (!r2.isUnit())
          throw new Error(this.toString() + " and " + n2.toString() + " are not co-prime");
        if (t2.compare(0) === -1) {
          t2 = t2.add(n2);
        }
        if (this.isNegative()) {
          return t2.negate();
        }
        return t2;
      };
      NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger3.prototype.modInv;
      BigInteger3.prototype.next = function() {
        var value = this.value;
        if (this.sign) {
          return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger3(addSmall(value, 1), this.sign);
      };
      SmallInteger.prototype.next = function() {
        var value = this.value;
        if (value + 1 < MAX_INT)
          return new SmallInteger(value + 1);
        return new BigInteger3(MAX_INT_ARR, false);
      };
      NativeBigInt.prototype.next = function() {
        return new NativeBigInt(this.value + BigInt(1));
      };
      BigInteger3.prototype.prev = function() {
        var value = this.value;
        if (this.sign) {
          return new BigInteger3(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
      };
      SmallInteger.prototype.prev = function() {
        var value = this.value;
        if (value - 1 > -MAX_INT)
          return new SmallInteger(value - 1);
        return new BigInteger3(MAX_INT_ARR, true);
      };
      NativeBigInt.prototype.prev = function() {
        return new NativeBigInt(this.value - BigInt(1));
      };
      var powersOfTwo = [1];
      while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE)
        powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
      var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
      function shift_isSmall(n2) {
        return Math.abs(n2) <= BASE;
      }
      BigInteger3.prototype.shiftLeft = function(v) {
        var n2 = parseValue(v).toJSNumber();
        if (!shift_isSmall(n2)) {
          throw new Error(String(n2) + " is too large for shifting.");
        }
        if (n2 < 0)
          return this.shiftRight(-n2);
        var result = this;
        if (result.isZero())
          return result;
        while (n2 >= powers2Length) {
          result = result.multiply(highestPower2);
          n2 -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n2]);
      };
      NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger3.prototype.shiftLeft;
      BigInteger3.prototype.shiftRight = function(v) {
        var remQuo;
        var n2 = parseValue(v).toJSNumber();
        if (!shift_isSmall(n2)) {
          throw new Error(String(n2) + " is too large for shifting.");
        }
        if (n2 < 0)
          return this.shiftLeft(-n2);
        var result = this;
        while (n2 >= powers2Length) {
          if (result.isZero() || result.isNegative() && result.isUnit())
            return result;
          remQuo = divModAny(result, highestPower2);
          result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
          n2 -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n2]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
      };
      NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger3.prototype.shiftRight;
      function bitwise(x, y, fn) {
        y = parseValue(y);
        var xSign = x.isNegative(), ySign = y.isNegative();
        var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
        var xDigit = 0, yDigit = 0;
        var xDivMod = null, yDivMod = null;
        var result = [];
        while (!xRem.isZero() || !yRem.isZero()) {
          xDivMod = divModAny(xRem, highestPower2);
          xDigit = xDivMod[1].toJSNumber();
          if (xSign) {
            xDigit = highestPower2 - 1 - xDigit;
          }
          yDivMod = divModAny(yRem, highestPower2);
          yDigit = yDivMod[1].toJSNumber();
          if (ySign) {
            yDigit = highestPower2 - 1 - yDigit;
          }
          xRem = xDivMod[0];
          yRem = yDivMod[0];
          result.push(fn(xDigit, yDigit));
        }
        var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt2(-1) : bigInt2(0);
        for (var i2 = result.length - 1; i2 >= 0; i2 -= 1) {
          sum = sum.multiply(highestPower2).add(bigInt2(result[i2]));
        }
        return sum;
      }
      BigInteger3.prototype.not = function() {
        return this.negate().prev();
      };
      NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger3.prototype.not;
      BigInteger3.prototype.and = function(n2) {
        return bitwise(this, n2, function(a, b) {
          return a & b;
        });
      };
      NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger3.prototype.and;
      BigInteger3.prototype.or = function(n2) {
        return bitwise(this, n2, function(a, b) {
          return a | b;
        });
      };
      NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger3.prototype.or;
      BigInteger3.prototype.xor = function(n2) {
        return bitwise(this, n2, function(a, b) {
          return a ^ b;
        });
      };
      NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger3.prototype.xor;
      var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
      function roughLOB(n2) {
        var v = n2.value, x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
      }
      function integerLogarithm(value, base) {
        if (base.compareTo(value) <= 0) {
          var tmp = integerLogarithm(value, base.square(base));
          var p = tmp.p;
          var e2 = tmp.e;
          var t2 = p.multiply(base);
          return t2.compareTo(value) <= 0 ? { p: t2, e: e2 * 2 + 1 } : { p, e: e2 * 2 };
        }
        return { p: bigInt2(1), e: 0 };
      }
      BigInteger3.prototype.bitLength = function() {
        var n2 = this;
        if (n2.compareTo(bigInt2(0)) < 0) {
          n2 = n2.negate().subtract(bigInt2(1));
        }
        if (n2.compareTo(bigInt2(0)) === 0) {
          return bigInt2(0);
        }
        return bigInt2(integerLogarithm(n2, bigInt2(2)).e).add(bigInt2(1));
      };
      NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger3.prototype.bitLength;
      function max(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.greater(b) ? a : b;
      }
      function min(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.lesser(b) ? a : b;
      }
      function gcd(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        if (a.equals(b))
          return a;
        if (a.isZero())
          return b;
        if (b.isZero())
          return a;
        var c = Integer[1], d, t2;
        while (a.isEven() && b.isEven()) {
          d = min(roughLOB(a), roughLOB(b));
          a = a.divide(d);
          b = b.divide(d);
          c = c.multiply(d);
        }
        while (a.isEven()) {
          a = a.divide(roughLOB(a));
        }
        do {
          while (b.isEven()) {
            b = b.divide(roughLOB(b));
          }
          if (a.greater(b)) {
            t2 = b;
            b = a;
            a = t2;
          }
          b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
      }
      function lcm(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        return a.divide(gcd(a, b)).multiply(b);
      }
      function randBetween(a, b, rng) {
        a = parseValue(a);
        b = parseValue(b);
        var usedRNG = rng || Math.random;
        var low = min(a, b), high = max(a, b);
        var range = high.subtract(low).add(1);
        if (range.isSmall)
          return low.add(Math.floor(usedRNG() * range));
        var digits = toBase(range, BASE).value;
        var result = [], restricted = true;
        for (var i2 = 0; i2 < digits.length; i2++) {
          var top = restricted ? digits[i2] + (i2 + 1 < digits.length ? digits[i2 + 1] / BASE : 0) : BASE;
          var digit = truncate(usedRNG() * top);
          result.push(digit);
          if (digit < digits[i2])
            restricted = false;
        }
        return low.add(Integer.fromArray(result, BASE, false));
      }
      var parseBase = function(text, base, alphabet, caseSensitive) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        text = String(text);
        if (!caseSensitive) {
          text = text.toLowerCase();
          alphabet = alphabet.toLowerCase();
        }
        var length = text.length;
        var i2;
        var absBase = Math.abs(base);
        var alphabetValues = {};
        for (i2 = 0; i2 < alphabet.length; i2++) {
          alphabetValues[alphabet[i2]] = i2;
        }
        for (i2 = 0; i2 < length; i2++) {
          var c = text[i2];
          if (c === "-")
            continue;
          if (c in alphabetValues) {
            if (alphabetValues[c] >= absBase) {
              if (c === "1" && absBase === 1)
                continue;
              throw new Error(c + " is not a valid digit in base " + base + ".");
            }
          }
        }
        base = parseValue(base);
        var digits = [];
        var isNegative = text[0] === "-";
        for (i2 = isNegative ? 1 : 0; i2 < text.length; i2++) {
          var c = text[i2];
          if (c in alphabetValues)
            digits.push(parseValue(alphabetValues[c]));
          else if (c === "<") {
            var start = i2;
            do {
              i2++;
            } while (text[i2] !== ">" && i2 < text.length);
            digits.push(parseValue(text.slice(start + 1, i2)));
          } else
            throw new Error(c + " is not a valid character");
        }
        return parseBaseFromArray(digits, base, isNegative);
      };
      function parseBaseFromArray(digits, base, isNegative) {
        var val = Integer[0], pow = Integer[1], i2;
        for (i2 = digits.length - 1; i2 >= 0; i2--) {
          val = val.add(digits[i2].times(pow));
          pow = pow.times(base);
        }
        return isNegative ? val.negate() : val;
      }
      function stringify(digit, alphabet) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        if (digit < alphabet.length) {
          return alphabet[digit];
        }
        return "<" + digit + ">";
      }
      function toBase(n2, base) {
        base = bigInt2(base);
        if (base.isZero()) {
          if (n2.isZero())
            return { value: [0], isNegative: false };
          throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (base.equals(-1)) {
          if (n2.isZero())
            return { value: [0], isNegative: false };
          if (n2.isNegative())
            return {
              value: [].concat.apply([], Array.apply(null, Array(-n2.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
              isNegative: false
            };
          var arr = Array.apply(null, Array(n2.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
          arr.unshift([1]);
          return {
            value: [].concat.apply([], arr),
            isNegative: false
          };
        }
        var neg = false;
        if (n2.isNegative() && base.isPositive()) {
          neg = true;
          n2 = n2.abs();
        }
        if (base.isUnit()) {
          if (n2.isZero())
            return { value: [0], isNegative: false };
          return {
            value: Array.apply(null, Array(n2.toJSNumber())).map(Number.prototype.valueOf, 1),
            isNegative: neg
          };
        }
        var out = [];
        var left = n2, divmod;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
          divmod = left.divmod(base);
          left = divmod.quotient;
          var digit = divmod.remainder;
          if (digit.isNegative()) {
            digit = base.minus(digit).abs();
            left = left.next();
          }
          out.push(digit.toJSNumber());
        }
        out.push(left.toJSNumber());
        return { value: out.reverse(), isNegative: neg };
      }
      function toBaseString(n2, base, alphabet) {
        var arr = toBase(n2, base);
        return (arr.isNegative ? "-" : "") + arr.value.map(function(x) {
          return stringify(x, alphabet);
        }).join("");
      }
      BigInteger3.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      SmallInteger.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      NativeBigInt.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      BigInteger3.prototype.toString = function(radix, alphabet) {
        if (radix === undefined2)
          radix = 10;
        if (radix !== 10)
          return toBaseString(this, radix, alphabet);
        var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
        while (--l >= 0) {
          digit = String(v[l]);
          str += zeros.slice(digit.length) + digit;
        }
        var sign = this.sign ? "-" : "";
        return sign + str;
      };
      SmallInteger.prototype.toString = function(radix, alphabet) {
        if (radix === undefined2)
          radix = 10;
        if (radix != 10)
          return toBaseString(this, radix, alphabet);
        return String(this.value);
      };
      NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
      NativeBigInt.prototype.toJSON = BigInteger3.prototype.toJSON = SmallInteger.prototype.toJSON = function() {
        return this.toString();
      };
      BigInteger3.prototype.valueOf = function() {
        return parseInt(this.toString(), 10);
      };
      BigInteger3.prototype.toJSNumber = BigInteger3.prototype.valueOf;
      SmallInteger.prototype.valueOf = function() {
        return this.value;
      };
      SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
      NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function() {
        return parseInt(this.toString(), 10);
      };
      function parseStringValue(v) {
        if (isPrecise(+v)) {
          var x = +v;
          if (x === truncate(x))
            return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
          throw new Error("Invalid integer: " + v);
        }
        var sign = v[0] === "-";
        if (sign)
          v = v.slice(1);
        var split = v.split(/e/i);
        if (split.length > 2)
          throw new Error("Invalid integer: " + split.join("e"));
        if (split.length === 2) {
          var exp = split[1];
          if (exp[0] === "+")
            exp = exp.slice(1);
          exp = +exp;
          if (exp !== truncate(exp) || !isPrecise(exp))
            throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
          var text = split[0];
          var decimalPlace = text.indexOf(".");
          if (decimalPlace >= 0) {
            exp -= text.length - decimalPlace - 1;
            text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
          }
          if (exp < 0)
            throw new Error("Cannot include negative exponent part for integers");
          text += new Array(exp + 1).join("0");
          v = text;
        }
        var isValid = /^([0-9][0-9]*)$/.test(v);
        if (!isValid)
          throw new Error("Invalid integer: " + v);
        if (supportsNativeBigInt) {
          return new NativeBigInt(BigInt(sign ? "-" + v : v));
        }
        var r2 = [], max2 = v.length, l = LOG_BASE, min2 = max2 - l;
        while (max2 > 0) {
          r2.push(+v.slice(min2, max2));
          min2 -= l;
          if (min2 < 0)
            min2 = 0;
          max2 -= l;
        }
        trim(r2);
        return new BigInteger3(r2, sign);
      }
      function parseNumberValue(v) {
        if (supportsNativeBigInt) {
          return new NativeBigInt(BigInt(v));
        }
        if (isPrecise(v)) {
          if (v !== truncate(v))
            throw new Error(v + " is not an integer.");
          return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
      }
      function parseValue(v) {
        if (typeof v === "number") {
          return parseNumberValue(v);
        }
        if (typeof v === "string") {
          return parseStringValue(v);
        }
        if (typeof v === "bigint") {
          return new NativeBigInt(v);
        }
        return v;
      }
      for (var i = 0; i < 1e3; i++) {
        Integer[i] = parseValue(i);
        if (i > 0)
          Integer[-i] = parseValue(-i);
      }
      Integer.one = Integer[1];
      Integer.zero = Integer[0];
      Integer.minusOne = Integer[-1];
      Integer.max = max;
      Integer.min = min;
      Integer.gcd = gcd;
      Integer.lcm = lcm;
      Integer.isInstance = function(x) {
        return x instanceof BigInteger3 || x instanceof SmallInteger || x instanceof NativeBigInt;
      };
      Integer.randBetween = randBetween;
      Integer.fromArray = function(digits, base, isNegative) {
        return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
      };
      return Integer;
    }();
    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
      module.exports = bigInt2;
    }
    if (typeof define === "function" && define.amd) {
      define(function() {
        return bigInt2;
      });
    }
  }
});

// app/entry.worker.ts
var import_fuzzy_json_search = __toESM(require_lib());

// node_modules/ip-address/dist/esm/lib/common.js
function isInSubnet(address) {
  if (this.subnetMask < address.subnetMask) {
    return false;
  }
  if (this.mask(address.subnetMask) === address.mask()) {
    return true;
  }
  return false;
}
function isCorrect(defaultBits) {
  return function() {
    if (this.addressMinusSuffix !== this.correctForm()) {
      return false;
    }
    if (this.subnetMask === defaultBits && !this.parsedSubnet) {
      return true;
    }
    return this.parsedSubnet === String(this.subnetMask);
  };
}

// node_modules/ip-address/dist/esm/lib/v4/constants.js
var BITS = 32;
var GROUPS = 4;
var RE_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
var RE_SUBNET_STRING = /\/\d{1,2}$/;

// node_modules/ip-address/dist/esm/lib/address-error.js
var AddressError = class extends Error {
  constructor(message, parseMessage) {
    super(message);
    this.name = "AddressError";
    if (parseMessage !== null) {
      this.parseMessage = parseMessage;
    }
  }
};

// node_modules/ip-address/dist/esm/lib/ipv4.js
var import_jsbn = __toESM(require_jsbn());
var import_sprintf_js = __toESM(require_sprintf());
var Address4 = class {
  constructor(address) {
    this.groups = GROUPS;
    this.parsedAddress = [];
    this.parsedSubnet = "";
    this.subnet = "/32";
    this.subnetMask = 32;
    this.v4 = true;
    this.isCorrect = isCorrect(BITS);
    this.isInSubnet = isInSubnet;
    this.address = address;
    const subnet = RE_SUBNET_STRING.exec(address);
    if (subnet) {
      this.parsedSubnet = subnet[0].replace("/", "");
      this.subnetMask = parseInt(this.parsedSubnet, 10);
      this.subnet = `/${this.subnetMask}`;
      if (this.subnetMask < 0 || this.subnetMask > BITS) {
        throw new AddressError("Invalid subnet mask.");
      }
      address = address.replace(RE_SUBNET_STRING, "");
    }
    this.addressMinusSuffix = address;
    this.parsedAddress = this.parse(address);
  }
  static isValid(address) {
    try {
      new Address4(address);
      return true;
    } catch (e2) {
      return false;
    }
  }
  parse(address) {
    const groups = address.split(".");
    if (!address.match(RE_ADDRESS)) {
      throw new AddressError("Invalid IPv4 address.");
    }
    return groups;
  }
  correctForm() {
    return this.parsedAddress.map((part) => parseInt(part, 10)).join(".");
  }
  static fromHex(hex) {
    const padded = hex.replace(/:/g, "").padStart(8, "0");
    const groups = [];
    let i;
    for (i = 0; i < 8; i += 2) {
      const h = padded.slice(i, i + 2);
      groups.push(parseInt(h, 16));
    }
    return new Address4(groups.join("."));
  }
  static fromInteger(integer) {
    return Address4.fromHex(integer.toString(16));
  }
  static fromArpa(arpaFormAddress) {
    const leader = arpaFormAddress.replace(/(\.in-addr\.arpa)?\.$/, "");
    const address = leader.split(".").reverse().join(".");
    return new Address4(address);
  }
  toHex() {
    return this.parsedAddress.map((part) => (0, import_sprintf_js.sprintf)("%02x", parseInt(part, 10))).join(":");
  }
  toArray() {
    return this.parsedAddress.map((part) => parseInt(part, 10));
  }
  toGroup6() {
    const output = [];
    let i;
    for (i = 0; i < GROUPS; i += 2) {
      const hex = (0, import_sprintf_js.sprintf)("%02x%02x", parseInt(this.parsedAddress[i], 10), parseInt(this.parsedAddress[i + 1], 10));
      output.push((0, import_sprintf_js.sprintf)("%x", parseInt(hex, 16)));
    }
    return output.join(":");
  }
  bigInteger() {
    return new import_jsbn.BigInteger(this.parsedAddress.map((n2) => (0, import_sprintf_js.sprintf)("%02x", parseInt(n2, 10))).join(""), 16);
  }
  _startAddress() {
    return new import_jsbn.BigInteger(this.mask() + "0".repeat(BITS - this.subnetMask), 2);
  }
  startAddress() {
    return Address4.fromBigInteger(this._startAddress());
  }
  startAddressExclusive() {
    const adjust = new import_jsbn.BigInteger("1");
    return Address4.fromBigInteger(this._startAddress().add(adjust));
  }
  _endAddress() {
    return new import_jsbn.BigInteger(this.mask() + "1".repeat(BITS - this.subnetMask), 2);
  }
  endAddress() {
    return Address4.fromBigInteger(this._endAddress());
  }
  endAddressExclusive() {
    const adjust = new import_jsbn.BigInteger("1");
    return Address4.fromBigInteger(this._endAddress().subtract(adjust));
  }
  static fromBigInteger(bigInteger) {
    return Address4.fromInteger(parseInt(bigInteger.toString(), 10));
  }
  mask(mask) {
    if (mask === void 0) {
      mask = this.subnetMask;
    }
    return this.getBitsBase2(0, mask);
  }
  getBitsBase2(start, end) {
    return this.binaryZeroPad().slice(start, end);
  }
  reverseForm(options) {
    if (!options) {
      options = {};
    }
    const reversed = this.correctForm().split(".").reverse().join(".");
    if (options.omitSuffix) {
      return reversed;
    }
    return (0, import_sprintf_js.sprintf)("%s.in-addr.arpa.", reversed);
  }
  isMulticast() {
    return this.isInSubnet(new Address4("224.0.0.0/4"));
  }
  binaryZeroPad() {
    return this.bigInteger().toString(2).padStart(BITS, "0");
  }
  groupForV6() {
    const segments = this.parsedAddress;
    return this.address.replace(RE_ADDRESS, (0, import_sprintf_js.sprintf)('<span class="hover-group group-v4 group-6">%s</span>.<span class="hover-group group-v4 group-7">%s</span>', segments.slice(0, 2).join("."), segments.slice(2, 4).join(".")));
  }
};

// node_modules/ip-address/dist/esm/lib/v6/constants.js
var BITS2 = 128;
var GROUPS2 = 8;
var SCOPES = {
  0: "Reserved",
  1: "Interface local",
  2: "Link local",
  4: "Admin local",
  5: "Site local",
  8: "Organization local",
  14: "Global",
  15: "Reserved"
};
var TYPES = {
  "ff01::1/128": "Multicast (All nodes on this interface)",
  "ff01::2/128": "Multicast (All routers on this interface)",
  "ff02::1/128": "Multicast (All nodes on this link)",
  "ff02::2/128": "Multicast (All routers on this link)",
  "ff05::2/128": "Multicast (All routers in this site)",
  "ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
  "ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
  "ff02::9/128": "Multicast (RIP routers)",
  "ff02::a/128": "Multicast (EIGRP routers)",
  "ff02::d/128": "Multicast (PIM routers)",
  "ff02::16/128": "Multicast (MLDv2 reports)",
  "ff01::fb/128": "Multicast (mDNSv6)",
  "ff02::fb/128": "Multicast (mDNSv6)",
  "ff05::fb/128": "Multicast (mDNSv6)",
  "ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
  "ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
  "ff02::1:3/128": "Multicast (All DHCP servers on this link)",
  "ff05::1:3/128": "Multicast (All DHCP servers in this site)",
  "::/128": "Unspecified",
  "::1/128": "Loopback",
  "ff00::/8": "Multicast",
  "fe80::/10": "Link-local unicast"
};
var RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
var RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
var RE_SUBNET_STRING2 = /\/\d{1,3}(?=%|$)/;
var RE_ZONE_STRING = /%.*$/;
var RE_URL = new RegExp(/^\[{0,1}([0-9a-f:]+)\]{0,1}/);
var RE_URL_WITH_PORT = new RegExp(/\[([0-9a-f:]+)\]:([0-9]{1,5})/);

// node_modules/ip-address/dist/esm/lib/v6/helpers.js
var import_sprintf_js2 = __toESM(require_sprintf());
function spanLeadingZeroesSimple(group) {
  return group.replace(/^(0+)/, '<span class="zero">$1</span>');
}
function simpleGroup(addressString, offset2 = 0) {
  const groups = addressString.split(":");
  return groups.map((g, i) => {
    if (/group-v4/.test(g)) {
      return g;
    }
    return (0, import_sprintf_js2.sprintf)('<span class="hover-group group-%d">%s</span>', i + offset2, spanLeadingZeroesSimple(g));
  });
}

// node_modules/ip-address/dist/esm/lib/v6/regular-expressions.js
var import_sprintf_js3 = __toESM(require_sprintf());
function groupPossibilities(possibilities) {
  return (0, import_sprintf_js3.sprintf)("(%s)", possibilities.join("|"));
}
function padGroup(group) {
  if (group.length < 4) {
    return (0, import_sprintf_js3.sprintf)("0{0,%d}%s", 4 - group.length, group);
  }
  return group;
}
var ADDRESS_BOUNDARY = "[^A-Fa-f0-9:]";
function simpleRegularExpression(groups) {
  const zeroIndexes = [];
  groups.forEach((group, i) => {
    const groupInteger = parseInt(group, 16);
    if (groupInteger === 0) {
      zeroIndexes.push(i);
    }
  });
  const possibilities = zeroIndexes.map((zeroIndex) => groups.map((group, i) => {
    if (i === zeroIndex) {
      const elision = i === 0 || i === GROUPS2 - 1 ? ":" : "";
      return groupPossibilities([padGroup(group), elision]);
    }
    return padGroup(group);
  }).join(":"));
  possibilities.push(groups.map(padGroup).join(":"));
  return groupPossibilities(possibilities);
}
function possibleElisions(elidedGroups, moreLeft, moreRight) {
  const left = moreLeft ? "" : ":";
  const right = moreRight ? "" : ":";
  const possibilities = [];
  if (!moreLeft && !moreRight) {
    possibilities.push("::");
  }
  if (moreLeft && moreRight) {
    possibilities.push("");
  }
  if (moreRight && !moreLeft || !moreRight && moreLeft) {
    possibilities.push(":");
  }
  possibilities.push((0, import_sprintf_js3.sprintf)("%s(:0{1,4}){1,%d}", left, elidedGroups - 1));
  possibilities.push((0, import_sprintf_js3.sprintf)("(0{1,4}:){1,%d}%s", elidedGroups - 1, right));
  possibilities.push((0, import_sprintf_js3.sprintf)("(0{1,4}:){%d}0{1,4}", elidedGroups - 1));
  for (let groups = 1; groups < elidedGroups - 1; groups++) {
    for (let position = 1; position < elidedGroups - groups; position++) {
      possibilities.push((0, import_sprintf_js3.sprintf)("(0{1,4}:){%d}:(0{1,4}:){%d}0{1,4}", position, elidedGroups - position - groups - 1));
    }
  }
  return groupPossibilities(possibilities);
}

// node_modules/ip-address/dist/esm/lib/ipv6.js
var import_jsbn2 = __toESM(require_jsbn());
var import_sprintf_js4 = __toESM(require_sprintf());
function assert(condition) {
  if (!condition) {
    throw new Error("Assertion failed.");
  }
}
function addCommas(number) {
  const r2 = /(\d+)(\d{3})/;
  while (r2.test(number)) {
    number = number.replace(r2, "$1,$2");
  }
  return number;
}
function spanLeadingZeroes4(n2) {
  n2 = n2.replace(/^(0{1,})([1-9]+)$/, '<span class="parse-error">$1</span>$2');
  n2 = n2.replace(/^(0{1,})(0)$/, '<span class="parse-error">$1</span>$2');
  return n2;
}
function compact(address, slice) {
  const s1 = [];
  const s2 = [];
  let i;
  for (i = 0; i < address.length; i++) {
    if (i < slice[0]) {
      s1.push(address[i]);
    } else if (i > slice[1]) {
      s2.push(address[i]);
    }
  }
  return s1.concat(["compact"]).concat(s2);
}
function paddedHex(octet) {
  return (0, import_sprintf_js4.sprintf)("%04x", parseInt(octet, 16));
}
function unsignByte(b) {
  return b & 255;
}
var Address6 = class {
  constructor(address, optionalGroups) {
    this.addressMinusSuffix = "";
    this.parsedSubnet = "";
    this.subnet = "/128";
    this.subnetMask = 128;
    this.v4 = false;
    this.zone = "";
    this.isInSubnet = isInSubnet;
    this.isCorrect = isCorrect(BITS2);
    if (optionalGroups === void 0) {
      this.groups = GROUPS2;
    } else {
      this.groups = optionalGroups;
    }
    this.address = address;
    const subnet = RE_SUBNET_STRING2.exec(address);
    if (subnet) {
      this.parsedSubnet = subnet[0].replace("/", "");
      this.subnetMask = parseInt(this.parsedSubnet, 10);
      this.subnet = `/${this.subnetMask}`;
      if (Number.isNaN(this.subnetMask) || this.subnetMask < 0 || this.subnetMask > BITS2) {
        throw new AddressError("Invalid subnet mask.");
      }
      address = address.replace(RE_SUBNET_STRING2, "");
    } else if (/\//.test(address)) {
      throw new AddressError("Invalid subnet mask.");
    }
    const zone = RE_ZONE_STRING.exec(address);
    if (zone) {
      this.zone = zone[0];
      address = address.replace(RE_ZONE_STRING, "");
    }
    this.addressMinusSuffix = address;
    this.parsedAddress = this.parse(this.addressMinusSuffix);
  }
  static isValid(address) {
    try {
      new Address6(address);
      return true;
    } catch (e2) {
      return false;
    }
  }
  static fromBigInteger(bigInteger) {
    const hex = bigInteger.toString(16).padStart(32, "0");
    const groups = [];
    let i;
    for (i = 0; i < GROUPS2; i++) {
      groups.push(hex.slice(i * 4, (i + 1) * 4));
    }
    return new Address6(groups.join(":"));
  }
  static fromURL(url) {
    let host;
    let port = null;
    let result;
    if (url.indexOf("[") !== -1 && url.indexOf("]:") !== -1) {
      result = RE_URL_WITH_PORT.exec(url);
      if (result === null) {
        return {
          error: "failed to parse address with port",
          address: null,
          port: null
        };
      }
      host = result[1];
      port = result[2];
    } else if (url.indexOf("/") !== -1) {
      url = url.replace(/^[a-z0-9]+:\/\//, "");
      result = RE_URL.exec(url);
      if (result === null) {
        return {
          error: "failed to parse address from URL",
          address: null,
          port: null
        };
      }
      host = result[1];
    } else {
      host = url;
    }
    if (port) {
      port = parseInt(port, 10);
      if (port < 0 || port > 65536) {
        port = null;
      }
    } else {
      port = null;
    }
    return {
      address: new Address6(host),
      port
    };
  }
  static fromAddress4(address) {
    const address4 = new Address4(address);
    const mask6 = BITS2 - (BITS - address4.subnetMask);
    return new Address6(`::ffff:${address4.correctForm()}/${mask6}`);
  }
  static fromArpa(arpaFormAddress) {
    let address = arpaFormAddress.replace(/(\.ip6\.arpa)?\.$/, "");
    const semicolonAmount = 7;
    if (address.length !== 63) {
      throw new AddressError("Invalid 'ip6.arpa' form.");
    }
    const parts = address.split(".").reverse();
    for (let i = semicolonAmount; i > 0; i--) {
      const insertIndex = i * 4;
      parts.splice(insertIndex, 0, ":");
    }
    address = parts.join("");
    return new Address6(address);
  }
  microsoftTranscription() {
    return (0, import_sprintf_js4.sprintf)("%s.ipv6-literal.net", this.correctForm().replace(/:/g, "-"));
  }
  mask(mask = this.subnetMask) {
    return this.getBitsBase2(0, mask);
  }
  possibleSubnets(subnetSize = 128) {
    const availableBits = BITS2 - this.subnetMask;
    const subnetBits = Math.abs(subnetSize - BITS2);
    const subnetPowers = availableBits - subnetBits;
    if (subnetPowers < 0) {
      return "0";
    }
    return addCommas(new import_jsbn2.BigInteger("2", 10).pow(subnetPowers).toString(10));
  }
  _startAddress() {
    return new import_jsbn2.BigInteger(this.mask() + "0".repeat(BITS2 - this.subnetMask), 2);
  }
  startAddress() {
    return Address6.fromBigInteger(this._startAddress());
  }
  startAddressExclusive() {
    const adjust = new import_jsbn2.BigInteger("1");
    return Address6.fromBigInteger(this._startAddress().add(adjust));
  }
  _endAddress() {
    return new import_jsbn2.BigInteger(this.mask() + "1".repeat(BITS2 - this.subnetMask), 2);
  }
  endAddress() {
    return Address6.fromBigInteger(this._endAddress());
  }
  endAddressExclusive() {
    const adjust = new import_jsbn2.BigInteger("1");
    return Address6.fromBigInteger(this._endAddress().subtract(adjust));
  }
  getScope() {
    let scope = SCOPES[this.getBits(12, 16).intValue()];
    if (this.getType() === "Global unicast" && scope !== "Link local") {
      scope = "Global";
    }
    return scope || "Unknown";
  }
  getType() {
    for (const subnet of Object.keys(TYPES)) {
      if (this.isInSubnet(new Address6(subnet))) {
        return TYPES[subnet];
      }
    }
    return "Global unicast";
  }
  getBits(start, end) {
    return new import_jsbn2.BigInteger(this.getBitsBase2(start, end), 2);
  }
  getBitsBase2(start, end) {
    return this.binaryZeroPad().slice(start, end);
  }
  getBitsBase16(start, end) {
    const length = end - start;
    if (length % 4 !== 0) {
      throw new Error("Length of bits to retrieve must be divisible by four");
    }
    return this.getBits(start, end).toString(16).padStart(length / 4, "0");
  }
  getBitsPastSubnet() {
    return this.getBitsBase2(this.subnetMask, BITS2);
  }
  reverseForm(options) {
    if (!options) {
      options = {};
    }
    const characters = Math.floor(this.subnetMask / 4);
    const reversed = this.canonicalForm().replace(/:/g, "").split("").slice(0, characters).reverse().join(".");
    if (characters > 0) {
      if (options.omitSuffix) {
        return reversed;
      }
      return (0, import_sprintf_js4.sprintf)("%s.ip6.arpa.", reversed);
    }
    if (options.omitSuffix) {
      return "";
    }
    return "ip6.arpa.";
  }
  correctForm() {
    let i;
    let groups = [];
    let zeroCounter = 0;
    const zeroes = [];
    for (i = 0; i < this.parsedAddress.length; i++) {
      const value = parseInt(this.parsedAddress[i], 16);
      if (value === 0) {
        zeroCounter++;
      }
      if (value !== 0 && zeroCounter > 0) {
        if (zeroCounter > 1) {
          zeroes.push([i - zeroCounter, i - 1]);
        }
        zeroCounter = 0;
      }
    }
    if (zeroCounter > 1) {
      zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
    }
    const zeroLengths = zeroes.map((n2) => n2[1] - n2[0] + 1);
    if (zeroes.length > 0) {
      const index = zeroLengths.indexOf(Math.max(...zeroLengths));
      groups = compact(this.parsedAddress, zeroes[index]);
    } else {
      groups = this.parsedAddress;
    }
    for (i = 0; i < groups.length; i++) {
      if (groups[i] !== "compact") {
        groups[i] = parseInt(groups[i], 16).toString(16);
      }
    }
    let correct = groups.join(":");
    correct = correct.replace(/^compact$/, "::");
    correct = correct.replace(/^compact|compact$/, ":");
    correct = correct.replace(/compact/, "");
    return correct;
  }
  binaryZeroPad() {
    return this.bigInteger().toString(2).padStart(BITS2, "0");
  }
  parse4in6(address) {
    const groups = address.split(":");
    const lastGroup = groups.slice(-1)[0];
    const address4 = lastGroup.match(RE_ADDRESS);
    if (address4) {
      this.parsedAddress4 = address4[0];
      this.address4 = new Address4(this.parsedAddress4);
      for (let i = 0; i < this.address4.groups; i++) {
        if (/^0[0-9]+/.test(this.address4.parsedAddress[i])) {
          throw new AddressError("IPv4 addresses can't have leading zeroes.", address.replace(RE_ADDRESS, this.address4.parsedAddress.map(spanLeadingZeroes4).join(".")));
        }
      }
      this.v4 = true;
      groups[groups.length - 1] = this.address4.toGroup6();
      address = groups.join(":");
    }
    return address;
  }
  parse(address) {
    address = this.parse4in6(address);
    const badCharacters = address.match(RE_BAD_CHARACTERS);
    if (badCharacters) {
      throw new AddressError((0, import_sprintf_js4.sprintf)("Bad character%s detected in address: %s", badCharacters.length > 1 ? "s" : "", badCharacters.join("")), address.replace(RE_BAD_CHARACTERS, '<span class="parse-error">$1</span>'));
    }
    const badAddress = address.match(RE_BAD_ADDRESS);
    if (badAddress) {
      throw new AddressError((0, import_sprintf_js4.sprintf)("Address failed regex: %s", badAddress.join("")), address.replace(RE_BAD_ADDRESS, '<span class="parse-error">$1</span>'));
    }
    let groups = [];
    const halves = address.split("::");
    if (halves.length === 2) {
      let first = halves[0].split(":");
      let last = halves[1].split(":");
      if (first.length === 1 && first[0] === "") {
        first = [];
      }
      if (last.length === 1 && last[0] === "") {
        last = [];
      }
      const remaining = this.groups - (first.length + last.length);
      if (!remaining) {
        throw new AddressError("Error parsing groups");
      }
      this.elidedGroups = remaining;
      this.elisionBegin = first.length;
      this.elisionEnd = first.length + this.elidedGroups;
      groups = groups.concat(first);
      for (let i = 0; i < remaining; i++) {
        groups.push("0");
      }
      groups = groups.concat(last);
    } else if (halves.length === 1) {
      groups = address.split(":");
      this.elidedGroups = 0;
    } else {
      throw new AddressError("Too many :: groups found");
    }
    groups = groups.map((group) => (0, import_sprintf_js4.sprintf)("%x", parseInt(group, 16)));
    if (groups.length !== this.groups) {
      throw new AddressError("Incorrect number of groups found");
    }
    return groups;
  }
  canonicalForm() {
    return this.parsedAddress.map(paddedHex).join(":");
  }
  decimal() {
    return this.parsedAddress.map((n2) => (0, import_sprintf_js4.sprintf)("%05d", parseInt(n2, 16))).join(":");
  }
  bigInteger() {
    return new import_jsbn2.BigInteger(this.parsedAddress.map(paddedHex).join(""), 16);
  }
  to4() {
    const binary = this.binaryZeroPad().split("");
    return Address4.fromHex(new import_jsbn2.BigInteger(binary.slice(96, 128).join(""), 2).toString(16));
  }
  to4in6() {
    const address4 = this.to4();
    const address6 = new Address6(this.parsedAddress.slice(0, 6).join(":"), 6);
    const correct = address6.correctForm();
    let infix = "";
    if (!/:$/.test(correct)) {
      infix = ":";
    }
    return correct + infix + address4.address;
  }
  inspectTeredo() {
    const prefix = this.getBitsBase16(0, 32);
    const udpPort = this.getBits(80, 96).xor(new import_jsbn2.BigInteger("ffff", 16)).toString();
    const server4 = Address4.fromHex(this.getBitsBase16(32, 64));
    const client4 = Address4.fromHex(this.getBits(96, 128).xor(new import_jsbn2.BigInteger("ffffffff", 16)).toString(16));
    const flags = this.getBits(64, 80);
    const flagsBase2 = this.getBitsBase2(64, 80);
    const coneNat = flags.testBit(15);
    const reserved = flags.testBit(14);
    const groupIndividual = flags.testBit(8);
    const universalLocal = flags.testBit(9);
    const nonce = new import_jsbn2.BigInteger(flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16), 2).toString(10);
    return {
      prefix: (0, import_sprintf_js4.sprintf)("%s:%s", prefix.slice(0, 4), prefix.slice(4, 8)),
      server4: server4.address,
      client4: client4.address,
      flags: flagsBase2,
      coneNat,
      microsoft: {
        reserved,
        universalLocal,
        groupIndividual,
        nonce
      },
      udpPort
    };
  }
  inspect6to4() {
    const prefix = this.getBitsBase16(0, 16);
    const gateway = Address4.fromHex(this.getBitsBase16(16, 48));
    return {
      prefix: (0, import_sprintf_js4.sprintf)("%s", prefix.slice(0, 4)),
      gateway: gateway.address
    };
  }
  to6to4() {
    if (!this.is4()) {
      return null;
    }
    const addr6to4 = [
      "2002",
      this.getBitsBase16(96, 112),
      this.getBitsBase16(112, 128),
      "",
      "/16"
    ].join(":");
    return new Address6(addr6to4);
  }
  toByteArray() {
    const byteArray = this.bigInteger().toByteArray();
    if (byteArray.length === 17 && byteArray[0] === 0) {
      return byteArray.slice(1);
    }
    return byteArray;
  }
  toUnsignedByteArray() {
    return this.toByteArray().map(unsignByte);
  }
  static fromByteArray(bytes) {
    return this.fromUnsignedByteArray(bytes.map(unsignByte));
  }
  static fromUnsignedByteArray(bytes) {
    const BYTE_MAX = new import_jsbn2.BigInteger("256", 10);
    let result = new import_jsbn2.BigInteger("0", 10);
    let multiplier = new import_jsbn2.BigInteger("1", 10);
    for (let i = bytes.length - 1; i >= 0; i--) {
      result = result.add(multiplier.multiply(new import_jsbn2.BigInteger(bytes[i].toString(10), 10)));
      multiplier = multiplier.multiply(BYTE_MAX);
    }
    return Address6.fromBigInteger(result);
  }
  isCanonical() {
    return this.addressMinusSuffix === this.canonicalForm();
  }
  isLinkLocal() {
    if (this.getBitsBase2(0, 64) === "1111111010000000000000000000000000000000000000000000000000000000") {
      return true;
    }
    return false;
  }
  isMulticast() {
    return this.getType() === "Multicast";
  }
  is4() {
    return this.v4;
  }
  isTeredo() {
    return this.isInSubnet(new Address6("2001::/32"));
  }
  is6to4() {
    return this.isInSubnet(new Address6("2002::/16"));
  }
  isLoopback() {
    return this.getType() === "Loopback";
  }
  href(optionalPort) {
    if (optionalPort === void 0) {
      optionalPort = "";
    } else {
      optionalPort = (0, import_sprintf_js4.sprintf)(":%s", optionalPort);
    }
    return (0, import_sprintf_js4.sprintf)("http://[%s]%s/", this.correctForm(), optionalPort);
  }
  link(options) {
    if (!options) {
      options = {};
    }
    if (options.className === void 0) {
      options.className = "";
    }
    if (options.prefix === void 0) {
      options.prefix = "/#address=";
    }
    if (options.v4 === void 0) {
      options.v4 = false;
    }
    let formFunction = this.correctForm;
    if (options.v4) {
      formFunction = this.to4in6;
    }
    if (options.className) {
      return (0, import_sprintf_js4.sprintf)('<a href="%1$s%2$s" class="%3$s">%2$s</a>', options.prefix, formFunction.call(this), options.className);
    }
    return (0, import_sprintf_js4.sprintf)('<a href="%1$s%2$s">%2$s</a>', options.prefix, formFunction.call(this));
  }
  group() {
    if (this.elidedGroups === 0) {
      return simpleGroup(this.address).join(":");
    }
    assert(typeof this.elidedGroups === "number");
    assert(typeof this.elisionBegin === "number");
    const output = [];
    const [left, right] = this.address.split("::");
    if (left.length) {
      output.push(...simpleGroup(left));
    } else {
      output.push("");
    }
    const classes = ["hover-group"];
    for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) {
      classes.push((0, import_sprintf_js4.sprintf)("group-%d", i));
    }
    output.push((0, import_sprintf_js4.sprintf)('<span class="%s"></span>', classes.join(" ")));
    if (right.length) {
      output.push(...simpleGroup(right, this.elisionEnd));
    } else {
      output.push("");
    }
    if (this.is4()) {
      assert(this.address4 instanceof Address4);
      output.pop();
      output.push(this.address4.groupForV6());
    }
    return output.join(":");
  }
  regularExpressionString(substringSearch = false) {
    let output = [];
    const address6 = new Address6(this.correctForm());
    if (address6.elidedGroups === 0) {
      output.push(simpleRegularExpression(address6.parsedAddress));
    } else if (address6.elidedGroups === GROUPS2) {
      output.push(possibleElisions(GROUPS2));
    } else {
      const halves = address6.address.split("::");
      if (halves[0].length) {
        output.push(simpleRegularExpression(halves[0].split(":")));
      }
      assert(typeof address6.elidedGroups === "number");
      output.push(possibleElisions(address6.elidedGroups, halves[0].length !== 0, halves[1].length !== 0));
      if (halves[1].length) {
        output.push(simpleRegularExpression(halves[1].split(":")));
      }
      output = [output.join(":")];
    }
    if (!substringSearch) {
      output = [
        "(?=^|",
        ADDRESS_BOUNDARY,
        "|[^\\w\\:])(",
        ...output,
        ")(?=[^\\w\\:]|",
        ADDRESS_BOUNDARY,
        "|$)"
      ];
    }
    return output.join("");
  }
  regularExpression(substringSearch = false) {
    return new RegExp(this.regularExpressionString(substringSearch), "i");
  }
};

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default = version;

// node_modules/@jsonhero/json-infer-types/lib/index.mjs
var import_json5 = __toESM(require_dist(), 1);

// node_modules/jwt-decode/build/jwt-decode.esm.js
function e(e2) {
  this.message = e2;
}
e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
var r = typeof window != "undefined" && window.atob && window.atob.bind(window) || function(r2) {
  var t2 = String(r2).replace(/=+$/, "");
  if (t2.length % 4 == 1)
    throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n2, o2, a = 0, i = 0, c = ""; o2 = t2.charAt(i++); ~o2 && (n2 = a % 4 ? 64 * n2 + o2 : o2, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
    o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o2);
  return c;
};
function t(e2) {
  var t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
  switch (t2.length % 4) {
    case 0:
      break;
    case 2:
      t2 += "==";
      break;
    case 3:
      t2 += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(e3) {
      return decodeURIComponent(r(e3).replace(/(.)/g, function(e4, r2) {
        var t3 = r2.charCodeAt(0).toString(16).toUpperCase();
        return t3.length < 2 && (t3 = "0" + t3), "%" + t3;
      }));
    }(t2);
  } catch (e3) {
    return r(t2);
  }
}
function n(e2) {
  this.message = e2;
}
function o(e2, r2) {
  if (typeof e2 != "string")
    throw new n("Invalid token specified");
  var o2 = (r2 = r2 || {}).header === true ? 0 : 1;
  try {
    return JSON.parse(t(e2.split(".")[o2]));
  } catch (e3) {
    throw new n("Invalid token specified: " + e3.message);
  }
}
n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
var jwt_decode_esm_default = o;

// node_modules/@jsonhero/json-infer-types/lib/index.mjs
function inferDatetime(value) {
  const rfc3339Match = inferRFC3339(value);
  if (rfc3339Match) {
    return rfc3339Match;
  }
  const rfc2822Match = inferRFC2822(value);
  if (rfc2822Match) {
    return rfc2822Match;
  }
  return void 0;
}
var rfc3339WithYmd = /^([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
var rfc3339WithWeekIndex = /^(\d{4})-?W(\d\d)(?:-?(\d))?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
var rfc3339WithOrdinal = /^(\d{4})-?(\d{3})?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
var rfc3339TimeOnly = /^(?:(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
var rfc3339 = [
  {
    matches: rfc3339WithYmd,
    parts: rfc3339Parts,
    extensions: rfc3339Extensions(11, 12)
  },
  {
    matches: rfc3339WithWeekIndex,
    parts: rfc3339Parts,
    extensions: rfc3339Extensions(11, 12)
  },
  {
    matches: rfc3339WithOrdinal,
    parts: rfc3339WithOrdinalParts,
    extensions: rfc3339Extensions(10, 11)
  },
  {
    matches: rfc3339TimeOnly,
    parts: () => "time",
    extensions: rfc3339Extensions(8, 9)
  }
];
function matchFilter(matches) {
  if (!matches) {
    return false;
  }
  const truthyMatches = matches.filter((match) => !!match);
  return truthyMatches.length > 2;
}
function inferRFC3339(value) {
  const rfc3339Matches = rfc3339.map((rfc) => {
    return {
      matches: rfc.matches.exec(value),
      parts: rfc.parts,
      extensions: rfc.extensions
    };
  }).filter((rfc) => matchFilter(rfc.matches));
  const rfc3339BestMatch = rfc3339Matches.sort((a, b) => b.matches.length - a.matches.length)[0];
  if (rfc3339BestMatch) {
    return {
      name: "datetime",
      parts: rfc3339BestMatch.parts(rfc3339BestMatch.matches),
      variant: "rfc3339",
      extensions: rfc3339BestMatch.extensions(rfc3339BestMatch.matches)
    };
  }
  return void 0;
}
function rfc3339Parts(match) {
  const dateParts = [1, 2, 3];
  const timeParts = [4, 5, 6, 7];
  const hasSomeDateParts = dateParts.some((i) => match[i] !== void 0);
  const hasSomeTimeParts = timeParts.some((i) => match[i] !== void 0);
  if (hasSomeDateParts && hasSomeTimeParts) {
    return "datetime";
  }
  return "date";
}
function rfc3339Extensions(timezoneIndex = 11, calendarIndex = 12) {
  return (match) => {
    const extensions = [];
    if (match[timezoneIndex] !== void 0) {
      extensions.push("timezone");
    }
    if (match[calendarIndex] !== void 0) {
      extensions.push("calendar");
    }
    return extensions.length > 0 ? extensions : void 0;
  };
}
function rfc3339WithOrdinalParts(match) {
  const dateParts = [1, 2];
  const timeParts = [3, 4, 5, 6];
  const hasSomeDateParts = dateParts.some((i) => match[i] !== void 0);
  const hasSomeTimeParts = timeParts.some((i) => match[i] !== void 0);
  if (hasSomeDateParts && hasSomeTimeParts) {
    return "datetime";
  }
  return "date";
}
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function inferRFC2822(value) {
  const rfc2822Matches = rfc2822.exec(value);
  if (rfc2822Matches) {
    return {
      name: "datetime",
      parts: "datetime",
      variant: "rfc2822"
    };
  }
  return void 0;
}
var timestampSecondsSinceEpoch = /^\d{10}$/;
var timestampMsSinceEpoch = /^\d{13}$/;
var timestampNanoSinceEpoch = /^\d{19}$/;
function inRangeOfNow(msSinceEpoch) {
  const now = new Date().getTime();
  const acceptableRange = 2 * 365 * 24 * 60 * 60 * 1e3;
  const lowerBound = msSinceEpoch - acceptableRange;
  const upperBound = msSinceEpoch + acceptableRange;
  return now >= lowerBound && now <= upperBound;
}
function inferTimestamp(value) {
  if (typeof value === "number") {
    return inferTimestamp(`${value}`);
  }
  if (timestampSecondsSinceEpoch.test(value)) {
    const seconds = parseInt(value);
    if (inRangeOfNow(seconds * 1e3)) {
      return {
        name: "timestamp",
        variant: "secondsSinceEpoch"
      };
    }
  }
  if (timestampMsSinceEpoch.test(value)) {
    const milliseconds = parseInt(value);
    if (inRangeOfNow(milliseconds)) {
      return {
        name: "timestamp",
        variant: "millisecondsSinceEpoch"
      };
    }
  }
  if (timestampNanoSinceEpoch.test(value)) {
    const nanoseconds = parseInt(value);
    if (inRangeOfNow(nanoseconds / 1e6)) {
      return {
        name: "timestamp",
        variant: "nanosecondsSinceEpoch"
      };
    }
  }
  return void 0;
}
var rfc5321AddressRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
var rfc5321Regex = new RegExp(`^${rfc5321AddressRegex.source}$`);
var rfc5322Regex = new RegExp(`^[^"]+<${rfc5321AddressRegex.source}>$`);
function inferEmail(value) {
  if (rfc5321Regex.exec(value)) {
    return { name: "email", variant: "rfc5321" };
  }
  if (rfc5322Regex.exec(value)) {
    return { name: "email", variant: "rfc5322" };
  }
  return void 0;
}
var iso4217Regex = /^(?:(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTC|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWL))$/i;
var cryptoRegex = /^(?:(XBT|XDG|XLM|XMR|XRP|XZC|ETH|LTC|BNB|USDT|SOL|ADA|USDC|LUNA|AVAX|DOT|DOGE|SHIB|MATIC|CRO|BUSD|WBTC|UNI|LINK|UST|DAI|ALGO|BCH))$/;
var englishNamesRegex = /^(?:(U.?S.?\sDollar|Euro|United\sStates\sdollar|Japanese\sYen|Swiss\sFranc|Australian\sDollar|British\sPound|Canadian\sDollar|South\sAfrican\sRand))$/;
var symbolRegex = /^(?:(\$|£|€|¥|R\$|₿))$/;
function inferCurrency(value) {
  if (iso4217Regex.exec(value)) {
    return {
      name: "currency",
      variant: "iso4217"
    };
  }
  if (cryptoRegex.exec(value)) {
    return {
      name: "currency",
      variant: "crypto"
    };
  }
  if (englishNamesRegex.exec(value)) {
    return {
      name: "currency",
      variant: "english"
    };
  }
  if (symbolRegex.exec(value)) {
    return {
      name: "currency",
      variant: "symbol"
    };
  }
  return void 0;
}
var iso31663Regex = /^(?:(AFG|ALB|DZA|ASM|AND|AGO|AIA|ATA|ATG|ARG|ARM|ABW|AUS|AUT|AZE|BHS|BHR|BGD|BRB|BLR|BEL|BLZ|BEN|BMU|BTN|BOL|BES|BIH|BWA|BVT|BRA|IOT|BRN|BGR|BFA|BDI|CPV|KHM|CMR|CAN|CYM|CAF|TCD|CHL|CHN|CXR|CCK|COL|COM|COD|COG|COK|CRI|HRV|CUB|CUW|CYP|CZE|CIV|DNK|DJI|DMA|DOM|ECU|EGY|SLV|GNQ|ERI|EST|SWZ|ETH|FLK|FRO|FJI|FIN|FRA|GUF|PYF|ATF|GAB|GMB|GEO|DEU|GHA|GIB|GRC|GRL|GRD|GLP|GUM|GTM|GGY|GIN|GNB|GUY|HTI|HMD|VAT|HND|HKG|HUN|ISL|IND|IDN|IRN|IRQ|IRL|IMN|ISR|ITA|JAM|JPN|JEY|JOR|KAZ|KEN|KIR|PRK|KOR|KWT|KGZ|LAO|LVA|LBN|LSO|LBR|LBY|LIE|LTU|LUX|MAC|MDG|MWI|MYS|MDV|MLI|MLT|MHL|MTQ|MRT|MUS|MYT|MEX|FSM|MDA|MCO|MNG|MNE|MSR|MAR|MOZ|MMR|NAM|NRU|NPL|NLD|NCL|NZL|NIC|NER|NGA|NIU|NFK|MNP|NOR|OMN|PAK|PLW|PSE|PAN|PNG|PRY|PER|PHL|PCN|POL|PRT|PRI|QAT|MKD|ROU|RUS|RWA|REU|BLM|SHN|KNA|LCA|MAF|SPM|VCT|WSM|SMR|STP|SAU|SEN|SRB|SYC|SLE|SGP|SXM|SVK|SVN|SLB|SOM|ZAF|SGS|SSD|ESP|LKA|SDN|SUR|SJM|SWE|CHE|SYR|TWN|TJK|TZA|THA|TLS|TGO|TKL|TON|TTO|TUN|TUR|TKM|TCA|TUV|UGA|UKR|ARE|GBR|UMI|USA|URY|UZB|VUT|VEN|VNM|VGB|VIR|WLF|ESH|YEM|ZMB|ZWE|ALA))$/;
var iso31662Regex = /^(?:(AF|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|CV|KH|CM|CA|KY|CF|TD|CL|CN|CX|CC|CO|KM|CD|CG|CK|CR|HR|CU|CW|CY|CZ|CI|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|SZ|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|MK|RO|RU|RW|RE|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|UM|US|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW|AX))$/;
function inferCountry(value) {
  if (iso31663Regex.exec(value)) {
    return {
      name: "country",
      variant: "iso3166-3"
    };
  }
  if (iso31662Regex.exec(value)) {
    return {
      name: "country",
      variant: "iso3166-2"
    };
  }
  return void 0;
}
function inferTld(value) {
  const tldRegex = /^\.\w{2,14}(\.\w{2,14})*$/i;
  if (tldRegex.test(value)) {
    return {
      name: "tld"
    };
  }
  return void 0;
}
function inferIpAddress(value) {
  try {
    const ipv6 = new Address6(value);
    if (ipv6) {
      return {
        name: "ip",
        variant: "v6"
      };
    }
  } catch (error) {
  }
  try {
    const ipv4 = new Address4(value);
    if (ipv4) {
      return {
        name: "ip",
        variant: "v4"
      };
    }
  } catch (error) {
  }
  return void 0;
}
var iso693Regex = /^(?:(aa|ab|ae|af|ak|am|an|ar|as|av|ay|az|ba|be|bg|bi|bm|bn|bo|br|bs|ca|ce|ch|co|cr|cs|cu|cv|cy|da|de|dv|dz|ee|el|en|eo|es|et|eu|fa|ff|fi|fj|fo|fr|fy|ga|gd|gl|gn|gu|gv|ha|he|hi|ho|hr|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|io|is|it|iu|ja|jv|ka|kg|ki|kj|kk|kl|km|kn|ko|kr|ks|ku|kv|kw|ky|la|lb|lg|li|ln|lo|lt|lu|lv|mg|mh|mi|mk|ml|mn|mr|ms|mt|my|na|nb|nd|ne|ng|nl|nn|no|nr|nv|ny|oc|oj|om|or|os|pa|pi|pl|ps|pt|qu|rm|rn|ro|ru|rw|sa|sc|sd|se|sg|si|sk|sl|sm|sn|so|sq|sr|ss|st|su|sv|sw|ta|te|tg|th|ti|tk|tl|tn|to|tr|ts|tt|tw|ty|ug|uk|ur|uz|ve|vi|vo|wa|wo|xh|yi|yo|za|zh|zu))$/;
var iso6932Regex = /^(?:(aar|abk|ave|afr|aka|amh|arg|ara|asm|ava|aym|aze|bak|bel|bul|bis|bam|ben|bod|bre|bos|cat|che|cha|cos|cre|ces|chu|chv|cym|dan|deu|div|dzo|ewe|ell|eng|epo|spa|est|eus|fas|ful|fin|fij|fao|fra|fry|gle|gla|glg|grn|guj|glv|hau|heb|hin|hmo|hrv|hat|hun|hye|her|ina|ind|ile|ibo|iii|ipk|ido|isl|ita|iku|jpn|jav|kat|kon|kik|kua|kaz|kal|khm|kan|kor|kau|kas|kur|kom|cor|kir|lat|ltz|lug|lim|lin|lao|lit|lub|lav|mlg|mah|mri|mkd|mal|mon|mar|msa|mlt|mya|nau|nob|nde|nep|ndo|nld|nno|nor|nbl|nav|nya|oci|oji|orm|ori|oss|pan|pli|pol|pus|por|que|roh|run|ron|rus|kin|san|srd|snd|sme|sag|sin|slk|slv|smo|sna|som|sqi|srp|ssw|sot|sun|swe|swa|tam|tel|tgk|tha|tir|tuk|tgl|tsn|ton|tur|tso|tat|twi|tah|uig|ukr|urd|uzb|ven|vie|vol|wln|wol|xho|yid|yor|zha|zho|zul))$/;
var iso693EnglishNames = [
  "Catalan, Valencian",
  "Chichewa, Chewa, Nyanja",
  "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic",
  "Divehi, Dhivehi, Maldivian",
  "Dutch, Flemish",
  "Gaelic, Scottish Gaelic",
  "Greek, Modern (1453\u2013)",
  "Haitian, Haitian Creole",
  "Interlingue, Occidental",
  "Kalaallisut, Greenlandic",
  "Kikuyu, Gikuyu",
  "Kirghiz, Kyrgyz",
  "Kuanyama, Kwanyama",
  "Limburgan, Limburger, Limburgish",
  "Luxembourgish, Letzeburgesch",
  "Navajo, Navaho",
  "Ossetian, Ossetic",
  "Pashto, Pushto",
  "Punjabi, Panjabi",
  "Romanian, Moldavian, Moldovan",
  "Sichuan Yi, Nuosu",
  "Sinhala, Sinhalese",
  "Spanish, Castilian",
  "Uighur, Uyghur",
  "Zhuang, Chuang",
  "Abkhazian",
  "Afar",
  "Afrikaans",
  "Akan",
  "Albanian",
  "Amharic",
  "Arabic",
  "Aragonese",
  "Armenian",
  "Assamese",
  "Avaric",
  "Avestan",
  "Aymara",
  "Azerbaijani",
  "Bambara",
  "Bashkir",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bislama",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Burmese",
  "Central Khmer",
  "Chamorro",
  "Chechen",
  "Chinese",
  "Chuvash",
  "Cornish",
  "Corsican",
  "Cree",
  "Croatian",
  "Czech",
  "Danish",
  "Dzongkha",
  "English",
  "Esperanto",
  "Estonian",
  "Ewe",
  "Faroese",
  "Fijian",
  "Finnish",
  "French",
  "Fulah",
  "Galician",
  "Ganda",
  "Georgian",
  "German",
  "Guarani",
  "Gujarati",
  "Hausa",
  "Hebrew",
  "Herero",
  "Hindi",
  "Hiri Motu",
  "Hungarian",
  "Icelandic",
  "Ido",
  "Igbo",
  "Indonesian",
  "Interlingua (International Auxiliary Language Association)",
  "Inuktitut",
  "Inupiaq",
  "Irish",
  "ISO language name",
  "Italian",
  "Japanese",
  "Javanese",
  "Kannada",
  "Kanuri",
  "Kashmiri",
  "Kazakh",
  "Kinyarwanda",
  "Komi",
  "Kongo",
  "Korean",
  "Kurdish",
  "Lao",
  "Latin",
  "Latvian",
  "Lingala",
  "Lithuanian",
  "Luba-Katanga",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Manx",
  "Maori",
  "Marathi",
  "Marshallese",
  "Mongolian",
  "Nauru",
  "Ndonga",
  "Nepali",
  "North Ndebele",
  "Northern Sami",
  "Norwegian",
  "Norwegian Bokm\xE5l",
  "Norwegian Nynorsk",
  "Occitan",
  "Ojibwa",
  "Oriya",
  "Oromo",
  "Pali",
  "Persian",
  "Polish",
  "Portuguese",
  "Quechua",
  "Romansh",
  "Rundi",
  "Russian",
  "Samoan",
  "Sango",
  "Sanskrit",
  "Sardinian",
  "Serbian",
  "Shona",
  "Sindhi",
  "Slovak",
  "Slovenian",
  "Somali",
  "South Ndebele",
  "Southern Sotho",
  "Sundanese",
  "Swahili",
  "Swati",
  "Swedish",
  "Tagalog",
  "Tahitian",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Tibetan",
  "Tigrinya",
  "Tonga (Tonga Islands)",
  "Tsonga",
  "Tswana",
  "Turkish",
  "Turkmen",
  "Twi",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Venda",
  "Vietnamese",
  "Volap\xFCk",
  "Walloon",
  "Welsh",
  "Western Frisian",
  "Wolof",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zulu"
];
var iso693NativeNames = [
  "(originally:) Occidental, (after WWII:) Interlingue",
  "az\u0259rbaycan dili, \u062A\u06C6\u0631\u06A9\u062C\u0647",
  "Bahasa Melayu, \u0628\u0647\u0627\u0633 \u0645\u0644\u0627\u064A\u0648\u200E",
  "catal\xE0, valenci\xE0",
  "\u010De\u0161tina, \u010Desk\xFD jazyk",
  "chiChe\u0175a, chinyanja",
  "corsu, lingua corsa",
  "eesti, eesti keel",
  "euskara, euskera",
  "Fulfulde, Pulaar, Pular",
  "Gaelg, Gailck",
  "I\xF1upiaq, I\xF1upiatun",
  "j\u0119zyk polski, polszczyzna",
  "kalaallisut, kalaallit oqaasii",
  "Kurd\xEE, \u06A9\u0648\u0631\u062F\u06CC\u200E",
  "latine, lingua latina",
  "Nederlands, Vlaams",
  "occitan, lenga d'\xF2c",
  "O\u02BBzbek, \u040E\u0437\u0431\u0435\u043A, \u0623\u06C7\u0632\u0628\u06D0\u0643\u200E",
  "Rom\xE2n\u0103, Moldoveneasc\u0103",
  "Runa Simi, Kichwa",
  "Sa\u026F cue\u014B\u0185, Saw cuengh",
  "sloven\u010Dina, slovensk\xFD jazyk",
  "Slovenski jezik, Sloven\u0161\u010Dina",
  "Soomaaliga, af Soomaali",
  "suomi, suomen kieli",
  "T\xFCrkmen\xE7e, T\xFCrkmen dili",
  "\u0430\u0432\u0430\u0440 \u043C\u0430\u0446\u04C0, \u043C\u0430\u0433\u04C0\u0430\u0440\u0443\u043B \u043C\u0430\u0446\u04C0",
  "\u0430\u04A7\u0441\u0443\u0430 \u0431\u044B\u0437\u0448\u04D9\u0430, \u0430\u04A7\u0441\u0448\u04D9\u0430",
  "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430, \u041A\u044B\u0440\u0433\u044B\u0437 \u0442\u0438\u043B\u0438",
  "\u0442\u0430\u0442\u0430\u0440 \u0442\u0435\u043B\u0435, tatar tele",
  "\u0442\u043E\u04B7\u0438\u043A\u04E3, to\xE7ik\u012B, \u062A\u0627\u062C\u06CC\u06A9\u06CC\u200E",
  "\u0626\u06C7\u064A\u063A\u06C7\u0631\u0686\u06D5\u200E, Uyghurche",
  "\u0915\u0949\u0936\u0941\u0930, \u06A9\u0672\u0634\u064F\u0631\u200E",
  "\u092A\u093E\u0932\u093F, \u092A\u093E\u0933\u093F",
  "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D, \u{11338}\u{11302}\u{11338}\u{1134D}\u{11315}\u{11343}\u{11324}\u{1132E}\u{1134D}",
  "\u0938\u093F\u0902\u0927\u0940, \u0633\u0646\u068C\u064A\u200E",
  "\u0939\u093F\u0928\u094D\u0926\u0940, \u0939\u093F\u0902\u0926\u0940",
  "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40, \u067E\u0646\u062C\u0627\u0628\u06CC\u200E",
  "\u1781\u17D2\u1798\u17C2\u179A, \u1781\u17C1\u1798\u179A\u1797\u17B6\u179F\u17B6, \u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A",
  "\uA9A7\uA9B1\uA997\uA9AE, Basa Jawa",
  "\u4E2D\u6587 (Zh\u014Dngw\xE9n), \u6C49\u8BED, \u6F22\u8A9E",
  "(Hausa) \u0647\u064E\u0648\u064F\u0633\u064E",
  "Afaan Oromoo",
  "Afaraf",
  "Afrikaans",
  "Akan",
  "aragon\xE9s",
  "As\u1EE5s\u1EE5 Igbo",
  "Ava\xF1e'\u1EBD",
  "avesta",
  "aymar aru",
  "Bahasa Indonesia",
  "bamanankan",
  "Basa Sunda",
  "Bislama",
  "bosanski jezik",
  "brezhoneg",
  "Chamoru",
  "chiShona",
  "Cymraeg",
  "dansk",
  "Davvis\xE1megiella",
  "Deutsch",
  "Din\xE9 bizaad",
  "Dorerin Naoero",
  "English",
  "Espa\xF1ol",
  "Esperanto",
  "E\u028Begbe",
  "Faka Tonga",
  "fiteny malagasy",
  "f\xF8royskt",
  "fran\xE7ais",
  "Frysk",
  "Gaeilge",
  "gagana fa'a Samoa",
  "G\xE0idhlig",
  "Galego",
  "G\u0129k\u0169y\u0169",
  "Hiri Motu",
  "hrvatski jezik",
  "Ido",
  "Ikinyarwanda",
  "Ikirundi",
  "Interlingua",
  "isiNdebele",
  "isiNdebele",
  "isiXhosa",
  "isiZulu",
  "\xCDslenska",
  "Italiano",
  "Kajin M\u0327aje\u013C",
  "Kanuri",
  "Kernewek",
  "Kikongo",
  "Kiluba",
  "Kiswahili",
  "Krey\xF2l ayisyen",
  "Kuanyama",
  "latvie\u0161u valoda",
  "L\xEBtzebuergesch",
  "lietuvi\u0173 kalba",
  "Limburgs",
  "Ling\xE1la",
  "Luganda",
  "magyar",
  "Malti",
  "Norsk",
  "Norsk Bokm\xE5l",
  "Norsk Nynorsk",
  "Otjiherero",
  "Owambo",
  "Portugu\xEAs",
  "Reo Tahiti",
  "Rumantsch Grischun",
  "sardu",
  "Sesotho",
  "Setswana",
  "Shqip",
  "SiSwati",
  "Svenska",
  "te reo M\u0101ori",
  "Ti\u1EBFng Vi\u1EC7t",
  "Tshiven\u1E13a",
  "T\xFCrk\xE7e",
  "Twi",
  "Volap\xFCk",
  "vosa Vakaviti",
  "Walon",
  "Wikang Tagalog",
  "Wollof",
  "Xitsonga",
  "y\xE2ng\xE2 t\xEE s\xE4ng\xF6",
  "Yor\xF9b\xE1",
  "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
  "\u0431\u0430\u0448\u04A1\u043E\u0440\u0442 \u0442\u0435\u043B\u0435",
  "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F \u043C\u043E\u0432\u0430",
  "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 \u0435\u0437\u0438\u043A",
  "\u0438\u0440\u043E\u043D \u04D5\u0432\u0437\u0430\u0433",
  "\u043A\u043E\u043C\u0438 \u043A\u044B\u0432",
  "\u049B\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456",
  "\u043C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 \u0458\u0430\u0437\u0438\u043A",
  "\u041C\u043E\u043D\u0433\u043E\u043B \u0445\u044D\u043B",
  "\u043D\u043E\u0445\u0447\u0438\u0439\u043D \u043C\u043E\u0442\u0442",
  "\u0440\u0443\u0441\u0441\u043A\u0438\u0439",
  "\u0441\u0440\u043F\u0441\u043A\u0438 \u0458\u0435\u0437\u0438\u043A",
  "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  "\u0447\u04D1\u0432\u0430\u0448 \u0447\u04D7\u043B\u0445\u0438",
  "\u0469\u0437\u044B\u043A\u044A \u0441\u043B\u043E\u0432\u0463\u043D\u044C\u0441\u043A\u044A",
  "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8",
  "\u0540\u0561\u0575\u0565\u0580\u0565\u0576",
  "\u1275\u130D\u122D\u129B",
  "\u12A0\u121B\u122D\u129B",
  "\u0928\u0947\u092A\u093E\u0932\u0940",
  "\u092E\u0930\u093E\u0920\u0940",
  "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE",
  "\u09AC\u09BE\u0982\u09B2\u09BE",
  "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
  "\u0B13\u0B21\u0B3C\u0B3F\u0B06",
  "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
  "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
  "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
  "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",
  "\u0DC3\u0DD2\u0D82\u0DC4\u0DBD",
  "\u0E44\u0E17\u0E22",
  "\u0E9E\u0EB2\u0EAA\u0EB2\u0EA5\u0EB2\u0EA7",
  "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42",
  "\u0F62\u0FAB\u0F7C\u0F44\u0F0B\u0F41",
  "\u1017\u1019\u102C\u1005\u102C",
  "\u1403\u14C4\u1483\u144E\u1450\u1466",
  "\u140A\u14C2\u1511\u14C8\u142F\u14A7\u140E\u14D0",
  "\u14C0\u1426\u1403\u152D\u140D\u140F\u1423",
  "\uD55C\uAD6D\uC5B4",
  "\uA188\uA320\uA4BF Nuosuhxop",
  "\u65E5\u672C\u8A9E (\u306B\u307B\u3093\u3054)"
];
function inferLanguage(value) {
  if (iso693Regex.test(value)) {
    return {
      name: "language",
      variant: "iso693-1"
    };
  }
  if (iso6932Regex.test(value)) {
    return {
      name: "language",
      variant: "iso693-2"
    };
  }
  if (iso693EnglishNames.includes(value)) {
    return {
      name: "language",
      variant: "english"
    };
  }
  if (iso693NativeNames.includes(value)) {
    return {
      name: "language",
      variant: "native"
    };
  }
  return void 0;
}
var phoneNumberRegex = /^\+[0-9]{6,15}$/;
function inferPhoneNumber(value) {
  const cleanedValue = value.replace(/[\s-()]/g, "");
  if (phoneNumberRegex.test(cleanedValue)) {
    return {
      name: "phoneNumber",
      variant: "e.164"
    };
  }
}
function lookupMimeType(ext) {
  if (ext === void 0) {
    return void 0;
  }
  const extensionToMimeType = {
    json: "application/json",
    js: "application/javascript",
    html: "text/html",
    css: "text/css",
    txt: "text/plain",
    ts: "text/typescript",
    tsx: "text/typescript",
    aac: "audio/aac",
    abw: "application/x-abiword",
    arc: "application/x-freearc",
    avi: "video/x-msvideo",
    azw: "application/vnd.amazon.ebook",
    bin: "application/octet-stream",
    bmp: "image/bmp",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    cda: "application/x-cdf",
    csh: "application/x-csh",
    csv: "text/csv",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    eot: "application/vnd.ms-fontobject",
    epub: "application/epub+zip",
    gz: "application/gzip",
    gif: "image/gif",
    htm: "text/html",
    ico: "image/vnd.microsoft.icon",
    ics: "text/calendar",
    jar: "application/java-archive",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    jsonld: "application/ld+json",
    mid: "audio/midi",
    midi: "audio/midi",
    mjs: "text/javascript",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mpeg: "video/mpeg",
    mpkg: "application/vnd.apple.installer+xml",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    oga: "audio/ogg",
    ogv: "video/ogg",
    ogx: "application/ogg",
    opus: "audio/opus",
    otf: "font/otf",
    png: "image/png",
    pdf: "application/pdf",
    php: "application/x-httpd-php",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    rar: "application/vnd.rar",
    rtf: "application/rtf",
    sh: "application/x-sh",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tar: "application/x-tar",
    tif: "image/tiff",
    tiff: "image/tiff",
    ttf: "font/ttf",
    vsd: "application/vnd.visio",
    wav: "audio/wav",
    weba: "audio/webm",
    webm: "video/webm",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml: "application/xml",
    xul: "application/vnd.mozilla.xul+xml",
    zip: "application/zip",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    "7z": "application/x-7z-compressed",
    md: "text/markdown"
  };
  return extensionToMimeType[ext];
}
var supportedProtocols = [
  "http:",
  "https:",
  "ftp:",
  "ftps:",
  "mailto:",
  "tel:",
  "sms:",
  "geo:",
  "file:",
  "ipfs:",
  "data:",
  "blob:",
  "chrome:",
  "chrome-extension:",
  "magnet:",
  "bitcoin:",
  "callto:",
  "dict:",
  "dns:",
  "feed:",
  "git:",
  "gtalk:",
  "imap:",
  "im:",
  "info:",
  "irc:",
  "ircs:",
  "irc6:",
  "itms:",
  "jabber:",
  "ldap:",
  "ldaps:",
  "maps:",
  "nfs:",
  "payto:",
  "proxy:",
  "redis:",
  "s3:",
  "ssh:",
  "udp:",
  "view-source:",
  "ws:",
  "wss:",
  "xmpp:"
];
function inferUri(value) {
  try {
    const url = new URL(value);
    if (url.hostname === "" && !supportedProtocols.includes(url.protocol)) {
      return void 0;
    }
    const ext = url.pathname.split(".").pop();
    const mimeType = lookupMimeType(ext);
    return {
      name: "uri",
      contentType: mimeType ? mimeType : void 0
    };
  } catch (_) {
  }
  return void 0;
}
function validateVersion(uuid, versionNumber) {
  return validate_default(uuid) && version_default(uuid) === versionNumber;
}
function inferUuid(value) {
  if (validateVersion(value, 1)) {
    return {
      name: "uuid",
      variant: "v1"
    };
  }
  if (validateVersion(value, 4)) {
    return {
      name: "uuid",
      variant: "v4"
    };
  }
  if (validateVersion(value, 5)) {
    return {
      name: "uuid",
      variant: "v5"
    };
  }
  return void 0;
}
function inferFilesize(value) {
  if (value.match(/^[0-9.]+\s?(?:(B|MB|K|GB|TB|PB|MiB|KB|kB))$/)) {
    return {
      name: "filesize",
      variant: "human"
    };
  }
  return void 0;
}
var tlds = [
  "com",
  "org",
  "net",
  "edu",
  "gov",
  "mil",
  "co",
  "io",
  "ac",
  "dev",
  "info",
  "biz",
  "name",
  "uk",
  "me",
  "ca",
  "tv",
  "ir",
  "au"
];
function containsTld(value) {
  const extname = value.split(".").pop();
  if (!extname) {
    return false;
  }
  return tlds.includes(extname);
}
function isValidHostname(value, allowUnderscore = false) {
  if (value.length === 0) {
    return false;
  }
  if (value === "localhost") {
    return true;
  }
  if (!value.includes(".")) {
    return false;
  }
  const validHostnameChars = new RegExp(`^[a-zA-Z0-9-.${allowUnderscore ? "_" : ""}]{1,253}.?$`, "g");
  if (!validHostnameChars.test(value)) {
    return false;
  }
  if (value.endsWith(".")) {
    value = value.slice(0, value.length - 1);
  }
  const labels = value.split(".");
  const isValid = labels.every(function(label) {
    const validLabelChars = new RegExp(`^([a-zA-Z0-9-${allowUnderscore ? "_" : ""}]+)$`, "g");
    const validLabel = validLabelChars.test(label) && label.length < 64 && !label.startsWith("-") && !label.endsWith("-");
    return validLabel;
  });
  return isValid && containsTld(value);
}
function inferHostname(value) {
  if (isValidHostname(value)) {
    return {
      name: "hostname",
      variant: "rfc1123"
    };
  }
  if (isValidHostname(value, true)) {
    return {
      name: "hostname",
      variant: "rfc5890"
    };
  }
  return void 0;
}
function inferJson(value) {
  try {
    const parsedValue = JSON.parse(value);
    if (typeof parsedValue === "object") {
      return {
        name: "json",
        variant: "ecma262"
      };
    }
  } catch {
  }
  try {
    const parsedValue = import_json5.default.parse(value);
    if (typeof parsedValue === "object") {
      return {
        name: "json",
        variant: "json5"
      };
    }
  } catch {
  }
  return void 0;
}
var rfc6901Regex = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
function inferJsonPointer(value) {
  if (rfc6901Regex.exec(value)) {
    return { name: "jsonPointer", variant: "rfc6901" };
  }
  return void 0;
}
var emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Emoji_Modifier_Base})*$/u;
function inferEmoji(value) {
  if (emojiRegex.test(value)) {
    return {
      name: "emoji"
    };
  }
  return void 0;
}
var regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
function inferSemver(value) {
  if (regex.test(value)) {
    return { name: "semver" };
  }
  return void 0;
}
function isFirestoreTimestamp(value) {
  return typeof value === "object" && value !== null && typeof value._seconds === "number" && typeof value._nanoseconds === "number";
}
function inferFirestoreTimestamp(value) {
  if (isFirestoreTimestamp(value)) {
    return {
      name: "firestoreTimestamp"
    };
  }
  return void 0;
}
function inferJWT(value) {
  try {
    const token = jwt_decode_esm_default(value);
    if (token) {
      return {
        name: "jwt"
      };
    }
  } catch {
  }
  return void 0;
}
var hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
var rgbRegex = /^rgba?\((\d{1,3})(,|\s+)\s*(\d{1,3})(,|\s+)\s*(\d{1,3})(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;
var hslRegex = /^hsla?\((\d{1,3})(,|\s+)\s*(\d{1,3}%)(,|\s+)\s*(\d{1,3}%)(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;
function inferColor(value) {
  if (hexRegex.test(value)) {
    return {
      name: "color",
      variant: "hex"
    };
  }
  if (rgbRegex.test(value)) {
    return {
      name: "color",
      variant: "rgb"
    };
  }
  if (hslRegex.test(value)) {
    return {
      name: "color",
      variant: "hsl"
    };
  }
  return void 0;
}
var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
var amexRegex = /^3[47][0-9]{13}$/;
var discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
var masterCardRegex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
var dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
function inferCreditCard(value) {
  const withoutWhitespace = value.replace(/\s/g, "");
  if (visaRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "visa"
    };
  } else if (amexRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "amex"
    };
  } else if (discoverRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "discover"
    };
  } else if (masterCardRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "mastercard"
    };
  } else if (dinersClubRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "dinersclub"
    };
  }
  return void 0;
}
var formats = [
  inferUri,
  inferTld,
  inferHostname,
  inferEmail,
  inferDatetime,
  inferIpAddress,
  inferPhoneNumber,
  inferCurrency,
  inferCountry,
  inferLanguage,
  inferUuid,
  inferFilesize,
  inferTimestamp,
  inferJson,
  inferJsonPointer,
  inferEmoji,
  inferSemver,
  inferJWT,
  inferColor,
  inferCreditCard
];
function inferFormat(value) {
  if (value.trim() === "") {
    return void 0;
  }
  for (const [, format2] of Object.entries(formats)) {
    const result = format2(value);
    if (result) {
      return result;
    }
  }
  return void 0;
}
var objectFormats = [inferFirestoreTimestamp];
function inferObjectFormat(value) {
  for (const [, format2] of Object.entries(objectFormats)) {
    const result = format2(value);
    if (result) {
      return result;
    }
  }
  return void 0;
}
var intFormats = [inferTimestamp];
function inferIntFormat(value) {
  for (const [, format2] of Object.entries(intFormats)) {
    const result = format2(value);
    if (result) {
      return result;
    }
  }
  return void 0;
}
function inferType(value) {
  if (value == null) {
    return { name: "null", value: null };
  }
  if (typeof value === "boolean") {
    return { name: "bool", value };
  }
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return {
        name: "int",
        value,
        format: inferIntFormat(value)
      };
    } else {
      return { name: "float", value };
    }
  }
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return {
        name: "array",
        value
      };
    }
    return {
      name: "object",
      format: inferObjectFormat(value),
      value
    };
  }
  if (typeof value === "string") {
    return {
      name: "string",
      value,
      format: inferFormat(value)
    };
  }
  return { name: "null", value: null };
}

// node_modules/@js-temporal/polyfill/dist/index.esm.js
var import_big_integer = __toESM(require_BigInteger(), 1);
var INTRINSICS = {};
var customUtilInspectFormatters = {
  ["Temporal.Duration"](depth, options) {
    const descr = options.stylize(`${this[Symbol.toStringTag]} <${this}>`, "special");
    if (depth < 1)
      return descr;
    const entries = [];
    for (const prop of [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
      "microseconds",
      "nanoseconds"
    ]) {
      if (this[prop] !== 0)
        entries.push(`  ${prop}: ${options.stylize(this[prop], "number")}`);
    }
    return descr + " {\n" + entries.join(",\n") + "\n}";
  }
};
function defaultUtilInspectFormatter(depth, options) {
  return options.stylize(`${this[Symbol.toStringTag]} <${this}>`, "special");
}
function MakeIntrinsicClass(Class, name) {
  Object.defineProperty(Class.prototype, Symbol.toStringTag, {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true
  });
  {
    Object.defineProperty(Class.prototype, Symbol.for("nodejs.util.inspect.custom"), {
      value: customUtilInspectFormatters[name] || defaultUtilInspectFormatter,
      writable: false,
      enumerable: false,
      configurable: true
    });
  }
  for (const prop of Object.getOwnPropertyNames(Class)) {
    const desc = Object.getOwnPropertyDescriptor(Class, prop);
    if (!desc.configurable || !desc.enumerable)
      continue;
    desc.enumerable = false;
    Object.defineProperty(Class, prop, desc);
  }
  for (const prop of Object.getOwnPropertyNames(Class.prototype)) {
    const desc = Object.getOwnPropertyDescriptor(Class.prototype, prop);
    if (!desc.configurable || !desc.enumerable)
      continue;
    desc.enumerable = false;
    Object.defineProperty(Class.prototype, prop, desc);
  }
  DefineIntrinsic(name, Class);
  DefineIntrinsic(`${name}.prototype`, Class.prototype);
}
function DefineIntrinsic(name, value) {
  const key = `%${name}%`;
  if (INTRINSICS[key] !== void 0)
    throw new Error(`intrinsic ${name} already exists`);
  INTRINSICS[key] = value;
}
function GetIntrinsic(intrinsic) {
  return INTRINSICS[intrinsic];
}
var EPOCHNANOSECONDS = "slot-epochNanoSeconds";
var TIMEZONE_ID = "slot-timezone-identifier";
var ISO_YEAR = "slot-year";
var ISO_MONTH = "slot-month";
var ISO_DAY = "slot-day";
var ISO_HOUR = "slot-hour";
var ISO_MINUTE = "slot-minute";
var ISO_SECOND = "slot-second";
var ISO_MILLISECOND = "slot-millisecond";
var ISO_MICROSECOND = "slot-microsecond";
var ISO_NANOSECOND = "slot-nanosecond";
var CALENDAR = "slot-calendar";
var DATE_BRAND = "slot-date-brand";
var YEAR_MONTH_BRAND = "slot-year-month-brand";
var MONTH_DAY_BRAND = "slot-month-day-brand";
var INSTANT = "slot-cached-instant";
var TIME_ZONE = "slot-time-zone";
var YEARS = "slot-years";
var MONTHS = "slot-months";
var WEEKS = "slot-weeks";
var DAYS = "slot-days";
var HOURS = "slot-hours";
var MINUTES = "slot-minutes";
var SECONDS = "slot-seconds";
var MILLISECONDS = "slot-milliseconds";
var MICROSECONDS = "slot-microseconds";
var NANOSECONDS = "slot-nanoseconds";
var CALENDAR_ID = "slot-calendar-identifier";
var slots = /* @__PURE__ */ new WeakMap();
function CreateSlots(container) {
  slots.set(container, /* @__PURE__ */ Object.create(null));
}
function GetSlots(container) {
  return slots.get(container);
}
function HasSlot(container, ...ids) {
  if (!container || typeof container !== "object")
    return false;
  const myslots = GetSlots(container);
  return !!myslots && ids.reduce((all, id) => all && id in myslots, true);
}
function GetSlot(container, id) {
  const value = GetSlots(container)[id];
  if (value === void 0)
    throw new TypeError(`Missing internal slot ${id}`);
  return value;
}
function SetSlot(container, id, value) {
  GetSlots(container)[id] = value;
}
var ArrayIncludes = Array.prototype.includes;
var ArrayPrototypePush$2 = Array.prototype.push;
var IntlDateTimeFormat$2 = globalThis.Intl.DateTimeFormat;
var MathAbs$1 = Math.abs;
var MathFloor$1 = Math.floor;
var ObjectAssign$2 = Object.assign;
var ObjectEntries = Object.entries;
var ObjectKeys = Object.keys;
var ReflectApply$2 = Reflect.apply;
var impl = {};
var Calendar = class {
  constructor(idParam) {
    if (arguments.length < 1) {
      throw new RangeError("missing argument: id is required");
    }
    const id = ToString(idParam);
    if (!IsBuiltinCalendar(id))
      throw new RangeError(`invalid calendar identifier ${id}`);
    CreateSlots(this);
    SetSlot(this, CALENDAR_ID, id);
    {
      Object.defineProperty(this, "_repr_", {
        value: `${this[Symbol.toStringTag]} <${id}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get id() {
    return ToString(this);
  }
  dateFromFields(fields, optionsParam = void 0) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(fields))
      throw new TypeError("invalid fields");
    const options = GetOptionsObject(optionsParam);
    return impl[GetSlot(this, CALENDAR_ID)].dateFromFields(fields, options, this);
  }
  yearMonthFromFields(fields, optionsParam = void 0) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(fields))
      throw new TypeError("invalid fields");
    const options = GetOptionsObject(optionsParam);
    return impl[GetSlot(this, CALENDAR_ID)].yearMonthFromFields(fields, options, this);
  }
  monthDayFromFields(fields, optionsParam = void 0) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(fields))
      throw new TypeError("invalid fields");
    const options = GetOptionsObject(optionsParam);
    return impl[GetSlot(this, CALENDAR_ID)].monthDayFromFields(fields, options, this);
  }
  fields(fields) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const fieldsArray = [];
    const allowed = /* @__PURE__ */ new Set([
      "year",
      "month",
      "monthCode",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
      "microsecond",
      "nanosecond"
    ]);
    for (const name of fields) {
      if (typeof name !== "string")
        throw new TypeError("invalid fields");
      if (!allowed.has(name))
        throw new RangeError(`invalid field name ${name}`);
      allowed.delete(name);
      ArrayPrototypePush$2.call(fieldsArray, name);
    }
    return impl[GetSlot(this, CALENDAR_ID)].fields(fieldsArray);
  }
  mergeFields(fields, additionalFields) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    return impl[GetSlot(this, CALENDAR_ID)].mergeFields(fields, additionalFields);
  }
  dateAdd(dateParam, durationParam, optionsParam = void 0) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const date = ToTemporalDate(dateParam);
    const duration2 = ToTemporalDuration(durationParam);
    const options = GetOptionsObject(optionsParam);
    const overflow = ToTemporalOverflow(options);
    const { days } = BalanceDuration(GetSlot(duration2, DAYS), GetSlot(duration2, HOURS), GetSlot(duration2, MINUTES), GetSlot(duration2, SECONDS), GetSlot(duration2, MILLISECONDS), GetSlot(duration2, MICROSECONDS), GetSlot(duration2, NANOSECONDS), "day");
    return impl[GetSlot(this, CALENDAR_ID)].dateAdd(date, GetSlot(duration2, YEARS), GetSlot(duration2, MONTHS), GetSlot(duration2, WEEKS), days, overflow, this);
  }
  dateUntil(oneParam, twoParam, optionsParam = void 0) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const one = ToTemporalDate(oneParam);
    const two = ToTemporalDate(twoParam);
    const options = GetOptionsObject(optionsParam);
    const largestUnit = ToLargestTemporalUnit(options, "auto", ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], "day");
    const { years, months, weeks, days } = impl[GetSlot(this, CALENDAR_ID)].dateUntil(one, two, largestUnit);
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  }
  year(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].year(date);
  }
  month(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (IsTemporalMonthDay(date))
      throw new TypeError("use monthCode on PlainMonthDay instead");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].month(date);
  }
  monthCode(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date) && !IsTemporalMonthDay(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].monthCode(date);
  }
  day(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalMonthDay(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].day(date);
  }
  era(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].era(date);
  }
  eraYear(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].eraYear(date);
  }
  dayOfWeek(dateParam) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const date = ToTemporalDate(dateParam);
    return impl[GetSlot(this, CALENDAR_ID)].dayOfWeek(date);
  }
  dayOfYear(dateParam) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const date = ToTemporalDate(dateParam);
    return impl[GetSlot(this, CALENDAR_ID)].dayOfYear(date);
  }
  weekOfYear(dateParam) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const date = ToTemporalDate(dateParam);
    return impl[GetSlot(this, CALENDAR_ID)].weekOfYear(date);
  }
  daysInWeek(dateParam) {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    const date = ToTemporalDate(dateParam);
    return impl[GetSlot(this, CALENDAR_ID)].daysInWeek(date);
  }
  daysInMonth(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].daysInMonth(date);
  }
  daysInYear(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].daysInYear(date);
  }
  monthsInYear(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].monthsInYear(date);
  }
  inLeapYear(dateParam) {
    let date = dateParam;
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    if (!IsTemporalYearMonth(date))
      date = ToTemporalDate(date);
    return impl[GetSlot(this, CALENDAR_ID)].inLeapYear(date);
  }
  toString() {
    if (!IsTemporalCalendar(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR_ID);
  }
  toJSON() {
    return ToString(this);
  }
  static from(item) {
    return ToTemporalCalendar(item);
  }
};
MakeIntrinsicClass(Calendar, "Temporal.Calendar");
DefineIntrinsic("Temporal.Calendar.from", Calendar.from);
impl["iso8601"] = {
  dateFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    let fields = PrepareTemporalFields(fieldsParam, [
      ["day"],
      ["month", void 0],
      ["monthCode", void 0],
      ["year"]
    ]);
    fields = resolveNonLunisolarMonth(fields);
    let { year, month, day } = fields;
    ({ year, month, day } = RegulateISODate(year, month, day, overflow));
    return CreateTemporalDate(year, month, day, calendar2);
  },
  yearMonthFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    let fields = PrepareTemporalFields(fieldsParam, [
      ["month", void 0],
      ["monthCode", void 0],
      ["year"]
    ]);
    fields = resolveNonLunisolarMonth(fields);
    let { year, month } = fields;
    ({ year, month } = RegulateISOYearMonth(year, month, overflow));
    return CreateTemporalYearMonth(year, month, calendar2, 1);
  },
  monthDayFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    let fields = PrepareTemporalFields(fieldsParam, [
      ["day"],
      ["month", void 0],
      ["monthCode", void 0],
      ["year", void 0]
    ]);
    if (fields.month !== void 0 && fields.year === void 0 && fields.monthCode === void 0) {
      throw new TypeError("either year or monthCode required with month");
    }
    const useYear = fields.monthCode === void 0;
    const referenceISOYear = 1972;
    fields = resolveNonLunisolarMonth(fields);
    let { month, day, year } = fields;
    ({ month, day } = RegulateISODate(useYear ? year : referenceISOYear, month, day, overflow));
    return CreateTemporalMonthDay(month, day, calendar2, referenceISOYear);
  },
  fields(fields) {
    return fields;
  },
  mergeFields(fields, additionalFields) {
    const merged = {};
    for (const nextKey of ObjectKeys(fields)) {
      if (nextKey === "month" || nextKey === "monthCode")
        continue;
      merged[nextKey] = fields[nextKey];
    }
    const newKeys = ObjectKeys(additionalFields);
    for (const nextKey of newKeys) {
      merged[nextKey] = additionalFields[nextKey];
    }
    if (!ArrayIncludes.call(newKeys, "month") && !ArrayIncludes.call(newKeys, "monthCode")) {
      const { month, monthCode } = fields;
      if (month !== void 0)
        merged.month = month;
      if (monthCode !== void 0)
        merged.monthCode = monthCode;
    }
    return merged;
  },
  dateAdd(date, years, months, weeks, days, overflow, calendar2) {
    let year = GetSlot(date, ISO_YEAR);
    let month = GetSlot(date, ISO_MONTH);
    let day = GetSlot(date, ISO_DAY);
    ({ year, month, day } = AddISODate(year, month, day, years, months, weeks, days, overflow));
    return CreateTemporalDate(year, month, day, calendar2);
  },
  dateUntil(one, two, largestUnit) {
    return DifferenceISODate(GetSlot(one, ISO_YEAR), GetSlot(one, ISO_MONTH), GetSlot(one, ISO_DAY), GetSlot(two, ISO_YEAR), GetSlot(two, ISO_MONTH), GetSlot(two, ISO_DAY), largestUnit);
  },
  year(date) {
    return GetSlot(date, ISO_YEAR);
  },
  era() {
    return void 0;
  },
  eraYear() {
    return void 0;
  },
  month(date) {
    return GetSlot(date, ISO_MONTH);
  },
  monthCode(date) {
    return buildMonthCode(GetSlot(date, ISO_MONTH));
  },
  day(date) {
    return GetSlot(date, ISO_DAY);
  },
  dayOfWeek(date) {
    return DayOfWeek(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  dayOfYear(date) {
    return DayOfYear(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  weekOfYear(date) {
    return WeekOfYear(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  daysInWeek() {
    return 7;
  },
  daysInMonth(date) {
    return ISODaysInMonth(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH));
  },
  daysInYear(dateParam) {
    let date = dateParam;
    if (!HasSlot(date, ISO_YEAR))
      date = ToTemporalDate(date);
    return LeapYear(GetSlot(date, ISO_YEAR)) ? 366 : 365;
  },
  monthsInYear() {
    return 12;
  },
  inLeapYear(dateParam) {
    let date = dateParam;
    if (!HasSlot(date, ISO_YEAR))
      date = ToTemporalDate(date);
    return LeapYear(GetSlot(date, ISO_YEAR));
  }
};
function monthCodeNumberPart(monthCode) {
  if (!monthCode.startsWith("M")) {
    throw new RangeError(`Invalid month code: ${monthCode}.  Month codes must start with M.`);
  }
  const month = +monthCode.slice(1);
  if (isNaN(month))
    throw new RangeError(`Invalid month code: ${monthCode}`);
  return month;
}
function buildMonthCode(month, leap = false) {
  return `M${month.toString().padStart(2, "0")}${leap ? "L" : ""}`;
}
function resolveNonLunisolarMonth(calendarDate, overflow = void 0, monthsPerYear = 12) {
  let { month, monthCode } = calendarDate;
  if (monthCode === void 0) {
    if (month === void 0)
      throw new TypeError("Either month or monthCode are required");
    if (overflow === "reject")
      RejectToRange(month, 1, monthsPerYear);
    if (overflow === "constrain")
      month = ConstrainToRange(month, 1, monthsPerYear);
    monthCode = buildMonthCode(month);
  } else {
    const numberPart = monthCodeNumberPart(monthCode);
    if (month !== void 0 && month !== numberPart) {
      throw new RangeError(`monthCode ${monthCode} and month ${month} must match if both are present`);
    }
    if (monthCode !== buildMonthCode(numberPart)) {
      throw new RangeError(`Invalid month code: ${monthCode}`);
    }
    month = numberPart;
    if (month < 1 || month > monthsPerYear)
      throw new RangeError(`Invalid monthCode: ${monthCode}`);
  }
  return { ...calendarDate, month, monthCode };
}
var OneObjectCache = class {
  constructor(cacheToClone = void 0) {
    this.map = /* @__PURE__ */ new Map();
    this.calls = 0;
    this.hits = 0;
    this.misses = 0;
    this.now = globalThis.performance ? globalThis.performance.now() : Date.now();
    if (cacheToClone !== void 0) {
      let i = 0;
      for (const entry of cacheToClone.map.entries()) {
        if (++i > OneObjectCache.MAX_CACHE_ENTRIES)
          break;
        this.map.set(...entry);
      }
    }
  }
  get(key) {
    const result = this.map.get(key);
    if (result) {
      this.hits++;
      this.report();
    }
    this.calls++;
    return result;
  }
  set(key, value) {
    this.map.set(key, value);
    this.misses++;
    this.report();
  }
  report() {
  }
  setObject(obj) {
    if (OneObjectCache.objectMap.get(obj))
      throw new RangeError("object already cached");
    OneObjectCache.objectMap.set(obj, this);
    this.report();
  }
  static getCacheForObject(obj) {
    let cache = OneObjectCache.objectMap.get(obj);
    if (!cache) {
      cache = new OneObjectCache();
      OneObjectCache.objectMap.set(obj, cache);
    }
    return cache;
  }
};
OneObjectCache.objectMap = /* @__PURE__ */ new WeakMap();
OneObjectCache.MAX_CACHE_ENTRIES = 1e3;
function toUtcIsoDateString({ isoYear, isoMonth, isoDay }) {
  const yearString = ISOYearString(isoYear);
  const monthString = ISODateTimePartString(isoMonth);
  const dayString = ISODateTimePartString(isoDay);
  return `${yearString}-${monthString}-${dayString}T00:00Z`;
}
function simpleDateDiff(one, two) {
  return {
    years: one.year - two.year,
    months: one.month - two.month,
    days: one.day - two.day
  };
}
var nonIsoHelperBase = {
  getFormatter() {
    if (typeof this.formatter === "undefined") {
      this.formatter = new IntlDateTimeFormat$2(`en-US-u-ca-${this.id}`, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        era: this.eraLength,
        timeZone: "UTC"
      });
    }
    return this.formatter;
  },
  isoToCalendarDate(isoDate, cache) {
    const { year: isoYear, month: isoMonth, day: isoDay } = isoDate;
    const key = JSON.stringify({ func: "isoToCalendarDate", isoYear, isoMonth, isoDay, id: this.id });
    const cached = cache.get(key);
    if (cached)
      return cached;
    const dateTimeFormat = this.getFormatter();
    let parts, isoString;
    try {
      isoString = toUtcIsoDateString({ isoYear, isoMonth, isoDay });
      parts = dateTimeFormat.formatToParts(new Date(isoString));
    } catch (e2) {
      throw new RangeError(`Invalid ISO date: ${JSON.stringify({ isoYear, isoMonth, isoDay })}`);
    }
    const result = {};
    for (let { type, value } of parts) {
      if (type === "year")
        result.eraYear = +value;
      if (type === "relatedYear")
        result.eraYear = +value;
      if (type === "month") {
        const matches = /^([-0-9.]+)(.*?)$/.exec(value);
        if (!matches || matches.length != 3)
          throw new RangeError(`Unexpected month: ${value}`);
        result.month = +matches[1];
        if (result.month < 1) {
          throw new RangeError(`Invalid month ${value} from ${isoString}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);
        }
        if (result.month > 13) {
          throw new RangeError(`Invalid month ${value} from ${isoString}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
        }
        if (matches[2])
          result.monthExtra = matches[2];
      }
      if (type === "day")
        result.day = +value;
      if (this.hasEra && type === "era" && value != null && value !== "") {
        value = value.split(" (")[0];
        result.era = value.normalize("NFD").replace(/[^-0-9 \p{L}]/gu, "").replace(" ", "-").toLowerCase();
      }
    }
    if (result.eraYear === void 0) {
      throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
    }
    if (this.reviseIntlEra) {
      const { era, eraYear } = this.reviseIntlEra(result, isoDate);
      result.era = era;
      result.eraYear = eraYear;
    }
    if (this.checkIcuBugs)
      this.checkIcuBugs(result, isoDate);
    const calendarDate = this.adjustCalendarDate(result, cache, "constrain", true);
    if (calendarDate.year === void 0)
      throw new RangeError(`Missing year converting ${JSON.stringify(isoDate)}`);
    if (calendarDate.month === void 0)
      throw new RangeError(`Missing month converting ${JSON.stringify(isoDate)}`);
    if (calendarDate.day === void 0)
      throw new RangeError(`Missing day converting ${JSON.stringify(isoDate)}`);
    cache.set(key, calendarDate);
    ["constrain", "reject"].forEach((overflow) => {
      const keyReverse = JSON.stringify({
        func: "calendarToIsoDate",
        year: calendarDate.year,
        month: calendarDate.month,
        day: calendarDate.day,
        overflow,
        id: this.id
      });
      cache.set(keyReverse, isoDate);
    });
    return calendarDate;
  },
  validateCalendarDate(calendarDate) {
    const { era, month, year, day, eraYear, monthCode, monthExtra } = calendarDate;
    if (monthExtra !== void 0)
      throw new RangeError("Unexpected `monthExtra` value");
    if (year === void 0 && eraYear === void 0)
      throw new TypeError("year or eraYear is required");
    if (month === void 0 && monthCode === void 0)
      throw new TypeError("month or monthCode is required");
    if (day === void 0)
      throw new RangeError("Missing day");
    if (monthCode !== void 0) {
      if (typeof monthCode !== "string") {
        throw new RangeError(`monthCode must be a string, not ${typeof monthCode}`);
      }
      if (!/^M([01]?\d)(L?)$/.test(monthCode))
        throw new RangeError(`Invalid monthCode: ${monthCode}`);
    }
    if (this.constantEra) {
      if (era !== void 0 && era !== this.constantEra) {
        throw new RangeError(`era must be ${this.constantEra}, not ${era}`);
      }
      if (eraYear !== void 0 && year !== void 0 && eraYear !== year) {
        throw new RangeError(`eraYear ${eraYear} does not match year ${year}`);
      }
    }
  },
  adjustCalendarDate(calendarDateParam, cache, overflow) {
    if (this.calendarType === "lunisolar")
      throw new RangeError("Override required for lunisolar calendars");
    let calendarDate = calendarDateParam;
    this.validateCalendarDate(calendarDate);
    const largestMonth = this.monthsInYear(calendarDate, cache);
    let { month, year, eraYear, monthCode } = calendarDate;
    if (this.constantEra) {
      if (year === void 0)
        year = eraYear;
      if (eraYear === void 0)
        eraYear = year;
      calendarDate = { ...calendarDate, era: this.constantEra, year, eraYear };
    }
    ({ month, monthCode } = resolveNonLunisolarMonth(calendarDate, overflow, largestMonth));
    return { ...calendarDate, month, monthCode };
  },
  regulateMonthDayNaive(calendarDate, overflow, cache) {
    const largestMonth = this.monthsInYear(calendarDate, cache);
    let { month, day } = calendarDate;
    if (overflow === "reject") {
      RejectToRange(month, 1, largestMonth);
      RejectToRange(day, 1, this.maximumMonthLength(calendarDate));
    } else {
      month = ConstrainToRange(month, 1, largestMonth);
      day = ConstrainToRange(day, 1, this.maximumMonthLength({ ...calendarDate, month }));
    }
    return { ...calendarDate, month, day };
  },
  calendarToIsoDate(dateParam, overflow = "constrain", cache) {
    const originalDate = dateParam;
    let date = this.adjustCalendarDate(dateParam, cache, overflow, false);
    date = this.regulateMonthDayNaive(date, overflow, cache);
    const { year, month, day } = date;
    const key = JSON.stringify({ func: "calendarToIsoDate", year, month, day, overflow, id: this.id });
    let cached = cache.get(key);
    if (cached)
      return cached;
    let keyOriginal;
    if (originalDate.year !== void 0 && originalDate.month !== void 0 && originalDate.day !== void 0 && (originalDate.year !== date.year || originalDate.month !== date.month || originalDate.day !== date.day)) {
      keyOriginal = JSON.stringify({
        func: "calendarToIsoDate",
        year: originalDate.year,
        month: originalDate.month,
        day: originalDate.day,
        overflow,
        id: this.id
      });
      cached = cache.get(keyOriginal);
      if (cached)
        return cached;
    }
    let isoEstimate = this.estimateIsoDate({ year, month, day });
    const calculateSameMonthResult = (diffDays) => {
      let testIsoEstimate = this.addDaysIso(isoEstimate, diffDays);
      if (date.day > this.minimumMonthLength(date)) {
        let testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
        while (testCalendarDate.month !== month || testCalendarDate.year !== year) {
          if (overflow === "reject") {
            throw new RangeError(`day ${day} does not exist in month ${month} of year ${year}`);
          }
          testIsoEstimate = this.addDaysIso(testIsoEstimate, -1);
          testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
        }
      }
      return testIsoEstimate;
    };
    let sign = 0;
    let roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
    let diff = simpleDateDiff(date, roundtripEstimate);
    if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0) {
      const diffTotalDaysEstimate = diff.years * 365 + diff.months * 30 + diff.days;
      isoEstimate = this.addDaysIso(isoEstimate, diffTotalDaysEstimate);
      roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
      diff = simpleDateDiff(date, roundtripEstimate);
      if (diff.years === 0 && diff.months === 0) {
        isoEstimate = calculateSameMonthResult(diff.days);
      } else {
        sign = this.compareCalendarDates(date, roundtripEstimate);
      }
    }
    let increment = 8;
    let maybeConstrained = false;
    while (sign) {
      isoEstimate = this.addDaysIso(isoEstimate, sign * increment);
      const oldRoundtripEstimate = roundtripEstimate;
      roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
      const oldSign = sign;
      sign = this.compareCalendarDates(date, roundtripEstimate);
      if (sign) {
        diff = simpleDateDiff(date, roundtripEstimate);
        if (diff.years === 0 && diff.months === 0) {
          isoEstimate = calculateSameMonthResult(diff.days);
          sign = 0;
          maybeConstrained = date.day > this.minimumMonthLength(date);
        } else if (oldSign && sign !== oldSign) {
          if (increment > 1) {
            increment /= 2;
          } else {
            if (overflow === "reject") {
              throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ ...originalDate })}`);
            } else {
              const order = this.compareCalendarDates(roundtripEstimate, oldRoundtripEstimate);
              if (order > 0)
                isoEstimate = this.addDaysIso(isoEstimate, -1);
              maybeConstrained = true;
              sign = 0;
            }
          }
        }
      }
    }
    cache.set(key, isoEstimate);
    if (keyOriginal)
      cache.set(keyOriginal, isoEstimate);
    if (date.year === void 0 || date.month === void 0 || date.day === void 0 || date.monthCode === void 0 || this.hasEra && (date.era === void 0 || date.eraYear === void 0)) {
      throw new RangeError("Unexpected missing property");
    }
    if (!maybeConstrained) {
      const keyReverse = JSON.stringify({
        func: "isoToCalendarDate",
        isoYear: isoEstimate.year,
        isoMonth: isoEstimate.month,
        isoDay: isoEstimate.day,
        id: this.id
      });
      cache.set(keyReverse, date);
    }
    return isoEstimate;
  },
  temporalToCalendarDate(date, cache) {
    const isoDate = { year: GetSlot(date, ISO_YEAR), month: GetSlot(date, ISO_MONTH), day: GetSlot(date, ISO_DAY) };
    const result = this.isoToCalendarDate(isoDate, cache);
    return result;
  },
  compareCalendarDates(date1Param, date2Param) {
    const date1 = PrepareTemporalFields(date1Param, [["day"], ["month"], ["year"]]);
    const date2 = PrepareTemporalFields(date2Param, [["day"], ["month"], ["year"]]);
    if (date1.year !== date2.year)
      return ComparisonResult(date1.year - date2.year);
    if (date1.month !== date2.month)
      return ComparisonResult(date1.month - date2.month);
    if (date1.day !== date2.day)
      return ComparisonResult(date1.day - date2.day);
    return 0;
  },
  regulateDate(calendarDate, overflow = "constrain", cache) {
    const isoDate = this.calendarToIsoDate(calendarDate, overflow, cache);
    return this.isoToCalendarDate(isoDate, cache);
  },
  addDaysIso(isoDate, days) {
    const added = AddISODate(isoDate.year, isoDate.month, isoDate.day, 0, 0, 0, days, "constrain");
    return added;
  },
  addDaysCalendar(calendarDate, days, cache) {
    const isoDate = this.calendarToIsoDate(calendarDate, "constrain", cache);
    const addedIso = this.addDaysIso(isoDate, days);
    const addedCalendar = this.isoToCalendarDate(addedIso, cache);
    return addedCalendar;
  },
  addMonthsCalendar(calendarDateParam, months, overflow, cache) {
    let calendarDate = calendarDateParam;
    const { day } = calendarDate;
    for (let i = 0, absMonths = MathAbs$1(months); i < absMonths; i++) {
      const { month } = calendarDate;
      const oldCalendarDate = calendarDate;
      const days = months < 0 ? -Math.max(day, this.daysInPreviousMonth(calendarDate, cache)) : this.daysInMonth(calendarDate, cache);
      const isoDate = this.calendarToIsoDate(calendarDate, "constrain", cache);
      let addedIso = this.addDaysIso(isoDate, days, cache);
      calendarDate = this.isoToCalendarDate(addedIso, cache);
      if (months > 0) {
        const monthsInOldYear = this.monthsInYear(oldCalendarDate, cache);
        while (calendarDate.month - 1 !== month % monthsInOldYear) {
          addedIso = this.addDaysIso(addedIso, -1, cache);
          calendarDate = this.isoToCalendarDate(addedIso, cache);
        }
      }
      if (calendarDate.day !== day) {
        calendarDate = this.regulateDate({ ...calendarDate, day }, "constrain", cache);
      }
    }
    if (overflow === "reject" && calendarDate.day !== day) {
      throw new RangeError(`Day ${day} does not exist in resulting calendar month`);
    }
    return calendarDate;
  },
  addCalendar(calendarDate, { years = 0, months = 0, weeks = 0, days = 0 }, overflow, cache) {
    const { year, month, day } = calendarDate;
    const addedMonths = this.addMonthsCalendar({ year: year + years, month, day }, months, overflow, cache);
    const initialDays = days + weeks * 7;
    const addedDays = this.addDaysCalendar(addedMonths, initialDays, cache);
    return addedDays;
  },
  untilCalendar(calendarOne, calendarTwo, largestUnit, cache) {
    let days = 0;
    let weeks = 0;
    let months = 0;
    let years = 0;
    switch (largestUnit) {
      case "day":
        days = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
        break;
      case "week": {
        const totalDays = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
        days = totalDays % 7;
        weeks = (totalDays - days) / 7;
        break;
      }
      case "month":
      case "year": {
        const diffYears = calendarTwo.year - calendarOne.year;
        const diffMonths = calendarTwo.month - calendarOne.month;
        const diffDays = calendarTwo.day - calendarOne.day;
        const sign = this.compareCalendarDates(calendarTwo, calendarOne);
        if (largestUnit === "year" && diffYears) {
          const isOneFurtherInYear = diffMonths * sign < 0 || diffMonths === 0 && diffDays * sign < 0;
          years = isOneFurtherInYear ? diffYears - sign : diffYears;
        }
        const yearsAdded = years ? this.addCalendar(calendarOne, { years }, "constrain", cache) : calendarOne;
        let current;
        let next = yearsAdded;
        do {
          months += sign;
          current = next;
          next = this.addMonthsCalendar(current, sign, "constrain", cache);
          if (next.day !== calendarOne.day) {
            next = this.regulateDate({ ...next, day: calendarOne.day }, "constrain", cache);
          }
        } while (this.compareCalendarDates(calendarTwo, next) * sign >= 0);
        months -= sign;
        const remainingDays = this.calendarDaysUntil(current, calendarTwo, cache);
        days = remainingDays;
        break;
      }
    }
    return { years, months, weeks, days };
  },
  daysInMonth(calendarDate, cache) {
    const { day } = calendarDate;
    const max = this.maximumMonthLength(calendarDate);
    const min = this.minimumMonthLength(calendarDate);
    if (min === max)
      return min;
    const increment = day <= max - min ? max : min;
    const isoDate = this.calendarToIsoDate(calendarDate, "constrain", cache);
    const addedIsoDate = this.addDaysIso(isoDate, increment);
    const addedCalendarDate = this.isoToCalendarDate(addedIsoDate, cache);
    const endOfMonthIso = this.addDaysIso(addedIsoDate, -addedCalendarDate.day);
    const endOfMonthCalendar = this.isoToCalendarDate(endOfMonthIso, cache);
    return endOfMonthCalendar.day;
  },
  daysInPreviousMonth(calendarDate, cache) {
    const { day, month, year } = calendarDate;
    const previousMonthYear = month > 1 ? year : year - 1;
    let previousMonthDate = { year: previousMonthYear, month, day: 1 };
    const previousMonth = month > 1 ? month - 1 : this.monthsInYear(previousMonthDate, cache);
    previousMonthDate = { ...previousMonthDate, month: previousMonth };
    const min = this.minimumMonthLength(previousMonthDate);
    const max = this.maximumMonthLength(previousMonthDate);
    if (min === max)
      return max;
    const isoDate = this.calendarToIsoDate(calendarDate, "constrain", cache);
    const lastDayOfPreviousMonthIso = this.addDaysIso(isoDate, -day);
    const lastDayOfPreviousMonthCalendar = this.isoToCalendarDate(lastDayOfPreviousMonthIso, cache);
    return lastDayOfPreviousMonthCalendar.day;
  },
  startOfCalendarYear(calendarDate) {
    return { year: calendarDate.year, month: 1, day: 1 };
  },
  startOfCalendarMonth(calendarDate) {
    return { year: calendarDate.year, month: calendarDate.month, day: 1 };
  },
  calendarDaysUntil(calendarOne, calendarTwo, cache) {
    const oneIso = this.calendarToIsoDate(calendarOne, "constrain", cache);
    const twoIso = this.calendarToIsoDate(calendarTwo, "constrain", cache);
    return this.isoDaysUntil(oneIso, twoIso);
  },
  isoDaysUntil(oneIso, twoIso) {
    const duration2 = DifferenceISODate(oneIso.year, oneIso.month, oneIso.day, twoIso.year, twoIso.month, twoIso.day, "day");
    return duration2.days;
  },
  eraLength: "short",
  hasEra: true,
  monthDayFromFields(fields, overflow, cache) {
    let { year, month, monthCode, day, era, eraYear } = fields;
    if (monthCode === void 0) {
      if (year === void 0 && (era === void 0 || eraYear === void 0)) {
        throw new TypeError("`monthCode`, `year`, or `era` and `eraYear` is required");
      }
      ({ monthCode, year } = this.adjustCalendarDate({ year, month, monthCode, day, era, eraYear }, cache, overflow));
    }
    let isoYear, isoMonth, isoDay;
    let closestCalendar, closestIso;
    const startDateIso = { year: 1972, month: 1, day: 1 };
    const { year: calendarYear } = this.isoToCalendarDate(startDateIso, cache);
    for (let i = 0; i < 100; i++) {
      const testCalendarDate = this.adjustCalendarDate({ day, monthCode, year: calendarYear - i }, cache);
      const isoDate = this.calendarToIsoDate(testCalendarDate, "constrain", cache);
      const roundTripCalendarDate = this.isoToCalendarDate(isoDate, cache);
      ({ year: isoYear, month: isoMonth, day: isoDay } = isoDate);
      if (roundTripCalendarDate.monthCode === monthCode && roundTripCalendarDate.day === day) {
        return { month: isoMonth, day: isoDay, year: isoYear };
      } else if (overflow === "constrain") {
        if (closestCalendar === void 0 || roundTripCalendarDate.monthCode === closestCalendar.monthCode && roundTripCalendarDate.day > closestCalendar.day) {
          closestCalendar = roundTripCalendarDate;
          closestIso = isoDate;
        }
      }
    }
    if (overflow === "constrain" && closestIso !== void 0)
      return closestIso;
    throw new RangeError(`No recent ${this.id} year with monthCode ${monthCode} and day ${day}`);
  }
};
var helperHebrew = ObjectAssign$2({}, nonIsoHelperBase, {
  id: "hebrew",
  calendarType: "lunisolar",
  inLeapYear(calendarDate) {
    const { year } = calendarDate;
    return (7 * year + 1) % 19 < 7;
  },
  monthsInYear(calendarDate) {
    return this.inLeapYear(calendarDate) ? 13 : 12;
  },
  minimumMonthLength(calendarDate) {
    return this.minMaxMonthLength(calendarDate, "min");
  },
  maximumMonthLength(calendarDate) {
    return this.minMaxMonthLength(calendarDate, "max");
  },
  minMaxMonthLength(calendarDate, minOrMax) {
    const { month, year } = calendarDate;
    const monthCode = this.getMonthCode(year, month);
    const monthInfo = ObjectEntries(this.months).find((m) => m[1].monthCode === monthCode);
    if (monthInfo === void 0)
      throw new RangeError(`unmatched Hebrew month: ${month}`);
    const daysInMonth = monthInfo[1].days;
    return typeof daysInMonth === "number" ? daysInMonth : daysInMonth[minOrMax];
  },
  estimateIsoDate(calendarDate) {
    const { year } = calendarDate;
    return { year: year - 3760, month: 1, day: 1 };
  },
  months: {
    Tishri: { leap: 1, regular: 1, monthCode: "M01", days: 30 },
    Heshvan: { leap: 2, regular: 2, monthCode: "M02", days: { min: 29, max: 30 } },
    Kislev: { leap: 3, regular: 3, monthCode: "M03", days: { min: 29, max: 30 } },
    Tevet: { leap: 4, regular: 4, monthCode: "M04", days: 29 },
    Shevat: { leap: 5, regular: 5, monthCode: "M05", days: 30 },
    Adar: { leap: void 0, regular: 6, monthCode: "M06", days: 29 },
    "Adar I": { leap: 6, regular: void 0, monthCode: "M05L", days: 30 },
    "Adar II": { leap: 7, regular: void 0, monthCode: "M06", days: 29 },
    Nisan: { leap: 8, regular: 7, monthCode: "M07", days: 30 },
    Iyar: { leap: 9, regular: 8, monthCode: "M08", days: 29 },
    Sivan: { leap: 10, regular: 9, monthCode: "M09", days: 30 },
    Tamuz: { leap: 11, regular: 10, monthCode: "M10", days: 29 },
    Av: { leap: 12, regular: 11, monthCode: "M11", days: 30 },
    Elul: { leap: 13, regular: 12, monthCode: "M12", days: 29 }
  },
  getMonthCode(year, month) {
    if (this.inLeapYear({ year })) {
      return month === 6 ? buildMonthCode(5, true) : buildMonthCode(month < 6 ? month : month - 1);
    } else {
      return buildMonthCode(month);
    }
  },
  adjustCalendarDate(calendarDate, cache, overflow = "constrain", fromLegacyDate = false) {
    let { year, eraYear, month, monthCode, day, monthExtra } = calendarDate;
    if (year === void 0)
      year = eraYear;
    if (eraYear === void 0)
      eraYear = year;
    if (fromLegacyDate) {
      if (monthExtra) {
        const monthInfo = this.months[monthExtra];
        if (!monthInfo)
          throw new RangeError(`Unrecognized month from formatToParts: ${monthExtra}`);
        month = this.inLeapYear({ year }) ? monthInfo.leap : monthInfo.regular;
      }
      monthCode = this.getMonthCode(year, month);
      const result = { year, month, day, era: void 0, eraYear, monthCode };
      return result;
    } else {
      this.validateCalendarDate(calendarDate);
      if (month === void 0) {
        if (monthCode.endsWith("L")) {
          if (monthCode !== "M05L") {
            throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${monthCode}`);
          }
          month = 6;
          if (!this.inLeapYear({ year })) {
            if (overflow === "reject") {
              throw new RangeError(`Hebrew monthCode M05L is invalid in year ${year} which is not a leap year`);
            } else {
              month = 5;
              day = 30;
              monthCode = "M05";
            }
          }
        } else {
          month = monthCodeNumberPart(monthCode);
          if (this.inLeapYear({ year }) && month > 6)
            month++;
          const largestMonth = this.monthsInYear({ year });
          if (month < 1 || month > largestMonth)
            throw new RangeError(`Invalid monthCode: ${monthCode}`);
        }
      } else {
        if (overflow === "reject") {
          RejectToRange(month, 1, this.monthsInYear({ year }));
          RejectToRange(day, 1, this.maximumMonthLength(calendarDate));
        } else {
          month = ConstrainToRange(month, 1, this.monthsInYear({ year }));
          day = ConstrainToRange(day, 1, this.maximumMonthLength({ ...calendarDate, month }));
        }
        if (monthCode === void 0) {
          monthCode = this.getMonthCode(year, month);
        } else {
          const calculatedMonthCode = this.getMonthCode(year, month);
          if (calculatedMonthCode !== monthCode) {
            throw new RangeError(`monthCode ${monthCode} doesn't correspond to month ${month} in Hebrew year ${year}`);
          }
        }
      }
      return { ...calendarDate, day, month, monthCode, year, eraYear };
    }
  },
  hasEra: false
});
var helperIslamic = ObjectAssign$2({}, nonIsoHelperBase, {
  id: "islamic",
  calendarType: "lunar",
  inLeapYear(calendarDate, cache) {
    const days = this.daysInMonth({ year: calendarDate.year, month: 12, day: 1 }, cache);
    return days === 30;
  },
  monthsInYear() {
    return 12;
  },
  minimumMonthLength: () => 29,
  maximumMonthLength: () => 30,
  DAYS_PER_ISLAMIC_YEAR: 354 + 11 / 30,
  DAYS_PER_ISO_YEAR: 365.2425,
  constantEra: "ah",
  estimateIsoDate(calendarDate) {
    const { year } = this.adjustCalendarDate(calendarDate);
    return { year: MathFloor$1(year * this.DAYS_PER_ISLAMIC_YEAR / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
  }
});
var helperPersian = ObjectAssign$2({}, nonIsoHelperBase, {
  id: "persian",
  calendarType: "solar",
  inLeapYear(calendarDate, cache) {
    return helperIslamic.inLeapYear(calendarDate, cache);
  },
  monthsInYear() {
    return 12;
  },
  minimumMonthLength(calendarDate) {
    const { month } = calendarDate;
    if (month === 12)
      return 29;
    return month <= 6 ? 31 : 30;
  },
  maximumMonthLength(calendarDate) {
    const { month } = calendarDate;
    if (month === 12)
      return 30;
    return month <= 6 ? 31 : 30;
  },
  constantEra: "ap",
  estimateIsoDate(calendarDate) {
    const { year } = this.adjustCalendarDate(calendarDate);
    return { year: year + 621, month: 1, day: 1 };
  }
});
var helperIndian = ObjectAssign$2({}, nonIsoHelperBase, {
  id: "indian",
  calendarType: "solar",
  inLeapYear(calendarDate) {
    return isGregorianLeapYear(calendarDate.year + 78);
  },
  monthsInYear() {
    return 12;
  },
  minimumMonthLength(calendarDate) {
    return this.getMonthInfo(calendarDate).length;
  },
  maximumMonthLength(calendarDate) {
    return this.getMonthInfo(calendarDate).length;
  },
  constantEra: "saka",
  months: {
    1: { length: 30, month: 3, day: 22, leap: { length: 31, month: 3, day: 21 } },
    2: { length: 31, month: 4, day: 21 },
    3: { length: 31, month: 5, day: 22 },
    4: { length: 31, month: 6, day: 22 },
    5: { length: 31, month: 7, day: 23 },
    6: { length: 31, month: 8, day: 23 },
    7: { length: 30, month: 9, day: 23 },
    8: { length: 30, month: 10, day: 23 },
    9: { length: 30, month: 11, day: 22 },
    10: { length: 30, month: 12, day: 22 },
    11: { length: 30, month: 1, nextYear: true, day: 21 },
    12: { length: 30, month: 2, nextYear: true, day: 20 }
  },
  getMonthInfo(calendarDate) {
    const { month } = calendarDate;
    let monthInfo = this.months[month];
    if (monthInfo === void 0)
      throw new RangeError(`Invalid month: ${month}`);
    if (this.inLeapYear(calendarDate) && monthInfo.leap)
      monthInfo = monthInfo.leap;
    return monthInfo;
  },
  estimateIsoDate(calendarDateParam) {
    const calendarDate = this.adjustCalendarDate(calendarDateParam);
    const monthInfo = this.getMonthInfo(calendarDate);
    const isoYear = calendarDate.year + 78 + (monthInfo.nextYear ? 1 : 0);
    const isoMonth = monthInfo.month;
    const isoDay = monthInfo.day;
    const isoDate = AddISODate(isoYear, isoMonth, isoDay, 0, 0, 0, calendarDate.day - 1, "constrain");
    return isoDate;
  },
  vulnerableToBceBug: new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian", { timeZone: "UTC" }) !== "10/11/-79 Saka",
  checkIcuBugs(calendarDate, isoDate) {
    if (this.vulnerableToBceBug && isoDate.year < 1) {
      throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
    }
  }
});
function adjustEras(erasParam) {
  let eras = erasParam;
  if (eras.length === 0) {
    throw new RangeError("Invalid era data: eras are required");
  }
  if (eras.length === 1 && eras[0].reverseOf) {
    throw new RangeError("Invalid era data: anchor era cannot count years backwards");
  }
  if (eras.length === 1 && !eras[0].name) {
    throw new RangeError("Invalid era data: at least one named era is required");
  }
  if (eras.filter((e2) => e2.reverseOf != null).length > 1) {
    throw new RangeError("Invalid era data: only one era can count years backwards");
  }
  let anchorEra;
  eras.forEach((e2) => {
    if (e2.isAnchor || !e2.anchorEpoch && !e2.reverseOf) {
      if (anchorEra)
        throw new RangeError("Invalid era data: cannot have multiple anchor eras");
      anchorEra = e2;
      e2.anchorEpoch = { year: e2.hasYearZero ? 0 : 1 };
    } else if (!e2.name) {
      throw new RangeError("If era name is blank, it must be the anchor era");
    }
  });
  eras = eras.filter((e2) => e2.name);
  eras.forEach((e2) => {
    const { reverseOf } = e2;
    if (reverseOf) {
      const reversedEra = eras.find((era) => era.name === reverseOf);
      if (reversedEra === void 0)
        throw new RangeError(`Invalid era data: unmatched reverseOf era: ${reverseOf}`);
      e2.reverseOf = reversedEra;
      e2.anchorEpoch = reversedEra.anchorEpoch;
      e2.isoEpoch = reversedEra.isoEpoch;
    }
    if (e2.anchorEpoch.month === void 0)
      e2.anchorEpoch.month = 1;
    if (e2.anchorEpoch.day === void 0)
      e2.anchorEpoch.day = 1;
  });
  eras.sort((e1, e2) => {
    if (e1.reverseOf)
      return 1;
    if (e2.reverseOf)
      return -1;
    return e2.isoEpoch.year - e1.isoEpoch.year;
  });
  const lastEraReversed = eras[eras.length - 1].reverseOf;
  if (lastEraReversed) {
    if (lastEraReversed !== eras[eras.length - 2])
      throw new RangeError("Invalid era data: invalid reverse-sign era");
  }
  eras.forEach((e2, i) => {
    e2.genericName = `era${eras.length - 1 - i}`;
  });
  return { eras, anchorEra: anchorEra || eras[0] };
}
function isGregorianLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
var makeHelperGregorian = (id, originalEras) => {
  const { eras, anchorEra } = adjustEras(originalEras);
  const helperGregorian = ObjectAssign$2({}, nonIsoHelperBase, {
    id,
    eras,
    anchorEra,
    calendarType: "solar",
    inLeapYear(calendarDate) {
      const { year } = this.estimateIsoDate(calendarDate);
      return isGregorianLeapYear(year);
    },
    monthsInYear() {
      return 12;
    },
    minimumMonthLength(calendarDate) {
      const { month } = calendarDate;
      if (month === 2)
        return this.inLeapYear(calendarDate) ? 29 : 28;
      return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
    },
    maximumMonthLength(calendarDate) {
      return this.minimumMonthLength(calendarDate);
    },
    completeEraYear(calendarDate) {
      const checkField = (name, value) => {
        const currentValue = calendarDate[name];
        if (currentValue != null && currentValue != value) {
          throw new RangeError(`Input ${name} ${currentValue} doesn't match calculated value ${value}`);
        }
      };
      const eraFromYear = (year2) => {
        let eraYear2;
        const adjustedCalendarDate = { ...calendarDate, year: year2 };
        const matchingEra = this.eras.find((e2, i) => {
          if (i === this.eras.length - 1) {
            if (e2.reverseOf) {
              if (year2 > 0)
                throw new RangeError(`Signed year ${year2} is invalid for era ${e2.name}`);
              eraYear2 = e2.anchorEpoch.year - year2;
              return true;
            }
            eraYear2 = year2 - e2.anchorEpoch.year + (e2.hasYearZero ? 0 : 1);
            return true;
          }
          const comparison = nonIsoHelperBase.compareCalendarDates(adjustedCalendarDate, e2.anchorEpoch);
          if (comparison >= 0) {
            eraYear2 = year2 - e2.anchorEpoch.year + (e2.hasYearZero ? 0 : 1);
            return true;
          }
          return false;
        });
        if (!matchingEra)
          throw new RangeError(`Year ${year2} was not matched by any era`);
        return { eraYear: eraYear2, era: matchingEra.name };
      };
      let { year, eraYear, era } = calendarDate;
      if (year != null) {
        ({ eraYear, era } = eraFromYear(year));
        checkField("era", era);
        checkField("eraYear", eraYear);
      } else if (eraYear != null) {
        const matchingEra = era === void 0 ? void 0 : this.eras.find((e2) => e2.name === era || e2.genericName === era);
        if (!matchingEra)
          throw new RangeError(`Era ${era} (ISO year ${eraYear}) was not matched by any era`);
        if (eraYear < 1 && matchingEra.reverseOf) {
          throw new RangeError(`Years in ${era} era must be positive, not ${year}`);
        }
        if (matchingEra.reverseOf) {
          year = matchingEra.anchorEpoch.year - eraYear;
        } else {
          year = eraYear + matchingEra.anchorEpoch.year - (matchingEra.hasYearZero ? 0 : 1);
        }
        checkField("year", year);
        ({ eraYear, era } = eraFromYear(year));
      } else {
        throw new RangeError("Either `year` or `eraYear` and `era` are required");
      }
      return { ...calendarDate, year, eraYear, era };
    },
    adjustCalendarDate(calendarDateParam, cache, overflow) {
      let calendarDate = calendarDateParam;
      const { month, monthCode } = calendarDate;
      if (month === void 0)
        calendarDate = { ...calendarDate, month: monthCodeNumberPart(monthCode) };
      this.validateCalendarDate(calendarDate);
      calendarDate = this.completeEraYear(calendarDate);
      calendarDate = ReflectApply$2(nonIsoHelperBase.adjustCalendarDate, this, [calendarDate, cache, overflow]);
      return calendarDate;
    },
    estimateIsoDate(calendarDateParam) {
      const calendarDate = this.adjustCalendarDate(calendarDateParam);
      const { year, month, day } = calendarDate;
      const { anchorEra: anchorEra2 } = this;
      const isoYearEstimate = year + anchorEra2.isoEpoch.year - (anchorEra2.hasYearZero ? 0 : 1);
      return RegulateISODate(isoYearEstimate, month, day, "constrain");
    },
    v8IsVulnerableToJulianBug: new Date("+001001-01-01T00:00Z").toLocaleDateString("en-US-u-ca-japanese", { timeZone: "UTC" }).startsWith("12"),
    calendarIsVulnerableToJulianBug: false,
    checkIcuBugs(calendarDate, isoDate) {
      if (this.calendarIsVulnerableToJulianBug && this.v8IsVulnerableToJulianBug) {
        const beforeJulianSwitch = CompareISODate(isoDate.year, isoDate.month, isoDate.day, 1582, 10, 15) < 0;
        if (beforeJulianSwitch) {
          throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 1582-10-15 (see https://bugs.chromium.org/p/chromium/issues/detail?id=1173158)`);
        }
      }
    }
  });
  return helperGregorian;
};
var makeHelperOrthodox = (id, originalEras) => {
  const base = makeHelperGregorian(id, originalEras);
  return ObjectAssign$2(base, {
    inLeapYear(calendarDate) {
      const { year } = calendarDate;
      return (year + 1) % 4 === 0;
    },
    monthsInYear() {
      return 13;
    },
    minimumMonthLength(calendarDate) {
      const { month } = calendarDate;
      if (month === 13)
        return this.inLeapYear(calendarDate) ? 6 : 5;
      return 30;
    },
    maximumMonthLength(calendarDate) {
      return this.minimumMonthLength(calendarDate);
    }
  });
};
var helperEthioaa = makeHelperOrthodox("ethioaa", [{ name: "era0", isoEpoch: { year: -5492, month: 7, day: 17 } }]);
var helperCoptic = makeHelperOrthodox("coptic", [
  { name: "era1", isoEpoch: { year: 284, month: 8, day: 29 } },
  { name: "era0", reverseOf: "era1" }
]);
var helperEthiopic = makeHelperOrthodox("ethiopic", [
  { name: "era0", isoEpoch: { year: -5492, month: 7, day: 17 } },
  { name: "era1", isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }
]);
var helperRoc = ObjectAssign$2({}, makeHelperGregorian("roc", [
  { name: "minguo", isoEpoch: { year: 1912, month: 1, day: 1 } },
  { name: "before-roc", reverseOf: "minguo" }
]), {
  calendarIsVulnerableToJulianBug: true
});
var helperBuddhist = ObjectAssign$2({}, makeHelperGregorian("buddhist", [{ name: "be", hasYearZero: true, isoEpoch: { year: -543, month: 1, day: 1 } }]), {
  calendarIsVulnerableToJulianBug: true
});
var helperGregory = ObjectAssign$2({}, makeHelperGregorian("gregory", [
  { name: "ce", isoEpoch: { year: 1, month: 1, day: 1 } },
  { name: "bce", reverseOf: "ce" }
]), {
  reviseIntlEra(calendarDate) {
    let { era, eraYear } = calendarDate;
    if (era === "bc")
      era = "bce";
    if (era === "ad")
      era = "ce";
    return { era, eraYear };
  }
});
var helperJapanese = ObjectAssign$2({}, makeHelperGregorian("japanese", [
  { name: "reiwa", isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 2019, month: 5, day: 1 } },
  { name: "heisei", isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 1989, month: 1, day: 8 } },
  { name: "showa", isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 1926, month: 12, day: 25 } },
  { name: "taisho", isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 1912, month: 7, day: 30 } },
  { name: "meiji", isoEpoch: { year: 1868, month: 9, day: 8 }, anchorEpoch: { year: 1868, month: 9, day: 8 } },
  { name: "ce", isoEpoch: { year: 1, month: 1, day: 1 } },
  { name: "bce", reverseOf: "ce" }
]), {
  eraLength: "long",
  calendarIsVulnerableToJulianBug: true,
  reviseIntlEra(calendarDate, isoDate) {
    const { era, eraYear } = calendarDate;
    const { year: isoYear } = isoDate;
    if (this.eras.find((e2) => e2.name === era))
      return { era, eraYear };
    return isoYear < 1 ? { era: "bce", eraYear: 1 - isoYear } : { era: "ce", eraYear: isoYear };
  }
});
var helperChinese = ObjectAssign$2({}, nonIsoHelperBase, {
  id: "chinese",
  calendarType: "lunisolar",
  inLeapYear(calendarDate, cache) {
    const months = this.getMonthList(calendarDate.year, cache);
    return ObjectEntries(months).length === 13;
  },
  monthsInYear(calendarDate, cache) {
    return this.inLeapYear(calendarDate, cache) ? 13 : 12;
  },
  minimumMonthLength: () => 29,
  maximumMonthLength: () => 30,
  getMonthList(calendarYear, cache) {
    if (calendarYear === void 0) {
      throw new TypeError("Missing year");
    }
    const key = JSON.stringify({ func: "getMonthList", calendarYear, id: this.id });
    const cached = cache.get(key);
    if (cached)
      return cached;
    const dateTimeFormat = this.getFormatter();
    const getCalendarDate = (isoYear, daysPastFeb1) => {
      const isoStringFeb1 = toUtcIsoDateString({ isoYear, isoMonth: 2, isoDay: 1 });
      const legacyDate = new Date(isoStringFeb1);
      legacyDate.setUTCDate(daysPastFeb1 + 1);
      const newYearGuess = dateTimeFormat.formatToParts(legacyDate);
      const calendarMonthString2 = newYearGuess.find((tv) => tv.type === "month").value;
      const calendarDay2 = +newYearGuess.find((tv) => tv.type === "day").value;
      let calendarYearToVerify2 = newYearGuess.find((tv) => tv.type === "relatedYear");
      if (calendarYearToVerify2 !== void 0) {
        calendarYearToVerify2 = +calendarYearToVerify2.value;
      } else {
        throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
      }
      return { calendarMonthString: calendarMonthString2, calendarDay: calendarDay2, calendarYearToVerify: calendarYearToVerify2 };
    };
    let isoDaysDelta = 17;
    let { calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta);
    if (calendarMonthString !== "1") {
      isoDaysDelta += 29;
      ({ calendarMonthString, calendarDay } = getCalendarDate(calendarYear, isoDaysDelta));
    }
    isoDaysDelta -= calendarDay - 5;
    const result = {};
    let monthIndex = 1;
    let oldCalendarDay;
    let oldMonthString;
    let done = false;
    do {
      ({ calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta));
      if (oldCalendarDay) {
        result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
      }
      if (calendarYearToVerify !== calendarYear) {
        done = true;
      } else {
        result[calendarMonthString] = { monthIndex: monthIndex++ };
        isoDaysDelta += 30;
      }
      oldCalendarDay = calendarDay;
      oldMonthString = calendarMonthString;
    } while (!done);
    result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
    cache.set(key, result);
    return result;
  },
  estimateIsoDate(calendarDate) {
    const { year, month } = calendarDate;
    return { year, month: month >= 12 ? 12 : month + 1, day: 1 };
  },
  adjustCalendarDate(calendarDate, cache, overflow = "constrain", fromLegacyDate = false) {
    let { year, month, monthExtra, day, monthCode, eraYear } = calendarDate;
    if (fromLegacyDate) {
      year = eraYear;
      if (monthExtra && monthExtra !== "bis")
        throw new RangeError(`Unexpected leap month suffix: ${monthExtra}`);
      const monthCode2 = buildMonthCode(month, monthExtra !== void 0);
      const monthString = `${month}${monthExtra || ""}`;
      const months = this.getMonthList(year, cache);
      const monthInfo = months[monthString];
      if (monthInfo === void 0)
        throw new RangeError(`Unmatched month ${monthString} in Chinese year ${year}`);
      month = monthInfo.monthIndex;
      return { year, month, day, era: void 0, eraYear, monthCode: monthCode2 };
    } else {
      this.validateCalendarDate(calendarDate);
      if (year === void 0)
        year = eraYear;
      if (eraYear === void 0)
        eraYear = year;
      if (month === void 0) {
        const months = this.getMonthList(year, cache);
        let numberPart = monthCode.replace("L", "bis").slice(1);
        if (numberPart[0] === "0")
          numberPart = numberPart.slice(1);
        let monthInfo = months[numberPart];
        month = monthInfo && monthInfo.monthIndex;
        if (month === void 0 && monthCode.endsWith("L") && !["M01L", "M12L", "M13L"].includes(monthCode) && overflow === "constrain") {
          let withoutML = monthCode.slice(1, -1);
          if (withoutML[0] === "0")
            withoutML = withoutML.slice(1);
          monthInfo = months[withoutML];
          if (monthInfo) {
            ({ daysInMonth: day, monthIndex: month } = monthInfo);
            monthCode = buildMonthCode(withoutML);
          }
        }
        if (month === void 0) {
          throw new RangeError(`Unmatched month ${monthCode} in Chinese year ${year}`);
        }
      } else if (monthCode === void 0) {
        const months = this.getMonthList(year, cache);
        const monthEntries = ObjectEntries(months);
        const largestMonth = monthEntries.length;
        if (overflow === "reject") {
          RejectToRange(month, 1, largestMonth);
          RejectToRange(day, 1, this.maximumMonthLength());
        } else {
          month = ConstrainToRange(month, 1, largestMonth);
          day = ConstrainToRange(day, 1, this.maximumMonthLength());
        }
        const matchingMonthEntry = monthEntries.find(([, v]) => v.monthIndex === month);
        if (matchingMonthEntry === void 0) {
          throw new RangeError(`Invalid month ${month} in Chinese year ${year}`);
        }
        monthCode = buildMonthCode(matchingMonthEntry[0].replace("bis", ""), matchingMonthEntry[0].indexOf("bis") !== -1);
      } else {
        const months = this.getMonthList(year, cache);
        let numberPart = monthCode.replace("L", "bis").slice(1);
        if (numberPart[0] === "0")
          numberPart = numberPart.slice(1);
        const monthInfo = months[numberPart];
        if (!monthInfo)
          throw new RangeError(`Unmatched monthCode ${monthCode} in Chinese year ${year}`);
        if (month !== monthInfo.monthIndex) {
          throw new RangeError(`monthCode ${monthCode} doesn't correspond to month ${month} in Chinese year ${year}`);
        }
      }
      return { ...calendarDate, year, eraYear, month, monthCode, day };
    }
  },
  hasEra: false
});
var helperDangi = ObjectAssign$2({}, { ...helperChinese, id: "dangi" });
var nonIsoGeneralImpl = {
  dateFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    const cache = new OneObjectCache();
    const fields = PrepareTemporalFields(fieldsParam, [
      ["day"],
      ["era", void 0],
      ["eraYear", void 0],
      ["month", void 0],
      ["monthCode", void 0],
      ["year", void 0]
    ]);
    const { year, month, day } = this.helper.calendarToIsoDate(fields, overflow, cache);
    const result = CreateTemporalDate(year, month, day, calendar2);
    cache.setObject(result);
    return result;
  },
  yearMonthFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    const cache = new OneObjectCache();
    const fields = PrepareTemporalFields(fieldsParam, [
      ["era", void 0],
      ["eraYear", void 0],
      ["month", void 0],
      ["monthCode", void 0],
      ["year", void 0]
    ]);
    const { year, month, day } = this.helper.calendarToIsoDate({ ...fields, day: 1 }, overflow, cache);
    const result = CreateTemporalYearMonth(year, month, calendar2, day);
    cache.setObject(result);
    return result;
  },
  monthDayFromFields(fieldsParam, options, calendar2) {
    const overflow = ToTemporalOverflow(options);
    const cache = new OneObjectCache();
    const fields = PrepareTemporalFields(fieldsParam, [
      ["day"],
      ["era", void 0],
      ["eraYear", void 0],
      ["month", void 0],
      ["monthCode", void 0],
      ["year", void 0]
    ]);
    const { year, month, day } = this.helper.monthDayFromFields(fields, overflow, cache);
    const result = CreateTemporalMonthDay(month, day, calendar2, year);
    cache.setObject(result);
    return result;
  },
  fields(fieldsParam) {
    let fields = fieldsParam;
    if (fields.includes("year"))
      fields = [...fields, "era", "eraYear"];
    return fields;
  },
  mergeFields(fields, additionalFields) {
    const fieldsCopy = { ...fields };
    const additionalFieldsCopy = { ...additionalFields };
    const { month, monthCode, year, era, eraYear, ...original } = fieldsCopy;
    const { month: newMonth, monthCode: newMonthCode, year: newYear, era: newEra, eraYear: newEraYear } = additionalFieldsCopy;
    if (newMonth === void 0 && newMonthCode === void 0) {
      original.month = month;
      original.monthCode = monthCode;
    }
    if (newYear === void 0 && newEra === void 0 && newEraYear === void 0) {
      original.year = year;
    }
    return { ...original, ...additionalFieldsCopy };
  },
  dateAdd(date, years, months, weeks, days, overflow, calendar2) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const added = this.helper.addCalendar(calendarDate, { years, months, weeks, days }, overflow, cache);
    const isoAdded = this.helper.calendarToIsoDate(added, "constrain", cache);
    const { year, month, day } = isoAdded;
    const newTemporalObject = CreateTemporalDate(year, month, day, calendar2);
    const newCache = new OneObjectCache(cache);
    newCache.setObject(newTemporalObject);
    return newTemporalObject;
  },
  dateUntil(one, two, largestUnit) {
    const cacheOne = OneObjectCache.getCacheForObject(one);
    const cacheTwo = OneObjectCache.getCacheForObject(two);
    const calendarOne = this.helper.temporalToCalendarDate(one, cacheOne);
    const calendarTwo = this.helper.temporalToCalendarDate(two, cacheTwo);
    const result = this.helper.untilCalendar(calendarOne, calendarTwo, largestUnit, cacheOne);
    return result;
  },
  year(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.year;
  },
  month(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.month;
  },
  day(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.day;
  },
  era(date) {
    if (!this.helper.hasEra)
      return void 0;
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.era;
  },
  eraYear(date) {
    if (!this.helper.hasEra)
      return void 0;
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.eraYear;
  },
  monthCode(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.monthCode;
  },
  dayOfWeek(date) {
    return impl["iso8601"].dayOfWeek(date);
  },
  dayOfYear(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.isoToCalendarDate(date, cache);
    const startOfYear = this.helper.startOfCalendarYear(calendarDate);
    const diffDays = this.helper.calendarDaysUntil(startOfYear, calendarDate, cache);
    return diffDays + 1;
  },
  weekOfYear(date) {
    return impl["iso8601"].weekOfYear(date);
  },
  daysInWeek(date) {
    return impl["iso8601"].daysInWeek(date);
  },
  daysInMonth(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const max = this.helper.maximumMonthLength(calendarDate);
    const min = this.helper.minimumMonthLength(calendarDate);
    if (max === min)
      return max;
    const startOfMonthCalendar = this.helper.startOfCalendarMonth(calendarDate);
    const startOfNextMonthCalendar = this.helper.addMonthsCalendar(startOfMonthCalendar, 1, "constrain", cache);
    const result = this.helper.calendarDaysUntil(startOfMonthCalendar, startOfNextMonthCalendar, cache);
    return result;
  },
  daysInYear(dateParam) {
    let date = dateParam;
    if (!HasSlot(date, ISO_YEAR))
      date = ToTemporalDate(date);
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const startOfYearCalendar = this.helper.startOfCalendarYear(calendarDate);
    const startOfNextYearCalendar = this.helper.addCalendar(startOfYearCalendar, { years: 1 }, "constrain", cache);
    const result = this.helper.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
    return result;
  },
  monthsInYear(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const result = this.helper.monthsInYear(calendarDate, cache);
    return result;
  },
  inLeapYear(dateParam) {
    let date = dateParam;
    if (!HasSlot(date, ISO_YEAR))
      date = ToTemporalDate(date);
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const result = this.helper.inLeapYear(calendarDate, cache);
    return result;
  }
};
impl["hebrew"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperHebrew });
impl["islamic"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperIslamic });
["islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "islamicc"].forEach((id) => {
  impl[id] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: { ...helperIslamic, id } });
});
impl["persian"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperPersian });
impl["ethiopic"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperEthiopic });
impl["ethioaa"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperEthioaa });
impl["coptic"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperCoptic });
impl["chinese"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperChinese });
impl["dangi"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperDangi });
impl["roc"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperRoc });
impl["indian"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperIndian });
impl["buddhist"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperBuddhist });
impl["japanese"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperJapanese });
impl["gregory"] = ObjectAssign$2({}, nonIsoGeneralImpl, { helper: helperGregory });
var BUILTIN_CALENDAR_IDS = Object.keys(impl);
function IsBuiltinCalendar(id) {
  return ArrayIncludes.call(BUILTIN_CALENDAR_IDS, id);
}
var tzComponent = /\.[-A-Za-z_]|\.\.[-A-Za-z._]{1,12}|\.[-A-Za-z_][-A-Za-z._]{0,12}|[A-Za-z_][-A-Za-z._]{0,13}/;
var offsetNoCapture = /(?:[+\u2212-][0-2][0-9](?::?[0-5][0-9](?::?[0-5][0-9](?:[.,]\d{1,9})?)?)?)/;
var timeZoneID = new RegExp(`(?:(?:${tzComponent.source})(?:\\/(?:${tzComponent.source}))*|Etc/GMT[-+]\\d{1,2}|${offsetNoCapture.source})`);
var calComponent = /[A-Za-z0-9]{3,8}/;
var calendarID = new RegExp(`(?:${calComponent.source}(?:-${calComponent.source})*)`);
var yearpart = /(?:[+\u2212-]\d{6}|\d{4})/;
var monthpart = /(?:0[1-9]|1[0-2])/;
var daypart = /(?:0[1-9]|[12]\d|3[01])/;
var datesplit = new RegExp(`(${yearpart.source})(?:-(${monthpart.source})-(${daypart.source})|(${monthpart.source})(${daypart.source}))`);
var timesplit = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
var offset = /([+\u2212-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/;
var zonesplit = new RegExp(`(?:([zZ])|(?:${offset.source})?)(?:\\[(${timeZoneID.source})\\])?`);
var calendar = new RegExp(`\\[u-ca=(${calendarID.source})\\]`);
var instant$1 = new RegExp(`^${datesplit.source}(?:(?:T|\\s+)${timesplit.source})?${zonesplit.source}(?:${calendar.source})?$`, "i");
var datetime = new RegExp(`^${datesplit.source}(?:(?:T|\\s+)${timesplit.source})?(?:${zonesplit.source})?(?:${calendar.source})?$`, "i");
var time = new RegExp(`^${timesplit.source}(?:${zonesplit.source})?(?:${calendar.source})?$`, "i");
var yearmonth = new RegExp(`^(${yearpart.source})-?(${monthpart.source})$`);
var monthday = new RegExp(`^(?:--)?(${monthpart.source})-?(${daypart.source})$`);
var fraction = /(\d+)(?:[.,](\d{1,9}))?/;
var durationDate = /(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/;
var durationTime = new RegExp(`(?:${fraction.source}H)?(?:${fraction.source}M)?(?:${fraction.source}S)?`);
var duration = new RegExp(`^([+\u2212-])?P${durationDate.source}(?:T(?!$)${durationTime.source})?$`, "i");
var ArrayPrototypePush$1 = Array.prototype.push;
var IntlDateTimeFormat$1 = globalThis.Intl.DateTimeFormat;
var MathMin = Math.min;
var MathMax = Math.max;
var MathAbs = Math.abs;
var MathFloor = Math.floor;
var MathSign = Math.sign;
var MathTrunc = Math.trunc;
var NumberIsNaN = Number.isNaN;
var NumberIsFinite = Number.isFinite;
var NumberCtor = Number;
var StringCtor = String;
var NumberMaxSafeInteger = Number.MAX_SAFE_INTEGER;
var ObjectCreate$2 = Object.create;
var ObjectDefineProperty = Object.defineProperty;
var ObjectIs = Object.is;
var ReflectApply$1 = Reflect.apply;
var DAY_SECONDS = 86400;
var DAY_NANOS = (0, import_big_integer.default)(DAY_SECONDS).multiply(1e9);
var NS_MIN = (0, import_big_integer.default)(-DAY_SECONDS).multiply(1e17);
var NS_MAX = (0, import_big_integer.default)(DAY_SECONDS).multiply(1e17);
var YEAR_MIN = -271821;
var YEAR_MAX = 275760;
var BEFORE_FIRST_DST = (0, import_big_integer.default)(-388152).multiply(1e13);
function IsInteger(value) {
  if (typeof value !== "number" || !NumberIsFinite(value))
    return false;
  const abs = MathAbs(value);
  return MathFloor(abs) === abs;
}
function IsObject(value) {
  return typeof value === "object" && value !== null || typeof value === "function";
}
function ToNumber(value) {
  if (typeof value === "bigint")
    throw new TypeError("Cannot convert BigInt to number");
  return NumberCtor(value);
}
function ToInteger(value) {
  const num = ToNumber(value);
  if (NumberIsNaN(num))
    return 0;
  const integer = MathTrunc(num);
  if (num === 0)
    return 0;
  return integer;
}
function ToString(value) {
  if (typeof value === "symbol") {
    throw new TypeError("Cannot convert a Symbol value to a String");
  }
  return StringCtor(value);
}
function ToIntegerThrowOnInfinity(value) {
  const integer = ToInteger(value);
  if (!NumberIsFinite(integer)) {
    throw new RangeError("infinity is out of range");
  }
  return integer;
}
function ToPositiveInteger(valueParam, property) {
  const value = ToInteger(valueParam);
  if (!NumberIsFinite(value)) {
    throw new RangeError("infinity is out of range");
  }
  if (value < 1) {
    if (property !== void 0) {
      throw new RangeError(`property '${property}' cannot be a a number less than one`);
    }
    throw new RangeError("Cannot convert a number less than one to a positive integer");
  }
  return value;
}
function ToIntegerWithoutRounding(valueParam) {
  const value = ToNumber(valueParam);
  if (NumberIsNaN(value))
    return 0;
  if (!NumberIsFinite(value)) {
    throw new RangeError("infinity is out of range");
  }
  if (!IsInteger(value)) {
    throw new RangeError(`unsupported fractional value ${value}`);
  }
  return ToInteger(value);
}
var BUILTIN_CASTS = /* @__PURE__ */ new Map([
  ["year", ToIntegerThrowOnInfinity],
  ["month", ToPositiveInteger],
  ["monthCode", ToString],
  ["day", ToPositiveInteger],
  ["hour", ToIntegerThrowOnInfinity],
  ["minute", ToIntegerThrowOnInfinity],
  ["second", ToIntegerThrowOnInfinity],
  ["millisecond", ToIntegerThrowOnInfinity],
  ["microsecond", ToIntegerThrowOnInfinity],
  ["nanosecond", ToIntegerThrowOnInfinity],
  ["years", ToIntegerWithoutRounding],
  ["months", ToIntegerWithoutRounding],
  ["weeks", ToIntegerWithoutRounding],
  ["days", ToIntegerWithoutRounding],
  ["hours", ToIntegerWithoutRounding],
  ["minutes", ToIntegerWithoutRounding],
  ["seconds", ToIntegerWithoutRounding],
  ["milliseconds", ToIntegerWithoutRounding],
  ["microseconds", ToIntegerWithoutRounding],
  ["nanoseconds", ToIntegerWithoutRounding],
  ["era", ToString],
  ["eraYear", ToInteger],
  ["offset", ToString]
]);
var ALLOWED_UNITS = [
  "year",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond",
  "microsecond",
  "nanosecond"
];
var SINGULAR_PLURAL_UNITS = [
  ["years", "year"],
  ["months", "month"],
  ["weeks", "week"],
  ["days", "day"],
  ["hours", "hour"],
  ["minutes", "minute"],
  ["seconds", "second"],
  ["milliseconds", "millisecond"],
  ["microseconds", "microsecond"],
  ["nanoseconds", "nanosecond"]
];
var IntlDateTimeFormatEnUsCache = /* @__PURE__ */ new Map();
function getIntlDateTimeFormatEnUsForTimeZone(timeZoneIdentifier) {
  let instance = IntlDateTimeFormatEnUsCache.get(timeZoneIdentifier);
  if (instance === void 0) {
    instance = new IntlDateTimeFormat$1("en-us", {
      timeZone: StringCtor(timeZoneIdentifier),
      hour12: false,
      era: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    IntlDateTimeFormatEnUsCache.set(timeZoneIdentifier, instance);
  }
  return instance;
}
function IsTemporalInstant(item) {
  return HasSlot(item, EPOCHNANOSECONDS) && !HasSlot(item, TIME_ZONE, CALENDAR);
}
function IsTemporalTimeZone(item) {
  return HasSlot(item, TIMEZONE_ID);
}
function IsTemporalCalendar(item) {
  return HasSlot(item, CALENDAR_ID);
}
function IsTemporalDuration(item) {
  return HasSlot(item, YEARS, MONTHS, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS);
}
function IsTemporalDate(item) {
  return HasSlot(item, DATE_BRAND);
}
function IsTemporalTime(item) {
  return HasSlot(item, ISO_HOUR, ISO_MINUTE, ISO_SECOND, ISO_MILLISECOND, ISO_MICROSECOND, ISO_NANOSECOND) && !HasSlot(item, ISO_YEAR, ISO_MONTH, ISO_DAY);
}
function IsTemporalDateTime(item) {
  return HasSlot(item, ISO_YEAR, ISO_MONTH, ISO_DAY, ISO_HOUR, ISO_MINUTE, ISO_SECOND, ISO_MILLISECOND, ISO_MICROSECOND, ISO_NANOSECOND);
}
function IsTemporalYearMonth(item) {
  return HasSlot(item, YEAR_MONTH_BRAND);
}
function IsTemporalMonthDay(item) {
  return HasSlot(item, MONTH_DAY_BRAND);
}
function IsTemporalZonedDateTime(item) {
  return HasSlot(item, EPOCHNANOSECONDS, TIME_ZONE, CALENDAR);
}
function RejectObjectWithCalendarOrTimeZone(item) {
  if (HasSlot(item, CALENDAR) || HasSlot(item, TIME_ZONE)) {
    throw new TypeError("with() does not support a calendar or timeZone property");
  }
  if (item.calendar !== void 0) {
    throw new TypeError("with() does not support a calendar property");
  }
  if (item.timeZone !== void 0) {
    throw new TypeError("with() does not support a timeZone property");
  }
}
function ParseTemporalTimeZone(stringIdent) {
  let { ianaName, offset: offset2, z } = ParseTemporalTimeZoneString(stringIdent);
  if (ianaName)
    return ianaName;
  if (z)
    return "UTC";
  return offset2;
}
function FormatCalendarAnnotation(id, showCalendar) {
  if (showCalendar === "never")
    return "";
  if (showCalendar === "auto" && id === "iso8601")
    return "";
  return `[u-ca=${id}]`;
}
function ParseISODateTime(isoString, { zoneRequired }) {
  const regex2 = zoneRequired ? instant$1 : datetime;
  const match = regex2.exec(isoString);
  if (!match)
    throw new RangeError(`invalid ISO 8601 string: ${isoString}`);
  let yearString = match[1];
  if (yearString[0] === "\u2212")
    yearString = `-${yearString.slice(1)}`;
  const year = ToInteger(yearString);
  const month = ToInteger(match[2] || match[4]);
  const day = ToInteger(match[3] || match[5]);
  const hour = ToInteger(match[6]);
  const minute = ToInteger(match[7] || match[10]);
  let second = ToInteger(match[8] || match[11]);
  if (second === 60)
    second = 59;
  const fraction2 = (match[9] || match[12]) + "000000000";
  const millisecond = ToInteger(fraction2.slice(0, 3));
  const microsecond = ToInteger(fraction2.slice(3, 6));
  const nanosecond = ToInteger(fraction2.slice(6, 9));
  let offset2;
  let z = false;
  if (match[13]) {
    offset2 = void 0;
    z = true;
  } else if (match[14] && match[15]) {
    const offsetSign = match[14] === "-" || match[14] === "\u2212" ? "-" : "+";
    const offsetHours = match[15] || "00";
    const offsetMinutes = match[16] || "00";
    const offsetSeconds = match[17] || "00";
    let offsetFraction = match[18] || "0";
    offset2 = `${offsetSign}${offsetHours}:${offsetMinutes}`;
    if (+offsetFraction) {
      while (offsetFraction.endsWith("0"))
        offsetFraction = offsetFraction.slice(0, -1);
      offset2 += `:${offsetSeconds}.${offsetFraction}`;
    } else if (+offsetSeconds) {
      offset2 += `:${offsetSeconds}`;
    }
    if (offset2 === "-00:00")
      offset2 = "+00:00";
  }
  let ianaName = match[19];
  if (ianaName) {
    try {
      ianaName = GetCanonicalTimeZoneIdentifier(ianaName).toString();
    } catch {
    }
  }
  const calendar2 = match[20];
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
    microsecond,
    nanosecond,
    ianaName,
    offset: offset2,
    z,
    calendar: calendar2
  };
}
function ParseTemporalInstantString(isoString) {
  return ParseISODateTime(isoString, { zoneRequired: true });
}
function ParseTemporalZonedDateTimeString(isoString) {
  return ParseISODateTime(isoString, { zoneRequired: true });
}
function ParseTemporalDateTimeString(isoString) {
  return ParseISODateTime(isoString, { zoneRequired: false });
}
function ParseTemporalDateString(isoString) {
  return ParseISODateTime(isoString, { zoneRequired: false });
}
function ParseTemporalTimeString(isoString) {
  const match = time.exec(isoString);
  let hour, minute, second, millisecond, microsecond, nanosecond, calendar2;
  if (match) {
    hour = ToInteger(match[1]);
    minute = ToInteger(match[2] || match[5]);
    second = ToInteger(match[3] || match[6]);
    if (second === 60)
      second = 59;
    const fraction2 = (match[4] || match[7]) + "000000000";
    millisecond = ToInteger(fraction2.slice(0, 3));
    microsecond = ToInteger(fraction2.slice(3, 6));
    nanosecond = ToInteger(fraction2.slice(6, 9));
    calendar2 = match[15];
  } else {
    let z;
    ({ hour, minute, second, millisecond, microsecond, nanosecond, calendar: calendar2, z } = ParseISODateTime(isoString, {
      zoneRequired: false
    }));
    if (z)
      throw new RangeError("Z designator not supported for PlainTime");
  }
  return { hour, minute, second, millisecond, microsecond, nanosecond, calendar: calendar2 };
}
function ParseTemporalYearMonthString(isoString) {
  const match = yearmonth.exec(isoString);
  let year, month, calendar2, referenceISODay;
  if (match) {
    let yearString = match[1];
    if (yearString[0] === "\u2212")
      yearString = `-${yearString.slice(1)}`;
    year = ToInteger(yearString);
    month = ToInteger(match[2]);
    calendar2 = match[3];
  } else {
    let z;
    ({ year, month, calendar: calendar2, day: referenceISODay, z } = ParseISODateTime(isoString, { zoneRequired: false }));
    if (z)
      throw new RangeError("Z designator not supported for PlainYearMonth");
  }
  return { year, month, calendar: calendar2, referenceISODay };
}
function ParseTemporalMonthDayString(isoString) {
  const match = monthday.exec(isoString);
  let month, day, calendar2, referenceISOYear;
  if (match) {
    month = ToInteger(match[1]);
    day = ToInteger(match[2]);
  } else {
    let z;
    ({ month, day, calendar: calendar2, year: referenceISOYear, z } = ParseISODateTime(isoString, { zoneRequired: false }));
    if (z)
      throw new RangeError("Z designator not supported for PlainMonthDay");
  }
  return { month, day, calendar: calendar2, referenceISOYear };
}
function ParseTemporalTimeZoneString(stringIdent) {
  try {
    let canonicalIdent = GetCanonicalTimeZoneIdentifier(stringIdent);
    if (canonicalIdent) {
      canonicalIdent = canonicalIdent.toString();
      if (ParseOffsetString(canonicalIdent) !== null)
        return { offset: canonicalIdent };
      return { ianaName: canonicalIdent };
    }
  } catch {
  }
  try {
    return ParseISODateTime(stringIdent, { zoneRequired: true });
  } catch {
    throw new RangeError(`Invalid time zone: ${stringIdent}`);
  }
}
function ParseTemporalDurationString(isoString) {
  const match = duration.exec(isoString);
  if (!match)
    throw new RangeError(`invalid duration: ${isoString}`);
  if (match.slice(2).every((element) => element === void 0)) {
    throw new RangeError(`invalid duration: ${isoString}`);
  }
  const sign = match[1] === "-" || match[1] === "\u2212" ? -1 : 1;
  const years = ToInteger(match[2]) * sign;
  const months = ToInteger(match[3]) * sign;
  const weeks = ToInteger(match[4]) * sign;
  const days = ToInteger(match[5]) * sign;
  const hours = ToInteger(match[6]) * sign;
  let fHours = match[7];
  let minutes = ToInteger(match[8]) * sign;
  let fMinutes = match[9];
  let seconds = ToInteger(match[10]) * sign;
  const fSeconds = match[11] + "000000000";
  let milliseconds = ToInteger(fSeconds.slice(0, 3)) * sign;
  let microseconds = ToInteger(fSeconds.slice(3, 6)) * sign;
  let nanoseconds = ToInteger(fSeconds.slice(6, 9)) * sign;
  fHours = fHours ? sign * ToInteger(fHours) / 10 ** fHours.length : 0;
  fMinutes = fMinutes ? sign * ToInteger(fMinutes) / 10 ** fMinutes.length : 0;
  ({ minutes, seconds, milliseconds, microseconds, nanoseconds } = DurationHandleFractions(fHours, minutes, fMinutes, seconds, milliseconds, microseconds, nanoseconds));
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function ParseTemporalInstant(isoString) {
  const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, offset: offset2, z } = ParseTemporalInstantString(isoString);
  const epochNs = GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  if (epochNs === null)
    throw new RangeError("DateTime outside of supported range");
  if (!z && !offset2)
    throw new RangeError("Temporal.Instant requires a time zone offset");
  const offsetNs = z ? 0 : ParseOffsetString(offset2);
  return epochNs.subtract(offsetNs);
}
function RegulateISODate(yearParam, monthParam, dayParam, overflow) {
  let year = yearParam;
  let month = monthParam;
  let day = dayParam;
  switch (overflow) {
    case "reject":
      RejectISODate(year, month, day);
      break;
    case "constrain":
      ({ year, month, day } = ConstrainISODate(year, month, day));
      break;
  }
  return { year, month, day };
}
function RegulateTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, overflow) {
  let hour = hourParam;
  let minute = minuteParam;
  let second = secondParam;
  let millisecond = millisecondParam;
  let microsecond = microsecondParam;
  let nanosecond = nanosecondParam;
  switch (overflow) {
    case "reject":
      RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
      break;
    case "constrain":
      ({ hour, minute, second, millisecond, microsecond, nanosecond } = ConstrainTime(hour, minute, second, millisecond, microsecond, nanosecond));
      break;
  }
  return { hour, minute, second, millisecond, microsecond, nanosecond };
}
function RegulateISOYearMonth(yearParam, monthParam, overflow) {
  let year = yearParam;
  let month = monthParam;
  const referenceISODay = 1;
  switch (overflow) {
    case "reject":
      RejectISODate(year, month, referenceISODay);
      break;
    case "constrain":
      ({ year, month } = ConstrainISODate(year, month));
      break;
  }
  return { year, month };
}
function DurationHandleFractions(fHoursParam, minutesParam, fMinutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam) {
  let fHours = fHoursParam;
  let minutes = minutesParam;
  let fMinutes = fMinutesParam;
  let seconds = secondsParam;
  let milliseconds = millisecondsParam;
  let microseconds = microsecondsParam;
  let nanoseconds = nanosecondsParam;
  if (fHours !== 0) {
    [minutes, fMinutes, seconds, milliseconds, microseconds, nanoseconds].forEach((val) => {
      if (val !== 0)
        throw new RangeError("only the smallest unit can be fractional");
    });
    const mins = fHours * 60;
    minutes = MathTrunc(mins);
    fMinutes = mins % 1;
  }
  if (fMinutes !== 0) {
    [seconds, milliseconds, microseconds, nanoseconds].forEach((val) => {
      if (val !== 0)
        throw new RangeError("only the smallest unit can be fractional");
    });
    const secs = fMinutes * 60;
    seconds = MathTrunc(secs);
    const fSeconds = secs % 1;
    if (fSeconds !== 0) {
      const mils = fSeconds * 1e3;
      milliseconds = MathTrunc(mils);
      const fMilliseconds = mils % 1;
      if (fMilliseconds !== 0) {
        const mics = fMilliseconds * 1e3;
        microseconds = MathTrunc(mics);
        const fMicroseconds = mics % 1;
        if (fMicroseconds !== 0) {
          const nans = fMicroseconds * 1e3;
          nanoseconds = MathTrunc(nans);
        }
      }
    }
  }
  return { minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function ToTemporalDurationRecord(item) {
  if (IsTemporalDuration(item)) {
    return {
      years: GetSlot(item, YEARS),
      months: GetSlot(item, MONTHS),
      weeks: GetSlot(item, WEEKS),
      days: GetSlot(item, DAYS),
      hours: GetSlot(item, HOURS),
      minutes: GetSlot(item, MINUTES),
      seconds: GetSlot(item, SECONDS),
      milliseconds: GetSlot(item, MILLISECONDS),
      microseconds: GetSlot(item, MICROSECONDS),
      nanoseconds: GetSlot(item, NANOSECONDS)
    };
  }
  const props = ToPartialRecord(item, [
    "days",
    "hours",
    "microseconds",
    "milliseconds",
    "minutes",
    "months",
    "nanoseconds",
    "seconds",
    "weeks",
    "years"
  ]);
  if (!props)
    throw new TypeError("invalid duration-like");
  const { years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0 } = props;
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function ToLimitedTemporalDuration(item, disallowedProperties = []) {
  let record;
  if (IsObject(item)) {
    record = ToTemporalDurationRecord(item);
  } else {
    const str = ToString(item);
    record = ParseTemporalDurationString(str);
  }
  const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = record;
  RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  for (const property of disallowedProperties) {
    if (record[property] !== 0) {
      throw new RangeError(`Duration field ${property} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);
    }
  }
  return record;
}
function ToTemporalOverflow(options) {
  return GetOption(options, "overflow", ["constrain", "reject"], "constrain");
}
function ToTemporalDisambiguation(options) {
  return GetOption(options, "disambiguation", ["compatible", "earlier", "later", "reject"], "compatible");
}
function ToTemporalRoundingMode(options, fallback) {
  return GetOption(options, "roundingMode", ["ceil", "floor", "trunc", "halfExpand"], fallback);
}
function NegateTemporalRoundingMode(roundingMode) {
  switch (roundingMode) {
    case "ceil":
      return "floor";
    case "floor":
      return "ceil";
    default:
      return roundingMode;
  }
}
function ToTemporalOffset(options, fallback) {
  return GetOption(options, "offset", ["prefer", "use", "ignore", "reject"], fallback);
}
function ToShowCalendarOption(options) {
  return GetOption(options, "calendarName", ["auto", "always", "never"], "auto");
}
function ToShowTimeZoneNameOption(options) {
  return GetOption(options, "timeZoneName", ["auto", "never"], "auto");
}
function ToShowOffsetOption(options) {
  return GetOption(options, "offset", ["auto", "never"], "auto");
}
function ToTemporalRoundingIncrement(options, dividend, inclusive) {
  let maximum = Infinity;
  if (dividend !== void 0)
    maximum = dividend;
  if (!inclusive && dividend !== void 0)
    maximum = dividend > 1 ? dividend - 1 : 1;
  const increment = GetNumberOption(options, "roundingIncrement", 1, maximum, 1);
  if (dividend !== void 0 && dividend % increment !== 0) {
    throw new RangeError(`Rounding increment must divide evenly into ${dividend}`);
  }
  return increment;
}
function ToTemporalDateTimeRoundingIncrement(options, smallestUnit) {
  const maximumIncrements = {
    year: void 0,
    month: void 0,
    week: void 0,
    day: void 0,
    hour: 24,
    minute: 60,
    second: 60,
    millisecond: 1e3,
    microsecond: 1e3,
    nanosecond: 1e3
  };
  return ToTemporalRoundingIncrement(options, maximumIncrements[smallestUnit], false);
}
function ToSecondsStringPrecision(options) {
  const smallestUnit = ToSmallestTemporalUnit(options, void 0, ["year", "month", "week", "day", "hour"]);
  switch (smallestUnit) {
    case "minute":
      return { precision: "minute", unit: "minute", increment: 1 };
    case "second":
      return { precision: 0, unit: "second", increment: 1 };
    case "millisecond":
      return { precision: 3, unit: "millisecond", increment: 1 };
    case "microsecond":
      return { precision: 6, unit: "microsecond", increment: 1 };
    case "nanosecond":
      return { precision: 9, unit: "nanosecond", increment: 1 };
  }
  let digits = options.fractionalSecondDigits;
  if (digits === void 0)
    digits = "auto";
  if (typeof digits !== "number") {
    const stringDigits = ToString(digits);
    if (stringDigits === "auto")
      return { precision: "auto", unit: "nanosecond", increment: 1 };
    throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${stringDigits}`);
  }
  if (NumberIsNaN(digits) || digits < 0 || digits > 9) {
    throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${digits}`);
  }
  const precision = MathFloor(digits);
  switch (precision) {
    case 0:
      return { precision, unit: "second", increment: 1 };
    case 1:
    case 2:
    case 3:
      return { precision, unit: "millisecond", increment: 10 ** (3 - precision) };
    case 4:
    case 5:
    case 6:
      return { precision, unit: "microsecond", increment: 10 ** (6 - precision) };
    case 7:
    case 8:
    case 9:
      return { precision, unit: "nanosecond", increment: 10 ** (9 - precision) };
    default:
      throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${digits}`);
  }
}
function ToLargestTemporalUnit(options, fallback, disallowedStrings = [], autoValue) {
  const singular = new Map(SINGULAR_PLURAL_UNITS.filter(([, sing]) => !disallowedStrings.includes(sing)));
  const allowed = new Set(ALLOWED_UNITS);
  for (const s of disallowedStrings) {
    allowed.delete(s);
  }
  const retval = GetOption(options, "largestUnit", ["auto", ...allowed, ...singular.keys()], fallback);
  if (retval === "auto" && autoValue !== void 0)
    return autoValue;
  if (singular.has(retval)) {
    return singular.get(retval);
  }
  return retval;
}
function ToSmallestTemporalUnit(options, fallback, disallowedStrings = []) {
  const singular = new Map(SINGULAR_PLURAL_UNITS.filter(([, sing]) => !disallowedStrings.includes(sing)));
  const allowed = new Set(ALLOWED_UNITS);
  for (const s of disallowedStrings) {
    allowed.delete(s);
  }
  const value = GetOption(options, "smallestUnit", [...allowed, ...singular.keys()], fallback);
  if (singular.has(value))
    return singular.get(value);
  return value;
}
function ToTemporalDurationTotalUnit(options) {
  const singular = new Map(SINGULAR_PLURAL_UNITS);
  const value = GetOption(options, "unit", [...singular.values(), ...singular.keys()], void 0);
  if (singular.has(value)) {
    return singular.get(value);
  }
  return value;
}
function ToRelativeTemporalObject(options) {
  const relativeTo = options.relativeTo;
  if (relativeTo === void 0)
    return relativeTo;
  let offsetBehaviour = "option";
  let matchMinutes = false;
  let year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2, timeZone2, offset2;
  if (IsObject(relativeTo)) {
    if (IsTemporalZonedDateTime(relativeTo) || IsTemporalDate(relativeTo))
      return relativeTo;
    if (IsTemporalDateTime(relativeTo))
      return TemporalDateTimeToDate(relativeTo);
    calendar2 = GetTemporalCalendarWithISODefault(relativeTo);
    const fieldNames = CalendarFields(calendar2, [
      "day",
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "month",
      "monthCode",
      "nanosecond",
      "second",
      "year"
    ]);
    const fields = ToTemporalDateTimeFields(relativeTo, fieldNames);
    const dateOptions = ObjectCreate$2(null);
    dateOptions.overflow = "constrain";
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = InterpretTemporalDateTimeFields(calendar2, fields, dateOptions));
    offset2 = relativeTo.offset;
    if (offset2 === void 0)
      offsetBehaviour = "wall";
    timeZone2 = relativeTo.timeZone;
  } else {
    let ianaName, z;
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar: calendar2, ianaName, offset: offset2, z } = ParseISODateTime(ToString(relativeTo), { zoneRequired: false }));
    if (ianaName)
      timeZone2 = ianaName;
    if (z) {
      offsetBehaviour = "exact";
    } else if (!offset2) {
      offsetBehaviour = "wall";
    }
    if (!calendar2)
      calendar2 = GetISO8601Calendar();
    calendar2 = ToTemporalCalendar(calendar2);
    matchMinutes = true;
  }
  if (timeZone2) {
    timeZone2 = ToTemporalTimeZone(timeZone2);
    let offsetNs = 0;
    if (offsetBehaviour === "option")
      offsetNs = ParseOffsetString(ToString(offset2));
    const epochNanoseconds = InterpretISODateTimeOffset(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, offsetBehaviour, offsetNs, timeZone2, "compatible", "reject", matchMinutes);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, calendar2);
  }
  return CreateTemporalDate(year, month, day, calendar2);
}
function ValidateTemporalUnitRange(largestUnit, smallestUnit) {
  if (ALLOWED_UNITS.indexOf(largestUnit) > ALLOWED_UNITS.indexOf(smallestUnit)) {
    throw new RangeError(`largestUnit ${largestUnit} cannot be smaller than smallestUnit ${smallestUnit}`);
  }
}
function DefaultTemporalLargestUnit(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
  const singular = new Map(SINGULAR_PLURAL_UNITS);
  for (const [prop, v] of [
    ["years", years],
    ["months", months],
    ["weeks", weeks],
    ["days", days],
    ["hours", hours],
    ["minutes", minutes],
    ["seconds", seconds],
    ["milliseconds", milliseconds],
    ["microseconds", microseconds],
    ["nanoseconds", nanoseconds]
  ]) {
    if (v !== 0)
      return singular.get(prop);
  }
  return "nanosecond";
}
function LargerOfTwoTemporalUnits(unit1, unit2) {
  if (ALLOWED_UNITS.indexOf(unit1) > ALLOWED_UNITS.indexOf(unit2))
    return unit2;
  return unit1;
}
function ToPartialRecord(bag, fields, callerCast) {
  if (!IsObject(bag))
    return false;
  let any;
  for (const property of fields) {
    const value = bag[property];
    if (value !== void 0) {
      any = any || {};
      if (callerCast === void 0 && BUILTIN_CASTS.has(property)) {
        any[property] = BUILTIN_CASTS.get(property)(value);
      } else if (callerCast !== void 0) {
        any[property] = callerCast(value);
      } else {
        any[property] = value;
      }
    }
  }
  return any ? any : false;
}
function PrepareTemporalFields(bag, fields) {
  if (!IsObject(bag))
    return void 0;
  const result = {};
  let any = false;
  for (const fieldRecord of fields) {
    const [property, defaultValue] = fieldRecord;
    let value = bag[property];
    if (value === void 0) {
      if (fieldRecord.length === 1) {
        throw new TypeError(`required property '${property}' missing or undefined`);
      }
      value = defaultValue;
    } else {
      any = true;
      if (BUILTIN_CASTS.has(property)) {
        value = BUILTIN_CASTS.get(property)(value);
      }
    }
    result[property] = value;
  }
  if (!any) {
    throw new TypeError("no supported properties found");
  }
  if (result["era"] === void 0 !== (result["eraYear"] === void 0)) {
    throw new RangeError("properties 'era' and 'eraYear' must be provided together");
  }
  return result;
}
function ToTemporalDateFields(bag, fieldNames) {
  const entries = [
    ["day", void 0],
    ["month", void 0],
    ["monthCode", void 0],
    ["year", void 0]
  ];
  fieldNames.forEach((fieldName) => {
    if (!entries.some(([name]) => name === fieldName)) {
      entries.push([fieldName, void 0]);
    }
  });
  return PrepareTemporalFields(bag, entries);
}
function ToTemporalDateTimeFields(bag, fieldNames) {
  const entries = [
    ["day", void 0],
    ["hour", 0],
    ["microsecond", 0],
    ["millisecond", 0],
    ["minute", 0],
    ["month", void 0],
    ["monthCode", void 0],
    ["nanosecond", 0],
    ["second", 0],
    ["year", void 0]
  ];
  fieldNames.forEach((fieldName) => {
    if (!entries.some(([name]) => name === fieldName)) {
      entries.push([fieldName, void 0]);
    }
  });
  return PrepareTemporalFields(bag, entries);
}
function ToTemporalMonthDayFields(bag, fieldNames) {
  const entries = [
    ["day", void 0],
    ["month", void 0],
    ["monthCode", void 0],
    ["year", void 0]
  ];
  fieldNames.forEach((fieldName) => {
    if (!entries.some(([name]) => name === fieldName)) {
      entries.push([fieldName, void 0]);
    }
  });
  return PrepareTemporalFields(bag, entries);
}
function ToTemporalTimeRecord(bag) {
  return PrepareTemporalFields(bag, [
    ["hour", 0],
    ["microsecond", 0],
    ["millisecond", 0],
    ["minute", 0],
    ["nanosecond", 0],
    ["second", 0]
  ]);
}
function ToTemporalYearMonthFields(bag, fieldNames) {
  const entries = [
    ["month", void 0],
    ["monthCode", void 0],
    ["year", void 0]
  ];
  fieldNames.forEach((fieldName) => {
    if (!entries.some(([name]) => name === fieldName)) {
      entries.push([fieldName, void 0]);
    }
  });
  return PrepareTemporalFields(bag, entries);
}
function ToTemporalZonedDateTimeFields(bag, fieldNames) {
  const entries = [
    ["day", void 0],
    ["hour", 0],
    ["microsecond", 0],
    ["millisecond", 0],
    ["minute", 0],
    ["month", void 0],
    ["monthCode", void 0],
    ["nanosecond", 0],
    ["second", 0],
    ["year", void 0],
    ["offset", void 0],
    ["timeZone"]
  ];
  fieldNames.forEach((fieldName) => {
    if (!entries.some(([name]) => name === fieldName)) {
      entries.push([fieldName, void 0]);
    }
  });
  return PrepareTemporalFields(bag, entries);
}
function ToTemporalDate(itemParam, options = ObjectCreate$2(null)) {
  let item = itemParam;
  if (IsObject(item)) {
    if (IsTemporalDate(item))
      return item;
    if (IsTemporalZonedDateTime(item)) {
      item = BuiltinTimeZoneGetPlainDateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, INSTANT), GetSlot(item, CALENDAR));
    }
    if (IsTemporalDateTime(item)) {
      return CreateTemporalDate(GetSlot(item, ISO_YEAR), GetSlot(item, ISO_MONTH), GetSlot(item, ISO_DAY), GetSlot(item, CALENDAR));
    }
    const calendar3 = GetTemporalCalendarWithISODefault(item);
    const fieldNames = CalendarFields(calendar3, ["day", "month", "monthCode", "year"]);
    const fields = ToTemporalDateFields(item, fieldNames);
    return DateFromFields(calendar3, fields, options);
  }
  ToTemporalOverflow(options);
  const { year, month, day, calendar: calendar2, z } = ParseTemporalDateString(ToString(item));
  if (z)
    throw new RangeError("Z designator not supported for PlainDate");
  const TemporalPlainDate = GetIntrinsic("%Temporal.PlainDate%");
  return new TemporalPlainDate(year, month, day, calendar2);
}
function InterpretTemporalDateTimeFields(calendar2, fields, options) {
  let { hour, minute, second, millisecond, microsecond, nanosecond } = ToTemporalTimeRecord(fields);
  const overflow = ToTemporalOverflow(options);
  const date = DateFromFields(calendar2, fields, options);
  const year = GetSlot(date, ISO_YEAR);
  const month = GetSlot(date, ISO_MONTH);
  const day = GetSlot(date, ISO_DAY);
  ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow));
  return { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
}
function ToTemporalDateTime(item, options = ObjectCreate$2(null)) {
  let year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2;
  if (IsObject(item)) {
    if (IsTemporalDateTime(item))
      return item;
    if (IsTemporalZonedDateTime(item)) {
      return BuiltinTimeZoneGetPlainDateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, INSTANT), GetSlot(item, CALENDAR));
    }
    if (IsTemporalDate(item)) {
      return CreateTemporalDateTime(GetSlot(item, ISO_YEAR), GetSlot(item, ISO_MONTH), GetSlot(item, ISO_DAY), 0, 0, 0, 0, 0, 0, GetSlot(item, CALENDAR));
    }
    calendar2 = GetTemporalCalendarWithISODefault(item);
    const fieldNames = CalendarFields(calendar2, [
      "day",
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "month",
      "monthCode",
      "nanosecond",
      "second",
      "year"
    ]);
    const fields = ToTemporalDateTimeFields(item, fieldNames);
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = InterpretTemporalDateTimeFields(calendar2, fields, options));
  } else {
    ToTemporalOverflow(options);
    let z;
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar: calendar2, z } = ParseTemporalDateTimeString(ToString(item)));
    if (z)
      throw new RangeError("Z designator not supported for PlainDateTime");
    RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    if (calendar2 === void 0)
      calendar2 = GetISO8601Calendar();
    calendar2 = ToTemporalCalendar(calendar2);
  }
  return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
}
function ToTemporalDuration(item) {
  let years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds;
  if (IsObject(item)) {
    if (IsTemporalDuration(item))
      return item;
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ToTemporalDurationRecord(item));
  } else {
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ParseTemporalDurationString(ToString(item)));
  }
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  return new TemporalDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
}
function ToTemporalInstant(item) {
  if (IsTemporalInstant(item))
    return item;
  if (IsTemporalZonedDateTime(item)) {
    const TemporalInstant2 = GetIntrinsic("%Temporal.Instant%");
    return new TemporalInstant2(GetSlot(item, EPOCHNANOSECONDS));
  }
  const ns = ParseTemporalInstant(ToString(item));
  const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
  return new TemporalInstant(ns);
}
function ToTemporalMonthDay(item, options = ObjectCreate$2(null)) {
  if (IsObject(item)) {
    if (IsTemporalMonthDay(item))
      return item;
    let calendar3, calendarAbsent;
    if (HasSlot(item, CALENDAR)) {
      calendar3 = GetSlot(item, CALENDAR);
      calendarAbsent = false;
    } else {
      let maybeStringCalendar2 = item.calendar;
      calendarAbsent = maybeStringCalendar2 === void 0;
      if (maybeStringCalendar2 === void 0)
        maybeStringCalendar2 = GetISO8601Calendar();
      calendar3 = ToTemporalCalendar(maybeStringCalendar2);
    }
    const fieldNames = CalendarFields(calendar3, ["day", "month", "monthCode", "year"]);
    const fields = ToTemporalMonthDayFields(item, fieldNames);
    if (calendarAbsent && fields.month !== void 0 && fields.monthCode === void 0 && fields.year === void 0) {
      fields.year = 1972;
    }
    return MonthDayFromFields(calendar3, fields, options);
  }
  ToTemporalOverflow(options);
  let { month, day, referenceISOYear, calendar: maybeStringCalendar } = ParseTemporalMonthDayString(ToString(item));
  let calendar2 = maybeStringCalendar;
  if (calendar2 === void 0)
    calendar2 = GetISO8601Calendar();
  calendar2 = ToTemporalCalendar(calendar2);
  if (referenceISOYear === void 0) {
    RejectISODate(1972, month, day);
    return CreateTemporalMonthDay(month, day, calendar2);
  }
  const result = CreateTemporalMonthDay(month, day, calendar2, referenceISOYear);
  const canonicalOptions = ObjectCreate$2(null);
  return MonthDayFromFields(calendar2, result, canonicalOptions);
}
function ToTemporalTime(itemParam, overflow = "constrain") {
  let item = itemParam;
  let hour, minute, second, millisecond, microsecond, nanosecond, calendar2;
  if (IsObject(item)) {
    if (IsTemporalTime(item))
      return item;
    if (IsTemporalZonedDateTime(item)) {
      item = BuiltinTimeZoneGetPlainDateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, INSTANT), GetSlot(item, CALENDAR));
    }
    if (IsTemporalDateTime(item)) {
      const TemporalPlainTime2 = GetIntrinsic("%Temporal.PlainTime%");
      return new TemporalPlainTime2(GetSlot(item, ISO_HOUR), GetSlot(item, ISO_MINUTE), GetSlot(item, ISO_SECOND), GetSlot(item, ISO_MILLISECOND), GetSlot(item, ISO_MICROSECOND), GetSlot(item, ISO_NANOSECOND));
    }
    calendar2 = GetTemporalCalendarWithISODefault(item);
    if (ToString(calendar2) !== "iso8601") {
      throw new RangeError("PlainTime can only have iso8601 calendar");
    }
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = ToTemporalTimeRecord(item));
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow));
  } else {
    ({ hour, minute, second, millisecond, microsecond, nanosecond, calendar: calendar2 } = ParseTemporalTimeString(ToString(item)));
    RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
    if (calendar2 !== void 0 && calendar2 !== "iso8601") {
      throw new RangeError("PlainTime can only have iso8601 calendar");
    }
  }
  const TemporalPlainTime = GetIntrinsic("%Temporal.PlainTime%");
  return new TemporalPlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
}
function ToTemporalYearMonth(item, options = ObjectCreate$2(null)) {
  if (IsObject(item)) {
    if (IsTemporalYearMonth(item))
      return item;
    const calendar3 = GetTemporalCalendarWithISODefault(item);
    const fieldNames = CalendarFields(calendar3, ["month", "monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(item, fieldNames);
    return YearMonthFromFields(calendar3, fields, options);
  }
  ToTemporalOverflow(options);
  let { year, month, referenceISODay, calendar: maybeStringCalendar } = ParseTemporalYearMonthString(ToString(item));
  let calendar2 = maybeStringCalendar;
  if (calendar2 === void 0)
    calendar2 = GetISO8601Calendar();
  calendar2 = ToTemporalCalendar(calendar2);
  if (referenceISODay === void 0) {
    RejectISODate(year, month, 1);
    return CreateTemporalYearMonth(year, month, calendar2);
  }
  const result = CreateTemporalYearMonth(year, month, calendar2, referenceISODay);
  const canonicalOptions = ObjectCreate$2(null);
  return YearMonthFromFields(calendar2, result, canonicalOptions);
}
function InterpretISODateTimeOffset(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, offsetBehaviour, offsetNs, timeZone2, disambiguation, offsetOpt, matchMinute) {
  const DateTime = GetIntrinsic("%Temporal.PlainDateTime%");
  const dt = new DateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  if (offsetBehaviour === "wall" || offsetOpt === "ignore") {
    const instant3 = BuiltinTimeZoneGetInstantFor(timeZone2, dt, disambiguation);
    return GetSlot(instant3, EPOCHNANOSECONDS);
  }
  if (offsetBehaviour === "exact" || offsetOpt === "use") {
    const epochNs = GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    if (epochNs === null)
      throw new RangeError("ZonedDateTime outside of supported range");
    return epochNs.minus(offsetNs);
  }
  const possibleInstants = GetPossibleInstantsFor(timeZone2, dt);
  for (const candidate of possibleInstants) {
    const candidateOffset = GetOffsetNanosecondsFor(timeZone2, candidate);
    const roundedCandidateOffset = RoundNumberToIncrement((0, import_big_integer.default)(candidateOffset), 6e10, "halfExpand").toJSNumber();
    if (candidateOffset === offsetNs || matchMinute && roundedCandidateOffset === offsetNs) {
      return GetSlot(candidate, EPOCHNANOSECONDS);
    }
  }
  if (offsetOpt === "reject") {
    const offsetStr = FormatTimeZoneOffsetString(offsetNs);
    const timeZoneString = IsTemporalTimeZone(timeZone2) ? GetSlot(timeZone2, TIMEZONE_ID) : "time zone";
    throw new RangeError(`Offset ${offsetStr} is invalid for ${dt.toString()} in ${timeZoneString}`);
  }
  const instant2 = DisambiguatePossibleInstants(possibleInstants, timeZone2, dt, disambiguation);
  return GetSlot(instant2, EPOCHNANOSECONDS);
}
function ToTemporalZonedDateTime(item, options = ObjectCreate$2(null)) {
  let year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, timeZone2, offset2, calendar2;
  let matchMinute = false;
  let offsetBehaviour = "option";
  if (IsObject(item)) {
    if (IsTemporalZonedDateTime(item))
      return item;
    calendar2 = GetTemporalCalendarWithISODefault(item);
    const fieldNames = CalendarFields(calendar2, [
      "day",
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "month",
      "monthCode",
      "nanosecond",
      "second",
      "year"
    ]);
    const fields = ToTemporalZonedDateTimeFields(item, fieldNames);
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = InterpretTemporalDateTimeFields(calendar2, fields, options));
    timeZone2 = ToTemporalTimeZone(fields.timeZone);
    offset2 = fields.offset;
    if (offset2 === void 0) {
      offsetBehaviour = "wall";
    } else {
      offset2 = ToString(offset2);
    }
  } else {
    ToTemporalOverflow(options);
    let ianaName, z;
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, ianaName, offset: offset2, z, calendar: calendar2 } = ParseTemporalZonedDateTimeString(ToString(item)));
    if (!ianaName)
      throw new RangeError("time zone ID required in brackets");
    if (z) {
      offsetBehaviour = "exact";
    } else if (!offset2) {
      offsetBehaviour = "wall";
    }
    const TemporalTimeZone = GetIntrinsic("%Temporal.TimeZone%");
    timeZone2 = new TemporalTimeZone(ianaName);
    if (!calendar2)
      calendar2 = GetISO8601Calendar();
    calendar2 = ToTemporalCalendar(calendar2);
    matchMinute = true;
  }
  let offsetNs = 0;
  if (offsetBehaviour === "option")
    offsetNs = ParseOffsetString(offset2);
  const disambiguation = ToTemporalDisambiguation(options);
  const offsetOpt = ToTemporalOffset(options, "reject");
  const epochNanoseconds = InterpretISODateTimeOffset(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, offsetBehaviour, offsetNs, timeZone2, disambiguation, offsetOpt, matchMinute);
  return CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, calendar2);
}
function CreateTemporalDateSlots(result, isoYear, isoMonth, isoDay, calendar2) {
  RejectISODate(isoYear, isoMonth, isoDay);
  RejectDateRange(isoYear, isoMonth, isoDay);
  CreateSlots(result);
  SetSlot(result, ISO_YEAR, isoYear);
  SetSlot(result, ISO_MONTH, isoMonth);
  SetSlot(result, ISO_DAY, isoDay);
  SetSlot(result, CALENDAR, calendar2);
  SetSlot(result, DATE_BRAND, true);
  {
    ObjectDefineProperty(result, "_repr_", {
      value: `${result[Symbol.toStringTag]} <${TemporalDateToString(result)}>`,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
function CreateTemporalDate(isoYear, isoMonth, isoDay, calendar2 = GetISO8601Calendar()) {
  const TemporalPlainDate = GetIntrinsic("%Temporal.PlainDate%");
  const result = ObjectCreate$2(TemporalPlainDate.prototype);
  CreateTemporalDateSlots(result, isoYear, isoMonth, isoDay, calendar2);
  return result;
}
function CreateTemporalDateTimeSlots(result, isoYear, isoMonth, isoDay, h, min, s, ms, \u00B5s, ns, calendar2) {
  RejectDateTime(isoYear, isoMonth, isoDay, h, min, s, ms, \u00B5s, ns);
  RejectDateTimeRange(isoYear, isoMonth, isoDay, h, min, s, ms, \u00B5s, ns);
  CreateSlots(result);
  SetSlot(result, ISO_YEAR, isoYear);
  SetSlot(result, ISO_MONTH, isoMonth);
  SetSlot(result, ISO_DAY, isoDay);
  SetSlot(result, ISO_HOUR, h);
  SetSlot(result, ISO_MINUTE, min);
  SetSlot(result, ISO_SECOND, s);
  SetSlot(result, ISO_MILLISECOND, ms);
  SetSlot(result, ISO_MICROSECOND, \u00B5s);
  SetSlot(result, ISO_NANOSECOND, ns);
  SetSlot(result, CALENDAR, calendar2);
  {
    Object.defineProperty(result, "_repr_", {
      value: `${result[Symbol.toStringTag]} <${TemporalDateTimeToString(result, "auto")}>`,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
function CreateTemporalDateTime(isoYear, isoMonth, isoDay, h, min, s, ms, \u00B5s, ns, calendar2 = GetISO8601Calendar()) {
  const TemporalPlainDateTime = GetIntrinsic("%Temporal.PlainDateTime%");
  const result = ObjectCreate$2(TemporalPlainDateTime.prototype);
  CreateTemporalDateTimeSlots(result, isoYear, isoMonth, isoDay, h, min, s, ms, \u00B5s, ns, calendar2);
  return result;
}
function CreateTemporalMonthDaySlots(result, isoMonth, isoDay, calendar2, referenceISOYear) {
  RejectISODate(referenceISOYear, isoMonth, isoDay);
  RejectDateRange(referenceISOYear, isoMonth, isoDay);
  CreateSlots(result);
  SetSlot(result, ISO_MONTH, isoMonth);
  SetSlot(result, ISO_DAY, isoDay);
  SetSlot(result, ISO_YEAR, referenceISOYear);
  SetSlot(result, CALENDAR, calendar2);
  SetSlot(result, MONTH_DAY_BRAND, true);
  {
    Object.defineProperty(result, "_repr_", {
      value: `${result[Symbol.toStringTag]} <${TemporalMonthDayToString(result)}>`,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
function CreateTemporalMonthDay(isoMonth, isoDay, calendar2 = GetISO8601Calendar(), referenceISOYear = 1972) {
  const TemporalPlainMonthDay = GetIntrinsic("%Temporal.PlainMonthDay%");
  const result = ObjectCreate$2(TemporalPlainMonthDay.prototype);
  CreateTemporalMonthDaySlots(result, isoMonth, isoDay, calendar2, referenceISOYear);
  return result;
}
function CreateTemporalYearMonthSlots(result, isoYear, isoMonth, calendar2, referenceISODay) {
  RejectISODate(isoYear, isoMonth, referenceISODay);
  RejectYearMonthRange(isoYear, isoMonth);
  CreateSlots(result);
  SetSlot(result, ISO_YEAR, isoYear);
  SetSlot(result, ISO_MONTH, isoMonth);
  SetSlot(result, ISO_DAY, referenceISODay);
  SetSlot(result, CALENDAR, calendar2);
  SetSlot(result, YEAR_MONTH_BRAND, true);
  {
    Object.defineProperty(result, "_repr_", {
      value: `${result[Symbol.toStringTag]} <${TemporalYearMonthToString(result)}>`,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
function CreateTemporalYearMonth(isoYear, isoMonth, calendar2 = GetISO8601Calendar(), referenceISODay = 1) {
  const TemporalPlainYearMonth = GetIntrinsic("%Temporal.PlainYearMonth%");
  const result = ObjectCreate$2(TemporalPlainYearMonth.prototype);
  CreateTemporalYearMonthSlots(result, isoYear, isoMonth, calendar2, referenceISODay);
  return result;
}
function CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone2, calendar2) {
  ValidateEpochNanoseconds(epochNanoseconds);
  CreateSlots(result);
  SetSlot(result, EPOCHNANOSECONDS, epochNanoseconds);
  SetSlot(result, TIME_ZONE, timeZone2);
  SetSlot(result, CALENDAR, calendar2);
  const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
  const instant2 = new TemporalInstant(GetSlot(result, EPOCHNANOSECONDS));
  SetSlot(result, INSTANT, instant2);
  {
    Object.defineProperty(result, "_repr_", {
      value: `${result[Symbol.toStringTag]} <${TemporalZonedDateTimeToString(result, "auto")}>`,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
function CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, calendar2 = GetISO8601Calendar()) {
  const TemporalZonedDateTime = GetIntrinsic("%Temporal.ZonedDateTime%");
  const result = ObjectCreate$2(TemporalZonedDateTime.prototype);
  CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone2, calendar2);
  return result;
}
function GetISO8601Calendar() {
  const TemporalCalendar = GetIntrinsic("%Temporal.Calendar%");
  return new TemporalCalendar("iso8601");
}
function CalendarFields(calendar2, fieldNamesParam) {
  let fieldNames = fieldNamesParam;
  if (calendar2.fields) {
    fieldNames = calendar2.fields(fieldNames);
  }
  const result = [];
  for (const name of fieldNames) {
    if (typeof name !== "string")
      throw new TypeError("bad return from calendar.fields()");
    ArrayPrototypePush$1.call(result, name);
  }
  return result;
}
function CalendarMergeFields(calendar2, fields, additionalFields) {
  const calMergeFields = calendar2.mergeFields;
  if (!calMergeFields) {
    return { ...fields, ...additionalFields };
  }
  const result = Reflect.apply(calMergeFields, calendar2, [fields, additionalFields]);
  if (!IsObject(result))
    throw new TypeError("bad return from calendar.mergeFields()");
  return result;
}
function CalendarDateAdd(calendar2, date, duration2, options, dateAddParam) {
  let dateAdd = dateAddParam;
  if (dateAdd === void 0) {
    dateAdd = calendar2.dateAdd;
  }
  const result = ReflectApply$1(dateAdd, calendar2, [date, duration2, options]);
  if (!IsTemporalDate(result))
    throw new TypeError("invalid result");
  return result;
}
function CalendarDateUntil(calendar2, date, otherDate, options, dateUntilParam) {
  let dateUntil = dateUntilParam;
  if (dateUntil === void 0) {
    dateUntil = calendar2.dateUntil;
  }
  const result = ReflectApply$1(dateUntil, calendar2, [date, otherDate, options]);
  if (!IsTemporalDuration(result))
    throw new TypeError("invalid result");
  return result;
}
function CalendarYear(calendar2, dateLike) {
  const result = calendar2.year(dateLike);
  if (result === void 0) {
    throw new RangeError("calendar year result must be an integer");
  }
  return ToIntegerThrowOnInfinity(result);
}
function CalendarMonth(calendar2, dateLike) {
  const result = calendar2.month(dateLike);
  if (result === void 0) {
    throw new RangeError("calendar month result must be a positive integer");
  }
  return ToPositiveInteger(result);
}
function CalendarMonthCode(calendar2, dateLike) {
  const result = calendar2.monthCode(dateLike);
  if (result === void 0) {
    throw new RangeError("calendar monthCode result must be a string");
  }
  return ToString(result);
}
function CalendarDay(calendar2, dateLike) {
  const result = calendar2.day(dateLike);
  if (result === void 0) {
    throw new RangeError("calendar day result must be a positive integer");
  }
  return ToPositiveInteger(result);
}
function CalendarEra(calendar2, dateLike) {
  let result = calendar2.era(dateLike);
  if (result !== void 0) {
    result = ToString(result);
  }
  return result;
}
function CalendarEraYear(calendar2, dateLike) {
  let result = calendar2.eraYear(dateLike);
  if (result !== void 0) {
    result = ToIntegerThrowOnInfinity(result);
  }
  return result;
}
function CalendarDayOfWeek(calendar2, dateLike) {
  return calendar2.dayOfWeek(dateLike);
}
function CalendarDayOfYear(calendar2, dateLike) {
  return calendar2.dayOfYear(dateLike);
}
function CalendarWeekOfYear(calendar2, dateLike) {
  return calendar2.weekOfYear(dateLike);
}
function CalendarDaysInWeek(calendar2, dateLike) {
  return calendar2.daysInWeek(dateLike);
}
function CalendarDaysInMonth(calendar2, dateLike) {
  return calendar2.daysInMonth(dateLike);
}
function CalendarDaysInYear(calendar2, dateLike) {
  return calendar2.daysInYear(dateLike);
}
function CalendarMonthsInYear(calendar2, dateLike) {
  return calendar2.monthsInYear(dateLike);
}
function CalendarInLeapYear(calendar2, dateLike) {
  return calendar2.inLeapYear(dateLike);
}
function ToTemporalCalendar(calendarLikeParam) {
  let calendarLike = calendarLikeParam;
  if (IsObject(calendarLike)) {
    if (HasSlot(calendarLike, CALENDAR))
      return GetSlot(calendarLike, CALENDAR);
    if (!("calendar" in calendarLike))
      return calendarLike;
    calendarLike = calendarLike.calendar;
    if (IsObject(calendarLike) && !("calendar" in calendarLike))
      return calendarLike;
  }
  const identifier = ToString(calendarLike);
  const TemporalCalendar = GetIntrinsic("%Temporal.Calendar%");
  if (IsBuiltinCalendar(identifier))
    return new TemporalCalendar(identifier);
  let calendar2;
  try {
    ({ calendar: calendar2 } = ParseISODateTime(identifier, { zoneRequired: false }));
  } catch {
    throw new RangeError(`Invalid calendar: ${identifier}`);
  }
  if (!calendar2)
    calendar2 = "iso8601";
  return new TemporalCalendar(calendar2);
}
function GetTemporalCalendarWithISODefault(item) {
  if (HasSlot(item, CALENDAR))
    return GetSlot(item, CALENDAR);
  const { calendar: calendar2 } = item;
  if (calendar2 === void 0)
    return GetISO8601Calendar();
  return ToTemporalCalendar(calendar2);
}
function CalendarEquals(one, two) {
  if (one === two)
    return true;
  const cal1 = ToString(one);
  const cal2 = ToString(two);
  return cal1 === cal2;
}
function ConsolidateCalendars(one, two) {
  if (one === two)
    return two;
  const sOne = ToString(one);
  const sTwo = ToString(two);
  if (sOne === sTwo || sOne === "iso8601") {
    return two;
  } else if (sTwo === "iso8601") {
    return one;
  } else {
    throw new RangeError("irreconcilable calendars");
  }
}
function DateFromFields(calendar2, fields, options) {
  const result = calendar2.dateFromFields(fields, options);
  if (!IsTemporalDate(result))
    throw new TypeError("invalid result");
  return result;
}
function YearMonthFromFields(calendar2, fields, options) {
  const result = calendar2.yearMonthFromFields(fields, options);
  if (!IsTemporalYearMonth(result))
    throw new TypeError("invalid result");
  return result;
}
function MonthDayFromFields(calendar2, fields, options) {
  const result = calendar2.monthDayFromFields(fields, options);
  if (!IsTemporalMonthDay(result))
    throw new TypeError("invalid result");
  return result;
}
function ToTemporalTimeZone(temporalTimeZoneLikeParam) {
  let temporalTimeZoneLike = temporalTimeZoneLikeParam;
  if (IsObject(temporalTimeZoneLike)) {
    if (IsTemporalZonedDateTime(temporalTimeZoneLike))
      return GetSlot(temporalTimeZoneLike, TIME_ZONE);
    if (!("timeZone" in temporalTimeZoneLike))
      return temporalTimeZoneLike;
    temporalTimeZoneLike = temporalTimeZoneLike.timeZone;
    if (IsObject(temporalTimeZoneLike) && !("timeZone" in temporalTimeZoneLike)) {
      return temporalTimeZoneLike;
    }
  }
  const identifier = ToString(temporalTimeZoneLike);
  const timeZone2 = ParseTemporalTimeZone(identifier);
  const TemporalTimeZone = GetIntrinsic("%Temporal.TimeZone%");
  return new TemporalTimeZone(timeZone2);
}
function TimeZoneEquals(one, two) {
  if (one === two)
    return true;
  const tz1 = ToString(one);
  const tz2 = ToString(two);
  return tz1 === tz2;
}
function TemporalDateTimeToDate(dateTime2) {
  return CreateTemporalDate(GetSlot(dateTime2, ISO_YEAR), GetSlot(dateTime2, ISO_MONTH), GetSlot(dateTime2, ISO_DAY), GetSlot(dateTime2, CALENDAR));
}
function TemporalDateTimeToTime(dateTime2) {
  const Time = GetIntrinsic("%Temporal.PlainTime%");
  return new Time(GetSlot(dateTime2, ISO_HOUR), GetSlot(dateTime2, ISO_MINUTE), GetSlot(dateTime2, ISO_SECOND), GetSlot(dateTime2, ISO_MILLISECOND), GetSlot(dateTime2, ISO_MICROSECOND), GetSlot(dateTime2, ISO_NANOSECOND));
}
function GetOffsetNanosecondsFor(timeZone2, instant2) {
  let getOffsetNanosecondsFor = timeZone2.getOffsetNanosecondsFor;
  if (typeof getOffsetNanosecondsFor !== "function") {
    throw new TypeError("getOffsetNanosecondsFor not callable");
  }
  const offsetNs = Reflect.apply(getOffsetNanosecondsFor, timeZone2, [instant2]);
  if (typeof offsetNs !== "number") {
    throw new TypeError("bad return from getOffsetNanosecondsFor");
  }
  if (!IsInteger(offsetNs) || MathAbs(offsetNs) > 864e11) {
    throw new RangeError("out-of-range return from getOffsetNanosecondsFor");
  }
  return offsetNs;
}
function BuiltinTimeZoneGetOffsetStringFor(timeZone2, instant2) {
  const offsetNs = GetOffsetNanosecondsFor(timeZone2, instant2);
  return FormatTimeZoneOffsetString(offsetNs);
}
function BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, instant2, calendar2) {
  const ns = GetSlot(instant2, EPOCHNANOSECONDS);
  const offsetNs = GetOffsetNanosecondsFor(timeZone2, instant2);
  let { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = GetISOPartsFromEpoch(ns);
  ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond + offsetNs));
  return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
}
function BuiltinTimeZoneGetInstantFor(timeZone2, dateTime2, disambiguation) {
  const possibleInstants = GetPossibleInstantsFor(timeZone2, dateTime2);
  return DisambiguatePossibleInstants(possibleInstants, timeZone2, dateTime2, disambiguation);
}
function DisambiguatePossibleInstants(possibleInstants, timeZone2, dateTime2, disambiguation) {
  const Instant2 = GetIntrinsic("%Temporal.Instant%");
  const numInstants = possibleInstants.length;
  if (numInstants === 1)
    return possibleInstants[0];
  if (numInstants) {
    switch (disambiguation) {
      case "compatible":
      case "earlier":
        return possibleInstants[0];
      case "later":
        return possibleInstants[numInstants - 1];
      case "reject": {
        throw new RangeError("multiple instants found");
      }
    }
  }
  const year = GetSlot(dateTime2, ISO_YEAR);
  const month = GetSlot(dateTime2, ISO_MONTH);
  const day = GetSlot(dateTime2, ISO_DAY);
  const hour = GetSlot(dateTime2, ISO_HOUR);
  const minute = GetSlot(dateTime2, ISO_MINUTE);
  const second = GetSlot(dateTime2, ISO_SECOND);
  const millisecond = GetSlot(dateTime2, ISO_MILLISECOND);
  const microsecond = GetSlot(dateTime2, ISO_MICROSECOND);
  const nanosecond = GetSlot(dateTime2, ISO_NANOSECOND);
  const utcns = GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  if (utcns === null)
    throw new RangeError("DateTime outside of supported range");
  const dayBefore = new Instant2(utcns.minus(864e11));
  const dayAfter = new Instant2(utcns.plus(864e11));
  const offsetBefore = GetOffsetNanosecondsFor(timeZone2, dayBefore);
  const offsetAfter = GetOffsetNanosecondsFor(timeZone2, dayAfter);
  const nanoseconds = offsetAfter - offsetBefore;
  switch (disambiguation) {
    case "earlier": {
      const calendar2 = GetSlot(dateTime2, CALENDAR);
      const PlainDateTime2 = GetIntrinsic("%Temporal.PlainDateTime%");
      const earlier = AddDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2, 0, 0, 0, 0, 0, 0, 0, 0, 0, -nanoseconds, void 0);
      const earlierPlainDateTime = new PlainDateTime2(earlier.year, earlier.month, earlier.day, earlier.hour, earlier.minute, earlier.second, earlier.millisecond, earlier.microsecond, earlier.nanosecond, calendar2);
      return GetPossibleInstantsFor(timeZone2, earlierPlainDateTime)[0];
    }
    case "compatible":
    case "later": {
      const calendar2 = GetSlot(dateTime2, CALENDAR);
      const PlainDateTime2 = GetIntrinsic("%Temporal.PlainDateTime%");
      const later = AddDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2, 0, 0, 0, 0, 0, 0, 0, 0, 0, nanoseconds, void 0);
      const laterPlainDateTime = new PlainDateTime2(later.year, later.month, later.day, later.hour, later.minute, later.second, later.millisecond, later.microsecond, later.nanosecond, calendar2);
      const possible = GetPossibleInstantsFor(timeZone2, laterPlainDateTime);
      return possible[possible.length - 1];
    }
    case "reject": {
      throw new RangeError("no such instant found");
    }
  }
}
function GetPossibleInstantsFor(timeZone2, dateTime2) {
  const possibleInstants = timeZone2.getPossibleInstantsFor(dateTime2);
  const result = [];
  for (const instant2 of possibleInstants) {
    if (!IsTemporalInstant(instant2)) {
      throw new TypeError("bad return from getPossibleInstantsFor");
    }
    ArrayPrototypePush$1.call(result, instant2);
  }
  return result;
}
function ISOYearString(year) {
  let yearString;
  if (year < 1e3 || year > 9999) {
    const sign = year < 0 ? "-" : "+";
    const yearNumber = MathAbs(year);
    yearString = sign + `000000${yearNumber}`.slice(-6);
  } else {
    yearString = `${year}`;
  }
  return yearString;
}
function ISODateTimePartString(part) {
  return `00${part}`.slice(-2);
}
function FormatSecondsStringPart(second, millisecond, microsecond, nanosecond, precision) {
  if (precision === "minute")
    return "";
  const secs = `:${ISODateTimePartString(second)}`;
  let fractionNumber = millisecond * 1e6 + microsecond * 1e3 + nanosecond;
  let fraction2;
  if (precision === "auto") {
    if (fractionNumber === 0)
      return secs;
    fraction2 = `${fractionNumber}`.padStart(9, "0");
    while (fraction2[fraction2.length - 1] === "0")
      fraction2 = fraction2.slice(0, -1);
  } else {
    if (precision === 0)
      return secs;
    fraction2 = `${fractionNumber}`.padStart(9, "0").slice(0, precision);
  }
  return `${secs}.${fraction2}`;
}
function TemporalInstantToString(instant2, timeZone2, precision) {
  let outputTimeZone = timeZone2;
  if (outputTimeZone === void 0) {
    const TemporalTimeZone = GetIntrinsic("%Temporal.TimeZone%");
    outputTimeZone = new TemporalTimeZone("UTC");
  }
  const iso = GetISO8601Calendar();
  const dateTime2 = BuiltinTimeZoneGetPlainDateTimeFor(outputTimeZone, instant2, iso);
  const year = ISOYearString(GetSlot(dateTime2, ISO_YEAR));
  const month = ISODateTimePartString(GetSlot(dateTime2, ISO_MONTH));
  const day = ISODateTimePartString(GetSlot(dateTime2, ISO_DAY));
  const hour = ISODateTimePartString(GetSlot(dateTime2, ISO_HOUR));
  const minute = ISODateTimePartString(GetSlot(dateTime2, ISO_MINUTE));
  const seconds = FormatSecondsStringPart(GetSlot(dateTime2, ISO_SECOND), GetSlot(dateTime2, ISO_MILLISECOND), GetSlot(dateTime2, ISO_MICROSECOND), GetSlot(dateTime2, ISO_NANOSECOND), precision);
  let timeZoneString = "Z";
  if (timeZone2 !== void 0) {
    const offsetNs = GetOffsetNanosecondsFor(outputTimeZone, instant2);
    timeZoneString = FormatISOTimeZoneOffsetString(offsetNs);
  }
  return `${year}-${month}-${day}T${hour}:${minute}${seconds}${timeZoneString}`;
}
function TemporalDurationToString(duration2, precision = "auto", options = void 0) {
  function formatNumber2(num) {
    if (num <= NumberMaxSafeInteger)
      return num.toString(10);
    return (0, import_big_integer.default)(num).toString();
  }
  const years = GetSlot(duration2, YEARS);
  const months = GetSlot(duration2, MONTHS);
  const weeks = GetSlot(duration2, WEEKS);
  const days = GetSlot(duration2, DAYS);
  const hours = GetSlot(duration2, HOURS);
  const minutes = GetSlot(duration2, MINUTES);
  let seconds = GetSlot(duration2, SECONDS);
  let ms = GetSlot(duration2, MILLISECONDS);
  let \u00B5s = GetSlot(duration2, MICROSECONDS);
  let ns = GetSlot(duration2, NANOSECONDS);
  const sign = DurationSign(years, months, weeks, days, hours, minutes, seconds, ms, \u00B5s, ns);
  if (options) {
    const { unit, increment, roundingMode } = options;
    ({
      seconds,
      milliseconds: ms,
      microseconds: \u00B5s,
      nanoseconds: ns
    } = RoundDuration(0, 0, 0, 0, 0, 0, seconds, ms, \u00B5s, ns, increment, unit, roundingMode));
  }
  const dateParts = [];
  if (years)
    dateParts.push(`${formatNumber2(MathAbs(years))}Y`);
  if (months)
    dateParts.push(`${formatNumber2(MathAbs(months))}M`);
  if (weeks)
    dateParts.push(`${formatNumber2(MathAbs(weeks))}W`);
  if (days)
    dateParts.push(`${formatNumber2(MathAbs(days))}D`);
  const timeParts = [];
  if (hours)
    timeParts.push(`${formatNumber2(MathAbs(hours))}H`);
  if (minutes)
    timeParts.push(`${formatNumber2(MathAbs(minutes))}M`);
  const secondParts = [];
  let total = TotalDurationNanoseconds(0, 0, 0, seconds, ms, \u00B5s, ns, 0);
  let nsBigInt, \u00B5sBigInt, msBigInt, secondsBigInt;
  ({ quotient: total, remainder: nsBigInt } = total.divmod(1e3));
  ({ quotient: total, remainder: \u00B5sBigInt } = total.divmod(1e3));
  ({ quotient: secondsBigInt, remainder: msBigInt } = total.divmod(1e3));
  const fraction2 = MathAbs(msBigInt.toJSNumber()) * 1e6 + MathAbs(\u00B5sBigInt.toJSNumber()) * 1e3 + MathAbs(nsBigInt.toJSNumber());
  let decimalPart;
  if (precision === "auto") {
    if (fraction2 !== 0) {
      decimalPart = `${fraction2}`.padStart(9, "0");
      while (decimalPart[decimalPart.length - 1] === "0") {
        decimalPart = decimalPart.slice(0, -1);
      }
    }
  } else if (precision !== 0) {
    decimalPart = `${fraction2}`.padStart(9, "0").slice(0, precision);
  }
  if (decimalPart)
    secondParts.unshift(".", decimalPart);
  if (!secondsBigInt.isZero() || secondParts.length)
    secondParts.unshift(secondsBigInt.abs().toString());
  if (secondParts.length)
    timeParts.push(`${secondParts.join("")}S`);
  if (timeParts.length)
    timeParts.unshift("T");
  if (!dateParts.length && !timeParts.length)
    return "PT0S";
  return `${sign < 0 ? "-" : ""}P${dateParts.join("")}${timeParts.join("")}`;
}
function TemporalDateToString(date, showCalendar = "auto") {
  const year = ISOYearString(GetSlot(date, ISO_YEAR));
  const month = ISODateTimePartString(GetSlot(date, ISO_MONTH));
  const day = ISODateTimePartString(GetSlot(date, ISO_DAY));
  const calendarID2 = ToString(GetSlot(date, CALENDAR));
  const calendar2 = FormatCalendarAnnotation(calendarID2, showCalendar);
  return `${year}-${month}-${day}${calendar2}`;
}
function TemporalDateTimeToString(dateTime2, precision, showCalendar = "auto", options = void 0) {
  let year = GetSlot(dateTime2, ISO_YEAR);
  let month = GetSlot(dateTime2, ISO_MONTH);
  let day = GetSlot(dateTime2, ISO_DAY);
  let hour = GetSlot(dateTime2, ISO_HOUR);
  let minute = GetSlot(dateTime2, ISO_MINUTE);
  let second = GetSlot(dateTime2, ISO_SECOND);
  let millisecond = GetSlot(dateTime2, ISO_MILLISECOND);
  let microsecond = GetSlot(dateTime2, ISO_MICROSECOND);
  let nanosecond = GetSlot(dateTime2, ISO_NANOSECOND);
  if (options) {
    const { unit, increment, roundingMode } = options;
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = RoundISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, increment, unit, roundingMode));
  }
  const yearString = ISOYearString(year);
  const monthString = ISODateTimePartString(month);
  const dayString = ISODateTimePartString(day);
  const hourString = ISODateTimePartString(hour);
  const minuteString = ISODateTimePartString(minute);
  const secondsString = FormatSecondsStringPart(second, millisecond, microsecond, nanosecond, precision);
  const calendarID2 = ToString(GetSlot(dateTime2, CALENDAR));
  const calendar2 = FormatCalendarAnnotation(calendarID2, showCalendar);
  return `${yearString}-${monthString}-${dayString}T${hourString}:${minuteString}${secondsString}${calendar2}`;
}
function TemporalMonthDayToString(monthDay, showCalendar = "auto") {
  const month = ISODateTimePartString(GetSlot(monthDay, ISO_MONTH));
  const day = ISODateTimePartString(GetSlot(monthDay, ISO_DAY));
  let resultString = `${month}-${day}`;
  const calendar2 = GetSlot(monthDay, CALENDAR);
  const calendarID2 = ToString(calendar2);
  if (calendarID2 !== "iso8601") {
    const year = ISOYearString(GetSlot(monthDay, ISO_YEAR));
    resultString = `${year}-${resultString}`;
  }
  const calendarString = FormatCalendarAnnotation(calendarID2, showCalendar);
  if (calendarString)
    resultString += calendarString;
  return resultString;
}
function TemporalYearMonthToString(yearMonth, showCalendar = "auto") {
  const year = ISOYearString(GetSlot(yearMonth, ISO_YEAR));
  const month = ISODateTimePartString(GetSlot(yearMonth, ISO_MONTH));
  let resultString = `${year}-${month}`;
  const calendar2 = GetSlot(yearMonth, CALENDAR);
  const calendarID2 = ToString(calendar2);
  if (calendarID2 !== "iso8601") {
    const day = ISODateTimePartString(GetSlot(yearMonth, ISO_DAY));
    resultString += `-${day}`;
  }
  const calendarString = FormatCalendarAnnotation(calendarID2, showCalendar);
  if (calendarString)
    resultString += calendarString;
  return resultString;
}
function TemporalZonedDateTimeToString(zdt, precision, showCalendar = "auto", showTimeZone = "auto", showOffset = "auto", options = void 0) {
  let instant2 = GetSlot(zdt, INSTANT);
  if (options) {
    const { unit, increment, roundingMode } = options;
    const ns = RoundInstant(GetSlot(zdt, EPOCHNANOSECONDS), increment, unit, roundingMode);
    const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
    instant2 = new TemporalInstant(ns);
  }
  const tz = GetSlot(zdt, TIME_ZONE);
  const iso = GetISO8601Calendar();
  const dateTime2 = BuiltinTimeZoneGetPlainDateTimeFor(tz, instant2, iso);
  const year = ISOYearString(GetSlot(dateTime2, ISO_YEAR));
  const month = ISODateTimePartString(GetSlot(dateTime2, ISO_MONTH));
  const day = ISODateTimePartString(GetSlot(dateTime2, ISO_DAY));
  const hour = ISODateTimePartString(GetSlot(dateTime2, ISO_HOUR));
  const minute = ISODateTimePartString(GetSlot(dateTime2, ISO_MINUTE));
  const seconds = FormatSecondsStringPart(GetSlot(dateTime2, ISO_SECOND), GetSlot(dateTime2, ISO_MILLISECOND), GetSlot(dateTime2, ISO_MICROSECOND), GetSlot(dateTime2, ISO_NANOSECOND), precision);
  let result = `${year}-${month}-${day}T${hour}:${minute}${seconds}`;
  if (showOffset !== "never") {
    const offsetNs = GetOffsetNanosecondsFor(tz, instant2);
    result += FormatISOTimeZoneOffsetString(offsetNs);
  }
  if (showTimeZone !== "never")
    result += `[${tz}]`;
  const calendarID2 = ToString(GetSlot(zdt, CALENDAR));
  result += FormatCalendarAnnotation(calendarID2, showCalendar);
  return result;
}
function ParseOffsetString(string) {
  const match = OFFSET.exec(StringCtor(string));
  if (!match)
    return null;
  const sign = match[1] === "-" || match[1] === "\u2212" ? -1 : 1;
  const hours = +match[2];
  const minutes = +(match[3] || 0);
  const seconds = +(match[4] || 0);
  const nanoseconds = +((match[5] || 0) + "000000000").slice(0, 9);
  return sign * (((hours * 60 + minutes) * 60 + seconds) * 1e9 + nanoseconds);
}
function GetCanonicalTimeZoneIdentifier(timeZoneIdentifier) {
  const offsetNs = ParseOffsetString(timeZoneIdentifier);
  if (offsetNs !== null)
    return FormatTimeZoneOffsetString(offsetNs);
  const formatter = getIntlDateTimeFormatEnUsForTimeZone(StringCtor(timeZoneIdentifier));
  return formatter.resolvedOptions().timeZone;
}
function GetIANATimeZoneOffsetNanoseconds(epochNanoseconds, id) {
  const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = GetIANATimeZoneDateTimeParts(epochNanoseconds, id);
  const utc = GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  if (utc === null)
    throw new RangeError("Date outside of supported range");
  return +utc.minus(epochNanoseconds);
}
function FormatTimeZoneOffsetString(offsetNanosecondsParam) {
  const sign = offsetNanosecondsParam < 0 ? "-" : "+";
  const offsetNanoseconds = MathAbs(offsetNanosecondsParam);
  const nanoseconds = offsetNanoseconds % 1e9;
  const seconds = MathFloor(offsetNanoseconds / 1e9) % 60;
  const minutes = MathFloor(offsetNanoseconds / 6e10) % 60;
  const hours = MathFloor(offsetNanoseconds / 36e11);
  const hourString = ISODateTimePartString(hours);
  const minuteString = ISODateTimePartString(minutes);
  const secondString = ISODateTimePartString(seconds);
  let post = "";
  if (nanoseconds) {
    let fraction2 = `${nanoseconds}`.padStart(9, "0");
    while (fraction2[fraction2.length - 1] === "0")
      fraction2 = fraction2.slice(0, -1);
    post = `:${secondString}.${fraction2}`;
  } else if (seconds) {
    post = `:${secondString}`;
  }
  return `${sign}${hourString}:${minuteString}${post}`;
}
function FormatISOTimeZoneOffsetString(offsetNanosecondsParam) {
  let offsetNanoseconds = RoundNumberToIncrement((0, import_big_integer.default)(offsetNanosecondsParam), 6e10, "halfExpand").toJSNumber();
  const sign = offsetNanoseconds < 0 ? "-" : "+";
  offsetNanoseconds = MathAbs(offsetNanoseconds);
  const minutes = offsetNanoseconds / 6e10 % 60;
  const hours = MathFloor(offsetNanoseconds / 36e11);
  const hourString = ISODateTimePartString(hours);
  const minuteString = ISODateTimePartString(minutes);
  return `${sign}${hourString}:${minuteString}`;
}
function GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
  const legacyDate = new Date();
  legacyDate.setUTCHours(hour, minute, second, millisecond);
  legacyDate.setUTCFullYear(year, month - 1, day);
  const ms = legacyDate.getTime();
  if (NumberIsNaN(ms))
    return null;
  let ns = (0, import_big_integer.default)(ms).multiply(1e6);
  ns = ns.plus((0, import_big_integer.default)(microsecond).multiply(1e3));
  ns = ns.plus((0, import_big_integer.default)(nanosecond));
  if (ns.lesser(NS_MIN) || ns.greater(NS_MAX))
    return null;
  return ns;
}
function GetISOPartsFromEpoch(epochNanoseconds) {
  const { quotient, remainder } = (0, import_big_integer.default)(epochNanoseconds).divmod(1e6);
  let epochMilliseconds = +quotient;
  let nanos = +remainder;
  if (nanos < 0) {
    nanos += 1e6;
    epochMilliseconds -= 1;
  }
  const microsecond = MathFloor(nanos / 1e3) % 1e3;
  const nanosecond = nanos % 1e3;
  const item = new Date(epochMilliseconds);
  const year = item.getUTCFullYear();
  const month = item.getUTCMonth() + 1;
  const day = item.getUTCDate();
  const hour = item.getUTCHours();
  const minute = item.getUTCMinutes();
  const second = item.getUTCSeconds();
  const millisecond = item.getUTCMilliseconds();
  return { epochMilliseconds, year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
}
function GetIANATimeZoneDateTimeParts(epochNanoseconds, id) {
  const { epochMilliseconds, millisecond, microsecond, nanosecond } = GetISOPartsFromEpoch(epochNanoseconds);
  const { year, month, day, hour, minute, second } = GetFormatterParts(id, epochMilliseconds);
  return BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
}
function GetIANATimeZoneNextTransition(epochNanoseconds, id) {
  const uppercap = SystemUTCEpochNanoSeconds().plus(DAY_NANOS.multiply(366));
  let leftNanos = epochNanoseconds;
  const leftOffsetNs = GetIANATimeZoneOffsetNanoseconds(leftNanos, id);
  let rightNanos = leftNanos;
  let rightOffsetNs = leftOffsetNs;
  while (leftOffsetNs === rightOffsetNs && (0, import_big_integer.default)(leftNanos).compare(uppercap) === -1) {
    rightNanos = (0, import_big_integer.default)(leftNanos).plus(DAY_NANOS.multiply(2 * 7));
    rightOffsetNs = GetIANATimeZoneOffsetNanoseconds(rightNanos, id);
    if (leftOffsetNs === rightOffsetNs) {
      leftNanos = rightNanos;
    }
  }
  if (leftOffsetNs === rightOffsetNs)
    return null;
  const result = bisect((epochNs) => GetIANATimeZoneOffsetNanoseconds(epochNs, id), leftNanos, rightNanos, leftOffsetNs, rightOffsetNs);
  return result;
}
function GetIANATimeZonePreviousTransition(epochNanoseconds, id) {
  const lowercap = BEFORE_FIRST_DST;
  let rightNanos = (0, import_big_integer.default)(epochNanoseconds).minus(1);
  const rightOffsetNs = GetIANATimeZoneOffsetNanoseconds(rightNanos, id);
  let leftNanos = rightNanos;
  let leftOffsetNs = rightOffsetNs;
  while (rightOffsetNs === leftOffsetNs && (0, import_big_integer.default)(rightNanos).compare(lowercap) === 1) {
    leftNanos = (0, import_big_integer.default)(rightNanos).minus(DAY_NANOS.multiply(2 * 7));
    leftOffsetNs = GetIANATimeZoneOffsetNanoseconds(leftNanos, id);
    if (rightOffsetNs === leftOffsetNs) {
      rightNanos = leftNanos;
    }
  }
  if (rightOffsetNs === leftOffsetNs)
    return null;
  const result = bisect((epochNs) => GetIANATimeZoneOffsetNanoseconds(epochNs, id), leftNanos, rightNanos, leftOffsetNs, rightOffsetNs);
  return result;
}
function GetFormatterParts(timeZone2, epochMilliseconds) {
  const formatter = getIntlDateTimeFormatEnUsForTimeZone(timeZone2);
  const datetime2 = formatter.format(new Date(epochMilliseconds));
  const [month, day, year, era, hour, minute, second] = datetime2.split(/[^\w]+/);
  return {
    year: era.toUpperCase().startsWith("B") ? -year + 1 : +year,
    month: +month,
    day: +day,
    hour: hour === "24" ? 0 : +hour,
    minute: +minute,
    second: +second
  };
}
function GetIANATimeZoneEpochValue(id, year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
  const ns = GetEpochFromISOParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  if (ns === null)
    throw new RangeError("DateTime outside of supported range");
  let nsEarlier = ns.minus(DAY_NANOS);
  if (nsEarlier.lesser(NS_MIN))
    nsEarlier = ns;
  let nsLater = ns.plus(DAY_NANOS);
  if (nsLater.greater(NS_MAX))
    nsLater = ns;
  const earliest = GetIANATimeZoneOffsetNanoseconds(nsEarlier, id);
  const latest = GetIANATimeZoneOffsetNanoseconds(nsLater, id);
  const found = earliest === latest ? [earliest] : [earliest, latest];
  return found.map((offsetNanoseconds) => {
    const epochNanoseconds = (0, import_big_integer.default)(ns).minus(offsetNanoseconds);
    const parts = GetIANATimeZoneDateTimeParts(epochNanoseconds, id);
    if (year !== parts.year || month !== parts.month || day !== parts.day || hour !== parts.hour || minute !== parts.minute || second !== parts.second || millisecond !== parts.millisecond || microsecond !== parts.microsecond || nanosecond !== parts.nanosecond) {
      return void 0;
    }
    return epochNanoseconds;
  }).filter((x) => x !== void 0);
}
function LeapYear(year) {
  if (year === void 0)
    return false;
  const isDiv4 = year % 4 === 0;
  const isDiv100 = year % 100 === 0;
  const isDiv400 = year % 400 === 0;
  return isDiv4 && (!isDiv100 || isDiv400);
}
function ISODaysInMonth(year, month) {
  const DoM = {
    standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  };
  return DoM[LeapYear(year) ? "leapyear" : "standard"][month - 1];
}
function DayOfWeek(year, month, day) {
  const m = month + (month < 3 ? 10 : -2);
  const Y = year - (month < 3 ? 1 : 0);
  const c = MathFloor(Y / 100);
  const y = Y - c * 100;
  const d = day;
  const pD = d;
  const pM = MathFloor(2.6 * m - 0.2);
  const pY = y + MathFloor(y / 4);
  const pC = MathFloor(c / 4) - 2 * c;
  const dow = (pD + pM + pY + pC) % 7;
  return dow + (dow <= 0 ? 7 : 0);
}
function DayOfYear(year, month, day) {
  let days = day;
  for (let m = month - 1; m > 0; m--) {
    days += ISODaysInMonth(year, m);
  }
  return days;
}
function WeekOfYear(year, month, day) {
  const doy = DayOfYear(year, month, day);
  const dow = DayOfWeek(year, month, day) || 7;
  const doj = DayOfWeek(year, 1, 1);
  const week = MathFloor((doy - dow + 10) / 7);
  if (week < 1) {
    if (doj === 5 || doj === 6 && LeapYear(year - 1)) {
      return 53;
    } else {
      return 52;
    }
  }
  if (week === 53) {
    if ((LeapYear(year) ? 366 : 365) - doy < 4 - dow) {
      return 1;
    }
  }
  return week;
}
function DurationSign(y, mon, w, d, h, min, s, ms, \u00B5s, ns) {
  for (const prop of [y, mon, w, d, h, min, s, ms, \u00B5s, ns]) {
    if (prop !== 0)
      return prop < 0 ? -1 : 1;
  }
  return 0;
}
function BalanceISOYearMonth(yearParam, monthParam) {
  let year = yearParam;
  let month = monthParam;
  if (!NumberIsFinite(year) || !NumberIsFinite(month))
    throw new RangeError("infinity is out of range");
  month -= 1;
  year += MathFloor(month / 12);
  month %= 12;
  if (month < 0)
    month += 12;
  month += 1;
  return { year, month };
}
function BalanceISODate(yearParam, monthParam, dayParam) {
  let year = yearParam;
  let month = monthParam;
  let day = dayParam;
  if (!NumberIsFinite(day))
    throw new RangeError("infinity is out of range");
  ({ year, month } = BalanceISOYearMonth(year, month));
  let daysInYear = 0;
  let testYear = month > 2 ? year : year - 1;
  while (daysInYear = LeapYear(testYear) ? 366 : 365, day < -daysInYear) {
    year -= 1;
    testYear -= 1;
    day += daysInYear;
  }
  testYear += 1;
  while (daysInYear = LeapYear(testYear) ? 366 : 365, day > daysInYear) {
    year += 1;
    testYear += 1;
    day -= daysInYear;
  }
  while (day < 1) {
    ({ year, month } = BalanceISOYearMonth(year, month - 1));
    day += ISODaysInMonth(year, month);
  }
  while (day > ISODaysInMonth(year, month)) {
    day -= ISODaysInMonth(year, month);
    ({ year, month } = BalanceISOYearMonth(year, month + 1));
  }
  return { year, month, day };
}
function BalanceISODateTime(yearParam, monthParam, dayParam, hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam) {
  const { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond } = BalanceTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam);
  const { year, month, day } = BalanceISODate(yearParam, monthParam, dayParam + deltaDays);
  return { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
}
function BalanceTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam) {
  let hour = hourParam;
  let minute = minuteParam;
  let second = secondParam;
  let millisecond = millisecondParam;
  let microsecond = microsecondParam;
  let nanosecond = nanosecondParam;
  if (!NumberIsFinite(hour) || !NumberIsFinite(minute) || !NumberIsFinite(second) || !NumberIsFinite(millisecond) || !NumberIsFinite(microsecond) || !NumberIsFinite(nanosecond)) {
    throw new RangeError("infinity is out of range");
  }
  microsecond += MathFloor(nanosecond / 1e3);
  nanosecond = NonNegativeModulo(nanosecond, 1e3);
  millisecond += MathFloor(microsecond / 1e3);
  microsecond = NonNegativeModulo(microsecond, 1e3);
  second += MathFloor(millisecond / 1e3);
  millisecond = NonNegativeModulo(millisecond, 1e3);
  minute += MathFloor(second / 60);
  second = NonNegativeModulo(second, 60);
  hour += MathFloor(minute / 60);
  minute = NonNegativeModulo(minute, 60);
  const deltaDays = MathFloor(hour / 24);
  hour = NonNegativeModulo(hour, 24);
  return { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond };
}
function TotalDurationNanoseconds(daysParam, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam, offsetShift) {
  const days = (0, import_big_integer.default)(daysParam);
  let nanoseconds = (0, import_big_integer.default)(nanosecondsParam);
  if (daysParam !== 0)
    nanoseconds = (0, import_big_integer.default)(nanosecondsParam).subtract(offsetShift);
  const hours = (0, import_big_integer.default)(hoursParam).add((0, import_big_integer.default)(days).multiply(24));
  const minutes = (0, import_big_integer.default)(minutesParam).add(hours.multiply(60));
  const seconds = (0, import_big_integer.default)(secondsParam).add(minutes.multiply(60));
  const milliseconds = (0, import_big_integer.default)(millisecondsParam).add(seconds.multiply(1e3));
  const microseconds = (0, import_big_integer.default)(microsecondsParam).add(milliseconds.multiply(1e3));
  return (0, import_big_integer.default)(nanoseconds).add(microseconds.multiply(1e3));
}
function NanosecondsToDays(nanosecondsParam, relativeTo) {
  const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
  const sign = MathSign(nanosecondsParam.toJSNumber());
  let nanoseconds = (0, import_big_integer.default)(nanosecondsParam);
  let dayLengthNs = 864e11;
  if (sign === 0)
    return { days: 0, nanoseconds: import_big_integer.default.zero, dayLengthNs };
  if (!IsTemporalZonedDateTime(relativeTo)) {
    let days2;
    ({ quotient: days2, remainder: nanoseconds } = nanoseconds.divmod(dayLengthNs));
    days2 = days2.toJSNumber();
    return { days: days2, nanoseconds, dayLengthNs };
  }
  const startNs = GetSlot(relativeTo, EPOCHNANOSECONDS);
  const start = GetSlot(relativeTo, INSTANT);
  const endNs = startNs.add(nanoseconds);
  const end = new TemporalInstant(endNs);
  const timeZone2 = GetSlot(relativeTo, TIME_ZONE);
  const calendar2 = GetSlot(relativeTo, CALENDAR);
  const dtStart = BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, start, calendar2);
  const dtEnd = BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, end, calendar2);
  let { days } = DifferenceISODateTime(GetSlot(dtStart, ISO_YEAR), GetSlot(dtStart, ISO_MONTH), GetSlot(dtStart, ISO_DAY), GetSlot(dtStart, ISO_HOUR), GetSlot(dtStart, ISO_MINUTE), GetSlot(dtStart, ISO_SECOND), GetSlot(dtStart, ISO_MILLISECOND), GetSlot(dtStart, ISO_MICROSECOND), GetSlot(dtStart, ISO_NANOSECOND), GetSlot(dtEnd, ISO_YEAR), GetSlot(dtEnd, ISO_MONTH), GetSlot(dtEnd, ISO_DAY), GetSlot(dtEnd, ISO_HOUR), GetSlot(dtEnd, ISO_MINUTE), GetSlot(dtEnd, ISO_SECOND), GetSlot(dtEnd, ISO_MILLISECOND), GetSlot(dtEnd, ISO_MICROSECOND), GetSlot(dtEnd, ISO_NANOSECOND), calendar2, "day");
  let intermediateNs = AddZonedDateTime(start, timeZone2, calendar2, 0, 0, 0, days, 0, 0, 0, 0, 0, 0);
  if (sign === 1) {
    while (days > 0 && intermediateNs.greater(endNs)) {
      --days;
      intermediateNs = AddZonedDateTime(start, timeZone2, calendar2, 0, 0, 0, days, 0, 0, 0, 0, 0, 0);
    }
  }
  nanoseconds = endNs.subtract(intermediateNs);
  let isOverflow = false;
  let relativeInstant = new TemporalInstant(intermediateNs);
  do {
    const oneDayFartherNs = AddZonedDateTime(relativeInstant, timeZone2, calendar2, 0, 0, 0, sign, 0, 0, 0, 0, 0, 0);
    const relativeNs = GetSlot(relativeInstant, EPOCHNANOSECONDS);
    dayLengthNs = oneDayFartherNs.subtract(relativeNs).toJSNumber();
    isOverflow = nanoseconds.subtract(dayLengthNs).multiply(sign).geq(0);
    if (isOverflow) {
      nanoseconds = nanoseconds.subtract(dayLengthNs);
      relativeInstant = new TemporalInstant(oneDayFartherNs);
      days += sign;
    }
  } while (isOverflow);
  return { days, nanoseconds, dayLengthNs: MathAbs(dayLengthNs) };
}
function BalanceDuration(daysParam, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam, largestUnit, relativeTo = void 0) {
  let days = daysParam;
  let nanosecondsBigInt, microsecondsBigInt, millisecondsBigInt, secondsBigInt, minutesBigInt, hoursBigInt;
  if (IsTemporalZonedDateTime(relativeTo)) {
    const endNs = AddZonedDateTime(GetSlot(relativeTo, INSTANT), GetSlot(relativeTo, TIME_ZONE), GetSlot(relativeTo, CALENDAR), 0, 0, 0, days, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam);
    const startNs = GetSlot(relativeTo, EPOCHNANOSECONDS);
    nanosecondsBigInt = endNs.subtract(startNs);
  } else {
    nanosecondsBigInt = TotalDurationNanoseconds(days, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam, 0);
  }
  if (largestUnit === "year" || largestUnit === "month" || largestUnit === "week" || largestUnit === "day") {
    ({ days, nanoseconds: nanosecondsBigInt } = NanosecondsToDays(nanosecondsBigInt, relativeTo));
  } else {
    days = 0;
  }
  const sign = nanosecondsBigInt.lesser(0) ? -1 : 1;
  nanosecondsBigInt = nanosecondsBigInt.abs();
  microsecondsBigInt = millisecondsBigInt = secondsBigInt = minutesBigInt = hoursBigInt = import_big_integer.default.zero;
  switch (largestUnit) {
    case "year":
    case "month":
    case "week":
    case "day":
    case "hour":
      ({ quotient: microsecondsBigInt, remainder: nanosecondsBigInt } = nanosecondsBigInt.divmod(1e3));
      ({ quotient: millisecondsBigInt, remainder: microsecondsBigInt } = microsecondsBigInt.divmod(1e3));
      ({ quotient: secondsBigInt, remainder: millisecondsBigInt } = millisecondsBigInt.divmod(1e3));
      ({ quotient: minutesBigInt, remainder: secondsBigInt } = secondsBigInt.divmod(60));
      ({ quotient: hoursBigInt, remainder: minutesBigInt } = minutesBigInt.divmod(60));
      break;
    case "minute":
      ({ quotient: microsecondsBigInt, remainder: nanosecondsBigInt } = nanosecondsBigInt.divmod(1e3));
      ({ quotient: millisecondsBigInt, remainder: microsecondsBigInt } = microsecondsBigInt.divmod(1e3));
      ({ quotient: secondsBigInt, remainder: millisecondsBigInt } = millisecondsBigInt.divmod(1e3));
      ({ quotient: minutesBigInt, remainder: secondsBigInt } = secondsBigInt.divmod(60));
      break;
    case "second":
      ({ quotient: microsecondsBigInt, remainder: nanosecondsBigInt } = nanosecondsBigInt.divmod(1e3));
      ({ quotient: millisecondsBigInt, remainder: microsecondsBigInt } = microsecondsBigInt.divmod(1e3));
      ({ quotient: secondsBigInt, remainder: millisecondsBigInt } = millisecondsBigInt.divmod(1e3));
      break;
    case "millisecond":
      ({ quotient: microsecondsBigInt, remainder: nanosecondsBigInt } = nanosecondsBigInt.divmod(1e3));
      ({ quotient: millisecondsBigInt, remainder: microsecondsBigInt } = microsecondsBigInt.divmod(1e3));
      break;
    case "microsecond":
      ({ quotient: microsecondsBigInt, remainder: nanosecondsBigInt } = nanosecondsBigInt.divmod(1e3));
      break;
    case "nanosecond":
      break;
    default:
      throw new Error("assert not reached");
  }
  const hours = hoursBigInt.toJSNumber() * sign;
  const minutes = minutesBigInt.toJSNumber() * sign;
  const seconds = secondsBigInt.toJSNumber() * sign;
  const milliseconds = millisecondsBigInt.toJSNumber() * sign;
  const microseconds = microsecondsBigInt.toJSNumber() * sign;
  const nanoseconds = nanosecondsBigInt.toJSNumber() * sign;
  return { days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function UnbalanceDurationRelative(yearsParam, monthsParam, weeksParam, daysParam, largestUnit, relativeToParam) {
  let years = yearsParam;
  let months = monthsParam;
  let weeks = weeksParam;
  let days = daysParam;
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  const sign = DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  let calendar2;
  let relativeTo;
  if (relativeToParam) {
    relativeTo = ToTemporalDate(relativeToParam);
    calendar2 = GetSlot(relativeTo, CALENDAR);
  }
  const oneYear = new TemporalDuration(sign);
  const oneMonth = new TemporalDuration(0, sign);
  const oneWeek = new TemporalDuration(0, 0, sign);
  switch (largestUnit) {
    case "year":
      break;
    case "month":
      {
        if (!calendar2)
          throw new RangeError("a starting point is required for months balancing");
        const dateAdd = calendar2.dateAdd;
        const dateUntil = calendar2.dateUntil;
        let relativeToDateOnly = relativeTo;
        while (MathAbs(years) > 0) {
          const addOptions = ObjectCreate$2(null);
          const newRelativeTo = CalendarDateAdd(calendar2, relativeToDateOnly, oneYear, addOptions, dateAdd);
          const untilOptions = ObjectCreate$2(null);
          untilOptions.largestUnit = "month";
          const untilResult = CalendarDateUntil(calendar2, relativeToDateOnly, newRelativeTo, untilOptions, dateUntil);
          const oneYearMonths = GetSlot(untilResult, MONTHS);
          relativeToDateOnly = newRelativeTo;
          months += oneYearMonths;
          years -= sign;
        }
      }
      break;
    case "week":
      if (!calendar2)
        throw new RangeError("a starting point is required for weeks balancing");
      while (MathAbs(years) > 0) {
        let oneYearDays;
        ({ relativeTo, days: oneYearDays } = MoveRelativeDate(calendar2, relativeTo, oneYear));
        days += oneYearDays;
        years -= sign;
      }
      while (MathAbs(months) > 0) {
        let oneMonthDays;
        ({ relativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
        days += oneMonthDays;
        months -= sign;
      }
      break;
    default:
      while (MathAbs(years) > 0) {
        if (!calendar2)
          throw new RangeError("a starting point is required for balancing calendar units");
        let oneYearDays;
        ({ relativeTo, days: oneYearDays } = MoveRelativeDate(calendar2, relativeTo, oneYear));
        days += oneYearDays;
        years -= sign;
      }
      while (MathAbs(months) > 0) {
        if (!calendar2)
          throw new RangeError("a starting point is required for balancing calendar units");
        let oneMonthDays;
        ({ relativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
        days += oneMonthDays;
        months -= sign;
      }
      while (MathAbs(weeks) > 0) {
        if (!calendar2)
          throw new RangeError("a starting point is required for balancing calendar units");
        let oneWeekDays;
        ({ relativeTo, days: oneWeekDays } = MoveRelativeDate(calendar2, relativeTo, oneWeek));
        days += oneWeekDays;
        weeks -= sign;
      }
      break;
  }
  return { years, months, weeks, days };
}
function BalanceDurationRelative(yearsParam, monthsParam, weeksParam, daysParam, largestUnit, relativeToParam) {
  let years = yearsParam;
  let months = monthsParam;
  let weeks = weeksParam;
  let days = daysParam;
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  const sign = DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  if (sign === 0)
    return { years, months, weeks, days };
  let calendar2;
  let relativeTo;
  if (relativeToParam) {
    relativeTo = ToTemporalDate(relativeToParam);
    calendar2 = GetSlot(relativeTo, CALENDAR);
  }
  const oneYear = new TemporalDuration(sign);
  const oneMonth = new TemporalDuration(0, sign);
  const oneWeek = new TemporalDuration(0, 0, sign);
  switch (largestUnit) {
    case "year": {
      if (!calendar2)
        throw new RangeError("a starting point is required for years balancing");
      let newRelativeTo, oneYearDays;
      ({ relativeTo: newRelativeTo, days: oneYearDays } = MoveRelativeDate(calendar2, relativeTo, oneYear));
      while (MathAbs(days) >= MathAbs(oneYearDays)) {
        days -= oneYearDays;
        years += sign;
        relativeTo = newRelativeTo;
        ({ relativeTo: newRelativeTo, days: oneYearDays } = MoveRelativeDate(calendar2, relativeTo, oneYear));
      }
      let oneMonthDays;
      ({ relativeTo: newRelativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      while (MathAbs(days) >= MathAbs(oneMonthDays)) {
        days -= oneMonthDays;
        months += sign;
        relativeTo = newRelativeTo;
        ({ relativeTo: newRelativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      }
      const dateAdd = calendar2.dateAdd;
      const addOptions = ObjectCreate$2(null);
      newRelativeTo = CalendarDateAdd(calendar2, relativeTo, oneYear, addOptions, dateAdd);
      const dateUntil = calendar2.dateUntil;
      const untilOptions = ObjectCreate$2(null);
      untilOptions.largestUnit = "month";
      let untilResult = CalendarDateUntil(calendar2, relativeTo, newRelativeTo, untilOptions, dateUntil);
      let oneYearMonths = GetSlot(untilResult, MONTHS);
      while (MathAbs(months) >= MathAbs(oneYearMonths)) {
        months -= oneYearMonths;
        years += sign;
        relativeTo = newRelativeTo;
        const addOptions2 = ObjectCreate$2(null);
        newRelativeTo = CalendarDateAdd(calendar2, relativeTo, oneYear, addOptions2, dateAdd);
        const untilOptions2 = ObjectCreate$2(null);
        untilOptions2.largestUnit = "month";
        untilResult = CalendarDateUntil(calendar2, relativeTo, newRelativeTo, untilOptions2, dateUntil);
        oneYearMonths = GetSlot(untilResult, MONTHS);
      }
      break;
    }
    case "month": {
      if (!calendar2)
        throw new RangeError("a starting point is required for months balancing");
      let newRelativeTo, oneMonthDays;
      ({ relativeTo: newRelativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      while (MathAbs(days) >= MathAbs(oneMonthDays)) {
        days -= oneMonthDays;
        months += sign;
        relativeTo = newRelativeTo;
        ({ relativeTo: newRelativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      }
      break;
    }
    case "week": {
      if (!calendar2)
        throw new RangeError("a starting point is required for weeks balancing");
      let newRelativeTo, oneWeekDays;
      ({ relativeTo: newRelativeTo, days: oneWeekDays } = MoveRelativeDate(calendar2, relativeTo, oneWeek));
      while (MathAbs(days) >= MathAbs(oneWeekDays)) {
        days -= oneWeekDays;
        weeks += sign;
        relativeTo = newRelativeTo;
        ({ relativeTo: newRelativeTo, days: oneWeekDays } = MoveRelativeDate(calendar2, relativeTo, oneWeek));
      }
      break;
    }
  }
  return { years, months, weeks, days };
}
function CalculateOffsetShift(relativeTo, y, mon, w, d, h, min, s, ms, \u00B5s, ns) {
  if (IsTemporalZonedDateTime(relativeTo)) {
    const instant2 = GetSlot(relativeTo, INSTANT);
    const timeZone2 = GetSlot(relativeTo, TIME_ZONE);
    const calendar2 = GetSlot(relativeTo, CALENDAR);
    const offsetBefore = GetOffsetNanosecondsFor(timeZone2, instant2);
    const after = AddZonedDateTime(instant2, timeZone2, calendar2, y, mon, w, d, h, min, s, ms, \u00B5s, ns);
    const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
    const instantAfter = new TemporalInstant(after);
    const offsetAfter = GetOffsetNanosecondsFor(timeZone2, instantAfter);
    return offsetAfter - offsetBefore;
  }
  return 0;
}
function CreateNegatedTemporalDuration(duration2) {
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  return new TemporalDuration(-GetSlot(duration2, YEARS), -GetSlot(duration2, MONTHS), -GetSlot(duration2, WEEKS), -GetSlot(duration2, DAYS), -GetSlot(duration2, HOURS), -GetSlot(duration2, MINUTES), -GetSlot(duration2, SECONDS), -GetSlot(duration2, MILLISECONDS), -GetSlot(duration2, MICROSECONDS), -GetSlot(duration2, NANOSECONDS));
}
function ConstrainToRange(value, min, max) {
  return MathMin(max, MathMax(min, value));
}
function ConstrainISODate(year, monthParam, dayParam) {
  const month = ConstrainToRange(monthParam, 1, 12);
  const day = ConstrainToRange(dayParam, 1, ISODaysInMonth(year, month));
  return { year, month, day };
}
function ConstrainTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam) {
  const hour = ConstrainToRange(hourParam, 0, 23);
  const minute = ConstrainToRange(minuteParam, 0, 59);
  const second = ConstrainToRange(secondParam, 0, 59);
  const millisecond = ConstrainToRange(millisecondParam, 0, 999);
  const microsecond = ConstrainToRange(microsecondParam, 0, 999);
  const nanosecond = ConstrainToRange(nanosecondParam, 0, 999);
  return { hour, minute, second, millisecond, microsecond, nanosecond };
}
function RejectToRange(value, min, max) {
  if (value < min || value > max)
    throw new RangeError(`value out of range: ${min} <= ${value} <= ${max}`);
}
function RejectISODate(year, month, day) {
  RejectToRange(month, 1, 12);
  RejectToRange(day, 1, ISODaysInMonth(year, month));
}
function RejectDateRange(year, month, day) {
  RejectDateTimeRange(year, month, day, 12, 0, 0, 0, 0, 0);
}
function RejectTime(hour, minute, second, millisecond, microsecond, nanosecond) {
  RejectToRange(hour, 0, 23);
  RejectToRange(minute, 0, 59);
  RejectToRange(second, 0, 59);
  RejectToRange(millisecond, 0, 999);
  RejectToRange(microsecond, 0, 999);
  RejectToRange(nanosecond, 0, 999);
}
function RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
  RejectISODate(year, month, day);
  RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
}
function RejectDateTimeRange(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
  RejectToRange(year, YEAR_MIN, YEAR_MAX);
  if (year === YEAR_MIN && GetEpochFromISOParts(year, month, day + 1, hour, minute, second, millisecond, microsecond, nanosecond - 1) == null || year === YEAR_MAX && GetEpochFromISOParts(year, month, day - 1, hour, minute, second, millisecond, microsecond, nanosecond + 1) == null) {
    throw new RangeError("DateTime outside of supported range");
  }
}
function ValidateEpochNanoseconds(epochNanoseconds) {
  if (epochNanoseconds.lesser(NS_MIN) || epochNanoseconds.greater(NS_MAX)) {
    throw new RangeError("Instant outside of supported range");
  }
}
function RejectYearMonthRange(year, month) {
  RejectToRange(year, YEAR_MIN, YEAR_MAX);
  if (year === YEAR_MIN) {
    RejectToRange(month, 4, 12);
  } else if (year === YEAR_MAX) {
    RejectToRange(month, 1, 9);
  }
}
function RejectDuration(y, mon, w, d, h, min, s, ms, \u00B5s, ns) {
  const sign = DurationSign(y, mon, w, d, h, min, s, ms, \u00B5s, ns);
  for (const prop of [y, mon, w, d, h, min, s, ms, \u00B5s, ns]) {
    if (!NumberIsFinite(prop))
      throw new RangeError("infinite values not allowed as duration fields");
    const propSign = MathSign(prop);
    if (propSign !== 0 && propSign !== sign)
      throw new RangeError("mixed-sign values not allowed as duration fields");
  }
}
function DifferenceISODate(y1, m1, d1, y2, m2, d2, largestUnit) {
  switch (largestUnit) {
    case "year":
    case "month": {
      const sign = -CompareISODate(y1, m1, d1, y2, m2, d2);
      if (sign === 0)
        return { years: 0, months: 0, weeks: 0, days: 0 };
      const start = { year: y1, month: m1, day: d1 };
      const end = { year: y2, month: m2, day: d2 };
      let years = end.year - start.year;
      let mid = AddISODate(y1, m1, d1, years, 0, 0, 0, "constrain");
      let midSign = -CompareISODate(mid.year, mid.month, mid.day, y2, m2, d2);
      if (midSign === 0) {
        return largestUnit === "year" ? { years, months: 0, weeks: 0, days: 0 } : { years: 0, months: years * 12, weeks: 0, days: 0 };
      }
      let months = end.month - start.month;
      if (midSign !== sign) {
        years -= sign;
        months += sign * 12;
      }
      mid = AddISODate(y1, m1, d1, years, months, 0, 0, "constrain");
      midSign = -CompareISODate(mid.year, mid.month, mid.day, y2, m2, d2);
      if (midSign === 0) {
        return largestUnit === "year" ? { years, months, weeks: 0, days: 0 } : { years: 0, months: months + years * 12, weeks: 0, days: 0 };
      }
      if (midSign !== sign) {
        months -= sign;
        if (months === -sign) {
          years -= sign;
          months = 11 * sign;
        }
        mid = AddISODate(y1, m1, d1, years, months, 0, 0, "constrain");
        midSign = -CompareISODate(y1, m1, d1, mid.year, mid.month, mid.day);
      }
      let days = 0;
      if (mid.month === end.month) {
        days = end.day - mid.day;
      } else if (sign < 0) {
        days = -mid.day - (ISODaysInMonth(end.year, end.month) - end.day);
      } else {
        days = end.day + (ISODaysInMonth(mid.year, mid.month) - mid.day);
      }
      if (largestUnit === "month") {
        months += years * 12;
        years = 0;
      }
      return { years, months, weeks: 0, days };
    }
    case "week":
    case "day": {
      let larger, smaller, sign;
      if (CompareISODate(y1, m1, d1, y2, m2, d2) < 0) {
        smaller = { year: y1, month: m1, day: d1 };
        larger = { year: y2, month: m2, day: d2 };
        sign = 1;
      } else {
        smaller = { year: y2, month: m2, day: d2 };
        larger = { year: y1, month: m1, day: d1 };
        sign = -1;
      }
      let days = DayOfYear(larger.year, larger.month, larger.day) - DayOfYear(smaller.year, smaller.month, smaller.day);
      for (let year = smaller.year; year < larger.year; ++year) {
        days += LeapYear(year) ? 366 : 365;
      }
      let weeks = 0;
      if (largestUnit === "week") {
        weeks = MathFloor(days / 7);
        days %= 7;
      }
      weeks *= sign;
      days *= sign;
      return { years: 0, months: 0, weeks, days };
    }
    default:
      throw new Error("assert not reached");
  }
}
function DifferenceTime(h1, min1, s1, ms1, \u00B5s1, ns1, h2, min2, s2, ms2, \u00B5s2, ns2) {
  let hours = h2 - h1;
  let minutes = min2 - min1;
  let seconds = s2 - s1;
  let milliseconds = ms2 - ms1;
  let microseconds = \u00B5s2 - \u00B5s1;
  let nanoseconds = ns2 - ns1;
  const sign = DurationSign(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  hours *= sign;
  minutes *= sign;
  seconds *= sign;
  milliseconds *= sign;
  microseconds *= sign;
  nanoseconds *= sign;
  let deltaDays = 0;
  ({
    deltaDays,
    hour: hours,
    minute: minutes,
    second: seconds,
    millisecond: milliseconds,
    microsecond: microseconds,
    nanosecond: nanoseconds
  } = BalanceTime(hours, minutes, seconds, milliseconds, microseconds, nanoseconds));
  deltaDays *= sign;
  hours *= sign;
  minutes *= sign;
  seconds *= sign;
  milliseconds *= sign;
  microseconds *= sign;
  nanoseconds *= sign;
  return { deltaDays, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function DifferenceInstant(ns1, ns2, increment, unit, roundingMode) {
  const diff = ns2.minus(ns1);
  const remainder = diff.mod(864e11);
  const wholeDays = diff.minus(remainder);
  const roundedRemainder = RoundNumberToIncrement(remainder, nsPerTimeUnit[unit] * increment, roundingMode);
  const roundedDiff = wholeDays.plus(roundedRemainder);
  const nanoseconds = +roundedDiff.mod(1e3);
  const microseconds = +roundedDiff.divide(1e3).mod(1e3);
  const milliseconds = +roundedDiff.divide(1e6).mod(1e3);
  const seconds = +roundedDiff.divide(1e9);
  return { seconds, milliseconds, microseconds, nanoseconds };
}
function DifferenceISODateTime(y1Param, mon1Param, d1Param, h1, min1, s1, ms1, \u00B5s1, ns1, y2, mon2, d2, h2, min2, s2, ms2, \u00B5s2, ns2, calendar2, largestUnit, options = ObjectCreate$2(null)) {
  let y1 = y1Param;
  let mon1 = mon1Param;
  let d1 = d1Param;
  let { deltaDays, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceTime(h1, min1, s1, ms1, \u00B5s1, ns1, h2, min2, s2, ms2, \u00B5s2, ns2);
  const timeSign = DurationSign(0, 0, 0, deltaDays, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  ({ year: y1, month: mon1, day: d1 } = BalanceISODate(y1, mon1, d1 + deltaDays));
  const dateSign = CompareISODate(y2, mon2, d2, y1, mon1, d1);
  if (dateSign === -timeSign) {
    ({ year: y1, month: mon1, day: d1 } = BalanceISODate(y1, mon1, d1 - timeSign));
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(-timeSign, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
  }
  const date1 = CreateTemporalDate(y1, mon1, d1, calendar2);
  const date2 = CreateTemporalDate(y2, mon2, d2, calendar2);
  const dateLargestUnit = LargerOfTwoTemporalUnits("day", largestUnit);
  const untilOptions = { ...options, largestUnit: dateLargestUnit };
  let { years, months, weeks, days } = CalendarDateUntil(calendar2, date1, date2, untilOptions);
  ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function DifferenceZonedDateTime(ns1, ns2, timeZone2, calendar2, largestUnit, options) {
  const nsDiff = ns2.subtract(ns1);
  if (nsDiff.isZero()) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      microseconds: 0,
      nanoseconds: 0
    };
  }
  const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
  const start = new TemporalInstant(ns1);
  const end = new TemporalInstant(ns2);
  const dtStart = BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, start, calendar2);
  const dtEnd = BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, end, calendar2);
  let { years, months, weeks, days } = DifferenceISODateTime(GetSlot(dtStart, ISO_YEAR), GetSlot(dtStart, ISO_MONTH), GetSlot(dtStart, ISO_DAY), GetSlot(dtStart, ISO_HOUR), GetSlot(dtStart, ISO_MINUTE), GetSlot(dtStart, ISO_SECOND), GetSlot(dtStart, ISO_MILLISECOND), GetSlot(dtStart, ISO_MICROSECOND), GetSlot(dtStart, ISO_NANOSECOND), GetSlot(dtEnd, ISO_YEAR), GetSlot(dtEnd, ISO_MONTH), GetSlot(dtEnd, ISO_DAY), GetSlot(dtEnd, ISO_HOUR), GetSlot(dtEnd, ISO_MINUTE), GetSlot(dtEnd, ISO_SECOND), GetSlot(dtEnd, ISO_MILLISECOND), GetSlot(dtEnd, ISO_MICROSECOND), GetSlot(dtEnd, ISO_NANOSECOND), calendar2, largestUnit, options);
  const intermediateNs = AddZonedDateTime(start, timeZone2, calendar2, years, months, weeks, 0, 0, 0, 0, 0, 0, 0);
  let timeRemainderNs = ns2.subtract(intermediateNs);
  const intermediate = CreateTemporalZonedDateTime(intermediateNs, timeZone2, calendar2);
  ({ nanoseconds: timeRemainderNs, days } = NanosecondsToDays(timeRemainderNs, intermediate));
  const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, 0, 0, 0, timeRemainderNs.toJSNumber(), "hour");
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function AddISODate(yearParam, monthParam, dayParam, yearsParam, monthsParam, weeksParam, daysParam, overflow) {
  let year = yearParam;
  let month = monthParam;
  let day = dayParam;
  let years = yearsParam;
  let months = monthsParam;
  let weeks = weeksParam;
  let days = daysParam;
  year += years;
  month += months;
  ({ year, month } = BalanceISOYearMonth(year, month));
  ({ year, month, day } = RegulateISODate(year, month, day, overflow));
  days += 7 * weeks;
  day += days;
  ({ year, month, day } = BalanceISODate(year, month, day));
  return { year, month, day };
}
function AddTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
  let hour = hourParam;
  let minute = minuteParam;
  let second = secondParam;
  let millisecond = millisecondParam;
  let microsecond = microsecondParam;
  let nanosecond = nanosecondParam;
  hour += hours;
  minute += minutes;
  second += seconds;
  millisecond += milliseconds;
  microsecond += microseconds;
  nanosecond += nanoseconds;
  let deltaDays = 0;
  ({ deltaDays, hour, minute, second, millisecond, microsecond, nanosecond } = BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond));
  return { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond };
}
function AddDuration(y1, mon1, w1, d1, h1, min1, s1, ms1, \u00B5s1, ns1, y2, mon2, w2, d2, h2, min2, s2, ms2, \u00B5s2, ns2, relativeTo) {
  const largestUnit1 = DefaultTemporalLargestUnit(y1, mon1, w1, d1, h1, min1, s1, ms1, \u00B5s1, ns1);
  const largestUnit2 = DefaultTemporalLargestUnit(y2, mon2, w2, d2, h2, min2, s2, ms2, \u00B5s2, ns2);
  const largestUnit = LargerOfTwoTemporalUnits(largestUnit1, largestUnit2);
  let years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds;
  if (!relativeTo) {
    if (largestUnit === "year" || largestUnit === "month" || largestUnit === "week") {
      throw new RangeError("relativeTo is required for years, months, or weeks arithmetic");
    }
    years = months = weeks = 0;
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(d1 + d2, h1 + h2, min1 + min2, s1 + s2, ms1 + ms2, \u00B5s1 + \u00B5s2, ns1 + ns2, largestUnit));
  } else if (IsTemporalDate(relativeTo)) {
    const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
    const calendar2 = GetSlot(relativeTo, CALENDAR);
    const dateDuration1 = new TemporalDuration(y1, mon1, w1, d1, 0, 0, 0, 0, 0, 0);
    const dateDuration2 = new TemporalDuration(y2, mon2, w2, d2, 0, 0, 0, 0, 0, 0);
    const dateAdd = calendar2.dateAdd;
    const firstAddOptions = ObjectCreate$2(null);
    const intermediate = CalendarDateAdd(calendar2, relativeTo, dateDuration1, firstAddOptions, dateAdd);
    const secondAddOptions = ObjectCreate$2(null);
    const end = CalendarDateAdd(calendar2, intermediate, dateDuration2, secondAddOptions, dateAdd);
    const dateLargestUnit = LargerOfTwoTemporalUnits("day", largestUnit);
    const differenceOptions = ObjectCreate$2(null);
    differenceOptions.largestUnit = dateLargestUnit;
    ({ years, months, weeks, days } = CalendarDateUntil(calendar2, relativeTo, end, differenceOptions));
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, h1 + h2, min1 + min2, s1 + s2, ms1 + ms2, \u00B5s1 + \u00B5s2, ns1 + ns2, largestUnit));
  } else {
    const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
    const timeZone2 = GetSlot(relativeTo, TIME_ZONE);
    const calendar2 = GetSlot(relativeTo, CALENDAR);
    const intermediateNs = AddZonedDateTime(GetSlot(relativeTo, INSTANT), timeZone2, calendar2, y1, mon1, w1, d1, h1, min1, s1, ms1, \u00B5s1, ns1);
    const endNs = AddZonedDateTime(new TemporalInstant(intermediateNs), timeZone2, calendar2, y2, mon2, w2, d2, h2, min2, s2, ms2, \u00B5s2, ns2);
    if (largestUnit !== "year" && largestUnit !== "month" && largestUnit !== "week" && largestUnit !== "day") {
      years = 0;
      months = 0;
      weeks = 0;
      days = 0;
      ({ seconds, milliseconds, microseconds, nanoseconds } = DifferenceInstant(GetSlot(relativeTo, EPOCHNANOSECONDS), endNs, 1, "nanosecond", "halfExpand"));
      ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    } else {
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceZonedDateTime(GetSlot(relativeTo, EPOCHNANOSECONDS), endNs, timeZone2, calendar2, largestUnit));
    }
  }
  RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function AddInstant(epochNanoseconds, h, min, s, ms, \u00B5s, ns) {
  let sum = import_big_integer.default.zero;
  sum = sum.plus((0, import_big_integer.default)(ns));
  sum = sum.plus((0, import_big_integer.default)(\u00B5s).multiply(1e3));
  sum = sum.plus((0, import_big_integer.default)(ms).multiply(1e6));
  sum = sum.plus((0, import_big_integer.default)(s).multiply(1e9));
  sum = sum.plus((0, import_big_integer.default)(min).multiply(60 * 1e9));
  sum = sum.plus((0, import_big_integer.default)(h).multiply(60 * 60 * 1e9));
  const result = (0, import_big_integer.default)(epochNanoseconds).plus(sum);
  ValidateEpochNanoseconds(result);
  return result;
}
function AddDateTime(year, month, day, hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, calendar2, years, months, weeks, daysParam, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, options) {
  let days = daysParam;
  let { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond } = AddTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  days += deltaDays;
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  const datePart = CreateTemporalDate(year, month, day, calendar2);
  const dateDuration = new TemporalDuration(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  const addedDate = CalendarDateAdd(calendar2, datePart, dateDuration, options);
  return {
    year: GetSlot(addedDate, ISO_YEAR),
    month: GetSlot(addedDate, ISO_MONTH),
    day: GetSlot(addedDate, ISO_DAY),
    hour,
    minute,
    second,
    millisecond,
    microsecond,
    nanosecond
  };
}
function AddZonedDateTime(instant2, timeZone2, calendar2, years, months, weeks, days, h, min, s, ms, \u00B5s, ns, options) {
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  if (DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0) === 0) {
    return AddInstant(GetSlot(instant2, EPOCHNANOSECONDS), h, min, s, ms, \u00B5s, ns);
  }
  const dt = BuiltinTimeZoneGetPlainDateTimeFor(timeZone2, instant2, calendar2);
  const datePart = CreateTemporalDate(GetSlot(dt, ISO_YEAR), GetSlot(dt, ISO_MONTH), GetSlot(dt, ISO_DAY), calendar2);
  const dateDuration = new TemporalDuration(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  const addedDate = CalendarDateAdd(calendar2, datePart, dateDuration, options);
  const dtIntermediate = CreateTemporalDateTime(GetSlot(addedDate, ISO_YEAR), GetSlot(addedDate, ISO_MONTH), GetSlot(addedDate, ISO_DAY), GetSlot(dt, ISO_HOUR), GetSlot(dt, ISO_MINUTE), GetSlot(dt, ISO_SECOND), GetSlot(dt, ISO_MILLISECOND), GetSlot(dt, ISO_MICROSECOND), GetSlot(dt, ISO_NANOSECOND), calendar2);
  const instantIntermediate = BuiltinTimeZoneGetInstantFor(timeZone2, dtIntermediate, "compatible");
  return AddInstant(GetSlot(instantIntermediate, EPOCHNANOSECONDS), h, min, s, ms, \u00B5s, ns);
}
function RoundNumberToIncrement(quantity, increment, mode) {
  if (increment === 1)
    return quantity;
  let { quotient, remainder } = quantity.divmod(increment);
  if (remainder.equals(import_big_integer.default.zero))
    return quantity;
  const sign = remainder.lt(import_big_integer.default.zero) ? -1 : 1;
  switch (mode) {
    case "ceil":
      if (sign > 0)
        quotient = quotient.add(sign);
      break;
    case "floor":
      if (sign < 0)
        quotient = quotient.add(sign);
      break;
    case "trunc":
      break;
    case "halfExpand":
      if (remainder.multiply(2).abs().toJSNumber() >= increment)
        quotient = quotient.add(sign);
      break;
  }
  return quotient.multiply(increment);
}
function RoundInstant(epochNs, increment, unit, roundingMode) {
  let remainder = epochNs.mod(864e11);
  if (remainder.lesser(0))
    remainder = remainder.plus(864e11);
  const wholeDays = epochNs.minus(remainder);
  const roundedRemainder = RoundNumberToIncrement(remainder, nsPerTimeUnit[unit] * increment, roundingMode);
  return wholeDays.plus(roundedRemainder);
}
function RoundISODateTime(yearParam, monthParam, dayParam, hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, increment, unit, roundingMode, dayLengthNs = 864e11) {
  const { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond } = RoundTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, increment, unit, roundingMode, dayLengthNs);
  const { year, month, day } = BalanceISODate(yearParam, monthParam, dayParam + deltaDays);
  return { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
}
function RoundTime(hour, minute, second, millisecond, microsecond, nanosecond, increment, unit, roundingMode, dayLengthNs = 864e11) {
  let quantity = import_big_integer.default.zero;
  switch (unit) {
    case "day":
    case "hour":
      quantity = (0, import_big_integer.default)(hour);
    case "minute":
      quantity = quantity.multiply(60).plus(minute);
    case "second":
      quantity = quantity.multiply(60).plus(second);
    case "millisecond":
      quantity = quantity.multiply(1e3).plus(millisecond);
    case "microsecond":
      quantity = quantity.multiply(1e3).plus(microsecond);
    case "nanosecond":
      quantity = quantity.multiply(1e3).plus(nanosecond);
  }
  const nsPerUnit = unit === "day" ? dayLengthNs : nsPerTimeUnit[unit];
  const rounded = RoundNumberToIncrement(quantity, nsPerUnit * increment, roundingMode);
  const result = rounded.divide(nsPerUnit).toJSNumber();
  switch (unit) {
    case "day":
      return { deltaDays: result, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
    case "hour":
      return BalanceTime(result, 0, 0, 0, 0, 0);
    case "minute":
      return BalanceTime(hour, result, 0, 0, 0, 0);
    case "second":
      return BalanceTime(hour, minute, result, 0, 0, 0);
    case "millisecond":
      return BalanceTime(hour, minute, second, result, 0, 0);
    case "microsecond":
      return BalanceTime(hour, minute, second, millisecond, result, 0);
    case "nanosecond":
      return BalanceTime(hour, minute, second, millisecond, microsecond, result);
    default:
      throw new Error(`Invalid unit ${unit}`);
  }
}
function DaysUntil(earlier, later) {
  return DifferenceISODate(GetSlot(earlier, ISO_YEAR), GetSlot(earlier, ISO_MONTH), GetSlot(earlier, ISO_DAY), GetSlot(later, ISO_YEAR), GetSlot(later, ISO_MONTH), GetSlot(later, ISO_DAY), "day").days;
}
function MoveRelativeDate(calendar2, relativeToParam, duration2) {
  const options = ObjectCreate$2(null);
  const later = CalendarDateAdd(calendar2, relativeToParam, duration2, options);
  const days = DaysUntil(relativeToParam, later);
  return { relativeTo: later, days };
}
function MoveRelativeZonedDateTime(relativeTo, years, months, weeks, days) {
  const timeZone2 = GetSlot(relativeTo, TIME_ZONE);
  const calendar2 = GetSlot(relativeTo, CALENDAR);
  const intermediateNs = AddZonedDateTime(GetSlot(relativeTo, INSTANT), timeZone2, calendar2, years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  return CreateTemporalZonedDateTime(intermediateNs, timeZone2, calendar2);
}
function AdjustRoundedDurationDays(yearsParam, monthsParam, weeksParam, daysParam, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam, increment, unit, roundingMode, relativeTo) {
  let years = yearsParam;
  let months = monthsParam;
  let weeks = weeksParam;
  let days = daysParam;
  let hours = hoursParam;
  let minutes = minutesParam;
  let seconds = secondsParam;
  let milliseconds = millisecondsParam;
  let microseconds = microsecondsParam;
  let nanoseconds = nanosecondsParam;
  if (!IsTemporalZonedDateTime(relativeTo) || unit === "year" || unit === "month" || unit === "week" || unit === "day" || unit === "nanosecond" && increment === 1) {
    return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
  }
  let timeRemainderNs = TotalDurationNanoseconds(0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, 0);
  const direction = MathSign(timeRemainderNs.toJSNumber());
  const timeZone2 = GetSlot(relativeTo, TIME_ZONE);
  const calendar2 = GetSlot(relativeTo, CALENDAR);
  const dayStart = AddZonedDateTime(GetSlot(relativeTo, INSTANT), timeZone2, calendar2, years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
  const dayEnd = AddZonedDateTime(new TemporalInstant(dayStart), timeZone2, calendar2, 0, 0, 0, direction, 0, 0, 0, 0, 0, 0);
  const dayLengthNs = dayEnd.subtract(dayStart);
  if (timeRemainderNs.subtract(dayLengthNs).multiply(direction).geq(0)) {
    ({ years, months, weeks, days } = AddDuration(years, months, weeks, days, 0, 0, 0, 0, 0, 0, 0, 0, 0, direction, 0, 0, 0, 0, 0, 0, relativeTo));
    timeRemainderNs = RoundInstant(timeRemainderNs.subtract(dayLengthNs), increment, unit, roundingMode);
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, 0, 0, 0, timeRemainderNs.toJSNumber(), "hour"));
  }
  return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function RoundDuration(yearsParam, monthsParam, weeksParam, daysParam, hoursParam, minutesParam, secondsParam, millisecondsParam, microsecondsParam, nanosecondsParam, increment, unit, roundingMode, relativeToParam = void 0) {
  let years = yearsParam;
  let months = monthsParam;
  let weeks = weeksParam;
  let days = daysParam;
  let hours = hoursParam;
  let minutes = minutesParam;
  let seconds = secondsParam;
  let milliseconds = millisecondsParam;
  let microseconds = microsecondsParam;
  let nanoseconds = (0, import_big_integer.default)(nanosecondsParam);
  const TemporalDuration = GetIntrinsic("%Temporal.Duration%");
  let calendar2, zdtRelative;
  let relativeTo = relativeToParam;
  if (relativeTo) {
    if (IsTemporalZonedDateTime(relativeTo)) {
      zdtRelative = relativeTo;
      relativeTo = ToTemporalDate(relativeTo);
    } else if (!IsTemporalDate(relativeTo)) {
      throw new TypeError("starting point must be PlainDate or ZonedDateTime");
    }
    calendar2 = GetSlot(relativeTo, CALENDAR);
  }
  let dayLengthNs;
  if (unit === "year" || unit === "month" || unit === "week" || unit === "day") {
    nanoseconds = TotalDurationNanoseconds(0, hours, minutes, seconds, milliseconds, microseconds, nanosecondsParam, 0);
    let intermediate;
    if (zdtRelative) {
      intermediate = MoveRelativeZonedDateTime(zdtRelative, years, months, weeks, days);
    }
    let deltaDays;
    ({ days: deltaDays, nanoseconds, dayLengthNs } = NanosecondsToDays(nanoseconds, intermediate));
    days += deltaDays;
    hours = minutes = seconds = milliseconds = microseconds = 0;
  }
  let total;
  switch (unit) {
    case "year": {
      if (!calendar2)
        throw new RangeError("A starting point is required for years rounding");
      const yearsDuration = new TemporalDuration(years);
      const dateAdd = calendar2.dateAdd;
      const firstAddOptions = ObjectCreate$2(null);
      const yearsLater = CalendarDateAdd(calendar2, relativeTo, yearsDuration, firstAddOptions, dateAdd);
      const yearsMonthsWeeks = new TemporalDuration(years, months, weeks);
      const secondAddOptions = ObjectCreate$2(null);
      const yearsMonthsWeeksLater = CalendarDateAdd(calendar2, relativeTo, yearsMonthsWeeks, secondAddOptions, dateAdd);
      const monthsWeeksInDays = DaysUntil(yearsLater, yearsMonthsWeeksLater);
      relativeTo = yearsLater;
      days += monthsWeeksInDays;
      const thirdAddOptions = ObjectCreate$2(null);
      const daysLater = CalendarDateAdd(calendar2, relativeTo, { days }, thirdAddOptions, dateAdd);
      const untilOptions = ObjectCreate$2(null);
      untilOptions.largestUnit = "year";
      const yearsPassed = CalendarDateUntil(calendar2, relativeTo, daysLater, untilOptions).years;
      years += yearsPassed;
      const oldRelativeTo = relativeTo;
      const fourthAddOptions = ObjectCreate$2(null);
      relativeTo = CalendarDateAdd(calendar2, relativeTo, { years: yearsPassed }, fourthAddOptions, dateAdd);
      const daysPassed = DaysUntil(oldRelativeTo, relativeTo);
      days -= daysPassed;
      const oneYear = new TemporalDuration(days < 0 ? -1 : 1);
      let { days: oneYearDays } = MoveRelativeDate(calendar2, relativeTo, oneYear);
      oneYearDays = MathAbs(oneYearDays);
      const divisor = (0, import_big_integer.default)(oneYearDays).multiply(dayLengthNs);
      nanoseconds = divisor.multiply(years).plus((0, import_big_integer.default)(days).multiply(dayLengthNs)).plus(nanoseconds);
      const rounded = RoundNumberToIncrement(nanoseconds, divisor.multiply(increment).toJSNumber(), roundingMode);
      total = nanoseconds.toJSNumber() / divisor.toJSNumber();
      years = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      months = weeks = days = 0;
      break;
    }
    case "month": {
      if (!calendar2)
        throw new RangeError("A starting point is required for months rounding");
      const yearsMonths = new TemporalDuration(years, months);
      const dateAdd = calendar2.dateAdd;
      const firstAddOptions = ObjectCreate$2(null);
      const yearsMonthsLater = CalendarDateAdd(calendar2, relativeTo, yearsMonths, firstAddOptions, dateAdd);
      const yearsMonthsWeeks = new TemporalDuration(years, months, weeks);
      const secondAddOptions = ObjectCreate$2(null);
      const yearsMonthsWeeksLater = CalendarDateAdd(calendar2, relativeTo, yearsMonthsWeeks, secondAddOptions, dateAdd);
      const weeksInDays = DaysUntil(yearsMonthsLater, yearsMonthsWeeksLater);
      relativeTo = yearsMonthsLater;
      days += weeksInDays;
      const sign = MathSign(days);
      const oneMonth = new TemporalDuration(0, days < 0 ? -1 : 1);
      let oneMonthDays;
      ({ relativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      while (MathAbs(days) >= MathAbs(oneMonthDays)) {
        months += sign;
        days -= oneMonthDays;
        ({ relativeTo, days: oneMonthDays } = MoveRelativeDate(calendar2, relativeTo, oneMonth));
      }
      oneMonthDays = MathAbs(oneMonthDays);
      const divisor = (0, import_big_integer.default)(oneMonthDays).multiply(dayLengthNs);
      nanoseconds = divisor.multiply(months).plus((0, import_big_integer.default)(days).multiply(dayLengthNs)).plus(nanoseconds);
      const rounded = RoundNumberToIncrement(nanoseconds, divisor.multiply(increment).toJSNumber(), roundingMode);
      total = nanoseconds.toJSNumber() / divisor.toJSNumber();
      months = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      weeks = days = 0;
      break;
    }
    case "week": {
      if (!calendar2)
        throw new RangeError("A starting point is required for weeks rounding");
      const sign = MathSign(days);
      const oneWeek = new TemporalDuration(0, 0, days < 0 ? -1 : 1);
      let oneWeekDays;
      ({ relativeTo, days: oneWeekDays } = MoveRelativeDate(calendar2, relativeTo, oneWeek));
      while (MathAbs(days) >= MathAbs(oneWeekDays)) {
        weeks += sign;
        days -= oneWeekDays;
        ({ relativeTo, days: oneWeekDays } = MoveRelativeDate(calendar2, relativeTo, oneWeek));
      }
      oneWeekDays = MathAbs(oneWeekDays);
      const divisor = (0, import_big_integer.default)(oneWeekDays).multiply(dayLengthNs);
      nanoseconds = divisor.multiply(weeks).plus((0, import_big_integer.default)(days).multiply(dayLengthNs)).plus(nanoseconds);
      const rounded = RoundNumberToIncrement(nanoseconds, divisor.multiply(increment).toJSNumber(), roundingMode);
      total = nanoseconds.toJSNumber() / divisor.toJSNumber();
      weeks = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      days = 0;
      break;
    }
    case "day": {
      const divisor = (0, import_big_integer.default)(dayLengthNs);
      nanoseconds = divisor.multiply(days).plus(nanoseconds);
      const rounded = RoundNumberToIncrement(nanoseconds, divisor.multiply(increment).toJSNumber(), roundingMode);
      total = nanoseconds.toJSNumber() / divisor.toJSNumber();
      days = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      break;
    }
    case "hour": {
      const divisor = 36e11;
      nanoseconds = (0, import_big_integer.default)(hours).multiply(36e11).plus((0, import_big_integer.default)(minutes).multiply(6e10)).plus((0, import_big_integer.default)(seconds).multiply(1e9)).plus((0, import_big_integer.default)(milliseconds).multiply(1e6)).plus((0, import_big_integer.default)(microseconds).multiply(1e3)).plus(nanoseconds);
      total = nanoseconds.toJSNumber() / divisor;
      const rounded = RoundNumberToIncrement(nanoseconds, divisor * increment, roundingMode);
      hours = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      minutes = seconds = milliseconds = microseconds = 0;
      break;
    }
    case "minute": {
      const divisor = 6e10;
      nanoseconds = (0, import_big_integer.default)(minutes).multiply(6e10).plus((0, import_big_integer.default)(seconds).multiply(1e9)).plus((0, import_big_integer.default)(milliseconds).multiply(1e6)).plus((0, import_big_integer.default)(microseconds).multiply(1e3)).plus(nanoseconds);
      total = nanoseconds.toJSNumber() / divisor;
      const rounded = RoundNumberToIncrement(nanoseconds, divisor * increment, roundingMode);
      minutes = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      seconds = milliseconds = microseconds = 0;
      break;
    }
    case "second": {
      const divisor = 1e9;
      nanoseconds = (0, import_big_integer.default)(seconds).multiply(1e9).plus((0, import_big_integer.default)(milliseconds).multiply(1e6)).plus((0, import_big_integer.default)(microseconds).multiply(1e3)).plus(nanoseconds);
      total = nanoseconds.toJSNumber() / divisor;
      const rounded = RoundNumberToIncrement(nanoseconds, divisor * increment, roundingMode);
      seconds = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      milliseconds = microseconds = 0;
      break;
    }
    case "millisecond": {
      const divisor = 1e6;
      nanoseconds = (0, import_big_integer.default)(milliseconds).multiply(1e6).plus((0, import_big_integer.default)(microseconds).multiply(1e3)).plus(nanoseconds);
      total = nanoseconds.toJSNumber() / divisor;
      const rounded = RoundNumberToIncrement(nanoseconds, divisor * increment, roundingMode);
      milliseconds = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      microseconds = 0;
      break;
    }
    case "microsecond": {
      const divisor = 1e3;
      nanoseconds = (0, import_big_integer.default)(microseconds).multiply(1e3).plus(nanoseconds);
      total = nanoseconds.toJSNumber() / divisor;
      const rounded = RoundNumberToIncrement(nanoseconds, divisor * increment, roundingMode);
      microseconds = rounded.divide(divisor).toJSNumber();
      nanoseconds = import_big_integer.default.zero;
      break;
    }
    case "nanosecond": {
      total = nanoseconds.toJSNumber();
      nanoseconds = RoundNumberToIncrement((0, import_big_integer.default)(nanoseconds), increment, roundingMode);
      break;
    }
  }
  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    microseconds,
    nanoseconds: nanoseconds.toJSNumber(),
    total
  };
}
function CompareISODate(y1, m1, d1, y2, m2, d2) {
  for (const [x, y] of [
    [y1, y2],
    [m1, m2],
    [d1, d2]
  ]) {
    if (x !== y)
      return ComparisonResult(x - y);
  }
  return 0;
}
function NonNegativeModulo(x, y) {
  let result = x % y;
  if (ObjectIs(result, -0))
    return 0;
  if (result < 0)
    result += y;
  return result;
}
function ToBigInt(arg) {
  if (import_big_integer.default.isInstance(arg)) {
    return arg;
  }
  let prim = arg;
  if (typeof arg === "object") {
    const toPrimFn = arg[Symbol.toPrimitive];
    if (toPrimFn && typeof toPrimFn === "function") {
      prim = ReflectApply$1(toPrimFn, arg, ["number"]);
    }
  }
  switch (typeof prim) {
    case "undefined":
    case "object":
    case "number":
    case "symbol":
    default:
      throw new TypeError(`cannot convert ${typeof arg} to bigint`);
    case "string":
      if (!prim.match(/^\s*(?:[+-]?\d+\s*)?$/)) {
        throw new SyntaxError("invalid BigInt syntax");
      }
    case "bigint":
      try {
        return (0, import_big_integer.default)(prim);
      } catch (e2) {
        if (e2 instanceof Error && e2.message.startsWith("Invalid integer"))
          throw new SyntaxError(e2.message);
        throw e2;
      }
    case "boolean":
      if (prim) {
        return (0, import_big_integer.default)(1);
      } else {
        return import_big_integer.default.zero;
      }
  }
}
var SystemUTCEpochNanoSeconds = (() => {
  let ns = Date.now() % 1e6;
  return () => {
    const ms = Date.now();
    const result = (0, import_big_integer.default)(ms).multiply(1e6).plus(ns);
    ns = ms % 1e6;
    return import_big_integer.default.min(NS_MAX, import_big_integer.default.max(NS_MIN, result));
  };
})();
function SystemTimeZone() {
  const fmt = new IntlDateTimeFormat$1("en-us");
  const TemporalTimeZone = GetIntrinsic("%Temporal.TimeZone%");
  return new TemporalTimeZone(ParseTemporalTimeZone(fmt.resolvedOptions().timeZone));
}
function ComparisonResult(value) {
  return value < 0 ? -1 : value > 0 ? 1 : value;
}
function GetOptionsObject(options) {
  if (options === void 0)
    return ObjectCreate$2(null);
  if (IsObject(options) && options !== null)
    return options;
  throw new TypeError(`Options parameter must be an object, not ${options === null ? "null" : `${typeof options}`}`);
}
function CreateOnePropObject(propName, propValue) {
  const o2 = ObjectCreate$2(null);
  o2[propName] = propValue;
  return o2;
}
function GetOption(options, property, allowedValues, fallback) {
  let value = options[property];
  if (value !== void 0) {
    value = ToString(value);
    if (!allowedValues.includes(value)) {
      throw new RangeError(`${property} must be one of ${allowedValues.join(", ")}, not ${value}`);
    }
    return value;
  }
  return fallback;
}
function GetNumberOption(options, property, minimum, maximum, fallback) {
  let valueRaw = options[property];
  if (valueRaw === void 0)
    return fallback;
  const value = ToNumber(valueRaw);
  if (NumberIsNaN(value) || value < minimum || value > maximum) {
    throw new RangeError(`${property} must be between ${minimum} and ${maximum}, not ${value}`);
  }
  return MathFloor(value);
}
var OFFSET = new RegExp(`^${offset.source}$`);
function bisect(getState, leftParam, rightParam, lstateParam = getState(leftParam), rstateParam = getState(rightParam)) {
  let left = (0, import_big_integer.default)(leftParam);
  let right = (0, import_big_integer.default)(rightParam);
  let lstate = lstateParam;
  let rstate = rstateParam;
  while (right.minus(left).greater(1)) {
    const middle = left.plus(right).divide(2);
    const mstate = getState(middle);
    if (mstate === lstate) {
      left = middle;
      lstate = mstate;
    } else if (mstate === rstate) {
      right = middle;
      rstate = mstate;
    } else {
      throw new Error(`invalid state in bisection ${lstate} - ${mstate} - ${rstate}`);
    }
  }
  return right;
}
var nsPerTimeUnit = {
  hour: 36e11,
  minute: 6e10,
  second: 1e9,
  millisecond: 1e6,
  microsecond: 1e3,
  nanosecond: 1
};
var DATE = Symbol("date");
var YM = Symbol("ym");
var MD = Symbol("md");
var TIME = Symbol("time");
var DATETIME = Symbol("datetime");
var ZONED = Symbol("zoneddatetime");
var INST = Symbol("instant");
var ORIGINAL = Symbol("original");
var TZ_RESOLVED = Symbol("timezone");
var TZ_GIVEN = Symbol("timezone-id-given");
var CAL_ID = Symbol("calendar-id");
var LOCALE = Symbol("locale");
var OPTIONS = Symbol("options");
var descriptor = (value) => {
  return {
    value,
    enumerable: true,
    writable: false,
    configurable: true
  };
};
var IntlDateTimeFormat = globalThis.Intl.DateTimeFormat;
var ObjectAssign$1 = Object.assign;
var ObjectHasOwnProperty = Object.prototype.hasOwnProperty;
var ReflectApply = Reflect.apply;
function getPropLazy(obj, prop) {
  let val = obj[prop];
  if (typeof val === "function") {
    val = new IntlDateTimeFormat(obj[LOCALE], val(obj[OPTIONS]));
    obj[prop] = val;
  }
  return val;
}
function getResolvedTimeZoneLazy(obj) {
  let val = obj[TZ_RESOLVED];
  if (typeof val === "string") {
    val = ToTemporalTimeZone(val);
    obj[TZ_RESOLVED] = val;
  }
  return val;
}
function DateTimeFormatImpl(locale = void 0, optionsParam = {}) {
  if (!(this instanceof DateTimeFormatImpl)) {
    return new DateTimeFormatImpl(locale, optionsParam);
  }
  const hasOptions = typeof optionsParam !== "undefined";
  const options = hasOptions ? ObjectAssign$1({}, optionsParam) : {};
  const original = new IntlDateTimeFormat(locale, options);
  const ro = original.resolvedOptions();
  if (hasOptions) {
    const clonedResolved = ObjectAssign$1({}, ro);
    for (const prop in clonedResolved) {
      if (!ReflectApply(ObjectHasOwnProperty, options, [prop])) {
        delete clonedResolved[prop];
      }
    }
    this[OPTIONS] = clonedResolved;
  } else {
    this[OPTIONS] = options;
  }
  this[TZ_GIVEN] = options.timeZone ? options.timeZone : null;
  this[LOCALE] = ro.locale;
  this[ORIGINAL] = original;
  this[TZ_RESOLVED] = ro.timeZone;
  this[CAL_ID] = ro.calendar;
  this[DATE] = dateAmend;
  this[YM] = yearMonthAmend;
  this[MD] = monthDayAmend;
  this[TIME] = timeAmend;
  this[DATETIME] = datetimeAmend;
  this[ZONED] = zonedDateTimeAmend;
  this[INST] = instantAmend;
  return void 0;
}
Object.defineProperty(DateTimeFormatImpl, "name", {
  writable: true,
  value: "DateTimeFormat"
});
var DateTimeFormat = DateTimeFormatImpl;
DateTimeFormatImpl.supportedLocalesOf = function(locales, options) {
  return IntlDateTimeFormat.supportedLocalesOf(locales, options);
};
var properties = {
  resolvedOptions: descriptor(resolvedOptions),
  format: descriptor(format),
  formatRange: descriptor(formatRange)
};
if ("formatToParts" in IntlDateTimeFormat.prototype) {
  properties.formatToParts = descriptor(formatToParts);
}
if ("formatRangeToParts" in IntlDateTimeFormat.prototype) {
  properties.formatRangeToParts = descriptor(formatRangeToParts);
}
DateTimeFormatImpl.prototype = Object.create(IntlDateTimeFormat.prototype, properties);
function resolvedOptions() {
  return this[ORIGINAL].resolvedOptions();
}
function adjustFormatterTimeZone(formatter, timeZone2) {
  if (!timeZone2)
    return formatter;
  const options = formatter.resolvedOptions();
  if (options.timeZone === timeZone2)
    return formatter;
  return new IntlDateTimeFormat(options.locale, { ...options, timeZone: timeZone2 });
}
function format(datetime2, ...rest) {
  let { instant: instant2, formatter, timeZone: timeZone2 } = extractOverrides(datetime2, this);
  if (instant2 && formatter) {
    formatter = adjustFormatterTimeZone(formatter, timeZone2);
    return formatter.format(instant2.epochMilliseconds);
  }
  return this[ORIGINAL].format(datetime2, ...rest);
}
function formatToParts(datetime2, ...rest) {
  let { instant: instant2, formatter, timeZone: timeZone2 } = extractOverrides(datetime2, this);
  if (instant2 && formatter) {
    formatter = adjustFormatterTimeZone(formatter, timeZone2);
    return formatter.formatToParts(instant2.epochMilliseconds);
  }
  return this[ORIGINAL].formatToParts(datetime2, ...rest);
}
function formatRange(a, b) {
  if (isTemporalObject(a) || isTemporalObject(b)) {
    if (!sameTemporalType(a, b)) {
      throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
    }
    const { instant: aa, formatter: aformatter, timeZone: atz } = extractOverrides(a, this);
    const { instant: bb, formatter: bformatter, timeZone: btz } = extractOverrides(b, this);
    if (atz && btz && atz !== btz) {
      throw new RangeError("cannot format range between different time zones");
    }
    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      const formatter = adjustFormatterTimeZone(aformatter, atz);
      return formatter.formatRange(aa.epochMilliseconds, bb.epochMilliseconds);
    }
  }
  return this[ORIGINAL].formatRange(a, b);
}
function formatRangeToParts(a, b) {
  if (isTemporalObject(a) || isTemporalObject(b)) {
    if (!sameTemporalType(a, b)) {
      throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
    }
    const { instant: aa, formatter: aformatter, timeZone: atz } = extractOverrides(a, this);
    const { instant: bb, formatter: bformatter, timeZone: btz } = extractOverrides(b, this);
    if (atz && btz && atz !== btz) {
      throw new RangeError("cannot format range between different time zones");
    }
    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      const formatter = adjustFormatterTimeZone(aformatter, atz);
      return formatter.formatRangeToParts(aa.epochMilliseconds, bb.epochMilliseconds);
    }
  }
  return this[ORIGINAL].formatRangeToParts(a, b);
}
function amend(optionsParam = {}, amended = {}) {
  const options = ObjectAssign$1({}, optionsParam);
  for (const opt of [
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "weekday",
    "dayPeriod",
    "timeZoneName",
    "dateStyle",
    "timeStyle"
  ]) {
    options[opt] = opt in amended ? amended[opt] : options[opt];
    if (options[opt] === false || options[opt] === void 0)
      delete options[opt];
  }
  return options;
}
function timeAmend(optionsParam) {
  let options = amend(optionsParam, {
    year: false,
    month: false,
    day: false,
    weekday: false,
    timeZoneName: false,
    dateStyle: false
  });
  if (!hasTimeOptions(options)) {
    options = ObjectAssign$1({}, options, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  }
  return options;
}
function yearMonthAmend(optionsParam) {
  let options = amend(optionsParam, {
    day: false,
    hour: false,
    minute: false,
    second: false,
    weekday: false,
    dayPeriod: false,
    timeZoneName: false,
    dateStyle: false,
    timeStyle: false
  });
  if (!("year" in options || "month" in options)) {
    options = ObjectAssign$1(options, { year: "numeric", month: "numeric" });
  }
  return options;
}
function monthDayAmend(optionsParam) {
  let options = amend(optionsParam, {
    year: false,
    hour: false,
    minute: false,
    second: false,
    weekday: false,
    dayPeriod: false,
    timeZoneName: false,
    dateStyle: false,
    timeStyle: false
  });
  if (!("month" in options || "day" in options)) {
    options = ObjectAssign$1({}, options, { month: "numeric", day: "numeric" });
  }
  return options;
}
function dateAmend(optionsParam) {
  let options = amend(optionsParam, {
    hour: false,
    minute: false,
    second: false,
    dayPeriod: false,
    timeZoneName: false,
    timeStyle: false
  });
  if (!hasDateOptions(options)) {
    options = ObjectAssign$1({}, options, {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
  }
  return options;
}
function datetimeAmend(optionsParam) {
  let options = amend(optionsParam, { timeZoneName: false });
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign$1({}, options, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  }
  return options;
}
function zonedDateTimeAmend(optionsParam) {
  let options = optionsParam;
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign$1({}, options, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    if (options.timeZoneName === void 0)
      options.timeZoneName = "short";
  }
  return options;
}
function instantAmend(optionsParam) {
  let options = optionsParam;
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign$1({}, options, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  }
  return options;
}
function hasDateOptions(options) {
  return "year" in options || "month" in options || "day" in options || "weekday" in options || "dateStyle" in options;
}
function hasTimeOptions(options) {
  return "hour" in options || "minute" in options || "second" in options || "timeStyle" in options || "dayPeriod" in options;
}
function isTemporalObject(obj) {
  return IsTemporalDate(obj) || IsTemporalTime(obj) || IsTemporalDateTime(obj) || IsTemporalZonedDateTime(obj) || IsTemporalYearMonth(obj) || IsTemporalMonthDay(obj) || IsTemporalInstant(obj);
}
function sameTemporalType(x, y) {
  if (!isTemporalObject(x) || !isTemporalObject(y))
    return false;
  if (IsTemporalTime(x) && !IsTemporalTime(y))
    return false;
  if (IsTemporalDate(x) && !IsTemporalDate(y))
    return false;
  if (IsTemporalDateTime(x) && !IsTemporalDateTime(y))
    return false;
  if (IsTemporalZonedDateTime(x) && !IsTemporalZonedDateTime(y))
    return false;
  if (IsTemporalYearMonth(x) && !IsTemporalYearMonth(y))
    return false;
  if (IsTemporalMonthDay(x) && !IsTemporalMonthDay(y))
    return false;
  if (IsTemporalInstant(x) && !IsTemporalInstant(y))
    return false;
  return true;
}
function extractOverrides(temporalObj, main) {
  const DateTime = GetIntrinsic("%Temporal.PlainDateTime%");
  if (IsTemporalTime(temporalObj)) {
    const hour = GetSlot(temporalObj, ISO_HOUR);
    const minute = GetSlot(temporalObj, ISO_MINUTE);
    const second = GetSlot(temporalObj, ISO_SECOND);
    const millisecond = GetSlot(temporalObj, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalObj, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalObj, ISO_NANOSECOND);
    const datetime2 = new DateTime(1970, 1, 1, hour, minute, second, millisecond, microsecond, nanosecond, main[CAL_ID]);
    return {
      instant: BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime2, "compatible"),
      formatter: getPropLazy(main, TIME)
    };
  }
  if (IsTemporalYearMonth(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const referenceISODay = GetSlot(temporalObj, ISO_DAY);
    const calendar2 = ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar2 !== main[CAL_ID]) {
      throw new RangeError(`cannot format PlainYearMonth with calendar ${calendar2} in locale with calendar ${main[CAL_ID]}`);
    }
    const datetime2 = new DateTime(isoYear, isoMonth, referenceISODay, 12, 0, 0, 0, 0, 0, calendar2);
    return {
      instant: BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime2, "compatible"),
      formatter: getPropLazy(main, YM)
    };
  }
  if (IsTemporalMonthDay(temporalObj)) {
    const referenceISOYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const calendar2 = ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar2 !== main[CAL_ID]) {
      throw new RangeError(`cannot format PlainMonthDay with calendar ${calendar2} in locale with calendar ${main[CAL_ID]}`);
    }
    const datetime2 = new DateTime(referenceISOYear, isoMonth, isoDay, 12, 0, 0, 0, 0, 0, calendar2);
    return {
      instant: BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime2, "compatible"),
      formatter: getPropLazy(main, MD)
    };
  }
  if (IsTemporalDate(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const calendar2 = ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar2 !== "iso8601" && calendar2 !== main[CAL_ID]) {
      throw new RangeError(`cannot format PlainDate with calendar ${calendar2} in locale with calendar ${main[CAL_ID]}`);
    }
    const datetime2 = new DateTime(isoYear, isoMonth, isoDay, 12, 0, 0, 0, 0, 0, main[CAL_ID]);
    return {
      instant: BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime2, "compatible"),
      formatter: getPropLazy(main, DATE)
    };
  }
  if (IsTemporalDateTime(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const hour = GetSlot(temporalObj, ISO_HOUR);
    const minute = GetSlot(temporalObj, ISO_MINUTE);
    const second = GetSlot(temporalObj, ISO_SECOND);
    const millisecond = GetSlot(temporalObj, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalObj, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalObj, ISO_NANOSECOND);
    const calendar2 = ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar2 !== "iso8601" && calendar2 !== main[CAL_ID]) {
      throw new RangeError(`cannot format PlainDateTime with calendar ${calendar2} in locale with calendar ${main[CAL_ID]}`);
    }
    let datetime2 = temporalObj;
    if (calendar2 === "iso8601") {
      datetime2 = new DateTime(isoYear, isoMonth, isoDay, hour, minute, second, millisecond, microsecond, nanosecond, main[CAL_ID]);
    }
    return {
      instant: BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime2, "compatible"),
      formatter: getPropLazy(main, DATETIME)
    };
  }
  if (IsTemporalZonedDateTime(temporalObj)) {
    const calendar2 = ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar2 !== "iso8601" && calendar2 !== main[CAL_ID]) {
      throw new RangeError(`cannot format ZonedDateTime with calendar ${calendar2} in locale with calendar ${main[CAL_ID]}`);
    }
    const timeZone2 = GetSlot(temporalObj, TIME_ZONE);
    const objTimeZone = ToString(timeZone2);
    if (main[TZ_GIVEN] && main[TZ_GIVEN] !== objTimeZone) {
      throw new RangeError(`timeZone option ${main[TZ_GIVEN]} doesn't match actual time zone ${objTimeZone}`);
    }
    return {
      instant: GetSlot(temporalObj, INSTANT),
      formatter: getPropLazy(main, ZONED),
      timeZone: objTimeZone
    };
  }
  if (IsTemporalInstant(temporalObj)) {
    return {
      instant: temporalObj,
      formatter: getPropLazy(main, INST)
    };
  }
  return {};
}
var DISALLOWED_UNITS$3 = ["year", "month", "week", "day"];
var MAX_DIFFERENCE_INCREMENTS = {
  hour: 24,
  minute: 60,
  second: 60,
  millisecond: 1e3,
  microsecond: 1e3,
  nanosecond: 1e3
};
var Instant = class {
  constructor(epochNanoseconds) {
    if (arguments.length < 1) {
      throw new TypeError("missing argument: epochNanoseconds is required");
    }
    const ns = ToBigInt(epochNanoseconds);
    ValidateEpochNanoseconds(ns);
    CreateSlots(this);
    SetSlot(this, EPOCHNANOSECONDS, ns);
    {
      const repr = TemporalInstantToString(this, void 0, "auto");
      Object.defineProperty(this, "_repr_", {
        value: `${this[Symbol.toStringTag]} <${repr}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get epochSeconds() {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const value = GetSlot(this, EPOCHNANOSECONDS);
    return +value.divide(1e9);
  }
  get epochMilliseconds() {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const value = (0, import_big_integer.default)(GetSlot(this, EPOCHNANOSECONDS));
    return +value.divide(1e6);
  }
  get epochMicroseconds() {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const value = GetSlot(this, EPOCHNANOSECONDS);
    return bigIntIfAvailable$2(value.divide(1e3));
  }
  get epochNanoseconds() {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    return bigIntIfAvailable$2(GetSlot(this, EPOCHNANOSECONDS));
  }
  add(temporalDurationLike) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ToLimitedTemporalDuration(temporalDurationLike, ["years", "months", "weeks", "days"]);
    const ns = AddInstant(GetSlot(this, EPOCHNANOSECONDS), hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    return new Instant(ns);
  }
  subtract(temporalDurationLike) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ToLimitedTemporalDuration(temporalDurationLike, ["years", "months", "weeks", "days"]);
    const ns = AddInstant(GetSlot(this, EPOCHNANOSECONDS), -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds);
    return new Instant(ns);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalInstant(otherParam);
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond", DISALLOWED_UNITS$3);
    const defaultLargestUnit = LargerOfTwoTemporalUnits("second", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$3, defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, MAX_DIFFERENCE_INCREMENTS[smallestUnit], false);
    const onens = GetSlot(this, EPOCHNANOSECONDS);
    const twons = GetSlot(other, EPOCHNANOSECONDS);
    let { seconds, milliseconds, microseconds, nanoseconds } = DifferenceInstant(onens, twons, roundingIncrement, smallestUnit, roundingMode);
    let hours, minutes;
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalInstant(otherParam);
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond", DISALLOWED_UNITS$3);
    const defaultLargestUnit = LargerOfTwoTemporalUnits("second", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$3, defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, MAX_DIFFERENCE_INCREMENTS[smallestUnit], false);
    const onens = GetSlot(other, EPOCHNANOSECONDS);
    const twons = GetSlot(this, EPOCHNANOSECONDS);
    let { seconds, milliseconds, microseconds, nanoseconds } = DifferenceInstant(onens, twons, roundingIncrement, smallestUnit, roundingMode);
    let hours, minutes;
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  round(optionsParam) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    if (optionsParam === void 0)
      throw new TypeError("options parameter is required");
    const options = typeof optionsParam === "string" ? CreateOnePropObject("smallestUnit", optionsParam) : GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, void 0, DISALLOWED_UNITS$3);
    if (smallestUnit === void 0)
      throw new RangeError("smallestUnit is required");
    const roundingMode = ToTemporalRoundingMode(options, "halfExpand");
    const maximumIncrements = {
      hour: 24,
      minute: 1440,
      second: 86400,
      millisecond: 864e5,
      microsecond: 864e8,
      nanosecond: 864e11
    };
    const roundingIncrement = ToTemporalRoundingIncrement(options, maximumIncrements[smallestUnit], true);
    const ns = GetSlot(this, EPOCHNANOSECONDS);
    const roundedNs = RoundInstant(ns, roundingIncrement, smallestUnit, roundingMode);
    return new Instant(roundedNs);
  }
  equals(otherParam) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalInstant(otherParam);
    const one = GetSlot(this, EPOCHNANOSECONDS);
    const two = GetSlot(other, EPOCHNANOSECONDS);
    return (0, import_big_integer.default)(one).equals(two);
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    let timeZone2 = options.timeZone;
    if (timeZone2 !== void 0)
      timeZone2 = ToTemporalTimeZone(timeZone2);
    const { precision, unit, increment } = ToSecondsStringPrecision(options);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const ns = GetSlot(this, EPOCHNANOSECONDS);
    const roundedNs = RoundInstant(ns, increment, unit, roundingMode);
    const roundedInstant = new Instant(roundedNs);
    return TemporalInstantToString(roundedInstant, timeZone2, precision);
  }
  toJSON() {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    return TemporalInstantToString(this, void 0, "auto");
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.Instant");
  }
  toZonedDateTime(item) {
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(item)) {
      throw new TypeError("invalid argument in toZonedDateTime");
    }
    const calendarLike = item.calendar;
    if (calendarLike === void 0) {
      throw new TypeError("missing calendar property in toZonedDateTime");
    }
    const calendar2 = ToTemporalCalendar(calendarLike);
    const temporalTimeZoneLike = item.timeZone;
    if (temporalTimeZoneLike === void 0) {
      throw new TypeError("missing timeZone property in toZonedDateTime");
    }
    const timeZone2 = ToTemporalTimeZone(temporalTimeZoneLike);
    return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  toZonedDateTimeISO(itemParam) {
    let item = itemParam;
    if (!IsTemporalInstant(this))
      throw new TypeError("invalid receiver");
    if (IsObject(item)) {
      const timeZoneProperty = item.timeZone;
      if (timeZoneProperty !== void 0) {
        item = timeZoneProperty;
      }
    }
    const timeZone2 = ToTemporalTimeZone(item);
    const calendar2 = GetISO8601Calendar();
    return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  static fromEpochSeconds(epochSecondsParam) {
    const epochSeconds = ToNumber(epochSecondsParam);
    const epochNanoseconds = (0, import_big_integer.default)(epochSeconds).multiply(1e9);
    ValidateEpochNanoseconds(epochNanoseconds);
    return new Instant(epochNanoseconds);
  }
  static fromEpochMilliseconds(epochMillisecondsParam) {
    const epochMilliseconds = ToNumber(epochMillisecondsParam);
    const epochNanoseconds = (0, import_big_integer.default)(epochMilliseconds).multiply(1e6);
    ValidateEpochNanoseconds(epochNanoseconds);
    return new Instant(epochNanoseconds);
  }
  static fromEpochMicroseconds(epochMicrosecondsParam) {
    const epochMicroseconds = ToBigInt(epochMicrosecondsParam);
    const epochNanoseconds = epochMicroseconds.multiply(1e3);
    ValidateEpochNanoseconds(epochNanoseconds);
    return new Instant(epochNanoseconds);
  }
  static fromEpochNanoseconds(epochNanosecondsParam) {
    const epochNanoseconds = ToBigInt(epochNanosecondsParam);
    ValidateEpochNanoseconds(epochNanoseconds);
    return new Instant(epochNanoseconds);
  }
  static from(item) {
    if (IsTemporalInstant(item)) {
      return new Instant(GetSlot(item, EPOCHNANOSECONDS));
    }
    return ToTemporalInstant(item);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalInstant(oneParam);
    const two = ToTemporalInstant(twoParam);
    const oneNs = GetSlot(one, EPOCHNANOSECONDS);
    const twoNs = GetSlot(two, EPOCHNANOSECONDS);
    if ((0, import_big_integer.default)(oneNs).lesser(twoNs))
      return -1;
    if ((0, import_big_integer.default)(oneNs).greater(twoNs))
      return 1;
    return 0;
  }
};
MakeIntrinsicClass(Instant, "Temporal.Instant");
function bigIntIfAvailable$2(wrapper) {
  return typeof globalThis.BigInt === "undefined" ? wrapper : wrapper.value;
}
var DISALLOWED_UNITS$2 = ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"];
var PlainDate = class {
  constructor(isoYearParam, isoMonthParam, isoDayParam, calendarParam = GetISO8601Calendar()) {
    const isoYear = ToIntegerThrowOnInfinity(isoYearParam);
    const isoMonth = ToIntegerThrowOnInfinity(isoMonthParam);
    const isoDay = ToIntegerThrowOnInfinity(isoDayParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    if (arguments.length < 3) {
      throw new RangeError("missing argument: isoYear, isoMonth and isoDay are required");
    }
    CreateTemporalDateSlots(this, isoYear, isoMonth, isoDay, calendar2);
  }
  get calendar() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  get era() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarEra(GetSlot(this, CALENDAR), this);
  }
  get eraYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarEraYear(GetSlot(this, CALENDAR), this);
  }
  get year() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarYear(GetSlot(this, CALENDAR), this);
  }
  get month() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarMonth(GetSlot(this, CALENDAR), this);
  }
  get monthCode() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthCode(GetSlot(this, CALENDAR), this);
  }
  get day() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDay(GetSlot(this, CALENDAR), this);
  }
  get dayOfWeek() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfWeek(GetSlot(this, CALENDAR), this);
  }
  get dayOfYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfYear(GetSlot(this, CALENDAR), this);
  }
  get weekOfYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarWeekOfYear(GetSlot(this, CALENDAR), this);
  }
  get daysInWeek() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInWeek(GetSlot(this, CALENDAR), this);
  }
  get daysInMonth() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInMonth(GetSlot(this, CALENDAR), this);
  }
  get daysInYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInYear(GetSlot(this, CALENDAR), this);
  }
  get monthsInYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthsInYear(GetSlot(this, CALENDAR), this);
  }
  get inLeapYear() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return CalendarInLeapYear(GetSlot(this, CALENDAR), this);
  }
  with(temporalDateLike, optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalDateLike)) {
      throw new TypeError("invalid argument");
    }
    RejectObjectWithCalendarOrTimeZone(temporalDateLike);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["day", "month", "monthCode", "year"]);
    const props = ToPartialRecord(temporalDateLike, fieldNames);
    if (!props) {
      throw new TypeError("invalid date-like");
    }
    let fields = ToTemporalDateFields(this, fieldNames);
    fields = CalendarMergeFields(calendar2, fields, props);
    fields = ToTemporalDateFields(fields, fieldNames);
    const options = GetOptionsObject(optionsParam);
    return DateFromFields(calendar2, fields, options);
  }
  withCalendar(calendarParam) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const calendar2 = ToTemporalCalendar(calendarParam);
    return new PlainDate(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), calendar2);
  }
  add(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToTemporalDuration(temporalDurationLike);
    const options = GetOptionsObject(optionsParam);
    return CalendarDateAdd(GetSlot(this, CALENDAR), this, duration2, options);
  }
  subtract(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const duration2 = CreateNegatedTemporalDuration(ToTemporalDuration(temporalDurationLike));
    const options = GetOptionsObject(optionsParam);
    return CalendarDateAdd(GetSlot(this, CALENDAR), this, duration2, options);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDate(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "day", DISALLOWED_UNITS$2);
    const defaultLargestUnit = LargerOfTwoTemporalUnits("day", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$2, defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, void 0, false);
    const untilOptions = { ...options, largestUnit };
    const result = CalendarDateUntil(calendar2, this, other, untilOptions);
    if (smallestUnit === "day" && roundingIncrement === 1)
      return result;
    let { years, months, weeks, days } = result;
    ({ years, months, weeks, days } = RoundDuration(years, months, weeks, days, 0, 0, 0, 0, 0, 0, roundingIncrement, smallestUnit, roundingMode, this));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDate(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "day", DISALLOWED_UNITS$2);
    const defaultLargestUnit = LargerOfTwoTemporalUnits("day", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$2, defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, void 0, false);
    const untilOptions = { ...options, largestUnit };
    let { years, months, weeks, days } = CalendarDateUntil(calendar2, this, other, untilOptions);
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    if (smallestUnit === "day" && roundingIncrement === 1) {
      return new Duration2(-years, -months, -weeks, -days, 0, 0, 0, 0, 0, 0);
    }
    ({ years, months, weeks, days } = RoundDuration(years, months, weeks, days, 0, 0, 0, 0, 0, 0, roundingIncrement, smallestUnit, NegateTemporalRoundingMode(roundingMode), this));
    return new Duration2(-years, -months, -weeks, -days, 0, 0, 0, 0, 0, 0);
  }
  equals(otherParam) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDate(otherParam);
    for (const slot of [ISO_YEAR, ISO_MONTH, ISO_DAY]) {
      const val1 = GetSlot(this, slot);
      const val2 = GetSlot(other, slot);
      if (val1 !== val2)
        return false;
    }
    return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const showCalendar = ToShowCalendarOption(options);
    return TemporalDateToString(this, showCalendar);
  }
  toJSON() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return TemporalDateToString(this);
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.PlainDate");
  }
  toPlainDateTime(temporalTimeParam = void 0) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const year = GetSlot(this, ISO_YEAR);
    const month = GetSlot(this, ISO_MONTH);
    const day = GetSlot(this, ISO_DAY);
    const calendar2 = GetSlot(this, CALENDAR);
    if (temporalTimeParam === void 0)
      return CreateTemporalDateTime(year, month, day, 0, 0, 0, 0, 0, 0, calendar2);
    const temporalTime = ToTemporalTime(temporalTimeParam);
    const hour = GetSlot(temporalTime, ISO_HOUR);
    const minute = GetSlot(temporalTime, ISO_MINUTE);
    const second = GetSlot(temporalTime, ISO_SECOND);
    const millisecond = GetSlot(temporalTime, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalTime, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalTime, ISO_NANOSECOND);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  toZonedDateTime(item) {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    let timeZone2, temporalTime;
    if (IsObject(item)) {
      const timeZoneLike = item.timeZone;
      if (timeZoneLike === void 0) {
        timeZone2 = ToTemporalTimeZone(item);
      } else {
        timeZone2 = ToTemporalTimeZone(timeZoneLike);
        temporalTime = item.plainTime;
      }
    } else {
      timeZone2 = ToTemporalTimeZone(item);
    }
    const year = GetSlot(this, ISO_YEAR);
    const month = GetSlot(this, ISO_MONTH);
    const day = GetSlot(this, ISO_DAY);
    const calendar2 = GetSlot(this, CALENDAR);
    let hour = 0, minute = 0, second = 0, millisecond = 0, microsecond = 0, nanosecond = 0;
    if (temporalTime !== void 0) {
      temporalTime = ToTemporalTime(temporalTime);
      hour = GetSlot(temporalTime, ISO_HOUR);
      minute = GetSlot(temporalTime, ISO_MINUTE);
      second = GetSlot(temporalTime, ISO_SECOND);
      millisecond = GetSlot(temporalTime, ISO_MILLISECOND);
      microsecond = GetSlot(temporalTime, ISO_MICROSECOND);
      nanosecond = GetSlot(temporalTime, ISO_NANOSECOND);
    }
    const dt = CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, dt, "compatible");
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  toPlainYearMonth() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, fieldNames);
    return YearMonthFromFields(calendar2, fields);
  }
  toPlainMonthDay() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["day", "monthCode"]);
    const fields = ToTemporalMonthDayFields(this, fieldNames);
    return MonthDayFromFields(calendar2, fields);
  }
  getISOFields() {
    if (!IsTemporalDate(this))
      throw new TypeError("invalid receiver");
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(this, ISO_DAY),
      isoMonth: GetSlot(this, ISO_MONTH),
      isoYear: GetSlot(this, ISO_YEAR)
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    if (IsTemporalDate(item)) {
      ToTemporalOverflow(options);
      return CreateTemporalDate(GetSlot(item, ISO_YEAR), GetSlot(item, ISO_MONTH), GetSlot(item, ISO_DAY), GetSlot(item, CALENDAR));
    }
    return ToTemporalDate(item, options);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalDate(oneParam);
    const two = ToTemporalDate(twoParam);
    return CompareISODate(GetSlot(one, ISO_YEAR), GetSlot(one, ISO_MONTH), GetSlot(one, ISO_DAY), GetSlot(two, ISO_YEAR), GetSlot(two, ISO_MONTH), GetSlot(two, ISO_DAY));
  }
};
MakeIntrinsicClass(PlainDate, "Temporal.PlainDate");
var PlainDateTime = class {
  constructor(isoYearParam, isoMonthParam, isoDayParam, hourParam = 0, minuteParam = 0, secondParam = 0, millisecondParam = 0, microsecondParam = 0, nanosecondParam = 0, calendarParam = GetISO8601Calendar()) {
    const isoYear = ToIntegerThrowOnInfinity(isoYearParam);
    const isoMonth = ToIntegerThrowOnInfinity(isoMonthParam);
    const isoDay = ToIntegerThrowOnInfinity(isoDayParam);
    const hour = ToIntegerThrowOnInfinity(hourParam);
    const minute = ToIntegerThrowOnInfinity(minuteParam);
    const second = ToIntegerThrowOnInfinity(secondParam);
    const millisecond = ToIntegerThrowOnInfinity(millisecondParam);
    const microsecond = ToIntegerThrowOnInfinity(microsecondParam);
    const nanosecond = ToIntegerThrowOnInfinity(nanosecondParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    if (arguments.length < 3) {
      throw new RangeError("missing argument: isoYear, isoMonth and isoDay are required");
    }
    CreateTemporalDateTimeSlots(this, isoYear, isoMonth, isoDay, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  get calendar() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  get year() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarYear(GetSlot(this, CALENDAR), this);
  }
  get month() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonth(GetSlot(this, CALENDAR), this);
  }
  get monthCode() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthCode(GetSlot(this, CALENDAR), this);
  }
  get day() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDay(GetSlot(this, CALENDAR), this);
  }
  get hour() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_HOUR);
  }
  get minute() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MINUTE);
  }
  get second() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_SECOND);
  }
  get millisecond() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MILLISECOND);
  }
  get microsecond() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MICROSECOND);
  }
  get nanosecond() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_NANOSECOND);
  }
  get era() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarEra(GetSlot(this, CALENDAR), this);
  }
  get eraYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarEraYear(GetSlot(this, CALENDAR), this);
  }
  get dayOfWeek() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfWeek(GetSlot(this, CALENDAR), this);
  }
  get dayOfYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfYear(GetSlot(this, CALENDAR), this);
  }
  get weekOfYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarWeekOfYear(GetSlot(this, CALENDAR), this);
  }
  get daysInWeek() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInWeek(GetSlot(this, CALENDAR), this);
  }
  get daysInYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInYear(GetSlot(this, CALENDAR), this);
  }
  get daysInMonth() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInMonth(GetSlot(this, CALENDAR), this);
  }
  get monthsInYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthsInYear(GetSlot(this, CALENDAR), this);
  }
  get inLeapYear() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarInLeapYear(GetSlot(this, CALENDAR), this);
  }
  with(temporalDateTimeLike, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalDateTimeLike)) {
      throw new TypeError("invalid argument");
    }
    RejectObjectWithCalendarOrTimeZone(temporalDateTimeLike);
    const options = GetOptionsObject(optionsParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, [
      "day",
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "month",
      "monthCode",
      "nanosecond",
      "second",
      "year"
    ]);
    const props = ToPartialRecord(temporalDateTimeLike, fieldNames);
    if (!props) {
      throw new TypeError("invalid date-time-like");
    }
    let fields = ToTemporalDateTimeFields(this, fieldNames);
    fields = CalendarMergeFields(calendar2, fields, props);
    fields = ToTemporalDateTimeFields(fields, fieldNames);
    const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = InterpretTemporalDateTimeFields(calendar2, fields, options);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  withPlainTime(temporalTimeParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const year = GetSlot(this, ISO_YEAR);
    const month = GetSlot(this, ISO_MONTH);
    const day = GetSlot(this, ISO_DAY);
    const calendar2 = GetSlot(this, CALENDAR);
    if (temporalTimeParam === void 0)
      return CreateTemporalDateTime(year, month, day, 0, 0, 0, 0, 0, 0, calendar2);
    const temporalTime = ToTemporalTime(temporalTimeParam);
    const hour = GetSlot(temporalTime, ISO_HOUR);
    const minute = GetSlot(temporalTime, ISO_MINUTE);
    const second = GetSlot(temporalTime, ISO_SECOND);
    const millisecond = GetSlot(temporalTime, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalTime, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalTime, ISO_NANOSECOND);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  withPlainDate(temporalDateParam) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const temporalDate = ToTemporalDate(temporalDateParam);
    const year = GetSlot(temporalDate, ISO_YEAR);
    const month = GetSlot(temporalDate, ISO_MONTH);
    const day = GetSlot(temporalDate, ISO_DAY);
    let calendar2 = GetSlot(temporalDate, CALENDAR);
    const hour = GetSlot(this, ISO_HOUR);
    const minute = GetSlot(this, ISO_MINUTE);
    const second = GetSlot(this, ISO_SECOND);
    const millisecond = GetSlot(this, ISO_MILLISECOND);
    const microsecond = GetSlot(this, ISO_MICROSECOND);
    const nanosecond = GetSlot(this, ISO_NANOSECOND);
    calendar2 = ConsolidateCalendars(GetSlot(this, CALENDAR), calendar2);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  withCalendar(calendarParam) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = ToTemporalCalendar(calendarParam);
    return new PlainDateTime(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), calendar2);
  }
  add(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    const options = GetOptionsObject(optionsParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = AddDateTime(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), calendar2, years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, options);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  subtract(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    const options = GetOptionsObject(optionsParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = AddDateTime(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), calendar2, -years, -months, -weeks, -days, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds, options);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDateTime(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond");
    const defaultLargestUnit = LargerOfTwoTemporalUnits("day", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", [], defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalDateTimeRoundingIncrement(options, smallestUnit);
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceISODateTime(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), GetSlot(other, ISO_YEAR), GetSlot(other, ISO_MONTH), GetSlot(other, ISO_DAY), GetSlot(other, ISO_HOUR), GetSlot(other, ISO_MINUTE), GetSlot(other, ISO_SECOND), GetSlot(other, ISO_MILLISECOND), GetSlot(other, ISO_MICROSECOND), GetSlot(other, ISO_NANOSECOND), calendar2, largestUnit, options);
    const relativeTo = TemporalDateTimeToDate(this);
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, relativeTo));
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDateTime(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond");
    const defaultLargestUnit = LargerOfTwoTemporalUnits("day", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", [], defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalDateTimeRoundingIncrement(options, smallestUnit);
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceISODateTime(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH), GetSlot(this, ISO_DAY), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), GetSlot(other, ISO_YEAR), GetSlot(other, ISO_MONTH), GetSlot(other, ISO_DAY), GetSlot(other, ISO_HOUR), GetSlot(other, ISO_MINUTE), GetSlot(other, ISO_SECOND), GetSlot(other, ISO_MILLISECOND), GetSlot(other, ISO_MICROSECOND), GetSlot(other, ISO_NANOSECOND), calendar2, largestUnit, options);
    const relativeTo = TemporalDateTimeToDate(this);
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, NegateTemporalRoundingMode(roundingMode), relativeTo));
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(-years, -months, -weeks, -days, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds);
  }
  round(optionsParam) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    if (optionsParam === void 0)
      throw new TypeError("options parameter is required");
    const options = typeof optionsParam === "string" ? CreateOnePropObject("smallestUnit", optionsParam) : GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, void 0, ["year", "month", "week"]);
    if (smallestUnit === void 0)
      throw new RangeError("smallestUnit is required");
    const roundingMode = ToTemporalRoundingMode(options, "halfExpand");
    const maximumIncrements = {
      day: 1,
      hour: 24,
      minute: 60,
      second: 60,
      millisecond: 1e3,
      microsecond: 1e3,
      nanosecond: 1e3
    };
    const roundingIncrement = ToTemporalRoundingIncrement(options, maximumIncrements[smallestUnit], false);
    let year = GetSlot(this, ISO_YEAR);
    let month = GetSlot(this, ISO_MONTH);
    let day = GetSlot(this, ISO_DAY);
    let hour = GetSlot(this, ISO_HOUR);
    let minute = GetSlot(this, ISO_MINUTE);
    let second = GetSlot(this, ISO_SECOND);
    let millisecond = GetSlot(this, ISO_MILLISECOND);
    let microsecond = GetSlot(this, ISO_MICROSECOND);
    let nanosecond = GetSlot(this, ISO_NANOSECOND);
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = RoundISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, roundingIncrement, smallestUnit, roundingMode));
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, GetSlot(this, CALENDAR));
  }
  equals(otherParam) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalDateTime(otherParam);
    for (const slot of [
      ISO_YEAR,
      ISO_MONTH,
      ISO_DAY,
      ISO_HOUR,
      ISO_MINUTE,
      ISO_SECOND,
      ISO_MILLISECOND,
      ISO_MICROSECOND,
      ISO_NANOSECOND
    ]) {
      const val1 = GetSlot(this, slot);
      const val2 = GetSlot(other, slot);
      if (val1 !== val2)
        return false;
    }
    return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const { precision, unit, increment } = ToSecondsStringPrecision(options);
    const showCalendar = ToShowCalendarOption(options);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    return TemporalDateTimeToString(this, precision, showCalendar, { unit, increment, roundingMode });
  }
  toJSON() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalDateTimeToString(this, "auto");
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.PlainDateTime");
  }
  toZonedDateTime(temporalTimeZoneLike, optionsParam = void 0) {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const timeZone2 = ToTemporalTimeZone(temporalTimeZoneLike);
    const options = GetOptionsObject(optionsParam);
    const disambiguation = ToTemporalDisambiguation(options);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, this, disambiguation);
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, GetSlot(this, CALENDAR));
  }
  toPlainDate() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalDateTimeToDate(this);
  }
  toPlainYearMonth() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, fieldNames);
    return YearMonthFromFields(calendar2, fields);
  }
  toPlainMonthDay() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["day", "monthCode"]);
    const fields = ToTemporalMonthDayFields(this, fieldNames);
    return MonthDayFromFields(calendar2, fields);
  }
  toPlainTime() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalDateTimeToTime(this);
  }
  getISOFields() {
    if (!IsTemporalDateTime(this))
      throw new TypeError("invalid receiver");
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(this, ISO_DAY),
      isoHour: GetSlot(this, ISO_HOUR),
      isoMicrosecond: GetSlot(this, ISO_MICROSECOND),
      isoMillisecond: GetSlot(this, ISO_MILLISECOND),
      isoMinute: GetSlot(this, ISO_MINUTE),
      isoMonth: GetSlot(this, ISO_MONTH),
      isoNanosecond: GetSlot(this, ISO_NANOSECOND),
      isoSecond: GetSlot(this, ISO_SECOND),
      isoYear: GetSlot(this, ISO_YEAR)
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    if (IsTemporalDateTime(item)) {
      ToTemporalOverflow(options);
      return CreateTemporalDateTime(GetSlot(item, ISO_YEAR), GetSlot(item, ISO_MONTH), GetSlot(item, ISO_DAY), GetSlot(item, ISO_HOUR), GetSlot(item, ISO_MINUTE), GetSlot(item, ISO_SECOND), GetSlot(item, ISO_MILLISECOND), GetSlot(item, ISO_MICROSECOND), GetSlot(item, ISO_NANOSECOND), GetSlot(item, CALENDAR));
    }
    return ToTemporalDateTime(item, options);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalDateTime(oneParam);
    const two = ToTemporalDateTime(twoParam);
    for (const slot of [
      ISO_YEAR,
      ISO_MONTH,
      ISO_DAY,
      ISO_HOUR,
      ISO_MINUTE,
      ISO_SECOND,
      ISO_MILLISECOND,
      ISO_MICROSECOND,
      ISO_NANOSECOND
    ]) {
      const val1 = GetSlot(one, slot);
      const val2 = GetSlot(two, slot);
      if (val1 !== val2)
        return ComparisonResult(val1 - val2);
    }
    return 0;
  }
};
MakeIntrinsicClass(PlainDateTime, "Temporal.PlainDateTime");
var Duration = class {
  constructor(yearsParam = 0, monthsParam = 0, weeksParam = 0, daysParam = 0, hoursParam = 0, minutesParam = 0, secondsParam = 0, millisecondsParam = 0, microsecondsParam = 0, nanosecondsParam = 0) {
    const years = ToIntegerWithoutRounding(yearsParam);
    const months = ToIntegerWithoutRounding(monthsParam);
    const weeks = ToIntegerWithoutRounding(weeksParam);
    const days = ToIntegerWithoutRounding(daysParam);
    const hours = ToIntegerWithoutRounding(hoursParam);
    const minutes = ToIntegerWithoutRounding(minutesParam);
    const seconds = ToIntegerWithoutRounding(secondsParam);
    const milliseconds = ToIntegerWithoutRounding(millisecondsParam);
    const microseconds = ToIntegerWithoutRounding(microsecondsParam);
    const nanoseconds = ToIntegerWithoutRounding(nanosecondsParam);
    const sign = DurationSign(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    for (const prop of [years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds]) {
      if (!Number.isFinite(prop))
        throw new RangeError("infinite values not allowed as duration fields");
      const propSign = Math.sign(prop);
      if (propSign !== 0 && propSign !== sign)
        throw new RangeError("mixed-sign values not allowed as duration fields");
    }
    CreateSlots(this);
    SetSlot(this, YEARS, years);
    SetSlot(this, MONTHS, months);
    SetSlot(this, WEEKS, weeks);
    SetSlot(this, DAYS, days);
    SetSlot(this, HOURS, hours);
    SetSlot(this, MINUTES, minutes);
    SetSlot(this, SECONDS, seconds);
    SetSlot(this, MILLISECONDS, milliseconds);
    SetSlot(this, MICROSECONDS, microseconds);
    SetSlot(this, NANOSECONDS, nanoseconds);
    {
      Object.defineProperty(this, "_repr_", {
        value: `${this[Symbol.toStringTag]} <${TemporalDurationToString(this)}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get years() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, YEARS);
  }
  get months() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, MONTHS);
  }
  get weeks() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, WEEKS);
  }
  get days() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, DAYS);
  }
  get hours() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, HOURS);
  }
  get minutes() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, MINUTES);
  }
  get seconds() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, SECONDS);
  }
  get milliseconds() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, MILLISECONDS);
  }
  get microseconds() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, MICROSECONDS);
  }
  get nanoseconds() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, NANOSECONDS);
  }
  get sign() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return DurationSign(GetSlot(this, YEARS), GetSlot(this, MONTHS), GetSlot(this, WEEKS), GetSlot(this, DAYS), GetSlot(this, HOURS), GetSlot(this, MINUTES), GetSlot(this, SECONDS), GetSlot(this, MILLISECONDS), GetSlot(this, MICROSECONDS), GetSlot(this, NANOSECONDS));
  }
  get blank() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return DurationSign(GetSlot(this, YEARS), GetSlot(this, MONTHS), GetSlot(this, WEEKS), GetSlot(this, DAYS), GetSlot(this, HOURS), GetSlot(this, MINUTES), GetSlot(this, SECONDS), GetSlot(this, MILLISECONDS), GetSlot(this, MICROSECONDS), GetSlot(this, NANOSECONDS)) === 0;
  }
  with(durationLike) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    const props = ToPartialRecord(durationLike, [
      "days",
      "hours",
      "microseconds",
      "milliseconds",
      "minutes",
      "months",
      "nanoseconds",
      "seconds",
      "weeks",
      "years"
    ]);
    if (!props) {
      throw new TypeError("invalid duration-like");
    }
    const { years = GetSlot(this, YEARS), months = GetSlot(this, MONTHS), weeks = GetSlot(this, WEEKS), days = GetSlot(this, DAYS), hours = GetSlot(this, HOURS), minutes = GetSlot(this, MINUTES), seconds = GetSlot(this, SECONDS), milliseconds = GetSlot(this, MILLISECONDS), microseconds = GetSlot(this, MICROSECONDS), nanoseconds = GetSlot(this, NANOSECONDS) } = props;
    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  negated() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return CreateNegatedTemporalDuration(this);
  }
  abs() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return new Duration(Math.abs(GetSlot(this, YEARS)), Math.abs(GetSlot(this, MONTHS)), Math.abs(GetSlot(this, WEEKS)), Math.abs(GetSlot(this, DAYS)), Math.abs(GetSlot(this, HOURS)), Math.abs(GetSlot(this, MINUTES)), Math.abs(GetSlot(this, SECONDS)), Math.abs(GetSlot(this, MILLISECONDS)), Math.abs(GetSlot(this, MICROSECONDS)), Math.abs(GetSlot(this, NANOSECONDS)));
  }
  add(other, optionsParam = void 0) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ToLimitedTemporalDuration(other);
    const options = GetOptionsObject(optionsParam);
    const relativeTo = ToRelativeTemporalObject(options);
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = AddDuration(GetSlot(this, YEARS), GetSlot(this, MONTHS), GetSlot(this, WEEKS), GetSlot(this, DAYS), GetSlot(this, HOURS), GetSlot(this, MINUTES), GetSlot(this, SECONDS), GetSlot(this, MILLISECONDS), GetSlot(this, MICROSECONDS), GetSlot(this, NANOSECONDS), years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, relativeTo));
    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  subtract(other, optionsParam = void 0) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ToLimitedTemporalDuration(other);
    const options = GetOptionsObject(optionsParam);
    const relativeTo = ToRelativeTemporalObject(options);
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = AddDuration(GetSlot(this, YEARS), GetSlot(this, MONTHS), GetSlot(this, WEEKS), GetSlot(this, DAYS), GetSlot(this, HOURS), GetSlot(this, MINUTES), GetSlot(this, SECONDS), GetSlot(this, MILLISECONDS), GetSlot(this, MICROSECONDS), GetSlot(this, NANOSECONDS), -years, -months, -weeks, -days, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds, relativeTo));
    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  round(optionsParam) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    if (optionsParam === void 0)
      throw new TypeError("options parameter is required");
    let years = GetSlot(this, YEARS);
    let months = GetSlot(this, MONTHS);
    let weeks = GetSlot(this, WEEKS);
    let days = GetSlot(this, DAYS);
    let hours = GetSlot(this, HOURS);
    let minutes = GetSlot(this, MINUTES);
    let seconds = GetSlot(this, SECONDS);
    let milliseconds = GetSlot(this, MILLISECONDS);
    let microseconds = GetSlot(this, MICROSECONDS);
    let nanoseconds = GetSlot(this, NANOSECONDS);
    let defaultLargestUnit = DefaultTemporalLargestUnit(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    const options = typeof optionsParam === "string" ? CreateOnePropObject("smallestUnit", optionsParam) : GetOptionsObject(optionsParam);
    let smallestUnit = ToSmallestTemporalUnit(options, void 0);
    let smallestUnitPresent = true;
    if (!smallestUnit) {
      smallestUnitPresent = false;
      smallestUnit = "nanosecond";
    }
    defaultLargestUnit = LargerOfTwoTemporalUnits(defaultLargestUnit, smallestUnit);
    let largestUnit = ToLargestTemporalUnit(options, void 0);
    let largestUnitPresent = true;
    if (!largestUnit) {
      largestUnitPresent = false;
      largestUnit = defaultLargestUnit;
    }
    if (largestUnit === "auto")
      largestUnit = defaultLargestUnit;
    if (!smallestUnitPresent && !largestUnitPresent) {
      throw new RangeError("at least one of smallestUnit or largestUnit is required");
    }
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "halfExpand");
    const roundingIncrement = ToTemporalDateTimeRoundingIncrement(options, smallestUnit);
    let relativeTo = ToRelativeTemporalObject(options);
    ({ years, months, weeks, days } = UnbalanceDurationRelative(years, months, weeks, days, largestUnit, relativeTo));
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, relativeTo));
    ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = AdjustRoundedDurationDays(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, relativeTo));
    ({ years, months, weeks, days } = BalanceDurationRelative(years, months, weeks, days, largestUnit, relativeTo));
    if (IsTemporalZonedDateTime(relativeTo)) {
      relativeTo = MoveRelativeZonedDateTime(relativeTo, years, months, weeks, 0);
    }
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit, relativeTo));
    return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  total(optionsParam) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    let years = GetSlot(this, YEARS);
    let months = GetSlot(this, MONTHS);
    let weeks = GetSlot(this, WEEKS);
    let days = GetSlot(this, DAYS);
    let hours = GetSlot(this, HOURS);
    let minutes = GetSlot(this, MINUTES);
    let seconds = GetSlot(this, SECONDS);
    let milliseconds = GetSlot(this, MILLISECONDS);
    let microseconds = GetSlot(this, MICROSECONDS);
    let nanoseconds = GetSlot(this, NANOSECONDS);
    if (optionsParam === void 0)
      throw new TypeError("options argument is required");
    const options = typeof optionsParam === "string" ? CreateOnePropObject("unit", optionsParam) : GetOptionsObject(optionsParam);
    const unit = ToTemporalDurationTotalUnit(options);
    if (unit === void 0)
      throw new RangeError("unit option is required");
    const relativeTo = ToRelativeTemporalObject(options);
    ({ years, months, weeks, days } = UnbalanceDurationRelative(years, months, weeks, days, unit, relativeTo));
    let intermediate;
    if (IsTemporalZonedDateTime(relativeTo)) {
      intermediate = MoveRelativeZonedDateTime(relativeTo, years, months, weeks, 0);
    }
    ({ days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, unit, intermediate));
    const { total } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, 1, unit, "trunc", relativeTo);
    return total;
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const { precision, unit, increment } = ToSecondsStringPrecision(options);
    if (precision === "minute")
      throw new RangeError('smallestUnit must not be "minute"');
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    return TemporalDurationToString(this, precision, { unit, increment, roundingMode });
  }
  toJSON() {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    return TemporalDurationToString(this);
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalDuration(this))
      throw new TypeError("invalid receiver");
    if (typeof Intl !== "undefined" && typeof Intl.DurationFormat !== "undefined") {
      return new Intl.DurationFormat(locales, options).format(this);
    }
    console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat.");
    return TemporalDurationToString(this);
  }
  valueOf() {
    throw new TypeError("use compare() to compare Temporal.Duration");
  }
  static from(item) {
    if (IsTemporalDuration(item)) {
      return new Duration(GetSlot(item, YEARS), GetSlot(item, MONTHS), GetSlot(item, WEEKS), GetSlot(item, DAYS), GetSlot(item, HOURS), GetSlot(item, MINUTES), GetSlot(item, SECONDS), GetSlot(item, MILLISECONDS), GetSlot(item, MICROSECONDS), GetSlot(item, NANOSECONDS));
    }
    return ToTemporalDuration(item);
  }
  static compare(oneParam, twoParam, optionsParam = void 0) {
    const one = ToTemporalDuration(oneParam);
    const two = ToTemporalDuration(twoParam);
    const options = GetOptionsObject(optionsParam);
    const relativeTo = ToRelativeTemporalObject(options);
    const y1 = GetSlot(one, YEARS);
    const mon1 = GetSlot(one, MONTHS);
    const w1 = GetSlot(one, WEEKS);
    let d1 = GetSlot(one, DAYS);
    const h1 = GetSlot(one, HOURS);
    const min1 = GetSlot(one, MINUTES);
    const s1 = GetSlot(one, SECONDS);
    const ms1 = GetSlot(one, MILLISECONDS);
    const \u00B5s1 = GetSlot(one, MICROSECONDS);
    let ns1 = GetSlot(one, NANOSECONDS);
    const y2 = GetSlot(two, YEARS);
    const mon2 = GetSlot(two, MONTHS);
    const w2 = GetSlot(two, WEEKS);
    let d2 = GetSlot(two, DAYS);
    const h2 = GetSlot(two, HOURS);
    const min2 = GetSlot(two, MINUTES);
    const s2 = GetSlot(two, SECONDS);
    const ms2 = GetSlot(two, MILLISECONDS);
    const \u00B5s2 = GetSlot(two, MICROSECONDS);
    let ns2 = GetSlot(two, NANOSECONDS);
    const shift1 = CalculateOffsetShift(relativeTo, y1, mon1, w1, d1, h1, min1, s1, ms1, \u00B5s1, ns1);
    const shift2 = CalculateOffsetShift(relativeTo, y2, mon2, w2, d2, h2, min2, s2, ms2, \u00B5s2, ns2);
    if (y1 !== 0 || y2 !== 0 || mon1 !== 0 || mon2 !== 0 || w1 !== 0 || w2 !== 0) {
      ({ days: d1 } = UnbalanceDurationRelative(y1, mon1, w1, d1, "day", relativeTo));
      ({ days: d2 } = UnbalanceDurationRelative(y2, mon2, w2, d2, "day", relativeTo));
    }
    const totalNs1 = TotalDurationNanoseconds(d1, h1, min1, s1, ms1, \u00B5s1, ns1, shift1);
    const totalNs2 = TotalDurationNanoseconds(d2, h2, min2, s2, ms2, \u00B5s2, ns2, shift2);
    return ComparisonResult(totalNs1.minus(totalNs2).toJSNumber());
  }
};
MakeIntrinsicClass(Duration, "Temporal.Duration");
var ObjectCreate$1 = Object.create;
var PlainMonthDay = class {
  constructor(isoMonthParam, isoDayParam, calendarParam = GetISO8601Calendar(), referenceISOYearParam = 1972) {
    const isoMonth = ToIntegerThrowOnInfinity(isoMonthParam);
    const isoDay = ToIntegerThrowOnInfinity(isoDayParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    const referenceISOYear = ToIntegerThrowOnInfinity(referenceISOYearParam);
    if (arguments.length < 2) {
      throw new RangeError("missing argument: isoMonth and isoDay are required");
    }
    CreateTemporalMonthDaySlots(this, isoMonth, isoDay, calendar2, referenceISOYear);
  }
  get monthCode() {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthCode(GetSlot(this, CALENDAR), this);
  }
  get day() {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return CalendarDay(GetSlot(this, CALENDAR), this);
  }
  get calendar() {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  with(temporalMonthDayLike, optionsParam = void 0) {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalMonthDayLike)) {
      throw new TypeError("invalid argument");
    }
    RejectObjectWithCalendarOrTimeZone(temporalMonthDayLike);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["day", "month", "monthCode", "year"]);
    const props = ToPartialRecord(temporalMonthDayLike, fieldNames);
    if (!props) {
      throw new TypeError("invalid month-day-like");
    }
    let fields = ToTemporalMonthDayFields(this, fieldNames);
    fields = CalendarMergeFields(calendar2, fields, props);
    fields = ToTemporalMonthDayFields(fields, fieldNames);
    const options = GetOptionsObject(optionsParam);
    return MonthDayFromFields(calendar2, fields, options);
  }
  equals(otherParam) {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalMonthDay(otherParam);
    for (const slot of [ISO_MONTH, ISO_DAY, ISO_YEAR]) {
      const val1 = GetSlot(this, slot);
      const val2 = GetSlot(other, slot);
      if (val1 !== val2)
        return false;
    }
    return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const showCalendar = ToShowCalendarOption(options);
    return TemporalMonthDayToString(this, showCalendar);
  }
  toJSON() {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return TemporalMonthDayToString(this);
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use equals() to compare Temporal.PlainMonthDay");
  }
  toPlainDate(item) {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(item))
      throw new TypeError("argument should be an object");
    const calendar2 = GetSlot(this, CALENDAR);
    const receiverFieldNames = CalendarFields(calendar2, ["day", "monthCode"]);
    const fields = ToTemporalMonthDayFields(this, receiverFieldNames);
    const inputFieldNames = CalendarFields(calendar2, ["year"]);
    const inputEntries = [["year", void 0]];
    inputFieldNames.forEach((fieldName) => {
      if (!inputEntries.some(([name]) => name === fieldName)) {
        inputEntries.push([fieldName, void 0]);
      }
    });
    const inputFields = PrepareTemporalFields(item, inputEntries);
    let mergedFields = CalendarMergeFields(calendar2, fields, inputFields);
    const mergedFieldNames = [.../* @__PURE__ */ new Set([...receiverFieldNames, ...inputFieldNames])];
    const mergedEntries = [];
    mergedFieldNames.forEach((fieldName) => {
      if (!mergedEntries.some(([name]) => name === fieldName)) {
        mergedEntries.push([fieldName, void 0]);
      }
    });
    mergedFields = PrepareTemporalFields(mergedFields, mergedEntries);
    const options = ObjectCreate$1(null);
    options.overflow = "reject";
    return DateFromFields(calendar2, mergedFields, options);
  }
  getISOFields() {
    if (!IsTemporalMonthDay(this))
      throw new TypeError("invalid receiver");
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(this, ISO_DAY),
      isoMonth: GetSlot(this, ISO_MONTH),
      isoYear: GetSlot(this, ISO_YEAR)
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    if (IsTemporalMonthDay(item)) {
      ToTemporalOverflow(options);
      return CreateTemporalMonthDay(GetSlot(item, ISO_MONTH), GetSlot(item, ISO_DAY), GetSlot(item, CALENDAR), GetSlot(item, ISO_YEAR));
    }
    return ToTemporalMonthDay(item, options);
  }
};
MakeIntrinsicClass(PlainMonthDay, "Temporal.PlainMonthDay");
var instant = () => {
  const Instant2 = GetIntrinsic("%Temporal.Instant%");
  return new Instant2(SystemUTCEpochNanoSeconds());
};
var plainDateTime = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  const tZ = ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar2 = ToTemporalCalendar(calendarLike);
  const inst = instant();
  return BuiltinTimeZoneGetPlainDateTimeFor(tZ, inst, calendar2);
};
var plainDateTimeISO = (temporalTimeZoneLike = timeZone()) => {
  const tZ = ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar2 = GetISO8601Calendar();
  const inst = instant();
  return BuiltinTimeZoneGetPlainDateTimeFor(tZ, inst, calendar2);
};
var zonedDateTime = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  const tZ = ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar2 = ToTemporalCalendar(calendarLike);
  return CreateTemporalZonedDateTime(SystemUTCEpochNanoSeconds(), tZ, calendar2);
};
var zonedDateTimeISO = (temporalTimeZoneLike = timeZone()) => {
  return zonedDateTime(GetISO8601Calendar(), temporalTimeZoneLike);
};
var plainDate = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  return TemporalDateTimeToDate(plainDateTime(calendarLike, temporalTimeZoneLike));
};
var plainDateISO = (temporalTimeZoneLike = timeZone()) => {
  return TemporalDateTimeToDate(plainDateTimeISO(temporalTimeZoneLike));
};
var plainTimeISO = (temporalTimeZoneLike = timeZone()) => {
  return TemporalDateTimeToTime(plainDateTimeISO(temporalTimeZoneLike));
};
var timeZone = () => {
  return SystemTimeZone();
};
var Now = {
  instant,
  plainDateTime,
  plainDateTimeISO,
  plainDate,
  plainDateISO,
  plainTimeISO,
  timeZone,
  zonedDateTime,
  zonedDateTimeISO,
  [Symbol.toStringTag]: "Temporal.Now"
};
Object.defineProperty(Now, Symbol.toStringTag, {
  value: "Temporal.Now",
  writable: false,
  enumerable: false,
  configurable: true
});
var ObjectAssign = Object.assign;
var DISALLOWED_UNITS$1 = ["year", "month", "week", "day"];
var MAX_INCREMENTS = {
  hour: 24,
  minute: 60,
  second: 60,
  millisecond: 1e3,
  microsecond: 1e3,
  nanosecond: 1e3
};
function TemporalTimeToString(time2, precision, options = void 0) {
  let hour = GetSlot(time2, ISO_HOUR);
  let minute = GetSlot(time2, ISO_MINUTE);
  let second = GetSlot(time2, ISO_SECOND);
  let millisecond = GetSlot(time2, ISO_MILLISECOND);
  let microsecond = GetSlot(time2, ISO_MICROSECOND);
  let nanosecond = GetSlot(time2, ISO_NANOSECOND);
  if (options) {
    const { unit, increment, roundingMode } = options;
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RoundTime(hour, minute, second, millisecond, microsecond, nanosecond, increment, unit, roundingMode));
  }
  const hourString = ISODateTimePartString(hour);
  const minuteString = ISODateTimePartString(minute);
  const seconds = FormatSecondsStringPart(second, millisecond, microsecond, nanosecond, precision);
  return `${hourString}:${minuteString}${seconds}`;
}
var PlainTime = class {
  constructor(isoHourParam = 0, isoMinuteParam = 0, isoSecondParam = 0, isoMillisecondParam = 0, isoMicrosecondParam = 0, isoNanosecondParam = 0) {
    const isoHour = ToIntegerThrowOnInfinity(isoHourParam);
    const isoMinute = ToIntegerThrowOnInfinity(isoMinuteParam);
    const isoSecond = ToIntegerThrowOnInfinity(isoSecondParam);
    const isoMillisecond = ToIntegerThrowOnInfinity(isoMillisecondParam);
    const isoMicrosecond = ToIntegerThrowOnInfinity(isoMicrosecondParam);
    const isoNanosecond = ToIntegerThrowOnInfinity(isoNanosecondParam);
    RejectTime(isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond);
    CreateSlots(this);
    SetSlot(this, ISO_HOUR, isoHour);
    SetSlot(this, ISO_MINUTE, isoMinute);
    SetSlot(this, ISO_SECOND, isoSecond);
    SetSlot(this, ISO_MILLISECOND, isoMillisecond);
    SetSlot(this, ISO_MICROSECOND, isoMicrosecond);
    SetSlot(this, ISO_NANOSECOND, isoNanosecond);
    SetSlot(this, CALENDAR, GetISO8601Calendar());
    {
      Object.defineProperty(this, "_repr_", {
        value: `${this[Symbol.toStringTag]} <${TemporalTimeToString(this, "auto")}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get calendar() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  get hour() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_HOUR);
  }
  get minute() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MINUTE);
  }
  get second() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_SECOND);
  }
  get millisecond() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MILLISECOND);
  }
  get microsecond() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_MICROSECOND);
  }
  get nanosecond() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, ISO_NANOSECOND);
  }
  with(temporalTimeLike, optionsParam = void 0) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalTimeLike)) {
      throw new TypeError("invalid argument");
    }
    RejectObjectWithCalendarOrTimeZone(temporalTimeLike);
    const options = GetOptionsObject(optionsParam);
    const overflow = ToTemporalOverflow(options);
    const props = ToPartialRecord(temporalTimeLike, [
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "nanosecond",
      "second"
    ]);
    if (!props) {
      throw new TypeError("invalid time-like");
    }
    const fields = ToTemporalTimeRecord(this);
    let { hour, minute, second, millisecond, microsecond, nanosecond } = ObjectAssign(fields, props);
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow));
    return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  add(temporalDurationLike) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    let hour = GetSlot(this, ISO_HOUR);
    let minute = GetSlot(this, ISO_MINUTE);
    let second = GetSlot(this, ISO_SECOND);
    let millisecond = GetSlot(this, ISO_MILLISECOND);
    let microsecond = GetSlot(this, ISO_MICROSECOND);
    let nanosecond = GetSlot(this, ISO_NANOSECOND);
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = AddTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds));
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, "reject"));
    return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  subtract(temporalDurationLike) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    let hour = GetSlot(this, ISO_HOUR);
    let minute = GetSlot(this, ISO_MINUTE);
    let second = GetSlot(this, ISO_SECOND);
    let millisecond = GetSlot(this, ISO_MILLISECOND);
    let microsecond = GetSlot(this, ISO_MICROSECOND);
    let nanosecond = GetSlot(this, ISO_NANOSECOND);
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = AddTime(hour, minute, second, millisecond, microsecond, nanosecond, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds));
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, "reject"));
    return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalTime(otherParam);
    const options = GetOptionsObject(optionsParam);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$1, "hour");
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond", DISALLOWED_UNITS$1);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, MAX_INCREMENTS[smallestUnit], false);
    let { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceTime(GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND), GetSlot(other, ISO_HOUR), GetSlot(other, ISO_MINUTE), GetSlot(other, ISO_SECOND), GetSlot(other, ISO_MILLISECOND), GetSlot(other, ISO_MICROSECOND), GetSlot(other, ISO_NANOSECOND));
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode));
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalTime(otherParam);
    const options = GetOptionsObject(optionsParam);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS$1, "hour");
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond", DISALLOWED_UNITS$1);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, MAX_INCREMENTS[smallestUnit], false);
    let { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceTime(GetSlot(other, ISO_HOUR), GetSlot(other, ISO_MINUTE), GetSlot(other, ISO_SECOND), GetSlot(other, ISO_MILLISECOND), GetSlot(other, ISO_MICROSECOND), GetSlot(other, ISO_NANOSECOND), GetSlot(this, ISO_HOUR), GetSlot(this, ISO_MINUTE), GetSlot(this, ISO_SECOND), GetSlot(this, ISO_MILLISECOND), GetSlot(this, ISO_MICROSECOND), GetSlot(this, ISO_NANOSECOND));
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(0, 0, 0, 0, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds, roundingIncrement, smallestUnit, NegateTemporalRoundingMode(roundingMode)));
    hours = -hours;
    minutes = -minutes;
    seconds = -seconds;
    milliseconds = -milliseconds;
    microseconds = -microseconds;
    nanoseconds = -nanoseconds;
    ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(0, 0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  round(optionsParam) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    if (optionsParam === void 0)
      throw new TypeError("options parameter is required");
    const options = typeof optionsParam === "string" ? CreateOnePropObject("smallestUnit", optionsParam) : GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, void 0, DISALLOWED_UNITS$1);
    if (smallestUnit === void 0)
      throw new RangeError("smallestUnit is required");
    const roundingMode = ToTemporalRoundingMode(options, "halfExpand");
    const roundingIncrement = ToTemporalRoundingIncrement(options, MAX_INCREMENTS[smallestUnit], false);
    let hour = GetSlot(this, ISO_HOUR);
    let minute = GetSlot(this, ISO_MINUTE);
    let second = GetSlot(this, ISO_SECOND);
    let millisecond = GetSlot(this, ISO_MILLISECOND);
    let microsecond = GetSlot(this, ISO_MICROSECOND);
    let nanosecond = GetSlot(this, ISO_NANOSECOND);
    ({ hour, minute, second, millisecond, microsecond, nanosecond } = RoundTime(hour, minute, second, millisecond, microsecond, nanosecond, roundingIncrement, smallestUnit, roundingMode));
    return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  equals(otherParam) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalTime(otherParam);
    for (const slot of [ISO_HOUR, ISO_MINUTE, ISO_SECOND, ISO_MILLISECOND, ISO_MICROSECOND, ISO_NANOSECOND]) {
      const val1 = GetSlot(this, slot);
      const val2 = GetSlot(other, slot);
      if (val1 !== val2)
        return false;
    }
    return true;
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const { precision, unit, increment } = ToSecondsStringPrecision(options);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    return TemporalTimeToString(this, precision, { unit, increment, roundingMode });
  }
  toJSON() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return TemporalTimeToString(this, "auto");
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.PlainTime");
  }
  toPlainDateTime(temporalDateParam) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    const temporalDate = ToTemporalDate(temporalDateParam);
    const year = GetSlot(temporalDate, ISO_YEAR);
    const month = GetSlot(temporalDate, ISO_MONTH);
    const day = GetSlot(temporalDate, ISO_DAY);
    const calendar2 = GetSlot(temporalDate, CALENDAR);
    const hour = GetSlot(this, ISO_HOUR);
    const minute = GetSlot(this, ISO_MINUTE);
    const second = GetSlot(this, ISO_SECOND);
    const millisecond = GetSlot(this, ISO_MILLISECOND);
    const microsecond = GetSlot(this, ISO_MICROSECOND);
    const nanosecond = GetSlot(this, ISO_NANOSECOND);
    return CreateTemporalDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
  }
  toZonedDateTime(item) {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(item)) {
      throw new TypeError("invalid argument");
    }
    const dateLike = item.plainDate;
    if (dateLike === void 0) {
      throw new TypeError("missing date property");
    }
    const temporalDate = ToTemporalDate(dateLike);
    const timeZoneLike = item.timeZone;
    if (timeZoneLike === void 0) {
      throw new TypeError("missing timeZone property");
    }
    const timeZone2 = ToTemporalTimeZone(timeZoneLike);
    const year = GetSlot(temporalDate, ISO_YEAR);
    const month = GetSlot(temporalDate, ISO_MONTH);
    const day = GetSlot(temporalDate, ISO_DAY);
    const calendar2 = GetSlot(temporalDate, CALENDAR);
    const hour = GetSlot(this, ISO_HOUR);
    const minute = GetSlot(this, ISO_MINUTE);
    const second = GetSlot(this, ISO_SECOND);
    const millisecond = GetSlot(this, ISO_MILLISECOND);
    const microsecond = GetSlot(this, ISO_MICROSECOND);
    const nanosecond = GetSlot(this, ISO_NANOSECOND);
    const PlainDateTime2 = GetIntrinsic("%Temporal.PlainDateTime%");
    const dt = new PlainDateTime2(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, dt, "compatible");
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  getISOFields() {
    if (!IsTemporalTime(this))
      throw new TypeError("invalid receiver");
    return {
      calendar: GetSlot(this, CALENDAR),
      isoHour: GetSlot(this, ISO_HOUR),
      isoMicrosecond: GetSlot(this, ISO_MICROSECOND),
      isoMillisecond: GetSlot(this, ISO_MILLISECOND),
      isoMinute: GetSlot(this, ISO_MINUTE),
      isoNanosecond: GetSlot(this, ISO_NANOSECOND),
      isoSecond: GetSlot(this, ISO_SECOND)
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    const overflow = ToTemporalOverflow(options);
    if (IsTemporalTime(item)) {
      return new PlainTime(GetSlot(item, ISO_HOUR), GetSlot(item, ISO_MINUTE), GetSlot(item, ISO_SECOND), GetSlot(item, ISO_MILLISECOND), GetSlot(item, ISO_MICROSECOND), GetSlot(item, ISO_NANOSECOND));
    }
    return ToTemporalTime(item, overflow);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalTime(oneParam);
    const two = ToTemporalTime(twoParam);
    for (const slot of [ISO_HOUR, ISO_MINUTE, ISO_SECOND, ISO_MILLISECOND, ISO_MICROSECOND, ISO_NANOSECOND]) {
      const val1 = GetSlot(one, slot);
      const val2 = GetSlot(two, slot);
      if (val1 !== val2)
        return ComparisonResult(val1 - val2);
    }
    return 0;
  }
};
MakeIntrinsicClass(PlainTime, "Temporal.PlainTime");
var TimeZone = class {
  constructor(timeZoneIdentifierParam) {
    if (arguments.length < 1) {
      throw new RangeError("missing argument: identifier is required");
    }
    const timeZoneIdentifier = GetCanonicalTimeZoneIdentifier(timeZoneIdentifierParam);
    CreateSlots(this);
    SetSlot(this, TIMEZONE_ID, timeZoneIdentifier);
    {
      Object.defineProperty(this, "_repr_", {
        value: `${this[Symbol.toStringTag]} <${timeZoneIdentifier}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get id() {
    return ToString(this);
  }
  getOffsetNanosecondsFor(instantParam) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const instant2 = ToTemporalInstant(instantParam);
    const id = GetSlot(this, TIMEZONE_ID);
    const offsetNs = ParseOffsetString(id);
    if (offsetNs !== null)
      return offsetNs;
    return GetIANATimeZoneOffsetNanoseconds(GetSlot(instant2, EPOCHNANOSECONDS), id);
  }
  getOffsetStringFor(instantParam) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const instant2 = ToTemporalInstant(instantParam);
    return BuiltinTimeZoneGetOffsetStringFor(this, instant2);
  }
  getPlainDateTimeFor(instantParam, calendarParam = GetISO8601Calendar()) {
    const instant2 = ToTemporalInstant(instantParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    return BuiltinTimeZoneGetPlainDateTimeFor(this, instant2, calendar2);
  }
  getInstantFor(dateTimeParam, optionsParam = void 0) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const dateTime2 = ToTemporalDateTime(dateTimeParam);
    const options = GetOptionsObject(optionsParam);
    const disambiguation = ToTemporalDisambiguation(options);
    return BuiltinTimeZoneGetInstantFor(this, dateTime2, disambiguation);
  }
  getPossibleInstantsFor(dateTimeParam) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const dateTime2 = ToTemporalDateTime(dateTimeParam);
    const Instant2 = GetIntrinsic("%Temporal.Instant%");
    const id = GetSlot(this, TIMEZONE_ID);
    const offsetNs = ParseOffsetString(id);
    if (offsetNs !== null) {
      const epochNs = GetEpochFromISOParts(GetSlot(dateTime2, ISO_YEAR), GetSlot(dateTime2, ISO_MONTH), GetSlot(dateTime2, ISO_DAY), GetSlot(dateTime2, ISO_HOUR), GetSlot(dateTime2, ISO_MINUTE), GetSlot(dateTime2, ISO_SECOND), GetSlot(dateTime2, ISO_MILLISECOND), GetSlot(dateTime2, ISO_MICROSECOND), GetSlot(dateTime2, ISO_NANOSECOND));
      if (epochNs === null)
        throw new RangeError("DateTime outside of supported range");
      return [new Instant2(epochNs.minus(offsetNs))];
    }
    const possibleEpochNs = GetIANATimeZoneEpochValue(id, GetSlot(dateTime2, ISO_YEAR), GetSlot(dateTime2, ISO_MONTH), GetSlot(dateTime2, ISO_DAY), GetSlot(dateTime2, ISO_HOUR), GetSlot(dateTime2, ISO_MINUTE), GetSlot(dateTime2, ISO_SECOND), GetSlot(dateTime2, ISO_MILLISECOND), GetSlot(dateTime2, ISO_MICROSECOND), GetSlot(dateTime2, ISO_NANOSECOND));
    return possibleEpochNs.map((ns) => new Instant2(ns));
  }
  getNextTransition(startingPointParam) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const startingPoint = ToTemporalInstant(startingPointParam);
    const id = GetSlot(this, TIMEZONE_ID);
    if (ParseOffsetString(id) !== null || id === "UTC") {
      return null;
    }
    let epochNanoseconds = GetSlot(startingPoint, EPOCHNANOSECONDS);
    const Instant2 = GetIntrinsic("%Temporal.Instant%");
    epochNanoseconds = GetIANATimeZoneNextTransition(epochNanoseconds, id);
    return epochNanoseconds === null ? null : new Instant2(epochNanoseconds);
  }
  getPreviousTransition(startingPointParam) {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    const startingPoint = ToTemporalInstant(startingPointParam);
    const id = GetSlot(this, TIMEZONE_ID);
    if (ParseOffsetString(id) !== null || id === "UTC") {
      return null;
    }
    let epochNanoseconds = GetSlot(startingPoint, EPOCHNANOSECONDS);
    const Instant2 = GetIntrinsic("%Temporal.Instant%");
    epochNanoseconds = GetIANATimeZonePreviousTransition(epochNanoseconds, id);
    return epochNanoseconds === null ? null : new Instant2(epochNanoseconds);
  }
  toString() {
    if (!IsTemporalTimeZone(this))
      throw new TypeError("invalid receiver");
    return ToString(GetSlot(this, TIMEZONE_ID));
  }
  toJSON() {
    return ToString(this);
  }
  static from(item) {
    return ToTemporalTimeZone(item);
  }
};
MakeIntrinsicClass(TimeZone, "Temporal.TimeZone");
var ObjectCreate = Object.create;
var DISALLOWED_UNITS = [
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond",
  "microsecond",
  "nanosecond"
];
var PlainYearMonth = class {
  constructor(isoYearParam, isoMonthParam, calendarParam = GetISO8601Calendar(), referenceISODayParam = 1) {
    const isoYear = ToIntegerThrowOnInfinity(isoYearParam);
    const isoMonth = ToIntegerThrowOnInfinity(isoMonthParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    const referenceISODay = ToIntegerThrowOnInfinity(referenceISODayParam);
    if (arguments.length < 2) {
      throw new RangeError("missing argument: isoYear and isoMonth are required");
    }
    CreateTemporalYearMonthSlots(this, isoYear, isoMonth, calendar2, referenceISODay);
  }
  get year() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarYear(GetSlot(this, CALENDAR), this);
  }
  get month() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarMonth(GetSlot(this, CALENDAR), this);
  }
  get monthCode() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthCode(GetSlot(this, CALENDAR), this);
  }
  get calendar() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  get era() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarEra(GetSlot(this, CALENDAR), this);
  }
  get eraYear() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarEraYear(GetSlot(this, CALENDAR), this);
  }
  get daysInMonth() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInMonth(GetSlot(this, CALENDAR), this);
  }
  get daysInYear() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInYear(GetSlot(this, CALENDAR), this);
  }
  get monthsInYear() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthsInYear(GetSlot(this, CALENDAR), this);
  }
  get inLeapYear() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return CalendarInLeapYear(GetSlot(this, CALENDAR), this);
  }
  with(temporalYearMonthLike, optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalYearMonthLike)) {
      throw new TypeError("invalid argument");
    }
    RejectObjectWithCalendarOrTimeZone(temporalYearMonthLike);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["month", "monthCode", "year"]);
    const props = ToPartialRecord(temporalYearMonthLike, fieldNames);
    if (!props) {
      throw new TypeError("invalid year-month-like");
    }
    let fields = ToTemporalYearMonthFields(this, fieldNames);
    fields = CalendarMergeFields(calendar2, fields, props);
    fields = ToTemporalYearMonthFields(fields, fieldNames);
    const options = GetOptionsObject(optionsParam);
    return YearMonthFromFields(calendar2, fields, options);
  }
  add(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    ({ days } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, "day"));
    const options = GetOptionsObject(optionsParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, fieldNames);
    const sign = DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
    const day = sign < 0 ? ToPositiveInteger(CalendarDaysInMonth(calendar2, this)) : 1;
    const startDate = DateFromFields(calendar2, { ...fields, day });
    const optionsCopy = { ...options };
    const addedDate = CalendarDateAdd(calendar2, startDate, { ...duration2, days }, options);
    const addedDateFields = ToTemporalYearMonthFields(addedDate, fieldNames);
    return YearMonthFromFields(calendar2, addedDateFields, optionsCopy);
  }
  subtract(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    let duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    duration2 = {
      years: -duration2.years,
      months: -duration2.months,
      weeks: -duration2.weeks,
      days: -duration2.days,
      hours: -duration2.hours,
      minutes: -duration2.minutes,
      seconds: -duration2.seconds,
      milliseconds: -duration2.milliseconds,
      microseconds: -duration2.microseconds,
      nanoseconds: -duration2.nanoseconds
    };
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    ({ days } = BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, "day"));
    const options = GetOptionsObject(optionsParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, fieldNames);
    const sign = DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
    const day = sign < 0 ? ToPositiveInteger(CalendarDaysInMonth(calendar2, this)) : 1;
    const startDate = DateFromFields(calendar2, { ...fields, day });
    const optionsCopy = { ...options };
    const addedDate = CalendarDateAdd(calendar2, startDate, { ...duration2, days }, options);
    const addedDateFields = ToTemporalYearMonthFields(addedDate, fieldNames);
    return YearMonthFromFields(calendar2, addedDateFields, optionsCopy);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalYearMonth(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarID2 = ToString(calendar2);
    const otherCalendarID = ToString(otherCalendar);
    if (calendarID2 !== otherCalendarID) {
      throw new RangeError(`cannot compute difference between months of ${calendarID2} and ${otherCalendarID} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "month", DISALLOWED_UNITS);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS, "year");
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, void 0, false);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const otherFields = ToTemporalYearMonthFields(other, fieldNames);
    const thisFields = ToTemporalYearMonthFields(this, fieldNames);
    const otherDate = DateFromFields(calendar2, { ...otherFields, day: 1 });
    const thisDate = DateFromFields(calendar2, { ...thisFields, day: 1 });
    const untilOptions = { ...options, largestUnit };
    const result = CalendarDateUntil(calendar2, thisDate, otherDate, untilOptions);
    if (smallestUnit === "month" && roundingIncrement === 1)
      return result;
    let { years, months } = result;
    ({ years, months } = RoundDuration(years, months, 0, 0, 0, 0, 0, 0, 0, 0, roundingIncrement, smallestUnit, roundingMode, thisDate));
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(years, months, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalYearMonth(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarID2 = ToString(calendar2);
    const otherCalendarID = ToString(otherCalendar);
    if (calendarID2 !== otherCalendarID) {
      throw new RangeError(`cannot compute difference between months of ${calendarID2} and ${otherCalendarID} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "month", DISALLOWED_UNITS);
    const largestUnit = ToLargestTemporalUnit(options, "auto", DISALLOWED_UNITS, "year");
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalRoundingIncrement(options, void 0, false);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const otherFields = ToTemporalYearMonthFields(other, fieldNames);
    const thisFields = ToTemporalYearMonthFields(this, fieldNames);
    const otherDate = DateFromFields(calendar2, { ...otherFields, day: 1 });
    const thisDate = DateFromFields(calendar2, { ...thisFields, day: 1 });
    const untilOptions = { ...options, largestUnit };
    let { years, months } = CalendarDateUntil(calendar2, thisDate, otherDate, untilOptions);
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    if (smallestUnit === "month" && roundingIncrement === 1) {
      return new Duration2(-years, -months, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    ({ years, months } = RoundDuration(years, months, 0, 0, 0, 0, 0, 0, 0, 0, roundingIncrement, smallestUnit, NegateTemporalRoundingMode(roundingMode), thisDate));
    return new Duration2(-years, -months, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  equals(otherParam) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalYearMonth(otherParam);
    for (const slot of [ISO_YEAR, ISO_MONTH, ISO_DAY]) {
      const val1 = GetSlot(this, slot);
      const val2 = GetSlot(other, slot);
      if (val1 !== val2)
        return false;
    }
    return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const showCalendar = ToShowCalendarOption(options);
    return TemporalYearMonthToString(this, showCalendar);
  }
  toJSON() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return TemporalYearMonthToString(this);
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.PlainYearMonth");
  }
  toPlainDate(item) {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(item))
      throw new TypeError("argument should be an object");
    const calendar2 = GetSlot(this, CALENDAR);
    const receiverFieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, receiverFieldNames);
    const inputFieldNames = CalendarFields(calendar2, ["day"]);
    const inputEntries = [["day"]];
    inputFieldNames.forEach((fieldName) => {
      if (!inputEntries.some(([name]) => name === fieldName)) {
        inputEntries.push([
          fieldName,
          void 0
        ]);
      }
    });
    const inputFields = PrepareTemporalFields(item, inputEntries);
    let mergedFields = CalendarMergeFields(calendar2, fields, inputFields);
    const mergedFieldNames = [.../* @__PURE__ */ new Set([...receiverFieldNames, ...inputFieldNames])];
    const mergedEntries = [];
    mergedFieldNames.forEach((fieldName) => {
      if (!mergedEntries.some(([name]) => name === fieldName)) {
        mergedEntries.push([fieldName, void 0]);
      }
    });
    mergedFields = PrepareTemporalFields(mergedFields, mergedEntries);
    const options = ObjectCreate(null);
    options.overflow = "reject";
    return DateFromFields(calendar2, mergedFields, options);
  }
  getISOFields() {
    if (!IsTemporalYearMonth(this))
      throw new TypeError("invalid receiver");
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(this, ISO_DAY),
      isoMonth: GetSlot(this, ISO_MONTH),
      isoYear: GetSlot(this, ISO_YEAR)
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    if (IsTemporalYearMonth(item)) {
      ToTemporalOverflow(options);
      return CreateTemporalYearMonth(GetSlot(item, ISO_YEAR), GetSlot(item, ISO_MONTH), GetSlot(item, CALENDAR), GetSlot(item, ISO_DAY));
    }
    return ToTemporalYearMonth(item, options);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalYearMonth(oneParam);
    const two = ToTemporalYearMonth(twoParam);
    return CompareISODate(GetSlot(one, ISO_YEAR), GetSlot(one, ISO_MONTH), GetSlot(one, ISO_DAY), GetSlot(two, ISO_YEAR), GetSlot(two, ISO_MONTH), GetSlot(two, ISO_DAY));
  }
};
MakeIntrinsicClass(PlainYearMonth, "Temporal.PlainYearMonth");
var ArrayPrototypePush = Array.prototype.push;
var ZonedDateTime = class {
  constructor(epochNanosecondsParam, timeZoneParam, calendarParam = GetISO8601Calendar()) {
    if (arguments.length < 1) {
      throw new TypeError("missing argument: epochNanoseconds is required");
    }
    const epochNanoseconds = ToBigInt(epochNanosecondsParam);
    const timeZone2 = ToTemporalTimeZone(timeZoneParam);
    const calendar2 = ToTemporalCalendar(calendarParam);
    CreateTemporalZonedDateTimeSlots(this, epochNanoseconds, timeZone2, calendar2);
  }
  get calendar() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, CALENDAR);
  }
  get timeZone() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(this, TIME_ZONE);
  }
  get year() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get month() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonth(GetSlot(this, CALENDAR), dateTime(this));
  }
  get monthCode() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthCode(GetSlot(this, CALENDAR), dateTime(this));
  }
  get day() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDay(GetSlot(this, CALENDAR), dateTime(this));
  }
  get hour() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_HOUR);
  }
  get minute() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_MINUTE);
  }
  get second() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_SECOND);
  }
  get millisecond() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_MILLISECOND);
  }
  get microsecond() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_MICROSECOND);
  }
  get nanosecond() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetSlot(dateTime(this), ISO_NANOSECOND);
  }
  get era() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarEra(GetSlot(this, CALENDAR), dateTime(this));
  }
  get eraYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarEraYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get epochSeconds() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const value = GetSlot(this, EPOCHNANOSECONDS);
    return +value.divide(1e9);
  }
  get epochMilliseconds() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const value = GetSlot(this, EPOCHNANOSECONDS);
    return +value.divide(1e6);
  }
  get epochMicroseconds() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const value = GetSlot(this, EPOCHNANOSECONDS);
    return bigIntIfAvailable$1(value.divide(1e3));
  }
  get epochNanoseconds() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return bigIntIfAvailable$1(GetSlot(this, EPOCHNANOSECONDS));
  }
  get dayOfWeek() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfWeek(GetSlot(this, CALENDAR), dateTime(this));
  }
  get dayOfYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDayOfYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get weekOfYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarWeekOfYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get hoursInDay() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const dt = dateTime(this);
    const DateTime = GetIntrinsic("%Temporal.PlainDateTime%");
    const year = GetSlot(dt, ISO_YEAR);
    const month = GetSlot(dt, ISO_MONTH);
    const day = GetSlot(dt, ISO_DAY);
    const today = new DateTime(year, month, day, 0, 0, 0, 0, 0, 0);
    const tomorrowFields = AddISODate(year, month, day, 0, 0, 0, 1, "reject");
    const tomorrow = new DateTime(tomorrowFields.year, tomorrowFields.month, tomorrowFields.day, 0, 0, 0, 0, 0, 0);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const todayNs = GetSlot(BuiltinTimeZoneGetInstantFor(timeZone2, today, "compatible"), EPOCHNANOSECONDS);
    const tomorrowNs = GetSlot(BuiltinTimeZoneGetInstantFor(timeZone2, tomorrow, "compatible"), EPOCHNANOSECONDS);
    return tomorrowNs.subtract(todayNs).toJSNumber() / 36e11;
  }
  get daysInWeek() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInWeek(GetSlot(this, CALENDAR), dateTime(this));
  }
  get daysInMonth() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInMonth(GetSlot(this, CALENDAR), dateTime(this));
  }
  get daysInYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarDaysInYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get monthsInYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarMonthsInYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get inLeapYear() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return CalendarInLeapYear(GetSlot(this, CALENDAR), dateTime(this));
  }
  get offset() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return BuiltinTimeZoneGetOffsetStringFor(GetSlot(this, TIME_ZONE), GetSlot(this, INSTANT));
  }
  get offsetNanoseconds() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return GetOffsetNanosecondsFor(GetSlot(this, TIME_ZONE), GetSlot(this, INSTANT));
  }
  with(temporalZonedDateTimeLike, optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    if (!IsObject(temporalZonedDateTimeLike)) {
      throw new TypeError("invalid zoned-date-time-like");
    }
    RejectObjectWithCalendarOrTimeZone(temporalZonedDateTimeLike);
    const options = GetOptionsObject(optionsParam);
    const disambiguation = ToTemporalDisambiguation(options);
    const offset2 = ToTemporalOffset(options, "prefer");
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, [
      "day",
      "hour",
      "microsecond",
      "millisecond",
      "minute",
      "month",
      "monthCode",
      "nanosecond",
      "second",
      "year"
    ]);
    ArrayPrototypePush.call(fieldNames, "offset");
    const props = ToPartialRecord(temporalZonedDateTimeLike, fieldNames);
    if (!props) {
      throw new TypeError("invalid zoned-date-time-like");
    }
    const entries = [
      ["day", void 0],
      ["hour", 0],
      ["microsecond", 0],
      ["millisecond", 0],
      ["minute", 0],
      ["month", void 0],
      ["monthCode", void 0],
      ["nanosecond", 0],
      ["second", 0],
      ["year", void 0],
      ["offset"],
      ["timeZone"]
    ];
    fieldNames.forEach((fieldName) => {
      if (!entries.some(([name]) => name === fieldName)) {
        entries.push([fieldName, void 0]);
      }
    });
    let fields = PrepareTemporalFields(this, entries);
    fields = CalendarMergeFields(calendar2, fields, props);
    fields = PrepareTemporalFields(fields, entries);
    const { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = InterpretTemporalDateTimeFields(calendar2, fields, options);
    const offsetNs = ParseOffsetString(fields.offset);
    const epochNanoseconds = InterpretISODateTimeOffset(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, "option", offsetNs, timeZone2, disambiguation, offset2, false);
    return CreateTemporalZonedDateTime(epochNanoseconds, GetSlot(this, TIME_ZONE), calendar2);
  }
  withPlainDate(temporalDateParam) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const temporalDate = ToTemporalDate(temporalDateParam);
    const year = GetSlot(temporalDate, ISO_YEAR);
    const month = GetSlot(temporalDate, ISO_MONTH);
    const day = GetSlot(temporalDate, ISO_DAY);
    let calendar2 = GetSlot(temporalDate, CALENDAR);
    const thisDt = dateTime(this);
    const hour = GetSlot(thisDt, ISO_HOUR);
    const minute = GetSlot(thisDt, ISO_MINUTE);
    const second = GetSlot(thisDt, ISO_SECOND);
    const millisecond = GetSlot(thisDt, ISO_MILLISECOND);
    const microsecond = GetSlot(thisDt, ISO_MICROSECOND);
    const nanosecond = GetSlot(thisDt, ISO_NANOSECOND);
    calendar2 = ConsolidateCalendars(GetSlot(this, CALENDAR), calendar2);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const PlainDateTime2 = GetIntrinsic("%Temporal.PlainDateTime%");
    const dt = new PlainDateTime2(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, dt, "compatible");
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  withPlainTime(temporalTimeParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const PlainTime2 = GetIntrinsic("%Temporal.PlainTime%");
    const temporalTime = temporalTimeParam == void 0 ? new PlainTime2() : ToTemporalTime(temporalTimeParam);
    const thisDt = dateTime(this);
    const year = GetSlot(thisDt, ISO_YEAR);
    const month = GetSlot(thisDt, ISO_MONTH);
    const day = GetSlot(thisDt, ISO_DAY);
    const calendar2 = GetSlot(this, CALENDAR);
    const hour = GetSlot(temporalTime, ISO_HOUR);
    const minute = GetSlot(temporalTime, ISO_MINUTE);
    const second = GetSlot(temporalTime, ISO_SECOND);
    const millisecond = GetSlot(temporalTime, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalTime, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalTime, ISO_NANOSECOND);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const PlainDateTime2 = GetIntrinsic("%Temporal.PlainDateTime%");
    const dt = new PlainDateTime2(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar2);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, dt, "compatible");
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  withTimeZone(timeZoneParam) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const timeZone2 = ToTemporalTimeZone(timeZoneParam);
    return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone2, GetSlot(this, CALENDAR));
  }
  withCalendar(calendarParam) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = ToTemporalCalendar(calendarParam);
    return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), GetSlot(this, TIME_ZONE), calendar2);
  }
  add(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    const options = GetOptionsObject(optionsParam);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const calendar2 = GetSlot(this, CALENDAR);
    const epochNanoseconds = AddZonedDateTime(GetSlot(this, INSTANT), timeZone2, calendar2, years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, options);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, calendar2);
  }
  subtract(temporalDurationLike, optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const duration2 = ToLimitedTemporalDuration(temporalDurationLike);
    const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration2;
    const options = GetOptionsObject(optionsParam);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const calendar2 = GetSlot(this, CALENDAR);
    const epochNanoseconds = AddZonedDateTime(GetSlot(this, INSTANT), timeZone2, calendar2, -years, -months, -weeks, -days, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds, options);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, calendar2);
  }
  until(otherParam, optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalZonedDateTime(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond");
    const defaultLargestUnit = LargerOfTwoTemporalUnits("hour", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", [], defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const roundingIncrement = ToTemporalDateTimeRoundingIncrement(options, smallestUnit);
    const ns1 = GetSlot(this, EPOCHNANOSECONDS);
    const ns2 = GetSlot(other, EPOCHNANOSECONDS);
    let years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds;
    if (largestUnit !== "year" && largestUnit !== "month" && largestUnit !== "week" && largestUnit !== "day") {
      years = 0;
      months = 0;
      weeks = 0;
      days = 0;
      ({ seconds, milliseconds, microseconds, nanoseconds } = DifferenceInstant(ns1, ns2, roundingIncrement, smallestUnit, roundingMode));
      ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    } else {
      const timeZone2 = GetSlot(this, TIME_ZONE);
      if (!TimeZoneEquals(timeZone2, GetSlot(other, TIME_ZONE))) {
        throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");
      }
      const untilOptions = { ...options, largestUnit };
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceZonedDateTime(ns1, ns2, timeZone2, calendar2, largestUnit, untilOptions));
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, this));
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = AdjustRoundedDurationDays(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, this));
    }
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  since(otherParam, optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalZonedDateTime(otherParam);
    const calendar2 = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarId = ToString(calendar2);
    const otherCalendarId = ToString(otherCalendar);
    if (calendarId !== otherCalendarId) {
      throw new RangeError(`cannot compute difference between dates of ${calendarId} and ${otherCalendarId} calendars`);
    }
    const options = GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, "nanosecond");
    const defaultLargestUnit = LargerOfTwoTemporalUnits("hour", smallestUnit);
    const largestUnit = ToLargestTemporalUnit(options, "auto", [], defaultLargestUnit);
    ValidateTemporalUnitRange(largestUnit, smallestUnit);
    let roundingMode = ToTemporalRoundingMode(options, "trunc");
    roundingMode = NegateTemporalRoundingMode(roundingMode);
    const roundingIncrement = ToTemporalDateTimeRoundingIncrement(options, smallestUnit);
    const ns1 = GetSlot(this, EPOCHNANOSECONDS);
    const ns2 = GetSlot(other, EPOCHNANOSECONDS);
    let years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds;
    if (largestUnit !== "year" && largestUnit !== "month" && largestUnit !== "week" && largestUnit !== "day") {
      years = 0;
      months = 0;
      weeks = 0;
      days = 0;
      ({ seconds, milliseconds, microseconds, nanoseconds } = DifferenceInstant(ns1, ns2, roundingIncrement, smallestUnit, roundingMode));
      ({ hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = BalanceDuration(0, 0, 0, seconds, milliseconds, microseconds, nanoseconds, largestUnit));
    } else {
      const timeZone2 = GetSlot(this, TIME_ZONE);
      if (!TimeZoneEquals(timeZone2, GetSlot(other, TIME_ZONE))) {
        throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");
      }
      const untilOptions = { ...options, largestUnit };
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = DifferenceZonedDateTime(ns1, ns2, timeZone2, calendar2, largestUnit, untilOptions));
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = RoundDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, this));
      ({ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = AdjustRoundedDurationDays(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, roundingIncrement, smallestUnit, roundingMode, this));
    }
    const Duration2 = GetIntrinsic("%Temporal.Duration%");
    return new Duration2(-years, -months, -weeks, -days, -hours, -minutes, -seconds, -milliseconds, -microseconds, -nanoseconds);
  }
  round(optionsParam) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    if (optionsParam === void 0)
      throw new TypeError("options parameter is required");
    const options = typeof optionsParam === "string" ? CreateOnePropObject("smallestUnit", optionsParam) : GetOptionsObject(optionsParam);
    const smallestUnit = ToSmallestTemporalUnit(options, void 0, ["year", "month", "week"]);
    if (smallestUnit === void 0)
      throw new RangeError("smallestUnit is required");
    const roundingMode = ToTemporalRoundingMode(options, "halfExpand");
    const maximumIncrements = {
      day: 1,
      hour: 24,
      minute: 60,
      second: 60,
      millisecond: 1e3,
      microsecond: 1e3,
      nanosecond: 1e3
    };
    const roundingIncrement = ToTemporalRoundingIncrement(options, maximumIncrements[smallestUnit], false);
    const dt = dateTime(this);
    let year = GetSlot(dt, ISO_YEAR);
    let month = GetSlot(dt, ISO_MONTH);
    let day = GetSlot(dt, ISO_DAY);
    let hour = GetSlot(dt, ISO_HOUR);
    let minute = GetSlot(dt, ISO_MINUTE);
    let second = GetSlot(dt, ISO_SECOND);
    let millisecond = GetSlot(dt, ISO_MILLISECOND);
    let microsecond = GetSlot(dt, ISO_MICROSECOND);
    let nanosecond = GetSlot(dt, ISO_NANOSECOND);
    const DateTime = GetIntrinsic("%Temporal.PlainDateTime%");
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const calendar2 = GetSlot(this, CALENDAR);
    const dtStart = new DateTime(GetSlot(dt, ISO_YEAR), GetSlot(dt, ISO_MONTH), GetSlot(dt, ISO_DAY), 0, 0, 0, 0, 0, 0);
    const instantStart = BuiltinTimeZoneGetInstantFor(timeZone2, dtStart, "compatible");
    const endNs = AddZonedDateTime(instantStart, timeZone2, calendar2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
    const dayLengthNs = endNs.subtract(GetSlot(instantStart, EPOCHNANOSECONDS));
    if (dayLengthNs.isZero()) {
      throw new RangeError("cannot round a ZonedDateTime in a calendar with zero-length days");
    }
    ({ year, month, day, hour, minute, second, millisecond, microsecond, nanosecond } = RoundISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, roundingIncrement, smallestUnit, roundingMode, dayLengthNs.toJSNumber()));
    const offsetNs = GetOffsetNanosecondsFor(timeZone2, GetSlot(this, INSTANT));
    const epochNanoseconds = InterpretISODateTimeOffset(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, "option", offsetNs, timeZone2, "compatible", "prefer", false);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone2, GetSlot(this, CALENDAR));
  }
  equals(otherParam) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const other = ToTemporalZonedDateTime(otherParam);
    const one = GetSlot(this, EPOCHNANOSECONDS);
    const two = GetSlot(other, EPOCHNANOSECONDS);
    if (!(0, import_big_integer.default)(one).equals(two))
      return false;
    if (!TimeZoneEquals(GetSlot(this, TIME_ZONE), GetSlot(other, TIME_ZONE)))
      return false;
    return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
  }
  toString(optionsParam = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const options = GetOptionsObject(optionsParam);
    const { precision, unit, increment } = ToSecondsStringPrecision(options);
    const roundingMode = ToTemporalRoundingMode(options, "trunc");
    const showCalendar = ToShowCalendarOption(options);
    const showTimeZone = ToShowTimeZoneNameOption(options);
    const showOffset = ToShowOffsetOption(options);
    return TemporalZonedDateTimeToString(this, precision, showCalendar, showTimeZone, showOffset, {
      unit,
      increment,
      roundingMode
    });
  }
  toLocaleString(locales = void 0, options = void 0) {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return new DateTimeFormat(locales, options).format(this);
  }
  toJSON() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalZonedDateTimeToString(this, "auto");
  }
  valueOf() {
    throw new TypeError("use compare() or equals() to compare Temporal.ZonedDateTime");
  }
  startOfDay() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const dt = dateTime(this);
    const DateTime = GetIntrinsic("%Temporal.PlainDateTime%");
    const calendar2 = GetSlot(this, CALENDAR);
    const dtStart = new DateTime(GetSlot(dt, ISO_YEAR), GetSlot(dt, ISO_MONTH), GetSlot(dt, ISO_DAY), 0, 0, 0, 0, 0, 0, calendar2);
    const timeZone2 = GetSlot(this, TIME_ZONE);
    const instant2 = BuiltinTimeZoneGetInstantFor(timeZone2, dtStart, "compatible");
    return CreateTemporalZonedDateTime(GetSlot(instant2, EPOCHNANOSECONDS), timeZone2, calendar2);
  }
  toInstant() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const TemporalInstant = GetIntrinsic("%Temporal.Instant%");
    return new TemporalInstant(GetSlot(this, EPOCHNANOSECONDS));
  }
  toPlainDate() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalDateTimeToDate(dateTime(this));
  }
  toPlainTime() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return TemporalDateTimeToTime(dateTime(this));
  }
  toPlainDateTime() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    return dateTime(this);
  }
  toPlainYearMonth() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["monthCode", "year"]);
    const fields = ToTemporalYearMonthFields(this, fieldNames);
    return YearMonthFromFields(calendar2, fields);
  }
  toPlainMonthDay() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const calendar2 = GetSlot(this, CALENDAR);
    const fieldNames = CalendarFields(calendar2, ["day", "monthCode"]);
    const fields = ToTemporalMonthDayFields(this, fieldNames);
    return MonthDayFromFields(calendar2, fields);
  }
  getISOFields() {
    if (!IsTemporalZonedDateTime(this))
      throw new TypeError("invalid receiver");
    const dt = dateTime(this);
    const tz = GetSlot(this, TIME_ZONE);
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(dt, ISO_DAY),
      isoHour: GetSlot(dt, ISO_HOUR),
      isoMicrosecond: GetSlot(dt, ISO_MICROSECOND),
      isoMillisecond: GetSlot(dt, ISO_MILLISECOND),
      isoMinute: GetSlot(dt, ISO_MINUTE),
      isoMonth: GetSlot(dt, ISO_MONTH),
      isoNanosecond: GetSlot(dt, ISO_NANOSECOND),
      isoSecond: GetSlot(dt, ISO_SECOND),
      isoYear: GetSlot(dt, ISO_YEAR),
      offset: BuiltinTimeZoneGetOffsetStringFor(tz, GetSlot(this, INSTANT)),
      timeZone: tz
    };
  }
  static from(item, optionsParam = void 0) {
    const options = GetOptionsObject(optionsParam);
    if (IsTemporalZonedDateTime(item)) {
      ToTemporalOverflow(options);
      ToTemporalDisambiguation(options);
      ToTemporalOffset(options, "reject");
      return CreateTemporalZonedDateTime(GetSlot(item, EPOCHNANOSECONDS), GetSlot(item, TIME_ZONE), GetSlot(item, CALENDAR));
    }
    return ToTemporalZonedDateTime(item, options);
  }
  static compare(oneParam, twoParam) {
    const one = ToTemporalZonedDateTime(oneParam);
    const two = ToTemporalZonedDateTime(twoParam);
    const ns1 = GetSlot(one, EPOCHNANOSECONDS);
    const ns2 = GetSlot(two, EPOCHNANOSECONDS);
    if ((0, import_big_integer.default)(ns1).lesser(ns2))
      return -1;
    if ((0, import_big_integer.default)(ns1).greater(ns2))
      return 1;
    return 0;
  }
};
MakeIntrinsicClass(ZonedDateTime, "Temporal.ZonedDateTime");
function bigIntIfAvailable$1(wrapper) {
  return typeof globalThis.BigInt === "undefined" ? wrapper : wrapper.value;
}
function dateTime(zdt) {
  return BuiltinTimeZoneGetPlainDateTimeFor(GetSlot(zdt, TIME_ZONE), GetSlot(zdt, INSTANT), GetSlot(zdt, CALENDAR));
}
var temporal = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Instant,
  Calendar,
  PlainDate,
  PlainDateTime,
  Duration,
  PlainMonthDay,
  Now,
  PlainTime,
  TimeZone,
  PlainYearMonth,
  ZonedDateTime
});

// app/utilities/inferredTemporal.ts
function inferTemporal(value, format2) {
  if (format2.variant === "rfc2822") {
    return;
  }
  try {
    switch (format2.parts) {
      case "datetime": {
        if (format2.extensions && format2.extensions.includes("timezone")) {
          return temporal.ZonedDateTime.from(value);
        }
        try {
          return temporal.Instant.from(value);
        } catch {
          return temporal.PlainDateTime.from(value);
        }
      }
      case "date": {
        try {
          return temporal.Instant.from(value);
        } catch {
          return temporal.PlainDate.from(value);
        }
      }
      case "time": {
        try {
          return temporal.Instant.from(value);
        } catch {
          return temporal.PlainTime.from(value);
        }
      }
    }
  } catch (e2) {
    console.error(e2);
    return;
  }
}

// app/utilities/formatter.ts
function formatRawValue(type) {
  switch (type.name) {
    case "string":
      return type.value;
    case "int":
      return type.value.toString();
    case "float":
      return type.value.toString();
    case "bool":
      return type.value ? "true" : "false";
    case "null":
      return "null";
    case "array":
      return "[]";
    case "object":
      return "{}";
  }
}
function formatValue(type, options) {
  switch (type.name) {
    case "array": {
      if (options == null ? void 0 : options.leafNodesOnly) {
        return;
      }
      if (type.value.length == 0) {
        return formatRawValue(type);
      } else if (type.value.length === 1) {
        return `1 item`;
      } else {
        return `${type.value.length} items`;
      }
    }
    case "object": {
      if (options == null ? void 0 : options.leafNodesOnly) {
        return;
      }
      if (Object.keys(type.value).length == 0) {
        return formatRawValue(type);
      } else if (Object.keys(type.value).length === 1) {
        return `1 field`;
      } else {
        return `${Object.keys(type.value).length} fields`;
      }
    }
    case "bool": {
      return type.value ? "true" : "false";
    }
    case "float":
    case "int":
      return formatNumber(type.value);
    case "null": {
      return "null";
    }
    case "string":
      return formatString(type.value, type.format);
    default:
      const _exhaustiveCheck = type;
      return _exhaustiveCheck;
  }
}
var numberFormatter = new Intl.NumberFormat(void 0, {
  maximumFractionDigits: 6
});
function formatNumber(value) {
  return numberFormatter.format(value);
}
function formatString(value, format2) {
  if (!format2) {
    return value;
  }
  switch (format2.name) {
    case "email":
      return value;
    case "uri":
      return value;
    case "datetime":
      return formatDateTime(value, format2);
    default:
      return value;
  }
}
function formatDateTime(value, format2) {
  if (!format2) {
    return value;
  }
  const temporal2 = inferTemporal(value, format2);
  if (!temporal2) {
    return value;
  }
  switch (format2.parts) {
    case "datetime":
      return temporal2.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      });
    case "date":
      return temporal2.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    case "time":
      return temporal2.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
  }
}

// app/entry.worker.ts
self.onmessage = (e2) => {
  const { type, payload } = e2.data;
  console.group(`SearchWorker: ${type}`);
  console.log(payload);
  switch (type) {
    case "initialize-index": {
      const { json } = payload;
      self.searcher = new import_fuzzy_json_search.JSONHeroSearch(json, {
        cacheSettings: { max: 100, enabled: true },
        formatter: valueFormatter
      });
      self.searcher.prepareIndex();
      self.postMessage({ type: "index-initialized" });
      break;
    }
    case "search": {
      const { query } = payload;
      if (!self.searcher) {
        throw new Error("Search index not initialized");
      }
      const start = performance.now();
      const results = self.searcher.search(query);
      const end = performance.now();
      console.log(`Search took ${end - start}ms`);
      console.log("results", results);
      self.postMessage({
        type: "search-results",
        payload: { results, query }
      });
    }
  }
  console.groupEnd();
};
function valueFormatter(value) {
  const inferredType = inferType(value);
  return formatValue(inferredType);
}
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
