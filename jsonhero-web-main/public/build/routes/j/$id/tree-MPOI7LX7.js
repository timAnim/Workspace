import {
  useJsonTreeViewContext
} from "/build/_shared/chunk-IMISUYGR.js";
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
  useJsonColumnViewAPI,
  useJsonColumnViewState,
  useJsonDoc
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  ChevronDownIcon_default,
  ChevronRightIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import "/build/_shared/chunk-IW4CVGHS.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\j\$id\tree.tsx?browser
init_react();

// app/routes/j/$id/tree.tsx
init_react();

// app/components/JsonTreeView.tsx
init_react();
var import_react = __toESM(require_react());
function JsonTreeView() {
  const { selectedNodeId, selectedNodeSource } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const { tree, parentRef } = useJsonTreeViewContext();
  const scrolledToNodeRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (!scrolledToNodeRef.current && selectedNodeId) {
      tree.scrollToNode(selectedNodeId);
      scrolledToNodeRef.current = true;
    }
  }, [selectedNodeId, scrolledToNodeRef]);
  const focusCount = (0, import_react.useRef)(0);
  (0, import_react.useEffect)(() => {
    if (tree.focusedNodeId && selectedNodeId && tree.focusedNodeId !== selectedNodeId) {
      if (selectedNodeId === "$") {
        return;
      }
      if (selectedNodeSource !== "tree" && focusCount.current > 0) {
        focusCount.current = focusCount.current + 1;
        tree.focusNode(selectedNodeId);
        tree.scrollToNode(selectedNodeId);
      }
    }
  }, [tree.focusedNodeId, goToNodeId, selectedNodeId, selectedNodeSource]);
  const previousFocusedNodeId = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    let updated = false;
    if (!previousFocusedNodeId.current) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      updated = true;
    }
    if (tree.focusedNodeId && (updated || previousFocusedNodeId.current !== tree.focusedNodeId)) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      goToNodeId(tree.focusedNodeId, "tree");
    }
  }, [previousFocusedNodeId, tree.focusedNodeId, tree.focusNode, goToNodeId]);
  const treeRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (treeRef.current) {
      treeRef.current.focus({ preventScroll: true });
    }
  }, [treeRef.current]);
  const { minimal } = useJsonDoc();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CopySelectedNodeShortcut, null), /* @__PURE__ */ React.createElement("div", {
    className: "text-white w-full",
    ref: parentRef,
    style: {
      height: `calc(100vh - ${minimal ? "66px" : "106px"})`,
      overflowY: "auto",
      overflowX: "hidden"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full outline-none",
    style: { height: `${tree.totalSize}px` },
    ...tree.getTreeProps(),
    ref: treeRef
  }, tree.nodes.map((virtualNode) => /* @__PURE__ */ React.createElement(TreeViewNode, {
    virtualNode,
    key: virtualNode.node.id,
    onToggle: (node, e) => tree.toggleNode(node.id, e),
    selectedNodeId
  })))));
}
function TreeViewNode({
  virtualNode,
  onToggle,
  selectedNodeId
}) {
  var _a;
  const { node, virtualItem, depth } = virtualNode;
  const indentClassName = computeTreeNodePaddingClass(depth);
  const isSelected = selectedNodeId === node.id;
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${virtualNode.size}px`,
      transform: `translateY(${virtualNode.start}px)`
    },
    key: virtualNode.node.id,
    ...virtualNode.getItemProps()
  }, /* @__PURE__ */ React.createElement("div", {
    className: `h-full flex pl-5 rounded-sm select-none ${isSelected ? "bg-indigo-700" : virtualItem.index % 2 ? "dark:bg-slate-900" : "bg-slate-100 bg-opacity-90 dark:bg-slate-800 dark:bg-opacity-30"}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: `pl-2 w-2/6 items-center flex`
  }, node.children && node.children.length > 0 && /* @__PURE__ */ React.createElement("span", {
    onClick: (e) => {
      if (onToggle) {
        e.preventDefault();
        onToggle(node, e.nativeEvent);
      }
    }
  }, virtualNode.isCollapsed ? /* @__PURE__ */ React.createElement(ChevronRightIcon_default, {
    className: `w-4 h-4 mr-1 -ml-5  ${isSelected ? "text-slate-100" : "text-slate-600 dark:text-slate-100"}`
  }) : /* @__PURE__ */ React.createElement(ChevronDownIcon_default, {
    className: `w-4 h-4 mr-1 -ml-5 ${isSelected ? "text-slate-100" : "text-slate-600 dark:text-slate-100"}`
  })), /* @__PURE__ */ React.createElement(Body, {
    className: `${indentClassName} leading-8 truncate whitespace-nowrap pl-2 pr-2 ${isSelected ? "text-slate-100" : "text-slate-700 dark:text-slate-200"}`
  }, (_a = node.longTitle) != null ? _a : node.name)), /* @__PURE__ */ React.createElement("div", {
    className: "flex w-4/6 items-center"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "mr-2"
  }, node.icon && /* @__PURE__ */ React.createElement(node.icon, {
    className: `h-5 w-5 ${isSelected ? "text-slate-100" : "text-slate-400 dark:text-slate-500"}`
  })), node.subtitle && /* @__PURE__ */ React.createElement(Mono, {
    className: `truncate pr-1 transition ${isSelected ? "text-slate-100" : "text-slate-500 dark:text-slate-200"}`
  }, node.subtitle))));
}
function computeTreeNodePaddingClass(depth) {
  switch (depth) {
    case 0:
      return "ml-[4px] border-l border-slate-400/70";
    case 1:
      return "ml-[calc(12px_+_4px)] border-l border-pink-400/70";
    case 2:
      return "ml-[calc(12px_*_2_+_4px)] border-l border-blue-400/70";
    case 3:
      return "ml-[calc(12px_*_3_+_4px)] border-l border-orange-400/70";
    case 4:
      return "ml-[calc(12px_*_4_+_4px)] border-l border-emerald-400/70";
    case 5:
      return "ml-[calc(12px_*_5_+_4px)] border-l border-pink-400/70";
    case 6:
      return "ml-[calc(12px_*_6_+_4px)] border-l border-blue-400/70";
    case 7:
      return "ml-[calc(12px_*_7_+_4px)] border-l border-orange-400/70";
    case 8:
      return "ml-[calc(12px_*_8_+_4px)] border-l border-emerald-400/70";
    case 9:
      return "ml-[calc(12px_*_9_+_4px)] border-l border-pink-400/70";
    case 10:
      return "ml-[calc(12px_*_10_+_4px)] border-l border-orange-400/70";
    default:
      return "ml-[calc(12px_*_11_+_4px)] border-l border-slate-400/70";
  }
}

// app/routes/j/$id/tree.tsx
function TreeViewPage() {
  return /* @__PURE__ */ React.createElement(JsonTreeView, null);
}
export {
  TreeViewPage as default
};
//# sourceMappingURL=/build/routes/j/$id/tree-MPOI7LX7.js.map
