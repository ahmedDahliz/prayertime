const electron = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
var fs = require('fs');
const { ipcMain } = require('electron')
const editJsonFile = require("edit-json-file");
const request = require('request');
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

ipcMain.on('location-data', (event, arg) => {
  let file = editJsonFile('src/Data.json');
  console.log(arg);
  file.set('country', arg.country)
  file.set('city', arg.city)
  file.save()
  event.returnValue = file.toObject()
//   request("http://api.aladhan.com/v1/timingsByCity?city="+arg+"&country=Morocco&method=3", {json: true}, (error, res, data) => {
//     if (error) {
//         event.reply('error-data', {error: error})
//         return;
//     }
//     if (!error && res.statusCode == 200) {
//       console.log(data);
//
//       // if (body.title === null) {
//       //   console.log('wwwwww');
//       //   event.reply('error-data', "error lod")
//       // }else {
//       //
//       //
//       // }
//     };
// });



})
