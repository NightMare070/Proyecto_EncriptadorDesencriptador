let mensajeUsuario = "";
let mensajeFinal = "";

let dict = new Map();

dict.set('a','ai');
dict.set('e','enter');
dict.set('i','imes');
dict.set('o','ober');
dict.set('u','ufat');

function mostrarMensaje(elemento, mensajeFinal) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = mensajeFinal;
    return;
}

function limpiarTexto(elemento) {
    let elementoHTML = document.querySelector(elemento);
    mensajeFinal = "";
    elementoHTML.innerHTML = mensajeFinal;
    return;
}

function obtenerTexto(elemento, idElemento) {
    let elementoHTML = document.querySelector(elemento);
    mensajeUsuario = (elementoHTML.value).toString();
    let verificacion = verificarMensaje(mensajeUsuario);

    if (verificacion == true) {
        if (idElemento == 'Encriptar') {
            encriptar(mensajeUsuario);
        } else if (idElemento == 'Desencriptar'){
            desencriptar(mensajeUsuario);
        }
    } else {
        limpiarTexto('p');
    }

    return mensajeUsuario;
}

async function copiarTexto(elemento) {
    let elementoHTML = document.querySelector(elemento);
    try {
        await navigator.clipboard.writeText(elementoHTML.innerText);
        console.log('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto al portapapeles: ', err);
    }
}

function verificarMensaje(mensajeUsuario) {
    var patron = /^[a-zñ\s]+$/;

    if (patron.test(mensajeUsuario)) {
        return true;
    } else {
        window.alert('El mensaje no es válido');
        return false;
    }
}

function encriptar(mensajeUsuario){
    limpiarTexto('p');

    for (let i = 0; i < mensajeUsuario.length; i++) {
        let caracter = mensajeUsuario[i];
        let reemplazo = dict.get(caracter);
        if (reemplazo !== undefined) {
            mensajeFinal += reemplazo;
        } else {
            mensajeFinal += caracter;
        }
    }

    mostrarMensaje('p', mensajeFinal);
    return mensajeFinal;
}

function desencriptar(mensajeUsuario){
    limpiarTexto('p');

    let valoresDict = Array.from(dict.values());
    let i = 0;

    while (i < mensajeUsuario.length) {
        let segmentoEncontrado = false;
        for (let valor of valoresDict) {
            let segmento = mensajeUsuario.substr(i, valor.length);
            if (segmento === valor) {
                let claveOriginal = [...dict.entries()]
                    .find(([key, val]) => val === segmento)?.[0];
                mensajeFinal += claveOriginal;
                i += valor.length;
                segmentoEncontrado = true;
                break;
            }
        }
        if (!segmentoEncontrado) {
            mensajeFinal += mensajeUsuario[i];
            i++;
        }
    }

    mostrarMensaje('p', mensajeFinal);
    return mensajeFinal;
}