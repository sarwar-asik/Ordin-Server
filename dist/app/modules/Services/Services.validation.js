"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesValidation = void 0;
const zod_1 = require("zod");
const createServices = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }),
        details: zod_1.z.string({ required_error: 'description is Required ' }),
        price: zod_1.z.string({ required_error: 'price is Required ' }),
        address: zod_1.z.string({ required_error: 'address is Required ' }),
        contact: zod_1.z.string({ required_error: 'contact is Required ' }),
        img: zod_1.z.string({ required_error: 'img is Required ' }),
        serviceTime: zod_1.z.string({ required_error: 'serviceTime is Required ' }),
        serviceDate: zod_1.z.string({ required_error: 'serviceDate is Required ' }),
        categoryId: zod_1.z.string({ required_error: 'categoryId is Required ' }),
        publisherId: zod_1.z.string({ required_error: 'publisherId is Required ' }),
    }),
});
const updateService = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }).optional(),
        details: zod_1.z.string({ required_error: 'description is Required ' }).optional(),
        price: zod_1.z.string({ required_error: 'price is Required ' }).optional(),
        address: zod_1.z.string({ required_error: 'address is Required ' }).optional(),
        contact: zod_1.z.string({ required_error: 'contact is Required ' }).optional(),
        img: zod_1.z.string({ required_error: 'img is Required ' }).optional(),
        serviceTime: zod_1.z.string({ required_error: 'serviceTime is Required ' }).optional(),
        serviceDate: zod_1.z.string({ required_error: 'serviceDate is Required ' }).optional(),
        status: zod_1.z.string({ required_error: 'status is Required ' }).optional(),
        categoryId: zod_1.z.string({ required_error: 'categoryId is Required ' }).optional(),
        publisherId: zod_1.z.string({ required_error: 'publisherId is Required ' }).optional(),
    }),
});
exports.ServicesValidation = { createServices, updateService };
