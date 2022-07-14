const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Create
exports.create = async (req, res) => {
    try {
        const {name, age, department, courses, className} = req.body;

        // Validate
        if (!name || !age || !department || !courses || !className) {
            return res.status(400).json({msg: "Please enter employee details."})
        }

        let check = "SELECT * FROM employees WHERE slug = ?";
        let addEmployee = "INSERT INTO employees SET ?";
        const slug = slugify(name).toLowerCase();

        if (!slug) slug = uuidv4();

        await db.query(check, slug, (err, employee) => {
            if (employee.length > 0) {
                return res.status(400).json({msg: "Employee already exists."});
            }

            const data = {
                employee_name: name.toLowerCase(),
                slug,
                employee_age: age.toString(),
                employee_department: department,
                employee_course: courses.toString().toLowerCase(),
                employee_class: className.toLowerCase()
            };

            db.query(addEmployee, data, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({msg: "Unable to create study course."})
                }
                return res.status(200).json({data});
            })
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// All Employees
exports.getEmployees = async (req, res) => {
    try {
        await db.query("SELECT * FROM employees", (err, result) => {
            return res.status(200).json(result);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Get single Employee
exports.singleEmployee = async (req, res) => {
    try {
        const id = req.params.employee_id;

        await db.query("SELECT * FROM employees WHERE employee_id = ?", [id], (err, result) => {
            if (err) {
                return res.status(400).json({msg: "Not found employee."})
            }
            res.status(200).json(result);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Update Employee
exports.update = async (req, res) => {
    try {
        const {name, age, department, courses, className} = req.body;
        const id = req.params.employee_id;
    
        const slug = slugify(name).toLowerCase();

        if (!slug) slug = uuidv4();

        // Select update from slug because name is unique and slug get from name
        await db.query("UPDATE employees SET employee_name = ?, employee_age = ?, employee_department = ?, employee_course = ?, employee_class = ?, slug = ? WHERE employee_id = ?", [
            name.toLowerCase(), 
            age,
            department,
            courses,
            className.toLowerCase(),
            slug,
            id
        ], (err, result) => {
            if (err) {
                return res.status(400).json({msg: "Unable to update employee course."});
            }
            res.status(200).json({msg: "Updated!"});
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message});
    }
}

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.params.employee_id;

        // Delete by id
        await db.query("DELETE FROM employees WHERE employee_id = ?", [id], (err, result) => {
            if(err) {
                console.log(err)
                return res.status(400).json({msg: "Can't delete."})
            }
            res.status(200).json({msg: "This employee id has been deleted!"});
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}