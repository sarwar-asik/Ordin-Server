"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Faq_validation_1 = require("./Faq.validation");
const Faq_controller_1 = require("./Faq.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Faq_validation_1.FAQValidation.createFAQ), Faq_controller_1.FAQController.insertDB);
router.get('/', Faq_controller_1.FAQController.getAllDb);
router.get('/:id', Faq_controller_1.FAQController.getSingleDataById);
router.patch('/:id', (0, validateRequest_1.default)(Faq_validation_1.FAQValidation.updateFAQ), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Faq_controller_1.FAQController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Faq_controller_1.FAQController.deleteByIdFromDB);
exports.FAQRoutes = router;
