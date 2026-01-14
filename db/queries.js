const pool = require("./pool");

async function getAllSucculents() {
    const { rows } = await pool.query("SELECT * FROM succulents ORDER BY name");
    return rows;
}

async function getSucculent(id) {
    const { rows } = await pool.query("SELECT * FROM succulents WHERE id = ($1)", [id]);
    return rows[0];
}

async function deleteSucculent(id) {
    await pool.query("DELETE FROM succlents WHERE id = ($1)", [id]); 
}

module.exports = {
    getAllSucculents,
    getSucculent,
    deleteSucculent,
}