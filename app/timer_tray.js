const { app, Tray,  Menu } = require('electron')

class TimerTray extends Tray {
    constructor (iconPath, mainWindow) {
        super(iconPath)

        this.mainWindow = mainWindow

        this.setToolTip('Timer App')
        
        this.on('click', this.onClick.bind(this))

        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(event, bounds) {
        if (this.mainWindow.isVisible()) {
            // Plus nécessaire avec le masquage sur "blur" 
            this.mainWindow.hide()
        } else {
            // Click event bounds
            const { x, y } = bounds

            // Window height, width
            const { width, height } = this.mainWindow.getBounds()

            const xPosition = Math.floor(x - width / 2 + this.getBounds().width / 2)
            const yPosition = process.platform === 'darwin' ? y : y - height

            this.mainWindow.setBounds({
                x: xPosition,
                y: yPosition//,
                //width,
                //height
            })

            this.mainWindow.show()
        }
    }

    onRightClick(){
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quitter',
                click: () => app.quit()
            }
        ])
        this.popUpContextMenu(menuConfig)
    }
}

module.exports = TimerTray