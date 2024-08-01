// serviceworker.js

self.addEventListener('activate', function(event) {
    console.log('Servicio worker activado');
  });
  
  self.addEventListener('fetch', function(event) {
    // Aquí irá el código para manejar las solicitudes de red
  });