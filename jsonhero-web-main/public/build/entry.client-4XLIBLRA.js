import{a as w}from"/build/_shared/chunk-PZ2Z7HGX.js";import{q as u}from"/build/_shared/chunk-GZMK5MKI.js";import{d as s,h as r,i as o}from"/build/_shared/chunk-2ADOHOB6.js";o();var f=s(w());o();var i=function(t){window.__fathomClientQueue=window.__fathomClientQueue||[],window.__fathomClientQueue.push(t)},h=function(){window.__fathomClientQueue=window.__fathomClientQueue||[],window.__fathomClientQueue.forEach(function(t){switch(t.type){case"trackPageview":m(t.opts);return;case"trackGoal":k(t.code,t.cents);return;case"enableTrackingForMe":b();return;case"blockTrackingForMe":g();return;case"setSite":v(t.id);return}}),window.__fathomClientQueue=[]},d=function(t){var e=/(https?)(?=:|\/|$)/;t.forEach(function(a){e.exec(a)!==null&&console.warn("The include domain ".concat(a," might fail to work as intended as it begins with a transfer protocol (http://, https://). Consider removing the protocol portion of the string."))})},l=function(t,e){var a=document.createElement("script"),c=document.getElementsByTagName("script")[0]||document.querySelector("body");a.id="fathom-script",a.async=!0,a.setAttribute("data-site",t),a.src=e&&e.url?e.url:"https://cdn.usefathom.com/script.js",e&&(e.auto!==void 0&&a.setAttribute("data-auto","".concat(e.auto)),e.honorDNT!==void 0&&a.setAttribute("data-honor-dnt","".concat(e.honorDNT)),e.canonical!==void 0&&a.setAttribute("data-canonical","".concat(e.canonical)),e.includedDomains&&(d(e.includedDomains),a.setAttribute("data-included-domains",e.includedDomains.join(","))),e.excludedDomains&&(d(e.excludedDomains),a.setAttribute("data-excluded-domains",e.excludedDomains.join(","))),e.spa&&a.setAttribute("data-spa",e.spa)),a.onload=h,c.parentNode.insertBefore(a,c)},m=function(t){window.fathom?t?window.fathom.trackPageview(t):window.fathom.trackPageview():i({type:"trackPageview",opts:t})},k=function(t,e){window.fathom?window.fathom.trackGoal(t,e):i({type:"trackGoal",code:t,cents:e})},g=function(){window.fathom?window.fathom.blockTrackingForMe():i({type:"blockTrackingForMe"})},b=function(){window.fathom?window.fathom.enableTrackingForMe():i({type:"enableTrackingForMe"})},v=function(t){window.fathom?window.fathom.setSite(t):i({type:"setSite",id:t})};(0,f.hydrate)(r.createElement(u,null),document);l("ROBFNTET",{spa:"history",excludedDomains:["localhost"],includedDomains:["jsonhero.io"]});