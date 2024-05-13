import {
  colorForItemAtPath
} from "/build/_shared/chunk-INLOL6O7.js";
import {
  Title
} from "/build/_shared/chunk-ZOQKLX7S.js";
import {
  CopySelectedNodeShortcut
} from "/build/_shared/chunk-KEOG32DK.js";
import {
  Mono
} from "/build/_shared/chunk-Z465WLWO.js";
import "/build/_shared/chunk-CCCYTS2U.js";
import {
  Body
} from "/build/_shared/chunk-3VJ35PHZ.js";
import {
  require_lib,
  useHotkeys,
  useJson,
  useJsonColumnViewAPI,
  useJsonColumnViewState,
  useJsonDoc
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  ChevronRightIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import "/build/_shared/chunk-IW4CVGHS.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\j\$id\index.tsx?browser
init_react();

// app/routes/j/$id/index.tsx
init_react();

// app/components/JsonColumnView.tsx
init_react();

// app/components/Columns.tsx
init_react();
var import_path = __toESM(require_lib());
var import_react4 = __toESM(require_react());

// app/components/BlankColumn.tsx
init_react();
var import_react = __toESM(require_react());
function BlankColumnElement() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
  });
}
var BlankColumn = (0, import_react.memo)(BlankColumnElement);

// app/components/Column.tsx
init_react();
var import_react2 = __toESM(require_react());
function ColumnElement(column) {
  const { id, title, children } = column;
  const [json] = useJson();
  const { minimal } = useJsonDoc();
  const iconColor = (0, import_react2.useMemo)(() => colorForItemAtPath(id, json), [id, json]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center text-slate-800 bg-slate-50 mb-[3px] p-2 pb-0 transition dark:bg-slate-900 dark:text-slate-300"
  }, column.icon && /* @__PURE__ */ React.createElement(column.icon, {
    className: "h-6 w-6 mr-1"
  }), /* @__PURE__ */ React.createElement(Title, {
    className: "text-ellipsis overflow-hidden"
  }, title)), /* @__PURE__ */ React.createElement("div", {
    className: `overflow-y-auto ${minimal ? "h-viewerHeightMinimal" : "h-viewerHeight"} no-scrollbar`
  }, children));
}
var Column = (0, import_react2.memo)(ColumnElement);

// app/components/ColumnItem.tsx
init_react();
var import_react3 = __toESM(require_react());
function ColumnItemElement({
  item,
  json,
  isSelected,
  isHighlighted,
  onClick
}) {
  const htmlElement = (0, import_react3.useRef)(null);
  const showArrow = item.children.length > 0;
  const stateStyle = (0, import_react3.useMemo)(() => {
    if (isHighlighted) {
      return "bg-slate-300 text-slate-700 hover:bg-slate-400 hover:bg-opacity-60 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[15%] dark:text-slate-100";
    }
    if (isSelected) {
      return "bg-slate-200 hover:bg-slate-300 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[5%] dark:hover:bg-white dark:hover:bg-opacity-[10%] dark:text-slate-200";
    }
    return "hover:bg-slate-100 transition duration-75 ease-out dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:text-slate-400";
  }, [isSelected, isHighlighted]);
  const iconColor = (0, import_react3.useMemo)(() => colorForItemAtPath(item.id, json), [item.id, json]);
  (0, import_react3.useEffect)(() => {
    var _a;
    if (isSelected || isHighlighted) {
      (_a = htmlElement.current) == null ? void 0 : _a.scrollIntoView({
        block: "nearest",
        inline: "center"
      });
    }
  }, [isSelected, isHighlighted]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex h-9 items-center justify-items-stretch mx-1 px-1 py-1 my-1 rounded-sm ${stateStyle}`,
    onClick: () => onClick && onClick(item.id),
    ref: htmlElement
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-4 flex-none flex-col justify-items-center"
  }, item.icon && /* @__PURE__ */ React.createElement(item.icon, {
    className: `h-5 w-5 ${isSelected && isHighlighted ? "text-slate-900 dark:text-slate-300" : "text-slate-500"}`
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-grow flex-shrink items-baseline justify-between truncate"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "flex-grow flex-shrink-0 pl-3 pr-2 "
  }, item.title), item.subtitle && /* @__PURE__ */ React.createElement(Mono, {
    className: `truncate pr-1 transition duration-75 ${isHighlighted ? "text-gray-500 dark:text-slate-100" : "text-gray-400 dark:text-gray-500"}`
  }, item.subtitle)), showArrow && /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
    className: "flex-none w-4 h-4 text-gray-400"
  }));
}
var ColumnItem = (0, import_react3.memo)(ColumnItemElement);

// app/components/Columns.tsx
function ColumnsElement({ columns }) {
  const [json] = useJson();
  const { selectedPath, highlightedPath, highlightedNodeId } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const highlightedItemIsValue = (0, import_react4.useMemo)(() => {
    if (highlightedNodeId == null) {
      return false;
    }
    const path = new import_path.JSONHeroPath(highlightedNodeId);
    let item = path.first(json);
    return typeof item !== "object";
  }, [highlightedPath, json]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "columns flex flex-grow overflow-x-auto focus:outline-none no-scrollbar"
  }, columns.map((column) => {
    return /* @__PURE__ */ React.createElement(Column, {
      key: column.id,
      id: column.id,
      title: column.title,
      icon: column.icon,
      hasHighlightedElement: highlightedPath[highlightedPath.length - 2] === column.id
    }, column.items.map((item) => /* @__PURE__ */ React.createElement(ColumnItem, {
      key: item.id,
      item,
      json,
      isSelected: selectedPath.includes(item.id),
      isHighlighted: highlightedPath[highlightedPath.length - 1] === item.id,
      onClick: (id) => goToNodeId(id, "columnView")
    })));
  }), highlightedItemIsValue ? /* @__PURE__ */ React.createElement(BlankColumn, null) : null);
}
var Columns = (0, import_react4.memo)(ColumnsElement);

// app/components/JsonColumnView.tsx
function JsonColumnView() {
  const { getColumnViewProps, columns } = useJsonColumnViewState();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(KeyboardShortcuts, null), /* @__PURE__ */ React.createElement("div", {
    ...getColumnViewProps()
  }, /* @__PURE__ */ React.createElement(Columns, {
    columns
  })));
}
function KeyboardShortcuts() {
  const api = useJsonColumnViewAPI();
  useHotkeys("down", (e) => {
    e.preventDefault();
    api.goToNextSibling();
  }, { enabled: true }, [api]);
  useHotkeys("up", (e) => {
    e.preventDefault();
    api.goToPreviousSibling();
  }, [api]);
  useHotkeys("right", (e) => {
    e.preventDefault();
    api.goToChildren();
  }, [api]);
  useHotkeys("left,alt+left", (e) => {
    e.preventDefault();
    api.goToParent({ source: e });
  }, [api]);
  useHotkeys("esc", (e) => {
    e.preventDefault();
    api.resetSelection();
  }, [api]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CopySelectedNodeShortcut, null));
}

// app/routes/j/$id/index.tsx
function DefaultView() {
  return /* @__PURE__ */ React.createElement(JsonColumnView, null);
}
export {
  DefaultView as default
};
//# sourceMappingURL=/build/routes/j/$id/index-36T6C74A.js.map
