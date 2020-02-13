const electron = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
var fs = require('fs');
const { ipcMain } = require('electron')
const editJsonFile = require("edit-json-file");

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('update-data', (event, arg) => {
  console.log(arg)
  let file = editJsonFile('src/Data.json');
  
  file.save();
  event.reply('asynchronous-reply', 'pong')
})
