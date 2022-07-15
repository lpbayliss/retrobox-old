(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ../../node_modules/@fortawesome/fontawesome-svg-core/styles.css
var styles = __webpack_require__(961);
;// CONCATENATED MODULE: external "@fortawesome/fontawesome-svg-core"
const fontawesome_svg_core_namespaceObject = require("@fortawesome/fontawesome-svg-core");
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: ./src/lib/theme/index.ts + 4 modules
var theme = __webpack_require__(396);
;// CONCATENATED MODULE: ./src/pages/_app.tsx





fontawesome_svg_core_namespaceObject.config.autoAddCss = false;
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.ChakraProvider, {
        resetCSS: true,
        theme: theme/* default */.Z,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 961:
/***/ (() => {



/***/ }),

/***/ 930:
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 429:
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/theme-tools");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [396], () => (__webpack_exec__(770)));
module.exports = __webpack_exports__;

})();