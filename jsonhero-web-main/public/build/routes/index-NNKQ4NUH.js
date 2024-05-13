import {
  HomeHeader,
  TwitterIcon
} from "/build/_shared/chunk-6QS4HD2P.js";
import {
  ExtraLargeTitle,
  JsonPreview,
  PreviewValue,
  PropertiesValue,
  SmallSubtitle,
  classnames
} from "/build/_shared/chunk-D3QV33FR.js";
import {
  DragAndDropForm,
  Logo,
  SampleUrls,
  UrlForm
} from "/build/_shared/chunk-FMVAGKIZ.js";
import {
  LargeTitle
} from "/build/_shared/chunk-XR6OGC5J.js";
import "/build/_shared/chunk-MUQ2Q3OY.js";
import "/build/_shared/chunk-INLOL6O7.js";
import {
  Title
} from "/build/_shared/chunk-ZOQKLX7S.js";
import "/build/_shared/chunk-CCCYTS2U.js";
import {
  Body
} from "/build/_shared/chunk-3VJ35PHZ.js";
import {
  JsonColumnViewProvider,
  JsonDocProvider,
  JsonProvider,
  useJsonColumnViewAPI
} from "/build/_shared/chunk-BHS6ID4G.js";
import {
  ClockIcon_default,
  CodeIcon_default,
  CubeTransparentIcon_default,
  ExclamationCircleIcon_default,
  FastForwardIcon_default,
  InformationCircleIcon_default,
  LockOpenIcon_default,
  MoonIcon_default
} from "/build/_shared/chunk-7ST6BW3T.js";
import {
  require_react_dom
} from "/build/_shared/chunk-YJZK26PK.js";
import "/build/_shared/chunk-2VHYU7Q2.js";
import "/build/_shared/chunk-CMQL53DO.js";
import "/build/_shared/chunk-IW4CVGHS.js";
import "/build/_shared/chunk-LZBJICSD.js";
import {
  Link,
  _extends,
  useLoaderData
} from "/build/_shared/chunk-4PKV6AUD.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-325D37MS.js";

// empty-module:../services/toast.server
var require_toast = __commonJS({
  "empty-module:../services/toast.server"(exports, module) {
    init_react();
    module.exports = {};
  }
});

// browser-route-module:E:\Workspace\jsonhero-web-main\app\routes\index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();

// app/components/Home/HomeCollaborateSection.tsx
init_react();

// app/components/AutoplayVideo.tsx
init_react();
var import_react2 = __toESM(require_react());

// app/hooks/useOnScreen.tsx
init_react();
var import_react = __toESM(require_react());
function useOnScreen(ref) {
  const observerRef = (0, import_react.useRef)(null);
  const [isOnScreen, setIsOnScreen] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting));
  }, []);
  (0, import_react.useEffect)(() => {
    if (observerRef.current == null || ref.current == null)
      return;
    observerRef.current.observe(ref.current);
    return () => {
      if (observerRef.current == null)
        return;
      observerRef.current.disconnect();
    };
  }, [ref]);
  return isOnScreen;
}

// app/components/AutoplayVideo.tsx
function AutoplayVideo({ src }) {
  const elementRef = (0, import_react2.useRef)(null);
  const isOnScreen = useOnScreen(elementRef);
  (0, import_react2.useEffect)(() => {
    if (elementRef.current == null)
      return;
    elementRef.current.muted = true;
    elementRef.current.playsInline = true;
    if (isOnScreen) {
      elementRef.current.play();
    } else {
      elementRef.current.pause();
    }
  }, [isOnScreen]);
  return /* @__PURE__ */ React.createElement("video", {
    src,
    ref: elementRef,
    loop: true,
    muted: true,
    autoPlay: false
  });
}

// app/components/Home/HomeSection.tsx
init_react();
function HomeSection({
  containerClassName,
  maxWidth = "1150px",
  reversed = false,
  flipped = false,
  children
}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex justify-center items-center ${containerClassName}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col md:flex-row w-full ${reversed ? "md:flex-row-reverse" : ""}${flipped ? "flex-col-reverse" : ""}`,
    style: { maxWidth }
  }, children));
}

// app/assets/home/JsonHeroShare.mp4
var JsonHeroShare_default = "/build/_assets/JsonHeroShare-2DYKMDGJ.mp4";

// app/components/Home/HomeCollaborateSection.tsx
function HomeCollaborateSection() {
  return /* @__PURE__ */ React.createElement(HomeSection, {
    containerClassName: "py-10 px-6 bg-black md:py-36 lg:py-20",
    reversed: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:pl-10 md:w-1/2"
  }, /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-white mb-4"
  }, "Collaborate with the whole world (and yourself)"), /* @__PURE__ */ React.createElement(SmallSubtitle, {
    className: "mb-6 md:mb-10"
  }, "Easily share your JSON documents with any distant relative. Link right to the part of the document you're on. Or save the link for some casual browsing later in the evening while enjoying a glass of red.")), /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:w-1/2"
  }, /* @__PURE__ */ React.createElement(AutoplayVideo, {
    src: JsonHeroShare_default
  })));
}

// app/components/Home/HomeEdgeCasesSection.tsx
init_react();

// app/assets/home/UncoverEdgeCases.mp4
var UncoverEdgeCases_default = "/build/_assets/UncoverEdgeCases-ZXJ3KI5X.mp4";

// app/components/Home/HomeEdgeCasesSection.tsx
function HomeEdgeCasesSection() {
  return /* @__PURE__ */ React.createElement(HomeSection, {
    containerClassName: "py-10 px-6 bg-black md:py-36 lg:py-20",
    reversed: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:pl-10 md:w-1/2"
  }, /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-white mb-4"
  }, "Uncover edge cases"), /* @__PURE__ */ React.createElement(SmallSubtitle, {
    className: "mb-6 md:mb-10"
  }, "Sometimes a field can be null, have an unexpected value or be missing entirely. View any field's related values and see what to expect when you least expect it. Or check out the inferred JSON schema to see what your JSON is really made of.")), /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:w-1/2"
  }, /* @__PURE__ */ React.createElement(AutoplayVideo, {
    src: UncoverEdgeCases_default
  })));
}

// app/components/Home/HomeFeatureGridSection.tsx
init_react();

// app/components/Home/HomeGridFeatureItem.tsx
init_react();
function HomeGridFeatureItem(props) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex lg:basis-1/4 basis-1 md:basis-1/4 flex-grow flex-col p-6 rounded-sm bg-white bg-opacity-[7%]"
  }, /* @__PURE__ */ React.createElement(props.icon, {
    className: "w-10 h-10 min-h-[44px] text-indigo-700 mb-3"
  }), /* @__PURE__ */ React.createElement(Title, {
    className: props.titleClassName
  }, props.title), props.children);
}

// app/components/Home/HomeFeatureGridSection.tsx
function HomeFeatureGridSection() {
  return /* @__PURE__ */ React.createElement(HomeSection, {
    containerClassName: "bg-black"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col px-4 pb-2 pt-6 md:py-12"
  }, /* @__PURE__ */ React.createElement(LargeTitle, {
    className: "mb-4 text-slate-300"
  }, "And lots more features\u2026"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col gap-4 md:flex-row md:flex-wrap"
  }, /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: FastForwardIcon_default,
    title: "Keyboard shortcuts",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Move as fast as you can think\u2026 after 3 coffees")), /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: MoonIcon_default,
    title: "Dark mode",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Of course, we\u2019re not animals.")), /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: ClockIcon_default,
    title: "Code view",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Easily switch to the code view, so you can appear hardcore.")), /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: CubeTransparentIcon_default,
    title: "Auto JSON Schema",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Automatically generates JSON Schema (draft 2020-12) from your JSON.")), /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: CodeIcon_default,
    title: "VS Code plugin",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Quickly view JSON files or selections in JSON Hero, right from VS Code.", " ", /* @__PURE__ */ React.createElement("a", {
    className: "whitespace-nowrap text-lime-300 hover:text-lime-500",
    href: "https://marketplace.visualstudio.com/items?itemName=JSONHero.jsonhero-vscode",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Get it here"), ".")), /* @__PURE__ */ React.createElement(HomeGridFeatureItem, {
    icon: LockOpenIcon_default,
    title: "100% open source",
    titleClassName: "text-white"
  }, /* @__PURE__ */ React.createElement(Body, {
    className: "text-slate-400"
  }, "Use jsonhero.io or fork it on GitHub and run it yourself.")))));
}

// app/components/Home/HomeHeroSection.tsx
init_react();

// app/components/NewFile.tsx
init_react();
function NewFile() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(UrlForm, null)), /* @__PURE__ */ React.createElement(DragAndDropForm, null), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 pt-5"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "mb-2 text-slate-200"
  }, "No JSON? Try it out:"), /* @__PURE__ */ React.createElement(SampleUrls, null)));
}

// app/assets/home/JsonHero2.mp4
var JsonHero2_default = "/build/_assets/JsonHero2-TQVVSEFW.mp4";

// app/components/Home/HomeHeroSection.tsx
var jsonHeroTitle = "JSON sucks.";
var jsonHeroSlogan = "But we're making it better.";
function HomeHeroSection() {
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex items-stretch flex-col md:flex-row bg-[rgb(56,52,139)] lg:p-6 lg:pb-16 pt-20 lg:pt-32`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "self-center md:w-1/2 md:pr-10 flex justify-end"
  }, /* @__PURE__ */ React.createElement("div", {
    className: " max-w-3xl"
  }, /* @__PURE__ */ React.createElement(AutoplayVideo, {
    src: JsonHero2_default
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "self-center flex align-center md:w-1/2 px-6 pb-8 mt-8 lg:mt-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-lg"
  }, /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-lime-300"
  }, jsonHeroTitle), /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-white mb-4"
  }, jsonHeroSlogan), /* @__PURE__ */ React.createElement(SmallSubtitle, {
    className: "text-slate-200 mb-8"
  }, "Stop staring at thousand line JSON files in your editor and start staring at thousand line JSON files in the world's best JSON viewer. With a few nice features to help make it not ", /* @__PURE__ */ React.createElement("em", null, "the worst"), "."), /* @__PURE__ */ React.createElement(NewFile, null))));
}

