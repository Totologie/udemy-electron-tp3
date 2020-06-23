const path = require('path')
const electron = require ('electron')
const { app, ipcMain } = electron
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/mainwindow')

let mainWindow, tray

app.on('ready', () => {
    if (process.platform === 'darwin') { app.dock.hide() } // Hide App from dock for Apple

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)

    mainWindow = new MainWindow(iconPath, path.join(__dirname, './src/index.html'))

    tray = new TimerTray(iconPath, mainWindow) // In a variable to preserve from garbage collector

    ipcMain.on('update-timer', (event, timeLeft) => {
        tray.setTitle(timeLeft)
    })
})
