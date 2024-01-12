import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { categorys: savedCategory._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
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
  const hotelId = req.params.hotelid;
  try {
    await Category.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { categorys: req.params.id },
      });
    } catch (err) {
      next(err);
    }
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
export const getCategorys = async (req, res, next) => {
  try {
    const categorys = await Category.find();
    res.status(200).json(categorys);
  } catch (err) {
    next(err);
  }
};
