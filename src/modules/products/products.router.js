import { Router } from "express";
import * as productsController from './products.controller.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
import { endPoint } from "./products.endPoint.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../services/errorHanding.js";

const router = Router();
router.get('/', asyncHandler(productsController.getProducts));
router.post('/', auth(endPoint.create), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
]), asyncHandler(productsController.createProducts));
export default router;
router.get('/category/:categoryId', asyncHandler(productsController.getProductWithCategory));
router.get('/:productId', asyncHandler(productsController.getProduct));
