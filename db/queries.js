const pool = require("./pool");

async function getAllSucculents() {
    const { rows } = await pool.query("SELECT * FROM succulents ORDER BY name");
    return rows;
}

module.exports = {
    getAllSucculents,
    
}