"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_route_1 = require("../modules/Auth/Auth.route");
const Blogs_route_1 = require("../modules/Blogs/Blogs.route");
const Booking_route_1 = require("../modules/Booking/Booking.route");
const Cart_route_1 = require("../modules/Cart/Cart.route");
const Category_route_1 = require("../modules/Category/Category.route");
const Faq_route_1 = require("../modules/Faq/Faq.route");
const Review_route_1 = require("../modules/Review/Review.route");
const Services_route_1 = require("../modules/Services/Services.route");
const Users_route_1 = require("../modules/Users/Users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/user',
        routes: Users_route_1.userRoutes,
    },
    {
        path: '/auth',
        routes: Auth_route_1.authRoutes,
    },
    {
        path: '/category',
        routes: Category_route_1.categoryRoutes,
    },
    {
        path: '/service',
        routes: Services_route_1.servicesRoutes,
    },
    {
        path: '/cart',
        routes: Cart_route_1.cartRoutes,
    },
    {
        path: '/booking',
        routes: Booking_route_1.BookingRoutes,
    },
    {
        path: '/reviews',
        routes: Review_route_1.reviewRoutes,
    },
    {
        path: '/blogs',
        routes: Blogs_route_1.blogsRoutes,
    },
    {
        path: '/FAQ',
        routes: Faq_route_1.FAQRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
