import{d as i,g as d,h as c,i as f}from"/build/_shared/chunk-2ADOHOB6.js";f();var e=i(d()),P={indent:2},o=(0,e.createContext)(void 0),u=()=>{let r=localStorage.getItem("preferences"),n=JSON.parse(r||"{}");for(let[t,s]of Object.entries(P))n[t]||(n[t]=s);return n},a=r=>localStorage.setItem("preferences",JSON.stringify(r));function S({children:r}){let[n,t]=(0,e.useState)();return(0,e.useEffect)(()=>{let s=u();t(s)},[]),(0,e.useEffect)(()=>{n!==void 0&&a(n)},[n]),c.createElement(o.Provider,{value:[n,t]},r)}function v(){let r=(0,e.useContext)(o);if(r===void 0)throw new Error("usePreferences must be used within a PreferencesProvider");return r}export{S as a,v as b};