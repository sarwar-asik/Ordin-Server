import { Booking, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookingSearchableField } from './Booking.constant';
import { IBookingFilterRequest } from './Booking.interface';

const insertDB = async (cartData: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data: cartData,
  });

  return result;
};

const getAllDb = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookingSearchableField.map(field => ({
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

  const whereCondition: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
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
  const total = await prisma.booking.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getUserBooking = async (
  authUser: any,
  serviceId: string
): Promise<Booking | null> => {
  const result = await prisma.booking.findFirst({
    where: {
      userId: authUser?.id,
      serviceId,
    },
  });
  return result;
};

const getUserAllBooking = async (
  authUser: any
): Promise<{ data: Booking[]; meta: any} | null> => {
  const result = await prisma.booking.findMany({
    where: {
      userId: authUser?.id,
    },
    include: {
      service: true,
      user: true,
    },
  });
  const total = await prisma.booking.count();
  return {
    meta: {
      total,
    },
    data: result
  };
};

const getSingleData = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookingServices = {
  insertDB,
  getAllDb,
  getSingleData,
  updateOneInDB,
  deleteByIdFromDB,
  getUserBooking,
  getUserAllBooking,
};
