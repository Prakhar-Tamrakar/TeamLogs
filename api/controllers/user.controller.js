import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Hash password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password:req.body.password,
          isVerified: req.body.isVerified,
          number: req.body.number,
          dob: req.body.dob,
          location: req.body.location,
          skills: req.body.skills,
          gender: req.body.gender,
          linkedin: req.body.linkedin,
          about: req.body.about,
          jobTitle: req.body.jobTitle,
          officeLocation: req.body.officeLocation,
          empType: req.body.empType,
          avatar: req.body.avatar,
        },
      },
      { new: true } 
    );

    const {password , ...rest} = updatedUser._doc

    res.status(200).json({rest, success : true});
  } catch (error) {
    next(error);
  }
};

