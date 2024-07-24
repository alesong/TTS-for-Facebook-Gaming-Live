function checkAndOpenPopup() {
    console.log("Verificando si se debe abrir el popup...");
    chrome.storage.local.get(['openPopup'], function(result) {
        if (result.openPopup) {
            console.log("Abriendo popup");
            chrome.tabs.create({
                url: chrome.runtime.getURL("popup.html"),
                active: true
            }, function(tab) {
                console.log("Popup abierto en nueva pestaña:", tab);
                // Resetear el estado
                chrome.storage.local.set({openPopup: false});
            });
        }
    });
}

// Verificar cada segundo si se debe abrir el popup
setInterval(checkAndOpenPopup, 1000);