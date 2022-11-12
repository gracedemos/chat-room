const {app, Menu, BrowserWindow} = require("electron");
const path = require("path");

function createWindow() {
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Chat Room",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});