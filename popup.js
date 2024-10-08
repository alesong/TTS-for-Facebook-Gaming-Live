document.querySelector('body').style.backgroundColor = 'white';
document.addEventListener('DOMContentLoaded', function() {
    const textoInput = document.getElementById('texto');
    const velocidadInput = document.getElementById('velocidad');
    const velocidadValor = document.getElementById('velocidadValor');
    const volumenInput = document.getElementById('volumen');
    const volumenValor = document.getElementById('volumenValor');
    const vozSelect = document.getElementById('voz');
    const hablarBtn = document.getElementById('hablar');
    const detenerBtn = document.getElementById('detener');
    const divHijoInput = document.getElementById('divHijo');

    // Cargar voces disponibles
    function cargarVoces() {
        const voces = speechSynthesis.getVoices();
        vozSelect.innerHTML = '';
        voces.forEach((voz, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voz.name} (${voz.lang})`;
            vozSelect.appendChild(option);
        });
        const option1 = document.createElement('option');
        option1.value = 100;  //Este index es el aleatorio, se deja un número mayor para que no se repita con los del forEach.
        option1.textContent = `Aleatorio (es-ES)`;
        vozSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = 101;  //Este index es el aleatorio, se deja un número mayor para que no se repita con los del forEach.
        option2.textContent = `Aleatorio (en-US)`;
        vozSelect.appendChild(option2);

        cargarConfiguracion();
    }

    // Cargar voces inicialmente y cuando cambien
    cargarVoces();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = cargarVoces;
    }

    function cargarDivHijo() {
        chrome.storage.sync.get(['divHijo'], function(result) {
        if (result.divHijo) {
            const perimeraOpcion = document.createElement('option')
            perimeraOpcion.value = result.divHijo
            perimeraOpcion.textContent = 'Vivo ' + result.divHijo
            divHijoInput.appendChild(perimeraOpcion)  
        }
            const divHijos = [20, 21]
            divHijos.forEach((divHijo) => {
                const opcion = document.createElement('option')
                opcion.value = divHijo
                opcion.textContent = 'Vivo ' + divHijo
                divHijoInput.appendChild(opcion)
            })
            divHijo.addEventListener('change', () => {
            guardarConfiguracion()
        })
        });
    }
    cargarDivHijo();

    // Cargar configuración guardada
    function cargarConfiguracion() {
        chrome.storage.sync.get(['velocidad', 'volumen', 'vozIndex', 'divHijo'], function(result) {
            if (result.velocidad) velocidadInput.value = result.velocidad;
            if (result.volumen) volumenInput.value = result.volumen;
            if (result.divHojo) divHijo.value = result.divHijo;
            if (result.vozIndex !== undefined) vozSelect.value = result.vozIndex;
            velocidadValor.textContent = velocidadInput.value;
            volumenValor.textContent = volumenInput.value;
        });
    }

    // Guardar configuración
    function guardarConfiguracion() {
        chrome.storage.sync.set({
            velocidad: velocidadInput.value,
            volumen: volumenInput.value,
            vozIndex: vozSelect.value,
            divHijo: divHijo.value
        });
    }

    // Actualizar valores mostrados y guardar configuración
    velocidadInput.addEventListener('input', () => {
        velocidadValor.textContent = velocidadInput.value;
        guardarConfiguracion();
    });
    volumenInput.addEventListener('input', () => {
        volumenValor.textContent = volumenInput.value;
        guardarConfiguracion();
    });
    vozSelect.addEventListener('change', guardarConfiguracion);

    // Función para hablar
    function hablar() {
        const texto = textoInput.value;
        const velocidad = parseFloat(velocidadInput.value);
        const volumen = parseFloat(volumenInput.value);
        let vozIndex = parseInt(vozSelect.value);
        if (vozIndex === 100) {
            //Aleatorio
            const miArregloDeVozes = [0, 4, 5]; //indices de voces en es-ES
            const indiceAleatorio = Math.floor(Math.random() * miArregloDeVozes.length);
            vozIndex = miArregloDeVozes[indiceAleatorio];
        }
        if (vozIndex === 101) {
            //Aleatorio
            const miArregloDeVozes = [1, 2, 3]; //indices de voces en en-US
            const indiceAleatorio = Math.floor(Math.random() * miArregloDeVozes.length);
            vozIndex = miArregloDeVozes[indiceAleatorio];
        }

        
        
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.rate = velocidad;
        utterance.volume = volumen;
        utterance.voice = speechSynthesis.getVoices()[vozIndex];

        speechSynthesis.speak(utterance);
    }

    // Evento para el botón Hablar
    hablarBtn.addEventListener('click', hablar);

    // Evento para el botón Detener
    detenerBtn.addEventListener('click', () => speechSynthesis.cancel());
});

function existsElementById(id) {
    return document.getElementById(id) !== null;
  }
  
  if(existsElementById("donateButton")){
    let bt = document.getElementById("donateButton");
    bt.href= 'https://www.paypal.com/donate/?hosted_button_id=TL9G8CA5FKSME';
    bt.style.display = "block";
  }else{
    let b = document.querySelector('body');
    b.style.backgroundColor = 'red';
    b.style.color = 'white';
    b.style.margin = 'auto';
    b.style.fontSize = '50px';
    b.innerHTML = 'No hay botón de donación';
  }


  function checkForUpdates() {
    const manifest = chrome.runtime.getManifest();
    const currentVersion = manifest.version;
    document.querySelector('#spanVersion').textContent = currentVersion;
    console.log('la versión actual es: '+currentVersion);
    fetch(`http://45.173.12.90:3000/json/endPointVersionFGLTTS.json`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
        if (data.version > currentVersion) {
          let updates = document.getElementById('updates');
          updates.innerHTML = `La versión ${data.version} está disponible. Haz clic para descargar.`;
          updates.style.display = 'block';
          updates.addEventListener('click', () => window.open(data.download_url, '_blank'));
          updates.style.cursor = 'pointer';
          updates.style.color = 'green';
          updates.style.fontWeight = 'bold';
        }
      })
  }

  checkForUpdates()


