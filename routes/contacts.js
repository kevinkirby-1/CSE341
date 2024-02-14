const routes = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json')
const contactsController = require('../controllers/contacts')
const validation = require('../middleware/validation')

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/contacts', contactsController.getAll);

routes.get('/contacts/:id', contactsController.getIndividual)

routes.post('/contacts', validation.validateContact, contactsController.createContact)

routes.put('/contacts/:id', validation.validateContact,  contactsController.updateContact)

routes.delete('/contacts/:id', contactsController.deleteContact)

module.exports = routes;