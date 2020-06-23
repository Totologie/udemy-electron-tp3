const { app, BrowserWindow } = require('electron')

class MainWindow extends BrowserWindow {

    constructor (iconPath, loadFile) {
        super({
            icon: iconPath,
            width: 300, 
            height: 500,
            frame: false,
            resizable: false,
            show: false, 
            skipTaskbar: true,
            webPreferences: { 
                nodeIntegration: true,
                backgroundThrottling: false // Empêche le ralentissement sans focus.
            } 
        })

        this.on('blur', () => this.hide())

        this.loadFile(loadFile)
    }

}

module.exports = MainWindow