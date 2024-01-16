import express from "express";
import {
    countByCity,
    countByType,
    createProduct,
    deleteProduct,
    getProduct,
    getProductCategory,
    getProducts,
    updateProduct,
} from "../controllers/product.js";
import {
    createCategory,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory,
    updateCategoryAvailability,
} from "../controllers/category.js";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

router.get("/", getBooking);

export default router;