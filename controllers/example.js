const db = require('../models');

const index = (req, res) => {
  db.Example.find({}, (err, foundExamples) => {
    if (err) console.log('Error in example#index:', err);
    res.json(foundExamples);
  });
}

const show = (req, res) => {
    db.Example.findById(req.params.id, (err, foundExample) => {
        if (err) console.log('Error in example#show:', err);
        res.json(foundExample);
    });
};

const create = (req, res) => {
    db.Example.create(req.body, (err, savedExample) => {
        if (err) console.log('Error in example#create:', err);
        res.json(savedExample);
    });
};

const update = (req, res) => {
    db.Example.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExample) => {
        if (err) console.log('Error in example#update:', err);
        res.json(updatedExample);
    });
};

const destroy = (req, res) => {
    db.Example.findByIdAndDelete(req.params.id, (err, deletedExample) => {
        if (err) console.log('Error in example#destroy:', err);
          res.sendStatus(200);
          console.log(deletedExample);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
