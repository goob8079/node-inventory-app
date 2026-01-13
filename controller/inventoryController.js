const db = require("../db/queries");

async function succulentsHomepageGet(req, res) {
    const succulents = await db.getAllSucculents();
    res.render('index', {
        title: 'Available Succulents',
        succulents: succulents,
    });
}

async function viewSucculentInfoGet(req, res) {
    const id = req.params.id;
    const succulent = await db.getSucculent(id);
    if (!succulent) {
        return res.status(404).send('Succulent not found!');
    }

    res.render('succulent', {
        title: succulent.name,
        s: succulent,
    })
}

module.exports = {
    succulentsHomepageGet,
    viewSucculentInfoGet,
    
}