export async function solicitar(url) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    return await respuesta.json();
}