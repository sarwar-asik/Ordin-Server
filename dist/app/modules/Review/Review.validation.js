"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({ required_error: 'rating is Required ' }),
        reviews: zod_1.z.string({ required_error: 'reviews is Required ' }).optional(),
        userId: zod_1.z.string({ required_error: 'userId is Required ' }),
        serviceId: zod_1.z.string({ required_error: 'serviceId is Required ' }),
        comments: zod_1.z.string({ required_error: 'comments is Required ' }).optional(),
        suggestions: zod_1.z.string({ required_error: 'suggestions is Required ' }).optional(),
    }),
});
exports.ReviewValidation = { createReview };
