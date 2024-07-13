console.log(
    "Hello from content.js!"
);

let ultimoDivList = 0

setInterval(() => {
    
    

    
    //elementoBox
    let elementoBox = document.querySelectorAll('.x1iyjqo2 .x1pi30zi .x1swvt13') //para videos grabados
    //let elementoBox = document.querySelectorAll('.xc26acl .xjbqb8w .xwycmqc') //para videos en vivo
    
    let divlist = elementoBox.length
    console.log(divlist)

    


    if (divlist == 0) {
        //tts
        document.documentElement.lang = 'es';
        let texto=`No hay chat activo`;
        const hablar = (texto) => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(texto))
        }
        hablar(texto)
    }

    if (divlist > ultimoDivList) {
        let penultimo = divlist - 2
        // Emcontrar el nombre
        let elementoPersona = elementoBox[penultimo]
        elementoNombre = elementoPersona.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        elementoChat = elementoPersona.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2]
        console.log(elementoNombre)
        elementoNombre = elementoNombre.textContent
        elementoChat = elementoChat.textContent
        console.log(elementoNombre)        
        console.log(elementoChat)

        //tts
        document.documentElement.lang = 'es';
        let texto=`${elementoNombre} dice: ${elementoChat}`;
        const hablar = (texto) => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(texto))
        }
        hablar(texto)

        ultimoDivList = divlist

    }

    



},1000)