// app/components/Home/HomeInfoBoxSection.tsx
init_react();
var import_react3 = __toESM(require_react());
var json = {
  id: "a1c33bd1-0528-4de3-a745-44d95e7ac3d8",
  title: "JSON Hero is a tool for JSON",
  thumbnail: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy-downsized.gif",
  createdAt: "2022-02-01T02:25:41-05:00",
  tint: "#EAB308",
  webpages: "https://www.theonion.com/",
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  json: "bourne"
};
var infoBoxData = [
  {
    title: "Images",
    highlight: "$.thumbnail"
  },
  {
    title: "Dates",
    highlight: "$.createdAt"
  },
  {
    title: "Colors",
    highlight: "$.tint"
  },
  {
    title: "URLs",
    highlight: "$.webpages"
  },
  {
    title: "Videos",
    highlight: "$.youtube"
  }
];
var autoplayDuration = 3e3;
function HomeInfoBoxSection() {
  return /* @__PURE__ */ import_react3.default.createElement(SampleJSONPreview, {
    initialSelection: infoBoxData[0].highlight
  }, /* @__PURE__ */ import_react3.default.createElement(HomeInfoBoxSectionContent, null));
}
function HomeInfoBoxSectionContent() {
  const [index, setIndex] = (0, import_react3.useState)(0);
  const api = useJsonColumnViewAPI();
  const interval = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const selectedPath = infoBoxData[index].highlight;
    api.goToNodeId(selectedPath, "home");
  }, [index]);
  const resetInterval = () => {
    if (interval.current != null) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setIndex((i) => i = (i + 1) % infoBoxData.length);
    }, autoplayDuration);
  };
  (0, import_react3.useEffect)(() => {
    resetInterval();
    return () => {
      if (interval.current == null)
        return;
      clearInterval(interval.current);
    };
  }, []);
  return /* @__PURE__ */ import_react3.default.createElement(HomeSection, {
    containerClassName: "bg-black p-6"
  }, /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "md:pr-4 lg:pr-10 flex flex-col w-full md:w-1/2"
  }, /* @__PURE__ */ import_react3.default.createElement(ExtraLargeTitle, {
    className: "text-white mb-4"
  }, /* @__PURE__ */ import_react3.default.createElement("span", {
    className: " text-lime-300"
  }, infoBoxData[index].title), " are more than just strings"), /* @__PURE__ */ import_react3.default.createElement(SmallSubtitle, {
    className: "text-slate-400 mb-10"
  }, "We figure out what your strings are made of, so you don't have to."), /* @__PURE__ */ import_react3.default.createElement("ul", {
    className: "flex w-full text-slate-300 mb-3"
  }, infoBoxData.map((value, i) => {
    return /* @__PURE__ */ import_react3.default.createElement("li", {
      key: value.highlight,
      onClick: () => {
        resetInterval();
        setIndex(i);
      },
      className: `flex flex-grow justify-center px-4 py-2 cursor-pointer border-b-2 ${index === i ? "text-white border-lime-500" : "border-slate-600"}`
    }, value.title);
  })), /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "w-full"
  }, /* @__PURE__ */ import_react3.default.createElement(JsonPreview, {
    json,
    highlightPath: infoBoxData[index].highlight
  }))), /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "relative w-full md:w-1/2 flex flex-col justify-center items-center py-5"
  }, /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "pointer-events-none absolute z-10 bottom-0 w-full h-[200px] bg-gradient-to-t from-slate-900 to-transparent mb-5"
  }), /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "pointer-events-auto min-w-full max-w-full p-4 rounded-sm bg-slate-900 h-[65vh] overflow-y-auto custom-scrollbar"
  }, /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "pointer-events-none"
  }, /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ import_react3.default.createElement(PreviewValue, null)), /* @__PURE__ */ import_react3.default.createElement(PropertiesValue, null)))));
}
function SampleJSONPreview({
  children,
  initialSelection
}) {
  return /* @__PURE__ */ import_react3.default.createElement(JsonDocProvider, {
    doc: {
      id: "sample",
      title: "Sample",
      type: "raw",
      readOnly: false,
      contents: ""
    },
    path: initialSelection
  }, /* @__PURE__ */ import_react3.default.createElement(JsonProvider, {
    initialJson: json
  }, /* @__PURE__ */ import_react3.default.createElement(JsonColumnViewProvider, null, children)));
}

// app/components/Home/HomeSearchSection.tsx
init_react();

// app/assets/home/JsonHeroSearch.mp4
var JsonHeroSearch_default = "/build/_assets/JsonHeroSearch-QYLBWUOX.mp4";

// app/components/Home/HomeSearchSection.tsx
function HomeSearchSection() {
  return /* @__PURE__ */ React.createElement(HomeSection, {
    containerClassName: "py-10 px-6 bg-black md:py-36 lg:py-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:pr-10 md:w-1/2"
  }, /* @__PURE__ */ React.createElement(ExtraLargeTitle, {
    className: "text-white mb-4"
  }, "Quickly search your whole JSON file"), /* @__PURE__ */ React.createElement(SmallSubtitle, {
    className: "mb-6 md:mb-10"
  }, "Search for absolutely anything in your JSON file with blistering speed. Use the fuzzy matching and keyboard shortcuts to make navigating your files even faster.")), /* @__PURE__ */ React.createElement("div", {
    className: "w-full md:w-1/2"
  }, /* @__PURE__ */ React.createElement(AutoplayVideo, {
    src: JsonHeroSearch_default
  })));
}

// app/components/Home/HomeFooter.tsx
init_react();

// app/components/Icons/DiscordIcon.tsx
init_react();
function DiscordIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "#F8FAFC"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M18.0881 7.3374C18.0116 7.27279 17.9402 7.2032 17.8637 7.14356C17.554 6.88097 17.2269 6.63856 16.8846 6.41792C16.4342 6.13677 15.9516 5.90824 15.4464 5.73702C15.0844 5.61277 14.7172 5.51835 14.35 5.40901C14.2837 5.40901 14.2786 5.38414 14.3092 5.3245C14.3398 5.26485 14.4061 5.14558 14.4469 5.05115C14.4538 5.03366 14.4667 5.0191 14.4835 5.01001C14.5003 5.00092 14.5198 4.99789 14.5387 5.00146C14.809 5.04619 15.0844 5.07601 15.3547 5.13069C15.8281 5.229 16.2896 5.3756 16.7316 5.56805C17.1998 5.76225 17.6502 5.99501 18.0779 6.26385C18.2267 6.353 18.3697 6.45094 18.5063 6.5571C18.5891 6.62989 18.6566 6.71764 18.7051 6.81552C19.1108 7.51363 19.4521 8.24546 19.7251 9.00236C20.1066 10.0234 20.3983 11.0742 20.5971 12.1435C20.7042 12.715 20.7909 13.2866 20.8674 13.8631C20.9184 14.216 20.9388 14.5788 20.9745 14.9366C20.9745 15.0559 20.9745 15.1702 21 15.2895C21 15.3164 20.9911 15.3425 20.9745 15.3641C20.462 15.9257 19.8549 16.398 19.1794 16.7606C18.5379 17.1017 17.8516 17.3558 17.1395 17.5161C16.7511 17.6096 16.3554 17.6711 15.9564 17.7H15.7116C15.701 17.7002 15.6904 17.6981 15.6807 17.6938C15.671 17.6895 15.6624 17.6831 15.6555 17.6752C15.4413 17.4068 15.2323 17.1334 15.0232 16.8551V16.8253C16.3606 16.3823 17.5548 15.6041 18.4859 14.5689C18.3788 14.6434 18.2819 14.718 18.1748 14.7826C17.8739 14.9665 17.5781 15.1504 17.267 15.3193C16.7354 15.61 16.1728 15.8433 15.5892 16.0151C14.6422 16.3069 13.6595 16.474 12.6671 16.5121H12.3713H11.8155C11.4011 16.5146 10.9871 16.4897 10.5762 16.4376C10.1887 16.3879 9.80109 16.3332 9.41351 16.2636C8.86661 16.1567 8.33068 16.002 7.81221 15.8014C7.15233 15.5479 6.523 15.2246 5.93553 14.8372L5.55306 14.5788C6.01711 15.0934 6.54864 15.5462 7.13396 15.9257C7.72153 16.3044 8.35541 16.6099 9.02084 16.8352L8.98514 16.8899L8.39358 17.6553C8.38145 17.6729 8.36453 17.6868 8.34472 17.6956C8.3249 17.7044 8.30298 17.7076 8.28138 17.705C7.93875 17.691 7.59775 17.6511 7.26145 17.5857C6.76756 17.4952 6.28289 17.3621 5.81314 17.1881C5.27458 16.9934 4.76114 16.7382 4.28323 16.4277C3.86783 16.1551 3.48621 15.8365 3.14601 15.4784C3.14601 15.4784 3.12051 15.4386 3.10011 15.4287C3.06012 15.3983 3.03012 15.3571 3.01381 15.3103C2.9975 15.2635 2.99559 15.2131 3.00831 15.1653L3.05421 14.6335C3.0899 14.2856 3.1205 13.9426 3.1664 13.5947C3.2123 13.2468 3.28879 12.7647 3.36529 12.3472C3.51174 11.5311 3.7093 10.7244 3.95685 9.93177C4.16738 9.2543 4.42116 8.59033 4.71671 7.94373C4.91624 7.50667 5.14275 7.08178 5.39497 6.6714C5.46939 6.5728 5.56514 6.49137 5.67544 6.43284C6.1388 6.11857 6.63239 5.84893 7.14925 5.62769C7.71444 5.38251 8.30641 5.20075 8.91375 5.08594L9.47981 5.00643C9.49599 5.00328 9.51279 5.00611 9.52694 5.01438C9.54108 5.02265 9.55155 5.03575 9.55631 5.05115L9.7042 5.33942C9.7297 5.38415 9.7042 5.39907 9.6685 5.40901C9.41351 5.47859 9.15854 5.54319 8.90865 5.61774C8.45618 5.75584 8.01886 5.93729 7.60313 6.15946C7.24627 6.34465 6.9052 6.5574 6.58319 6.79565C6.3588 6.9696 6.14462 7.14853 5.92533 7.32745C5.9235 7.33135 5.92255 7.33557 5.92255 7.33986C5.92255 7.34415 5.9235 7.3484 5.92533 7.35229L5.99163 7.32248C6.471 7.09882 6.95037 6.86522 7.43994 6.65647C8.00719 6.4106 8.59831 6.22081 9.20443 6.08991C9.61682 5.99062 10.0361 5.92083 10.459 5.88114C10.8414 5.84635 11.2239 5.82649 11.6013 5.80661C11.79 5.80661 11.9787 5.80661 12.1673 5.80661C12.5141 5.80661 12.866 5.8414 13.2128 5.86625C13.8437 5.91322 14.4686 6.01806 15.0793 6.17936C15.6332 6.32264 16.1739 6.51049 16.6959 6.74099L17.9606 7.33243L18.0218 7.36224L18.0881 7.3374ZM9.35232 10.5679C9.08643 10.5761 8.82881 10.66 8.6113 10.8093C8.39378 10.9586 8.2259 11.1667 8.12839 11.4079C7.98657 11.7022 7.93351 12.0296 7.97541 12.3522C8.01397 12.7406 8.19505 13.1024 8.48538 13.371C8.61754 13.5006 8.77761 13.6 8.95401 13.6619C9.13041 13.7238 9.31872 13.7467 9.50531 13.7289C9.68475 13.7178 9.85988 13.6705 10.0196 13.5901C10.1794 13.5097 10.3203 13.3979 10.4335 13.2617C10.7252 12.9245 10.8682 12.4886 10.8312 12.049C10.8196 11.7253 10.7096 11.4122 10.515 11.1494C10.3862 10.9659 10.2123 10.8166 10.0093 10.7151C9.80628 10.6135 9.58046 10.563 9.35232 10.5679ZM16.1094 12.1733C16.1148 11.8593 16.0319 11.55 15.8697 11.2787C15.7548 11.0583 15.5775 10.8747 15.3587 10.7496C15.14 10.6245 14.889 10.5632 14.6356 10.5729C14.451 10.578 14.2698 10.6219 14.1043 10.7017C13.9388 10.7815 13.793 10.8953 13.6769 11.0351C13.5285 11.203 13.4159 11.398 13.3459 11.6088C13.2758 11.8196 13.2496 12.0419 13.2689 12.2627C13.2861 12.6947 13.4787 13.1023 13.8043 13.3959C13.9417 13.5243 14.1072 13.6205 14.2883 13.6773C14.4694 13.7342 14.6614 13.7501 14.8498 13.7239C15.1962 13.6764 15.5095 13.4978 15.7218 13.2269C15.9694 12.9284 16.106 12.5571 16.1094 12.1733Z",
    fill: "#4338CA"
  }));
}

