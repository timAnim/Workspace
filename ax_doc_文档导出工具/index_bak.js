const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')


ipcMain.on('setMenu', (ev, type) => {
    console.log(2222)
    if (type == "AXURE") {
        Menu.setApplicationMenu(menu_axure)
    } else {
        Menu.setApplicationMenu(menu_default)
    }
})

ipcMain.on('downloadWord', (ev, proj) => {
    outputDocx(proj, function(url) {
        console.log(url)
        win.webContents.downloadURL(url)
    })
})

const outputDocx = require("./js/output-docx")

let menu_axure_tmp,
    menu_default_tmp
menu_default_tmp = [{
        label: "  打开文件夹  ",
        click() {
            win.webContents.send('openFolder')
        }
    },
    {
        label: "  窗口  ",
        submenu: [{
                label: "刷新",
                role: "reload",
                accelerator: "CmdOrCtrl+Shift+R"
            },
            {
                label: "后退",
                role: "reload",
                accelerator: "CmdOrCtrl+Left"
            },
            {
                label: "前进",
                role: "reload",
                accelerator: "CmdOrCtrl+Right"
            },
            {
                label: "调试窗口",
                role: "toggledevtools",
                accelerator: "CmdOrCtrl+Shift+I"
            },
        ]
    },
    {
        label: "关于",
        click() {
            win.webContents.send('help')
        }
    },
]

menu_axure_tmp = [{
        label: "返回",
        click: function() {
            win.webContents.send('back')
        }
    },
    {
        label: "窗口",
        submenu: [{
                label: "刷新",
                role: "reload",
                accelerator: "CmdOrCtrl+Shift+R"
            },
            { label: "后退" },
            { label: "前进" },
            {
                label: "调试窗口",
                role: "toggledevtools",
                accelerator: "CmdOrCtrl+Shift+I"
            },
        ]
    },
    {
        label: "详情",
        click() {
            win.webContents.send('detail')
        }
    },
    {
        label: "帮助",
        submenu: [
            { label: "关于" },
            {
                label: "下载",
                click() {
                    console.log(111)
                }
            },
        ]
    },
]
let win,
    menu_default = Menu.buildFromTemplate(menu_default_tmp),
    menu_axure = Menu.buildFromTemplate(menu_axure_tmp)

function createWindow() {
    win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            webSecurity: false
        })
        // win.openDevTools({
        //     mode: "bottom"
        // })
    win.loadFile('index.html')
    win.maximize()
    Menu.setApplicationMenu(menu_default)
}


app.commandLine.appendSwitch("--disable-http-cache")

app.whenReady().then(createWindow)