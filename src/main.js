const electron = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
var fs = require('fs');
const { ipcMain } = require('electron')
const editJsonFile = require("edit-json-file");
const request = require('request');
const file = editJsonFile('src/Data.json');
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

ipcMain.on('timing-data', (event, args) => {
  // ipcMain.send('error-data', "wa errooooooor")
  console.log(args);
  request("http://api.aladhan.com/v1/timingsByCity?city="+args.city+"&country="+args.country+"&method=3", {json: true}, (error, res, data) => {
    if (error) {
        ipcMain.send('error-data', {error: error})
        return;
    }
    if (!error && res.statusCode == 200) {
      if (data.code == 200 && data.status == "OK") {
        console.log(data);
        file.set('country', args.country)
        file.set('city', args.city)
        file.set('timings', data.data.timings)
        file.save()
        event.returnValue = {locationData : file.toObject(), timingData: data}
      }else {
          ipcMain.send('error-data', {error: error})
          return;
      }

    };
});
})
//Refresh timing at midnight
ipcMain.on('refresh-timing', (event, args) => {
  console.log(args);
  request("http://api.aladhan.com/v1/timingsByCity?city="+args.city+"&country="+args.country+"&method=3", {json: true}, (error, res, data) => {
    if (error) {
        ipcMain.send('error-data', {error: error})
        return;
    }
    if (!error && res.statusCode == 200) {
      if (data.code == 200 && data.status == "OK") {
        console.log(data);
        file.set('timings', data.data.timings)
        file.save()
        event.returnValue = data
      }else {
          ipcMain.send('error-data', {error: error})
          return;
      }

    };
  });
});
