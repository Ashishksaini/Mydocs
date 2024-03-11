const catchAsync = require("../utils/catchAsync");
const Doc = require("../models/docModel.js");
const AppError = require("../utils/appError");


exports.protect = catchAsync(async (req, res, next) => {
    const url = req.params.id;
    if (!url) {
      return next(new AppError("Invalid file name or url", 400));
    }
    const doc = await Doc.findById(url);
    if (!doc) {
      return next(new AppError("The document does not exist", 400));
    }
    if (!doc.access.includes(`${req.user._id}`)) {
        return next(new AppError("Don't have Access to the Document", 400));
    }
    req.doc = doc;
    next();
})

exports.getdoc = catchAsync(async(req,res,next) => {
    const doc = req.doc;
    if (!doc) {
        return next(new AppError("Document not found", 400));
    }
    
    res.status(200).json({
        status: 'success',
        data: doc.document,
    })
}) 

exports.updateAccess = catchAsync(async (req, res, next) => {
    
})
