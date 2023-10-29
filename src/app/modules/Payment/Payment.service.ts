
import {  Prisma,Payment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Payment): Promise<Payment> => {
  const result = await prisma.Payment.create({
    data,
  });

  return result;
};

export const PaymentService = {insertDB};
