"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsValidation = void 0;
const zod_1 = require("zod");
const createBlogs = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }),
        content: zod_1.z.string({ required_error: 'content is Required ' }),
        author: zod_1.z.string({ required_error: 'author is Required ' }),
        img: zod_1.z.string({ required_error: 'img is Required ' }),
        portal: zod_1.z.string({ required_error: 'portal is Required ' }),
        publishedTime: zod_1.z.string({ required_error: 'publishedTime is Required ' }),
        postBy: zod_1.z.string({ required_error: 'postBy is Required ' }),
    }),
});
const updateBlogs = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }).optional(),
        content: zod_1.z.string({ required_error: 'content is Required ' }).optional(),
        author: zod_1.z.string({ required_error: 'author is Required ' }).optional(),
        img: zod_1.z.string({ required_error: 'img is Required ' }).optional(),
        portal: zod_1.z.string({ required_error: 'portal is Required ' }).optional(),
        publishedTime: zod_1.z
            .string({ required_error: 'publishedTime is Required ' })
            .optional(),
        postBy: zod_1.z.string({ required_error: 'postBy is Required ' }).optional(),
    }),
});
exports.BlogsValidation = { createBlogs, updateBlogs };
