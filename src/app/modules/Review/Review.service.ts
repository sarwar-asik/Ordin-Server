import { Prisma, Review } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ReviewSearchableField } from './Review.constant';
import { IReviewFilterRequest } from './Review.interface';

const insertDB = async (cartData: Review): Promise<Review> => {
  console.log(cartData);
  const result = await prisma.review.create({
    data: cartData,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const getAllDb = async (
  filters: IReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ReviewSearchableField.map(field => ({
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

  const whereCondition: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    include: {
      user: true,
      service: true,
    },
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
  const total = await prisma.review.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getUserReviewByService = async (
  authUser: any,
  serviceId: string
): Promise<Review | null> => {
  const result = await prisma.review.findFirst({
    where: {
      userId: authUser?.id,
      serviceId,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getUserAllReview = async (
  authUser: any
): Promise<{ data: Review[]; meta: any } | null> => {
  const result = await prisma.review.findMany({
    where: {
      userId: authUser?.id,
    },
    include: {
      service: true,
      user: true,
    },
  });
  const total = await prisma.review.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Review> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

export const ReviewServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
  getUserReviewByService,
  getUserAllReview,
};
