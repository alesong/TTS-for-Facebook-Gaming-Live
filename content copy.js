console.log("Hello from content.js!");

const miVideo = document.querySelector("video");
if (miVideo) miVideo.volume = 0;

let ultimoDivList = 0;

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
    let divHijo = 21;

    chrome.storage.sync.get(['divHijo'], function(result) {
        if (result.divHijo) {
            console.log("divHijo:", result.divHijo);
            
            divHijo = result.divHijo
                
        }
    });
    
    elementoBox = elementoBox[divHijo];
    if (!elementoBox) return;
    elementoBox = elementoBox.childNodes[0];
    let divlist = elementoBox.childElementCount;
    //console.log('el divlist es ' +divlist);

    if (divlist === 50) {
        window.location.reload();
    }
   
    if (divlist > ultimoDivList) {
        let elementoPersona = elementoBox;
        let elementoNombre = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        let elementoChat = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
        if (elementoChat === undefined) {
            console.log('elementoChat es undefined');
            
        }
        //console.log('elemento');
        //console.log(elementoNombre);
        elementoNombre = elementoNombre.textContent;
        elementoChat = elementoChat.textContent;
        console.log(elementoNombre);        
        console.log(elementoChat);

        let img = document.querySelector('#imgBot');
        if (elementoNombre) {
            img.style.border = 'solid 4px #65ff65';
            
        }else{
            img.style.border = 'none';
        }

        let texto = `${elementoNombre}: ${elementoChat}`;
        hablar(texto);
        
        ultimoDivList = divlist;
        console.log('ultimoDivList:',ultimoDivList);
        
    }
}, 1000);


function crearBotonPopup() {
    const boton = document.createElement('div');
    let estiloControles = `
    border:1px solid gray;
    display:inline-block;
    padding:4px 8px 4px 8px;
    margin:0px -1px;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(0,0,0,0.5));
    box-shadow: 0px 2px 5px rgba(0,0,0,0.75);
    cursor:pointer;
    `;
    // Obtener las URL completas de las imágenes
    const icon48Url = chrome.runtime.getURL('icon48.png');
    const volumeIconUrl = chrome.runtime.getURL('volume_icon.png');
    const stopIconUrl = chrome.runtime.getURL('stop_icon.png');
    const settingsIconUrl = chrome.runtime.getURL('settings_icon.png');
    boton.innerHTML = `
        <div style="display: inline-block;"><img id="imgBot" style="width: 48px; height: 48px; position: relative; top: 12px; border-radius: 50%; margin-right: 5px;" src="https://media.istockphoto.com/id/1605069902/es/vector/chatbot-icon.jpg?s=2048x2048&w=is&k=20&c=rAHkJBLw9-h2kwWTqyp3AOezXwtk5EC7vl85mp5nhOs="></div>
        <div id="controlPlay"  style="${estiloControles} border-radius: 15px 0px 0px 15px;"><img style="width: 30px; height: 30px;" src="https://cdn3.iconfinder.com/data/icons/computer-and-it-3d/512/speeker-sound-audio-music-volume-broadcast-play.png"></div>
        <div id="controlStop"  style="${estiloControles} display: none;"><img style="width: 15px; height: 15px;" src="./stop_icon.png"></div>
        <div id="controlSettings"  style="${estiloControles} border-radius: 0px 15px 15px 0px;"><img style="width: 30px; height: 30px;" src="https://cdn2.iconfinder.com/data/icons/buno-ui-interface/32/__settings_gear_options-512.png"></div>
    `;
    boton.style.cssText = `
        position: fixed;
        bottom: 78px;
        right: 20px;
        text-align: center;
        z-index: 9999;
        
    `;
    boton.title = "Abrir controles de síntesis de voz";
    boton.id = 'botonPopup';

    
    document.body.appendChild(boton);
}

crearBotonPopup();


document.getElementById('controlPlay').addEventListener('click', controlPlay);
document.getElementById('controlStop').addEventListener('click', controlStop);
document.getElementById('controlSettings').addEventListener('click', controlSettings);

function controlPlay() {
    console.log('controlPlay');
    location.reload();
}

function controlStop() {
    console.log('controlStop');
    
}

function controlSettings() {
    console.log('controlSettings');
    console.log("Botón clickeado, guardando estado para abrir popup");
        chrome.storage.local.set({openPopup: true}, function() {
            if (chrome.runtime.lastError) {
                console.error("Error al guardar estado:", chrome.runtime.lastError);
            } else {
                console.log("Estado guardado para abrir popup");
            }
        });
    
}

