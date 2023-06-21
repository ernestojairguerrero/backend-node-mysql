
const jwt = require('jsonwebtoken');

const generarJWT = (uid, name, email) => {
  return new Promise((resolve, reject) => {

    const payload = { uid, name, email };
    console.log(payload);

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el TOKEN', err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = {
  generarJWT
}