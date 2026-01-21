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

### Application Overview
This is a **medical management system** built with NestJS and PostgreSQL, designed for "Precision Care Clinic". The system manages the complete patient lifecycle from appointments to consultations, with advanced features for patient follow-up, rescue operations, and questionnaire-based diagnostics.

### Core Domain Entities
- **Users & Authorization**: Role-based access control with Users, Roles, and Permissions
- **Medical Staff**: Medics with specialties and availability management
- **Patient Management**: Comprehensive patient profiles with demographics and medical history
- **Appointment System**: Scheduling, rescheduling, and consultation tracking
- **Follow-up System**: Patient follow-up workflows, contact attempts, and rescue directory
- **Questionnaire System**: Diagnostic questionnaires with scoring and patient assessments

### Database Architecture
- **PostgreSQL** database with **Prisma ORM**
- **Multi-file schema approach**: Models are organized in separate files under `prisma/models/` directory
- **Core models**: auth.prisma, patients.prisma, medics.prisma, appointments.prisma, consultation.prisma, questionnaires.prisma, etc.
- **Database service**: `PrismaService` (src/config/database/prisma.service.ts) extends PrismaClient with comprehensive logging and lifecycle management
- **Schema structure**: Main schema.prisma only contains generator and datasource config; actual models are split into focused files

### NestJS Module Structure
- **Feature-based modules**: Each domain has its own module with Controller → Service → Prisma pattern
- **Global configurations in app.module.ts**:
  - `PrismaExceptionFilter` - Transforms Prisma errors to HTTP exceptions (P2002→CONFLICT, P2025→NOT_FOUND, etc.)
  - `TransformInterceptor` - Wraps all responses with `{success: boolean, data: T, timestamp: string}` format
  - `ValidationPipe` - Global DTO validation with class-validator
- **Comprehensive API documentation**: Swagger UI at `/api/docs` with Bearer auth support
- **Global API prefix**: All endpoints prefixed with `/api/v1`

### Key Patterns and Conventions

#### Pagination Pattern
All list endpoints follow consistent pagination with `QueryDto` classes:
```typescript
{
  page?: number = 1,
  limit?: number = 10,
  search?: string,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc',
  // Entity-specific filters (active, dateRanges, etc.)
}
```

#### Error Handling
- **Prisma errors** are automatically caught and transformed to appropriate HTTP exceptions
- **Custom validators** like `IsNotPastDate` for business logic validation
- **Comprehensive logging** in each service using NestJS Logger

#### Response Format
All API responses are transformed to:
```typescript
{
  success: true,
  data: T,
  timestamp: string
}
```

#### Service Layer Pattern
Services follow consistent patterns:
- Dependency injection of `PrismaService`
- Comprehensive error handling with business logic validation
- Detailed logging of operations
- Include statements for related data fetching

### Key Files and Directories
- `src/app.module.ts` - Main application module with global providers
- `src/main.ts` - Bootstrap file with Swagger setup, CORS, and API documentation
- `src/config/database/` - Database configuration and Prisma service
- `src/common/` - Shared utilities (filters, interceptors, pipes, decorators, validators)
- `src/modules/` - Feature modules organized by domain
- `prisma/schema.prisma` - Main schema file (only generator/datasource config)
- `prisma/models/` - Individual model definitions by domain
- `prisma/seed.ts` - Database seeding script

### Module Organization
**Core Infrastructure:**
- `permissions`, `roles`, `users` - Authorization and user management
- `patients`, `medics`, `specialties` - Core medical entities

**Operational Modules:**
- `appointments`, `consultations`, `reschedules` - Appointment lifecycle
- `patient-follow`, `contact-attempt`, `rescue-directory` - Patient follow-up workflows
- `questionnaires` - Diagnostic questionnaire system

### Development Notes
- **Authentication**: JWT-based with Passport integration (NestJS JWT module included)
- **Internationalization**: nestjs-i18n package available for multilingual support
- **Environment config**: Uses @nestjs/config for environment variable management
- **API Testing**: Comprehensive API documentation available at `/api/docs`
- **TypeScript**: Strict typing with class-validator for runtime validation
- **Package manager**: Uses pnpm for dependency management

### Special Features
- **Multi-step patient follow-up** with contact attempts and rescue workflows
- **Advanced questionnaire system** with diagnostic groups, scoring algorithms, and patient assessments (supports multiple question types: boolean, numeric ranges, conditional logic)
- **Appointment rescheduling** with history tracking
- **Custom validation decorators** for business rules (date validation, etc.)
- **Comprehensive audit logging** for all database operations

### Questionnaire Test Data
- `PUNTACIONES.md` - Scoring algorithms and calculations
- `PREGUNTAS.md` - Sample questionnaire questions