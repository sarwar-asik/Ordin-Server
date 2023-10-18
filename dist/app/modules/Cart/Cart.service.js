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
exports.CartServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertDB = (cartData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartData);
    const result = yield prisma_1.default.userCart.create({
        data: cartData,
        include: {
            service: true,
            user: true,
        },
    });
    console.log(result, 'ressssssss');
    return result;
});
const getAllDb = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    // !for pagination
    // console.log(authUser);
    const getUserCart = yield prisma_1.default.userCart.findMany({
        where: {
            userId: authUser === null || authUser === void 0 ? void 0 : authUser.id,
        },
        include: {
            service: true,
            user: true,
        },
    });
    const countData = yield prisma_1.default.userCart.count();
    return {
        data: getUserCart,
        meta: {
            total: countData,
        },
    };
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CartServices = {
    insertDB,
    getAllDb,
    getSingleData,
    updateOneInDB,
    deleteByIdFromDB,
};
