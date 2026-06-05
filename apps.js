
/* ======================================
   ELEMENTOS
====================================== */

const pantallaProfesor = document.getElementById("pantallaProfesor");
const pantallaEstudiante = document.getElementById("pantallaEstudiante");

const resultadoClase = document.getElementById("resultadoClase");
const codigoClase = document.getElementById("codigoClase");
const linkClase = document.getElementById("linkClase");
const nombreClase = document.getElementById("nombreClase");

/*const jaasContainer = document.getElementById("jaas-container");*/

/* ======================================
   DETECTAR SALA EN URL
====================================== */

const parametros = new URLSearchParams(window.location.search);
const salaURL = parametros.get("sala") || null;

/* ======================================
   MOSTRAR ESTUDIANTE SI HAY SALA
====================================== */

if (salaURL) {
    pantallaProfesor.classList.add("oculto");
    pantallaEstudiante.classList.remove("oculto");
    nombreClase.textContent = salaURL;
}

/* ======================================
   GENERAR CLASE
====================================== */

const btnGenerar = document.getElementById("btnGenerar");

if (btnGenerar) {

    btnGenerar.addEventListener("click", () => {

        const materia = document.getElementById("materia").value.trim().toUpperCase();
        const curso = document.getElementById("curso").value.trim().toUpperCase();

        if (!materia || !curso) {
            alert("Ingrese la materia y el curso.");
            return;
        }

        /* 🔥 SALA MÁS SEGURA Y ÚNICA */
        const idUnico = Math.random().toString(36).substring(2, 7).toUpperCase();
        const sala = `${materia}-${curso}-${idUnico}`;

        const enlace = `${window.location.origin}${window.location.pathname}?sala=${encodeURIComponent(sala)}`;

        /* QR */
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: enlace,
            width: 220,
            height: 220
        });

        resultadoClase.classList.remove("oculto");
        codigoClase.textContent = sala;
        linkClase.value = enlace;
    });
}

/* ======================================
   COPIAR ENLACE
====================================== */

const btnCopiar = document.getElementById("btnCopiar");

if (btnCopiar) {

    btnCopiar.addEventListener("click", async () => {

        try {
            await navigator.clipboard.writeText(linkClase.value);
            alert("Enlace copiado correctamente.");
        } catch {
            linkClase.select();
            document.execCommand("copy");
            alert("Enlace copiado.");
        }

    });
}

/* ======================================
   ENTRAR A CLASE (ESTUDIANTE)
====================================== */

const btnEntrar = document.getElementById("btnEntrarClase");

if (btnEntrar) {

    btnEntrar.addEventListener("click", () => {

        const nombre = document.getElementById("nombreEstudiante").value.trim();

        if (!nombre) {
            alert("Escriba su nombre.");
            return;
        }

        if (!salaURL) {
            alert("No hay una clase activa.");
            return;
        }

        iniciarClase(salaURL, nombre);
    });
}

/* ======================================
   INICIAR VIDEOLLAMADA (JITSI / 8x8)
====================================== */

/*function iniciarClase(sala, nombre) {

    /* cerrar sesión anterior si existe */
    /*if (apiJitsi) {*/
        /*apiJitsi.dispose();*/
        /*apiJitsi = null;*/
    /*}*/
function iniciarClase(sala, nombre) {

    const url =
        `https://meet.jit.si/${encodeURIComponent(sala)}` +
        `#userInfo.displayName="${encodeURIComponent(nombre)}"` +
        `&config.disableDeepLinking=true`;

    window.open(url, "_blank");

}

/* ======================================
   ENTRAR PROFESOR A CLASE
====================================== */

const btnEntrarProfesor = document.getElementById("btnEntrarProfesor");

if (btnEntrarProfesor) {

    btnEntrarProfesor.addEventListener("click", () => {

        const enlace = document.getElementById("linkClase").value;

        if (!enlace) {
            alert("Primero genere una clase.");
            return;
        }

        window.open(enlace, "_blank");
    });
}

/* ======================================
   LOG
====================================== */

console.log("Aula Virtual cargada correctamente 🚀");

/* ======================================
  PARA ADVERTENCIA
====================================== */

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modalAdvertencia");
  const btnCerrar = document.getElementById("btnCerrarModal");
  const btnGenerar = document.getElementById("btnGenerar");

  // 👉 abrir modal SOLO al crear clase
  btnGenerar.addEventListener("click", function (e) {
    e.preventDefault(); // evita cualquier acción rara
    modal.style.display = "block";
  });

  // 👉 cerrar modal
  btnCerrar.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // 👉 cerrar si hacen clic fuera del cuadro
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});
