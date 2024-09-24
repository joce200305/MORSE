const codigoMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': ' '
};

const inversoMorse = Object.fromEntries(
    Object.entries(codigoMorse).map(([clave, valor]) => [valor, clave])
);

const entradaTexto = document.getElementById('textInput');
const salidaMorse = document.getElementById('morseInput');
const notificacionError = document.getElementById('error');
const esTextoValido = (cadena) => /^[A-Z0-9\s]+$/.test(cadena.trim());
const esMorseValido = (morse) => /^[.\-\s]+$/.test(morse.trim());

const transformarAMorse = () => {
    const textoTransformar = entradaTexto.value.toUpperCase().trim();
    if (!textoTransformar || !esTextoValido(textoTransformar)) {
        notificacionError.textContent = 'El texto ingresado no es válido. Usa solo letras, números y espacios.';
        return;
    }
    const morseResultante = textoTransformar.split('').map(char => codigoMorse[char] || '').join(' ');
    salidaMorse.value = morseResultante;
    notificacionError.textContent = '';
};

const transformarATexto = () => {
    const morseTransformar = salidaMorse.value.trim();
    if (!morseTransformar || !esMorseValido(morseTransformar)) {
        notificacionError.textContent = 'El código morse ingresado no es válido (solo ".", "-" y espacios).';
        return;
    }
    
    const textoResultante = morseTransformar.split('   ') 
        .map(palabra => palabra.split(' ') 
        .map(codigo => inversoMorse[codigo] || '').join('')) 
        .join(' '); 
    entradaTexto.value = textoResultante;
    notificacionError.textContent = '';
};

document.getElementById('toMorse').addEventListener('click', transformarAMorse);
document.getElementById('toText').addEventListener('click', transformarATexto);
