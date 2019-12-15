const router = require('express').Router();
let Class = require('../models/class.model');

router.route('/').get((req, res) => {
    Class.find()
        .then(classes => res.json(classes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const className = req.body.className;
    const prof = req.body.prof;
    const term = req.body.term;
    const description = req.body.description;

    console.log(req.body);

    const newClass = new Class({
        className,
        prof,
        term,
        description
    });

    newClass.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;