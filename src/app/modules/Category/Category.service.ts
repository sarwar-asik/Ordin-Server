import { Prisma, Categories } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ICartFilterRequest } from '../Cart/Cart.interface';
import { CategorySearchableField } from './Category.constant';

const insertDB = async (categoryData: Categories): Promise<Categories> => {
  const result = await prisma.categories.create({
    data: categoryData,
  });
  return result;
};

const getAllDb = async (
  filters: ICartFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Categories[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CategorySearchableField.map(field => ({
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

  const whereCondition: Prisma.CategoriesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.categories.findMany({
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
  const total = await prisma.categories.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<Categories | null> => {
  const result = await prisma.categories.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Categories>
): Promise<Categories> => {
  const result = await prisma.categories.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Categories> => {
  const result = await prisma.categories.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
};
