import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

// Cookie configuration for different environments
export const cookieConfig = {
   // Base cookie options
   baseOptions: {
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
   } as CookieOptions,

   // Access token options (shorter duration)
   accessToken: {
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
   } as CookieOptions,

   // Refresh token options (longer duration)
   refreshToken: {
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
   } as CookieOptions,
};

// Cookie names
export const cookieNames = {
   ACCESS_TOKEN: 'zyslet_access_token',
   REFRESH_TOKEN: 'zyslet_refresh_token',
};

// Helper function to get clear cookie options (same as set options but without maxAge)
export const getClearCookieOptions = (
   options: CookieOptions
): CookieOptions => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { maxAge, ...clearOptions } = options;
   return clearOptions;
};
