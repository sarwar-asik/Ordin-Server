import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './Payment.service';

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await PaymentService.initPayment(data);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Payment init',
    data: result,
  });
});

const webHook = catchAsync(async (req: Request, res: Response) => {
  const queryData = req.query;
  const result = await PaymentService.webHook(queryData);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Verified',
    data: result,
  });
});

export const PaymentController = { initPayment,webHook };
