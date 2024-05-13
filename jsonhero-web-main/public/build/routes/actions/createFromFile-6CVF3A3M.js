import {
  require_jsonDoc
} from "/build/_shared/chunk-VBPSB3Y6.js";
import {
  invariant
} from "/build/_shared/chunk-IW4CVGHS.js";
import {
  require_graphJSON
} from "/build/_shared/chunk-5QGTWAOD.js";
import {
  redirect
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\actions\createFromFile.ts?browser
init_react();

// app/routes/actions/createFromFile.ts
init_react();
var import_graphJSON = __toESM(require_graphJSON());
var import_jsonDoc = __toESM(require_jsonDoc());
var action = async ({ request, context }) => {
  var _a;
  const formData = await request.formData();
  const filename = formData.get("filename");
  const rawJson = formData.get("rawJson");
  const errors = {};
  if (!filename)
    errors.filename = true;
  if (!rawJson)
    errors.rawJson = true;
  if (Object.keys(errors).length) {
    return errors;
  }
  invariant(typeof filename === "string", "filename must be a string");
  invariant(typeof rawJson === "string", "rawJson must be a string");
  const doc = await (0, import_jsonDoc.createFromRawJson)(filename, rawJson);
  const url = new URL(request.url);
  context.waitUntil((0, import_graphJSON.sendEvent)({
    type: "create",
    from: "file",
    id: doc.id,
    source: (_a = url.searchParams.get("utm_source")) != null ? _a : url.hostname
  }));
  return redirect(`/j/${doc.id}`);
};
export {
  action
};
//# sourceMappingURL=/build/routes/actions/createFromFile-6CVF3A3M.js.map
