const express = require("express");

const router = express.Router();

const homecontroller = require("../Controllers/HomeController");

router.get("/",homecontroller.GetIndex);
router.get("/Services",homecontroller.GetServices);
router.get("/Vehicules",homecontroller.GetVehicules);
router.get("/About",homecontroller.GetAbout);
router.get("/PageNotAviable",homecontroller.GetExample);
router.post("/RequestService",homecontroller.PostRequestService);


module.exports = router;
