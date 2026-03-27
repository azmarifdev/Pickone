import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { ISiteSettings } from './site-settings.interface';
import { SiteSettingsServices } from './site-settings.services';

const getPublicSettings = catchAsync(async (req: Request, res: Response) => {
   const result = await SiteSettingsServices.getPublicSettings();

   sendResponse<ISiteSettings>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Site settings retrieved successfully',
      data: result,
   });
});

const getAdminSettings = catchAsync(async (req: Request, res: Response) => {
   const result = await SiteSettingsServices.getAdminSettings();

   sendResponse<ISiteSettings>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Site settings retrieved successfully',
      data: result,
   });
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
   const result = await SiteSettingsServices.updateSettings(req.body);

   sendResponse<ISiteSettings>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Site settings updated successfully',
      data: result,
   });
});

export const SiteSettingsController = {
   getPublicSettings,
   getAdminSettings,
   updateSettings,
};

