import Product from "../models/Product.js";
import Categories from "../models/Categories.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const getProducts = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const products = await Product.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductCategories = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const list = await Promise.all(
      product.categories.map((category) => {
        return Categories.findById(category);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
