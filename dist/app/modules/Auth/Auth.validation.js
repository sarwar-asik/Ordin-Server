"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signUp = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is Required.',
        }),
        password: zod_1.z.string({ required_error: 'password is Required.' }),
        email: zod_1.z.string({ required_error: 'email is Required.' }),
        contact: zod_1.z.string({ required_error: 'contact is Required.' }),
        img: zod_1.z.string({ required_error: 'img is Required.' }),
    }),
});
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required (zod)',
        }),
        password: zod_1.z.string({
            required_error: 'password is required (zod)',
        }),
    }),
});
exports.AuthValidation = { signUp, loginUser };
