const pool = require("./pool");

async function getAllSucculents() {
    const { rows } = await pool.query("SELECT * FROM succulents ORDER BY name");
    return rows;
}

async function getSucculent(id) {
    const { rows } = await pool.query("SELECT * FROM succulents WHERE id = ($1)", [id]);
    return rows[0];
}

module.exports = {
    getAllSucculents,
    getSucculent,

}