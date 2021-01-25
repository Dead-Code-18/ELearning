const Validator = require("validator");
const isEmpty = require("is-empty");

exports.validateRegisterInput = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Name checks
    if (Validator.isEmpty(data.username)) {
      errors.username = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = "Password must be at least 8 characters";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
}


exports.validateLoginInput = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
};

exports.isRequestValidated = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0)
    {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
}