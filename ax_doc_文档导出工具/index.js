const { app, BrowserWindow, ipcRenderer, ipcMain, screen } = require('electron')
const path = require('path')
const exec = require("child_process").exec
let genXmind = require("./js/genXmind")
let genDocxHtml = require("./js/genDocxHtml")
let genXlsx = require("./js/genXlsx")

let x_max, y_max, x0, y0, seed, win

ipcMain.on('close', ev => {
    win.close()
})

ipcMain.on('gen_all', (ev, file_path) => {
    Promise.resolve()
        // .then(res => win.webContents.executeJavaScript(`document.getElementsByClassName("gen-all")[0].innerHTML = "xmind..."`))
        // .then(res => genXmind(file_path))
        .then(res => win.webContents.executeJavaScript(`document.getElementsByClassName("gen-all")[0].innerHTML = "word..."`))
        .then(res => genDocxHtml(file_path))
        .then(res => win.webContents.executeJavaScript(`document.getElementsByClassName("gen-all")[0].innerHTML = "xlsx..."`))
        .then(res => genXlsx(file_path))
        .then(res => win.webContents.executeJavaScript(`document.getElementsByClassName("gen-all")[0].innerHTML = "UXC"`))
})

ipcMain.on('open_url', (ev, url) => {
    exec("start " + url)
})

ipcMain.on('drag_end', (ev, url) => {
    clearInterval(seed)
})

ipcMain.on("drag_start", ev => {
    let cursorPos = screen.getCursorScreenPoint()
    let pos = win.getPosition()

    x0 = pos[0] - cursorPos.x
    y0 = pos[1] - cursorPos.y

    let x, y
    seed = setInterval(t => {
        cursorPos = screen.getCursorScreenPoint()
        x = cursorPos.x + x0
        y = cursorPos.y + y0

        // 校验
        x = x > x_max ? x_max : x
        y = y > y_max ? y_max : y
        x = x < 0 ? 0 : x
        y = y < 0 ? 0 : y

        win.setPosition(x, y, true)
    }, 32)
})

function createWindow() {
    // Menu.setApplicationMenu(null)
    x_max = screen.getPrimaryDisplay().workAreaSize.width - 240
    y_max = screen.getPrimaryDisplay().workAreaSize.height - 240

    win = new BrowserWindow({
            width: 240,
            height: 240,
            x: x_max,
            y: y_max,
            maximize: false,
            alwaysOnTop: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            transparent: true,
            webSecurity: false
        })
        // win.openDevTools({
        //     mode: "bottom"
        // })
    win.loadFile('index.html')
}

app.commandLine.appendSwitch("--disable-http-cache")

app.whenReady().then(createWindow)