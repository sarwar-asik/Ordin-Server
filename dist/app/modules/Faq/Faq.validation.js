"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQValidation = void 0;
const zod_1 = require("zod");
const createFAQ = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is Required ' }),
        answer: zod_1.z.string({ required_error: 'answer is Required ' }),
        userId: zod_1.z.string({ required_error: 'userId is Required ' })
    }),
});
const updateFAQ = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is Required ' }).optional(),
        answer: zod_1.z.string({ required_error: 'answer is Required ' }).optional(),
        userId: zod_1.z.string({ required_error: 'userId is Required ' })
    }).optional(),
});
exports.FAQValidation = { createFAQ, updateFAQ };
