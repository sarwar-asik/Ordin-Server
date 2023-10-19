import { FAQ, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { FAQSearchableField } from './Faq.contstant';
import { IFAQFilterRequest } from './Faq.interface';

const insertDB = async (FAQData: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data: FAQData,
  });
  return result;
};

const getAllDb = async (
  filters: IFAQFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FAQ[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FAQSearchableField.map(field => ({
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

  const whereCondition: Prisma.FAQWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fAQ.findMany({
  
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
  const total = await prisma.fAQ.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<FAQ> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FAQServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
};
