const root = document.querySelector(":root");

const { baseFontFamily, baseFontSize, panelBackgroundColor } = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
const { red: r, green: g, blue: b } = panelBackgroundColor.color;

function detectColorTheme() {
    const bgColorValue = (r + g + b) / 3;
    if (bgColorValue < 66.5) {
        return "dark";
    } else if (bgColorValue < 133.5) {
        return "medium-dark";
    } else if (bgColorValue < 212) {
        return "medium-light";
    } else {
        return "light";
    }
}

const THEMES = {
    dark: {
        color: "200",
        inputBackgroudColor: "#262626",
        inputBorderColor: "#ffffff22",
    },
    "medium-dark": {
        color: "200",
        inputBackgroudColor: "#454545",
        inputBorderColor: "#ffffff22",
    },
    "medium-light": {
        color: "50",
        inputBackgroudColor: "#e3e3e3",
        inputBorderColor: "#00000044",
    },
    light: {
        color: "50",
        inputBackgroudColor: "#ffffff",
        inputBorderColor: "#00000022",
    },
};

const Theme = THEMES[detectColorTheme()];

root.style.setProperty("--app-font-size", `${baseFontSize}px`);
root.style.setProperty("--app-font-family", `${baseFontFamily}`);
root.style.setProperty("--app-color", `rgb(${Theme.color},${Theme.color},${Theme.color})`);
root.style.setProperty("--app-background-color", `rgb(${r},${g},${b})`);
root.style.setProperty("--app-input-background-color", Theme.inputBackgroudColor);
root.style.setProperty("--app-input-border-color", Theme.inputBorderColor);
