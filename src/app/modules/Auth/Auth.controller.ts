
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./Auth.service";
import { User } from "@prisma/client";
import config from "../../../config";

const SignUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.signUp(data)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  if(result){
    res.cookie('userToken',result?.token,cookieOptions)
    sendResponse<User>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Successfully SignUp',
      data: result,
    });

  }

  
});

export const AuthController = {SignUp};
