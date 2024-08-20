const shift = 3; // Desplazamiento para el cifrado César

function caesarCipher(str, shift) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char.match(/[a-z]/)) { // Solo aplica el cifrado a letras minúsculas
      let code = str.charCodeAt(i);
      let shifted = ((code - 97 + shift) % 26) + 97;
      result += String.fromCharCode(shifted);
    } else {
      result += char; // No cifra caracteres que no sean letras minúsculas
    }
  }
  return result;
}

function validotexto(text) {
  const mayusculas = /[A-Z]/.test(text);
  const acentos = /[áéíóúüÁÉÍÓÚÜ]/.test(text);

  return !(mayusculas || acentos);
}

function encriptartexto() {
  const originaltexto = document.getElementById('texto').value;

  if (!validotexto(originaltexto)) {
    alert("No colocar mayúsculas ni acentos, todo debe estar en minúsculas.");
    return;
  }

  const textoencriptado = caesarCipher(originaltexto, shift);
  document.getElementById('textoen').value = textoencriptado;
  habilitarbotondes(); 
}

function desencriptartexto() {
  const textoencriptado = document.getElementById('texto').value;
  const textoDesencriptado = document.getElementById('textoen').value;

  if (textoencriptado.length === 0 || textoDesencriptado.length > 0) {
    alert('No puedes desencriptar si uno de los campos está vacío o si el campo desencriptado ya tiene datos.');
    return;
  }

  const textodescriptado = caesarCipher(textoencriptado, -shift);
  document.getElementById('textoen').value = textodescriptado;
}


function copiar() {
  const textoenElemento = document.getElementById('textoen');
  const textoencriptado = textoenElemento.value;

  navigator.clipboard.writeText(textoencriptado).then(() => {
    document.getElementById('texto').value = '';
    document.getElementById('textoen').value = '';

    const message = document.getElementById('mensaje');
    message.textContent = '¡Mensaje copiado!';
    message.style.display = 'block';

    setTimeout(() => {
      message.style.display = 'none';
    }, 2000);

    habilitarbotondes();
  }).catch(err => {
    console.error('Error al copiar al portapapeles: ', err);
  });
}

function habilitarbotondes() {
  const textoencriptadoo = document.getElementById('texto').value;
  const botondes = document.getElementById('des');

  if (textoencriptadoo.length > 0) {
    botondes.classList.remove('btn-secondary');
    botondes.classList.add('btn-danger');
    botondes.disabled = false;
  } else {
    botondes.classList.remove('btn-danger');
    botondes.classList.add('btn-secondary');
    botondes.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  habilitarbotondes();
});

document.getElementById('texto').addEventListener('input', function () {
  habilitarbotondes();
});
