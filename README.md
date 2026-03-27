# Zyslet Commerce Platform (PickOne)

Production-ready full-stack eCommerce platform with separate **Client**, **Admin**, and **Server** applications.

This project was re-architected for real deployment and portfolio presentation, with a strong focus on domain separation, cloud media handling, analytics, security, and operational reliability.

## Live Architecture

- Client: `https://zyslet.com`
- Admin: `https://admin.zyslet.com`
- API Server: `https://server.zyslet.com`
- Fallback API (during SSL/setup windows): `https://pickone-server.onrender.com`

## Repositories / Apps

- `pickone-client` (Next.js 14): customer-facing storefront
- `pickone-admin` (Next.js 14): admin dashboard and content/order management
- `pickone-server` (Express + TypeScript + MongoDB): REST API, auth, product/order/review logic

## Key Features Implemented

### Customer App (Client)
- Product listing with filters, pagination, and improved UX flow
- Product details with gallery, specs, reviews, related products
- Real-time pricing display (discount/original/savings)
- Cart and order journey improvements
- Better loading/error boundaries for production behavior
- Cloudinary-based image URL handling and optimization-friendly rendering

### Admin Panel
- Authentication flow + protected dashboard routes
- Functional analytics cards and monthly performance visualization
- Review management improvements (data correctness + usability)
- Product CRUD flows with media handling
- Demo-friendly login UX for portfolio reviewers

### Backend API
- Module-based architecture: `auth`, `user`, `product`, `order`, `review`, `tracking`, `site-settings`, etc.
- JWT auth with cookie strategy for cross-subdomain deployment
- Cloudinary integration for product/review images
- CORS allowlist strategy for `zyslet.com`, `admin.zyslet.com`, and preview domains
- Security/performance hardening:
  - `helmet`
  - `compression`
  - `express-rate-limit`
  - request body size controls
- Query and model optimizations (`lean()`, selective fields, indexes on hot paths)

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Admin state/data: Redux Toolkit + RTK Query
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB Atlas + Mongoose
- Media: Cloudinary
- Analytics: GTM + Meta Pixel + server-side Facebook Conversion API hooks
- Deployment:
  - Client/Admin: Vercel
  - Server: Render
  - Domain + DNS: custom subdomains (`zyslet.com` ecosystem)

## What I Improved (Production Work Scope)

- Split and aligned project for independent deployment of client/admin/server
- Standardized environment variables across apps and examples
- Migrated media flow to Cloudinary and fixed image rendering issues end-to-end
- Added seed flow for initial admin bootstrap in new MongoDB cluster
- Fixed cross-origin login issues (CORS/cookie config for multi-domain setup)
- Added keep-alive strategy for Render cold-start mitigation
- Fixed admin login redirect/state issues
- Improved product list and product details UX for customer app
- Added dashboard data functionality and review flow enhancements in admin

## Challenges Faced and How They Were Solved

1. CORS login failures between Admin and API  
   - Problem: browser blocked login requests due to missing/invalid CORS headers in cross-domain setup.  
   - Solution: implemented dynamic CORS allowlist middleware and aligned env origins per deployment.

2. Cross-subdomain authentication persistence  
   - Problem: successful login but dashboard route guard still redirected to login.  
   - Solution: adjusted cookie configuration (domain/same-site/secure behavior) for `.zyslet.com` usage.

3. Render cold starts affecting API responsiveness  
   - Problem: service slept after inactivity, causing delayed first response.  
   - Solution: configured periodic keep-alive workflow/script and fallback URL strategy during migration.

4. Images not rendering in admin/client  
   - Problem: mixed image URL formats (IDs/relative/absolute) and inconsistent media handling.  
   - Solution: introduced robust image URL utility + Cloudinary-aware transformation logic.

5. New database bootstrap with no initial admin  
   - Problem: fresh cluster had no privileged user to access admin panel.  
   - Solution: prepared and executed seed script for initial admin creation.

## Local Development

### 1) Server
```bash
cd pickone-server
npm install
npm run dev
```
Runs by default on `http://localhost:5000` (depending on `.env`).

### 2) Admin
```bash
cd pickone-admin
npm install
npm run dev
```
Runs on `http://localhost:3000`.

### 3) Client
```bash
cd pickone-client
npm install
npm run dev
```
Runs on `http://localhost:3000` (use different port if both Next apps run together).

## Environment Configuration

- Root sample: [`.env.example`](./.env.example)
- Server sample: [`pickone-server/.env.example`](./pickone-server/.env.example)

Important production values include:
- MongoDB Atlas connection string (`DATABASE_URL`)
- Cloudinary credentials
- Domain URLs (`CLIENT_URL`, `ADMIN_URL`, `API_URL`)
- JWT secrets
- CORS allowlist and cookie domain

## Demo Access (Portfolio Review)

Admin demo account:
- Email: `zyslet@gmail.com`
- Password: `@zyslet1234`

The login page includes copy-ready demo credentials for easier reviewer access.

## Resume-Friendly Project Summary

Built and deployed a multi-app eCommerce system with independent frontend/admin services, a secure backend API, cloud media integration, analytics, and production-grade operational improvements (CORS/auth hardening, performance tuning, deployment reliability, and dashboard functionality).
