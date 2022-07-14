const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Create
exports.create = async (req, res) => {
    try {
        const {name} = req.body;

        // Validate
        if (!name) {
            return res.status(400).json({msg: "Please enter a cours name."});
        }

        let check = "SELECT * FROM courses WHERE slug = ?";
        let addCourse = "INSERT INTO courses SET ?";
        const slug = slugify(name).toLowerCase();

        if (!slug) slug = uuidv4();

        await db.query(check, slug, (err, course) => {
            if (course.length > 0) {
                return res.status(400).json({msg: "Course alerady exists."});
            }

            const data = {
                course_name: name.toLowerCase(),
                slug: slugify(name).toLowerCase()
            }

            db.query(addCourse, data, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({msg: "Unable to add course."})
                }
                return res.status(200).json({data})
            })
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// All Courses
exports.getCourses = async (req, res) => {
    try {
        await db.query("SELECT * FROM courses", (err, result) => {
            return res.status(200).json(result);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Single Course
exports.singleCourse = async (req, res) => {
    try {
        const id = req.params.course_id;

        await db.query("SELECT * FROM courses WHERE course_id = ?", [id], (err, result) => {
            if (err) {
                return res.status(400).json({msg: err.message})
            }
            res.status(200).json(result)
        })        
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Update Course
exports.update = async (req, res) => {
    try {
        const {course_name} = req.body;
        const id = req.params.course_id;

        const slug = slugify(course_name)

        if (!slug) slug = uuidv4();

        // Select update from slug because name is unique and slug get from name
        await db.query("UPDATE courses SET course_name = ?, slug = ? WHERE course_id = ?", [
            course_name.toLowerCase(),
            slug,
            id
        ], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({msg: "Can't to update this course."})
            }
            res.status(200).json({msg: "Updated!"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// Delete Coures
exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.course_id;

        // Delete by id
        await db.query("DELETE FROM courses WHERE course_id = ?", [id], (err, result) => {
            if(err) {
                return res.status(400).json({msg: "Can't delete."})
            }
            res.status(200).json({msg: `id ${id} has been deleted!`});
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}
