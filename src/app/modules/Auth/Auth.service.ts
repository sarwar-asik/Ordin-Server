import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { senMailer } from '../../../helpers/sendMailer';
import { resetPasswordHTML, resetPasswordSubject } from './resetPassword';

const signUp = async (
  userData: User
): Promise<{ data: User; accessToken: string }> => {
  userData.password = await bcrypt.hash(userData.password, 10);

  // console.log("🚀 ~ file: Auth.service.ts:14 ~ userData:", userData)

  const result = await prisma.user.create({
    data: userData,
  });
  const newAccessToken = jwtHelpers.createToken(
    {
      email: userData.email,
      id: userData.id,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
    data: result,
  };
};

const authLogin = async (payload: {
  email?: string;
  password: string;
}): Promise<any> => {
  const { email, password } = payload;

  // console.log(payload, 'payload');

  // const isUserExist = await User.isUserExistsMethod(phoneNumber);
  // // console.log(isUserExist,"isUserExits");

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not match');
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist.password && !isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is not correct');
  }

  //   jwt part ///

  const token = jwtHelpers.createToken(
    {
      email,
      role: isUserExist.role,
      id: isUserExist.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: token,
  };
};

const changePassword = async (
  authUser: any,
  passwordData: any
): Promise<any> => {
  const { id } = authUser;
  // console.log(authUser);
  const { oldPassword, newPassword } = passwordData;

  const password = await bcrypt.hash(newPassword, 10);

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not match');
  }

  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    isUserExist?.password
  );

  if (isUserExist.password && !isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Old Password is not correct');
  }

  const updatePass = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });

  return updatePass;
};

const forgotPassword = async (passwordData: any): Promise<any> => {
  console.log('🚀passwordData:', passwordData);

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: passwordData.email,
    },
  });
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User NOt Found');
  }

  const passResetToken = await jwtHelpers.createPassResetToken({
    id: isUserExist?.id,
    email: isUserExist.email,
  });
  const resetLink:string = config.frontend_url+'/resetPassword?'+`token=${passResetToken}`
  // console.log(passResetToken, '');
  await senMailer(resetPasswordSubject, isUserExist.email, resetPasswordHTML(resetLink));

  return passResetToken;
};
export const AuthService = {
  signUp,
  authLogin,
  changePassword,
  forgotPassword,
};
