
import {  Prisma,Review } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Review): Promise<Review> => {
  const result = await prisma.Review.create({
    data,
  });

  return result;
};

export const ReviewService = {insertDB};
