import { Request, Response } from 'express';

import sendResponse from '../../../shared/sendResponse';

import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { ServiceFilterableFields} from './Service.constant';
import { ServiceServices } from './Services.service';

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ServiceServices.insertDB(data);

  // console.log('service created');

  sendResponse<Service>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created Service',
    data: result,
  });
});

const getAllDb = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query,'from getAll db controller');
  // console.log(req.query,"queryyyyyy");
  const filters = pick(req.query, ServiceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  // console.log(filters,"filters from controller",options);
  const result = await ServiceServices.getAllDb(filters, options);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services fetched successfully',
      meta: result.meta,
      data: result.data
  });
});

const getSingleDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ServiceServices.getSingleData(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get `,
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category delete successfully',
    data: result,
  });
});
export const ServiceController = {
  insertDB,
  getAllDb,
  getSingleDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
