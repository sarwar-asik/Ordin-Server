
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { Service } from "@prisma/client";
import { ServiceServices } from "./Services.service";
import { ServiceSearchableField } from "./Service.constant";

const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await ServiceServices.insertDB(data)
    
    sendResponse<Service>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created Service",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,ServiceSearchableField)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await ServiceServices.getAllDb(filters,options)

    sendResponse<Service[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Service Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await ServiceServices.getSingleData(id)
    
    sendResponse<Service>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get `,
        data:result
    })
  
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semster delete successfully',
        data: result
    });
});
export const ServiceController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB}