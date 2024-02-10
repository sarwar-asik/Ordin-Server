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
exports.sslService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.ssl.store_id,
            store_passwd: config_1.default.ssl.store_passwd,
            total_amount: payload.total_amount,
            currency: 'BDT',
            tran_id: payload.tran_id, // use unique tran_id for each api call
            success_url: 'https://ordain-interior.vercel.app/payment/success',
            fail_url: 'https://ordain-interior.vercel.app/payment/fail',
            cancel_url: 'https://ordain-interior.vercel.app/payment/cancel',
            ipn_url: 'https://ordain-interior.vercel.app/payment/ipn',
            shipping_method: payload.shipping_method,
            product_name: payload.product_name,
            product_category: payload.product_category,
            cus_name: payload.cus_name,
            cus_email: payload.cus_email,
            cus_add: payload.cus_add,
            //   cus_city: payload.cus_city,
            cus_country: payload.cus_country,
            cus_phone: payload.cus_phone,
            ship_add: payload.ship_add,
            //   ship_city: payload.ship_city,
            ship_country: payload.ship_country,
        };
        // console.log(data);
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: config_1.default.ssl.sslPaymentUrl,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        console.log('🚀~ response:', response);
        return response.data;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Payment Error');
    }
});
const validate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: `${config_1.default.ssl.sslPaymentUrl}?val_id=${data.val_id}&store_id=${config_1.default.ssl.store_id}&store_passwd=${config_1.default.ssl.store_passwd}&formate=json`
        });
        console.log(response);
        return response;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment Error");
    }
});
exports.sslService = { initPayment, validate };
