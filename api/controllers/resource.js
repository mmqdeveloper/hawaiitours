import Resource from "../models/Resource.js";
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";

export const createResource = async (req, res, next) => {
  const newResource = new Resource(req.body);
  try {
    const savedResource = await newResource.save();
    res.status(200).json(savedResource);
  } catch (err) {
    next(err);
  }
};

export const updateResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    console.log(resourceId)
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedResource);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updateResourceAvailability = async (req, res, next) => {
  try {
    await Resource.updateOne(
      { "resourceNumbers._id": req.params.id },
      {
        $push: {
          "resourceNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Resource status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteResource = async (req, res, next) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.status(200).json("Resource has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.status(200).json(resource);
  } catch (err) {
    next(err);
  }
};
export const getResources = async (req, res, next) => {
  try {
    const resource = await Resource.find();
    res.status(200).json(resource);
  } catch (err) {
    next(err);
  }
};
