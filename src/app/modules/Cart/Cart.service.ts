import { Prisma, UserCart } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ICartFilterRequest } from './Cart.interface';
import { CartSearchableField } from './cart.constant';

const insertDB = async (cartData: UserCart): Promise<UserCart> => {
  const result = await prisma.userCart.create({
    data: cartData,
  });

  return result;
};

const getAllDb = async (
  filters: ICartFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<UserCart[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CartSearchableField.map(field => ({
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
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  // for andCondition for where

  const whereCondition: Prisma.UserCartWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.userCart.findMany({
    where: whereCondition,
    skip,
    take: limit,

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.userCart.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<UserCart | null> => {
  const result = await prisma.userCart.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<UserCart>
): Promise<UserCart> => {
  const result = await prisma.userCart.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<UserCart> => {
  const result = await prisma.userCart.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CartServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
};
