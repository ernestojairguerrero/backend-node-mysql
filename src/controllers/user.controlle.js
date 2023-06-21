const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const pool = require('../db/bd');
const { generarJWT } = require('../helpers/jwt');


const { userSchema, updateUserSchema, userSchemaLogin } = require('../validators/user.validator');

// Iniciar sesión
const loginUser = async (req, res) => {

  const { error, value } = userSchemaLogin.validate(req.body);

  const { email, password } = value;

  const [user] = await pool.query('SELECT * FROM usuarios WHERE status = 1 AND email = ?', [email]);

  console.log(email);

  if (user.length === 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: 'Los datos ingresados son incorrectos',
    });
  }

  try {
    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        status: 400,
        msg: 'Los datos ingresados son incorrectos.',
      });
    }

    // Generar el token
    const token = await generarJWT(user[0].uuid, user[0].name, user[0].last_name, user[0].email);

    return res.status(200).json({
      success: true,
      status: 200,
      msg: 'Inicio de sesión exitoso',
      user: {
        id: user[0].id,
        name: user[0].name,
        last_name: user[0].last_name,
        email: user[0].email,
        uuid: user[0].uuid,

      },
      token: token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      status: 500,
      msg: 'Error al iniciar sesión, de persistir el error contacte al administrador',
      error
    });
  }
};

// Grabar el usuario en la base de datos
const registerUser = async (req, res) => {

  const { error, value } = userSchema.validate(req.body);
  console.log(value);


  if (error) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Error en los datos enviados:',
      error: error,
    });
  }

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(', ');
    return res.status(400).json({
      success: false,
      status: 400,
      msg: 'Error en los datos enviados:',
      error: errorMessage,
    });
  }

  if (value === undefined || value === null) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: 'Error en los datos enviados:',
    });
  }

  // Verificar si el email ya existe en la base de datos
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [value.email]);

  if (rows.length > 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: 'Los datos ingresados son incorrectos.'
    });
  }

  // Generar el uid
  const uuid = uuidv4();

  // Generar el hash de la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(value.password, saltRounds);


  // 
  const avatar = 'src/img/avatar.svg'

  try {
    await pool.query('INSERT INTO usuarios (uuid, name, last_name, email, password, avatar) VALUES (?, ?, ?, ?, ?, ?)', 
      [uuid, value.name, value.last_name, value.email, hashedPassword, avatar]);
  
    return res.status(201).json({
      success: true,
      status: 201,
      msg: 'Usuario creado exitosamente',
    });
  } catch (error) {
    console.error(error);
  
    return res.status(500).json({
      success: false,
      status: 500,
      msg: 'Error al crear el usuario. Por favor, contacta al administrador.',
    });
  }

  
}

// Listar los usuarios
const listUser = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM usuarios');

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'No existen datos para mostrar',
        users: [],
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Usuarios obtenidos correctamente',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al obtener los usuarios',
    });
  }
};

// Actualizar el usuario
const updateUser = async (req, res) => {

  console.log(req.query, "0000000000000")

  const { error, value } = updateUserSchema.validate(req.body);
  const { uuid } = req.query;

  if (error) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Error en los datos enviados:',
      error: error,
    });
  }

  try {
    // Verificar si el usuario existe por email
    const [user] = await pool.query('SELECT * FROM usuarios WHERE uuid = ?', [uuid]);
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Usuario no encontrado',
      });
    }

    // Actualizar el nombre y el correo electrónico del usuario
    await pool.query('UPDATE usuarios SET name = ?, last_name = ?, email=?, password=? WHERE uuid = ?', 
    [value.name, value.last_name, value.name, value.password, uuid]);

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Usuario actualizado correctamente',
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al actualizar el usuario',
      error:e,
    });
  }
};

const desactivarUser = async (req, res) => {
  const { uuid } = req.query;
  console.log(uuid);

  const [user] = await pool.query('SELECT * FROM usuarios WHERE uuid = ?', [uuid]);

  if (user.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: 'El usuario con el id proporcionado no existe',
    });
  }

  await pool.query('UPDATE usuarios SET status = 0 WHERE uuid = ?', [uuid]);

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'El usuario ha sido descativado correctamente',
  });
};

const activarUser = async (req, res) => {
  const { uuid } = req.query;
  console.log(uuid);

  const [user] = await pool.query('SELECT * FROM usuarios WHERE uuid = ?', [uuid]);

  if (user.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: 'El usuario con el id proporcionado no existe',
    });
  }

  await pool.query('UPDATE usuarios SET status = 1 WHERE uuid = ?', [uuid]);

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'El usuario ha sido activado correctamente',
  });
};

module.exports = {
  loginUser,
  registerUser,
  listUser,
  updateUser,
  desactivarUser,
  activarUser
}

