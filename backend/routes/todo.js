let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Todo Model
let todoSchema = require('../models/Todo');

// CREATE Todo
router.route('/create-todo').post((req, res, next) => {
  todoSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Todo
router.route('/').get((req, res, next) => {
  todoSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Todo
router.route('/get-todo/:id').get((req, res, next) => {
  todoSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Todo
router.route('/update-todo/:id').put((req, res, next) => {
  todoSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
    } else {
      res.json(data)
      console.log('Todo updated successfully !')
    }
  })
})

// Delete Todo
router.route('/delete-todo/:id').delete((req, res, next) => {
  todoSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;