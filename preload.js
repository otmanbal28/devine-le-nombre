const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('guessService', {
    start: () => ipcRenderer.invoke('guess:start'),
    check: (num) => ipcRenderer.invoke('guess:check', num)
});