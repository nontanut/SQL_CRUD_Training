const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Create
exports.create = async (req, res) => {
    try {
        const {name} = req.body;

        // Validate
        if (!name) {
            return res.status(400).json({msg: "Please enter a class name."});
        }

        let check = "SELECT * FROM class WHERE slug = ?";
        let addClass = "INSERT INTO class SET ?";
        const slug = slugify(name).toLowerCase();

        if (!slug) slug = uuidv4();

        await db.query(check, slug, (err, classes) => {
            if (classes.length > 0) {
                return res.status(400).json({msg: "Class alerady exists."});
            }

            const data = {
                class_name: name.toLowerCase(),
                slug: slugify(name).toLowerCase()
            }

            db.query(addClass, data, (err, result) => {
                if (err) {
                    return res.status(400).json({msg: "Unable to add class."})
                }
                return res.status(200).json({data})
            })
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// All Class
exports.getClass = async (req, res) => {
    try {
        await db.query("SELECT * FROM class", (err, result) => {
            return res.status(200).json(result);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Single Class
exports.singleClass = async (req, res) => {
    try {
        const id = req.params.class_id;

        await db.query("SELECT * FROM class WHERE class_id = ?", [id], (err, result) => {
            if (err) {
                return res.status(400).json({msg: err.message});
            }
            res.status(200).json(result);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Update Class
exports.update = async (req, res) => {
    try {
        const {class_name} = req.body;
        const slug = slugify(class_name)
        const id = req.params.class_id

        if (!slug) slug = uuidv4();

        // Select update from slug because name is unique and slug get from name
        await db.query("UPDATE class SET class_name = ?, slug = ? WHERE class_id = ?", [class_name.toLowerCase(), slug, id], (err, result) => {
            if (err) {
                return res.status(400).json({msg: "Can't to update this class."})
            }
            res.status(200).json({msg: "Updated!"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Delete Class
exports.deleteClass = async (req, res) => {
    try {
        const id = req.params.class_id;

        // Delete by id
        await db.query("DELETE FROM class WHERE class_id = ?", [id], (err, result) => {
            if(err) {
                return res.status(400).json({msg: "Can't delete."})
            }
            res.status(200).json({msg: "This id has been deleted!"});
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}