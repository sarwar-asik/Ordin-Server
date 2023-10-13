
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { Categories } from "@prisma/client";
import { CategoryServices } from "./Category.service";
import { CategoryFilterableFields } from "./Category.interface";


const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await CategoryServices.insertDB(data)
    
    sendResponse<Categories>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created category",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,CategoryFilterableFields)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await CategoryServices.getAllDb(filters,options)

    sendResponse<Categories[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Category Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await CategoryServices.getSingleData(id)
    
    sendResponse<Categories>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Category`,
        data:result
    })
  
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category delete successfully',
        data: result
    });
});
export const CategoryController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB}