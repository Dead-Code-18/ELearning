const User = require("../model/user.model");
const Instructor = require("../model/instructor.model");

exports.getUserRole = (req, res) => {
  const { id } = req.query;
  User.findById(id).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      const payload = user.role;
      return res.status(200).json(payload);
    } else {
      return res.status(200).json({ message: "no user" });
    }
  });
};

exports.getProfile = (req, res) => {
  const { id } = req.query;
  User.findById(id).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      const payload = user;
      return res.status(200).json(payload);
    } else {
      return res.status(200).json({ message: "no user" });
    }
  });
};

exports.updateProfile = (req, res) => {
  const { username, email, country, state, education } = req.body;
  User.findOneAndUpdate(
    { email: email },
    {
      username: username,
      country: country,
      state: state,
      education: education,
    },
    {
      new: true,
    }
  ).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    } else {
      return res.status(200).json({ message: "no user" });
    }
  });
};

exports.changeRole = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.id },
    {
      role: "teacher",
    },
    {
      new: true,
    }
  ).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      user
        .save()
        .then((user) => createInstructor(req, user, res))
        .catch((err) => console.log(err));
    } else {
       res.status(200).json({ message: "no user" });
    }
  });
};

const createInstructor = (req, user, res) => {
  const { id, experience, additionalDetails } = req.body;

  Instructor.findOne({ _id: id })
    .exec(async (error, instructor) => {
      if (instructor) {
          res.status(400).json({
          message: "Instructor already registered",
        });
      }

      const newInstructor = new Instructor({
        _id: user._id,
        experience,
        additional_details: additionalDetails,
      });

      newInstructor
        .save()
        .then((instructor) =>  res.json(instructor))
        .catch((err) => console.log(err));
    })
};
