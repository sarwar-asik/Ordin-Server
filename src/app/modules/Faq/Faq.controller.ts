
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { FAQServices } from "./Faq.service";
import { FAQFilterableFields } from "./Faq.contstant";



const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await FAQServices.insertDB(data)
    
    sendResponse<FAQ>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created FAQ",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,FAQFilterableFields)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await FAQServices.getAllDb(filters,options)

    sendResponse<FAQ[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched FAQ Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await FAQServices.getSingleData(id)
    
    sendResponse<FAQ>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get FAQ`,
        data:result
    })
  
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FAQServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'FAQ updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FAQServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'FAQ delete successfully',
        data: result
    });
});
export const FAQController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB}