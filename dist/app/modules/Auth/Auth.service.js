"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const signUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.password = yield bcrypt_1.default.hash(userData.password, 10);
    // console.log("🚀 ~ file: Auth.service.ts:14 ~ userData:", userData)
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: userData.email,
        id: userData.id,
        role: userData.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
        data: result,
    };
});
const authLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // console.log(payload, 'payload');
    // const isUserExist = await User.isUserExistsMethod(phoneNumber);
    // // console.log(isUserExist,"isUserExits");
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    // console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not match');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (isUserExist.password && !isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is not correct');
    }
    //   jwt part ///
    const token = jwtHelpers_1.jwtHelpers.createToken({
        email,
        role: isUserExist.role,
        id: isUserExist.id
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: token
    };
});
exports.AuthService = { signUp, authLogin };
