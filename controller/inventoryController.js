const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
require('dotenv/config');

const validatePassword = body('password-input')
    .custom(value => {
        if (value !== process.env.DELETE_PASSWORD) {
            throw new Error('Invalid password');
        }
        return true;
    });

async function succulentsHomepageGet(req, res) {
    const succulents = await db.getAllSucculents();
    res.render('index', {
        title: 'Available Succulents',
        succulents: succulents,
        errors: [],
        failedId: null,
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

async function deleteSucculentPost(req, res) {
    const errs = validationResult(req);
    const id = req.params.id;
    if (!errs.isEmpty()) {
        const succulents = await db.getAllSucculents();
        return res.status(400).render('index', {
            title: 'Available Succulents',
            succulents: succulents,
            errors: errs.array(),
            failedId: id,
        });
    }

    await db.deleteSucculent(id);
    res.redirect('/');
}

module.exports = {
    succulentsHomepageGet,
    viewSucculentInfoGet,
    deleteSucculentPost,
    validatePassword,

}