//This is where we register all the food routes
//Each Route is hooked up to different Controller Functions
//The Controller functions are from foodController.js
const express = require('express')
const {
    getFoods,
    getFood,
    createFood,
    deleteFood,
    updateFood
} = require('../controllers/foodController')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//require auth for all food routes
router.use(requireAuth)

//GET all foods
router.get('/', getFoods)

//GET a single food
router.get('/:id', getFood)

//POST a new food
router.post('/',createFood)

//Delete a new food
router.delete('/:id',deleteFood)

//UPDATE a new food
router.patch('/:id',updateFood)

module.exports = router