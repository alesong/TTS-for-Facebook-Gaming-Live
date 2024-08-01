self.console.log("Hello from background.js!");
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



const currentVersion = chrome.runtime.getManifest().version;
const checkIntervalMinutes = 60; // Intervalo de verificación en minutos

// Función para verificar la nueva versión
function checkForUpdates() {
  fetch('http://45.173.12.90:3000/json/endPointVersionFGLTTS.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if (data.version !== currentVersion) {
        chrome.notifications.create('updateNotification', {
          type: 'basic',
          iconUrl: 'icon128.png',
          title: 'TTS for Facebook Gaming Live - Nueva versión disponible',
          message: `La versión ${data.version} está disponible. Haz clic para descargar.`,
          priority: 2
        });

        chrome.notifications.onClicked.addListener(() => {
          window.open(data.download_url, '_blank');
        });
      }
    })
    .catch(error => console.error('Error verificando actualizaciones:', error));
}

// Establecer una alarma para verificar cada cierto tiempo
chrome.alarms.create('checkForUpdates', { periodInMinutes: checkIntervalMinutes });

// Escuchar la alarma para ejecutar la verificación
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'checkForUpdates') {
    checkForUpdates();
  }
});

// Verificar al iniciar la extensión
checkForUpdates();
