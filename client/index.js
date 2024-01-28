// console.log("__adobe_cep__", window.__adobe_cep__);
// console.log("CSInterface", new CSInterface().__proto__);

const UNITS = {
    "RulerUnits.Points": 1,
    "RulerUnits.Millimeters": 2.83464567,
    "RulerUnits.Centimeters": 28.3464567,
    "RulerUnits.Inches": 72,
    "RulerUnits.Pixels": 1,
};

const csInterface = new CSInterface();

csInterface.evalScript("getTime()", (result) => {
    document.getElementById("version").innerHTML = result;
});

// csInterface.evalScript("debug()", (result) => {
//     console.log(result);
// });

csInterface.evalScript("getUnits()", (result) => {
    document.getElementById("units").value = result;
});

function logActiveDocument() {
    csInterface.evalScript("getActiveDocument()", (result) => {
        console.log("getActiveDocument", result);
    });
}

function onMarginSubmit(e) {
    e.preventDefault();
    const margin = Number(document.getElementById("margin-width").value) * UNITS[e.target.elements.units.value];
    const individual = document.getElementById("margin-individual").checked;
    csInterface.evalScript(`setMargin(${margin}, ${individual})`);
}

function reload() {
    const rootPath = csInterface.getSystemPath(SystemPath.EXTENSION);
    const hostPath = rootPath + "/host/index.jsx";
    csInterface.evalScript(`$.evalFile('${hostPath}')`);
    location.reload();
}
