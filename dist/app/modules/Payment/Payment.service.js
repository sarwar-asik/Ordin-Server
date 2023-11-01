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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ssl_service_1 = require("../SSL/ssl.service");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const Payment_const_1 = require("./Payment.const");
const initPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentSession = yield ssl_service_1.sslService.initPayment({
        total_amount: data.total_amount,
        tran_id: data.tran_id,
        shipping_method: data.shipping_method,
        product_name: data.product_name,
        product_category: data.product_category,
        cus_name: data.cus_name,
        cus_email: data.cus_email,
        cus_add: data.cus_add,
        cus_country: data.cus_country,
        cus_phone: data.cus_phone,
        ship_add: data.ship_add,
        ship_country: data.ship_country,
    });
    yield prisma_1.default.payment.create({
        data: {
            transactionId: data.tran_id,
            serviceId: data.product_id,
            userId: data.cus_id,
        },
    });
    return paymentSession.redirectGatewayURL;
});
const webHook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    // console.log("web hooks");
    if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.status) || (payload === null || payload === void 0 ? void 0 : payload.status) !== 'VALID') {
        return {
            message: 'Invalid Payment',
        };
    }
    const result = yield ssl_service_1.sslService.validate(payload);
    if ((result === null || result === void 0 ? void 0 : result.status) !== 'VALID') {
        return {
            message: 'Payment failed',
        };
    }
    const { tran_id } = result;
    yield prisma_1.default.payment.updateMany({
        where: {
            transactionId: tran_id,
        },
        data: {
            paymentStatus: client_1.PaymentStatus.success,
            paymentGatewayData: payload,
        },
    });
    return {
        message: 'Payment success',
    };
});
const getAllPayments = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // !for pagination
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   ! for filters
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Payment_const_1.PaymentSearchableField.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    // for andCondition for where
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.payment.findMany({
        include: {
            user: true,
            service: true
        },
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.payment.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getUserPaymentByService = (authUser, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findFirst({
        where: {
            userId: authUser === null || authUser === void 0 ? void 0 : authUser.id,
            serviceId,
        },
    });
    return result;
});
const getUserAllPayments = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findMany({
        where: {
            userId: authUser === null || authUser === void 0 ? void 0 : authUser.id,
        },
        include: {
            service: true,
            user: true,
        },
    });
    const total = yield prisma_1.default.payment.count();
    return {
        meta: {
            total,
        },
        data: result
    };
});
const getSinglePaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.PaymentService = { initPayment, webHook, getAllPayments, getUserPaymentByService, getSinglePaymentById, getUserAllPayments };
