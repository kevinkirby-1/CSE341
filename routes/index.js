const routes = require('express').Router()
const lesson1Controller = require('../controllers/lesson1')

routes.get('/', lesson1Controller.saraRoute);
routes.get('/kevin', lesson1Controller.kevinRoute);


module.exports = routes;