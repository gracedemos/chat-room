const {app, Menu, BrowserWindow} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Chat Room"
    });
    if(isDev) {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    }else {
        win.loadURL("file://" + path.join(__dirname, "../build/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});