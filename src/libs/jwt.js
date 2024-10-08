// import jwt from 'jsonwebtoken'
// import { TOKEN_SECRET } from "../config.js";

// export function createAccessToken(payload) {
//     return new Promise((resolve, reject) => {
//         jwt.sign(
//             payload,
//             TOKEN_SECRET,
//             {},
//             (err, token) => {
//                 if (err) reject(err);
//                 resolve(token)
//                 //res.json({token}); // para devolver el token
//             }
//         );
//     });
// }

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: '1h' }, // Añadir expiración de 1 hora
            (err, token) => {
                if (err) {
                    console.error('Error al generar el token:', err);
                    return reject(err); // Rechazar si hay error
                }
                resolve(token); // Resolver con el token
            }
        );
    });
}
