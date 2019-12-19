const router = require('express').Router();
let Classes = require('../models/class.model');

router.route('/').get((req, res) => {
    Classes.find()
        .then(classes => res.json(classes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const className = req.body.className;
    const prof = req.body.prof;
    const term = req.body.term;
    const description = req.body.description;


    console.log(req.body);

    const newClass = new Classes({
        className,
        prof,
        term,
        description,
    });

    newClass.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Classes.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Classes.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Classes.findById(req.params.id)
        .then(cl => {
            cl.className = req.body.className;
            cl.prof = req.body.prof;
            cl.term = req.body.term;
            cl.description = req.body.description;
            cl.questions = req.body.questions;

            cl.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/question/add/:id').post((req, res) => {
    console.log(req.params.id);
    console.log(req.body.question);
    Classes.updateOne(
            {_id: req.params.id},
            {$push: {questions:req.body.question}}
        )
        .then(() => res.json('question added'))
        .catch(err => res.status(400).json('Error: ' + err)
    );
});

router.route('/answers/add/:id/:questionId').post((req, res) => {
    Classes.updateOne(
            {_id:req.params.id, 'questions._id':req.params.questionId},
            {$push: {'questions.$.answers': req.body.answer}},
            (err,obj) => {console.log(obj);}
        )
        .then(cl => res.json(cl)).catch(err => res.status(400).json(err))
        .catch(err => res.status(400).json(err));
});

module.exports = router;