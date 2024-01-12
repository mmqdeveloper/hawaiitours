import Product from "../models/Product.js";
import Category from "../models/Category.js";

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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
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
  const { min, max, ...others } = req.query;
  try {
    const products = await Product.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Product.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments({ type: "product" });
    const apartmentCount = await Product.countDocuments({ type: "apartment" });
    const resortCount = await Product.countDocuments({ type: "resort" });
    const villaCount = await Product.countDocuments({ type: "villa" });
    const cabinCount = await Product.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "product", count: productCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getProductCategory = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const list = await Promise.all(
      product.category.map((room) => {
        return Category.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
