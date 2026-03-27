import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { corsOptionsDelegate } from './app/middleware/cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { trackPageView } from './app/middleware/fbConversionTracker';
import routes from './app/routes';

const app: Application = express();

// Trust proxy for getting real IP addresses through nginx
app.set('trust proxy', true);

// Enable CORS
app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));

// Parse cookies and JSON body
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(
   express.urlencoded({
      extended: true,
      limit: '100mb',
      parameterLimit: 100000, // Increase if you have many form fields
   })
);

// Track page views with Facebook Conversion API
app.use(trackPageView);

// Serve uploaded files from /tmp via /server-tmp
app.use(
   '/server-tmp',
   express.static(path.join('/tmp'), {
      setHeaders: res => {
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      },
   })
);

// application routes
app.get('/', (req: Request, res: Response) => {
   res.send('Server is running');
});

// Health check endpoint for nginx
app.get('/health', (req: Request, res: Response) => {
   res.status(200).json({
      success: true,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
   });
});

// use routes
app.use('/api/v1', routes);

// globalErrorHandler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
         {
            path: req.originalUrl,
            message: 'API Not Found',
         },
      ],
   });
   next();
});

export default app;
