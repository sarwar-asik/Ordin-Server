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
    sendResponse<User>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Successfully SignUp',
      data: result.data,
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
    token,
  });
});

export const AuthController = { SignUp, login };
