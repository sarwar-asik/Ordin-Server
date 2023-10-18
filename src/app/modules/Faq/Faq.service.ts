
import {  Prisma,Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Faq): Promise<Faq> => {
  const result = await prisma.Faq.create({
    data,
  });

  return result;
};

export const FaqService = {insertDB};
