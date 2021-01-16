const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {

    const {
        firstName,
        lastName,
        username,
        email,
        password
    } = req.body;

    console.log(req.body);

    User.findOne(
        { email: email }
    ).exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: "User already registered"
            });
        }

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password
        });

        newUser.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: error
                });
            }

            if (data) {

                return res.render("signin", {
                    user: req.user
                });
            }
        });

    });
};

exports.signin = (req, res) => {

    console.log(req.body);
    User.findOne(
        {
            email: req.body.email
        }
    ).exec((error, user) => {
        if (error) return res.status(400).json({ message: error });
        if (user) {

            if (user.authenticate(req.body.password)) {

                const token = jwt.sign({ uid: user._id }, "secretKey", { expiresIn: "10h" });
                const { _id, firstName, lastName, fullName, email, username } = user;

                return res.render("index", {
                    token,
                    user: {
                        _id, firstName, lastName, email, username, fullName
                    }
                });

            } else {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }

        } else {
            return res.status(400).json({
                message: "user not found. please signup"
            })
        }
    });

};


exports.requireSignIn = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        res.status(400).json({ message: "Access denied. Login to procceed" });
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secretKey");
        req.user = user;
        next();
    }

}