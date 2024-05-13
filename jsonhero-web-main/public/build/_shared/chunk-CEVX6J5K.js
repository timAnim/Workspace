import{p as c}from"/build/_shared/chunk-GZMK5MKI.js";import{d as a,g as f,h as n,i as h}from"/build/_shared/chunk-2ADOHOB6.js";h();var e=a(f());var u=(0,e.createContext)(void 0),m="(prefers-color-scheme: light)",p=()=>window.matchMedia(m).matches?"light":"dark";function y({children:t,specifiedTheme:o,themeOverride:i}){let[r,d]=(0,e.useState)(()=>{if(o)return o==="light"||o==="dark"?o:void 0;if(typeof window=="object")return p()}),s=(0,e.useRef)(!1),l=c();return(0,e.useEffect)(()=>{if(!s.current){s.current=!0;return}!r||l.submit({theme:r},{action:"actions/setTheme",method:"post"})},[r]),n.createElement(u.Provider,{value:[i!=null?i:r,d]},t)}function x(){let t=(0,e.useContext)(u);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t}var T=`
;(() => {
  const theme = window.matchMedia(${JSON.stringify(m)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let us know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
})();
`;function w({ssrTheme:t}){return n.createElement(n.Fragment,null,t?null:n.createElement("script",{dangerouslySetInnerHTML:{__html:T}}))}function k(t){return typeof t=="string"&&["light","dark"].includes(t)}export{y as a,x as b,w as c,k as d};
