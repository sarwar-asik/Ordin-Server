"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required' }),
        img: zod_1.z.string({ required_error: 'img is Required' }),
        // details: z.string({ required_error: 'details is Required' }),
    }),
});
const updateCategory = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required' }).optional(),
        img: zod_1.z.string({ required_error: 'img is Required' }).optional(),
    }),
});
exports.CategoryValidation = { createCategory, updateCategory };
