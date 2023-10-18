"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is Required' }),
        serviceId: zod_1.z.string({ required_error: 'serviceId is Required' }),
    }),
});
exports.BookingValidation = { createBooking };
