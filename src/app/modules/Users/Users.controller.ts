
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UsersService } from "./Users.service";
import { User } from "@prisma/client";
import { UserFilterableFields } from "./user.constant";
import pick from "../../../shared/pick";

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UsersService.insertDB(data);

  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Users',
    data: result,
  });
});


const userProfile = catchAsync(async(req:Request,res:Response)=>{
  const authUser =( req.user) as any
  const result = await UsersService.getProfile(authUser)

if(result){
  // eslint-disable-next-line no-unused-vars
  const {password,...profileData} = result 


   sendResponse<Partial<User>>(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Successfully fetched User profile',
     data: profileData,
   });
}
})


const updateProfile = catchAsync(async(req:Request,res:Response)=>{
  const authUser =( req.user) as any
  const updateData = req.body;
  console.log(updateData,"update Profile data");
  
  
  const result = await UsersService.updateProfile(authUser,updateData)

if(result){
   sendResponse<Partial<User>>(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Successfully updated User profile',
     data:result,
   });
}
})


const getAllUsers = catchAsync(async(req:Request,res:Response)=>{
  // console.log(req.query,'from getAll db controller');
  const filters = pick(req.query,UserFilterableFields)
  // ServiceFilterableFields (use it in filters )
  const options = pick(req.query,['limit','page','sortBy','sortOrder'])

  

  const result = await UsersService.getAllUsers(filters,options)

  sendResponse<User[]>(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Successfully fetched Users Data",
      meta:result.meta,
      data:result?.data,
  })
})


export const UsersController = {insertDB,userProfile,updateProfile,getAllUsers};
