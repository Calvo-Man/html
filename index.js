// 🎉 confeti
const emojis = ["🎉", "🎊", "✨", "💖", "🎈"];
function crearConfeti() {
  const c = document.createElement("div");
  c.className = "confetti";

  c.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  c.style.left = Math.random() * 100 + "vw";
  c.style.animationDuration = 4 + Math.random() * 5 + "s";
  c.style.fontSize = 14 + Math.random() * 40 + "px";

  document.body.appendChild(c);
  setTimeout(() => c.remove(), 9000);
}

function iniciarEmojiRebelde() {
  const rebelde = document.getElementById("emojiRebelde");
  const msg = document.getElementById("msgRebelde");

  rebelde.style.display = "block";
  rebelde.innerText = "🎂";
  msg.innerText = "Intenta tocarme 🎂";
  msg.style.display = "block";

  let atrapado = false;
  let velocidad = 800; // ms entre movimientos
  let movimiento;

  function mover() {
    if (atrapado) return;

    const x = Math.random() * 70 + 10;
    const y = Math.random() * 60 + 10;

    rebelde.style.transition = "all 0.4s linear"; // más nervioso

    rebelde.style.left = x + "vw";
    rebelde.style.top = y + "vh";
  }

  function iniciarMovimiento() {
    mover();
    movimiento = setInterval(mover, velocidad);
  }

  function acelerar() {
    if (atrapado) return;

    velocidad = 500;
    clearInterval(movimiento);
    iniciarMovimiento();

    rebelde.innerText = "🏃‍♂️";
    msg.innerText = "jajaja casi 😜";

    if (navigator.vibrate) navigator.vibrate(40);

    setTimeout(() => {
      rebelde.innerText = "🎂";
      velocidad = 1200;
      clearInterval(movimiento);
      iniciarMovimiento();
    }, 800);
  }

  function atrapar() {
    if (atrapado) return;
    atrapado = true;

    clearInterval(movimiento);

    rebelde.innerText = "😵‍💫";
    rebelde.style.transform = "scale(1.6)";
    rebelde.style.transition = "all 0.3s ease";

    msg.innerText = "ok ok… ya 😵‍💫";

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    setTimeout(() => {
      rebelde.style.display = "none";
      msg.innerText = "Eh… Tengo 30k para la torta 🎂";
    }, 1400);
  }

  // 📱 apenas acercas el dedo → acelera
  rebelde.addEventListener("touchstart", acelerar, { passive: true });

  // 🖱️ desktop
  rebelde.addEventListener("mouseenter", acelerar);

  // 🎯 si logran tocarlo
  rebelde.addEventListener("click", atrapar);

  iniciarMovimiento();
}

// 🎵 música
let musicaOn = false;
function iniciarMusica() {
  if (musicaOn) return;
  const m = document.getElementById("musica");
  m.play().catch(() => {});
  musicaOn = true;
}

// ✍️ TEXTO QUE SE ESCRIBE SOLO
const lineas = [
  { texto: "Hoy es tu día 🙂 ", efecto: "salta" },
  { texto: "y eso ya es una buena razón para sonreír", efecto: "" },
  { texto: "Gracias por estar, por sumar ", efecto: "tiembla" },
  { texto: "y por hacer los días más divertidos", efecto: "" },
  { texto: "Que este nuevo año te regale ", efecto: "salta" },
  { texto: "momentos tranquilos y muchas risas 😄", efecto: "tiembla" },
];

let lineaActual = 0;
let charActual = 0;

function escribirTexto() {
  if (lineaActual >= lineas.length) {
    setTimeout(finalFalso, 1500);
    iniciarEmojiRebelde();

    return;
  }

  const contenedor = document.getElementById("textoEscribiendo");
  const tic = document.getElementById("tic");
  const linea = lineas[lineaActual].texto;
  const efecto = lineas[lineaActual].efecto;

  if (charActual < linea.length) {
    const letra = linea.charAt(charActual);
    contenedor.innerHTML += letra;

    if (letra !== " ") {
      tic.currentTime = 0;
      tic.play().catch(() => {});
    }

    charActual++;
    setTimeout(escribirTexto, 40);
  } else {
    contenedor.innerHTML += `<span class="${efecto}">\n\n</span>`;
    lineaActual++;
    charActual = 0;
    setTimeout(escribirTexto, 500);
    tic.pause();
  }
}
const versiculo =
  "“Que el Señor te bendiga y te guarde; que haga resplandecer su rostro sobre ti.” ✝️ 1 Corintios 1:30";
function escribirVersiculo(texto, contenedor, callback) {
  let i = 0;
  contenedor.innerHTML = "";

  const intervalo = setInterval(() => {
    contenedor.innerHTML += texto.charAt(i);
    i++;

    if (i >= texto.length) {
      clearInterval(intervalo);

      // poner en negrita TODO al final
      contenedor.innerHTML = `<strong>${contenedor.innerHTML}</strong>`;

      if (callback) callback();
    }
  }, 45);
}

function finalFalso() {
  const contenedor = document.getElementById("textoEscribiendo");

  const falso = document.createElement("div");
  falso.innerText = "…";
  falso.style.fontSize = "16px";
  falso.style.marginTop = "10px";
  contenedor.appendChild(falso);

  setTimeout(() => {
    falso.innerText = "Ah… espera 👀";
  }, 2400);

  setTimeout(() => {
    falso.innerText = "Una cosa más 🤔";
  }, 2400);



  setTimeout(() => {
    falso.innerText = ""; // limpia
  }, 3000);

  setTimeout(() => {
    escribirVersiculo(versiculo, falso, () => {
      setTimeout(() => {
        falso.innerHTML += "<br><br><strong>Feliz cumpleaños 🎉</strong>";
        for (let i = 0; i < 25; i++) crearConfeti();
        vibrarFinal();
      }, 800);
    });
  }, 3200);
}

// 🚀 botón inicial
function comenzarFiesta() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenido").style.display = "block";
  iniciarMusica();
  setInterval(crearConfeti, 250);
  setInterval(nombreReactivo, 4000);
  escribirTexto();
}

let lastShake = 0;

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", (e) => {
    const acc = e.accelerationIncludingGravity;
    const fuerza = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);

    if (fuerza > 25 && Date.now() - lastShake > 1500) {
      lastShake = Date.now();

      for (let i = 0; i < 15; i++) crearConfeti();
      document.getElementById("shakeMsg").style.display = "block";

      setTimeout(() => {
        document.getElementById("shakeMsg").style.display = "none";
      }, 2000);
    }
  });
}
function nombreReactivo() {
  const nombre = document.querySelector(".nombre");
  nombre.style.color = "#845ec2";
  nombre.innerText = "✨ Yiseth ✨";

  if (navigator.vibrate) navigator.vibrate(120);

  setTimeout(() => {
    nombre.style.color = "#ff4d6d";
    nombre.innerText = "Yiseth";
  }, 1500);
}

function vibrarFinal() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 400]);
  }

  const oculto = document.createElement("div");
  oculto.innerText = "¿Qué vas a hacer hoy? 🤔";
  oculto.style.fontSize = "16px";
  oculto.style.marginTop = "10px";
  oculto.style.color = "#6a0572";

  document.getElementById("textoEscribiendo").appendChild(oculto);
}
