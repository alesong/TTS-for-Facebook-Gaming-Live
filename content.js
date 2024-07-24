console.log("Hello from content.js!");

const miVideo = document.querySelector("video");
if (miVideo) miVideo.volume = 0;

let ultimoDivList = 0;
let p = 21;

// Función para obtener la configuración guardada
function obtenerConfiguracion(callback) {
    chrome.storage.sync.get(['velocidad', 'volumen', 'vozIndex'], function(result) {
        let indiceDeVoz = result.vozIndex;
        
        if (indiceDeVoz == 100) {
            //Aleatorio
            const miArregloDeVozes = [0, 4, 5]; //indices de voces en es-ES
            const indiceAleatorio = Math.floor(Math.random() * miArregloDeVozes.length);
            indiceDeVoz = miArregloDeVozes[indiceAleatorio];
        }

        if (indiceDeVoz == 101) {
            //Aleatorio
            const miArregloDeVozes = [1, 2, 3]; //indices de voces en en-US
            const indiceAleatorio = Math.floor(Math.random() * miArregloDeVozes.length);
            indiceDeVoz = miArregloDeVozes[indiceAleatorio];
        }
        
        
        callback({
            velocidad: result.velocidad || 1,
            volumen: result.volumen || 1,
            vozIndex: indiceDeVoz
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
        
        //console.log('elemento');
        //console.log(elementoNombre);
        elementoNombre = elementoNombre.textContent;
        elementoChat = elementoChat.textContent;
        console.log(elementoNombre);        
        console.log(elementoChat);

        let texto = `${elementoNombre}: ${elementoChat}`;
        hablar(texto);
        
        ultimoDivList = divlist;
    }
}, 1000);


function crearBotonPopup() {
    const boton = document.createElement('div');
    boton.innerHTML = '🎤';
    boton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: rgba(0,0,0,0.25);
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 12px;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    `;
    boton.title = "Abrir controles de síntesis de voz";
    
    boton.addEventListener('click', function() {
        console.log("Botón clickeado, guardando estado para abrir popup");
        chrome.storage.local.set({openPopup: true}, function() {
            if (chrome.runtime.lastError) {
                console.error("Error al guardar estado:", chrome.runtime.lastError);
            } else {
                console.log("Estado guardado para abrir popup");
            }
        });
    });
    
    document.body.appendChild(boton);
}

crearBotonPopup();