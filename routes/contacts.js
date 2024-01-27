const routes = require('express').Router()
const contactsController = require('../controllers/contacts')

routes.get('/contacts', contactsController.getAll);

routes.get('/contacts/:id', contactsController.getIndividual)

routes.post('/contacts', contactsController.createContact)

routes.put('/contacts/:id', contactsController.updateContact)

routes.delete('/contacts/:id', contactsController.deleteContact)

module.exports = routes;