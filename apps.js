/* ======================================
   CONFIGURACIÓN JITSI
====================================== */

const APP_ID =
"vpaas-magic-cookie-3734582b14db4076a2f4ae0215aeb8db";

const DOMINIO = "8x8.vc";


/* ======================================
   ELEMENTOS
====================================== */

const pantallaProfesor =
document.getElementById("pantallaProfesor");

const pantallaEstudiante =
document.getElementById("pantallaEstudiante");

const resultadoClase =
document.getElementById("resultadoClase");

const codigoClase =
document.getElementById("codigoClase");

const linkClase =
document.getElementById("linkClase");

const nombreClase =
document.getElementById("nombreClase");

const jaasContainer =
document.getElementById("jaas-container");


/* ======================================
   DETECTAR URL
====================================== */

const parametros =
new URLSearchParams(window.location.search);

const salaURL =
parametros.get("sala");


/* ======================================
   SI EXISTE UNA SALA
====================================== */

if (salaURL) {

    pantallaProfesor.classList.add("oculto");

    pantallaEstudiante.classList.remove("oculto");

    nombreClase.textContent = salaURL;

}


/* ======================================
   GENERAR CLASE
====================================== */

const btnGenerar =
document.getElementById("btnGenerar");

if (btnGenerar) {

    btnGenerar.addEventListener("click", () => {

        const materia =
        document
        .getElementById("materia")
        .value
        .trim()
        .toUpperCase();

        const curso =
        document
        .getElementById("curso")
        .value
        .trim()
        .toUpperCase();

        if (!materia || !curso) {

            alert(
                "Ingrese la materia y el curso."
            );

            return;
        }

        const sala =
        `${materia}-${curso}`;

        const enlace =
        `${window.location.origin}${window.location.pathname}?sala=${encodeURIComponent(sala)}`;

        /*para qr*/
        const qrContainer =
        document.getElementById("qrcode");

        qrContainer.innerHTML = "";

        new QRCode(qrContainer,{
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

const btnCopiar =
document.getElementById("btnCopiar");

if (btnCopiar) {

    btnCopiar.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                linkClase.value
            );

            alert(
                "Enlace copiado correctamente."
            );

        } catch {

            linkClase.select();

            document.execCommand("copy");

            alert(
                "Enlace copiado."
            );
        }

    });

}


/* ======================================
   ENTRAR A CLASE
====================================== */

const btnEntrar =
document.getElementById("btnEntrarClase");

if (btnEntrar) {

    btnEntrar.addEventListener("click", () => {

        const nombre =
        document
        .getElementById("nombreEstudiante")
        .value
        .trim();

        if (!nombre) {

            alert(
                "Escriba su nombre."
            );

            return;
        }

        iniciarClase(
            salaURL,
            nombre
        );

    });

}


/* ======================================
   INICIAR JITSI
====================================== */

function iniciarClase(
    sala,
    nombre
) {

    pantallaEstudiante.style.display =
    "none";

    pantallaProfesor.style.display =
    "none";

    jaasContainer.style.display =
    "block";

    const roomName =
    `${APP_ID}/${sala}`;

    const api =
    new JitsiMeetExternalAPI(
        DOMINIO,
        {
            roomName: roomName,

            parentNode:
            document.querySelector(
                "#jaas-container"
            ),

            userInfo: {
                displayName: nombre
            },

            configOverwrite: {

                prejoinPageEnabled: false,

                startWithAudioMuted: true,

                startWithVideoMuted: true
            },

            interfaceConfigOverwrite: {

                SHOW_JITSI_WATERMARK: false
            }
        }
    );

}


/* ======================================
   MENSAJE CONSOLA
====================================== */

console.log(
    "Aula Virtual Simona Manzaneda cargada correctamente."
);
/* ======================================
   BOTON PARA INGRESAR PROFESOR
====================================== */
const btnEntrarProfesor =
document.getElementById("btnEntrarProfesor");

if(btnEntrarProfesor){

    btnEntrarProfesor.addEventListener("click",()=>{

        const enlace =
        document.getElementById("linkClase").value;

        window.location.href = enlace;

    });

}
