"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Cart_validation_1 = require("./Cart.validation");
const Cart_controller_1 = require("./Cart.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Cart_validation_1.CartValidation.createCart), Cart_controller_1.CartController.insertDB);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), Cart_controller_1.CartController.getAllDb);
router.get('/:id', Cart_controller_1.CartController.getSingleDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), Cart_controller_1.CartController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), Cart_controller_1.CartController.deleteByIdFromDB);
exports.cartRoutes = router;
