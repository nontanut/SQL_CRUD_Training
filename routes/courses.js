const router = require("express").Router();
const {create, getCourses, singleCourse, update, deleteCourse} = require("../controllers/coursesCtrl");

router.post("/course/create", create);
router.get("/courses", getCourses);
router.get("/course/:course_id", singleCourse);
router.patch("/course/update/:course_id", update);
router.delete("/course/delete/:course_id", deleteCourse);

module.exports = router;