// app/components/Icons/EmailIcon.tsx
init_react();
function EmailIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: "#4338CA"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M12 0C5.37251 0 0 5.37251 0 12C0 18.6275 5.37251 24 12 24C18.6275 24 24 18.6275 24 12C24 5.37251 18.6275 0 12 0ZM4.02864 7.38421C4.29607 6.6387 4.79768 6.14156 5.58914 5.98842C5.87824 5.9324 6.17928 5.91671 6.47473 5.91596C8.32732 5.90961 10.1799 5.91297 12.0329 5.91297C13.9553 5.91297 15.8781 5.90588 17.8005 5.91596C18.8852 5.92156 19.6614 6.44821 19.9732 7.33155C20.1017 7.69534 20.0629 7.93327 19.6685 8.12674C17.3475 9.26668 15.0508 10.4567 12.7134 11.5611C12.3287 11.743 11.709 11.7397 11.3232 11.5574C8.97087 10.4451 6.65774 9.24988 4.32296 8.09948C3.97634 7.92878 3.9136 7.70468 4.02864 7.38384V7.38421ZM20.0935 15.7821C20.089 17.1977 19.2277 18.0788 17.808 18.0825C13.9467 18.0926 10.085 18.0923 6.22373 18.0825C4.83466 18.0792 3.94572 17.2534 3.92032 15.9031C3.88708 14.1223 3.90986 12.3399 3.91397 10.5586C3.91397 10.4279 3.95879 10.2972 3.99502 10.0966C4.23406 10.2019 4.42268 10.2759 4.60346 10.3659C6.91658 11.52 9.23195 12.6708 11.5376 13.8395C11.8685 14.0072 12.1311 14.0083 12.4624 13.8403C14.7677 12.6716 17.0827 11.5212 19.3954 10.367C19.5777 10.2763 19.7671 10.1993 20.058 10.069C20.0741 10.3752 20.0924 10.5635 20.0928 10.7514C20.095 12.428 20.098 14.1051 20.0928 15.7817L20.0935 15.7821Z",
    fill: "white"
  }));
}

// app/components/Icons/GithubIcon.tsx
init_react();
function GithubIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    className: props.className,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "#F8FAFC"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M21 12.0523C20.9915 12.1541 20.982 12.2565 20.9741 12.3588C20.8837 13.6147 20.5087 14.8358 19.8759 15.935C19.1892 17.1392 18.2177 18.1681 17.0412 18.9371C16.376 19.3775 15.6509 19.7259 14.8867 19.9725C14.6521 20.0485 14.4508 19.9604 14.2906 19.7886C14.1508 19.642 14.0747 19.4487 14.0779 19.249C14.0779 18.3672 14.0779 17.4853 14.0779 16.6031C14.0863 16.3681 14.0628 16.1329 14.008 15.9038C13.9792 15.7993 13.9324 15.6997 13.8918 15.5924C14.0311 15.5634 14.1766 15.5377 14.3216 15.5032C15.1958 15.3068 16.0136 14.9915 16.7231 14.4432C17.5308 13.8177 18.0294 13.0111 18.176 12.0157C18.3187 11.0531 18.2037 10.1195 17.7728 9.233C17.6063 8.89501 17.3874 8.58384 17.1236 8.31036L17.0903 8.2737C17.3809 7.63017 17.4174 6.90541 17.193 6.23744C17.1338 6.05812 17.0463 5.88882 16.9335 5.73562C16.9232 5.71873 16.9081 5.70507 16.89 5.69624C16.8719 5.68742 16.8516 5.6838 16.8314 5.68583C16.1357 5.70242 15.4598 5.91436 14.8856 6.29599C14.6578 6.44107 14.4484 6.61171 14.2618 6.80437C14.253 6.8169 14.2399 6.82597 14.2248 6.82998C14.2097 6.83399 14.1936 6.83267 14.1795 6.82626C13.6814 6.65717 13.1643 6.58603 12.6409 6.54936C12.1713 6.51543 11.6997 6.51927 11.2308 6.56085C10.7502 6.59484 10.2762 6.68958 9.82082 6.84268C9.80583 6.84985 9.78867 6.85153 9.77251 6.84741C9.75634 6.84328 9.74225 6.83364 9.73283 6.82024C9.20278 6.26705 8.50548 5.89131 7.74132 5.74712C7.55238 5.711 7.35723 5.70771 7.16491 5.68801C7.14583 5.6851 7.1263 5.68795 7.10894 5.69617C7.09159 5.7044 7.07726 5.71759 7.0679 5.73398C6.87448 6.00312 6.75032 6.3133 6.70581 6.63856C6.63122 7.07823 6.66761 7.52889 6.81184 7.95192C6.85301 8.06958 6.91505 8.18012 6.97145 8.3027C6.90772 8.37329 6.83158 8.45374 6.75939 8.53746C6.25302 9.13009 5.92997 9.84975 5.82765 10.6131C5.72834 11.2252 5.75886 11.8505 5.91733 12.4507C6.1621 13.3378 6.6872 14.0377 7.44973 14.5713C8.04589 14.9899 8.71085 15.2624 9.41924 15.4408C9.65331 15.4999 9.88963 15.5503 10.1231 15.6012C10.0859 15.7046 10.0408 15.8086 10.0103 15.9175C9.94909 16.1717 9.92142 16.4324 9.92798 16.6934C9.93155 16.7171 9.92539 16.7411 9.91082 16.7604C9.89625 16.7796 9.87445 16.7925 9.85015 16.7963C9.51067 16.9011 9.15221 16.935 8.79827 16.8959C8.46398 16.8686 8.14004 16.7699 7.84961 16.607C7.58186 16.4549 7.35663 16.2415 7.19367 15.9853C6.92069 15.5618 6.54507 15.269 6.03915 15.1481C5.87828 15.104 5.70835 15.1016 5.54621 15.1409C5.51726 15.1481 5.48911 15.158 5.46217 15.1705C5.38152 15.2104 5.35557 15.2756 5.40577 15.3472C5.45449 15.4143 5.5113 15.4755 5.57497 15.5295C5.70582 15.6389 5.85359 15.7374 5.97429 15.8578C6.24219 16.126 6.4255 16.4505 6.5727 16.793C6.79548 17.3091 7.18352 17.6686 7.68661 17.9209C8.20945 18.1819 8.77007 18.2443 9.34762 18.1945C9.53769 18.1775 9.72663 18.1453 9.91896 18.1201C9.91896 18.1305 9.92234 18.1458 9.92234 18.1606C9.92234 18.5321 9.92572 18.9037 9.92234 19.2753C9.92243 19.3969 9.89197 19.5168 9.8336 19.6244C9.77522 19.7321 9.69069 19.8243 9.58732 19.8931C9.51652 19.946 9.4329 19.9803 9.34451 19.9927C9.25611 20.0052 9.1659 19.9954 9.08253 19.9643C6.95171 19.2321 5.31609 17.9187 4.17567 16.0242C3.63235 15.1126 3.27001 14.1103 3.10744 13.0691C2.81135 11.2274 3.13103 9.3421 4.01965 7.68951C4.90826 6.03693 6.31908 4.70396 8.04532 3.88597C8.87822 3.48473 9.7727 3.21731 10.6939 3.09412C10.9951 3.05418 11.2991 3.0394 11.602 3.00985C11.6251 3.00985 11.6471 3.00328 11.6702 3H12.3346C12.3572 3.00328 12.3792 3.00766 12.4023 3.00985C12.6685 3.03283 12.9353 3.04761 13.2003 3.0799C14.0888 3.18707 14.9544 3.42898 15.7655 3.79677C17.2635 4.46177 18.5425 5.5162 19.4608 6.84323C20.3464 8.10221 20.8692 9.56789 20.9752 11.0887C20.9831 11.1905 20.9914 11.2926 21 11.3951V12.0523Z",
    fill: "#4338CA"
  }));
}

