const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let secret;
let attempts = 0;

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
           
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('renderer/index.html');

   
    win.webContents.openDevTools();
}


ipcMain.handle('guess:start', () => {
    secret = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    console.log("verification :", secret); 
    return "Partie lancée";
});

// vérifier le nombre envoyé par l'utilisateur
ipcMain.handle('guess:check', (event, num) => {
    attempts++;
    
    const userGuess = Number(num);

    if (userGuess === secret) {
        return { status: 'gagne', attempts }; 
    } else if (userGuess > secret) {
        return { status: 'trop_grand', attempts };
    } else {
        return { status: 'trop_petit', attempts }; 
    }
});

app.whenReady().then(createWindow);