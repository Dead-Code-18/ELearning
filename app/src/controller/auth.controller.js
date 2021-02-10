const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../validators/auth.validator");
const keys = require("../config/keys");
const passport = require("passport");
const Instructor = require("../model/instructor.model");
const Course = require("../model/course.model");

exports.signup = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, email, password } = req.body;

  User.findOne({ email: email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({
            message: "User already registered",
          });
        }
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
};

exports.signin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    } else {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization == undefined) {
    res.status(400).json({ message: "Access denied. Login to procceed" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, keys.secretOrKey);
    req.user = user;
    next();
  }
};

exports.validateInstructorRole = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, keys.secretOrKey);

  User.findById(decoded.id).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      if (user.role === "teacher") {
        next();
      } else {
        return res.status(200).json({ message: "access denied" });
      }
    }
  });
};

exports.validateOwner = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, keys.secretOrKey);
  Course.findById(req.query.courseID).exec(async (error, course) => {
    if (error) return res.status(400).json({ message: error });
    if (course) {
      if (course.instructor == decoded.id) {
        next();
      } else {
        return res.status(200).json({ message: "access denied" });
      }
    }
  });
};

exports.validateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, keys.secretOrKey);

  User.findById(decoded.id).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      const coursesOfUser = user.ownedCourses;
      const courseToEnter = req.query.courseID;
      for (var course of coursesOfUser) {
        if (course == courseToEnter) {
          next();
        }
      }
    } else {
      return res.status(200).json({ message: "access denied" });
    }
  });
};