// app/components/Home/HomeFooter.tsx
function HomeFooter({ maxWidth = "1150px" }) {
  return /* @__PURE__ */ React.createElement("footer", {
    className: "flex flex-col items-center w-full px-4 py-6 bg-black md:py-10"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between w-full border-t-[1px] pt-9 border-slate-800",
    style: { maxWidth }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-grow items-start"
  }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement("ol", {
    className: "flex ml-2"
  }, /* @__PURE__ */ React.createElement("li", {
    className: "mr-2 hover:cursor-pointer text-white/70 hover:text-white transition"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/privacy"
  }, "Privacy")), /* @__PURE__ */ React.createElement("li", {
    className: "hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/triggerdotdev/jsonhero-web",
    target: "_blank"
  }, /* @__PURE__ */ React.createElement(GithubIcon, null))), /* @__PURE__ */ React.createElement("li", {
    className: "ml-2 hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "mailto:hello@jsonhero.io"
  }, /* @__PURE__ */ React.createElement(EmailIcon, null))), /* @__PURE__ */ React.createElement("li", {
    className: "ml-2 hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://discord.gg/JtBAxBr2m3",
    target: "_blank"
  }, /* @__PURE__ */ React.createElement(DiscordIcon, null))), /* @__PURE__ */ React.createElement("li", {
    className: "ml-2 hover:cursor-pointer"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://twitter.com/triggerdotdev",
    target: "_blank"
  }, /* @__PURE__ */ React.createElement(TwitterIcon, null))))));
}

// app/routes/index.tsx
var import_toast = __toESM(require_toast());

// app/components/UI/ToastPopover.tsx
init_react();

// node_modules/@radix-ui/react-toast/dist/index.module.js
init_react();
var import_react20 = __toESM(require_react());
var import_react_dom5 = __toESM(require_react_dom());

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/primitive/dist/index.module.js
init_react();
function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented)
      return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
  };
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-compose-refs/dist/index.module.js
init_react();
var import_react4 = __toESM(require_react());
function $6ed0406888f73fc4$var$setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== void 0)
    ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
  return (node) => refs.forEach((ref) => $6ed0406888f73fc4$var$setRef(ref, node));
}
function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
  return (0, import_react4.useCallback)($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-collection/dist/index.module.js
init_react();
var import_react7 = __toESM(require_react());

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-context/dist/index.module.js
init_react();
var import_react5 = __toESM(require_react());
function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
    const BaseContext = /* @__PURE__ */ (0, import_react5.createContext)(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [
      ...defaultContexts,
      defaultContext
    ];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
      const value = (0, import_react5.useMemo)(() => context, Object.values(context));
      return /* @__PURE__ */ (0, import_react5.createElement)(Context.Provider, {
        value
      }, children);
    }
    function useContext(consumerName, scope) {
      const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
      const context = (0, import_react5.useContext)(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + "Provider";
    return [
      Provider,
      useContext
    ];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return /* @__PURE__ */ (0, import_react5.createContext)(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
      return (0, import_react5.useMemo)(() => ({
        [`__scope${scopeName}`]: {
          ...scope,
          [scopeName]: contexts
        }
      }), [
        scope,
        contexts
      ]);
    };
  };
  createScope.scopeName = scopeName;
  return [
    $c512c27ab02ef895$export$fd42f52fd3ae1109,
    $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
  ];
}
function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope1 = () => {
    const scopeHooks = scopes.map((createScope) => ({
      useScope: createScope(),
      scopeName: createScope.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return {
          ...nextScopes,
          ...currentScope
        };
      }, {});
      return (0, import_react5.useMemo)(() => ({
        [`__scope${baseScope.scopeName}`]: nextScopes1
      }), [
        nextScopes1
      ]);
    };
  };
  createScope1.scopeName = baseScope.scopeName;
  return createScope1;
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-slot/dist/index.module.js
init_react();
var import_react6 = __toESM(require_react());
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = /* @__PURE__ */ (0, import_react6.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = import_react6.Children.toArray(children);
  const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (import_react6.Children.count(newElement) > 1)
          return import_react6.Children.only(null);
        return /* @__PURE__ */ (0, import_react6.isValidElement)(newElement) ? newElement.props.children : null;
      } else
        return child;
    });
    return /* @__PURE__ */ (0, import_react6.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
      ref: forwardedRef
    }), /* @__PURE__ */ (0, import_react6.isValidElement)(newElement) ? /* @__PURE__ */ (0, import_react6.cloneElement)(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ (0, import_react6.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
    ref: forwardedRef
  }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = /* @__PURE__ */ (0, import_react6.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (/* @__PURE__ */ (0, import_react6.isValidElement)(children))
    return /* @__PURE__ */ (0, import_react6.cloneElement)(children, {
      ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
      ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref)
    });
  return import_react6.Children.count(children) > 1 ? import_react6.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children }) => {
  return /* @__PURE__ */ (0, import_react6.createElement)(import_react6.Fragment, null, children);
};
function $5e63c961fc1ce211$var$isSlottable(child) {
  return /* @__PURE__ */ (0, import_react6.isValidElement)(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
  const overrideProps = {
    ...childProps
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler)
      overrideProps[propName] = (...args) => {
        childPropValue === null || childPropValue === void 0 || childPropValue(...args);
        slotPropValue === null || slotPropValue === void 0 || slotPropValue(...args);
      };
    else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue
      };
    else if (propName === "className")
      overrideProps[propName] = [
        slotPropValue,
        childPropValue
      ].filter(Boolean).join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-collection/dist/index.module.js
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  });
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = import_react7.default.useRef(null);
    const itemMap = import_react7.default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ import_react7.default.createElement(CollectionProviderImpl, {
      scope,
      itemMap,
      collectionRef: ref
    }, children);
  };
  /* @__PURE__ */ Object.assign(CollectionProvider, {
    displayName: PROVIDER_NAME
  });
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlot = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ import_react7.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionSlot, {
    displayName: COLLECTION_SLOT_NAME
  });
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlot = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = import_react7.default.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    import_react7.default.useEffect(() => {
      context.itemMap.set(ref, {
        ref,
        ...itemData
      });
      return () => void context.itemMap.delete(ref);
    });
    return /* @__PURE__ */ import_react7.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      [ITEM_DATA_ATTR]: "",
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionItemSlot, {
    displayName: ITEM_SLOT_NAME
  });
  function useCollection(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = import_react7.default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
      return orderedItems;
    }, [
      context.collectionRef,
      context.itemMap
    ]);
    return getItems;
  }
  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    },
    useCollection,
    createCollectionScope
  ];
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
init_react();
var import_react11 = __toESM(require_react());

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-primitive/dist/index.module.js
init_react();
var import_react8 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var $8927f6f2acc4f386$var$NODES = [
  "a",
  "button",
  "div",
  "h2",
  "h3",
  "img",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node) => {
  const Node = /* @__PURE__ */ (0, import_react8.forwardRef)((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
    (0, import_react8.useEffect)(() => {
      window[Symbol.for("radix-ui")] = true;
    }, []);
    return /* @__PURE__ */ (0, import_react8.createElement)(Comp, _extends({}, primitiveProps, {
      ref: forwardedRef
    }));
  });
  Node.displayName = `Primitive.${node}`;
  return {
    ...primitive,
    [node]: Node
  };
}, {});
function $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event) {
  if (target)
    (0, import_react_dom.flushSync)(() => target.dispatchEvent(event));
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js
init_react();
var import_react9 = __toESM(require_react());
function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
  const callbackRef = (0, import_react9.useRef)(callback);
  (0, import_react9.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react9.useMemo)(() => (...args) => {
    var _callbackRef$current;
    return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
  }, []);
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-use-escape-keydown/dist/index.module.js
init_react();
var import_react10 = __toESM(require_react());
function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp) {
  const onEscapeKeyDown = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEscapeKeyDownProp);
  (0, import_react10.useEffect)(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape")
        onEscapeKeyDown(event);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    onEscapeKeyDown
  ]);
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-dismissable-layer/dist/index.module.js
var $5cb92bef7577960e$var$CONTEXT_UPDATE = "dismissableLayer.update";
var $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var $5cb92bef7577960e$var$FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var $5cb92bef7577960e$var$originalBodyPointerEvents;
var $5cb92bef7577960e$var$DismissableLayerContext = /* @__PURE__ */ (0, import_react11.createContext)({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var $5cb92bef7577960e$export$177fb62ff3ec1f22 = /* @__PURE__ */ (0, import_react11.forwardRef)((props, forwardedRef) => {
  const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
  const context = (0, import_react11.useContext)($5cb92bef7577960e$var$DismissableLayerContext);
  const [node1, setNode] = (0, import_react11.useState)(null);
  const [, force] = (0, import_react11.useState)({});
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node) => setNode(node));
  const layers = Array.from(context.layers);
  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled
  ].slice(-1);
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
  const index = node1 ? layers.indexOf(node1) : -1;
  const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
  const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
  const pointerDownOutside = $5cb92bef7577960e$var$usePointerDownOutside((event) => {
    const target = event.target;
    const isPointerDownOnBranch = [
      ...context.branches
    ].some((branch) => branch.contains(target));
    if (!isPointerEventsEnabled || isPointerDownOnBranch)
      return;
    onPointerDownOutside === null || onPointerDownOutside === void 0 || onPointerDownOutside(event);
    onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
    if (!event.defaultPrevented)
      onDismiss === null || onDismiss === void 0 || onDismiss();
  });
  const focusOutside = $5cb92bef7577960e$var$useFocusOutside((event) => {
    const target = event.target;
    const isFocusInBranch = [
      ...context.branches
    ].some((branch) => branch.contains(target));
    if (isFocusInBranch)
      return;
    onFocusOutside === null || onFocusOutside === void 0 || onFocusOutside(event);
    onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
    if (!event.defaultPrevented)
      onDismiss === null || onDismiss === void 0 || onDismiss();
  });
  $addc16e1bbe58fd0$export$3a72a57244d6e765((event) => {
    const isHighestLayer = index === context.layers.size - 1;
    if (!isHighestLayer)
      return;
    onEscapeKeyDown === null || onEscapeKeyDown === void 0 || onEscapeKeyDown(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  });
  (0, import_react11.useEffect)(() => {
    if (!node1)
      return;
    if (disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        $5cb92bef7577960e$var$originalBodyPointerEvents = document.body.style.pointerEvents;
        document.body.style.pointerEvents = "none";
      }
      context.layersWithOutsidePointerEventsDisabled.add(node1);
    }
    context.layers.add(node1);
    $5cb92bef7577960e$var$dispatchUpdate();
    return () => {
      if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1)
        document.body.style.pointerEvents = $5cb92bef7577960e$var$originalBodyPointerEvents;
    };
  }, [
    node1,
    disableOutsidePointerEvents,
    context
  ]);
  (0, import_react11.useEffect)(() => {
    return () => {
      if (!node1)
        return;
      context.layers.delete(node1);
      context.layersWithOutsidePointerEventsDisabled.delete(node1);
      $5cb92bef7577960e$var$dispatchUpdate();
    };
  }, [
    node1,
    context
  ]);
  (0, import_react11.useEffect)(() => {
    const handleUpdate = () => force({});
    document.addEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
    return () => document.removeEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
  }, []);
  return /* @__PURE__ */ (0, import_react11.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, layerProps, {
    ref: composedRefs,
    style: {
      pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
      ...props.style
    },
    onFocusCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocusCapture, focusOutside.onFocusCapture),
    onBlurCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onBlurCapture, focusOutside.onBlurCapture),
    onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
  }));
});
var $5cb92bef7577960e$export$4d5eb2109db14228 = /* @__PURE__ */ (0, import_react11.forwardRef)((props, forwardedRef) => {
  const context = (0, import_react11.useContext)($5cb92bef7577960e$var$DismissableLayerContext);
  const ref = (0, import_react11.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  (0, import_react11.useEffect)(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [
    context.branches
  ]);
  return /* @__PURE__ */ (0, import_react11.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, props, {
    ref: composedRefs
  }));
});
function $5cb92bef7577960e$var$usePointerDownOutside(onPointerDownOutside) {
  const handlePointerDownOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPointerDownOutside);
  const isPointerInsideReactTreeRef = (0, import_react11.useRef)(false);
  const handleClickRef = (0, import_react11.useRef)(() => {
  });
  (0, import_react11.useEffect)(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent = function() {
          $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
            discrete: true
          });
        };
        const eventDetail = {
          originalEvent: event
        };
        if (event.pointerType === "touch") {
          document.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
          document.addEventListener("click", handleClickRef.current, {
            once: true
          });
        } else
          handleAndDispatchPointerDownOutsideEvent();
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      document.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("click", handleClickRef.current);
    };
  }, [
    handlePointerDownOutside
  ]);
  return {
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function $5cb92bef7577960e$var$useFocusOutside(onFocusOutside) {
  const handleFocusOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onFocusOutside);
  const isFocusInsideReactTreeRef = (0, import_react11.useRef)(false);
  (0, import_react11.useEffect)(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = {
          originalEvent: event
        };
        $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [
    handleFocusOutside
  ]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
  const event = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler)
    target.addEventListener(name, handler, {
      once: true
    });
  if (discrete)
    $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event);
  else
    target.dispatchEvent(event);
}
var $5cb92bef7577960e$export$be92b6f5f03c0fe9 = $5cb92bef7577960e$export$177fb62ff3ec1f22;
var $5cb92bef7577960e$export$aecb2ddcb55c95be = $5cb92bef7577960e$export$4d5eb2109db14228;

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-portal/dist/index.module.js
init_react();
var import_react12 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());
var $f1701beae083dbae$export$602eac185826482c = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  var _globalThis$document;
  const { container = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body, ...portalProps } = props;
  return container ? /* @__PURE__ */ import_react_dom2.default.createPortal(/* @__PURE__ */ (0, import_react12.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, portalProps, {
    ref: forwardedRef
  })), container) : null;
});

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-presence/dist/index.module.js
init_react();
var import_react14 = __toESM(require_react());
var import_react_dom3 = __toESM(require_react_dom());

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js
init_react();
var import_react13 = __toESM(require_react());
var $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? import_react13.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-presence/dist/index.module.js
function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
  return (0, import_react14.useReducer)((state, event) => {
    const nextState = machine[state][event];
    return nextState !== null && nextState !== void 0 ? nextState : state;
  }, initialState);
}
var $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props) => {
  const { present, children } = props;
  const presence = $921a889cee6df7e8$var$usePresence(present);
  const child = typeof children === "function" ? children({
    present: presence.isPresent
  }) : import_react14.Children.only(children);
  const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(presence.ref, child.ref);
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? /* @__PURE__ */ (0, import_react14.cloneElement)(child, {
    ref
  }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = "Presence";
function $921a889cee6df7e8$var$usePresence(present) {
  const [node1, setNode] = (0, import_react14.useState)();
  const stylesRef = (0, import_react14.useRef)({});
  const prevPresentRef = (0, import_react14.useRef)(present);
  const prevAnimationNameRef = (0, import_react14.useRef)("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  (0, import_react14.useEffect)(() => {
    const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [
    state
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles);
      if (present)
        send("MOUNT");
      else if (currentAnimationName === "none" || (styles === null || styles === void 0 ? void 0 : styles.display) === "none")
        send("UNMOUNT");
      else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating)
          send("ANIMATION_OUT");
        else
          send("UNMOUNT");
      }
      prevPresentRef.current = present;
    }
  }, [
    present,
    send
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (node1) {
      const handleAnimationEnd = (event) => {
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node1 && isCurrentAnimation)
          (0, import_react_dom3.flushSync)(() => send("ANIMATION_END"));
      };
      const handleAnimationStart = (event) => {
        if (event.target === node1)
          prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
      };
      node1.addEventListener("animationstart", handleAnimationStart);
      node1.addEventListener("animationcancel", handleAnimationEnd);
      node1.addEventListener("animationend", handleAnimationEnd);
      return () => {
        node1.removeEventListener("animationstart", handleAnimationStart);
        node1.removeEventListener("animationcancel", handleAnimationEnd);
        node1.removeEventListener("animationend", handleAnimationEnd);
      };
    } else
      send("ANIMATION_END");
  }, [
    node1,
    send
  ]);
  return {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(state),
    ref: (0, import_react14.useCallback)((node) => {
      if (node)
        stylesRef.current = getComputedStyle(node);
      setNode(node);
    }, [])
  };
}
function $921a889cee6df7e8$var$getAnimationName(styles) {
  return (styles === null || styles === void 0 ? void 0 : styles.animationName) || "none";
}

