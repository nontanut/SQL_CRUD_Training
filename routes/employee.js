const router = require("express").Router();
const {create, getEmployees, singleEmployee, update, deleteEmployee} = require("../controllers/employeeCtrl");

router.post("/employee/create", create);
router.get("/employees", getEmployees);
router.get("/employee/:employee_id", singleEmployee);
router.patch("/employee/update/:employee_id", update);
router.delete("/employee/delete/:employee_id", deleteEmployee);

module.exports = router;