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

async function addPlant(name, species, genus, description) {
    await pool.query("INSERT INTO succulents (name, species, genus, description) VALUES ($1, $2, $3, $4)", [name, species, genus, description]);
}

async function orderPlants(category) {
    const allowed = ['name', 'species', 'genus', 'price'];
    if (!allowed.includes(category)) {
        category = 'name';
    }

    const { rows } = await pool.query(`SELECT * FROM succulents ORDER BY ${category}`);
    return rows;
}

module.exports = {
    getAllSucculents,
    getSucculent,
    deleteSucculent,
    addPlant,
    orderPlants,
}