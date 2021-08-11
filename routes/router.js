const express = require('express');
const route = express.Router();

const render = require('../services/render')
const studentcontroller = require('../server/controller/studentcontroller');

route.post('/add', studentcontroller.newStudent);
route.get('/', studentcontroller.showAll);
route.put('/update/:id', studentcontroller.updateStudent);
route.delete('/delete', studentcontroller.deleteStudent);

module.exports = route;