import { Request } from 'express';
import { CorsOptions } from 'cors';

const origins = [
   'http://localhost:3000',
   'http://localhost:3001',
   'http://localhost:4000',
   'http://localhost:5000',

   // Development IPs
   'http://103.213.38.213',
   'http://103.213.38.213:3000',
   'http://103.213.38.213:4000',
   'http://103.213.38.213:5000',

   // Vercel preview/staging
   'https://admin-frontend-xi-ten.vercel.app',
   'https://pickone-client-site.vercel.app',

   // Production domains
   'https://admin.azmarif.dev',
   'https://client.azmarif.dev',
   'https://server.azmarif.dev', // <-- ✅ add if used

   'https://admin.zyslet.com',
   'https://zyslet.com',
   'https://server.zyslet.com',
];
export const corsOptionsDelegate = function (
   req: Request,
   callback: (err: Error | null, options?: CorsOptions) => void
) {
   const origin = req.header('Origin');
   let corsOptions: CorsOptions;

   // Allow requests without origin (like mobile apps, Postman, etc.)
   if (!origin) {
      corsOptions = {
         origin: true,
         credentials: true,
         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
         allowedHeaders: ['Content-Type', 'Authorization'],
         exposedHeaders: ['Content-Disposition'],
      };
   } else if (
      origins.some(allowedOrigin => origin?.startsWith(allowedOrigin))
   ) {
      corsOptions = {
         origin: true,
         credentials: true,
         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
         allowedHeaders: ['Content-Type', 'Authorization'],
         exposedHeaders: ['Content-Disposition'],
      };
   } else {
      corsOptions = { origin: false, credentials: false };
   }

   callback(null, corsOptions);
};
