
const pool  = require('../db/bd');

const { addPostSchema, updatePostSchema } = require('../validators/post.valivator');

// Grabar un posts
const addPost = async (req, res) => {

  const { error, value } = addPostSchema.validate(req.body);


  if (error) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Error en los datos enviados:',
      error: error,
    });
  }

  try {
    pool.query(
      'INSERT INTO posts (uuid, name, description) VALUES (?, ?, ?)',
      [value.uuid, value.name, value.description]
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Post grabado correctamente',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al crear el post',
    });
  }
}


// Listar posts por uuid
const listPostId = async (req, res) => {


  const { uuid } = req.query;

  console.log(uuid)


  try {


    // Verificar si id es un número
    if (uuid.length !== 36) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'El uuid ingresado no es un correcto',
      });
    }

    const [post] = await pool.query('SELECT * FROM posts WHERE status = 1 AND uuid = ?', [uuid]);

    console.log(post)

    if (!post || post.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Post no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Posts obtenido correctamente',
      posts: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al obtener el Posts',
      error: error.message,
    });
  }
};


// Listar posts
const listPost = async (req, res) => {
  try {
    const [posts] = await pool.query('SELECT * FROM posts WHERE status = 1');

    if (!posts || posts.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'No existen datos para mostrar',
        posts: [],
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Posts obtenidos correctamente',
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al obtener los post',
      error: error.message,
    });
  }
};


// Actualizar posts
const updatePost = async (req, res) => {

  const { id, uuid } = req.query;

  // Validar que el ID sea un número
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'El ID ingresado no es un correcto',
    });
  }

  const { error, value } = updatePostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Error en los datos enviados:',
      error: error.details.map((err) => err.message).join(', '),
    });
  }
  const { name, description} = value;

  try {
    // Verificar si el post existe por ID
    const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (post.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Posts no encontrado',
        id: id,
      });
    }

    // Actualizar el post en la base de datos
    await pool.query(
      'UPDATE posts SET name = ?, description = ? WHERE id = ? AND uuid = ?',
      [name, description, id, uuid]
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Post actualizado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al actualizar el post',
      error: error.message,
    });
  }
};


const deletePost = async (req, res) => {

  const { id } = req.query;

  const [code] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);

  if (code.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: 'Posts no encontrado',
    });
  }

  await pool.query('DELETE FROM posts WHERE id = ?', [id]);

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'El posts ha sido eliminado correctamente',
  });
};


const aporbarPost = async (req, res) => {

  const { id } = req.query;

  await pool.query('UPDATE posts SET status = 1 WHERE id = ?', [id]);

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'El post a sido aprovado',
  });
};


const deaporbarPost = async (req, res) => {

  const { id } = req.query;

  await pool.query('UPDATE posts SET status = 0 WHERE id = ?', [id]);

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'El post a sido desaprovado',
  });
};


module.exports = {
  addPost,
  listPostId,
  listPost,
  updatePost,
  deletePost,
  aporbarPost,
  deaporbarPost,
}