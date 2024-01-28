const root = document.querySelector(":root");

const { baseFontFamily, baseFontSize, panelBackgroundColor } = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
const { red: r, green: g, blue: b } = panelBackgroundColor.color;

const color = 128 * 3 > r + g + b ? 200 : 55;

root.style.setProperty("--app-font-size", `${baseFontSize}px`);
root.style.setProperty("--app-font-family", `${baseFontFamily}`);
root.style.setProperty("--app-color", `rgb(${color},${color},${color})`);
root.style.setProperty("--app-background-color", `rgb(${r},${g},${b})`);
