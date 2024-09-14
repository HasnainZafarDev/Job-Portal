import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill full registration form"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email Already Taken"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  sendToken(user, 200, res, "User Registered Successfully");
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return new next(
      new ErrorHandler("Please Provide email,password,role", 404)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return new next(new ErrorHandler("User not found", 404));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return new next(new ErrorHandler("Invalid Password", 404));
  }
  if (user.role !== role) {
    return new next(
      new ErrorHandler("User With this role is not with us", 404)
    );
  }
  sendToken(user, 200, res, "User logged in");
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
