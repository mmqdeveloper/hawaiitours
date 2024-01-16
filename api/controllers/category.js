import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId)
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updateCategoryAvailability = async (req, res, next) => {
  try {
    await Category.updateOne(
      { "categoryNumbers._id": req.params.id },
      {
        $push: {
          "categoryNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Category status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getCategories = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
