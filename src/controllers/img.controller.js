
const fs = require('fs');

const pool = require('../db/bd');

const image = fs.readFileSync('ruta_de_la_imagen.jpg');

const addAvatar = async (req, res) => {

    const { uuid } = req.body;

    try {

        const [posts] = await pool.query('SELECT * FROM avatar WHERE uuid = ?', );

        if (!posts || posts.length === 0) {
            pool.query(
                'INSERT INTO avatar (uuid, urlAvatar) VALUES (?, ?)',
                [uuid, image]
            );
    
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'Avatar grabado correctamente',
            });
        }

        if (posts.length > 0) {
            pool.query(
                'UPDATE posts SET urlAvatar = ? WHERE uuid = ?',
                [image, uuid]
            );
    
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'Avatar actualizado correctamente',
            });
        }

        

    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'Error al crear el post',
        });
    }
}



module.exports = {
    addAvatar,
}