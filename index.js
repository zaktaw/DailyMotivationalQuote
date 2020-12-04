const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV (to production: this will remove dev tools)
process.env.NODE_ENV = 'production';