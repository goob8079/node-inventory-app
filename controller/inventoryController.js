const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
require('dotenv/config');

const alphErr = 'must only contain letters!';
const lenErr = 'must be between 1 and 30 characters!';

const validateDeletePassword = body('delete-password')
    .custom(value => {
        if (value !== process.env.DELETE_PASSWORD) {
            throw new Error('Invalid password');
        }
        return true;
    });

const validatePlantPassword = body('plant-password')
    .custom(value => {
        if (value !== process.env.ADD_PLANT_PASSWORD) {
            throw new Error('Invalid password');
        }
        return true;
    })

const validatePlant = [
    body('plant-name').trim()
        .matches(/^[a-zA-Z_]+$/).withMessage(`Plant name ${alphErr}`)
        .isLength({ min: 1, max: 40 }).withMessage(`Plant name ${lenErr}`),
    body('plant-species').trim()
        .matches(/^[a-zA-Z_]+$/).withMessage(`Species ${alphErr}`)
        .isLength({ min: 1, max: 40 }).withMessage(`Species ${lenErr}`),
    body('plant-genus').trim()
        .matches(/^[a-zA-Z_]+$/).withMessage(`Genus ${alphErr}`)
        .isLength({ min: 1, max: 40 }).withMessage(`Genus ${lenErr}`),
    body('plant-price').trim()
        .isFloat({ min: 0 }).withMessage('Price must be greater than 0!'),
    body('plant-description').trim()
        .isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters!'),
];

async function succulentsHomepageGet(req, res) {
    const sort = req.query.categories || 'name'; // set name as default value
    const succulents = await db.orderPlants(sort);
    res.render('index', {
        title: 'Available Succulents',
        succulents: succulents,
        selected: sort, // to keep dropdown item selected
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

async function newPlantGet(req, res) {
    res.render('newPlant', {
        title: 'Add a new plant to the inventory',
        errors: [],
        old: {},
    });
}

async function newPlantPost(req, res) {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).render('newPlant', {
            title: 'Add a new plant to the inventory',
            errors: errs.array(),
            old: req.body,
        });
    }

    res.send('Hello');
}

module.exports = {
    succulentsHomepageGet,
    viewSucculentInfoGet,
    deleteSucculentPost,
    newPlantGet,
    newPlantPost,
    validateDeletePassword,
    validatePlantPassword,
    validatePlant,
}