import { UserCart } from '@prisma/client';

import prisma from '../../../shared/prisma';

const insertDB = async (cartData: UserCart): Promise<UserCart> => {
  // console.log(cartData);

  const result = await prisma.userCart.create({
    data: cartData,
    include: {
      service: true,
      user: true,
    },
  });
  // console.log(result, 'ressssssss');

  return result;
};

const getAllDb = async (authUser: any): Promise<any> => {
  // !for pagination

  // console.log(authUser);

  const getUserCart = await prisma.userCart.findMany({
    where: {
      userId: authUser?.id,
    },
    include: {
      service: true,
      user: true,
    },
  });

  const countData = await prisma.userCart.count();

  return {
    data: getUserCart,
    meta: {
      total: countData,
    },
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

const getUserCart = async (
  authUser: any,

): Promise<{data:UserCart[]} | null> => {
  const result = await prisma.booking.findMany({
    where: {
      userId: authUser?.id,
    },
  });
  return {
    data:result
  }
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
  getUserCart
};
