import {
  formatValue,
  iconForType,
  inferType,
  init_lib,
  pick_default,
  require_lib,
  useJson,
  useJsonDoc
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// app/hooks/useJsonTree.tsx
init_react();
init_lib();
var import_path = __toESM(require_lib());
var import_react3 = __toESM(require_react());

// app/hooks/useVirtualTree.ts
init_react();
var import_react2 = __toESM(require_react());

// node_modules/react-virtual/dist/react-virtual.mjs
init_react();
var import_react = __toESM(require_react(), 1);
function _extends() {
  _extends = Object.assign || function(target) {
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
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var props = ["bottom", "height", "left", "right", "top", "width"];
var rectChanged = function rectChanged2(a, b) {
  if (a === void 0) {
    a = {};
  }
  if (b === void 0) {
    b = {};
  }
  return props.some(function(prop) {
    return a[prop] !== b[prop];
  });
};
var observedNodes = /* @__PURE__ */ new Map();
var rafId;
var run = function run2() {
  var changedStates = [];
  observedNodes.forEach(function(state, node) {
    var newRect = node.getBoundingClientRect();
    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });
  changedStates.forEach(function(state) {
    state.callbacks.forEach(function(cb) {
      return cb(state.rect);
    });
  });
  rafId = window.requestAnimationFrame(run2);
};
function observeRect(node, cb) {
  return {
    observe: function observe() {
      var wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: void 0,
          hasRectChanged: false,
          callbacks: [cb]
        });
      }
      if (wasEmpty)
        run();
    },
    unobserve: function unobserve() {
      var state = observedNodes.get(node);
      if (state) {
        var index = state.callbacks.indexOf(cb);
        if (index >= 0)
          state.callbacks.splice(index, 1);
        if (!state.callbacks.length)
          observedNodes["delete"](node);
        if (!observedNodes.size)
          cancelAnimationFrame(rafId);
      }
    }
  };
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.default.useLayoutEffect : import_react.default.useEffect;
function useRect(nodeRef, initialRect2) {
  if (initialRect2 === void 0) {
    initialRect2 = {
      width: 0,
      height: 0
    };
  }
  var _React$useState = import_react.default.useState(nodeRef.current), element = _React$useState[0], setElement = _React$useState[1];
  var _React$useReducer = import_react.default.useReducer(rectReducer, initialRect2), rect = _React$useReducer[0], dispatch = _React$useReducer[1];
  var initialRectSet = import_react.default.useRef(false);
  useIsomorphicLayoutEffect(function() {
    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useIsomorphicLayoutEffect(function() {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true;
      var _rect = element.getBoundingClientRect();
      dispatch({
        rect: _rect
      });
    }
  }, [element]);
  import_react.default.useEffect(function() {
    if (!element) {
      return;
    }
    var observer = observeRect(element, function(rect2) {
      dispatch({
        rect: rect2
      });
    });
    observer.observe();
    return function() {
      observer.unobserve();
    };
  }, [element]);
  return rect;
}
function rectReducer(state, action) {
  var rect = action.rect;
  if (state.height !== rect.height || state.width !== rect.width) {
    return rect;
  }
  return state;
}
var defaultEstimateSize = function defaultEstimateSize2() {
  return 50;
};
var defaultKeyExtractor = function defaultKeyExtractor2(index) {
  return index;
};
var defaultMeasureSize = function defaultMeasureSize2(el, horizontal) {
  var key = horizontal ? "offsetWidth" : "offsetHeight";
  return el[key];
};
var defaultRangeExtractor = function defaultRangeExtractor2(range) {
  var start = Math.max(range.start - range.overscan, 0);
  var end = Math.min(range.end + range.overscan, range.size - 1);
  var arr = [];
  for (var i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
function useVirtual(_ref) {
  var _measurements;
  var _ref$size = _ref.size, size = _ref$size === void 0 ? 0 : _ref$size, _ref$estimateSize = _ref.estimateSize, estimateSize = _ref$estimateSize === void 0 ? defaultEstimateSize : _ref$estimateSize, _ref$overscan = _ref.overscan, overscan = _ref$overscan === void 0 ? 1 : _ref$overscan, _ref$paddingStart = _ref.paddingStart, paddingStart = _ref$paddingStart === void 0 ? 0 : _ref$paddingStart, _ref$paddingEnd = _ref.paddingEnd, paddingEnd = _ref$paddingEnd === void 0 ? 0 : _ref$paddingEnd, parentRef = _ref.parentRef, horizontal = _ref.horizontal, scrollToFn = _ref.scrollToFn, useObserver = _ref.useObserver, initialRect2 = _ref.initialRect, onScrollElement = _ref.onScrollElement, scrollOffsetFn = _ref.scrollOffsetFn, _ref$keyExtractor = _ref.keyExtractor, keyExtractor = _ref$keyExtractor === void 0 ? defaultKeyExtractor : _ref$keyExtractor, _ref$measureSize = _ref.measureSize, measureSize = _ref$measureSize === void 0 ? defaultMeasureSize : _ref$measureSize, _ref$rangeExtractor = _ref.rangeExtractor, rangeExtractor = _ref$rangeExtractor === void 0 ? defaultRangeExtractor : _ref$rangeExtractor;
  var sizeKey = horizontal ? "width" : "height";
  var scrollKey = horizontal ? "scrollLeft" : "scrollTop";
  var latestRef = import_react.default.useRef({
    scrollOffset: 0,
    measurements: []
  });
  var _React$useState = import_react.default.useState(0), scrollOffset = _React$useState[0], setScrollOffset = _React$useState[1];
  latestRef.current.scrollOffset = scrollOffset;
  var useMeasureParent = useObserver || useRect;
  var _useMeasureParent = useMeasureParent(parentRef, initialRect2), outerSize = _useMeasureParent[sizeKey];
  latestRef.current.outerSize = outerSize;
  var defaultScrollToFn = import_react.default.useCallback(function(offset) {
    if (parentRef.current) {
      parentRef.current[scrollKey] = offset;
    }
  }, [parentRef, scrollKey]);
  var resolvedScrollToFn = scrollToFn || defaultScrollToFn;
  scrollToFn = import_react.default.useCallback(function(offset) {
    resolvedScrollToFn(offset, defaultScrollToFn);
  }, [defaultScrollToFn, resolvedScrollToFn]);
  var _React$useState2 = import_react.default.useState({}), measuredCache = _React$useState2[0], setMeasuredCache = _React$useState2[1];
  var measure = import_react.default.useCallback(function() {
    return setMeasuredCache({});
  }, []);
  var pendingMeasuredCacheIndexesRef = import_react.default.useRef([]);
  var measurements = import_react.default.useMemo(function() {
    var min = pendingMeasuredCacheIndexesRef.current.length > 0 ? Math.min.apply(Math, pendingMeasuredCacheIndexesRef.current) : 0;
    pendingMeasuredCacheIndexesRef.current = [];
    var measurements2 = latestRef.current.measurements.slice(0, min);
    for (var i = min; i < size; i++) {
      var key = keyExtractor(i);
      var measuredSize = measuredCache[key];
      var _start = measurements2[i - 1] ? measurements2[i - 1].end : paddingStart;
      var _size = typeof measuredSize === "number" ? measuredSize : estimateSize(i);
      var _end = _start + _size;
      measurements2[i] = {
        index: i,
        start: _start,
        size: _size,
        end: _end,
        key
      };
    }
    return measurements2;
  }, [estimateSize, measuredCache, paddingStart, size, keyExtractor]);
  var totalSize = (((_measurements = measurements[size - 1]) == null ? void 0 : _measurements.end) || paddingStart) + paddingEnd;
  latestRef.current.measurements = measurements;
  latestRef.current.totalSize = totalSize;
  var element = onScrollElement ? onScrollElement.current : parentRef.current;
  var scrollOffsetFnRef = import_react.default.useRef(scrollOffsetFn);
  scrollOffsetFnRef.current = scrollOffsetFn;
  useIsomorphicLayoutEffect(function() {
    if (!element) {
      setScrollOffset(0);
      return;
    }
    var onScroll = function onScroll2(event) {
      var offset = scrollOffsetFnRef.current ? scrollOffsetFnRef.current(event) : element[scrollKey];
      setScrollOffset(offset);
    };
    onScroll();
    element.addEventListener("scroll", onScroll, {
      capture: false,
      passive: true
    });
    return function() {
      element.removeEventListener("scroll", onScroll);
    };
  }, [element, scrollKey]);
  var _calculateRange = calculateRange(latestRef.current), start = _calculateRange.start, end = _calculateRange.end;
  var indexes = import_react.default.useMemo(function() {
    return rangeExtractor({
      start,
      end,
      overscan,
      size: measurements.length
    });
  }, [start, end, overscan, measurements.length, rangeExtractor]);
  var measureSizeRef = import_react.default.useRef(measureSize);
  measureSizeRef.current = measureSize;
  var virtualItems = import_react.default.useMemo(function() {
    var virtualItems2 = [];
    var _loop = function _loop2(k2, len2) {
      var i = indexes[k2];
      var measurement = measurements[i];
      var item = _extends(_extends({}, measurement), {}, {
        measureRef: function measureRef(el) {
          if (el) {
            var measuredSize = measureSizeRef.current(el, horizontal);
            if (measuredSize !== item.size) {
              var _scrollOffset = latestRef.current.scrollOffset;
              if (item.start < _scrollOffset) {
                defaultScrollToFn(_scrollOffset + (measuredSize - item.size));
              }
              pendingMeasuredCacheIndexesRef.current.push(i);
              setMeasuredCache(function(old) {
                var _extends2;
                return _extends(_extends({}, old), {}, (_extends2 = {}, _extends2[item.key] = measuredSize, _extends2));
              });
            }
          }
        }
      });
      virtualItems2.push(item);
    };
    for (var k = 0, len = indexes.length; k < len; k++) {
      _loop(k);
    }
    return virtualItems2;
  }, [indexes, defaultScrollToFn, horizontal, measurements]);
  var mountedRef = import_react.default.useRef(false);
  useIsomorphicLayoutEffect(function() {
    if (mountedRef.current) {
      setMeasuredCache({});
    }
    mountedRef.current = true;
  }, [estimateSize]);
  var scrollToOffset = import_react.default.useCallback(function(toOffset, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp, _ref2$align = _ref2.align, align = _ref2$align === void 0 ? "start" : _ref2$align;
    var _latestRef$current = latestRef.current, scrollOffset2 = _latestRef$current.scrollOffset, outerSize2 = _latestRef$current.outerSize;
    if (align === "auto") {
      if (toOffset <= scrollOffset2) {
        align = "start";
      } else if (toOffset >= scrollOffset2 + outerSize2) {
        align = "end";
      } else {
        align = "start";
      }
    }
    if (align === "start") {
      scrollToFn(toOffset);
    } else if (align === "end") {
      scrollToFn(toOffset - outerSize2);
    } else if (align === "center") {
      scrollToFn(toOffset - outerSize2 / 2);
    }
  }, [scrollToFn]);
  var tryScrollToIndex = import_react.default.useCallback(function(index, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2, _ref3$align = _ref3.align, align = _ref3$align === void 0 ? "auto" : _ref3$align, rest = _objectWithoutPropertiesLoose(_ref3, ["align"]);
    var _latestRef$current2 = latestRef.current, measurements2 = _latestRef$current2.measurements, scrollOffset2 = _latestRef$current2.scrollOffset, outerSize2 = _latestRef$current2.outerSize;
    var measurement = measurements2[Math.max(0, Math.min(index, size - 1))];
    if (!measurement) {
      return;
    }
    if (align === "auto") {
      if (measurement.end >= scrollOffset2 + outerSize2) {
        align = "end";
      } else if (measurement.start <= scrollOffset2) {
        align = "start";
      } else {
        return;
      }
    }
    var toOffset = align === "center" ? measurement.start + measurement.size / 2 : align === "end" ? measurement.end : measurement.start;
    scrollToOffset(toOffset, _extends({
      align
    }, rest));
  }, [scrollToOffset, size]);
  var scrollToIndex = import_react.default.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    tryScrollToIndex.apply(void 0, args);
    requestAnimationFrame(function() {
      tryScrollToIndex.apply(void 0, args);
    });
  }, [tryScrollToIndex]);
  return {
    virtualItems,
    totalSize,
    scrollToOffset,
    scrollToIndex,
    measure
  };
}
var findNearestBinarySearch = function findNearestBinarySearch2(low, high, getCurrentValue, value) {
  while (low <= high) {
    var middle = (low + high) / 2 | 0;
    var currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange(_ref4) {
  var measurements = _ref4.measurements, outerSize = _ref4.outerSize, scrollOffset = _ref4.scrollOffset;
  var size = measurements.length - 1;
  var getOffset = function getOffset2(index) {
    return measurements[index].start;
  };
  var start = findNearestBinarySearch(0, size, getOffset, scrollOffset);
  var end = start;
  while (end < size && measurements[end].end < scrollOffset + outerSize) {
    end++;
  }
  return {
    start,
    end
  };
}

// app/hooks/useVirtualTree.ts
function expandNode(state, id) {
  const collapsedState = {
    ...state.collapsedState,
    [id]: false
  };
  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id
  };
}
function collapseNode(state, id) {
  const collapsedState = {
    ...state.collapsedState,
    [id]: true
  };
  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id
  };
}
function toggleAllChildren(state, id) {
  const item = state.items.find(({ id: nodeId }) => nodeId === id);
  if (!item) {
    return state;
  }
  if (!item.node.children || item.node.children.length === 0) {
    return state;
  }
  const allCollapsed = item.node.children.every((child) => state.collapsedState[child.id]);
  if (allCollapsed) {
    const collapsedState2 = item.node.children.reduce((acc, child) => ({
      ...acc,
      [child.id]: false
    }), state.collapsedState);
    return {
      ...state,
      collapsedState: collapsedState2,
      items: createNodeItems(state.nodes, 0, collapsedState2),
      focusedNodeId: id
    };
  }
  const collapsedState = item.node.children.reduce((acc, child) => ({
    ...acc,
    [child.id]: true
  }), state.collapsedState);
  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id
  };
}
function useVirtualTree(options) {
  const reducer = (0, import_react2.useCallback)((state2, action) => {
    var _a;
    switch (action.type) {
      case "BLUR": {
        return {
          ...state2,
          focusedNodeId: null
        };
      }
      case "TOGGLE_NODE": {
        const isCollapsed = state2.collapsedState[action.id];
        if (isCollapsed) {
          return expandNode(state2, action.id);
        } else {
          if (action.source && (action.source.shiftKey || action.source.altKey)) {
            return toggleAllChildren(state2, action.id);
          } else {
            return collapseNode(state2, action.id);
          }
        }
      }
      case "COLLAPSE_ALL_NODES": {
        return state2.items.reduceRight((nextState, item) => collapseNode(nextState, item.id), state2);
      }
      case "FOCUS_NODE": {
        const itemIndex = state2.items.findIndex(({ id }) => id === action.id);
        if (itemIndex === -1) {
          const node = findNodeInTreeById(state2.nodes, action.id);
          if (!node) {
            return state2;
          }
          const path = (_a = calculatePathToNode(state2.nodes, node)) != null ? _a : [];
          const collapsedState = path.reduce((acc, id) => ({
            ...acc,
            [id]: false
          }), state2.collapsedState);
          return {
            ...state2,
            collapsedState,
            items: createNodeItems(state2.nodes, 0, collapsedState),
            focusedNodeId: action.id
          };
        }
        return {
          ...state2,
          focusedNodeId: action.id
        };
      }
      case "FOCUS_FIRST":
      case "MOVE_TO_TOP": {
        const nextItem = state2.items[0];
        if (!nextItem) {
          return state2;
        }
        return {
          ...state2,
          focusedNodeId: nextItem.id
        };
      }
      case "MOVE_TO_BOTTOM": {
        const nextItem = state2.items[state2.items.length - 1];
        if (!nextItem) {
          return state2;
        }
        return {
          ...state2,
          focusedNodeId: nextItem.id
        };
      }
      case "MOVE_DOWN": {
        if (!state2.focusedNodeId) {
          const nextItem2 = state2.items[0];
          if (!nextItem2) {
            return state2;
          }
          return {
            ...state2,
            focusedNodeId: nextItem2.id
          };
        }
        const focusedNodeIdIndex = state2.items.findIndex((item) => item.id === state2.focusedNodeId);
        if (focusedNodeIdIndex === -1) {
          return state2;
        }
        if (state2.items.length <= focusedNodeIdIndex + 1) {
          return state2;
        }
        const nextItem = state2.items[focusedNodeIdIndex + 1];
        return {
          ...state2,
          focusedNodeId: nextItem.id
        };
      }
      case "MOVE_UP": {
        const focusedNodeIdIndex = state2.items.findIndex((item) => item.id === state2.focusedNodeId);
        if (focusedNodeIdIndex === -1) {
          return state2;
        }
        if (focusedNodeIdIndex === 0) {
          return state2;
        }
        const nextItem = state2.items[focusedNodeIdIndex - 1];
        return {
          ...state2,
          focusedNodeId: nextItem.id
        };
      }
      case "MOVE_RIGHT": {
        if (!state2.focusedNodeId) {
          return state2;
        }
        const isCollapsed = state2.collapsedState[state2.focusedNodeId];
        if (isCollapsed) {
          return expandNode(state2, state2.focusedNodeId);
        }
        if (action.source && (action.source.shiftKey || action.source.altKey)) {
          return toggleAllChildren(state2, state2.focusedNodeId);
        }
        const nodeIndex = state2.items.findIndex((item) => item.id === state2.focusedNodeId);
        if (nodeIndex === -1) {
          return state2;
        }
        if (state2.items.length <= nodeIndex + 1) {
          return state2;
        }
        const nextItem = state2.items[nodeIndex + 1];
        return {
          ...state2,
          focusedNodeId: nextItem.id
        };
      }
      case "MOVE_LEFT": {
        if (!state2.focusedNodeId) {
          return state2;
        }
        const item = state2.items.find((item2) => item2.id === state2.focusedNodeId);
        if (!item) {
          return state2;
        }
        const hasChildren = item.node.children && item.node.children.length > 0;
        const isCollapsed = state2.collapsedState[state2.focusedNodeId];
        if (hasChildren && !isCollapsed) {
          if (action.source && (action.source.shiftKey || action.source.altKey)) {
            return toggleAllChildren(state2, state2.focusedNodeId);
          } else {
            return collapseNode(state2, state2.focusedNodeId);
          }
        }
        if (!hasChildren || isCollapsed) {
          const parentNodeIndex = state2.items.findIndex((item2) => item2.node.children && item2.node.children.map((child) => child.id).includes(state2.focusedNodeId));
          if (parentNodeIndex === -1) {
            return state2;
          }
          const nextItem = state2.items[parentNodeIndex];
          return {
            ...state2,
            focusedNodeId: nextItem.id
          };
        }
        return state2;
      }
      case "RESTORE_STATE": {
        const nextState = {
          ...state2,
          ...action.restoredState
        };
        return {
          ...nextState,
          items: createNodeItems(nextState.nodes, 0, nextState.collapsedState)
        };
      }
      default:
        return state2;
    }
  }, []);
  const initializer = (0, import_react2.useCallback)(({ nodes }) => {
    return {
      nodes,
      items: createNodeItems(nodes),
      collapsedState: {},
      focusedNodeId: null
    };
  }, [options.persistState, options.id]);
  const [state, dispatch] = (0, import_react2.useReducer)(reducer, {
    nodes: options.nodes
  }, initializer);
  const isStateRestored = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
    if (!isStateRestored.current) {
      return;
    }
    if (options.persistState) {
      localStorage.setItem(`${options.id}-virtual-tree-state`, JSON.stringify(pick_default(state, "collapsedState")));
    }
  }, [
    state.collapsedState,
    options.id,
    options.persistState,
    isStateRestored.current
  ]);
  (0, import_react2.useEffect)(() => {
    if (!options.persistState) {
      return;
    }
    if (isStateRestored.current) {
      return;
    }
    isStateRestored.current = true;
    const savedState = localStorage.getItem(`${options.id}-virtual-tree-state`);
    if (savedState) {
      const restoredState = JSON.parse(savedState);
      dispatch({
        type: "RESTORE_STATE",
        restoredState
      });
    }
  }, [options.persistState, options.id, dispatch, isStateRestored.current]);
  const rowVirtualizer = useVirtual({
    size: state.items.length,
    parentRef: options.parentRef,
    estimateSize: options.estimateSize,
    overscan: options.overscan,
    initialRect: options.initialRect,
    useObserver: options.useObserver
  });
  const allVirtualNodes = rowVirtualizer.virtualItems.map((virtualItem) => {
    const treeItem = state.items[virtualItem.index];
    return {
      node: treeItem.node,
      depth: treeItem.depth,
      size: virtualItem.size,
      start: virtualItem.start,
      virtualItem,
      getItemProps: createItemProps(treeItem, virtualItem, state, dispatch),
      isCollapsed: treeItem.isCollapsed
    };
  });
  const toggleNode = (0, import_react2.useCallback)((id, source) => {
    dispatch({ type: "TOGGLE_NODE", id, source });
  }, [dispatch]);
  const focusNode = (0, import_react2.useCallback)((id) => {
    dispatch({ type: "FOCUS_NODE", id });
  }, [dispatch]);
  const focusFirst = (0, import_react2.useCallback)(() => dispatch({ type: "FOCUS_FIRST" }), [dispatch]);
  const blur = (0, import_react2.useCallback)(() => dispatch({ type: "BLUR" }), [dispatch]);
  const scrollToNode = (0, import_react2.useCallback)((id) => {
    const itemIndex = state.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      rowVirtualizer.scrollToIndex(itemIndex, { align: "auto" });
    }
  }, [state.items, rowVirtualizer.scrollToIndex, dispatch]);
  (0, import_react2.useEffect)(() => {
    if (state.focusedNodeId) {
      scrollToNode(state.focusedNodeId);
    }
  }, [state.focusedNodeId, scrollToNode]);
  return {
    nodes: allVirtualNodes,
    totalSize: rowVirtualizer.totalSize,
    toggleNode,
    focusNode,
    focusFirst,
    blur,
    focusedNodeId: state.focusedNodeId,
    getTreeProps: (0, import_react2.useCallback)(createTreeProps(dispatch), [dispatch]),
    scrollToNode
  };
}
function createNodeItems(nodes, depth = 0, collapsedState = {}) {
  return nodes.flatMap((node, index) => {
    const children = node.children ? collapsedState[node.id] ? [] : createNodeItems(node.children, depth + 1, collapsedState) : [];
    return [
      {
        id: node.id,
        depth,
        node,
        pos: index + 1,
        size: nodes.length,
        isCollapsed: !!collapsedState[node.id]
      },
      ...children
    ];
  });
}
function createTreeProps(dispatch) {
  return () => ({
    role: "tree",
    tabIndex: -1,
    onKeyDown: (e) => {
      if (e.defaultPrevented) {
        return;
      }
      switch (e.key) {
        case "Home": {
          dispatch({ type: "MOVE_TO_TOP", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "End": {
          dispatch({ type: "MOVE_TO_BOTTOM", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Down":
        case "ArrowDown": {
          dispatch({ type: "MOVE_DOWN", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Up":
        case "ArrowUp": {
          dispatch({ type: "MOVE_UP", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Left":
        case "ArrowLeft": {
          if (e.altKey) {
            dispatch({ type: "COLLAPSE_ALL_NODES" });
          } else {
            dispatch({
              type: "MOVE_LEFT",
              source: e.nativeEvent
            });
          }
          e.preventDefault();
          break;
        }
        case "Right":
        case "ArrowRight": {
          dispatch({
            type: "MOVE_RIGHT",
            source: e.nativeEvent
          });
          e.preventDefault();
          break;
        }
      }
    }
  });
}
function createItemProps(item, virtualItem, state, dispatch) {
  const { depth, pos, size, node, isCollapsed } = item;
  return () => ({
    "aria-expanded": node.children && node.children.length > 0 && !isCollapsed,
    "aria-level": depth + 1,
    "aria-posinset": pos,
    "aria-setsize": size,
    role: "treeitem",
    tabIndex: node.id === state.focusedNodeId ? -1 : void 0,
    onClick: (e) => {
      if (e.defaultPrevented) {
        return;
      }
      if (node.id !== state.focusedNodeId) {
        dispatch({ type: "FOCUS_NODE", id: node.id });
      }
    }
  });
}
function findNodeInTreeById(nodes, id) {
  const node = nodes.find((node2) => node2.id === id);
  if (node) {
    return node;
  }
  for (const node2 of nodes) {
    const foundNode = findNodeInTreeById(node2.children || [], id);
    if (foundNode) {
      return foundNode;
    }
  }
  return;
}
function calculatePathToNode(nodes, searchNode, path = []) {
  const nodeIndex = nodes.findIndex((node) => node.id === searchNode.id);
  if (nodeIndex !== -1) {
    return [...path, searchNode.id];
  }
  for (const node of nodes) {
    if (!node.children) {
      continue;
    }
    const foundPath = calculatePathToNode(node.children || [], searchNode, [
      ...path,
      node.id
    ]);
    if (foundPath && foundPath.length > path.length) {
      return foundPath;
    }
  }
  return;
}

// app/hooks/useJsonTree.tsx
var initialRect = { width: 800, height: 600 };
var JsonTreeViewContext = (0, import_react3.createContext)({});
function JsonTreeViewProvider({
  children,
  ...options
}) {
  const instance = useJsonTree(options);
  return /* @__PURE__ */ React.createElement(JsonTreeViewContext.Provider, {
    value: instance
  }, children);
}
function useJsonTree(options) {
  const parentRef = (0, import_react3.useRef)(null);
  const { doc } = useJsonDoc();
  const [json] = useJson();
  const jsonNodes = (0, import_react3.useMemo)(() => {
    return generateTreeViewNodes(json);
  }, [json]);
  const tree = useVirtualTree({
    id: doc.id,
    nodes: jsonNodes,
    parentRef,
    estimateSize: (0, import_react3.useCallback)((index) => 32, []),
    initialRect,
    overscan: options.overscan,
    persistState: true
  });
  return { tree, parentRef };
}
function useJsonTreeViewContext() {
  const context = (0, import_react3.useContext)(JsonTreeViewContext);
  invariant(context, "useJsonTreeViewContext must be used within a JsonTreeViewContext.Provider");
  return context;
}
function generateTreeViewNodes(json) {
  var _a;
  const info = inferType(json);
  const path = new import_path.JSONHeroPath("$");
  return (_a = generateChildren(info, path)) != null ? _a : [];
}
function generateChildren(info, path) {
  if (info.name === "array") {
    return info.value.map((item, index) => {
      const itemInfo = inferType(item);
      const itemPath = path.child(index.toString());
      return {
        id: itemPath.toString(),
        name: index.toString(),
        title: index.toString(),
        longTitle: `Index ${index.toString()}`,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        children: generateChildren(itemInfo, itemPath)
      };
    });
  }
  if (info.name === "object") {
    return Object.entries(info.value).map(([key, value]) => {
      const cleanKey = key.replace(/\./g, "\\.");
      const itemInfo = inferType(value);
      const itemPath = path.child(cleanKey);
      return {
        id: itemPath.toString(),
        name: key,
        title: key,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        children: generateChildren(itemInfo, itemPath)
      };
    });
  }
}

export {
  useVirtual,
  JsonTreeViewProvider,
  useJsonTreeViewContext
};
//# sourceMappingURL=/build/_shared/chunk-IMISUYGR.js.map
