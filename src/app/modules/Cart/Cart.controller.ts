
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { CartServices } from "./Cart.service";
import { UserCart } from "@prisma/client";
import { CartSearchableField } from "./cart.constant";



const insertDB  = catchAsync(async(req:Request,res:Response)=>{
    const data = req.body
    const result = await CartServices.insertDB(data)
    
    sendResponse<UserCart>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully created Cart",
        data:result
    })
  
})

const getAllDb = catchAsync(async(req:Request,res:Response)=>{
    // console.log(req.query,'from getAll db controller');
    const filters = pick(req.query,CartSearchableField)
    // ServiceFilterableFields (use it in filters )
    const options = pick(req.query,['limit','page','sortBy','sortOrder'])

    

    const result = await CartServices.getAllDb(filters,options)

    sendResponse<UserCart[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetched Cart Data",
        meta:result.meta,
        data:result?.data,
    })
})


const getSingleDataById  = catchAsync(async(req:Request,res:Response)=>{
   const id = req.params.id;

    const result = await CartServices.getSingleData(id)
    
    sendResponse<UserCart>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:`Successfully get Cart Data `,
        data:result
    })
  
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CartServices.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CartServices.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart deleted successfully',
        data: result
    });
});
export const CartController ={insertDB,getAllDb,getSingleDataById,updateOneInDB,deleteByIdFromDB}