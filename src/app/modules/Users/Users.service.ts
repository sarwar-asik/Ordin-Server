import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};
const getProfile = async (authUser: {
  id?: string;
  email: string;
  role: string;
}): Promise<User | null> => {
  const { id } = authUser;
  const userResult = await prisma.user.findUnique({
    where: {
    id,
      
    },
    include:{
      Payment:true,
      bookings:true,
      usersCarts:true
    }
  })

  return userResult;
};

const updateProfile = async (authUser: {
  id?: string; email: string;role: string;},updateData:Partial<User>): Promise<User | null> => {
  const { email,id } = authUser;
  console.log(email,"email...",updateData);
  if(updateData.role || updateData.password){
    throw new ApiError(httpStatus.UNAUTHORIZED,"You can not update role or password ")
  }
  const userResult = await prisma.user.update({
    where:{
      id
    },
    data:updateData
  })

  return userResult;
};

export const UsersService = { insertDB, getProfile ,updateProfile};
