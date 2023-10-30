
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./Payment.service";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await PaymentService.initPayment(data)

  sendResponse<any>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Payment',
    data: result,
  });
});

export const PaymentController = {initPayment};
