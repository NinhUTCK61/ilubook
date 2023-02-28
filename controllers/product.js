import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const addToCategory = async (req, res, next) => {
  try {
    const { idCategory, idProduct } = req.body;
    const category = await Category.findById(idCategory);
    const newIdProduct = idProduct.filter(
      i => !category?.listProduct.includes(i)
    );

    let result = await Category.findByIdAndUpdate(
      { _id: idCategory },
      { $push: { listProduct: { $each: newIdProduct } } }
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const products = await Product.find({
      title: { $regex: `${req.query.title}`, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json({ message: "Tạo sản phẩm thành công", status: 200 });
  } catch (error) {
    next(error);
  }
};

export const getListProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getInfoProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { listId } = req.body;

  try {
    // Remove the products from the cart of all users
    const users = await User.find({ "cart.product": { $in: listId } });

    await Promise.all(
      users.map(async user => {
        user.cart = user.cart.filter(
          item => !listId.includes(item.product.toString())
        );
        await user.save();
      })
    );

    // Remove the products from the product collection
    const deletedProducts = await Product.deleteMany({
      _id: { $in: listId },
    });

    if (deletedProducts.deletedCount === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    next(error);
  }
};
