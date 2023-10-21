import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  ServiceSearchableField,
  serviceRelationalFields,
  // serviceRelationalFieldsMapper,
} from './Service.constant';
import { IServiceFilterRequest } from './Service.interface';

const insertDB = async (serviceData: Service | any): Promise<Service> => {
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

  const result = await prisma.service.create({
    data: serviceData,
    include: {
      reviews: true,
      category: true,
      publisher: true,
      bookings: true,
    },
  });

  return result;
};

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

const getAllDb = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  console.log("🚀 ~ file: Services.service.ts:124 ~ filters:", filters)

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ServiceSearchableField.map(field => ({
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

        if (serviceRelationalFields.includes(key)) {
          console.log(serviceRelationalFields);
          return {
           
              [key]: (filterData as any)[key],
         
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // console.log(andConditions[0].AND,"aaaa");
  const whereConditions: Prisma.ServiceWhereInput =
  andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
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
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
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
};

const getSingleData = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
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
        include:{
          user:true
        }
      },
    },
  });

  return result;
};



const updateOneInDB = async (
  id: string,
  payload: Partial<Service | any>
): Promise<Service> => {
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
  const result = await prisma.service.update({
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
        include:{
          user:true
        }
      },
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
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
        include:{
          user:true
        }
      },
    },
  });

  return result;
};

export const ServiceServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
};
