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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        "EVO" +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype ==
        "image/jpg" ||
      file.mimetype ==
        "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("*Only jpeg,jpg,png files are allowed"));
    }
  }
});
// router.use(formdataParser);

router.post("/login", formdataParser,loginValidation, loginController.login);
router.use(middleware);
router.post("/verifytoken",formdataParser, loginController.verifyToken);
router.get("/getmyinfo", loginController.getMyInfo);
router.post("/updateprofile",
(req,res,next)=>{
  upload.single('image')(req,res,(err)=>{
    if (err) {
      req.uploadErr = err.message;
      console.log("req.uploadErr2", req.uploadErr);
    }
   
    next()
  })
}
,updateValidation, loginController.updateInfo);

router.post("/creategiveable", formdataParser,giveValidation, giveaskController.createNeed);
router.post("/createask", formdataParser,askValidation, giveaskController.createNeed);

router.get('/my-give/:userId',giveaskController.myGive)
router.get('/fetchsinglegive/:userId/:giveId',giveaskController.fetchSingleGive)
router.post('/update-my-give/:userId/:giveId',formdataParser,giveaskController.updateMyGive)
router.get('/delete-my-give/:userId/:giveId',giveaskController.deleteMyGive)

router.get('/my-ask/:userId',giveaskController.myAsk)
router.get('/fetchsingleask/:userId/:askId',giveaskController.fetchSingleAsk)
router.post('/update-my-ask/:userId/:askId',formdataParser,giveaskController.updateMyAsk)
router.get("/fetchgiveask", giveaskController.fetchGiveAsk);
router.get('/delete-my-ask/:userId/:askId',giveaskController.deleteMyAsk)

router.get("/matches", giveaskController.matches);

module.exports = router;
