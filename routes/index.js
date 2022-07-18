const {Router} = require('express');
const employeeInfo = require("./employees");

const router = Router();

router.use("/employees", employeeInfo);

module.exports = router;