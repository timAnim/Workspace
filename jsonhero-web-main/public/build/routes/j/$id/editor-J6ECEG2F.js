import {
  EditorView,
  darkTheme,
  getEditorSetup,
  json,
  lightTheme,
  require_json_source_map,
  useCodeMirror
} from "/build/_shared/chunk-MUQ2Q3OY.js";
import {
  require_lib,
  useHotkeys,
  useJson,
  useJsonColumnViewAPI,
  useJsonColumnViewState,
  useJsonDoc
} from "/build/_shared/chunk-BHS6ID4G.js";
import "/build/_shared/chunk-7ST6BW3T.js";
import {
  usePreferences
} from "/build/_shared/chunk-CMQL53DO.js";
import "/build/_shared/chunk-IW4CVGHS.js";
import {
  useTheme
} from "/build/_shared/chunk-LZBJICSD.js";
import "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\j\$id\editor.tsx?browser
init_react();

// app/routes/j/$id/editor.tsx
init_react();

// app/components/JsonEditor.tsx
init_react();

// app/components/CodeEditor.tsx
init_react();
var import_react = __toESM(require_react());
var languages = {
  json
};
var defaultProps = {
  language: "json",
  readOnly: true,
  selection: { start: 0, end: 0 }
};
function CodeEditor(opts) {
  const { content, language, readOnly, onChange, onUpdate, selection } = {
    ...defaultProps,
    ...opts
  };
  const [theme] = useTheme();
  const extensions = getEditorSetup();
  const languageExtension = languages[language];
  extensions.push(languageExtension());
  const editor = (0, import_react.useRef)(null);
  const { setContainer, view, state } = useCodeMirror({
    container: editor.current,
    extensions,
    editable: !readOnly,
    contentEditable: !readOnly,
    value: content,
    autoFocus: false,
    theme: theme === "light" ? lightTheme() : darkTheme(),
    indentWithTab: false,
    basicSetup: false,
    onChange,
    onUpdate
  });
  (0, import_react.useEffect)(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);
  const setSelectionRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    var _a, _b;
    if (setSelectionRef.current) {
      return;
    }
    if (view) {
      setSelectionRef.current = true;
      const selectionStart = (_a = selection == null ? void 0 : selection.start) != null ? _a : defaultProps.selection.start;
      const selectionEnd = (_b = selection == null ? void 0 : selection.end) != null ? _b : defaultProps.selection.end;
      const lineNumber = state == null ? void 0 : state.doc.lineAt(selectionStart).number;
      const transactionSpec = {
        selection: { anchor: selectionStart, head: selectionEnd },
        effects: EditorView.scrollIntoView(selectionStart, {
          y: "start",
          yMargin: 100
        })
      };
      view.dispatch(transactionSpec);
    }
  }, [selection, view, setSelectionRef.current]);
  const { minimal } = useJsonDoc();
  useHotkeys("ctrl+a,meta+a,command+a", (e) => {
    e.preventDefault();
    view == null ? void 0 : view.dispatch({ selection: { anchor: 0, head: state == null ? void 0 : state.doc.length } });
  }, [view, state]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: `${minimal ? "h-jsonViewerHeightMinimal" : "h-jsonViewerHeight"} overflow-y-auto no-scrollbar`,
    ref: editor
  }));
}

// app/components/JsonEditor.tsx
var import_react2 = __toESM(require_react());
var import_json_source_map = __toESM(require_json_source_map());
var import_path = __toESM(require_lib());
function JsonEditor() {
  const [json2] = useJson();
  const { selectedNodeId } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const [preferences] = usePreferences();
  const jsonMapped = (0, import_react2.useMemo)(() => {
    return import_json_source_map.default.stringify(json2, null, (preferences == null ? void 0 : preferences.indent) || 2);
  }, [json2, preferences]);
  const selection = (0, import_react2.useMemo)(() => {
    if (!selectedNodeId) {
      return;
    }
    const path = new import_path.JSONHeroPath(selectedNodeId);
    const pointer = path.jsonPointer();
    const location = jsonMapped.pointers[pointer];
    if (location) {
      if (location.key) {
        return { start: location.key.pos, end: location.valueEnd.pos };
      }
      return { start: location.value.pos, end: location.valueEnd.pos };
    }
  }, [selectedNodeId, jsonMapped]);
  const currentSelectedLine = (0, import_react2.useRef)(void 0);
  const onUpdate = (0, import_react2.useCallback)((update) => {
    if (!update.selectionSet) {
      return;
    }
    const range = update.state.selection.ranges[0];
    const line = update.state.doc.lineAt(range.anchor);
    if (currentSelectedLine.current && currentSelectedLine.current === line.number) {
      return;
    }
    currentSelectedLine.current = line.number;
    const pointerEntry = Object.entries(jsonMapped.pointers).find(([pointer2, info]) => {
      return info.value.line === line.number - 1;
    });
    if (!pointerEntry) {
      return;
    }
    const [pointer] = pointerEntry;
    const path = import_path.JSONHeroPath.fromPointer(pointer);
    goToNodeId(path.toString(), "editor");
  }, [goToNodeId]);
  return /* @__PURE__ */ React.createElement(CodeEditor, {
    language: "json",
    content: jsonMapped.json,
    readOnly: true,
    onUpdate,
    selection
  });
}

// app/routes/j/$id/editor.tsx
function EditorView2() {
  return /* @__PURE__ */ React.createElement(JsonEditor, null);
}
export {
  EditorView2 as default
};
//# sourceMappingURL=/build/routes/j/$id/editor-J6ECEG2F.js.map
