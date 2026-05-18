const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, employeeController.addEmployee);
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.get('/search', authMiddleware, employeeController.searchEmployees);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);
router.put('/:id', authMiddleware, employeeController.updateEmployee);

module.exports = router;
