"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Payment_controller_1 = require("./Payment.controller");
const router = (0, express_1.Router)();
router.post('/', Payment_controller_1.PaymentController.initPayment);
router.post('/webhook', Payment_controller_1.PaymentController.webHook);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), Payment_controller_1.PaymentController.getAllPayment);
router.get('/userPayment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), Payment_controller_1.PaymentController.getUserAllPayment);
router.get('/:serviceId', Payment_controller_1.PaymentController.getUserPaymentByService);
router.get('/:id', Payment_controller_1.PaymentController.getSingleDataById);
exports.paymentRoutes = router;
