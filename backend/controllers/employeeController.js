const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;
        
        // Validation check for missing score
        if (performanceScore === undefined || performanceScore === null) {
            return res.status(400).json({ message: 'Validation error: performanceScore is required' });
        }
        
        let existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Error message: Employee with this email already exists' }); // Matches test case requirement
        }

        const employee = new Employee({
            name, email, department, skills, performanceScore, experience
        });

        await employee.save();
        res.status(201).json({ message: 'Employee stored successfully', employee });
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        let query = {};
        
        if (department) {
            query.department = new RegExp(department, 'i'); // Case-insensitive search
        }
        
        const employees = await Employee.find(query);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'Updated data shown', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
