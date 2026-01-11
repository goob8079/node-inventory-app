const db = require("../db/queries");

async function succulentsHomepageGet(req, res) {
    const succulents = await db.getAllSucculents();
    res.render('index', {
        title: 'Available Succulents',
        succulents: succulents,
    });
}

module.exports = {
    succulentsHomepageGet,

}