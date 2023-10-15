
import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

import { CartServices } from "./Cart.service";
import { UserCart } from "@prisma/client";




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
    const authUser = (req.user) as any

 

    

    const result = await CartServices.getAllDb(authUser)

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