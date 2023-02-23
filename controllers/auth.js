import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(200).json({ message: "Email đã tồn tại", status: 404 });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });

      await newUser.save();
      res
        .status(200)
        .json({ message: "Tạo tài khoản thành công", status: 200 });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ status: 201, message: "Email không tồn tại" });
    } else {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        res.json({ status: 202, message: "Mật khẩu không đúng" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
          })
          .status(200)
          .json({ ...others, token, status: 200 });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...user._doc, token });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...savedUser._doc, token });
    }
  } catch (err) {
    next(err);
  }
};
