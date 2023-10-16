
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { Booking } from "@prisma/client";
import { BookingServices } from "./Booking.service";
import { BookingFilterableFields } from "./Booking.constant";




const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await BookingServices.insertDB(data)
    
    sendResponse<Booking>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created Booking",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,BookingFilterableFields)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await BookingServices.getAllDb(filters,options)

    sendResponse<Booking[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Booking Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await BookingServices.getSingleData(id)
    
    sendResponse<Booking>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Booking`,
        data:result
    })
  
})
const getUserDataBooking  = catchAsync(async(req:Request,res:Response)=>{
const authUser =( req.user) as any
   const serviceId = req.params.serviceId;

    const result = await BookingServices.getUserBooking(authUser,serviceId)
    
    sendResponse<any>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Your Booking`,
        data:result
    })
  
})

const getUserAllBooking  = catchAsync(async(req:Request,res:Response)=>{
    const authUser =( req.user) as any
       
    
        const result = await BookingServices.getUserAllBooking(authUser)
        
        sendResponse<any>(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:`Successfully get Your All Bookings`,
            data:result?.data,
            meta:result?.meta
        })
      
    })

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking delete successfully',
        data: result
    });
});
export const BookingController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB,getUserDataBooking,getUserAllBooking}