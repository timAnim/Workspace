import{a as P}from"/build/_shared/chunk-UMFVCOIP.js";import{a as n}from"/build/_shared/chunk-CEUMSNV4.js";import{a as U}from"/build/_shared/chunk-3DZTFMOM.js";import{b as o}from"/build/_shared/chunk-GZMK5MKI.js";import{d as j,i as a}from"/build/_shared/chunk-2ADOHOB6.js";a();a();var u=j(U()),i=j(P()),O=async({request:y,context:l})=>{var h;let t=new URL(y.url),c=t.searchParams.get("url"),m=t.searchParams.get("j"),d=t.searchParams.get("ttl"),f=t.searchParams.get("readonly"),r=t.searchParams.get("title"),p=t.searchParams.get("injest");if(!c&&!m)return o("/");let s={};if(typeof d=="string"&&(n(d.match(/^\d+$/),"ttl must be a number"),s.ttl=parseInt(d,10),n(s.ttl>=60,"ttl must be at least 60 seconds")),typeof f=="string"&&(s.readOnly=f==="true"),typeof p=="string"&&(s.injest=p==="true"),c){let e=new URL(c);n(e,"url must be a valid URL");let g=await(0,i.createFromUrl)(e,r!=null?r:e.href,s);return l.waitUntil((0,u.sendEvent)({type:"create",from:"url",hostname:e.hostname,id:g.id,source:(h=t.searchParams.get("utm_source"))!=null?h:t.hostname})),o(`/j/${g.id}`)}if(m){let e=await(0,i.createFromRawJson)(r!=null?r:"Untitled",atob(m),s);return l.waitUntil((0,u.sendEvent)({type:"create",from:"base64",id:e.id,source:t.searchParams.get("utm_source")})),o(`/j/${e.id}`)}};export{O as loader};
