const express = require("express");

const router = express.Router();

const servicecontroller = require("../Controllers/ServiciosController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { route } = require("./Vehiculos");

router.get("/ListSer",isAuthenticated,servicecontroller.GetListSer);
router.get("/CreateSer",isAuthenticated,servicecontroller.GetCreate);

router.post("/CreateSer",isAuthenticated,servicecontroller.PostService);

router.get("/Edit/:servicioId",isAuthenticated,servicecontroller.GetEdit);
router.post("/PostEdit",isAuthenticated,servicecontroller.PostEdit);
router.post("/PostDelete",isAuthenticated,servicecontroller.PostDelete);
module.exports = router;