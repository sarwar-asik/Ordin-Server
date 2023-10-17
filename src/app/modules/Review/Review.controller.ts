
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { ReviewServices } from "./Review.service";
import { Review } from "@prisma/client";
import { ReviewFilterableFields } from "./Review.constant";






const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await ReviewServices.insertDB(data)
    
    sendResponse<Review>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created Review",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,ReviewFilterableFields)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await ReviewServices.getAllDb(filters,options)

    sendResponse<Review[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Review Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await ReviewServices.getSingleData(id)
    
    sendResponse<Review>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Review`,
        data:result
    })
  
})

const getUserReviewByService  = catchAsync(async(req:Request,res:Response)=>{
const authUser =( req.user) as any
   const serviceId = req.params.serviceId;

    const result = await ReviewServices.getUserReviewByService(authUser,serviceId)
    
    sendResponse<any>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get  Review by Service`,
        data:result
    })
  
})

const getUserAllReview  = catchAsync(async(req:Request,res:Response)=>{
    const authUser =( req.user) as any
       
    
        const result = await ReviewServices.getUserAllReview(authUser)
        
        sendResponse<any>(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:`Successfully get Your All Reviews`,
            data:result?.data,
            meta:result?.meta
        })
      
    })

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    // const authUser = (req.user) as any

    const { id } = req.params;
    const result = await ReviewServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review delete successfully',
        data: result
    });
});
export const ReviewController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB, getUserReviewByService,getUserAllReview}