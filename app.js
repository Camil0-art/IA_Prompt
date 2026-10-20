import { obtenerPublicacionesUsuario } from "./index.js";

async function iniciar() {
    try {
        const respuesta = await obtenerPublicacionesUsuario(1);

        console.log(JSON.stringify(respuesta, null, 2));
    } catch (error) {
        console.error("No se pudo ejecutar el programa:", error.message);
    }
}
iniciar();