// node_modules/@radix-ui/react-toast/node_modules/@radix-ui/react-use-controllable-state/dist/index.module.js
init_react();
var import_react15 = __toESM(require_react());
function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop, defaultProp, onChange = () => {
} }) {
  const [uncontrolledProp, setUncontrolledProp] = $71cd76cc60e0454e$var$useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value1 = isControlled ? prop : uncontrolledProp;
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  const setValue = (0, import_react15.useCallback)((nextValue) => {
    if (isControlled) {
      const setter = nextValue;
      const value = typeof nextValue === "function" ? setter(prop) : nextValue;
      if (value !== prop)
        handleChange(value);
    } else
      setUncontrolledProp(nextValue);
  }, [
    isControlled,
    prop,
    setUncontrolledProp,
    handleChange
  ]);
  return [
    value1,
    setValue
  ];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp, onChange }) {
  const uncontrolledState = (0, import_react15.useState)(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = (0, import_react15.useRef)(value);
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  (0, import_react15.useEffect)(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [
    value,
    prevValueRef,
    handleChange
  ]);
  return uncontrolledState;
}

// node_modules/@radix-ui/react-visually-hidden/dist/index.module.js
init_react();
var import_react19 = __toESM(require_react());

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive/dist/index.module.js
init_react();
var import_react18 = __toESM(require_react());
var import_react_dom4 = __toESM(require_react_dom());

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-slot/dist/index.module.js
init_react();
var import_react17 = __toESM(require_react());

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-compose-refs/dist/index.module.js
init_react();
var import_react16 = __toESM(require_react());
function $6ed0406888f73fc4$var$setRef2(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== void 0)
    ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af2(...refs) {
  return (node) => refs.forEach((ref) => $6ed0406888f73fc4$var$setRef2(ref, node));
}

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-slot/dist/index.module.js
var $5e63c961fc1ce211$export$8c6ed5c666ac13602 = /* @__PURE__ */ (0, import_react17.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = import_react17.Children.toArray(children);
  const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable2);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (import_react17.Children.count(newElement) > 1)
          return import_react17.Children.only(null);
        return /* @__PURE__ */ (0, import_react17.isValidElement)(newElement) ? newElement.props.children : null;
      } else
        return child;
    });
    return /* @__PURE__ */ (0, import_react17.createElement)($5e63c961fc1ce211$var$SlotClone2, _extends({}, slotProps, {
      ref: forwardedRef
    }), /* @__PURE__ */ (0, import_react17.isValidElement)(newElement) ? /* @__PURE__ */ (0, import_react17.cloneElement)(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ (0, import_react17.createElement)($5e63c961fc1ce211$var$SlotClone2, _extends({}, slotProps, {
    ref: forwardedRef
  }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac13602.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone2 = /* @__PURE__ */ (0, import_react17.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (/* @__PURE__ */ (0, import_react17.isValidElement)(children))
    return /* @__PURE__ */ (0, import_react17.cloneElement)(children, {
      ...$5e63c961fc1ce211$var$mergeProps2(slotProps, children.props),
      ref: $6ed0406888f73fc4$export$43e446d32b3d21af2(forwardedRef, children.ref)
    });
  return import_react17.Children.count(children) > 1 ? import_react17.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone2.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d452 = ({ children }) => {
  return /* @__PURE__ */ (0, import_react17.createElement)(import_react17.Fragment, null, children);
};
function $5e63c961fc1ce211$var$isSlottable2(child) {
  return /* @__PURE__ */ (0, import_react17.isValidElement)(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d452;
}
function $5e63c961fc1ce211$var$mergeProps2(slotProps, childProps) {
  const overrideProps = {
    ...childProps
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler)
      overrideProps[propName] = (...args) => {
        childPropValue === null || childPropValue === void 0 || childPropValue(...args);
        slotPropValue === null || slotPropValue === void 0 || slotPropValue(...args);
      };
    else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue
      };
    else if (propName === "className")
      overrideProps[propName] = [
        slotPropValue,
        childPropValue
      ].filter(Boolean).join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive/dist/index.module.js
var $8927f6f2acc4f386$var$NODES2 = [
  "a",
  "button",
  "div",
  "h2",
  "h3",
  "img",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var $8927f6f2acc4f386$export$250ffa63cdc0d0342 = $8927f6f2acc4f386$var$NODES2.reduce((primitive, node) => {
  const Node = /* @__PURE__ */ (0, import_react18.forwardRef)((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac13602 : node;
    (0, import_react18.useEffect)(() => {
      window[Symbol.for("radix-ui")] = true;
    }, []);
    return /* @__PURE__ */ (0, import_react18.createElement)(Comp, _extends({}, primitiveProps, {
      ref: forwardedRef
    }));
  });
  Node.displayName = `Primitive.${node}`;
  return {
    ...primitive,
    [node]: Node
  };
}, {});

// node_modules/@radix-ui/react-visually-hidden/dist/index.module.js
var $ea1ef594cf570d83$export$439d29a4e110a164 = /* @__PURE__ */ (0, import_react19.forwardRef)((props, forwardedRef) => {
  return /* @__PURE__ */ (0, import_react19.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d0342.span, _extends({}, props, {
    ref: forwardedRef,
    style: {
      position: "absolute",
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      wordWrap: "normal",
      ...props.style
    }
  }));
});

// node_modules/@radix-ui/react-toast/dist/index.module.js
var $054eb8030ebde76e$var$PROVIDER_NAME = "ToastProvider";
var [$054eb8030ebde76e$var$Collection, $054eb8030ebde76e$var$useCollection, $054eb8030ebde76e$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2("Toast");
var [$054eb8030ebde76e$var$createToastContext, $054eb8030ebde76e$export$8a359da18fbc9073] = $c512c27ab02ef895$export$50c7b4e9d9f19c1("Toast", [
  $054eb8030ebde76e$var$createCollectionScope
]);
var [$054eb8030ebde76e$var$ToastProviderProvider, $054eb8030ebde76e$var$useToastProviderContext] = $054eb8030ebde76e$var$createToastContext($054eb8030ebde76e$var$PROVIDER_NAME);
var $054eb8030ebde76e$export$f5d03d415824e0e = (props) => {
  const { __scopeToast, label = "Notification", duration = 5e3, swipeDirection = "right", swipeThreshold = 50, children } = props;
  const [viewport, setViewport] = (0, import_react20.useState)(null);
  const [toastCount, setToastCount] = (0, import_react20.useState)(0);
  const isFocusedToastEscapeKeyDownRef = (0, import_react20.useRef)(false);
  const isClosePausedRef = (0, import_react20.useRef)(false);
  return /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$Collection.Provider, {
    scope: __scopeToast
  }, /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$ToastProviderProvider, {
    scope: __scopeToast,
    label,
    duration,
    swipeDirection,
    swipeThreshold,
    toastCount,
    viewport,
    onViewportChange: setViewport,
    onToastAdd: (0, import_react20.useCallback)(() => setToastCount((prevCount) => prevCount + 1), []),
    onToastRemove: (0, import_react20.useCallback)(() => setToastCount((prevCount) => prevCount - 1), []),
    isFocusedToastEscapeKeyDownRef,
    isClosePausedRef
  }, children));
};
$054eb8030ebde76e$export$f5d03d415824e0e.propTypes = {
  label(props) {
    if (props.label && typeof props.label === "string" && !props.label.trim()) {
      const error = `Invalid prop \`label\` supplied to \`${$054eb8030ebde76e$var$PROVIDER_NAME}\`. Expected non-empty \`string\`.`;
      return new Error(error);
    }
    return null;
  }
};
var $054eb8030ebde76e$var$VIEWPORT_NAME = "ToastViewport";
var $054eb8030ebde76e$var$VIEWPORT_DEFAULT_HOTKEY = [
  "F8"
];
var $054eb8030ebde76e$var$VIEWPORT_PAUSE = "toast.viewportPause";
var $054eb8030ebde76e$var$VIEWPORT_RESUME = "toast.viewportResume";
var $054eb8030ebde76e$export$6192c2425ecfd989 = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { __scopeToast, hotkey = $054eb8030ebde76e$var$VIEWPORT_DEFAULT_HOTKEY, label = "Notifications ({hotkey})", ...viewportProps } = props;
  const context = $054eb8030ebde76e$var$useToastProviderContext($054eb8030ebde76e$var$VIEWPORT_NAME, __scopeToast);
  const getItems = $054eb8030ebde76e$var$useCollection(__scopeToast);
  const wrapperRef = (0, import_react20.useRef)(null);
  const headFocusProxyRef = (0, import_react20.useRef)(null);
  const tailFocusProxyRef = (0, import_react20.useRef)(null);
  const ref = (0, import_react20.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref, context.onViewportChange);
  const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  const hasToasts = context.toastCount > 0;
  (0, import_react20.useEffect)(() => {
    const handleKeyDown = (event) => {
      var _ref$current;
      const isHotkeyPressed = hotkey.every((key) => event[key] || event.code === key);
      if (isHotkeyPressed)
        (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    hotkey
  ]);
  (0, import_react20.useEffect)(() => {
    const wrapper = wrapperRef.current;
    const viewport = ref.current;
    if (wrapper && viewport) {
      const handlePause = () => {
        const pauseEvent = new CustomEvent($054eb8030ebde76e$var$VIEWPORT_PAUSE);
        viewport.dispatchEvent(pauseEvent);
        context.isClosePausedRef.current = true;
      };
      const handleResume = () => {
        const resumeEvent = new CustomEvent($054eb8030ebde76e$var$VIEWPORT_RESUME);
        viewport.dispatchEvent(resumeEvent);
        context.isClosePausedRef.current = false;
      };
      wrapper.addEventListener("focusin", handlePause);
      wrapper.addEventListener("focusout", handleResume);
      wrapper.addEventListener("pointerenter", handlePause);
      wrapper.addEventListener("pointerleave", handleResume);
      window.addEventListener("blur", handlePause);
      window.addEventListener("focus", handleResume);
      return () => {
        wrapper.removeEventListener("focusin", handlePause);
        wrapper.removeEventListener("focusout", handleResume);
        wrapper.removeEventListener("pointerenter", handlePause);
        wrapper.removeEventListener("pointerleave", handleResume);
        window.removeEventListener("blur", handlePause);
        window.removeEventListener("focus", handleResume);
      };
    }
  }, [
    context.isClosePausedRef
  ]);
  const getSortedTabbableCandidates = (0, import_react20.useCallback)(({ tabbingDirection }) => {
    const toastItems = getItems();
    const tabbableCandidates = toastItems.map((toastItem) => {
      const toastNode = toastItem.ref.current;
      const toastTabbableCandidates = [
        toastNode,
        ...$054eb8030ebde76e$var$getTabbableCandidates(toastNode)
      ];
      return tabbingDirection === "forwards" ? toastTabbableCandidates : toastTabbableCandidates.reverse();
    });
    return (tabbingDirection === "forwards" ? tabbableCandidates.reverse() : tabbableCandidates).flat();
  }, [
    getItems
  ]);
  (0, import_react20.useEffect)(() => {
    const viewport = ref.current;
    if (viewport) {
      const handleKeyDown = (event) => {
        const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
        const isTabKey = event.key === "Tab" && !isMetaKey;
        if (isTabKey) {
          const focusedElement = document.activeElement;
          const isTabbingBackwards = event.shiftKey;
          const targetIsViewport = event.target === viewport;
          if (targetIsViewport && isTabbingBackwards) {
            var _headFocusProxyRef$cu;
            (_headFocusProxyRef$cu = headFocusProxyRef.current) === null || _headFocusProxyRef$cu === void 0 || _headFocusProxyRef$cu.focus();
            return;
          }
          const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
          const sortedCandidates = getSortedTabbableCandidates({
            tabbingDirection
          });
          const index = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
          if ($054eb8030ebde76e$var$focusFirst(sortedCandidates.slice(index + 1)))
            event.preventDefault();
          else {
            var _headFocusProxyRef$cu2, _tailFocusProxyRef$cu;
            isTabbingBackwards ? (_headFocusProxyRef$cu2 = headFocusProxyRef.current) === null || _headFocusProxyRef$cu2 === void 0 || _headFocusProxyRef$cu2.focus() : (_tailFocusProxyRef$cu = tailFocusProxyRef.current) === null || _tailFocusProxyRef$cu === void 0 || _tailFocusProxyRef$cu.focus();
          }
        }
      };
      viewport.addEventListener("keydown", handleKeyDown);
      return () => viewport.removeEventListener("keydown", handleKeyDown);
    }
  }, [
    getItems,
    getSortedTabbableCandidates
  ]);
  return /* @__PURE__ */ (0, import_react20.createElement)($5cb92bef7577960e$export$aecb2ddcb55c95be, {
    ref: wrapperRef,
    role: "region",
    "aria-label": label.replace("{hotkey}", hotkeyLabel),
    tabIndex: -1,
    style: {
      pointerEvents: hasToasts ? void 0 : "none"
    }
  }, hasToasts && /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$FocusProxy, {
    ref: headFocusProxyRef,
    onFocusFromOutsideViewport: () => {
      const tabbableCandidates = getSortedTabbableCandidates({
        tabbingDirection: "forwards"
      });
      $054eb8030ebde76e$var$focusFirst(tabbableCandidates);
    }
  }), /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$Collection.Slot, {
    scope: __scopeToast
  }, /* @__PURE__ */ (0, import_react20.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.ol, _extends({
    tabIndex: -1
  }, viewportProps, {
    ref: composedRefs
  }))), hasToasts && /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$FocusProxy, {
    ref: tailFocusProxyRef,
    onFocusFromOutsideViewport: () => {
      const tabbableCandidates = getSortedTabbableCandidates({
        tabbingDirection: "backwards"
      });
      $054eb8030ebde76e$var$focusFirst(tabbableCandidates);
    }
  }));
});
var $054eb8030ebde76e$var$FOCUS_PROXY_NAME = "ToastFocusProxy";
var $054eb8030ebde76e$var$FocusProxy = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { __scopeToast, onFocusFromOutsideViewport, ...proxyProps } = props;
  const context = $054eb8030ebde76e$var$useToastProviderContext($054eb8030ebde76e$var$FOCUS_PROXY_NAME, __scopeToast);
  return /* @__PURE__ */ (0, import_react20.createElement)($ea1ef594cf570d83$export$439d29a4e110a164, _extends({
    "aria-hidden": true,
    tabIndex: 0
  }, proxyProps, {
    ref: forwardedRef,
    style: {
      position: "fixed"
    },
    onFocus: (event) => {
      var _context$viewport;
      const prevFocusedElement = event.relatedTarget;
      const isFocusFromOutsideViewport = !((_context$viewport = context.viewport) !== null && _context$viewport !== void 0 && _context$viewport.contains(prevFocusedElement));
      if (isFocusFromOutsideViewport)
        onFocusFromOutsideViewport();
    }
  }));
});
var $054eb8030ebde76e$var$TOAST_NAME = "Toast";
var $054eb8030ebde76e$var$TOAST_SWIPE_START = "toast.swipeStart";
var $054eb8030ebde76e$var$TOAST_SWIPE_MOVE = "toast.swipeMove";
var $054eb8030ebde76e$var$TOAST_SWIPE_CANCEL = "toast.swipeCancel";
var $054eb8030ebde76e$var$TOAST_SWIPE_END = "toast.swipeEnd";
var $054eb8030ebde76e$export$8d8dc7d5f743331b = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { forceMount, open: openProp, defaultOpen, onOpenChange, ...toastProps } = props;
  const [open = true, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange
  });
  return /* @__PURE__ */ (0, import_react20.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || open
  }, /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$ToastImpl, _extends({
    open
  }, toastProps, {
    ref: forwardedRef,
    onClose: () => setOpen(false),
    onSwipeStart: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onSwipeStart, (event) => {
      event.currentTarget.setAttribute("data-swipe", "start");
    }),
    onSwipeMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onSwipeMove, (event) => {
      const { x, y } = event.detail.delta;
      event.currentTarget.setAttribute("data-swipe", "move");
      event.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${x}px`);
      event.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${y}px`);
    }),
    onSwipeCancel: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onSwipeCancel, (event) => {
      event.currentTarget.setAttribute("data-swipe", "cancel");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-move-x");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-move-y");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-end-x");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
    }),
    onSwipeEnd: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onSwipeEnd, (event) => {
      const { x, y } = event.detail.delta;
      event.currentTarget.setAttribute("data-swipe", "end");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-move-x");
      event.currentTarget.style.removeProperty("--radix-toast-swipe-move-y");
      event.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${x}px`);
      event.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${y}px`);
      setOpen(false);
    })
  })));
});
var [$054eb8030ebde76e$var$ToastInteractiveProvider, $054eb8030ebde76e$var$useToastInteractiveContext] = $054eb8030ebde76e$var$createToastContext($054eb8030ebde76e$var$TOAST_NAME, {
  isInteractive: false,
  onClose() {
  }
});
var $054eb8030ebde76e$var$ToastImpl = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { __scopeToast, type = "foreground", duration: durationProp, open, onClose, onEscapeKeyDown, onSwipeStart, onSwipeMove, onSwipeCancel, onSwipeEnd, ...toastProps } = props;
  const context = $054eb8030ebde76e$var$useToastProviderContext($054eb8030ebde76e$var$TOAST_NAME, __scopeToast);
  const ref = (0, import_react20.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const pointerStartRef = (0, import_react20.useRef)(null);
  const swipeDeltaRef = (0, import_react20.useRef)(null);
  const duration1 = durationProp || context.duration;
  const closeTimerStartTimeRef = (0, import_react20.useRef)(0);
  const closeTimerRemainingTimeRef = (0, import_react20.useRef)(duration1);
  const closeTimerRef = (0, import_react20.useRef)(0);
  const { onToastAdd, onToastRemove } = context;
  const handleClose = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(() => {
    var _ref$current2, _context$viewport2;
    const isFocusInToast = (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.contains(document.activeElement);
    if (isFocusInToast)
      (_context$viewport2 = context.viewport) === null || _context$viewport2 === void 0 || _context$viewport2.focus();
    onClose();
  });
  const startTimer = (0, import_react20.useCallback)((duration) => {
    if (!duration || duration === Infinity)
      return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerStartTimeRef.current = new Date().getTime();
    closeTimerRef.current = window.setTimeout(handleClose, duration);
  }, [
    handleClose
  ]);
  (0, import_react20.useEffect)(() => {
    const viewport = context.viewport;
    if (viewport) {
      const handleResume = () => {
        startTimer(closeTimerRemainingTimeRef.current);
      };
      const handlePause = () => {
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;
        closeTimerRemainingTimeRef.current = closeTimerRemainingTimeRef.current - elapsedTime;
        window.clearTimeout(closeTimerRef.current);
      };
      viewport.addEventListener($054eb8030ebde76e$var$VIEWPORT_PAUSE, handlePause);
      viewport.addEventListener($054eb8030ebde76e$var$VIEWPORT_RESUME, handleResume);
      return () => {
        viewport.removeEventListener($054eb8030ebde76e$var$VIEWPORT_PAUSE, handlePause);
        viewport.removeEventListener($054eb8030ebde76e$var$VIEWPORT_RESUME, handleResume);
      };
    }
  }, [
    context.viewport,
    duration1,
    startTimer
  ]);
  (0, import_react20.useEffect)(() => {
    if (open && !context.isClosePausedRef.current)
      startTimer(duration1);
  }, [
    open,
    duration1,
    context.isClosePausedRef,
    startTimer
  ]);
  (0, import_react20.useEffect)(() => {
    onToastAdd();
    return () => onToastRemove();
  }, [
    onToastAdd,
    onToastRemove
  ]);
  if (!context.viewport)
    return null;
  return /* @__PURE__ */ (0, import_react20.createElement)(import_react20.Fragment, null, /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$ToastAnnounce, {
    __scopeToast,
    role: "status",
    "aria-live": type === "foreground" ? "assertive" : "polite",
    "aria-atomic": true
  }, props.children), /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$ToastInteractiveProvider, {
    scope: __scopeToast,
    isInteractive: true,
    onClose: handleClose
  }, /* @__PURE__ */ (0, import_react_dom5.createPortal)(/* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$var$Collection.ItemSlot, {
    scope: __scopeToast
  }, /* @__PURE__ */ (0, import_react20.createElement)($5cb92bef7577960e$export$be92b6f5f03c0fe9, {
    asChild: true,
    onEscapeKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(onEscapeKeyDown, () => {
      if (!context.isFocusedToastEscapeKeyDownRef.current)
        handleClose();
      context.isFocusedToastEscapeKeyDownRef.current = false;
    })
  }, /* @__PURE__ */ (0, import_react20.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.li, _extends({
    tabIndex: 0,
    "data-state": open ? "open" : "closed",
    "data-swipe-direction": context.swipeDirection
  }, toastProps, {
    ref: composedRefs,
    style: {
      userSelect: "none",
      touchAction: "none",
      ...props.style
    },
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      if (event.key !== "Escape")
        return;
      onEscapeKeyDown === null || onEscapeKeyDown === void 0 || onEscapeKeyDown(event.nativeEvent);
      if (!event.nativeEvent.defaultPrevented) {
        context.isFocusedToastEscapeKeyDownRef.current = true;
        handleClose();
      }
    }),
    onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDown, (event) => {
      if (event.button !== 0)
        return;
      pointerStartRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    }),
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerMove, (event) => {
      if (!pointerStartRef.current)
        return;
      const x = event.clientX - pointerStartRef.current.x;
      const y = event.clientY - pointerStartRef.current.y;
      const hasSwipeMoveStarted = Boolean(swipeDeltaRef.current);
      const isHorizontalSwipe = [
        "left",
        "right"
      ].includes(context.swipeDirection);
      const clamp = [
        "left",
        "up"
      ].includes(context.swipeDirection) ? Math.min : Math.max;
      const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
      const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
      const moveStartBuffer = event.pointerType === "touch" ? 10 : 2;
      const delta = {
        x: clampedX,
        y: clampedY
      };
      const eventDetail = {
        originalEvent: event,
        delta
      };
      if (hasSwipeMoveStarted) {
        swipeDeltaRef.current = delta;
        $054eb8030ebde76e$var$handleAndDispatchCustomEvent($054eb8030ebde76e$var$TOAST_SWIPE_MOVE, onSwipeMove, eventDetail, {
          discrete: false
        });
      } else if ($054eb8030ebde76e$var$isDeltaInDirection(delta, context.swipeDirection, moveStartBuffer)) {
        swipeDeltaRef.current = delta;
        $054eb8030ebde76e$var$handleAndDispatchCustomEvent($054eb8030ebde76e$var$TOAST_SWIPE_START, onSwipeStart, eventDetail, {
          discrete: false
        });
        event.target.setPointerCapture(event.pointerId);
      } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer)
        pointerStartRef.current = null;
    }),
    onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerUp, (event1) => {
      const delta = swipeDeltaRef.current;
      event1.target.releasePointerCapture(event1.pointerId);
      swipeDeltaRef.current = null;
      pointerStartRef.current = null;
      if (delta) {
        const toast = event1.currentTarget;
        const eventDetail = {
          originalEvent: event1,
          delta
        };
        if ($054eb8030ebde76e$var$isDeltaInDirection(delta, context.swipeDirection, context.swipeThreshold))
          $054eb8030ebde76e$var$handleAndDispatchCustomEvent($054eb8030ebde76e$var$TOAST_SWIPE_END, onSwipeEnd, eventDetail, {
            discrete: true
          });
        else
          $054eb8030ebde76e$var$handleAndDispatchCustomEvent($054eb8030ebde76e$var$TOAST_SWIPE_CANCEL, onSwipeCancel, eventDetail, {
            discrete: true
          });
        toast.addEventListener("click", (event) => event.preventDefault(), {
          once: true
        });
      }
    })
  })))), context.viewport)));
});
$054eb8030ebde76e$var$ToastImpl.propTypes = {
  type(props) {
    if (props.type && ![
      "foreground",
      "background"
    ].includes(props.type)) {
      const error = `Invalid prop \`type\` supplied to \`${$054eb8030ebde76e$var$TOAST_NAME}\`. Expected \`foreground | background\`.`;
      return new Error(error);
    }
    return null;
  }
};
var $054eb8030ebde76e$var$ToastAnnounce = (props) => {
  const { __scopeToast, children, ...announceProps } = props;
  const context = $054eb8030ebde76e$var$useToastProviderContext($054eb8030ebde76e$var$TOAST_NAME, __scopeToast);
  const [renderAnnounceText, setRenderAnnounceText] = (0, import_react20.useState)(false);
  const [isAnnounced, setIsAnnounced] = (0, import_react20.useState)(false);
  const [fragment, setFragment] = (0, import_react20.useState)();
  const [rootFragmentNode, setRootFragmentNode] = (0, import_react20.useState)(null);
  const announceTextContent = (0, import_react20.useMemo)(() => {
    return rootFragmentNode ? $054eb8030ebde76e$var$getAnnounceTextContent(rootFragmentNode) : null;
  }, [
    rootFragmentNode
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    setFragment(new DocumentFragment());
  }, []);
  $054eb8030ebde76e$var$useNextFrame(() => setRenderAnnounceText(true));
  (0, import_react20.useEffect)(() => {
    const timer = window.setTimeout(() => setIsAnnounced(true), 1e3);
    return () => window.clearTimeout(timer);
  }, []);
  return isAnnounced ? null : /* @__PURE__ */ (0, import_react20.createElement)(import_react20.Fragment, null, fragment && /* @__PURE__ */ (0, import_react20.createElement)($f1701beae083dbae$export$602eac185826482c, {
    container: fragment,
    ref: setRootFragmentNode
  }, context.label, " ", children), /* @__PURE__ */ (0, import_react20.createElement)($f1701beae083dbae$export$602eac185826482c, {
    asChild: true
  }, /* @__PURE__ */ (0, import_react20.createElement)($ea1ef594cf570d83$export$439d29a4e110a164, announceProps, renderAnnounceText && announceTextContent)));
};
var $054eb8030ebde76e$var$ACTION_NAME = "ToastAction";
var $054eb8030ebde76e$export$3019feecfda683d2 = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { altText, ...actionProps } = props;
  const context = $054eb8030ebde76e$var$useToastInteractiveContext($054eb8030ebde76e$var$ACTION_NAME, props.__scopeToast);
  if (!altText)
    return null;
  return context.isInteractive ? /* @__PURE__ */ (0, import_react20.createElement)($054eb8030ebde76e$export$811e70f61c205839, _extends({}, actionProps, {
    ref: forwardedRef
  })) : /* @__PURE__ */ (0, import_react20.createElement)("span", null, altText);
});
$054eb8030ebde76e$export$3019feecfda683d2.propTypes = {
  altText(props) {
    if (!props.altText)
      return new Error(`Missing prop \`altText\` expected on \`${$054eb8030ebde76e$var$ACTION_NAME}\``);
    return null;
  }
};
var $054eb8030ebde76e$var$CLOSE_NAME = "ToastClose";
var $054eb8030ebde76e$export$811e70f61c205839 = /* @__PURE__ */ (0, import_react20.forwardRef)((props, forwardedRef) => {
  const { __scopeToast, ...closeProps } = props;
  const interactiveContext = $054eb8030ebde76e$var$useToastInteractiveContext($054eb8030ebde76e$var$CLOSE_NAME, __scopeToast);
  return interactiveContext.isInteractive ? /* @__PURE__ */ (0, import_react20.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends({
    type: "button"
  }, closeProps, {
    ref: forwardedRef,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, interactiveContext.onClose)
  })) : null;
});
function $054eb8030ebde76e$var$handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const currentTarget = detail.originalEvent.currentTarget;
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail
  });
  if (handler)
    currentTarget.addEventListener(name, handler, {
      once: true
    });
  if (discrete)
    $8927f6f2acc4f386$export$6d1a0317bde7de7f(currentTarget, event);
  else
    currentTarget.dispatchEvent(event);
}
var $054eb8030ebde76e$var$isDeltaInDirection = (delta, direction, threshold = 0) => {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaX = deltaX > deltaY;
  if (direction === "left" || direction === "right")
    return isDeltaX && deltaX > threshold;
  else
    return !isDeltaX && deltaY > threshold;
};
function $054eb8030ebde76e$var$useNextFrame(callback = () => {
}) {
  const fn = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => raf2 = window.requestAnimationFrame(fn));
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [
    fn
  ]);
}
function $054eb8030ebde76e$var$getAnnounceTextContent(container) {
  const textContent = [];
  const childNodes = Array.from(container.childNodes);
  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent)
      textContent.push(node.textContent);
    if ($054eb8030ebde76e$var$isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === "none";
      if (!isHidden)
        textContent.push(...$054eb8030ebde76e$var$getAnnounceTextContent(node));
    }
  });
  return textContent;
}
function $054eb8030ebde76e$var$isHTMLElement(node) {
  return node.nodeType === node.ELEMENT_NODE;
}
function $054eb8030ebde76e$var$getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function $054eb8030ebde76e$var$focusFirst(candidates) {
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement)
      return true;
    candidate.focus();
    return document.activeElement !== previouslyFocusedElement;
  });
}
var $054eb8030ebde76e$export$2881499e37b75b9a = $054eb8030ebde76e$export$f5d03d415824e0e;
var $054eb8030ebde76e$export$d5c6c08dc2d3ca7 = $054eb8030ebde76e$export$6192c2425ecfd989;
var $054eb8030ebde76e$export$be92b6f5f03c0fe9 = $054eb8030ebde76e$export$8d8dc7d5f743331b;

