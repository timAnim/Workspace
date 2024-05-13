import {
  require_react_dom
} from "/build/_shared/chunk-YJZK26PK.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __toESM,
  init_react
} from "/build/_shared/chunk-325D37MS.js";

// app/entry.client.tsx
init_react();
var import_react_dom = __toESM(require_react_dom());

// node_modules/fathom-client/dist/fathom-client.esm.js
init_react();
var enqueue = function enqueue2(command) {
  window.__fathomClientQueue = window.__fathomClientQueue || [];
  window.__fathomClientQueue.push(command);
};
var flushQueue = function flushQueue2() {
  window.__fathomClientQueue = window.__fathomClientQueue || [];
  window.__fathomClientQueue.forEach(function(command) {
    switch (command.type) {
      case "trackPageview":
        trackPageview(command.opts);
        return;
      case "trackGoal":
        trackGoal(command.code, command.cents);
        return;
      case "enableTrackingForMe":
        enableTrackingForMe();
        return;
      case "blockTrackingForMe":
        blockTrackingForMe();
        return;
      case "setSite":
        setSite(command.id);
        return;
    }
  });
  window.__fathomClientQueue = [];
};
var checkDomainsAndWarn = function checkDomainsAndWarn2(domains) {
  var regex = /(https?)(?=:|\/|$)/;
  domains.forEach(function(domain) {
    if (regex.exec(domain) !== null)
      console.warn("The include domain ".concat(domain, " might fail to work as intended as it begins with a transfer protocol (http://, https://). Consider removing the protocol portion of the string."));
  });
};
var load = function load2(siteId, opts) {
  var tracker = document.createElement("script");
  var firstScript = document.getElementsByTagName("script")[0] || document.querySelector("body");
  tracker.id = "fathom-script";
  tracker.async = true;
  tracker.setAttribute("data-site", siteId);
  tracker.src = opts && opts.url ? opts.url : "https://cdn.usefathom.com/script.js";
  if (opts) {
    if (opts.auto !== void 0)
      tracker.setAttribute("data-auto", "".concat(opts.auto));
    if (opts.honorDNT !== void 0)
      tracker.setAttribute("data-honor-dnt", "".concat(opts.honorDNT));
    if (opts.canonical !== void 0)
      tracker.setAttribute("data-canonical", "".concat(opts.canonical));
    if (opts.includedDomains) {
      checkDomainsAndWarn(opts.includedDomains);
      tracker.setAttribute("data-included-domains", opts.includedDomains.join(","));
    }
    if (opts.excludedDomains) {
      checkDomainsAndWarn(opts.excludedDomains);
      tracker.setAttribute("data-excluded-domains", opts.excludedDomains.join(","));
    }
    if (opts.spa)
      tracker.setAttribute("data-spa", opts.spa);
  }
  tracker.onload = flushQueue;
  firstScript.parentNode.insertBefore(tracker, firstScript);
};
var trackPageview = function trackPageview2(opts) {
  if (window.fathom) {
    if (opts) {
      window.fathom.trackPageview(opts);
    } else {
      window.fathom.trackPageview();
    }
  } else {
    enqueue({
      type: "trackPageview",
      opts
    });
  }
};
var trackGoal = function trackGoal2(code, cents) {
  if (window.fathom) {
    window.fathom.trackGoal(code, cents);
  } else {
    enqueue({
      type: "trackGoal",
      code,
      cents
    });
  }
};
var blockTrackingForMe = function blockTrackingForMe2() {
  if (window.fathom) {
    window.fathom.blockTrackingForMe();
  } else {
    enqueue({
      type: "blockTrackingForMe"
    });
  }
};
var enableTrackingForMe = function enableTrackingForMe2() {
  if (window.fathom) {
    window.fathom.enableTrackingForMe();
  } else {
    enqueue({
      type: "enableTrackingForMe"
    });
  }
};
var setSite = function setSite2(id) {
  if (window.fathom) {
    window.fathom.setSite(id);
  } else {
    enqueue({
      type: "setSite",
      id
    });
  }
};

// app/entry.client.tsx
(0, import_react_dom.hydrate)(/* @__PURE__ */ React.createElement(RemixBrowser, null), document);
load("ROBFNTET", {
  spa: "history",
  excludedDomains: ["localhost"],
  includedDomains: ["jsonhero.io"]
});
//# sourceMappingURL=/build/entry.client-6E5NCOUE.js.map
