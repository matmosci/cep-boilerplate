function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return hours + ":" + minutes + (minutes <= 9 ? "0" : "") + ":" + (seconds <= 9 ? "0" : "") + seconds;
}

function getVersion() {
    return "0.0.1";
}

function getActiveDocument() {
    return app.activeDocument;
}

function setMargin(margin, individual) {
    removeArtboards();
    var items = app.activeDocument.selection.length > 0 ? app.activeDocument.selection : app.activeDocument.pageItems;
    if (individual == true) createItemsArtboardsWithMargin(items, margin);
    else createArtboardWithMargin(items, margin);
    app.activeDocument.artboards[0].remove();
}

function createItemsArtboardsWithMargin(items, margin) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.parent.typename == "Layer" && !item.guides) {
            var artboard = app.activeDocument.artboards.add([item.position[0] - margin, item.position[1] + margin, item.position[0] + item.width + margin, -(-item.position[1] + item.height) - margin]);
            artboard.name = item.typename + "-" + item.name + "-" + (i + 1);
        }
    }
}

function createArtboardWithMargin(items, margin) {
    var x1 = items[0].position[0],
        y1 = items[0].position[1],
        x2 = items[0].position[0] + items[0].width,
        y2 = items[0].position[1] - items[0].height;

    for (var i = 1; i < items.length; i++) {
        var item = items[i];
        if (item.parent.typename == "Layer" && !item.guides) {
            if (x1 > item.position[0]) x1 = item.position[0];
            if (y1 < item.position[1]) y1 = item.position[1];
            if (x2 < item.position[0] + item.width) x2 = item.position[0] + item.width;
            if (y2 > item.position[1] - item.height) y2 = item.position[1] - item.height;
        }
    }
    var x = x1,
        y = y1,
        width = x2 - x1,
        height = Math.abs(y2 - y1);
    var artboard = app.activeDocument.artboards.add([x - margin, y + margin, x + width + margin, -(-y + height) - margin]);
    artboard.name = "Artboard " + (i + 1);
}

function removeArtboards() {
    if (app.activeDocument.artboards.length > 1) {
        app.activeDocument.artboards[0].remove();
        removeArtboards();
    }
}

function getUnits() {
    return app.activeDocument.rulerUnits;
}

function getItems() {}

function debug() {
    // return app.activeDocument.rulerUnits;
    // return app.activeDocument.groupItems.length;
    // return app.activeDocument.placedItems.length;
    // return app.activeDocument.pathItems.length;
    // return app.activeDocument.compoundPathItems.length;
    // return app.activeDocument.rasterItems.length;
    // return app.activeDocument.selection.length;
    // return app.activeDocument.pageItems.length;
    
    var str = "";
    for (var i = 0; i < app.activeDocument.pageItems.length; i++) {
        str += app.activeDocument.pageItems[i].guides + "\n";
    }
    return str;
}
