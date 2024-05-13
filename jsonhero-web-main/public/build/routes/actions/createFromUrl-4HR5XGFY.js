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
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// empty-module:../../services/toast.server
var require_toast = __commonJS({
  "empty-module:../../services/toast.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\actions\createFromUrl.ts?browser
init_react();

// app/routes/actions/createFromUrl.ts
init_react();
var import_jsonDoc = __toESM(require_jsonDoc());
var import_graphJSON = __toESM(require_graphJSON());
var import_toast = __toESM(require_toast());
var action = async ({ request, context }) => {
  var _a;
  const formData = await request.formData();
  const toastCookie = await (0, import_toast.getSession)(request.headers.get("cookie"));
  const jsonUrl = formData.get("jsonUrl");
  const title = formData.get("title");
  const errors = {};
  if (!jsonUrl)
    errors.jsonUrl = true;
  if (Object.keys(errors).length) {
    return errors;
  }
  invariant(typeof jsonUrl === "string", "jsonUrl must be a string");
  try {
    const doc = await (0, import_jsonDoc.createFromUrlOrRawJson)(jsonUrl, title);
    if (!doc) {
      (0, import_toast.setErrorMessage)(toastCookie, "Unknown error", "Could not create document. Please try again.");
      return redirect("/", {
        headers: { "Set-Cookie": await (0, import_toast.commitSession)(toastCookie) }
      });
    }
    const requestUrl = new URL(request.url);
    context.waitUntil((0, import_graphJSON.sendEvent)({
      type: "create",
      from: "urlOrJson",
      id: doc.id,
      source: (_a = requestUrl.searchParams.get("utm_source")) != null ? _a : requestUrl.hostname
    }));
    return redirect(`/j/${doc.id}`);
  } catch (e) {
    if (e instanceof Error) {
      (0, import_toast.setErrorMessage)(toastCookie, e.message, "Something went wrong");
    } else {
      (0, import_toast.setErrorMessage)(toastCookie, "Unknown error", "Something went wrong");
    }
    return redirect("/", {
      headers: { "Set-Cookie": await (0, import_toast.commitSession)(toastCookie) }
    });
  }
};
var loader = async ({ request, context }) => {
  var _a;
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("jsonUrl");
  if (!jsonUrl) {
    return redirect("/");
  }
  const jsonURL = new URL(jsonUrl);
  invariant(jsonURL, "jsonUrl must be a valid URL");
  const doc = await (0, import_jsonDoc.createFromUrl)(jsonURL, jsonURL.href);
  context.waitUntil((0, import_graphJSON.sendEvent)({
    type: "create",
    from: "url",
    hostname: jsonURL.hostname,
    id: doc.id,
    source: (_a = url.searchParams.get("utm_source")) != null ? _a : url.hostname
  }));
  return redirect(`/j/${doc.id}`);
};
export {
  action,
  loader
};
//# sourceMappingURL=/build/routes/actions/createFromUrl-4HR5XGFY.js.map
