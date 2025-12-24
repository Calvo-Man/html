const emojis = ["🎄","⭐","❄️","🎁","🔔"];

    function comenzar() {
      document.getElementById("inicio").style.display = "none";
      document.getElementById("contenido").style.display = "block";
      document.getElementById("musica").play();

      escribirMensaje();
      setInterval(crearConfeti, 280);
    }

    function crearConfeti() {
      const c = document.createElement("div");
      c.className = "confetti";
      c.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.fontSize = 14 + Math.random() * 28 + "px";
      c.style.animationDuration = 4 + Math.random() * 4 + "s";
      document.body.appendChild(c);

      setTimeout(() => c.remove(), 9000);
    }

    const christmasTexto =
      "Merry Christmas 🎄\n" +
      "Que hoy tengas paz,\n" +
      "risas sinceras\n" +
      "y momentos bonitos.\n\n";

    const christmasVersiculo =
      "“Porque nos ha nacido un niño,\nse nos ha concedido un hijo.” ✝️\nIsaías 9:6";

    function escribirVersiculo(texto, contenedor, callback) {
      let i = 0;
      contenedor.innerHTML = "";

      const intervalo = setInterval(() => {
        contenedor.innerHTML += texto.charAt(i);
        i++;

        if (i >= texto.length) {
          clearInterval(intervalo);
          if (callback) callback();
        }
      }, 45);
    }

    function escribirMensaje() {
      const cont = document.getElementById("versiculo");

      escribirVersiculo(christmasTexto, cont, () => {
        setTimeout(() => {
          escribirVersiculo(christmasVersiculo, cont, () => {
            cont.innerHTML = `<strong>${cont.innerHTML}</strong>`;
            if (navigator.vibrate) navigator.vibrate([100, 60, 100]);
          });
        }, 600);
      });
    }