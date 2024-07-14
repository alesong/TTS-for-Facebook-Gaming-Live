console.log("Hello from content.js!");

const miVideo = document.querySelector("video");
if (miVideo) miVideo.volume = 0;

let ultimoDivList = 0;
let p = 21;

// Función para obtener la configuración guardada
function obtenerConfiguracion(callback) {
    chrome.storage.sync.get(['velocidad', 'volumen', 'vozIndex'], function(result) {
        callback({
            velocidad: result.velocidad || 1,
            volumen: result.volumen || 1,
            vozIndex: result.vozIndex || 4  // Usando 4 como valor por defecto, ya que parece ser tu preferencia
        });
    });
}

// Función para hablar usando la configuración guardada
function hablar(texto) {
    obtenerConfiguracion(function(config) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'es';
            utterance.rate = parseFloat(config.velocidad);
            utterance.volume = parseFloat(config.volumen);
            
            function setVoiceAndSpeak() {
                const voices = speechSynthesis.getVoices();
                if (voices.length > 0) {
                    utterance.voice = voices[config.vozIndex];
                    speechSynthesis.speak(utterance);
                } else {
                    setTimeout(setVoiceAndSpeak, 100); // Intentar de nuevo si las voces no están listas
                }
            }

            if (speechSynthesis.getVoices().length === 0) {
                speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
            } else {
                setVoiceAndSpeak();
            }

            utterance.onend = resolve;
        });
    });
}

setInterval(() => {
    let elementoBox = document.querySelectorAll('.x78zum5 .x6ikm8r .x10wlt62 .x1n2onr6 .xh8yej3');
    elementoBox = elementoBox[p];
    if (!elementoBox) return;
    elementoBox = elementoBox.childNodes[0];
   
    let divlist = elementoBox.childElementCount;
    console.log(divlist);
    if (divlist === 50) {
        window.location.reload();
    }
   
    if (divlist > ultimoDivList) {
        let elementoPersona = elementoBox;
        let elementoNombre = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        let elementoChat = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
        
        console.log('elemento');
        console.log(elementoNombre);
        elementoNombre = elementoNombre.textContent;
        elementoChat = elementoChat.textContent;
        console.log(elementoNombre);        
        console.log(elementoChat);
        
        let texto = `${elementoNombre}: ${elementoChat}`;
        hablar(texto);
        
        ultimoDivList = divlist;
    }
}, 1000);
