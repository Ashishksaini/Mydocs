const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync.js");
const {promisify} =  require("util")
const AppError = require("../utils/appError.js"); 

const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user,statusCode,res) => {
    const token = signtoken(user_id);
    user.password = undefined;
    res.status(statusCode).json({
        status:"success",
        token,
        data: {user}
    })
}


exports.signup = catchAsync(async (req,res,next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser,201,res);
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppEror("Please provide the email and password"));
    }
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !await User.correctPassword(password, user.password)) {
        return next(new AppError("Incorrect Username and Password", 401));
    }

    createSendToken(user, 200, res);
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new AppError("You are not logged in ", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(
            new AppError("The User belonging to this token does no longer exist",401)
        );
    }
    req.user = currentUser;
    next();

})