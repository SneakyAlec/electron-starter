// Electron app and BrowserWindow class
const { app, BrowserWindow } = require("electron")

// Pastreaza o referinta globala variabilei win
let win

function createWindow () {
    // Creaza o fereastra de browser
    win = new BrowserWindow({ width:800, height:600, show:false })

    // Incarca fisierul in fereastra de browser
    win.loadFile("index.html")

    // Afiseaza fereastra dupa ce aceasta a fost incarcata complet
    win.webContents.on("did-finish-load", function() { win.show() } )

    // Deschide kitul pentru dezvoltatori
    win.webContents.openDevTools()

    // Se executa cand fereastra este inchisa
    win.on("closed", () => {
        // In momentul in care fereastra este inchisa trebuie sa golim variabila ferestrei de browser
        win = null
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    // Pe macOS, in momentul in care inchidem aplicatia, trebuie sa o redeschidem atunci
    // cand apasam iconita de pe dock
    if ( win == null ) {
        createWindow()
    }
})