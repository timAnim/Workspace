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
  json
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\api\create[.json].ts?browser
init_react();

// app/routes/api/create[.json].ts
init_react();
var import_graphJSON = __toESM(require_graphJSON());
var import_jsonDoc = __toESM(require_jsonDoc());
var loader = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
      }
    });
  }
};
var action = async ({ request, context }) => {
  const url = new URL(request.url);
  const { title, content, ttl, readOnly } = await request.json();
  if (!title || !content) {
    return json({ message: "Missing title or content" }, 400);
  }
  invariant(typeof title === "string", "title must be a string");
  invariant(content !== null, "content cannot be null");
  const source = url.searchParams.get("utm_source");
  const options = {};
  if (typeof ttl === "number") {
    if (ttl < 60) {
      return json({ message: "ttl must be at least 60 seconds" }, 400);
    }
    options.ttl = ttl;
  }
  if (typeof readOnly === "boolean") {
    options.readOnly = readOnly;
  }
  const doc = await (0, import_jsonDoc.createFromRawJson)(title, JSON.stringify(content), options);
  url.pathname = `/j/${doc.id}`;
  url.searchParams.delete("utm_source");
  context.waitUntil((0, import_graphJSON.sendEvent)({
    type: "create",
    from: "url",
    hostname: url.hostname,
    id: doc.id,
    source
  }));
  return json({ id: doc.id, title, location: url.toString() }, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
};
export {
  action,
  loader
};
//# sourceMappingURL=/build/routes/api/create[.json]-RFPK4WGB.js.map
