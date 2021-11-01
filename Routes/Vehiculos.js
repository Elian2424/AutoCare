const express = require("express");

const router = express.Router();

const vehiculocontroller = require("../Controllers/VehiculosController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/ListVe",isAuthenticated,vehiculocontroller.GetList);
router.get("/CreateVe",isAuthenticated,vehiculocontroller.GetCreateVe);

router.post("/CreateVe",isAuthenticated,vehiculocontroller.PostCar)

router.get("/Edit/:carId",isAuthenticated,vehiculocontroller.GetEdit);
router.post("/PostEdit",isAuthenticated,vehiculocontroller.PostEdit);

router.post("/PostDelete",isAuthenticated,vehiculocontroller.PostDelete);
module.exports = router;