let contenedor = document.querySelector('#content')
contenedor.innerHTML = `Hola mundo`
let n=0
setInterval(() => {
    let array = localStorage.getItem("array");
    if (array == null) {
        contenedor.innerHTML = `cookie vacia`   
    }
    contenedor.innerHTML = `Hola mundo ${n++} ${array.length}`
},1000)