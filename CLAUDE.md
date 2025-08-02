# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm run start:dev` - Start development server with hot reload
- `pnpm run start:debug` - Start with debug mode and hot reload
- `pnpm run build` - Build the application
- `pnpm run start:prod` - Start production server

### Testing
- `pnpm run test` - Run unit tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run test:cov` - Run tests with coverage

### Code Quality
- `pnpm run lint` - Run ESLint with auto-fix
- `pnpm run format` - Format code with Prettier

### Database (Prisma)
- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:studio` - Open Prisma Studio

## Architecture

### Database Architecture
- **PostgreSQL** database with **Prisma ORM**
- **Multi-file schema approach**: Models are organized in separate files under `prisma/models/` and imported into main `schema.prisma`
- **Core entities**: Users, Roles, Permissions, Patients, Medics, Appointments, Consultations
- **Role-based access control**: Users have roles, roles have permissions
- **Database service**: `PrismaService` (src/config/database/prisma.service.ts) extends PrismaClient with logging and lifecycle management

### NestJS Module Structure
- **Feature-based modules**: Each domain (users, roles, patients, medics, appointments, consultations, permissions) has its own module
- **Global configurations**: 
  - Exception filter for Prisma errors (`PrismaExceptionFilter`)
  - Response transformer (`TransformInterceptor`) - wraps all responses with `{success, data, timestamp}` format
  - Global validation pipe for DTOs
- **Service layer pattern**: Each module follows Controller → Service → Prisma pattern
- **DTO validation**: Uses class-validator and class-transformer for request/response validation

### Key Files
- `src/app.module.ts` - Main application module with global providers
- `src/config/database/prisma.service.ts` - Database service with connection management
- `src/common/` - Shared utilities (filters, interceptors, pipes, decorators)
- `prisma/schema.prisma` - Main schema file importing all models
- `prisma/models/` - Individual model definitions

### Common Patterns
- **Pagination**: Services implement pagination with `QueryDto` pattern (page, limit, search)
- **Error handling**: Prisma errors are caught and transformed to appropriate HTTP exceptions
- **Logging**: Each service uses NestJS Logger for operation tracking
- **Response format**: All API responses are transformed to include success status and timestamp