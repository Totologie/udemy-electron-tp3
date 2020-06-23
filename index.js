const path = require('path')
const electron = require ('electron')
const { app, BrowserWindow, Tray } = electron

let mainWindow, tray

app.on('ready', () => {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)

    mainWindow = new BrowserWindow(
    {
        //icon: iconPath,
        width: 300, 
        height: 500,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: { nodeIntegration: true } 
    })
    mainWindow.loadFile('src/index.html')

    tray = new Tray(iconPath)
    tray.on('click', (event, bounds) => {

        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            // Click event bounds
            const { x, y } = bounds

            // Window height, width
            const { width, height } = mainWindow.getBounds()

            const xPosition = Math.floor(x - width / 2 + tray.getBounds().width / 2)
            const yPosition = process.platform === 'darwin' ? y : y - height

            mainWindow.setBounds({
                x: xPosition,
                y: yPosition//,
                //width,
                //height
            })

            mainWindow.show()
        }
    })
})
