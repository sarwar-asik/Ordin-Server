"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Services_validation_1 = require("./Services.validation");
const Services_controller_1 = require("./Services.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Services_validation_1.ServicesValidation.createServices), Services_controller_1.ServiceController.insertDB);
router.get('/', Services_controller_1.ServiceController.getAllDb);
router.get('/:id', Services_controller_1.ServiceController.getSingleDataById);
router.patch('/:id', (0, validateRequest_1.default)(Services_validation_1.ServicesValidation.updateService), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Services_controller_1.ServiceController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Services_controller_1.ServiceController.deleteByIdFromDB);
exports.servicesRoutes = router;
