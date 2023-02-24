import { createError } from "../error.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const addTocart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId).populate("cart.product");
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không hợp lệ" });
    }
    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Sản phẩm đặt quá số lượng sẵn có" });
    }

    const cartItem = user.cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    product.quantity -= quantity;

    await user.save();
    await product.save();

    res.status(200).json({ message: "Thêm mới sản phẩm thành công", user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("cart.product");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
