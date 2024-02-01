const routes = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json')
const contactsController = require('../controllers/contacts')

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/contacts', contactsController.getAll);

routes.get('/contacts/:id', contactsController.getIndividual)

routes.post('/contacts', contactsController.createContact)

routes.put('/contacts/:id', contactsController.updateContact)

routes.delete('/contacts/:id', contactsController.deleteContact)

module.exports = routes;