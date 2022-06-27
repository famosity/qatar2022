import jwt from "jsonwebtoken";

const generarJWT = (id,username) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            username
        }

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error al generar el token');
            } 
            resolve(token);
        })
    });
}

const verificarJWT = (token) => {
    return new Promise((resolve, reject) => {
        
        jwt.verify(token, process.env.SECRET_JWT_SEED, (err, decoded) => {
            if (err) {
                console.log(err);
                reject('Error al verificar el token');
            } 
            resolve(decoded);
        })
    });
}

export {generarJWT, verificarJWT};