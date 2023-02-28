import Category from "../models/Category.js";

export const getListCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const searchCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({
      title: { $regex: `${req.query.title}`, $options: "i" },
    });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json({ message: "Tạo danh mục thành công", status: 200 });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { listId } = req.body;

  try {
    await Category.deleteMany({
      _id: { $in: listId },
    });

    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    next(error);
  }
};
