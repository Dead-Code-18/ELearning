const User = require("../model/user.model");

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
