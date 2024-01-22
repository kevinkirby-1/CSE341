const routes = require('express').Router()
const lesson2Controller = require('../controllers/contacts')

routes.get('/contacts', lesson2Controller.getAll);

routes.get('/contacts/:id', lesson2Controller.getIndividual)


module.exports = routes;