
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { Blog } from "@prisma/client";
import { BlogsServices } from "./Blogs.service";
import { BlogsFilterableFields } from "./Blogs.constant";


const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await BlogsServices.insertDB(data)
    
    sendResponse<Blog>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created Blogs",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,BlogsFilterableFields)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await BlogsServices.getAllDb(filters,options)

    sendResponse<Blog[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Blogs Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await BlogsServices.getSingleData(id)
    
    sendResponse<Blog>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Blogs`,
        data:result
    })
  
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogsServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogsServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs delete successfully',
        data: result
    });
});
export const BlogsController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB}