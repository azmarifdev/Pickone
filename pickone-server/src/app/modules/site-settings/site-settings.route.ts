import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { SiteSettingsController } from './site-settings.controller';
import { SiteSettingsValidation } from './site-settings.validation';

const router = express.Router();

router.get('/public', SiteSettingsController.getPublicSettings);

router.get('/', auth(USER_ROLE.ADMIN), SiteSettingsController.getAdminSettings);

router.patch(
   '/',
   auth(USER_ROLE.ADMIN),
   validateRequest(SiteSettingsValidation.updateSiteSettingsZodSchema),
   SiteSettingsController.updateSettings
);

export const SiteSettingsRoutes = router;

