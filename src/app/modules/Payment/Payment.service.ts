import { Payment, PaymentStatus, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { sslService } from '../SSL/ssl.service';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaymentFilterRequest } from './Payment.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { PaymentSearchableField } from './Payment.const';

type TransactionData = {
  total_amount: number;
  tran_id: string;
  shipping_method: string;
  product_name: string;
  product_id: string;
  product_category: string;
  cus_name: string;
  cus_email: string;
  cus_id: string;
  cus_add: string;
  cus_country: string;
  cus_phone: string;
  ship_add: string;
  ship_country: string;
};
const initPayment = async (data: TransactionData) => {
  const paymentSession = await sslService.initPayment({
    total_amount: data.total_amount,
    tran_id: data.tran_id,
    shipping_method: data.shipping_method,
    product_name: data.product_name,
    product_category: data.product_category,
    cus_name: data.cus_name,
    cus_email: data.cus_email,
    cus_add: data.cus_add,
    cus_country: data.cus_country,
    cus_phone: data.cus_phone,
    ship_add: data.ship_add,
    ship_country: data.ship_country,
  });

  await prisma.payment.create({
    data: {
      transactionId: data.tran_id,
      serviceId: data.product_id,
      userId: data.cus_id,
    },
  });

  return paymentSession.redirectGatewayURL;
};

const webHook = async (payload: any) => {
  console.log(payload);
  // console.log("web hooks");
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    return {
      message: 'Invalid Payment',
    };
  }
  const result = await sslService.validate(payload);

  if (result?.status !== 'VALID') {
    return {
      message: 'Payment failed',
    };
  }
  const { tran_id } = result;

  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id,
    },
    data: {
      paymentStatus: PaymentStatus.success,
      paymentGatewayData: payload,
    },
  });
  return {
    message: 'Payment success',
  };
};



const getAllPayments = async (
  filters: IPaymentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Payment[]>> => {
  // !for pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  //   ! for filters

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: PaymentSearchableField.map(field => ({
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

  const whereCondition: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.payment.findMany({
    include:{
      user:true,
      service:true
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
  const total = await prisma.payment.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getUserPaymentByService = async (
  authUser: any,
  serviceId: string
): Promise<Payment | null> => {
  const result = await prisma.payment.findFirst({
    where: {
      userId: authUser?.id,
      serviceId,
    },
  });
  return result;
};

const getUserAllPayments = async (
  authUser: any
): Promise<{ data: Payment[]; meta: any} | null> => {
  const result = await prisma.payment.findMany({
    where: {
      userId: authUser?.id,
    },
    include: {
      service: true,
      user: true,
    
    },
  });
  const total = await prisma.payment.count();
  return {
    meta: {
      total,
    },
    data: result
  };
};

const getSinglePaymentById = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
  });

  return result;
};


export const PaymentService = { initPayment, webHook,getAllPayments,getUserPaymentByService,getSinglePaymentById,getUserAllPayments };
