import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { tokenName } from '../../../constants/jwt.token';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './Auth.service';

const SignUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.signUp(data);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  if (result) {
    res.cookie(tokenName, result?.accessToken, cookieOptions);
    // eslint-disable-next-line no-unused-vars
    const { password, ...userData } = result.data;

    sendResponse<Partial<User>>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Successfully SignUp',
      data: userData,
    });
  }
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  // console.log(loginData,"asdfsd");

  const token = await AuthService.authLogin(loginData);

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie(tokenName, token, cookieOption);

  res.json({
    success: true,
    statusCode: 200,
    message: 'User sign In successfully!',
    data: token,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const authUser =( req.user) as any;
  const passData = req.body;
  const result = await AuthService.changePassword(authUser, passData);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    message: 'Updated your password',
    success: true,
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const authUser =( req.user) as any;
  const passData = req.body;
  const result = await AuthService.forgotPassword(authUser, passData);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    message: 'Updated your forgot password',
    success: true,
    data: result,
  });
});
export const AuthController = { SignUp, login, changePassword,forgotPassword };
