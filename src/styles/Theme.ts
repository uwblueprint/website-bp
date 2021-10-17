const SCREEN_BREAKPOINTS = {
    xs: 576,
    mobile: 768,
    tablet: 992,
    tabletLarge: 1024,
    desktop: 1200,
};

export const theme = {
    font: {
        titleFont: "'Poppins', sans-serif",
    },
    // BP Colours
    // Listed in the "Colours!" panel here: https://www.figma.com/file/xOu73pWJgkrezff9FKrD5E/Small-Projects?node-id=29%3A458
    colors: {
        //Primary Variants
        C00: "#ffffff",
        transparent: "rgba(0, 0, 0, 0)",
        C10: "#fafafa",
        C20: "#eaeaea",
        C30: "#cecece",
        C40: "#9f9f9f",
        C50: "#707070",
        C60: "#333333",
        C70: "#000000",
        B10: "#0573e8",
        B20: "#135fc5",
        B30: "#003884",
        B40: "#1f3c5f",
        S10: "#e0f0ff",
        S20: "#bddeff",
        S30: "#99ceff",
        S40: "#7eb9f0",

        //Secondary Colours
        R30: "#ef5d5d",
        P10: "#ffc6c6",
        P20: "#fab5b5",
        P30: "#f0a4a4",
        P50: "#ba7070",
        O10: "#ffbd6f",
        O20: "#ffac4b",
        O30: "#fb980c",
        O50: "#bd7433",
        Y10: "#fcd858",
        Y20: "#f8cb2c",
        Y30: "#e9ba16",
        Y50: "#ab8e28",
        G10: "#a6d669",
        G20: "#93c94f",
        G30: "#81b241",
        G50: "#689332",
        V10: "#bdaef8",
        V20: "#af8df2",
        V30: "#9e8be8",
        V50: "#796dc3",

        //sKiN tOnEs
        K10: "#f8e7cd",
        K11: "#f8dccd",
        K20: "#e6bf99",
        K21: "#c69378",
        K30: "#bd8a5a",
        K31: "#bd7b5a",
        K40: "#8a5935",
        K41: "#914423",
        K50: "#573515",
        K51: "#683124",
    },
    button: {
        primaryDark: {
            fill: "#0573E8",
            outline: "rgba(0, 0, 0, 0)",
            hover: "#99CEFF",
            text: "#FFFFFF",
        },
        secondaryDark: {
            fill: "#FFFFFF",
            outline: "#0573E8",
            hover: "#7EB9F0",
            text: "#0573E8",
        },
        primaryLight: {
            fill: "#FFFFFF",
            outline: "rgba(0, 0, 0, 0)",
            hover: "#BDDEFF",
            text: "#FFFFFF",
        },
        secondaryLight: {
            fill: "#0573E8, 0%",
            outline: "#FFFFFF",
            hover: "#BDDEFF",
            text: "#FFFFFF",
        },
        warning: {
            fill: "#A6D66",
            text: "#FFFFFF",
        },
        success: {
            fill: "#A6D669",
            text: "#FFFFFF",
        },
    },
    mediaQueries: {
        xs: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.xs}px)`,
        mobile: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.mobile}px)`,
        tablet: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.tablet}px)`,
        tabletLarge: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.tabletLarge}px)`,
        desktop: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.desktop}px)`,
    },
};
