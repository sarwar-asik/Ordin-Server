import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './Payment.service';
import pick from '../../../shared/pick';
import { PaymentFilterableFields } from './Payment.const';
import { Payment } from '@prisma/client';

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


const getAllPayment = catchAsync(async(req:Request,res:Response)=>{
  // console.log(req.query,'from getAll db controller');
  const filters = pick(req.query,PaymentFilterableFields)
  // ServiceFilterableFields (use it in filters )
  const options = pick(req.query,['limit','page','sortBy','sortOrder'])

  

  const result = await PaymentService.getAllPayments(filters,options)

  sendResponse<Payment[]>(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Successfully fetched Payment Data",
      meta:result.meta,
      data:result?.data,
  })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
 const id = req.params.id;

  const result = await PaymentService.getSinglePaymentById(id)
  
  sendResponse<Payment>(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:`Successfully get the Payment`,
      data:result
  })

})

const getUserPaymentByService  = catchAsync(async(req:Request,res:Response)=>{
const authUser =( req.user) as any
 const serviceId = req.params.serviceId;

  const result = await PaymentService.getUserPaymentByService(authUser,serviceId)
  
  sendResponse<any>(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:`Successfully get Your Payment on the service`,
      data:result
  })

})

const getUserAllPayment  = catchAsync(async(req:Request,res:Response)=>{
  const authUser =( req.user) as any
     
  
      const result = await PaymentService.getUserAllPayments(authUser)
      
      sendResponse<Payment[]>(res,{
          statusCode:httpStatus.OK,
          success:true,
          message:`Successfully get Your All Payments`,
          data:result?.data,
          meta:result?.meta
      })
    
  })

export const PaymentController = { initPayment,webHook,getAllPayment,getSingleDataById,getUserAllPayment,getUserPaymentByService };
