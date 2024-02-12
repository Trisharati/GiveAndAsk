const router = require("express").Router();
const path = require("path");
const loginController = require("../controller/loginController");
const giveaskController = require("../controller/giveaskController");
const {
  loginValidation,
  updateValidation,
  giveValidation,
  askValidation,
} = require("../middleware/validation");
const middleware = require("../middleware/authentication").auth;
const multer = require("multer");
const formdataParser = multer().fields([]);
router.use(formdataParser);

router.post("/login", loginValidation, loginController.login);
router.use(middleware);
router.post("/verifytoken", loginController.verifyToken);
router.get("/getmyinfo", loginController.getMyInfo);
router.post("/updateprofile", updateValidation, loginController.updateInfo);

router.post("/creategiveable", giveValidation, giveaskController.createNeed);
router.post("/createask", askValidation, giveaskController.createNeed);

router.get('/my-give/:userId',giveaskController.myGive)
router.get('/my-ask/:userId',giveaskController.myAsk)
router.get("/fetchgiveask", giveaskController.fetchGiveAsk);

router.get("/matches", giveaskController.matches);

module.exports = router;
