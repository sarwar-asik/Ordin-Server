
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UsersService } from "./Users.service";
import { User } from "@prisma/client";

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



export const UsersController = {insertDB,userProfile};
