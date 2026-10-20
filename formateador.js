import { URL_BASE } from "./env.js";
import { solicitar } from "./solicitudes.js";

export async function obtenerPublicacionesUsuario(idUsuario) {
    // Consultar la información del usuario.
    const usuario = await solicitar(`${URL_BASE}/users/${idUsuario}`);

    // Consultar las publicaciones del usuario.
    const publicaciones = await solicitar(
        `${URL_BASE}/posts?userId=${idUsuario}`
    );

    // Consultar los comentarios de todas las publicaciones.
    const posts = await Promise.all(
        publicaciones.map(async (post) => {
            const comentariosAPI = await solicitar(
                `${URL_BASE}/posts/${post.id}/comments`
            );

            // Organizar los comentarios con las propiedades solicitadas.
            const comentarios = comentariosAPI.map((comentario) => ({
                id: comentario.id,
                autor: comentario.name,
                texto: comentario.body
            }));

            // Conservar el post original e integrar sus comentarios.
            return {
                ...post,
                comentarios: comentarios
            };
        })
    );

    // Devolver explícitamente el resultado completo.
    return {
        usuario: usuario.name,
        posts: posts
    };
}