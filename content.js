console.log(
    "Hello from content.js!"
);
const miVideo = document.querySelector("video");
miVideo.volume = 0;

let ultimoDivList = 0
let p = 21

setInterval(() => {
    
    
    let elementoBox = document.querySelectorAll('.x78zum5 .x6ikm8r .x10wlt62 .x1n2onr6 .xh8yej3') //para videos en vivo
    //console.log(elementoBox);
    elementoBox = elementoBox[p]
    elementoBox = elementoBox.childNodes[0]

    
    let divlist = elementoBox.childElementCount
    console.log(divlist)
    if (divlist === 50) {
        //recargar la pagina
        window.location.reload();
    }
    //console.log(elementoBox);
    

    if (divlist > ultimoDivList) { // para videos en vivo
        // Emcontrar el nombre
        let elementoPersona = elementoBox
        //console.log(elementoPersona)
        elementoNombre = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        elementoChat = elementoPersona.childNodes[divlist-1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1]
        console.log('elemento');
        console.log(elementoNombre)
        elementoNombre = elementoNombre.textContent
        elementoChat = elementoChat.textContent
        console.log(elementoNombre)        
        console.log(elementoChat)

        //TTS
        document.documentElement.lang = 'es';
        let texto=`${elementoNombre}: ${elementoChat}`;

        const hablar = (texto, velocidad = 1, volumen = 1) => {
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'es';
            utterance.rate = velocidad; // Controla la velocidad de reproducción
            utterance.volume = volumen; // Controla el volumen (0.0 a 1.0)
            speechSynthesis.speak(utterance);
        }

        // Ejemplo de uso:
        hablar(texto, 0.75, 1.0); // Más lento volumen normal
        // hablar(texto, 1, 1.0);   // Velocidad normal volumen normal
        // hablar(texto, 1.5, 1.0); // Más rápido volumen normal


        ultimoDivList = divlist

        

    }

    



},1000)
