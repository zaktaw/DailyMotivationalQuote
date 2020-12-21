const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV (to production: this will remove dev tools)
process.env.NODE_ENV = 'production';

let mainWindow;
let aboutWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 550,
        height: 400,
        title: 'Daily motivational quote',
        webPreferences:{
            nodeIntegration: true
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

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// create about window
function createAboutWindow(){
    // create window
    aboutWindow = new BrowserWindow({
        width: 400,
        height: 350,
        title: 'About',
        webPreferences:{
            nodeIntegration:true
        }
    });


     // Load html into window
     aboutWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'aboutWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Garbage collection handle
    aboutWindow.on('close', () => {
        aboutWindow = null;
    });

    aboutWindow.removeMenu();
}

// create menu template
const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'About Daily Motivational Quote',
                click(){createAboutWindow()}
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // darwin = mac,
                click(){app.quit()}
            }
        ]
    }
]
