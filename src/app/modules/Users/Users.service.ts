import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

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
  const { email } = authUser;
  const userResult = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return userResult;
};

export const UsersService = { insertDB, getProfile };
