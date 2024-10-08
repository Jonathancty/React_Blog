const HttpError = require("../models/errorModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// ================================================= REGISTER A USER =================================================
// POST : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password1, password2 } = req.body;
    if (!name || !email || !password1 || !password2) {
      return next(new HttpError("Please fill in all fields", 422));
    }

    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists. ", 422));
    }

    if (password1.trim().length < 6) {
      return next(
        new HttpError("Password must be at least 6 characters. ", 422)
      );
    }

    if (password1 !== password2) {
      return next(new HttpError("Passwords do not match. ", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPassword,
    });
    res.status(201).json(`New User ${newUser.email} has been registered`);
  } catch (error) {
    return next(
      new HttpError("User Registration failed, please try again", 422)
    );
  }
};

// ================================================= LOGIN A REGISTERED USER =================================================
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const { email, password1 } = req.body;
    if (!email || !password1) {
      return next(new HttpError("Fill in all fields", 422));
    }
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }
    const isMatch = await bcrypt.compare(password1, user.password);
    if (!isMatch) {
      return next(new HttpError("Invalid credentials", 422));
    }
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(new HttpError("Login failed, please try again", 422));
  }
};

// ================================================= USER PROFILE =================================================
// POST : api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError("User not found", 404));
  }
};

// ================================================= CHANGE USER AVATAR (profile pic) =================================================
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    // find user from database
    const user = await User.findById(req.user.id);
    // delete avatar if user has one
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError("Avatar change failed", 422));
        }
      });
    }

    const { avatar } = req.files;
    // check file size
    if (avatar.size > 500000) {
      return next(
        new HttpError(
          "Profile picture is too big. Should be less then 500KB",
          422
        )
      );
    }

    let fileName;
    fileName = avatar.name;
    let splitName = fileName.split(".");
    let newFileName =
      splitName[0] + uuid() + "." + splitName[splitName.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError("Avatar change failed", 422));
        }
        const updateAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFileName },
          { new: true }
        );
        if (!updateAvatar) {
          return next(new HttpError("Avatar couldn't be changed", 422));
        }
        res.status(200).json(updateAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError("Avatar change failed", 422));
  }
};

// ================================================= EDIT USER DETAILS (fromn profile) =================================================
// POST : api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmPassword } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Please fill in all fields", 422));
    }
    // get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 403));
    }

    // make sure new email doesn't already exist
    const emailExist = await User.findOne({ email });
    if (emailExist && emailExist._id !== req.user.id) {
      return next(new HttpError("Email already exists", 422));
    }

    // compare current password with password in database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new HttpError("Invalid current password", 422));
    }

    // compare new passwords
    if (newPassword !== confirmPassword) {
      return next(new HttpError("New Passwords do not match", 422));
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update user info in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hashedPassword },
      { new: true }
    ).select("-password");
    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError("User details couldn't be changed", 422));
  }
};

// ================================================= GET AUTHORS =================================================
// POST : api/users/
// UNPROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    if (!authors) {
      return next(new HttpError("No authors found", 404));
    }
    res.status(200).json(authors);
  } catch (error) {
    return next(new HttpError("No authors found", 404));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
