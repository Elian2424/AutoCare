const express = require("express");

const router = express.Router();

const admincontroller = require("../Controllers/AdminController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/CreateUser",admincontroller.GetAddUsuario);
router.post("/CreateUser", admincontroller.PostAddUsuario);

router.get("/Login",admincontroller.GetLogin);
router.post("/Login", admincontroller.PostLogin);
router.post("/Logout",admincontroller.PostLogout);



router.get("/Menu",isAuthenticated,admincontroller.GetMenu);


router.get("/RestorePass",admincontroller.GetRestorePass);
router.post("/RestorePass",admincontroller.PostRestorePass);
router.post("/Verify",admincontroller.PostVerify);
router.post("/NewPass",admincontroller.PostNewPass);
module.exports = router;