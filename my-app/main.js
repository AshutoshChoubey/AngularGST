const { app, BrowserWindow } = require('electron')
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;
const { Menu, MenuItem } = require('electron');
const menu = new Menu();

ipc.on('print-to-pdf',function(event)
{
  const pdfPath=path.join(os.tmpDir(),'print.pdf');
  const win=BrowserWindow.fromWebContents(event.sender);
  win.webContents.printToPDF({},function(error,data){
    if(error) return console.log(error.message);
    fs.writeFile(pdfPath,data,err=>{
      if(err) return console.log(err.message);
      shell.openExternal('file://'+pdfPath);
      event.sender.send('wrote-pdf',pdfPath);
    })

  })
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// Module to control application life. (this variable should already exist)

// Module to control application life. (this variable should already exist)

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600,  webPreferences: {
    nodeIntegration: false
} })

  // and load the index.html of the app.
  win.loadFile('dist/my-app/index.html')

  // Open the DevTools.
   // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// app.on('ready', () => {

// let win = new BrowserWindow({width:800, height:600,resizable:false})
// win.loadURL('file://'+__dirname+'/index.html')
// win.webContents.on('did-finish-load', () => {
//     win.webContents.printToPDF({ marginsType:2, pageSize:"A3", landscape:false }, (error, data) => {
//         if (error) throw error
//         fs.writeFile('output.pdf', data, (error) => {

//         //getTitle of Window
//         console.log(win.webContents.getTitle())

//         //Silent Print 

//         if (error) throw error
//         console.log('Write PDF successfully.')
//         })
//     })
// })
// });


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.