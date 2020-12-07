const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV (to production: this will remove dev tools)
//process.env.NODE_ENV = 'production';

let mainWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 550,
        height: 400,
        webPreferences:{
            nodeIntegration:true
        }
    });

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });

    /*
      // Build menu from template
      const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

      // Insert menu
      Menu.setApplicationMenu(mainMenu);
      */
});

// create menu template
const mainMenuTemplate = [

]
