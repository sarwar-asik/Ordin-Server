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
exports.ServiceServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Service_constant_1 = require("./Service.constant");
const insertDB = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    if (serviceData.serviceDate) {
        // Parse serviceDate from string to Date
        serviceData.serviceDate = new Date(serviceData.serviceDate);
    }
    if (serviceData.serviceTime) {
        // Assuming the time is in HH:mm format
        const [hours, minutes] = serviceData.serviceTime.split(':');
        const serviceTime = new Date();
        serviceTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        serviceData.serviceTime = serviceTime;
    }
    const result = yield prisma_1.default.service.create({
        data: serviceData,
        include: {
            reviews: true,
            category: true,
            publisher: true,
            bookings: true,
        },
    });
    return result;
});
// const getAllDb = async (
//   filters: IServiceFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Service[]>> => {
//   // !for pagination
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   //   ! for filters
//   const { searchTerm, ...filtersData } = filters;
//   const andConditions = [];
//   if (searchTerm) {
//     andConditions.push({
//       OR: ServiceSearchableField.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive'
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length > 0) {
//     andConditions.push({
//         AND: Object.keys(filtersData).map((key) => {
//             if (serviceRelationalFields.includes(key)) {
//                 return {
//                     [serviceRelationalFieldsMapper[key]]: {
//                         id: (filtersData as any)[key]
//                     }
//                 };
//             } else {
//                 return {
//                     [key]: {
//                         equals: (filtersData as any)[key]
//                     }
//                 };
//             }
//         })
//     });
// }
//   // for andCondition for where
//   const whereCondition: Prisma.ServiceWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.service.findMany({
//     include:{
//       category:true
//     },
//     where: whereCondition,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? {
//             [options.sortBy]: options.sortOrder,
//           }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.service.count();
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };
const getAllDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log("🚀 ~ file: Services.service.ts:124 ~ filters:", filters);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Service_constant_1.ServiceSearchableField.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (Service_constant_1.serviceRelationalFields.includes(key)) {
                    console.log(Service_constant_1.serviceRelationalFields);
                    return {
                        [key]: filterData[key],
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    // console.log(andConditions[0].AND,"aaaa");
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        include: {
            category: true,
            publisher: true,
            reviews: {
                include: {
                    user: true,
                },
            },
            bookings: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.service.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            reviews: {
                include: {
                    user: true,
                },
            },
            category: true,
            publisher: true,
            bookings: {
                include: {
                    user: true
                }
            },
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, 'annnnnd ', payload);
    if (payload.serviceDate) {
        // Parse serviceDate from string to Date
        payload.serviceDate = new Date(payload.serviceDate);
    }
    if (payload.serviceTime) {
        // Assuming the time is in HH:mm format
        const [hours, minutes] = payload.serviceTime.split(':');
        const serviceTime = new Date();
        serviceTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        payload.serviceTime = serviceTime;
    }
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
        include: {
            reviews: {
                include: {
                    user: true,
                },
            },
            category: true,
            publisher: true,
            bookings: {
                include: {
                    user: true
                }
            },
        },
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
        include: {
            reviews: {
                include: {
                    user: true,
                },
            },
            category: true,
            publisher: true,
            bookings: {
                include: {
                    user: true
                }
            },
        },
    });
    return result;
});
exports.ServiceServices = {
    insertDB,
    getAllDb,
    getSingleData,
    updateOneInDB,
    deleteByIdFromDB,
};
