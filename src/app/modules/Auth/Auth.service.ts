import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const signUp = async (
  userData: User
): Promise<{ data: User; accessToken: string }> => {
  userData.password = await bcrypt.hash(userData.password, 10);

  console.log("🚀 ~ file: Auth.service.ts:14 ~ userData:", userData)

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
  userId: string;
  email?: string;
  password: string;
}): Promise<any> => {
  const { email, password } = payload;

  console.log(payload, 'payload');

  // const isUserExist = await User.isUserExistsMethod(phoneNumber);
  // // console.log(isUserExist,"isUserExits");

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(isUserExist);

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
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken:token
  };
};

export const AuthService = { signUp, authLogin };
