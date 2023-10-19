"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Blogs_validation_1 = require("./Blogs.validation");
const Blogs_controller_1 = require("./Blogs.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Blogs_validation_1.BlogsValidation.createBlogs), Blogs_controller_1.BlogsController.insertDB);
router.get('/', Blogs_controller_1.BlogsController.getAllDb);
router.get('/:id', Blogs_controller_1.BlogsController.getSingleDataById);
router.patch('/:id', (0, validateRequest_1.default)(Blogs_validation_1.BlogsValidation.updateBlogs), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Blogs_controller_1.BlogsController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Blogs_controller_1.BlogsController.deleteByIdFromDB);
exports.blogsRoutes = router;
