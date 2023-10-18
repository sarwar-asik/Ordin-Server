
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await FaqService.insertDB(data)

  sendResponse<Faq>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Faq',
    data: result,
  });
});

export const FaqController = {insertDB};