// app/components/UI/ToastPopover.tsx
var Toast = ({
  message,
  title,
  duration,
  type
}) => {
  const commonRootClasses = classnames("z-50 fixed top-4 left-4 py-2 w-auto md:top-4 md:right-4 md:left-auto md:top-auto md:w-full md:max-w-sm shadow-lg rounded-md", "border-[1px]", "radix-state-open:animate-toast-slide-in-top md:radix-state-open:animate-toast-slide-in-right", "radix-state-closed:animate-toast-hide", "radix-swipe-end:animate-toast-swipe-out", "translate-x-radix-toast-swipe-move-x", "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]", "focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75");
  const typeRootClasses = type === "success" ? "bg-slate-50 dark:bg-slate-900" : "bg-rose-50 dark:bg-rose-100";
  const titleClasses = type === "success" ? "text-emerald-500" : "text-slate-900";
  const bodyClasses = type === "success" ? "text-emerald-500" : "text-slate-700";
  const iconType = type === "success" ? "text-emerald-700 h-7 w-7" : "text-rose-700 h-7 w-7";
  return /* @__PURE__ */ React.createElement($054eb8030ebde76e$export$2881499e37b75b9a, {
    duration: duration != null ? duration : 2500
  }, /* @__PURE__ */ React.createElement($054eb8030ebde76e$export$be92b6f5f03c0fe9, {
    className: classnames(commonRootClasses, typeRootClasses)
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 flex items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex px-4"
  }, type === "success" ? /* @__PURE__ */ React.createElement(InformationCircleIcon_default, {
    className: classnames(iconType)
  }) : /* @__PURE__ */ React.createElement(ExclamationCircleIcon_default, {
    className: classnames(iconType)
  })), /* @__PURE__ */ React.createElement("div", {
    className: "w-full radix"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: classnames("-mb-0.5", titleClasses)
  }, title), /* @__PURE__ */ React.createElement(Body, {
    className: classnames("mb-0.5", bodyClasses)
  }, message))))), /* @__PURE__ */ React.createElement($054eb8030ebde76e$export$d5c6c08dc2d3ca7, null));
};
var ToastPopover_default = Toast;

// app/routes/index.tsx
function Index() {
  const { toastMessage } = useLoaderData();
  return /* @__PURE__ */ React.createElement("div", {
    className: "overflow-x-hidden"
  }, toastMessage && /* @__PURE__ */ React.createElement(ToastPopover_default, {
    message: toastMessage.message,
    title: toastMessage.title,
    type: toastMessage.type,
    key: toastMessage.id
  }), /* @__PURE__ */ React.createElement(HomeHeader, {
    fixed: true
  }), /* @__PURE__ */ React.createElement(HomeHeroSection, null), /* @__PURE__ */ React.createElement(HomeInfoBoxSection, null), /* @__PURE__ */ React.createElement(HomeEdgeCasesSection, null), /* @__PURE__ */ React.createElement(HomeSearchSection, null), /* @__PURE__ */ React.createElement(HomeCollaborateSection, null), /* @__PURE__ */ React.createElement(HomeFeatureGridSection, null), /* @__PURE__ */ React.createElement(HomeFooter, null));
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-NNKQ4NUH.js.map
