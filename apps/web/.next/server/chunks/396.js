"use strict";
exports.id = 396;
exports.ids = [396];
exports.modules = {

/***/ 396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ theme)
});

// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
;// CONCATENATED MODULE: ./src/lib/theme/styles.ts
const styles = {
    global: (_props)=>({
            body: {
                bg: "canvas"
            }
        })
};
/* harmony default export */ const theme_styles = (styles);

;// CONCATENATED MODULE: ./src/lib/theme/semantic-tokens.ts
const semanticTokens = {
    colors: {
        canvas: {
            default: "gray.50",
            _dark: "gray.800"
        },
        surface: {
            default: "gray.100",
            _dark: "gray.900"
        },
        subtext: {
            default: "gray.500",
            _dark: "gray.500"
        }
    }
};
/* harmony default export */ const semantic_tokens = (semanticTokens);

// EXTERNAL MODULE: external "@chakra-ui/theme-tools"
var theme_tools_ = __webpack_require__(429);
;// CONCATENATED MODULE: ./src/lib/theme/components/card.ts

const Card = {
    baseStyle: (props)=>({
            display: "flex",
            flexDirection: "column",
            background: (0,theme_tools_.mode)("white", "gray.900")(props),
            boxShadow: (0,theme_tools_.mode)("md", "none")(props),
            padding: 6,
            borderRadius: "base"
        })
};
/* harmony default export */ const card = (Card);

;// CONCATENATED MODULE: ./src/lib/theme/components/heading.ts
const Heading = {
    baseStyle: {
        pb: {
            base: "6",
            md: "12"
        }
    },
    size: {},
    variants: {}
};
/* harmony default export */ const heading = (Heading);

;// CONCATENATED MODULE: ./src/lib/theme/index.ts





const overrides = {
    styles: theme_styles,
    semanticTokens: semantic_tokens,
    components: {
        Card: card,
        Heading: heading
    }
};
/* harmony default export */ const theme = ((0,react_.extendTheme)(overrides));


/***/ })

};
;