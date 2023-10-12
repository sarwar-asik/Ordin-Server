import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

import  bcrypt  from "bcrypt"
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const signUp = async (userData: User): Promise<{data:User,accessToken:string}> => {

  userData.password=await bcrypt.hash(userData.password,10)
  
  const result = await prisma.user.create({
    data:userData,
  });
  const newAccessToken = jwtHelpers.createToken(
    {
      email:userData.email,
      id:userData.id,
      role:userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  return {
    accessToken:newAccessToken,
    data:result
  }
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


  const token =  jwtHelpers.createToken(
    {
      email:isUserExist.email,
      role:isUserExist.role
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return token
 
};


export const AuthService = { signUp,authLogin };
