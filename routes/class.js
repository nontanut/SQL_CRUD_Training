const router = require("express").Router();
const {create, getClass, singleClass, update, deleteClass} = require("../controllers/classCtrl");

router.post("/class/create", create);
router.get("/class", getClass);
router.get("/single_class/:class_id", singleClass);
router.patch("/class/update/:class_id", update);
router.delete("/class/delete/:class_id", deleteClass);

module.exports = router;