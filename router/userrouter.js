const router = require("express").Router();
const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Register
router.post("/register", async (req, res) => {
  try {
    var emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json("Email already exist");
    }
    //Password hash
    var hash = await bcrypt.hash(req.body.password, 10);
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });
    var data = await user.save();
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    var userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(400).json("Email not exist");
    }
    var validPsw = await bcrypt.compare(req.body.password, userData.password);

    if (!validPsw) {
      return res.status(400).json("Password not valid");
    }

    var userToken = jwt.sign({ email: userData.email }, "securedata");

    res.status(200).send({
      type: "success",
      message: "Logged In Successfully!",
      token: userToken,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
const validUser = (req, res, next) => {
  var token = req.header("auth");
  req.token = token;
  next();
};
router.get("/getAll", validUser, async (req, res) => {
  jwt.verify(req.token, "securedata", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = await User.find();
      res.json(data);
    }
  });
});
module.exports = router;
